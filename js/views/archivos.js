/**
 * Adicionales Santa Fe - Archivos Digitales Personales
 * Módulo para ver el historial de documentos generados
 */

function renderArchivos(container) {
    if (!container) container = document.getElementById('app');

    // Retrieve data from local storage
    const actas = JSON.parse(localStorage.getItem('police_actas') || '[]');
    const procedimientos = JSON.parse(localStorage.getItem('police_procedures') || '[]');
    
    // Sort all by date descending
    actas.sort((a, b) => new Date(b.date) - new Date(a.date));
    procedimientos.sort((a, b) => new Date(b.date) - new Date(a.date));

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center gap-4">
            <button onclick="router.navigateTo('#asistente')" class="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <div class="flex flex-col">
                <h1 class="text-lg font-black text-white leading-none">Archivos Digitales</h1>
                <span class="text-[10px] text-primary font-bold uppercase tracking-widest">Documentos Personales</span>
            </div>
        </header>

        <main class="p-4 space-y-6 pb-32 max-w-md mx-auto view-transition">
            <div class="px-1 space-y-1">
                <p class="text-[11px] text-slate-400 leading-relaxed">Historial de actas y procedimientos generados en este dispositivo.</p>
            </div>

            <!-- Tabs -->
            <div class="flex bg-white/5 p-1 rounded-xl border border-white/5">
                <button onclick="window._switchTab('actas')" id="tab-actas" class="flex-1 py-2 text-xs font-bold rounded-lg bg-primary text-white shadow-lg shadow-primary/20 transition-all">Actas</button>
                <button onclick="window._switchTab('procedimientos')" id="tab-procedimientos" class="flex-1 py-2 text-xs font-bold rounded-lg text-slate-400 hover:text-white transition-all">Procedimientos</button>
            </div>

            <!-- Tab Content: Actas -->
            <div id="content-actas" class="space-y-3">
                ${actas.length === 0 ? `
                    <div class="text-center py-10 opacity-50">
                        <span class="material-symbols-outlined text-4xl mb-2">description</span>
                        <p class="text-xs">No hay actas guardadas</p>
                    </div>
                ` : actas.map((acta, i) => `
                    <div class="glass-card p-4 rounded-2xl border border-white/5 flex flex-col gap-3">
                        <div class="flex justify-between items-start">
                            <div>
                                <span class="text-[9px] uppercase font-bold text-primary block">${acta.tipo}</span>
                                <span class="text-xs text-white font-bold">${new Date(acta.date).toLocaleDateString('es-AR')} ${new Date(acta.date).toLocaleTimeString('es-AR', {hour: '2-digit', minute: '2-digit'})}</span>
                            </div>
                            <button onclick="window._viewActa(${i})" class="px-3 py-1 rounded-lg bg-white/10 text-[10px] text-white font-bold hover:bg-white/20 transition-colors">Ver</button>
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- Tab Content: Procedimientos -->
            <div id="content-procedimientos" class="space-y-3 hidden">
                ${procedimientos.length === 0 ? `
                    <div class="text-center py-10 opacity-50">
                        <span class="material-symbols-outlined text-4xl mb-2">local_police</span>
                        <p class="text-xs">No hay procedimientos guardados</p>
                    </div>
                ` : procedimientos.map(proc => `
                    <div class="glass-card p-4 rounded-2xl border border-white/5 flex flex-col gap-3">
                        <div class="flex justify-between items-start">
                            <div>
                                <span class="text-[9px] uppercase font-bold text-emerald-400 block">${proc.type}</span>
                                <span class="text-xs text-white font-bold">${new Date(proc.date).toLocaleDateString('es-AR')} ${new Date(proc.date).toLocaleTimeString('es-AR', {hour: '2-digit', minute: '2-digit'})}</span>
                            </div>
                        </div>
                        <div class="flex gap-4 text-[10px] text-slate-400">
                            <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">group</span> ${proc.peopleCount} Personas</span>
                            <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">inventory_2</span> ${proc.itemsCount} Secuestros</span>
                        </div>
                        <p class="text-[10px] text-slate-500 truncate"><span class="material-symbols-outlined text-[12px] inline-block align-middle mr-1">location_on</span>${proc.loc || 'Ubicación no especificada'}</p>
                    </div>
                `).join('')}
            </div>
            
            <div class="p-4 rounded-2xl bg-primary/10 border border-primary/20 mt-6">
                <div class="flex gap-3 items-start">
                    <span class="material-symbols-outlined text-primary text-lg mt-0.5">lock</span>
                    <p class="text-[11px] text-blue-200/80 leading-relaxed">
                        <strong>Privacidad:</strong> Los documentos generados se almacenan localmente en tu dispositivo. Solo vos tenés acceso a este historial.
                    </p>
                </div>
            </div>
        </main>

        <!-- Acta Modal -->
        <div id="acta-view-modal" class="fixed inset-0 z-[200] bg-background-dark/95 backdrop-blur-md hidden flex-col">
            <header class="border-b border-white/5 px-4 h-16 flex items-center justify-between shrink-0">
                <h3 class="text-sm font-bold text-white uppercase tracking-widest">Visor de Acta</h3>
                <button onclick="window._closeActaView()" class="p-2 text-slate-400 hover:text-white"><span class="material-symbols-outlined">close</span></button>
            </header>
            <div class="flex-1 overflow-y-auto p-4 space-y-4">
                <div class="glass-card p-5 rounded-3xl border border-primary/20 bg-primary/5">
                    <pre id="acta-view-content" class="text-xs text-slate-200 whitespace-pre-wrap font-sans leading-relaxed"></pre>
                </div>
            </div>
            <div class="p-4 border-t border-white/5 bg-background-dark shrink-0">
                <button onclick="window._copyActaView()" class="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2">
                    <span class="material-symbols-outlined text-sm">content_copy</span>Copiar Texto
                </button>
            </div>
        </div>

        ${renderBottomNav('asistente')}
    `;

    window._switchTab = (tab) => {
        const tActas = document.getElementById('tab-actas');
        const tProc = document.getElementById('tab-procedimientos');
        const cActas = document.getElementById('content-actas');
        const cProc = document.getElementById('content-procedimientos');

        if (tab === 'actas') {
            tActas.className = "flex-1 py-2 text-xs font-bold rounded-lg bg-primary text-white shadow-lg shadow-primary/20 transition-all";
            tProc.className = "flex-1 py-2 text-xs font-bold rounded-lg text-slate-400 hover:text-white transition-all";
            cActas.classList.remove('hidden');
            cProc.classList.add('hidden');
        } else {
            tProc.className = "flex-1 py-2 text-xs font-bold rounded-lg bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 transition-all";
            tActas.className = "flex-1 py-2 text-xs font-bold rounded-lg text-slate-400 hover:text-white transition-all";
            cProc.classList.remove('hidden');
            cActas.classList.add('hidden');
        }
    };

    window._viewActa = (index) => {
        const acta = actas[index];
        if(!acta) return;
        document.getElementById('acta-view-content').innerText = acta.text;
        document.getElementById('acta-view-modal').classList.remove('hidden');
        document.getElementById('acta-view-modal').classList.add('flex');
    };

    window._closeActaView = () => {
        document.getElementById('acta-view-modal').classList.add('hidden');
        document.getElementById('acta-view-modal').classList.remove('flex');
    };

    window._copyActaView = () => {
        navigator.clipboard.writeText(document.getElementById('acta-view-content').innerText);
        showToast("✅ Copiado al portapapeles");
    };
}

window.renderArchivos = renderArchivos;
