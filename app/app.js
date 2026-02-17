/**
 * Adicionales Santa Fe - Core Logic
 */

// --- 1. STATE MANAGEMENT ---
const store = {
    user: {
        name: "Oficial Martínez",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBt5Js2aMpuC1Fk_ZbHQFixqomKtSI6sUwDRwYVgC8CSrnh4jA3vB53-MOo2jwzHPHBrUwKuSxWoyY33HDyUB19H2al1Ds-L7zD0vb8tFLoqZ04Ln22OdQJu3h4FVSB-988i-ChWxQYM2AVFKH4ICt1Hn15Bnf4jiwe5wb-ybk3p3oOiyt2OZxXEFnm6iNIM1MeZNqiuIJWq6YRocVUwz2QYWLcTXeHyxdf_NJgWh8oILVqJs7SmAkMVmqMoJRuM7Qo0Xq6CotbSutJ"
    },
    services: [
        // Mock Data
        { id: 1, date: '2023-11-15', type: 'Public', location: 'Banco Nación', hours: 6, rate: 1250, total: 7500, status: 'approved' },
        { id: 2, date: '2023-11-16', type: 'Private', location: 'Supermercado Vea', hours: 4, rate: 1500, total: 6000, status: 'pending' },
    ],
    expenses: [
        { id: 1, category: 'Comida', amount: 4500, date: '2023-11-15' },
        { id: 2, category: 'Transporte', amount: 1200, date: '2023-11-16' }
    ],

    // Auth
    isAuthenticated() {
        return !!localStorage.getItem('adicionales_santa_fe_user');
    },
    login(userData) {
        this.user = userData;
        localStorage.setItem('adicionales_santa_fe_user', JSON.stringify(userData));
        this.load(); // Reload data for user
    },
    logout() {
        this.user = null;
        localStorage.removeItem('adicionales_santa_fe_user');
        window.location.reload();
    },

    // Actions
    addService(service) {
        this.services.push({ ...service, id: Date.now() });
        this.save();
    },
    addExpense(expense) {
        this.expenses.push({ ...expense, id: Date.now() });
        this.save();
    },
    load() {
        try {
            const savedDB = localStorage.getItem('adicionales_santa_fe_db');
            const savedUser = localStorage.getItem('adicionales_santa_fe_user');

            if (savedUser) {
                this.user = JSON.parse(savedUser);
            }

            if (savedDB) {
                const parsed = JSON.parse(savedDB);
                this.services = parsed.services || [];
                this.expenses = parsed.expenses || [];
            } else {
                // Seeds
                this.services = [
                    { id: 1, date: '2023-11-15', type: 'Public', subType: 'Ordinaria', startTime: '08:00', endTime: '14:00', location: 'Banco Nación', hours: 6, rate: 1250, total: 7500, status: 'approved' },
                ];
            }

            // Safely init notifications
            if (this.user && this.user.notifications && typeof this.initNotifications === 'function') {
                this.initNotifications();
            }
        } catch (e) {
            console.error("Error loading store:", e);
            // Critical error recovery
            localStorage.removeItem('adicionales_santa_fe_db');
            localStorage.removeItem('adicionales_santa_fe_user');
            this.user = null;
            this.services = [];
            this.expenses = [];
            window.location.reload();
        }
    },
    save() {
        localStorage.setItem('adicionales_santa_fe_db', JSON.stringify({
            services: this.services,
            expenses: this.expenses
        }));
    },
    getFormattedDate(dateStr) {
        const options = { weekday: 'short', day: 'numeric', month: 'short' };
        return new Date(dateStr).toLocaleDateString('es-ES', options);
    }
};

// Initialize Store
store.load();


// --- 2. ROUTER & NAVIGATION ---

