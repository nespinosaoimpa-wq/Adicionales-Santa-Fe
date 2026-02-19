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
        if (!user || !user.email) return;

        // Sanitize to ensures only serializable fields go to Firestore
        const cleanUser = {
            email: user.email,
            name: user.name || '',
            avatar: user.avatar || '',
            role: user.role || 'user',
            serviceConfig: user.serviceConfig || {},
            notificationSettings: user.notificationSettings || { enabled: false, leadTime: 60 },
            lastLogin: new Date().toISOString()
        };

        const userRef = db.collection('users').doc(user.email);
        await userRef.set(cleanUser, { merge: true });
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
        return db.collection('services').doc(id).update(updates);
    },

    async deleteService(id) {
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
        return db.collection('expenses').doc(id).delete();
    },

    // --- ADMIN ANALYTICS ---
    // Helpers for calculating stats from raw data
    calculateStats(users, services) {
        const totalRevenue = services.reduce((acc, s) => acc + (s.total || 0), 0);
        const totalHours = services.reduce((acc, s) => acc + (s.hours || 0), 0);

        // Group by Date for Charts
        const servicesByDate = services.reduce((acc, s) => {
            const date = s.date;
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});

        // Group by Type
        const servicesByType = services.reduce((acc, s) => {
            acc[s.type] = (acc[s.type] || 0) + 1;
            return acc;
        }, {});

        return {
            userCount: users.length,
            activeUsers: users.filter(u => new Date(u.lastLogin) > new Date(Date.now() - 86400000)).length,
            totalRevenue,
            totalHours,
            chartData: {
                dates: Object.keys(servicesByDate).sort(),
                counts: Object.values(servicesByDate),
                types: Object.keys(servicesByType),
                typeCounts: Object.values(servicesByType)
            },
            dbSize: "Cloud"
        };
    }
};
