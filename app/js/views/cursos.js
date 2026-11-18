/**
 * Adicionales Santa Fe - Repositorio de Cursos Oficiales Capacitar
 * Acceso Restringido: Suscripción Única $10.000 con Aprobación del Administrador
 */

(function() {
    'use strict';

    window._cursosState = window._cursosState || {
        categoryFilter: 'todos',
        searchTerm: ''
    };

    /**
     * Verifica si el usuario actual cuenta con habilitación para acceder al repositorio.
     */
    window._hasCursosAccess = function() {
        // 1. Super Administrador siempre tiene acceso total
        if (typeof store !== 'undefined' && store.isAdmin && store.isAdmin()) return true;

        // 2. Verificación en perfil de usuario (aprobado por el administrador)
        if (typeof store !== 'undefined' && store.user) {
            const u = store.user;
            if (u.cursos_access === true) return true;
            if (u.pro_status === 'approved' && (u.isep_pro || u.pro_member)) return true;
        }

        // 3. Verificación local persistente
        try {
            if (localStorage.getItem('asf_cursos_access_approved') === 'true') return true;
        } catch(e) {}

        return false;
    };

    /**
     * Sincroniza en segundo plano con la base de datos para detectar aprobación inmediata del admin.
     */
    function _syncCursosAccessInBackground() {
        if (!window._hasCursosAccess() && typeof store !== 'undefined' && store.user && store.user.email && typeof DB !== 'undefined' && DB.getUser) {
            DB.getUser(store.user.email).then(freshUser => {
                if (freshUser && (freshUser.cursos_access === true || freshUser.pro_status === 'approved' || freshUser.isep_pro === true)) {
                    if (store.user) {
                        store.user.cursos_access = true;
                        store.user.pro_status = 'approved';
                        store.user.isep_pro = true;
                    }
                    try {
                        localStorage.setItem('asf_cursos_access_approved', 'true');
                        localStorage.removeItem('asf_cursos_pending');
                    } catch(e) {}
                    if (window.showToast) {
                        window.showToast("🎉 ¡Tu acceso al Repositorio de Cursos fue habilitado!");
                    }
                    renderCursos();
                }
            }).catch(() => {});
        }
    }

    /**
     * Envía la solicitud de habilitación y abre WhatsApp con el comprobante de transferencia.
     */
    window._submitCursosPayment = async function() {
        const userEmail = typeof store !== 'undefined' && store.user ? (store.user.email || '') : '';
        const userName = typeof store !== 'undefined' && store.user ? (store.user.name || store.user.displayName || 'Oficial') : 'Oficial';

        // 1. Notificar a Firestore / Supabase para el panel #admin
        if (typeof DB !== 'undefined' && DB.notifyAcademyPayment) {
            try {
                await DB.notifyAcademyPayment({
                    email: userEmail,
                    name: userName,
                    amount: 10000,
                    hierarchy: 'Repositorio Cursos Capacitar ($10.000)'
                });
            } catch(e) {
                console.warn("Error notifying cursos payment:", e);
            }
        }

        // 2. Guardar estado pendiente en local
        try {
            localStorage.setItem('asf_cursos_pending', 'true');
        } catch(e) {}
        if (typeof store !== 'undefined' && store.user) {
            store.user.pro_status = 'pending';
        }

        // 3. Abrir WhatsApp oficial con comprobante
        const msg = `Hola! Quiero activar mi acceso al Repositorio Oficial de Cursos Capacitar ($10.000 - Suscripción Única) en Adicionales Santa Fe.\n\n👤 Oficial: ${userName}\n📧 Email registrado: ${userEmail}\n\nAdjunto comprobante de transferencia a SmartFlow.Digital.`;
        const waUrl = `https://wa.me/5493425162372?text=${encodeURIComponent(msg)}`;
        window.open(waUrl, '_blank');

        if (typeof showToast === 'function') {
            showToast("✅ Solicitud registrada. Al verificar tu comprobante por WhatsApp se habilitará tu acceso.");
        }
        renderCursos();
    };

    window._filterCursosCategory = function(cat) {
        window._cursosState.categoryFilter = cat;
        renderCursos();
    };

    window._searchCursosInput = function(query) {
        window._cursosState.searchTerm = query;
        const container = document.getElementById('cursos-cards-grid');
        if (container) {
            container.innerHTML = _renderCursosCardsListHTML();
        }
    };

    function _getCoursesList() {
        if (window.academyCourses && Array.isArray(window.academyCourses) && window.academyCourses.length > 0) {
            return window.academyCourses;
        }
        return [];
    }

    function _renderCursosCardsListHTML() {
        const courses = _getCoursesList();
        const state = window._cursosState;
        const activeCategory = state.categoryFilter || 'todos';
        const searchTerm = (state.searchTerm || '').trim().toLowerCase();

        const filtered = courses.filter(c => {
            const matchCategory = activeCategory === 'todos' || c.category === activeCategory;
            const matchSearch = !searchTerm ||
                (c.title && c.title.toLowerCase().includes(searchTerm)) ||
                (c.provider && c.provider.toLowerCase().includes(searchTerm)) ||
                (c.partner && c.partner.toLowerCase().includes(searchTerm)) ||
                (c.topic && c.topic.toLowerCase().includes(searchTerm)) ||
                (c.description && c.description.toLowerCase().includes(searchTerm));
            return matchCategory && matchSearch;
        });

        if (filtered.length === 0) {
            return `
                <div class="col-span-full text-center py-12 px-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <span class="material-symbols-outlined text-4xl text-slate-500">search_off</span>
                    <p class="text-sm font-bold text-slate-300">No se encontraron cursos con ese filtro</p>
                    <p class="text-xs text-slate-500">Probá con otra palabra clave o cambiá la categoría.</p>
                    <button onclick="window._filterCursosCategory('todos')" class="mt-2 text-xs font-black text-primary hover:underline">
                        Ver todos los cursos
                    </button>
                </div>
            `;
        }

        return filtered.map(course => {
            const isFeatured = !!course.featured;
            return `
                <article class="bg-slate-900 border ${isFeatured ? 'border-primary/50 shadow-xl shadow-primary/10' : 'border-slate-800 shadow-lg'} rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all space-y-4">
                    
                    <div class="space-y-3">
                        <!-- TOP BADGES -->
                        <div class="flex flex-wrap items-center justify-between gap-2">
                            <div class="flex flex-wrap items-center gap-1.5">
                                <span class="px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                                    <span class="material-symbols-outlined text-xs">apartment</span>
                                    ${course.partner || 'Capacitar'}
                                </span>
                                <span class="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700/80 text-slate-300 text-[10px] font-semibold">
                                    ${course.topic || 'General'}
                                </span>
                            </div>

                            ${isFeatured ? `
                                <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[9px] font-black uppercase tracking-wider flex items-center gap-1 animate-pulse">
                                    <span class="material-symbols-outlined text-xs">local_fire_department</span> DESTACADO
                                </span>
                            ` : ''}
                        </div>

                        <!-- TITLE & PARTNER -->
                        <div>
                            <h3 class="text-lg font-black text-white leading-snug">${course.title}</h3>
                            <p class="text-xs font-medium text-slate-400 mt-0.5 flex items-center gap-1">
                                <span class="material-symbols-outlined text-xs text-emerald-400">verified</span>
                                ${course.partner} · Plataforma Capacitar
                            </p>
                        </div>

                        <!-- DESCRIPTION -->
                        <p class="text-xs text-slate-300 leading-relaxed">
                            ${course.description}
                        </p>

                        <!-- SPECS / METADATA PILLS -->
                        <div class="grid grid-cols-3 gap-2 p-3 rounded-xl bg-black/40 border border-slate-800 text-[11px] text-center">
                            <div>
                                <span class="block text-slate-400 font-bold uppercase text-[9px]">Duración</span>
                                <span class="text-white font-semibold flex items-center justify-center gap-0.5 mt-0.5">
                                    <span class="material-symbols-outlined text-xs text-primary">schedule</span>
                                    ${course.duration}
                                </span>
                            </div>
                            <div>
                                <span class="block text-slate-400 font-bold uppercase text-[9px]">Nivel</span>
                                <span class="text-white font-semibold block mt-0.5">${course.level || 'Todos'}</span>
                            </div>
                            <div>
                                <span class="block text-slate-400 font-bold uppercase text-[9px]">Costo</span>
                                <span class="text-emerald-400 font-bold block mt-0.5">Gratis ($0)</span>
                            </div>
                        </div>

                        <!-- KEY SYLLABUS POINTS -->
                        <div class="space-y-1.5 pt-1">
                            <span class="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                <span class="material-symbols-outlined text-xs text-primary">menu_book</span>
                                Contenidos Clave:
                            </span>
                            <ul class="space-y-1 text-xs text-slate-300">
                                ${(course.syllabus || []).slice(0, 3).map(m => `
                                    <li class="flex items-start gap-1.5">
                                        <span class="material-symbols-outlined text-xs text-emerald-400 shrink-0 mt-0.5">check_circle</span>
                                        <span class="leading-tight">${m}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>

                    <!-- ACTION BUTTONS (DESBLOQUEADOS) -->
                    <div class="pt-3 border-t border-slate-800 space-y-2">
                        <a href="${course.registrationUrl}" target="_blank" rel="noopener noreferrer" 
                           class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 active:scale-98 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all">
                            <span class="material-symbols-outlined text-base">how_to_reg</span>
                            <span>Ir al Formulario de Inscripción Oficial</span>
                            <span class="material-symbols-outlined text-xs">open_in_new</span>
                        </a>

                        ${course.catalogueUrl ? `
                            <a href="${course.catalogueUrl}" target="_blank" rel="noopener noreferrer" 
                               class="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 active:scale-98 text-emerald-300 font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 border border-emerald-500/20 transition-all">
                                <span class="material-symbols-outlined text-sm">open_in_browser</span>
                                <span>Ver Ficha Oficial en Argentina.gob.ar</span>
                                <span class="material-symbols-outlined text-[10px]">launch</span>
                            </a>
                        ` : ''}
                    </div>

                </article>
            `;
        }).join('');
    }

    /**
     * Renderizador principal de la vista #cursos
     */
    window.renderCursos = function(targetContainer) {
        const container = targetContainer || document.getElementById('view-cursos') || document.getElementById('app');
        if (!container) return;

        _syncCursosAccessInBackground();

        const hasAccess = window._hasCursosAccess();
        const isPending = (typeof store !== 'undefined' && store.user && store.user.pro_status === 'pending') ||
                          (localStorage.getItem('asf_cursos_pending') === 'true');

        if (!hasAccess) {
            // ══════════════════════════════════════════════════════════════
            // PANTALLA DE ACCESO RESTRINGIDO / PAGO Y ACTIVACIÓN ($10.000)
            // ══════════════════════════════════════════════════════════════
            container.innerHTML = `
                <div class="min-h-screen bg-background-dark text-white flex flex-col justify-between pb-32">
                    
                    <!-- HEADER -->
                    <header class="p-4 border-b border-white/5 flex items-center justify-between sticky top-0 bg-background-dark/90 backdrop-blur-md z-30">
                        <div class="flex items-center gap-3">
                            <button onclick="router.navigateTo('#agenda')" class="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                                <span class="material-symbols-outlined">arrow_back</span>
                            </button>
                            <div>
                                <h1 class="text-base font-black text-white leading-tight">Repositorio Oficial Capacitar</h1>
                                <span class="text-[10px] text-amber-400 font-bold uppercase tracking-widest">Acceso Restringido</span>
                            </div>
                        </div>
                        <span class="px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                            <span class="material-symbols-outlined text-xs">lock</span> $10.000 ÚNICO
                        </span>
                    </header>

                    <!-- CONTENT -->
                    <main class="flex-1 p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto w-full space-y-6">
                        
                        <!-- HERO PRESENTATION -->
                        <div class="p-6 rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/30 shadow-2xl space-y-4">
                            <div class="flex items-center justify-between">
                                <span class="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                                    <span class="material-symbols-outlined text-xs">account_balance</span>
                                    MINISTERIO DE ECONOMÍA DE LA NACIÓN
                                </span>
                                <span class="text-[10px] font-bold text-emerald-400">Certificación Oficial</span>
                            </div>

                            <div class="space-y-2">
                                <h2 class="text-2xl font-black text-white leading-tight">
                                    Repositorio Oficial de Cursos con Certificado
                                </h2>
                                <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                    Accedé a los <strong>enlaces directos y curados</strong> de más de 135 cursos oficiales y gratuitos de la plataforma estatal <strong>Capacitar</strong>, en alianza con líderes globales como <strong>Accenture, Microsoft, AWS y Oracle</strong>.
                                </p>
                            </div>

                            <!-- BENEFICIOS -->
                            <div class="space-y-2.5 pt-3 border-t border-slate-800 text-xs text-slate-200">
                                <div class="flex items-start gap-2.5">
                                    <span class="material-symbols-outlined text-emerald-400 text-base shrink-0 mt-0.5">verified</span>
                                    <span><strong>Certificados oficiales con QR</strong> y código de validación digital para sumar a tu legajo de antecedentes.</span>
                                </div>
                                <div class="flex items-start gap-2.5">
                                    <span class="material-symbols-outlined text-blue-400 text-base shrink-0 mt-0.5">bolt</span>
                                    <span><strong>Enlaces directos a los formularios:</strong> Olvidate de buscar y dar vueltas en portales gubernamentales.</span>
                                </div>
                                <div class="flex items-start gap-2.5">
                                    <span class="material-symbols-outlined text-amber-400 text-base shrink-0 mt-0.5">schedule</span>
                                    <span><strong>100% Online y Asincrónicos:</strong> Cursás a tu propio ritmo, desde tu celular o computadora.</span>
                                </div>
                            </div>
                        </div>

                        <!-- PRICING & PAYMENT CARD -->
                        <div class="p-6 rounded-3xl bg-slate-900 border border-amber-500/30 shadow-2xl space-y-5">
                            
                            <div class="flex items-center justify-between border-b border-slate-800 pb-4">
                                <div>
                                    <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Costo de Habilitación</span>
                                    <h3 class="text-2xl font-black text-amber-400 leading-none mt-1">$10.000 <span class="text-xs text-slate-400 font-normal">/ suscripción única</span></h3>
                                </div>
                                <span class="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-black uppercase">
                                    Sin Mensualidades
                                </span>
                            </div>

                            <!-- DATOS DE TRANSFERENCIA -->
                            <div class="p-4 rounded-2xl bg-black/50 border border-slate-800 space-y-2.5 text-xs">
                                <div class="flex items-center justify-between">
                                    <span class="text-slate-400">Destino / Empresa:</span>
                                    <span class="font-bold text-white">SmartFlow.Digital</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-slate-400">Alias de Transferencia:</span>
                                    <span class="font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-lg border border-primary/20">SmartFlow.Digital</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-slate-400">Monto exacto:</span>
                                    <span class="font-black text-amber-400">$10.000 ARS</span>
                                </div>
                            </div>

                            <!-- ACTION STATUS -->
                            ${isPending ? `
                                <div class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-3">
                                    <div class="flex items-center gap-2 font-bold text-amber-300">
                                        <span class="material-symbols-outlined text-lg">hourglass_top</span>
                                        <span>Solicitud en Proceso de Verificación</span>
                                    </div>
                                    <p class="leading-relaxed text-[11px] text-amber-200/90">
                                        Tu comprobante fue registrado. El administrador verificará la transferencia y habilitará tu acceso a la brevedad.
                                    </p>
                                    <button onclick="window._submitCursosPayment()" class="w-full py-2.5 px-4 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-amber-500/40 transition-all">
                                        <span class="material-symbols-outlined text-base">chat</span>
                                        <span>Reenviar o Consultar por WhatsApp</span>
                                    </button>
                                </div>
                            ` : `
                                <div class="space-y-3">
                                    <p class="text-xs text-slate-400 leading-relaxed">
                                        Transferí <strong>$10.000</strong> a <strong>SmartFlow.Digital</strong> y enviá el comprobante por WhatsApp para que el administrador te habilite el acceso inmediato.
                                    </p>

                                    <button onclick="window._submitCursosPayment()" class="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:brightness-110 active:scale-98 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 transition-all">
                                        <span class="material-symbols-outlined text-lg">send</span>
                                        <span>Enviar Comprobante por WhatsApp ($10.000)</span>
                                    </button>
                                </div>
                            `}

                        </div>

                    </main>

                    ${typeof renderBottomNav === 'function' ? renderBottomNav('agenda') : ''}
                </div>
            `;
            return;
        }

        // ══════════════════════════════════════════════════════════════
        // PANTALLA HABILITADA (REPOSITORIO COMPLETO DESBLOQUEADO)
        // ══════════════════════════════════════════════════════════════
        const state = window._cursosState;
        const activeCategory = state.categoryFilter || 'todos';

        const categories = [
            { id: 'todos', label: 'Todos los Cursos', icon: 'apps' },
            { id: 'ciberseguridad', label: 'Ciberseguridad', icon: 'security' },
            { id: 'gestion', label: 'Gestión & Decisión', icon: 'psychology' },
            { id: 'tecnologia', label: 'Tecnología & Cloud', icon: 'cloud' }
        ];

        container.innerHTML = `
            <div class="min-h-screen bg-background-dark text-white flex flex-col justify-between pb-32">
                
                <!-- HEADER -->
                <header class="p-4 border-b border-white/5 flex items-center justify-between sticky top-0 bg-background-dark/90 backdrop-blur-md z-30">
                    <div class="flex items-center gap-3">
                        <button onclick="router.navigateTo('#agenda')" class="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                            <span class="material-symbols-outlined">arrow_back</span>
                        </button>
                        <div>
                            <h1 class="text-base font-black text-white leading-tight">Repositorio Oficial Capacitar</h1>
                            <span class="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Nación & Líderes Globales</span>
                        </div>
                    </div>
                    <span class="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm">
                        <span class="material-symbols-outlined text-xs">verified</span> ACCESO HABILITADO
                    </span>
                </header>

                <main class="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-6">
                    
                    <!-- HERO BANNER -->
                    <div class="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/30 shadow-2xl space-y-4">
                        <div class="flex flex-wrap items-center justify-between gap-2">
                            <span class="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                                <span class="material-symbols-outlined text-xs">account_balance</span>
                                PLATAFORMA CAPACITAR · MINISTERIO DE ECONOMÍA DE LA NACIÓN
                            </span>
                            <span class="text-[11px] font-bold text-emerald-400">Enlaces Oficiales Verificados</span>
                        </div>

                        <div class="space-y-1.5">
                            <h2 class="text-xl sm:text-2xl font-black text-white leading-tight">
                                Catálogo de Cursos Oficiales Gratuitos
                            </h2>
                            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                                Todos los enlaces de preinscripción oficial están habilitados. Cursá de forma 100% gratuita y asincrónica en <strong>Accenture, Microsoft, AWS y Oracle</strong> para obtener tus certificados oficiales y sumarlos a tu legajo de antecedentes.
                            </p>
                        </div>
                    </div>

                    <!-- SEARCH & FILTERS CONTROLS -->
                    <div class="space-y-3 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
                        <div class="relative">
                            <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                            <input type="text" 
                                   id="cursos-search-input"
                                   value="${state.searchTerm || ''}"
                                   oninput="window._searchCursosInput(this.value)"
                                   placeholder="Buscar por título, temática o entidad (Accenture, Microsoft, AWS, Oracle)..." 
                                   class="w-full bg-black/50 border border-slate-700/60 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-all">
                        </div>

                        <div class="flex flex-wrap items-center gap-2 pt-1">
                            ${categories.map(cat => `
                                <button onclick="window._filterCursosCategory('${cat.id}')"
                                        class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${activeCategory === cat.id ? 'bg-primary text-white shadow-md shadow-primary/25' : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700/60'}">
                                    <span class="material-symbols-outlined text-sm">${cat.icon}</span>
                                    <span>${cat.label}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <!-- COURSES CARDS LIST -->
                    <div id="cursos-cards-grid" class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                        ${_renderCursosCardsListHTML()}
                    </div>

                    <!-- FOOTER -->
                    <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs text-slate-400">
                        <div class="flex items-center gap-2 text-slate-200 font-bold">
                            <span class="material-symbols-outlined text-base text-primary">verified_user</span>
                            <span>Acreditación Oficial</span>
                        </div>
                        <p class="leading-relaxed">
                            Al finalizar cada curso en su respectivo campus, descargá tu diploma oficial con código de validación digital y presentalo en División Personal D-1 para su inclusión en tu legajo de antecedentes.
                        </p>
                    </div>

                </main>

                ${typeof renderBottomNav === 'function' ? renderBottomNav('agenda') : ''}
            </div>
        `;
    };

})();
