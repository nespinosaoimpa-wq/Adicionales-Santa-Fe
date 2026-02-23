/**
 * Adicionales Santa Fe - Router & Navigation
 */

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

window.router = router;
