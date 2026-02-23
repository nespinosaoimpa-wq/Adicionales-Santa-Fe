/**
 * Adicionales Santa Fe - Statistics View
 */

function renderStats(container) {
    if (!container) container = document.getElementById('app');
    const services = store.services;

    // Cálculos Pro
    const totalEarnings = services.reduce((sum, s) => sum + (s.total || 0), 0);
    const totalHours = services.reduce((sum, s) => sum + (parseFloat(s.hours) || 0), 0);
    const totalServices = services.length;
    const avgPerService = totalServices > 0 ? Math.round(totalEarnings / totalServices) : 0;

    // Datos Semanales (Mismo orden que la captura: Sáb-Vie)
    const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const weekData = [];
    const today = new Date();

    // Obtenemos los últimos 7 días terminando hoy
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        const dateStr = store.getLocalDateString(d);
        const dayTotal = services.filter(s => s.date === dateStr).reduce((sum, s) => sum + (s.total || 0), 0);
        weekData.push({
            label: weekDays[d.getDay()],
            value: dayTotal,
            isToday: i === 0,
            dateLabel: d.getDate() + 's'
        });
    }
    const maxValue = Math.max(...weekData.map(d => d.value), 1000);

    // Datos Mensuales (Últimos 6 meses)
    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
        const d = new Date();
        d.setMonth(today.getMonth() - i);
        const monthYear = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
        const monthTotal = services
            .filter(s => {
                if (!s.date) return false;
                // Normalize date to YYYY-MM
                let entryYearMonth = '';
                if (s.date.includes('-')) {
                    entryYearMonth = s.date.substring(0, 7); // YYYY-MM
                } else if (s.date.includes('/')) {
                    const [d, m, y] = s.date.split('/');
                    if (y && m) entryYearMonth = `${y}-${m.padStart(2, '0')}`;
                }
                return entryYearMonth === monthYear;
            })
            .reduce((sum, s) => sum + (s.total || 0), 0);

        monthlyData.push({
            label: d.toLocaleDateString('es-AR', { month: 'short' }).toUpperCase().replace('.', ''),
            value: monthTotal
        });
    }
    const maxMonthValue = Math.max(...monthlyData.map(d => d.value), 1000);

    container.innerHTML = `
        <div class="min-h-screen bg-[#0a0c12] text-white">
            <header class="h-16 flex items-center justify-between px-4 border-b border-white/5">
                <button onclick="router.navigateTo('#agenda')" class="size-10 flex items-center justify-center text-primary">
                    <span class="material-symbols-outlined text-2xl">chevron_left</span>
                </button>
                <h1 class="text-lg font-bold tracking-tight">Estadísticas</h1>
                <button onclick="router.navigateTo('#history')" class="text-primary text-xs font-bold uppercase tracking-widest">Historial</button>
            </header>

            <main class="p-5 space-y-8 pb-32 max-w-md mx-auto animate-fade-in">
                
                <!-- KPI Grid (Premium Cards) -->
                <div class="grid grid-cols-2 gap-4">
                    <!-- Total Ganado -->
                     <div class="p-5 rounded-[2.5rem] bg-gradient-to-br from-[#3b82f6] to-[#60a5fa] shadow-xl shadow-blue-500/20 flex flex-col justify-between aspect-square md:aspect-auto h-36">
                        <span class="material-symbols-outlined text-white/50 text-2xl">payments</span>
                        <div>
                            <p class="text-2xl font-black leading-none">$${totalEarnings.toLocaleString('es-AR')}</p>
                            <p class="text-[10px] font-bold text-white/70 uppercase tracking-widest mt-1">Total Ganado</p>
                        </div>
                    </div>
                    <!-- Horas -->
                    <div class="p-5 rounded-[2.5rem] bg-gradient-to-br from-[#a855f7] to-[#d946ef] shadow-xl shadow-purple-500/20 flex flex-col justify-between h-36">
                        <span class="material-symbols-outlined text-white/50 text-2xl">schedule</span>
                        <div>
                            <p class="text-2xl font-black leading-none">${totalHours.toFixed(1)}h</p>
                            <p class="text-[10px] font-bold text-white/70 uppercase tracking-widest mt-1">Horas Trabajadas</p>
                        </div>
                    </div>
                    <!-- Servicios -->
                    <div class="p-5 rounded-[2.5rem] bg-gradient-to-br from-[#14b8a6] to-[#2dd4bf] shadow-xl shadow-teal-500/20 flex flex-col justify-between h-36">
                        <span class="material-symbols-outlined text-white/50 text-2xl">fact_check</span>
                        <div>
                            <p class="text-2xl font-black leading-none">${totalServices}</p>
                            <p class="text-[10px] font-bold text-white/70 uppercase tracking-widest mt-1">Servicios</p>
                        </div>
                    </div>
                    <!-- Promedio -->
                    <div class="p-5 rounded-[2.5rem] bg-gradient-to-br from-[#f97316] to-[#fb923c] shadow-xl shadow-orange-500/20 flex flex-col justify-between h-36">
                        <span class="material-symbols-outlined text-white/50 text-2xl">trending_up</span>
                        <div>
                            <p class="text-2xl font-black leading-none">$${avgPerService.toLocaleString('es-AR')}</p>
                            <p class="text-[10px] font-bold text-white/70 uppercase tracking-widest mt-1">Promedio/Servicio</p>
                        </div>
                    </div>
                </div>

                <!-- Weekly Chart (Sleek Bar Design) -->
                <section class="space-y-4">
                    <h3 class="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-1">Ganancias Semanales</h3>
                    <div class="glass-card p-6 rounded-[2.5rem] border border-white/5 bg-slate-900/40">
                        <div class="flex items-end justify-between gap-2 h-44 pb-2">
                            ${weekData.map(d => {
        const height = Math.max((d.value / maxValue) * 100, 5);
        return `
                                    <div class="flex-1 flex flex-col items-center gap-2 group">
                                        ${d.value > 0 ? `<span class="text-[8px] font-bold text-white/80">$${(d.value / 1000).toFixed(0)}k</span>` : '<span class="text-[8px] opacity-0">0</span>'}
                                        <div class="w-full relative flex items-end justify-center" style="height: 120px;">
                                            <div class="w-full max-w-[24px] rounded-lg bg-gradient-to-t ${d.isToday ? 'from-[#3b82f6] to-[#60a5fa] shadow-lg shadow-blue-500/30' : 'from-slate-700/50 to-slate-500/50'} transition-all duration-500"
                                                 style="height: ${height}%">
                                                ${d.isToday ? '<div class="absolute -top-1 left-1/2 -translate-x-1/2 size-1.5 bg-white rounded-full shadow-lg"></div>' : ''}
                                            </div>
                                        </div>
                                        <div class="flex flex-col items-center">
                                            <span class="text-[9px] font-bold ${d.isToday ? 'text-primary' : 'text-slate-500'}">${d.label}</span>
                                            <span class="text-[8px] font-bold text-slate-700">${d.dateLabel}</span>
                                        </div>
                                    </div>
                                `;
    }).join('')}
                        </div>
                    </div>
                </section>

                <!-- Monthly Trend (Dynamic Chart) -->
                <section class="space-y-4">
                    <h3 class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Tendencia Mensual (6m)</h3>
                    <div class="glass-card p-6 rounded-[2.5rem] border border-white/5 bg-slate-900/40">
                        <div class="flex items-end justify-between gap-4 h-24 pb-1">
                            ${monthlyData.map(m => {
        const height = Math.max((m.value / maxMonthValue) * 100, 5);
        return `
                                    <div class="flex-1 flex flex-col items-center gap-1.5 group">
                                        <div class="w-full relative flex items-end justify-center" style="height: 60px;">
                                            <div class="w-full max-w-[12px] rounded-full bg-gradient-to-t from-primary/20 to-primary/80 transition-all duration-700"
                                                 style="height: ${height}%">
                                            </div>
                                        </div>
                                        <div class="flex flex-col items-center">
                                            <span class="text-[8px] font-black text-slate-500 group-hover:text-primary transition-colors">${m.label}</span>
                                            <span class="text-[7px] font-bold text-slate-700">$${(m.value / 1000).toFixed(0)}k</span>
                                        </div>
                                    </div>
                                `;
    }).join('')}
                        </div>
                    </div>
                </section>
            </main>
            ${renderBottomNav('stats')}
        </div>
    `;
}
