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

        // Save to Firestore (Retro-compatibility)
        const userRef = db.collection('users').doc(user.email);
        await userRef.set({
            ...user,
            lastLogin: new Date().toISOString()
        }, { merge: true });

        // Sync with Supabase Profiles
        try {
            await supabase.from('profiles').upsert({
                id: (await supabase.auth.getUser()).data.user?.id || user.uid, // Supabase ID might differ from Firebase UID
                email: user.email,
                name: user.name,
                avatar: user.avatar,
                service_config: user.serviceConfig,
                notification_settings: user.notificationSettings,
                last_login: new Date().toISOString()
            });
        } catch (e) {
            console.warn("Supabase profile sync failed, continuing with Firebase:", e);
        }
    },

    async getUser(email) {
        // Try Firestore first as it's the primary source for old users
        const doc = await db.collection('users').doc(email).get();
        if (doc.exists) return doc.data();

        // Fallback to Supabase
        const { data } = await supabase.from('profiles').select('*').eq('email', email).single();
        if (data) return { ...data, serviceConfig: data.service_config, notificationSettings: data.notification_settings };

        return null;
    },

    async updateUserConfig(serviceConfig) {
        const user = auth.currentUser;
        if (!user) return;

        // Update Firestore
        await db.collection('users').doc(user.email).set({ serviceConfig }, { merge: true });

        // Update Supabase
        await supabase.from('profiles').update({ service_config: serviceConfig }).eq('email', user.email);
    },

    async updateUser(profileData) {
        const user = auth.currentUser;
        if (!user) return;

        await db.collection('users').doc(user.email).set({ ...profileData }, { merge: true });
        await supabase.from('profiles').update({
            name: profileData.name,
            avatar: profileData.avatar,
            notification_settings: profileData.notificationSettings
        }).eq('email', user.email);
    },

    async updateUserRole(email, newRole) {
        await db.collection('users').doc(email).update({ role: newRole });
        await supabase.from('profiles').update({ role: newRole }).eq('email', email);
    },

    async uploadAvatar(file, email) {
        if (!file || !email) return null;
        // Upload to Firebase Storage as primary
        const storageRef = storage.ref(`avatars/${email}/${file.name}`);
        const snapshot = await storageRef.put(file);
        return await snapshot.ref.getDownloadURL();
    },

    subscribeToUsers(callback) {
        // Hybrid: Fetch all from Firestore + Supabase (Merging by email)
        return db.collection('users').onSnapshot(async snapshot => {
            const fbUsers = snapshot.docs.map(doc => doc.data());
            callback(fbUsers); // Start with Firebase users immediately

            // In a real dual system, we'd fetch Supabase and merge, but for Admin, Firebase is currently exhaustive
        }, error => {
            console.warn("Users access restricted:", error.message);
            callback([]);
        });
    },

    // --- ADS ---
    subscribeToAds(callback) {
        return db.collection('ads').onSnapshot(snapshot => {
            const ads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
        const channel = supabase
            .channel('services-hybrid')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'services',
                filter: `user_email=eq.${user.email}`
            }, async () => {
                const { data } = await supabase.from('services').select('*').eq('user_email', user.email);
                if (data) {
                    sbServices = data.map(s => ({ ...s, id: s.id, subType: s.sub_type, startTime: s.start_time, endTime: s.end_time }));
                    mergeAndCallback();
                }
            })
            .subscribe();

        // Initial Supabase Fetch
        supabase.from('services').select('*').eq('user_email', user.email).then(({ data }) => {
            if (data) {
                sbServices = data.map(s => ({ ...s, id: s.id, subType: s.sub_type, startTime: s.start_time, endTime: s.end_time }));
                mergeAndCallback();
            }
        });

        return () => {
            fbUnsub();
            supabase.removeChannel(channel);
        };
    },

    async addService(service) {
        const user = auth.currentUser;
        if (!user) throw new Error("Must be logged in");

        // ONLY add to Supabase (New Data primary)
        const { data, error } = await supabase
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
            }])
            .select();

        if (error) throw error;
        return data;
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
            return supabase.from('services').update(dbUpdates).eq('id', id);
        } else {
            // Firebase
            return db.collection('services').doc(id).update(updates);
        }
    },

    async deleteService(id) {
        if (id.toString().includes('-')) {
            return supabase.from('services').delete().eq('id', id);
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
        supabase.from('expenses').select('*').eq('user_email', user.email).then(({ data }) => {
            if (data) {
                sbExpenses = data;
                mergeAndCallback();
            }
        });

        return fbUnsub;
    },

    async addExpense(expense) {
        const user = auth.currentUser;
        if (!user) throw new Error("Must be logged in");

        // Save to Supabase
        return supabase.from('expenses').insert([{
            user_email: user.email,
            category: expense.category,
            amount: expense.amount,
            description: expense.description,
            date: expense.date
        }]);
    },

    async deleteExpense(id) {
        if (id.toString().includes('-')) {
            return supabase.from('expenses').delete().eq('id', id);
        } else {
            return db.collection('expenses').doc(id).delete();
        }
    },

    async getAllServicesForStats() {
        // Fetch from both
        const [fbSnap, sbResult] = await Promise.all([
            db.collection('services').get(),
            supabase.from('services').select('*')
        ]);

        const fbServices = fbSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const sbServices = sbResult.data ? sbResult.data.map(s => ({ ...s, id: s.id, subType: s.sub_type, startTime: s.start_time, endTime: s.end_time })) : [];

        return [...fbServices, ...sbServices];
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

        return {
            userCount: users.length,
            activeUsers: users.filter(u => u.lastLogin && new Date(u.lastLogin) > new Date(Date.now() - 86400000)).length,
            totalRevenue,
            totalHours,
            topUsers: sortedUsers,
            chartData: {
                dates: dates,
                counts: dates.map(d => servicesByDate[d]),
                revenue: dates.map(d => revenueByDate[d]),
                types: [], // Can be extracted if needed
                typeCounts: []
            }
        };
    }
};
