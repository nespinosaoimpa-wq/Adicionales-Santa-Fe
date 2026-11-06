/**
 * Adicionales Santa Fe - Centro de Beneficios, TAP & Red de Sponsors Policiales
 * v3.0 - Rediseño visual premium, alta legibilidad móvil y estética glassmorphism
 */

window._guiaState = window._guiaState || {
    activeTab: 'sponsors', // 'sponsors' | 'tap' | 'promos' | 'estampillas'
    categoryFilter: 'all',
    cityFilter: 'all',
    searchTerm: ''
};

function _formatGuiaDiscount(discountStr) {
    if (!discountStr) return { pill: 'BENEFICIO', scope: '' };
    const match = discountStr.match(/^(\d+%\s*(?:OFF|Reintegro|Descuento))\s*(?:en|para)?\s*(.*)$/i);
    if (match) {
        return { pill: match[1].trim(), scope: match[2].trim() };
    }
    return { pill: discountStr, scope: '' };
}

function renderInfoGuia(container) {
    if (!container) container = document.getElementById('app');
    const resources = window.policeResources || {};
    const sponsors = resources.sponsors || [];
    const tap = resources.tap || {};
    const state = window._guiaState;

    window.switchGuiaTab = (tab) => {
        state.activeTab = tab;
        if (navigator.vibrate) try { navigator.vibrate(10); } catch(e){}
        renderInfoGuia();
    };

    window.filterSponsorsCategory = (cat) => {
        state.categoryFilter = cat;
        if (navigator.vibrate) try { navigator.vibrate(10); } catch(e){}
        renderInfoGuia();
    };

    window.filterSponsorsCity = (city) => {
        state.cityFilter = city;
        renderInfoGuia();
    };

    window.searchSponsors = (term) => {
        state.searchTerm = term.toLowerCase().trim();
        const listContainer = document.getElementById('sponsors-list-container');
        if (listContainer) {
            listContainer.innerHTML = _renderSponsorsCardsHTML(sponsors, state);
        }
    };

    window.openSponsorWhatsApp = (storeName, category, phone) => {
        if (window.TelemetryService) {
            window.TelemetryService.trackBenefitClick(storeName, category);
        }
        const msg = encodeURIComponent(`Hola! Me comunico desde la App Adicionales Santa Fe. Quería consultar por el beneficio / descuento para personal policial en: ${storeName}`);
        window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
    };

    window.showSponsorProgramModal = () => {
        const existing = document.getElementById('modal-sponsor-program');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'modal-sponsor-program';
        modal.className = 'fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in';
        modal.innerHTML = `
            <div class="w-full max-w-md p-6 rounded-3xl border border-white/10 bg-slate-900/95 shadow-2xl text-left relative overflow-hidden" style="animation: scaleUp 0.25s ease-out">
                <div class="absolute -top-16 -right-16 size-40 bg-amber-500/10 blur-3xl pointer-events-none rounded-full"></div>
                
                <div class="flex items-center justify-between pb-3 border-b border-white/10">
                    <div class="flex items-center gap-2.5">
                        <div class="size-9 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                            <span class="material-symbols-outlined text-xl">store</span>
                        </div>
                        <div>
                            <h3 class="text-sm font-black text-white">Programa Comercios Amigos</h3>
                            <p class="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Red Policial Santa Fe</p>
                        </div>
                    </div>
                    <button onclick="document.getElementById('modal-sponsor-program').remove()" class="size-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                        <span class="material-symbols-outlined text-base">close</span>
                    </button>
                </div>

                <div class="py-4 space-y-3 text-xs text-slate-300">
                    <div class="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                        <p class="font-bold text-xs text-white">¿Por qué sumar tu comercio?</p>
                        <p class="text-[11px] text-amber-200/90 mt-1 leading-relaxed">
                            Llegá a más de <strong>25.000 policías provinciales</strong> y sus familias. El personal cuenta con cobro garantizado de la <strong>Tarjeta Alimentar Policial ($175.682/mes)</strong>, movilizando más de $4.300 millones mensuales.
                        </p>
                    </div>

                    <div class="space-y-2">
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Modalidades de Adhesión:</p>
                        <div class="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                            <span class="material-symbols-outlined text-emerald-400 text-lg shrink-0 mt-0.5">verified</span>
                            <div>
                                <p class="text-white font-bold text-xs">Comercio Amigo (100% Gratuito)</p>
                                <p class="text-[10px] text-slate-400 mt-0.5 leading-snug">Ofrecés 10% a 15% de descuento al personal policial y tu negocio figura en el catálogo con contacto directo por WhatsApp.</p>
                            </div>
                        </div>
                        <div class="p-3 rounded-xl bg-white/5 border border-amber-500/20 flex items-start gap-3">
                            <span class="material-symbols-outlined text-amber-400 text-lg shrink-0 mt-0.5">workspace_premium</span>
                            <div>
                                <p class="text-white font-bold text-xs">Sponsor Destacado ($15.000 / mes)</p>
                                <p class="text-[10px] text-slate-400 mt-0.5 leading-snug">Primeros lugares de búsqueda, insignia dorada y presencia destacada en la pantalla de inicio.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="pt-2 flex flex-col gap-2">
                    <a href="https://wa.me/5493425162372?text=${encodeURIComponent('Hola! Quiero sumar mi comercio a la Red de Beneficios Policiales de Adicionales Santa Fe. Mi negocio es: ')}"
                        target="_blank" rel="noopener noreferrer"
                        onclick="document.getElementById('modal-sponsor-program')?.remove()"
                        class="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 active:scale-95 transition-all">
                        <span class="material-symbols-outlined text-base">chat</span>
                        Sumar mi Comercio por WhatsApp
                    </a>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    };

    container.innerHTML = `
        <!-- HEADER COMPACTO Y ELEGANTE -->
        <header class="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-white/10 px-4 h-14 flex items-center justify-between">
            <div class="flex items-center gap-2.5 min-w-0">
                <button onclick="window.history.length > 1 ? window.history.back() : router.navigateTo('#control')" 
                    class="size-9 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white active:scale-95 transition-all shrink-0">
                    <span class="material-symbols-outlined text-lg">arrow_back</span>
                </button>
                <div class="min-w-0">
                    <h1 class="text-sm font-black text-white tracking-tight truncate flex items-center gap-1.5">
                        <span>Beneficios & TAP</span>
                        <span class="px-1.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[9px] font-black uppercase tracking-wider">Policial</span>
                    </h1>
                    <p class="text-[10px] text-slate-400 font-medium truncate">Convenios, descuentos y saldo mensual</p>
                </div>
            </div>
            
            <button onclick="window.showSponsorProgramModal()" 
                class="size-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 flex items-center justify-center shrink-0 active:scale-95 transition-all"
                title="Sumar tu comercio a la red">
                <span class="material-symbols-outlined text-lg">add_business</span>
            </button>
        </header>

        <main class="p-4 space-y-3.5 pb-36 max-w-md mx-auto animate-fade-in">
            <!-- TABS MODERNOS EN GRILLA DE 4 COLUMNAS (Sin cortes ni desbordes) -->
            <div class="p-1 rounded-2xl bg-slate-900/80 border border-white/10 grid grid-cols-4 gap-1 shadow-inner">
                <button onclick="window.switchGuiaTab('sponsors')" 
                    class="py-2 px-1 rounded-xl text-[11px] font-bold flex flex-col items-center justify-center gap-0.5 transition-all ${state.activeTab === 'sponsors' ? 'bg-primary text-white shadow-lg shadow-primary/30 font-black' : 'text-slate-400 hover:text-slate-200'}">
                    <span class="material-symbols-outlined text-base leading-none">storefront</span>
                    <span>Comercios</span>
                </button>
                <button onclick="window.switchGuiaTab('tap')" 
                    class="py-2 px-1 rounded-xl text-[11px] font-bold flex flex-col items-center justify-center gap-0.5 transition-all ${state.activeTab === 'tap' ? 'bg-primary text-white shadow-lg shadow-primary/30 font-black' : 'text-slate-400 hover:text-slate-200'}">
                    <span class="material-symbols-outlined text-base leading-none">credit_card</span>
                    <span>Tarjeta TAP</span>
                </button>
                <button onclick="window.switchGuiaTab('promos')" 
                    class="py-2 px-1 rounded-xl text-[11px] font-bold flex flex-col items-center justify-center gap-0.5 transition-all ${state.activeTab === 'promos' ? 'bg-primary text-white shadow-lg shadow-primary/30 font-black' : 'text-slate-400 hover:text-slate-200'}">
                    <span class="material-symbols-outlined text-base leading-none">local_offer</span>
                    <span>Promos</span>
                </button>
                <button onclick="window.switchGuiaTab('estampillas')" 
                    class="py-2 px-1 rounded-xl text-[11px] font-bold flex flex-col items-center justify-center gap-0.5 transition-all ${state.activeTab === 'estampillas' ? 'bg-primary text-white shadow-lg shadow-primary/30 font-black' : 'text-slate-400 hover:text-slate-200'}">
                    <span class="material-symbols-outlined text-base leading-none">medical_services</span>
                    <span>Estampillas</span>
                </button>
            </div>

            <!-- CONTENIDO DE LA PESTAÑA -->
            <div id="guia-tab-data">
                ${state.activeTab === 'sponsors' ? _renderSponsorsTabHTML(sponsors, state) :
                  state.activeTab === 'tap' ? _renderTAPTabHTML(tap) :
                  state.activeTab === 'promos' ? _renderPromosTabHTML(tap) :
                  _renderEstampillasTabHTML(resources.estampillas || {})}
            </div>
        </main>

        ${typeof renderBottomNav === 'function' ? renderBottomNav('control') : ''}
    `;
}

// ══════════════════════════════════════════════════════════════
// SUB-VIEW: COMERCIOS AMIGOS & SPONSORS
// ══════════════════════════════════════════════════════════════
function _renderSponsorsTabHTML(sponsors, state) {
    const categories = [
        { id: 'all', label: 'Todos' },
        { id: 'food', label: '🍕 Viandas' },
        { id: 'tactical', label: '🛡️ Táctico' },
        { id: 'supermarket', label: '🛒 Súper TAP' },
        { id: 'fitness', label: '🏋️ Gimnasios' },
        { id: 'auto', label: '🚗 Automotor' }
    ];

    return `
        <div class="space-y-3.5">
            <!-- BUSCADOR CON CLEAR RÁPIDO -->
            <div class="relative">
                <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                <input type="text" 
                    placeholder="Buscar rotisería, armería, súper o ciudad..." 
                    value="${state.searchTerm || ''}"
                    oninput="window.searchSponsors(this.value)"
                    class="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-slate-900/70 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-all">
                ${state.searchTerm ? `
                    <button onclick="window.searchSponsors(''); const inp = this.previousElementSibling; if(inp){inp.value='';}" 
                        class="absolute right-3 top-1/2 -translate-y-1/2 size-5 rounded-full bg-white/10 flex items-center justify-center text-slate-400 hover:text-white">
                        <span class="material-symbols-outlined text-xs">close</span>
                    </button>
                ` : ''}
            </div>

            <!-- CHIPS DE FILTRO POR CATEGORÍA -->
            <div class="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                ${categories.map(cat => `
                    <button onclick="window.filterSponsorsCategory('${cat.id}')"
                        class="px-3 py-1.5 rounded-xl text-[11px] font-bold shrink-0 transition-all active:scale-95 flex items-center gap-1.5 ${state.categoryFilter === cat.id ? 'bg-primary text-white shadow-md shadow-primary/25 border border-primary' : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-white/10'}">
                        <span>${cat.label}</span>
                    </button>
                `).join('')}
            </div>

            <!-- LISTA DE COMERCIOS -->
            <div id="sponsors-list-container" class="space-y-3">
                ${_renderSponsorsCardsHTML(sponsors, state)}
            </div>

            <!-- INVITACIÓN ELEGANTE A SUMAR COMERCIOS (Ubicada al final para no estorbar) -->
            <div onclick="window.showSponsorProgramModal()" 
                class="cursor-pointer p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border border-amber-500/25 hover:border-amber-500/40 shadow-lg flex items-center justify-between gap-3 active:scale-[0.99] transition-all mt-4">
                <div class="flex items-center gap-3">
                    <div class="size-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                        <span class="material-symbols-outlined text-xl">add_business</span>
                    </div>
                    <div>
                        <div class="flex items-center gap-1.5">
                            <span class="text-xs font-black text-white">¿Tenés un comercio o servicio?</span>
                            <span class="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 text-[8px] font-black uppercase">100% Gratis</span>
                        </div>
                        <p class="text-[10px] text-slate-400 mt-0.5 leading-snug">Sumá tu negocio ante más de 25.000 policías provinciales.</p>
                    </div>
                </div>
                <span class="material-symbols-outlined text-amber-400/80 text-sm shrink-0">chevron_right</span>
            </div>
        </div>
    `;
}

function _renderSponsorsCardsHTML(sponsors, state) {
    let list = [...sponsors];

    if (state.categoryFilter && state.categoryFilter !== 'all') {
        list = list.filter(s => s.category === state.categoryFilter);
    }

    if (state.searchTerm) {
        list = list.filter(s => 
            s.name.toLowerCase().includes(state.searchTerm) ||
            s.description.toLowerCase().includes(state.searchTerm) ||
            s.city.toLowerCase().includes(state.searchTerm) ||
            s.discount.toLowerCase().includes(state.searchTerm)
        );
    }

    if (list.length === 0) {
        return `
            <div class="p-8 text-center rounded-3xl bg-slate-900/40 border border-white/5">
                <span class="material-symbols-outlined text-4xl text-slate-600 mb-2 block">storefront</span>
                <p class="text-xs font-bold text-slate-300">No encontramos comercios con ese filtro</p>
                <p class="text-[11px] text-slate-500 mt-1">Probá con otra categoría o término de búsqueda.</p>
                <button onclick="window.filterSponsorsCategory('all'); window.searchSponsors('');" class="mt-3 px-3 py-1.5 rounded-xl bg-white/10 text-xs font-bold text-white hover:bg-white/15 transition-all">
                    Ver todos los comercios
                </button>
            </div>
        `;
    }

    return list.map((sp, i) => {
        const isPlatino = sp.tier === 'platino';
        const isDestacado = sp.tier === 'destacado';
        const disc = _formatGuiaDiscount(sp.discount);

        // Estilos de tarjeta según categoría / tier
        let cardStyle = 'border-white/10 bg-slate-900/60 shadow-md';
        let badgeStyle = 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400';
        let discountBadgeStyle = 'from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-300';

        if (isPlatino) {
            cardStyle = 'border-primary/40 bg-gradient-to-br from-primary/10 via-slate-900/90 to-slate-900 shadow-xl shadow-primary/10';
            badgeStyle = 'bg-primary/20 border border-primary/40 text-blue-300';
            discountBadgeStyle = 'from-blue-500/20 to-indigo-500/20 border-blue-400/40 text-blue-200';
        } else if (isDestacado) {
            cardStyle = 'border-amber-500/30 bg-gradient-to-br from-amber-500/5 via-slate-900/90 to-slate-900 shadow-lg shadow-amber-500/5';
            badgeStyle = 'bg-amber-500/20 border border-amber-500/30 text-amber-300';
            discountBadgeStyle = 'from-amber-500/20 to-orange-500/20 border-amber-400/40 text-amber-200';
        }

        return `
            <div class="p-4 rounded-2xl border ${cardStyle} transition-all space-y-2.5 relative overflow-hidden"
                style="animation: fadeIn 0.2s ease-out ${i * 30}ms both">
                
                <!-- CABECERA DE LA TARJETA (Insignia + Ciudad a la izquierda, Descuento destacado a la derecha) -->
                <div class="flex items-start justify-between gap-2">
                    <div class="min-w-0 flex-1">
                        <div class="flex items-center gap-1.5 flex-wrap">
                            <span class="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${badgeStyle}">
                                ${sp.badge}
                            </span>
                            <span class="text-[10px] text-slate-400 font-medium">· ${sp.city}</span>
                        </div>
                        <h3 class="text-sm font-black text-white mt-1 leading-snug tracking-tight">${sp.name}</h3>
                    </div>

                    <!-- INSIGNIA DE DESCUENTO (Sin corte ni desborde de texto) -->
                    <div class="text-right shrink-0">
                        <div class="inline-flex flex-col items-end">
                            <span class="px-2.5 py-1 rounded-xl bg-gradient-to-r ${discountBadgeStyle} border text-xs font-black tracking-tight shadow-sm">
                                ${disc.pill}
                            </span>
                            ${disc.scope ? `<span class="text-[9px] text-emerald-400/90 font-semibold mt-0.5 max-w-[130px] truncate text-right">${disc.scope}</span>` : ''}
                        </div>
                    </div>
                </div>

                <!-- DESCRIPCIÓN CON BUENA TIPOGRAFÍA -->
                <p class="text-xs text-slate-300 leading-relaxed font-normal">${sp.description}</p>

                <!-- DATOS DE UBICACIÓN Y MEDIOS DE PAGO (Líneas independientes) -->
                <div class="pt-2 border-t border-white/5 space-y-1.5 text-[11px]">
                    <div class="flex items-center gap-1.5 text-slate-300">
                        <span class="material-symbols-outlined text-sm text-primary shrink-0">pin_drop</span>
                        <span class="truncate">${sp.address}</span>
                    </div>
                    <div class="flex items-center gap-1.5 text-slate-400">
                        <span class="material-symbols-outlined text-sm text-emerald-400 shrink-0">payments</span>
                        <span class="truncate text-[10px]">${sp.accepted}</span>
                    </div>
                </div>

                <!-- BOTÓN DE CONTACTO WHATSAPP CON DESCUENTO POLICIAL -->
                ${sp.whatsapp ? `
                    <div class="pt-1">
                        <button onclick="window.openSponsorWhatsApp('${sp.name.replace(/'/g, "\\'")}', '${sp.category}', '${sp.whatsapp}')"
                            class="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg shadow-emerald-950/40 border border-emerald-400/25">
                            <span class="material-symbols-outlined text-base">chat</span>
                            <span>Pedir con Descuento Policial</span>
                            <span class="material-symbols-outlined text-sm opacity-70">arrow_forward</span>
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

// ══════════════════════════════════════════════════════════════
// SUB-VIEW: TARJETA ALIMENTAR POLICIAL (TAP)
// ══════════════════════════════════════════════════════════════
function _renderTAPTabHTML(tap) {
    const departments = tap.departments || {};

    return `
        <div class="space-y-3.5">
            <!-- MOCKUP TARJETA BANCARIA TAP DE LUJO -->
            <div class="p-5 rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 border border-blue-500/30 text-white shadow-2xl shadow-blue-950/50 relative overflow-hidden">
                <div class="absolute -right-8 -top-8 size-40 bg-primary/20 blur-3xl rounded-full pointer-events-none"></div>
                
                <div class="flex items-center justify-between mb-4 relative z-10">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-2xl text-blue-300">contactless</span>
                        <span class="text-[10px] font-black uppercase tracking-widest text-blue-200">Tarjeta Alimentar Policial</span>
                    </div>
                    <span class="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[9px] font-black uppercase tracking-wider">
                        Vigente 2026
                    </span>
                </div>

                <div class="space-y-1 relative z-10 my-3">
                    <p class="text-[10px] text-blue-200 font-bold uppercase tracking-wider">Saldo Mensual Garantizado</p>
                    <div class="flex items-baseline gap-1.5">
                        <span class="text-3xl font-black text-white tracking-tight">$${(tap.monto || 175682).toLocaleString('es-AR')}</span>
                        <span class="text-xs text-blue-200 font-semibold">/ mes</span>
                    </div>
                </div>

                <div class="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-blue-200/90 relative z-10">
                    <span class="flex items-center gap-1">
                        <span class="material-symbols-outlined text-xs">calendar_month</span>
                        ${tap.proximoCobroEstimado || 'Últimos días hábiles del mes'}
                    </span>
                    <span class="font-bold text-white uppercase tracking-wider">Policía de Santa Fe</span>
                </div>
            </div>

            <!-- CALCULADORA ESTIMADA DE AHORRO -->
            <div class="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-1.5">
                <div class="flex items-center gap-2 text-emerald-400">
                    <span class="material-symbols-outlined text-lg">savings</span>
                    <h3 class="text-xs font-black uppercase tracking-wider text-emerald-200">Ahorro Mensual en Viandas y Súper</h3>
                </div>
                <p class="text-xs text-slate-300 leading-relaxed font-normal">
                    Aprovechando los descuentos del <strong>10% al 25%</strong> en la red de Comercios Amigos y reintegros MODO/NBSF, un efectivo ahorra en promedio entre <strong>$26.000 y $44.000 extra al mes</strong> en comidas de guardia y compras familiares.
                </p>
            </div>

            <!-- SEMÁFORO DE ACEPTACIÓN TAP MODERNO -->
            <div class="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2.5">
                <h3 class="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-primary text-base">help</span>
                    ¿Dónde pasa y dónde rebota la TAP?
                </h3>
                
                <div class="space-y-2 text-xs">
                    <div class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-2.5">
                        <span class="material-symbols-outlined text-emerald-400 text-base shrink-0 mt-0.5">check_circle</span>
                        <div>
                            <p class="text-emerald-300 font-bold text-xs">Aceptación 100% (Rubro Alimentos)</p>
                            <p class="text-[11px] text-slate-300 mt-0.5 leading-snug">Rotiserías, carnicerías, panaderías, almacenes, verdulerías y supermercados habilitados.</p>
                        </div>
                    </div>
                    <div class="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5">
                        <span class="material-symbols-outlined text-amber-400 text-base shrink-0 mt-0.5">warning</span>
                        <div>
                            <p class="text-amber-300 font-bold text-xs">Estaciones de Servicio (Solo SHOP)</p>
                            <p class="text-[11px] text-slate-300 mt-0.5 leading-snug">Habilitada en YPF Full o Shell Select para café y comida. No pasa en el surtidor de combustible.</p>
                        </div>
                    </div>
                    <div class="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-2.5">
                        <span class="material-symbols-outlined text-rose-400 text-base shrink-0 mt-0.5">cancel</span>
                        <div>
                            <p class="text-rose-300 font-bold text-xs">Suele rebotar (Restricción MCC)</p>
                            <p class="text-[11px] text-slate-300 mt-0.5 leading-snug">Cadenas de fast-food (McDonald's, Mostaza), bares nocturnos y compras de indumentaria no alimentaria.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- GUÍA POR DEPARTAMENTO -->
            <div class="space-y-2">
                <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Puntos destacados por Departamento</h3>
                <div class="space-y-2">
                    ${Object.entries(departments).map(([depName, list]) => `
                        <div class="p-3.5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
                            <p class="text-xs font-black text-primary uppercase tracking-wider">${depName}</p>
                            <div class="grid gap-1.5">
                                ${list.map(item => `
                                    <div class="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-0">
                                        <span class="font-bold text-white">${item.chain}</span>
                                        <span class="text-[10px] text-slate-400">${item.detail}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// ══════════════════════════════════════════════════════════════
// SUB-VIEW: PROMOS DEL DÍA (CALENDARIO SEMANAL)
// ══════════════════════════════════════════════════════════════
function _renderPromosTabHTML(tap) {
    const today = new Date().toLocaleDateString('es-ES', { weekday: 'long' });
    const capitalizedToday = today.charAt(0).toUpperCase() + today.slice(1);

    const weekPromos = [
        { day: 'Lunes', store: 'COTO (Santa Fe / Rosario)', discount: '15% Descuento', badge: 'Comunidad Coto', details: 'Abonando con tarjeta débito TAP física o bancaria.' },
        { day: 'Martes', store: 'Supermercados DIA', discount: '30% Reintegro MODO', badge: 'Banco Santa Fe', details: 'Pagando con código QR MODO vinculado a tu cuenta sueldo NBSF.' },
        { day: 'Miércoles', store: 'COTO / BNA+ Comercios', discount: '35% Reintegro', badge: 'Banco Nación / Coto', details: 'Tope de reintegro semanal por usuario en compras de alimentos.' },
        { day: 'Jueves', store: 'ICBC / Comercios de Barrio', discount: '20% Reintegro', badge: 'MODO QR', details: 'Promociones bancarias en rotiserías y despensas de cercanía.' },
        { day: 'Viernes', store: 'Cadena Kilbel & Alvear', discount: '25% Reintegro MODO', badge: 'Banco Santa Fe', details: 'Válido en todas las sucursales de Santa Fe y Santo Tomé.' },
        { day: 'Sábado', store: 'La Anónima / Mayoristas', discount: '30% Reintegro', badge: 'Fin de Semana', details: 'La Anónima en Rafaela/Venado Tuerto y mayoristas Makro/Yaguar.' },
        { day: 'Domingo', store: 'Mayorista Diarco', discount: '15% Descuento Directo', badge: 'Sin Tope', details: 'Ideal para compra comunitaria de tercio o guardia policial.' }
    ];

    const todayMatch = weekPromos.find(p => p.day.toLowerCase() === capitalizedToday.toLowerCase()) || weekPromos[0];

    return `
        <div class="space-y-3.5">
            <!-- PROMO ACTIVA DE HOY -->
            <div class="p-5 rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 text-white shadow-xl shadow-emerald-950/50 border border-emerald-400/30 relative overflow-hidden">
                <div class="absolute -right-8 -bottom-8 size-36 bg-white/10 blur-3xl rounded-full pointer-events-none"></div>
                <div class="flex items-center justify-between mb-2 relative z-10">
                    <span class="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                        <span class="size-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                        HOY · ${capitalizedToday.toUpperCase()}
                    </span>
                    <span class="material-symbols-outlined text-amber-300">local_fire_department</span>
                </div>
                <h2 class="text-2xl font-black text-white relative z-10 tracking-tight">${todayMatch.discount}</h2>
                <p class="text-sm font-bold text-emerald-200 mt-0.5 relative z-10">${todayMatch.store}</p>
                <p class="text-xs text-white/90 mt-2 leading-relaxed relative z-10 font-normal">${todayMatch.details}</p>
            </div>

            <!-- CRONOGRAMA DE AHORRO DÍA POR DÍA -->
            <div class="space-y-2">
                <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Calendario de Ahorro Semanal</h3>
                <div class="space-y-2">
                    ${weekPromos.map(p => {
                        const isToday = p.day.toLowerCase() === capitalizedToday.toLowerCase();
                        return `
                            <div class="p-3 rounded-2xl border transition-all ${isToday ? 'bg-primary/20 border-primary/50 shadow-md shadow-primary/10' : 'bg-slate-900/60 border-white/5'}">
                                <div class="flex items-start justify-between gap-2">
                                    <div class="flex items-center gap-2.5">
                                        <span class="px-2.5 py-1 rounded-xl text-xs font-black uppercase ${isToday ? 'bg-primary text-white shadow-sm' : 'bg-white/10 text-slate-300'}">
                                            ${p.day.slice(0, 3)}
                                        </span>
                                        <div>
                                            <p class="text-xs font-bold text-white">${p.store}</p>
                                            <p class="text-[10px] text-slate-400 leading-snug">${p.details}</p>
                                        </div>
                                    </div>
                                    <span class="px-2 py-1 rounded-xl text-xs font-black shrink-0 ${isToday ? 'bg-emerald-500/25 border border-emerald-400/40 text-emerald-300' : 'bg-white/5 text-slate-300'}">
                                        ${p.discount}
                                    </span>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>
    `;
}

// ══════════════════════════════════════════════════════════════
// SUB-VIEW: ESTAMPILLAS MÉDICAS
// ══════════════════════════════════════════════════════════════
function _renderEstampillasTabHTML(estampillas) {
    const locations = estampillas.locations || [];

    return `
        <div class="space-y-3.5">
            <div class="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/25 space-y-1.5">
                <div class="flex items-center gap-2 text-blue-400">
                    <span class="material-symbols-outlined text-lg">medical_information</span>
                    <h3 class="text-xs font-black uppercase tracking-wider text-blue-200">Justificación de Licencias L.C.A.T.</h3>
                </div>
                <p class="text-xs text-slate-300 leading-relaxed font-normal">
                    Para justificar carpetas médicas y licencias de corta duración, los certificados particulares requieren estampilla del Colegio de Médicos o Caja del Arte de Curar. Puntos de venta oficiales:
                </p>
            </div>

            <div class="space-y-2">
                <div class="flex items-center justify-between ml-1">
                    <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Puntos de Venta (${locations.length})</h3>
                    <span class="text-[10px] text-slate-500">Santa Fe y Rosario</span>
                </div>
                <div class="space-y-2">
                    ${locations.map((loc, i) => `
                        <div class="p-3 rounded-2xl bg-slate-900/60 border border-white/5 flex items-start gap-3" style="animation: fadeIn 0.2s ease-out ${i * 30}ms both">
                            <div class="size-8 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                                <span class="material-symbols-outlined text-base">pin_drop</span>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-xs font-bold text-white truncate">${loc.name}</p>
                                <p class="text-[10px] text-slate-400 mt-0.5 leading-snug">${loc.address}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}
