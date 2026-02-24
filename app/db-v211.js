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
            console.warn("⚠️ Supabase profile sync failed:", e.message);
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
        if (id.toString().includes('-')) {
            return supabaseClient.from('services').delete().eq('id', id);
        } else {
            return db.collection('services').doc(id).delete();
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
        if (id.toString().includes('-')) {
            return supabaseClient.from('expenses').delete().eq('id', id);
        } else {
            return db.collection('expenses').doc(id).delete();
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
        const seen = new Map();
        return unified.filter(item => {
            // Normalizar campos para key de deduplicación
            const email = (item.userEmail || item.user_email || '').toLowerCase().trim();
            const date = item.date || '';
            const start = item.startTime || item.start_time || '';
            const loc = (item.location || '').toLowerCase().trim();
            const type = item.type || '';
            const hours = parseFloat(item.hours) || 0;

            // Key heurística: Email + Fecha + Hora Inicio + Ubicación + Tipo + Horas
            // Nota: Se omiten campos volátiles como timestamp o ID
            const key = `${email}|${date}|${start}|${loc}|${type}|${hours}`;

            if (seen.has(key)) {
                // Si ya lo vimos, preferir el que tenga una ID de Firebase (suele ser el más rápido/fiel)
                const existing = seen.get(key);
                const isFirebaseId = (id) => id && !id.toString().includes('-'); // Firebase IDs are doc IDs, Supabase are UUIDs (contain -)

                if (!isFirebaseId(existing.id) && isFirebaseId(item.id)) {
                    seen.set(key, item);
                }
                return false;
            }

            seen.set(key, item);
            return true;
        }).map(item => {
            // Normalizar para que el resto de la app reciba nombres consistentes (CamelCase preferido)
            return {
                ...item,
                userEmail: item.userEmail || item.user_email,
                startTime: item.startTime || item.start_time,
                endTime: item.endTime || item.end_time,
                subType: item.subType || item.sub_type
            };
        });
    },

    calculateStats(users, services) {
        console.log(`[Stats] Calculating for ${users.length} users and ${services.length} services`);
        // Logic remains same...
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
    }
};
