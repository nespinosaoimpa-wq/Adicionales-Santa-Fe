/**
 * Adicionales Santa Fe - Control Panel View
 */

function renderControlPanel(container) {
    if (!container) container = document.getElementById('app');

    // --- QUINCENAL FILTER STATE ---
    if (window._controlPanelFilter === undefined) {
        const today = new Date();
        window._controlPanelFilter = today.getDate() <= 15 ? 'q1' : 'q2';
    }

    const filter = window._controlPanelFilter;
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const monthNamesShort = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const currentMonthName = monthNamesShort[currentMonth];

    // Filter services by current month and selected quincena
    const periodServices = store.services.filter(s => {
        if (!s.date) return false;
        const d = new Date(s.date + 'T00:00:00');
        const isSameMonth = d.getMonth() === currentMonth && d.getFullYear() === currentYear;
        if (!isSameMonth) return false;

        const day = d.getDate();
        if (filter === 'q1') return day >= 1 && day <= 15;
        if (filter === 'q2') return day >= 16;
        return true;
    });

    // Calculate Stats for filtered services
    const publicServices = periodServices.filter(s => s.type === 'Public');
    const privateServices = periodServices.filter(s => s.type === 'Private');

    const totalPublic = publicServices.reduce((sum, s) => sum + (s.total || 0), 0);
    const totalPrivate = privateServices.reduce((sum, s) => sum + (s.total || 0), 0);
    const totalEarnings = totalPublic + totalPrivate;

    const hoursPublic = publicServices.reduce((sum, s) => sum + (parseFloat(s.hours) || 0), 0);
    const hoursPrivate = privateServices.reduce((sum, s) => sum + (parseFloat(s.hours) || 0), 0);

    // Sort all services by date desc for the recent feed
    const sortedServices = [...store.services].sort((a, b) => new Date(b.date) - new Date(a.date));

    const html = `
        <header class="sticky top-0 z-50 px-5 py-4 flex items-center justify-between border-b border-white/5 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
            <div class="flex items-center gap-3">
                <div onclick="router.navigateTo('#profile')" class="hover:scale-105 transition-transform cursor-pointer">
                    ${renderLogo('medium')}
                </div>
                <div>
                    <p class="text-[10px] font-bold uppercase tracking-widest text-primary">Oficial de Guardia</p>
                    <h1 class="text-base font-bold leading-tight text-slate-900 dark:text-white">Panel de Control</h1>
                </div>
            </div>
            <div class="flex gap-2">
                ${store.user && store.user.role === 'admin' ? `
                    <button onclick="router.navigateTo('#admin')" class="size-10 flex items-center justify-center rounded-full bg-primary/20 hover:bg-primary/30 transition-colors text-primary border border-primary/30">
                        <span class="material-symbols-outlined text-xl">admin_panel_settings</span>
                    </button>
                ` : ''}
                <button onclick="router.navigateTo('#stats')" class="size-10 flex items-center justify-center rounded-full bg-slate-200 dark:bg-white/10 transition-colors text-slate-600 dark:text-slate-900 dark:text-white">
                    <span class="material-symbols-outlined text-xl">visibility</span>
                </button>
            </div>
        </header>

        <main class="flex-1 px-4 py-6 space-y-6 max-w-md mx-auto w-full pb-32 animate-fade-in">
            <!-- Period Selector -->
            <div class="flex p-1.5 glass-card rounded-xl">
                <button onclick="window._controlPanelFilter='q1'; renderControlPanel()" 
                        class="flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${filter === 'q1' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-white'}">
                    1 - 15 ${currentMonthName}
                </button>
                <button onclick="window._controlPanelFilter='q2'; renderControlPanel()" 
                        class="flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${filter === 'q2' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-white'}">
                    16 - 31 ${currentMonthName}
                </button>
            </div>

            <!-- Main Earnings Card -->
            <div class="relative overflow-hidden rounded-2xl glass-card p-6 border border-white/10">
                <div class="absolute -top-12 -right-12 size-32 bg-primary/20 blur-3xl rounded-full"></div>
                <div class="relative z-10 flex flex-col items-center">
                    <p class="text-xs font-medium text-slate-400 uppercase tracking-widest mb-1">Total Acumulado Quincena</p>
                    <div class="flex items-baseline gap-1 mb-6">
                        <span class="text-2xl font-bold text-primary">$</span>
                        <span class="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">${(totalEarnings || 0).toLocaleString('es-AR')}</span>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4 w-full">
                        <div class="bg-white/5 rounded-xl p-3 border border-white/5">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="size-2 rounded-full bg-accent-cyan shadow-[0_0_8px_rgba(34,211,238,0.5)]"></span>
                                <p class="text-[10px] font-bold text-slate-400 uppercase">Público</p>
                            </div>
                            <p class="text-lg font-bold text-slate-900 dark:text-white">$${(totalPublic || 0).toLocaleString('es-AR')}</p>
                            <p class="text-[10px] text-slate-500">${hoursPublic.toFixed(1)} Horas</p>
                        </div>
                        <div class="bg-white/5 rounded-xl p-3 border border-white/5">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="size-2 rounded-full bg-service-ospe shadow-[0_0_8px_rgba(139,92,246,0.5)]"></span>
                                <p class="text-[10px] font-bold text-slate-400 uppercase">Privado</p>
                            </div>
                            <p class="text-lg font-bold text-slate-900 dark:text-white">$${(totalPrivate || 0).toLocaleString('es-AR')}</p>
                            <p class="text-[10px] text-slate-500">${hoursPrivate.toFixed(1)} Horas</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Services Feed -->
            <section>
                <div class="flex justify-between items-end mb-4 px-1">
                    <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400 font-bold">Servicios Recientes</h3>
                    <span onclick="router.navigateTo('#history')" class="text-xs text-slate-500 cursor-pointer font-bold">Ver todo</span>
                </div>
                <div class="space-y-3">
                    ${sortedServices.slice(0, 5).map(s => {
        const isPub = s.type === 'Public';
        const colorClass = isPub ? 'text-accent-cyan' : 'text-service-ospe';
        const bgClass = isPub ? 'bg-accent-cyan/10' : 'bg-service-ospe/10';
        const icon = isPub ? 'account_balance' : 'shopping_cart';
        return `
                            <div class="glass-card p-4 rounded-2xl flex items-center justify-between border-white/5 group active:scale-[0.98] transition-transform">
                                <div class="flex items-center gap-4">
                                    <div class="size-12 rounded-xl ${bgClass} flex items-center justify-center ${colorClass}">
                                        <span class="material-symbols-outlined">${icon}</span>
                                    </div>
                                    <div>
                                        <p class="font-bold text-sm text-slate-800 dark:text-slate-900 dark:text-white">${s.location}</p>
                                    <div class="flex items-center gap-2 mt-0.5">
                                            <span class="text-[11px] text-slate-400 font-bold">${store.getFormattedDate(s.date)} • ${s.hours}h</span>
                                            <span class="size-1 rounded-full bg-slate-600"></span>
                                            ${(() => {
                const todayStr = store.getLocalDateString();
                const isFuture = s.date > todayStr;
                let label = 'Pendiente';
                let color = 'text-amber-400';

                if (s.status === 'paid' || s.status === 'Pagado') {
                    label = 'Liquidado';
                    color = 'text-emerald-400';
                } else if (isFuture) {
                    label = 'Agendado';
                    color = 'text-blue-400';
                }
                return `<span class="text-[11px] ${color} font-bold uppercase tracking-tighter">${label}</span>`;
            })()}
                                        </div>
                                    </div>
                                </div>
                                <p class="text-sm font-bold text-slate-900 dark:text-white">$${(s.total || 0).toLocaleString('es-AR')}</p>
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
