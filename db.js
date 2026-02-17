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

    subscribeToUsers(callback) {
        return db.collection('users').onSnapshot(snapshot => {
            const users = snapshot.docs.map(doc => doc.data());
            callback(users);
        });
    },

    // --- SERVICES ---
    subscribeToServices(callback) {
        // Real-time listener for services
        // In a real app, you'd filter by user.uid here:
        // .where('userId', '==', auth.currentUser.uid)
        return db.collection('services')
            .orderBy('date', 'desc')
            .onSnapshot(snapshot => {
                const services = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                callback(services);
            }, error => {
                console.error("Error syncing services:", error);
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
        return db.collection('expenses')
            .orderBy('date', 'desc')
            .onSnapshot(snapshot => {
                const expenses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                callback(expenses);
            }, error => {
                console.error("Error syncing expenses:", error);
            });
    },

    async addExpense(expense) {
        const user = auth.currentUser;
        if (!user) throw new Error("Must be logged in");

        return db.collection('expenses').add({
            ...expense,
            userId: user.uid,
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
