/**
 * Adicionales Santa Fe - Guía de Recursos Policiales Dashboard
 */

function renderInfoGuia(container) {
    if (!container) container = document.getElementById('app');
    
    const resources = window.policeResources;
    let activeTab = 'dashboard'; // 'dashboard', 'tap', 'estampillas'

    function getHTML() {
        return `
            <header class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/95 backdrop-blur-xl border-b border-white/5 px-4 h-16 flex items-center gap-4">
                <button onclick="router.navigateTo('#asistente')" class="size-10 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors active:scale-95">
                    <span class="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 class="text-base font-bold text-slate-900 dark:text-white tracking-wide">Centro de Beneficios</h1>
            </header>

            <main class="p-6 space-y-6 pb-32 max-w-md mx-auto animate-fade-in" id="guia-content">
                <!-- Tab Switcher Premium -->
                <div class="flex p-1 bg-slate-200 dark:bg-white/5 rounded-2xl border border-white/5 shadow-inner">
                    <button onclick="window.switchGuiaTab('dashboard')" 
                        class="flex-1 py-2.5 rounded-xl text-[10px] uppercase tracking-widest font-black transition-all ${activeTab === 'dashboard' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-white'}">
                        Resumen
                    </button>
                    <button onclick="window.switchGuiaTab('tap')" 
                        class="flex-1 py-2.5 rounded-xl text-[10px] uppercase tracking-widest font-black transition-all ${activeTab === 'tap' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-white'}">
                        TAP
                    </button>
                    <button onclick="window.switchGuiaTab('estampillas')" 
                        class="flex-1 py-2.5 rounded-xl text-[10px] uppercase tracking-widest font-black transition-all ${activeTab === 'estampillas' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-white'}">
                        Estampillas
                    </button>
                </div>

                <div id="tab-data" class="animate-fade-in">
                    ${activeTab === 'dashboard' ? renderDashboard() : (activeTab === 'tap' ? renderTAPTab() : renderEstampillasTab())}
                </div>

                ${renderAdBanner()}
            </main>
            ${renderBottomNav('asistente')}
        `;
    }

    function renderDashboard() {
        const today = new Date().toLocaleDateString('es-ES', { weekday: 'long' });
        const capitalizedToday = today.charAt(0).toUpperCase() + today.slice(1);
        
        // Find today's offer
        const dayMap = {
            'Lunes': 'Coto (15%)',
            'Martes': 'Supermercados DIA (30%)',
            'Miércoles': 'Coto / El Súper (30%)',
            'Jueves': 'La Anónima (20%)',
            'Viernes': 'Kilbel / Alvear (25%)',
            'Sábado': 'Mayoristas (15-25%)',
            'Domingo': 'Diarco (15%)'
        };
        const todayOffer = dayMap[capitalizedToday] || "Consultá beneficios";

        return `
            <div class="space-y-6">
                <!-- Hero Today -->
                <div class="glass-card p-6 rounded-[2.5rem] bg-gradient-to-br from-primary to-indigo-600 text-white shadow-2xl shadow-primary/30 border-none overflow-hidden relative">
                    <div class="absolute -top-10 -right-10 size-40 bg-white/10 blur-3xl rounded-full"></div>
                    <div class="relative z-10">
                        <p class="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-2">Oferta de ${capitalizedToday}</p>
                        <h2 class="text-3xl font-black leading-none mb-4">${todayOffer}</h2>
                        <div class="flex items-center gap-2 text-xs font-bold bg-black/20 w-fit px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                            <span class="material-symbols-outlined text-sm">qr_code_2</span>
                            Usar MODO para Reintegro
                        </div>
                    </div>
                </div>

                <!-- Interactive Grid -->
                <div class="grid grid-cols-2 gap-4">
                    <div onclick="window.switchGuiaTab('tap')" class="glass-card p-5 rounded-3xl border border-white/5 active:scale-95 transition-transform cursor-pointer">
                        <div class="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                            <span class="material-symbols-outlined">credit_card</span>
                        </div>
                        <p class="font-black text-xs text-slate-800 dark:text-white uppercase tracking-wider">TAP Policial</p>
                        <p class="text-[10px] text-slate-500 mt-1">$175.682 actualizados</p>
                    </div>
                    <div onclick="window.switchGuiaTab('estampillas')" class="glass-card p-5 rounded-3xl border border-white/5 active:scale-95 transition-transform cursor-pointer">
                        <div class="size-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-3">
                            <span class="material-symbols-outlined">confirmation_number</span>
                        </div>
                        <p class="font-black text-xs text-slate-800 dark:text-white uppercase tracking-wider">Estampillas</p>
                        <p class="text-[10px] text-slate-500 mt-1">Mapa de puntos de venta</p>
                    </div>
                </div>

                <!-- Acceptance Tip Alert -->
                <div class="bg-blue-500/10 border border-blue-500/20 p-5 rounded-[2rem] flex gap-4 items-start">
                    <div class="size-10 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center text-white">
                        <span class="material-symbols-outlined">shield_question</span>
                    </div>
                    <div>
                        <p class="font-black text-xs text-blue-700 dark:text-blue-400 uppercase tracking-widest leading-none mb-2">Lógica de Aceptación</p>
                        <p class="text-[11px] text-blue-800/80 dark:text-blue-400/80 leading-relaxed">
                            La TAP pasa en panaderías (ej. **Franco Colella**) pero falla en Fast Food (**McDonald's**) por el código de rubro.
                        </p>
                    </div>
                </div>

                <!-- Calendar Section -->
                <section>
                    <h3 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-2">Calendario de Ofertas</h3>
                    <div class="space-y-2">
                        ${Object.entries(dayMap).map(([day, val]) => `
                            <div class="flex items-center justify-between p-4 rounded-2xl ${day === capitalizedToday ? 'bg-primary/20 border border-primary/30' : 'bg-white/5 border border-white/5'}">
                                <span class="text-xs font-black ${day === capitalizedToday ? 'text-primary' : 'text-slate-400'} uppercase">${day.slice(0,3)}</span>
                                <span class="text-xs font-bold text-slate-800 dark:text-white">${val}</span>
                            </div>
                        `).join('')}
                    </div>
                </section>
            </div>
        `;
    }

    function renderTAPTab() {
        return `
            <div class="space-y-6">
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

                <div class="space-y-4">
                    <h3 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 text-center">Interacción por Departamento</h3>
                    ${Object.entries(resources.tap.departments).map(([dept, items]) => `
                        <div class="glass-card p-4 rounded-3xl border border-white/5 space-y-3">
                            <h4 class="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
                                <span class="size-2 rounded-full bg-primary animate-pulse"></span> ${dept}
                            </h4>
                            <div class="grid gap-2">
                                ${items.map(item => `
                                    <div class="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                                        <div class="flex-1 pr-4">
                                            <p class="text-[11px] font-black text-slate-900 dark:text-white uppercase leading-none mb-1">${item.chain}</p>
                                            <p class="text-[10px] text-slate-500 leading-tight">${item.detail}</p>
                                        </div>
                                        <a href="https://www.google.com/maps/search/${encodeURIComponent(item.chain + ' ' + dept + ' Santa Fe')}" target="_blank" 
                                           class="size-9 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary transition-all active:scale-90">
                                            <span class="material-symbols-outlined text-sm">near_me</span>
                                        </a>
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
                <div class="px-2 text-center">
                    <h2 class="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Mapa de Estampillas</h2>
                    <p class="text-[11px] text-slate-500 mt-1">Navegá hacia el punto de venta más cercano.</p>
                </div>

                <div class="grid gap-3">
                    ${resources.estampillas.locations.map(loc => `
                        <div class="glass-card p-4 rounded-[1.5rem] border border-white/5 flex gap-4 items-center group hover:bg-white/10 transition-colors">
                            <div class="size-11 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-inner">
                                <span class="material-symbols-outlined text-2xl">confirmation_number</span>
                            </div>
                            <div class="flex-1">
                                <h3 class="font-black text-slate-900 dark:text-white text-[11px] uppercase tracking-wider">${loc.name}</h3>
                                <p class="text-[10px] text-slate-500 mt-0.5 font-medium">${loc.address}</p>
                            </div>
                            <a href="https://www.google.com/maps/search/${encodeURIComponent(loc.name + ' ' + loc.address + ' Santa Fe')}" target="_blank" 
                               class="size-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 active:scale-95 transition-transform">
                                <span class="material-symbols-outlined text-sm">directions</span>
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
