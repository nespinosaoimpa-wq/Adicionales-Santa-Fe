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
        const userRef = db.collection('users').doc(user.email);
        const userData = {
            ...user,
            lastLogin: new Date().toISOString()
        };
        await userRef.set(userData, { merge: true });

        // Sync with Supabase Profiles
        try {
            const { error } = await supabaseClient.from('profiles').upsert({
                id: user.uid || user.email,
                email: user.email,
                name: user.name,
                avatar: user.avatar,
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
            notification_settings: profileData.notificationSettings
        }).eq('email', user.email);
    },

    async updateUserRole(email, newRole) {
        await db.collection('users').doc(email).update({ role: newRole });
        await supabaseClient.from('profiles').update({ role: newRole }).eq('email', email);
    },

    async uploadAvatar(file, email) {
        if (!file || !email) return null;
        // Upload to Firebase Storage as primary
        const storageRef = storage.ref(`avatars/${email}/${file.name}`);
        const snapshot = await storageRef.put(file);
        return await snapshot.ref.getDownloadURL();
    },

    subscribeToUsers(callback) {
        let fbUsers = [];
        let sbUsers = [];

        const mergeAndCallback = () => {
            const unified = [...fbUsers];
            if (sbUsers.length > 0) {
                sbUsers.forEach(sbUser => {
                    if (!unified.find(u => u.email === sbUser.email)) {
                        unified.push({
                            ...sbUser,
                            serviceConfig: sbUser.service_config,
                            notificationSettings: sbUser.notification_settings,
                            role: sbUser.role || 'user'
                        });
                    }
                });
            }
            callback(unified);
        };

        // 1. Listen to Firebase (Primary source for users currently)
        const fbUnsub = db.collection('users').onSnapshot(snapshot => {
            fbUsers = snapshot.docs.map(doc => doc.data());
            mergeAndCallback();
        }, error => {
            console.warn("Users access restricted:", error.message);
            callback([]);
        });

        // 2. Fetch Supabase users for completeness
        supabaseClient.from('profiles').select('*').then(({ data }) => {
            if (data) {
                sbUsers = data;
                mergeAndCallback();
            }
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
            // Unify and sort
            const unified = [...fbServices, ...sbServices];
            // Remove duplicates by ID (if any data was migrated manually)
            const unique = Array.from(new Map(unified.map(s => [s.id, s])).values());
            unique.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

            console.log(`📊 Hybrid Sync: ${fbServices.length} (FB) + ${sbServices.length} (SB)`);
            callback(unique);
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
            unified.sort((a, b) => new Date(b.date) - new Date(a.date));
            callback(unified);
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
            callback(unified);
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
                    sbServices = data.map(s => ({ ...s, id: s.id, subType: s.sub_type, startTime: s.start_time, endTime: s.end_time }));
                    mergeAndCallback();
                }
            })
            .subscribe();

        // Initial SB
        supabaseClient.from('services').select('*').then(({ data }) => {
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

    subscribeToReviews(callback) {
        // Initial Fetch
        supabaseClient
            .from('user_reviews')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(20)
            .then(({ data }) => {
                if (data && data.length > 0) {
                    data.forEach(r => callback(r, true));
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

    calculateStats(users, services) {
        // Logic remains the same as before
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
