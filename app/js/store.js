/**
 * Adicionales Santa Fe - State Management (Store)
 */

const store = {
    user: null, // Will be set by Firebase Auth
    services: [], // Synced with Firestore
    expenses: [], // Synced with Firestore
    // Cache for Admin
    allUsers: [],

    // Config (Defaults from SPA 2026 Decree)
    serviceConfig: {
        'Public': { 'Ordinaria': 9500, 'Extraordinaria': 11400 },
        'Private': { 'Ordinaria': 12825, 'Extraordinaria': 15390 },
        'OSPES': { 'Ordinaria': 8000, 'Extraordinaria': 9600 },
    },

    // Notification Settings
    notificationSettings: {
        enabled: false,
        leadTime: 60 // minutes
    },

    // Auth
    isAuthenticated() {
        return !!this.user;
    },

    // Actions
    async login(email, password) {
        try {
            await DB.login(email, password);
            showToast("Sesión iniciada");
        } catch (e) {
            console.error(e);
            showToast("Error: " + e.message);
        }
    },

    async register(email, password, name) {
        try {
            const userCred = await DB.register(email, password);
            // Save extra details
            await DB.saveUser({
                email: userCred.user.email,
                name: name,
                role: 'user',
                avatar: `https://ui-avatars.com/api/?background=random&color=fff&name=${name}`,
                serviceConfig: this.serviceConfig,
                notificationSettings: this.notificationSettings
            });
            showToast("Cuenta creada");
        } catch (e) {
            console.error(e);
            showToast("Error: " + e.message);
        }
    },

    // --- Profile Actions ---

    async updateProfile(name, avatar) {
        if (!this.user) return;

        this.user.name = name;
        if (avatar) this.user.avatar = avatar;

        try {
            await DB.saveUser(this.user);
            showToast("Perfil actualizado");
            if (router.currentRoute === '#profile') renderProfile(document.getElementById('app'));
        } catch (e) {
            showToast("Error al guardar perfil");
            console.error(e);
        }
    },

    async handleAvatarUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            showToast("⚠️ La imagen es muy pesada (max 2MB)");
            return;
        }

        const img = document.getElementById('profile-avatar-img');
        const originalSrc = img.src;

        try {
            // Preview
            const reader = new FileReader();
            reader.onload = (e) => img.src = e.target.result;
            reader.readAsDataURL(file);

            showToast("⏳ Subiendo foto...");
            const downloadURL = await DB.uploadAvatar(file, this.user.email);

            if (downloadURL) {
                await this.updateProfile(this.user.name, downloadURL);
                showToast("✅ Foto actualizada");
            }
        } catch (e) {
            console.error("Upload error:", e);
            showToast("❌ Error al subir foto");
            img.src = originalSrc;
        }
    },

    async requestNotificationPermission() {
        if (!("Notification" in window)) {
            showToast("Tu navegador no soporta notificaciones");
            return;
        }

        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            // Toggle
            this.notificationSettings.enabled = !this.notificationSettings.enabled;
            showToast(this.notificationSettings.enabled ? "Notificaciones Activadas" : "Notificaciones Desactivadas");

            // Persist if user exists
            if (this.user) {
                this.user.notificationSettings = this.notificationSettings;
                await DB.saveUser(this.user);
            }

            // Re-render to show state
            if (router.currentRoute === '#profile') renderProfile(document.getElementById('app'));

            // Test Notification if just enabled
            if (this.notificationSettings.enabled) {
                new Notification("Adicionales Santa Fe", {
                    body: "¡Notificaciones configuradas correctamente!",
                    icon: "./icon.png"
                });
            }
        } else {
            showToast("Permiso denegado o bloqueado");
        }
    },

    async addService(service) {
        const tempId = 'temp-svc-' + Date.now();
        const optimisticService = {
            id: tempId,
            ...service,
            status: 'pending'
        };

        try {
            // Optimistic Update
            this.services.unshift(optimisticService);
            if (router.currentRoute === '#agenda') renderAgenda(document.getElementById('app'));

            const result = await DB.addService(service);

            // Reemplazar tempId con el real si es necesario (el listener lo hará eventualmente, pero esto ayuda)
            if (result && result.id) {
                const idx = this.services.findIndex(s => s.id === tempId);
                if (idx !== -1) this.services[idx].id = result.id;
            }

            showToast("✅ Servicio guardado");
        } catch (e) {
            console.error("Error saving service:", e);
            // Rollback
            this.services = this.services.filter(s => s.id !== tempId);
            if (router.currentRoute === '#agenda') renderAgenda(document.getElementById('app'));

            if (e.message.includes("offline") || e.code === 'unavailable') {
                showToast("❌ Sin conexión - Intenta más tarde");
            } else {
                showToast("❌ Error al guardar: " + e.message);
            }
            throw e;
        }
    },

    async deleteService(id) {
        try {
            await DB.deleteService(id);
            showToast("Servicio eliminado");
        } catch (e) {
            console.error(e);
            showToast("Error al eliminar");
        }
    },

    async updateLocalConfig(type, subType, value) {
        if (this.user && this.user.serviceConfig) {
            if (!this.user.serviceConfig[type]) this.user.serviceConfig[type] = {};
            this.user.serviceConfig[type][subType] = parseFloat(value);
        } else {
            this.serviceConfig[type][subType] = parseFloat(value);
        }
    },

    renameServiceSubtype(type, oldName, newName) {
        if (!newName || newName === oldName) return;

        let configTarget = this.user && this.user.serviceConfig ? this.user.serviceConfig : this.serviceConfig;

        if (configTarget[type] && configTarget[type][oldName] !== undefined) {
            const value = configTarget[type][oldName];
            delete configTarget[type][oldName];
            configTarget[type][newName] = value;

            if (router.currentRoute === '#profile') renderProfile();
        }
    },

    async saveProfile() {
        const name = document.getElementById('profile-name')?.innerText || this.user.name;
        const alias = document.getElementById('user-alias-input')?.value || this.user.alias || '';

        try {
            showToast("⏳ Guardando cambios...");
            await DB.updateUser({
                name,
                alias,
                avatar: this.user.avatar,
                notificationSettings: this.notificationSettings
            });
            // Update local state
            this.user.name = name;
            this.user.alias = alias;
            showToast("✅ Perfil y Tarifas actualizadas");
            await this.saveConfig(); // Seguir guardando config de servicios
        } catch (e) {
            showToast("❌ Error al guardar perfil");
            console.error(e);
        }
    },

    async saveConfig() {
        if (!this.user) return;
        try {
            await DB.saveUser(this.user);
            showToast("Configuración guardada y sincronizada");
        } catch (e) {
            console.error(e);
            showToast("Error al guardar");
        }
    },

    async resetPassword(email) {
        try {
            await auth.sendPasswordResetEmail(email);
            showToast(`Correo enviado a ${email}`);
        } catch (e) {
            showToast("Error: " + e.message);
        }
    },

    showPasswordReset() {
        const email = prompt("Ingresa tu email para recuperar la contraseña:");
        if (email) {
            this.resetPassword(email);
        }
    },

    async logout() {
        await DB.logout();
    },

    async loginWithGoogle() {
        try {
            await DB.loginWithGoogle();
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async shareApp() {
        const shareData = {
            title: 'Adicionales Santa Fe',
            text: 'Gestiona tus servicios de policía adicional y calcula tus ganancias fácil.',
            url: window.location.origin + window.location.pathname
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
                showToast("¡Gracias por compartir!");
            } else {
                const text = `¡Probá esta App para Adicionales! ${shareData.url}`;
                window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
            }
        } catch (e) {
            console.error("Share error:", e);
        }
    },

    async installApp() {
        if (!this.deferredPrompt) return;
        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        console.log(`User response to install prompt: ${outcome}`);
        this.deferredPrompt = null;
        document.getElementById('install-banner')?.classList.add('hidden');
    },

    toggleDebug() {
        const el = document.getElementById('debug-console-container');
        if (el) el.classList.toggle('hidden');
    },

    async forceUpdate() {
        if ('serviceWorker' in navigator) {
            const registrations = await navigator.serviceWorker.getRegistrations();
            for (let registration of registrations) {
                await registration.unregister();
            }
            window.location.reload(true);
        } else {
            window.location.reload(true);
        }
    },

    init() {
        console.log("App v527.4-FINAL - Suite Asistente Virtual PRO");

        document.body.insertAdjacentHTML('beforeend', renderOfflineBanner());
        document.body.insertAdjacentHTML('beforeend', renderInstallBanner());

        // iOS Specific Prompt logic
        if (window.isIOS() && !window.isInStandaloneMode()) {
            setTimeout(() => {
                const existing = document.getElementById('ios-install-banner');
                if (!existing) {
                    document.body.insertAdjacentHTML('beforeend', renderIOSInstallPrompt());
                }
            }, 4000);
        }

        setTimeout(() => showAnnouncementModal(), 2000);

        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .catch((e) => console.error("Persistence Error:", e));

        this.unsub = auth.onAuthStateChanged(async user => {
            if (user) {
                console.log("🔐 User Logged In:", user.email);
                try {
                    const dbUser = await DB.getUser(user.email);
                    const baseUser = {
                        email: user.email,
                        role: 'user',
                        serviceConfig: JSON.parse(JSON.stringify(this.serviceConfig)),
                        notificationSettings: { enabled: false, leadTime: 60 },
                        name: user.displayName || user.email.split('@')[0],
                        avatar: user.photoURL || `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${user.email}`
                    };

                    if (dbUser) {
                        this.user = {
                            ...baseUser,
                            ...dbUser,
                            serviceConfig: { ...baseUser.serviceConfig, ...(dbUser.serviceConfig || {}) },
                            notificationSettings: { ...baseUser.notificationSettings, ...(dbUser.notificationSettings || {}) }
                        };
                        if (this.user.name === 'undefined' || !this.user.name) this.user.name = baseUser.name;
                        if (this.user.avatar === 'undefined' || !this.user.avatar) this.user.avatar = baseUser.avatar;
                    } else {
                        this.user = baseUser;
                    }

                    this.serviceConfig = this.user.serviceConfig;
                    this.notificationSettings = this.user.notificationSettings;
                    console.log("✅ User data synchronized:", this.user.email);
                    await DB.saveUser(this.user);

                    this.unsubscribeServices = DB.subscribeToServices(services => {
                        this.services = services;
                        if (this.checkNotifications) this.checkNotifications();
                        if (this.authInitialized) router.handleRoute();
                    });

                    this.unsubscribeAds = DB.subscribeToAds(ads => {
                        this.ads = ads;
                    });

                    this.unsubscribeUsers = DB.subscribeToUsers(users => {
                        this.allUsers = users;
                    });

                    this.unsubscribeExpenses = DB.subscribeToExpenses(expenses => {
                        this.expenses = expenses;
                        if (window.location.hash === '#financial') router.handleRoute();
                    });

                    if (this.checkNotifications) {
                        if (this.notifInterval) clearInterval(this.notifInterval);
                        this.notifInterval = setInterval(() => this.checkNotifications(), 60000);
                    }

                    this.authInitialized = true;
                    router.handleRoute();

                } catch (error) {
                    console.error("❌ Initialization Error:", error.code || error.message);
                    if (!this.user) {
                        this.user = {
                            email: user.email,
                            role: 'user',
                            serviceConfig: this.serviceConfig,
                            notificationSettings: { enabled: false, leadTime: 60 },
                            name: user.displayName || user.email.split('@')[0],
                            avatar: user.photoURL || `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${user.email}`
                        };
                    }
                    this.authInitialized = true;
                    router.handleRoute();
                }
            } else {
                console.log("👋 User Logged Out");
                this.user = null;
                this.services = [];
                if (this.unsubscribeServices) this.unsubscribeServices();
                if (this.unsubscribeUsers) this.unsubscribeUsers();
                if (this.unsubscribeExpenses) this.unsubscribeExpenses();
                if (this.notifInterval) clearInterval(this.notifInterval);
                this.authInitialized = true;
                router.handleRoute();
            }
        });
    },

    exportData() {
        const headers = ['Fecha', 'Tipo', 'Subtipo', 'Horas', 'Inicio', 'Fin', 'Lugar', 'Total', 'Estado'];
        const rows = this.services.map(s => [
            s.date, s.type, s.subType || '-', s.hours, s.startTime, s.endTime, `"${s.location}"`, s.total, s.status
        ]);
        const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'mis_servicios_sf.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast("Exportando CSV...");
    },

    async addExpense(category, amount, description) {
        const tempId = 'temp-' + Date.now();
        try {
            this.expenses.unshift({
                id: tempId,
                category,
                amount: parseFloat(amount),
                description: description || '',
                date: this.getLocalDateString(),
                timestamp: new Date().toISOString()
            });
            if (window.location.hash === '#financial') router.handleRoute();

            await DB.addExpense({
                category,
                amount: parseFloat(amount),
                description: description || '',
                date: this.getLocalDateString()
            });
            showToast(`Gasto de $${parseFloat(amount).toLocaleString('es-AR')} agregado`);
            return true;
        } catch (e) {
            showToast("Error al guardar gasto");
            console.error(e);
            this.expenses = this.expenses.filter(e => e.id !== tempId);
            if (window.location.hash === '#financial') router.handleRoute();
            return false;
        }
    },

    async deleteExpense(id) {
        try {
            await DB.deleteExpense(id);
            showToast("Gasto eliminado");
        } catch (e) {
            showToast("Error al eliminar gasto");
            console.error(e);
        }
    },

    getFormattedDate(dateStr) {
        if (!dateStr) return '';
        const [year, month, day] = dateStr.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        const options = { weekday: 'short', day: 'numeric', month: 'short' };
        return date.toLocaleDateString('es-ES', options);
    },

    getLocalDateString(date = new Date()) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    // Holiday List 2026 (Santa Fe / Argentina) - Extendable
    holidays2026: [
        '2026-01-01', // Año Nuevo
        '2026-02-16', '2026-02-17', // Carnaval
        '2026-03-24', // Memoria
        '2026-04-02', // Malvinas
        '2026-04-03', // Viernes Santo
        '2026-05-01', // Trabajador
        '2026-05-25', // Revolución de Mayo
        '2026-06-15', // Paso a la Inmortalidad de Güemes (Feriado trasladable)
        '2026-06-20', // Belgrano
        '2026-07-09', // Independencia
        '2026-08-17', // San Martín
        '2026-10-12', // Diversidad Cultural
        '2026-11-20', // Soberanía
        '2026-12-08', // Virgen
        '2026-12-25', // Navidad
    ],

    calculateHoursSplit(dateStr, startStr, endStr) {
        if (!dateStr || !startStr || !endStr) return { ord: 0, ext: 0 };

        const [y, m, d] = dateStr.split('-').map(Number);
        const start = new Date(y, m - 1, d, ...startStr.split(':').map(Number));
        let end = new Date(y, m - 1, d, ...endStr.split(':').map(Number));

        if (end < start) {
            end.setDate(end.getDate() + 1);
        }

        let ord = 0;
        let ext = 0;

        // Iterate by 30 minute chunks for precision
        let current = new Date(start);
        const step = 30 * 60 * 1000; // 30 mins

        while (current < end) {
            const next = new Date(current.getTime() + step);
            const actualEnd = next > end ? end : next;
            const chunkHours = (actualEnd - current) / (1000 * 60 * 60);

            const day = current.getDay(); // 0: Dom, 6: Sáb
            const hour = current.getHours();
            const minute = current.getMinutes();
            const timeVal = hour + (minute / 60);

            const currentDateStr = this.getLocalDateString(current);
            const isHoliday = this.holidays2026.includes(currentDateStr);

            let isExtra = false;

            // --- LÓGICA DE EXTRAORDINARIA ---

            // 1. Feriados (Todo el día hasta las 06:00 del día hábil siguiente)
            // Nota: Si es hoy feriado, es Extra. Si es mañana temprano (antes de las 6) Y hoy fue feriado, es Extra.
            const prevDay = new Date(current.getTime() - 24 * 60 * 60 * 1000);
            const wasHoliday = this.holidays2026.includes(this.getLocalDateString(prevDay));

            if (isHoliday) {
                isExtra = true;
            } else if (wasHoliday && timeVal < 6) {
                isExtra = true;
            }
            // 2. Fines de semana (Sáb 12:00 a Lun 06:00)
            else if ((day === 6 && timeVal >= 12) || (day === 0) || (day === 1 && timeVal < 6)) {
                isExtra = true;
            }
            // 3. Horario Nocturno (22:00 a 06:00 de Lun a Vie)
            else if (timeVal >= 22 || timeVal < 6) {
                isExtra = true;
            }

            if (isExtra) ext += chunkHours;
            else ord += chunkHours;

            current = next;
        }

        return { ord, ext };
    }
};

window.store = store;
