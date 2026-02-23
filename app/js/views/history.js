/**
 * Adicionales Santa Fe - Full History View
 */

function renderHistory(container) {
    if (!container) container = document.getElementById('app');
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
                        <div onclick="router.navigateTo('#details?id=${s.id}')" class="glass-card p-4 rounded-2xl flex items-center justify-between border-white/5 cursor-pointer hover:bg-white/5 transition-colors">
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
