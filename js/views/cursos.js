/**
 * Adicionales Santa Fe - Repositorio de Cursos Oficiales
 * Catálogo Abierto y Gratuito con Protección de Enlaces Directos de Preinscripción ($10.000 Suscripción Única)
 * Incluye Oferta Formativa Completa con Alianzas: Google, Santander, Microsoft, Accenture, Aionixs, AWS, Oracle y Convenio Oficial.
 */

(function() {
    'use strict';

    window._cursosState = window._cursosState || {
        topicFilter: 'todos',
        allianceFilter: 'todas',
        categoryFilter: 'todos',
        searchTerm: '',
        viewMode: 'table', // 'table' (igual a oferta-formativa) o 'cards'
        modalCourseId: null
    };

    /**
     * Verifica si el usuario actual cuenta con habilitación para acceder a los enlaces directos.
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
                    hierarchy: 'Repositorio Cursos Oficiales ($10.000)'
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
        const msg = `Hola! Quiero activar mi acceso a los enlaces del Repositorio de Cursos Oficiales ($10.000 - Suscripción Única) en Adicionales Santa Fe.\n\n👤 Oficial: ${userName}\n📧 Email registrado: ${userEmail}\n\nAdjunto comprobante de transferencia a SmartFlow.Digital.`;
        const waUrl = `https://wa.me/5493425162372?text=${encodeURIComponent(msg)}`;
        window.open(waUrl, '_blank');

        if (typeof showToast === 'function') {
            showToast("✅ Solicitud registrada. Al verificar tu comprobante por WhatsApp se habilitará tu acceso.");
        }
        window._closeCursosPaywallModal();
        renderCursos();
    };

    /**
     * Abre el modal del paywall cuando un usuario sin suscripción intenta ver un enlace protegido.
     */
    window._openCursosPaywallModal = function(courseId) {
        window._cursosState.modalCourseId = courseId || null;
        const modal = document.getElementById('cursos-paywall-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            // Actualizar info del curso si corresponde
            const courseInfoEl = document.getElementById('modal-course-target-info');
            if (courseInfoEl) {
                if (courseId) {
                    const c = (window.academyCourses || []).find(item => item.id === courseId || item.code === courseId);
                    if (c) {
                        courseInfoEl.innerHTML = `Para acceder al enlace directo de preinscripción de <strong>${c.code} - ${c.title}</strong> (${c.partner}) y a más de 135 capacitaciones con certificación oficial:`;
                        courseInfoEl.classList.remove('hidden');
                    } else {
                        courseInfoEl.classList.add('hidden');
                    }
                } else {
                    courseInfoEl.classList.add('hidden');
                }
            }
        }
    };

    /**
     * Cierra el modal del paywall.
     */
    window._closeCursosPaywallModal = function() {
        window._cursosState.modalCourseId = null;
        const modal = document.getElementById('cursos-paywall-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    };

    /**
     * Intenta abrir el enlace oficial del curso. Si no tiene acceso, abre el paywall.
     */
    window._openCourseOfficial = function(courseId) {
        if (!window._hasCursosAccess()) {
            window._openCursosPaywallModal(courseId);
            return;
        }

        const course = (window.academyCourses || []).find(c => c.id === courseId || c.code === courseId);
        if (!course) {
            if (window.showToast) window.showToast("Curso no encontrado.");
            return;
        }

        const formBase = 'https://www.argentina.gob.ar/economia/capacitar/formulario-de-registro-cursos-de-capacitar';
        let url = course.registrationUrl || course.catalogueUrl;
        if (!url || !url.includes('formulario-de-registro-cursos-de-capacitar')) {
            if (course.code && /^(C|RA|CAMP)[0-9]+/i.test(course.code)) {
                url = `${formBase}?id_curso=${course.code}`;
            } else {
                url = formBase;
            }
        }

        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            if (window.showToast) window.showToast("Enlace de preinscripción temporalmente no disponible.");
        }
    };

    window._filterCursosTopic = function(topic) {
        window._cursosState.topicFilter = topic;
        _updateCursosList();
    };

    window._filterCursosAlliance = function(alliance) {
        window._cursosState.allianceFilter = alliance;
        _updateCursosList();
    };

    window._filterCursosCategory = function(cat) {
        window._cursosState.topicFilter = cat;
        window._cursosState.categoryFilter = cat;
        _updateCursosList();
    };

    window._resetCursosFilters = function() {
        window._cursosState.topicFilter = 'todos';
        window._cursosState.allianceFilter = 'todas';
        window._cursosState.categoryFilter = 'todos';
        window._cursosState.searchTerm = '';
        renderCursos();
    };

    window._toggleCursosView = function(mode) {
        window._cursosState.viewMode = mode;
        _updateCursosList();
    };

    window._searchCursosInput = function(query) {
        window._cursosState.searchTerm = query;
        _updateCursosList();
    };

    function _updateCursosList() {
        const container = document.getElementById('cursos-list-container');
        if (container) {
            container.innerHTML = _renderCursosMainContentHTML();
        }
        const countEl = document.getElementById('cursos-result-count');
        if (countEl) {
            countEl.innerText = `${_getFilteredCourses().length} resultados`;
        }
    }

    function _getCoursesList() {
        if (window.academyCourses && Array.isArray(window.academyCourses) && window.academyCourses.length > 0) {
            return window.academyCourses;
        }
        return [];
    }

    function _getFilteredCourses() {
        const courses = _getCoursesList();
        const state = window._cursosState;
        const activeTopic = state.topicFilter || state.categoryFilter || 'todos';
        const activeAlliance = state.allianceFilter || 'todas';
        const searchTerm = (state.searchTerm || '').trim().toLowerCase();

        return courses.filter(c => {
            const matchTopic = activeTopic === 'todos' || 
                (c.topic && c.topic.toLowerCase() === activeTopic.toLowerCase()) ||
                (c.category && c.category.toLowerCase() === activeTopic.toLowerCase());
            
            const matchAlliance = activeAlliance === 'todas' || 
                (c.partner && c.partner.toLowerCase().includes(activeAlliance.toLowerCase()));

            const matchSearch = !searchTerm ||
                (c.code && c.code.toLowerCase().includes(searchTerm)) ||
                (c.title && c.title.toLowerCase().includes(searchTerm)) ||
                (c.provider && c.provider.toLowerCase().includes(searchTerm)) ||
                (c.partner && c.partner.toLowerCase().includes(searchTerm)) ||
                (c.topic && c.topic.toLowerCase().includes(searchTerm)) ||
                (c.description && c.description.toLowerCase().includes(searchTerm));

            return matchTopic && matchAlliance && matchSearch;
        });
    }

    /**
     * Renderiza la tabla estilo oferta-formativa de argentina.gob.ar
     */
    function _renderCursosTableHTML(filtered, hasAccess) {
        if (filtered.length === 0) {
            return `
                <div class="text-center py-12 px-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <span class="material-symbols-outlined text-4xl text-slate-500">search_off</span>
                    <p class="text-sm font-bold text-slate-300">No se encontraron capacitaciones con esos filtros</p>
                    <p class="text-xs text-slate-500">Probá con otra palabra clave o restablecé los filtros.</p>
                    <button onclick="window._resetCursosFilters()" class="mt-2 text-xs font-black text-primary hover:underline">
                        Ver todas las capacitaciones
                    </button>
                </div>
            `;
        }

        return `
            <div class="overflow-x-auto rounded-2xl border border-slate-800 bg-[#12161f]/90 shadow-2xl">
                <table class="w-full text-left text-xs border-collapse min-w-[620px]">
                    <thead>
                        <tr class="border-b border-slate-800 bg-slate-900/90 text-slate-400 uppercase text-[10px] font-black tracking-wider">
                            <th class="py-3.5 px-4 font-black">Nombre de la capacitación</th>
                            <th class="py-3.5 px-3 font-black whitespace-nowrap">Modalidad</th>
                            <th class="py-3.5 px-3 font-black">Tema</th>
                            <th class="py-3.5 px-3 font-black text-center">Enlace</th>
                            <th class="py-3.5 px-4 font-black">Alianza</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-800/70 cursos-no-copy select-none">
                        ${filtered.map((course, idx) => {
                            const isAlt = idx % 2 === 1;
                            const isHighHours = course.hours && course.hours >= 60;
                            const displayTitle = hasAccess ? course.title : (course.protectedTitle || course.title);
                            return `
                                <tr class="${isAlt ? 'bg-slate-900/30' : 'bg-transparent'} hover:bg-slate-800/40 transition-colors cursos-protected-row select-none ${hasAccess ? '' : 'cursor-pointer'}"
                                    ${hasAccess ? '' : `onclick="window._openCursosPaywallModal('${course.id}')"`}>
                                    
                                    <!-- NOMBRE -->
                                    <td class="py-3.5 px-4">
                                        <div class="space-y-1">
                                            <div class="flex items-center gap-1.5 flex-wrap">
                                                ${hasAccess ? (
                                                    course.code ? `<span class="text-blue-400 font-mono font-bold text-xs">${course.code}</span>` : ''
                                                ) : `
                                                    <span class="px-2 py-0.5 rounded bg-purple-900/60 border border-purple-500/40 text-purple-300 text-[10px] font-mono font-bold inline-flex items-center gap-1 select-none">
                                                        <span class="material-symbols-outlined text-[12px] text-purple-400">lock</span> Código Protegido
                                                    </span>
                                                `}
                                                ${isHighHours ? `
                                                    <span class="px-1.5 py-0.2 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 font-black uppercase text-[9px] inline-flex items-center gap-0.5 select-none">
                                                        <span class="material-symbols-outlined text-[10px]">military_tech</span> Máximo Puntaje
                                                    </span>
                                                ` : ''}
                                            </div>
                                            <span class="font-bold text-slate-100 text-xs sm:text-sm block leading-snug select-none cursos-protected-title">
                                                ${displayTitle}
                                            </span>
                                            <div class="flex items-center gap-2 text-[10px] text-slate-400 select-none">
                                                <span class="flex items-center gap-0.5">
                                                    <span class="material-symbols-outlined text-[11px] text-primary">schedule</span>
                                                    ${course.duration}
                                                </span>
                                                <span>•</span>
                                                <span class="text-emerald-400 font-semibold">100% Asincrónico</span>
                                            </div>
                                        </div>
                                    </td>

                                    <!-- MODALIDAD -->
                                    <td class="py-3.5 px-3 whitespace-nowrap">
                                        <span class="text-slate-300 font-medium text-[11px] flex items-center gap-1">
                                            <span class="material-symbols-outlined text-xs text-emerald-400">laptop_chromebook</span>
                                            ${course.modality || 'Virtual asincrónica'}
                                        </span>
                                    </td>

                                    <!-- TEMA -->
                                    <td class="py-3.5 px-3">
                                        <span class="px-2.5 py-0.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-300 text-[10px] font-semibold whitespace-nowrap">
                                            ${course.topic || 'General'}
                                        </span>
                                    </td>

                                    <!-- ENLACE -->
                                    <td class="py-3.5 px-3 text-center">
                                        ${hasAccess ? `
                                            <button onclick="window._openCourseOfficial('${course.id}')" 
                                                    title="Abrir Formulario Oficial de Preinscripción"
                                                    class="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-black text-[11px] shadow-md shadow-blue-600/30 active:scale-95 transition-all">
                                                <span>ver</span>
                                                <span class="material-symbols-outlined text-xs">open_in_new</span>
                                            </button>
                                        ` : `
                                            <button onclick="window._openCursosPaywallModal('${course.id}')" 
                                                    title="Enlace protegido - Habilitá tu suscripción de $10.000 para acceder"
                                                    class="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-full bg-[#181d27] hover:bg-purple-900/60 border border-purple-500/40 text-purple-300 hover:text-white font-black text-[11px] shadow-sm active:scale-95 transition-all group">
                                                <span>ver</span>
                                                <span class="material-symbols-outlined text-xs text-purple-400 group-hover:scale-110">lock</span>
                                            </button>
                                        `}
                                    </td>

                                    <!-- ALIANZA -->
                                    <td class="py-3.5 px-4 whitespace-nowrap">
                                        <span class="font-bold text-slate-200 text-xs flex items-center gap-1">
                                            <span class="material-symbols-outlined text-xs text-slate-400">handshake</span>
                                            ${course.partner}
                                        </span>
                                    </td>

                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
            <div class="flex items-center justify-between text-[11px] text-slate-400 px-2 pt-2">
                <span>Mostrando <strong>${filtered.length}</strong> capacitaciones</span>
                <span class="sm:hidden text-[10px] text-slate-400 flex items-center gap-1">
                    <span class="material-symbols-outlined text-xs">swipe</span> Deslizá para ver tabla completa
                </span>
            </div>
        `;
    }

    /**
     * Renderiza en modo tarjetas (Cards)
     */
    function _renderCursosCardsListHTML(filtered, hasAccess) {
        if (filtered.length === 0) {
            return `
                <div class="col-span-full text-center py-12 px-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <span class="material-symbols-outlined text-4xl text-slate-500">search_off</span>
                    <p class="text-sm font-bold text-slate-300">No se encontraron cursos con ese filtro</p>
                    <p class="text-xs text-slate-500">Probá con otra palabra clave o cambiá los filtros.</p>
                    <button onclick="window._resetCursosFilters()" class="mt-2 text-xs font-black text-primary hover:underline">
                        Ver todos los cursos
                    </button>
                </div>
            `;
        }

        return `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 cursos-no-copy select-none">
                ${filtered.map(course => {
                    const isHighHours = course.hours && course.hours >= 60;
                    const displayTitle = hasAccess ? course.title : (course.protectedTitle || course.title);
                    return `
                        <article class="bg-slate-900 border ${course.featured ? 'border-primary/50 shadow-xl shadow-primary/10' : 'border-slate-800 shadow-lg'} rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all space-y-4 cursos-protected-row select-none">
                            
                            <div class="space-y-3">
                                <!-- BADGES -->
                                <div class="flex flex-wrap items-center justify-between gap-2">
                                    <div class="flex flex-wrap items-center gap-1.5">
                                        <span class="px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                                            <span class="material-symbols-outlined text-xs">apartment</span>
                                            ${course.partner}
                                        </span>
                                        <span class="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700/80 text-slate-300 text-[10px] font-semibold">
                                            ${course.topic || 'General'}
                                        </span>
                                    </div>

                                    ${hasAccess ? (
                                        isHighHours ? `
                                            <span class="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                                                <span class="material-symbols-outlined text-xs">military_tech</span> ${course.hours} HS CÁTEDRA
                                            </span>
                                        ` : ''
                                    ) : `
                                        <span class="px-2 py-0.5 rounded bg-purple-900/60 border border-purple-500/40 text-purple-300 text-[9px] font-mono font-bold inline-flex items-center gap-1 select-none">
                                            <span class="material-symbols-outlined text-[11px] text-purple-400">lock</span> Código Protegido
                                        </span>
                                    `}
                                </div>

                                <!-- TITLE -->
                                <div>
                                    <h3 class="text-base font-black text-white leading-snug select-none cursos-protected-title">
                                        ${hasAccess && course.code ? `<span class="text-primary font-mono">${course.code}</span> · ` : ''}${displayTitle}
                                    </h3>
                                    <p class="text-xs font-medium text-slate-400 mt-0.5 flex items-center gap-1 select-none">
                                        <span class="material-symbols-outlined text-xs text-emerald-400">verified</span>
                                        ${course.partner} · Certificación Oficial
                                    </p>
                                </div>

                                <!-- DESCRIPTION -->
                                <p class="text-xs text-slate-300 leading-relaxed line-clamp-3">
                                    ${course.description}
                                </p>

                                <!-- METADATA PILLS -->
                                <div class="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-black/40 border border-slate-800 text-[10px] text-center">
                                    <div>
                                        <span class="block text-slate-400 font-bold uppercase text-[9px]">Duración</span>
                                        <span class="text-white font-semibold flex items-center justify-center gap-0.5 mt-0.5">
                                            <span class="material-symbols-outlined text-xs text-primary">schedule</span>
                                            ${course.duration}
                                        </span>
                                    </div>
                                    <div>
                                        <span class="block text-slate-400 font-bold uppercase text-[9px]">Modalidad</span>
                                        <span class="text-white font-semibold block mt-0.5">Asincrónica</span>
                                    </div>
                                    <div>
                                        <span class="block text-slate-400 font-bold uppercase text-[9px]">Costo</span>
                                        <span class="text-emerald-400 font-bold block mt-0.5">Gratis ($0)</span>
                                    </div>
                                </div>
                            </div>

                            <!-- ACTION BUTTON -->
                            <div class="pt-3 border-t border-slate-800">
                                ${hasAccess ? `
                                    <button onclick="window._openCourseOfficial('${course.id}')"
                                            class="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 active:scale-98 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all">
                                        <span class="material-symbols-outlined text-sm">how_to_reg</span>
                                        <span>Ir al Formulario de Inscripción Oficial</span>
                                        <span class="material-symbols-outlined text-xs">open_in_new</span>
                                    </button>
                                ` : `
                                    <button onclick="window._openCursosPaywallModal('${course.id}')"
                                            class="w-full py-2.5 px-4 rounded-xl bg-[#161a20] hover:bg-purple-950/80 border border-purple-500/40 text-purple-200 hover:text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all group">
                                        <span class="material-symbols-outlined text-sm text-purple-400 group-hover:scale-110">lock</span>
                                        <span>Desbloquear Enlace ($10.000)</span>
                                    </button>
                                `}
                            </div>

                        </article>
                    `;
                }).join('')}
            </div>
        `;
    }

    function _renderCursosMainContentHTML() {
        const filtered = _getFilteredCourses();
        const hasAccess = window._hasCursosAccess();
        const mode = window._cursosState.viewMode || 'table';

        if (mode === 'cards') {
            return _renderCursosCardsListHTML(filtered, hasAccess);
        }
        return _renderCursosTableHTML(filtered, hasAccess);
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

        const state = window._cursosState;
        const activeTopic = state.topicFilter || 'todos';
        const activeAlliance = state.allianceFilter || 'todas';
        const viewMode = state.viewMode || 'table';
        const filtered = _getFilteredCourses();

        container.innerHTML = `
            <div class="min-h-screen bg-background-dark text-white flex flex-col justify-between pb-32">
                
                <!-- HEADER -->
                <header class="p-4 border-b border-white/5 flex items-center justify-between sticky top-0 bg-background-dark/95 backdrop-blur-md z-30">
                    <div class="flex items-center gap-3">
                        <button onclick="router.navigateTo('#agenda')" class="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                            <span class="material-symbols-outlined">arrow_back</span>
                        </button>
                        <div>
                            <h1 class="text-base font-black text-white leading-tight">Repositorio de Cursos Oficiales</h1>
                            <span class="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1">
                                <span class="material-symbols-outlined text-[11px]">verified</span> Certificación Oficial · 100% Gratuitos
                            </span>
                        </div>
                    </div>
                    
                    ${hasAccess ? `
                        <span class="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                            <span class="material-symbols-outlined text-xs">verified</span> ACCESO TOTAL
                        </span>
                    ` : `
                        <button onclick="window._openCursosPaywallModal()" class="px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:brightness-110 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-lg shadow-purple-500/25 active:scale-95 transition-all">
                            <span class="material-symbols-outlined text-xs">lock</span> HABILITAR ENLACES ($10.000)
                        </button>
                    `}
                </header>

                <!-- MAIN WRAPPER -->
                <main class="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-5">
                    
                    <!-- BANNER INFORMATIVO / CONVERSIÓN -->
                    ${!hasAccess ? `
                        <div class="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-blue-950/60 border border-purple-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div class="flex items-center gap-3.5">
                                <div class="size-11 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/30">
                                    <span class="material-symbols-outlined text-2xl">school</span>
                                </div>
                                <div class="space-y-0.5">
                                    <div class="flex items-center gap-2">
                                        <span class="text-[9px] font-black uppercase tracking-widest bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">CATÁLOGO ABIERTO</span>
                                        <span class="text-[9px] font-black uppercase tracking-widest bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">🔥 $10.000 SUSCRIPCIÓN ÚNICA</span>
                                    </div>
                                    <h2 class="text-sm sm:text-base font-black text-white">
                                        Explorá todas las capacitaciones oficiales gratis
                                    </h2>
                                    <p class="text-xs text-slate-300 leading-relaxed">
                                        Consultá libremente toda la oferta. Para acceder a los <strong>enlaces directos de preinscripción</strong> de cada curso y sumar puntos al legajo policial, habilitá el repositorio con suscripción única.
                                    </p>
                                </div>
                            </div>
                            
                            <button onclick="window._openCursosPaywallModal()" class="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:brightness-110 active:scale-95 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-purple-600/30 shrink-0 transition-all">
                                <span class="material-symbols-outlined text-sm">key</span>
                                <span>Ver Beneficios y Desbloquear ($10.000)</span>
                            </button>
                        </div>
                    ` : `
                        <div class="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-xs flex items-center justify-between gap-3">
                            <div class="flex items-center gap-2.5">
                                <span class="material-symbols-outlined text-emerald-400 text-lg">check_circle</span>
                                <span><strong>Pase Habilitado:</strong> Tenés acceso libre a todos los formularios de inscripción oficial.</span>
                            </div>
                            <span class="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Activo</span>
                        </div>
                    `}

                    <!-- FILTROS ESTILO OFERTA-FORMATIVA (TEMA, ALIANZA, BUSCADOR) -->
                    <div class="space-y-3 p-4 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl">
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            
                            <!-- SELECT TEMA -->
                            <div>
                                <label class="block text-[11px] font-bold text-slate-400 mb-1">Tema</label>
                                <select onchange="window._filterCursosTopic(this.value)" 
                                        class="w-full px-3 py-2.5 rounded-xl bg-[#161a20] border border-slate-700 text-xs text-white focus:outline-none focus:border-primary cursor-pointer"
                                        style="color-scheme: dark; background-color: #161a20; color: #f8fafc;">
                                    <option value="todos" class="bg-[#161a20] text-slate-100" style="background-color: #161a20; color: #f8fafc;" ${activeTopic === 'todos' ? 'selected' : ''}>Todos los temas</option>
                                    <option value="Inteligencia artificial" class="bg-[#161a20] text-slate-100" style="background-color: #161a20; color: #f8fafc;" ${activeTopic === 'Inteligencia artificial' ? 'selected' : ''}>Inteligencia artificial</option>
                                    <option value="Ciberseguridad" class="bg-[#161a20] text-slate-100" style="background-color: #161a20; color: #f8fafc;" ${activeTopic === 'Ciberseguridad' ? 'selected' : ''}>Ciberseguridad</option>
                                    <option value="Ciencia de datos" class="bg-[#161a20] text-slate-100" style="background-color: #161a20; color: #f8fafc;" ${activeTopic === 'Ciencia de datos' ? 'selected' : ''}>Ciencia de datos</option>
                                    <option value="Habilidades blandas" class="bg-[#161a20] text-slate-100" style="background-color: #161a20; color: #f8fafc;" ${activeTopic === 'Habilidades blandas' ? 'selected' : ''}>Habilidades blandas</option>
                                    <option value="Computación en la nube" class="bg-[#161a20] text-slate-100" style="background-color: #161a20; color: #f8fafc;" ${activeTopic === 'Computación en la nube' ? 'selected' : ''}>Computación en la nube</option>
                                    <option value="Marketing e Investigación de mercado" class="bg-[#161a20] text-slate-100" style="background-color: #161a20; color: #f8fafc;" ${activeTopic === 'Marketing e Investigación de mercado' ? 'selected' : ''}>Marketing / Investigación</option>
                                    <option value="Finanzas" class="bg-[#161a20] text-slate-100" style="background-color: #161a20; color: #f8fafc;" ${activeTopic === 'Finanzas' ? 'selected' : ''}>Finanzas</option>
                                    <option value="Comercialización" class="bg-[#161a20] text-slate-100" style="background-color: #161a20; color: #f8fafc;" ${activeTopic === 'Comercialización' ? 'selected' : ''}>Comercialización</option>
                                    <option value="Diseño gráfico y multimedia" class="bg-[#161a20] text-slate-100" style="background-color: #161a20; color: #f8fafc;" ${activeTopic === 'Diseño gráfico y multimedia' ? 'selected' : ''}>Diseño gráfico / Multimedia</option>
                                    <option value="Tecnología y Sistemas" class="bg-[#161a20] text-slate-100" style="background-color: #161a20; color: #f8fafc;" ${activeTopic === 'Tecnología y Sistemas' ? 'selected' : ''}>Tecnología y Sistemas</option>
                                </select>
                            </div>

                            <!-- SELECT ALIANZA -->
                            <div>
                                <label class="block text-[11px] font-bold text-slate-400 mb-1">Alianza</label>
                                <select onchange="window._filterCursosAlliance(this.value)" 
                                        class="w-full px-3 py-2.5 rounded-xl bg-[#161a20] border border-slate-700 text-xs text-white focus:outline-none focus:border-primary cursor-pointer"
                                        style="color-scheme: dark; background-color: #161a20; color: #f8fafc;">
                                    <option value="todas" class="bg-[#161a20] text-slate-100" style="background-color: #161a20; color: #f8fafc;" ${activeAlliance === 'todas' ? 'selected' : ''}>Todas las alianzas</option>
                                    <option value="Google" class="bg-[#161a20] text-slate-100" style="background-color: #161a20; color: #f8fafc;" ${activeAlliance === 'Google' ? 'selected' : ''}>Google</option>
                                    <option value="Santander" class="bg-[#161a20] text-slate-100" style="background-color: #161a20; color: #f8fafc;" ${activeAlliance === 'Santander' ? 'selected' : ''}>Santander</option>
                                    <option value="Microsoft" class="bg-[#161a20] text-slate-100" style="background-color: #161a20; color: #f8fafc;" ${activeAlliance === 'Microsoft' ? 'selected' : ''}>Microsoft</option>
                                    <option value="Accenture" class="bg-[#161a20] text-slate-100" style="background-color: #161a20; color: #f8fafc;" ${activeAlliance === 'Accenture' ? 'selected' : ''}>Accenture</option>
                                    <option value="Aionixs" class="bg-[#161a20] text-slate-100" style="background-color: #161a20; color: #f8fafc;" ${activeAlliance === 'Aionixs' ? 'selected' : ''}>Aionixs</option>
                                    <option value="AWS" class="bg-[#161a20] text-slate-100" style="background-color: #161a20; color: #f8fafc;" ${activeAlliance === 'AWS' ? 'selected' : ''}>AWS</option>
                                    <option value="Oracle" class="bg-[#161a20] text-slate-100" style="background-color: #161a20; color: #f8fafc;" ${activeAlliance === 'Oracle' ? 'selected' : ''}>Oracle</option>
                                    <option value="Convenio Oficial" class="bg-[#161a20] text-slate-100" style="background-color: #161a20; color: #f8fafc;" ${activeAlliance === 'Convenio Oficial' ? 'selected' : ''}>Convenio Oficial (Alta Carga)</option>
                                </select>
                            </div>

                            <!-- BUSCADOR -->
                            <div class="sm:col-span-2 lg:col-span-1">
                                <label class="block text-[11px] font-bold text-slate-400 mb-1">Buscá por palabra clave</label>
                                <div class="relative">
                                    <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-base">search</span>
                                    <input type="text" 
                                           id="cursos-search-input"
                                           value="${state.searchTerm || ''}"
                                           oninput="window._searchCursosInput(this.value)"
                                           placeholder="Código (ej. C46002), nombre..." 
                                           class="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#161a20] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary" />
                                </div>
                            </div>
                        </div>

                        <!-- CONTADOR Y BOTÓN RESTABLECER -->
                        <div class="flex items-center justify-between pt-1 border-t border-slate-800/60 text-xs">
                            <div class="flex items-center gap-2">
                                <span id="cursos-result-count" class="font-bold text-slate-200">${filtered.length} resultados</span>
                                <button onclick="window._resetCursosFilters()" class="text-blue-400 hover:text-blue-300 font-semibold underline text-xs">
                                    Restablecer
                                </button>
                            </div>

                            <!-- TOGGLE VISTA (TABLA / FICHAS) -->
                            <div class="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-slate-800">
                                <button onclick="window._toggleCursosView('table')" 
                                        class="px-2.5 py-1 rounded-lg text-xs font-black flex items-center gap-1 transition-all ${viewMode === 'table' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-white'}">
                                    <span class="material-symbols-outlined text-xs">table_rows</span>
                                    <span>Tabla</span>
                                </button>
                                <button onclick="window._toggleCursosView('cards')" 
                                        class="px-2.5 py-1 rounded-lg text-xs font-black flex items-center gap-1 transition-all ${viewMode === 'cards' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-white'}">
                                    <span class="material-symbols-outlined text-xs">grid_view</span>
                                    <span>Fichas</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- LISTADO DINÁMICO (TABLA O FICHAS) -->
                    <div id="cursos-list-container">
                        ${_renderCursosMainContentHTML()}
                    </div>

                    <!-- ⚖️ CLÁUSULA LEGAL Y ALCANCE DEL SERVICIO -->
                    <div class="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 text-[11px] text-slate-400 space-y-2 shadow-inner">
                        <div class="flex items-center gap-2 text-slate-200 font-bold text-xs">
                            <span class="material-symbols-outlined text-amber-400 text-base">info</span>
                            <span>Alcance del Servicio y Términos del Repositorio</span>
                        </div>
                        <p class="leading-relaxed">
                            <strong>Adicionales Santa Fe</strong> actúa exclusivamente como facilitador e intermediario informativo, brindando un servicio de búsqueda, curaduría y enlaces directos a las opciones de capacitación.
                        </p>
                        <p class="leading-relaxed text-slate-400/90">
                            Las instancias de cursado, plataformas virtuales, contenidos pedagógicos, evaluaciones, plazos, soporte técnico y la posterior emisión y validación de certificados oficiales dependen única y exclusivamente de cada entidad o empresa que dicta el curso (Accenture, Google, Microsoft, Santander, Aionixs, AWS, Oracle y convenios oficiales). Adicionales Santa Fe no emite certificados propios ni se responsabiliza por las políticas, disponibilidad o modificaciones de las plataformas externas.
                        </p>
                    </div>

                </main>

                <!-- MODAL PAYWALL / TARJETA UIVERSE.IO ($10.000) -->
                <div id="cursos-paywall-modal" class="hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md items-center justify-center p-4 overflow-y-auto">
                    <div class="relative w-full max-w-md my-auto space-y-4">
                        
                        <!-- BOTÓN CERRAR -->
                        <div class="flex justify-end">
                            <button onclick="window._closeCursosPaywallModal()" class="size-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center shadow-lg transition-all">
                                <span class="material-symbols-outlined text-base">close</span>
                            </button>
                        </div>

                        <!-- MENSAJE DE CURSO OBJETIVO SI FUE CLICKEADO -->
                        <div id="modal-course-target-info" class="hidden p-3 rounded-2xl bg-purple-950/80 border border-purple-500/40 text-purple-200 text-xs text-center font-medium shadow-lg"></div>

                        <!-- 🎓 TARJETA DE PRESENTACIÓN UIVERSE.IO -->
                        <div class="card-container uiverse-pricing-card shadow-2xl">
                            <div class="title-card">
                                <p>Sumá Puntos en tu Legajo</p>
                                <span class="px-2 py-0.5 rounded-full bg-white/20 text-white text-[9px] font-black uppercase tracking-wider backdrop-blur-md">Oficial</span>
                            </div>
                            <div class="card-content">
                                <div class="title flex items-center justify-between">
                                    <span>REPOSITORIO DE CURSOS</span>
                                    <span class="text-[9px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
                                        <span class="material-symbols-outlined text-xs text-amber-400">verified</span> CERTIFICADOS
                                    </span>
                                </div>
                                <div class="plain">
                                    <span>$10.000</span>
                                    <span class="text-xs text-slate-400 font-medium">/ suscripción única</span>
                                </div>
                                <button type="button" onclick="window._submitCursosPayment()" class="card-btn">
                                    <span>HABILITAR ACCESO INMEDIATO</span>
                                    <span class="material-symbols-outlined text-sm">send</span>
                                </button>
                                <div class="card-separate">
                                    <div class="separate"></div>
                                    <span>BENEFICIOS CLAVE</span>
                                    <div class="separate"></div>
                                </div>
                                <div class="card-list-features">
                                    <div class="option">
                                        <span class="material-symbols-outlined text-sm text-purple-400 shrink-0">military_tech</span>
                                        <span><strong class="text-white">Mayor Carga Horaria (Puntos en Legajo):</strong> Cursos oficiales de hasta <strong class="text-amber-300">86 y 62 Hs cátedra</strong> (Rutas Ciberseguridad y Sistemas). A mayor carga horaria, mayor puntaje en ascensos policiales.</span>
                                    </div>
                                    <div class="option">
                                        <span class="material-symbols-outlined text-sm text-blue-400 shrink-0">schedule</span>
                                        <span><strong class="text-white">100% Asincrónico:</strong> Cursás en tus tiempos libres, descansos o guardias. Sin clases en vivo obligatorias.</span>
                                    </div>
                                    <div class="option">
                                        <span class="material-symbols-outlined text-sm text-indigo-400 shrink-0">devices</span>
                                        <span><strong class="text-white">100% Modalidad Virtual:</strong> Realizás el cursado y las evaluaciones desde cualquier celular, tablet o PC.</span>
                                    </div>
                                    <div class="option">
                                        <span class="material-symbols-outlined text-sm text-emerald-400 shrink-0">verified</span>
                                        <span><strong class="text-white">Certificación Oficial con Validación QR:</strong> Avalados con código de validación digital y convenios con líderes tecnológicos (Accenture, Google, Microsoft, Santander, AWS, Oracle).</span>
                                    </div>
                                    <div class="option">
                                        <span class="material-symbols-outlined text-sm text-amber-400 shrink-0">bolt</span>
                                        <span><strong class="text-white">Enlaces Directos Curados:</strong> Ahorrá tiempo. Accedé sin intermediarios al formulario de preinscripción directa de cada curso.</span>
                                    </div>
                                    <div class="option">
                                        <span class="material-symbols-outlined text-sm text-cyan-400 shrink-0">info</span>
                                        <span><strong class="text-white">Intermediario Facilitador:</strong> Facilitamos el repositorio y links directos. El cursado, evaluación y emisión de certificados dependen exclusivamente de cada plataforma que brinda la capacitación.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- DATOS DE TRANSFERENCIA Y APROBACIÓN ADMIN -->
                        <div class="p-5 rounded-3xl bg-slate-900 border border-amber-500/30 shadow-2xl space-y-4">
                            <div class="p-3.5 rounded-2xl bg-black/60 border border-slate-800 space-y-2 text-xs">
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

                            <!-- AVISO DE RESPONSABILIDAD -->
                            <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[10px] text-slate-400 space-y-1">
                                <span class="font-bold text-slate-300 flex items-center gap-1">
                                    <span class="material-symbols-outlined text-xs text-amber-400">gavel</span>
                                    Alcance del Servicio ($10.000):
                                </span>
                                <p class="leading-relaxed">
                                    La suscripción cubre la búsqueda, organización y facilitación de los enlaces directos. Cursado, plataforma y certificación corresponden a cada entidad externa emisora.
                                </p>
                            </div>

                            ${isPending ? `
                                <div class="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-2">
                                    <div class="flex items-center gap-1.5 font-bold text-amber-300">
                                        <span class="material-symbols-outlined text-base">hourglass_top</span>
                                        <span>Solicitud en Proceso</span>
                                    </div>
                                    <p class="text-[11px] text-amber-200/90 leading-relaxed">
                                        Tu comprobante fue registrado. El administrador verificará la transferencia y habilitará tu acceso a la brevedad.
                                    </p>
                                    <button onclick="window._submitCursosPayment()" class="w-full py-2 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 border border-amber-500/40 transition-all">
                                        <span class="material-symbols-outlined text-sm">chat</span>
                                        <span>Reenviar Comprobante por WhatsApp</span>
                                    </button>
                                </div>
                            ` : `
                                <button onclick="window._submitCursosPayment()" class="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:brightness-110 active:scale-98 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 transition-all">
                                    <span class="material-symbols-outlined text-base">send</span>
                                    <span>Enviar Comprobante por WhatsApp ($10.000)</span>
                                </button>
                            `}

                            <div class="text-center pt-1">
                                <button onclick="window._closeCursosPaywallModal()" class="text-xs text-slate-400 hover:text-white transition-colors">
                                    Continuar explorando el catálogo gratis
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                ${typeof renderBottomNav === 'function' ? renderBottomNav('agenda') : ''}
            </div>
        `;

        // Blindaje contra copiado no autorizado para usuarios sin suscripción
        const listEl = targetContainer.querySelector('#cursos-list-container');
        if (listEl) {
            listEl.addEventListener('copy', (e) => {
                if (!window._hasCursosAccess()) {
                    e.preventDefault();
                    if (typeof showToast === 'function') {
                        showToast("🔒 Código y enlace protegidos. Habilitá tu suscripción para desbloquearlos.");
                    }
                }
            });
            listEl.addEventListener('selectstart', (e) => {
                if (!window._hasCursosAccess()) {
                    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT')) return;
                    e.preventDefault();
                }
            });
            listEl.addEventListener('contextmenu', (e) => {
                if (!window._hasCursosAccess()) {
                    e.preventDefault();
                }
            });
        }
    };

})();
