/**
 * Adicionales Santa Fe - Core Logic
 */



// --- 1. STATE MANAGEMENT ---

const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium z-[100] transition-opacity duration-300 opacity-0';
    toast.innerText = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.remove('opacity-0'));

    setTimeout(() => {
        toast.classList.add('opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
};

const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`✅ ${label} copiado`);
    }).catch(err => {
        console.error('Error copying:', err);
        showToast("❌ Error al copiar");
    });
};

// Global Debug Logger
const debugLog = (msg) => {
    const consoleEl = document.getElementById('debug-console');
    if (consoleEl) {
        const time = new Date().toLocaleTimeString();
        consoleEl.innerHTML += `<div>[${time}] ${msg}</div>`;
        consoleEl.scrollTop = consoleEl.scrollHeight;
    }
    console.log('[DEBUG]', msg);
};

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



    async addExpense(category, amount, description) {
        const tempId = 'temp-' + Date.now();
        const expenseObj = {
            category,
            amount: parseFloat(amount),
            description: description || '',
            date: this.getLocalDateString(),
            timestamp: new Date().toISOString()
        };

        try {
            // Optimistic Update
            this.expenses.unshift({ id: tempId, ...expenseObj });
            if (window.location.hash === '#financial') router.handleRoute();

            await DB.addExpense(expenseObj);
            showToast("✅ Gasto agregado");
        } catch (e) {
            console.error(e);
            showToast("Error al agregar gasto");
            // Rollback
            this.expenses = this.expenses.filter(e => e.id !== tempId);
            if (window.location.hash === '#financial') router.handleRoute();
        }
    },

    async deleteExpense(id) {
        // Optimistic Remove
        const previousExpenses = [...this.expenses];
        this.expenses = this.expenses.filter(e => e.id !== id);
        if (window.location.hash === '#financial') router.handleRoute();

        try {
            // If it's a temp ID, we just keep the local removal
            if (!id.toString().startsWith('temp-')) {
                await DB.deleteExpense(id);
            }
            showToast("Gasto eliminado");
        } catch (e) {
            console.error(e);
            showToast("Error al eliminar");
            // Rollback
            this.expenses = previousExpenses;
            if (window.location.hash === '#financial') router.handleRoute();
        }
    },

    // --- Config Actions ---

    updateLocalConfig(type, subType, value) {
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

            // Re-render if in profile
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
            throw e; // Re-throw for button handler
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
            throw e; // Re-throw para que saveAction lo maneje
        }
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

    // Initialization
    init() {
        console.log("App v2.1.1 Loaded - Suite Asistente Virtual PRO");

        // Inject UI Overlays
        document.body.insertAdjacentHTML('beforeend', renderOfflineBanner());
        document.body.insertAdjacentHTML('beforeend', renderInstallBanner());

        // Check for announcements
        setTimeout(() => showAnnouncementModal(), 2000);

        // FORCE PERSISTENCE (Firebase)
        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .catch((e) => console.error("Persistence Error:", e));

        // Source of Truth: Firebase Auth
        this.unsub = auth.onAuthStateChanged(async user => {
            if (user) {
                console.log("🔐 User Logged In:", user.email);

                try {
                    // Load User Config/Profile (WAIT for this!)
                    const dbUser = await DB.getUser(user.email);

                    // Robust Merge: Base User + DB User
                    const baseUser = {
                        email: user.email,
                        role: 'user',
                        serviceConfig: JSON.parse(JSON.stringify(this.serviceConfig)), // Deep clone defaults
                        notificationSettings: { enabled: false, leadTime: 60 },
                        name: user.displayName || user.email.split('@')[0],
                        avatar: user.photoURL || `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${user.email}`
                    };

                    // Deep merge dbUser into baseUser
                    if (dbUser) {
                        this.user = {
                            ...baseUser,
                            ...dbUser,
                            // Ensure these nested objects also merge correctly
                            serviceConfig: { ...baseUser.serviceConfig, ...(dbUser.serviceConfig || {}) },
                            notificationSettings: { ...baseUser.notificationSettings, ...(dbUser.notificationSettings || {}) }
                        };

                        // Sanitize "undefined" artifacts
                        if (this.user.name === 'undefined' || !this.user.name) this.user.name = baseUser.name;
                        if (this.user.avatar === 'undefined' || !this.user.avatar) this.user.avatar = baseUser.avatar;
                    } else {
                        this.user = baseUser;
                    }

                    // Sync global settings with user state
                    this.serviceConfig = this.user.serviceConfig;
                    this.notificationSettings = this.user.notificationSettings;

                    console.log("✅ User data synchronized:", this.user.email);

                    // Save/Update user in DB to ensure defaults are saved if new
                    await DB.saveUser(this.user);

                    // Subscribe to Data
                    this.unsubscribeServices = DB.subscribeToServices(services => {
                        this.services = services;
                        if (this.checkNotifications) this.checkNotifications();
                        // Only handle route if we are already initialized or this is the first load
                        if (this.authInitialized) router.handleRoute();
                    });

                    // Subscribe to Ads (Global)
                    this.unsubscribeAds = DB.subscribeToAds(ads => {
                        this.ads = ads;
                    });

                    // Subscribe to Users (for Admin)
                    this.unsubscribeUsers = DB.subscribeToUsers(users => {
                        this.allUsers = users;
                    });

                    // Subscribe to Expenses
                    this.unsubscribeExpenses = DB.subscribeToExpenses(expenses => {
                        this.expenses = expenses;
                        if (window.location.hash === '#financial') router.handleRoute();
                    });

                    // Interval for alerts
                    if (this.checkNotifications) {
                        if (this.notifInterval) clearInterval(this.notifInterval);
                        this.notifInterval = setInterval(() => this.checkNotifications(), 60000);
                    }

                    // Mark Auth as Initialized
                    this.authInitialized = true;

                    // NOW navigate (after user data is loaded)
                    console.log("🚀 Navigating to requested route");
                    router.handleRoute(); // Re-evaluate route now that we are authenticated

                } catch (error) {
                    console.error("❌ Initialization Error:", error.code || error.message);

                    // Resilience: Ensure user object exists even on partial failures
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

                    // Only show "Offline" if it's a hard connection error, not a permission issue
                    if (error.code === 'permission-denied') {
                        console.warn("Restricted access handled during init.");
                    } else if (error.code === 'unavailable' || error.message.includes('offline')) {
                        showToast("⚠️ Modo offline activo");
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
                router.handleRoute(); // Re-evaluate route (will likely go to #login)
            }
        });
    },

    // Export Data (CSV)
    exportData() {
        const headers = ['Fecha', 'Tipo', 'Subtipo', 'Horas', 'Inicio', 'Fin', 'Lugar', 'Total', 'Estado'];
        const rows = this.services.map(s => [
            s.date,
            s.type,
            s.subType || '-',
            s.hours,
            s.startTime,
            s.endTime,
            `"${s.location}"`,
            s.total,
            s.status
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(r => r.join(','))
        ].join('\n');

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

    // Expense Actions
    async addExpense(category, amount, description) {
        const tempId = 'temp-' + Date.now();
        try {
            // Optimistic Update
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
            // Rollback
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
        // Fix: Parse manually to avoid UTC timezone issues with new Date(isoString)
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

// --- 10. GLOBAL LISTENERS ---
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    store.deferredPrompt = e;
    // Update UI notify the user they can install the PWA
    document.getElementById('install-banner')?.classList.remove('hidden');
});

// App Initiation point
store.init();

// --- GLOBAL HANDLERS ---
window.handleGoogleLogin = async () => {
    try {
        await store.loginWithGoogle();
    } catch (e) {
        showToast("Error Google: " + e.message);
    }
};

window.handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = document.getElementById('password') ? document.getElementById('password').value : prompt("Ingresa tu clave:");

    if (!password) return;

    const btn = event.target.querySelector('button[type="submit"]');
    if (btn) {
        btn.disabled = true;
        btn.innerText = "Ingresando...";
    }

    await store.login(email, password);

    if (btn) {
        btn.disabled = false;
        btn.innerText = "Ingresar";
    }
};

// --- GLOBAL HANDLERS ---
window.handleGoogleLogin = async () => {
    try {
        await store.loginWithGoogle();
    } catch (e) {
        showToast("Error Google: " + e.message);
    }
};

window.handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = document.getElementById('password') ? document.getElementById('password').value : prompt("Ingresa tu contraseña:");

    if (!password) return;

    const btn = event.target.querySelector('button[type="submit"]');
    if (btn) {
        btn.disabled = true;
        btn.innerText = "Ingresando...";
    }

    await store.login(email, password);

    if (btn) {
        btn.disabled = false;
        btn.innerText = "Ingresar";
    }
};

// Handle Google Redirect Result AFTER DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const { data, error } = await supabase.auth.getSession();
        if (data?.session?.user) {
            console.log("✅ Google/OAuth Session active:", data.session.user.email);
        }
    } catch (error) {
        console.error("❌ Auth Error:", error);
    }
});


// --- 2. ROUTER & NAVIGATION ---

const router = {
    currentRoute: '#login',

    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute(); // Initial load
    },

    handleRoute() {
        const hash = window.location.hash || '#login';
        this.currentRoute = hash;

        // 1. SHOW LOADING SCREEN IF AUTH NOT INITIALIZED
        if (!store.authInitialized) {
            console.log("⏳ Waiting for Auth...");
            this.render('#loading');
            return;
        }

        // Auto-login: If user is authenticated and trying to access login, redirect to agenda
        if (hash === '#login' && store.isAuthenticated()) {
            console.log("🔐 User already logged in, redirecting to agenda");
            this.navigateTo('#agenda');
            return;
        }

        // Protect routes that require authentication
        if (!store.isAuthenticated() && hash !== '#login' && hash !== '#signup') {
            console.log("🚫 Unauthorized access attempt to", hash);
            this.navigateTo('#login');
            return;
        }

        // Special Protection for Admin Panel
        if (hash === '#admin' && (!store.user || store.user.role !== 'admin')) {
            console.warn("👮 Direct access to #admin blocked for non-admin");
            showToast("Acceso Restringido");
            this.navigateTo('#agenda');
            return;
        }

        this.render(hash);
    },

    render(route) {
        const app = document.getElementById('app');
        try {
            app.innerHTML = ''; // Clear current view

            switch (route) {
                case '#loading':
                    app.innerHTML = `
                        <div class="min-h-screen flex flex-col justify-center items-center bg-background-dark">
                            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                            <img src="https://ui-avatars.com/api/?name=Adicionales&background=0D8ABC&color=fff&rounded=true" class="size-16 mb-4 animate-pulse">
                            <p class="text-slate-400 text-sm font-medium">Iniciando sesión...</p>
                        </div>
                     `;
                    break;
                case '#login':
                    renderLogin(app);
                    break;
                case '#signup':
                    renderSignup(app);
                    break;
                case '#agenda':
                    renderAgenda(app);
                    break;
                case '#admin':
                    if (store.user && store.user.role === 'admin') {
                        renderAdmin(app);
                    } else {
                        console.error("Critical: Render admin called without admin privileges");
                        showToast("Error de Permisos");
                        window.location.hash = '#agenda';
                    }
                    break;
                case '#control':
                    renderControlPanel(app);
                    break;
                case '#register':
                    renderRegister(app);
                    break;
                case '#financial':
                    renderFinancial(app);
                    break;
                case '#asistente':
                    renderAsistenteHub(app);
                    break;
                case '#asistente/directorio':
                    renderDirectorioPolicial(app);
                    break;
                case '#asistente/checklist':
                    renderChecklistGuardia(app);
                    break;
                case '#asistente/crono':
                    renderCronoCalendario(app);
                    break;
                case '#asistente/centinela':
                    renderCentinela(app);
                    break;
                case '#asistente/partes':
                    renderPartesInteligentes(app);
                    break;
                case '#profile':
                    renderProfile(app);
                    break;
                case '#history':
                    renderHistory(app);
                    break;
                case '#stats':
                    renderStats(app);
                    break;

                // Dynamic Route for Details
                default:
                    if (route.startsWith('#details')) {
                        const urlParams = new URLSearchParams(route.split('?')[1]);
                        const serviceId = urlParams.get('id');
                        if (serviceId) {
                            renderServiceDetails(app, serviceId);
                        } else {
                            window.location.hash = '#agenda';
                        }
                    } else if (route.startsWith('#service/')) {
                        // Backward compat or alternative
                        const serviceId = route.split('/')[1];
                        renderServiceDetails(app, serviceId);
                    } else {
                        window.location.hash = '#agenda';
                    }
            }
        } catch (e) {
            console.error("Render Error:", e);
            app.innerHTML = `
                <div class="p-6 text-center text-red-500">
                    <h2 class="font-bold text-xl mb-2">Error de Carga</h2>
                    <p class="text-sm border p-2 rounded border-red-500/50 bg-red-500/10">${e.message}</p>
                    <button onclick="window.location.reload()" class="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">Recargar</button>
                    <button onclick="localStorage.clear(); window.location.reload()" class="mt-4 block mx-auto text-sm underline text-slate-500">Borrar Datos y Recargar</button>
                </div>
            `;
        }
    },

    navigateTo(route) {
        window.location.hash = route;
    }
};

