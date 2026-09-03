/**
 * Adicionales Santa Fe - System Diagnostics Panel
 */

function renderDiagnostics(container) {
    if (!container) container = document.getElementById('app');

    // Storage info calculation
    let totalStorage = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            totalStorage += (localStorage[key].length || 0) * 2; // Approx bytes
        }
    }
    const storageKb = (totalStorage / 1024).toFixed(2);
    const hasPendingSync = store.services.some(s => s._offlineSync === true);

    // Check Service Worker status via global vars if possible, or basic check
    const swStatus = ('serviceWorker' in navigator) && navigator.serviceWorker.controller ? 'Activo' : 'Inactivo / Error';

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center justify-between">
            <button onclick="router.navigateTo('#profile')" class="size-10 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 class="text-lg font-bold text-slate-900 dark:text-white">Diagnóstico</h1>
            <div class="size-10 flex items-center justify-center">${renderLogo('small')}</div>
        </header>

        <main class="p-6 space-y-6 pb-32 max-w-md mx-auto animate-fade-in">
            <!-- App Info Card -->
            <div class="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-5">
                <div class="flex items-center gap-3 mb-4">
                    <span class="material-symbols-outlined text-indigo-400 text-3xl">memory</span>
                    <div>
                        <h2 class="font-bold text-indigo-900 dark:text-indigo-100">Estado del Sistema</h2>
                        <p class="text-xs text-indigo-600 dark:text-indigo-300">Monitoreo de rendimiento y red</p>
                    </div>
                </div>
                
                <div class="space-y-3 mt-4">
                    <div class="flex justify-between items-center text-sm">
                        <span class="text-slate-500 dark:text-slate-400">Versión Core</span>
                        <span class="font-mono font-bold text-slate-900 dark:text-white">v531.5-FINAL</span>
                    </div>
                    <div class="flex justify-between items-center text-sm">
                        <span class="text-slate-500 dark:text-slate-400">Offline DB (Local)</span>
                        <span class="font-mono font-bold text-slate-900 dark:text-white">${storageKb} KB</span>
                    </div>
                    <div class="flex justify-between items-center text-sm">
                        <span class="text-slate-500 dark:text-slate-400">Service Worker</span>
                        <span class="font-mono font-bold ${swStatus === 'Activo' ? 'text-green-500' : 'text-red-500'}">${swStatus}</span>
                    </div>
                    <div class="flex justify-between items-center text-sm">
                        <span class="text-slate-500 dark:text-slate-400">Cola de Sincronización</span>
                        <span class="font-mono font-bold ${hasPendingSync ? 'text-amber-500' : 'text-green-500'}">${hasPendingSync ? 'Pendiente' : 'Cero'}</span>
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div class="space-y-3">
                <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1 mt-6 mb-2">Herramientas de Resolución</h3>
                
                <button onclick="runForceUpdate()" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 p-4 rounded-xl flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors active:scale-95 text-left">
                    <div class="flex items-center gap-3">
                        <div class="size-10 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center">
                            <span class="material-symbols-outlined">update</span>
                        </div>
                        <div>
                            <h4 class="font-bold text-sm text-slate-900 dark:text-white">Forzar Actualización</h4>
                            <p class="text-[10px] text-slate-500">Limpia la caché y reinicia workers.</p>
                        </div>
                    </div>
                    <span class="material-symbols-outlined text-slate-400">chevron_right</span>
                </button>

                <button onclick="runOfflineSyncCheck()" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 p-4 rounded-xl flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors active:scale-95 text-left">
                    <div class="flex items-center gap-3">
                        <div class="size-10 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center">
                            <span class="material-symbols-outlined">sync_problem</span>
                        </div>
                        <div>
                            <h4 class="font-bold text-sm text-slate-900 dark:text-white">Verificar Servicios Offline</h4>
                            <p class="text-[10px] text-slate-500">Intenta re-subir servicios en cola local.</p>
                        </div>
                    </div>
                    <span class="material-symbols-outlined text-slate-400">chevron_right</span>
                </button>
            </div>
        </main>
    `;

    // Local Handlers attached to window just for this view duration or strictly via inline
    window.runForceUpdate = () => {
        if (confirm("¿Seguro? Esto forzará la descarga de la última versión de la aplicación y la reiniciará.")) {
            store.forceUpdate();
        }
    };

    window.runOfflineSyncCheck = async () => {
        showToast("Verificando cola offline...");
        // This simulates forcing the auth state listener to trigger sync if user is active
        if (auth.currentUser && store.services.length > 0) {
            const pending = store.services.filter(s => s._offlineSync === true);
            if (pending.length === 0) {
                showToast("✅ Todo está sincronizado con la nube.");
            } else {
                showToast(`Intentando sincronizar ${pending.length} servicios...`);
                // Simulate saving them again locally forces Firebase to attempt push
                await store.saveLocally();
                showToast("Sincronización forzada enviada.");
            }
        } else {
            showToast("Debes iniciar sesión para sincronizar con la nube.");
        }
    };
}
