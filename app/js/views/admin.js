/**
 * Adicionales Santa Fe - Admin Views
 */

async function renderAdmin(container) {
    container.innerHTML = `
        <div class="flex flex-col items-center justify-center h-screen space-y-4 bg-background-light dark:bg-background-dark">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p class="text-slate-500 animate-pulse font-medium">Sincronizando datos globales en vivo...</p>
        </div>
    `;

    window.allUsers = window.allUsers || [];
    window.allServices = window.allServices || [];
    if (window.queryLogs === undefined) window.queryLogs = null;
    window.adminDateFilter = window.adminDateFilter || 'all';
    let reviewsMap = new Map(); // id -> review
    let reviewsLoaded = false;

    // Load initial Gemini status
    if (window.adminGeminiApiKeyExists === undefined) {
        window.adminGeminiApiKeyExists = false;
        DB.getGlobalSetting('geminiApiKey').then(key => {
            window.adminGeminiApiKeyExists = !!key;
            updateUI();
        });
    }

    window._showAvatarModal = (avatarUrl, name, email) => {
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-6';
        overlay.innerHTML = `
            <div class="bg-slate-900 border border-white/10 rounded-3xl p-6 max-w-sm w-full shadow-2xl flex flex-col items-center relative animate-fade-in">
                <button onclick="this.closest('.fixed').remove()" class="absolute top-4 right-4 size-8 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-red-500 hover:border-red-500 transition-all active:scale-95">
                    <span class="material-symbols-outlined text-sm">close</span>
                </button>
                <div class="size-48 rounded-full border-4 border-primary/30 overflow-hidden mb-4 shadow-xl">
                    <img src="${avatarUrl}" class="w-full h-full object-cover animate-fade-in">
                </div>
                <h3 class="text-lg font-black text-white text-center">${name}</h3>
                <p class="text-xs text-slate-400 font-mono mt-1">${email}</p>
                <div class="mt-6 w-full flex justify-center">
                    <button onclick="this.closest('.fixed').remove()" class="px-6 py-2 bg-primary text-white text-xs font-bold rounded-xl active:scale-95 hover:bg-primary/95 transition-all shadow-lg shadow-primary/20">Cerrar</button>
                </div>
            </div>
        `;
        overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
        document.body.appendChild(overlay);
    };

    window.filterAdminUsers = () => {
        const searchQuery = document.getElementById('adminUserSearch')?.value.toLowerCase().trim() || '';
        const dateQuery = document.getElementById('adminUserDateFilter')?.value || '';
        
        const rows = document.querySelectorAll('#adminUserTableBody tr');
        let visibleCount = 0;
        
        rows.forEach(row => {
            const name = (row.getAttribute('data-name') || '').toLowerCase();
            const email = (row.getAttribute('data-email') || '').toLowerCase();
            const lastLoginIso = row.getAttribute('data-lastlogin');
            
            let matchSearch = true;
            if (searchQuery) {
                matchSearch = name.includes(searchQuery) || email.includes(searchQuery);
            }
            
            let matchDate = true;
            if (dateQuery && lastLoginIso) {
                const d = new Date(lastLoginIso);
                const userDateLocal = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                matchDate = (userDateLocal === dateQuery);
            } else if (dateQuery && !lastLoginIso) {
                matchDate = false;
            }
            
            if (matchSearch && matchDate) {
                row.style.display = '';
                visibleCount++;
            } else {
                row.style.display = 'none';
            }
        });
        
        const badge = document.getElementById('userCountBadge');
        if (badge) {
            if (searchQuery || dateQuery) {
                badge.textContent = `${visibleCount} de ${window.allUsers.length} FILTRADOS`;
            } else {
                badge.textContent = `${window.allUsers.length} TOTAL`;
            }
        }
    };

    window.resetAdminUserFilters = () => {
        const searchInput = document.getElementById('adminUserSearch');
        const dateInput = document.getElementById('adminUserDateFilter');
        if (searchInput) searchInput.value = '';
        if (dateInput) dateInput.value = '';
        window.filterAdminUsers();
    };

    const updateUI = () => {
        const stats = DB.calculateStats(window.allUsers, window.allServices, window.adminDateFilter);

        // Calculate approval rating and average stars
        const reviewsArray = Array.from(reviewsMap.values());
        const totalReviews = reviewsArray.length;
        let approvalRate = 0;
        let averageRating = 0;
        if (totalReviews > 0) {
            const positiveReviews = reviewsArray.filter(r => r.rating >= 4).length;
            approvalRate = Math.round((positiveReviews / totalReviews) * 100);
            const sumRatings = reviewsArray.reduce((acc, r) => acc + (parseInt(r.rating) || 0), 0);
            averageRating = (sumRatings / totalReviews).toFixed(1);
        }

        container.innerHTML = `
        <div class="min-h-screen bg-background-light dark:bg-[#0f172a] text-slate-800 dark:text-slate-200 font-sans pb-24 animate-fade-in">
            <!-- Glass Header -->
            <header class="sticky top-0 z-50 bg-background-light/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 px-6 h-20 flex items-center justify-between shadow-2xl">
                <div class="flex items-center gap-4">
                    <div class="hover:scale-105 transition-transform cursor-pointer">
                        ${renderLogo('large')}
                    </div>
                    <div>
                        <h1 class="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic flex items-center gap-2">
                            Admin Hub
                            <span class="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        </h1>
                        <p class="text-[10px] text-slate-500 dark:text-slate-400 font-bold tracking-widest uppercase">Monitoreo Real-time</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <select id="adminDateSelect" onchange="window.updateAdminFilter(this.value)" class="px-3 py-2 rounded-xl bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-300 outline-none">
                        <option value="all" ${window.adminDateFilter === 'all' ? 'selected' : ''}>Histórico</option>
                        <option value="this_month" ${window.adminDateFilter === 'this_month' ? 'selected' : ''}>Mes Actual</option>
                        <option value="last_month" ${window.adminDateFilter === 'last_month' ? 'selected' : ''}>Mes Pasado</option>
                    </select>

                    <button onclick="store.exportGlobalData()" class="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 text-xs font-bold transition-all flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <span class="material-symbols-outlined text-sm">download</span> Exportar
                    </button>
                    <button onclick="router.navigateTo('#admin/auditoria')" class="px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs font-bold transition-all flex items-center gap-2 text-amber-600 dark:text-amber-400">
                        <span class="material-symbols-outlined text-sm">shield</span> Auditoría
                    </button>
                    <button onclick="router.navigateTo('#agenda')" class="size-10 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
            </header>

            <main class="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
                
                <!-- KPI Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    ${_renderAdminKPICard('Usuarios Totales', stats.userCount, 'group', 'from-blue-500/20 to-blue-600/5', 'text-blue-400')}
                    ${_renderAdminKPICard('Activos 24h', stats.activeUsers, 'bolt', 'from-green-500/20 to-green-600/5', 'text-green-400')}
                    ${_renderAdminKPICard('Horas Globales', Math.round(stats.totalHours).toLocaleString(), 'schedule', 'from-cyan-500/20 to-cyan-600/5', 'text-cyan-400')}
                    ${_renderAdminKPICard('Caja Global estimada', formatMoney(stats.totalRevenue), 'payments', 'from-amber-500/20 to-amber-600/5', 'text-amber-400')}
                    ${_renderAdminKPICard('Aprobación App', totalReviews > 0 ? `${approvalRate}% (${averageRating} ⭐)` : 'N/A', 'star', 'from-purple-500/20 to-purple-600/5', 'text-amber-400')}
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
                                    <p class="text-lg font-black text-slate-900 dark:text-white">${day.count}</p>
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

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                                    ${displayComment ? `<p class="text-[11px] ${isAlert ? 'text-red-200 font-bold' : 'text-slate-700 dark:text-slate-300'} leading-relaxed italic">"${displayComment}"</p>` : ''}
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
                                    <p class="text-[11px] text-slate-900 dark:text-white font-medium">Q: ${log.query}</p>
                                    <p class="text-[10px] text-slate-400 italic">R: ${(log.response || '').substring(0, 60)}...</p>
                                    <div class="flex justify-between items-center pt-1 border-t border-white/5">
                                        <span class="text-[7px] text-slate-600 uppercase font-bold">${log.user_email}</span>
                                        <span class="text-[7px] text-slate-600">${_formatAdminDate(log.timestamp)}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Top Users by Usage Panel (Los que más le dan uso) -->
                    <div class="bg-slate-800/40 backdrop-blur-md rounded-3xl border border-white/5 p-6 shadow-xl h-[500px] flex flex-col">
                        <h3 class="text-sm font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center justify-between">
                            <span>Más Activos (Uso de App)</span>
                            <span class="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px]">Top 5</span>
                        </h3>
                        <div class="space-y-4 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                            ${!stats.topUsersByUsage || stats.topUsersByUsage.length === 0 ? '<p class="text-slate-500 text-xs italic text-center py-8">Sin registros de uso</p>' :
                            stats.topUsersByUsage.map((u, index) => {
                                const rankColors = [
                                    'bg-amber-500/20 text-amber-400 border-amber-500/30',
                                    'bg-slate-300/20 text-slate-300 border-slate-300/30',
                                    'bg-amber-700/20 text-amber-600 border-amber-700/30',
                                    'bg-white/5 text-slate-400 border-white/5',
                                    'bg-white/5 text-slate-400 border-white/5'
                                ];
                                const rankBadge = index < 3 ? `🏆 ${index + 1}°` : `${index + 1}°`;
                                
                                return `
                                    <div class="p-3 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between hover:bg-white/[0.08] transition-all duration-200">
                                        <div class="flex items-center gap-3">
                                            <div class="size-10 rounded-full bg-slate-700 cursor-pointer overflow-hidden border border-white/10 hover:scale-105 transition-all" onclick="window._showAvatarModal('${u.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(u.name)}', '${u.name}', '${u.email}')">
                                                <img src="${u.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(u.name)}" class="w-full h-full object-cover">
                                            </div>
                                            <div class="min-w-0">
                                                <p class="font-bold text-slate-900 dark:text-white text-xs truncate max-w-[120px]">${u.name}</p>
                                                <p class="text-[9px] text-slate-500 font-mono truncate max-w-[120px]">${u.email}</p>
                                            </div>
                                        </div>
                                        <div class="text-right flex flex-col items-end gap-1">
                                            <span class="px-2 py-0.5 rounded-full text-[9px] font-black border ${rankColors[index]}">
                                                ${rankBadge}
                                            </span>
                                            <p class="text-[10px] text-primary font-bold mt-1">${u.count} servicios</p>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>

                <!-- Aprobaciones Academia PRO ($10.000 ARS) -->
                <div class="bg-slate-800/40 backdrop-blur-md rounded-3xl border border-amber-500/20 p-6 shadow-xl space-y-4">
                    <div class="flex items-center justify-between">
                        <h3 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span class="material-symbols-outlined text-amber-400">workspace_premium</span>
                            Aprobación de Pagos Academia PRO ($10.000)
                        </h3>
                        <span class="text-[10px] font-black uppercase text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                            ${(window.academyPayments || []).filter(p => p.status === 'pending').length} Pendientes
                        </span>
                    </div>

                    <div class="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        ${!window.academyPayments || window.academyPayments.length === 0 ? '<p class="text-slate-500 text-xs italic text-center py-4">Sin notificaciones de pago por el momento</p>' :
                        window.academyPayments.map(p => `
                            <div class="p-3 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between">
                                <div>
                                    <p class="font-bold text-xs text-white">${p.user_name || 'Oficial'} <span class="text-[9px] text-slate-400 font-mono">(${p.user_email})</span></p>
                                    <p class="text-[10px] text-amber-400 font-bold mt-0.5">Concurso: ${p.hierarchy || 'ISEP'} • CPO: ${p.cpo_number || 'N/A'}</p>
                                    <p class="text-[8px] text-slate-500 mt-0.5">${_formatAdminDate(p.timestamp)}</p>
                                </div>
                                <div>
                                    ${p.status === 'approved' ? `
                                        <span class="text-[9px] font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">Aprobado ✓</span>
                                    ` : `
                                        <button onclick="window.approveAcademyPaymentAction('${p.id}', '${p.user_email}', '${p.hierarchy}')" class="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-1">
                                            <span class="material-symbols-outlined text-sm">check_circle</span> Aprobar $10k
                                        </button>
                                    `}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Global Announcements -->
                <div class="bg-slate-800/40 backdrop-blur-md rounded-3xl border border-white/5 p-6 shadow-xl">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-3">
                            <span class="material-symbols-outlined text-purple-500">campaign</span>
                            Centro de Anuncios
                        </h3>
                    </div>
                    <form onsubmit="event.preventDefault(); store.handlePublishAnnouncement(this);" class="space-y-4">
                        <div>
                            <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mensaje Global</label>
                            <textarea name="message" rows="3" placeholder="Escribe el aviso que verán todos los usuarios..." class="w-full mt-1 px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-900 dark:text-white text-sm placeholder:text-slate-500 focus:border-primary/50 outline-none transition-all resize-none" required></textarea>
                        </div>
                        <div class="flex gap-4 items-center">
                            <select name="type" class="px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-900 dark:text-white text-sm outline-none w-1/3">
                                <option value="info" class="text-slate-900">Info (Azul)</option>
                                <option value="warning" class="text-slate-900">Urgente (Amarillo)</option>
                                <option value="success" class="text-slate-900">Éxito (Verde)</option>
                                <option value="danger" class="text-slate-900">Peligro (Rojo)</option>
                            </select>
                            <button type="submit" class="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all active:scale-95 shadow-lg shadow-purple-500/20">
                                Transmitir Ahora
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Global IA Configuration (Gemini API Key) -->
                <div class="bg-slate-800/40 backdrop-blur-md rounded-3xl border border-white/5 p-6 shadow-xl space-y-4">
                    <div class="flex items-center justify-between">
                        <h3 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                            <span class="material-symbols-outlined text-purple-400">api</span>
                            Clave Global de Gemini AI (Tutor Academia)
                        </h3>
                        <span class="text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${window.adminGeminiApiKeyExists ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}">
                            ${window.adminGeminiApiKeyExists ? 'CONFIGURADA' : 'NO CONFIGURADA'}
                        </span>
                    </div>
                    <p class="text-xs text-slate-400 leading-relaxed">
                        Configurá la API Key de Google Gemini global del proyecto para que todos los oficiales tengan acceso automático al Tutor IA de la Academia sin necesidad de ingresar una clave personal.
                    </p>
                    <div class="flex gap-4 items-center">
                        <input type="password" id="adminGeminiInput" placeholder="${window.adminGeminiApiKeyExists ? '••••••••••••••••••••••••' : 'Clave de API de Gemini (AIzaSy...)'}" class="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-slate-950 dark:text-white text-xs outline-none focus:border-purple-500 transition-all">
                        <button onclick="window.saveGlobalGeminiKey()" class="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl text-xs transition-all active:scale-95 shadow-lg shadow-purple-500/20">
                            Guardar Clave
                        </button>
                    </div>
                </div>

                <!-- Active Banners -->
                <div class="bg-slate-800/40 backdrop-blur-md rounded-3xl border border-white/5 p-6 shadow-xl">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-3">
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
                                    <p class="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-wider truncate mr-2">
                                         Banner Activo
                                    </p>
                                    ${ad.linkUrl ? `
                                        <a href="${ad.linkUrl}" target="_blank" class="px-2 py-1 rounded bg-white/10 text-[8px] text-slate-900 dark:text-white flex items-center gap-1 uppercase font-black hover:bg-white/20 transition-all">
                                            <span class="material-symbols-outlined text-[10px]">open_in_new</span> Ir
                                        </a>` : ''}
                                </div>
                            </div>
                        `).join('') : '<p class="text-slate-500 text-xs italic">No hay banners configurados</p>'}
                    </div>
                </div>

                <!-- User Table -->
                <div class="bg-slate-800/40 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden shadow-xl">
                    <div class="p-6 border-b border-white/5 flex flex-col gap-4">
                        <div class="flex items-center justify-between">
                            <h3 class="font-bold text-slate-900 dark:text-white text-lg italic">Oficiales Registrados</h3>
                            <span class="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black text-slate-500" id="userCountBadge">${allUsers.length} TOTAL</span>
                        </div>
                        
                        <!-- Filter Controls -->
                        <div class="flex flex-col sm:flex-row gap-3 items-center justify-between">
                            <!-- Search Input -->
                            <div class="relative w-full sm:w-64">
                                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">search</span>
                                <input type="text" id="adminUserSearch" oninput="window.filterAdminUsers()" placeholder="Buscar por nombre o email..." class="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-900 dark:text-white text-xs placeholder:text-slate-500 focus:border-primary/50 outline-none transition-all">
                            </div>
                            
                            <!-- Date Filter -->
                            <div class="flex items-center gap-2 w-full sm:w-auto">
                                <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Última conexión:</label>
                                <input type="date" id="adminUserDateFilter" onchange="window.filterAdminUsers()" class="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-900 dark:text-white text-xs outline-none focus:border-primary/50 transition-all w-full sm:w-auto">
                                <button onclick="window.resetAdminUserFilters()" class="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white rounded-xl transition-all" title="Limpiar filtros">
                                    <span class="material-symbols-outlined text-sm">filter_alt_off</span>
                                </button>
                            </div>
                        </div>
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
                            <tbody class="divide-y divide-white/5" id="adminUserTableBody">
                                ${allUsers.map(u => `
                                    <tr class="hover:bg-white/[0.02] transition-colors group" data-name="${u.name || 'Oficial'}" data-email="${u.email}" data-lastlogin="${u.lastLogin || ''}">
                                        <td class="px-6 py-4">
                                            <div class="flex items-center gap-3">
                                                <div class="size-8 rounded-full bg-slate-700 cursor-pointer overflow-hidden border border-white/10 hover:scale-110 active:scale-95 transition-all duration-200" onclick="window._showAvatarModal('${u.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(u.name || 'Oficial')}', '${u.name || 'Oficial'}', '${u.email}')" title="Ver foto de perfil">
                                                    <img src="${u.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(u.name || 'Oficial')}" class="w-full h-full object-cover">
                                                </div>
                                                <div>
                                                    <p class="font-bold text-slate-900 dark:text-white text-xs">${u.name || 'Oficial'}</p>
                                                    <p class="text-[9px] text-slate-500 font-mono">${u.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4">
                                            <span class="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${u.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-500/20 text-slate-400'}">
                                                ${u.role || 'user'}
                                            </span>
                                            ${u.status === 'suspended' ? '<span class="px-2 py-0.5 mt-1 block w-fit rounded-full text-[9px] font-black uppercase tracking-tighter bg-red-500/20 text-red-500">Suspendido</span>' : ''}
                                        </td>
                                        <td class="px-6 py-4 text-center text-[10px] text-slate-400">
                                            ${u.lastLogin ? _formatAdminDate(u.lastLogin) : 'N/A'}
                                        </td>
                                        <td class="px-6 py-4 text-right">
                                            <div class="flex flex-col items-end gap-1">
                                                <button onclick="store.changeUserRole('${u.email}', '${u.role === 'admin' ? 'user' : 'admin'}')" class="text-[9px] font-bold text-primary hover:underline">
                                                    ${u.role === 'admin' ? 'Bajar Rol' : 'Subir Rol'}
                                                </button>
                                                ${u.role !== 'admin' ? `
                                                <button onclick="store.changeUserStatus('${u.email}', '${u.status === 'suspended' ? 'active' : 'suspended'}')" class="text-[9px] font-bold ${u.status === 'suspended' ? 'text-emerald-500' : 'text-red-500'} hover:underline">
                                                    ${u.status === 'suspended' ? 'Activar' : 'Suspender'}
                                                </button>
                                                ` : ''}
                                            </div>
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
        setTimeout(() => _mountAdminCharts(DB.calculateStats(window.allUsers, window.allServices, window.adminDateFilter).chartData), 100);
    });

    const unsubAds = DB.subscribeToAds(() => {
        updateUI();
    });

    // Global Filter Hook
    window.updateAdminFilter = (filter) => {
        window.adminDateFilter = filter;
        updateUI();
    };

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

    const unsubAcademy = DB.subscribeToAcademyPayments(data => {
        window.academyPayments = data;
        updateUI();
    });

    window.approveAcademyPaymentAction = async (paymentId, email, hierarchy) => {
        if (!confirm(`¿Confirmas aprobar el pago de $10.000 ARS para ${email} en el concurso ${hierarchy}?`)) return;
        try {
            await DB.approveAcademyPayment(paymentId, email, hierarchy);
            showToast("✅ Pase PRO Academia activado para " + email);
            if (window.location.hash === '#admin') router.handleRoute();
        } catch(e) {
            showToast("Error al aprobar pago: " + e.message);
        }
    };

    window.saveGlobalGeminiKey = async () => {
        const inputEl = document.getElementById('adminGeminiInput');
        const key = inputEl ? inputEl.value.trim() : "";
        if (!key) {
            alert("Por favor ingresa una clave de API de Gemini válida.");
            return;
        }

        if (!confirm("¿Confirmas guardar esta clave de Gemini como la predeterminada del sistema?")) return;

        try {
            await DB.saveGlobalSetting('geminiApiKey', key);
            showToast("✅ Clave API Global de Gemini guardada");
            window.adminGeminiApiKeyExists = true;
            window.globalSystemConfig = window.globalSystemConfig || {};
            window.globalSystemConfig.geminiApiKey = key;
            updateUI();
        } catch(e) {
            showToast("❌ Error al guardar la clave: " + e.message);
        }
    };

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
        unsubAds();
        unsubReviews();
        unsubLogs();
        unsubAcademy();
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
                <p class="text-2xl font-black text-slate-900 dark:text-white mt-1">${value}</p>
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

store.changeUserStatus = async (email, newStatus) => {
    if (!confirm(`¿Confirmas cambiar el estado a ${email} a: ${newStatus.toUpperCase()}?`)) return;
    try {
        await DB.updateUserStatus(email, newStatus);
        showToast("Estado actualizado");
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

store.handlePublishAnnouncement = async (form) => {
    const message = form.message.value.trim();
    const type = form.type.value;
    if (!message) return;

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = 'Enviando...';
    try {
        await DB.publishAnnouncement({ message, type });
        showToast("📢 Anuncio global publicado");
        form.reset();
    } catch (e) {
        showToast("Error al publicar anuncio");
    } finally {
        btn.disabled = false; btn.textContent = 'Transmitir Ahora';
    }
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
    overlay.innerHTML = '<div class="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl"><div class="flex flex-col items-center text-center"><div class="size-12 rounded-full bg-red-500/20 flex items-center justify-center mb-3"><span class="material-symbols-outlined text-2xl text-red-400">delete_forever</span></div><h3 class="text-lg font-bold text-slate-900 dark:text-white mb-1">Eliminar anuncio</h3><p class="text-sm text-slate-400 mb-5">Esta accion no se puede deshacer</p><div class="flex gap-3 w-full"><button onclick="this.closest(\'.fixed\').remove()" class="flex-1 py-2.5 bg-white/10 text-slate-900 dark:text-white text-sm font-bold rounded-xl">Cancelar</button><button id="confirm-del-ad" class="flex-1 py-2.5 bg-red-500 text-white text-sm font-bold rounded-xl">Eliminar</button></div></div></div>';
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
            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">add_photo_alternate</span>
                Nuevo Banner
            </h3>
            <div class="space-y-3">
                <div id="banner-upload-area" class="border-2 border-dashed border-white/10 rounded-xl p-4 text-center hover:border-primary/50 transition-all cursor-pointer group">
                    <input type="file" id="ad-file-input" class="hidden" accept="image/*">
                    <div id="banner-preview-container" class="hidden mb-2">
                        <img id="banner-preview-img" class="w-full h-20 object-cover rounded-lg">
                    </div>
                    <div id="upload-prompt">
                        <span class="material-symbols-outlined text-3xl text-slate-500 group-hover:text-primary transition-colors">cloud_upload</span>
                        <p class="text-[10px] text-slate-500 font-bold mt-1">SUBIR IMAGEN DEL DISPOSITIVO</p>
                    </div>
                </div>
                <div class="relative">
                    <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-white/5"></div></div>
                    <div class="relative flex justify-center text-[8px] uppercase font-black text-slate-600 bg-slate-900 px-2">o usar URL externa</div>
                </div>
                <div>
                    <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">URL de la imagen</label>
                    <input id="ad-image-url" type="url" placeholder="https://..." class="w-full mt-1 px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-900 dark:text-white text-sm placeholder:text-slate-500 focus:border-primary/50 outline-none transition-all">
                </div>
                <div>
                    <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">URL de destino (opcional)</label>
                    <input id="ad-link-url" type="url" placeholder="https://..." class="w-full mt-1 px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-900 dark:text-white text-sm placeholder:text-slate-500 focus:border-primary/50 outline-none transition-all">
                </div>
            </div>
            <div class="flex gap-3">
                <button onclick="this.closest('.fixed').remove()" class="flex-1 py-2.5 bg-white/10 text-slate-900 dark:text-white text-sm font-bold rounded-xl">Cancelar</button>
                <button id="btn-save-ad" class="flex-1 py-2.5 bg-primary text-white text-sm font-bold rounded-xl">Publicar</button>
            </div>
        </div>
    `;
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    document.body.appendChild(overlay);

    const fileInput = document.getElementById('ad-file-input');
    const uploadArea = document.getElementById('banner-upload-area');
    const previewContainer = document.getElementById('banner-preview-container');
    const previewImg = document.getElementById('banner-preview-img');
    const uploadPrompt = document.getElementById('upload-prompt');
    const inputUrl = document.getElementById('ad-image-url');

    uploadArea.onclick = () => fileInput.click();

    fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                previewImg.src = ev.target.result;
                previewContainer.classList.remove('hidden');
                uploadPrompt.classList.add('hidden');
                inputUrl.value = ''; // Clear URL if file selected
                inputUrl.disabled = true;
            };
            reader.readAsDataURL(file);
        }
    };

    document.getElementById('btn-save-ad').onclick = async () => {
        const urlValue = inputUrl.value.trim();
        const linkUrl = document.getElementById('ad-link-url').value.trim();
        const file = fileInput.files[0];

        if (!file && !urlValue) { showToast('Selecciona una imagen o ingresa una URL'); return; }

        const btn = document.getElementById('btn-save-ad');
        btn.disabled = true; btn.textContent = 'Publicando...';

        try {
            let finalImageUrl = urlValue;
            if (file) {
                showToast('⏳ Subiendo imagen...');
                finalImageUrl = await DB.uploadAdBanner(file);
            }

            if (!finalImageUrl) throw new Error("No se pudo obtener la URL de imagen");

            await DB.addAd({ imageUrl: finalImageUrl, linkUrl: linkUrl || null });
            showToast('✅ Anuncio publicado');
            overlay.remove();
            if (window.location.hash === '#admin') router.handleRoute();
        } catch (e) {
            console.error("Ad publish error:", e);
            showToast('❌ Error al publicar');
            btn.disabled = false; btn.textContent = 'Publicar';
        }
    };
};