// --- ADMIN RENDERER ---
async function renderAdmin(container) {
    container.innerHTML = `
        <div class="flex flex-col items-center justify-center h-screen space-y-4 bg-background-dark">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p class="text-slate-500 animate-pulse font-medium">Sincronizando datos globales en vivo...</p>
        </div>
    `;

    let allUsers = [];
    let allServices = [];
    const formatMoney = (v) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(v);

    const updateUI = () => {
        const stats = DB.calculateStats(allUsers, allServices);

        container.innerHTML = `
        <div class="min-h-screen bg-[#0f172a] text-slate-200 font-sans pb-24 animate-fade-in">
            <!-- Glass Header -->
            <header class="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 px-6 h-20 flex items-center justify-between shadow-2xl">
                <div class="flex items-center gap-4">
                    <div class="size-12 bg-gradient-to-br from-primary to-accent-cyan rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                        <span class="material-symbols-outlined text-white text-2xl">analytics</span>
                    </div>
                    <div>
                        <h1 class="text-xl font-black text-white tracking-tight uppercase italic flex items-center gap-2">
                            Admin Hub
                            <span class="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        </h1>
                        <p class="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Monitoreo Real-time</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <button onclick="store.exportGlobalData()" class="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold transition-all flex items-center gap-2 text-slate-300">
                        <span class="material-symbols-outlined text-sm">download</span> Exportar
                    </button>
                    <button onclick="router.navigateTo('#agenda')" class="size-10 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
            </header>

            <main class="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
                
                <!-- KPI Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    ${_renderAdminKPICard('Usuarios Totales', stats.userCount, 'group', 'from-blue-500/20 to-blue-600/5', 'text-blue-400')}
                    ${_renderAdminKPICard('Activos 24h', stats.activeUsers, 'bolt', 'from-green-500/20 to-green-600/5', 'text-green-400')}
                    ${_renderAdminKPICard('Horas Globales', Math.round(stats.totalHours).toLocaleString(), 'schedule', 'from-cyan-500/20 to-cyan-600/5', 'text-cyan-400')}
                    ${_renderAdminKPICard('Caja Global estimada', formatMoney(stats.totalRevenue), 'payments', 'from-amber-500/20 to-amber-600/5', 'text-amber-400')}
                </div>

                <!-- Daily Summary Section (New) -->
                <div class="bg-slate-800/40 backdrop-blur-md rounded-3xl border border-white/5 p-6 shadow-xl">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-lg font-bold text-white flex items-center gap-3 italic uppercase text-xs tracking-widest">
                            <span class="material-symbols-outlined text-primary">calendar_view_day</span>
                            Resumen Diario de Actividad
                        </h3>
                    </div>
                    <div class="overflow-x-auto">
                        <div class="flex gap-4 pb-4">
                            ${stats.dailySummary.slice(0, 10).map(day => `
                                <div class="min-w-[140px] p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                                    <p class="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1">${getFormattedDate(day.date)}</p>
                                    <p class="text-lg font-black text-white">${day.count}</p>
                                    <p class="text-[10px] text-slate-400 mb-2">Servicios</p>
                                    <div class="h-1 w-full bg-primary/20 rounded-full overflow-hidden mb-2">
                                        <div class="h-full bg-primary" style="width: ${Math.min((day.total / 500000) * 100, 100)}%"></div>
                                    </div>
                                    <p class="text-[11px] font-bold text-emerald-400">${formatMoney(day.total)}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Charts & Stats -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- Trend Chart -->
                    <div class="lg:col-span-2 bg-slate-800/40 backdrop-blur-md rounded-3xl border border-white/5 p-6 shadow-xl">
                        <div class="flex items-center justify-between mb-8">
                            <h3 class="text-lg font-bold text-white flex items-center gap-3">
                                <span class="material-symbols-outlined text-primary">trending_up</span>
                                Tendencia de Ingresos
                            </h3>
                        </div>
                        <div class="h-64 relative">
                            <canvas id="adminTrendChart"></canvas>
                        </div>
                    </div>

                    <!-- Ranking -->
                    <div class="bg-slate-800/40 backdrop-blur-md rounded-3xl border border-white/5 p-6 shadow-xl">
                        <h3 class="text-lg font-bold text-white mb-6">Ranking de Actividad</h3>
                        <div class="space-y-4">
                            ${stats.topUsers.map((u, i) => `
                                <div class="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-transparent hover:border-white/10 transition-all">
                                    <div class="flex items-center gap-4">
                                        <span class="size-8 rounded-full bg-slate-700 flex items-center justify-center font-black text-xs text-white/50">${i + 1}</span>
                                        <p class="text-xs font-bold text-white max-w-[120px] truncate">${u.email}</p>
                                    </div>
                                    <p class="text-xs font-black text-emerald-400">${formatMoney(u.total)}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Active Banners -->
                <div class="bg-slate-800/40 backdrop-blur-md rounded-3xl border border-white/5 p-6 shadow-xl">
                    <h3 class="text-lg font-bold text-white mb-6 flex items-center gap-3">
                        <span class="material-symbols-outlined text-amber-500">ads_click</span>
                        Publicidad Activa
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        ${store.ads && store.ads.length > 0 ? store.ads.map(ad => `
                            <div class="relative group rounded-2xl overflow-hidden border border-white/10 aspect-video shadow-lg">
                                <img src="${ad.imageUrl}" class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                    <button onclick="store.deleteAd('${ad.id}')" class="size-10 rounded-full bg-red-500 text-white flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform">
                                        <span class="material-symbols-outlined">delete</span>
                                    </button>
                                </div>
                            </div>
                        `).join('') : '<p class="text-slate-500 text-xs italic">No hay banners configurados</p>'}
                    </div>
                </div>

                <!-- User Table -->
                <div class="bg-slate-800/40 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden shadow-xl">
                    <div class="p-6 border-b border-white/5 flex items-center justify-between">
                        <h3 class="font-bold text-white text-lg italic">Oficiales Registrados</h3>
                        <span class="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black text-slate-500">${allUsers.length} TOTAL</span>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-sm">
                            <thead class="bg-white/2 uppercase text-[10px] font-black text-slate-500 tracking-widest border-b border-white/5">
                                <tr>
                                    <th class="px-6 py-4">Oficial</th>
                                    <th class="px-6 py-4">Rango</th>
                                    <th class="px-6 py-4 text-center">Conexión</th>
                                    <th class="px-6 py-4 text-right">Acción</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-white/5">
                                ${allUsers.map(u => `
                                    <tr class="hover:bg-white/[0.02] transition-colors group">
                                        <td class="px-6 py-4">
                                            <div class="flex items-center gap-3">
                                                <div class="size-8 rounded-full bg-slate-700">
                                                    <img src="${u.avatar || 'https://ui-avatars.com/api/?name=' + u.name}" class="w-full h-full rounded-full object-cover">
                                                </div>
                                                <div>
                                                    <p class="font-bold text-white text-xs">${u.name || 'Oficial'}</p>
                                                    <p class="text-[9px] text-slate-500 font-mono">${u.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4">
                                            <span class="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${u.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-500/20 text-slate-400'}">
                                                ${u.role || 'user'}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 text-center text-[10px] text-slate-400">
                                            ${u.lastLogin ? _formatAdminDate(u.lastLogin) : 'N/A'}
                                        </td>
                                        <td class="px-6 py-4 text-right">
                                            <button onclick="store.changeUserRole('${u.email}', '${u.role === 'admin' ? 'user' : 'admin'}')" class="text-[9px] font-bold text-primary hover:underline">
                                                ${u.role === 'admin' ? 'Bajar' : 'Subir'}
                                            </button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
        `;

        _mountAdminCharts(stats.chartData);
    };

    // Subscriptions
    const unsubUsers = DB.subscribeToUsers(data => {
        allUsers = data;
        updateUI();
    });

    const unsubServices = DB.subscribeToAllServices(data => {
        allServices = data;
        updateUI();
    });

    const unsubReviews = DB.subscribeToReviews(newReview => {
        showToast(`⭐ Nueva Reseña: "${newReview.comment}" - ${newReview.user_email}`);
    });

    // Cleanup when navigating away
    const originalNavigate = router.navigateTo;
    router.navigateTo = (route) => {
        unsubUsers();
        unsubServices();
        unsubReviews();
        router.navigateTo = originalNavigate;
        router.navigateTo(route);
    };
}

// --- ADMIN HELPERS & ACTIONS (Isolated from Render Cycle) ---

function _renderAdminKPICard(title, value, icon, gradient, textColor) {
    return `
        <div class="bg-slate-800/40 backdrop-blur-md rounded-3xl border border-white/5 p-6 shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-all">
            <div class="absolute -right-4 -top-4 size-24 bg-gradient-to-br ${gradient} rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
            <div class="flex items-center gap-4 relative z-10">
                <div class="size-12 rounded-2xl bg-white/5 flex items-center justify-center ${textColor}">
                    <span class="material-symbols-outlined text-2xl">${icon}</span>
                </div>
            </div>
            <div class="mt-4 relative z-10">
                <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest">${title}</p>
                <p class="text-2xl font-black text-white mt-1">${value}</p>
            </div>
        </div>
    `;
}

function _mountAdminCharts(data) {
    const ctxTrend = document.getElementById('adminTrendChart')?.getContext('2d');
    const ctxType = document.getElementById('adminTypeChart')?.getContext('2d');
    if (!ctxTrend || !ctxType) return;

    if (window.adminChartTrend) window.adminChartTrend.destroy();
    if (window.adminChartType) window.adminChartType.destroy();

    window.adminChartTrend = new Chart(ctxTrend, {
        type: 'line',
        data: {
            labels: data.dates.slice(-15),
            datasets: [{
                label: 'Volumen ($)',
                data: data.revenue.slice(-15),
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#4f46e5'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, border: { display: false }, ticks: { color: '#64748b', font: { size: 10 } } },
                x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 10 } } }
            }
        }
    });

    window.adminChartType = new Chart(ctxType, {
        type: 'doughnut',
        data: {
            labels: data.types,
            datasets: [{
                data: data.typeCounts,
                backgroundColor: ['#4f46e5', '#22c55e', '#eab308', '#ec4899', '#8b5cf6'],
                borderWidth: 0,
                hoverOffset: 20
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: { position: 'bottom', labels: { color: '#64748b', padding: 20, font: { weight: 'bold', size: 10 } } }
            }
        }
    });
}

function _formatAdminDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

store.changeUserRole = async (email, newRole) => {
    if (!confirm(`¿Confirmas cambiar a ${email} al rol: ${newRole}?`)) return;
    try {
        await DB.updateUserRole(email, newRole);
        showToast("Rol actualizado");
        if (window.location.hash === '#admin') router.handleRoute();
    } catch (e) {
        showToast("Error: " + e.message);
    }
};

store.exportGlobalData = async () => {
    try {
        showToast("⏳ Generando reporte global...");
        const services = await DB.getAllServicesForStats();
        let csv = "Fecha,Usuario,Tipo,Sector,Horas,Total,Ubicacion\n";
        services.forEach(s => {
            csv += `"${s.date}","${s.userEmail}","${s.type}","${s.sector}","${s.hours}","${s.total}","${s.location || '-'}"\n`;
        });
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', `Adicionales_Global_${new Date().toISOString().split('T')[0]}.csv`);
        a.click();
        showToast("✅ Reporte descargado");
    } catch (e) {
        showToast("Error al exportar");
    }
};

store.filterUserTable = (query) => {
    const rows = document.querySelectorAll('#userAdminTable tbody tr');
    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
    });
};

store.handleAddAd = async (form) => {
    const imageUrl = form.imageUrl.value;
    const linkUrl = form.linkUrl.value;
    try {
        await DB.addAd({ imageUrl, linkUrl });
        showToast("Anuncio creado correctamente");
        form.reset();
        if (window.location.hash === '#admin') router.handleRoute();
    } catch (e) {
        showToast("Error al crear anuncio");
    }
};

store.deleteAd = async (id) => {
    if (confirm("¿Eliminar este anuncio?")) {
        await DB.deleteAd(id);
        if (window.location.hash === '#admin') router.handleRoute();
    }
};

// --- 3. AUTH VIEW RENDERERS ---

function renderLogin(container) {
    container.innerHTML = `
        <div class="min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8 bg-background-dark">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm text-center">
                <div class="mx-auto size-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary border border-primary/30 mb-6">
                    <span class="material-symbols-outlined text-4xl">security</span>
                </div>
                <h2 class="text-3xl font-bold tracking-tight text-white">Bienvenido</h2>
                <p class="mt-2 text-sm text-slate-400">Ingresa a tu cuenta para continuar</p>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
                <!-- Google Button -->
                <button onclick="handleGoogleLogin()" class="flex w-full justify-center items-center gap-3 rounded-xl bg-white px-4 py-4 text-base font-semibold text-slate-900 shadow-lg hover:bg-slate-50 transition-all active:scale-95">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-6 h-6" alt="Google">
                    Continuar con Google
                </button>
                
                <div class="relative">
                    <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-white/10"></div></div>
                    <div class="relative flex justify-center text-sm"><span class="bg-background-dark px-2 text-slate-500">O con tu email</span></div>
                </div>

                <form class="space-y-4" onsubmit="handleLogin(event)">
                    <div>
                        <label for="email" class="block text-sm font-medium leading-6 text-slate-300">Email / Legajo</label>
                        <div class="mt-2">
                            <input id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-xl border-0 bg-white/5 py-3 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-4">
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm font-medium leading-6 text-slate-300">Contraseña</label>
                            <div class="text-sm">
                                <a href="#" onclick="store.showPasswordReset()" class="font-semibold text-primary hover:text-primary/80">¿Olvidaste tu clave?</a>
                            </div>
                        </div>
                        <div class="mt-2">
                            <input id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-xl border-0 bg-white/5 py-3 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-4">
                        </div>
                    </div>

                    <div>
                        <button type="submit" class="flex w-full justify-center rounded-xl bg-primary px-3 py-3 text-sm font-bold leading-6 text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all shadow-lg shadow-primary/20 active:scale-95">
                            Ingresar
                        </button>
                    </div>
                </form>

            <div class="mt-8 text-center sm:mx-auto sm:w-full sm:max-w-sm">
                <p class="text-slate-500 text-xs text-center">
                    ¿No tienes cuenta? <a href="#signup" class="text-primary font-bold hover:underline">Regístrate gratis</a>
                </p>

                <div class="mt-6 border-t border-white/5 pt-4 text-center">
                    <p class="text-[10px] text-slate-500 font-mono">v2.1.1 (Suite Asistente Virtual PRO)</p>
                </div>
            </div>
        </div>
    `;

    window.handleGoogleLogin = () => {
        const btn = event.target.closest('button');
        btn.disabled = true;
        btn.innerHTML = '<div class="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900 mx-auto"></div>';

        store.loginWithGoogle()
            .then(() => {
                // Success - onAuthStateChanged will handle navigation
                showToast("¡Bienvenido!");
            })
            .catch(e => {
                // Error - restore button
                btn.disabled = false;
                btn.innerHTML = '<img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-6 h-6 inline mr-2">Continuar con Google';
                showToast("Error: " + e.message);
            });
    };

    window.handleLogin = (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        store.login(email, password);
    }
}

function renderSignup(container) {
    container.innerHTML = `
        <div class="min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8 bg-background-dark">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm text-center">
                 <button onclick="router.navigateTo('#login')" class="absolute top-6 left-6 text-slate-400 hover:text-white flex items-center gap-1">
                    <span class="material-symbols-outlined">arrow_back</span> Atrás
                </button>
                <div class="mx-auto size-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary border border-primary/30 mb-6">
                    <span class="material-symbols-outlined text-4xl">person_add</span>
                </div>
                <h2 class="text-3xl font-bold tracking-tight text-white">Crear Cuenta</h2>
                <p class="mt-2 text-sm text-slate-400">Comienza a gestionar tus adicionales hoy</p>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form class="space-y-4" onsubmit="handleSignup(event)">
                    <div class="grid grid-cols-2 gap-4">
                         <div>
                            <label class="block text-sm font-medium leading-6 text-slate-300">Nombre</label>
                            <div class="mt-2">
                                <input name="name" type="text" required class="block w-full rounded-xl border-0 bg-white/5 py-3 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-4">
                            </div>
                        </div>
                         <div>
                            <label class="block text-sm font-medium leading-6 text-slate-300">Apellido</label>
                            <div class="mt-2">
                                <input name="lastname" type="text" required class="block w-full rounded-xl border-0 bg-white/5 py-3 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-4">
                            </div>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium leading-6 text-slate-300">Email</label>
                        <div class="mt-2">
                            <input id="s-email" name="email" type="email" autocomplete="email" required class="block w-full rounded-xl border-0 bg-white/5 py-3 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-4">
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium leading-6 text-slate-300">Contraseña</label>
                        <div class="mt-2">
                            <input name="password" type="password" required class="block w-full rounded-xl border-0 bg-white/5 py-3 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-4">
                        </div>
                    </div>

                    <div>
                        <button type="submit" class="flex w-full justify-center rounded-xl bg-primary px-3 py-3 text-sm font-bold leading-6 text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all shadow-lg shadow-primary/20 mt-6">
                            Crear Cuenta
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

    window.handleSignup = (e) => {
        e.preventDefault();
        const email = document.getElementById('s-email').value;
        const password = document.querySelector('input[name="password"]').value;
        const name = document.querySelector('input[name="name"]').value;
        store.register(email, password, name);
    }
}

// --- 4. APP VIEWS ---

/**
 * Render Agenda View
 * matches: agenda_y_calendario_de_turnos/code.html
 */
function renderAgenda(container) {
    // State for Calendar View
    if (!store.viewDate) store.viewDate = new Date();

    // Ensure we stick to the viewDate month, but if selectedDate is set, we might want to be there? 
    // Let's keep viewDate independent so user can browse.

    const year = store.viewDate.getFullYear();
    const month = store.viewDate.getMonth();
    const currentMonthLabel = store.viewDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });

    const selectedDate = store.selectedDate || store.getLocalDateString();

    // Get services for selected date
    const dayServices = store.services.filter(s => s.date === selectedDate);

    // Find next shift (first service in future)
    const nextShift = store.services
        .filter(s => new Date(s.date + 'T' + (s.time || '00:00')) > new Date())
        .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

    const html = `
        <!-- Header -->
        <header class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 pt-12 pb-4">
            <div class="flex justify-between items-center">
                <div>
                    <h1 class="text-2xl font-bold tracking-tight dark:text-white">Mi Agenda</h1>
                    <div class="flex items-center gap-2">
                        <button id="btn-prev-month" class="text-slate-400 hover:text-primary"><span class="material-symbols-outlined text-sm">arrow_back_ios</span></button>
                        <p class="text-sm text-slate-500 dark:text-slate-400 capitalize w-24 text-center select-none">${currentMonthLabel}</p>
                        <button id="btn-next-month" class="text-slate-400 hover:text-primary"><span class="material-symbols-outlined text-sm">arrow_forward_ios</span></button>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button onclick="store.shareApp()" class="size-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center border border-primary/20 shadow-lg shadow-primary/10">
                        <span class="material-symbols-outlined text-xl">share</span>
                    </button>
                    <button onclick="store.toggleDebug()" class="size-10 rounded-full bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-white transition-all flex items-center justify-center border border-white/5 shadow-xl">
                        <span class="material-symbols-outlined text-xl">terminal</span>
                    </button>
                    <button onclick="showToast('Sin notificaciones nuevas')" class="size-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                        <span class="material-symbols-outlined">notifications</span>
                    </button>
                </div>
                    <div onclick="router.navigateTo('#profile')" class="size-10 rounded-full overflow-hidden border-2 border-primary/20 cursor-pointer hover:scale-105 transition-transform">
                        <img class="w-full h-full object-cover" src="${store.user.avatar}" />
                    </div>
                </div>
            </div>
        </header>

        <main class="flex-1 overflow-y-auto px-6 space-y-8 pb-32">
            <!-- Next Shift Hero Card -->
            ${nextShift ? `
            <section class="mt-4">
                <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-blue-700 p-6 text-white shadow-xl shadow-primary/20">
                    <div class="flex justify-between items-start mb-4">
                        <div class="space-y-1">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm">
                                Siguiente Servicio
                            </span>
                            <h2 class="text-xl font-bold">Adicional ${nextShift.type}</h2>
                        </div>
                        <div class="flex flex-col items-end">
                             <span class="material-symbols-outlined text-white/80">alarm</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-4 mb-6">
                        <div class="p-3 bg-white/10 rounded-xl">
                            <span class="material-symbols-outlined text-3xl">timer</span>
                        </div>
                        <div>
                            <p class="text-3xl font-bold tracking-tighter">${nextShift.hours}h</p>
                            <p class="text-xs opacity-80">${store.getFormattedDate(nextShift.date)} • ${nextShift.location}</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                        <div>
                            <p class="text-[10px] uppercase font-bold opacity-60">Duración</p>
                            <p class="font-medium">${nextShift.hours} Horas</p>
                        </div>
                        <div>
                            <p class="text-[10px] uppercase font-bold opacity-60">Pago Estimado</p>
                            <p class="font-medium">$${(nextShift.total || 0).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </section>
            ` : ''}

            <!-- Calendar Section -->
            <section class="space-y-4">
                <div class="flex justify-between items-center">
                    <h3 class="font-bold text-lg dark:text-white">Calendario</h3>
                    <div class="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                        <button onclick="store.viewDate = new Date(); renderAgenda(document.getElementById('app'))" class="px-3 py-1 text-xs font-semibold rounded-md bg-white dark:bg-slate-700 shadow-sm dark:text-white">Hoy</button>
                    </div>
                </div>
                <div class="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm">
                    <!-- Calendar Grid Header -->
                    <div class="grid grid-cols-7 gap-1 mb-2">
                         ${['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'].map(d =>
        `<div class="text-center text-[10px] font-bold text-slate-400 uppercase">${d}</div>`
    ).join('')}
                    </div>
                    <!-- Calendar Grid -->
                    <div class="grid grid-cols-7 gap-y-2" id="calendar-grid">
                        ${generateCalendarGrid(year, month, selectedDate)}
                    </div>
                </div>
            </section>

            <!-- Shifts List -->
            <section class="space-y-4">
                <h3 class="font-bold text-lg dark:text-white">Turnos para el ${store.getFormattedDate(selectedDate)}</h3>
                <div class="space-y-3">
                    ${dayServices.length > 0 ? dayServices.map((s, i) => renderServiceCard(s, i)).join('') :
            `<div class="flex flex-col items-center py-10 text-center animate-slide-up">
                <div class="size-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span class="material-symbols-outlined text-3xl text-primary/40">event_busy</span>
                </div>
                <p class="text-sm font-semibold dark:text-white mb-1">Sin servicios</p>
                <p class="text-xs text-slate-400 mb-4">No hay turnos para esta fecha</p>
                <button onclick="router.navigateTo('#register')" class="px-5 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-lg shadow-primary/20 active:scale-95 transition-transform">
                    + Registrar Servicio
                </button>
            </div>`}
                </div>
            </section>
        </main>
        ${renderBottomNav('agenda')}
    `;

    container.innerHTML = html;

    // Attach listeners
    document.querySelectorAll('.calendar-day').forEach(el => {
        el.addEventListener('click', (e) => {
            store.selectedDate = e.currentTarget.dataset.date;
            renderAgenda(container);
        });
    });

    // Month Nav Listeners
    document.getElementById('btn-prev-month').addEventListener('click', () => {
        store.viewDate.setMonth(store.viewDate.getMonth() - 1);
        renderAgenda(container);
    });

    document.getElementById('btn-next-month').addEventListener('click', () => {
        store.viewDate.setMonth(store.viewDate.getMonth() + 1);
        renderAgenda(container);
    });
}

function generateCalendarGrid(year, month, selectedDate) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let html = '';

    // Empty slots
    for (let i = 0; i < firstDay; i++) {
        html += `<div class="py-2"></div>`;
    }

    // Days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isSelected = dateStr === selectedDate;
        const hasService = store.services.some(s => s.date === dateStr);
        const isToday = store.getLocalDateString() === dateStr;

        // Colors
        const hasPublic = store.services.some(s => s.date === dateStr && s.type === 'Public');
        const hasPrivate = store.services.some(s => s.date === dateStr && s.type === 'Private');

        let dots = '';
        if (hasPublic) dots += `<div class="size-1 rounded-full bg-primary"></div>`;
        if (hasPrivate) dots += `<div class="size-1 rounded-full bg-service-private"></div>`;

        html += `
            <div class="flex flex-col items-center py-2 relative calendar-day cursor-pointer" data-date="${dateStr}">
                ${isSelected ? `<div class="absolute inset-0 bg-primary/10 rounded-lg border border-primary/20"></div>` : ''}
                <span class="relative z-10 font-bold ${isSelected ? 'text-primary' : (isToday ? 'text-accent-cyan' : 'text-slate-500 dark:text-slate-300')}">${day}</span>
                <div class="flex gap-0.5 mt-1 relative z-10 h-1">
                    ${dots}
                </div>
            </div>
        `;
    }
    return html;
}

function renderServiceCard(service, index = 0) {
    const isPublic = service.type === 'Public';
    const gradientFrom = isPublic ? 'from-primary' : 'from-purple-500';
    const gradientTo = isPublic ? 'to-blue-400' : 'to-pink-500';
    const textColor = isPublic ? 'text-primary' : 'text-purple-400';
    const bgSoft = isPublic ? 'bg-primary/10' : 'bg-purple-500/10';
    const icon = isPublic ? 'account_balance' : 'storefront';
    const typeLabel = isPublic ? 'Público' : (service.type === 'OSPES' ? 'OSPES' : 'Privado');

    const timeRange = service.startTime && service.endTime ? `${service.startTime} - ${service.endTime}` : 'Horario no especificado';
    const subType = service.subType || '';

    const today = store.getLocalDateString();
    const isFuture = service.date > today;
    let statusLabel = 'Pendiente';
    let statusColor = 'text-amber-400';
    let statusBg = 'bg-amber-400/10';
    let statusDot = 'bg-amber-400';

    if (service.status === 'paid') {
        statusLabel = 'Liquidado';
        statusColor = 'text-green-400';
        statusBg = 'bg-green-400/10';
        statusDot = 'bg-green-400';
    } else if (isFuture) {
        statusLabel = 'Agendado';
        statusColor = 'text-blue-400';
        statusBg = 'bg-blue-400/10';
        statusDot = 'bg-blue-400';
    }

    return `
        <div onclick="router.navigateTo('#service/${service.id}')" 
             class="service-card animate-slide-up bg-white dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm cursor-pointer relative overflow-hidden"
             style="animation-delay: ${index * 60}ms">
            <!-- Gradient accent top -->
            <div class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${gradientFrom} ${gradientTo}"></div>
            
            <div class="flex gap-4">
                <div class="${bgSoft} size-12 rounded-xl flex items-center justify-center ${textColor} shrink-0">
                    <span class="material-symbols-outlined">${icon}</span>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex justify-between items-start">
                        <div class="min-w-0">
                            <h4 class="font-bold dark:text-white leading-tight truncate">${service.location || 'Sin ubicación'}</h4>
                            <p class="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">${typeLabel} ${subType}</p>
                        </div>
                        <span class="text-sm font-extrabold ${textColor} whitespace-nowrap ml-2">$${(service.total || 0).toLocaleString('es-AR')}</span>
                    </div>
                    
                    <div class="flex items-center gap-3 mt-2.5">
                        <div class="flex items-center gap-1">
                            <span class="material-symbols-outlined text-[14px] text-slate-400">schedule</span>
                            <span class="text-[10px] text-slate-500 dark:text-slate-400 font-medium">${timeRange}</span>
                        </div>
                        <span class="size-0.5 rounded-full bg-slate-500"></span>
                        <div class="flex items-center gap-1">
                            <span class="material-symbols-outlined text-[14px] text-slate-400">timer</span>
                            <span class="text-[10px] text-slate-500 font-medium">${service.hours}h</span>
                        </div>
                        <div class="flex items-center gap-1.5 px-2 py-0.5 rounded-full ${statusBg}">
                            <span class="size-1.5 rounded-full ${statusDot} animate-pulse"></span>
                            <span class="text-[10px] ${statusColor} font-bold uppercase tracking-tighter">${statusLabel}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}


/**
 * Render Register View
 * matches: registrar_nuevo_servicio/code.html
 */
function renderRegister(container) {
    const today = new Date().toISOString().split('T')[0];

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 ios-blur border-b border-slate-200 dark:border-primary/20">
            <div class="flex items-center justify-between px-4 h-16">
                <button onclick="router.navigateTo('#agenda')" class="flex items-center text-primary">
                    <span class="material-symbols-outlined text-[28px]">chevron_left</span>
                    <span class="text-lg font-medium">Atrás</span>
                </button>
                <h1 class="text-lg font-semibold absolute left-1/2 -translate-x-1/2 dark:text-white">Nuevo Servicio</h1>
                <button id="btn-save" class="text-primary text-lg font-semibold">Guardar</button>
            </div>
        </header>

        <main class="max-w-md mx-auto px-4 py-6 space-y-6">
            <!-- Details -->
            <section class="space-y-4">
                <h2 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-primary/60 px-1">Detalles del Servicio</h2>
                <div class="bg-white dark:bg-primary/5 rounded-xl border border-slate-200 dark:border-primary/10 overflow-hidden">
                    <div class="flex items-center p-4 border-b border-slate-200 dark:border-primary/10">
                        <span class="material-symbols-outlined text-primary mr-3">calendar_today</span>
                        <div class="flex-1">
                            <p class="text-xs text-slate-500">Fecha</p>
                            <input id="inp-date" class="w-full bg-transparent border-none p-0 focus:ring-0 text-base font-medium dark:text-white" type="date" value="${store.selectedDate || today}"/>
                        </div>
                    </div>
                    <!-- Time Range -->
                    <div class="flex items-center p-4">
                         <span class="material-symbols-outlined text-primary mr-3">schedule</span>
                         <div class="flex-1 grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-xs text-slate-500">Inicio</p>
                                <input id="inp-start" class="w-full bg-transparent border-none p-0 focus:ring-0 text-base font-medium dark:text-white" type="time" value="08:00"/>
                            </div>
                            <div>
                                <p class="text-xs text-slate-500">Fin</p>
                                <input id="inp-end" class="w-full bg-transparent border-none p-0 focus:ring-0 text-base font-medium dark:text-white" type="time" value="12:00"/>
                            </div>
                         </div>
                    </div>
                     <div class="px-4 pb-2 text-right">
                        <p class="text-xs font-bold text-primary" id="lbl-hours">4.0 Horas</p>
                     </div>
                </div>
            </section>

            <!-- Categorization -->
            <section class="space-y-4">
                <h2 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-primary/60 px-1">Tipo de Servicio</h2>
                
                <!-- Main Type -->
                <div class="flex p-1 bg-slate-200 dark:bg-slate-800 rounded-lg">
                    <button id="type-public" class="flex-1 py-2 text-xs font-bold rounded-md bg-white dark:bg-primary shadow-sm dark:text-white transition-all" onclick="setFormType('Public')">Público</button>
                    <button id="type-private" class="flex-1 py-2 text-xs font-bold text-slate-500" onclick="setFormType('Private')">Privado</button>
                    <button id="type-ospes" class="flex-1 py-2 text-xs font-bold text-slate-500" onclick="setFormType('OSPES')">OSPES</button>
                </div>
                
                <!-- Sub Type -->
                <div class="bg-white dark:bg-primary/5 rounded-xl border border-slate-200 dark:border-primary/10 p-4">
                    <p class="text-xs text-slate-500 mb-2">Categoría</p>
                    <div class="flex gap-2" id="subtype-container">
                        <!-- Injected by JS -->
                    </div>
                </div>

            <input id="inp-location" type="text" placeholder="Ej: Banco Nación" class="w-full bg-transparent border-none p-0 text-base font-medium dark:text-white focus:ring-0" />
                    </div>
                </div>
            </section>

            <!-- Calculator Section -->
            <section class="space-y-4">
                <h2 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-primary/60 px-1">Tarifa y Cálculo</h2>
                <div class="bg-primary/10 dark:bg-primary/20 border-2 border-primary/30 rounded-2xl p-5 space-y-4">
                    <!-- Price per hour -->
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-slate-600 dark:text-slate-300">Precio por hora</span>
                        <div class="flex items-center text-primary font-bold">
                            <span class="text-lg">$</span>
                            <input id="inp-rate" class="w-20 bg-transparent border-none p-0 text-right focus:ring-0 text-lg font-bold text-primary" type="number" value="1250"/>
                        </div>
                    </div>
                    
                    <div class="h-px bg-primary/20"></div>
                    
                    <!-- Breakdown -->
                    <div class="space-y-2">
                        <div class="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                            <span id="lbl-calculation">Subtotal (4h × $1250)</span>
                            <span id="txt-subtotal">$5.000,00</span>
                        </div>
                        
                        <!-- Total -->
                        <div class="flex justify-between items-end pt-2">
                            <span class="text-base font-bold text-slate-900 dark:text-white">Pago Estimado</span>
                            <span id="txt-total" class="text-2xl font-black text-primary">$5.000,00</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Main Action Button -->
            <div class="pt-4 pb-12">
                <button id="btn-save" class="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 flex items-center justify-center gap-2 transition-all active:scale-95">
                    <span class="material-symbols-outlined">check_circle</span>
                    Confirmar Registro
                </button>
                <p class="text-center text-xs text-slate-500 mt-4 px-6">
                    Este registro se incluirá en la liquidación de la quincena actual.
                </p>
            </div>
        </main>
    `;

    // Logic
    let currentType = 'Public';
    let currentSubType = 'Ordinaria';

    // Config helper
    const updateSubtypes = () => {
        const container = document.getElementById('subtype-container');
        const config = store.serviceConfig[currentType];
        const subtypes = Object.keys(config);

        container.innerHTML = subtypes.map(sub => `
            <button onclick="setSubType('${sub}')" 
                class="px-4 py-2 rounded-lg text-sm font-bold border ${currentSubType === sub ? 'bg-primary text-white border-primary' : 'border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400'} transition-all">
                ${sub}
            </button>
        `).join('');

        // Default to first if current not invalid
        if (!subtypes.includes(currentSubType)) {
            currentSubType = subtypes[0];
            updateSubtypes(); // Re-render to highlight correctly
        } else {
            updateRate();
        }
    };

    window.setFormType = (type) => {
        currentType = type;
        // Update UI Tabs
        ['Public', 'Private', 'OSPES'].forEach(t => {
            const btn = document.getElementById(`type-${t.toLowerCase()}`);
            if (t === type) {
                btn.className = 'flex-1 py-2 text-xs font-bold rounded-md bg-white dark:bg-primary shadow-sm dark:text-white transition-all';
            } else {
                btn.className = 'flex-1 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-700 transition-all';
            }
        });
        updateSubtypes();
    };

    window.setSubType = (sub) => {
        currentSubType = sub;
        updateSubtypes();
    };

    const updateRate = () => {
        const rate = store.serviceConfig[currentType][currentSubType];
        document.getElementById('inp-rate').value = rate;
        calculateTotal();
    };

    const calculateHours = () => {
        const start = document.getElementById('inp-start').value;
        const end = document.getElementById('inp-end').value;

        if (start && end) {
            const startDate = new Date(`2000-01-01T${start}`);
            let endDate = new Date(`2000-01-01T${end}`);

            if (endDate < startDate) {
                // Next day
                endDate = new Date(`2000-01-02T${end}`);
            }

            const diff = (endDate - startDate) / (1000 * 60 * 60); // Hours
            document.getElementById('lbl-hours').innerText = diff.toFixed(1) + ' Horas';
            return diff;
        }
        return 0;
    };

    const calculateTotal = () => {
        const hours = calculateHours();
        const rate = parseFloat(document.getElementById('inp-rate').value) || 0;
        const total = hours * rate;

        // Update calculation label
        document.getElementById('lbl-calculation').innerText = `Subtotal (${hours.toFixed(1)}h × $${rate.toLocaleString()})`;
        document.getElementById('txt-subtotal').innerText = `$${(total || 0).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        document.getElementById('txt-total').innerText = `$${(total || 0).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    // Listeners
    document.getElementById('inp-start').addEventListener('change', calculateTotal);
    document.getElementById('inp-end').addEventListener('change', calculateTotal);
    document.getElementById('inp-rate').addEventListener('input', calculateTotal);

    // Save
    const saveAction = async () => {
        const date = document.getElementById('inp-date').value;
        const start = document.getElementById('inp-start').value;
        const end = document.getElementById('inp-end').value;
        const rate = parseFloat(document.getElementById('inp-rate').value);
        const location = document.getElementById('inp-location').value || (currentType + ' - ' + currentSubType);
        const hours = calculateHours();

        try {
            // Await para esperar que Firestore termine de guardar
            await store.addService({
                date,
                startTime: start,
                endTime: end,
                hours,
                rate,
                type: currentType,
                subType: currentSubType,
                location,
                total: hours * rate,
                status: 'pending'
            });

            // Solo navegar después de guardar exitosamente
            router.navigateTo('#agenda');
        } catch (error) {
            console.error("Error saving service:", error);
            // El error ya fue mostrado en store.addService
            // No navegamos si hubo error
        }
    };

    document.getElementById('btn-save').addEventListener('click', saveAction);

    // Init
    updateSubtypes();
    // Force type select visual update
    setFormType('Public');
}


/**
 * Render Control Panel
 * matches: panel_de_control_de_adicionales/code.html
 */
function renderControlPanel(container) {
    // Calculate Stats
    const totalServices = store.services.length;

    // Sort by date desc
    const sortedServices = [...store.services].sort((a, b) => new Date(b.date) - new Date(a.date));

    const publicServices = store.services.filter(s => s.type === 'Public');
    const privateServices = store.services.filter(s => s.type === 'Private');

    const totalPublic = publicServices.reduce((sum, s) => sum + s.total, 0);
    const totalPrivate = privateServices.reduce((sum, s) => sum + s.total, 0);
    const totalEarnings = totalPublic + totalPrivate;

    const hoursPublic = publicServices.reduce((sum, s) => sum + s.hours, 0);
    const hoursPrivate = privateServices.reduce((sum, s) => sum + s.hours, 0);

    const html = `
        <header class="sticky top-0 z-50 glass-card px-5 py-4 flex items-center justify-between border-b border-white/5">
            <div class="flex items-center gap-3">
                <div class="relative">
                    <div class="size-10 rounded-full border-2 border-primary/50 overflow-hidden bg-slate-800">
                        <img class="w-full h-full object-cover" src="${store.user.avatar}" onerror="this.src='https://ui-avatars.com/api/?background=0d59f2&color=fff&name=User'" />
                    </div>
                    <div class="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-background-dark"></div>
                </div>
                <div>
                    <p class="text-[10px] font-bold uppercase tracking-widest text-primary/80">Oficial de Guardia</p>
                    <h1 class="text-base font-bold leading-tight dark:text-white">Panel de Control</h1>
                </div>
            </div>
            <div class="flex gap-2">
                <button onclick="showToast('Modo privacidad activado')" class="size-10 flex items-center justify-center rounded-full glass-card hover:bg-white/10 transition-colors text-white">
                    <span class="material-symbols-outlined text-xl">visibility</span>
                </button>
            </div>
        </header>

        <main class="flex-1 px-4 py-6 space-y-6 max-w-md mx-auto w-full pb-32">
            <!-- Period Selector -->
            <div class="flex p-1.5 glass-card rounded-xl">
                <button onclick="showToast('Filtrando: 1-15 Oct')" class="flex-1 py-2 px-3 rounded-lg bg-primary text-white text-sm font-semibold shadow-lg shadow-primary/20">1 - 15 Oct</button>
                <button onclick="showToast('Filtrando: 16-31 Oct')" class="flex-1 py-2 px-3 rounded-lg text-slate-400 text-sm font-medium hover:text-white transition-colors">16 - 31 Oct</button>
            </div>

            <!-- Main Earnings Card -->
            <div class="relative overflow-hidden rounded-2xl glass-card p-6 border border-white/10">
                <div class="absolute -top-12 -right-12 size-32 bg-primary/20 blur-3xl rounded-full"></div>
                <div class="relative z-10 flex flex-col items-center">
                    <p class="text-xs font-medium text-slate-400 uppercase tracking-widest mb-1">Total Acumulado Quincena</p>
                    <div class="flex items-baseline gap-1 mb-6">
                        <span class="text-2xl font-bold text-primary">$</span>
                        <span class="text-5xl font-extrabold tracking-tight text-white">${(totalEarnings || 0).toLocaleString()}</span>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4 w-full">
                        <div class="bg-white/5 rounded-xl p-3 border border-white/5">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="size-2 rounded-full bg-accent-cyan shadow-[0_0_8px_rgba(34,211,238,0.5)]"></span>
                                <p class="text-[10px] font-bold text-slate-400 uppercase">Público</p>
                            </div>
                            <p class="text-lg font-bold text-white">$${(totalPublic || 0).toLocaleString()}</p>
                            <p class="text-[10px] text-slate-500">${hoursPublic} Horas</p>
                        </div>
                        <div class="bg-white/5 rounded-xl p-3 border border-white/5">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="size-2 rounded-full bg-service-ospe shadow-[0_0_8px_rgba(139,92,246,0.5)]"></span>
                                <p class="text-[10px] font-bold text-slate-400 uppercase">Privado</p>
                            </div>
                            <p class="text-lg font-bold text-white">$${(totalPrivate || 0).toLocaleString()}</p>
                            <p class="text-[10px] text-slate-500">${hoursPrivate} Horas</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Services Feed -->
            <section class="pb-24">
                <div class="flex justify-between items-end mb-4 px-1">
                    <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400">Servicios Recientes</h3>
                    <span onclick="window.location.hash='#history'" class="text-xs text-slate-500 cursor-pointer">Ver todo</span>
                </div>
                <div class="space-y-3">
                    ${sortedServices.slice(0, 5).map(s => {
        const isPub = s.type === 'Public';
        const colorClass = isPub ? 'text-accent-cyan' : 'text-service-ospe';
        const bgClass = isPub ? 'bg-accent-cyan/10' : 'bg-service-ospe/10';
        const icon = isPub ? 'account_balance' : 'shopping_cart';
        return `
                            <div class="glass-card p-4 rounded-2xl flex items-center justify-between border-white/5">
                                <div class="flex items-center gap-4">
                                    <div class="size-12 rounded-xl ${bgClass} flex items-center justify-center ${colorClass}">
                                        <span class="material-symbols-outlined">${icon}</span>
                                    </div>
                                    <div>
                                        <p class="font-bold text-sm text-white">${s.location}</p>
                                    <div class="flex items-center gap-2 mt-0.5">
                                            <span class="text-[11px] text-slate-400">${store.getFormattedDate(s.date)} • ${s.hours}h</span>
                                            <span class="size-1 rounded-full bg-slate-600"></span>
                                            ${(() => {
                const today = new Date().toISOString().split('T')[0];
                const isFuture = s.date > today;
                let label = 'Pendiente';
                let color = 'text-amber-400';

                if (s.status === 'paid') {
                    label = 'Liquidado';
                    color = 'text-green-400';
                } else if (isFuture) {
                    label = 'Agendado';
                    color = 'text-blue-400';
                }
                return `<span class="text-[11px] ${color} font-bold uppercase tracking-tighter">${label}</span>`;
            })()}
                                        </div>
                                    </div>
                                </div>
                                <p class="text-sm font-bold text-white">$${(s.total || 0).toLocaleString()}</p>
                            </div>
                         `;
    }).join('')}
                </div>
            </section>
        </main>

        ${renderBottomNav('control')}
    `;
    container.innerHTML = html;
}

/**
 * Render Financial View
 * matches: resumen_financiero_y_gastos/code.html
 */
function renderFinancial(container) {
    const totalIncome = store.services.reduce((sum, s) => sum + s.total, 0);
    const totalExpenses = store.expenses.reduce((sum, e) => sum + e.amount, 0);

    const html = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 pt-6 pb-4">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                    <div class="size-10 rounded-full border border-primary/30 overflow-hidden">
                        <img src="${store.user.avatar}" class="w-full h-full object-cover">
                    </div>
                    <div>
                        <h1 class="text-sm font-medium text-slate-400">${store.user.name}</h1>
                        <p class="text-lg font-bold tracking-tight text-white">Centro de Control</p>
                    </div>
                </div>
            </div>
            <div class="flex p-1 bg-white/5 rounded-xl">
                <button onclick="showToast('Filtro: 1ra Quincena')" class="flex-1 py-2 text-xs font-bold rounded-lg bg-primary text-white shadow-lg shadow-primary/20">1ra Quincena</button>
                <button onclick="showToast('Filtro: 2da Quincena')" class="flex-1 py-2 text-xs font-bold text-slate-400">2da Quincena</button>
                <button onclick="showToast('Filtro: Mes Completo')" class="flex-1 py-2 text-xs font-bold text-slate-400">Total Mes</button>
            </div>
        </header>

        <main class="flex-1 px-4 py-6 space-y-6 overflow-y-auto pb-32">
            <!-- Summary Cards -->
            <div class="grid grid-cols-2 gap-4">
                <div class="glass-card p-5 rounded-2xl flex flex-col gap-1 relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-2 opacity-10">
                        <span class="material-symbols-outlined text-4xl text-white">payments</span>
                    </div>
                    <p class="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Total Quincena</p>
                    <p class="text-2xl font-bold tracking-tighter text-white">$${(totalIncome || 0).toLocaleString()}</p>
                    <div class="flex items-center gap-1 mt-2">
                        <span class="material-symbols-outlined text-accent-success text-sm">trending_up</span>
                        <span class="text-accent-success text-xs font-bold">+12.5%</span>
                    </div>
                </div>
                <div class="glass-card p-5 rounded-2xl flex flex-col gap-1 border-primary/20 bg-primary/5">
                    <p class="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Total Gastos</p>
                    <p class="text-2xl font-bold tracking-tighter text-white">$${(totalExpenses || 0).toLocaleString()}</p>
                     <div class="flex items-center gap-1 mt-2">
                        <span class="material-symbols-outlined text-accent-warning text-sm">trending_flat</span>
                        <span class="text-accent-warning text-xs font-bold">Estable</span>
                    </div>
                </div>
            </div>

            <!-- Expense Control Actions -->
            <section class="space-y-4">
                 <div class="flex justify-between items-center">
                    <h2 class="text-base font-bold flex items-center gap-2 text-white">
                        <span class="material-symbols-outlined text-primary">account_balance_wallet</span>
                        Control de Gastos
                    </h2>
                </div>

                <!-- Add Expense Inline Form -->
                <div class="glass-card p-4 rounded-2xl space-y-3">
                    <div class="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                        ${['Comida', 'Transporte', 'Equipo', 'Comunicación', 'Salud', 'Otros'].map((cat, i) => {
        const icons = { 'Comida': 'restaurant', 'Transporte': 'directions_car', 'Equipo': 'build', 'Comunicación': 'phone_in_talk', 'Salud': 'medical_services', 'Otros': 'more_horiz' };
        const colors = { 'Comida': 'bg-red-500/20 text-red-400', 'Transporte': 'bg-blue-500/20 text-blue-400', 'Equipo': 'bg-purple-500/20 text-purple-400', 'Comunicación': 'bg-green-500/20 text-green-400', 'Salud': 'bg-pink-500/20 text-pink-400', 'Otros': 'bg-amber-500/20 text-amber-400' };
        return '<button onclick="window.selectExpenseCategory(\'' + cat + '\')" id="cat-btn-' + cat + '" class="expense-cat-btn flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ' + (i === 0 ? colors[cat] + ' ring-1 ring-white/20' : 'bg-white/5 text-slate-400') + '"><span class="material-symbols-outlined text-sm">' + icons[cat] + '</span>' + cat + '</button>';
    }).join('')}
                    </div>
                    <div class="flex gap-2">
                        <div class="flex-1 relative">
                            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                            <input type="number" id="expense-amount" placeholder="Monto" 
                                   class="w-full pl-7 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm font-medium placeholder:text-slate-500 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 outline-none transition-all">
                        </div>
                        <input type="text" id="expense-desc" placeholder="Descripción (opcional)" 
                               class="flex-1 px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-slate-500 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 outline-none transition-all">
                    </div>
                    <button id="btn-add-expense" onclick="window.submitExpense()" 
                            class="w-full py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-red-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        <span class="material-symbols-outlined text-lg">add_circle</span>
                        Agregar Gasto
                    </button>
                </div>

                 <!-- Expense Chart Visualization -->
                 ${store.expenses.length > 0 ? '<div class="glass-card p-5 rounded-2xl"><canvas id="expenseChart" class="max-h-64"></canvas></div>' : ''}
            </section>

            <!-- Recent Expenses List -->
            <section class="space-y-4">
                <div class="flex justify-between items-center">
                    <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400">Historial de Gastos</h3>
                    ${store.expenses.length > 0 ? '<span class="text-xs text-slate-500">' + store.expenses.length + ' gastos</span>' : ''}
                </div>
                <div class="space-y-2">
                    ${store.expenses.length > 0 ? store.expenses.slice(0, 20).map(e => {
        const catIcons = { 'Comida': 'restaurant', 'Transporte': 'directions_car', 'Equipo': 'build', 'Comunicación': 'phone_in_talk', 'Salud': 'medical_services', 'Otros': 'more_horiz' };
        const catColors = { 'Comida': 'bg-red-500/10 text-red-400', 'Transporte': 'bg-blue-500/10 text-blue-400', 'Equipo': 'bg-purple-500/10 text-purple-400', 'Comunicación': 'bg-green-500/10 text-green-400', 'Salud': 'bg-pink-500/10 text-pink-400', 'Otros': 'bg-amber-500/10 text-amber-400' };
        const icon = catIcons[e.category] || 'money_off';
        const color = catColors[e.category] || 'bg-red-500/10 text-red-400';
        return '<div class="glass-card p-3 rounded-2xl flex items-center justify-between border-white/5 group">' +
            '<div class="flex items-center gap-3">' +
            '<div class="size-9 rounded-xl ' + color + ' flex items-center justify-center">' +
            '<span class="material-symbols-outlined text-lg">' + icon + '</span>' +
            '</div>' +
            '<div>' +
            '<p class="font-bold text-sm text-white">' + e.category + '</p>' +
            '<p class="text-[10px] text-slate-500">' + (e.description || '-') + ' • ' + new Date(e.timestamp || e.date).toLocaleDateString() + '</p>' +
            '</div>' +
            '</div>' +
            '<div class="flex items-center gap-3">' +
            '<p class="font-bold text-white">-$' + (e.amount || 0).toLocaleString() + '</p>' +
            '<button onclick="window.deleteExpenseConfirm(\'' + e.id + '\')" class="size-8 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-500 hover:text-red-400 transition-colors"><span class="material-symbols-outlined text-lg">delete</span></button>' +
            '</div>' +
            '</div>';
    }).join('') : '<div class="flex flex-col items-center py-8 text-center"><div class="size-14 rounded-full bg-red-500/10 flex items-center justify-center mb-3"><span class="material-symbols-outlined text-2xl text-red-400/40">receipt_long</span></div><p class="text-sm font-semibold text-white mb-1">Sin gastos</p><p class="text-xs text-slate-400">Usá el formulario arriba para cargar gastos</p></div>'}
                </div>
            </section>
            
            </section>
            
             <!-- Refresh / Export Actions -->
             <div class="mt-8 flex justify-center gap-4">
                <button onclick="window.location.reload()" class="text-sm font-bold text-slate-500 flex items-center gap-2 hover:text-primary transition-colors">
                    <span class="material-symbols-outlined">refresh</span>
                    Actualizar Datos
                </button>
                <button onclick="store.exportData()" class="text-sm font-bold text-slate-400 flex items-center gap-2 hover:text-white transition-colors">
                    <span class="material-symbols-outlined">download</span>
                    Descargar reporte (CSV)
                </button>
             </div>
        </main>
        ${renderBottomNav('financial')}
    `;
    container.innerHTML = html;

    // Render Expense Chart
    setTimeout(() => {
        const canvas = document.getElementById('expenseChart');
        if (canvas && store.expenses.length > 0) {
            // Group expenses by category
            const expensesByCategory = {};
            store.expenses.forEach(e => {
                expensesByCategory[e.category] = (expensesByCategory[e.category] || 0) + e.amount;
            });

            const categories = Object.keys(expensesByCategory);
            const amounts = Object.values(expensesByCategory);

            // Color mapping
            const colorMap = {
                'Comida': '#ef4444',
                'Transporte': '#3b82f6',
                'Equipo': '#8b5cf6',
                'Comunicación': '#10b981',
                'Otros': '#f59e0b'
            };

            const colors = categories.map(cat => colorMap[cat] || '#6b7280');

            new Chart(canvas, {
                type: 'doughnut',
                data: {
                    labels: categories,
                    datasets: [{
                        data: amounts,
                        backgroundColor: colors,
                        borderWidth: 0,
                        hoverOffset: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: '#cbd5e1',
                                font: { size: 12, weight: 'bold' },
                                padding: 15,
                                usePointStyle: true,
                                pointStyle: 'circle'
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(15, 23, 42, 0.9)',
                            titleColor: '#fff',
                            bodyColor: '#cbd5e1',
                            padding: 12,
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            borderWidth: 1,
                            callbacks: {
                                label: function (context) {
                                    const label = context.label || '';
                                    const value = context.parsed || 0;
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = ((value / total) * 100).toFixed(1);
                                    return `${label}: $${value.toLocaleString()} (${percentage}%)`;
                                }
                            }
                        }
                    },
                    cutout: '65%'
                }
            });
        } else if (canvas && store.expenses.length === 0) {
            // Show empty state
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#475569';
            ctx.font = '14px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Sin gastos registrados', canvas.width / 2, canvas.height / 2);
        }
    }, 100);

    // Expense form state
    let selectedCategory = 'Comida';

    window.selectExpenseCategory = (cat) => {
        selectedCategory = cat;
        const catColors = { 'Comida': 'bg-red-500/20 text-red-400', 'Transporte': 'bg-blue-500/20 text-blue-400', 'Equipo': 'bg-purple-500/20 text-purple-400', 'Comunicación': 'bg-green-500/20 text-green-400', 'Salud': 'bg-pink-500/20 text-pink-400', 'Otros': 'bg-amber-500/20 text-amber-400' };
        document.querySelectorAll('.expense-cat-btn').forEach(btn => {
            btn.className = 'expense-cat-btn flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all bg-white/5 text-slate-400';
        });
        const activeBtn = document.getElementById('cat-btn-' + cat);
        if (activeBtn) {
            const color = catColors[cat] || 'bg-amber-500/20 text-amber-400';
            activeBtn.className = 'expense-cat-btn flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ' + color + ' ring-1 ring-white/20';
        }
    };

    window.submitExpense = async () => {
        const amountInput = document.getElementById('expense-amount');
        const descInput = document.getElementById('expense-desc');
        const amount = parseFloat(amountInput.value);
        if (!amount || isNaN(amount) || amount <= 0) {
            showToast('Ingresá un monto válido');
            amountInput.focus();
            return;
        }
        const btn = document.getElementById('btn-add-expense');
        btn.disabled = true;
        btn.textContent = 'Guardando...';
        const success = await store.addExpense(selectedCategory, amount, descInput.value.trim());
        if (success) {
            amountInput.value = '';
            descInput.value = '';
        }
        btn.disabled = false;
        btn.textContent = 'Agregar Gasto';
    };

    window.deleteExpenseConfirm = (id) => {
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6';
        overlay.innerHTML = '<div class="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-slide-up"><div class="flex flex-col items-center text-center"><div class="size-12 rounded-full bg-red-500/20 flex items-center justify-center mb-3"><span class="material-symbols-outlined text-2xl text-red-400">delete_forever</span></div><h3 class="text-lg font-bold text-white mb-1">¿Eliminar gasto?</h3><p class="text-sm text-slate-400 mb-5">Esta acción no se puede deshacer</p><div class="flex gap-3 w-full"><button onclick="this.closest(\'.fixed\').remove()" class="flex-1 py-2.5 bg-white/10 text-white text-sm font-bold rounded-xl">Cancelar</button><button onclick="store.deleteExpense(\'' + id + '\'); this.closest(\'.fixed\').remove()" class="flex-1 py-2.5 bg-red-500 text-white text-sm font-bold rounded-xl">Eliminar</button></div></div></div>';
        overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
        document.body.appendChild(overlay);
    };
}

/**
 * Render Admin View
 * matches: panel_de_administración_y_métricas/code.html
 */


/**
 * Render Profile / Settings View
 * Redesigned for premium look & feel
 */
function renderProfile(container) {
    if (!container) container = document.getElementById('app');

    // User Data Fallback
    const user = store.user || { name: 'Usuario', email: '...', avatar: '' };

    // Helper to sanitize "undefined" strings
    const safeString = (str) => (!str || str === 'undefined' || str === 'null') ? null : str;

    const userName = safeString(user.name) || safeString(user.displayName) || 'Usuario';
    const userEmail = user.email || 'No email';
    const userAvatar = safeString(user.avatar) || safeString(user.photoURL) || `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(userName)}`;

    // Clone config (Defensive copy)
    // 2026-02-18: Added safety check for undefined serviceConfig
    const config = store.serviceConfig ? JSON.parse(JSON.stringify(store.serviceConfig)) : {
        'Public': { 'Ordinaria': 0, 'Extraordinaria': 0 },
        'Private': { 'Ordinaria': 0, 'Extraordinaria': 0 },
        'OSPES': { 'Ordinaria': 0, 'Extraordinaria': 0 }
    };

    // Helper: Config Inputs
    const renderConfigInputs = (type) => {
        return Object.keys(config[type]).map(sub => `
            <div class="flex justify-between items-center py-3 border-b border-white/5 last:border-0 gap-3">
                <input type="text" 
                    value="${sub}" 
                    onchange="store.renameServiceSubtype('${type}', '${sub}', this.value)"
                    class="bg-transparent border-none text-sm font-medium text-slate-300 focus:ring-0 focus:text-white w-full placeholder-slate-600 transition-colors">
                
                <div class="flex items-center gap-2 bg-white/5 rounded-lg px-2 py-1 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
                    <span class="text-xs text-slate-500">$</span>
                    <input type="number" 
                        value="${config[type][sub]}" 
                        onchange="store.updateLocalConfig('${type}', '${sub}', this.value)"
                        class="w-20 bg-transparent border-none text-right text-sm font-bold text-white focus:ring-0 p-0">
                </div>
            </div>
        `).join('');
    };

    const html = `
        <header class="sticky top-0 z-50 bg-background-dark/95 backdrop-blur-xl border-b border-white/5 px-4 h-16 flex items-center justify-between">
            <button onclick="router.navigateTo('#agenda')" class="size-10 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-400 transition-colors active:scale-95">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 class="text-base font-bold text-white tracking-wide">Mi Perfil</h1>
            <div class="size-10"></div> <!-- Spacer -->
        </header>

        <main class="p-6 space-y-8 pb-32 max-w-md mx-auto animate-fade-in">
            <!-- Hero Profile Section -->
            <div class="flex flex-col items-center pt-4">
                <!-- Hidden File Input -->
                <input type="file" id="avatar-input" accept="image/*" class="hidden" onchange="store.handleAvatarUpload(event)">
                
                <div class="relative group cursor-pointer" onclick="document.getElementById('avatar-input').click()">
                    <!-- Decorative Rings -->
                    <div class="absolute -inset-1 bg-gradient-to-tr from-primary to-accent-cyan rounded-full opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div class="relative size-28 rounded-full p-1 bg-background-dark shadow-2xl">
                        <img id="profile-avatar-img" src="${userAvatar}" class="w-full h-full rounded-full object-cover border-2 border-white/10 group-hover:border-primary/50 transition-all duration-300 shadow-inner">
                    </div>
                    <!-- Edit Badge -->
                    <div class="absolute bottom-1 right-1 bg-primary text-white size-8 rounded-full flex items-center justify-center shadow-lg border-2 border-background-dark transform group-hover:scale-110 transition-transform">
                        <span class="material-symbols-outlined text-sm">edit</span>
                    </div>
                </div>

                <div class="mt-4 text-center space-y-1">
                    <div class="flex items-center justify-center gap-2">
                        <h2 class="text-2xl font-bold text-white tracking-tight">${userName}</h2>
                        <span onclick="const name = prompt('Nuevo nombre:', '${userName}'); if(name) store.updateProfile(name, '${userAvatar}');" class="material-symbols-outlined text-slate-500 hover:text-primary cursor-pointer text-sm transition-colors">edit</span>
                    </div>
                    <p class="text-sm font-medium text-slate-400">${userEmail}</p>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-3 mt-6 w-full max-w-xs">
                    <button onclick="store.requestNotificationPermission()" 
                        class="flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all active:scale-95 ${store.notificationSettings.enabled ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-slate-800 text-slate-400 border border-white/5 hover:bg-slate-700'}">
                        <span class="material-symbols-outlined text-lg">${store.notificationSettings.enabled ? 'notifications_active' : 'notifications_off'}</span>
                        ${store.notificationSettings.enabled ? 'Notificaciones' : 'Activar Alertas'}
                    </button>
                    <button onclick="store.shareApp()" 
                        class="flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-bold hover:bg-blue-600/30 transition-all active:scale-95">
                        <span class="material-symbols-outlined text-lg">share</span>
                        Compartir
                    </button>
                </div>
            </div>

            <!-- Configuration Section -->
            <section class="space-y-5">
                <div class="flex items-center gap-3 text-slate-400 px-1">
                    <span class="material-symbols-outlined text-primary">tune</span>
                    <h3 class="text-xs font-bold uppercase tracking-widest">Configuración de Tarifas</h3>
                </div>

                <!-- Public Services -->
                <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/5 p-5 shadow-sm">
                    <h4 class="text-[10px] font-extrabold text-accent-cyan uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span class="size-2 rounded-full bg-accent-cyan"></span> Servicios Públicos
                    </h4>
                    ${renderConfigInputs('Public')}
                </div>

                <!-- Private Services -->
                <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/5 p-5 shadow-sm">
                    <h4 class="text-[10px] font-extrabold text-purple-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span class="size-2 rounded-full bg-purple-400"></span> Servicios Privados
                    </h4>
                    ${renderConfigInputs('Private')}
                </div>
                
                 <!-- OSPES / Others -->
                <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/5 p-5 shadow-sm">
                    <h4 class="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span class="size-2 rounded-full bg-amber-400"></span> OSPES / Otros
                    </h4>
                    ${renderConfigInputs('OSPES')}
                </div>

                <!-- Add Custom Sector Button -->
                <button onclick="window.addCustomSector()" class="w-full py-4 rounded-2xl border-2 border-dashed border-primary/30 text-primary/80 font-bold text-sm bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all flex items-center justify-center gap-2 group">
                    <span class="material-symbols-outlined group-hover:scale-110 transition-transform">add_circle</span>
                    Agregar Sector Personalizado
                </button>
            </section>

            <!-- Save Button -->
            <button onclick="store.saveConfig()" class="w-full bg-gradient-to-r from-primary to-blue-600 text-white py-4 rounded-2xl font-bold text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95 transition-all">
                Guardar Cambios
            </button>

            <!-- Logout -->
            <div class="pt-6 pb-2">
                 <button onclick="store.logout()" class="w-full text-red-400/80 text-xs font-bold hover:text-red-400 transition-colors flex items-center justify-center gap-2 py-3 rounded-xl hover:bg-red-500/10">
                    <span class="material-symbols-outlined text-lg">logout</span>
                    Cerrar Sesión
                </button>
                  <p class="text-center text-[10px] text-slate-700 dark:text-slate-600 mt-2 font-mono">v2.1.1 • Build 2026.02.22 v2</p>
            </div>
        </main>
    `;

    container.innerHTML = html;

    // Add logic for button states if needed
}

// Add custom sector handler
window.addCustomSector = () => {
    const sectorName = prompt("Nombre del nuevo sector (ej: IOMA, Swiss Medical):");
    if (!sectorName || sectorName.trim() === '') return;

    const ordinaryRate = prompt(`Tarifa Ordinaria para ${sectorName}:`);
    if (!ordinaryRate || isNaN(ordinaryRate)) {
        showToast("❌ Tarifa inválida");
        return;
    }

    const extraRate = prompt(`Tarifa Extraordinaria para ${sectorName}:`);
    if (!extraRate || isNaN(extraRate)) {
        showToast("❌ Tarifa inválida");
        return;
    }

    // Add to config
    if (!store.serviceConfig[sectorName]) {
        store.serviceConfig[sectorName] = {};
    }
    store.serviceConfig[sectorName]['Ordinaria'] = parseFloat(ordinaryRate);
    store.serviceConfig[sectorName]['Extraordinaria'] = parseFloat(extraRate);

    showToast(`✅ Sector "${sectorName}" agregado`);

    // Re-render profile to show new sector
    renderProfile(container);
};


// --- SUBSCRIPTIONS ---





/**
 * Render Service Details View
 * New view for Edit/Delete/Pay Actions
 */
function renderServiceDetails(container, serviceId) {
    const service = store.services.find(s => s.id === serviceId);

    if (!service) {
        showToast("Servicio no encontrado");
        window.location.hash = '#agenda';
        return;
    }


    const isPaid = service.status === 'paid';

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center justify-between">
            <button onclick="window.history.back()" class="size-10 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-400 transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 class="text-lg font-bold text-white">Detalle Servicio</h1>
            
             <button onclick="store.deleteService('${serviceId}')" class="size-10 rounded-full hover:bg-red-500/10 flex items-center justify-center text-red-500 transition-colors">
                <span class="material-symbols-outlined">delete</span>
            </button>
        </header>

        <main class="p-6 space-y-6 pb-32 max-w-md mx-auto">
             <!-- Status Banner -->
             <div class="p-4 rounded-xl ${isPaid ? 'bg-green-500/10 border border-green-500/20' : 'bg-slate-800 border border-white/5'} flex justify-between items-center transition-all">
                <div>
                    <span class="text-xs font-bold uppercase tracking-wider ${isPaid ? 'text-green-400' : 'text-slate-400'}">Estado</span>
                    <p class="text-lg font-bold text-white">${isPaid ? 'LIQUIDADO' : 'PENDIENTE DE PAGO'}</p>
                </div>
                <!-- Toggle Switch -->
                <button onclick="store.togglePaidStatus('${serviceId}', ${!isPaid})" class="h-8 px-4 rounded-full flex items-center gap-2 font-bold text-xs ${isPaid ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 'bg-white/10 text-slate-300'} transition-all">
                    ${isPaid ? '<span class="material-symbols-outlined text-sm">check</span> PAGADO' : 'MARCAR PAGADO'}
                </button>
             </div>

             <!-- Info Card -->
             <div class="glass-card rounded-2xl p-6 space-y-6">
                 <div>
                    <span class="text-xs text-slate-500 uppercase font-bold">Lugar / Objetivo</span>
                    <h2 class="text-2xl font-bold text-white leading-tight">${service.location}</h2>
                    <p class="text-primary font-bold text-sm mt-1">${service.type} - ${service.subType}</p>
                 </div>
                 
                 <div class="grid grid-cols-2 gap-6">
                    <div>
                        <span class="flex items-center gap-2 text-slate-400 text-xs font-bold mb-1">
                            <span class="material-symbols-outlined text-sm">calendar_today</span> Fecha
                        </span>
                        <p class="text-white font-medium">${store.getFormattedDate(service.date)}</p>
                    </div>
                     <div>
                        <span class="flex items-center gap-2 text-slate-400 text-xs font-bold mb-1">
                            <span class="material-symbols-outlined text-sm">schedule</span> Horario
                        </span>
                        <p class="text-white font-medium">${service.startTime} - ${service.endTime}</p>
                    </div>
                 </div>
                 
                 <div class="border-t border-white/10 pt-4 flex justify-between items-center">
                    <div>
                        <span class="text-xs text-slate-500 uppercase font-bold">Total a Cobrar</span>
                        <p class="text-3xl font-black text-white">$${(service.total || 0).toLocaleString()}</p>
                    </div>
                 </div>
             </div>
             
             <!-- Warning if future -->
             ${service.date > new Date().toISOString().split('T')[0] ? `
                 <div class="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl flex gap-3 text-blue-400 text-xs">
                    <span class="material-symbols-outlined text-lg">info</span>
                    <p>Este servicio está agendado para el futuro.</p>
                 </div>
             ` : ''}
        </main>
    `;

    // Actions
    store.togglePaidStatus = async (id, newStatus) => {
        try {
            await DB.updateService(id, { status: newStatus ? 'paid' : 'pending' });
            showToast(newStatus ? "¡Marcado como COBRADO! 💰" : "Marcado como Pendiente");
            // renderServiceDetails(container, id); // Firestore sync will handle re-render if subcribed, but direct re-render is faster UX
            window.history.back(); // Or stay? Back seems better to see list update
        } catch (e) {
            showToast("Error update: " + e.message);
        }
    };

    store.deleteService = async (id) => {
        if (confirm("¿Seguro que quieres borrar este servicio? No se puede deshacer.")) {
            try {
                await DB.deleteService(id);
                showToast("Servicio eliminado");
                window.history.back();
            } catch (e) {
                showToast("Error delete: " + e.message);
            }
        }
    };
}


