/**
 * Adicionales Santa Fe - Statistics View
 */

function renderStats(container) {
    if (!container) container = document.getElementById('app');
    const services = store.services;
    const today = store.getLocalDateString();

    // Calculate stats
    const totalEarnings = services.reduce((sum, s) => sum + (s.total || 0), 0);
    const totalHours = services.reduce((sum, s) => sum + (parseFloat(s.hours) || 0), 0);
    const totalServices = services.length;
    const paidServices = services.filter(s => s.status === 'paid').length;
    const pendingEarnings = services.filter(s => s.status !== 'paid').reduce((sum, s) => sum + (s.total || 0), 0);
    const avgPerService = totalServices > 0 ? Math.round(totalEarnings / totalServices) : 0;

    // Weekly data
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

    // Monthly trend
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
        <header class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-primary/20 h-16 flex items-center justify-between px-4">
            <button onclick="router.navigateTo('#agenda')" class="flex items-center text-primary">
                <span class="material-symbols-outlined text-[28px]">chevron_left</span>
            </button>
            <h1 class="text-lg font-semibold dark:text-white">Estadísticas</h1>
            <button onclick="router.navigateTo('#history')" class="text-primary text-sm font-medium">Historial</button>
        </header>

        <main class="max-w-md mx-auto px-4 py-6 space-y-6 pb-32">
            <!-- KPI Cards -->
            <div class="grid grid-cols-2 gap-3">
                <div class="animate-slide-up bg-gradient-to-br from-primary to-blue-400 p-4 rounded-2xl text-white shadow-lg shadow-primary/20">
                    <span class="material-symbols-outlined text-white/60 text-2xl">payments</span>
                    <p class="text-xl font-black mt-1">$${totalEarnings.toLocaleString('es-AR')}</p>
                    <p class="text-[10px] text-white/70 font-medium uppercase tracking-wider">Total Ganado</p>
                </div>
                <div class="animate-slide-up bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl text-white shadow-lg shadow-purple-500/20">
                    <span class="material-symbols-outlined text-white/60 text-2xl">schedule</span>
                    <p class="text-xl font-black mt-1">${totalHours.toFixed(1)}h</p>
                    <p class="text-[10px] text-white/70 font-medium uppercase tracking-wider">Horas Trabajadas</p>
                </div>
                <div class="animate-slide-up bg-gradient-to-br from-cyan-500 to-teal-500 p-4 rounded-2xl text-white shadow-lg shadow-cyan-500/20">
                    <span class="material-symbols-outlined text-white/60 text-2xl">fact_check</span>
                    <p class="text-xl font-black mt-1">${totalServices}</p>
                    <p class="text-[10px] text-white/70 font-medium uppercase tracking-wider">Servicios</p>
                </div>
                <div class="animate-slide-up bg-gradient-to-br from-amber-500 to-orange-500 p-4 rounded-2xl text-white shadow-lg shadow-amber-500/20">
                    <span class="material-symbols-outlined text-white/60 text-2xl">trending_up</span>
                    <p class="text-xl font-black mt-1">$${avgPerService.toLocaleString('es-AR')}</p>
                    <p class="text-[10px] text-white/70 font-medium uppercase tracking-wider">Promedio/Serv.</p>
                </div>
            </div>

            <!-- 3D Bar Chart -->
            <section class="space-y-3">
                <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-primary/60 px-1">Ganancias Semanales</h3>
                <div class="bg-white dark:bg-slate-900/80 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div class="flex items-end justify-between gap-2 h-40">
                        ${weekData.map((d, i) => {
        const heightPct = maxWeekValue > 0 ? (d.value / maxWeekValue * 100) : 0;
        const color = d.isToday ? 'from-primary to-blue-400' : 'from-slate-500 to-slate-400';
        return `
                            <div class="flex-1 flex flex-col items-center gap-1">
                                <span class="text-[9px] font-bold ${d.isToday ? 'text-primary' : 'text-slate-400'}">${d.value > 0 ? '$' + (d.value / 1000).toFixed(0) + 'k' : ''}</span>
                                <div class="w-full flex items-end justify-center" style="height: 120px;">
                                    <div class="w-full bg-gradient-to-t ${color} rounded-t-lg shadow-lg relative"
                                         style="height: ${Math.max(heightPct, 3)}%; min-height: 3px;">
                                    </div>
                                </div>
                                <span class="text-[10px] font-bold ${d.isToday ? 'text-primary' : 'text-slate-400'}">${d.label}</span>
                            </div>`;
    }).join('')}
                    </div>
                </div>
            </section>

            <!-- Monthly Trend -->
            <section class="space-y-3">
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
                                     style="height: ${Math.max(heightPct, 3)}%; min-height: 4px;"></div>
                                <span class="text-[10px] font-bold ${isLast ? 'text-primary' : 'text-slate-400'} capitalize">${d.label}</span>
                            </div>`;
    }).join('')}
                    </div>
                </div>
            </section>

            <!-- Earnings by Type (Doughnut Chart) -->
            <section class="space-y-3">
                <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-primary/60 px-1">Distribución por Tipo</h3>
                <div class="bg-white dark:bg-slate-900/80 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
                    <div class="relative h-56 flex items-center justify-center">
                        <canvas id="earningsTypeChart"></canvas>
                        <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span class="text-[10px] uppercase font-bold text-slate-500">Total</span>
                            <span class="text-lg font-black text-slate-800 dark:text-white">$${totalEarnings >= 1000 ? (totalEarnings / 1000).toFixed(1) + 'k' : totalEarnings}</span>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-3 gap-2">
                        ${[
            { label: 'Público', total: publicTotal, color: '#0d59f2', icon: 'account_balance' },
            { label: 'Privado', total: privateTotal, color: '#8b5cf6', icon: 'storefront' },
            { label: 'OSPES', total: ospesTotal, color: '#06b6d4', icon: 'local_hospital' }
        ].map(type => `
                            <div class="text-center space-y-1">
                                <div class="flex items-center justify-center gap-1.5 mb-1">
                                    <div class="size-2 rounded-full" style="background-color: ${type.color}"></div>
                                    <span class="text-[10px] font-bold text-slate-500 uppercase">${type.label}</span>
                                </div>
                                <p class="text-xs font-black dark:text-white">$${type.total >= 1000 ? (type.total / 1000).toFixed(1) + 'k' : type.total}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        </main>
        ${renderBottomNav('stats')}
    `;

    // Initialize Earnings Circular Chart
    setTimeout(() => {
        const canvas = document.getElementById('earningsTypeChart');
        if (canvas && window.Chart) {
            new Chart(canvas, {
                type: 'doughnut',
                data: {
                    labels: ['Público', 'Privado', 'OSPES'],
                    datasets: [{
                        data: [publicTotal, privateTotal, ospesTotal],
                        backgroundColor: ['#0d59f2', '#8b5cf6', '#06b6d4'],
                        borderWidth: 0,
                        hoverOffset: 15,
                        borderRadius: 10,
                        spacing: 5
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '75%',
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: 'rgba(15, 23, 42, 0.9)',
                            padding: 12,
                            titleFont: { size: 12, weight: 'bold' },
                            bodyFont: { size: 12 },
                            cornerRadius: 12,
                            callbacks: {
                                label: (context) => {
                                    const value = context.raw;
                                    const pct = ((value / totalEarnings) * 100).toFixed(1);
                                    return ` $${value.toLocaleString()} (${pct}%)`;
                                }
                            }
                        }
                    }
                }
            });
        }
    }, 100);
}
