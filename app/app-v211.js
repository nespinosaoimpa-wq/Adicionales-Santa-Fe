/**
 * Adicionales Santa Fe - Main Entry Point
 * v2.1.1 Modularized
 */

// --- 1. BOOTSTRAP ---

function bootApp() {
    if (window._appBooted) return;
    window._appBooted = true;
    console.log("🚀 Adicionales Santa Fe - Booting...");

    // 1. Initialize Routing & Render Initial View
    try {
        if (window.router && typeof window.router.init === 'function') {
            router.init();
        }
    } catch (e) {
        console.error("❌ Router Init Error:", e);
    }

    // 2. Initialize State & Auth Data asynchronously
    try {
        if (window.store && typeof window.store.init === 'function') {
            store.init();
        }
    } catch (error) {
        console.error("❌ Store Init Error:", error);
    }

    // 3. Check Supabase session (OAuth Redirect Handling)
    try {
        if (typeof supabaseClient !== 'undefined' && supabaseClient) {
            supabaseClient.auth.getSession().then(({ data }) => {
                if (data?.session?.user) {
                    console.log("✅ OAuth Session active:", data.session.user.email);
                }
            }).catch(e => console.warn("Supabase session check warning:", e));
        }
    } catch (error) {
        console.error("❌ Auth Init Error:", error);
    }
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    bootApp();
} else {
    document.addEventListener('DOMContentLoaded', bootApp);
}

// --- 2. GLOBAL EVENT LISTENERS ---

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    if (window.store) store.deferredPrompt = e;
    // Update UI notify the user they can install the PWA
    document.getElementById('install-banner')?.classList.remove('hidden');
});

// PWA Service Worker Updates
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log("SW Controller change detected.");
    });
}

// --- 3. GLOBAL HELPERS (Legacy support or shared across views) ---

window.debugLog = (msg) => {
    if (typeof utils !== 'undefined' && utils.debugLog) {
        utils.debugLog(msg);
    } else {
        console.log('[DEBUG]', msg);
    }
};
