/**
 * Adicionales Santa Fe - Asistente Views
 */

function renderAsistenteHub(container) {
    if (!container) container = document.getElementById('app');

    // Stats for Donation Section
    const now = new Date();
    const cm = now.getMonth();
    const cy = now.getFullYear();
    const currentMonthServices = (store.services || []).filter(s => {
        if (!s.date) return false;
        const d = new Date(s.date + 'T00:00:00');
        return d.getMonth() === cm && d.getFullYear() === cy;
    });
    const currentMonthCount = currentMonthServices.length;
    const currentMonthEarnings = currentMonthServices.reduce((sum, s) => sum + (parseFloat(s.total) || 0), 0);

    const tools = [
        { id: 'fixture', title: 'Fixture Mundial 2026', desc: 'Consultá partidos, horarios y registrá tus pronósticos.', icon: 'sports_soccer', color: 'from-[#74ACDF] to-blue-500', route: '#asistente/fixture', badge: '🏆' },
        { id: 'centinela', title: 'Centinela AI', desc: 'Asistente legal entrenado con la Ley 12.521.', icon: 'smart_toy', color: 'from-primary to-blue-500', route: '#asistente/centinela', badge: 'Nuevo' },
        { id: 'vademecum', title: 'Vademécum Contravencional', desc: 'Guía de actuación y consulta del Código Penal y Convivencia.', icon: 'gavel', color: 'from-amber-500 to-amber-600', route: '#asistente/vademecum', badge: 'Nuevo' },
        { id: 'dictado', title: 'Dictado de Novedades', desc: 'Dictá por voz y estructurá actas y libros de guardia.', icon: 'mic', color: 'from-blue-500 to-cyan-500', route: '#asistente/dictado', badge: 'Nuevo' },
        { id: 'actas', title: 'Actas Policiales', desc: 'Generá actas formales: allanamiento, custodia, procedimiento y más.', icon: 'description', color: 'from-red-500 to-rose-600', route: '#asistente/actas', badge: 'PRO' },
        { id: 'intervenciones', title: 'Intervenciones en Campo', desc: 'Registro en tiempo real con GPS y partes para WhatsApp.', icon: 'add_alert', color: 'from-blue-500 to-indigo-600', route: '#asistente/intervenciones', badge: 'PRO' },
        { id: 'procedimiento', title: 'Registro de Procedimiento', desc: 'Wizard guiado: GPS, fotos y PDF estructurado.', icon: 'local_police', color: 'from-emerald-500 to-green-600', route: '#asistente/procedimiento', badge: 'PRO' },
        { id: 'archivos', title: 'Archivos Digitales', desc: 'Historial personal de actas y procedimientos guardados.', icon: 'folder_open', color: 'from-amber-500 to-orange-500', route: '#asistente/archivos', badge: 'PRO' },
        { id: 'iapos', title: 'Cartilla IAPOS', desc: 'Buscador oficial de médicos, clínicas y farmacias.', icon: 'medical_services', color: 'from-cyan-500 to-blue-500', route: '#asistente/iapos', badge: 'PRO' },
        { id: 'guia', title: 'Guía de Recursos', desc: 'Beneficios TAP y Estampillas Médicas.', icon: 'library_books', color: 'from-indigo-500 to-blue-600', route: '#info', badge: 'Pro' },
        { id: 'partes', title: 'Partes Inteligentes', desc: 'Convierte notas en informes profesionales.', icon: 'edit_note', color: 'from-purple-500 to-indigo-500', route: '#asistente/partes' },
        { id: 'crono', title: 'Crono-Calendario', desc: 'Gestioná tus tercios y ciclos de guardia.', icon: 'calendar_month', color: 'from-emerald-500 to-teal-500', route: '#asistente/crono' },
        { id: 'directorio', title: 'Directorio Policial', desc: 'Números de emergencia interna.', icon: 'contact_phone', color: 'from-amber-500 to-orange-500', route: '#asistente/directorio' },
        { id: 'checklist', title: 'Checklist de Guardia', desc: 'Verificación de equipo esencial.', icon: 'fact_check', color: 'from-rose-500 to-pink-500', route: '#asistente/checklist' }
    ];

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center justify-between">
            <h1 class="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Asistente Virtual</h1>
            <div class="flex items-center gap-2">
                ${store.user && store.user.role === 'admin' ? `
                    <button onclick="router.navigateTo('#admin')" class="size-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                        <span class="material-symbols-outlined text-xl">admin_panel_settings</span>
                    </button>
                ` : ''}
                <div class="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-lg shadow-primary/10">
                    ${renderLogo('small')}
                </div>
            </div>
        </header>

        <main class="p-6 space-y-6 pb-32 max-w-md mx-auto animate-fade-in">
            <div class="space-y-2">
                <h2 class="text-sm font-bold text-slate-500 uppercase tracking-widest px-1">Inteligencia y Utilidades</h2>
                <p class="text-xs text-slate-400 px-1">Herramientas diseñadas exclusivamente para la Policía de Santa Fe.</p>
            </div>

            <div class="grid gap-4">
                ${tools.map((tool, i) => `
                    <div onclick="router.navigateTo('${tool.route}')" 
                        class="group relative overflow-hidden glass-card p-5 rounded-3xl border border-white/5 hover:border-primary/30 transition-all active:scale-[0.98] cursor-pointer"
                        style="animation-delay: ${i * 100}ms">
                        
                        <div class="absolute -right-4 -top-4 size-24 bg-gradient-to-br ${tool.color} opacity-5 blur-2xl group-hover:opacity-20 transition-opacity"></div>
                        
                        <div class="flex gap-4 items-start relative z-10">
                            <div class="size-12 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-slate-900 dark:text-white shadow-lg transition-transform group-hover:scale-110 relative">
                                <span class="material-symbols-outlined text-2xl">${tool.icon}</span>
                                ${tool.badge ? `<span class="absolute -top-1 -right-1 flex h-3 w-3"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span><span class="relative inline-flex rounded-full h-3 w-3 bg-amber-500 border border-background-dark"></span></span>` : ''}
                            </div>
                            <div class="flex-1 space-y-1">
                                <h3 class="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">${tool.title}</h3>
                                <p class="text-xs text-slate-400 leading-relaxed">${tool.desc}</p>
                            </div>
                            <span class="material-symbols-outlined text-slate-700 self-center">chevron_right</span>
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- Feedback Section -->
            <div class="mt-8 p-6 glass-card rounded-3xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                <div class="flex items-center gap-3 mb-4">
                    <div class="size-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500">
                        <span class="material-symbols-outlined text-sm">edit_square</span>
                    </div>
                    <h3 class="font-bold text-slate-900 dark:text-white text-sm">Buzón de Sugerencias</h3>
                </div>
                <p class="text-[11px] text-slate-400 mb-4">¿Te gustaría que Centinela sepa algo más? Tu opinión nos ayuda a mejorar el servicio.</p>
                <form id="feedback-form" class="space-y-3">
                    <div class="flex gap-2 justify-center mb-1">
                        ${[1, 2, 3, 4, 5].map(n => `
                            <button type="button" onclick="window.setFeedbackRating(${n})" class="feedback-star size-8 text-slate-600 transition-colors" data-value="${n}">
                                <span class="material-symbols-outlined">star</span>
                            </button>
                        `).join('')}
                    </div>
                    <input type="hidden" id="feedback-rating" value="5">
                    <textarea id="feedback-comment" placeholder="Escribe tu mensaje aquí..." 
                        class="w-full bg-white/5 border border-white/10 rounded-2xl p-3 text-xs text-slate-900 dark:text-white focus:ring-1 focus:ring-primary outline-none transition-all h-20 resize-none"></textarea>
                    <button type="submit" class="w-full py-3 rounded-2xl bg-primary text-white text-xs font-bold transition-all active:scale-95 shadow-lg shadow-primary/20">
                        Enviar Reseña
                    </button>
                </form>
            </div>

            <!-- Donation Section -->
            <div class="mt-6 p-6 rounded-3xl bg-gradient-to-br from-[#74ACDF]/20 to-[#F6B426]/10 border border-[#74ACDF]/30 shadow-xl shadow-[#74ACDF]/5 animate-fade-in relative overflow-hidden">
                <!-- Football decoration -->
                <div class="absolute -right-4 -bottom-4 size-20 bg-slate-900/10 dark:bg-white/5 rounded-full flex items-center justify-center rotate-12 opacity-40">
                    <span class="text-5xl">⚽</span>
                </div>
                <div class="flex items-center gap-4 mb-4">
                    <div class="size-12 rounded-2xl bg-gradient-to-br from-[#74ACDF] to-[#F6B426] flex items-center justify-center text-slate-900 dark:text-white shadow-lg shadow-[#74ACDF]/20">
                        <span class="material-symbols-outlined font-black">emoji_events</span>
                    </div>
                    <div>
                        <h3 class="font-extrabold text-slate-900 dark:text-white text-sm tracking-tight flex items-center gap-1">
                            Apoyá la App <span class="text-xs">🇦🇷</span>
                        </h3>
                        <p class="text-[9px] text-[#5599e0] font-black uppercase tracking-widest">Mundial 2026 · Colaboración</p>
                    </div>
                </div>
                
                <!-- Dynamic Stats Box -->
                <div class="mb-4 p-3 rounded-2xl bg-[#74ACDF]/10 dark:bg-white/5 border border-[#74ACDF]/20 text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
                    📊 **Tu actividad este mes:**
                    <div class="grid grid-cols-2 gap-2 mt-1.5 pt-1.5 border-t border-[#74ACDF]/20">
                        <div>
                            <span class="text-[9px] uppercase font-bold text-slate-400 block">Servicios</span>
                            <span class="text-sm font-black text-slate-900 dark:text-white">${currentMonthCount} cargados</span>
                        </div>
                        <div>
                            <span class="text-[9px] uppercase font-bold text-slate-400 block">Ganancia Est.</span>
                            <span class="text-sm font-black text-[#F6B426]">$${currentMonthEarnings.toLocaleString('es-AR')}</span>
                        </div>
                    </div>
                </div>
                
                <p class="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed mb-5 relative z-10">
                    Para que podamos mantener la base de datos en tiempo real, los servidores y el soporte constante sin llenarte de publicidad invasiva, tu colaboración al CVU de Mercado Pago es súper importante. ¡Unite al equipo de soporte!
                </p>
                <button onclick="window.showDonationModal()" class="w-full py-3.5 rounded-2xl bg-primary text-white font-bold text-xs shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-95 transition-all relative z-10">
                    <span class="material-symbols-outlined text-sm">favorite</span>
                    Contribuir al Crecimiento
                </button>
            </div>

        ${renderBottomNav('asistente')}
    `;

    // Local Handlers
    window.setFeedbackRating = (rating) => {
        document.getElementById('feedback-rating').value = rating;
        document.querySelectorAll('.feedback-star').forEach((btn, i) => {
            btn.classList.toggle('text-amber-400', i < rating);
            btn.classList.toggle('text-slate-600', i >= rating);
        });
    };
    window.setFeedbackRating(5); // Default

    const fForm = document.getElementById('feedback-form');
    fForm.onsubmit = async (e) => {
        e.preventDefault();
        const rating = document.getElementById('feedback-rating').value;
        const comment = document.getElementById('feedback-comment').value.trim();

        if (!comment) {
            showToast("Por favor, escribe un comentario");
            return;
        }

        const btn = fForm.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.innerText = "Enviando...";

        const success = await DB.addReview(rating, comment);
        if (success) {
            fForm.reset();
            window.setFeedbackRating(5);
            showToast("¡Gracias por tu feedback! ⭐");
        } else {
            showToast("Error al enviar la reseña");
        }
        btn.disabled = false;
        btn.innerText = "Enviar Reseña";
    };
}

function showAnnouncementModal() {
    const hasSeen = localStorage.getItem('seen_v2_1_1_announcement');
    if (hasSeen) return;

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-background-dark/95 backdrop-blur-md animate-fade-in';
    modal.innerHTML = `
        <div class="max-w-xs w-full glass-card p-6 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-6 text-center animate-scale-up">
            <div class="size-20 bg-gradient-to-br from-primary to-blue-600 rounded-3xl mx-auto flex items-center justify-center text-white shadow-xl shadow-primary/20">
                <span class="material-symbols-outlined text-4xl">rocket_launch</span>
            </div>
            
            <div class="space-y-2">
                <h2 class="text-xl font-black text-slate-900 dark:text-white">¡App Actualizada!</h2>
                <p class="text-xs text-slate-400 leading-relaxed">Bienvenido a la versión **Final (PRO)** con todas las funciones policiales habilitadas.</p>
            </div>

            <div class="space-y-3 text-left">
                <div class="flex gap-3 items-center p-3 rounded-2xl bg-white/5 border border-white/5">
                    <span class="material-symbols-outlined text-amber-500">smart_toy</span>
                    <p class="text-[11px] text-slate-800 dark:text-slate-200">**Centinela AI v2**: Base legal expandida y respuestas inteligentes para oficiales.</p>
                </div>
                <div class="flex gap-3 items-center p-3 rounded-2xl bg-white/5 border border-white/5">
                    <span class="material-symbols-outlined text-emerald-500">volunteer_activism</span>
                    <p class="text-[11px] text-slate-800 dark:text-slate-200">**Apoyo al Proyecto**: Nueva sección en Perfil para colaborar con el crecimiento.</p>
                </div>
                <div class="flex gap-3 items-center p-3 rounded-2xl bg-white/5 border border-white/5">
                    <span class="material-symbols-outlined text-purple-500">rate_review</span>
                    <p class="text-[11px] text-slate-800 dark:text-slate-200">**Buzón de Ideas**: Envíanos tus sugerencias directamente desde el Asistente.</p>
                </div>
            </div>

            <button id="close-announcement" class="w-full py-4 rounded-2xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/25 active:scale-95 transition-all">
                ¡Empezar a usar!
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('close-announcement').onclick = () => {
        localStorage.setItem('seen_v2_1_1_announcement', 'true');
        modal.classList.add('animate-fade-out');
        setTimeout(() => modal.remove(), 300);
    };
}

function renderDirectorioPolicial(container) {
    const rawContacts = window.policeDirectory || [];

    // Get unique departments for the filter
    const departments = [...new Set(rawContacts.map(c => c.dept))].sort();

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center gap-4">
            <button onclick="router.navigateTo('#asistente')" class="p-2 -ml-2 text-slate-400 hover:text-slate-900 dark:text-white transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 class="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Directorio Policial</h1>
        </header>

        <main class="p-6 space-y-4 pb-32 max-w-md mx-auto animate-fade-in">
            <!-- Search & Filter -->
            <div class="space-y-3">
                <div class="relative group">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-500 group-focus-within:text-primary transition-colors">search</span>
                    <input type="text" id="directory-search" placeholder="Buscar dependencia o número..." 
                        class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs text-slate-900 dark:text-white focus:ring-1 focus:ring-primary outline-none transition-all shadow-inner"
                        oninput="window.runDirectoryFilter()">
                </div>
                
                <select id="dept-filter" onchange="window.runDirectoryFilter()" 
                    class="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-xs text-slate-400 focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer">
                    <option value="all">Todas las Regiones / Departamentos</option>
                    <option value="essential">⭐ Números Esenciales / Emergencias</option>
                    ${departments.map(d => `<option value="${d}">${d}</option>`).join('')}
                </select>
            </div>

            <div id="contacts-list" class="space-y-6">
                <!-- Contacts will be rendered here -->
            </div>

            ${renderAdBanner()}
        </main>
        ${renderBottomNav('asistente')}
    `;

    initAds();


    window.runDirectoryFilter = () => {
        const query = document.getElementById('directory-search').value.toLowerCase().trim();
        const deptFilter = document.getElementById('dept-filter').value;
        const listContainer = document.getElementById('contacts-list');

        let filtered = rawContacts.filter(c =>
            c.name.toLowerCase().includes(query) ||
            c.dept.toLowerCase().includes(query) ||
            c.phones.some(p => p.includes(query))
        );

        if (deptFilter === 'essential') {
            filtered = filtered.filter(c => c.is_essential);
        } else if (deptFilter !== 'all') {
            filtered = filtered.filter(c => c.dept === deptFilter);
        }

        if (filtered.length === 0) {
            listContainer.innerHTML = renderEmptyState({
                icon: 'search_off',
                title: 'No hay resultados',
                message: 'Probá con otra búsqueda o región.'
            });
            return;
        }

        // Grouping Logic
        const sections = {};
        if (query === '' && deptFilter === 'all') {
            // Default view: Essentials first, then by dept
            sections['⭐ Números Esenciales'] = filtered.filter(c => c.is_essential);
            const others = filtered.filter(c => !c.is_essential);
            others.forEach(c => {
                if (!sections[c.dept]) sections[c.dept] = [];
                sections[c.dept].push(c);
            });
        } else {
            // Search result view: single list or grouped by dept if few results
            filtered.forEach(c => {
                const head = c.is_essential ? '⭐ Coincidencias Críticas' : c.dept;
                if (!sections[head]) sections[head] = [];
                sections[head].push(c);
            });
        }

        listContainer.innerHTML = Object.keys(sections).map(title => {
            if (sections[title].length === 0) return '';
            return `
                <div class="space-y-3">
                    <h3 class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
                        <span class="h-px flex-1 bg-white/5"></span>
                        ${title}
                        <span class="h-px flex-1 bg-white/5"></span>
                    </h3>
                    ${sections[title].map(c => `
                        <div class="glass-card p-3 rounded-2xl border border-white/5 flex items-center justify-between group animate-fade-in ${c.is_essential ? 'bg-primary/5 border-primary/10' : ''}">
                            <div class="flex items-center gap-3 overflow-hidden">
                                <div class="size-9 rounded-xl ${c.is_essential ? 'bg-primary/20 text-primary' : 'bg-slate-800 text-slate-500'} flex items-center justify-center transition-colors shrink-0">
                                    <span class="material-symbols-outlined text-lg">${c.icon || 'shield'}</span>
                                </div>
                                <div class="flex-1 min-w-0 pr-2">
                                    <h3 class="font-bold text-slate-900 dark:text-white text-[12px] leading-tight line-clamp-1">${c.name}</h3>
                                    <div class="flex flex-wrap gap-x-2 gap-y-0.5 mt-0.5">
                                        ${c.phones.map(p => `<span class="text-[10px] text-slate-500 font-mono">${p}</span>`).join('')}
                                    </div>
                                </div>
                            </div>
                            <div class="flex gap-1.5 shrink-0">
                                ${c.phones.map(p => `
                                    <a href="tel:${p.replace(/[^0-9]/g, '')}" class="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm active:scale-90">
                                        <span class="material-symbols-outlined text-base">call</span>
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }).join('');
    };

    // Initial load
    window.runDirectoryFilter();
}

function renderChecklistGuardia(container) {
    const items = [
        { id: 'arma', label: 'Arma Reglamentaria y Munición', icon: 'shield' },
        { id: 'cargador', label: 'Cargadores Adicionales', icon: 'vibration' },
        { id: 'esposas', label: 'Esposas y Llave', icon: 'link' },
        { id: 'linterna', label: 'Linterna con carga', icon: 'flashlight_on' },
        { id: 'libreta', label: 'Libreta de Anotaciones y Birome', icon: 'edit' },
        { id: 'celular', label: 'Celular con carga y datos', icon: 'smartphone' },
        { id: 'doc', label: 'Credencial y Documentación', icon: 'badge' },
    ];

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center gap-4">
            <button onclick="router.navigateTo('#asistente')" class="p-2 -ml-2 text-slate-400 hover:text-slate-900 dark:text-white transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 class="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Checklist de Guardia</h1>
        </header>

        <main class="p-6 space-y-6 pb-32 max-w-md mx-auto animate-fade-in">
            <div class="flex items-center justify-between px-1">
                <div>
                    <h2 class="text-xs font-bold text-slate-500 uppercase tracking-widest">Equipo de Servicio</h2>
                    <p class="text-[10px] text-slate-500 mt-1">Verificá tu equipo antes de tomar el servicio.</p>
                </div>
                <button onclick="resetChecklist()" class="text-[10px] font-bold text-primary px-3 py-1.5 bg-primary/5 rounded-full border border-primary/20">Reiniciar</button>
            </div>

            <div class="space-y-3">
                ${items.map(item => `
                    <label class="glass-card p-4 rounded-2xl border border-white/5 flex items-center gap-4 cursor-pointer active:bg-white/5 transition-colors">
                        <input type="checkbox" class="size-6 rounded-lg bg-slate-800 border-white/10 text-primary focus:ring-primary/20 accent-primary" onchange="saveCheckState('${item.id}', this.checked)">
                        <span class="material-symbols-outlined text-slate-600">${item.icon}</span>
                        <span class="flex-1 text-sm font-medium text-slate-700 dark:text-slate-300">${item.label}</span>
                    </label>
                `).join('')}
            </div>

            ${renderAdBanner()}
        </main>
        ${renderBottomNav('asistente')}
    `;

    initAds();


    window.saveCheckState = (id, checked) => {
        const state = JSON.parse(localStorage.getItem('police_checklist') || '{}');
        state[id] = checked;
        localStorage.setItem('police_checklist', JSON.stringify(state));
    };

    window.resetChecklist = () => {
        localStorage.removeItem('police_checklist');
        renderChecklistGuardia(container);
    };

    const savedState = JSON.parse(localStorage.getItem('police_checklist') || '{}');
    container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        const id = cb.getAttribute('onchange').match(/'([^']+)'/)[1];
        if (savedState[id]) cb.checked = true;
    });
}

function renderCronoCalendario(container) {
    const cycles = [
        { id: '24x48', name: 'Ciclo 24x48', desc: 'Trabaja 24h, descansa 48h' },
        { id: '12x36', name: 'Ciclo 12x36', desc: 'Trabaja 12h, descansa 36h' },
        { id: 'tercios', name: 'Tercios (8h)', desc: 'Sistema tradicional de 3 turnos' },
    ];

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center gap-4">
            <button onclick="router.navigateTo('#asistente')" class="p-2 -ml-2 text-slate-400 hover:text-slate-900 dark:text-white transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 class="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Crono-Calendario</h1>
        </header>

        <main class="p-6 space-y-8 pb-32 max-w-md mx-auto animate-fade-in">
            <section class="space-y-4">
                <div class="px-1">
                    <h2 class="text-sm font-bold text-slate-500 uppercase tracking-widest">Configurar Ciclo</h2>
                    <p class="text-xs text-slate-500 mt-1">Elegí tu régimen de trabajo para proyectar tus guardias.</p>
                </div>

                <div class="grid gap-3">
                    ${cycles.map(c => `
                        <div onclick="setDutyCycle('${c.id}')" class="glass-card p-4 rounded-2xl border border-white/5 hover:border-primary/30 transition-all cursor-pointer group">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">${c.name}</h3>
                                    <p class="text-[11px] text-slate-500">${c.desc}</p>
                                </div>
                                <span class="material-symbols-outlined text-slate-700">radio_button_unchecked</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>

            <section id="calendar-projection" class="space-y-4 hidden">
                <div class="px-1 border-t border-white/5 pt-6 flex items-center justify-between">
                    <h2 class="text-sm font-bold text-slate-500 uppercase tracking-widest text-primary">Próximas Guardias</h2>
                    <button onclick="router.navigateTo('#asistente/crono')" class="text-[10px] text-slate-500 underline">Cambiar fecha inicio</button>
                </div>
                <div id="shifts-list" class="space-y-2">
                    <!-- Dynamic Shifts -->
                </div>
            </section>

            ${renderAdBanner()}
        </main>
        ${renderBottomNav('asistente')}
    `;

    initAds();


    window.setDutyCycle = (type) => {
        const startDate = prompt("Ingresá la fecha de tu próxima guardia (YYYY-MM-DD):", store.getLocalDateString());
        if (!startDate) return;

        showToast(`Ciclo ${type} activado`);
        const projection = document.getElementById('calendar-projection');
        projection.classList.remove('hidden');

        const list = document.getElementById('shifts-list');
        const start = new Date(startDate + 'T00:00:00');
        let html = '';

        for (let i = 0; i < 10; i++) {
            const shiftDate = new Date(start);
            if (type === '24x48') shiftDate.setDate(start.getDate() + (i * 3));
            else if (type === '12x36') shiftDate.setDate(start.getDate() + (i * 2));
            else shiftDate.setDate(start.getDate() + i);

            html += `
                <div class="glass-card p-3 rounded-xl border border-white/5 flex items-center gap-4 bg-primary/5">
                    <div class="size-10 rounded-lg bg-primary/20 flex flex-col items-center justify-center text-primary">
                        <span class="text-[10px] font-bold uppercase">${shiftDate.toLocaleDateString('es-ES', { weekday: 'short' })}</span>
                        <span class="text-sm font-black">${shiftDate.getDate()}</span>
                    </div>
                    <div>
                        <p class="text-xs font-bold text-slate-900 dark:text-white">Servicio Activo</p>
                        <p class="text-[10px] text-slate-500 uppercase">${shiftDate.toLocaleDateString('es-ES', { month: 'long' })}</p>
                    </div>
                </div>
            `;
        }
        list.innerHTML = html;
    };
}

function renderCentinela(container) {
    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 px-4 h-16 flex items-center gap-4">
            <button onclick="router.navigateTo('#asistente')" class="p-2 -ml-2 text-slate-400 hover:text-slate-900 dark:text-white transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <div class="flex flex-col">
                <h1 class="text-sm font-black text-slate-900 dark:text-white leading-none">Centinela AI v10</h1>
                <span class="text-[10px] text-primary flex items-center gap-1">
                    <span class="relative flex h-2 w-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Base Legal & ISeP 2025/26 Activa
                </span>
            </div>
        </header>

        <main class="flex flex-col h-[calc(100vh-4rem)] bg-background-light dark:bg-background-dark overflow-hidden">
            <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-4 pb-10">
                <div class="flex gap-3 max-w-[85%]">
                    <div class="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                        <span class="material-symbols-outlined text-sm">smart_toy</span>
                    </div>
                    <div class="bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 p-3 rounded-2xl rounded-tl-none shadow-sm">
                        <p class="text-xs text-slate-900 dark:text-slate-200 leading-relaxed">
                            Hola, soy Centinela. Estoy entrenado con la **Ley 12.521**, **Decreto 461**, **Reforma Previsional (Ley 14.283)**, las escalas salariales de **Febrero 2026 (Decreto 142/26)**, el **Código Procesal Penal (CPP) de Santa Fe**, el **Código Penal Argentino (CP)** y los últimos listados y manuales del **ISeP 2025/2026**.
                            <br><br>
                            Preguntame por normas, reglamentos, o las **últimas noticias y novedades del 2026**. ¿En qué te ayudo hoy?
                        </p>
                    </div>
                </div>
            </div>

            <div class="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-white/5 pb-10">
                <form id="centinela-form" class="relative flex items-center gap-2">
                    <input type="text" id="chat-input" placeholder="Sueldos, jubilación, ascensos..." 
                        class="flex-1 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:ring-1 focus:ring-primary outline-none transition-all pr-12">
                    <button type="submit" class="absolute right-1 size-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 active:scale-90 transition-all">
                        <span class="material-symbols-outlined">send</span>
                    </button>
                </form>
                <p class="text-[9px] text-center text-slate-500 mt-3 uppercase tracking-tighter">La IA puede cometer errores. Consultá siempre con tu superior.</p>
            </div>
        </main>
    `;

    const form = document.getElementById('centinela-form');
    const input = document.getElementById('chat-input');
    const chat = document.getElementById('chat-messages');

    const knowledgeBase = [
        {
            category: 'licencias',
            keywords: ['licencia', 'vacaciones', 'paternidad', 'maternidad', 'enfermedad', 'familiar', 'fallecimiento', 'estudio', 'licencias', 'ausentismo', 'salud laboral', 'medico', 'carpeta', '4157', 'decreto 4157'],
            responses: [
                { match: ['salud laboral', 'ausentismo', 'nuevo sistema', 'seguimiento'], text: "Desde enero 2026 rige el **Sistema Integrado de Protección de la Salud Laboral**. Busca reducir el ausentismo mediante auditorías médicas más estrictas y un seguimiento digitalizado del personal con carpeta médica." },
                { match: ['paternidad', 'nacimiento', 'hijo'], text: "El **Decreto 4157/15** otorga **15 días corridos** por paternidad. Debes presentar el certificado de nacimiento en tu unidad dentro de las 72hs." },
                { match: ['maternidad', 'embarazo', 'lactancia'], text: "La licencia por maternidad es de **90 días corridos**. También contempla períodos de lactancia tras el reintegro (permiso para amamantar durante el servicio)." },
                { match: ['vacaciones', 'anual', 'ordinaria', 'LAO'], text: "La **Licencia Anual Ordinaria** (Decreto 4157/15) se otorga por año vencido: 19 días (hasta 5 años), 25 días (hasta 15 años) o 35 días (más de 15 años). Son días hábiles." },
                { match: ['fallecimiento', 'duelo', 'muerte'], text: "Familiares directos (padres, hijos, cónyuge): **5 días corridos**. Otros familiares: **2 días**." },
                { match: ['estudio', 'examen'], text: "Te corresponden hasta **28 días anuales** para rendir exámenes de enseñanza media, terciaria o universitaria, con un máximo de 5 días por examen." }
            ],
            default: "El régimen de licencias (Decreto 4157/15) y el nuevo Sistema de Salud Laboral 2026 regulan tus descansos y justificaciones médicas."
        },
        {
            category: 'disciplina',
            keywords: ['falta', 'sancion', 'arresto', 'suspension', 'disciplinario', 'sumario', 'asuntos internos', 'destitucion', 'decreto 461', 'reglamento', 'leves', 'graves', 'indisciplina', 'conducta', 'gorra', 'uniforme'],
            responses: [
                { match: ['decreto 461', 'reglamento', 'especificos'], text: "El **Decreto 461/15** reglamenta la Ley 12521. Define faltas por negligencia, incumplimiento de órdenes y conductas que afecten el prestigio institucional." },
                { match: ['leves', 'celular', 'aseo', 'fumar', 'uniforme', 'gorra'], text: "Ejemplos de **faltas leves** (Dec. 461): descuido en el aseo o uniforme, fumar en servicio, uso indebido de celulares o falta de diligencia. *Atención:* La falta de gorra o descuido del uniforme tienen un **seguimiento estricto** en la nueva gestión. Tres leves pueden sumar una grave." },
                { match: ['graves', 'engaño', 'arma', 'indisciplina', 'colaboracion', 'droga'], text: "Ejemplos de **faltas graves** (Dec. 461): inducir a engaño al superior, uso arbitrario del arma de fuego, falta de colaboración con la justicia, consumo de estupefacientes o permitir indisciplina bajo su mando." },
                { match: ['defensa', 'recurso', 'descargo'], text: "Ante una sanción, tenés derecho a presentar un descargo por escrito en los plazos legales y solicitar vista del legajo. El Tribunal de Conducta Policial juzga las graves." }
            ],
            default: "El Régimen Disciplinario se rige por la Ley 12521 y el Decreto 461/15. ¿Tu duda es sobre el procedimiento, una falta leve o una grave?"
        },
        {
            category: 'sueldos',
            keywords: ['sueldo', 'salario', 'cobrar', 'cuanto gano', 'escala', 'decreto 142', 'decreto 411', 'haberes', 'porcentaje', 'aumento', 'patrullero', 'chofer', 'basico', 'pagos'],
            responses: [
                { match: ['jerarquias', 'grados', 'escalon', 'carrera'], text: "La **Jerarquía Policial** (Ley 12521) se divide en: **Personal de Ejecución** (Suboficial, Oficial, Subinspector), **Coordinación** (Inspector, Subcomisario), **Supervisión** (Comisario, Com. Supervisor) y **Dirección** (Subdirector, Director, Director General)." },
                { match: ['escalafones', 'subescalafones', 'especialidad'], text: "Existen 3 Escalafones principales: **General** (Seguridad, Judicial, Investigaciones), **Profesional** (Jurídico, Sanidad, Adm.) y **Técnico** (Criminalística, Comunicaciones, Bomberos, Músicos)." },
                { match: ['decreto 411', 'historico 2026', 'aumento 2026', 'escala salarial'], text: "El **Decreto 0411/26** establece un incremento salarial progresivo desde Enero a Junio de 2026. Fija un piso salarial garantizado de neto bolsillo de $75.000 extras en Enero y $170.000 extras en Febrero. Se consolida además el valor de junio 2026 como nuevo sueldo de referencia." },
                { match: ['sueldo oficial', 'cuanto gana un oficial', 'basico oficial'], text: "Sueldos Oficial (Básico Decreto 411/26):\n- **Enero 2026**: $166.615\n- **Febrero 2026**: $170.025\n- **Junio 2026**: $182.692\nEl neto de bolsillo incluye además sumas no remunerativas y otros complementos que elevan significativamente el haber de bolsillo final según nivel y condición." },
                { match: ['sueldo subinspector', 'cuanto gana un subinspector'], text: "Sueldos Subinspector (Básico Decreto 411/26):\n- **Enero 2026**: $247.424\n- **Febrero 2026**: $302.986\n- **Junio 2026**: $325.558" },
                { match: ['sueldo inspector', 'cuanto gana un inspector'], text: "Sueldos Inspector (Básico Decreto 411/26):\n- **Enero 2026**: $333.230\n- **Febrero 2026**: $408.061\n- **Junio 2026**: $438.461" },
                { match: ['minimo', 'bolsillo', 'piso', 'percepcion'], text: "Piso Ingreso (Decreto 411/26): Ningún empleado percibirá neto menos de **$896.651** (Enero) a **$983.170** (Junio). El Oficial operativo puede llegar al rango de $1.800.000 - $2.050.000 neto sumando adicionales." },
                { match: ['rosario', 'santa fe', 'conflictividad', 'vgg', 'baigorria', 'santo tome'], text: "Se aplica un **Plus por Conflictividad de $500.000** en Rosario, Santa Fe, VGG, Baigorria y Santo Tomé para personal de calle." },
                { match: ['maximas jerarquias', 'director', 'comisario'], text: "Básico Escalas Superiores (Decreto 411/26 - Junio 2026 sin sumas complementarias):\n- **Dir. General**: $2.039.350\n- **Director**: $1.700.463\n- **Subdirector**: $1.403.882\n- **Com. Supervisor**: $1.179.261\n- **Comisario**: $1.123.106" }
            ],
            default: "Las escalas salariales vigentes (Decreto 411/26) definen tus haberes básicos y complementos desde enero a junio 2026. Preguntame por tu rango ('Sueldo Oficial', 'Piso salarial') para más detalles."
        },
        {
            category: 'prevision',
            keywords: ['jubilacion', 'retiro', 'ley 14283', 'aportes', '30 años', 'caja', 'edad', 'emergencia', 'pension', 'solidario', 'aporte solidario'],
            responses: [
                { match: ['ley 14283', 'reforma', 'emergencia'], text: "La **Ley 14.283 (Sep 2024)** declaró la emergencia previsional por 2 años. Los aportes subieron: **17%** para operativos y **18%** para jerarquías." },
                { match: ['calculo', 'promedio', '120 meses'], text: "El haber se calcula sobre el promedio de las últimas **120 remuneraciones** actualizadas (últimos 10 años), no los últimos 3 como antes." },
                { match: ['porcentaje', '30 años', '36 años', '82%'], text: "Haber ordinario: **70%** con 30 años de aportes. Sube un 2% por año extra hasta el tope del **82%** (con 36 años)." },
                { match: ['edad', 'limite'], text: "La reforma busca desalentar retiros prematuros. Aunque se mantienen regímenes específicos, el cálculo del haber premia la permanencia." },
                { match: ['solidario', 'aporte solidario', 'descuento', 'jubilados'], text: "Se aplica un Aporte Solidario transitorio (del 2% al 6%) para pasivos que superen las 3 jubilaciones mínimas. **No obstante, se anunció que este aporte NO se prorrogará en 2026.**" }
            ],
            default: "La Reforma Previsional (Ley 14.283) cambió aportes y el cálculo del haber (ahora sobre 120 meses). ¿Dudas sobre años, porcentaje o aporte solidario?"
        },
        {
            category: 'isep_ascensos',
            keywords: ['isep', 'ascenso', 'concurso', '2024', '2025', '2026', 'id ciudadana', 'curso', 'llamado', 'vacantes', 'examen', 'cronograma', 'resolucion 0803', 'fechas', 'proyectos'],
            responses: [
                { match: ['ascenso 2024', 'pago'], text: "El **Concurso 2024** finalizó su etapa de evaluación (Decreto 2640). Los decretos de ascenso se están notificando para el pago retroactivo." },
                { match: ['ascenso 2025', 'concurso 2025', 'inscripcion', 'fechas', 'cronograma', 'resolucion 0803'], text: "📌 **Concurso de Ascenso 2025 (Res. 0803/2026)**:\n- **Inscripción**: Del 25/03 al 01/04 (hasta las 12:00 hs) vía Portal Web.\n- **Entrega Documental**: Hasta el 01/04 a las 12:00 hs.\n- **Examen (Escrito PC)**: Del 04/05 al 13/05.\n- **Defensa de Proyectos**: Del 14/05 al 05/06.\n- **Publicación Acta Final**: 09/06/2026." },
                { match: ['proyectos', 'entrega', 'direccion', 'mail', 'correo'], text: "📁 **Entrega de Proyectos (Supervisión/Dirección)**:\n- **Digital**: Enviar a `concursospoliciales@santafe.gov.ar` hasta el 01/04.\n- **Físico**: Sede Adm. Jurados el 07/04 (08:30 a 10:30 hs) en **Primera Junta 2823, Santa Fe** (Oficina 06, Planta Baja)." },
                { match: ['id ciudadana', 'intranet', 'usuario', 'clave'], text: "Es **obligatorio** tener la **ID Ciudadana** vinculada a la Intranet para inscribirse y rendir los exámenes del ISEP. Sin ella no podés concursar." },
                { match: ['ingreso', 'inscripcion', '2026'], text: "ISEP abrió inscripciones a finales de 2025 para la Cohorte 2026. El curso propedéutico es virtual y eliminatorio." }
            ],
            default: "El ISEP gestiona los concursos de ascenso anuales. Ya está disponible el cronograma para el **Concurso de Ascenso 2025** (Res. 0803/26). ¿Querés saber las fechas de inscripción o el lugar de entrega?"
        },
        {
            category: 'transporte',
            keywords: ['colectivo', 'bondi', 'bus', 'transporte', 'viaje', 'parada', 'horario', 'rosario', 'vera', 'terminal', 'asiento', 'pasaje', 'exclusive', 'd-4', 'san javier', 'reconquista'],
            responses: [
                { match: ['rosario', 'vera', 'ida', 'reconquista', 'ir a reconquista'], text: "🚍 **Norte -> Sur / Sur -> Norte (Horarios 2026 D-4)**:\n- **Santa Fe -> Reconquista/Vera**: 12:00 hs\n- **Santa Fe -> San Javier**: 23:00 hs\n- **Santa Fe -> Tostado**: (Consultar cronograma extra)\nHace base en las Terminales locales. Presentate con credencial." },
                { match: ['rosario', 'vuelta', 'ir a rosario', 'salir de rosario', 'venir a santa fe', 'santa fe rosario'], text: "🚍 **Santa Fe <-> Rosario (D-4 a partir 02/03/2026)**:\n**Desde Terminal Santa Fe (a Rosario):**\n- Madrugada: 02:30, 03:30 hs\n- Tarde: 16:00 hs\n\n**Desde Rosario (Pellegrini 3223 a Santa Fe):**\n- Mañana: 08:00, 08:30, 09:00 hs\n- Noche: 20:00, 20:30, 21:00 hs" },
                { match: ['paradas', 'donde para', 'localidades'], text: "Las paradas oficiales del Departamento Logística (D-4) incluyen cabeceras departamentales: Rosario (Pellegrini 3223), Terminal Santa Fe, Reconquista, Vera, San Javier. Recuerde formar en dársena 15 min antes." }
            ],
            default: "Estos son los nuevos horarios del transporte departamental D-4 vigentes (Marzo 2026). Consultá por salidas desde Santa Fe, hacia Rosario o al norte (Reconquista/Vera)."
        },
        {
            category: 'desendeudamiento',
            keywords: ['desendeudamiento', 'credito', 'deuda', 'olivares', 'refinanciar', 'mutuales', 'banco', 'sueldo comprometido', 'endeudado', 'cuotas', 'prestamo'],
            responses: [
                { match: ['que es', 'plan', 'provincial', 'olivares'], text: "El **Plan de Desendeudamiento** (anunciado por el Mtro. Pablo Olivares en 2026) es un programa provincial destinado a empleados estatales (incluyendo policías) para refinanciar deudas con mutuales y entidades financieras y recuperar capacidad salarial." },
                { match: ['como funciona', 'requisitos', 'condiciones'], text: "El plan permite **unificar deudas** pasándolas a una nueva línea de crédito provincial con menor tasa de interés y más plazo. Se otorgan incluso **2 meses de gracia** para empezar a pagar y liberar saldo en la cuenta sueldo de forma inmediata." },
                { match: ['promedio nacional', 'situacion'], text: "Según datos oficiales, si bien la deuda del estatal santafesino está por debajo del promedio nacional, muchos agentes tienen sus recibos embargados o muy comprometidos. Este plan busca sanear esa economía familiar." }
            ],
            default: "El nuevo Plan de Desendeudamiento provincial permite a los empleados (incluyendo policías) consolidar sus deudas de mutuales/bancos con menores tasas, más plazo y 2 meses de gracia. Es útil si tu sueldo está muy afectado por cuotas."
        },
        {
            category: 'noticias_2026',
            keywords: ['noticias', 'novedades', 'ultimo', 'ultimas noticias', '2026', 'resumen', 'ley nueva', 'actualidad', 'noticia'],
            responses: [
                { match: ['sueldos', 'salarios', 'aumento', 'febrero'], text: "🗞️ **Noticias de Sueldos (Feb 2026):** El piso operativo quedó en **$1.525.682** (incluyendo tarjeta alimentaria), sumado a un Plus por Conflictividad de **$500.000** en áreas críticas." },
                { match: ['salud', 'carpetas', 'medicas', 'licencias'], text: "🗞️ **Noticias de Salud Laboral:** Desde enero 2026 rige el **Sistema Integrado de Protección de la Salud Laboral**, estableciendo un esquema estricto de auditorías para reducir el ausentismo (carpetas médicas)." },
                { match: ['ascensos', 'isep', 'concursos', '2025'], text: "🗞️ **Noticias del ISeP (Marzo 2026):** Se abrió la convocatoria al **Concurso de Ascenso 2025** (Res. 0803/26). Inscripciones del 25/03 al 01/04 vía Web. Exámenes en Mayo." },
                { match: ['disciplina', 'gorra', 'uniforme'], text: "🗞️ **Noticias de Disciplina:** Hay una orden expresa de realizar un seguimiento muy estricto sobre las faltas relacionadas con el descuido del uniforme, especficamente la **falta de gorra**, sancionables como falta leve." }
            ],
            default: "🗞️ **Resumen Noticias 2026**: Nuevo **Sistema de Salud Laboral** en vigencia (fuerte control de carpetas médicas), ingresos mínimos garantizados de **$1.350.000**, confirmación de que el **Aporte Solidario a pasivos NO se prorroga**, y control estricto del uso del uniforme. Preguntame por 'sueldos', 'ascensos' o 'salud' para ampliar."
        },
        {
            category: 'app_actualizacion',
            keywords: ['app', 'actualizacion', 'v534', 'novedades app', 'error', 'ingreso', 'novedades de la aplicacion', 'cartel', 'version'],
            responses: [
                { match: ['ingreso', 'error', 'login', 'solucion'], text: "✅ **Problema de Ingreso Resuelto**: La versión actual solucionó el error de inicio de sesión que existía en algunos dispositivos. Si persistiera algún inconveniente, cerrá por completo la app y volvé a abrirla." },
                { match: ['novedades', 'v534', 'pro', 'cartel'], text: "🚀 **Novedades de la App**: Se optimizó el rendimiento general de Adicionales Santa Fe, se arregló el cartel de actualizaciones para que no vuelva a molestarte luego de iniciar sesión, y se me actualizó (Soy Centinela AI) con datos recientes al 2026." }
            ],
            default: "Nuestra App Adicionales Santa Fe se encuentra en su versión actual (PRO). Se mejoró la estabilidad, se arreglaron problemas del cartel de avisos y logueos. ¡Cerrala y abrila ante cualquier duda!"
        },
        {
            category: 'reglamentacion',
            keywords: ['miraf', 'arma', 'pistola', 'fusil', 'escopeta', 'rastreo', 'identificacion', 'calibre', 'modelo', 'serie', 'peritaje', 'balistica'],
            responses: [
                { match: ['que es', 'significado', 'miraf'], text: "El **MIRAF** es el Manual de Instrucciones del Régimen Administrativo Funcional (específicamente Identificación y Rastreo de Armas de Fuego). Es la guía oficial para describir armamento en actas y peritajes." },
                { match: ['identificacion', 'rastreo', 'datos'], text: "Para el rastreo MIRAF es vital consignar: **Tipo** (Puño/Hombro), **Marca**, **Modelo**, **Calibre** y **Numeración de Serie**. También el tipo de disparo (Semiauto, Automático)." },
                { match: ['uso racional', 'fuerza', 'armamento'], text: "La reglamentación 2012 enfatiza el uso racional de la fuerza y el cuidado del armamento provisto por el Estado. La portación fuera de servicio es una responsabilidad administrativa." }
            ],
            default: "El Manual MIRAF regula la identificación de armas de fuego. ¿Dudas sobre una clasificación o qué datos anotar?"
        },
        {
            category: 'jurisdiccion',
            keywords: ['unidad regional', 'ur', 'donde queda', 'cabecera', 'jurisdiccion', 'la capital', 'rosario', 'rafaela', 'reconquista', 'venado tuerto'],
            responses: [
                { match: ['ur 1', 'capital'], text: "La **Unidad Regional I (La Capital)** tiene su cabecera en la ciudad de **Santa Fe**. Abarca Santo Tomé, Recreo, San José del Rincón, etc." },
                { match: ['ur 2', 'rosario'], text: "La **Unidad Regional II (Rosario)** tiene su cabecera en **Rosario**. Es la unidad con mayor despliegue operativo de la provincia." },
                { match: ['ur 5', 'rafaela'], text: "La **Unidad Regional V (Castellanos)** tiene su cabecera en **Rafaela**." },
                { match: ['ur 9', 'reconquista'], text: "La **Unidad Regional IX (General Obligado)** tiene su cabecera en **Reconquista**." },
                { match: ['ur 8', 'venado'], text: "La **Unidad Regional VIII (General López)** tiene su cabecera en **Venado Tuerto**." },
                { match: ['listado', 'todas'], text: "Santa Fe tiene 19 URs:\nI (Sta Fe), II (Rosario), III (Las Rosas), IV (Casilda), V (Rafaela), VI (Villa Constitución), VII (Helvecia), VIII (Venado Tuerto), IX (Reconquista), X (Cañada de Gómez), XI (Esperanza), XII (Tostado), XIII (San Cristóbal), XIV (San Javier), XV (Coronda), XVI (San Justo), XVII (San Lorenzo), XVIII (Sastre), XIX (Vera)." }
            ],
            default: "Conozco las 19 Unidades Regionales de la provincia. ¿Buscás la cabecera o jurisdicción de alguna en particular?"
        },
        {
            category: 'juridico_policial',
            keywords: ['ley 12521', 'reglamento', 'mendoza', 'articulo', 'jerarquia', 'escalafon', 'subordinacion', 'violencia de genero', '1818', 'seguridad publica', '12154', 'detencion', 'derechos', 'miraf', 'manual', 'art 268', 'articulo 268', 'atribuciones', 'deberes'],
            responses: [
                { match: ['1818', 'violencia', 'genero'], text: "El **Protocolo 1818/20** es ley para nosotros. Establece la actuación obligatoria en violencia de género: recepción de denuncia, no revictimización y desarme preventivo si el agresor es empleado policial." },
                { match: ['0800', 'mpa', 'fiscal', 'flagrancia', 'llamada'], text: "Desde el 1/12/2025, toda **flagrancia** se consulta vía **0800 MPA**. Proporciona trazabilidad y directivas grabadas. Si la situación es urgente, aplicá acciones protocolizadas de preservación antes de llamar." },
                { match: ['art 268', 'articulo 268', 'atribuciones', 'deberes'], text: "El **Art. 268 del CPP** detalla tus deberes: recibir denuncias, impedir consecuencias del hecho, aprehender en flagrancia, recoger pruebas urgentes, secuestrar instrumentos del delito e informar derechos al imputado." },
                { match: ['jerarquia', 'escalafon', 'planimetria', 'estabilidad'], text: "La **Ley 12.521** otorga estabilidad en el empleo, propiedad del grado y derecho a la percepción de haberes. La verticalidad y subordinación son los pilares de la doctrina." },
                { match: ['seguridad publica', '12154'], text: "La **Ley de Seguridad Pública (12.154)** es el marco del sistema provincial. Define a la Policía como auxiliar de la justicia y establece los límites del uso racional de la fuerza." },
                { match: ['detencion', 'derechos', 'imputado'], text: "Según el CPP y Art. 268, debés informar al imputado: motivo de detención, derecho a abogado, a que se informe a un familiar y a ser revisado por un médico. Se debe entregar por escrito." }
            ],
            default: "Tengo los protocolos de Violencia de Género (1818), Manual MIRAF, 0800 MPA, y las atribuciones del Art. 268 del CPP. ¿Qué procedimiento específico necesitás?"
        },
        {
            category: 'codigo_faltas',
            keywords: ['faltas', 'contravencion', 'ley 10703', 'convivencia', 'ruidos molestos', 'desorden', 'ebriedad', 'pelea', 'sumario contravencional'],
            responses: [
                { match: ['ley 10703', 'codigo de faltas', 'contravenciones'], text: "La **Ley 10.703** regula las contravenciones. La policía debe instruir el sumario contravencional e informar de inmediato al Juez de Faltas competente." },
                { match: ['acta', 'seccional', 'denuncia'], text: "Toda falta da lugar a una acción pública. Podés actuar de oficio o por denuncia. Al constatarla, se labra acta de procedimiento con testigos y se secuestran pruebas." },
                { match: ['penas', 'multa', 'arresto', 'comiso'], text: "Las penas incluyen multas, arresto (puede ser domiciliario según el caso), comiso de objetos y clausura provisional del local infractor." }
            ],
            default: "El Código de Faltas (Ley 10.703) busca la paz social. Conozco procedimientos sobre ruidos molestos, ebriedad y desorden público. ¿Qué situación buscás reportar?"
        },
        {
            category: 'reforma_procesal_penal',
            keywords: ['ley 14258', 'reforma', 'allanamiento', 'fiscal', 'mpa', 'investigacion', 'plazos', 'detencion', 'feria judicial', '170', 'art 214', 'procedimiento', 'urgencia'],
            responses: [
                { match: ['ley 14258', 'reforma', 'cambios'], text: "La **Ley 14.258** amplió facultades: permite allanamientos con orden fiscal en casos urgentes, extiende plazos de detención hasta 96hs y elimina la feria judicial penal." },
                { match: ['allanamiento', 'urgencia', 'sin orden', '170'], text: "Excepciones al Allanamiento (Art. 170 CPP): No se requiere orden ante incendio/inundación, persecución de un imputado que entre a un domicilio, o si se ve a extraños entrar con fines delictivos." },
                { match: ['allanamiento', 'vivienda', 'fiscal'], text: "Se facilitan los allanamientos en investigaciones de criminalidad organizada, permitiendo ampliaciones a viviendas contiguas con autorización del MPA." },
                { match: ['investigacion', 'mpa', 'fiscal'], text: "La policía investiga bajo dirección del **MPA**. El Art. 252 del CPP permite actuar por iniciativa propia para asegurar pruebas ante peligro de desaparición (urge)." }
            ],
            default: "La última reforma procesal (Ley 14.258) y el Art. 170 regulan tu actuación en allanamientos y detenciones. ¿Dudas sobre la urgencia o los plazos?"
        },
        {
            category: 'escena_del_crimen',
            keywords: ['escena', 'crimen', 'lugar del hecho', 'preservar', 'cinta', 'acordonar', 'evidencia', 'huellas', 'cadena de custodia', 'bioseguridad', 'cuij'],
            responses: [
                { match: ['preservacion', 'pasos', 'primero'], text: "Protocolo de Preservación:\n1. **Arribo**: Registrar hora y evaluar riesgos.\n2. **Asistir**: Priorizar vívtimas (fijar posición del cuerpo si se traslada).\n3. **Acordonar**: Roja (Zona Crítica) y Amarilla (Seguridad).\n4. **Regla de Oro**: NO tocar, NO mover, NO agregar, NO sustraer nada." },
                { match: ['cadena de custodia', 'cuij', 'formulario'], text: "La **Cadena de Custodia** (Art. 204 quinquies) asegura la prueba. Cada elemento debe ir con **Formulario de Seguimiento**, CUIJ, firma del actuante y descripción del embalaje." },
                { match: ['bioseguridad', 'guantes'], text: "Usar guantes de látex/nitrilo, no fumar/salivar y no dejar objetos personales para evitar contaminación de ADN o huellas." }
            ],
            default: "La preservación del Lugar del Hecho es vital para la investigación. ¿Dudas sobre el acordonamiento o la cadena de custodia?"
        },
        {
            category: 'microtrafico',
            keywords: ['microtrafico', 'droga', 'estupefacientes', 'bunker', 'venta', 'narcomenudeo', 'ley 14239', 'desfederalizacion', 'demolicion', 'procedimiento', 'protocolo', 'quiosco', 'sustancia', 'reactivo', 'test', 'plazo', 'notificacion'],
            responses: [
                { match: ['ley 14239', 'competencia', 'provincial', 'desfederalizacion', 'desfederalizar'], text: "La **Ley 14.239** decretó la desfederalización del narcomenudeo en Santa Fe. Esto significa que la Policía provincial e investigadores locales persiguen la venta minorista de drogas, bajo directiva de la **Unidad Fiscal Especial de Microtráfico del MPA**." },
                { match: ['bunker', 'demolicion', 'derribo', 'cesar'], text: "Procedimiento de **Demolición de Búnkeres**: Ante el hallazgo de un punto de venta inactivo o utilizado exclusivamente para comercio de estupefacientes, y bajo expresa directiva de la Unidad de Microtráfico del MPA, se procede al cese del estado antijurídico mediante la demolición de la estructura edilicia con apoyo logístico municipal/provincial." },
                { match: ['plazo', 'comunicacion', 'fiscal', 'notificacion', 'limite', 'horas'], text: "⏱️ **Límite de Notificación**: Ante un procedimiento con secuestro de estupefacientes o aprehendidos por narcomenudeo, existe un **plazo máximo improrrogable de 2 horas** para dar aviso formal a la Unidad Fiscal Especial de Microtráfico del MPA." },
                { match: ['reactivo', 'test', 'quimico', 'sustancia', 'orientativo'], text: "🧪 **Reactivos Químicos**: Para determinar preliminarmente la naturaleza de la sustancia (cocaína, marihuana), el personal de Criminalística/PDI debe realizar el test de campo químico orientativo (de Duquenois-Levine para marihuana o Scott para cocaína) y dejar constancia del resultado de coloración en el acta." },
                { match: ['prioridad', 'calle'], text: "Se priorizan mercados abiertos, presencia de armas y casos donde el traficante participe en otros delitos graves." }
            ],
            default: "La Ley 14.239 de Microtráfico activa la competencia provincial, el derribo de puntos de venta y plazos estrictos de 2hs para informar al MPA. ¿Qué situación necesitás consultar?"
        },
        {
            category: 'bienestar_salud',
            keywords: ['salud mental', 'psicologo', 'estres', 'depresion', 'apoyo', 'bienestar', 'ayuda', 'contencion', 'familia', 'iapos', 'medicamentos', 'quemado', 'no doy mas', 'crisis', 'suicidio'],
            responses: [
                { match: ['plan provincial', '2026', 'cobertura'], text: "El **Plan Provincial de Salud Mental 2026** garantiza el **100% de cobertura en psicofármacos** vía IAPOS y atención psicológica gratuita en centros de bienestar policial." },
                { match: ['donde ir', 'urgencia', 'atencion'], text: "Podés ir a la **Dirección de Bienestar Policial** o solicitar intervención de la **Unidad de Gestión Tripartita**. La atención es confidencial e institucional." },
                { match: ['medicamentos', 'receta', 'gratis'], text: "Por disposición de Salud Mental, las recetas de psiquiatría tienen cobertura total para el oficial y carga familiar directa sin necesidad de auditoría previa en casos críticos." }
            ],
            default: "Tu salud mental no se negocia. Tenés cobertura total de IAPOS y apoyo profesional en Bienestar Policial. Si sentís que no podés más, buscá ayuda; ya reporté tu situación al sistema de contención administrativo de forma silenciosa."
        },
        {
            category: 'isep_documentos',
            keywords: ['listado habilitados', 'habilitados 2026', 'concurso ascenso', 'convocados ascenso', 'pdf isep', 'enlace isep', 'link isep', 'descargar listado', 'buscar habilitado', 'orden de merito', 'inscripto suboficial', 'inscripto oficial', 'manual tecnicatura', 'material de estudio', 'situacion revista'],
            responses: [
                { match: ['habilitados 2026', 'merito 2026', 'continuación'], text: "📄 **Listado Continúan en Orden de Mérito (Ciclo 2026)**:\n[Descargar PDF](https://isepsantafe.edu.ar/images/publicaciones/Prope%202026%20-%20Continuan%20en%20orden%20de%20merito/CONTINUAN%20EN%20ORDEN%20DE%20MERITO%20PARA%20CITAR.pdf)" },
                { match: ['habilitados suboficiales', 'inscripto suboficial', '2026'], text: "📄 **Personal Habilitado (Suboficiales) - Ciclo 2026**:\n[Descargar PDF](https://isepsantafe.edu.ar/images/Publicaciones/EE%20-%20Perfeccionamiento%202026/SUBOFICIAL%20INSCRIPTO%202026.pdf)" },
                { match: ['habilitados oficiales', 'inscripto oficial', '2026'], text: "📄 **Personal Habilitado (Oficiales) - Ciclo 2026**:\n[Descargar PDF](https://isepsantafe.edu.ar/images/Publicaciones/EE%20-%20Perfeccionamiento%202026/OFICIAL%20INSCRIPTO%2020263.pdf)" },
                { match: ['convocados', 'subcomisario', '2025'], text: "📄 **Convocados Ascenso 2025 - Subcomisario**:\n[Ver en Google Drive](https://drive.google.com/file/d/1zLxytU1o6JQm_S83QSHeh2CGIZCIRL62/view?usp=sharing)" },
                { match: ['convocados', 'comisario', 'supervisor', '2025'], text: "📄 **Convocados Ascenso 2025 - Comisario Supervisor**:\n[Ver en Google Drive](https://drive.google.com/file/d/1Vqtgg9bZj1xbJrKJBN5qnG_ECXLfFsrt/view?usp=sharing)" },
                { match: ['material', 'estudio', 'manual', 'tecnicatura', '2026'], text: "📚 **Manual de Estudio 2026 (Tecnicatura)**:\n[Descargar PDF](https://isepsantafe.edu.ar/images/Publicaciones/EaD%20-%20examenes%20tecnicatura%202026/Manual%20Tecnicatura%20Sup%20Seg%20Publica%20y%20Ciudadana%202026.pdf)" },
                { match: ['situacion revista', 'revista', '2025'], text: "📄 **Situación de Revista 2025 (Ascensos)**:\n[Ver en Google Drive](https://drive.google.com/file/d/1yvUD4GjwmO6iH8UNmABun5diahmxZpgz/view?usp=sharing)" }
            ],
            default: "He recopilado los enlaces directos a los listados del ISeP (Habilitados 2026, Convocados 2025, Manuales). ¿Sobre qué jerarquía o año necesitás el link?"
        },
        {
            category: 'isep_formacion',
            keywords: ['isep', 'curso', 'capacitacion', 'perfeccionamiento', 'tecnicatura', 'ascenso 2025', 'vacantes', 'estudio', 'examen', 'virtual'],
            responses: [
                { match: ['tecnicatura', '2026', 'propedutico'], text: "La **Tecnicatura Superior 2026** ya inició. El período propedéutico del 3 de febrero es clave para el ingreso a la carrera de 3 años con validez nacional." },
                { match: ['ascenso 2025', 'decreto 263'], text: "El **Decreto 263/26** fijó las vacantes para el Concurso de Ascenso 2025. Los jurados están evaluando antigüedad y desempeño operativo." },
                { match: ['virtual', 'notebooklm', 'estudiar'], text: "Usá el Aula Virtual del ISEP. NotebookLM es una herramienta recomendada para procesar los textos de la Ley 12.521 y Decretos de Ascenso." }
            ],
            default: "El ISEP es el camino al ascenso. Consultá vacantes (Decreto 263) y cursos de perfeccionamiento en la Intranet con tu ID Ciudadana o pedime los listados de habilitados."
        },
        {
            category: 'haberes_servicios',
            keywords: ['haberes', 'sueldo', 'decreto 142', 'aumento', 'piso', 'rosario', 'santa fe', 'adicional', 'hora', 'calculo', 'ordinaria', 'extra'],
            responses: [
                { match: ['sueldo', 'febrero', '142'], text: "Según el **Decreto 142/26**, el piso garantizado para oficial de ingreso es de **$1.350.000**, con el Plus por Conflictividad de **$500.000** en Rosario/Santa Fe." },
                { match: ['adicionales', 'precios', 'tarifas'], text: "Publicas: $9.500/$11.400. Privadas: $12.825/$15.390. Recordá que la Extraordinaria arranca a las 22hs los días de semana y los sábados a las 12:00 PM." },
                { match: ['aguinaldo', 'retroactivo', 'pago'], text: "Los retroactivos del Decreto 142 se liquidan por planilla complementaria. Revisá tu recibo en el Portal de Autogestión." }
            ],
            default: "Consultá tu sueldo operativo según Decreto 142/26 ($1.350.000 de base) y las nuevas tarifas de adicionales cargadas en tu calculadora."
        },
        {
            category: 'tap_beneficios',
            keywords: ['tap', 'tarjeta alimentar', 'alimentaria policial', 'donde pagar', 'reintegro', 'modo', 'coto', 'la anonima', 'kilbel', 'alvear', 'beneficios tap'],
            responses: [
                { match: ['modo', 'vincular', 'como'], text: "💳 **Vinculación MODO**: Entrá a la app de tu banco (NBSF o BNA), buscá el botón de MODO y vinculá tu Tarjeta Alimentar. Al pagar, avisá que usás QR de MODO y seleccioná la tarjeta TAP para que se aplique el reintegro." },
                { match: ['mcdonalds', 'mc donalds', 'comida rapida', 'fast food'], text: "🍔 **McDonald's y Comida Rápida**: Muchos locales como McDonald's o Mostaza suelen fallar porque están registrados como 'Comida Rápida' (MCC 5814) y la TAP requiere rubros de 'Almacén/Venta de Alimentos'. No es un error de tu tarjeta, sino una restricción de rubro." },
                { match: ['franco colella', 'panaderia', 'facturas', 'kiosco', 'kiosko', 'almacen'], text: "🥐 **Kioscos y Panaderías**: En locales como **Franco Colella** o panaderías de barrio la TAP pasa siempre. En **Kioscos**, solo va a pasar si el local está registrado como 'Almacén' o 'Minimercado'. Si es revistería pura, te va a dar error." },
                { match: ['estacion', 'servicio', 'nafta', 'combustible', 'ypf', 'shell', 'axion'], text: "⛽ **Estaciones de Servicio**: **No podés pagar NAFTA con la TAP.** La tarjeta rechaza el rubro de combustible. Pero **SÍ podés usarla en el SHOP** (Full, Select, Spot) si comprás comida o café, ya que el posnet de la comida suele ser independiente." },

                { match: ['porque', 'no pasa', 'rechazada', 'mcc'], text: "🔐 **¿Por qué falla?**: La TAP tiene restricciones por rubro (MCC). Solo pasa en lugares que venden comida para llevar o supermercados. Si el lugar es de 'entretenimiento' o 'servicios', Visa la rechazará automáticamente." },
                { match: ['coto'], text: "🛒 **COTO**: 15% de descuento los Lunes y Miércoles pagando con tarjeta de crédito (la TAP suele leerse como tal)." },

                { match: ['santa fe', 'capital', 'kilbel', 'alvear'], text: "📍 **Santa Fe (Capital)**: Los Viernes tenés 25% de reintegro en **Kilbel** y **Alvear** pagando con MODO." },
                { match: ['reconquista', 'avellaneda', 'el super'], text: "📍 **Reconquista**: Miércoles 30% de reintegro con MODO BNA+ en **El Súper**. Los Viernes hay promos de hasta 45% (Súper Fridays)." },
                { match: ['rafaela', 'venado tuerto', 'la anonima'], text: "📍 **La Anónima (Rafaela/Venado)**: Viernes y Sábados 30% de reintegro con MODO Banco Santa Fe (Tope $20.000 mensual)." }
            ],
            default: "La Tarjeta Alimentar Policial (TAP) tiene un monto de $175.682. Podés ver todos los beneficios por departamento en la nueva **Guía de Recursos** del Asistente."
        },
        {
            category: 'estampillas',
            keywords: ['estampilla', 'medica', 'donde compro', 'estampillas', 'vender', 'venden', 'comprar estampilla', 'estampillas santa fe'],
            responses: [
                { match: ['aritoys', 'centro'], text: "📍 **Aritoys**: Tucumán entre San Martín y San Jerónimo." },
                { match: ['junin', 'industrial'], text: "📍 **Librería Junín**: Junín casi 9 de Julio, cerca de la Escuela Industrial." },
                { match: ['francia', 'fatima'], text: "📍 **Librería Francia**: Francia y Pasaje Irala, frente a la Escuela Fátima." },
                { match: ['verna', 'hernandarias'], text: "📍 **Clínica Verna**: Las Heras y Hernandarias." },
                { match: ['mayo', 'san jeronimo'], text: "📍 **Santa Fe**: Tenés la Clínica 1° de Mayo (1° de Mayo 3017) y Consultorios San Gerónimo (Barrio El Pozo)." }
            ],
            default: "Podés conseguir Estampillas Médicas en: Aritoys, Librería Junín, Clínica Verna, Caja Arte de Curar (25 de Mayo 1867), entre otros. Mirá la lista completa en la **Guía de Recursos**."
        },
        {
            category: 'general_admin',

            keywords: ['tap', 'tarjeta', 'alimentar', '0810', 'problema', 'pago', 'monto', 'cbu', 'alias'],
            responses: [
                { match: ['tap', 'alimentar', '0810'], text: "Atención T.A.P: **0810-222-7342**. El monto se actualiza mensualmente y es acumulable." },
                { match: ['alias', 'cbu', 'transferencia'], text: "Podés configurar tu **Alias/CVU** en tu perfil para que sea más fácil compartir tus datos de cobro a tus compañeros." }
            ],
            default: "¿Buscás info de la tarjeta T.A.P o ayuda con tu Alias de transferencia? Consultá la sección Perfil para lo segundo."
        },
        {
            category: 'narcotrafico_ley_23737',
            keywords: ['ley 23737', 'estupefacientes', 'droga', 'federal', 'transporte', 'comercializacion', 'tenencia', 'competencia', 'nacional', 'precursores'],
            responses: [
                { match: ['federal', 'provincial', 'competencia', 'diferencia'], text: "Diferencia de Competencia:\n- **Federal (Ley 23737)**: Grandes cantidades, transporte interjurisdiccional, precursores químicos y contrabando.\n- **Provincial (Ley 14239)**: Microtráfico, narcomenudeo y venta minorista al consumidor final (búnkeres/quioscos)." },
                { match: ['tenencia', 'consumo', 'personal'], text: "La Ley 23.737 penaliza la tenencia, pero el fallo 'Arriola' de la CSJN estableció que el consumo personal en el ámbito privado sin afectar a terceros no es punible. No obstante, se debe informar al fiscal federal." },
                { match: ['precursores', 'quimicos'], text: "Cualquier hallazgo de sustancias indicativas de fabricación (estiramiento) o precursores químicos debe ser consultado de inmediato con la Justicia Federal." }
            ],
            default: "La Ley Nacional 23.737 regula el tráfico de estupefacientes. En Santa Fe, la Ley 14.239 nos permite actuar en casos de microtráfico bajo fiscalía provincial. ¿Necesitás saber sobre competencia o delitos específicos?"
        },
        {
            category: 'etaf_flagrancia_0800',
            keywords: ['etaf', '0800 mpa', 'flagrancia', 'equipo de trabajo', 'formulario etaf', 'protocolo 2025', 'comunicacion', 'trazabilidad', 'directiva'],
            responses: [
                { match: ['que es', 'etaf', 'para que sirve'], text: "El **ETAF** (Equipo de Trabajo para el Abordaje de la Flagrancia) es la estructura del MPA que gestiona el **0800 MPA**. Centraliza las comunicaciones para que la policía reciba directivas uniformes y rápidas." },
                { match: ['paso a paso', 'procedimiento', '0800'], text: "Protocolo ETAF/0800:\n1. **Aprehender**: Medidas precautorias (Art. 268).\n2. **Llamar al 0800**: Reportar novedad con CUIJ (si ya existe) o datos del hecho.\n3. **Clasificación**: El operador da la directiva o deriva al fiscal según complejidad.\n4. **Formularios ETAF**: Completar el acta de procedimiento según los campos requeridos por el sistema para asegurar trazabilidad." },
                { match: ['virtual', 'camaras', 'ia'], text: "La **Flagrancia Virtual (2025/2026)** permite actuar sin orden si el delito es detectado por cámaras de videovigilancia (IA) hasta 1 hora después del hecho, considerándose persecución ininterrumpida." }
            ],
            default: "El sistema 0800 ETAF (MPA) es el canal oficial para directivas en flagrancia. ¿Necesitás el número, el protocolo de llamada o los campos del formulario ETAF?"
        },
        {
            category: 'actuaciones_mpa_general',
            keywords: ['actuaciones', 'mpa', 'fiscalia', 'cuij', 'oficio', 'notificacion', 'pericia', 'secuestro', 'cadena de custodia', 'procedimiento', 'formulario'],
            responses: [
                { match: ['cuij', 'numero', 'identificacion'], text: "El **CUIJ** (Clave Única de Identificación Judicial) es el 'documento' de la causa. Debe figurar en todas las actas, sobres de secuestro y comunicaciones oficiales. Es generado por el 911 o la Central de Emergencias al inicio." },
                { match: ['cadena de custodia', 'secuestro', 'embalaje'], text: "Toda pieza de convicción debe ser rotulada inmediatamente. El **Acta de Secuestro** debe detallar: lugar exacto, estado del objeto, quién lo halló y firma de testigos. Usar formularios oficiales de cadena de custodia." },
                { match: ['tiempos', 'plazos', 'informar'], text: "La comunicación al MPA debe ser **inmediata** en caso de detenidos. Los informes periciales deben elevarse en los plazos que fije el fiscal, generalmente 48/72hs para diligencias ordinarias." }
            ],
            default: "Conozco los protocolos generales del MPA: CUIJ, Cadena de Custodia y Actuaciones procedimentales. ¿Qué trámite específico estás realizando?"
        },
        {
            category: 'politica_actualidad',
            keywords: ['gestion', 'ministro', 'noticias', 'actualidad', 'mejoras', 'equipamiento', 'chalecos', 'moviles', 'politica criminal'],
            responses: [
                { match: ['equipamiento', 'chalecos', 'moviles', 'patrullas'], text: "La gestión 2026 prioriza el reequipamiento: se han entregado nuevos móviles inteligentes y chalecos con protección balística nivel RB3 certificados." },
                { match: ['profesionalizacion', 'capacitacion', 'reentrenamiento'], text: "Se están implementando centros de reentrenamiento permanente en Rosario y Santa Fe para tácticas de intervención urbana y primeros auxilios tácticos." },
                { match: ['politica', 'actualidad', 'noticias'], text: "La política actual se centra en la presencia operativa en calle y la lucha contra el crimen organizado mediante la Ley de Microtráfico y el endurecimiento del CPP." }
            ],
            default: "Mantente al día con las noticias en la Intranet Policial. Conozco sobre el nuevo equipamiento y la política criminal actual de la PSf."
        },
        {
            category: 'iapos_salud',
            keywords: ['iapos', 'obra social', 'salud', 'cobertura', 'medico', 'hospital', 'prestacion', 'afiliado', 'complementario', 'coseguro', 'internacion', 'cirugia', 'receta', 'farmacia', 'plan'],
            responses: [
                { match: ['que es', 'iapos', 'obra social'], text: "El **IAPOS** (Instituto Autárquico Provincial de Obra Social) es la obra social del personal de la Provincia de Santa Fe, incluida la Policía. Ofrece cobertura de consultas, prácticas ambulatorias, internaciones y cirugías." },
                { match: ['salud mental', 'psicologo', 'psicologo gratis', 'cobertura mental'], text: "Desde 2025, el **Plan Integral de Salud Mental Policial** garantiza atención psicológica gratuita, **100% de cobertura en psicofármacos** sin coseguro ni auditoría previa, y acompañamiento al grupo familiar. Derivá tu caso a Bienestar Policial para acceder." },
                { match: ['complementario', 'servicio complementario', 'mayo 2025'], text: "Desde **mayo 2025** (activos) y **junio 2025** (pasivos), IAPOS actualizó el valor del Servicio Complementario. El aumento es porcentual según la contribución general y varía por grupo familiar. Consultá tu recibo de sueldo o la web de IAPOS." },
                { match: ['fuerzas federales', 'gendarmeria', 'prefectura', 'plan bandera'], text: "Desde octubre 2025, el **Plan Bandera** extiende cobertura IAPOS a las fuerzas federales (P. Federal, PSA, Prefectura, Gendarmería) que no tengan cobertura propia, pagada por el tesoro provincial." },
                { match: ['alojamiento', 'traslado', 'transporte'], text: "El plan policial 2025-2026 incluye **alojamiento gratuito** en Rosario y Santa Fe para efectivos que residan en otras localidades, y ampliación del sistema de **transporte gratuito** (mayores destinos y frecuencia)." },
                { match: ['contacto', 'telefono', 'atencion iapos'], text: "Podés contactar a IAPOS en: **iapossantafe.gob.ar** | Atención personalizada en las delegaciones de cada ciudad cabecera." }
            ],
            default: "IAPOS es tu obra social. Ofrece cobertura total en salud, incluyendo el Plan Integral de Salud Mental sin coseguro. ¿Necesitás info sobre un trámite o prestación específica?"
        },
        {
            category: 'osesp_spa_tarifas',
            keywords: ['osesp', 'spa', 'adicionales', 'hora', 'tarifa', 'precio', 'servicio adicional', 'ordinaria', 'extraordinaria', 'decreto 0075', 'privado', 'publico', 'policía adicional', 'cobrar', 'cuanto cobro'],
            responses: [
                { match: ['decreto 0075', '2025', 'aumento', 'actualizacion'], text: "El **Decreto 0075 (Ene 2025)** actualizó las tarifas con un aumento del **50%**. Son los valores oficiales actualizados más recientes para SPA y OSESP." },
                { match: ['spa', 'publico', 'organismos', 'municipio', 'nacion', 'provincia'], text: "**SPA (Servicio de Policía Adicional) - Organismos Públicos (bloque de 4hs)**:\n- Ordinario: **$20.205**\n- Baja Complejidad: **$2.007**\n- Media Complejidad: **$6.039**\n- Alta Complejidad: **$8.037**" },
                { match: ['spa', 'privado', 'empresa', 'comercio', 'particular'], text: "**SPA (Servicio de Policía Adicional) - Entidades Privadas (bloque de 4hs)**:\n- Ordinario: **$27.927**\n- Baja Complejidad: **$2.781**\n- Media Complejidad: **$8.352**\n- Alta Complejidad: **$11.142**" },
                { match: ['osesp', 'hora', 'excepcional', 'compensacion'], text: "**OSESP (Orden de Servicio Excepcional) - Compensación por hora**:\n- Base: **$5.508/hora**\n- Supervisión/Dirección: **$6.600/hora**\n- Coordinación: **$6.000/hora**\n- Chofer de Patrullero: **$6.000/hora**" },
                { match: ['ordinaria', 'extraordinaria', 'cuando', 'inicio'], text: "Según los Decretos vigentes, la **Ordinaria** aplica en días hábiles. La **Extraordinaria** inicia a las **22:00hs** los días de semana y a las **12:00hs** los sábados y domingos. Revisar convenio actualizado en intranet." }
            ],
            default: "Las tarifas de Adicionales (SPA) y OSESP fueron actualizadas por Decreto 0075 en enero 2025. ¿Necesitás el valor para un servicio público o privado?"
        },
        {
            category: 'uso_fuerza_armamento',
            keywords: ['uso fuerza', 'taser', 'byrna', 'pistola electrica', 'bala de goma', 'arma menos letal', 'baja letalidad', 'proporcionalidad', 'protocolo fuerza', 'resolucion 2237', '2237/25', 'reglamento uso armas'],
            responses: [
                { match: ['protocolo', 'resolucion 2237', '2237/25', 'uso progresivo'], text: "La **Resolución Ministerial 2237/25** (28/08/2025) aprueba el 'Protocolo de Uso Progresivo de la Fuerza'. Principios: **Legalidad, Necesidad y Proporcionalidad**. Siempre se deben agotar los medios menos letales antes de escalar al siguiente nivel." },
                { match: ['taser', 'pistola electrica', 'electroshock'], text: "Desde **agosto 2025**, la PSF comenzó la distribución de **100 pistolas Taser**. Solo el personal certificado como 'instructor maestro' puede usarlas tras la capacitación específica. Su uso está protocolizado en la Res. 2237/25." },
                { match: ['byrna', 'lanzadora', 'impacto controlado'], text: "Se distribuyeron **100 lanzadoras Byrna** junto con las Taser. Son armas de impacto controlado. No son letales pero requieren habilitación. Capacitación a cargo del ISeP según Res. 2237/25." },
                { match: ['principios', 'legalidad', 'necesidad', 'proporcionalidad'], text: "El **Uso Racional de la Fuerza** se basa en:\n1. **Legalidad**: Solo en los supuestos autorizados.\n2. **Necesidad**: Cuando no hay alternativa efectiva.\n3. **Proporcionalidad**: El nivel debe ser equivalente a la amenaza.\nEl arma de fuego es el ÚLTIMO recurso." },
                { match: ['arma de fuego', 'ultimo recurso', 'cuando disparo'], text: "Usar el arma de fuego solo para: **Defensa propia o de terceros** ante peligro inminente de muerte o lesiones graves, o para evitar la fuga de un sujeto que represente esa amenaza, siempre que medidas menos extremas sean insuficientes. Documentar y reportar SIEMPRE." }
            ],
            default: "El uso de la fuerza se rige por la Res. 2237/25. Los principios son Legalidad, Necesidad y Proporcionalidad. ¿Dudas sobre Taser, Byrna o el protocolo de escalada?"
        },
        {
            category: 'ley_12521_profundizada',
            keywords: ['articulo 25', 'articulo 1', 'articulo 3', 'articulo 4', 'articulo 12', 'articulo 46', 'deberes', 'obligaciones', 'examen', 'concurso', 'isep', 'promocional', 'obligatorio', 'funciones policiales', 'autoridad policial', 'personal ejecucion', 'personal coordinacion', 'personal supervision', 'cuidar bienes', 'proporcionalidad', 'deberes y derechos', 'obedecer ordenar'],
            responses: [
                { match: ['art 1', 'articulo 1', 'objeto', 'ambito'], text: "**Art. 1 (Ley 12521)**: El personal policial se rige por esta ley en todo lo relativo a la organización, funcionamiento del servicio y las funciones de sus miembros. Las normas se interpretan en favor del bien común y la dignidad de la función." },
                { match: ['art 3', 'articulo 3', 'grados', 'jerarquia'], text: "**Art. 3 (Escala Jerárquica)** de Mayor a Menor:\n1. Director General de Policía\n2. Director de Policía\n3. Subdirector de Policía\n4. Comisario Supervisor\n5. Comisario\n6. Subcomisario\n7. Inspector\n8. Subinspector\n9. Oficial de Policía\n10. Suboficial de Policía" },
                { match: ['art 4', 'articulo 4', 'grupos', 'categorias'], text: "**Art. 4 (Agrupamientos)**: \n- **Ejecución**: Suboficial y Oficial.\n- **Coordinación**: Subinspector e Inspector.\n- **Supervisión**: Subcomisario y Comisario Supervisor.\n- **Dirección**: Subdirector, Director y Director General." },
                { match: ['art 12', 'articulo 12', 'escalafones', 'subescalafones'], text: "**Art. 12 (Escalafones)**:\n- **General**: Seguridad, Judicial, Investigación Criminal.\n- **Profesional**: Jurídico, Sanidad, Administración.\n- **Técnico**: Criminalista, Comunicaciones e Informática, Bombeiro, Música, Administrativo Técnico, Sanidad Técnico.\n- **Servicios**: Servicios Especializados and Mantenimiento." },
                { match: ['art 25', 'articulo 25', 'autoridad policial', 'funciones', 'que puedo hacer'], text: "**Art. 25 (Autoridad Policial)**: El personal del Escalafón General tiene autoridad para: defender la vida, libertad, propiedad e integridad de las personas; adoptar procedimientos para **prevenir el delito o interrumpir su ejecución**; identificar sospechosos y realizar aprehensiones en casos de flagrancia." },
                { match: ['art 46', 'articulo 46', 'deberes', 'obligaciones'], text: "**Deberes del Art. 46 (Ley 12521)**: Todo personal tiene la obligación de:\n- Defender la vida, bienes y derechos de las personas aun a riesgo de su propia vida.\n- Obedecer las órdenes legales de los superiores jerárquicos.\n- Portar el arma reglamentaria provista por la institución.\n- Guardar el secreto profesional sobre asuntos del servicio.\n- Mantener una conducta decorosa y actuar con imparcialidad." },
                { match: ['derechos', 'estabilidad', 'propiedad grado'], text: "**Derechos del Art. 47**: El personal tiene derecho a: estabilidad en el empleo, **propiedad del grado**, percepción de haberes según escala, licencias, cobertura de salud (IAPOS), y acceso a formación profesional en el ISeP." },
                { match: ['examen', 'concurso', 'isep', 'promocional', 'obligatorio'], text: "📝 **Exámenes Promocionales Obligatorios del ISeP**:\nPara acceder a los ascensos reglados por la Ley 12521, es de carácter obligatorio aprobar los cursos de capacitación y rendir los exámenes escritos correspondientes en las fechas estipuladas por el ISeP. El incumplimiento o desaprobación inhabilita automáticamente al agente para el Concurso de Ascenso de ese período." }
            ],
            default: "Tengo conocimiento profundo de la Ley 12521 (Artículos, deberes de Art. 46 y exámenes obligatorios del ISeP). ¿Qué artículo específico, escalafón o agrupamiento necesitás consultar?"
        },
        {
            category: 'decreto_461_profundizado',
            keywords: ['decreto 461', 'falta', 'sancion', 'tribunal conducta', 'leve', 'grave', 'sumario', 'procedimiento disciplinario', 'defensa', 'plazo', 'descargo', 'asuntos internos', 'juzgamiento', 'ventana', 'dias', 'suspension', 'rango', 'composicion', 'miembros'],
            responses: [
                { match: ['que es', 'decreto 461', 'reglamento'], text: "El **Decreto 461/2015** (Régimen de Responsabilidad Administrativa del Personal Policial) reglamentó el Título II cap. 2 de la Ley 12521. Define faltas, sanciones, procedimiento y el **Tribunal de Conducta Policial** para juzgar las graves." },
                { match: ['faltas leves', 'leve', 'ejemplos'], text: "**FALTAS LEVES** (Dec. 461): Descuido en higiene personal o uniforme, fumar en servicio, uso indebido del celular, falta de puntualidad, no rendir novedades, trato incorrecto con ciudadanos. **Sanción**: Apercibimiento o hasta **10 días de arresto**. Tres leves equivalen a una grave." },
                { match: ['faltas graves', 'grave', 'ejemplos'], text: "**FALTAS GRAVES** (Dec. 461): Inducir a engaño al superior, uso arbitrario del arma, falta de colaboración con la justicia, consumo de estupefacientes, permitir indisciplina bajo su mando, actos deshonestos, conducta indecorosa, incumplimiento de orden legal. **Sanción**: 11 a 30 días de suspensión o destitución." },
                { match: ['descargo', 'defensa', 'plazo', 'recurso', 'ventana', 'dias'], text: "⏱️ **Plazo de Descargo**: De acuerdo con el Decreto 461/15, el agente sumariado cuenta con una ventana estricta de **5 días hábiles** desde la notificación oficial de la imputación disciplinaria para presentar su descargo por escrito y proponer pruebas que sustenten su defensa." },
                { match: ['suspension', 'rango', 'dias suspension'], text: "🚫 **Rangos de Suspensión**: Las sanciones disciplinarias según la gravedad de la falta se dividen en:\n- **Faltas Leves**: Apercibimiento o arresto de 1 a 10 días.\n- **Faltas Graves**: Suspensión de **11 a 30 días** con descuento de haberes, o destitución (cesantía/exoneración)." },
                { match: ['composicion', 'miembros', 'quienes integran', 'tribunal conducta', 'que hace', 'como funciona'], text: "👥 **Composición del Tribunal de Conducta Policial**: El Tribunal está compuesto de forma mixta y tripartita por un Oficial Superior de Policía (en actividad o retiro), representantes del Ministerio de Justicia y Seguridad, y un letrado de la Dirección General de Asuntos Internos, garantizando la imparcialidad del juzgamiento de faltas graves. Las resoluciones se elevan al Director General." },
                { match: ['modificacion', '3268', 'decreto 3268', '2018'], text: "El **Decreto 3268/2018** modificó parcialmente el Dec. 461/2015, ajustando plazos y criterios para ciertos procedimientos. La reforma 2018 buscó acelerar la resolución de sumarios sin afectar el derecho de defensa." }
            ],
            default: "El Decreto 461/2015 regula el Régimen Disciplinario. Define faltas leves y graves, la ventana de 5 días hábiles para descargo escrito, rangos de suspensión de 11 a 30 días y la composición del Tribunal de Conducta. ¿Qué necesitás saber?"
        },
        {
            category: 'trata_personas_protocolo',
            keywords: ['trata', 'trata de personas', 'explotacion', 'victima', 'proxenetismo', 'captacion', 'protocolo trata', 'rota', 'ufase', 'organizacion criminal', 'trafico'],
            responses: [
                { match: ['que hacer', 'protocolo', 'actuacion'], text: "**Protocolo de Actuación - Trata de Personas**:\n1. **No revictimizar**: Trato respetuoso, no preguntar el número de 'clientes'.\n2. **Asistencia inmediata**: Derivar a la víctima a salud y trabajo social.\n3. **Comunicar al MPA**: Inmediatamente (es un delito federal).\n4. **Preservar el lugar**: Acordonar sin que la víctima quede expuesta." },
                { match: ['delito federal', 'competencia', 'quién investiga'], text: "La **Trata de Personas** es un delito federal (Ley 26842). La Justicia Federal investiga. La PSF actúa inicialmente para asistir a la víctima y preservar la escena, luego notifica a la **UFASe** (Unidad Fiscal de Asistencia en Secuestros Extorsivos) y al Juzgado Federal." },
                { match: ['indicios', 'sospecha', 'como identifico'], text: "Indicios de Trata: Persona que no puede hablar libremente, sin documentos, con miedo, que repite frases aprendidas, sin libertad de movimiento, señales de violencia, encerrada en inmuebles específicos, que no conoce la ciudad donde está." }
            ],
            default: "La trata de personas (Ley 26842) es un delito federal. La policía actúa para asistir a la víctima y preservar la escena. ¿Dudas sobre el protocolo de actuación o la competencia?"
        },
        {
            category: 'control_vehicular_transito',
            keywords: ['control vehicular', 'moto', 'motocicleta', 'retencion', 'ciclomotor', 'infraccion', 'ley transito', 'seguro', 'cedula verde', 'verificacion tecnica', 'vhf', 'alcoholemia', 'protocolo control'],
            responses: [
                { match: ['protocolo control vehicular', 'como controlo', 'procedimiento'], text: "El **Protocolo de Control Vehicular SF** (Resolución Ministerial) establece:\n1. Señalización visible del operativo.\n2. Verificar documentación: Licencia, Cédula Verde/Azul, Seguro, VTV.\n3. Retención preventiva si falta documentación o existe prohibición.\n4. Acta de retención con datos del conductor y vehículo." },
                { match: ['retencion', 'secuestro', 'moto retenida'], text: "La **retención preventiva** de un vehículo se aplica cuando: falta documentación obligatoria, está prohibida la circulación, o hay indicios de uso en un delito. Se labra Acta con CUIJ y se informa al dueño del lugar de depósito." },
                { match: ['alcoholemia', 'aliento', 'control', 'positivo'], text: "Ante control de alcoholemia positivo: Informar el resultado al conductor, aplicar el procedimiento de la Ley de Tránsito Nacional (24449) y labrar acta contravencional. En caso de accidente con lesionados, se llama al MPA (0800)." }
            ],
            default: "El Protocolo de Control Vehicular regula la retención de motos y controles de documentación. ¿Necesitás el procedimiento específico para retención o alcoholemia?"
        },
        {
            category: 'recursos_web_policiales',
            keywords: ['pagina web', 'recursos online', 'intranet', 'donde consulto', 'web policial', 'isep online', 'isep web', 'iapos web', 'sanidad', 'mpa online', 'boletín oficial', 'legislacion'],
            responses: [
                { match: ['isep', 'web', 'aula virtual', 'isep online'], text: "**Recursos ISeP**: isepsantafe.edu.ar → Aula Virtual, inscripciones a cursos y la Tecnicatura Superior en Seguridad Pública." },
                { match: ['iapos', 'web', 'tramites online', 'prestaciones'], text: "**Recursos IAPOS**: iapossantafe.gob.ar → Cartilla de prestadores, autorizaciones, formularios y trámites online." },
                { match: ['mpa', 'web', 'protocolo', 'formulario'], text: "**Recursos MPA**: mpa.santafe.gov.ar → Protocolos, formularios ETAF y comunicaciones oficiales del Ministerio Público de la Acusación." },
                { match: ['boletin oficial', 'legislacion', 'leyes', 'decretos'], text: "**Legislación Oficial**: santafe.gov.ar/legislación → Texto completo de leyes, decretos y resoluciones provinciales. También en: saij.gob.ar (nacional)." },
                { match: ['intranet', 'portalpolicial', 'portal'], text: "**Intranet Policial**: Accesible solo desde redes internas. Gestión de ID Ciudadana, novedades, formularios de RRHH y publicaciones del Boletín Policial." }
            ],
        },
        // --- 🚨 NUEVAS BASES LEGALES Y ACTUALIZACIONES 2026 🚨 ---
        {
            category: 'isep_actualidad_2026',
            keywords: ['isep', '2026', 'ascensos', 'perfeccionamiento', 'curso', 'actualizacion', 'egresados', 'nuevos policias', 'novedades', 'escuela superior'],
            responses: [
                { match: ['curso de perfeccionamiento', 'marzo', 'recreo', 'rosario'], text: "El **Curso de Perfeccionamiento y/o Actualización Ciclo 2026** inició la semana del **9 de marzo de 2026** en Reconquista, Recreo y Rosario (jerarquías Inspector a Suboficial). Mantiene tu habilitación para concursos por 5 años." },
                { match: ['escuela superior', 'director', 'subdirector'], text: "Para Directores y Subdirectores de Policía, el Curso de Perfeccionamiento 2026 cerró inscripciones en enero 2026." },
                { match: ['cadetes', 'ingreso', 'ciclo lectivo', 'policias'], text: "El 24 de febrero de 2026 comenzó el Ciclo Lectivo 2026 para el 1er año de cadetes. Además, para la nueva cohorte se aumentó la proporción de varones para suplir jubilaciones operativas." },
                { match: ['nuevos policias', 'egresados', 'febrero', 'suboficiales'], text: "El 23 de febrero de 2026, **811 nuevos suboficiales** (cohorte 2024-2025) recibieron su equipamiento reglamentario, sumándose a la operatividad provincial." },
                { match: ['ascensos', '2026-2027', 'seleccion'], text: "En diciembre de 2025 se publicaron los aptos (psicológico, físico e intelectual) del proceso de selección del ciclo 2026-2027." }
            ],
            default: "El ISeP comenzó los cursos de actualización en marzo 2026. Es fundamental aprobarlo si no ascendiste en el último concurso para mantener la habilitación. ¿Qué información sobre capacitación necesitás?"
        },
        {
            category: 'codigo_procesal_penal_sf',
            keywords: ['cpp', 'codigo procesal', 'santa fe', 'ley 12734', 'ipp', 'detencion', 'allanamiento', 'demora', 'flagrancia', 'derechos victima', 'fiscal', 'actuacion policial', 'mpa'],
            responses: [
                { match: ['ipp', 'investigacion penal preparatoria'], text: "La actuación policial transcurre en la **I.P.P (Investigación Penal Preparatoria)**. Actuamos bajo las órdenes directas del Fiscal (MPA), quien dirige jurídica y técnicamente el caso." },
                { match: ['detencion', 'libertad', 'arresto', 'demora', '10 bis'], text: "**Detención / Demora**: No podés detener o restringir la libertad sin orden judicial, SALVO flagrancia. Excepcionalmente, en casos como averiguación de identidad por indicios ciertos, se puede demorar preventivamente." },
                { match: ['allanamiento', 'orden', 'horario'], text: "El **allanamiento** requiere orden escrita que especifique domicilio y objetivo. El horario normal es de **07:00 a 21:00**, salvo excepciones gravísimas, riesgo de destrucción de prueba, o consentimiento." },
                { match: ['mpa', 'comunicacion', 'aviso', 'oficio'], text: "La PDI y GOC (o Personal de Guardia en general) tienen la obligación de informar **de inmediato** al Fiscal de turno cualquier inicio de actuación de oficio." },
                { match: ['victima', 'derechos', 'informacion'], text: "Es tu obligación informar a la víctima sobre sus derechos (ser asistida, asesorada) conjuntamente con el MPA en la primera intervención." }
            ],
            default: "El Código Procesal (Ley 12.734) enmarca nuestra actuación. Trabajamos para la IPP bajo mandato de los Fiscales del MPA. Toda privación de libertad u allanamiento es de interpretación restrictiva y exige orden, salvo flagrancia."
        },
        {
            category: 'codigo_penal_arg',
            keywords: ['codigo penal', 'argentino', 'legitima defensa', 'penas', 'territorialidad', 'reforma', 'fuerza de seguridad', 'usurpacion', 'ley 11179', 'corrupcion', 'imputabilidad'],
            responses: [
                { match: ['legitima defensa', 'requisitos', 'disparo'], text: "**Legítima Defensa (CP)** exige: A) Agresión ilegítima. B) Necesidad y racionalidad del medio empleado. C) Falta de provocación suficiente. *(Nota: Existen proyectos de reforma 2025/2026 para presumir a favor del policía el cumplimiento del deber si usa su arma reglamentariamente).* " },
                { match: ['penas', 'reclusion', 'prision'], text: "Las penas establecidas por el Libro I son: **Reclusión, Prisión, Multa e Inhabilitación**. Reclusión/Prisión temporal/perpetua se cumplen con trabajo obligatorio según el trato penitenciario." },
                { match: ['reforma', 'nuevo codigo', 'corrupcion', 'piquetes'], text: "El proyecto de **Nuevo Código Penal** impulsa penas endurecidas para: corrupción, fraudes con IA, usurpaciones, barrabravas y organizadores de piquetes, además de proteger la labor del agente de seguridad." },
                { match: ['menores', 'participacion', 'mayores'], text: "Si un delito es cometido mediante la participación de menores de 18 años, la escala penal para los *mayores* involucrados **aumenta en 1/3** del mínimo y máximo." },
                { match: ['ley benigna', 'retroactividad'], text: "Siempre se aplica, por principio de Derecho Penal, la **ley más benigna** al imputado." }
            ],
            default: "El Código Penal Argentino detalla los tipos penales y penas. El uso del arma y la legítima defensa están sujetos al requisito ineludible de proporcionalidad en la agresión. ¿Sobre qué delito necesitás la tipificación?"
        },
        {
            category: 'd4_logistica',
            keywords: ['logistica', 'd4', 'd-4', 'chaleco', 'chalecos', 'rb3', 'armamento', 'bersa', 'glock', 'taurus', 'combustible', 'ypf', 'ypf ruta', 'patrullero', 'patrulleros', 'taller', 'talleres', 'kilometraje', 'nafta', 'fmk-3', 'escopeta', '12/70', 'municion', 'municiones'],
            responses: [
                { match: ['chaleco', 'rb3', 'vencimiento', 'vence'], text: "🛡️ **Chalecos Antibalas RB3 (D-4)**:\n- **Nivel de Protección**: RB3 (resiste de forma certificada impactos calibre 9mm de alta velocidad y .357 Magnum).\n- **Vencimiento**: Tienen una validez oficial de **5 años** desde su fecha de fabricación.\n- **Asignación**: Se realiza de forma individual y nominativa mediante el número de serie. Es obligatorio su uso en todo servicio operativo y adicional." },
                { match: ['patrullero', 'taller', 'talleres', 'mantenimiento', 'kilometraje', 'movil', 'unidad'], text: "🚔 **Gestión de Patrulleros y Logística D-4**:\n- **Mantenimiento**: Todo service mecánico o reparación se coordina a través de la División Talleres de la Jefatura o talleres autorizados por la UR.\n- **Obligaciones**: Se debe realizar un control diario del estado de la unidad al tomar y entregar el turno (planillas de combustible, fluidos, luces y luces de emergencia).\n- **Kilometraje**: Registrar diariamente el millaje/kilometraje en el libro de guardia." },
                { match: ['combustible', 'ypf', 'ruta', 'pin', 'nafta'], text: "⛽ **Carga de Combustible - Tarjeta YPF Ruta (D-4)**:\n- **Autenticación**: Cada conductor habilitado tiene asignado un código PIN personal e intransferible.\n- **Procedimiento**: En la estación de servicio se debe presentar la tarjeta de la unidad, ingresar el PIN del chofer e informar obligatoriamente el kilometraje exacto del patrullero.\n- **Cargas irregulares**: Desvíos en los consumos o kilometraje inexacto inician sumario administrativo." },
                { match: ['armamento', 'bersa', 'glock', 'taurus', 'escopeta', 'fmk', 'mantenimiento', 'limpieza', 'portacion'], text: "🔫 **Armamento Reglamentario y Provisto (D-4)**:\n- **Pistola Provista**: Bersa Thunder 9mm, Taurus o Glock (según asignación de las unidades).\n- **Armas de Apoyo**: Subfusil FMK-3 (calibre 9mm) y Escopeta 12/70 para personal de grupos tácticos y patrulla.\n- **Mantenimiento**: La limpieza y lubricación periódica es obligación individual del agente. Está prohibido realizar modificaciones caseras al mecanismo de disparo o alzas.\n- **Portación**: La portación del arma reglamentaria y credencial es obligatoria tanto en servicio ordinario/adicional como fuera de servicio (salvo licencias médicas o suspensión)." }
            ],
            default: "El Departamento Logística (D-4) gestiona el armamento, chalecos antibalas RB3, combustible YPF Ruta y mantenimiento de patrulleros. ¿Qué consulta específica tenés sobre el equipamiento provisto?"
        }
    ];

    // ═══════════════════════════════════════════════════════════
    // CENTINELA AI — MOTOR DE INTELIGENCIA v10.2 (NLU Deep)
    // ═══════════════════════════════════════════════════════════

    // --- 1. CONTEXTO DE CONVERSACIÓN ---
    const sessionContext = {
        history: [],
        lastCategory: null,
        messageCount: 0,
        addTurn(category, query) {
            this.history.push({ category, query, ts: Date.now() });
            if (this.history.length > 5) this.history.shift();
            this.lastCategory = category;
            this.messageCount++;
        }
    };

    // --- 2. NORMALIZADOR UNIVERSAL ---
    function normalizeText(text) {
        return text.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?¿!¡"']/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }

    // --- 3. DICCIONARIO DE SINÓNIMOS / INTENCIONES NATURALES ---
    // Mapea frases coloquiales a la categoría correcta del knowledgeBase
    const synonymMap = [
        // --- SUELDOS & HABERES ---
        { phrases: ['cuanto cobro', 'cuanto gano', 'cuanto me pagan', 'cuanto es mi sueldo', 'plata que cobro', 'cobro poco', 'me pagan mal', 'cuanto me corresponde', 'cuanto cobran', 'cuanto ganan', 'cuanto pagan', 'cuanto esta el sueldo'], category: 'sueldos' },
        { phrases: ['aumento de sueldo', 'pido aumento', 'subio el sueldo', 'nos aumentaron', 'grilla salarial', 'escala salarial'], category: 'sueldos' },
        { phrases: ['cuanto cobra un oficial', 'cuanto gana un suboficial', 'cuanto gana un inspector', 'cuanto gana un comisario', 'cuanto gana un subinspector'], category: 'sueldos' },
        { phrases: ['que es el tap', 'la tarjeta alimentar', 'tarjeta de comida'], category: 'general_admin' },

        // --- LICENCIAS ---
        { phrases: ['me puedo tomar dias', 'necesito dias', 'pedir franco', 'dias por hijo', 'dias por casamiento', 'me enfermo', 'estoy enfermo', 'me siento mal', 'carpeta medica', 'tengo que ir al medico'], category: 'licencias' },
        { phrases: ['cuantos dias de vacaciones tengo', 'cuando me tocan vacaciones', 'me corresponden vacaciones'], category: 'licencias' },
        { phrases: ['se me murio un familiar', 'fallecio mi padre', 'fallecio mi madre', 'duelo', 'muerte de familiar'], category: 'licencias' },
        { phrases: ['tengo un examen', 'tengo que rendir', 'dias para estudiar', 'rindo parcial'], category: 'licencias' },
        { phrases: ['voy a ser papa', 'voy a ser padre', 'nacio mi hijo', 'dias por paternidad'], category: 'licencias' },
        { phrases: ['estoy embarazada', 'licencia por embarazo', 'cuando me toca la maternidad'], category: 'licencias' },

        // --- DISCIPLINA ---
        { phrases: ['me sancionaron', 'me van a sancionar', 'me pueden sancionar', 'me hicieron un sumario', 'tengo un sumario', 'me quieren suspender', 'me corrieron', 'me arrestaron', 'me mandaron preso', 'me dieron de baja'], category: 'disciplina' },
        { phrases: ['que pasa si me agarro el celular', 'puedo fumar en servicio', 'si llego tarde', 'falta leve', 'falta grave'], category: 'disciplina' },
        { phrases: ['como me defiendo', 'como hago un descargo', 'tengo derecho a defenderme', 'donde hago el descargo'], category: 'decreto_461_profundizado' },

        // --- JUBILACIÓN ---
        { phrases: ['me quiero jubilar', 'cuando me jubilo', 'cuanto me falta para jubilarme', 'cuantos años me faltan', 'cuanto me queda', 'me corresponde jubilarme'], category: 'prevision' },
        { phrases: ['cuanto va a ser mi jubilacion', 'cuanto voy a cobrar de jubilado', 'como se calcula la jubilacion'], category: 'prevision' },
        { phrases: ['aporte jubilatorio', 'cuanto me descuentan', 'me descuentan mucho'], category: 'prevision' },

        // --- ASCENSOS / ISEP ---
        { phrases: ['como asciendo', 'quiero ascender', 'cuando es el concurso', 'hay concurso', 'puedo ascender', 'me postulo', 'requisitos para ascender'], category: 'isep_ascensos' },
        { phrases: ['hay algun curso', 'tengo que hacer un curso', 'como me capacito', 'cursos disponibles', 'donde estudio'], category: 'isep_formacion' },
        { phrases: ['estoy en el listado', 'listado de habilitados', 'sali habilitado', 'estoy habilitado', 'me habilitaron', 'listado isep'], category: 'isep_documentos' },
        { phrases: ['manual para estudiar', 'material de estudio', 'que tengo que leer', 'de donde estudio', 'manual tecnicatura'], category: 'isep_documentos' },
        { phrases: ['novedades del isep', 'que hay de nuevo en el isep', 'nuevo del isep'], category: 'isep_actualidad_2026' },

        // --- PROCEDIMIENTOS OPERATIVOS ---
        { phrases: ['agarre un chorro', 'lo puedo detener', 'lo detengo', 'lo puedo parar', 'que hago si lo agarro en flagrancia', 'lo vi robando'], category: 'etaf_flagrancia_0800' },
        { phrases: ['me encontre con droga', 'encontre droga', 'tienen droga', 'hay un bunker', 'venden droga', 'punto de venta de droga'], category: 'microtrafico' },
        { phrases: ['tengo que preservar la escena', 'como acordono', 'llegue a un crimen', 'hay un muerto', 'encontre un cuerpo'], category: 'escena_del_crimen' },
        { phrases: ['tengo que allanar', 'necesito orden de allanamiento', 'puedo entrar sin orden', 'puedo entrar a la casa', 'requisa'], category: 'reforma_procesal_penal' },
        { phrases: ['controlar un auto', 'control vehicular', 'retener una moto', 'le retengo la moto', 'no tiene papeles', 'sin seguro', 'sin licencia'], category: 'control_vehicular_transito' },
        { phrases: ['violencia de genero', 'violencia domestica', 'le pega a la mujer', 'mujer golpeada', 'denuncia por violencia', 'la pareja le pega'], category: 'juridico_policial' },
        { phrases: ['cuando puedo disparar', 'puedo disparar', 'cuando uso el arma', 'uso de la fuerza', 'me amenaza con un arma', 'me apuntan'], category: 'uso_fuerza_armamento' },
        { phrases: ['que es el cuij', 'numero de causa', 'como identifico la causa'], category: 'actuaciones_mpa_general' },
        { phrases: ['trata de personas', 'explotacion sexual', 'prostitucion forzada'], category: 'trata_personas_protocolo' },

        // --- OBRA SOCIAL / SALUD ---
        { phrases: ['me cubre iapos', 'que me cubre', 'tengo cobertura', 'necesito ir al medico', 'necesito un turno', 'donde me atiendo', 'obra social'], category: 'iapos_salud' },
        { phrases: ['estoy mal', 'no puedo mas', 'tengo depresion', 'necesito un psicologo', 'salud mental', 'estres', 'me siento quemado', 'burnout'], category: 'bienestar_salud' },

        // --- TARIFAS ADICIONALES ---
        { phrases: ['cuanto me pagan la hora', 'cuanto vale la hora', 'tarifa del adicional', 'cuanto cobro un adicional', 'cuanto es la extraordinaria', 'cuanto es la ordinaria', 'precio del adicional'], category: 'osesp_spa_tarifas' },

        // --- TRANSPORTE ---
        { phrases: ['horario del colectivo', 'cuando sale el bondi', 'a que hora sale', 'hay colectivo', 'micro policial', 'transporte policial'], category: 'transporte' },

        // --- LEY 12521 ---
        { phrases: ['que dice la ley', 'ley de policia', 'derechos del policia', 'mis derechos', 'que articulo', 'estabilidad laboral'], category: 'ley_12521_profundizada' },

        // --- CÓDIGO PENAL / PROCESAL ---
        { phrases: ['legitima defensa', 'defensa propia', 'me puedo defender', 'si me atacan'], category: 'codigo_penal_arg' },
        { phrases: ['que es el cpp', 'codigo procesal', 'como actuo penalmente'], category: 'codigo_procesal_penal_sf' },

        // --- LOGÍSTICA D-4 ---
        { phrases: ['chaleco antibalas', 'cuanto dura el chaleco', 'chaleco rb3', 'cuando vence el chaleco', 'me dieron chaleco', 'serie del chaleco'], category: 'd4_logistica' },
        { phrases: ['patrullero roto', 'mantenimiento del movil', 'choque el patrullero', 'arreglar patrullero', 'taller policial', 'kilometraje del movil'], category: 'd4_logistica' },
        { phrases: ['tarjeta ypf', 'cargar nafta', 'tarjeta ypf ruta', 'pin ypf', 'combustible de patrullero'], category: 'd4_logistica' },
        { phrases: ['pistola reglamentaria', 'bersa 9mm', 'glock', 'taurus', 'limpiar arma', 'portar arma', 'credencial y arma', 'escopeta 12/70', 'fmk-3'], category: 'd4_logistica' },

        // --- ARMAS ---
        { phrases: ['como identifico un arma', 'que datos anoto del arma', 'clasificar un arma', 'calibre', 'numero de serie'], category: 'reglamentacion' },

        // --- JURISDICCIÓN ---
        { phrases: ['donde queda la ur', 'unidad regional', 'que ur me corresponde', 'cabecera'], category: 'jurisdiccion' },

        // --- RECURSOS WEB ---
        { phrases: ['pagina del isep', 'pagina de iapos', 'web del mpa', 'donde consulto', 'intranet', 'portal policial'], category: 'recursos_web_policiales' },
    ];

    // --- 4. STEMMER SIMPLE PARA ESPAÑOL ---
    function spanishStem(word) {
        if (word.length < 5) return word;
        return word
            .replace(/(cion|sion|mente|idad|ismo|ista|ario|ario|orio|amiento|imiento|acion|encia|ancia)$/i, '')
            .replace(/(ando|iendo|ar|er|ir|ado|ido|arse|erse|irse)$/i, '')
            .replace(/(es|as|os|is)$/i, '');
    }

    // --- 5. RENDERIZADOR MARKDOWN → HTML PROFESIONAL ---
    function renderMarkdown(text) {
        return text
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-primary underline hover:text-blue-300 transition-colors">$1</a>')
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 dark:text-white font-bold">$1</strong>')
            .replace(/^(\d+)\.\s+(.+)$/gm, '<div class="flex gap-2 my-1"><span class="text-primary font-bold shrink-0">$1.</span><span>$2</span></div>')
            .replace(/^[-•]\s+(.+)$/gm, '<div class="flex gap-2 my-1"><span class="text-primary shrink-0">▸</span><span>$1</span></div>')
            .replace(/\n/g, '<br>');
    }

    // --- 6. DETECTOR DE INTENCIÓN ---
    function detectIntent(msg) {
        const greetings = ['hola', 'buen dia', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches', 'que tal', 'como estas', 'hey', 'ey'];
        const thanks = ['gracias', 'muchas gracias', 'genial', 'perfecto', 'ok gracias', 'entendido', 'dale gracias', 'groso', 'barbaro', 'excelente', 'muy bien'];
        const confusions = ['no entiendo', 'no se', 'que haces', 'que podes hacer', 'que sabes', 'para que sirves', 'como funciona esto', 'ayuda', 'help', 'que temas manejas'];
        if (greetings.some(g => msg.includes(g))) return 'greeting';
        if (thanks.some(t => msg.includes(t))) return 'thanks';
        if (confusions.some(c => msg.includes(c))) return 'capabilities';
        return null;
    }

    // --- 7. RESPUESTAS DE INTENCIÓN ---
    const intentResponses = {
        greeting: () => {
            const hour = new Date().getHours();
            const greet = hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches';
            return `${greet}, oficial. Soy **Centinela AI v10**, tu asesor legal y operativo de la PSF.\n\nPodés preguntarme lo que necesites con tus palabras, no hace falta que uses términos técnicos. Algunos temas que manejo:\n- **Sueldos**: "¿Cuánto cobro?", "¿Cuánto gana un inspector?"\n- **Licencias**: "Necesito días", "Me enfermé"\n- **Ascensos**: "¿Cómo asciendo?", "Listado de habilitados"\n- **Procedimientos**: "Agarre un chorro", "Encontré droga"\n- **Salud/IAPOS**: "Necesito un psicólogo", "¿Qué me cubre?"\n- **Leyes**: Ley 12521, CPP, Código Penal\n\n¿Qué necesitás?`;
        },
        thanks: () => `De nada, oficial. Estoy disponible 24/7 para cualquier duda. Si no supe responder algo, ya le avisé al administrador para que me entrene mejor. 🫡`,
        capabilities: () => `Soy **Centinela AI v10**, especializado en la **Policía de Santa Fe**. Preguntame con tus palabras, sin formalidades:\n\n📋 **Temas que domino:**\n- Sueldos, haberes y tarifas de adicionales\n- Licencias (vacaciones, maternidad, enfermedad)\n- Ascensos y cursos del ISeP\n- Procedimientos operativos (flagrancia, uso de fuerza, drogas)\n- IAPOS, salud mental y bienestar\n- Leyes: 12521, CPP, Código Penal, Decreto 461\n- Transporte policial, jurisdicción y directorio\n\n💡 **Ejemplo**: En vez de "Decreto 4157 licencia paternidad", podés preguntar "¿Cuántos días me dan si nace mi hijo?"`
    };

    // --- 8. MOTOR DE SCORING AVANZADO CON NLU ---
    function scoreCategories(normalizedMsg) {
        const words = normalizedMsg.split(/\s+/).filter(w => w.length > 2);
        const msgTokens = new Set(words);
        const stemmedWords = words.map(w => spanishStem(w));
        const scored = [];

        // --- PASO 1: Synonym boost (natural phrases → category) ---
        const synonymBoosts = {};
        synonymMap.forEach(entry => {
            entry.phrases.forEach(phrase => {
                if (normalizedMsg.includes(phrase)) {
                    synonymBoosts[entry.category] = (synonymBoosts[entry.category] || 0) + 80;
                }
            });
        });

        knowledgeBase.forEach(cat => {
            let score = synonymBoosts[cat.category] || 0;
            let matchedKeywords = 0;

            cat.keywords.forEach(kw => {
                const normKw = normalizeText(kw);
                const kwWords = normKw.split(/\s+/);

                // Multi-word keyword: exact phrase match
                if (kwWords.length > 1 && normalizedMsg.includes(normKw)) {
                    score += 60;
                    matchedKeywords++;
                    return;
                }
                // Single-word keyword: exact token match
                if (kwWords.length === 1 && msgTokens.has(normKw)) {
                    score += (normKw.length > 7 || /\d+/.test(normKw)) ? 45 : 22;
                    matchedKeywords++;
                    return;
                }
                // Stem matching: compare stems for partial conjugation match
                if (kwWords.length === 1 && normKw.length >= 5) {
                    const kwStem = spanishStem(normKw);
                    if (kwStem.length >= 4 && stemmedWords.some(sw => sw === kwStem)) {
                        score += 15;
                        matchedKeywords++;
                    }
                }
            });

            // Context bonus
            if (sessionContext.lastCategory === cat.category) score += 10;

            // Coverage bonus
            const coverage = matchedKeywords / Math.max(cat.keywords.length, 1);
            if (coverage > 0.3) score += Math.round(coverage * 15);

            if (score > 0) scored.push({ cat, score, matchedKeywords });
        });

        return scored.sort((a, b) => b.score - a.score);
    }

    // --- 9. SELECTOR DE RESPUESTA ESPECÍFICA ---
    function selectResponse(cat, normalizedMsg) {
        let bestResponse = null;
        let bestMatchScore = -1;

        cat.responses.forEach(res => {
            let matchScore = 0;
            let totalTerms = res.match.length;
            let matchedTerms = 0;

            res.match.forEach(m => {
                const normM = normalizeText(m);
                if (normalizedMsg.includes(normM)) {
                    matchScore += 30;
                    matchedTerms++;
                }
            });

            // Bonus if ALL match terms were found
            if (totalTerms > 0 && matchedTerms === totalTerms) {
                matchScore += 20;
            }

            if (matchScore > bestMatchScore) {
                bestMatchScore = matchScore;
                bestResponse = res;
            }
        });

        if (bestMatchScore >= 30 && bestResponse) return bestResponse.text;
        return cat.default;
    }

    // --- 10. FUSIÓN MULTI-CATEGORÍA ---
    function fuseResponses(topResults, normalizedMsg) {
        if (topResults.length < 2) return null;
        const [first, second] = topResults;
        if (second.score >= 40 && (first.score - second.score) < 20 && first.cat.category !== second.cat.category) {
            const r1 = selectResponse(first.cat, normalizedMsg);
            const r2 = selectResponse(second.cat, normalizedMsg);
            if (r1 !== r2) return `${r1}\n\n---\n📌 **También relacionado (${second.cat.category.replace(/_/g, ' ')}):**\n${r2}`;
        }
        return null;
    }

    // --- 11. SUGERENCIAS CONTEXTUALES ---
    function generateSuggestions(category) {
        const map = {
            'sueldos': ['¿Cuánto gana un oficial?', '¿Hay plus por Rosario?', '¿Cuánto es el mínimo?'],
            'licencias': ['¿Cuántos días por paternidad?', '¿Vacaciones con 10 años?', 'Días por examen'],
            'disciplina': ['¿Qué es falta leve?', '¿Me pueden suspender?', '¿Cómo hago un descargo?'],
            'prevision': ['¿Cuándo me jubilo?', '¿Cuánto me descuentan?', '¿Cuánto voy a cobrar?'],
            'isep_ascensos': ['¿Cómo asciendo?', '¿Hay concurso 2025?', '¿Qué es la ID Ciudadana?'],
            'isep_formacion': ['¿Hay cursos virtuales?', 'Vacantes del Decreto 263', 'Tecnicatura 2026'],
            'isep_documentos': ['Listado de habilitados 2026', 'Manual de tecnicatura', 'Convocados ascenso 2025'],
            'isep_actualidad_2026': ['Novedades del ISeP', 'Egresados 2026', 'Curso de perfeccionamiento'],
            'haberes_servicios': ['¿Cuánto es la hora adicional?', 'Tarifa privada', 'Decreto 142'],
            'juridico_policial': ['¿Art. 268 del CPP?', 'Protocolo violencia de género', 'Flagrancia 0800'],
            'etaf_flagrancia_0800': ['Paso a paso del 0800', '¿Qué es flagrancia virtual?', 'Formulario ETAF'],
            'microtrafico': ['¿Cómo actúo en un búnker?', '¿Ley 14239 o 23737?', 'Narcomenudeo'],
            'narcotrafico_ley_23737': ['¿Competencia federal o provincial?', '¿Qué son precursores?', 'Fallo Arriola'],
            'actuaciones_mpa_general': ['¿Qué es el CUIJ?', '¿Cómo hago acta de secuestro?', 'Plazos de comunicación'],
            'osesp_spa_tarifas': ['Tarifa privada ordinaria', 'Alta complejidad pública', '¿Hora OSESP base?'],
            'iapos_salud': ['¿Cobertura salud mental?', '¿IAPOS para federales?', '¿Web de IAPOS?'],
            'bienestar_salud': ['¿Cómo pido ayuda?', '¿Dónde hay psicólogo?', 'Medicamentos gratis'],
            'uso_fuerza_armamento': ['¿Cuándo uso la Taser?', '¿Cuándo puedo disparar?', 'Res. 2237/25'],
            'ley_12521_profundizada': ['Art. 25 - Autoridad policial', 'Escala jerárquica', '¿Qué escalafones hay?'],
            'decreto_461_profundizado': ['¿Qué es falta grave?', '¿Cómo hago mi descargo?', 'Tribunal de Conducta'],
            'control_vehicular_transito': ['¿Cuándo retengo una moto?', '¿Qué documentos verifico?', 'Alcoholemia'],
            'recursos_web_policiales': ['Web del ISeP', 'Web de IAPOS', 'Portal del MPA'],
            'escena_del_crimen': ['¿Cómo preservo la escena?', 'Cadena de custodia', 'Bioseguridad'],
            'transporte': ['Horario Rosario-Vera', '¿Dónde para?', 'Vuelta Vera-Rosario'],
            'codigo_penal_arg': ['Legítima defensa', 'Reforma penal', 'Penas'],
            'codigo_procesal_penal_sf': ['¿Cuándo detengo?', 'Allanamiento', 'Derechos de la víctima'],
            'trata_personas_protocolo': ['¿Cómo identifico trata?', 'Protocolo de actuación', '¿Quién investiga?'],
            'general_admin': ['¿Qué es la TAP?', '0810 TAP', 'Alias CBU'],
            'reglamentacion': ['MIRAF', 'Identificar un arma', 'Uso racional'],
            'd4_logistica': ['¿Cuándo vence mi chaleco RB3?', 'Carga combustible YPF Ruta', 'Armamento reglamentario y provisto'],
            'jurisdiccion': ['¿Dónde queda la UR?', 'Listado de URs', 'Cabecera UR 2'],
            'codigo_faltas': ['Ruidos molestos', 'Código contravencional', 'Penas por falta'],
            'reforma_procesal_penal': ['Allanamiento urgente', 'Ley 14258', 'Plazos de detención'],
            'politica_actualidad': ['Equipamiento nuevo', 'Chalecos', 'Política criminal'],
        };
        return map[category] || [];
    }

    // --- 12. FALLBACK CON NOTIFICACIÓN AL ADMINISTRADOR ---
    function generateSmartFallback(normalizedMsg, topResults, originalMsg) {
        // Log the unanswered query to Supabase for admin review
        notifyAdminUnanswered(originalMsg, normalizedMsg, topResults);

        if (topResults.length > 0 && topResults[0].score >= 15) {
            const topCat = topResults[0].cat;
            const suggestions = generateSuggestions(topCat.category);
            const sugText = suggestions.length > 0 ? `\n\nProbá preguntando:\n- ${suggestions.join('\n- ')}` : '';
            return `Creo que tu consulta podría estar relacionada con **${topCat.category.replace(/_/g, ' ')}**, pero necesito que me des un poco más de detalle para darte la respuesta correcta.${sugText}\n\n📝 *Tu pregunta fue registrada para que el administrador me entrene mejor.*`;
        }
        return `No tengo información exacta para responder eso, pero **tu pregunta ya fue enviada al administrador** para que me entrene y pueda responderla en el futuro. 📝\n\nMientras tanto, probá preguntando de otra forma o sobre alguno de estos temas:\n- **Sueldos**: "¿Cuánto cobro?"\n- **Licencias**: "¿Cuántos días me corresponden?"\n- **Ascensos**: "¿Cómo asciendo?"\n- **Procedimientos**: "¿Qué hago si agarro a alguien robando?"\n- **Salud**: "Necesito un psicólogo"`;
    }

    // --- 13. NOTIFICADOR AL ADMINISTRADOR (Supabase) ---
    async function notifyAdminUnanswered(originalMsg, normalizedMsg, topResults) {
        try {
            const user = typeof auth !== 'undefined' && auth.currentUser ? auth.currentUser : null;
            const topGuess = topResults.length > 0 ? topResults[0].cat.category : 'ninguna';
            const topScore = topResults.length > 0 ? topResults[0].score : 0;

            await supabaseClient.from('unanswered_queries').insert([{
                user_email: user ? user.email : 'anónimo',
                original_query: originalMsg,
                normalized_query: normalizedMsg,
                closest_category: topGuess,
                closest_score: topScore,
                timestamp: new Date().toISOString(),
                status: 'pending'
            }]);
            console.log('📝 Consulta sin respuesta enviada al admin');
        } catch (e) {
            // Silently fail — don't break the UX
            console.warn('Admin notification failed (table may not exist yet):', e.message);
        }
    }

    // --- 11. CHIPS DE SUGERENCIA ---
    function renderSuggestionChips(suggestions) {
        if (!suggestions || suggestions.length === 0) return '';
        return `
        <div class="flex flex-wrap gap-2 mt-3 pt-3 border-t border-white/10">
            <span class="text-[9px] text-slate-500 w-full uppercase tracking-wider">Preguntas relacionadas:</span>
            ${suggestions.map(s => `
                <button onclick="document.getElementById('chat-input').value='${s.replace(/'/g, "\\'")}'; document.getElementById('centinela-form').dispatchEvent(new Event('submit', {bubbles:true,cancelable:true}))"
                    class="text-[10px] bg-primary/10 border border-primary/20 text-primary px-2 py-1 rounded-full hover:bg-primary/20 transition-all active:scale-95">
                    ${s}
                </button>
            `).join('')}
        </div>`;
    }

    // ═══ MANEJADOR PRINCIPAL ═══
    form.onsubmit = async (e) => {
        e.preventDefault();
        const msg = input.value.trim();
        if (!msg) return;

        appendMessage('user', msg);
        input.value = '';

        const thinkingId = 'thinking-' + Date.now();
        appendMessage('bot', '<span class="animate-pulse text-xs">Analizando consulta...</span>', thinkingId);

        setTimeout(() => {
            const el = document.getElementById(thinkingId);
            const normalizedMsg = normalizeText(msg);

            // --- A. ALERTA DE CRISIS ---
            const crisisKeywords = ['no doy mas', 'quiero morir', 'suicidio', 'morirme', 'no tiene sentido', 'terminar con todo', 'ganas de matarme', 'crisis'];
            if (crisisKeywords.some(kw => normalizedMsg.includes(kw))) {
                DB.addReview(0, `[CRISIS] ${msg}`);
            }

            // --- B. DETECCIÓN DE INTENCIÓN ---
            const intent = detectIntent(normalizedMsg);
            if (intent && intentResponses[intent]) {
                const intentText = intentResponses[intent]();
                el.innerHTML = `<div class="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">${renderMarkdown(intentText)}</div>`;
                chat.scrollTop = chat.scrollHeight;
                logQueryToAudit(msg, intentText, 100, intent);
                return;
            }

            // --- C. SCORING MULTI-PASS ---
            const topResults = scoreCategories(normalizedMsg);
            const CONFIDENCE_HIGH = 45;
            const CONFIDENCE_MED = 20;

            let finalResponseText = '';
            let usedCategory = 'desconocido';
            let confidence = 0;
            let suggestions = [];

            if (topResults.length > 0) {
                const best = topResults[0];
                confidence = best.score;
                usedCategory = best.cat.category;

                // --- D. FUSIÓN MULTI-CATEGORÍA ---
                const fused = (confidence >= CONFIDENCE_MED) ? fuseResponses(topResults, normalizedMsg) : null;
                finalResponseText = fused || selectResponse(best.cat, normalizedMsg);
                suggestions = generateSuggestions(usedCategory);
                sessionContext.addTurn(usedCategory, msg);
            }

            // --- E. FALLBACK INTELIGENTE ---
            if (!finalResponseText || confidence < CONFIDENCE_MED) {
                finalResponseText = generateSmartFallback(normalizedMsg, topResults, msg);
                usedCategory = 'fallback_inteligente';
                suggestions = [];
            }

            // --- F. BADGE DE CONFIANZA ---
            let confidenceBadge = '';
            if (confidence >= CONFIDENCE_HIGH) {
                confidenceBadge = `<span class="text-[9px] text-emerald-400 flex items-center gap-1 mb-2"><span class="material-symbols-outlined text-[11px]">verified</span>Alta confianza · ${usedCategory.replace(/_/g, ' ')}</span>`;
            } else if (confidence >= CONFIDENCE_MED) {
                confidenceBadge = `<span class="text-[9px] text-amber-400 flex items-center gap-1 mb-2"><span class="material-symbols-outlined text-[11px]">info</span>Confianza media · ${usedCategory.replace(/_/g, ' ')}</span>`;
            }

            // --- G. RENDER FINAL ---
            el.innerHTML = `
                <div class="space-y-1">
                    ${confidenceBadge}
                    <div class="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">${renderMarkdown(finalResponseText)}</div>
                    ${renderSuggestionChips(suggestions)}
                </div>`;

            chat.scrollTop = chat.scrollHeight;
            logQueryToAudit(msg, finalResponseText, confidence, usedCategory);
        }, 900);
    };

    async function logQueryToAudit(query, response, score, category) {
        const user = auth.currentUser;
        if (!user) return;
        try {
            await supabaseClient.from('query_logs').insert([{
                user_email: user.email,
                query: query,
                response: response,
                score: score,
                category: category
            }]);
        } catch (e) {
            console.error("Audit log failed:", e);
        }
    }

    function appendMessage(role, text, id = null) {
        const div = document.createElement('div');
        div.className = role === 'user' ? 'flex justify-end' : 'flex gap-3 max-w-[85%]';
        div.innerHTML = role === 'user' ? `
            <div class="bg-primary p-3 rounded-2xl rounded-tr-none max-w-[85%] shadow-lg shadow-primary/10">
                <p class="text-xs text-white font-medium leading-relaxed">${text}</p>
            </div>
        ` : `
            <div class="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <span class="material-symbols-outlined text-sm">smart_toy</span>
            </div>
            <div class="bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 p-3 rounded-2xl rounded-tl-none shadow-sm" id="${id || ''}">
                <p class="text-xs text-slate-900 dark:text-slate-200 leading-relaxed">${text}</p>
            </div>
        `;
        chat.appendChild(div);
        chat.scrollTop = chat.scrollHeight;
    }
}

function renderPartesInteligentes(container) {
    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center gap-4">
            <button onclick="router.navigateTo('#asistente')" class="p-2 -ml-2 text-slate-400 hover:text-slate-900 dark:text-white transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 class="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Partes Inteligentes</h1>
        </header>

        <main class="p-6 space-y-6 pb-32 max-w-md mx-auto animate-fade-in">
            <div class="px-1 space-y-1">
                <h2 class="text-xs font-bold text-slate-500 uppercase tracking-widest">Generador de Informes</h2>
                <p class="text-[11px] text-slate-400">Ingresá los datos clave y la IA redactará el parte formal.</p>
            </div>

            <section class="space-y-4">
                <div class="glass-card p-5 rounded-3xl border border-white/5 space-y-4">
                    <div class="space-y-2">
                        <label class="text-[10px] font-bold text-primary uppercase ml-1">Notas de Campo</label>
                        <textarea id="parte-raw-input" placeholder="Ej: Calle Mendoza 3000, 22hs, robo de cables..." 
                            class="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-slate-900 dark:text-white focus:ring-1 focus:ring-primary outline-none transition-all resize-none"></textarea>
                    </div>
                    <button onclick="generateParte()" id="btn-generate-parte" class="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-all">
                        <span class="material-symbols-outlined text-xl">auto_awesome</span>Generar Parte Formal
                    </button>
                </div>
                <div id="parte-result-container" class="hidden space-y-4">
                    <div class="glass-card p-5 rounded-3xl border border-primary/20 bg-primary/5 relative">
                        <pre id="parte-output" class="text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap font-sans leading-relaxed"></pre>
                        <button onclick="copyParte()" class="absolute top-4 right-4 size-10 rounded-xl bg-white/10 flex items-center justify-center text-slate-900 dark:text-white active:scale-90 transition-all">
                            <span class="material-symbols-outlined text-sm">content_copy</span>
                        </button>
                    </div>
                </div>
            </section>
        </main>
        ${renderBottomNav('asistente')}
    `;

    window.generateParte = () => {
        const input = document.getElementById('parte-raw-input').value.trim();
        if (!input) return showToast("Escribí algunas notas primero");

        const btn = document.getElementById('btn-generate-parte');
        btn.disabled = true;
        btn.innerHTML = `Redactando...`;

        setTimeout(() => {
            const container = document.getElementById('parte-result-container');
            const output = document.getElementById('parte-output');
            const now = new Date();
            
            // Professional Narrative Improvement
            const refinedInput = window.improvePoliceNarrative(input);
            
            let parte = `═══════════════════════════════════════\n`;
            parte += `   PARTIDO PREVENTIVO - POLICÍA DE SANTA FE\n`;
            parte += `═══════════════════════════════════════\n\n`;
            parte += `FECHA: ${now.toLocaleDateString('es-AR')} - HORA: ${now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}\n`;
            parte += `DEP: ${store.user?.dependency || 'UNIDAD OPERATIVA'}\n\n`;
            parte += `DETALLES DE LA INTERVENCIÓN:\n${refinedInput}\n\n`;
            parte += `───────────────────────────────\n`;
            parte += `Firma Funcionario: ${store.user?.name || '________________'}\n`;
            parte += `Legajo: ${store.user?.badge || '________'}\n\n`;
            parte += `Se traslada lo actuado a la Comisaría correspondiente para su prosecución legal.`;

            output.innerText = parte;
            container.classList.remove('hidden');
            btn.disabled = false;
            btn.innerHTML = `<span class="material-symbols-outlined text-xl">auto_awesome</span>Generar Parte Formal`;
            showToast("✅ Parte profesional redactado");
        }, 1500);
    };

    window.copyParte = () => {
        navigator.clipboard.writeText(document.getElementById('parte-output').innerText);
        showToast("Copiado al portapapeles");
    };
}

function renderVademecum(container) {
    const VADEMECUM_DATA = [
        {
            id: 'ruidos_molestos',
            title: 'Ruidos Molestos',
            type: 'convivencia',
            article: 'Art. 65 - Ley 13774',
            desc: 'Causar ruidos o sonidos que por su volumen, reiteración o persistencia excedan la normal tolerancia y afecten la tranquilidad pública.',
            checklist: [
                'Identificar al infractor y constatar el domicilio de origen.',
                'Tomar datos de al menos un testigo o denunciante afectado (mencionar la molestia).',
                'Medir o estimar la persistencia temporal (horarios de inicio y cese).',
                'Secuestro preventivo de equipos de sonido (si corresponde y el fiscal lo ordena).'
            ],
            fiscalGuide: '“Doctor, le informo que nos constituimos en [Dirección] por ruidos molestos reiterados provenientes de [Origen]. Entablamos comunicación con el morador [Nombre], quien hace caso omiso al pedido de cese. Contamos con declaración del denunciante [Nombre de vecino] quien manifiesta no poder descansar. Solicito directivas sobre el cese de la falta y secuestro de elementos.”'
        },
        {
            id: 'merodeo',
            title: 'Merodeo en zona urbana o rural',
            type: 'convivencia',
            article: 'Art. 110 - Ley 13774',
            desc: 'Permanencia en las inmediaciones de edificios o vehículos en actitud sospechosa, sin justificación razonable, portando herramientas o elementos idóneos para cometer delitos.',
            checklist: [
                'Describir detalladamente la actitud sospechosa previa en el acta de procedimiento.',
                'Identificar al masculino/femenino y consultar antecedentes mediante el sistema 911 (Lince).',
                'Secuestrar de forma preventiva elementos sospechosos (ganzúas, herramientas de efracción) bajo acta.',
                'Tomar declaración de vecinos que alertaron de la situación.'
            ],
            fiscalGuide: '“Doctor, procedimos a la identificación de un masculino en [Dirección] que se encontraba observando el interior de los vehículos estacionados portando [Herramienta]. Al consultarle motivos, no brinda justificación coherente. El sistema 911 informa que posee antecedentes por robo. Solicito directivas para traslado por Art. 110 de la Ley de Convivencia y secuestro de las herramientas.”'
        },
        {
            id: 'hurto',
            title: 'Hurto',
            type: 'penal',
            article: 'Art. 162 - Código Penal',
            desc: 'Apoderamiento ilegítimo de una cosa mueble, total o parcialmente ajena, realizado sin fuerza en las cosas ni violencia física en las personas.',
            checklist: [
                'Individualizar y secuestrar el elemento hurtado detallando marca, color y estado.',
                'Recibir declaración de la víctima y actas de constatación ocular del lugar.',
                'Relevamiento de cámaras de seguridad públicas o privadas en las inmediaciones.',
                'Identificación y aprehensión del sospechoso si es in fraganti.'
            ],
            fiscalGuide: '“Doctor, nos comunicamos desde la Comisaría [Número] por un hecho de Hurto en [Dirección]. La víctima [Nombre] constató la sustracción de [Objeto] sin mediar violencia. Tras patrullaje por la zona, aprehendimos a un masculino de características coincidentes en posesión del elemento. Solicito directivas sobre el estado de detención del masculino y entrega de los elementos a la víctima.”'
        },
        {
            id: 'robo',
            title: 'Robo',
            type: 'penal',
            article: 'Art. 164 - Código Penal',
            desc: 'Apoderamiento ilegítimo de una cosa mueble, total o parcialmente ajena, cometido con fuerza en las cosas o violencia física en las personas.',
            checklist: [
                'Fotografiar y detallar el daño físico en las cosas (puertas rotas, candados violentados, rejas dobladas).',
                'Constatar las lesiones de la víctima mediante médico policial.',
                'Secuestro del elemento utilizado para ejercer violencia (barretas, piedras, herramientas).',
                'Declaración testimonial de la víctima y de terceros que presenciaron el hecho.'
            ],
            fiscalGuide: '“Doctor, le informo un hecho de Robo en [Dirección]. El morador manifiesta que rompieron la puerta de ingreso y le sustrajeron [Objetos], propinándole un golpe en [Zona del cuerpo]. El sospechoso fue aprehendido a pocas cuadras con [Objetos] y [Herramienta]. Contamos con actas de constatación de daños. Solicito directivas respecto al aprehendido.”'
        },
        {
            id: 'resistencia_autoridad',
            title: 'Resistencia a la Autoridad',
            type: 'penal',
            article: 'Art. 239 - Código Penal',
            desc: 'Resistencia activa o desobediencia a un funcionario público en el ejercicio legítimo de sus funciones.',
            checklist: [
                'Describir con precisión la orden impartida (ej. "cese su actitud", "coloque las manos sobre el móvil").',
                'Detallar la agresión física o resistencia activa del sujeto (empujones, patadas, forcejeo), diferenciándola de la mera discusión verbal.',
                'Mencionar si hubo personal lesionado y constatar las lesiones con médico policial.',
                'Testigos del procedimiento (civiles ajenos a la fuerza si los hubiera).'
            ],
            fiscalGuide: '“Doctor, nos comunicamos por un hecho de Resistencia a la Autoridad en [Dirección]. En circunstancias de proceder a identificar al masculino [Nombre], el mismo se niega, arroja golpes de puño e intenta darse a la fuga, forcejeando con el personal policial. Logramos su reducción mediante la fuerza mínima indispensable. Solicito directivas sobre su fichaje y si queda aprehendido.”'
        },
        {
            id: 'amenazas',
            title: 'Amenazas',
            type: 'penal',
            article: 'Art. 149 bis - Código Penal',
            desc: 'Uso de amenazas para alarmar o amedrentar a una o más personas, o para obligar a otro a hacer, no hacer o tolerar algo contra su voluntad.',
            checklist: [
                'Declaración escrita detallada de la víctima indicando las palabras exactas o ademanes proferidos.',
                'Identificar si la amenaza se realizó verbalmente, por escrito o mediante el uso de algún elemento intimidante (cuchillo, arma, palo).',
                'Asegurar el secuestro del elemento intimidante si fue utilizado.',
                'Relevamiento de testigos presenciales directos de la intimidación.'
            ],
            fiscalGuide: '“Doctor, le informo un hecho de Amenazas en [Dirección]. La víctima [Nombre] da cuenta de que su vecino [Nombre] la amenazó de muerte manifestándole textualmente [Frase] mientras empuñaba [Elemento]. Constatamos el hecho y procedimos a la aprehensión del causante. Solicito directivas y orden de secuestro.”'
        }
    ];

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center gap-4">
            <button onclick="router.navigateTo('#asistente')" class="p-2 -ml-2 text-slate-400 hover:text-slate-900 dark:text-white transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 class="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Vademécum Procesal</h1>
        </header>

        <main class="p-6 space-y-6 pb-32 max-w-md mx-auto animate-fade-in">
            <div class="px-1 space-y-1">
                <h2 class="text-xs font-bold text-slate-500 uppercase tracking-widest">Código Penal y de Convivencia</h2>
                <p class="text-[11px] text-slate-400">Consulta de encuadre legal, checklists de evidencia y guías de llamada fiscal.</p>
            </div>

            <!-- Search and Filter -->
            <div class="space-y-3">
                <div class="glass-card flex items-center px-4 py-2 border border-white/10 rounded-2xl">
                    <span class="material-symbols-outlined text-slate-400 text-lg mr-2">search</span>
                    <input type="text" id="vademecum-search" placeholder="Buscar delito o artículo..." 
                        class="w-full bg-transparent border-none text-xs text-slate-900 dark:text-white focus:outline-none placeholder-slate-500 py-2" />
                </div>
                <div class="flex gap-2">
                    <button id="filter-all" onclick="window.setVademecumFilter('all')" class="px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase transition-all bg-primary text-white border border-primary/20">
                        Todos
                    </button>
                    <button id="filter-penal" onclick="window.setVademecumFilter('penal')" class="px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase transition-all bg-white/5 text-slate-400 border border-white/10 hover:text-white">
                        Código Penal
                    </button>
                    <button id="filter-convivencia" onclick="window.setVademecumFilter('convivencia')" class="px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase transition-all bg-white/5 text-slate-400 border border-white/10 hover:text-white">
                        Convivencia
                    </button>
                </div>
            </div>

            <!-- Results List -->
            <div id="vademecum-list" class="space-y-4"></div>
        </main>
        ${renderBottomNav('asistente')}
    `;

    let currentFilter = 'all';
    let searchQuery = '';

    window.setVademecumFilter = (filter) => {
        currentFilter = filter;
        const btnAll = document.getElementById('filter-all');
        const btnPenal = document.getElementById('filter-penal');
        const btnConv = document.getElementById('filter-convivencia');

        [btnAll, btnPenal, btnConv].forEach(btn => {
            if (btn) {
                btn.className = 'px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase transition-all bg-white/5 text-slate-400 border border-white/10 hover:text-white';
            }
        });

        if (filter === 'all' && btnAll) btnAll.className = 'px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase transition-all bg-primary text-white border border-primary/20';
        if (filter === 'penal' && btnPenal) btnPenal.className = 'px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase transition-all bg-primary text-white border border-primary/20';
        if (filter === 'convivencia' && btnConv) btnConv.className = 'px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase transition-all bg-primary text-white border border-primary/20';

        renderList();
    };

    const searchInput = document.getElementById('vademecum-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            renderList();
        });
    }

    function renderList() {
        const listContainer = document.getElementById('vademecum-list');
        if (!listContainer) return;

        const filtered = VADEMECUM_DATA.filter(item => {
            const matchesFilter = currentFilter === 'all' || item.type === currentFilter;
            const matchesSearch = item.title.toLowerCase().includes(searchQuery) || 
                                  item.article.toLowerCase().includes(searchQuery) ||
                                  item.desc.toLowerCase().includes(searchQuery);
            return matchesFilter && matchesSearch;
        });

        if (filtered.length === 0) {
            listContainer.innerHTML = `
                <div class="text-center py-10 space-y-2">
                    <span class="material-symbols-outlined text-slate-600 text-4xl">search_off</span>
                    <p class="text-xs text-slate-400 font-medium">No se encontraron artículos que coincidan.</p>
                </div>
            `;
            return;
        }

        listContainer.innerHTML = filtered.map(item => {
            const isPenal = item.type === 'penal';
            const badgeClass = isPenal ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
            const badgeText = isPenal ? 'Código Penal' : 'Ley 13774 Convivencia';
            
            const checklistHtml = item.checklist.map(step => `
                <div class="flex gap-2 items-start text-[10px] text-slate-400 leading-relaxed">
                    <span class="material-symbols-outlined text-emerald-400 text-sm shrink-0">check_circle</span>
                    <span class="font-medium">${step}</span>
                </div>
            `).join('');

            return `
                <div class="glass-card border border-white/5 rounded-3xl overflow-hidden transition-all duration-300">
                    <!-- Header trigger -->
                    <button onclick="window.toggleVademecumItem('${item.id}')" class="w-full text-left p-5 flex justify-between items-center bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                        <div class="space-y-1.5 pr-2">
                            <span class="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${badgeClass}">
                                ${badgeText}
                            </span>
                            <h3 class="font-bold text-slate-900 dark:text-white text-xs leading-tight">${item.title}</h3>
                            <span class="text-[10px] text-primary font-bold block">${item.article}</span>
                        </div>
                        <span id="icon-${item.id}" class="material-symbols-outlined text-slate-400 transition-transform duration-300">expand_more</span>
                    </button>

                    <!-- Body (Collapsed by default) -->
                    <div id="body-${item.id}" class="hidden p-5 border-t border-white/5 space-y-4 bg-black/10">
                        <div class="space-y-1">
                            <span class="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Definición Contravencional</span>
                            <p class="text-[11px] text-slate-400 leading-relaxed font-medium">${item.desc}</p>
                        </div>

                        <!-- Checklist -->
                        <div class="space-y-2.5">
                            <span class="text-[9px] font-bold text-primary uppercase tracking-wider block">📋 Checklist de Evidencia Física</span>
                            <div class="space-y-2">
                                ${checklistHtml}
                            </div>
                        </div>

                        <!-- Call to Fiscal -->
                        <div class="space-y-2.5">
                            <div class="flex justify-between items-center">
                                <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider">📞 Guía de Llamada al Fiscal</span>
                                <button onclick="window.copyFiscalGuide('${item.id}')" class="flex items-center gap-1 text-[9px] font-bold text-primary uppercase hover:text-white transition-colors">
                                    <span class="material-symbols-outlined text-xs">content_copy</span> Copiar
                                </button>
                            </div>
                            <div class="bg-white/5 border border-white/5 rounded-2xl p-4 text-[10px] text-slate-300 font-mono italic leading-relaxed relative">
                                <p id="guide-${item.id}">${item.fiscalGuide}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    window.toggleVademecumItem = (id) => {
        const body = document.getElementById(`body-${id}`);
        const icon = document.getElementById(`icon-${id}`);
        if (!body) return;

        if (body.classList.contains('hidden')) {
            body.classList.remove('hidden');
            icon.classList.add('rotate-180');
        } else {
            body.classList.add('hidden');
            icon.classList.remove('rotate-180');
        }
    };

    window.copyFiscalGuide = (id) => {
        const guideEl = document.getElementById(`guide-${id}`);
        if (guideEl) {
            navigator.clipboard.writeText(guideEl.innerText);
            showToast("Guía copiada al portapapeles");
        }
    };

    renderList();
}

function renderDictadoNovedades(container) {
    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center gap-4">
            <button onclick="router.navigateTo('#asistente')" class="p-2 -ml-2 text-slate-400 hover:text-slate-900 dark:text-white transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 class="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Dictado de Novedades</h1>
        </header>

        <main class="p-6 space-y-6 pb-32 max-w-md mx-auto animate-fade-in">
            <div class="px-1 space-y-1">
                <h2 class="text-xs font-bold text-slate-500 uppercase tracking-widest">Libro de Guardia por Voz</h2>
                <p class="text-[11px] text-slate-400">Dictá en lenguaje natural y la app estructurará la novedad policial formal.</p>
            </div>

            <!-- Dictation Box -->
            <section class="space-y-4">
                <div class="glass-card p-5 rounded-3xl border border-white/5 space-y-4">
                    <!-- Status / Microphone indicator -->
                    <div class="flex items-center justify-between text-[10px] px-1">
                        <span class="font-bold text-slate-500 uppercase tracking-wider">Estado del Micrófono</span>
                        <div class="flex items-center gap-1.5" id="dictado-status">
                            <span class="size-2 rounded-full bg-slate-600" id="status-dot"></span>
                            <span class="text-slate-400 font-bold uppercase" id="status-text">Apagado</span>
                        </div>
                    </div>

                    <!-- Visual Mic Area -->
                    <div class="flex justify-center py-6">
                        <div class="relative">
                            <!-- Outer pulsing ring (hidden by default) -->
                            <div id="mic-pulse" class="absolute inset-0 rounded-full bg-primary/20 scale-150 animate-ping hidden"></div>
                            <button id="btn-toggle-mic" onclick="window.toggleSpeechDictado()" class="relative z-10 size-20 rounded-full bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/25 active:scale-95 transition-all">
                                <span id="mic-icon" class="material-symbols-outlined text-3xl">mic</span>
                            </button>
                        </div>
                    </div>

                    <!-- Transcript Area -->
                    <div class="space-y-2">
                        <label class="text-[10px] font-bold text-primary uppercase ml-1">Transcripción del Dictado</label>
                        <textarea id="dictado-raw-text" placeholder="Presioná el micrófono y comenzá a hablar de forma natural... (ej. Vimos a un tipo robando cables y procedimos a la detención)" 
                            class="w-full h-36 bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-slate-900 dark:text-white focus:ring-1 focus:ring-primary outline-none transition-all resize-none"></textarea>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex gap-2">
                        <button onclick="window.clearDictado()" class="flex-1 py-3.5 bg-white/5 hover:bg-white/10 text-slate-400 font-bold rounded-2xl text-xs transition-colors">
                            Limpiar
                        </button>
                        <button onclick="window.structureDictado()" id="btn-structure" class="flex-[2] py-3.5 bg-primary text-white font-bold rounded-2xl text-xs shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-all">
                            <span class="material-symbols-outlined text-sm">auto_awesome</span>Estructurar Novedad
                        </button>
                    </div>
                </div>

                <!-- Structured Preview -->
                <div id="novedad-result-container" class="hidden space-y-4">
                    <div class="px-1">
                        <span class="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Novedad Estructurada Formal</span>
                    </div>
                    <div class="glass-card p-5 rounded-3xl border border-primary/20 bg-primary/5 relative">
                        <pre id="novedad-output" class="text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap font-sans leading-relaxed select-all pr-12"></pre>
                        <div class="absolute top-4 right-4 flex flex-col gap-2">
                            <button onclick="window.copyNovedad()" class="size-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-900 dark:text-white active:scale-90 transition-all shadow-sm">
                                <span class="material-symbols-outlined text-sm">content_copy</span>
                            </button>
                            <button onclick="window.shareNovedad()" class="size-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-900 dark:text-white active:scale-90 transition-all shadow-sm">
                                <span class="material-symbols-outlined text-sm">share</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        ${renderBottomNav('asistente')}
    `;

    // Check Speech Recognition support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;
    let isRecording = false;

    if (!SpeechRecognition) {
        // Update status indicating lack of browser support
        const statusText = document.getElementById('status-text');
        const statusDot = document.getElementById('status-dot');
        if (statusText) statusText.innerText = 'No Compatible';
        if (statusDot) statusDot.className = 'size-2 rounded-full bg-red-500';
    } else {
        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'es-AR';

        recognition.onstart = () => {
            isRecording = true;
            updateMicUI(true);
        };

        recognition.onresult = (event) => {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript + ' ';
                }
            }
            if (finalTranscript) {
                const textarea = document.getElementById('dictado-raw-text');
                if (textarea) {
                    textarea.value += finalTranscript;
                    textarea.scrollTop = textarea.scrollHeight;
                }
            }
        };

        recognition.onerror = (event) => {
            console.error("Speech Recognition Error:", event.error);
            if (event.error === 'not-allowed') {
                showToast("❌ Permiso denegado al micrófono.");
            } else {
                showToast("❌ Error de dictado: " + event.error);
            }
            isRecording = false;
            updateMicUI(false);
        };

        recognition.onend = () => {
            isRecording = false;
            updateMicUI(false);
        };
    }

    // Stop recording on hashchange (navigation away)
    const handleHashChange = () => {
        if (isRecording && recognition) {
            recognition.stop();
        }
        window.removeEventListener('hashchange', handleHashChange);
    };
    window.addEventListener('hashchange', handleHashChange);

    window.toggleSpeechDictado = () => {
        if (!recognition) {
            return showToast("Dictado por voz no disponible en este navegador. Escribí de forma manual.");
        }

        if (isRecording) {
            recognition.stop();
        } else {
            try {
                recognition.start();
            } catch (e) {
                console.error("Start speech error:", e);
                recognition.stop();
                setTimeout(() => {
                    try { recognition.start(); } catch (err) { console.error(err); }
                }, 200);
            }
        }
    };

    function updateMicUI(active) {
        const dot = document.getElementById('status-dot');
        const text = document.getElementById('status-text');
        const pulse = document.getElementById('mic-pulse');
        const icon = document.getElementById('mic-icon');
        const btn = document.getElementById('btn-toggle-mic');

        if (!dot || !text || !pulse || !icon || !btn) return;

        if (active) {
            dot.className = 'size-2 rounded-full bg-emerald-500 animate-pulse';
            text.innerText = 'Escuchando...';
            text.className = 'text-emerald-400 font-bold uppercase';
            pulse.classList.remove('hidden');
            icon.innerText = 'mic_off';
            btn.className = 'relative z-10 size-20 rounded-full bg-red-500 flex items-center justify-center text-white shadow-xl shadow-red-500/25 active:scale-95 transition-all';
        } else {
            dot.className = 'size-2 rounded-full bg-slate-600';
            text.innerText = 'Apagado';
            text.className = 'text-slate-400 font-bold uppercase';
            pulse.classList.add('hidden');
            icon.innerText = 'mic';
            btn.className = 'relative z-10 size-20 rounded-full bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/25 active:scale-95 transition-all';
        }
    }

    window.clearDictado = () => {
        const rawTextarea = document.getElementById('dictado-raw-text');
        if (rawTextarea) rawTextarea.value = '';
        const container = document.getElementById('novedad-result-container');
        if (container) container.classList.add('hidden');
    };

    window.structureDictado = () => {
        const rawTextarea = document.getElementById('dictado-raw-text');
        const rawText = rawTextarea ? rawTextarea.value.trim() : '';
        if (!rawText) return showToast("Primero dictá o ingresá un texto");

        if (isRecording && recognition) {
            recognition.stop();
        }

        const btn = document.getElementById('btn-structure');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = `Estructurando...`;
        }

        setTimeout(() => {
            const container = document.getElementById('novedad-result-container');
            const output = document.getElementById('novedad-output');
            const now = new Date();

            const refined = window.improvePoliceNarrative(rawText);

            let log = `═══════════════════════════════════════\n`;
            log += `   LIBRO DE GUARDIA DIGITAL - NOVEDAD\n`;
            log += `═══════════════════════════════════════\n\n`;
            log += `FECHA: ${now.toLocaleDateString('es-AR')} - HORA: ${now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}\n`;
            log += `DEP: ${window.store?.user?.dependency || 'UNIDAD OPERATIVA DE MÓVILES'}\n`;
            log += `ACTUANTE: ${window.store?.user?.name || 'FUNCIONARIO POLICIAL'} - LEGAJO: ${window.store?.user?.badge || 'N/A'}\n\n`;
            log += `DETALLE DE LA NOVEDAD:\n${refined}\n\n`;
            log += `───────────────────────────────\n`;
            log += `Estado de las actuaciones: Comunicado a la superioridad y fiscal de turno en caso de corresponder.`;

            if (output) output.innerText = log;
            if (container) container.classList.remove('hidden');
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = `<span class="material-symbols-outlined text-sm">auto_awesome</span>Estructurar Novedad`;
            }
            
            showToast("✅ Novedad estructurada en lenguaje forense");
        }, 1200);
    };

    window.copyNovedad = () => {
        const output = document.getElementById('novedad-output');
        if (output) {
            navigator.clipboard.writeText(output.innerText);
            showToast("Copiado al portapapeles");
        }
    };

    window.shareNovedad = async () => {
        const output = document.getElementById('novedad-output');
        if (!output) return;
        const text = output.innerText;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Novedad Policial',
                    text: text
                });
            } catch (e) {
                console.log("Share cancelled or failed", e);
            }
        } else {
            showToast("La función de compartir no es compatible con este navegador. Usá copiar.");
        }
    };
}

// Global Exports
window.renderAsistenteHub = renderAsistenteHub;
window.renderPartesInteligentes = renderPartesInteligentes;
window.renderVademecum = renderVademecum;
window.renderDictadoNovedades = renderDictadoNovedades;

window.showAnnouncementModal = () => {
    const currentVersion = 'v531.3-HARDENED';
    if (localStorage.getItem('last_announcement') === currentVersion) return;

    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-[100] bg-background-dark/80 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in';
    overlay.innerHTML = `
        <div class="glass-card max-w-sm w-full p-8 rounded-[40px] border border-primary/20 bg-gradient-to-b from-primary/10 to-transparent text-center space-y-6 relative overflow-hidden shadow-2xl">
            <div class="absolute -top-12 -right-12 size-40 bg-primary/20 blur-3xl"></div>
            <div class="size-20 bg-primary/20 rounded-3xl flex items-center justify-center text-primary mx-auto mb-4 animate-bounce">
                <span class="material-symbols-outlined text-4xl">celebration</span>
            </div>
            <div class="space-y-2">
                <h3 class="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic">¡v531.3-HARDENED Activa!</h3>
                <p class="text-xs text-slate-400 font-medium leading-relaxed">
                    🚀 **Centinela v10.2-SEC**: Lógica blindada y seguridad reforzada. Se implementó un **Content Security Policy (CSP)** riguroso y políticas de acceso (RLS) más estrictas.
                </p>
            </div>
            <button id="close-announcement" class="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 active:scale-95 transition-all uppercase tracking-widest text-xs">
                Explorar Ahora
            </button>
        </div>
    `;
    document.body.appendChild(overlay);

    overlay.querySelector('#close-announcement').onclick = () => {
        localStorage.setItem('last_announcement', currentVersion);
        overlay.remove();
    };
};

function renderFixtureMundial(container) {
    if (!container) container = document.getElementById('app');

    const matches = [
        { id: 'match_arg_can', group: 'Grupo A', date: 'Viernes 12/06/2026', time: '21:00 hs', team1: 'Argentina', flag1: '🇦🇷', team2: 'Canadá', flag2: '🇨🇦', phase: 'groups' },
        { id: 'match_per_chi', group: 'Grupo A', date: 'Sábado 13/06/2026', time: '19:00 hs', team1: 'Perú', flag1: '🇵🇪', team2: 'Chile', flag2: '🇨🇱', phase: 'groups' },
        { id: 'match_chi_arg', group: 'Grupo A', date: 'Jueves 18/06/2026', time: '21:00 hs', team1: 'Chile', flag1: '🇨🇱', team2: 'Argentina', flag2: '🇦🇷', phase: 'groups' },
        { id: 'match_per_can', group: 'Grupo A', date: 'Viernes 19/06/2026', time: '18:00 hs', team1: 'Perú', flag1: '🇵🇪', team2: 'Canadá', flag2: '🇨🇦', phase: 'groups' },
        { id: 'match_arg_per', group: 'Grupo A', date: 'Miércoles 24/06/2026', time: '21:00 hs', team1: 'Argentina', flag1: '🇦🇷', team2: 'Perú', flag2: '🇵🇪', phase: 'groups' },
        { id: 'match_can_chi', group: 'Grupo A', date: 'Miércoles 24/06/2026', time: '21:00 hs', team1: 'Canadá', flag1: '🇨🇦', team2: 'Chile', flag2: '🇨🇱', phase: 'groups' },
        
        // Final Phase
        { id: 'match_o1', group: 'Octavos de Final', date: 'Lunes 29/06/2026', time: '18:00 hs', team1: '1A (Argentina?)', flag1: '🇦🇷', team2: '2B', flag2: '🏳️', phase: 'playoffs' },
        { id: 'match_o2', group: 'Octavos de Final', date: 'Martes 30/06/2026', time: '21:00 hs', team1: '1B', flag1: '🏳️', team2: '2A', flag2: '🏳️', phase: 'playoffs' },
        { id: 'match_cf1', group: 'Cuartos de Final', date: 'Domingo 05/07/2026', time: '21:00 hs', team1: 'Ganador O1', flag1: '🏆', team2: 'Ganador O2', flag2: '🏆', phase: 'playoffs' },
        { id: 'match_sf1', group: 'Semifinal', date: 'Jueves 09/07/2026', time: '21:00 hs', team1: 'Ganador CF1', flag1: '🏆', team2: 'Ganador CF2', flag2: '🏆', phase: 'playoffs' },
        { id: 'match_final', group: 'Gran Final', date: 'Domingo 19/07/2026', time: '16:00 hs', team1: 'Por definir', flag1: '⚽', team2: 'Por definir', flag2: '⚽', phase: 'playoffs' }
    ];

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center gap-4">
            <button onclick="router.navigateTo('#asistente')" class="p-2 -ml-2 text-slate-400 hover:text-slate-900 dark:text-white transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 class="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Fixture Mundial 2026</h1>
        </header>

        <main class="p-6 space-y-6 pb-32 max-w-md mx-auto animate-fade-in">
            <!-- Sponsor Header (Smart Flow Digital) -->
            <div class="flex flex-col items-center justify-center p-5 bg-white/5 dark:bg-slate-900/50 rounded-3xl border border-white/5 text-center">
                <span class="text-[9px] text-slate-500 uppercase tracking-widest mb-1.5 font-bold">Presentado por</span>
                <div class="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950 border border-white/10 shadow-lg shadow-[#74ACDF]/10 active:scale-95 transition-transform cursor-pointer" onclick="window.open('https://smartflow.digital', '_blank')">
                    <span class="material-symbols-outlined text-[#74ACDF] text-base animate-pulse">waves</span>
                    <span class="text-xs font-black tracking-wider text-white">Smart<span class="text-[#74ACDF]">Flow</span></span>
                    <span class="text-[9px] font-bold text-slate-400">Digital</span>
                </div>
            </div>

            <!-- Segmented Control for Phases -->
            <div class="flex p-1.5 glass-card rounded-xl">
                <button id="btn-phase-groups" onclick="window.switchFixturePhase('groups')" 
                        class="flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all bg-primary text-white shadow-lg shadow-primary/20">
                    Fase de Grupos (Arg)
                </button>
                <button id="btn-phase-playoffs" onclick="window.switchFixturePhase('playoffs')" 
                        class="flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all text-slate-400 hover:text-white">
                    Fase Final
                </button>
            </div>

            <!-- Matches List -->
            <div id="fixture-list" class="space-y-4">
                <!-- Will be dynamically filled -->
            </div>

            <!-- Action Buttons -->
            <div class="grid grid-cols-2 gap-3 pt-2">
                <button onclick="window.saveFixtureProde()" class="w-full py-3.5 bg-primary text-white text-xs font-bold rounded-2xl shadow-lg shadow-primary/25 active:scale-95 transition-all">
                    Guardar Pronósticos
                </button>
                <button onclick="window.resetFixtureProde()" class="w-full py-3.5 bg-slate-800 text-slate-400 hover:text-white text-xs font-bold rounded-2xl border border-white/5 active:scale-95 transition-all">
                    Restablecer
                </button>
            </div>
            
            <!-- Sponsored footer -->
            <div class="text-center pt-4 border-t border-white/5 opacity-50">
                <p class="text-[10px] text-slate-500 font-mono">Smart Flow Digital © 2026 • Soporte al oficial de policía</p>
            </div>
        </main>
        ${renderBottomNav('asistente')}
    `;

    // Local Handlers
    let currentPhase = 'groups';

    window.switchFixturePhase = (phase) => {
        currentPhase = phase;
        
        // Update Buttons Styling
        const btnG = document.getElementById('btn-phase-groups');
        const btnP = document.getElementById('btn-phase-playoffs');
        if (phase === 'groups') {
            btnG.className = "flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all bg-primary text-white shadow-lg shadow-primary/20";
            btnP.className = "flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all text-slate-400 hover:text-white";
        } else {
            btnP.className = "flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all bg-primary text-white shadow-lg shadow-primary/20";
            btnG.className = "flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all text-slate-400 hover:text-white";
        }

        renderMatchesList();
    };

    const renderMatchesList = () => {
        const list = document.getElementById('fixture-list');
        if (!list) return;
        const filtered = matches.filter(m => m.phase === currentPhase);
        
        const savedScores = JSON.parse(localStorage.getItem('worldcup_prode') || '{}');

        list.innerHTML = filtered.map(m => {
            const score1 = savedScores[`${m.id}_1`] !== undefined ? savedScores[`${m.id}_1`] : '';
            const score2 = savedScores[`${m.id}_2`] !== undefined ? savedScores[`${m.id}_2`] : '';

            return `
                <div class="glass-card p-4 rounded-2xl border border-white/5 space-y-3 relative overflow-hidden animate-slide-up bg-gradient-to-b from-white/5 to-transparent">
                    <div class="flex justify-between items-center text-[10px] text-slate-500 font-black tracking-wider border-b border-white/5 pb-2">
                        <span>${m.group}</span>
                        <span>${m.date} • ${m.time}</span>
                    </div>
                    
                    <div class="flex items-center justify-between gap-2">
                        <!-- Team 1 -->
                        <div class="flex items-center gap-2 flex-1 min-w-0">
                            <span class="text-xl shrink-0">${m.flag1}</span>
                            <span class="text-xs font-bold text-slate-900 dark:text-white truncate">${m.team1}</span>
                        </div>
                        
                        <!-- Prediction Inputs -->
                        <div class="flex items-center gap-1.5 shrink-0 px-2">
                            <input type="number" min="0" placeholder="-" 
                                id="score_${m.id}_1" 
                                value="${score1}"
                                class="size-9 bg-slate-900/50 border border-white/10 rounded-xl text-center text-xs font-black text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none p-0">
                            <span class="text-xs text-slate-600 font-bold">:</span>
                            <input type="number" min="0" placeholder="-" 
                                id="score_${m.id}_2" 
                                value="${score2}"
                                class="size-9 bg-slate-900/50 border border-white/10 rounded-xl text-center text-xs font-black text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none p-0">
                        </div>
                        
                        <!-- Team 2 -->
                        <div class="flex items-center gap-2 flex-1 min-w-0 justify-end text-right">
                            <span class="text-xs font-bold text-slate-900 dark:text-white truncate">${m.team2}</span>
                            <span class="text-xl shrink-0">${m.flag2}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    };

    window.saveFixtureProde = () => {
        const savedScores = JSON.parse(localStorage.getItem('worldcup_prode') || '{}');
        
        matches.forEach(m => {
            const input1 = document.getElementById(`score_${m.id}_1`);
            const input2 = document.getElementById(`score_${m.id}_2`);
            
            if (input1 && input1.value !== '') {
                savedScores[`${m.id}_1`] = parseInt(input1.value);
            } else if (input1) {
                delete savedScores[`${m.id}_1`];
            }

            if (input2 && input2.value !== '') {
                savedScores[`${m.id}_2`] = parseInt(input2.value);
            } else if (input2) {
                delete savedScores[`${m.id}_2`];
            }
        });

        localStorage.setItem('worldcup_prode', JSON.stringify(savedScores));
        showToast("🏆 Pronósticos guardados con éxito");
    };

    window.resetFixtureProde = () => {
        if (confirm("¿Seguro que querés limpiar todos tus pronósticos del fixture?")) {
            localStorage.removeItem('worldcup_prode');
            renderMatchesList();
            showToast("Restablecido");
        }
    };

    // Load initial phase list
    renderMatchesList();
}

