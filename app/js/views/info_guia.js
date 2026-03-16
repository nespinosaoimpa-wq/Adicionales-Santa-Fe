/**
 * Adicionales Santa Fe - Guía de Recursos Policiales View
 */

function renderInfoGuia(container) {
    if (!container) container = document.getElementById('app');
    
    const resources = window.policeResources;
    let activeTab = 'tap';

    function getHTML() {
        return `
            <header class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/95 backdrop-blur-xl border-b border-white/5 px-4 h-16 flex items-center gap-4">
                <button onclick="router.navigateTo('#asistente')" class="size-10 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors active:scale-95">
                    <span class="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 class="text-base font-bold text-slate-900 dark:text-white tracking-wide">Guía de Recursos</h1>
            </header>

            <main class="p-6 space-y-6 pb-32 max-w-md mx-auto animate-fade-in" id="guia-content">
                <!-- Tab Switcher -->
                <div class="flex p-1 bg-slate-200 dark:bg-white/5 rounded-2xl border border-white/5 shadow-inner">
                    <button onclick="window.switchGuiaTab('tap')" 
                        class="flex-1 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'tap' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
                        Beneficios TAP
                    </button>
                    <button onclick="window.switchGuiaTab('estampillas')" 
                        class="flex-1 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'estampillas' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
                        Estampillas
                    </button>
                </div>

                <div id="tab-data" class="animate-fade-in">
                    ${activeTab === 'tap' ? renderTAPTab() : renderEstampillasTab()}
                </div>

                ${renderAdBanner()}
            </main>
            ${renderBottomNav('asistente')}
        `;
    }

    function renderTAPTab() {
        return `
            <div class="space-y-6">
                <!-- Hero Header -->
                <div class="glass-card p-5 rounded-[2rem] border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="size-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20">
                            <span class="material-symbols-outlined text-3xl">credit_card</span>
                        </div>
                        <div>
                            <h2 class="font-black text-slate-900 dark:text-white text-lg leading-tight">Tarjeta Alimentar</h2>
                            <p class="text-[10px] text-primary font-black uppercase tracking-[0.2em]">Actualizado ${resources.tap.lastUpdate}</p>
                        </div>
                    </div>
                    <div class="flex justify-between items-end border-t border-white/5 pt-4">
                        <p class="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Monto Mensual</p>
                        <p class="text-2xl font-black text-slate-900 dark:text-white">$${resources.tap.monto.toLocaleString('es-AR')}</p>
                    </div>
                </div>

                <!-- Tips -->
                <div class="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl flex gap-3">
                    <span class="material-symbols-outlined text-amber-500">lightbulb</span>
                    <p class="text-[11px] text-amber-700 dark:text-amber-400 leading-relaxed font-medium">
                        **Tip Pro:** Vinculá tu tarjeta a la app **MODO** del Banco Santa Fe para aprovechar reintegros de hasta el 30% en supermercados.
                    </p>
                </div>

                <!-- By Department -->
                <div class="space-y-4">
                    <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Beneficios por Departamento</h3>
                    ${Object.entries(resources.tap.departments).map(([dept, items]) => `
                        <div class="glass-card p-4 rounded-3xl border border-white/5 space-y-3">
                            <h4 class="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
                                <span class="size-1.5 rounded-full bg-primary"></span> ${dept}
                            </h4>
                            <div class="space-y-2">
                                ${items.map(item => `
                                    <div class="p-3 rounded-xl bg-white/5 border border-white/5">
                                        <p class="text-xs font-bold text-slate-900 dark:text-white">${item.chain}</p>
                                        <p class="text-[11px] text-slate-400 mt-1">${item.detail}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    function renderEstampillasTab() {
        return `
            <div class="space-y-6">
                <div class="px-1">
                    <h2 class="text-sm font-bold text-slate-900 dark:text-white">Puntos de Venta (Santa Fe)</h2>
                    <p class="text-xs text-slate-500 mt-1">Lugares actualizados donde conseguir estampillas médicas.</p>
                </div>

                <div class="grid gap-3">
                    ${resources.estampillas.locations.map(loc => `
                        <div class="glass-card p-4 rounded-2xl border border-white/5 flex gap-4 items-center">
                            <div class="size-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                <span class="material-symbols-outlined text-xl">confirmation_number</span>
                            </div>
                            <div class="flex-1">
                                <h3 class="font-bold text-slate-900 dark:text-white text-xs">${loc.name}</h3>
                                <p class="text-[11px] text-slate-500 mt-0.5">${loc.address}</p>
                            </div>
                            <a href="https://www.google.com/maps/search/${encodeURIComponent(loc.name + ' ' + loc.address + ' Santa Fe')}" target="_blank" class="size-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                                <span class="material-symbols-outlined text-sm">map</span>
                            </a>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    window.switchGuiaTab = (tab) => {
        activeTab = tab;
        container.innerHTML = getHTML();
        initAds();
    };

    container.innerHTML = getHTML();
    initAds();
}
