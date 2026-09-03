/**
 * Adicionales Santa Fe - Profile / Settings View
 */

function renderProfile(container) {
    if (!container) container = document.getElementById('app');

    // User Data Fallback
    const user = store.user || { name: 'Usuario', email: '...', avatar: '' };

    // Helper to sanitize "undefined" strings
    const safeString = (str) => (!str || str === 'undefined' || str === 'null') ? null : str;

    const userName = safeString(user.name) || safeString(user.displayName) || 'Usuario';
    const userEmail = user.email || 'No email';
    const userAvatar = safeString(user.avatar) || safeString(user.photoURL) || `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(userName)}`;

    // Clone config (Defensive copy)
    const config = store.serviceConfig ? JSON.parse(JSON.stringify(store.serviceConfig)) : {
        'Public': { 'Ordinaria': 0, 'Extraordinaria': 0 },
        'Private': { 'Ordinaria': 0, 'Extraordinaria': 0 },
        'OSPES': { 'Ordinaria': 0, 'Extraordinaria': 0 }
    };

    // Helper: Config Inputs
    const renderConfigInputs = (type) => {
        if (!config[type]) return '';
        return Object.keys(config[type]).map(sub => `
            <div class="flex justify-between items-center py-3 border-b border-white/5 last:border-0 gap-3">
                <input type="text" 
                    value="${sub}" 
                    onchange="store.renameServiceSubtype('${type}', '${sub}', this.value)"
                    class="bg-transparent border-none text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-0 focus:text-slate-900 dark:text-white w-full placeholder-slate-600 transition-colors">
                
                <div class="flex items-center gap-2 bg-slate-200 dark:bg-white/5 rounded-lg px-2 py-1 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
                    <span class="text-xs text-slate-500">$</span>
                    <input type="number" 
                        value="${config[type][sub]}" 
                        onchange="store.updateLocalConfig('${type}', '${sub}', this.value)"
                        class="w-20 bg-transparent border-none text-right text-sm font-bold text-slate-900 dark:text-white focus:ring-0 p-0">
                </div>
            </div>
        `).join('');
    };

    const html = `
        <header class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/95 backdrop-blur-xl border-b border-white/5 px-4 h-16 flex items-center justify-between">
            <button onclick="router.navigateTo('#agenda')" class="size-10 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors active:scale-95">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 class="text-base font-bold text-slate-900 dark:text-white tracking-wide">Mi Perfil</h1>
            <div class="size-10 flex items-center justify-center">${renderLogo('small')}</div>
        </header>

        <main class="p-6 space-y-8 pb-32 max-w-md mx-auto animate-fade-in">
            <!-- Hero Profile Section -->
            <div class="flex flex-col items-center pt-4">
                <!-- Hidden File Input -->
                <input type="file" id="avatar-input" accept="image/*" class="hidden" onchange="store.handleAvatarUpload(event)">
                
                <div class="relative group cursor-pointer" onclick="document.getElementById('avatar-input').click()">
                    <!-- Decorative Rings -->
                    <div class="absolute -inset-1 bg-gradient-to-tr from-primary to-accent-cyan rounded-full opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div class="relative size-28 rounded-full p-1 bg-white dark:bg-background-dark shadow-2xl">
                        <img id="profile-avatar-img" src="${userAvatar}" class="w-full h-full rounded-full object-cover border-2 border-slate-200 dark:border-white/10 group-hover:border-primary/50 transition-all duration-300 shadow-inner">
                    </div>
                    <!-- Edit Badge -->
                    <div class="absolute bottom-1 right-1 bg-primary text-white size-8 rounded-full flex items-center justify-center shadow-lg border-2 border-background-dark transform group-hover:scale-110 transition-transform">
                        <span class="material-symbols-outlined text-sm">edit</span>
                    </div>
                </div>

                <div class="mt-4 text-center space-y-1">
                    <div class="flex items-center justify-center gap-2">
                        <h2 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">${userName}</h2>
                        <span onclick="const name = prompt('Nuevo nombre:', '${userName}'); if(name) store.updateProfile(name, '${userAvatar}');" class="material-symbols-outlined text-slate-500 hover:text-primary cursor-pointer text-sm transition-colors">edit</span>
                    </div>
                    <p class="text-sm font-medium text-slate-500 dark:text-slate-400">${userEmail}</p>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-3 mt-6 w-full max-w-xs">
                    <button onclick="store.requestNotificationPermission()" 
                        class="flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all active:scale-95 ${store.notificationSettings.enabled ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-slate-800 text-slate-400 border border-white/5 hover:bg-slate-700'}">
                        <span class="material-symbols-outlined text-lg">${store.notificationSettings.enabled ? 'notifications_active' : 'notifications_off'}</span>
                        ${store.notificationSettings.enabled ? 'Notificaciones' : 'Activar Alertas'}
                    </button>
                    <!-- Enhanced PDF Export Button -->
                    <button onclick="store.exportToPDF()" 
                        class="flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold hover:bg-red-600/30 transition-all active:scale-95">
                        <span class="material-symbols-outlined text-lg">picture_as_pdf</span>
                        Exportar PDF
                    </button>
                </div>
            </div>

            <!-- Configuration Section -->
            <section class="space-y-5">
                <div class="flex items-center gap-3 text-slate-400 px-1">
                    <span class="material-symbols-outlined text-primary">tune</span>
                    <h3 class="text-xs font-bold uppercase tracking-widest">Configuración de Tarifas</h3>
                </div>

                <!-- Public Services -->
                <article class="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/5 p-5 shadow-sm">
                    <h4 class="text-[10px] font-extrabold text-accent-cyan uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span class="size-2 rounded-full bg-accent-cyan"></span> Servicios Públicos
                    </h4>
                    ${renderConfigInputs('Public')}
                </article>

                <!-- Private Services -->
                <article class="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/5 p-5 shadow-sm">
                    <h4 class="text-[10px] font-extrabold text-purple-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span class="size-2 rounded-full bg-purple-400"></span> Servicios Privados
                    </h4>
                    ${renderConfigInputs('Private')}
                </article>
                
                 <!-- OSPES / Others -->
                <article class="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/5 p-5 shadow-sm">
                    <h4 class="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span class="size-2 rounded-full bg-amber-400"></span> OSPES / Otros
                    </h4>
                    ${renderConfigInputs('OSPES')}
                </article>

                <!-- Add Custom Sector Button -->
                <button onclick="window.addCustomSector()" class="w-full py-4 rounded-2xl border-2 border-dashed border-primary/30 text-primary/80 font-bold text-sm bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all flex items-center justify-center gap-2 group">
                    <span class="material-symbols-outlined group-hover:scale-110 transition-transform">add_circle</span>
                    Agregar Sector Personalizado
                </button>
            </section>

            <!-- Monthly Goal Section -->
            <section class="space-y-3">
                <div class="flex items-center gap-3 text-slate-400 px-1">
                    <span class="material-symbols-outlined text-amber-400">flag</span>
                    <h3 class="text-xs font-bold uppercase tracking-widest">Meta Financiera Mensual</h3>
                </div>
                <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/5 p-5 shadow-sm">
                    <p class="text-[10px] text-slate-500 mb-3">Definí cuánto querés ganar este mes. Verás tu progreso en la Agenda.</p>
                    <div class="flex items-center gap-3">
                        <div class="flex items-center gap-1 flex-1 bg-slate-900/50 rounded-xl px-3 py-2.5 border border-white/5">
                            <span class="text-slate-500 text-sm font-bold">$</span>
                            <input type="number" id="monthly-goal-input" placeholder="Ej: 500000" value="${(store.user && store.user.monthlyGoal) || ''}" class="bg-transparent text-white text-sm font-bold w-full outline-none placeholder-slate-700">
                        </div>
                        <button onclick="const val = document.getElementById('monthly-goal-input').value; store.setMonthlyGoal(val);" class="px-4 py-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold hover:bg-amber-500/30 transition-all active:scale-95">
                            Fijar
                        </button>
                    </div>
                </div>
            </section>

            <!-- Apariencia & Notificaciones -->
            <section class="space-y-5">
                <h3 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Apariencia y Notificaciones</h3>

                <!-- Dark/Light Mode Toggle -->
                <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/5 p-5 shadow-sm">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="size-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                                <span class="material-symbols-outlined text-indigo-400" id="theme-icon">${document.documentElement.classList.contains('dark') ? 'dark_mode' : 'light_mode'}</span>
                            </div>
                            <div>
                                <p class="text-sm font-bold text-slate-900 dark:text-white">Modo Visual</p>
                                <p class="text-[10px] text-slate-500" id="theme-label">${document.documentElement.classList.contains('dark') ? 'Oscuro activo' : 'Claro activo'}</p>
                            </div>
                        </div>
                        <button onclick="store.toggleTheme()" 
                            class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none ${document.documentElement.classList.contains('dark') ? 'bg-indigo-500' : 'bg-slate-300'}">
                            <span class="inline-block size-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${document.documentElement.classList.contains('dark') ? 'translate-x-6' : 'translate-x-1'}"></span>
                        </button>
                    </div>
                </div>

                <!-- Notifications -->
                <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/5 p-5 shadow-sm">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                            <div class="size-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                                <span class="material-symbols-outlined text-amber-400">alarm</span>
                            </div>
                            <div>
                                <p class="text-sm font-bold text-slate-900 dark:text-white">Alarma de Adicionales</p>
                                <p class="text-[10px] text-slate-500">${store.notificationSettings?.enabled ? 'Activa ✅' : 'Inactiva ❌'}</p>
                            </div>
                        </div>
                        <button onclick="store.requestNotificationPermission()" 
                            class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${store.notificationSettings?.enabled ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30' : 'bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30'}">
                            ${store.notificationSettings?.enabled ? 'Desactivar' : 'Activar'}
                        </button>
                    </div>

                    ${store.notificationSettings?.enabled ? `
                    <div class="space-y-2">
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avisar con anticipación de:</p>
                        <div class="flex gap-2">
                            ${[15, 30, 60, 120].map(mins => `
                                <button onclick="store.setNotifLeadTime(${mins})" 
                                    class="flex-1 py-2 rounded-xl text-xs font-bold transition-all ${(store.notificationSettings.leadTime || 60) === mins ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'}">
                                    ${mins < 60 ? mins + 'min' : (mins / 60) + 'h'}
                                </button>
                            `).join('')}
                        </div>
                    </div>` : ''}
                </div>
            </section>

            <!-- Save Button -->
            <button onclick="store.saveProfile()" class="w-full bg-gradient-to-r from-primary to-blue-600 text-white py-4 rounded-2xl font-bold text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95 transition-all">
                Guardar Cambios
            </button>

            <!-- Super Admin & Logout Section -->
            <div class="pt-6 pb-2 space-y-4">
                ${store.isAdmin() ? `
                    <div class="p-5 rounded-3xl bg-gradient-to-br from-purple-950 via-slate-900 to-slate-950 border border-purple-500/30 text-white space-y-4 shadow-2xl">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <div class="size-10 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
                                    <span class="material-symbols-outlined text-xl">shield_person</span>
                                </div>
                                <div>
                                    <h3 class="text-sm font-black text-white uppercase tracking-wider">Panel Super Admin</h3>
                                    <p class="text-[10px] text-purple-300">Nivel de Control Global del Sistema</p>
                                </div>
                            </div>
                            <span class="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-black uppercase tracking-wider">SUPER ADMIN</span>
                        </div>

                        <div class="grid grid-cols-2 gap-2 pt-1">
                            <button onclick="router.navigateTo('#admin')" class="py-3 px-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 active:scale-95 transition-all">
                                <span class="material-symbols-outlined text-sm">admin_panel_settings</span> Admin Hub
                            </button>
                            <button onclick="router.navigateTo('#admin/auditoria')" class="py-3 px-3 rounded-2xl bg-amber-600/80 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
                                <span class="material-symbols-outlined text-sm">shield</span> Auditoría
                            </button>
                        </div>

                        <button onclick="router.navigateTo('#diagnostics')" class="w-full py-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-purple-300 font-bold text-xs flex items-center justify-center gap-2 border border-white/5 active:scale-95 transition-all">
                            <span class="material-symbols-outlined text-sm">memory</span> Diagnóstico del Sistema
                        </button>
                    </div>
                ` : `
                    <button onclick="store.enableSuperAdminMode()" class="w-full py-3 rounded-2xl bg-slate-900/60 hover:bg-purple-950/40 text-slate-400 hover:text-purple-300 border border-slate-800 hover:border-purple-500/30 text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-95">
                        <span class="material-symbols-outlined text-sm text-purple-400">key</span>
                        Activar Modo Super Admin
                    </button>
                `}

                <button onclick="store.logout()" class="w-full text-red-400/80 text-xs font-bold hover:text-red-400 transition-colors flex items-center justify-center gap-2 py-3 rounded-xl hover:bg-red-500/10 mt-2">
                    <span class="material-symbols-outlined text-lg">logout</span>
                    Cerrar Sesión
                </button>
                <p class="text-center text-[10px] text-slate-700 dark:text-slate-600 font-mono">v535.9-FINAL • Adicionales Santa Fe</p>
            </div>
            
            <!-- Ad Banner -->
            ${renderAdBannerSmall()}
        </main>
    `;

    container.innerHTML = html;
    initAds();
}

// Add custom sector handler
window.addCustomSector = () => {
    const sectorName = prompt("Nombre del nuevo sector (ej: IOMA, Swiss Medical):");
    if (!sectorName || sectorName.trim() === '') return;

    const ordinaryRate = prompt(`Tarifa Ordinaria para ${sectorName}:`);
    if (!ordinaryRate || isNaN(ordinaryRate)) {
        showToast("❌ Tarifa inválida");
        return;
    }

    const extraRate = prompt(`Tarifa Extraordinaria para ${sectorName}:`);
    if (!extraRate || isNaN(extraRate)) {
        showToast("❌ Tarifa inválida");
        return;
    }

    if (!store.serviceConfig[sectorName]) {
        store.serviceConfig[sectorName] = {};
    }
    store.serviceConfig[sectorName]['Ordinaria'] = parseFloat(ordinaryRate);
    store.serviceConfig[sectorName]['Extraordinaria'] = parseFloat(extraRate);

    showToast(`✅ Sector "${sectorName}" agregado`);

    // Refresh UI
    renderProfile(document.getElementById('app'));
};