const router = {
    currentRoute: '#login',

    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute(); // Initial load
    },

    handleRoute() {
        const hash = window.location.hash || '#login';

        // Auth Guard
        const publicRoutes = ['#login', '#signup'];
        if (!store.isAuthenticated() && !publicRoutes.includes(hash)) {
            window.location.hash = '#login';
            return;
        }

        if (store.isAuthenticated() && publicRoutes.includes(hash)) {
            window.location.hash = '#agenda';
            return;
        }

        this.currentRoute = hash;
        this.render(hash);
    },

    render(route) {
        const app = document.getElementById('app');
        try {
            app.innerHTML = ''; // Clear current view

            switch (route) {
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
                    renderAdmin(app);
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
                default:
                    window.location.hash = '#agenda';
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
function renderAdmin(container) {
    const stats = DB.getStats();

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-slate-900 border-b border-white/10 px-6 py-4 flex items-center justify-between">
            <h1 class="text-xl font-bold text-white flex items-center gap-2">
                <span class="material-symbols-outlined text-accent-cyan">admin_panel_settings</span>
                Panel Administrador
            </h1>
            <button onclick="router.navigateTo('#agenda')" class="text-slate-400 hover:text-white">
                <span class="material-symbols-outlined">close</span>
            </button>
        </header>

        <main class="p-6 space-y-6 pb-24">
            <!-- KPI Cards -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="bg-slate-800 p-4 rounded-xl border border-white/5">
                    <p class="text-xs text-slate-400 uppercase font-bold">Usuarios Totales</p>
                    <p class="text-2xl font-bold text-white mt-1">${stats.userCount}</p>
                </div>
                <div class="bg-slate-800 p-4 rounded-xl border border-white/5">
                    <p class="text-xs text-slate-400 uppercase font-bold">Activos Hoy</p>
                    <p class="text-2xl font-bold text-green-400 mt-1">${stats.activeUsers}</p>
                </div>
                <div class="bg-slate-800 p-4 rounded-xl border border-white/5">
                    <p class="text-xs text-slate-400 uppercase font-bold">DB Size</p>
                    <p class="text-2xl font-bold text-accent-cyan mt-1">${stats.dbSize.toFixed(2)} KB</p>
                </div>
                <div class="bg-slate-800 p-4 rounded-xl border border-white/5">
                    <p class="text-xs text-slate-400 uppercase font-bold">Ingresos Globales</p>
                    <p class="text-2xl font-bold text-yellow-400 mt-1">$${(stats.totalRevenue / 1000).toFixed(1)}k</p>
                </div>
            </div>

            <!-- Charts Section -->
            <div class="grid md:grid-cols-2 gap-6">
                <!-- Services Type Chart -->
                <div class="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5">
                    <h3 class="font-bold mb-4 dark:text-white">Tipos de Servicio</h3>
                    <canvas id="chartTypes"></canvas>
                </div>

                <!-- Daily Activity Chart -->
                <div class="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5">
                    <h3 class="font-bold mb-4 dark:text-white">Actividad Reciente</h3>
                    <canvas id="chartActivity"></canvas>
                </div>
            </div>

            <!-- User Database Table -->
            <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 overflow-hidden">
                <div class="p-4 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
                    <h3 class="font-bold dark:text-white">Base de Datos de Usuarios</h3>
                    <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-bold">Live Data</span>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm text-slate-500 dark:text-slate-400">
                        <thead class="bg-slate-50 dark:bg-slate-900/50 uppercase text-xs">
                            <tr>
                                <th class="px-4 py-3">Usuario</th>
                                <th class="px-4 py-3">Rol</th>
                                <th class="px-4 py-3">Último Acceso</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 dark:divide-white/5">
                            ${DB.getUsers().map(u => `
                                <tr class="hover:bg-slate-50 dark:hover:bg-white/5">
                                    <td class="px-4 py-3 flex items-center gap-3">
                                        <img src="${u.avatar}" class="size-8 rounded-full">
                                        <div>
                                            <p class="font-bold dark:text-white">${u.name}</p>
                                            <p class="text-xs">${u.email}</p>
                                        </div>
                                    </td>
                                    <td class="px-4 py-3">
                                        <span class="px-2 py-1 rounded-md text-xs font-bold ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}">
                                            ${u.role.toUpperCase()}
                                        </span>
                                    </td>
                                    <td class="px-4 py-3 font-mono text-xs">
                                        ${new Date(u.lastLogin).toLocaleDateString()}
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    `;

    // Initialize Charts
    setTimeout(() => {
        // Types Chart
        new Chart(document.getElementById('chartTypes'), {
            type: 'doughnut',
            data: {
                labels: stats.chartData.types,
                datasets: [{
                    data: stats.chartData.typeCounts,
                    backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981'],
                    borderWidth: 0
                }]
            },
            options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
        });

        // Activity Chart
        new Chart(document.getElementById('chartActivity'), {
            type: 'bar',
            data: {
                labels: stats.chartData.dates.slice(0, 5), // Last 5 days
                datasets: [{
                    label: 'Servicios',
                    data: stats.chartData.counts.slice(0, 5),
                    backgroundColor: '#3b82f6',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true, grid: { color: '#ffffff10' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }, 100);
}

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
                <button onclick="handleGoogleLogin()" class="flex w-full justify-center items-center gap-3 rounded-xl bg-white px-3 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-100 transition-all">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-5 h-5" alt="Google">
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
                                <a href="#" class="font-semibold text-primary hover:text-primary/80">¿Olvidaste tu clave?</a>
                            </div>
                        </div>
                        <div class="mt-2">
                            <input id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-xl border-0 bg-white/5 py-3 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-4">
                        </div>
                    </div>

                    <div>
                        <button type="submit" class="flex w-full justify-center rounded-xl bg-primary px-3 py-3 text-sm font-bold leading-6 text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all shadow-lg shadow-primary/20">
                            Ingresar
                        </button>
                    </div>
                </form>

                <p class="mt-10 text-center text-sm text-slate-400">
                    ¿No tienes cuenta?
                    <a href="#signup" class="font-semibold leading-6 text-primary hover:text-primary/80 ml-1">Regístrate gratis</a>
                </p>
            </div>
        </div>
    `;

    window.handleGoogleLogin = () => {
        store.login({
            name: "Usuario Google",
            email: "user@gmail.com",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBt5Js2aMpuC1Fk_ZbHQFixqomKtSI6sUwDRwYVgC8CSrnh4jA3vB53-MOo2jwzHPHBrUwKuSxWoyY33HDyUB19H2al1Ds-L7zD0vb8tFLoqZ04Ln22OdQJu3h4FVSB-988i-ChWxQYM2AVFKH4ICt1Hn15Bnf4jiwe5wb-ybk3p3oOiyt2OZxXEFnm6iNIM1MeZNqiuIJWq6YRocVUwz2QYWLcTXeHyxdf_NJgWh8oILVqJs7SmAkMVmqMoJRuM7Qo0Xq6CotbSutJ"
        });
        router.navigateTo('#agenda');
    };

    window.handleLogin = (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        store.login({
            name: email.split('@')[0],
            email: email,
            avatar: "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=" + email
        });
        router.navigateTo('#agenda');
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
        store.login({
            name: email.split('@')[0],
            email: email,
            avatar: "https://ui-avatars.com/api/?background=10b981&color=fff&name=" + email
        });
        router.navigateTo('#agenda');
    }
}

// --- 4. APP VIEWS ---

/**
 * Render Agenda View
 * matches: agenda_y_calendario_de_turnos/code.html
 */
function renderAgenda(container) {
    const today = new Date();
    const currentMonth = today.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
    const selectedDate = store.selectedDate || today.toISOString().split('T')[0];

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
                    <p class="text-sm text-slate-500 dark:text-slate-400 capitalize">${currentMonth}</p>
                </div>
                <div class="flex gap-3">
                    <button class="size-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                        <span class="material-symbols-outlined">notifications</span>
                    </button>
                    <div class="size-10 rounded-full overflow-hidden border-2 border-primary/20">
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
                        <button class="px-3 py-1 text-xs font-semibold rounded-md bg-white dark:bg-slate-700 shadow-sm dark:text-white">Mes</button>
                        <button class="px-3 py-1 text-xs font-semibold text-slate-500">Semana</button>
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
                        ${generateCalendarGrid(today.getFullYear(), today.getMonth(), selectedDate)}
                    </div>
                </div>
            </section>

            <!-- Shifts List -->
            <section class="space-y-4">
                <h3 class="font-bold text-lg dark:text-white">Turnos para el ${store.getFormattedDate(selectedDate)}</h3>
                <div class="space-y-3">
                    ${dayServices.length > 0 ? dayServices.map(renderServiceCard).join('') :
            `<p class="text-slate-500 text-sm py-4 text-center">No hay servicios programados.</p>`}
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
        const isToday = new Date().toISOString().split('T')[0] === dateStr;

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

function renderServiceCard(service) {
    const isPublic = service.type === 'Public';
    const borderColor = isPublic ? 'border-primary' : 'border-service-private';
    const textColor = isPublic ? 'text-primary' : 'text-service-private';
    const bgSoft = isPublic ? 'bg-primary/10' : 'bg-service-private/10';
    const icon = isPublic ? 'account_balance' : 'storefront';

    // Handle legacy data safely
    const timeRange = service.startTime && service.endTime ? `${service.startTime} - ${service.endTime}` : 'Horario no especificado';
    const subType = service.subType || '';

    return `
        <div class="bg-white dark:bg-slate-900 p-4 rounded-2xl flex gap-4 border-l-4 ${borderColor} shadow-sm">
            <div class="${bgSoft} size-12 rounded-xl flex items-center justify-center ${textColor}">
                <span class="material-symbols-outlined">${icon}</span>
            </div>
            <div class="flex-1">
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="font-bold dark:text-white leading-tight">${service.location}</h4>
                        <p class="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">${service.type} ${subType}</p>
                    </div>
                    <span class="text-xs font-bold ${textColor}">$${(service.total || 0).toLocaleString()}</span>
                </div>
                
                <div class="flex items-center gap-3 mt-2">
                    <div class="flex items-center gap-1">
                        <span class="material-symbols-outlined text-[14px] text-slate-400">schedule</span>
                        <span class="text-[10px] text-slate-500 dark:text-slate-400 font-medium">${timeRange}</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <span class="material-symbols-outlined text-[14px] text-slate-400">timer</span>
                        <span class="text-[10px] text-slate-500 dark:text-slate-400 font-medium">${service.hours}h</span>
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
                            <input id="inp-date" class="w-full bg-transparent border-none p-0 focus:ring-0 text-base font-medium dark:text-white" type="date" value="${today}"/>
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

                <!-- Location -->
                <div class="bg-white dark:bg-primary/5 rounded-xl border border-slate-200 dark:border-primary/10 p-4 flex items-center">
                    <span class="material-symbols-outlined text-primary mr-3">pin_drop</span>
                    <div class="flex-1">
                        <p class="text-xs text-slate-500">Lugar</p>
                        <input id="inp-location" type="text" placeholder="Ej: Banco Nación" class="w-full bg-transparent border-none p-0 text-base font-medium dark:text-white focus:ring-0" />
                    </div>
                </div>
            </section>

            <!-- Calc -->
            <section class="space-y-4">
                <h2 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-primary/60 px-1">Tarifa</h2>
                <div class="bg-slate-900 text-white rounded-2xl p-5 space-y-4 shadow-xl">
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-slate-300">Precio hora</span>
                        <div class="flex items-center text-primary font-bold">
                            <span class="text-lg">$</span>
                            <input id="inp-rate" class="w-20 bg-transparent border-none p-0 text-right focus:ring-0 text-lg text-white" type="number"/>
                        </div>
                    </div>
                    <div class="h-px bg-white/10"></div>
                    <div class="flex justify-between items-end pt-2">
                        <span class="text-base font-bold">Total a Cobrar</span>
                        <span id="txt-total" class="text-3xl font-black text-green-400">$0</span>
                    </div>
                </div>
            </section>
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
        document.getElementById('txt-total').innerText = `$${(total || 0).toLocaleString()}`;
    };

    // Listeners
    document.getElementById('inp-start').addEventListener('change', calculateTotal);
    document.getElementById('inp-end').addEventListener('change', calculateTotal);
    document.getElementById('inp-rate').addEventListener('input', calculateTotal);

    // Save
    const saveAction = () => {
        const date = document.getElementById('inp-date').value;
        const start = document.getElementById('inp-start').value;
        const end = document.getElementById('inp-end').value;
        const rate = parseFloat(document.getElementById('inp-rate').value);
        const location = document.getElementById('inp-location').value || (currentType + ' - ' + currentSubType);
        const hours = calculateHours();

        store.addService({
            date,
            startTime: start,
            endTime: end,
            hours,
            rate,
            type: currentType,
            subType: currentSubType,
            location,
            total: hours * rate,
            status: 'approved' // Default approved
        });

        router.navigateTo('#agenda');
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
                        <img class="w-full h-full object-cover" src="${store.user.avatar}" />
                    </div>
                    <div class="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-background-dark"></div>
                </div>
                <div>
                    <p class="text-[10px] font-bold uppercase tracking-widest text-primary/80">Oficial de Guardia</p>
                    <h1 class="text-base font-bold leading-tight dark:text-white">Panel de Control</h1>
                </div>
            </div>
            <div class="flex gap-2">
                <button class="size-10 flex items-center justify-center rounded-full glass-card hover:bg-white/10 transition-colors text-white">
                    <span class="material-symbols-outlined text-xl">visibility</span>
                </button>
            </div>
        </header>

        <main class="flex-1 px-4 py-6 space-y-6 max-w-md mx-auto w-full pb-32">
            <!-- Period Selector -->
            <div class="flex p-1.5 glass-card rounded-xl">
                <button class="flex-1 py-2 px-3 rounded-lg bg-primary text-white text-sm font-semibold shadow-lg shadow-primary/20">1 - 15 Oct</button>
                <button class="flex-1 py-2 px-3 rounded-lg text-slate-400 text-sm font-medium hover:text-white transition-colors">16 - 31 Oct</button>
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
                    <span class="text-xs text-slate-500">Ver todo</span>
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
                                            <span class="text-[11px] ${s.status === 'approved' ? 'text-green-400' : 'text-amber-400'} font-bold uppercase tracking-tighter">${s.status === 'approved' ? 'Liquidado' : 'Pendiente'}</span>
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
        
        <!-- FAB Add Rule -->
        <div class="fixed bottom-24 right-6 z-50">
            <button onclick="router.navigateTo('#register')" class="size-16 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all">
                <span class="material-symbols-outlined text-3xl">add</span>
            </button>
        </div>

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
                    <div class="size-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                        <span class="material-symbols-outlined text-primary">shield_person</span>
                    </div>
                    <div>
                        <h1 class="text-sm font-medium text-slate-400">Oficial Martínez</h1>
                        <p class="text-lg font-bold tracking-tight text-white">Centro de Control</p>
                    </div>
                </div>
            </div>
            <div class="flex p-1 bg-white/5 rounded-xl">
                <button class="flex-1 py-2 text-xs font-bold rounded-lg bg-primary text-white shadow-lg shadow-primary/20">1ra Quincena</button>
                <button class="flex-1 py-2 text-xs font-bold text-slate-400">2da Quincena</button>
                <button class="flex-1 py-2 text-xs font-bold text-slate-400">Total Mes</button>
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
                 <div class="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
                    ${['Comida', 'Transporte', 'Equipo'].map(cat => `
                         <button class="flex-shrink-0 flex flex-col items-center gap-2 glass-card p-4 rounded-2xl w-24">
                            <div class="size-10 rounded-xl bg-white/10 text-white flex items-center justify-center">
                                <span class="material-symbols-outlined">attach_money</span>
                            </div>
                            <span class="text-[11px] font-bold text-white">${cat}</span>
                        </button>
                    `).join('')}
                    <button class="flex-shrink-0 flex flex-col items-center gap-2 glass-card p-4 rounded-2xl w-24 border-dashed border-white/20">
                        <div class="size-10 rounded-xl bg-white/10 text-white flex items-center justify-center">
                            <span class="material-symbols-outlined">add</span>
                        </div>
                        <span class="text-[11px] font-bold text-white">Otros</span>
                    </button>
                 </div>
            </section>
        </main>
        ${renderBottomNav('financial')}
    `;
    container.innerHTML = html;
}

/**
 * Render Admin View
 * matches: panel_de_administración_y_métricas/code.html
 */
// Duplicate renderAdmin removed


// --- 4. SHARED COMPONENTS ---

function renderBottomNav(activeTab) {
    // We'll make a generic one for now, but design asks for specific ones per page.
    // For this MVP step, a unified one is better for testing navigation.
    const tabs = [
        { id: 'agenda', icon: 'calendar_today', label: 'Agenda', route: '#agenda' },
        { id: 'control', icon: 'dashboard', label: 'Panel', route: '#control' },
        { id: 'register', icon: 'add_circle', label: '', route: '#register', isFab: true },
        { id: 'financial', icon: 'payments', label: 'Finanzas', route: '#financial' },
        { id: 'admin', icon: 'admin_panel_settings', label: 'Admin', route: '#admin' },
    ];

    let navHtml = `<nav class="fixed bottom-0 inset-x-0 bg-white/90 dark:bg-background-dark/95 backdrop-blur-xl border-t border-slate-200 dark:border-white/5 pb-6 pt-2 z-50">
        <div class="flex justify-around items-end max-w-md mx-auto relative">`;

    tabs.forEach(tab => {
        if (tab.isFab) {
            navHtml += `
                <div class="relative -top-8">
                     <button onclick="router.navigateTo('${tab.route}')" class="size-14 rounded-full bg-primary text-white shadow-lg shadow-primary/40 flex items-center justify-center hover:scale-105 transition-transform">
                        <span class="material-symbols-outlined text-3xl">add</span>
                    </button>
                </div>
            `;
        } else {
            const isActive = activeTab === tab.id;
            const colorClass = isActive ? 'text-primary' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200';
            const iconStyle = isActive ? "font-variation-settings: 'FILL' 1" : "";

            navHtml += `
                <button onclick="router.navigateTo('${tab.route}')" class="flex flex-col items-center gap-1 ${colorClass} w-16 group transition-colors">
                    <span class="material-symbols-outlined group-active:scale-90 transition-transform" style="${iconStyle}">${tab.icon}</span>
                    <span class="text-[10px] font-bold">${tab.label}</span>
                </button>
            `;
        }
    });

    navHtml += `</div></nav>`;
    return navHtml;
}

// Init App
document.addEventListener('DOMContentLoaded', () => {
    router.init();
});