// --- AD COMPONENT ---
function renderAdBanner() {
    if (!store.ads || store.ads.length === 0) return '';
    // Select random ad
    const ad = store.ads[Math.floor(Math.random() * store.ads.length)];
    return `
        <div class="my-6 mx-4 rounded-xl overflow-hidden shadow-lg relative group">
            <a href="${ad.linkUrl}" target="_blank" class="block relative">
                <span class="absolute top-2 right-2 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider font-bold backdrop-blur-sm">Publicidad</span>
                <img src="${ad.imageUrl}" class="w-full h-32 object-cover" alt="Anuncio">
                <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </a>
        </div>
    `;
}

/**
 * Render 3D Statistics Dashboard
 */
function renderStats(container) {
    const services = store.services;
    const today = store.getLocalDateString();

    // Calculate stats
    const totalEarnings = services.reduce((sum, s) => sum + (s.total || 0), 0);
    const totalHours = services.reduce((sum, s) => sum + (parseFloat(s.hours) || 0), 0);
    const totalServices = services.length;
    const paidServices = services.filter(s => s.status === 'paid').length;
    const pendingEarnings = services.filter(s => s.status !== 'paid').reduce((sum, s) => sum + (s.total || 0), 0);
    const avgPerService = totalServices > 0 ? Math.round(totalEarnings / totalServices) : 0;

    // Weekly data (last 7 days)
    const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const weekData = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = store.getLocalDateString(d);
        const dayServices = services.filter(s => s.date === dateStr);
        const dayTotal = dayServices.reduce((sum, s) => sum + (s.total || 0), 0);
        weekData.push({
            label: weekDays[d.getDay()],
            value: dayTotal,
            count: dayServices.length,
            isToday: i === 0
        });
    }
    const maxWeekValue = Math.max(...weekData.map(d => d.value), 1);

    // By service type
    const publicServices = services.filter(s => s.type === 'Public');
    const privateServices = services.filter(s => s.type === 'Private');
    const ospesServices = services.filter(s => s.type === 'OSPES');
    const publicTotal = publicServices.reduce((sum, s) => sum + (s.total || 0), 0);
    const privateTotal = privateServices.reduce((sum, s) => sum + (s.total || 0), 0);
    const ospesTotal = ospesServices.reduce((sum, s) => sum + (s.total || 0), 0);

    // Monthly trend (last 6 months)
    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        const monthStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        const monthServices = services.filter(s => s.date && s.date.startsWith(monthStr));
        const monthTotal = monthServices.reduce((sum, s) => sum + (s.total || 0), 0);
        monthlyData.push({
            label: d.toLocaleString('es-AR', { month: 'short' }),
            value: monthTotal,
            count: monthServices.length
        });
    }
    const maxMonthValue = Math.max(...monthlyData.map(d => d.value), 1);

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 ios-blur border-b border-slate-200 dark:border-primary/20">
            <div class="flex items-center justify-between px-4 h-16">
                <button onclick="router.navigateTo('#agenda')" class="flex items-center text-primary">
                    <span class="material-symbols-outlined text-[28px]">chevron_left</span>
                </button>
                <h1 class="text-lg font-semibold dark:text-white">Estadísticas</h1>
                <button onclick="router.navigateTo('#history')" class="text-primary text-sm font-medium">Historial</button>
            </div>
        </header>

        <main class="max-w-md mx-auto px-4 py-6 space-y-6 pb-32">

            <!-- KPI Cards -->
            <div class="grid grid-cols-2 gap-3">
                <div class="animate-slide-up bg-gradient-to-br from-primary to-blue-400 p-4 rounded-2xl text-white shadow-lg shadow-primary/20" style="animation-delay: 0ms">
                    <span class="material-symbols-outlined text-white/60 text-2xl">payments</span>
                    <p class="text-2xl font-black mt-1">$${totalEarnings.toLocaleString('es-AR')}</p>
                    <p class="text-xs text-white/70 font-medium">Total Ganado</p>
                </div>
                <div class="animate-slide-up bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl text-white shadow-lg shadow-purple-500/20" style="animation-delay: 60ms">
                    <span class="material-symbols-outlined text-white/60 text-2xl">schedule</span>
                    <p class="text-2xl font-black mt-1">${totalHours.toFixed(1)}h</p>
                    <p class="text-xs text-white/70 font-medium">Horas Trabajadas</p>
                </div>
                <div class="animate-slide-up bg-gradient-to-br from-cyan-500 to-teal-500 p-4 rounded-2xl text-white shadow-lg shadow-cyan-500/20" style="animation-delay: 120ms">
                    <span class="material-symbols-outlined text-white/60 text-2xl">fact_check</span>
                    <p class="text-2xl font-black mt-1">${totalServices}</p>
                    <p class="text-xs text-white/70 font-medium">Servicios</p>
                </div>
                <div class="animate-slide-up bg-gradient-to-br from-amber-500 to-orange-500 p-4 rounded-2xl text-white shadow-lg shadow-amber-500/20" style="animation-delay: 180ms">
                    <span class="material-symbols-outlined text-white/60 text-2xl">trending_up</span>
                    <p class="text-2xl font-black mt-1">$${avgPerService.toLocaleString('es-AR')}</p>
                    <p class="text-xs text-white/70 font-medium">Promedio/Servicio</p>
                </div>
            </div>

            <!-- 3D Bar Chart - Weekly Earnings -->
            <section class="animate-slide-up space-y-3" style="animation-delay: 240ms">
                <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-primary/60 px-1">Ganancias Semanales</h3>
                <div class="bg-white dark:bg-slate-900/80 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div class="chart-3d" style="perspective: 800px;">
                        <div class="flex items-end justify-between gap-2 h-40" style="transform: rotateX(5deg) rotateY(-3deg); transform-style: preserve-3d;">
                            ${weekData.map((d, i) => {
        const heightPct = maxWeekValue > 0 ? (d.value / maxWeekValue * 100) : 0;
        const color = d.isToday ? 'from-primary to-blue-400' : 'from-slate-500 to-slate-400';
        return `
                                <div class="flex-1 flex flex-col items-center gap-1">
                                    <span class="text-[9px] font-bold ${d.isToday ? 'text-primary' : 'text-slate-400'}">${d.value > 0 ? '$' + (d.value / 1000).toFixed(0) + 'k' : ''}</span>
                                    <div class="w-full flex items-end justify-center" style="height: 120px;">
                                        <div class="w-full bg-gradient-to-t ${color} rounded-t-lg shadow-lg relative"
                                             style="height: ${Math.max(heightPct, 3)}%; min-height: 3px; animation: barGrow 0.8s ${300 + i * 100}ms ease-out both; transform-style: preserve-3d;">
                                            <div class="absolute -right-1 top-0 w-1 h-full bg-black/15 rounded-tr-sm" style="transform: skewY(-10deg); transform-origin: top right;"></div>
                                            <div class="absolute top-0 left-0 right-0 h-1 bg-white/25 rounded-t-lg"></div>
                                        </div>
                                    </div>
                                    <span class="text-[10px] font-bold ${d.isToday ? 'text-primary' : 'text-slate-400'}">${d.label}</span>
                                    ${d.count > 0 ? '<span class="text-[8px] text-slate-400">' + d.count + 's</span>' : ''}
                                </div>`;
    }).join('')}
                        </div>
                    </div>
                </div>
            </section>

            <!-- Monthly Trend -->
            <section class="animate-slide-up space-y-3" style="animation-delay: 360ms">
                <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-primary/60 px-1">Tendencia Mensual</h3>
                <div class="bg-white dark:bg-slate-900/80 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div class="flex items-end justify-between gap-3 h-32">
                        ${monthlyData.map((d, i) => {
        const heightPct = maxMonthValue > 0 ? (d.value / maxMonthValue * 100) : 0;
        const isLast = i === monthlyData.length - 1;
        return `
                            <div class="flex-1 flex flex-col items-center gap-1">
                                <span class="text-[9px] font-bold ${isLast ? 'text-primary' : 'text-slate-400'}">${d.value > 0 ? '$' + (d.value / 1000).toFixed(0) + 'k' : '-'}</span>
                                <div class="w-full rounded-t-lg bg-gradient-to-t ${isLast ? 'from-primary/80 to-primary' : 'from-slate-200 dark:from-slate-700 to-slate-300 dark:to-slate-600'} shadow-sm"
                                     style="height: ${Math.max(heightPct, 3)}%; min-height: 4px; animation: barGrow 0.6s ${i * 80}ms ease-out both;"></div>
                                <span class="text-[10px] font-bold ${isLast ? 'text-primary' : 'text-slate-400'} capitalize">${d.label}</span>
                            </div>`;
    }).join('')}
                    </div>
                </div>
            </section>

            <!-- Earnings by Type -->
            <section class="animate-slide-up space-y-3" style="animation-delay: 420ms">
                <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-primary/60 px-1">Por Tipo de Servicio</h3>
                <div class="bg-white dark:bg-slate-900/80 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                    ${[
            { label: 'Público', count: publicServices.length, total: publicTotal, color: 'primary', icon: 'account_balance', gradient: 'from-primary to-blue-400' },
            { label: 'Privado', count: privateServices.length, total: privateTotal, color: 'purple-500', icon: 'storefront', gradient: 'from-purple-500 to-pink-500' },
            { label: 'OSPES', count: ospesServices.length, total: ospesTotal, color: 'cyan-500', icon: 'local_hospital', gradient: 'from-cyan-500 to-teal-500' }
        ].map((type, i) => {
            const pct = totalEarnings > 0 ? (type.total / totalEarnings * 100).toFixed(0) : 0;
            return `
                        <div class="flex items-center gap-4 p-4 ${i > 0 ? 'border-t border-slate-100 dark:border-slate-800' : ''}">
                            <div class="size-10 rounded-xl bg-gradient-to-br ${type.gradient} flex items-center justify-center text-white shadow-sm">
                                <span class="material-symbols-outlined text-lg">${type.icon}</span>
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="flex justify-between items-center mb-1">
                                    <span class="text-sm font-bold dark:text-white">${type.label}</span>
                                    <span class="text-sm font-extrabold text-${type.color}">$${type.total.toLocaleString('es-AR')}</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <div class="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div class="h-full bg-gradient-to-r ${type.gradient} rounded-full" style="width: ${pct}%; animation: barGrow 0.8s ${i * 150}ms ease-out both;"></div>
                                    </div>
                                    <span class="text-[10px] text-slate-400 font-medium">${pct}%</span>
                                </div>
                                <span class="text-[10px] text-slate-400">${type.count} servicios</span>
                            </div>
                        </div>`;
        }).join('')}
                </div>
            </section>

            <!-- Status Overview -->
            <section class="animate-slide-up space-y-3" style="animation-delay: 480ms">
                <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-primary/60 px-1">Estado de Pagos</h3>
                <div class="grid grid-cols-2 gap-3">
                    <div class="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 text-center">
                        <span class="material-symbols-outlined text-green-400 text-2xl">check_circle</span>
                        <p class="text-xl font-black text-green-400 mt-1">${paidServices}</p>
                        <p class="text-[10px] text-green-400/70 font-medium">Liquidados</p>
                    </div>
                    <div class="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-center">
                        <span class="material-symbols-outlined text-amber-400 text-2xl">hourglass_top</span>
                        <p class="text-xl font-black text-amber-400 mt-1">$${pendingEarnings.toLocaleString('es-AR')}</p>
                        <p class="text-[10px] text-amber-400/70 font-medium">Pendiente</p>
                    </div>
                </div>
            </section>

        </main>
        ${renderBottomNav('stats')}
    `;
}

/**
 * Render Full History View
 */
function renderHistory(container) {
    const sortedServices = [...store.services].sort((a, b) => new Date(b.date) - new Date(a.date));

    container.innerHTML = `
    <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center justify-between">
            <button onclick="window.history.back()" class="size-10 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-400 transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 class="text-lg font-bold text-white">Historial Completo</h1>
            <div class="w-10"></div>
        </header>

    <main class="space-y-4 pb-32">
        <!-- Ad Banner Top -->
        ${renderAdBanner()}

        <div class="px-4 space-y-3">
            ${sortedServices.map(s => {
        const isPub = s.type === 'Public';
        const colorClass = isPub ? 'text-accent-cyan' : 'text-service-ospe';
        const bgClass = isPub ? 'bg-accent-cyan/10' : 'bg-service-ospe/10';
        const icon = isPub ? 'account_balance' : 'shopping_cart';
        return `
                        <div onclick="window.location.hash='#details?id=${s.id}'" class="glass-card p-4 rounded-2xl flex items-center justify-between border-white/5 cursor-pointer hover:bg-white/5 transition-colors">
                            <div class="flex items-center gap-4">
                                <div class="size-12 rounded-xl ${bgClass} flex items-center justify-center ${colorClass}">
                                    <span class="material-symbols-outlined">${icon}</span>
                                </div>
                                <div>
                                    <p class="font-bold text-sm text-white">${s.location}</p>
                                    <div class="flex items-center gap-2 mt-0.5">
                                        <span class="text-[11px] text-slate-400">${store.getFormattedDate(s.date)} • ${s.hours}h</span>
                                        ${s.status === 'paid' ? '<span class="text-[10px] text-green-400 font-bold bg-green-500/10 px-1.5 rounded">PAGADO</span>' : ''}
                                    </div>
                                </div>
                            </div>
                            <span class="material-symbols-outlined text-slate-600">chevron_right</span>
                        </div>
                     `;
    }).join('')}

            ${sortedServices.length === 0 ? '<p class="text-center text-slate-500 py-10">No hay servicios registrados.</p>' : ''}
        </div>
    </main>
        ${renderBottomNav('financial')}
