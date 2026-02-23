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
        try {
            await DB.addService(service);
            showToast("✅ Servicio guardado");
        } catch (e) {
            console.error("Error saving service:", e);
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
        console.log("App v2.1.1 Loaded - Suite Asistente Virtual PRO");

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
    }
};

window.store = store;
