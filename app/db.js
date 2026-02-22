/**
 * Database Layer (Firebase Firestore)
 * Reactive Repository Pattern
 */
const DB = {
    // Auth Listeners
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
        provider.setCustomParameters({
            prompt: 'select_account'
        });
        // Popup is more reliable for mobile PWAs
        return auth.signInWithPopup(provider);
    },

    // --- USERS ---
    async saveUser(user) {
        if (!user.email) return;
        // Merge user data into Firestore 'users' collection
        const userRef = db.collection('users').doc(user.email);
        await userRef.set({
            ...user,
            lastLogin: new Date().toISOString()
        }, { merge: true });
    },

    async getUser(email) {
        const doc = await db.collection('users').doc(email).get();
        return doc.exists ? doc.data() : null;
    },

    async updateUserConfig(serviceConfig) {
        const user = auth.currentUser;
        if (!user) return;

        await db.collection('users').doc(user.email).set({
            serviceConfig: serviceConfig
        }, { merge: true });
    },

    async updateUser(profileData) {
        const user = auth.currentUser;
        if (!user) return;

        await db.collection('users').doc(user.email).set({
            ...profileData
        }, { merge: true });

        // Also update Auth profile if possible, but Firestore is our source of truth
    },

    async updateUserRole(email, newRole) {
        if (!email) return;
        const user = auth.currentUser;
        if (!user) throw new Error("Must be logged in");

        // We check admin status via Security Rules, but we can also add a logic check here if we have user role in store
        return db.collection('users').doc(email).update({
            role: newRole
        });
    },

    async uploadAvatar(file, email) {
        if (!file || !email) return null;
        const storageRef = storage.ref(`avatars/${email}/${file.name}`);
        const snapshot = await storageRef.put(file);
        return await snapshot.ref.getDownloadURL();
    },

    subscribeToUsers(callback) {
        return db.collection('users').onSnapshot(snapshot => {
            const users = snapshot.docs.map(doc => doc.data());
            callback(users);
        }, error => {
            console.warn("Users access restricted (Normal user?):", error.message);
            callback([]);
        });
    },

    // --- ADS ---
    subscribeToAds(callback) {
        return db.collection('ads').onSnapshot(snapshot => {
            const ads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            callback(ads);
        }, error => {
            console.warn("Ads not available:", error.message);
            callback([]);
        });
    },

    // --- SERVICES ---
    subscribeToServices(callback) {
        const user = auth.currentUser;
        if (!user) {
            console.warn("No user logged in, cannot subscribe to services");
            callback([]);
            return () => { };
        }

        // Real-time listener for services filtered by user email
        return db.collection('services')
            .where('userEmail', '==', user.email)
            // .orderBy('date', 'desc') // Removed for stability
            .onSnapshot(snapshot => {
                const services = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // Client-side sort
                services.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

                console.log(`📊 Loaded ${services.length} services for ${user.email}`);
                callback(services);
            }, error => {
                console.error("Error syncing services:", error);
                // Fallback to empty array on error
                callback([]);
            });
    },

    async addService(service) {
        const user = auth.currentUser;
        if (!user) throw new Error("Must be logged in");

        return db.collection('services').add({
            ...service,
            userId: user.uid,
            userEmail: user.email,
            timestamp: new Date().toISOString()
        });
    },

    async updateService(id, updates) {
        const user = auth.currentUser;
        if (!user) throw new Error("Must be logged in");
        return db.collection('services').doc(id).update(updates);
    },

    async deleteService(id) {
        const user = auth.currentUser;
        if (!user) throw new Error("Must be logged in");
        return db.collection('services').doc(id).delete();
    },

    // --- EXPENSES ---
    subscribeToExpenses(callback) {
        const user = auth.currentUser;
        if (!user) {
            callback([]);
            return () => { };
        }

        return db.collection('expenses')
            .where('userEmail', '==', user.email)
            // .orderBy('date', 'desc') // Removed to avoid index Requirement
            .onSnapshot(snapshot => {
                const expenses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // Sort client-side
                expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
                callback(expenses);
            }, error => {
                console.error("Error syncing expenses:", error);
                if (error.code === 'failed-precondition') {
                    showToast("⚠️ Creando índice de gastos...");
                    // Open console link if possible or just warn
                }
                callback([]);
            });
    },

    async addExpense(expense) {
        const user = auth.currentUser;
        if (!user) throw new Error("Must be logged in");

        return db.collection('expenses').add({
            ...expense,
            userEmail: user.email,
            timestamp: new Date().toISOString()
        });
    },

    async deleteExpense(id) {
        const user = auth.currentUser;
        if (!user) throw new Error("Must be logged in");
        return db.collection('expenses').doc(id).delete();
    },

    async getAllServicesForStats() {
        const snapshot = await db.collection('services').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    // Helpers for calculating stats from raw data
    calculateStats(users, services) {
        const totalRevenue = services.reduce((acc, s) => acc + (parseFloat(s.total) || 0), 0);
        const totalHours = services.reduce((acc, s) => acc + (parseFloat(s.hours) || 0), 0);

        // Group by Date for Trend
        const revenueByDate = {};
        const servicesByDate = {};

        services.forEach(s => {
            const date = s.date || 'Sin fecha';
            servicesByDate[date] = (servicesByDate[date] || 0) + 1;
            revenueByDate[date] = (revenueByDate[date] || 0) + (parseFloat(s.total) || 0);
        });

        // Group by Type (Public, Private, OSPES)
        const servicesByType = services.reduce((acc, s) => {
            const type = s.type || 'Otro';
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {});

        // User Activity Ranking
        const userRanking = services.reduce((acc, s) => {
            const email = s.userEmail || 'Desconocido';
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
                types: Object.keys(servicesByType),
                typeCounts: Object.values(servicesByType)
            }
        };
    }
};
