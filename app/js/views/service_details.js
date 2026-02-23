/**
 * Adicionales Santa Fe - Service Details View
 */

function renderServiceDetails(container, serviceId) {
    if (!container) container = document.getElementById('app');
    const service = store.services.find(s => s.id === serviceId);

    if (!service) {
        showToast("Servicio no encontrado");
        router.navigateTo('#agenda');
        return;
    }

    const isPaid = service.status === 'paid';

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center justify-between">
            <button onclick="window.history.back()" class="size-10 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-400 transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 class="text-lg font-bold text-white">Detalle Servicio</h1>
            
             <button onclick="handleDeleteService('${serviceId}')" class="size-10 rounded-full hover:bg-red-500/10 flex items-center justify-center text-red-500 transition-colors">
                <span class="material-symbols-outlined">delete</span>
            </button>
        </header>

        <main class="p-6 space-y-6 pb-32 max-w-md mx-auto">
             <!-- Status Banner -->
             <div class="p-4 rounded-xl ${isPaid ? 'bg-green-500/10 border border-green-500/20' : 'bg-slate-800 border border-white/5'} flex justify-between items-center transition-all">
                <div>
                    <span class="text-xs font-bold uppercase tracking-wider ${isPaid ? 'text-green-400' : 'text-slate-400'}">Estado</span>
                    <p class="text-lg font-bold text-white">${isPaid ? 'LIQUIDADO' : 'PENDIENTE DE PAGO'}</p>
                </div>
                <!-- Toggle Switch -->
                <button onclick="handleTogglePaid('${serviceId}', ${!isPaid})" class="h-8 px-4 rounded-full flex items-center gap-2 font-bold text-xs ${isPaid ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 'bg-white/10 text-slate-300'} transition-all">
                    ${isPaid ? '<span class="material-symbols-outlined text-sm">check</span> PAGADO' : 'MARCAR PAGADO'}
                </button>
             </div>

             <!-- Info Card -->
             <div class="glass-card rounded-2xl p-6 space-y-6">
                 <div>
                    <span class="text-xs text-slate-500 uppercase font-bold">Lugar / Objetivo</span>
                    <h2 class="text-2xl font-bold text-white leading-tight">${service.location}</h2>
                    <p class="text-primary font-bold text-sm mt-1">${service.type} - ${service.subType}</p>
                 </div>
                 
                 <div class="grid grid-cols-2 gap-6">
                    <div>
                        <span class="flex items-center gap-2 text-slate-400 text-xs font-bold mb-1">
                            <span class="material-symbols-outlined text-sm">calendar_today</span> Fecha
                        </span>
                        <p class="text-white font-medium">${store.getFormattedDate(service.date)}</p>
                    </div>
                     <div>
                        <span class="flex items-center gap-2 text-slate-400 text-xs font-bold mb-1">
                            <span class="material-symbols-outlined text-sm">schedule</span> Horario
                        </span>
                        <p class="text-white font-medium">${service.startTime} - ${service.endTime}</p>
                    </div>
                 </div>
                 
                 <div class="border-t border-white/10 pt-4 flex justify-between items-center">
                    <div>
                        <span class="text-xs text-slate-500 uppercase font-bold">Total a Cobrar</span>
                        <p class="text-3xl font-black text-white">$${(service.total || 0).toLocaleString()}</p>
                    </div>
                 </div>
             </div>
             
             <!-- Warning if future -->
             ${service.date > store.getLocalDateString() ? `
                 <div class="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl flex gap-3 text-blue-400 text-xs">
                    <span class="material-symbols-outlined text-lg">info</span>
                    <p>Este servicio está agendado para el futuro.</p>
                 </div>
             ` : ''}
        </main>
    `;

    // Local Handlers to avoid polluting global scope more than necessary
    window.handleTogglePaid = async (id, newStatus) => {
        try {
            await DB.updateService(id, { status: newStatus ? 'paid' : 'pending' });
            showToast(newStatus ? "¡Marcado como COBRADO! 💰" : "Marcado como Pendiente");
            window.history.back();
        } catch (e) {
            showToast("Error update: " + e.message);
        }
    };

    window.handleDeleteService = async (id) => {
        if (confirm("¿Seguro que quieres borrar este servicio? No se puede deshacer.")) {
            try {
                await DB.deleteService(id);
                showToast("Servicio eliminado");
                window.history.back();
            } catch (e) {
                showToast("Error delete: " + e.message);
            }
        }
    };
}
