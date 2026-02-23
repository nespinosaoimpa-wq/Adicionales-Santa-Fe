/**
 * Adicionales Santa Fe - Control Panel View
 */

function renderControlPanel(container) {
    if (!container) container = document.getElementById('app');

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
        <header class="sticky top-0 z-50 glass-card px-5 py-4 flex items-center justify-between border-b border-white/5 bg-background-dark/80 backdrop-blur-md">
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
                ${store.user && store.user.role === 'admin' ? `
                    <button onclick="router.navigateTo('#admin')" class="size-10 flex items-center justify-center rounded-full bg-primary/20 hover:bg-primary/30 transition-colors text-primary border border-primary/30">
                        <span class="material-symbols-outlined text-xl">admin_panel_settings</span>
                    </button>
                ` : ''}
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
            <section>
                <div class="flex justify-between items-end mb-4 px-1">
                    <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400">Servicios Recientes</h3>
                    <span onclick="router.navigateTo('#history')" class="text-xs text-slate-500 cursor-pointer">Ver todo</span>
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
                const today = store.getLocalDateString();
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
