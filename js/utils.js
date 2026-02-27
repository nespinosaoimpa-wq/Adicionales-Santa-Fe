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
    overlay.className = 'fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-end justify-center animate-fade-in';
    overlay.innerHTML = `
        <div class="bg-slate-900 w-full max-w-md rounded-t-[2.5rem] border-t border-white/10 p-8 pb-12 animate-slide-up shadow-2xl shadow-primary/20">
            <div class="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-6"></div>
            <div class="flex items-center gap-4 mb-6">
                <div class="size-14 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500 shadow-lg shadow-amber-500/10">
                    <span class="material-symbols-outlined text-3xl">volunteer_activism</span>
                </div>
                <div>
                    <h3 class="font-bold text-white text-lg tracking-tight">Apoyar el Proyecto</h3>
                    <p class="text-[10px] text-amber-500/70 font-black uppercase tracking-[0.2em]">Donaciones · Mantenimiento</p>
                </div>
            </div>
            <p class="text-[13px] text-slate-400 leading-relaxed mb-8">
                Mantener los servidores y el desarrollo constante lleva tiempo y costos. Si esta herramienta te ayuda, tu colaboración es fundamental. **Tocá para copiar los datos:**
            </p>
            <div class="space-y-3 mb-8">
                <div onclick="copyToClipboard('SmartFlow.Digital', 'Alias')" class="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-all active:scale-[0.98] group">
                    <div>
                        <p class="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">Alias Mercado Pago</p>
                        <p class="text-base font-mono font-black text-white group-hover:text-primary transition-colors">SmartFlow.Digital</p>
                    </div>
                    <div class="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span class="material-symbols-outlined text-base">content_copy</span>
                    </div>
                </div>
                <div onclick="copyToClipboard('0000003100001906497190', 'CVU')" class="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-all active:scale-[0.98] group">
                    <div>
                        <p class="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">CVU</p>
                        <p class="text-xs font-mono font-bold text-white group-hover:text-primary transition-colors">0000003100001906497190</p>
                    </div>
                    <div class="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span class="material-symbols-outlined text-base">content_copy</span>
                    </div>
                </div>
            </div>
            <button onclick="this.closest('.fixed').remove()" class="w-full py-2 text-xs font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors">
                Volver al Asistente
            </button>
        </div>
    `;
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    document.body.appendChild(overlay);
};