`;
}

/**
 * Render Asistente Virtual Hub
 */
function renderAsistenteHub(container) {
    if (!container) container = document.getElementById('app');

    const tools = [
        { id: 'centinela', title: 'Centinela AI', desc: 'Asistente legal entrenado con la Ley 12.521.', icon: 'smart_toy', color: 'from-primary to-blue-500', route: '#asistente/centinela', badge: 'Nuevo' },
        { id: 'partes', title: 'Partes Inteligentes', desc: 'Convierte notas en informes profesionales.', icon: 'edit_note', color: 'from-purple-500 to-indigo-500', route: '#asistente/partes' },
        { id: 'crono', title: 'Crono-Calendario', desc: 'Gestioná tus tercios y ciclos de guardia.', icon: 'calendar_month', color: 'from-emerald-500 to-teal-500', route: '#asistente/crono' },
        { id: 'directorio', title: 'Directorio Policial', desc: 'Números de emergencia interna.', icon: 'contact_phone', color: 'from-amber-500 to-orange-500', route: '#asistente/directorio' },
        { id: 'checklist', title: 'Checklist de Guardia', desc: 'Verificación de equipo esencial.', icon: 'fact_check', color: 'from-rose-500 to-pink-500', route: '#asistente/checklist' }
    ];

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center justify-between">
            <h1 class="text-xl font-bold text-white tracking-tight">Asistente Virtual</h1>
            <div class="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-lg shadow-primary/10">
                <span class="material-symbols-outlined">smart_toy</span>
            </div>
        </header>

        <main class="p-6 space-y-6 pb-32 max-w-md mx-auto animate-fade-in">
            <div class="space-y-2">
                <h2 class="text-sm font-bold text-slate-500 uppercase tracking-widest px-1">Inteligencia y Utilidades</h2>
                <p class="text-xs text-slate-400 px-1">Herramientas diseñadas exclusivamente para la Policía de Santa Fe.</p>
            </div>

            <div class="grid gap-4">
                ${tools.map((tool, i) => `
                    <div onclick="router.navigateTo('${tool.route}')" 
                        class="group relative overflow-hidden glass-card p-5 rounded-3xl border border-white/5 hover:border-primary/30 transition-all active:scale-[0.98] cursor-pointer"
                        style="animation-delay: ${i * 100}ms">
                        
                        <div class="absolute -right-4 -top-4 size-24 bg-gradient-to-br ${tool.color} opacity-5 blur-2xl group-hover:opacity-20 transition-opacity"></div>
                        
                        <div class="flex gap-4 items-start relative z-10">
                            <div class="size-12 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 relative">
                                <span class="material-symbols-outlined text-2xl">${tool.icon}</span>
                                ${tool.badge ? `<span class="absolute -top-1 -right-1 flex h-3 w-3"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span><span class="relative inline-flex rounded-full h-3 w-3 bg-amber-500 border border-background-dark"></span></span>` : ''}
                            </div>
                            <div class="flex-1 space-y-1">
                                <h3 class="font-bold text-white group-hover:text-primary transition-colors">${tool.title}</h3>
                                <p class="text-xs text-slate-400 leading-relaxed">${tool.desc}</p>
                            </div>
                            <span class="material-symbols-outlined text-slate-700 self-center">chevron_right</span>
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- Feedback Section -->
            <div class="mt-8 p-6 glass-card rounded-3xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                <div class="flex items-center gap-3 mb-4">
                    <div class="size-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500">
                        <span class="material-symbols-outlined text-sm">edit_square</span>
                    </div>
                    <h3 class="font-bold text-white text-sm">Buzón de Sugerencias</h3>
                </div>
                <p class="text-[11px] text-slate-400 mb-4">¿Te gustaría que Centinela sepa algo más? Tu opinión nos ayuda a mejorar el servicio.</p>
                <form id="feedback-form" class="space-y-3">
                    <div class="flex gap-2 justify-center mb-1">
                        ${[1, 2, 3, 4, 5].map(n => `
                            <button type="button" onclick="window.setFeedbackRating(${n})" class="feedback-star size-8 text-slate-600 transition-colors" data-value="${n}">
                                <span class="material-symbols-outlined">star</span>
                            </button>
                        `).join('')}
                    </div>
                    <input type="hidden" id="feedback-rating" value="5">
                    <textarea id="feedback-comment" placeholder="Escribe tu mensaje aquí..." 
                        class="w-full bg-white/5 border border-white/10 rounded-2xl p-3 text-xs text-white focus:ring-1 focus:ring-primary outline-none transition-all h-20 resize-none"></textarea>
                    <button type="submit" class="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all active:scale-95">
                        Enviar Reseña
                    </button>
                </form>
            </div>

            <!-- Global Support Section -->
            <div onclick="window.showDonationModal()" class="mt-4 group p-5 glass-card rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 to-transparent flex items-center gap-4 cursor-pointer active:scale-95 transition-all">
                <div class="size-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <span class="material-symbols-outlined">favorite</span>
                </div>
                <div class="flex-1">
                    <h4 class="text-sm font-bold text-white">¿Te gusta la App?</h4>
                    <p class="text-[10px] text-slate-400">Apoyá el desarrollo y ayudanos a crecer.</p>
                </div>
                <span class="material-symbols-outlined text-slate-600 group-hover:text-white transition-colors">arrow_forward</span>
            </div>
        </main>
        ${renderBottomNav('asistente')}
    `;

    // Local Handlers
    window.setFeedbackRating = (rating) => {
        document.getElementById('feedback-rating').value = rating;
        document.querySelectorAll('.feedback-star').forEach((btn, i) => {
            btn.classList.toggle('text-amber-400', i < rating);
            btn.classList.toggle('text-slate-600', i >= rating);
        });
    };
    window.setFeedbackRating(5); // Default

    const fForm = document.getElementById('feedback-form');
    fForm.onsubmit = async (e) => {
        e.preventDefault();
        const rating = document.getElementById('feedback-rating').value;
        const comment = document.getElementById('feedback-comment').value.trim();

        if (!comment) {
            showToast("Por favor, escribe un comentario");
            return;
        }

        const btn = fForm.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.innerText = "Enviando...";

        const success = await DB.addReview(rating, comment);
        if (success) {
            fForm.reset();
            window.setFeedbackRating(5);
            showToast("¡Gracias por tu feedback! ⭐");
        } else {
            showToast("Error al enviar la reseña");
        }
        btn.disabled = false;
        btn.innerText = "Enviar Reseña";
    };
}

/**
 * Announcement Modal v2.1
 */
function showAnnouncementModal() {
    const hasSeen = localStorage.getItem('seen_v2_1_1_announcement');
    if (hasSeen) return;

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-background-dark/95 backdrop-blur-md animate-fade-in';
    modal.innerHTML = `
        <div class="max-w-xs w-full glass-card p-6 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-6 text-center animate-scale-up">
            <div class="size-20 bg-gradient-to-br from-primary to-blue-600 rounded-3xl mx-auto flex items-center justify-center text-white shadow-xl shadow-primary/20">
                <span class="material-symbols-outlined text-4xl">rocket_launch</span>
            </div>
            
            <div class="space-y-2">
                <h2 class="text-xl font-black text-white">¡App Actualizada!</h2>
                <p class="text-xs text-slate-400 leading-relaxed">Bienvenido a la versión **Final (PRO)** con todas las funciones policiales habilitadas.</p>
            </div>

            <div class="space-y-3 text-left">
                <div class="flex gap-3 items-center p-3 rounded-2xl bg-white/5 border border-white/5">
                    <span class="material-symbols-outlined text-amber-500">smart_toy</span>
                    <p class="text-[11px] text-slate-200">**Centinela AI v2**: Base legal expandida y respuestas inteligentes para oficiales.</p>
                </div>
                <div class="flex gap-3 items-center p-3 rounded-2xl bg-white/5 border border-white/5">
                    <span class="material-symbols-outlined text-emerald-500">volunteer_activism</span>
                    <p class="text-[11px] text-slate-200">**Apoyo al Proyecto**: Nueva sección en Perfil para colaborar con el crecimiento.</p>
                </div>
                <div class="flex gap-3 items-center p-3 rounded-2xl bg-white/5 border border-white/5">
                    <span class="material-symbols-outlined text-purple-500">rate_review</span>
                    <p class="text-[11px] text-slate-200">**Buzón de Ideas**: Envíanos tus sugerencias directamente desde el Asistente.</p>
                </div>
            </div>

            <button id="close-announcement" class="w-full py-4 rounded-2xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/25 active:scale-95 transition-all">
                ¡Empezar a usar!
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('close-announcement').onclick = () => {
        localStorage.setItem('seen_v2_1_1_announcement', 'true');
        modal.classList.add('animate-fade-out');
        setTimeout(() => modal.remove(), 300);
    };
}

