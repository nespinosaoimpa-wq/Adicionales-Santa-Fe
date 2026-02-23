/**
 * Adicionales Santa Fe - Agenda & Calendar View
 */

function renderAgenda(container) {
    if (!container) container = document.getElementById('app');

    // State for Calendar View
    if (!store.viewDate) store.viewDate = new Date();

    const year = store.viewDate.getFullYear();
    const month = store.viewDate.getMonth();
    const currentMonthLabel = store.viewDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });

    const selectedDate = store.selectedDate || store.getLocalDateString();

    // Get services for selected date
    const dayServices = store.services.filter(s => s.date === selectedDate);

    // Find next shift (first service in future)
    const nextShift = store.services
        .filter(s => new Date(s.date + 'T' + (s.time || '00:00')) > new Date())
        .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

    const html = `
        <!-- Header -->
        <header class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 pt-12 pb-4">
            <div class="flex justify-between items-center">
                <div>
                    <h1 class="text-2xl font-bold tracking-tight dark:text-white">Mi Agenda</h1>
                    <div class="flex items-center gap-2">
                        <button id="btn-prev-month" class="text-slate-400 hover:text-primary"><span class="material-symbols-outlined text-sm">arrow_back_ios</span></button>
                        <p class="text-sm text-slate-500 dark:text-slate-400 capitalize w-24 text-center select-none">${currentMonthLabel}</p>
                        <button id="btn-next-month" class="text-slate-400 hover:text-primary"><span class="material-symbols-outlined text-sm">arrow_forward_ios</span></button>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button onclick="store.shareApp()" class="size-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center border border-primary/20 shadow-lg shadow-primary/10">
                        <span class="material-symbols-outlined text-xl">share</span>
                    </button>
                    <button onclick="store.toggleDebug()" class="size-10 rounded-full bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-white transition-all flex items-center justify-center border border-white/5 shadow-xl">
                        <span class="material-symbols-outlined text-xl">terminal</span>
                    </button>
                    <button onclick="showToast('Sin notificaciones nuevas')" class="size-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                        <span class="material-symbols-outlined">notifications</span>
                    </button>
                    <div onclick="router.navigateTo('#profile')" class="size-10 rounded-full overflow-hidden border-2 border-primary/20 cursor-pointer hover:scale-105 transition-transform">
                        <img class="w-full h-full object-cover" src="${store.user.avatar}" />
                    </div>
                </div>
            </div>
        </header>

        <main class="flex-1 overflow-y-auto px-6 space-y-8 pb-32">
            <!-- Next Shift Hero Card -->
            ${nextShift ? `
            <section class="mt-4">
                <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-blue-700 p-6 text-white shadow-xl shadow-primary/20">
                    <div class="flex justify-between items-start mb-4">
                        <div class="space-y-1">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm">
                                Siguiente Servicio
                            </span>
                            <h2 class="text-xl font-bold">Adicional ${nextShift.type}</h2>
                        </div>
                        <div class="flex flex-col items-end">
                             <span class="material-symbols-outlined text-white/80">alarm</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-4 mb-6">
                        <div class="p-3 bg-white/10 rounded-xl">
                            <span class="material-symbols-outlined text-3xl">timer</span>
                        </div>
                        <div>
                            <p class="text-3xl font-bold tracking-tighter">${nextShift.hours}h</p>
                            <p class="text-xs opacity-80">${store.getFormattedDate(nextShift.date)} • ${nextShift.location}</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                        <div>
                            <p class="text-[10px] uppercase font-bold opacity-60">Duración</p>
                            <p class="font-medium">${nextShift.hours} Horas</p>
                        </div>
                        <div>
                            <p class="text-[10px] uppercase font-bold opacity-60">Pago Estimado</p>
                            <p class="font-medium">$${(nextShift.total || 0).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </section>
            ` : ''}

            <!-- Calendar Section -->
            <section class="space-y-4">
                <div class="flex justify-between items-center">
                    <h3 class="font-bold text-lg dark:text-white">Calendario</h3>
                    <div class="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                        <button onclick="store.viewDate = new Date(); renderAgenda(document.getElementById('app'))" class="px-3 py-1 text-xs font-semibold rounded-md bg-white dark:bg-slate-700 shadow-sm dark:text-white">Hoy</button>
                    </div>
                </div>
                <div class="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm">
                    <!-- Calendar Grid Header -->
                    <div class="grid grid-cols-7 gap-1 mb-2">
                         ${['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'].map(d =>
        `<div class="text-center text-[10px] font-bold text-slate-400 uppercase">${d}</div>`
    ).join('')}
                    </div>
                    <!-- Calendar Grid -->
                    <div class="grid grid-cols-7 gap-y-2" id="calendar-grid">
                        ${generateCalendarGrid(year, month, selectedDate)}
                    </div>
                </div>
            </section>

            <!-- Shifts List -->
            <section class="space-y-4">
                <h3 class="font-bold text-lg dark:text-white">Turnos para el ${store.getFormattedDate(selectedDate)}</h3>
                <div class="space-y-3">
                    ${dayServices.length > 0 ? dayServices.map((s, i) => renderServiceCard(s, i)).join('') :
            `<div class="flex flex-col items-center py-10 text-center animate-slide-up">
                <div class="size-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span class="material-symbols-outlined text-3xl text-primary/40">event_busy</span>
                </div>
                <p class="text-sm font-semibold dark:text-white mb-1">Sin servicios</p>
                <p class="text-xs text-slate-400 mb-4">No hay turnos para esta fecha</p>
                <button onclick="router.navigateTo('#register')" class="px-5 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-lg shadow-primary/20 active:scale-95 transition-transform">
                    + Registrar Servicio
                </button>
            </div>`}
                </div>
            </section>
        </main>
        ${renderBottomNav('agenda')}
    `;

    container.innerHTML = html;

    // Attach listeners
    document.querySelectorAll('.calendar-day').forEach(el => {
        el.addEventListener('click', (e) => {
            store.selectedDate = e.currentTarget.dataset.date;
            renderAgenda(container);
        });
    });

    // Month Nav Listeners
    document.getElementById('btn-prev-month').addEventListener('click', () => {
        store.viewDate.setMonth(store.viewDate.getMonth() - 1);
        renderAgenda(container);
    });

    document.getElementById('btn-next-month').addEventListener('click', () => {
        store.viewDate.setMonth(store.viewDate.getMonth() + 1);
        renderAgenda(container);
    });
}

