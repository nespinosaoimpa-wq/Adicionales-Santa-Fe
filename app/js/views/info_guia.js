/**
 * Adicionales Santa Fe - Centro de Beneficios, TAP & Red de Sponsors Policiales
 * v2.0 - Catálogo de Comercios Amigos, Tarjeta Alimentar Policial y Estampillas
 */

window._guiaState = window._guiaState || {
    activeTab: 'sponsors', // 'sponsors' | 'tap' | 'promos' | 'estampillas'
    categoryFilter: 'all',
    cityFilter: 'all',
    searchTerm: ''
};

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
            <div class="glass-card w-full max-w-md p-6 rounded-3xl border border-primary/30 bg-background-dark/95 shadow-2xl text-left relative overflow-hidden" style="animation: scaleUp 0.25s ease-out">
                <div class="absolute -top-16 -right-16 size-40 bg-primary/20 blur-3xl pointer-events-none rounded-full"></div>
                
                <div class="flex items-center justify-between pb-3 border-b border-white/10">
                    <div class="flex items-center gap-2.5">
                        <div class="size-9 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                            <span class="material-symbols-outlined text-xl">store</span>
                        </div>
                        <div>
                            <h3 class="text-sm font-black text-white">Programa Comercios Amigos</h3>
                            <p class="text-[10px] text-primary font-bold uppercase tracking-wider">Red Policial Santa Fe</p>
                        </div>
                    </div>
                    <button onclick="document.getElementById('modal-sponsor-program').remove()" class="p-1 rounded-full text-slate-400 hover:text-white">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div class="py-4 space-y-3.5 text-xs text-slate-300">
                    <div class="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
                        <p class="font-bold text-xs text-white">¿Por qué sumarte?</p>
                        <p class="text-[11px] text-blue-200/90 mt-1">
                            Llegá a más de <strong>25.000 policías provinciales</strong> y sus familias. El personal policial cuenta con acreditación garantizada de la <strong>Tarjeta Alimentar Policial ($175.682/mes)</strong>, movilizando más de $4.300 millones mensuales.
                        </p>
                    </div>

                    <div class="space-y-2">
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Modalidades de Adhesión:</p>
                        <div class="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5">
                            <span class="text-emerald-400 font-black text-sm shrink-0">🟢</span>
                            <div>
                                <p class="text-white font-bold text-xs">Comercio Amigo (100% Gratuito)</p>
                                <p class="text-[10px] text-slate-400">Ofrecés 10% a 15% de descuento a policías y tu negocio figura en la app con botón de WhatsApp directo.</p>
                            </div>
                        </div>
                        <div class="p-2.5 rounded-xl bg-white/5 border border-amber-500/20 flex items-start gap-2.5">
                            <span class="text-amber-400 font-black text-sm shrink-0">🟡</span>
                            <div>
                                <p class="text-white font-bold text-xs">Sponsor Destacado ($15.000 / mes)</p>
                                <p class="text-[10px] text-slate-400">Aparece en los primeros lugares, badge dorado y banner en la pantalla de inicio.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="pt-2 flex flex-col gap-2">
                    <a href="https://wa.me/5493425162372?text=${encodeURIComponent('Hola! Quiero sumar mi comercio a la Red de Beneficios Policiales de Adicionales Santa Fe. Mi negocio es: ')}"
                        target="_blank" rel="noopener noreferrer"
                        onclick="document.getElementById('modal-sponsor-program')?.remove()"
                        class="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all">
                        <span class="material-symbols-outlined text-lg">chat</span>
                        Sumar mi Comercio por WhatsApp
                    </a>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    };

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-light/85 dark:bg-background-dark/95 backdrop-blur-xl border-b border-white/5 px-4 h-16 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <button onclick="window.history.length > 1 ? window.history.back() : router.navigateTo('#control')" class="size-10 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors active:scale-95">
                    <span class="material-symbols-outlined">arrow_back</span>
                </button>
                <div>
                    <h1 class="text-base font-black text-slate-900 dark:text-white leading-tight">Centro de Beneficios & TAP</h1>
                    <p class="text-[10px] text-primary font-bold uppercase tracking-wider">Convenios y Descuentos Policiales</p>
                </div>
            </div>
            <button onclick="window.showSponsorProgramModal()" class="px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 active:scale-95 transition-all">
                <span class="material-symbols-outlined text-sm">add_business</span> Sumar Negocio
            </button>
        </header>

        <main class="p-4 space-y-4 pb-36 max-w-md mx-auto animate-fade-in">
            <!-- TABS SUPERIORES (Comercios Amigos | TAP | Promos Día | Estampillas) -->
            <div class="flex p-1 bg-white/5 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar shadow-inner">
                <button onclick="window.switchGuiaTab('sponsors')" 
                    class="flex-1 min-w-[90px] py-2.5 rounded-xl text-[10px] uppercase tracking-wider font-black transition-all ${state.activeTab === 'sponsors' ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'text-slate-400 hover:text-white'}">
                    ⭐ Comercios
                </button>
                <button onclick="window.switchGuiaTab('tap')" 
                    class="flex-1 min-w-[70px] py-2.5 rounded-xl text-[10px] uppercase tracking-wider font-black transition-all ${state.activeTab === 'tap' ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'text-slate-400 hover:text-white'}">
                    💳 TAP
                </button>
                <button onclick="window.switchGuiaTab('promos')" 
                    class="flex-1 min-w-[80px] py-2.5 rounded-xl text-[10px] uppercase tracking-wider font-black transition-all ${state.activeTab === 'promos' ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'text-slate-400 hover:text-white'}">
                    📅 Promos
                </button>
                <button onclick="window.switchGuiaTab('estampillas')" 
                    class="flex-1 min-w-[85px] py-2.5 rounded-xl text-[10px] uppercase tracking-wider font-black transition-all ${state.activeTab === 'estampillas' ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'text-slate-400 hover:text-white'}">
                    🏥 Estampillas
                </button>
            </div>

            <!-- TAB CONTENT -->
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
        <div class="space-y-4">
            <!-- BANNER CALL-TO-ACTION PARA SPONSORS -->
            <div onclick="window.showSponsorProgramModal()" class="cursor-pointer p-4 rounded-3xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-primary/20 border border-amber-500/40 shadow-xl flex items-center justify-between gap-3 active:scale-[0.98] transition-all">
                <div class="flex items-center gap-3">
                    <div class="size-11 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-lg shadow-amber-500/20">
                        <span class="material-symbols-outlined text-2xl">campaign</span>
                    </div>
                    <div>
                        <div class="flex items-center gap-1.5">
                            <span class="text-xs font-black text-white">¿Tenés un Comercio?</span>
                            <span class="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 text-[8px] font-black uppercase">Sponsor</span>
                        </div>
                        <p class="text-[11px] text-amber-200/90 mt-0.5">Sumá tu negocio ante más de 25.000 efectivos policiales.</p>
                    </div>
                </div>
                <span class="material-symbols-outlined text-amber-400 shrink-0">chevron_right</span>
            </div>

            <!-- SEARCH BAR -->
            <div class="relative">
                <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                <input type="text" 
                    placeholder="Buscar rotisería, armería, súper o ciudad..." 
                    value="${state.searchTerm || ''}"
                    oninput="window.searchSponsors(this.value)"
                    class="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors">
            </div>

            <!-- CATEGORY CHIPS -->
            <div class="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                ${categories.map(cat => `
                    <button onclick="window.filterSponsorsCategory('${cat.id}')"
                        class="px-3 py-1.5 rounded-xl text-[10px] font-bold shrink-0 transition-all active:scale-95 ${state.categoryFilter === cat.id ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'}">
                        ${cat.label}
                    </button>
                `).join('')}
            </div>

            <!-- SPONSORS CARDS LIST -->
            <div id="sponsors-list-container" class="space-y-3">
                ${_renderSponsorsCardsHTML(sponsors, state)}
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
            <div class="p-8 text-center glass-card rounded-3xl border border-white/5">
                <span class="material-symbols-outlined text-4xl text-slate-600 mb-2 block">storefront</span>
                <p class="text-xs font-bold text-slate-400">No encontramos comercios con ese filtro</p>
                <p class="text-[11px] text-slate-500 mt-1">Probá con otra categoría o buscá por ciudad.</p>
                <button onclick="window.filterSponsorsCategory('all'); window.searchSponsors('');" class="mt-3 px-3 py-1.5 rounded-xl bg-white/10 text-xs font-bold text-white hover:bg-white/15">
                    Ver todos los comercios
                </button>
            </div>
        `;
    }

    return list.map((sp, i) => {
        const isPlatino = sp.tier === 'platino';
        const isDestacado = sp.tier === 'destacado';

        return `
            <div class="p-4 rounded-3xl glass-card border transition-all active:scale-[0.99] space-y-3 relative overflow-hidden ${isPlatino ? 'border-primary/50 bg-gradient-to-br from-primary/15 via-blue-900/10 to-slate-900 shadow-lg shadow-primary/10' : isDestacado ? 'border-amber-500/40 bg-gradient-to-br from-amber-500/10 to-slate-900/60' : 'border-white/5 bg-white/5'}"
                style="animation: fadeIn 0.25s ease-out ${i * 40}ms both">
                
                <div class="flex items-start justify-between gap-2">
                    <div>
                        <div class="flex items-center gap-1.5">
                            <span class="text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${isPlatino ? 'bg-primary/20 text-primary border border-primary/30' : isDestacado ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-400'}">
                                ${sp.badge}
                            </span>
                            <span class="text-[10px] text-slate-400">· ${sp.city}</span>
                        </div>
                        <h3 class="text-sm font-black text-white mt-1 leading-snug">${sp.name}</h3>
                    </div>
                    <span class="px-2.5 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black shrink-0">
                        ${sp.discount}
                    </span>
                </div>

                <p class="text-[11px] text-slate-300 leading-relaxed">${sp.description}</p>

                <div class="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[10px]">
                    <div class="flex items-center gap-1 text-slate-400">
                        <span class="material-symbols-outlined text-xs text-primary">location_on</span>
                        <span class="truncate max-w-[200px]">${sp.address}</span>
                    </div>
                    <span class="text-slate-400 font-medium">${sp.accepted}</span>
                </div>

                ${sp.whatsapp ? `
                    <div class="pt-1">
                        <button onclick="window.openSponsorWhatsApp('${sp.name.replace(/'/g, "\\'")}', '${sp.category}', '${sp.whatsapp}')"
                            class="w-full py-2.5 px-3 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md shadow-emerald-600/20">
                            <span class="material-symbols-outlined text-base">chat</span>
                            Pedir / Consultar con Descuento Policial
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
        <div class="space-y-4">
            <!-- CARD SALDO MENSUAL -->
            <div class="p-5 rounded-3xl bg-gradient-to-br from-primary via-blue-700 to-indigo-800 text-white shadow-xl shadow-primary/25 relative overflow-hidden">
                <div class="absolute -right-8 -top-8 size-36 bg-white/10 blur-3xl rounded-full"></div>
                <div class="flex items-center justify-between mb-3 relative z-10">
                    <div class="flex items-center gap-2.5">
                        <div class="size-10 rounded-2xl bg-white/20 flex items-center justify-center">
                            <span class="material-symbols-outlined text-2xl">credit_card</span>
                        </div>
                        <div>
                            <p class="text-[10px] font-black uppercase tracking-widest text-blue-200">Tarjeta Alimentar Policial</p>
                            <h2 class="text-xs font-bold text-white">Santa Fe · Vigente 2026</h2>
                        </div>
                    </div>
                    <span class="px-2 py-0.5 rounded-full bg-emerald-400/20 border border-emerald-400/40 text-emerald-200 text-[9px] font-black uppercase">Al Día</span>
                </div>

                <div class="pt-2 border-t border-white/15 relative z-10">
                    <p class="text-[10px] text-blue-200 font-bold uppercase tracking-wider">Monto Mensual Acreditado:</p>
                    <div class="flex items-baseline gap-1 mt-0.5">
                        <span class="text-3xl font-black text-white">$${(tap.monto || 175682).toLocaleString('es-AR')}</span>
                        <span class="text-xs text-blue-200 font-semibold">/ mes</span>
                    </div>
                    <p class="text-[10px] text-blue-100/80 mt-1 flex items-center gap-1">
                        <span class="material-symbols-outlined text-xs">event</span>
                        Cobro estimado: ${tap.proximoCobroEstimado || 'Últimos días hábiles del mes'}
                    </p>
                </div>
            </div>

            <!-- CALCULADORA DE AHORRO POLICIAL -->
            <div class="p-4 rounded-3xl glass-card border border-emerald-500/30 bg-emerald-500/5 space-y-2">
                <div class="flex items-center gap-2 text-emerald-400">
                    <span class="material-symbols-outlined text-lg">savings</span>
                    <h3 class="text-xs font-black uppercase tracking-wider text-emerald-200">Ahorro Mensual con Convenios</h3>
                </div>
                <p class="text-[11px] text-slate-300 leading-relaxed">
                    Aprovechando los descuentos del <strong>15% al 25%</strong> en los Comercios Amigos y reintegros MODO en supermercados, ahorrás entre <strong>$26.000 y $44.000 extra al mes</strong> en tus compras y comidas de guardia.
                </p>
            </div>

            <!-- SEMÁFORO DE ACEPTACIÓN TAP -->
            <div class="p-4 rounded-3xl glass-card border border-white/5 space-y-3">
                <h3 class="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-primary text-sm">traffic</span>
                    ¿Dónde pasa y dónde rebota la TAP?
                </h3>
                
                <div class="space-y-2 text-xs">
                    <div class="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-2.5">
                        <span class="text-emerald-400 font-black text-sm shrink-0">🟢</span>
                        <div>
                            <p class="text-emerald-300 font-bold">Pasa 100% (Rubro Alimentos Directos)</p>
                            <p class="text-[10px] text-slate-300 mt-0.5">Panaderías, carnicerías, rotiserías barriales, almacenes, verdulerías y supermercados habilitados.</p>
                        </div>
                    </div>
                    <div class="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5">
                        <span class="text-amber-400 font-black text-sm shrink-0">🟡</span>
                        <div>
                            <p class="text-amber-300 font-bold">Estaciones de Servicio (Solo SHOP)</p>
                            <p class="text-[10px] text-slate-300 mt-0.5">En YPF Full o Shell Select podés comprar café o comida. No pasa en el surtidor de combustible.</p>
                        </div>
                    </div>
                    <div class="p-3 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-2.5">
                        <span class="text-red-400 font-black text-sm shrink-0">🔴</span>
                        <div>
                            <p class="text-red-300 font-bold">Suele rebotar (Restricción Bancaria MCC)</p>
                            <p class="text-[10px] text-slate-300 mt-0.5">Cadenas multinacionales de fast-food (McDonald's, Mostaza), bares nocturnos y compras online no alimentarias.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- GUÍA POR DEPARTAMENTOS -->
            <div class="space-y-2.5">
                <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Comercios destacados por Departamento</h3>
                <div class="space-y-2">
                    ${Object.entries(departments).map(([depName, list]) => `
                        <div class="p-3.5 rounded-2xl glass-card border border-white/5 space-y-2">
                            <p class="text-xs font-black text-primary uppercase">${depName}</p>
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
        <div class="space-y-4">
            <!-- HERO PROMO DE HOY -->
            <div class="p-5 rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 text-white shadow-xl shadow-emerald-600/20 relative overflow-hidden">
                <div class="absolute -right-8 -bottom-8 size-36 bg-white/10 blur-3xl rounded-full"></div>
                <div class="flex items-center justify-between mb-2 relative z-10">
                    <span class="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[9px] font-black uppercase tracking-wider">
                        OFERTA DE HOY · ${capitalizedToday.toUpperCase()}
                    </span>
                    <span class="material-symbols-outlined text-white/80">local_fire_department</span>
                </div>
                <h2 class="text-2xl font-black text-white relative z-10">${todayMatch.discount}</h2>
                <p class="text-sm font-bold text-emerald-200 mt-0.5 relative z-10">${todayMatch.store}</p>
                <p class="text-[11px] text-white/90 mt-2 leading-relaxed relative z-10">${todayMatch.details}</p>
            </div>

            <!-- CRONOGRAMA SEMANAL COMPLETO -->
            <div class="space-y-2">
                <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Calendario de Ahorro Semanal</h3>
                <div class="space-y-2">
                    ${weekPromos.map(p => {
                        const isToday = p.day.toLowerCase() === capitalizedToday.toLowerCase();
                        return `
                            <div class="p-3.5 rounded-2xl border transition-all ${isToday ? 'bg-primary/20 border-primary/50 shadow-md shadow-primary/10' : 'glass-card border-white/5 bg-white/5'}">
                                <div class="flex items-start justify-between gap-2">
                                    <div class="flex items-center gap-2">
                                        <span class="px-2 py-0.5 rounded-lg text-xs font-black uppercase ${isToday ? 'bg-primary text-white' : 'bg-white/10 text-slate-300'}">
                                            ${p.day.slice(0, 3)}
                                        </span>
                                        <div>
                                            <p class="text-xs font-bold text-white">${p.store}</p>
                                            <p class="text-[10px] text-slate-400">${p.details}</p>
                                        </div>
                                    </div>
                                    <span class="px-2 py-1 rounded-xl text-xs font-black shrink-0 ${isToday ? 'bg-emerald-500/30 text-emerald-300' : 'bg-white/10 text-slate-300'}">
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
        <div class="space-y-4">
            <div class="p-4 rounded-3xl bg-blue-500/10 border border-blue-500/25 space-y-2">
                <div class="flex items-center gap-2 text-blue-400">
                    <span class="material-symbols-outlined text-lg">medical_information</span>
                    <h3 class="text-xs font-black uppercase tracking-wider text-blue-200">Justificación de Licencias</h3>
                </div>
                <p class="text-[11px] text-slate-300 leading-relaxed">
                    Para justificar carpetas médicas y licencias de corta duración (L.C.A.T.), los certificados particulares requieren estampilla del Colegio de Médicos o Arte de Curar. Puntos de venta autorizados:
                </p>
            </div>

            <div class="space-y-2">
                <div class="flex items-center justify-between ml-1">
                    <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Puntos de Venta (${locations.length})</h3>
                    <span class="text-[10px] text-slate-500">Santa Fe y Rosario</span>
                </div>
                <div class="space-y-2">
                    ${locations.map((loc, i) => `
                        <div class="p-3 rounded-2xl glass-card border border-white/5 flex items-start gap-3" style="animation: fadeIn 0.2s ease-out ${i * 30}ms both">
                            <div class="size-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
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
