/**
 * Adicionales Santa Fe - Shared UI Components
 */

// --- Global Branding ---
function renderLogo(size = 'medium') {
    const sizes = {
        small: 'size-8 text-[8px]',
        medium: 'size-12 text-[10px]',
        large: 'size-16 text-xs'
    };
    const s = sizes[size] || sizes.medium;

    return `
        <div class="${s} relative flex items-center justify-center select-none group">
            <!-- Glow Effect -->
            <div class="absolute inset-0 bg-primary/20 dark:bg-primary/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            
            <!-- Shield Container -->
            <div class="relative w-full h-full bg-slate-900 rounded-2xl border border-white/10 flex flex-col items-center justify-center overflow-hidden shadow-2xl ring-1 ring-white/5">
                <!-- Inner Gradient Glow -->
                <div class="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-black/40"></div>
                
                <!-- Police Shield SVG Icon -->
                <svg viewBox="0 0 24 24" class="size-1/2 text-primary mb-0.5 drop-shadow-[0_0_8px_rgba(13,89,242,0.4)]" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="M12 8v4M12 16h.01" stroke-width="2.5" />
                </svg>
                
                <!-- Identity Text -->
                <div class="font-black tracking-[0.15em] text-white/90 uppercase leading-none">
                    ASF
                </div>
                
                <!-- Status Dot -->
                <div class="absolute top-1.5 right-1.5 size-1.5 bg-emerald-500 rounded-full shadow-[0_0_6px_rgba(16,185,129,0.9)] animate-pulse"></div>
            </div>
        </div>
    `;
}
window.renderLogo = renderLogo;

function renderAdBanner() {
    // 1. Native Custom Ad Check
    if (store.ads && store.ads.length > 0) {
        const randomIndex = Math.floor(Math.random() * store.ads.length);
        const ad = store.ads[randomIndex]; 
        console.log("📢 Rendering custom ad (randomized):", ad);
        return `
            <div class="w-full my-4 flex justify-center group overflow-hidden animate-fade-in">
                <a href="${ad.linkUrl || '#'}" ${ad.linkUrl ? 'target="_blank"' : ''} class="block w-full max-w-3xl overflow-hidden rounded-2xl shadow-lg border border-white/10 opacity-90 hover:opacity-100 transition-opacity relative">
                    <img src="${ad.imageUrl}" 
                         onerror="this.parentElement.style.display='none'; console.warn('Ad image failed to load:', this.src)"
                         class="w-full object-cover max-h-[140px]" alt="Patrocinado">
                    <div class="absolute top-1 right-2 px-1.5 rounded-sm bg-black/40 backdrop-blur-md text-[8px] text-white uppercase font-bold">Patrocinado</div>
                </a>
            </div>
        `;
    }

    console.log("📢 No custom ads found, falling back to AdSense");

    // 2. Google AdSense Fallback - Self-collapsing container
    return `
        <div class="w-full flex flex-col items-center justify-center ad-container overflow-hidden">
            <ins class="adsbygoogle"
                 style="display:block;width:100%;max-width:728px;"
                 data-ad-client="ca-pub-4261554477116731"
                 data-ad-slot="2506973015"
                 data-ad-format="horizontal"
                 data-full-width-responsive="true"></ins>
        </div>
    `;
}





function renderAdBannerSmall() {
    if (store.ads && store.ads.length > 0) {
        const randomIndex = Math.floor(Math.random() * store.ads.length);
        const ad = store.ads[randomIndex];
        return `
            <div class="w-full my-3 flex justify-center relative group" style="min-height:50px;">
                <a href="${ad.linkUrl || '#'}" ${ad.linkUrl ? 'target="_blank"' : ''} class="block w-full max-w-md overflow-hidden rounded-xl shadow-md border border-white/10 opacity-90 hover:opacity-100 transition-opacity">
                    <img src="${ad.imageUrl}" class="w-full object-cover max-h-[80px]" alt="Patrocinado">
                    <div class="absolute top-1 right-2 px-1.5 rounded-sm bg-black/40 backdrop-blur-md text-[8px] text-white uppercase font-bold">Patrocinado</div>
                </a>
            </div>
        `;
    }

    // Google AdSense Small Banner Fallback
    return `
        <div class="w-full my-3 flex justify-center" style="min-height:50px;">
            <ins class="adsbygoogle"
                 style="display:block;width:100%;max-width:400px;height:100px;"
                 data-ad-client="ca-pub-4261554477116731"
                 data-ad-slot="2506973015"
                 data-ad-format="fluid"
                 data-ad-layout-key="-fb+5w+4e-db+86"></ins>
        </div>
    `;
}


