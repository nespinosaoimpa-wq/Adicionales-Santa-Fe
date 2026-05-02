/**
 * Adicionales Santa Fe - Asistente Views
 */

function renderAsistenteHub(container) {
    if (!container) container = document.getElementById('app');

    const tools = [
        { id: 'actas', title: 'Actas Policiales', desc: 'Generá actas formales: allanamiento, custodia, procedimiento y más.', icon: 'description', color: 'from-red-500 to-rose-500', route: '#asistente/actas', badge: 'Nuevo' },
        { id: 'intervenciones', title: 'Intervenciones en Campo', desc: 'Registro en tiempo real y partes para WhatsApp.', icon: 'add_alert', color: 'from-blue-500 to-indigo-500', route: '#asistente/intervenciones', badge: 'Nuevo' },
        { id: 'procedimiento', title: 'Registro de Procedimiento', desc: 'GPS, fotos y generación de PDF estructurado.', icon: 'local_police', color: 'from-emerald-500 to-green-500', route: '#asistente/procedimiento', badge: 'Nuevo' },
        { id: 'archivos', title: 'Archivos Digitales', desc: 'Historial personal de actas y procedimientos.', icon: 'folder_open', color: 'from-amber-500 to-orange-500', route: '#asistente/archivos', badge: 'Nuevo' },
        { id: 'centinela', title: 'Centinela AI', desc: 'Asistente legal entrenado con la Ley 12.521.', icon: 'smart_toy', color: 'from-primary to-blue-500', route: '#asistente/centinela' },
        { id: 'partes', title: 'Partes Inteligentes', desc: 'Convierte notas en informes profesionales.', icon: 'edit_note', color: 'from-purple-500 to-indigo-500', route: '#asistente/partes' },
        { id: 'crono', title: 'Crono-Calendario', desc: 'Gestioná tus tercios y ciclos de guardia.', icon: 'calendar_month', color: 'from-emerald-500 to-teal-500', route: '#asistente/crono' },
        { id: 'directorio', title: 'Directorio Policial', desc: 'Números de emergencia interna.', icon: 'contact_phone', color: 'from-amber-500 to-orange-500', route: '#asistente/directorio' },
        { id: 'checklist', title: 'Checklist de Guardia', desc: 'Verificación de equipo esencial.', icon: 'fact_check', color: 'from-rose-500 to-pink-500', route: '#asistente/checklist' }
    ];

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center justify-between">
            <h1 class="text-xl font-bold text-white tracking-tight">Asistente Virtual</h1>
            <div class="flex items-center gap-2">
                ${store.user && store.user.role === 'admin' ? `
                    <button onclick="router.navigateTo('#admin')" class="size-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                        <span class="material-symbols-outlined text-xl">admin_panel_settings</span>
                    </button>
                ` : ''}
                <div class="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-lg shadow-primary/10">
                    <span class="material-symbols-outlined">smart_toy</span>
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
                            <div class="size-12 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 relative">
                                <span class="material-symbols-outlined text-2xl">${tool.icon}</span>
                                ${tool.badge ? `<span class="absolute -top-1 -right-1 flex h-3 w-3"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span><span class="relative inline-flex rounded-full h-3 w-3 bg-amber-500 border border-background-dark"></span></span>` : ''}
                            </div>
                            <div class="flex-1 space-y-1">
                                <h3 class="font-bold text-white group-hover:text-primary transition-colors">${tool.title}</h3>
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
                    <h3 class="font-bold text-white text-sm">Buzón de Sugerencias</h3>
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
                        class="w-full bg-white/5 border border-white/10 rounded-2xl p-3 text-xs text-white focus:ring-1 focus:ring-primary outline-none transition-all h-20 resize-none"></textarea>
                    <button type="submit" class="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all active:scale-95">
                        Enviar Reseña
                    </button>
                </form>
            </div>

            <!-- Donation Section -->
            <div class="mt-6 p-6 rounded-3xl bg-gradient-to-br from-primary/20 to-accent-cyan/10 border border-primary/20 shadow-xl shadow-primary/5 animate-fade-in">
                <div class="flex items-center gap-4 mb-4">
                    <div class="size-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                        <span class="material-symbols-outlined">volunteer_activism</span>
                    </div>
                    <div>
                        <h3 class="font-black text-white text-sm tracking-tight">Apoyá al Desarrollador</h3>
                        <p class="text-[10px] text-primary font-bold uppercase tracking-widest">Sustento del Proyecto</p>
                    </div>
                </div>
                <p class="text-[11px] text-slate-300 leading-relaxed mb-5">
                    Desarrollar sitios lleva tiempo, esfuerzo y frustración, como así también a veces las bases de datos generan gastos cuyo sustento corre por quien desarrolla la app. Esta app está pensada para hacer funcionales las tareas de los policías; si querés que sigamos creciendo, podés donar a nuestra cuenta:
                </p>
                <button onclick="window.showDonationModal()" class="w-full py-3.5 rounded-2xl bg-primary text-white font-bold text-xs shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-95 transition-all">
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
                <h2 class="text-xl font-black text-white">¡App Actualizada!</h2>
                <p class="text-xs text-slate-400 leading-relaxed">Bienvenido a la versión **Final (PRO)** con todas las funciones policiales habilitadas.</p>
            </div>

            <div class="space-y-3 text-left">
                <div class="flex gap-3 items-center p-3 rounded-2xl bg-white/5 border border-white/5">
                    <span class="material-symbols-outlined text-amber-500">smart_toy</span>
                    <p class="text-[11px] text-slate-200">**Centinela AI v2**: Base legal expandida y respuestas inteligentes para oficiales.</p>
                </div>
                <div class="flex gap-3 items-center p-3 rounded-2xl bg-white/5 border border-white/5">
                    <span class="material-symbols-outlined text-emerald-500">volunteer_activism</span>
                    <p class="text-[11px] text-slate-200">**Apoyo al Proyecto**: Nueva sección en Perfil para colaborar con el crecimiento.</p>
                </div>
                <div class="flex gap-3 items-center p-3 rounded-2xl bg-white/5 border border-white/5">
                    <span class="material-symbols-outlined text-purple-500">rate_review</span>
                    <p class="text-[11px] text-slate-200">**Buzón de Ideas**: Envíanos tus sugerencias directamente desde el Asistente.</p>
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
            <button onclick="router.navigateTo('#asistente')" class="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 class="text-xl font-bold text-white tracking-tight">Directorio Policial</h1>
        </header>

        <main class="p-6 space-y-4 pb-32 max-w-md mx-auto animate-fade-in">
            <!-- Search & Filter -->
            <div class="space-y-3">
                <div class="relative group">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-500 group-focus-within:text-primary transition-colors">search</span>
                    <input type="text" id="directory-search" placeholder="Buscar dependencia o número..." 
                        class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs text-white focus:ring-1 focus:ring-primary outline-none transition-all shadow-inner"
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
                                    <h3 class="font-bold text-white text-[12px] leading-tight line-clamp-1">${c.name}</h3>
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
            <button onclick="router.navigateTo('#asistente')" class="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 class="text-xl font-bold text-white tracking-tight">Checklist de Guardia</h1>
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
                        <span class="flex-1 text-sm font-medium text-slate-300">${item.label}</span>
                    </label>
                `).join('')}
            </div>

            ${renderAdBanner()}
        </main>
        ${renderBottomNav('asistente')}
    `;

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
            <button onclick="router.navigateTo('#asistente')" class="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 class="text-xl font-bold text-white tracking-tight">Crono-Calendario</h1>
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
                                    <h3 class="font-bold text-white group-hover:text-primary transition-colors">${c.name}</h3>
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
                        <p class="text-xs font-bold text-white">Servicio Activo</p>
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
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center gap-4">
            <button onclick="router.navigateTo('#asistente')" class="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <div class="flex flex-col">
                <h1 class="text-sm font-black text-white leading-none">Centinela AI</h1>
                <span class="text-[10px] text-primary flex items-center gap-1">
                    <span class="relative flex h-2 w-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Base Legal SF Actualizada
                </span>
            </div>
        </header>

        <main class="flex flex-col h-[calc(100vh-4rem)] bg-background-dark overflow-hidden">
            <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-4 pb-10">
                <div class="flex gap-3 max-w-[85%]">
                    <div class="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                        <span class="material-symbols-outlined text-sm">smart_toy</span>
                    </div>
                    <div class="bg-white/5 border border-white/5 p-3 rounded-2xl rounded-tl-none">
                        <p class="text-xs text-slate-200 leading-relaxed">
                            Hola, soy Centinela. Estoy entrenado con la **Ley 12.521**, el **Decreto 461**, la nueva **Reforma Previsional (Ley 14.283)** y las escalas salariales de **Febrero 2026 (Decreto 142/26)**.
                            <br><br>
                            ¿Qué duda reglamentaria o de haberes tenés hoy?
                        </p>
                    </div>
                </div>
            </div>

            <div class="p-4 bg-slate-900/50 border-t border-white/5 pb-10 space-y-3">
                <div id="quick-actions" class="flex flex-wrap gap-1.5">
                    <button onclick="window._quickAsk('¿Cómo hago una detención?')" class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-400 hover:text-white hover:border-primary/30 transition-all active:scale-95">🔒 Detención</button>
                    <button onclick="window._quickAsk('Números de emergencia')" class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-400 hover:text-white hover:border-primary/30 transition-all active:scale-95">📞 Emergencias</button>
                    <button onclick="window._quickAsk('Diferencia robo y hurto')" class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-400 hover:text-white hover:border-primary/30 transition-all active:scale-95">⚖️ Delitos</button>
                    <button onclick="window._quickAsk('Sueldos febrero 2026')" class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-400 hover:text-white hover:border-primary/30 transition-all active:scale-95">💰 Sueldos</button>
                    <button onclick="window._quickAsk('¿Cómo labrar un acta?')" class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-400 hover:text-white hover:border-primary/30 transition-all active:scale-95">📋 Actas</button>
                </div>
                <form id="centinela-form" class="relative flex items-center gap-2">
                    <input type="text" id="chat-input" placeholder="Sueldos, procedimientos, delitos, emergencias..." 
                        class="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-primary outline-none transition-all pr-12">
                    <button type="submit" class="absolute right-1 size-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 active:scale-90 transition-all">
                        <span class="material-symbols-outlined">send</span>
                    </button>
                </form>
                <p class="text-[9px] text-center text-slate-500 uppercase tracking-tighter">Centinela solo actúa bajo tu instrucción. Consultá siempre con tu superior jerárquico.</p>
            </div>
        </main>
    `;

    const form = document.getElementById('centinela-form');
    const input = document.getElementById('chat-input');
    const chat = document.getElementById('chat-messages');

    // Quick action handler
    window._quickAsk = (question) => {
        input.value = question;
        form.dispatchEvent(new Event('submit'));
    };

    const knowledgeBase = [
        {
            category: 'licencias',
            keywords: ['licencia', 'vacaciones', 'paternidad', 'maternidad', 'enfermedad', 'familiar', 'fallecimiento', 'estudio', 'licencias', 'ausentismo', 'salud laboral', 'medico', 'carpeta'],
            responses: [
                { match: ['salud laboral', 'ausentismo', 'nuevo sistema', 'seguimiento'], text: "Desde enero 2026 rige el **Sistema Integrado de Protección de la Salud Laboral**. Busca reducir el ausentismo mediante auditorías médicas más estrictas y un seguimiento digitalizado del personal con carpeta médica." },
                { match: ['paternidad', 'nacimiento', 'hijo'], text: "El **Decreto 4157/15** otorga **15 días corridos** por paternidad. Debes presentar el certificado de nacimiento en tu unidad." },
                { match: ['maternidad', 'embarazo', 'lactancia'], text: "La licencia por maternidad es de **90 días corridos**. También contempla períodos de lactancia tras el reintegro." },
                { match: ['vacaciones', 'anual', 'ordinaria', 'LAO'], text: "La **Licencia Anual Ordinaria** (Decreto 4157/15) se otorga por año vencido: 19 días (hasta 5 años), 25 días (hasta 15 años) o 35 días (más de 15 años). Son días hábiles." },
                { match: ['fallecimiento', 'duelo', 'muerte'], text: "Familiares directos (padres, hijos, cónyuge): **5 días corridos**. Otros familiares: **2 días**." },
                { match: ['estudio', 'examen'], text: "Te corresponden hasta **28 días anuales** para rendir exámenes de enseñanza media, terciaria o universitaria, con un máximo de 5 días por examen." }
            ],
            default: "El régimen de licencias (Decreto 4157/15) y el nuevo Sistema de Salud Laboral 2026 regulan tus descansos y justificaciones médicas."
        },
        {
            category: 'disciplina',
            keywords: ['falta', 'sancion', 'arresto', 'suspension', 'disciplinario', 'sumario', 'asuntos internos', 'destitucion'],
            responses: [
                { match: ['gorra', 'uniforme', 'aseo'], text: "El uso de la gorra es obligatorio y su omisión es una **falta leve** según el Decreto 461/15. La nueva gestión hace hincapié en la presencia policial." },
                { match: ['leves', 'apercibimiento', '10 dias'], text: "Las faltas leves conllevan apercibimiento o hasta **10 días de arresto**. No implican cese de funciones." },
                { match: ['graves', 'suspension', '30 dias', 'destitucion'], text: "Faltas graves: de 11 a 30 días de suspensión o destitución. El abandono de servicio es una falta grave de primer orden." },
                { match: ['defensa', 'recurso', 'descargo'], text: "Ante una sanción, tenés derecho a presentar un descargo por escrito en los plazos legales y solicitar vista del legajo." }
            ],
            default: "El Régimen Disciplinario se rige por el Decreto 461/15. ¿Tu duda es sobre una falta leve o grave?"
        },
        {
            category: 'sueldos',
            keywords: ['sueldo', 'salario', 'cobrar', 'cuanto gano', 'escala', 'decreto 142', 'haberes', 'porcentaje', 'aumento', 'patrullero', 'chofer'],
            responses: [
                { match: ['jerarquias', 'grados', 'escalon', 'carrera'], text: "La **Jerarquía Policial** (Ley 12521) se divide en: **Personal de Ejecución** (Suboficial, Oficial, Subinspector), **Coordinación** (Inspector, Subcomisario), **Supervisión** (Comisario, Com. Supervisor) y **Dirección** (Subdirector, Director, Director General)." },
                { match: ['escalafones', 'subescalafones', 'especialidad'], text: "Existen 3 Escalafones principales: **General** (Seguridad, Judicial, Investigaciones), **Profesional** (Jurídico, Sanidad, Adm.) y **Técnico** (Criminalística, Comunicaciones, Bomberos, Músicos)." },
                { match: ['sueldo oficial', 'cuanto gana un oficial', 'nivel 1', 'nivel 2', 'nivel 3'], text: "Sueldos Oficial (Neto Feb 2026):\n- **Nivel 1**: $2.050.018 (Cond.) / $1.800.018 (No Cond.)\n- **Nivel 2**: $1.800.018 (Cond.) / $1.550.018 (No Cond.)\n- **Nivel 3**: $1.700.018 (Cond.) / $1.450.018 (No Cond.)" },
                { match: ['sueldo subinspector', 'cuanto gana un subinspector'], text: "Sueldos Subinspector (Neto Feb 2026):\n- **Nivel 1**: $2.164.635 (Cond.) / $1.914.635 (No Cond.)\n- **Nivel 2**: $1.914.635 (Cond.) / $1.664.635 (No Cond.)\n- **Nivel 3**: $1.814.635 (Cond.) / $1.564.635 (No Cond.)" },
                { match: ['sueldo inspector', 'cuanto gana un inspector'], text: "Sueldos Inspector (Neto Feb 2026):\n- **Nivel 1**: $2.404.375 (Cond.) / $2.154.375 (No Cond.)\n- **Nivel 2**: $2.154.375 (Cond.) / $1.904.375 (No Cond.)\n- **Nivel 3**: $2.054.375 (Cond.) / $1.804.375 (No Cond.)" },
                { match: ['minimo', 'bolsillo', 'piso', 'percepcion'], text: "A febrero de 2026, el ingreso mínimo garantizado es de **$1.350.000**. El piso para personal operativo (incluyendo T.A.P) es de **$1.525.682**." },
                { match: ['rosario', 'santa fe', 'conflictividad', 'vgg', 'baigorria', 'santo tome'], text: "Se aplica un **Plus por Conflictividad de $500.000** en Rosario, Santa Fe, VGG, Baigorria y Santo Tomé para personal de calle, elevando el neto a **$1.938.835** para un suboficial operativo." },
                { match: ['maximas jerarquias', 'director', 'comisario'], text: "Escalas Superiores (Neto Feb 2026):\n- **Dir. General**: $6.573.262\n- **Director**: $5.241.901\n- **Subdirector**: $4.352.690\n- **Com. Supervisor**: $3.923.687\n- **Comisario**: $3.709.842\n- **Subcomisario**: $3.455.398" }
            ],
            default: "Las escalas salariales (Decreto 142/26) y la Planimetría Policial (Ley 12521) definen tus haberes según grado, nivel, escalafón y función (Conductor/No Cond.)."
        },
        {
            category: 'prevision',
            keywords: ['jubilacion', 'retiro', 'ley 14283', 'aportes', '30 años', 'caja', 'edad', 'emergencia', 'pension'],
            responses: [
                { match: ['ley 14283', 'reforma', 'emergencia'], text: "La **Ley 14.283 (Sep 2024)** declaró la emergencia previsional por 2 años. Los aportes subieron: **17%** para operativos y **18%** para jerarquías." },
                { match: ['calculo', 'promedio', '120 meses'], text: "El haber se calcula sobre el promedio de las últimas **120 remuneraciones** actualizadas (últimos 10 años), no los últimos 3 como antes." },
                { match: ['porcentaje', '30 años', '36 años', '82%'], text: "Haber ordinario: **70%** con 30 años de aportes. Sube un 2% por año extra hasta el tope del **82%** (con 36 años)." },
                { match: ['edad', 'limite'], text: "La reforma busca desalentar retiros prematuros. Aunque se mantienen regímenes específicos, el cálculo del haber premia la permanencia." },
                { match: ['solidario', 'aporte solidario'], text: "Se aplica un aporte del 2% al 6% para pasivos que ganen más de 3 mínimas. Este aporte es transitorio por la emergencia previsional." }
            ],
            default: "La Reforma Previsional (Ley 14.283) cambió aportes y el cálculo del haber (ahora sobre 120 meses). ¿Dudas sobre años o porcentaje?"
        },
        {
            category: 'isep_ascensos',
            keywords: ['isep', 'ascenso', 'concurso', '2024', '2025', '2026', 'id ciudadana', 'curso', 'llamado', 'vacantes', 'examen'],
            responses: [
                { match: ['ascenso 2024', 'pago'], text: "El **Concurso 2024** finalizó su etapa de evaluación (Decreto 2640). Los decretos de ascenso se están notificando para el pago retroactivo." },
                { match: ['ascenso 2025', 'jurado', 'vacantes'], text: "Para el **Ciclo 2025**, el Decreto 263/26 ya asignó jurados. Las vacantes se distribuyen según las necesidades de cada agrupamiento." },
                { match: ['id ciudadana', 'intranet', 'usuario', 'clave'], text: "Es **obligatorio** tener la **ID Ciudadana** vinculada a la Intranet para inscribirse y rendir los exámenes del ISEP. Sin ella no podés concursar." },
                { match: ['ingreso', 'inscripcion', '2026'], text: "ISEP abrió inscripciones a finales de 2025 para la Cohorte 2026. El curso propedéutico es virtual y eliminatorio." }
            ],
            default: "El ISEP gestiona los concursos de ascenso anuales y el ingreso a la fuerza. ¿Necesitás info sobre el concurso 2025 o ID Ciudadana?"
        },
        {
            category: 'transporte',
            keywords: ['colectivo', 'bondi', 'bus', 'transporte', 'viaje', 'parada', 'horario', 'rosario', 'vera', 'terminal', 'asiento', 'pasaje', 'exclusive'],
            responses: [
                { match: ['rosario', 'vera', 'ida'], text: "🚍 **Servicio Exclusivo Rosario -> Vera**:\n- Sale Rosario (Terminal): 09:00 hs\n- Llega Santa Fe: 11:30 hs\n- Sale Santa Fe: 12:00 hs\n- Recreo: 12:30 hs / San Justo: 14:05 hs\n- Calchaquí: 15:50 hs / Margarita: 16:10 hs\n- Final Vera (Terminal): 16:30 hs." },
                { match: ['vera', 'rosario', 'vuelta'], text: "🚍 **Servicio Exclusivo Vera -> Rosario**:\n- Sale Vera (Terminal): 23:00 hs\n- Margarita: 23:20 hs / Calchaquí: 23:40 hs\n- San Justo: 01:25 hs / Recreo: 03:00 hs\n- Llega Santa Fe: 03:30 hs\n- Sale Santa Fe: 04:00 hs\n- Final Rosario (Terminal): 06:30 hs." },
                { match: ['paradas', 'donde para', 'localidades'], text: "El servicio recorre: Rosario, Sta Fe, Recreo, Candioti, Nelson, Llambi Campbell, Cruce Emilia, Videla, San Justo, Ramayon, M. Escalada, Crespo, La Criolla, Vera y Pintado, Gomez Cello, Calchaquí, Margarita y Vera." }
            ],
            default: "Contamos con horarios del servicio exclusivo Rosario-Vera para personal policial. ¿Necesitás saber una hora o parada específica?"
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
            keywords: ['ley 12521', 'reglamento', 'mendoza', 'articulo', 'jerarquia', 'escalafon', 'subordinacion', 'protocolo', 'violencia de genero', '1818', 'seguridad publica', '12154', 'detencion', 'derechos', 'miraf', 'manual', 'procedimiento'],
            responses: [
                { match: ['1818', 'violencia', 'genero'], text: "El **Protocolo 1818/20** es ley para nosotros. Establece la actuación obligatoria en violencia de género: recepción de denuncia, no revictimización y desarme preventivo si el agresor es empleado policial." },
                { match: ['jerarquia', 'escalafon', 'planimetria'], text: "La **Planimetría Policial** (Ley 12.521) divide los escalafones en Seguridad, Profesional y Técnico. La verticalidad y subordinación son los pilares de nuestra doctrina operativa." },
                { match: ['seguridad publica', '12154'], text: "La **Ley de Seguridad Pública (12.154)** es el marco del sistema provincial. Define a la Policía como auxiliar de la justicia y establece los límites del uso racional de la fuerza." },
                { match: ['detencion', 'derechos'], text: "El Código Procesal Penal exige: lectura de derechos, información del motivo y permitir comunicación inmediata. El incumplimiento anula el procedimiento." },
                { match: ['miraf', 'manual', 'calle'], text: "El **Manual MIRAF** rige el patrullaje preventivo. Desde la identificación de personas hasta el uso de balizas, todo está procedimentado allí para tu seguridad jurídica." }
            ],
            default: "Tengo los protocolos de Violencia de Género (1818), Manual MIRAF y Ley de Seguridad Pública (12.154) cargados. ¿Qué procedimiento específico necesitás consultar?"
        },
        {
            category: 'bienestar_salud',
            keywords: ['salud mental', 'psicologo', 'estres', 'depresion', 'apoyo', 'bienestar', 'ayuda', 'contencion', 'familia', 'iapos', 'medicamentos', 'quemado', 'no doy mas', 'crisis', 'suicidio'],
            responses: [
                { match: ['plan provincial', '2026', 'cobertura'], text: "El **Plan Provincial de Salud Mental 2026** garantiza el **100% de cobertura en psicofármacos** vía IAPOS y atención psicológica gratuita en centros de bienestar policial." },
                { match: ['donde ir', 'urgencia', 'atencion'], text: "Podés ir a la **Dirección de Bienestar Policial** o solicitar intervención de la **Unidad de Gestión Tripartita**. La atención es confidencial y no afecta tu legajo si se trata a tiempo." },
                { match: ['medicamentos', 'receta', 'gratis'], text: "Por disposición de Salud Mental, las recetas de psiquiatría tienen cobertura total para el oficial y carga familiar directa sin necesidad de auditoría previa en casos críticos." }
            ],
            default: "Tu salud mental no se negocia. Tenés cobertura total de IAPOS y apoyo profesional en Bienestar Policial. Si sentís que no podés más, buscá ayuda; ya reporté tu situación al sistema de contención administrativo de forma silenciosa."
        },
        {
            category: 'isep_formacion',
            keywords: ['isep', 'curso', 'capacitacion', 'perfeccionamiento', 'tecnicatura', 'ascenso 2025', 'vacantes', 'estudio', 'examen', 'virtual'],
            responses: [
                { match: ['tecnicatura', '2026', 'propedutico'], text: "La **Tecnicatura Superior 2026** ya inició. El período propedéutico del 3 de febrero es clave para el ingreso a la carrera de 3 años con validez nacional." },
                { match: ['ascenso 2025', 'decreto 263'], text: "El **Decreto 263/26** fijó las vacantes para el Concurso de Ascenso 2025. Los jurados están evaluando antigüedad y desempeño operativo según el nuevo baremo." },
                { match: ['virtual', 'notebooklm', 'estudiar'], text: "Usá el Aula Virtual del ISEP. NotebookLM es una herramienta recomendada para procesar los textos de la Ley 12.521 y Decretos de Ascenso de forma rápida." }
            ],
            default: "El ISEP es el camino al ascenso. Consultá vacantes (Decreto 263) y cursos de perfeccionamiento en la Intranet con tu ID Ciudadana."
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
            category: 'general_admin',
            keywords: ['tap', 'tarjeta', 'alimentar', '0810', 'problema', 'pago', 'monto', 'cbu', 'alias'],
            responses: [
                { match: ['tap', 'alimentar', '0810'], text: "Atención T.A.P: **0810-222-7342**. El monto se actualiza mensualmente y es acumulable." },
                { match: ['alias', 'cbu', 'transferencia'], text: "Podés configurar tu **Alias/CVU** en tu perfil para que sea más fácil compartir tus datos de cobro a tus compañeros." }
            ],
            default: "¿Buscás info de la tarjeta T.A.P o ayuda con tu Alias de transferencia? Consultá la sección Perfil para lo segundo."
        },
        {
            category: 'procedimientos_campo',
            keywords: ['procedimiento', 'detencion', 'detener', 'requisa', 'requisar', 'cacheo', 'allanamiento', 'como hago', 'paso a paso', 'acta', 'labrar', 'actuar'],
            responses: [
                { match: ['detener', 'detencion', 'aprehender'], text: "**Procedimiento de Detención/Aprehensión:**\n1. Identificarse como personal policial\n2. Informar el motivo de la detención\n3. Lectura de derechos (Art. 212 CPP)\n4. Comunicar al fiscal de turno **inmediatamente**\n5. Labrar acta con testigos\n6. Trasladar a la dependencia\n\n⚠️ Plazo máximo sin orden judicial: **12 horas**. Superado ese plazo, comunicar al juez de garantías." },
                { match: ['requisa', 'cacheo', 'personal'], text: "**Requisa Personal (Art. 230 CPP):**\n1. Solo con **motivos fundados** de que oculta evidencia\n2. Realizarla con **testigos** (mínimo 1)\n3. Persona del **mismo sexo** que el requisado\n4. Informar al requisado el motivo\n5. Labrar acta detallada de elementos hallados\n6. Comunicar al fiscal si hay hallazgo positivo\n\n⚠️ Sin orden judicial solo en casos de urgencia o flagrancia." },
                { match: ['allanamiento', 'ingresar', 'domicilio'], text: "**Allanamiento de Domicilio:**\n- Requiere **orden judicial** (Art. 227 CPP)\n- Excepción sin orden: pedido de auxilio, persecución, incendio/catástrofe\n- Labrar acta con inventario completo\n- **Mínimo 2 testigos** del procedimiento\n- Filmar/fotografiar todo\n\n📋 Podés generar el acta desde **Asistente → Actas Policiales → Acta de Allanamiento**." },
                { match: ['acta', 'labrar', 'como hago'], text: "**¿Cómo labrar un acta correctamente?**\n1. Encabezado: fecha, hora, lugar, funcionario\n2. Descripción objetiva y cronológica de los hechos\n3. Datos de todos los intervinientes\n4. Testigos con nombre completo y DNI\n5. Inventario de secuestros (si aplica)\n6. Firmas de todos los participantes\n\n📋 Usá el módulo **Actas Policiales** en el Asistente para generar automáticamente el formato correcto." }
            ],
            default: "Tengo guías paso a paso para detenciones, requisas, allanamientos y cómo labrar actas. ¿Qué procedimiento necesitás consultar?"
        },
        {
            category: 'delitos_tipificacion',
            keywords: ['delito', 'robo', 'hurto', 'lesiones', 'homicidio', 'portacion', 'arma', 'amenaza', 'abuso', 'violacion', 'estafa', 'daño', 'usurpacion', 'diferencia', 'codigo penal'],
            responses: [
                { match: ['robo', 'hurto', 'diferencia'], text: "**Hurto vs Robo (Arts. 162-167 CP):**\n- **Hurto**: apoderamiento ilegítimo sin violencia ni fuerza. Pena: 1 mes a 2 años.\n- **Robo**: apoderamiento con **fuerza en las cosas** o **violencia física en las personas**. Pena: 1 mes a 6 años.\n- **Robo agravado** (con arma, en despoblado, banda): hasta 10 años." },
                { match: ['lesiones', 'golpes'], text: "**Lesiones (Arts. 89-94 CP):**\n- **Leves**: daño en el cuerpo o salud. Pena: 1 mes a 1 año.\n- **Graves**: debilitación permanente de sentido/órgano. Pena: 1 a 6 años.\n- **Gravísimas**: pérdida de sentido/órgano, incapacidad permanente. Pena: 3 a 10 años." },
                { match: ['portacion', 'tenencia', 'arma'], text: "**Portación y Tenencia de Armas (Ley 20.429):**\n- **Tenencia sin autorización**: 1 a 4 años\n- **Portación sin autorización**: 3 a 6 años (arma de fuego)\n- **Portación de arma de guerra**: 3,5 a 8,5 años\n\n⚠️ Los antecedentes del portador **agravan** la pena." },
                { match: ['amenaza', 'coaccion'], text: "**Amenazas y Coacciones (Arts. 149 bis/ter CP):**\n- **Amenazas simples**: 6 meses a 2 años\n- **Amenazas con arma**: 1 a 3 años\n- **Coacción**: obligar a hacer o no hacer algo. Pena: 2 a 4 años." },
                { match: ['daño', 'romper', 'destruir'], text: "**Daño (Art. 183 CP):** Destruir, inutilizar o hacer desaparecer cosa ajena. Pena: 15 días a 1 año. El **daño agravado** (incendio, explosión) tiene penas mayores." }
            ],
            default: "Tengo tipificaciones del Código Penal Argentino. ¿Necesitás info sobre un delito específico: robo, hurto, lesiones, portación de arma, amenazas?"
        },
        {
            category: 'numeros_asistencia',
            keywords: ['numero', 'telefono', 'llamar', 'emergencia', 'fiscal', 'fiscalia', 'defensoria', 'juzgado', 'bombero', 'ambulancia', 'asistencia', '911', '107', '100'],
            responses: [
                { match: ['emergencia', '911', 'urgencia'], text: "**Números de Emergencia:**\n📞 **911** - Emergencias Policiales\n🚑 **107** - SIES (Emergencias Médicas)\n🚒 **100** - Bomberos\n👶 **102** - Atención a Niñez\n👩 **144** - Violencia de Género\n🆘 **135** - Prevención del Suicidio\n📱 **0800-777-5000** - Ministerio de Seguridad" },
                { match: ['fiscal', 'fiscalia', 'MPA'], text: "**Fiscalías - Ministerio Público de la Acusación:**\n📞 **0800-555-0065** - MPA Central\n📞 Santa Fe: (0342) 457-3340\n📞 Rosario: (0341) 472-1540\n\nPara consultas fuera de horario, comunicarse con el **fiscal de turno** a través del 911." },
                { match: ['defensoria', 'defensor'], text: "**Defensoría del Pueblo:**\n📞 Santa Fe: (0342) 457-3933\n📞 Rosario: (0341) 472-1466\n📞 **0800-777-3368** - Línea gratuita" },
                { match: ['violencia', 'genero', '144'], text: "**Violencia de Género:**\n📞 **144** - Línea Nacional (24hs)\n📞 **0800-777-0000** - Línea Mujer Santa Fe\n\n⚠️ Recordá aplicar el **Protocolo 1818/20**: recepción obligatoria de denuncia, medidas de protección inmediata, y desarme preventivo si el agresor es personal policial." }
            ],
            default: "Emergencias: 911 (Policía), 107 (SIES), 100 (Bomberos), 144 (Violencia de Género). ¿Necesitás un número específico?"
        }
    ];

    // Quick actions for suggestions
    const quickActions = ['¿Cómo detener?', 'Sueldos 2026', 'Licencias', 'Números de emergencia', 'Robo vs Hurto', '¿Cómo labrar un acta?'];

    form.onsubmit = async (e) => {
        e.preventDefault();
        const msg = input.value.trim();
        if (!msg) return;

        appendMessage('user', msg);
        input.value = '';

        const thinkingId = 'thinking-' + Date.now();
        appendMessage('bot', '<span class="animate-pulse">Consultando memoria avanzada de Centinela...</span>', thinkingId);

        setTimeout(() => {
            const el = document.getElementById(thinkingId);
            const lowerMsg = msg.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const words = lowerMsg.split(/\s+/);

            // --- CRITICAL ALERT LOGIC (SILENT FOR ADMIN) ---
            const crisisKeywords = [
                'auxilio', 'ayuda por favor', 'no doy mas', 'quiero morir', 'suicidio', 'morirme',
                'quemado', 'estresado', 'estoy mal', 'terminar con todo', 'ayudame', 'ya fue todo',
                'ganas de matarme', 'no tiene sentido', 'llorar', 'crisis', 'ayuda urgente'
            ];
            const hasCrisis = crisisKeywords.some(kw => lowerMsg.includes(kw));
            if (hasCrisis) {
                // Envío silencioso al admin (usando la tabla de reseñas con prefijo especial)
                DB.addReview(0, `[CRITICAL-MH] El oficial reportó: "${msg}"`).then(() => {
                    console.log("⚠️ Alerta crítica enviada al Admin");
                });
            }
            // -----------------------------------------------

            let bestCategory = null;
            let bestResponseText = null;
            let maxTotalScore = 0;

            knowledgeBase.forEach(cat => {
                let categoryScore = 0;

                // 1. Scoring por palabras de la pregunta
                words.forEach(word => {
                    cat.keywords.forEach(kw => {
                        const normKw = kw.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                        // Match parcial o exacto
                        if (word.length > 3 && (normKw.includes(word) || word.includes(normKw))) {
                            categoryScore += 10;
                        } else if (word === normKw) {
                            categoryScore += 15;
                        }
                    });
                });

                if (categoryScore > 0) {
                    cat.responses.forEach(res => {
                        let responseScore = categoryScore;
                        res.match.forEach(m => {
                            const normM = m.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                            if (lowerMsg.includes(normM)) responseScore += 20;
                        });

                        if (responseScore > maxTotalScore) {
                            maxTotalScore = responseScore;
                            bestCategory = cat;
                            bestResponseText = res.text;
                        }
                    });

                    // Si no hubo un match específico, usar el default de la categoría más probable
                    if (!bestResponseText && categoryScore >= maxTotalScore) {
                        maxTotalScore = categoryScore;
                        bestCategory = cat;
                        bestResponseText = cat.default;
                    }
                }
            });

            // Lógica de desambiguación si hay varias categorías parecidas
            const finalResponse = bestResponseText || "Entiendo tu interés, pero para ser más preciso como asistente legal policial, ¿podrías mencionar algo sobre sueldos, jubilación (Ley 14283), horarios de colectivos o el Manual MIRAF?";

            el.innerHTML = `<p class="text-xs text-slate-200 leading-relaxed">${finalResponse}</p>`;
            chat.scrollTop = chat.scrollHeight;
        }, 1200);
    };

    function appendMessage(role, text, id = null) {
        const div = document.createElement('div');
        div.className = role === 'user' ? 'flex justify-end' : 'flex gap-3 max-w-[85%]';
        div.innerHTML = role === 'user' ? `
            <div class="bg-primary p-3 rounded-2xl rounded-tr-none max-w-[85%] shadow-lg shadow-primary/10">
                <p class="text-xs text-white leading-relaxed">${text}</p>
            </div>
        ` : `
            <div class="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <span class="material-symbols-outlined text-sm">smart_toy</span>
            </div>
            <div class="bg-white/10 border border-white/10 p-3 rounded-2xl rounded-tl-none" id="${id || ''}">
                <p class="text-xs text-slate-200 leading-relaxed">${text}</p>
            </div>
        `;
        chat.appendChild(div);
        chat.scrollTop = chat.scrollHeight;
    }
}

function renderPartesInteligentes(container) {
    // Diccionario de transformación de lenguaje informal → formal policial
    const FORMAL_DICT = [
        [/\bel tipo\b/gi, 'el masculino de referencia'],
        [/\bla mina\b/gi, 'la femenina de referencia'],
        [/\blos tipos\b/gi, 'los masculinos de referencia'],
        [/\bse escapo\b/gi, 'se dio a la fuga'],
        [/\bse escapó\b/gi, 'se dio a la fuga'],
        [/\bse fue\b/gi, 'se retiró del lugar'],
        [/\bse fue corriendo\b/gi, 'se dio a la fuga a pie'],
        [/\brobo\b/gi, 'hecho delictivo tipificado como robo'],
        [/\bhurto\b/gi, 'hecho delictivo tipificado como hurto'],
        [/\bpelea\b/gi, 'agresión física entre las partes'],
        [/\bgolpeo\b/gi, 'ejerció violencia física sobre'],
        [/\ble pego\b/gi, 'ejerció violencia física sobre la persona de'],
        [/\ble pegó\b/gi, 'ejerció violencia física sobre la persona de'],
        [/\bchoco\b/gi, 'colisionó'],
        [/\bchocó\b/gi, 'colisionó'],
        [/\bborracho\b/gi, 'en aparente estado de ebriedad'],
        [/\bdrogado\b/gi, 'en aparente estado de intoxicación'],
        [/\bamenazó\b/gi, 'profirió amenazas hacia'],
        [/\bamenazas\b/gi, 'intimidación pública'],
        [/\bpistola\b/gi, 'arma de fuego tipo pistola'],
        [/\bcuchillo\b/gi, 'arma blanca tipo cuchillo'],
        [/\bauto\b/gi, 'vehículo automotor'],
        [/\bmoto\b/gi, 'motovehículo'],
        [/\bbici\b/gi, 'bicicleta'],
        [/\bplata\b/gi, 'dinero en efectivo'],
        [/\bcelular\b/gi, 'teléfono celular'],
        [/\bdroga\b/gi, 'sustancia estupefaciente presuntamente ilícita'],
        [/\bfaso\b/gi, 'cigarrillo de sustancia presuntamente ilícita'],
        [/\bmarihuana\b/gi, 'sustancia vegetal presuntamente cannabis sativa'],
        [/\bcocaina\b/gi, 'sustancia presuntamente clorhidrato de cocaína'],
        [/\bcocaína\b/gi, 'sustancia presuntamente clorhidrato de cocaína'],
        [/\bmuerto\b/gi, 'persona sin signos vitales'],
        [/\bherido\b/gi, 'persona con lesiones visibles'],
        [/\bmenor\b/gi, 'persona menor de edad'],
        [/\bnene\b/gi, 'niño menor de edad'],
        [/\bnena\b/gi, 'niña menor de edad'],
        [/\bvecinos\b/gi, 'frentistas del lugar'],
        [/\bgritos\b/gi, 'manifestaciones verbales en alta voz'],
        [/\btiros\b/gi, 'detonaciones de arma de fuego'],
        [/\bdisparo\b/gi, 'detonación de arma de fuego'],
        [/\bpatrullero\b/gi, 'móvil policial'],
        [/\bcomisaria\b/gi, 'dependencia policial'],
        [/\bcomisaría\b/gi, 'dependencia policial'],
        [/\bllamaron\b/gi, 'se recepcionó comunicación'],
        [/\bllegamos\b/gi, 'se hizo presente el personal policial'],
    ];

    function formalizeText(raw) {
        let text = raw;
        FORMAL_DICT.forEach(([pattern, replacement]) => {
            text = text.replace(pattern, replacement);
        });
        // Capitalize first letter of each sentence
        text = text.replace(/(^\w|[.!?]\s*\w)/g, c => c.toUpperCase());
        return text;
    }

    const partTypes = [
        { id: 'novedad', label: 'Parte de Novedad' },
        { id: 'informe', label: 'Informe Policial' },
        { id: 'comunicado', label: 'Comunicado Interno' },
        { id: 'oficio', label: 'Oficio' }
    ];

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center gap-4">
            <button onclick="router.navigateTo('#asistente')" class="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <div class="flex flex-col">
                <h1 class="text-lg font-black text-white leading-none">Partes Inteligentes</h1>
                <span class="text-[10px] text-primary font-bold uppercase tracking-widest">Lenguaje Formal Policial</span>
            </div>
        </header>

        <main class="p-6 space-y-6 pb-32 max-w-md mx-auto view-transition">
            <div class="px-1 space-y-1">
                <p class="text-[11px] text-slate-400 leading-relaxed">Escribí tus notas de campo y el sistema las transformará en un documento con lenguaje formal, profesional y policial.</p>
            </div>

            <section class="space-y-4">
                <div class="glass-card p-5 rounded-3xl border border-white/5 space-y-4">
                    <div class="space-y-2">
                        <label class="text-[10px] font-bold text-primary uppercase ml-1">Tipo de Parte</label>
                        <div class="segmented-control">
                            ${partTypes.map((t, i) => `
                                <button type="button" onclick="window._setPartType('${t.id}')" class="parte-type-btn text-[10px] ${i === 0 ? 'active' : ''}" data-type="${t.id}">${t.label}</button>
                            `).join('')}
                        </div>
                        <input type="hidden" id="parte-type" value="novedad">
                    </div>
                    <div class="space-y-2">
                        <label class="text-[10px] font-bold text-primary uppercase ml-1">Notas de Campo</label>
                        <textarea id="parte-raw-input" placeholder="Ej: Llegamos a calle Mendoza 3000, 22hs, el tipo se escapó corriendo con un celular robado, los vecinos llamaron..."
                            class="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-white focus:ring-1 focus:ring-primary outline-none transition-all resize-none"></textarea>
                    </div>
                    <button onclick="generateParte()" id="btn-generate-parte" class="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-all">
                        <span class="material-symbols-outlined text-xl">auto_awesome</span>Generar Parte Formal
                    </button>
                </div>
                <div id="parte-result-container" class="hidden space-y-4">
                    <div class="glass-card p-5 rounded-3xl border border-primary/20 bg-primary/5 relative">
                        <pre id="parte-output" class="text-xs text-slate-200 whitespace-pre-wrap font-sans leading-relaxed"></pre>
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <button onclick="copyParte()" class="py-3 rounded-xl bg-white/10 text-white text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all">
                            <span class="material-symbols-outlined text-sm">content_copy</span>Copiar
                        </button>
                        <button onclick="window._shareParteWA()" class="py-3 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all">
                            <span class="material-symbols-outlined text-sm">share</span>WhatsApp
                        </button>
                    </div>
                </div>
            </section>

            <div class="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                <div class="flex gap-3 items-start">
                    <span class="material-symbols-outlined text-purple-400 text-lg mt-0.5">translate</span>
                    <div>
                        <p class="text-[11px] text-purple-200/80 leading-relaxed font-bold mb-1">Transformaciones automáticas</p>
                        <p class="text-[10px] text-slate-400 leading-relaxed">El sistema convierte automáticamente lenguaje coloquial a terminología policial formal. Ejemplo: <em>"el tipo se escapó"</em> → <em>"el masculino de referencia se dio a la fuga"</em></p>
                    </div>
                </div>
            </div>
        </main>
        ${renderBottomNav('asistente')}
    `;

    window._setPartType = (type) => {
        document.getElementById('parte-type').value = type;
        document.querySelectorAll('.parte-type-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.type === type);
        });
    };

    window.generateParte = () => {
        const input = document.getElementById('parte-raw-input').value.trim();
        if (!input) return showToast("Escribí algunas notas primero");

        const partType = document.getElementById('parte-type').value;
        const btn = document.getElementById('btn-generate-parte');
        btn.disabled = true;
        btn.innerHTML = `<span class="animate-pulse">Formalizando lenguaje...</span>`;

        setTimeout(() => {
            const resultContainer = document.getElementById('parte-result-container');
            const output = document.getElementById('parte-output');
            const now = new Date();
            const userName = store.user?.name || 'FUNCIONARIO POLICIAL';

            const formalizedBody = formalizeText(input);

            const typeHeaders = {
                novedad: 'PARTE DE NOVEDAD',
                informe: 'INFORME POLICIAL',
                comunicado: 'COMUNICADO INTERNO',
                oficio: 'OFICIO'
            };

            let parte = `═══════════════════════════════════════\n`;
            parte += `POLICÍA DE LA PROVINCIA DE SANTA FE\n`;
            parte += `${typeHeaders[partType] || 'PARTE DE NOVEDAD'}\n`;
            parte += `═══════════════════════════════════════\n\n`;
            parte += `FECHA: ${now.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}\n`;
            parte += `HORA: ${now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })} hs.\n`;
            parte += `FUNCIONARIO: ${userName}\n\n`;
            parte += `DETALLE DE LA NOVEDAD:\n`;
            parte += `${formalizedBody}\n\n`;
            parte += `Se eleva el presente a conocimiento de la Superioridad a los efectos que estime corresponder.\n\n`;
            parte += `───────────────────────────────\n`;
            parte += `${userName}\n`;
            parte += `Policía de la Pcia. de Santa Fe\n`;

            output.innerText = parte;
            resultContainer.classList.remove('hidden');
            btn.disabled = false;
            btn.innerHTML = `<span class="material-symbols-outlined text-xl">auto_awesome</span>Generar Parte Formal`;
            showToast("✅ Parte formalizado con éxito");
        }, 1200);
    };

    window.copyParte = () => {
        navigator.clipboard.writeText(document.getElementById('parte-output').innerText);
        showToast("✅ Copiado al portapapeles");
    };

    window._shareParteWA = () => {
        const text = document.getElementById('parte-output').innerText;
        window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
    };
}

// Global Exports
window.renderAsistenteHub = renderAsistenteHub;
window.renderPartesInteligentes = renderPartesInteligentes;

window.showAnnouncementModal = () => {
    const currentVersion = 'v527.4-FINAL';
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
                <h3 class="text-2xl font-black text-white tracking-tight uppercase italic">¡v527.4-FINAL Activa!</h3>
                <p class="text-xs text-slate-400 font-medium leading-relaxed">
                    🚀 **Centinela v3.5-MAX**: Toda la información de ISEP, Sueldos (Decreto 142) y Salud Mental 2026 integrada. ¡Nueva sección de **Alias/CBU** en tu Perfil!
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

