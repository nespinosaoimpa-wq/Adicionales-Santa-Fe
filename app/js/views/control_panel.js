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
    if (window._controlPanelMonth === undefined) {
        window._controlPanelMonth = new Date().getMonth();
        window._controlPanelYear = new Date().getFullYear();
    }

    const filter = window._controlPanelFilter;
    const currentMonth = window._controlPanelMonth;
    const currentYear = window._controlPanelYear;
    const monthNamesShort = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const currentMonthName = monthNamesShort[currentMonth];

    window.prevControlMonth = () => {
        if (window._controlPanelMonth === 0) {
            window._controlPanelMonth = 11;
            window._controlPanelYear--;
        } else {
            window._controlPanelMonth--;
        }
        renderControlPanel();
    };

    window.nextControlMonth = () => {
        if (window._controlPanelMonth === 11) {
            window._controlPanelMonth = 0;
            window._controlPanelYear++;
        } else {
            window._controlPanelMonth++;
        }
        renderControlPanel();
    };

    window._showSetGoalModal = () => {
        const currentGoal = (store.user && store.user.monthlyGoal) || '';
        const val = prompt("Establecer tu meta financiera mensual ($):", currentGoal);
        if (val !== null) {
            store.setMonthlyGoal(val);
            renderControlPanel();
        }
    };

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

    // Get Goal Progress for the circular progress ring
    const goal = store.getGoalProgress();

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
                ${store.isAdmin() ? `
                    <button onclick="router.navigateTo('#admin')" class="size-10 flex items-center justify-center rounded-full bg-primary/20 hover:bg-primary/30 transition-colors text-primary border border-primary/30" title="Panel Super Admin">
                        <span class="material-symbols-outlined text-xl">admin_panel_settings</span>
                    </button>
                ` : ''}
                <button onclick="router.navigateTo('#stats')" class="size-10 flex items-center justify-center rounded-full bg-slate-200 dark:bg-white/10 transition-colors text-slate-600 dark:text-slate-900 dark:text-white">
                    <span class="material-symbols-outlined text-xl">visibility</span>
                </button>
            </div>
        </header>

        <main class="flex-1 px-4 py-6 space-y-6 max-w-md mx-auto w-full pb-32 animate-fade-in">
            <!-- 🎓 Campus Ascenso Policial Banner (NUEVO) -->
            <div onclick="router.navigateTo('#academia')" class="cursor-pointer bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 p-4 rounded-3xl text-white shadow-xl flex items-center justify-between relative overflow-hidden group active:scale-[0.98] transition-all">
                <div class="absolute -right-6 -bottom-6 size-28 bg-white/10 blur-2xl rounded-full"></div>
                <div class="relative z-10 space-y-1">
                    <span class="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-white/20 text-white flex items-center gap-1 w-fit">
                        <span class="material-symbols-outlined text-xs">workspace_premium</span> NUEVO MÓDULO ISEP 2026
                    </span>
                    <h2 class="text-base font-black leading-tight text-white">Campus Ascenso Policial</h2>
                    <p class="text-[10px] text-white/90 font-medium">Materiales ISEP 2026 (344 págs), Simulador Examen y Tutor IA Gemini</p>
                </div>
                <div class="size-11 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center shrink-0 text-white relative z-10 group-hover:scale-110 transition-transform">
                    <span class="material-symbols-outlined text-2xl">school</span>
                </div>
            </div>

            <!-- Period Selector -->

            <div class="flex items-center justify-between mb-4 px-2">
                <button onclick="window.prevControlMonth()" class="p-1 text-slate-400 hover:text-primary transition-colors"><span class="material-symbols-outlined text-sm">arrow_back_ios_new</span></button>
                <div class="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">${currentMonthName} ${currentYear}</div>
                <button onclick="window.nextControlMonth()" class="p-1 text-slate-400 hover:text-primary transition-colors"><span class="material-symbols-outlined text-sm">arrow_forward_ios</span></button>
            </div>

            <div class="flex p-1.5 glass-card rounded-xl">
                <button onclick="window._controlPanelFilter='q1'; renderControlPanel()" 
                        class="flex-1 py-2 px-3 rounded-lg text-[13px] font-semibold transition-all ${filter === 'q1' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-white'}">
                    1 - 15 ${currentMonthName}
                </button>
                <button onclick="window._controlPanelFilter='q2'; renderControlPanel()" 
                        class="flex-1 py-2 px-3 rounded-lg text-[13px] font-semibold transition-all ${filter === 'q2' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-white'}">
                    16 - 31 ${currentMonthName}
                </button>
            </div>

            ${renderHomeBenefits()}

            <!-- Main Earnings Card with Interactive Goal Ring -->
            <div class="relative overflow-hidden rounded-[2.5rem] glass-card p-6 border border-white/10 shadow-xl bg-gradient-to-br from-slate-900/50 to-slate-955/50">
                <div class="absolute -top-12 -right-12 size-32 bg-primary/10 blur-3xl rounded-full"></div>
                <div class="relative z-10 flex gap-4 items-center justify-between">
                    <!-- Left: Fortnite Earnings -->
                    <div class="flex-1 space-y-1">
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Acumulado Quincena</p>
                        <div class="flex items-baseline gap-1">
                            <span class="text-xl font-bold text-primary">$</span>
                            <span class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">${(totalEarnings || 0).toLocaleString('es-AR')}</span>
                        </div>
                        <p class="text-[9px] text-slate-500 font-bold uppercase tracking-wider mt-2.5">Detalle:</p>
                        <div class="flex flex-col gap-1.5">
                            <div class="flex items-center justify-between text-[11px]">
                                <span class="flex items-center gap-1.5 text-slate-400">
                                    <span class="size-2 rounded-full bg-accent-cyan shadow-[0_0_6px_rgba(116,172,223,0.5)]"></span>
                                    Público:
                                </span>
                                <span class="font-bold text-slate-900 dark:text-slate-300">$${(totalPublic || 0).toLocaleString('es-AR')} (${hoursPublic.toFixed(0)}h)</span>
                            </div>
                            <div class="flex items-center justify-between text-[11px]">
                                <span class="flex items-center gap-1.5 text-slate-400">
                                    <span class="size-2 rounded-full bg-service-ospe shadow-[0_0_6px_rgba(245,158,11,0.5)]"></span>
                                    Privado:
                                </span>
                                <span class="font-bold text-slate-900 dark:text-slate-300">$${(totalPrivate || 0).toLocaleString('es-AR')} (${hoursPrivate.toFixed(0)}h)</span>
                            </div>
                        </div>
                    </div>

                    <!-- Right: Monthly Goal Ring -->
                    <div class="shrink-0 flex flex-col items-center justify-center bg-white/5 border border-white/5 p-4 rounded-3xl min-w-[110px] min-h-[110px] relative">
                        ${goal.goal > 0 ? `
                            <div class="relative size-20 flex items-center justify-center cursor-pointer" onclick="window._showSetGoalModal()" title="Haga clic para cambiar la meta">
                                <svg class="size-20 transform -rotate-90 drop-shadow-[0_0_8px_rgba(13,89,242,0.3)]" viewBox="0 0 80 80">
                                    <defs>
                                        <linearGradient id="goalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stop-color="#5599e0" />
                                            <stop offset="100%" stop-color="#22d3ee" />
                                        </linearGradient>
                                    </defs>
                                    <circle cx="40" cy="40" r="32" class="stroke-slate-200/10 dark:stroke-white/5" stroke-width="6" fill="none" />
                                    <circle cx="40" cy="40" r="32" stroke="url(#goalGrad)" stroke-width="6" fill="none"
                                            stroke-dasharray="201" stroke-dashoffset="${201 - (201 * Math.min(goal.percent, 100)) / 100}"
                                            stroke-linecap="round" style="transition: stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1);" />
                                </svg>
                                <div class="absolute inset-0 flex flex-col items-center justify-center">
                                    <span class="text-[13px] font-black text-slate-900 dark:text-white leading-none">${goal.percent}%</span>
                                    <span class="text-[7px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-1">META</span>
                                </div>
                            </div>
                            <p class="text-[8px] text-slate-400 font-bold mt-2 uppercase tracking-wide">De $${(goal.goal / 1000).toFixed(0)}k</p>
                        ` : `
                            <button onclick="window._showSetGoalModal()" class="flex flex-col items-center justify-center gap-1 group active:scale-95 transition-all">
                                <div class="size-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-lg shadow-primary/5">
                                    <span class="material-symbols-outlined text-lg">flag</span>
                                </div>
                                <span class="text-[9px] font-black text-primary uppercase tracking-widest text-center mt-1.5 leading-none">Fijar<br>Meta</span>
                            </button>
                        `}
                    </div>
                </div>
            </div>

            <!-- Ad Banner -->
            ${renderAdBannerSmall()}

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
                            <div onclick="router.navigateTo('#details?id=${s.id}')" class="cursor-pointer glass-card p-4 rounded-2xl flex items-center justify-between border-white/5 group active:scale-[0.98] transition-transform hover:bg-white/5">
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
    initAds();
}