function renderBottomNav(activePage = 'agenda') {
    const navItems = [
        { id: 'agenda', icon: 'calendar_month', label: 'AGENDA', route: '#agenda' },
        { id: 'stats', icon: 'analytics', label: 'STATS', route: '#stats' },
        { id: 'control', icon: 'grid_view', label: 'PANEL', route: '#control' },
        { id: 'financial', icon: 'payments', label: 'FINANZAS', route: '#financial' },
        { id: 'asistente', icon: 'smart_toy', label: 'ASISTENTE', route: '#asistente' }
    ];

    return `
        <nav class="fixed bottom-0 left-0 right-0 z-[100] pb-6 px-4">
            <div class="max-w-md mx-auto glass-card rounded-[2.5rem] p-2 flex items-center justify-around shadow-2xl shadow-black/20 border border-white/5 bg-background-dark/90 backdrop-blur-xl">
                ${navItems.map(item => `
                    <button onclick="router.navigateTo('${item.route}')" 
                        class="flex flex-col items-center gap-1.5 px-4 py-2 rounded-3xl transition-all duration-300 ${activePage === item.id ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30' : 'text-slate-500 hover:text-white'}">
                        <span class="material-symbols-outlined text-[22px] ${activePage === item.id ? 'fill-1' : ''}">${item.icon}</span>
                        <span class="text-[9px] font-black tracking-tighter">${item.label}</span>
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
        <div id="install-banner" class="fixed bottom-32 left-4 right-4 z-[60] bg-primary text-white p-4 rounded-2xl flex items-center justify-between shadow-2xl shadow-primary/40 animate-slide-up hidden">
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
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">${title}</h3>
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
    const isWhatsAppOrInApp = /WhatsApp|FBAN|FBAV|Instagram|Line/i.test(navigator.userAgent);
    
    return `
        <div id="ios-install-banner" class="fixed bottom-24 left-4 right-4 z-[100] bg-slate-950/95 text-white rounded-[2rem] p-4 shadow-2xl border border-cyan-500/40 backdrop-blur-2xl transition-all duration-500 animate-slide-up">
            <div class="flex items-start gap-3.5 text-left">
                <div class="size-11 bg-gradient-to-br from-primary via-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/30 shrink-0">
                    <span class="material-symbols-outlined text-2xl">phone_iphone</span>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between gap-2">
                        <h3 class="text-xs font-black text-white leading-tight">¿Usás iPhone?</h3>
                        <button onclick="this.closest('#ios-install-banner').remove()" class="text-slate-400 hover:text-white transition-colors p-0.5">
                            <span class="material-symbols-outlined text-base">close</span>
                        </button>
                    </div>
                    <p class="text-[11px] text-slate-300 mt-0.5 leading-snug">Guardá la app en tu pantalla de inicio en 2 toques (sin App Store).</p>
                    
                    <div class="mt-2.5 flex items-center gap-2">
                        <button onclick="window.showIOSInstallModal(); document.getElementById('ios-install-banner')?.remove();" 
                            class="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[11px] font-black rounded-xl shadow-md active:scale-95 transition-all flex items-center gap-1">
                            <span class="material-symbols-outlined text-xs">touch_app</span> Ver cómo instalarla
                        </button>
                        <button onclick="this.closest('#ios-install-banner').remove()" class="px-2.5 py-1.5 text-slate-400 text-[11px] font-bold hover:text-slate-200">
                            Ahora no
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

window.showIOSInstallModal = function() {
    const existing = document.getElementById('ios-install-modal');
    if (existing) existing.remove();

    const isWhatsAppOrInApp = /WhatsApp|FBAN|FBAV|Instagram|Line/i.test(navigator.userAgent);
    const modal = document.createElement('div');
    modal.id = 'ios-install-modal';
    modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in';
    modal.innerHTML = `
        <div class="glass-card w-full max-w-md p-6 rounded-3xl border border-cyan-500/30 bg-background-dark/95 shadow-2xl text-left relative overflow-hidden max-h-[90vh] overflow-y-auto" style="animation: scaleUp 0.3s ease-out">
            <button onclick="document.getElementById('ios-install-modal').remove()" class="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full transition-colors z-10">
                <span class="material-symbols-outlined text-xl">close</span>
            </button>

            <div class="flex items-center gap-3 mb-4">
                <div class="size-12 rounded-2xl bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-primary/30 shrink-0">
                    <span class="material-symbols-outlined text-2xl">phone_iphone</span>
                </div>
                <div>
                    <h3 class="text-base font-black text-white leading-tight">Instalar en tu iPhone</h3>
                    <p class="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Paso a paso sin App Store</p>
                </div>
            </div>

            <p class="text-xs text-slate-300 mb-4 leading-relaxed">
                En iPhone no se descarga un archivo como en Android. 
                La app se agrega desde <strong class="text-white">Safari</strong> a tu pantalla de inicio:
            </p>

            ${isWhatsAppOrInApp ? `
                <div class="p-3 mb-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs space-y-1">
                    <p class="font-bold flex items-center gap-1.5 text-amber-300">
                        <span class="material-symbols-outlined text-sm">warning</span> ¡Atención! Estás dentro de WhatsApp
                    </p>
                    <p class="text-[11px] text-amber-200/90 leading-relaxed">
                        WhatsApp bloquea la instalación. Tocá los <strong>tres puntos (...) arriba a la derecha</strong> y elegí <strong>"Abrir en Safari"</strong> o <strong>"Abrir en navegador"</strong>.
                    </p>
                </div>
            ` : ''}

            <div class="space-y-2.5 mb-5">
                <!-- Paso 1 -->
                <div class="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div class="size-7 rounded-xl bg-cyan-500/20 text-cyan-300 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">1</div>
                    <div class="flex-1 text-xs">
                        <strong class="text-white block mb-0.5">Abrí la web en Safari</strong>
                        <p class="text-slate-400 text-[11px]">Asegurate de estar usando el navegador <strong class="text-white">Safari</strong> de tu iPhone (el ícono de la brújula azul). No funciona desde Chrome ni otros navegadores.</p>
                    </div>
                </div>

                <!-- Paso 2 -->
                <div class="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div class="size-7 rounded-xl bg-cyan-500/20 text-cyan-300 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">2</div>
                    <div class="flex-1 text-xs">
                        <strong class="text-white block mb-0.5">Tocá el botón Compartir</strong>
                        <p class="text-slate-400 text-[11px]">Es el ícono del <strong class="text-cyan-300">cuadradito con la flecha hacia arriba ⬆</strong> en la barra inferior de Safari.</p>
                    </div>
                </div>

                <!-- Paso 3 -->
                <div class="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div class="size-7 rounded-xl bg-cyan-500/20 text-cyan-300 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">3</div>
                    <div class="flex-1 text-xs">
                        <strong class="text-white block mb-0.5">Elegí "Agregar a pantalla de inicio"</strong>
                        <p class="text-slate-400 text-[11px]">Deslizá hacia abajo en el menú y buscá la opción <strong class="text-white">"Añadir a pantalla de inicio"</strong> con el ícono <strong class="text-cyan-300">＋</strong>.</p>
                    </div>
                </div>

                <!-- Paso 4 -->
                <div class="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div class="size-7 rounded-xl bg-cyan-500/20 text-cyan-300 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">4</div>
                    <div class="flex-1 text-xs">
                        <strong class="text-white block mb-0.5">Tocá "Agregar" arriba a la derecha</strong>
                        <p class="text-slate-400 text-[11px]">Te va a mostrar el nombre <strong class="text-cyan-300">Adicionales SF</strong>. Dejalo así y tocá <strong class="text-white">"Agregar"</strong>.</p>
                    </div>
                </div>

                <!-- Paso 5 - DÓNDE ENCONTRARLA -->
                <div class="flex items-start gap-3 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                    <div class="size-7 rounded-xl bg-emerald-500/20 text-emerald-300 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">5</div>
                    <div class="flex-1 text-xs">
                        <strong class="text-emerald-300 block mb-0.5">📍 ¿Dónde encontrarla?</strong>
                        <p class="text-slate-300 text-[11px] leading-relaxed">El ícono de <strong class="text-white">Adicionales SF</strong> aparece en la <strong class="text-emerald-300">última página</strong> de tu pantalla de inicio. Si no lo ves, deslizá todas las páginas hacia la izquierda o buscalo en la <strong class="text-emerald-300">Biblioteca de Apps</strong> (deslizá hasta el final de las páginas). También podés buscarlo tirando hacia abajo en la pantalla de inicio y escribiendo "Adicionales".</p>
                    </div>
                </div>
            </div>

            <button onclick="document.getElementById('ios-install-modal').remove()" class="w-full py-3.5 bg-gradient-to-r from-primary to-blue-600 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-primary/25 active:scale-95 transition-all text-center">
                ¡Entendido!
            </button>
        </div>
    `;
    document.body.appendChild(modal);
};



function initAds() {
    try {
        const ads = document.querySelectorAll('.adsbygoogle:not([data-adsbygoogle-status="done"])');
        if (ads.length === 0) return;
        
        console.log(`📊 AdSense: Preparing to init ${ads.length} units...`);
        
        // Give the DOM a moment to settle (helpful in SPAs)
        setTimeout(() => {
            ads.forEach(() => {
                try {
                    (adsbygoogle = window.adsbygoogle || []).push({});
                } catch (err) {
                    console.warn("Individual ad push error:", err);
                }
            });
            console.log(`✅ AdSense: Push completed for ${ads.length} units.`);
        }, 150);
    } catch (e) {
        console.error("AdSense init error:", e);
    }
}


window.copyToClipboard = copyToClipboard;
window.renderAdBanner = renderAdBanner;
window.renderAdBannerSmall = renderAdBannerSmall;
window.initAds = initAds;
window.renderBottomNav = renderBottomNav;
window.renderOfflineBanner = renderOfflineBanner;
window.renderInstallBanner = renderInstallBanner;
window.renderLoadingState = renderLoadingState;
window.renderEmptyState = renderEmptyState;
window.renderIOSInstallPrompt = renderIOSInstallPrompt;

window.renderGlobalAnnouncement = function () {
    const container = document.getElementById('global-announcement-container');
    if (!container) return;

    const ann = store.latestAnnouncement;
    if (!ann) {
        container.innerHTML = '';
        return;
    }

    if (localStorage.getItem('dismissed_announcement_' + ann.id)) {
        container.innerHTML = '';
        return;
    }

    // Trigger native web notification if granted
    if ('Notification' in window && Notification.permission === 'granted' && !localStorage.getItem('notified_announcement_' + ann.id)) {
        localStorage.setItem('notified_announcement_' + ann.id, 'true');
        try {
            if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                navigator.serviceWorker.ready.then(reg => {
                    reg.showNotification("Adicionales Santa Fe", {
                        body: ann.message,
                        icon: "assets/icon-512.png",
                        badge: "assets/icon-512.png",
                        vibrate: [200, 100, 200],
                        tag: 'announcement-' + ann.id,
                        data: { url: './#agenda' }
                    }).catch(() => {});
                }).catch(() => {});
            } else {
                new Notification("Adicionales Santa Fe", {
                    body: ann.message,
                    icon: "assets/icon-512.png"
                });
            }
        } catch(e) {}
    }

    container.innerHTML = `
        <div class="w-full p-2.5 z-[9999] animate-slide-down">
            <div class="bg-[#111b21]/95 text-white backdrop-blur-2xl p-3.5 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.6)] border border-emerald-500/30 flex items-center gap-3">
                <div class="size-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30">
                    <span class="material-symbols-outlined text-white text-xl">chat</span>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between gap-2 mb-0.5">
                        <p class="text-[11px] font-black uppercase tracking-wider text-emerald-400">Adicionales Santa Fe</p>
                        <span class="text-[9px] font-bold text-slate-400">Ahora</span>
                    </div>
                    <p class="text-xs font-semibold text-slate-100 leading-snug line-clamp-2">${ann.message}</p>
                </div>
                <button onclick="localStorage.setItem('dismissed_announcement_${ann.id}', 'true'); renderGlobalAnnouncement();" class="shrink-0 p-1.5 hover:bg-white/10 text-slate-400 hover:text-white rounded-full transition-colors">
                    <span class="material-symbols-outlined text-sm">close</span>
                </button>
            </div>
        </div>
    `;
};

window.showWelcomeBackModal = function() {
    if (localStorage.getItem('welcome_back_migracion_2026_seen')) return;

    const overlay = document.createElement('div');
    overlay.id = 'welcome-back-modal';
    overlay.className = 'fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-md p-4 transition-all duration-500 opacity-0';
    
    overlay.innerHTML = `
        <div class="bg-slate-900 rounded-3xl p-6 shadow-2xl border border-white/10 w-full max-w-sm transform scale-90 transition-all duration-500 opacity-0 flex flex-col items-center text-center" id="welcome-back-card">
            <div class="size-16 bg-gradient-to-br from-primary to-cyan-500 rounded-2xl mx-auto flex items-center justify-center text-white shadow-xl shadow-primary/30 mb-4">
                <span class="material-symbols-outlined text-3xl">rocket_launch</span>
            </div>
            <h2 class="text-xl font-bold text-white mb-1">¡Plataforma Actualizada!</h2>
            <p class="text-xs text-blue-400 font-semibold mb-3 tracking-wide uppercase">Mayor Ancho de Banda y Velocidad</p>
            <p class="text-xs text-slate-300 mb-5 leading-relaxed">
                Gracias al gran crecimiento de nuestra comunidad policial, migramos la aplicación a servidores de mayor capacidad y ancho de banda. Tu cuenta, adicionales y configuraciones están 100% seguros e intactos.
            </p>
            <div class="w-full bg-slate-800/60 rounded-2xl p-3.5 mb-5 text-left space-y-2.5 border border-white/5">
                <div class="flex items-center gap-3">
                    <span class="text-emerald-400 text-base material-symbols-outlined">bolt</span>
                    <span class="text-[11px] font-semibold text-slate-200">Carga ultra rápida y máxima estabilidad</span>
                </div>
                <div class="flex items-center gap-3">
                    <span class="text-blue-400 text-base material-symbols-outlined">security</span>
                    <span class="text-[11px] font-semibold text-slate-200">Tus datos y cálculos totalmente protegidos</span>
                </div>
                <div class="flex items-center gap-3">
                    <span class="text-cyan-400 text-base material-symbols-outlined">login</span>
                    <span class="text-[11px] font-semibold text-slate-200">Acceso fluido con Google o tu email</span>
                </div>
            </div>
            <button id="welcome-back-btn" class="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-primary/30 text-xs uppercase tracking-wider">
                Continuar a la App <span class="text-sm">→</span>
            </button>
        </div>
    `;

    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
        overlay.classList.remove('opacity-0');
        overlay.classList.add('opacity-100');
        const card = overlay.querySelector('#welcome-back-card');
        card.classList.remove('scale-90', 'opacity-0');
        card.classList.add('scale-100', 'opacity-100');
    });

    const btn = overlay.querySelector('#welcome-back-btn');
    btn.addEventListener('click', () => {
        localStorage.setItem('welcome_back_migracion_2026_seen', 'true');
        
        overlay.classList.remove('opacity-100');
        overlay.classList.add('opacity-0');
        const card = overlay.querySelector('#welcome-back-card');
        card.classList.remove('scale-100');
        card.classList.add('scale-90');
        
        setTimeout(() => {
            overlay.remove();
        }, 300);
    });
};

console.log("✅ components.js loaded & exported successfully");
