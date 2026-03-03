/**
 * Adicionales Santa Fe - Full History View
 * Refactored with IntersectionObserver Pagination (Improvement #2)
 */

let historyObserver = null;
let currentHistoryPage = 0;
const HISTORY_PAGE_SIZE = 20;

function renderHistory(container) {
    if (!container) container = document.getElementById('app');

    // Sort all services descending
    const sortedServices = [...store.services].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Reset pagination state
    currentHistoryPage = 0;
    if (historyObserver) {
        historyObserver.disconnect();
        historyObserver = null;
    }

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center justify-between">
            <button onclick="window.history.back()" class="size-10 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 class="text-lg font-bold text-slate-900 dark:text-white">Historial Completo</h1>
            <div class="size-10 flex items-center justify-center">${renderLogo('small')}</div>
        </header>

        <main class="space-y-4 pb-32">
            <!-- Ad Banner Top -->
            ${renderAdBanner()}

            <div id="history-list-container" class="px-4 space-y-3">
                ${sortedServices.length === 0 ? '<p class="text-center text-slate-500 py-10">No hay servicios registrados.</p>' : ''}
                <!-- Initial items will be injected here -->
            </div>
            
            <!-- Loading indicator / Sentinel for IntersectionObserver -->
            <div id="history-loading-sentinel" class="py-4 flex justify-center hidden">
                <div class="size-6 border-2 border-accent-cyan border-t-transparent rounded-full animate-spin"></div>
            </div>
        </main>
        ${renderBottomNav('financial')}
    `;

    if (sortedServices.length > 0) {
        loadMoreHistory(sortedServices);
        setupHistoryObserver(sortedServices);
    }
}

function loadMoreHistory(sortedServices) {
    const container = document.getElementById('history-list-container');
    if (!container) return;

    const startIndex = currentHistoryPage * HISTORY_PAGE_SIZE;
    const endIndex = startIndex + HISTORY_PAGE_SIZE;
    const itemsToRender = sortedServices.slice(startIndex, endIndex);

    if (itemsToRender.length === 0) return;

    const html = itemsToRender.map(s => {
        const isPub = s.type === 'Public';
        const colorClass = isPub ? 'text-accent-cyan' : 'text-service-ospe';
        const bgClass = isPub ? 'bg-accent-cyan/10' : 'bg-service-ospe/10';
        const icon = isPub ? 'account_balance' : 'shopping_cart';
        return `
            <div onclick="router.navigateTo('#details?id=${s.id}')" class="glass-card p-4 rounded-2xl flex items-center justify-between border-white/5 cursor-pointer hover:bg-white/5 transition-colors">
                <div class="flex items-center gap-4">
                    <div class="size-12 rounded-xl ${bgClass} flex items-center justify-center ${colorClass}">
                        <span class="material-symbols-outlined">${icon}</span>
                    </div>
                    <div>
                        <p class="font-bold text-sm text-slate-800 dark:text-slate-900 dark:text-white">${escapeHTML(s.location)}</p>
                        <div class="flex items-center gap-2 mt-0.5">
                            <span class="text-[11px] text-slate-400">${store.getFormattedDate(s.date)} • ${s.hours}h</span>
                            ${s.status === 'paid' ? '<span class="text-[10px] text-green-400 font-bold bg-green-500/10 px-1.5 rounded">PAGADO</span>' : ''}
                        </div>
                    </div>
                </div>
                <span class="material-symbols-outlined text-slate-600">chevron_right</span>
            </div>
        `;
    }).join('');

    container.insertAdjacentHTML('beforeend', html);
    currentHistoryPage++;

    // Hide sentinel if we've loaded everything
    if (endIndex >= sortedServices.length) {
        const sentinel = document.getElementById('history-loading-sentinel');
        if (sentinel) sentinel.classList.add('hidden');
        if (historyObserver) historyObserver.disconnect();
    }
}

function setupHistoryObserver(sortedServices) {
    const sentinel = document.getElementById('history-loading-sentinel');
    if (!sentinel) return;

    // Show sentinel if there are more pages
    if (sortedServices.length > HISTORY_PAGE_SIZE) {
        sentinel.classList.remove('hidden');
    }

    const options = {
        root: null,
        rootMargin: '100px',
        threshold: 0.1
    };

    historyObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            loadMoreHistory(sortedServices);
        }
    }, options);

    historyObserver.observe(sentinel);
}
