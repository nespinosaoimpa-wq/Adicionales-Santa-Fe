/**
 * Adicionales Santa Fe - Registro de Intervenciones
 * Timeline de novedades del turno y partes automáticos
 */

function renderIntervenciones(container) {
    if (!container) container = document.getElementById('app');

    // Retrieve interventions from local state for now
    let interventions = JSON.parse(localStorage.getItem('police_interventions') || '[]');

    const typeConfig = {
        'novedad': { icon: 'info', color: 'text-blue-400', bg: 'bg-blue-500/10' },
        'procedimiento': { icon: 'assignment_late', color: 'text-red-400', bg: 'bg-red-500/10' },
        'infraccion': { icon: 'warning', color: 'text-amber-400', bg: 'bg-amber-500/10' },
        'asistencia': { icon: 'health_and_safety', color: 'text-emerald-400', bg: 'bg-emerald-500/10' }
    };

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center gap-4">
            <button onclick="router.navigateTo('#asistente')" class="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <div class="flex flex-col">
                <h1 class="text-lg font-black text-white leading-none">Intervenciones</h1>
                <span class="text-[10px] text-primary font-bold uppercase tracking-widest">Timeline de Guardia</span>
            </div>
        </header>

        <main class="p-4 space-y-6 pb-32 max-w-md mx-auto view-transition">
            <div class="flex justify-between items-end px-1">
                <div class="space-y-1">
                    <p class="text-[11px] text-slate-400 leading-relaxed">Registro rápido cronológico del turno.</p>
                </div>
                <button onclick="window._shareTimelineWA()" class="px-3 py-1.5 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase flex items-center gap-1.5 active:scale-95 transition-all">
                    <span class="material-symbols-outlined text-sm">share</span>Parte WA
                </button>
            </div>

            <!-- Timeline -->
            <div class="relative space-y-4 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent" id="interventions-list">
                ${interventions.length === 0 ? `
                    <div class="text-center py-10 opacity-50">
                        <span class="material-symbols-outlined text-4xl mb-2">history_toggle_off</span>
                        <p class="text-xs">No hay intervenciones registradas</p>
                    </div>
                ` : interventions.map(inv => {
                    const conf = typeConfig[inv.type] || typeConfig['novedad'];
                    return `
                    <div class="relative flex items-start gap-4 group">
                        <div class="absolute left-0 mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-background-dark shadow-sm">
                            <span class="material-symbols-outlined text-lg ${conf.color}">${conf.icon}</span>
                        </div>
                        <div class="ml-14 flex-1 glass-card p-4 rounded-2xl border border-white/5 space-y-2">
                            <div class="flex justify-between items-start">
                                <span class="text-[10px] font-bold text-slate-400 bg-white/5 px-2 py-0.5 rounded-md">${inv.time}</span>
                                <span class="text-[9px] uppercase font-bold tracking-widest ${conf.color}">${inv.type}</span>
                            </div>
                            <p class="text-xs text-white leading-relaxed font-medium">${inv.desc}</p>
                            ${inv.loc ? `<p class="text-[10px] text-slate-500 flex items-center gap-1 mt-2"><span class="material-symbols-outlined text-[12px]">location_on</span> ${inv.loc}</p>` : ''}
                        </div>
                    </div>
                `}).join('')}
            </div>

            <!-- Add Button -->
            <button onclick="window._openAddIntervention()" class="fixed bottom-24 right-4 size-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center active:scale-90 transition-all z-40">
                <span class="material-symbols-outlined text-2xl">add</span>
            </button>
        </main>
        
        <!-- Add Modal -->
        <div id="add-intervention-modal" class="fixed inset-0 z-[100] bg-background-dark/90 backdrop-blur-sm hidden flex-col justify-end">
            <div class="bg-slate-900 border-t border-white/10 p-6 rounded-t-[32px] space-y-4 animate-slide-up">
                <div class="flex justify-between items-center mb-2">
                    <h3 class="text-sm font-bold text-white uppercase tracking-widest">Nueva Intervención</h3>
                    <button onclick="window._closeAddIntervention()" class="p-2 text-slate-400 hover:text-white"><span class="material-symbols-outlined">close</span></button>
                </div>
                
                <form id="intervention-form" class="space-y-4">
                    <div class="grid grid-cols-2 gap-3">
                        <div class="space-y-1.5">
                            <label class="text-[10px] font-bold text-primary uppercase ml-1">Hora</label>
                            <input type="time" id="inv-time" required class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:ring-1 focus:ring-primary outline-none">
                        </div>
                        <div class="space-y-1.5">
                            <label class="text-[10px] font-bold text-primary uppercase ml-1">Tipo</label>
                            <select id="inv-type" required class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:ring-1 focus:ring-primary outline-none appearance-none">
                                <option value="novedad">Novedad / Patrullaje</option>
                                <option value="procedimiento">Procedimiento</option>
                                <option value="infraccion">Infracción / Tránsito</option>
                                <option value="asistencia">Asistencia Médica</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="space-y-1.5">
                        <label class="text-[10px] font-bold text-primary uppercase ml-1">Ubicación</label>
                        <div class="relative">
                            <input type="text" id="inv-loc" placeholder="Ej: Av. San Martín y Bv. Seguí" class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:ring-1 focus:ring-primary outline-none pr-10">
                            <button type="button" onclick="window._getGPSLoc()" class="absolute right-2 top-1.5 p-1.5 text-primary hover:text-blue-400 transition-colors">
                                <span class="material-symbols-outlined text-lg">my_location</span>
                            </button>
                        </div>
                    </div>

                    <div class="space-y-1.5">
                        <label class="text-[10px] font-bold text-primary uppercase ml-1">Descripción (Breve)</label>
                        <textarea id="inv-desc" required placeholder="Sin novedad / Identificación positiva / Traslado..." class="w-full h-20 bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:ring-1 focus:ring-primary outline-none resize-none"></textarea>
                    </div>

                    <button type="submit" class="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 active:scale-95 transition-all mt-4">
                        Guardar Intervención
                    </button>
                </form>
            </div>
        </div>

        ${renderBottomNav('asistente')}
    `;

    // Set current time as default
    const now = new Date();
    document.getElementById('inv-time').value = now.toTimeString().slice(0,5);

    window._openAddIntervention = () => {
        document.getElementById('add-intervention-modal').classList.remove('hidden');
        document.getElementById('add-intervention-modal').classList.add('flex');
    };

    window._closeAddIntervention = () => {
        document.getElementById('add-intervention-modal').classList.add('hidden');
        document.getElementById('add-intervention-modal').classList.remove('flex');
    };

    window._getGPSLoc = () => {
        if (!navigator.geolocation) return showToast("GPS no soportado en este dispositivo");
        showToast("Obteniendo ubicación...");
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                document.getElementById('inv-loc').value = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
                showToast("✅ Ubicación obtenida");
            },
            (err) => {
                showToast("❌ Error al obtener GPS");
            },
            { enableHighAccuracy: true, timeout: 5000 }
        );
    };

    document.getElementById('intervention-form').onsubmit = (e) => {
        e.preventDefault();
        const inv = {
            id: Date.now().toString(),
            time: document.getElementById('inv-time').value,
            type: document.getElementById('inv-type').value,
            loc: document.getElementById('inv-loc').value.trim(),
            desc: document.getElementById('inv-desc').value.trim(),
            date: new Date().toISOString()
        };

        interventions.unshift(inv);
        // Sort by time descending
        interventions.sort((a,b) => b.time.localeCompare(a.time));
        
        localStorage.setItem('police_interventions', JSON.stringify(interventions));
        
        // Sync with Supabase in background if available
        if (window.DB && typeof window.DB.saveIntervention === 'function') {
            window.DB.saveIntervention(inv);
        }

        window._closeAddIntervention();
        showToast("✅ Intervención registrada");
        renderIntervenciones(container); // re-render
    };

    window._shareTimelineWA = () => {
        if (interventions.length === 0) return showToast("No hay intervenciones para compartir");
        
        let text = `*PARTE DE NOVEDADES - TURNO*\n`;
        text += `Fecha: ${new Date().toLocaleDateString('es-AR')}\n\n`;
        
        // Sort by time ascending for the report
        const sorted = [...interventions].sort((a,b) => a.time.localeCompare(b.time));
        
        sorted.forEach(i => {
            text += `🕒 *${i.time} hs* | ${i.type.toUpperCase()}\n`;
            if (i.loc) text += `📍 LUGAR: ${i.loc}\n`;
            text += `📝 ${i.desc}\n\n`;
        });

        text += `_Generado por Adicionales Santa Fe_`;
        window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
    };
}

window.renderIntervenciones = renderIntervenciones;