function renderHomeBenefits() {
    const today = new Date().toLocaleDateString('es-ES', { weekday: 'long' });
    const capitalizedToday = today.charAt(0).toUpperCase() + today.slice(1);
    
    const dayMap = {
        'Lunes': '15% en Coto (TAP)',
        'Martes': '30% en DIA (MODO)',
        'Miércoles': '35% BNA+ / 15% Coto',
        'Jueves': '20% ICBC (MODO)',
        'Viernes': '25% Kilbel / Alvear',
        'Sábado': '30% La Anónima',
        'Domingo': '15% Diarco'
    };
    
    const offer = dayMap[capitalizedToday];
    if (!offer) return '';

    return `
        <div onclick="router.navigateTo('#info')" class="mx-2 p-4 rounded-3xl bg-gradient-to-br from-primary to-blue-700 text-white shadow-2xl shadow-primary/30 flex items-center justify-between group active:scale-[0.98] transition-all cursor-pointer overflow-hidden relative border border-white/10">
            <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="flex items-center gap-4 relative z-10">
                <div class="size-11 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner">
                    <span class="material-symbols-outlined text-2xl">celebration</span>
                </div>
                <div>
                    <p class="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">Hoy ${capitalizedToday}</p>
                    <p class="text-[15px] font-black tracking-tight">${offer}</p>
                </div>
            </div>
            <div class="size-8 rounded-full bg-white/10 flex items-center justify-center relative z-10">
                <span class="material-symbols-outlined text-sm animate-bounce-x">arrow_forward</span>
            </div>
        </div>
    `;
}


