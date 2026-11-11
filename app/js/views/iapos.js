/**
 * Adicionales Santa Fe - Guía de Recursos IAPOS
 */

function renderIAPOS(container) {
    if (!container) container = document.getElementById('app');

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center gap-4">
            <button onclick="router.navigateTo('#asistente')" class="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <div class="flex flex-col">
                <h1 class="text-sm font-black text-white leading-none">Guía IAPOS Actualizada</h1>
                <span class="text-[10px] text-primary font-bold uppercase tracking-widest">Salud y Bienestar Policial</span>
            </div>
        </header>

        <main class="p-6 space-y-6 pb-32 max-w-md mx-auto view-transition">
            <!-- Search Portal -->
            <div class="glass-card p-6 rounded-3xl border border-white/5 bg-gradient-to-br from-primary/10 to-transparent">
                <div class="size-12 rounded-2xl bg-primary flex items-center justify-center text-white mb-4 shadow-lg shadow-primary/20">
                    <span class="material-symbols-outlined">person_search</span>
                </div>
                <h2 class="text-lg font-bold text-white mb-2">Buscador de Cartilla</h2>
                <p class="text-xs text-slate-400 leading-relaxed mb-6">Accedé al padrón oficial de médicos, clínicas y farmacias que trabajan con IAPOS en toda la provincia.</p>
                
                <a href="https://www.santafe.gob.ar/ms/iapos/padron-de-prestadores/" target="_blank" rel="noopener noreferrer"
                   class="w-full py-4 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl shadow-primary/20">
                    <span class="material-symbols-outlined">open_in_new</span>Abrir Buscador Directo
                </a>
            </div>

            <!-- Urgent Contacts -->
            <div class="space-y-3">
                <h3 class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Atención y Emergencias</h3>
                
                <div class="grid gap-3">
                    <!-- WhatsApp -->
                    <a href="https://wa.me/5493425594737" target="_blank" rel="noopener noreferrer" class="glass-card p-4 rounded-2xl border border-white/5 flex items-center gap-4 hover:border-emerald-500/30 transition-all">
                        <div class="size-10 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                            <span class="material-symbols-outlined text-lg">chat</span>
                        </div>
                        <div class="flex-1">
                            <h4 class="text-sm font-bold text-white">WhatsApp Consultas</h4>
                            <p class="text-[10px] text-slate-500">IAPOS - 342 5594737</p>
                        </div>
                        <span class="material-symbols-outlined text-slate-700">chevron_right</span>
                    </a>

                    <!-- 0800 -->
                    <a href="tel:08004444276" class="glass-card p-4 rounded-2xl border border-white/5 flex items-center gap-4 hover:border-primary/30 transition-all">
                        <div class="size-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                            <span class="material-symbols-outlined text-lg">call</span>
                        </div>
                        <div class="flex-1">
                            <h4 class="text-sm font-bold text-white">Centro de Consultas</h4>
                            <p class="text-[10px] text-slate-500">0800 444 4276 (IAPO)</p>
                        </div>
                        <span class="material-symbols-outlined text-slate-700">chevron_right</span>
                    </a>
                </div>
            </div>

            <!-- Official App -->
            <div class="p-6 rounded-3xl border border-white/5 bg-slate-900/50 space-y-4">
                <div class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-amber-500">smartphone</span>
                    <h3 class="text-sm font-bold text-white">App "Mi IAPOS"</h3>
                </div>
                <p class="text-[11px] text-slate-400 leading-relaxed">Te recomendamos descargar la App oficial para gestionar tus órdenes, recetas y credencial digital directamente desde el celular.</p>
                <div class="flex gap-3">
                    <a href="https://play.google.com/store/apps/details?id=ar.gov.santafe.mi_iapos" target="_blank" rel="noopener noreferrer" class="flex-1 py-2 rounded-xl bg-white/5 text-[10px] font-bold text-slate-300 text-center border border-white/10 flex items-center justify-center gap-2 active:scale-95 transition-all">
                        Play Store
                    </a>
                    <a href="https://apps.apple.com/ar/app/mi-iapos/id1514781475" target="_blank" rel="noopener noreferrer" class="flex-1 py-2 rounded-xl bg-white/5 text-[10px] font-bold text-slate-300 text-center border border-white/10 flex items-center justify-center gap-2 active:scale-95 transition-all">
                        App Store
                    </a>
                </div>
            </div>

            ${renderAdBanner()}
        </main>
        ${renderBottomNav('asistente')}
    `;
}

window.renderIAPOS = renderIAPOS;