/**
 * Render Directorio Policial
 */
function renderDirectorioPolicial(container) {
    const contacts = [
        { name: 'Cuerpo Médico Rosario', tel: '03414234567', icon: 'medical_services' },
        { name: 'Cuerpo Médico Santa Fe', tel: '03424578900', icon: 'medical_services' },
        { name: 'Asesoría Letrada (D-1)', tel: '03424567890', icon: 'gavel' },
        { name: 'Bienestar Policial', tel: '03424812345', icon: 'volunteer_activism' },
        { name: 'Emergencia Policial (911)', tel: '911', icon: 'emergency' },
        { name: 'Caja de Pensiones', tel: '08005551234', icon: 'payments' },
        { name: 'IAPOS Urgencias', tel: '08004442767', icon: 'local_hospital' },
    ];

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center gap-4">
            <button onclick="router.navigateTo('#asistente')" class="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 class="text-xl font-bold text-white tracking-tight">Directorio Policial</h1>
        </header>

        <main class="p-6 space-y-4 pb-32 max-w-md mx-auto animate-fade-in">
            <div class="px-1 mb-6">
                <p class="text-sm text-slate-400">Números de contacto internos y de emergencia para el personal policial de la provincia.</p>
            </div>

            <div class="space-y-3">
                ${contacts.map(c => `
                    <div class="glass-card p-4 rounded-2xl border border-white/5 flex items-center justify-between group">
                        <div class="flex items-center gap-4">
                            <div class="size-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                                <span class="material-symbols-outlined">${c.icon}</span>
                            </div>
                            <div>
                                <h3 class="font-bold text-white text-sm">${c.name}</h3>
                                <p class="text-[11px] text-slate-500 font-mono tracking-wider">${c.tel}</p>
                            </div>
                        </div>
                        <a href="tel:${c.tel.replace(/[^0-9]/g, '')}" class="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-lg">
                            <span class="material-symbols-outlined text-sm">call</span>
                        </a>
                    </div>
                `).join('')}
            </div>

            ${renderAdBanner()}
        </main>
        ${renderBottomNav('asistente')}
    `;
}

/**
 * Render Checklist de Guardia
 */
function renderChecklistGuardia(container) {
    const items = [
        { id: 'arma', label: 'Arma Reglamentaria y Munición', icon: 'shield' },
        { id: 'cargador', label: 'Cargadores Adicionales', icon: 'vibration' },
        { id: 'esposas', label: 'Esposas y Llave', icon: 'link' },
        { id: 'linterna', label: 'Linterna con carga', icon: 'flashlight_on' },
        { id: 'libreta', label: 'Libreta de Anotaciones y Birome', icon: 'edit' },
        { id: 'celular', label: 'Celular con carga y datos', icon: 'smartphone' },
        { id: 'doc', label: 'Credencial y Documentación', icon: 'badge' },
    ];

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center gap-4">
            <button onclick="router.navigateTo('#asistente')" class="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 class="text-xl font-bold text-white tracking-tight">Checklist de Guardia</h1>
        </header>

        <main class="p-6 space-y-6 pb-32 max-w-md mx-auto animate-fade-in">
            <div class="flex items-center justify-between px-1">
                <div>
                    <h2 class="text-xs font-bold text-slate-500 uppercase tracking-widest">Equipo de Servicio</h2>
                    <p class="text-[10px] text-slate-500 mt-1">Verificá tu equipo antes de tomar el servicio.</p>
                </div>
                <button onclick="resetChecklist()" class="text-[10px] font-bold text-primary px-3 py-1.5 bg-primary/5 rounded-full border border-primary/20">Reiniciar</button>
            </div>

            <div class="space-y-3">
                ${items.map(item => `
                    <label class="glass-card p-4 rounded-2xl border border-white/5 flex items-center gap-4 cursor-pointer active:bg-white/5 transition-colors">
                        <input type="checkbox" class="size-6 rounded-lg bg-slate-800 border-white/10 text-primary focus:ring-primary/20 accent-primary" onchange="saveCheckState('${item.id}', this.checked)">
                        <span class="material-symbols-outlined text-slate-600">${item.icon}</span>
                        <span class="flex-1 text-sm font-medium text-slate-300">${item.label}</span>
                    </label>
                `).join('')}
            </div>

            ${renderAdBanner()}
        </main>
        ${renderBottomNav('asistente')}
    `;

    // Global helpers for checklist (temporary location)
    window.saveCheckState = (id, checked) => {
        const state = JSON.parse(localStorage.getItem('police_checklist') || '{}');
        state[id] = checked;
        localStorage.setItem('police_checklist', JSON.stringify(state));
    };

    window.resetChecklist = () => {
        localStorage.removeItem('police_checklist');
        renderChecklistGuardia(container);
    };

    // Restore state
    const savedState = JSON.parse(localStorage.getItem('police_checklist') || '{}');
    container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        const id = cb.getAttribute('onchange').match(/'([^']+)'/)[1];
        if (savedState[id]) cb.checked = true;
    });
}

