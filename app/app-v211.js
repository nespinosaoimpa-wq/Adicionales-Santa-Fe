/**
 * Adicionales Santa Fe - Main Entry Point
 * v2.1.1 Modularized
 */

// --- 1. BOOTSTRAP ---

document.addEventListener('DOMContentLoaded', async () => {
    console.log("🚀 Adicionales Santa Fe Modularized - Booting...");

    // Initialize State & Data Logic
    try {
        await store.init();
    } catch (error) {
        console.error("❌ Store Init Error:", error);
    }

    // Initialize Routing
    router.init();

    // Check Supabase session (OAuth Redirect Handling)
    try {
        if (typeof supabaseClient !== 'undefined') {
            const { data, error } = await supabaseClient.auth.getSession();
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

// Global debug logger reference if needed for legacy components
window.debugLog = (msg) => {
    if (typeof utils !== 'undefined' && utils.debugLog) {
        utils.debugLog(msg);
    } else {
        console.log('[DEBUG]', msg);
    }
};
