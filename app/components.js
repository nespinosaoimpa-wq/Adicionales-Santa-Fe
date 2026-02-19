/**
 * Reusable UI Components
 */

// Loading Skeleton for Service Cards
function renderServiceSkeleton() {
    return `
        <div class="glass-card p-4 rounded-2xl animate-pulse">
            <div class="flex items-center gap-4">
                <div class="size-12 rounded-xl bg-slate-700"></div>
                <div class="flex-1 space-y-2">
                    <div class="h-4 bg-slate-700 rounded w-3/4"></div>
                    <div class="h-3 bg-slate-700 rounded w-1/2"></div>
                </div>
                <div class="h-6 w-20 bg-slate-700 rounded"></div>
            </div>
        </div>
    `;
}

// Loading Skeletons (multiple cards)
function renderLoadingState(count = 3) {
    return `
        <div class="space-y-3">
            ${Array(count).fill(0).map(() => renderServiceSkeleton()).join('')}
        </div>
    `;
}

// Empty State Component
function renderEmptyState(config) {
    const {
        icon = 'inbox',
        title = 'No hay datos',
        message = 'Todavía no hay nada aquí',
        actionText = null,
        actionHandler = null
    } = config;

    return `
        <div class="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div class="size-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <span class="material-symbols-outlined text-5xl text-primary/40">${icon}</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">${title}</h3>
            <p class="text-slate-400 mb-6 max-w-sm">${message}</p>
            ${actionText ? `
                <button onclick="${actionHandler}" class="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all active:scale-95">
                    ${actionText}
                </button>
            ` : ''}
        </div>
    `;
}

// Success Animation
function showSuccessAnimation(message) {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm';
    overlay.innerHTML = `
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl animate-scale-in">
            <div class="flex flex-col items-center">
                <div class="size-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4 animate-bounce-in">
                    <span class="material-symbols-outlined text-5xl text-green-500">check_circle</span>
                </div>
                <p class="text-lg font-bold text-slate-900 dark:text-white">${message}</p>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.classList.add('animate-fade-out');
        setTimeout(() => overlay.remove(), 300);
    }, 1500);
}

// Offline Indicator Banner
function renderOfflineBanner() {
    return `
        <div id="offline-banner" class="hidden fixed top-0 left-0 right-0 z-[9998] bg-amber-500 text-white px-4 py-2 text-center text-sm font-medium animate-slide-down">
            <span class="material-symbols-outlined text-sm align-middle mr-1">cloud_off</span>
            Sin conexión - Los cambios se sincronizarán cuando vuelvas a estar online
        </div>
    `;
}

// Update offline status
function updateOfflineStatus(isOffline) {
    const banner = document.getElementById('offline-banner');
    if (banner) {
        banner.classList.toggle('hidden', !isOffline);
    }
}

// PWA Install Banner Component
function renderInstallBanner() {
    return `
        <div id="install-banner" class="hidden fixed top-4 left-4 right-4 z-[10000] bg-slate-900/95 backdrop-blur-xl border border-white/10 p-4 rounded-3xl shadow-2xl animate-slide-down">
            <div class="flex items-center gap-4">
                <div class="size-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <span class="material-symbols-outlined text-primary text-3xl">download_for_offline</span>
                </div>
                <div class="flex-1">
                    <h4 class="text-sm font-bold text-white">Instalar App</h4>
                    <p class="text-xs text-slate-400">Agregala a tu pantalla de inicio</p>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="this.closest('#install-banner').classList.add('hidden')" class="p-2 text-slate-500 hover:text-white transition-colors">
                        <span class="material-symbols-outlined text-xl">close</span>
                    </button>
                    <button onclick="store.installApp()" class="bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all">
                        Instalar
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Listen to online/offline events
window.addEventListener('online', () => updateOfflineStatus(false));
window.addEventListener('offline', () => updateOfflineStatus(true));
