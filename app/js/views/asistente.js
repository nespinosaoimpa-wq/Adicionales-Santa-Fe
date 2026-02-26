/**
 * Adicionales Santa Fe - Asistente Views
 */

function renderAsistenteHub(container) {
    if (!container) container = document.getElementById('app');

    const tools = [
        { id: 'centinela', title: 'Centinela AI', desc: 'Asistente legal entrenado con la Ley 12.521.', icon: 'smart_toy', color: 'from-primary to-blue-500', route: '#asistente/centinela', badge: 'Nuevo' },
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
                    <button type="submit" class="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-900 dark:text-white text-xs font-bold transition-all active:scale-95">
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
                        <h3 class="font-black text-slate-900 dark:text-white text-sm tracking-tight">Apoyá al Desarrollador</h3>
                        <p class="text-[10px] text-primary font-bold uppercase tracking-widest">Sustento del Proyecto</p>
                    </div>
                </div>
                <p class="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed mb-5">
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
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center gap-4">
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

        <main class="flex flex-col h-[calc(100vh-4rem)] bg-background-dark overflow-hidden">
            <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-4 pb-10">
                <div class="flex gap-3 max-w-[85%]">
                    <div class="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                        <span class="material-symbols-outlined text-sm">smart_toy</span>
                    </div>
                    <div class="bg-white/5 border border-white/5 p-3 rounded-2xl rounded-tl-none">
                        <p class="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                            Hola, soy Centinela. Estoy entrenado con la **Ley 12.521**, **Decreto 461**, **Reforma Previsional (Ley 14.283)**, las escalas salariales de **Febrero 2026 (Decreto 142/26)**, el **Código Procesal Penal (CPP) de Santa Fe**, el **Código Penal Argentino (CP)** y los últimos listados y manuales del **ISeP 2025/2026**.
                            <br><br>
                            ¿Qué duda reglamentaria, penal o de listados del ISeP tenés hoy?
                        </p>
                    </div>
                </div>
            </div>

            <div class="p-4 bg-slate-900/50 border-t border-white/5 pb-10">
                <form id="centinela-form" class="relative flex items-center gap-2">
                    <input type="text" id="chat-input" placeholder="Sueldos, jubilación, ascensos..." 
                        class="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:ring-1 focus:ring-primary outline-none transition-all pr-12">
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
            keywords: ['falta', 'sancion', 'arresto', 'suspension', 'disciplinario', 'sumario', 'asuntos internos', 'destitucion', 'decreto 461', 'reglamento', 'leves', 'graves', 'indisciplina', 'conducta'],
            responses: [
                { match: ['decreto 461', 'reglamento', 'especificos'], text: "El **Decreto 461/15** reglamenta la Ley 12521. Define faltas por negligencia, incumplimiento de órdenes y conductas que afecten el prestigio institucional." },
                { match: ['leves', 'celular', 'aseo', 'fumar', 'uniforme'], text: "Ejemplos de **faltas leves** (Dec. 461): descuido en el aseo o uniforme, fumar en servicio, uso indebido de celulares o falta de diligencia en el trámite. Tres leves pueden sumar una grave." },
                { match: ['graves', 'engaño', 'arma', 'indisciplina', 'colaboracion', 'droga'], text: "Ejemplos de **faltas graves** (Dec. 461): inducir a engaño al superior, uso arbitrario del arma de fuego, falta de colaboración con la justicia, consumo de estupefacientes o permitir indisciplina bajo su mando." },
                { match: ['defensa', 'recurso', 'descargo'], text: "Ante una sanción, tenés derecho a presentar un descargo por escrito en los plazos legales y solicitar vista del legajo. El Tribunal de Conducta Policial juzga las graves." }
            ],
            default: "El Régimen Disciplinario se rige por la Ley 12521 y el Decreto 461/15. ¿Tu duda es sobre el procedimiento, una falta leve o una grave?"
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
            keywords: ['microtrafico', 'droga', 'estupefacientes', 'bunker', 'venta', 'narcomenudeo', 'ley 14239', 'desfederalizacion', 'demolicion', 'procedimiento', 'protocolo', 'quiosco', 'sustancia'],
            responses: [
                { match: ['ley 14239', 'competencia', 'provincial'], text: "La **Ley 14.239** otorga competencia a la Provincia para investigar el narcomenudeo. Interviene la Unidad Fiscal Especial de Microtráfico del MPA." },
                { match: ['bunker', 'demolicion', 'derribo'], text: "Procedimiento: Bajo dirección fiscal, la policía puede adoptar medidas urgentes para hacer cesar el estado antijurídico, incluyendo la **demolición de búnkeres**." },
                { match: ['prioridad', 'calle'], text: "Se priorizan mercados abiertos, presencia de armas y casos donde el traficante participe en otros delitos graves." }
            ],
            default: "La Ley 14.239 de Microtráfico activa la competencia provincial y el derribo de puntos de venta. ¿Qué situación necesitás consultar?"
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
            keywords: ['listado', 'habilitados', 'habilitado', 'concurso', 'convocados', 'pdf', 'enlace', 'link', 'descargar', 'buscar', 'merito', 'suboficial', 'oficial', 'estudio', 'material', 'manual'],
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
            keywords: ['articulo 25', 'articulo 1', 'articulo 3', 'articulo 4', 'articulo 12', 'funciones policiales', 'autoridad policial', 'personal ejecucion', 'personal coordinacion', 'personal supervision', 'cuidar bienes', 'proporcionalidad', 'deberes y derechos', 'obedecer ordenar'],
            responses: [
                { match: ['art 1', 'articulo 1', 'objeto', 'ambito'], text: "**Art. 1 (Ley 12521)**: El personal policial se rige por esta ley en todo lo relativo a la organización, funcionamiento del servicio y las funciones de sus miembros. Las normas se interpretan en favor del bien común y la dignidad de la función." },
                { match: ['art 3', 'articulo 3', 'grados', 'jerarquia'], text: "**Art. 3 (Escala Jerárquica)** de Mayor a Menor:\n1. Director General de Policía\n2. Director de Policía\n3. Subdirector de Policía\n4. Comisario Supervisor\n5. Comisario\n6. Subcomisario\n7. Inspector\n8. Subinspector\n9. Oficial de Policía\n10. Suboficial de Policía" },
                { match: ['art 4', 'articulo 4', 'grupos', 'categorias'], text: "**Art. 4 (Agrupamientos)**: \n- **Ejecución**: Suboficial y Oficial.\n- **Coordinación**: Subinspector e Inspector.\n- **Supervisión**: Subcomisario y Comisario Supervisor.\n- **Dirección**: Subdirector, Director y Director General." },
                { match: ['art 12', 'articulo 12', 'escalafones', 'subescalafones'], text: "**Art. 12 (Escalafones)**:\n- **General**: Seguridad, Judicial, Investigación Criminal.\n- **Profesional**: Jurídico, Sanidad, Administración.\n- **Técnico**: Criminalista, Comunicaciones e Informática, Bombeiro, Música, Administrativo Técnico, Sanidad Técnico.\n- **Servicios**: Servicios Especializados y Mantenimiento." },
                { match: ['art 25', 'articulo 25', 'autoridad policial', 'funciones', 'que puedo hacer'], text: "**Art. 25 (Autoridad Policial)**: El personal del Escalafón General tiene autoridad para: defender la vida, libertad, propiedad e integridad de las personas; adoptar procedimientos para **prevenir el delito o interrumpir su ejecución**; identificar sospechosos y realizar aprehensiones en casos de flagrancia." },
                { match: ['derechos', 'estabilidad', 'propiedad grado'], text: "**Derechos del Art. 47**: El personal tiene derecho a: estabilidad en el empleo, **propiedad del grado**, percepción de haberes según escala, licencias, cobertura de salud (IAPOS), y acceso a formación profesional en el ISeP." }
            ],
            default: "Tengo conocimiento profundo de la Ley 12521. ¿Qué artículo específico, escalafón o agrupamiento necesitás consultar?"
        },
        {
            category: 'decreto_461_profundizado',
            keywords: ['decreto 461', 'falta', 'sancion', 'tribunal conducta', 'leve', 'grave', 'sumario', 'procedimiento disciplinario', 'defensa', 'plazo', 'descargo', 'asuntos internos', 'juzgamiento'],
            responses: [
                { match: ['que es', 'decreto 461', 'reglamento'], text: "El **Decreto 461/2015** (Régimen de Responsabilidad Administrativa del Personal Policial) reglamentó el Título II cap. 2 de la Ley 12521. Define faltas, sanciones, procedimiento y el **Tribunal de Conducta Policial** para juzgar las graves." },
                { match: ['faltas leves', 'leve', 'ejemplos'], text: "**FALTAS LEVES** (Dec. 461): Descuido en higiene personal o uniforme, fumar en servicio, uso indebido del celular, falta de puntualidad, no rendir novedades, trato incorrecto con ciudadanos. **Sanción**: Apercibimiento o hasta **10 días de arresto**. Tres leves equivalen a una grave." },
                { match: ['faltas graves', 'grave', 'ejemplos'], text: "**FALTAS GRAVES** (Dec. 461): Inducir a engaño al superior, uso arbitrario del arma, falta de colaboración con la justicia, consumo de estupefacientes, permitir indisciplina bajo su mando, actos deshonestos, conducta indecorosa, incumplimiento de orden legal. **Sanción**: 11 a 30 días de suspensión o destitución." },
                { match: ['descargo', 'defensa', 'plazo', 'recurso'], text: "Ante una sanción, tenés derecho a presentar **descargo escrito** en el plazo legal (generalmente 5 días hábiles desde la notificación). Podés solicitar vista del expediente. Para faltas graves, el **Tribunal de Conducta Policial** juzga el caso y podés ser asistido por abogado." },
                { match: ['tribunal conducta', 'que hace', 'como funciona'], text: "El **Tribunal de Conducta Policial** es el órgano que juzga las **faltas graves**. Está compuesto por oficiales superiores y emite resolución elevada al Director General para aplicar la sanción (suspensión o destitución). Se puede recurrir ante la Secretaría de RRHH." },
                { match: ['modificacion', '3268', 'decreto 3268', '2018'], text: "El **Decreto 3268/2018** modificó parcialmente el Dec. 461/2015, ajustando plazos y criterios para ciertos procedimientos. La reforma 2018 buscó acelerar la resolución de sumarios sin afectar el derecho de defensa." }
            ],
            default: "El Decreto 461/2015 regula el Régimen Disciplinario. Define faltas leves y graves, procedimientos y el Tribunal de Conducta. ¿Necesitás saber sobre sanciones, plazos o derecho de defensa?"
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
        }
    ];

    // ═══════════════════════════════════════════════════════════
    // CENTINELA AI — MOTOR DE INTELIGENCIA v9.0 (Deep Logic)
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
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?¿!¡]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }

    // --- 3. RENDERIZADOR MARKDOWN → HTML PROFESIONAL ---
    function renderMarkdown(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 dark:text-white font-bold">$1</strong>')
            .replace(/^(\d+)\.\s+(.+)$/gm, '<div class="flex gap-2 my-1"><span class="text-primary font-bold shrink-0">$1.</span><span>$2</span></div>')
            .replace(/^[-•]\s+(.+)$/gm, '<div class="flex gap-2 my-1"><span class="text-primary shrink-0">▸</span><span>$1</span></div>')
            .replace(/\n/g, '<br>');
    }

    // --- 4. DETECTOR DE INTENCIÓN ---
    function detectIntent(msg) {
        const greetings = ['hola', 'buen dia', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches', 'que tal', 'como estas'];
        const thanks = ['gracias', 'muchas gracias', 'genial', 'perfecto', 'ok gracias', 'entendido'];
        const confusions = ['no entiendo', 'no se', 'que haces', 'que podes hacer', 'que sabes', 'para que sirves'];
        if (greetings.some(g => msg.includes(g))) return 'greeting';
        if (thanks.some(t => msg.includes(t))) return 'thanks';
        if (confusions.some(c => msg.includes(c))) return 'capabilities';
        return null;
    }

    // --- 5. RESPUESTAS DE INTENCIÓN ---
    const intentResponses = {
        greeting: () => {
            const hour = new Date().getHours();
            const greet = hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches';
            return `${greet}, oficial. Soy **Centinela AI v9**, tu asesor legal y operativo de la PSF.\n\nPuedo consultarte sobre:\n- **Sueldos y Haberes** (Decreto 142/26, escalas)\n- **Ley 12521 y Decreto 461** (escalafón, sanciones, derechos)\n- **Procedimientos operativos** (flagrancia, MPA, ETAF 0800)\n- **IAPOS, OSESP y SPA** (salud, tarifas de adicionales)\n- **Leyes penales** (CPP, 23737, 14239)\n\n¿Qué necesitás consultar?`;
        },
        thanks: () => `De nada, oficial. Estoy disponible 24/7 para cualquier duda legal o de procedimiento. 🫡`,
        capabilities: () => `Soy **Centinela AI**, especializado en la **Policía de Santa Fe**. Puedo asesorarte sobre:\n- Ley 12521, Decreto 461 (personal policial)\n- Sueldos, OSESP, IAPOS, SPA\n- CPP, 23737, 14239 (leyes penales)\n- MPA, ETAF 0800, CUIJ\n- Uso de la fuerza (Res. 2237/25, Taser, Byrna)\n\nPreguntame lo que necesites con precisión.`
    };

    // --- 6. MOTOR DE SCORING AVANZADO ---
    function scoreCategories(normalizedMsg) {
        const words = normalizedMsg.split(/\s+/).filter(w => w.length > 2);
        const msgTokens = new Set(words);
        const scored = [];

        knowledgeBase.forEach(cat => {
            let score = 0;
            let matchedKeywords = 0;

            cat.keywords.forEach(kw => {
                const normKw = normalizeText(kw);
                const kwWords = normKw.split(/\s+/);

                if (kwWords.length > 1 && normalizedMsg.includes(normKw)) {
                    score += 60;
                    matchedKeywords++;
                    return;
                }
                if (msgTokens.has(normKw)) {
                    score += (normKw.length > 7 || /\d+/.test(normKw)) ? 45 : 22;
                    matchedKeywords++;
                    return;
                }
                for (const word of words) {
                    if (word.length >= 5 && normKw.length >= 4) {
                        if (normKw.includes(word) || word.includes(normKw)) {
                            score += 8;
                            break;
                        }
                    }
                }
            });

            if (sessionContext.lastCategory === cat.category) score += 15;
            if (sessionContext.history.slice(-3).some(h => h.category === cat.category)) score += 8;

            const coverage = matchedKeywords / Math.max(cat.keywords.length, 1);
            if (coverage > 0.3) score += Math.round(coverage * 20);

            if (score > 0) scored.push({ cat, score, matchedKeywords });
        });

        return scored.sort((a, b) => b.score - a.score);
    }

    // --- 7. SELECTOR DE RESPUESTA ESPECÍFICA ---
    function selectResponse(cat, normalizedMsg) {
        let bestResponse = null;
        let bestMatchScore = -1;

        cat.responses.forEach(res => {
            let matchScore = 0;
            res.match.forEach(m => {
                const normM = normalizeText(m);
                if (normalizedMsg.includes(normM)) matchScore += 30;
                else if (normM.length > 4 && normalizedMsg.split(' ').some(w => w.includes(normM) || normM.includes(w))) matchScore += 10;
            });
            if (matchScore > bestMatchScore) {
                bestMatchScore = matchScore;
                bestResponse = res;
            }
        });

        if (bestMatchScore > 0 && bestResponse) return bestResponse.text;
        return cat.default;
    }

    // --- 8. FUSIÓN MULTI-CATEGORÍA ---
    function fuseResponses(topResults, normalizedMsg) {
        if (topResults.length < 2) return null;
        const [first, second] = topResults;
        if (second.score >= 25 && (first.score - second.score) < 30) {
            const r1 = selectResponse(first.cat, normalizedMsg);
            const r2 = selectResponse(second.cat, normalizedMsg);
            if (r1 !== r2) return `${r1}\n\n---\n📌 **También relacionado (${second.cat.category.replace(/_/g, ' ')}):**\n${r2}`;
        }
        return null;
    }

    // --- 9. SUGERENCIAS CONTEXTUALES ---
    function generateSuggestions(category) {
        const map = {
            'haberes_sueldos': ['¿Básico de un Agente 2026?', '¿Cómo se calcula el presentismo?', '¿Qué es el FONID?'],
            'jubilacion_pension': ['¿Cuándo me jubilo con 30 años?', '¿Qué es la Ley 14283?', '¿Existe jubilación por invalidez?'],
            'juridico_policial': ['¿Art. 268 del CPP?', '¿Cuándo aprehendo sin orden?', 'Art. 147 CPP'],
            'microtrafico': ['¿Qué es una feria de droga?', '¿Ley 14239 o 23737?', '¿Cómo actúo en un búnker?'],
            'narcotrafico_ley_23737': ['¿Diferencia federal vs provincial?', '¿Qué son precursores?', 'Fallo Arriola CSJN'],
            'etaf_flagrancia_0800': ['Paso a paso del 0800', '¿Qué es flagrancia virtual?', 'Formulario ETAF'],
            'actuaciones_mpa_general': ['¿Qué es el CUIJ?', '¿Cómo hago acta de secuestro?', '¿Plazos para informar?'],
            'osesp_spa_tarifas': ['Tarifa privada ordinaria', 'Alta complejidad pública', '¿Cuánto es la hora OSESP base?'],
            'iapos_salud': ['¿Cobertura salud mental?', '¿IAPOS para fuerzas federales?', '¿Web de IAPOS?'],
            'uso_fuerza_armamento': ['¿Cuándo uso la Taser?', '¿Proporcionalidad en fuerza?', 'Res. 2237/25'],
            'ley_12521_profundizada': ['Art. 25 - Autoridad policial', 'Art. 3 - Escala jerárquica', '¿Qué escalafones hay?'],
            'decreto_461_profundizado': ['¿Qué es falta grave?', '¿Cómo hago mi descargo?', '¿Qué es el Tribunal de Conducta?'],
            'control_vehicular_transito': ['¿Cuándo reteneo una moto?', '¿Qué documentos verifico?', 'Alcoholemia positiva'],
            'recursos_web_policiales': ['Web del ISeP', 'Web de IAPOS', 'Portal del MPA'],
        };
        return map[category] || [];
    }

    // --- 10. FALLBACK INTELIGENTE ---
    function generateSmartFallback(normalizedMsg, topResults) {
        if (topResults.length > 0 && topResults[0].score >= 8) {
            const topCat = topResults[0].cat;
            return `Entiendo que tu consulta podría estar relacionada con **${topCat.category.replace(/_/g, ' ')}**. Para darte la respuesta exacta, ¿podrías especificar un poco más?\n\nAlgunos temas que manejo en esa área:\n- ${topCat.keywords.slice(0, 3).join(', ')}`;
        }
        return `No encontré información exacta para esa consulta. Probá mencionando:\n- El **número de ley** (ej: 12521, 23737, 14239)\n- El **tema** (sueldos, ascenso, flagrancia, IAPOS, OSESP)\n- O el **órgano** (MPA, ETAF, ISeP, Tribunal de Conducta)`;
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
                finalResponseText = generateSmartFallback(normalizedMsg, topResults);
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
                <p class="text-xs text-slate-900 dark:text-white leading-relaxed">${text}</p>
            </div>
        ` : `
            <div class="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <span class="material-symbols-outlined text-sm">smart_toy</span>
            </div>
            <div class="bg-white/10 border border-white/10 p-3 rounded-2xl rounded-tl-none" id="${id || ''}">
                <p class="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">${text}</p>
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
            let parte = `PARTIDO PREVENTIVO - POLICÍA DE SANTA FE\n`;
            parte += `FECHA: ${now.toLocaleDateString()} - HORA: ${now.toLocaleTimeString()}\n\n`;
            parte += `DETALLES SEGÚN NOVEDAD:\n${input.toUpperCase()}\n\n`;
            parte += `Se traslada lo actuado a la Comisaría correspondiente.`;

            output.innerText = parte;
            container.classList.remove('hidden');
            btn.disabled = false;
            btn.innerHTML = `Generar Parte Formal`;
            showToast("✅ Parte redactado");
        }, 1500);
    };

    window.copyParte = () => {
        navigator.clipboard.writeText(document.getElementById('parte-output').innerText);
        showToast("Copiado al portapapeles");
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
                <h3 class="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic">¡v527.4-FINAL Activa!</h3>
                <p class="text-xs text-slate-400 font-medium leading-relaxed">
                    🚀 **Centinela v3.8-SAFE**: Lógica blindada contra confusiones. Se activó el sistema de **Auditoría IA** para que el Administrador reciba reportes de entrenamiento basados en tus dudas reales.
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

