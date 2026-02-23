/**
 * Adicionales Santa Fe - Main Entry Point
 * v2.1.1 Modularized
 */

// --- 1. BOOTSTRAP ---

document.addEventListener('DOMContentLoaded', async () => {
    console.log("🚀 Adicionales Santa Fe Modularized - Booting...");

    // Initialize Routing
    router.init();

    // Initialize State & Data Logic
    store.init();

    // Check Supabase session (OAuth Redirect Handling)
    try {
        if (typeof supabase !== 'undefined') {
            const { data, error } = await supabase.auth.getSession();
            if (data?.session?.user) {
                console.log("✅ OAuth Session active:", data.session.user.email);
            }
        }
    } catch (error) {
        console.error("❌ Auth Init Error:", error);
    }
});

// --- 2. GLOBAL EVENT LISTENERS ---

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    store.deferredPrompt = e;
    // Update UI notify the user they can install the PWA
    document.getElementById('install-banner')?.classList.remove('hidden');
});

// PWA Service Worker Updates
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log("SW Controller change detected. Reloading...");
        // Optionally show a toast first
        // showToast("Actualización aplicada");
        // window.location.reload();
    });
}

// --- 3. GLOBAL HELPERS (Legacy support or shared across views) ---

function showDonationModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/90 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
        <div class="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-white/10 relative overflow-hidden">
             <div class="absolute -top-12 -right-12 size-32 bg-primary/10 rounded-full blur-3xl"></div>
             
             <div class="relative z-10 text-center space-y-6">
                <div class="size-16 bg-amber-500/20 text-amber-500 rounded-2xl flex items-center justify-center mx-auto">
                    <span class="material-symbols-outlined text-4xl">coffee</span>
                </div>
                
                <div>
                    <h3 class="text-xl font-bold dark:text-white">Apoyá el Desarrollo</h3>
                    <p class="text-sm text-slate-500 mt-2">¿Te gusta la aplicación? Ayúdanos a mantenerla con un café simbólico.</p>
                </div>

                <div class="space-y-3">
                    <p class="text-[10px] text-slate-500 uppercase font-black tracking-widest">Colaboración</p>
                    <p class="text-xs text-slate-400">Podés encontrar los datos de Mercado Pago en la sección de **Asistente > Apoyar el Proyecto**.</p>
                    <button onclick="this.closest('.animate-fade-in').remove()" class="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 active:scale-95 transition-all">
                        Entendido
                    </button>
                </div>
             </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Global debug logger reference if needed for legacy components
window.debugLog = (msg) => {
    if (typeof utils !== 'undefined' && utils.debugLog) {
        utils.debugLog(msg);
    } else {
        console.log('[DEBUG]', msg);
    }
};