function generateCalendarGrid(year, month, selectedDate) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let html = '';

    // Empty slots
    for (let i = 0; i < firstDay; i++) {
        html += `<div class="py-2"></div>`;
    }

    // Days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isSelected = dateStr === selectedDate;
        const hasService = store.services.some(s => s.date === dateStr);
        const isToday = store.getLocalDateString() === dateStr;

        // Colors
        const hasPublic = store.services.some(s => s.date === dateStr && s.type === 'Public');
        const hasPrivate = store.services.some(s => s.date === dateStr && s.type === 'Private');

        let dots = '';
        if (hasPublic) dots += `<div class="size-1 rounded-full bg-primary"></div>`;
        if (hasPrivate) dots += `<div class="size-1 rounded-full bg-service-private"></div>`;

        html += `
            <div class="flex flex-col items-center py-2 relative calendar-day cursor-pointer" data-date="${dateStr}">
                ${isSelected ? `<div class="absolute inset-0 bg-primary/10 rounded-lg border border-primary/20"></div>` : ''}
                <span class="relative z-10 font-bold ${isSelected ? 'text-primary' : (isToday ? 'text-accent-cyan' : 'text-slate-500 dark:text-slate-300')}">${day}</span>
                <div class="flex gap-0.5 mt-1 relative z-10 h-1">
                    ${dots}
                </div>
            </div>
        `;
    }
    return html;
}

function renderServiceCard(service, index = 0) {
    const isPublic = service.type === 'Public';
    const gradientFrom = isPublic ? 'from-primary' : 'from-purple-500';
    const gradientTo = isPublic ? 'to-blue-400' : 'to-pink-500';
    const textColor = isPublic ? 'text-primary' : 'text-purple-400';
    const bgSoft = isPublic ? 'bg-primary/10' : 'bg-purple-500/10';
    const icon = isPublic ? 'account_balance' : 'storefront';
    const typeLabel = isPublic ? 'Público' : (service.type === 'OSPES' ? 'OSPES' : 'Privado');

    const timeRange = service.startTime && service.endTime ? `${service.startTime} - ${service.endTime}` : 'Horario no especificado';
    const subType = service.subType || '';

    const today = store.getLocalDateString();
    const isFuture = service.date > today;
    let statusLabel = 'Pendiente';
    let statusColor = 'text-amber-400';
    let statusBg = 'bg-amber-400/10';
    let statusDot = 'bg-amber-400';

    if (service.status === 'paid') {
        statusLabel = 'Liquidado';
        statusColor = 'text-green-400';
        statusBg = 'bg-green-400/10';
        statusDot = 'bg-green-400';
    } else if (isFuture) {
        statusLabel = 'Agendado';
        statusColor = 'text-blue-400';
        statusBg = 'bg-blue-400/10';
        statusDot = 'bg-blue-400';
    }

    return `
        <div onclick="router.navigateTo('#service/${service.id}')" 
             class="service-card animate-slide-up bg-white dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm cursor-pointer relative overflow-hidden"
             style="animation-delay: ${index * 60}ms">
            <!-- Gradient accent top -->
            <div class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${gradientFrom} ${gradientTo}"></div>
            
            <div class="flex gap-4">
                <div class="${bgSoft} size-12 rounded-xl flex items-center justify-center ${textColor} shrink-0">
                    <span class="material-symbols-outlined">${icon}</span>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex justify-between items-start" style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div class="min-w-0">
                            <h4 class="font-bold dark:text-white leading-tight truncate">${service.location || 'Sin ubicación'}</h4>
                            <p class="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">${typeLabel} ${subType}</p>
                        </div>
                        <span class="text-sm font-extrabold ${textColor} whitespace-nowrap ml-2">$${(service.total || 0).toLocaleString('es-AR')}</span>
                    </div>
                    
                    <div class="flex items-center gap-3 mt-2.5">
                        <div class="flex items-center gap-1">
                            <span class="material-symbols-outlined text-[14px] text-slate-400">schedule</span>
                            <span class="text-[10px] text-slate-500 dark:text-slate-400 font-medium">${timeRange}</span>
                        </div>
                        <span class="size-0.5 rounded-full bg-slate-500"></span>
                        <div class="flex items-center gap-1">
                            <span class="material-symbols-outlined text-[14px] text-slate-400">timer</span>
                            <span class="text-[10px] text-slate-500 font-medium">${service.hours}h</span>
                        </div>
                        <div class="flex items-center gap-1.5 px-2 py-0.5 rounded-full ${statusBg}">
                            <span class="size-1.5 rounded-full ${statusDot} animate-pulse"></span>
                            <span class="text-[10px] ${statusColor} font-bold uppercase tracking-tighter">${statusLabel}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
