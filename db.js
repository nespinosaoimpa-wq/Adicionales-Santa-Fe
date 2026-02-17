/**
 * Database Layer (Simulated Firebase)
 * Acts as a Repository Pattern over localStorage
 */
const DB = {
    // Keys
    KEYS: {
        USERS: 'adicionales_sf_users',
        SERVICES: 'adicionales_sf_services',
        LOGS: 'adicionales_sf_logs'
    },

    // --- USERS ---
    getUsers() {
        const users = JSON.parse(localStorage.getItem(this.KEYS.USERS) || '[]');
        if (users.length === 0) return this._seedUsers();
        return users;
    },

    currentUser() {
        return JSON.parse(localStorage.getItem('adicionales_santa_fe_user'));
    },

    saveUser(user) {
        const users = this.getUsers();
        const existing = users.findIndex(u => u.email === user.email);
        if (existing >= 0) {
            users[existing] = { ...users[existing], ...user, lastLogin: new Date().toISOString() };
        } else {
            users.push({ ...user, id: Date.now(), role: 'user', joined: new Date().toISOString() });
        }
        localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));
        localStorage.setItem('adicionales_santa_fe_user', JSON.stringify(user));
    },

    // --- SERVICES ---
    getServices(filters = {}) {
        let services = JSON.parse(localStorage.getItem(this.KEYS.SERVICES) || '[]');
        if (services.length === 0) services = this._seedServices();

        // Filter by user if not admin
        // In a real DB, this would be a query
        return services;
    },

    addService(service) {
        const services = this.getServices();
        const newService = { ...service, id: Date.now(), timestamp: new Date().toISOString() };
        services.push(newService);
        localStorage.setItem(this.KEYS.SERVICES, JSON.stringify(services));
        return newService;
    },

    // --- ADMIN ANALYTICS ---
    getStats() {
        const users = this.getUsers();
        const services = this.getServices();

        // Aggregate Data
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
            dbSize: JSON.stringify(localStorage).length / 1024 // KB
        };
    },

    // --- INTERNAL SEEDS ---
    _seedUsers() {
        const seeds = [
            { id: 1, name: "Admin Principal", email: "admin@santafe.gov.ar", role: "admin", avatar: "https://ui-avatars.com/api/?name=Admin&background=0d59f2&color=fff", lastLogin: new Date().toISOString() },
            { id: 2, name: "Oficial Martínez", email: "martinez@policia.ar", role: "user", avatar: "https://ui-avatars.com/api/?name=OM&background=random", lastLogin: new Date().toISOString() },
            { id: 3, name: "Agente Gómez", email: "gomez@policia.ar", role: "user", avatar: "https://ui-avatars.com/api/?name=AG&background=random", lastLogin: new Date(Date.now() - 100000000).toISOString() }
        ];
        localStorage.setItem(this.KEYS.USERS, JSON.stringify(seeds));
        return seeds;
    },

    _seedServices() {
        // Generate some realistic fake data for charts
        const types = ['Public', 'Private', 'OSPES'];
        const services = [];
        for (let i = 0; i < 20; i++) {
            const date = new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString().split('T')[0];
            services.push({
                id: i,
                date: date,
                type: types[Math.floor(Math.random() * types.length)],
                hours: 4,
                total: 5000 + Math.floor(Math.random() * 5000),
                location: 'Ubicación Simulada ' + i
            });
        }
        localStorage.setItem(this.KEYS.SERVICES, JSON.stringify(services));
        return services;
    }
};