/**
 * Render Crono-Calendario
 */
function renderCronoCalendario(container) {
    const cycles = [
        { id: '24x48', name: 'Ciclo 24x48', desc: 'Trabaja 24h, descansa 48h' },
        { id: '12x36', name: 'Ciclo 12x36', desc: 'Trabaja 12h, descansa 36h' },
        { id: 'tercios', name: 'Tercios (8h)', desc: 'Sistema tradicional de 3 turnos' },
    ];

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center gap-4">
            <button onclick="router.navigateTo('#asistente')" class="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 class="text-xl font-bold text-white tracking-tight">Crono-Calendario</h1>
        </header>

        <main class="p-6 space-y-8 pb-32 max-w-md mx-auto animate-fade-in">
            <section class="space-y-4">
                <div class="px-1">
                    <h2 class="text-sm font-bold text-slate-500 uppercase tracking-widest">Configurar Ciclo</h2>
                    <p class="text-xs text-slate-500 mt-1">Elegí tu régimen de trabajo para proyectar tus guardias.</p>
                </div>

                <div class="grid gap-3">
                    ${cycles.map(c => `
                        <div onclick="setDutyCycle('${c.id}')" class="glass-card p-4 rounded-2xl border border-white/5 hover:border-primary/30 transition-all cursor-pointer group">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="font-bold text-white group-hover:text-primary transition-colors">${c.name}</h3>
                                    <p class="text-[11px] text-slate-500">${c.desc}</p>
                                </div>
                                <span class="material-symbols-outlined text-slate-700">radio_button_unchecked</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>

            <section id="calendar-projection" class="space-y-4 hidden">
                <div class="px-1 border-t border-white/5 pt-6 flex items-center justify-between">
                    <h2 class="text-sm font-bold text-slate-500 uppercase tracking-widest text-primary">Próximas Guardias</h2>
                    <button onclick="router.navigateTo('#asistente/crono')" class="text-[10px] text-slate-500 underline">Cambiar fecha inicio</button>
                </div>
                <div id="shifts-list" class="space-y-2">
                    <!-- Dynamic Shifts -->
                </div>
            </section>

            ${renderAdBanner()}
        </main>
        ${renderBottomNav('asistente')}
    `;

    window.setDutyCycle = (type) => {
        const startDate = prompt("Ingresá la fecha de tu próxima guardia (YYYY-MM-DD):", store.getLocalDateString());
        if (!startDate) return;

        showToast(`Ciclo ${type} activado`);
        const projection = document.getElementById('calendar-projection');
        projection.classList.remove('hidden');

        const list = document.getElementById('shifts-list');
        const start = new Date(startDate + 'T00:00:00');
        let html = '';

        for (let i = 0; i < 10; i++) {
            const shiftDate = new Date(start);
            if (type === '24x48') shiftDate.setDate(start.getDate() + (i * 3));
            else if (type === '12x36') shiftDate.setDate(start.getDate() + (i * 2));
            else shiftDate.setDate(start.getDate() + i); // Placeholder for others

            html += `
                <div class="glass-card p-3 rounded-xl border border-white/5 flex items-center gap-4 bg-primary/5">
                    <div class="size-10 rounded-lg bg-primary/20 flex flex-col items-center justify-center text-primary">
                        <span class="text-[10px] font-bold uppercase">${shiftDate.toLocaleDateString('es-ES', { weekday: 'short' })}</span>
                        <span class="text-sm font-black">${shiftDate.getDate()}</span>
                    </div>
                    <div>
                        <p class="text-xs font-bold text-white">Servicio Activo</p>
                        <p class="text-[10px] text-slate-500 uppercase">${shiftDate.toLocaleDateString('es-ES', { month: 'long' })}</p>
                    </div>
                </div>
            `;
        }
        list.innerHTML = html;
    };
}

/**
 * Render Centinela AI (Legal Assistant)
 */
function renderCentinela(container) {
    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center gap-4">
            <button onclick="router.navigateTo('#asistente')" class="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <div class="flex flex-col">
                <h1 class="text-sm font-black text-white leading-none">Centinela AI</h1>
                <span class="text-[10px] text-primary flex items-center gap-1">
                    <span class="relative flex h-2 w-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Base Legal SF Actualizada
                </span>
            </div>
        </header>

        <main class="flex flex-col h-[calc(100vh-4rem)] bg-background-dark overflow-hidden">
            <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-4 pb-10">
                <div class="flex gap-3 max-w-[85%]">
                    <div class="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                        <span class="material-symbols-outlined text-sm">smart_toy</span>
                    </div>
                    <div class="bg-white/5 border border-white/5 p-3 rounded-2xl rounded-tl-none">
                        <p class="text-xs text-slate-200 leading-relaxed">
                            Hola, soy Centinela. Estoy entrenado con la **Ley 12.521**, el **Decreto 461** (Régimen Disciplinario) y reglamentos de licencias.
                            <br><br>
                            ¿En qué puedo asesorarte hoy?
                        </p>
                    </div>
                </div>
            </div>

            <!-- Input Area -->
            <div class="p-4 bg-slate-900/50 border-t border-white/5 pb-10">
                <form id="centinela-form" class="relative flex items-center gap-2">
                    <input type="text" id="chat-input" placeholder="Preguntá sobre licencias, faltas..." 
                        class="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-primary outline-none transition-all pr-12">
                    <button type="submit" class="absolute right-1 size-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 active:scale-90 transition-all">
                        <span class="material-symbols-outlined">send</span>
                    </button>
                </form>
                <p class="text-[9px] text-center text-slate-500 mt-3 uppercase tracking-tighter">La IA puede cometer errores. Consultá siempre con tu superior.</p>
            </div>
        </main>
    `;

    // Global helper to show donation modal (Avoids exposure in profile)
    window.showDonationModal = () => {
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-end justify-center animate-fade-in';
        overlay.innerHTML = `
            <div class="bg-slate-900 w-full max-w-md rounded-t-[2.5rem] border-t border-white/10 p-8 pb-12 animate-slide-up shadow-2xl shadow-primary/20">
                <div class="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-6"></div>
                
                <div class="flex items-center gap-4 mb-6">
                    <div class="size-14 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500 shadow-lg shadow-amber-500/10">
                        <span class="material-symbols-outlined text-3xl">volunteer_activism</span>
                    </div>
                    <div>
                        <h3 class="font-bold text-white text-lg">Apoyar el Proyecto</h3>
                        <p class="text-xs text-amber-500/70 font-bold uppercase tracking-widest">Sustento del Desarrollador</p>
                    </div>
                </div>

                <p class="text-sm text-slate-400 leading-relaxed mb-8">
                    Mantener los servidores y el desarrollo constante lleva tiempo y costos. Si esta herramienta te ayuda en tu labor diaria, tu colaboración es fundamental para que siga siendo gratuita.
                </p>

                <div class="space-y-4 mb-8">
                    <div onclick="copyToClipboard('SmartFlow.Digital', 'Alias')" class="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-all active:scale-95 group">
                        <div>
                            <p class="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Alias Mercado Pago</p>
                            <p class="text-base font-mono font-bold text-white group-hover:text-amber-400 transition-colors">SmartFlow.Digital</p>
                        </div>
                        <span class="material-symbols-outlined text-slate-600 group-hover:text-white transition-colors">content_copy</span>
                    </div>

                    <div onclick="copyToClipboard('0000003100001906497190', 'CVU')" class="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-all active:scale-95 group">
                        <div>
                            <p class="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">CVU</p>
                            <p class="text-xs font-mono font-bold text-white group-hover:text-amber-400 transition-colors">0000003100001906497190</p>
                        </div>
                        <span class="material-symbols-outlined text-slate-600 group-hover:text-white transition-colors">content_copy</span>
                    </div>
                </div>

                <button onclick="this.closest('.fixed').remove()" class="w-full py-4 text-sm font-bold text-slate-400 hover:text-white transition-colors">
                    Cerrar
                </button>
            </div>
        `;
        overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
        document.body.appendChild(overlay);
    };

    const form = document.getElementById('centinela-form');
    const input = document.getElementById('chat-input');
    const chat = document.getElementById('chat-messages');

    const knowledgeBase = [
        {
            category: 'licencias',
            keywords: ['licencia', 'vacaciones', 'paternidad', 'maternidad', 'enfermedad', 'familiar', 'fallecimiento', 'estudio'],
            responses: [
                {
                    match: ['paternidad', 'nacimiento', 'hijo'],
                    text: "Según el **Decreto 4157/15**, te corresponden **15 días corridos** de licencia por paternidad. Debes presentar el acta de nacimiento dentro de los 3 días posteriores al reintegro."
                },
                {
                    match: ['maternidad', 'embarazo'],
                    text: "La licencia por maternidad comprende **90 días corridos** (divididos en 45 días antes y 45 después del parto). Está regulada por la Ley 12.521 y decretos complementarios."
                },
                {
                    match: ['vacaciones', 'anual', 'ordinaria'],
                    text: "La Licencia Anual Ordinaria depende de tu antigüedad:\n- Hasta 5 años: 15 días hábiles.\n- Hasta 10 años: 20 días hábiles.\n- Hasta 15 años: 25 días hábiles.\n- Más de 15 años: 30 días hábiles."
                },
                {
                    match: ['fallecimiento', 'duelo'],
                    text: "Por fallecimiento de cónyuge, hijos o padres: **5 días corridos**. Por hermanos o abuelos: **2 días corridos**. Según Decreto 4157."
                }
            ],
            default: "El régimen de licencias está regulado por el **Decreto 4157/15**. ¿Sobre qué tipo de licencia específica necesitas información (Paternidad, Médica, Familiar, Ordinaria)?"
        },
        {
            category: 'disciplina',
            keywords: ['falta', 'sancion', 'arresto', 'suspension', 'disciplinario', 'sumario', 'sumarials'],
            responses: [
                {
                    match: ['leves', 'demora', 'uniforme', 'aseo'],
                    text: "Las **Faltas Leves** (Art. 41 del Decreto 461/15) incluyen: demoras injustificadas, descuido en el aseo o uniforme y falta de respeto a subalternos. Sanción: apercibimiento o hasta 10 días de arresto."
                },
                {
                    match: ['graves', 'abandono', 'ebriedad', 'violencia', 'maltrato'],
                    text: "Las **Faltas Graves** (Art. 42) incluyen: abandono de servicio, ebriedad en servicio o violencia de género. Sanción: desde 11 días de suspensión hasta la Destitución (Cesantía/Exoneración)."
                }
            ],
            default: "El Régimen Disciplinario se rige por el **Decreto 461/15**. Clasifica las faltas en Leves y Graves. ¿Querés saber sobre alguna conducta o sanción específica?"
        },
        {
            category: 'jerarquia',
            keywords: ['ascenso', 'jerarquia', 'escalafon', 'oficial', 'suboficial', 'grado', 'promocion'],
            responses: [
                {
                    match: ['ascenso', 'concurso', 'grado', 'junta'],
                    text: "Los ascensos se realizan mediante concursos de oposición y antecedentes (Ley 12.521). Debes tener el tiempo mínimo en el grado y aprobar los cursos del ISeP correspondientes."
                }
            ],
            default: "La carrera policial administrativa y el sistema de grados está definido en la **Ley 12.521**, Capítulos IV y V."
        },
        {
            category: 'beneficios',
            keywords: ['sueldo', 'haberes', 'suplemento', 'titulo', 'recargo', 'antigüedad'],
            responses: [
                {
                    match: ['titulo'],
                    text: "El suplemento por título depende del nivel: Terciario (15%), Universitario (25%) calculado sobre el sueldo básico del grado."
                },
                {
                    match: ['recargo', 'hora', 'descanso'],
                    text: "Por cada recargo de servicio, te corresponde el descanso compensatorio equivalente al tiempo recargado. Ley 12.521, Art 81."
                },
                {
                    match: ['retroactivo', 'cobrar atrasado', 'pago retroactivo', 'diferencia'],
                    text: "Los **Pagos Retroactivos** suelen corresponder a diferencias salariales por ascensos, suplementos mal liquidados o decretos de aumento con fecha anterior. Debes verificar el concepto en tu recibo (`Cód. 1045` generalmente para retroactivos) y asegurar que el decreto que otorgó el beneficio así lo estipule."
                }
            ],
            default: "Los beneficios económicos y recargos están contemplados en la Ley 12.521. ¿Necesitás info sobre Títulos, Antigüedad o Recargos?"
        }
    ];

    form.onsubmit = async (e) => {
        e.preventDefault();
        const msg = input.value.trim();
        if (!msg) return;

        appendMessage('user', msg);
        input.value = '';

        const thinkingId = 'thinking-' + Date.now();
        appendMessage('bot', '<span class="animate-pulse">Consultando base legal...</span>', thinkingId);

        setTimeout(() => {
            const el = document.getElementById(thinkingId);
            const lowerMsg = msg.toLowerCase();
            let finalResponse = "";

            // Finding category
            const categoryMatch = knowledgeBase.find(c => c.keywords.some(k => lowerMsg.includes(k)));

            if (categoryMatch) {
                // Finding specific response within category
                const specificSub = categoryMatch.responses.find(r => r.match.some(m => lowerMsg.includes(m)));
                finalResponse = specificSub ? specificSub.text : categoryMatch.default;
            } else {
                finalResponse = "Entiendo tu consulta, pero no encuentro un artículo específico en mi base actual. Como IA centrada en el marco legal de la **Policía de Santa Fe**, me especializo exclusivamente en la **Ley 12.521**, el **Decreto 461** (Disciplina) y el **Decreto 4157** (Licencias). \n\n**¿Por qué sucede esto?** Puede que tu pregunta sea sobre temas operativos o municipales, o que necesite términos más claros como 'licencia', 'falta' o 'suplemento'.";
            }

            el.innerHTML = `<p class="text-xs text-slate-200 leading-relaxed">${finalResponse}</p>`;
            chat.scrollTop = chat.scrollHeight;
        }, 800);
    };


    function appendMessage(role, text, id = null) {
        const div = document.createElement('div');
        div.className = role === 'user' ? 'flex justify-end' : 'flex gap-3 max-w-[85%]';
        div.innerHTML = role === 'user' ? `
            <div class="bg-primary p-3 rounded-2xl rounded-tr-none max-w-[85%] shadow-lg shadow-primary/10">
                <p class="text-xs text-white leading-relaxed">${text}</p>
            </div>
        ` : `
            <div class="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <span class="material-symbols-outlined text-sm">smart_toy</span>
            </div>
            <div class="bg-white/10 border border-white/10 p-3 rounded-2xl rounded-tl-none projet-assistant" id="${id || ''}">
                <p class="text-xs text-slate-200 leading-relaxed">${text}</p>
            </div>
        `;
        chat.appendChild(div);
        chat.scrollTop = chat.scrollHeight;
    }
}

/**
 * Render Partes Inteligentes
 */
function renderPartesInteligentes(container) {
    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center gap-4">
            <button onclick="router.navigateTo('#asistente')" class="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 class="text-xl font-bold text-white tracking-tight">Partes Inteligentes</h1>
        </header>

        <main class="p-6 space-y-6 pb-32 max-w-md mx-auto animate-fade-in">
            <div class="px-1 space-y-1">
                <h2 class="text-xs font-bold text-slate-500 uppercase tracking-widest">Generador de Informes</h2>
                <p class="text-[11px] text-slate-400">Ingresá los datos clave y la IA redactará el parte formal.</p>
            </div>

            <section class="space-y-4">
                <div class="glass-card p-5 rounded-3xl border border-white/5 space-y-4">
                    <div class="space-y-2">
                        <label class="text-[10px] font-bold text-primary uppercase ml-1">Notas de Campo</label>
                        <textarea id="parte-raw-input" placeholder="Ej: Calle Mendoza 3000, 22hs, robo de cables, masculino detenido, 25 años, cuchillo..." 
                            class="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-white focus:ring-1 focus:ring-primary outline-none transition-all resize-none"></textarea>
                    </div>

                    <button onclick="generateParte()" id="btn-generate-parte" class="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-all">
                        <span class="material-symbols-outlined text-xl">auto_awesome</span>
                        Generar Parte Formal
                    </button>
                </div>

                <div id="parte-result-container" class="hidden space-y-4">
                    <div class="px-1 border-t border-white/5 pt-6">
                        <h3 class="text-sm font-bold text-slate-500 uppercase tracking-widest">Resultado AI</h3>
                    </div>
                    <div class="glass-card p-5 rounded-3xl border border-primary/20 bg-primary/5 relative">
                        <pre id="parte-output" class="text-xs text-slate-200 whitespace-pre-wrap font-sans leading-relaxed"></pre>
                        <button onclick="copyParte()" class="absolute top-4 right-4 size-10 rounded-xl bg-white/10 flex items-center justify-center text-white active:scale-90 transition-all">
                            <span class="material-symbols-outlined text-sm">content_copy</span>
                        </button>
                    </div>
                    <p class="text-[9px] text-center text-slate-500 uppercase tracking-tighter">Revisá siempre la redacción antes de enviarla.</p>
                </div>
            </section>

            ${renderAdBanner()}
        </main>
        ${renderBottomNav('asistente')}
    `;

    window.generateParte = () => {
        const input = document.getElementById('parte-raw-input').value.trim();
        if (!input) return showToast("Escribí algunas notas primero");

        const btn = document.getElementById('btn-generate-parte');
        btn.disabled = true;
        btn.innerHTML = `<span class="animate-spin material-symbols-outlined">sync</span> Redactando...`;

        setTimeout(() => {
            const container = document.getElementById('parte-result-container');
            const output = document.getElementById('parte-output');

            // Basic transformation logic (mocking AI behavior)
            const lines = input.split(',').map(l => l.trim());
            const now = new Date();
            const dateStr = now.toLocaleDateString('es-AR');
            const timeStr = now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

            let parte = `PARTIDO PREVENTIVO - POLICÍA DE SANTA FE\n`;
            parte += `FECHA: ${dateStr} - HORA: ${timeStr}\n\n`;
            parte += `En el día de la fecha, cumplimentando servicio de parada en zona asignada, se procede a la identificación y posterior aprehensión de un sujeto masculino...\n\n`;
            parte += `DETALLES SEGÚN NOVEDAD:\n`;
            lines.forEach(line => {
                parte += `• ${line.toUpperCase()}\n`;
            });
            parte += `\nSe traslada lo actuado a la Comisaría correspondiente por razones de jurisdicción. Se deja constancia de lo actuado ante testigos hábiles del procedimiento.`;

            output.innerText = parte;
            container.classList.remove('hidden');
            btn.disabled = false;
            btn.innerHTML = `<span class="material-symbols-outlined text-xl">auto_awesome</span> Generar Parte Formal`;

            container.scrollIntoView({ behavior: 'smooth' });
            showToast("✅ Parte redactado");
        }, 1500);
    };

    window.copyParte = () => {
        const text = document.getElementById('parte-output').innerText;
        navigator.clipboard.writeText(text);
        showToast("Copiado al portapapeles");
    };
}

// --- 4. SHARED COMPONENTS ---

function renderBottomNav(activeTab) {
    // Main navigation tabs (centered)
    const tabs = [
        { id: 'agenda', icon: 'calendar_today', label: 'Agenda', route: '#agenda' },
        { id: 'stats', icon: 'bar_chart', label: 'Stats', route: '#stats' },
        { id: 'asistente', icon: 'smart_toy', label: 'Asistente', route: '#asistente' },
        { id: 'control', icon: 'dashboard', label: 'Mi Panel', route: '#control' },
        { id: 'financial', icon: 'payments', label: 'Finanzas', route: '#financial' },
    ];

    // Only add Admin tab if user is admin
    if (store.user && store.user.role === 'admin') {
        tabs.push({ id: 'admin', icon: 'admin_panel_settings', label: 'Admin', route: '#admin' });
    }

    let navHtml = `
    < !--Bottom Navigation Bar-- >
        <nav class="fixed bottom-0 inset-x-0 bg-white/90 dark:bg-background-dark/95 backdrop-blur-xl border-t border-slate-200 dark:border-white/5 pb-6 pt-2 z-50">
            <div class="flex justify-center items-center gap-4 max-w-md mx-auto px-4">
    `;

    tabs.forEach(tab => {
        const isActive = activeTab === tab.id;
        const colorClass = isActive ? 'text-primary' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200';
        const iconStyle = isActive ? "font-variation-settings: 'FILL' 1" : "";

        navHtml += `
            <button onclick="router.navigateTo('${tab.route}')" class="flex flex-col items-center gap-1 ${colorClass} flex-1 group transition-colors">
                <span class="material-symbols-outlined group-active:scale-90 transition-transform" style="${iconStyle}">${tab.icon}</span>
                <span class="text-[10px] font-bold">${tab.label}</span>
            </button>
        `;
    });

    navHtml += `
            </div>
        </nav>

        <!--Floating Action Button-- >
    <div class="fixed bottom-20 right-6 z-50">
        <button onclick="router.navigateTo('#register')" class="size-16 rounded-full bg-primary text-white shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
            <span class="material-symbols-outlined text-3xl">add</span>
        </button>
    </div>
`;

    return navHtml;
}

// --- GLOBAL HANDLERS ---
window.handleGoogleLogin = async () => {
    try {
        await store.loginWithGoogle();
    } catch (e) {
        showToast("Error Google: " + e.message);
    }
};

window.handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = document.getElementById('password') ? document.getElementById('password').value : prompt("Ingresa tu clave:");

    if (!password) return;

    const btn = event.target.querySelector('button[type="submit"]');
    if (btn) {
        btn.disabled = true;
        btn.innerText = "Ingresando...";
    }

    await store.login(email, password);

    if (btn) {
        btn.disabled = false;
        btn.innerText = "Ingresar";
    }
};

// Init App
document.addEventListener('DOMContentLoaded', () => {
    router.init();

    // Register Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('SW Registered!', reg))
            .catch(err => console.error('SW Failed:', err));
    }
});

