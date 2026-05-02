/**
 * Database Layer (Hybrid: Firebase Auth + Supabase/Firestore DB)
 * Reactive Repository Pattern
 */
const DB = {
    // Auth Listeners (Using Firebase Auth as Source of Truth)
    onAuthStateChanged(callback) {
        return auth.onAuthStateChanged(callback);
    },

    async login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    },

    async register(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    },

    async logout() {
        return auth.signOut();
    },

    async loginWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        return auth.signInWithPopup(provider);
    },

    // --- USERS ---
    async saveUser(user) {
        if (!user.email) return;

        // Save to Firestore (Primary for UI)
        const userRef = db.collection('users').doc(user.email.toLowerCase().trim());
        const userData = {
            ...user,
            email: user.email.toLowerCase().trim(),
            lastLogin: new Date().toISOString()
        };
        await userRef.set(userData, { merge: true });

        // Sync with Supabase Profiles
        try {
            const { error } = await supabaseClient.from('profiles').upsert({
                id: user.uid || user.email.toLowerCase().trim(),
                email: user.email.toLowerCase().trim(),
                name: user.name,
                avatar: user.avatar,
                alias: user.alias || '',
                service_config: user.serviceConfig,
                notification_settings: user.notificationSettings,
                last_login: new Date().toISOString()
            });
            if (error) throw error;
            console.log("✅ Supabase Profile Synced");
        } catch (e) {
            console.warn("⚠️ Supabase profile sync failed:", e.message, e);
        }
    },

    async getUser(email) {
        // Try Firestore first as it's the primary source for old users
        const doc = await db.collection('users').doc(email).get();
        if (doc.exists) return doc.data();

        // Fallback to Supabase
        const { data } = await supabaseClient.from('profiles').select('*').eq('email', email).single();
        if (data) return { ...data, serviceConfig: data.service_config, notificationSettings: data.notification_settings };

        return null;
    },

    async updateUserConfig(serviceConfig) {
        const user = auth.currentUser;
        if (!user) return;

        // Update Firestore
        await db.collection('users').doc(user.email).set({ serviceConfig }, { merge: true });

        // Update Supabase
        await supabaseClient.from('profiles').update({ service_config: serviceConfig }).eq('email', user.email);
    },

    async updateUser(profileData) {
        const user = auth.currentUser;
        if (!user) return;

        await db.collection('users').doc(user.email).set({ ...profileData }, { merge: true });
        await supabaseClient.from('profiles').update({
            name: profileData.name,
            avatar: profileData.avatar,
            alias: profileData.alias,
            notification_settings: profileData.notificationSettings
        }).eq('email', user.email);
    },

    async updateUserRole(email, newRole) {
        await db.collection('users').doc(email).update({ role: newRole });
        await supabaseClient.from('profiles').update({ role: newRole }).eq('email', email);
    },

    async uploadAvatar(file, email) {
        if (!file || !email) return null;
        try {
            // New Logic: Check if it's already a compressed Base64 object from store.js
            if (file.isBase64 && file.data) {
                 const base64Data = file.data;
                 // Persist Base64 directly into Firestore
                 await db.collection('users').doc(email).set({ avatar: base64Data }, { merge: true });
                 return base64Data; // Return the base64 string to be used as src
            }

            // Legacy Logic (if ever called with a real File object)
            // Primary: Upload to Firebase Storage
            const storageRef = storage.ref(`avatars/${email}/profile`);
            const snapshot = await storageRef.put(file);
            const downloadURL = await snapshot.ref.getDownloadURL();
            // Also persist URL directly in Firestore in case app loses storage reference
            await db.collection('users').doc(email).set({ avatar: downloadURL }, { merge: true });
            return downloadURL;
        } catch (storageError) {
            console.warn('Storage upload failed, using Base64 fallback:', storageError.message);
            // Fallback: Convert to Base64 and store in Firestore directly
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    try {
                        const base64 = e.target.result;
                        await db.collection('users').doc(email).set({ avatar: base64 }, { merge: true });
                        resolve(base64);
                    } catch (err) {
                        reject(err);
                    }
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }
    },

    subscribeToUsers(callback) {
        const userMap = new Map();

        const mergeAndCallback = () => {
            const unified = Array.from(userMap.values());
            // Log for debugging count issues
            console.log(`[UsersSync] Unified total: ${unified.length}`);
            callback(unified);
        };

        const processUsers = (users, source) => {
            users.forEach(u => {
                const email = (u.email || u.id || '').toLowerCase().trim();
                if (!email) return;

                const existing = userMap.get(email) || {};
                userMap.set(email, {
                    ...existing,
                    ...u,
                    email: email,
                    // Prioritize newer fields but keep consistency
                    serviceConfig: u.service_config || u.serviceConfig || existing.serviceConfig,
                    notificationSettings: u.notification_settings || u.notificationSettings || existing.notificationSettings,
                    alias: u.alias || existing.alias || '',
                    role: u.role || existing.role || 'user',
                    status: u.status || existing.status || 'active',
                    lastLogin: u.last_login || u.lastLogin || existing.lastLogin,
                    source: (existing.source || '').includes(source) ? existing.source : (existing.source || '') + '|' + source
                });
            });
            mergeAndCallback();
        };

        // 1. Listen to Firebase (Real-time)
        const fbUnsub = db.collection('users').onSnapshot(snapshot => {
            processUsers(snapshot.docs.map(doc => doc.data()), 'FB');
        }, error => {
            console.warn("Users access restricted:", error.message);
        });

        // 2. Fetch Supabase users (Full list)
        supabaseClient.from('profiles').select('*').then(({ data }) => {
            if (data) processUsers(data, 'SB');
        }).catch(e => console.warn("Supabase profiles fetch failed:", e.message));

        return fbUnsub;
    },

    // --- ADS ---
    subscribeToAds(callback) {
        return db.collection('ads').onSnapshot(snapshot => {
            const ads = snapshot.docs.map(doc => ({
                id: doc.id,
                imageUrl: doc.data().imageUrl,
                linkUrl: doc.data().linkUrl || '', // Support for external links
                ...doc.data()
            }));
            callback(ads);
        });
    },

    async uploadAdBanner(file) {
        if (!file) return null;
        const filename = `banner_${Date.now()}`;
        const storageRef = storage.ref(`ads/${filename}`);
        const snapshot = await storageRef.put(file);
        return snapshot.ref.getDownloadURL();
    },

    async addAd(adData) {
        return db.collection('ads').add({
            ...adData,
            createdAt: new Date().toISOString()
        });
    },

    async deleteAd(id) {
        return db.collection('ads').doc(id).delete();
    },

    // --- SERVICES (The Core Hybrid Logic) ---
    subscribeToServices(callback) {
        const user = auth.currentUser;
        if (!user) {
            callback([]);
            return () => { };
        }

        let fbServices = [];
        let sbServices = [];

        const mergeAndCallback = () => {
            const unified = [...fbServices, ...sbServices];
            const deduplicated = this._deduplicateUnified(unified);
            deduplicated.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

            console.log(`📊 Hybrid Sync: ${fbServices.length} (FB) + ${sbServices.length} (SB) -> ${deduplicated.length} Total`);
            callback(deduplicated);
        };

        // 1. Listen to Firebase
        const fbUnsub = db.collection('services')
            .where('userEmail', '==', user.email)
            .onSnapshot(snapshot => {
                fbServices = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                mergeAndCallback();
            });

        // 2. Listen to Supabase
        const channel = supabaseClient
            .channel('services-hybrid')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'services',
                filter: `user_email=eq.${user.email}`
            }, async () => {
                const { data } = await supabaseClient.from('services').select('*').eq('user_email', user.email);
                if (data) {
                    sbServices = data.map(s => ({ ...s, id: s.id, subType: s.sub_type, startTime: s.start_time, endTime: s.end_time }));
                    mergeAndCallback();
                }
            })
            .subscribe();

        // Initial Supabase Fetch
        supabaseClient.from('services').select('*').eq('user_email', user.email).then(({ data }) => {
            if (data) {
                sbServices = data.map(s => ({ ...s, id: s.id, subType: s.sub_type, startTime: s.start_time, endTime: s.end_time }));
                mergeAndCallback();
            }
        });

        return () => {
            fbUnsub();
            supabaseClient.removeChannel(channel);
        };
    },

    async addService(service) {
        const user = auth.currentUser;
        if (!user) throw new Error("Debe iniciar sesión");

        try {
            // 1. Save to Firestore (Primary for UI & Reliability)
            const serviceData = {
                userEmail: user.email,
                ...service,
                createdAt: new Date().toISOString()
            };
            const fbPromise = db.collection('services').add(serviceData);

            // 2. Sync with Supabase (Asynchronous background task)
            const sbPromise = supabaseClient
                .from('services')
                .insert([{
                    user_email: user.email,
                    date: service.date,
                    type: service.type,
                    sub_type: service.subType,
                    hours: service.hours,
                    start_time: service.startTime,
                    end_time: service.endTime,
                    location: service.location,
                    total: service.total,
                    status: service.status || 'Pendiente'
                }]);

            // Requisito de éxito: Firebase debe responder
            const fbDoc = await fbPromise;

            // Supabase se maneja de fondo sin bloquear el éxito
            Promise.resolve(sbPromise).catch(e => console.warn("Supabase delayed sync:", e.message));

            return { success: true, id: fbDoc.id };
        } catch (error) {
            console.error("DB Error (addService):", error);
            throw error;
        }
    },

    async updateService(id, updates) {
        // Find if it's Firebase or Supabase (UUID vs Firebase ID)
        if (id.toString().includes('-')) {
            // Supabase (UUID)
            const dbUpdates = {};
            if (updates.subType !== undefined) dbUpdates.sub_type = updates.subType;
            if (updates.startTime !== undefined) dbUpdates.start_time = updates.startTime;
            if (updates.endTime !== undefined) dbUpdates.end_time = updates.endTime;
            Object.keys(updates).forEach(key => {
                if (!['subType', 'startTime', 'endTime'].includes(key)) dbUpdates[key] = updates[key];
            });
            return supabaseClient.from('services').update(dbUpdates).eq('id', id);
        } else {
            // Firebase
            return db.collection('services').doc(id).update(updates);
        }
    },

    async deleteService(id) {
        const user = auth.currentUser;
        if (!user) return;

        try {
            // Find the item first to get matching criteria for the "other" database
            let itemToDelete = null;
            const isSbId = id.toString().includes('-');

            if (isSbId) {
                const { data } = await supabaseClient.from('services').select('*').eq('id', id).single();
                itemToDelete = data;
            } else {
                const doc = await db.collection('services').doc(id).get();
                if (doc.exists) itemToDelete = doc.data();
            }

            // 1. Delete from Primary Source
            if (isSbId) {
                await supabaseClient.from('services').delete().eq('id', id);
            } else {
                await db.collection('services').doc(id).delete();
            }

            // 2. Attempt deletion in the "other" source by matching criteria
            if (itemToDelete) {
                const email = (itemToDelete.userEmail || itemToDelete.user_email || user.email).toLowerCase().trim();
                const date = itemToDelete.date;
                const startTime = itemToDelete.startTime || itemToDelete.start_time;
                const location = itemToDelete.location;

                if (isSbId) {
                    // Item was SB, try deleting matching from FB
                    const fbMatches = await db.collection('services')
                        .where('userEmail', '==', email)
                        .where('date', '==', date)
                        .where('startTime', '==', startTime)
                        .where('location', '==', location)
                        .get();
                    
                    const batch = db.batch();
                    fbMatches.docs.forEach(doc => batch.delete(doc.ref));
                    await batch.commit();
                } else {
                    // Item was FB, try deleting matching from SB
                    await supabaseClient.from('services').delete()
                        .eq('user_email', email)
                        .eq('date', date)
                        .eq('start_time', startTime)
                        .eq('location', location);
                }
            }
            return { success: true };
        } catch (error) {
            console.error("DB Error (deleteService):", error);
            throw error;
        }
    },

    // --- EXPENSES ---
    subscribeToExpenses(callback) {
        const user = auth.currentUser;
        if (!user) {
            callback([]);
            return () => { };
        }

        let fbExpenses = [];
        let sbExpenses = [];

        const mergeAndCallback = () => {
            const unified = [...fbExpenses, ...sbExpenses];
            const deduplicated = this._deduplicateUnified(unified);
            deduplicated.sort((a, b) => new Date(b.date) - new Date(a.date));
            callback(deduplicated);
        };

        const fbUnsub = db.collection('expenses')
            .where('userEmail', '==', user.email)
            .onSnapshot(snapshot => {
                fbExpenses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                mergeAndCallback();
            });

        // Supabase Fetch/Realtime for expenses
        supabaseClient.from('expenses').select('*').eq('user_email', user.email).then(({ data }) => {
            if (data) {
                sbExpenses = data;
                mergeAndCallback();
            }
        });

        return fbUnsub;
    },

    async addExpense(expense) {
        const user = auth.currentUser;
        if (!user) throw new Error("Debe iniciar sesión");

        try {
            // 1. Save to Firestore (Primary)
            const expenseData = {
                userEmail: user.email,
                ...expense,
                createdAt: new Date().toISOString()
            };
            const fbPromise = db.collection('expenses').add(expenseData);

            // 2. Save to Supabase (Secondary)
            const sbPromise = supabaseClient.from('expenses').insert([{
                user_email: user.email,
                category: expense.category,
                amount: expense.amount,
                description: expense.description,
                date: expense.date
            }]);

            await fbPromise;
            Promise.resolve(sbPromise).catch(e => console.warn("Supabase expense delayed sync:", e.message));

            return { success: true };
        } catch (error) {
            console.error("DB Error (addExpense):", error);
            throw error;
        }
    },

    async deleteExpense(id) {
        const user = auth.currentUser;
        if (!user) return;

        try {
            let itemToDelete = null;
            const isSbId = id.toString().includes('-');

            if (isSbId) {
                const { data } = await supabaseClient.from('expenses').select('*').eq('id', id).single();
                itemToDelete = data;
            } else {
                const doc = await db.collection('expenses').doc(id).get();
                if (doc.exists) itemToDelete = doc.data();
            }

            if (isSbId) {
                await supabaseClient.from('expenses').delete().eq('id', id);
            } else {
                await db.collection('expenses').doc(id).delete();
            }

            if (itemToDelete) {
                const email = (itemToDelete.userEmail || itemToDelete.user_email || user.email).toLowerCase().trim();
                const date = itemToDelete.date;
                const amount = parseFloat(itemToDelete.amount);
                const category = itemToDelete.category;

                if (isSbId) {
                    const fbMatches = await db.collection('expenses')
                        .where('userEmail', '==', email)
                        .where('date', '==', date)
                        .where('amount', '==', amount)
                        .where('category', '==', category)
                        .get();
                    
                    const batch = db.batch();
                    fbMatches.docs.forEach(doc => batch.delete(doc.ref));
                    batch.commit().catch(e => console.warn("FB expense delete sync failed:", e));
                } else {
                    supabaseClient.from('expenses').delete()
                        .eq('user_email', email)
                        .eq('date', date)
                        .eq('amount', amount)
                        .eq('category', category)
                        .then(() => console.log("SB expense delete sync ok"))
                        .catch(e => console.warn("SB expense delete sync failed:", e));
                }
            }
            return { success: true };
        } catch (error) {
            console.error("DB Error (deleteExpense):", error);
            throw error;
        }
    },

    async getAllServicesForStats() {
        // Fetch from both
        const [fbSnap, sbResult] = await Promise.all([
            db.collection('services').get(),
            supabaseClient.from('services').select('*')
        ]);

        const fbServices = fbSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const sbServices = sbResult.data ? sbResult.data.map(s => ({ ...s, id: s.id, subType: s.sub_type, startTime: s.start_time, endTime: s.end_time })) : [];

        return [...fbServices, ...sbServices];
    },

    // --- ADMIN GLOBAL REAL-TIME ---
    subscribeToAllServices(callback) {
        let fbServices = [];
        let sbServices = [];

        const mergeAndCallback = () => {
            const unified = [...fbServices, ...sbServices];
            callback(this._deduplicateUnified(unified));
        };

        // FB Global
        const fbUnsub = db.collection('services').onSnapshot(snapshot => {
            fbServices = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            mergeAndCallback();
        });

        // SB Global
        const channel = supabaseClient
            .channel('admin-global-services')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, async () => {
                const { data } = await supabaseClient.from('services').select('*');
                if (data) {
                    sbServices = data.map(s => ({
                        ...s,
                        id: s.id,
                        type: s.type, // Asegurar mapeo
                        subType: s.sub_type,
                        startTime: s.start_time,
                        endTime: s.end_time
                    }));
                    mergeAndCallback();
                }
            })
            .subscribe();

        // Initial SB
        supabaseClient.from('services').select('*').then(({ data }) => {
            if (data) {
                sbServices = data.map(s => ({
                    ...s,
                    id: s.id,
                    type: s.type, // Asegurar mapeo
                    subType: s.sub_type,
                    startTime: s.start_time,
                    endTime: s.end_time
                }));
                mergeAndCallback();
            }
        });

        return () => {
            fbUnsub();
            supabaseClient.removeChannel(channel);
        };
    },

    subscribeToReviews(callback) {
        // Initial Fetch
        supabaseClient
            .from('user_reviews')
            .select('*')
            .order('timestamp', { ascending: false }) // Corregido a timestamp
            .limit(20)
            .then(({ data }) => {
                if (data && data.length > 0) {
                    data.forEach(r => callback({
                        ...r,
                        created_at: r.created_at || r.timestamp // Normalizar para admin.js
                    }, true));
                } else {
                    callback(null, true);
                }
            });

        const channel = supabaseClient
            .channel('admin-reviews')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'user_reviews' }, (payload) => {
                const data = payload.new;
                // Normalizar campos para que admin.js reciba datos consistentes
                callback({
                    id: data.id,
                    user_email: data.user_email,
                    rating: data.rating,
                    comment: data.comment,
                    created_at: data.created_at || data.timestamp || new Date().toISOString()
                }, false);
            })
            .subscribe();

        return () => supabaseClient.removeChannel(channel);
    },

    subscribeToQueryLogs(callback) {
        // Initial Fetch
        supabaseClient
            .from('query_logs')
            .select('*')
            .order('timestamp', { ascending: false })
            .limit(30)
            .then(({ data }) => {
                callback(data || [], true);
            });

        const channel = supabaseClient
            .channel('admin-query-logs')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'query_logs' }, async () => {
                const { data } = await supabaseClient.from('query_logs').select('*').order('timestamp', { ascending: false }).limit(30);
                callback(data || [], false);
            })
            .subscribe();

        return () => supabaseClient.removeChannel(channel);
    },

    // --- HELPER: DEDUPLICATION ---
    _deduplicateUnified(unified) {
        const fbSeenCounts = new Map();

        // Fase 1: Contar los items de Firebase
        unified.forEach(item => {
            const isFirebaseId = (id) => id && !id.toString().includes('-');
            if (isFirebaseId(item.id)) {
                const email = (item.userEmail || item.user_email || '').toLowerCase().trim();
                const date = item.date || '';
                const rawStart = (item.startTime || item.start_time || '');
                const start = rawStart.length > 5 ? rawStart.substring(0, 5) : rawStart;
                const loc = (item.location || '').toLowerCase().trim();
                const type = item.type || '';
                const hours = parseFloat(item.hours) || 0;

                const key = `${email}|${date}|${start}|${loc}|${type}|${hours}`;
                fbSeenCounts.set(key, (fbSeenCounts.get(key) || 0) + 1);
            }
        });

        // Fase 2: Filtrar deduplicando híbrido
        const uniqueSbIds = new Set();
        return unified.filter(item => {
            const isFirebaseId = (id) => id && !id.toString().includes('-');
            if (isFirebaseId(item.id)) {
                return true; // Todos los de Firebase se mantienen (presumimos que tienen doc.id único si son intencionales)
            } else {
                if (uniqueSbIds.has(item.id)) return false;
                uniqueSbIds.add(item.id);

                const email = (item.userEmail || item.user_email || '').toLowerCase().trim();
                const date = item.date || '';
                const rawStart = (item.startTime || item.start_time || '');
                const start = rawStart.length > 5 ? rawStart.substring(0, 5) : rawStart;
                const loc = (item.location || '').toLowerCase().trim();
                const type = item.type || '';
                const hours = parseFloat(item.hours) || 0;

                const key = `${email}|${date}|${start}|${loc}|${type}|${hours}`;

                if (fbSeenCounts.has(key) && fbSeenCounts.get(key) > 0) {
                    // Hay un item FB equivalente, suprimimos el de SB para evitar duplicación del MISMO servicio
                    fbSeenCounts.set(key, fbSeenCounts.get(key) - 1);
                    return false;
                }

                return true;
            }
        }).map(item => {
            // Normalizar para que el resto de la app reciba nombres consistentes
            // Aseguramos que startTime/endTime también lleguen normalizados (HH:mm)
            const nStart = (item.startTime || item.start_time || '');
            const nEnd = (item.endTime || item.end_time || '');

            return {
                ...item,
                userEmail: item.userEmail || item.user_email,
                startTime: nStart.length > 5 ? nStart.substring(0, 5) : nStart,
                endTime: nEnd.length > 5 ? nEnd.substring(0, 5) : nEnd,
                subType: item.subType || item.sub_type
            };
        });
    },

    calculateStats(users, allServices, dateFilter = 'all') {
        let services = allServices;
        if (dateFilter !== 'all') {
            const now = new Date();
            services = allServices.filter(s => {
                if (!s.date) return false;
                const [y, m] = s.date.split('-');
                if (!y || !m) return false;
                const itemYear = parseInt(y);
                const itemMonth = parseInt(m) - 1;

                if (dateFilter === 'this_month') {
                    return itemYear === now.getFullYear() && itemMonth === now.getMonth();
                } else if (dateFilter === 'last_month') {
                    const lm = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                    return itemYear === lm.getFullYear() && itemMonth === lm.getMonth();
                }
                return true;
            });
        }
        console.log(`[Stats] Calculating for ${users.length} users and ${services.length} services (Filter: ${dateFilter})`);

        const totalRevenue = services.reduce((acc, s) => acc + (parseFloat(s.total) || 0), 0);
        const totalHours = services.reduce((acc, s) => acc + (parseFloat(s.hours) || 0), 0);

        const servicesByDate = {};
        const revenueByDate = {};
        services.forEach(s => {
            const date = s.date || 'Sin fecha';
            servicesByDate[date] = (servicesByDate[date] || 0) + 1;
            revenueByDate[date] = (revenueByDate[date] || 0) + (parseFloat(s.total) || 0);
        });

        const dailySummary = Object.keys(servicesByDate).sort().reverse().map(date => ({
            date,
            count: servicesByDate[date],
            total: revenueByDate[date]
        }));

        const userRanking = services.reduce((acc, s) => {
            const email = s.userEmail || s.user_email || 'Desconocido';
            acc[email] = (acc[email] || 0) + (parseFloat(s.total) || 0);
            return acc;
        }, {});

        const sortedUsers = Object.entries(userRanking)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([email, total]) => ({ email, total }));

        const dates = Object.keys(servicesByDate).sort();

        const typeDistribution = services.reduce((acc, s) => {
            const type = s.type || 'Otro';
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {});

        const sortedTypes = Object.entries(typeDistribution).sort((a, b) => b[1] - a[1]);

        return {
            userCount: users.length,
            activeUsers: users.filter(u => u.lastLogin && new Date(u.lastLogin) > new Date(Date.now() - 86400000)).length,
            totalRevenue,
            totalHours,
            topUsers: sortedUsers,
            dailySummary: dailySummary,
            chartData: {
                dates: dates,
                counts: dates.map(d => servicesByDate[d]),
                revenue: dates.map(d => revenueByDate[d]),
                types: sortedTypes.map(t => t[0]),
                typeCounts: sortedTypes.map(t => t[1])
            }
        };
    },

    async addReview(rating, comment) {
        const user = auth.currentUser;
        if (!user) {
            console.error("Review failed: No user logged in");
            return false;
        }
        try {
            const { error } = await supabaseClient
                .from('user_reviews')
                .insert([{
                    user_email: user.email,
                    rating: parseInt(rating),
                    comment: comment.trim(),
                    timestamp: new Date().toISOString() // Explícito corregido
                }]);
            if (error) {
                console.error("Supabase Review Error:", error);
                throw error;
            }
            return true;
        } catch (e) {
            console.error("Error saving review:", e);
            return false;
        }
    },

    // --- ADMINISTRATOR TOOLS ---
    async updateUserRole(email, role) {
        const promises = [];
        promises.push(db.collection('users').doc(email).set({ role: role }, { merge: true }).catch(console.warn));
        promises.push(supabaseClient.from('profiles').update({ role: role }).eq('email', email).catch(console.warn));
        await Promise.all(promises);
    },

    async updateUserStatus(email, status) {
        const promises = [];
        promises.push(db.collection('users').doc(email).set({ status: status }, { merge: true }).catch(console.warn));
        promises.push(supabaseClient.from('profiles').update({ status: status }).eq('email', email).catch(console.warn));
        await Promise.all(promises);
    },

    // --- ANNOUNCEMENTS ---
    subscribeToAnnouncements(callback) {
        return db.collection('announcements')
            .orderBy('timestamp', 'desc')
            .limit(1)
            .onSnapshot(snapshot => {
                if (!snapshot.empty) {
                    const doc = snapshot.docs[0];
                    callback({ id: doc.id, ...doc.data() });
                } else {
                    callback(null);
                }
            });
    },

    async publishAnnouncement(data) {
        return db.collection('announcements').add({
            ...data,
            timestamp: new Date().toISOString()
        });
    },

    // --- CONFIGURATION / DATA ---
    async getHolidays() {
        try {
            const { data, error } = await supabaseClient
                .from('holidays')
                .select('date');

            if (error) {
                console.warn("Error fetching holidays from Supabase:", error);
                return null; // Signals failure, store.js will use local fallback
            }

            if (data && data.length > 0) {
                return data.map(holy => holy.date);
            }

            return null; // Return null if empty to keep using fallback until admin populates it
        } catch (e) {
            console.warn("Holidays fetch failed:", e.message);
            return null;
        }
    },
    
    // --- POLICE OPERATIONAL MODULES (PRO) ---
    async saveIntervention(inv) {
        try {
            const { error } = await supabaseClient.from('interventions').insert([{
                ...inv,
                user_email: store.user?.email
            }]);
            if (error) console.warn("Supabase intervention sync error:", error);
        } catch (e) { console.warn("Intervention sync failed:", e.message); }
    },

    async saveProcedure(proc) {
        try {
            // Save main procedure metadata
            const { data, error } = await supabaseClient.from('procedures').insert([{
                type: proc.type,
                location: proc.loc,
                lat: proc.lat,
                lng: proc.lng,
                notes: proc.notes,
                user_email: store.user?.email,
                timestamp: new Date().toISOString()
            }]).select();

            if (error) throw error;
            const procId = data[0].id;

            // Save persons linked to procedure
            if (proc.people.length > 0) {
                const persons = proc.people.map(p => ({
                    procedure_id: procId,
                    name: p.name,
                    dni: p.dni,
                    role: p.role
                }));
                await supabaseClient.from('procedure_persons').insert(persons);
            }
        } catch (e) { console.warn("Procedure sync failed:", e.message); }
    },

    async saveAuditLog(log) {
        try {
            const { error } = await supabaseClient.from('audit_log').insert([{
                ...log,
                timestamp: new Date().toISOString()
            }]);
            if (error) console.error("Audit log error:", error);
        } catch (e) { console.error("Audit log failed", e); }
    },

    async getAuditLogs() {
        try {
            const { data, error } = await supabaseClient
                .from('audit_log')
                .select('*')
                .order('timestamp', { ascending: false })
                .limit(50);
            if (error) throw error;
            return data;
        } catch (e) {
            console.error("Fetch audit logs failed", e);
            return [];
        }
    }
};
