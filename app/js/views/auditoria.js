/**
 * Adicionales Santa Fe - Auditoría de Seguridad
 * Módulo para administradores para revisar logs de sistema
 */

function renderAuditoria(container) {
    if (!container) container = document.getElementById('app');

    // Only allow if admin
    if (store.user?.role !== 'admin') {
        router.navigateTo('#agenda');
        return;
    }

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center gap-4">
            <button onclick="router.navigateTo('#admin')" class="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <div class="flex flex-col">
                <h1 class="text-lg font-black text-white leading-none">Auditoría</h1>
                <span class="text-[10px] text-primary font-bold uppercase tracking-widest">Logs de Seguridad</span>
            </div>
        </header>

        <main class="p-4 space-y-6 pb-32 max-w-md mx-auto view-transition">
            <div class="glass-card p-4 rounded-2xl border border-white/5 space-y-4">
                <div class="flex justify-between items-center">
                    <h2 class="text-sm font-bold text-white uppercase tracking-widest">Registros del Sistema</h2>
                    <button onclick="window._loadAuditLogs()" class="p-2 bg-white/5 rounded-xl text-primary hover:bg-white/10 transition-colors">
                        <span class="material-symbols-outlined text-sm">refresh</span>
                    </button>
                </div>
                
                <div class="space-y-3" id="audit-logs-container">
                    <div class="text-center py-10 opacity-50">
                        <span class="material-symbols-outlined text-4xl mb-2 animate-spin">sync</span>
                        <p class="text-xs">Cargando logs...</p>
                    </div>
                </div>
            </div>
        </main>
        ${renderBottomNav('admin')}
    `;

    window._loadAuditLogs = async () => {
        const container = document.getElementById('audit-logs-container');
        container.innerHTML = `<div class="text-center py-10 opacity-50"><span class="material-symbols-outlined text-4xl mb-2 animate-spin">sync</span><p class="text-xs">Cargando logs...</p></div>`;
        
        if (window.DB && typeof window.DB.getAuditLogs === 'function') {
            const logs = await window.DB.getAuditLogs();
            if (!logs || logs.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-10 opacity-50">
                        <span class="material-symbols-outlined text-4xl mb-2">shield</span>
                        <p class="text-xs">No hay registros de auditoría</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = logs.map(log => `
                <div class="p-3 bg-white/5 rounded-xl border border-white/5 border-l-2 ${log.action.includes('delete') ? 'border-l-red-500' : 'border-l-primary'}">
                    <div class="flex justify-between items-start mb-1">
                        <span class="text-[10px] font-bold text-slate-400">${new Date(log.timestamp).toLocaleString('es-AR')}</span>
                        <span class="text-[9px] uppercase font-black tracking-widest ${log.action.includes('delete') ? 'text-red-400' : 'text-primary'}">${log.action}</span>
                    </div>
                    <p class="text-xs text-white font-medium break-all">${log.user_email}</p>
                    <p class="text-[10px] text-slate-500 mt-1 uppercase">Target: ${log.target_type || 'N/A'}</p>
                </div>
            `).join('');
        } else {
            container.innerHTML = `
                <div class="text-center py-10 opacity-50 text-amber-500">
                    <span class="material-symbols-outlined text-4xl mb-2">warning</span>
                    <p class="text-xs">Módulo de auditoría no conectado a Supabase</p>
                </div>
            `;
        }
    };

    // Load logs on start
    window._loadAuditLogs();
}

// Global Audit Logger utility
window.AuditLogger = {
    log: async (action, targetType, targetId, metadata = {}) => {
        const user = store.user;
        if (!user) return;
        
        try {
            if (window.DB && typeof window.DB.saveAuditLog === 'function') {
                await window.DB.saveAuditLog({
                    user_email: user.email,
                    action,
                    target_type: targetType,
                    target_id: targetId,
                    metadata
                });
            } else {
                console.warn("Audit log skipped (no DB connection):", action);
            }
        } catch(e) {
            console.error("Failed to write audit log", e);
        }
    }
};

window.renderAuditoria = renderAuditoria;