// PWA Install Prompt Logic
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // Show install button in profile if available
    const installBtn = document.getElementById('btn-install-app');
    if (installBtn) {
        installBtn.classList.remove('hidden');
    }
});

window.installApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome} `);
    deferredPrompt = null;
    document.getElementById('btn-install-app').classList.add('hidden');
};

// --- GLOBAL HELPERS (ADDED v2.1.3 PRO HOTFIX) ---

function getFormattedDate(dateStr) {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' });
}

function _formatAdminDate(dateStr) {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}

function _renderAdminKPICard(title, value, icon, gradient, textColor) {
    return `
        <div class="relative group glass-card p-6 rounded-3xl border border-white/5 bg-gradient-to-br ${gradient} overflow-hidden">
            <div class="absolute -right-4 -top-4 size-24 bg-gradient-to-br ${gradient} rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
            <div class="flex items-center gap-4 relative z-10">
                <div class="size-12 rounded-2xl bg-white/5 flex items-center justify-center ${textColor}">
                    <span class="material-symbols-outlined text-2xl">${icon}</span>
                </div>
            </div>
            <div class="mt-4 relative z-10">
                <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest">${title}</p>
                <p class="text-2xl font-black text-white mt-1">${value}</p>
            </div>
        </div>
    `;
}

window.showDonationModal = () => {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = '<div class="bg-[#1e293b] w-full max-w-sm rounded-3xl border border-white/10 p-6 shadow-2xl animate-scale-in">' +
        '<div class="flex items-center justify-between mb-6">' +
        '<h3 class="text-lg font-bold text-white flex items-center gap-2">' +
        '<span class="material-symbols-outlined text-primary">favorite</span>' +
        'Apoyar Proyecto' +
        '</h3>' +
        '<button onclick="this.closest(\'.fixed\').remove()" class="size-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white">' +
        '<span class="material-symbols-outlined">close</span>' +
        '</button>' +
        '</div>' +
        '<div class="space-y-4">' +
        '<p class="text-xs text-slate-400 leading-relaxed">' +
        'Si esta herramienta te es útil, podés colaborar con el mantenimiento del servidor y futuras mejoras.' +
        '</p>' +
        '<div class="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3">' +
        '<div>' +
        '<p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Alias MP</p>' +
        '<div class="flex items-center justify-between">' +
        '<p class="text-sm font-black text-white italic">espinosa.oimpa</p>' +
        '<button onclick="navigator.clipboard.writeText(\'espinosa.oimpa\'); showToast(\'Alias copiado\')" class="text-primary text-xs font-bold">Copiar</button>' +
        '</div>' +
        '</div>' +
        '<div class="pt-3 border-t border-white/10">' +
        '<p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">CVU</p>' +
        '<div class="flex items-center justify-between">' +
        '<p class="text-[11px] font-mono text-slate-300">0000003100057056024419</p>' +
        '<button onclick="navigator.clipboard.writeText(\'0000003100057056024419\'); showToast(\'CVU copiado\')" class="text-primary text-xs font-bold">Copiar</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<button onclick="this.closest(\'.fixed\').remove()" class="w-full py-4 rounded-2xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">' +
        'Entendido' +
        '</button>' +
        '</div>' +
        '</div>';
    document.body.appendChild(modal);
}
