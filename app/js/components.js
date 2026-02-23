/**
 * Adicionales Santa Fe - Shared UI Components
 */

function renderAdBanner() {
    if (!store.ads || store.ads.length === 0) return '';
    const ad = store.ads[Math.floor(Math.random() * store.ads.length)];
    return `
        <div class="my-6 mx-4 rounded-xl overflow-hidden shadow-lg relative group">
            <a href="${ad.linkUrl}" target="_blank" class="block relative">
                <span class="absolute top-2 right-2 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider font-bold backdrop-blur-sm">Publicidad</span>
                <img src="${ad.imageUrl}" class="w-full h-32 object-cover" alt="Anuncio">
                <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </a>
        </div>
    `;
}

function renderBottomNav(activePage = 'agenda') {
    const pages = [
        { id: 'agenda', icon: 'calendar_today', label: 'Agenda', hash: '#agenda' },
        { id: 'control', icon: 'dashboard', label: 'Panel', hash: '#control' },
        { id: 'register', icon: 'add_circle', label: 'Nuevo', hash: '#register', highlight: true },
        { id: 'financial', icon: 'payments', label: 'Finanzas', hash: '#financial' },
        { id: 'asistente', icon: 'smart_toy', label: 'Asistente', hash: '#asistente' }
    ];

    return `
        <nav class="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-xl border-t border-slate-200 dark:border-white/5 px-4 pb-8 pt-2">
            <div class="flex items-center justify-around max-w-md mx-auto">
                ${pages.map(p => `
                    <button onclick="router.navigateTo('${p.hash}')" class="flex flex-col items-center gap-1 group transition-all">
                        <div class="size-12 flex items-center justify-center rounded-2xl transition-all ${activePage === p.id ? (p.highlight ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-110' : 'text-primary') : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'}">
                            <span class="material-symbols-outlined text-[24px] ${activePage === p.id && !p.highlight ? 'font-fill' : ''}">${p.icon}</span>
                        </div>
                        <span class="text-[10px] font-bold uppercase tracking-widest ${activePage === p.id ? 'text-primary' : 'text-slate-400'}">${p.label}</span>
                    </button>
                `).join('')}
            </div>
        </nav>
    `;
}

function renderOfflineBanner() {
    return `
        <div id="offline-banner" class="fixed top-0 left-0 right-0 z-[100] bg-amber-500 text-white px-4 py-2 text-center text-xs font-bold transform -translate-y-full transition-transform duration-300">
            ⚠️ Estás en modo offline. Los cambios se sincronizarán al volver.
        </div>
    `;
}

function renderInstallBanner() {
    return `
        <div id="install-banner" class="fixed bottom-24 left-4 right-4 z-[60] bg-primary text-white p-4 rounded-2xl flex items-center justify-between shadow-2xl shadow-primary/40 transform translate-y-32 transition-transform duration-500 hidden">
            <div class="flex items-center gap-3">
                <div class="size-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <span class="material-symbols-outlined">download</span>
                </div>
                <div>
                    <p class="text-sm font-bold">Instalar Aplicación</p>
                    <p class="text-[10px] opacity-80">Acceso rápido desde tu pantalla</p>
                </div>
            </div>
            <button onclick="store.installApp()" class="bg-white text-primary px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tight">Instalar</button>
        </div>
    `;
}

// --- Helper Components ---

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

function renderLoadingState(count = 3) {
    return `
        <div class="space-y-3">
            ${Array(count).fill(0).map(() => renderServiceSkeleton()).join('')}
        </div>
    `;
}

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

function updateOfflineStatus(isOffline) {
    const banner = document.getElementById('offline-banner');
    if (banner) {
        banner.classList.toggle('hidden', !isOffline);
        banner.style.transform = isOffline ? 'translateY(0)' : 'translateY(-100%)';
    }
}

// --- Global Listeners ---
window.addEventListener('online', () => updateOfflineStatus(false));
window.addEventListener('offline', () => updateOfflineStatus(true));
function renderIOSInstallPrompt() {
    return `
        <div id="ios-install-banner" class="fixed bottom-6 left-4 right-4 z-[100] bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-2xl border border-primary/20 transform translate-y-[200%] transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] animate-ios-entry">
            <div class="flex items-start gap-5 text-left">
                <div class="size-14 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20 shrink-0">
                    <span class="material-symbols-outlined text-3xl">add_to_home_screen</span>
                </div>
                <div class="flex-1 space-y-2">
                    <h3 class="text-base font-bold text-slate-900 dark:text-white leading-tight">Instalá Adicionales SF</h3>
                    <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Para usar esta aplicación a pantalla completa en tu iPhone:</p>
                    
                    <div class="flex flex-col gap-2 pt-2">
                        <div class="flex items-center gap-3 text-[11px] font-medium text-slate-700 dark:text-slate-300">
                            <span class="size-6 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-primary font-bold">1</span>
                            <span>Toca el botón <span class="bg-slate-100 dark:bg-white/10 px-1.5 py-0.5 rounded-md font-bold text-primary flex inline-flex items-center gap-1">Compartir <span class="material-symbols-outlined text-xs">ios_share</span></span></span>
                        </div>
                        <div class="flex items-center gap-3 text-[11px] font-medium text-slate-700 dark:text-slate-300">
                            <span class="size-6 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-primary font-bold">2</span>
                            <span>Elegí <span class="font-bold text-primary">"Añadir a panta. de inicio"</span></span>
                        </div>
                    </div>
                </div>
            </div>
            <button onclick="this.closest('#ios-install-banner').remove()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                <span class="material-symbols-outlined">close</span>
            </button>
        </div>
    `;
}
