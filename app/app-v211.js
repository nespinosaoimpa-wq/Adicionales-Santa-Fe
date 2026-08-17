/**
 * Adicionales Santa Fe - Main Entry Point
 * v2.1.1 Modularized
 */

// --- 1. BOOTSTRAP ---

async function bootApp() {
    if (window._appBooted) return;
    window._appBooted = true;
    console.log("🚀 Adicionales Santa Fe Modularized - Booting...");

    // 1. Initialize State & Auth Data FIRST and wait for Firebase Auth to settle
    try {
        if (window.store && typeof window.store.init === 'function') {
            await store.init();
        }
    } catch (error) {
        console.error("❌ Store Init Error:", error);
    }

    // 2. Initialize Routing & Render View ONLY AFTER Auth is settled
    try {
        if (window.router && typeof window.router.init === 'function') {
            router.init();
        }
        if (window.router && typeof window.router.handleRoute === 'function') {
            window.router.handleRoute();
        }
    } catch (e) {
        console.error("❌ Router Init Error:", e);
    }

    // 3. Remove static HTML initial loader smoothly
    const loader = document.getElementById('initial-loader');
    if (loader) {
        loader.classList.add('transition-opacity', 'duration-300', 'opacity-0', 'pointer-events-none');
        setTimeout(() => loader.remove(), 300);
    }
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    bootApp();
} else {
    document.addEventListener('DOMContentLoaded', bootApp);
}

// Fallback boot timer
setTimeout(bootApp, 100);

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
