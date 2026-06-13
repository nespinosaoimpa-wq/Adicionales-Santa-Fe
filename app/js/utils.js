/**
 * Adicionales Santa Fe - Utilities
 */

// --- Security: XSS Sanitizer ---
window.escapeHTML = function (str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};


const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium z-[100] transition-opacity duration-300 opacity-0';
    toast.innerText = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.remove('opacity-0'));

    setTimeout(() => {
        toast.classList.add('opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
};

const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`✅ ${label} copiado`);
    }).catch(err => {
        console.error('Error copying:', err);
        showToast("❌ Error al copiar");
    });
};

// Global Debug Logger
const debugLog = (msg) => {
    const consoleEl = document.getElementById('debug-console');
    if (consoleEl) {
        const time = new Date().toLocaleTimeString();
        consoleEl.innerHTML += `<div>[${time}] ${msg}</div>`;
        consoleEl.scrollTop = consoleEl.scrollHeight;
    }
    console.log('[DEBUG]', msg);
};

const isIOS = () => {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
};

const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone) || window.matchMedia('(display-mode: standalone)').matches;

// Global Formatting Utility
window.formatMoney = function (amount) {
    if (typeof amount !== 'number') amount = parseFloat(amount) || 0;
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

// Export to window for global access (backward compatibility)
window.showToast = showToast;
window.copyToClipboard = copyToClipboard;
window.debugLog = debugLog;
window.isIOS = isIOS;
window.isInStandaloneMode = isInStandaloneMode;
// Donation Modal (Global)
window.showDonationModal = () => {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/85 backdrop-blur-md z-[200] flex items-end justify-center animate-fade-in';
    overlay.innerHTML = `
        <div class="bg-slate-950 w-full max-w-md rounded-t-[2.5rem] border-t-4 border-[#74ACDF] p-8 pb-12 animate-slide-up shadow-2xl relative overflow-hidden">
            <!-- Decorative Flag Background Elements -->
            <div class="absolute -right-12 -top-12 size-36 bg-[#74ACDF]/10 rounded-full blur-2xl"></div>
            <div class="absolute -left-12 -bottom-12 size-36 bg-[#F6B426]/10 rounded-full blur-2xl"></div>
            
            <div class="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-6"></div>
            
            <!-- World Cup Header -->
            <div class="flex items-center gap-4 mb-6 relative z-10">
                <div class="size-14 rounded-2xl bg-gradient-to-br from-[#74ACDF] to-[#F6B426] flex items-center justify-center text-white shadow-lg shadow-[#74ACDF]/20 relative">
                    <span class="material-symbols-outlined text-3xl animate-bounce">emoji_events</span>
                    <!-- Small soccer ball badge -->
                    <span class="absolute -bottom-1.5 -right-1.5 bg-slate-950 text-[10px] p-0.5 rounded-full border border-[#74ACDF]">⚽</span>
                </div>
                <div>
                    <h3 class="font-extrabold text-white text-lg tracking-tight flex items-center gap-1.5">
                        ¡Apoyá la App! <span class="text-sm">🇦🇷</span>
                    </h3>
                    <p class="text-[9px] text-[#F6B426] font-black uppercase tracking-[0.2em]">Colaboración · Modo Mundial 🏆</p>
                </div>
            </div>
            
            <p class="text-[12.5px] text-slate-300 leading-relaxed mb-6 relative z-10">
                Desarrollar y mantener esta app sin publicidad molesta y con base de datos en tiempo real tiene costos mensuales. Si te es súper útil en tu día a día, tu colaboración nos ayuda a seguir firmes en la cancha. 
                <br><br>
                <strong class="text-white">Tocá cada dato para copiarlo:</strong>
            </p>
            
            <!-- Donation Info Box -->
            <div class="space-y-3 mb-8 relative z-10">
                <div onclick="copyToClipboard('SmartFlow.Digital', 'Alias')" class="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-[#74ACDF]/10 hover:border-[#74ACDF]/30 transition-all active:scale-[0.98] group">
                    <div>
                        <p class="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">Alias Mercado Pago</p>
                        <p class="text-base font-mono font-black text-white group-hover:text-[#74ACDF] transition-colors">SmartFlow.Digital</p>
                    </div>
                    <div class="size-8 rounded-full bg-[#74ACDF]/10 flex items-center justify-center text-[#74ACDF] group-hover:bg-[#74ACDF] group-hover:text-slate-950 transition-colors">
                        <span class="material-symbols-outlined text-base">content_copy</span>
                    </div>
                </div>
                
                <div onclick="copyToClipboard('0000003100001906497190', 'CVU')" class="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-[#74ACDF]/10 hover:border-[#74ACDF]/30 transition-all active:scale-[0.98] group">
                    <div>
                        <p class="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">CVU</p>
                        <p class="text-xs font-mono font-bold text-white group-hover:text-[#74ACDF] transition-colors">0000003100001906497190</p>
                    </div>
                    <div class="size-8 rounded-full bg-[#74ACDF]/10 flex items-center justify-center text-[#74ACDF] group-hover:bg-[#74ACDF] group-hover:text-slate-950 transition-colors">
                        <span class="material-symbols-outlined text-base">content_copy</span>
                    </div>
                </div>
            </div>
            
            <button onclick="this.closest('.fixed').remove()" class="w-full py-2 text-xs font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors">
                Volver
            </button>
        </div>
    `;
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    document.body.appendChild(overlay);
};
