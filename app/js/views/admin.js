/**
 * Adicionales Santa Fe - Admin Views
 */

async function renderAdmin(container) {
    container.innerHTML = `
        <div class="flex flex-col items-center justify-center h-screen space-y-4 bg-background-dark">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p class="text-slate-500 animate-pulse font-medium">Sincronizando datos globales en vivo...</p>
        </div>
    `;

    window.allUsers = window.allUsers || [];
    window.allServices = window.allServices || [];
    if (window.queryLogs === undefined) window.queryLogs = null;
    let reviewsMap = new Map(); // id -> review
    let reviewsLoaded = false;

    const updateUI = () => {
        const stats = DB.calculateStats(window.allUsers, window.allServices);

        container.innerHTML = `
        <div class="min-h-screen bg-[#0f172a] text-slate-200 font-sans pb-24 animate-fade-in">
            <!-- Glass Header -->
            <header class="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 px-6 h-20 flex items-center justify-between shadow-2xl">
                <div class="flex items-center gap-4">
                    <div class="size-12 bg-gradient-to-br from-primary to-accent-cyan rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                        <span class="material-symbols-outlined text-white text-2xl">analytics</span>
                    </div>
                    <div>
                        <h1 class="text-xl font-black text-white tracking-tight uppercase italic flex items-center gap-2">
                            Admin Hub
                            <span class="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        </h1>
                        <p class="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Monitoreo Real-time</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <button onclick="store.exportGlobalData()" class="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold transition-all flex items-center gap-2 text-slate-300">
                        <span class="material-symbols-outlined text-sm">download</span> Exportar
                    </button>
                    <button onclick="router.navigateTo('#agenda')" class="size-10 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
            </header>

            <main class="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
                
                <!-- KPI Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    ${_renderAdminKPICard('Usuarios Totales', stats.userCount, 'group', 'from-blue-500/20 to-blue-600/5', 'text-blue-400')}
                    ${_renderAdminKPICard('Activos 24h', stats.activeUsers, 'bolt', 'from-green-500/20 to-green-600/5', 'text-green-400')}
                    ${_renderAdminKPICard('Horas Globales', Math.round(stats.totalHours).toLocaleString(), 'schedule', 'from-cyan-500/20 to-cyan-600/5', 'text-cyan-400')}
                    ${_renderAdminKPICard('Caja Global estimada', formatMoney(stats.totalRevenue), 'payments', 'from-amber-500/20 to-amber-600/5', 'text-amber-400')}
                </div>

                <!-- Daily Summary Section -->
                <div class="bg-slate-800/40 backdrop-blur-md rounded-3xl border border-white/5 p-6 shadow-xl">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xs font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                             <span class="material-symbols-outlined text-primary text-sm">calendar_view_day</span>
                             Resumen Diario
                        </h3>
                    </div>
                    <div class="overflow-x-auto">
                        <div class="flex gap-4 pb-4">
                            ${stats.dailySummary.slice(0, 10).map(day => `
                                <div class="min-w-[140px] p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                                    <p class="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1">${store.getFormattedDate(day.date)}</p>
                                    <p class="text-lg font-black text-white">${day.count}</p>
                                    <p class="text-[10px] text-slate-400 mb-2">Servicios</p>
                                    <div class="h-1 w-full bg-primary/20 rounded-full overflow-hidden mb-2">
                                        <div class="h-full bg-primary" style="width: ${Math.min((day.total / 500000) * 100, 100)}%"></div>
                                    </div>
                                    <p class="text-[11px] font-bold text-emerald-400">${formatMoney(day.total)}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Charts & Stats -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- Trend Chart -->
                    <div class="lg:col-span-2 bg-slate-800/40 backdrop-blur-md rounded-3xl border border-white/5 p-6 shadow-xl">
                        <div class="flex items-center justify-between mb-8">
                            <h3 class="text-sm font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <span class="material-symbols-outlined text-primary text-sm">trending_up</span>
                                Evolución de Ingresos
                            </h3>
                        </div>
                        <div class="h-64 relative">
                            <canvas id="adminTrendChart"></canvas>
                        </div>
                    </div>

                    <!-- Global Type Distribution (Restored) -->
                    <div class="bg-slate-800/40 backdrop-blur-md rounded-3xl border border-white/5 p-6 shadow-xl">
                         <div class="flex items-center justify-between mb-8">
                            <h3 class="text-sm font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <span class="material-symbols-outlined text-accent-cyan text-sm">pie_chart</span>
                                Mix de Servicios
                            </h3>
                        </div>
                        <div class="h-64 relative">
                            <canvas id="adminTypeChart"></canvas>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     <!-- Reviews Panel -->
                    <div class="bg-slate-800/40 backdrop-blur-md rounded-3xl border border-white/5 p-6 shadow-xl h-[500px] flex flex-col">
                        <h3 class="text-sm font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center justify-between">
                            <span>Reseñas Recientes</span>
                            <span class="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500 text-[10px]">${reviewsMap.size}</span>
                        </h3>
                        <div class="space-y-4 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                            ${!reviewsLoaded ? '<p class="text-slate-500 text-xs italic text-center py-8">Cargando buzón...</p>' :
                reviewsMap.size === 0 ? '<p class="text-slate-500 text-xs italic text-center py-8 font-bold uppercase tracking-widest opacity-30">No hay reseñas aún</p>' :
                    Array.from(reviewsMap.values()).sort((a, b) => {
                        const dateA = new Date(a.created_at || a.timestamp || 0).getTime();
                        const dateB = new Date(b.created_at || b.timestamp || 0).getTime();
                        return dateB - dateA;
                    }).map(r => {
                        const isAlert = r.comment.startsWith('[CRITICAL-MH]') || r.comment.startsWith('[CRISIS]');
                        const displayComment = isAlert ? r.comment.replace(/^\[CRITICAL-MH\]|^\[CRISIS\]/, '').trim() : r.comment;

                        return `
                                <div class="p-4 ${isAlert ? 'bg-red-500/10 border-red-500/30' : 'bg-white/5 border-white/5'} rounded-2xl border animate-fade-in">
                                    <div class="flex justify-between items-start mb-2">
                                        <div class="flex flex-col">
                                            <p class="text-[9px] font-black ${isAlert ? 'text-red-400' : 'text-primary'} truncate max-w-[120px]">${r.user_email}</p>
                                            ${isAlert ? '<span class="text-[7px] font-black bg-red-500 text-white px-1.5 py-0.5 rounded-full w-fit mt-1">ALERTA SALUD MENTAL</span>' : ''}
                                        </div>
                                        <div class="flex">
                                            ${!isAlert ? Array(5).fill(0).map((_, i) => `
                                                <span class="material-symbols-outlined text-[10px] ${i < r.rating ? 'text-amber-400' : 'text-slate-700'}">star</span>
                                            `).join('') : '<span class="material-symbols-outlined text-red-500 text-sm">warning</span>'}
                                        </div>
                                    </div>
                                    <p class="text-[11px] ${isAlert ? 'text-red-200 font-bold' : 'text-slate-300'} leading-relaxed italic">"${displayComment}"</p>
                                    <p class="text-[8px] text-slate-600 mt-2 text-right uppercase font-bold">${_formatAdminDate(r.created_at || r.timestamp)}</p>
                                </div>
                            `;
                    }).join('')}
                        </div>
                    </div>

                    <!-- Centinela Auditor Panel -->
                    <div class="bg-slate-800/40 backdrop-blur-md rounded-3xl border border-white/5 p-6 shadow-xl h-[500px] flex flex-col">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-sm font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <span class="material-symbols-outlined text-primary text-sm">smart_toy</span>
                                Auditoria Centinela
                                <span class="flex h-2 w-2 rounded-full ${window.queryLogs !== null ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}"></span>
                            </h3>
                            <button onclick="router.navigateTo('#asistente')" class="text-[10px] font-bold text-primary hover:underline">Entrenar IA</button>
                        </div>
                        <div class="space-y-3 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                            ${window.queryLogs === null ? '<p class="text-slate-500 text-xs italic text-center py-8">Conectando con Supabase...</p>' :
                window.queryLogs.length === 0 ? '<p class="text-slate-500 text-xs italic text-center py-8">Sin consultas registradas aun</p>' :
                    window.queryLogs.map(log => `
                                <div class="p-3 bg-white/5 border border-white/5 rounded-2xl space-y-2">
                                    <div class="flex justify-between items-center">
                                        <span class="text-[8px] font-black text-slate-500 uppercase tracking-widest">${log.category}</span>
                                        <span class="px-1.5 py-0.5 rounded bg-${log.score < 20 ? 'red' : log.score < 50 ? 'amber' : 'emerald'}-500/20 text-${log.score < 20 ? 'red' : log.score < 50 ? 'amber' : 'emerald'}-500 text-[8px] font-bold">Confianza: ${log.score}</span>
                                    </div>
                                    <p class="text-[11px] text-white font-medium">Q: ${log.query}</p>
                                    <p class="text-[10px] text-slate-400 italic">R: ${(log.response || '').substring(0, 60)}...</p>
                                    <div class="flex justify-between items-center pt-1 border-t border-white/5">
                                        <span class="text-[7px] text-slate-600 uppercase font-bold">${log.user_email}</span>
                                        <span class="text-[7px] text-slate-600">${_formatAdminDate(log.timestamp)}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Active Banners -->
                <div class="bg-slate-800/40 backdrop-blur-md rounded-3xl border border-white/5 p-6 shadow-xl">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-sm font-bold text-white flex items-center gap-3">
                            <span class="material-symbols-outlined text-amber-500">ads_click</span>
                            Pauta Publicitaria
                        </h3>
                        <button onclick="window._showAddAdModal()" class="px-3 py-1 bg-primary/20 text-primary rounded-lg text-[10px] font-black uppercase hover:bg-primary/30 transition-all">
                            + Nuevo Banner
                        </button>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        ${store.ads && store.ads.length > 0 ? store.ads.map(ad => `
                            <div class="group relative rounded-2xl overflow-hidden border border-white/10 aspect-video shadow-lg bg-slate-900 transition-all hover:border-amber-500/50">
                                <img src="${ad.imageUrl}" class="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all">
                                
                                <!-- Polish delete button -->
                                <button onclick="store.deleteAd('${ad.id}')" 
                                    class="absolute top-2 right-2 size-8 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10 flex items-center justify-center hover:bg-red-500 hover:border-red-500 transition-all opacity-100 md:opacity-0 group-hover:opacity-100 active:scale-95 shadow-lg">
                                    <span class="material-symbols-outlined text-sm">delete</span>
                                </button>

                                <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-3 flex items-center justify-between">
                                    <p class="text-[10px] font-bold text-white uppercase tracking-wider truncate mr-2">
                                         Banner Activo
                                    </p>
                                    ${ad.linkUrl ? `
                                        <a href="${ad.linkUrl}" target="_blank" class="px-2 py-1 rounded bg-white/10 text-[8px] text-white flex items-center gap-1 uppercase font-black hover:bg-white/20 transition-all">
                                            <span class="material-symbols-outlined text-[10px]">open_in_new</span> Ir
                                        </a>` : ''}
                                </div>
                            </div>
                        `).join('') : '<p class="text-slate-500 text-xs italic">No hay banners configurados</p>'}
                    </div>
                </div>

                <!-- User Table -->
                <div class="bg-slate-800/40 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden shadow-xl">
                    <div class="p-6 border-b border-white/5 flex items-center justify-between">
                        <h3 class="font-bold text-white text-lg italic">Oficiales Registrados</h3>
                        <span class="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black text-slate-500">${allUsers.length} TOTAL</span>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-sm">
                            <thead class="bg-white/2 uppercase text-[10px] font-black text-slate-500 tracking-widest border-b border-white/5">
                                <tr>
                                    <th class="px-6 py-4">Oficial</th>
                                    <th class="px-6 py-4">Rango</th>
                                    <th class="px-6 py-4 text-center">Conexión</th>
                                    <th class="px-6 py-4 text-right">Acción</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-white/5">
                                ${allUsers.map(u => `
                                    <tr class="hover:bg-white/[0.02] transition-colors group">
                                        <td class="px-6 py-4">
                                            <div class="flex items-center gap-3">
                                                <div class="size-8 rounded-full bg-slate-700">
                                                    <img src="${u.avatar || 'https://ui-avatars.com/api/?name=' + u.name}" class="w-full h-full rounded-full object-cover">
                                                </div>
                                                <div>
                                                    <p class="font-bold text-white text-xs">${u.name || 'Oficial'}</p>
                                                    <p class="text-[9px] text-slate-500 font-mono">${u.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4">
                                            <span class="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${u.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-500/20 text-slate-400'}">
                                                ${u.role || 'user'}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 text-center text-[10px] text-slate-400">
                                            ${u.lastLogin ? _formatAdminDate(u.lastLogin) : 'N/A'}
                                        </td>
                                        <td class="px-6 py-4 text-right">
                                            <button onclick="store.changeUserRole('${u.email}', '${u.role === 'admin' ? 'user' : 'admin'}')" class="text-[9px] font-bold text-primary hover:underline">
                                                ${u.role === 'admin' ? 'Bajar' : 'Subir'}
                                            </button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
        `;

        _mountAdminCharts(stats.chartData);
    };

    // Subscriptions
    const unsubUsers = DB.subscribeToUsers(data => {
        window.allUsers = data;
        updateUI();
    });

    const unsubServices = DB.subscribeToAllServices(data => {
        window.allServices = data;
        updateUI();
        // Force chart refresh after UI update
        setTimeout(() => _mountAdminCharts(DB.calculateStats(window.allUsers, window.allServices).chartData), 100);
    });

    const unsubReviews = DB.subscribeToReviews((newReview, isInitial) => {
        if (newReview === null) {
            reviewsLoaded = true;
            updateUI();
            return;
        }

        // Usar Map para asegurar unicidad por ID
        reviewsMap.set(newReview.id, newReview);
        reviewsLoaded = true;

        if (!isInitial) {
            showToast(`⭐ Nueva Reseña: "${newReview.comment}" - ${newReview.user_email}`);
        }
        updateUI();
    });

    const unsubLogs = DB.subscribeToQueryLogs(data => {
        window.queryLogs = data;
        updateUI();
    });

    store.addAd = async () => {
        const imageUrl = prompt("URL de la Imagen (direct link):");
        if (!imageUrl) return;
        const linkUrl = prompt("Link de destino (opcional):", "https://");
        try {
            await db.collection('ads').add({
                imageUrl,
                linkUrl: linkUrl || '',
                timestamp: new Date().toISOString()
            });
            showToast("✅ Publicidad agregada");
        } catch (e) {
            showToast("❌ Error al agregar");
        }
    };

    // Cleanup when navigating away
    const originalNavigate = router.navigateTo;
    router.navigateTo = (route) => {
        unsubUsers();
        unsubServices();
        unsubReviews();
        unsubLogs();
        router.navigateTo = originalNavigate;
        router.navigateTo(route);
    };
}

function _renderAdminKPICard(title, value, icon, gradient, textColor) {
    return `
        <div class="bg-slate-800/40 backdrop-blur-md rounded-3xl border border-white/5 p-6 shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-all">
            <div class="absolute -right-4 -top-4 size-24 bg-gradient-to-br ${gradient} rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
            <div class="flex items-center gap-4 relative z-10">
                <div class="size-12 rounded-2xl bg-white/5 flex items-center justify-center ${textColor}">
                    <span class="material-symbols-outlined text-2xl">${icon}</span>
                </div>
            </div>
            <div class="mt-4 relative z-10">
                <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest">${title}</p>
                <p class="text-2xl font-black text-white mt-1">${value}</p>
            </div>
        </div>
    `;
}

function _mountAdminCharts(data) {
    const ctxTrend = document.getElementById('adminTrendChart')?.getContext('2d');
    const ctxType = document.getElementById('adminTypeChart')?.getContext('2d');
    if (!ctxTrend) return; // Type chart might not be in the current HTML

    if (window.adminChartTrend) window.adminChartTrend.destroy();

    window.adminChartTrend = new Chart(ctxTrend, {
        type: 'line',
        data: {
            labels: data.dates.slice(-15),
            datasets: [{
                label: 'Volumen ($)',
                data: data.revenue.slice(-15),
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#4f46e5'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, border: { display: false }, ticks: { color: '#64748b', font: { size: 10 } } },
                x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 10 } } }
            }
        }
    });

    if (ctxType) {
        if (window.adminChartType) window.adminChartType.destroy();
        window.adminChartType = new Chart(ctxType, {
            type: 'doughnut',
            data: {
                labels: data.types,
                datasets: [{
                    data: data.typeCounts,
                    backgroundColor: ['#4f46e5', '#22c55e', '#eab308', '#ec4899', '#8b5cf6'],
                    borderWidth: 0,
                    hoverOffset: 20
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: { position: 'bottom', labels: { color: '#64748b', padding: 20, font: { weight: 'bold', size: 10 } } }
                }
            }
        });
    }
}

function _formatAdminDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

store.changeUserRole = async (email, newRole) => {
    if (!confirm(`¿Confirmas cambiar a ${email} al rol: ${newRole}?`)) return;
    try {
        await DB.updateUserRole(email, newRole);
        showToast("Rol actualizado");
        if (window.location.hash === '#admin') router.handleRoute();
    } catch (e) {
        showToast("Error: " + e.message);
    }
};

store.exportGlobalData = async () => {
    try {
        showToast("⏳ Generando reporte global...");
        const services = await DB.getAllServicesForStats();
        let csv = "Fecha,Usuario,Tipo,Sector,Horas,Total,Ubicacion\n";
        services.forEach(s => {
            csv += `"${s.date}","${s.userEmail}","${s.type}","${s.sector}","${s.hours}","${s.total}","${s.location || '-'}"\n`;
        });
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', `Adicionales_Global_${new Date().toISOString().split('T')[0]}.csv`);
        a.click();
        showToast("✅ Reporte descargado");
    } catch (e) {
        showToast("Error al exportar");
    }
};

store.filterUserTable = (query) => {
    const rows = document.querySelectorAll('#userAdminTable tbody tr');
    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
    });
};

store.handleAddAd = async (form) => {
    const imageUrl = form.imageUrl.value;
    const linkUrl = form.linkUrl.value;
    try {
        await DB.addAd({ imageUrl, linkUrl });
        showToast("Anuncio creado correctamente");
        form.reset();
        if (window.location.hash === '#admin') router.handleRoute();
    } catch (e) {
        showToast("Error al crear anuncio");
    }
};

store.deleteAd = async (id) => {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6';
    overlay.innerHTML = '<div class="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl"><div class="flex flex-col items-center text-center"><div class="size-12 rounded-full bg-red-500/20 flex items-center justify-center mb-3"><span class="material-symbols-outlined text-2xl text-red-400">delete_forever</span></div><h3 class="text-lg font-bold text-white mb-1">Eliminar anuncio</h3><p class="text-sm text-slate-400 mb-5">Esta accion no se puede deshacer</p><div class="flex gap-3 w-full"><button onclick="this.closest(\'.fixed\').remove()" class="flex-1 py-2.5 bg-white/10 text-white text-sm font-bold rounded-xl">Cancelar</button><button id="confirm-del-ad" class="flex-1 py-2.5 bg-red-500 text-white text-sm font-bold rounded-xl">Eliminar</button></div></div></div>';
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    document.body.appendChild(overlay);
    document.getElementById('confirm-del-ad').onclick = async () => {
        overlay.remove();
        await DB.deleteAd(id);
        if (window.location.hash === '#admin') router.handleRoute();
    };
};

window._showAddAdModal = () => {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6';
    overlay.innerHTML = `
        <div class="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-slide-up space-y-4">
            <h3 class="text-lg font-bold text-white flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">add_photo_alternate</span>
                Nuevo Banner
            </h3>
            <div class="space-y-3">
                <div>
                    <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">URL de la imagen *</label>
                    <input id="ad-image-url" type="url" placeholder="https://..." class="w-full mt-1 px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-slate-500 focus:border-primary/50 outline-none transition-all">
                </div>
                <div>
                    <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">URL de destino (opcional)</label>
                    <input id="ad-link-url" type="url" placeholder="https://..." class="w-full mt-1 px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-slate-500 focus:border-primary/50 outline-none transition-all">
                </div>
            </div>
            <div class="flex gap-3">
                <button onclick="this.closest('.fixed').remove()" class="flex-1 py-2.5 bg-white/10 text-white text-sm font-bold rounded-xl">Cancelar</button>
                <button id="btn-save-ad" class="flex-1 py-2.5 bg-primary text-white text-sm font-bold rounded-xl">Publicar</button>
            </div>
        </div>
    `;
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    document.body.appendChild(overlay);
    document.getElementById('btn-save-ad').onclick = async () => {
        const imageUrl = document.getElementById('ad-image-url').value.trim();
        const linkUrl = document.getElementById('ad-link-url').value.trim();
        if (!imageUrl) { showToast('Ingresa la URL de imagen'); return; }
        const btn = document.getElementById('btn-save-ad');
        btn.disabled = true; btn.textContent = 'Publicando...';
        try {
            await DB.addAd({ imageUrl, linkUrl: linkUrl || null });
            showToast('Anuncio publicado');
            overlay.remove();
            if (window.location.hash === '#admin') router.handleRoute();
        } catch (e) {
            showToast('Error al publicar');
            btn.disabled = false; btn.textContent = 'Publicar';
        }
    };
};
