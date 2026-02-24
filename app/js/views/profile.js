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
                    class="bg-transparent border-none text-sm font-medium text-slate-300 focus:ring-0 focus:text-white w-full placeholder-slate-600 transition-colors">
                
                <div class="flex items-center gap-2 bg-white/5 rounded-lg px-2 py-1 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
                    <span class="text-xs text-slate-500">$</span>
                    <input type="number" 
                        value="${config[type][sub]}" 
                        onchange="store.updateLocalConfig('${type}', '${sub}', this.value)"
                        class="w-20 bg-transparent border-none text-right text-sm font-bold text-white focus:ring-0 p-0">
                </div>
            </div>
        `).join('');
    };

    const html = `
        <header class="sticky top-0 z-50 bg-background-dark/95 backdrop-blur-xl border-b border-white/5 px-4 h-16 flex items-center justify-between">
            <button onclick="router.navigateTo('#agenda')" class="size-10 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-400 transition-colors active:scale-95">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 class="text-base font-bold text-white tracking-wide">Mi Perfil</h1>
            <div class="size-10"></div> <!-- Spacer -->
        </header>

        <main class="p-6 space-y-8 pb-32 max-w-md mx-auto animate-fade-in">
            <!-- Hero Profile Section -->
            <div class="flex flex-col items-center pt-4">
                <!-- Hidden File Input -->
                <input type="file" id="avatar-input" accept="image/*" class="hidden" onchange="store.handleAvatarUpload(event)">
                
                <div class="relative group cursor-pointer" onclick="document.getElementById('avatar-input').click()">
                    <!-- Decorative Rings -->
                    <div class="absolute -inset-1 bg-gradient-to-tr from-primary to-accent-cyan rounded-full opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div class="relative size-28 rounded-full p-1 bg-background-dark shadow-2xl">
                        <img id="profile-avatar-img" src="${userAvatar}" class="w-full h-full rounded-full object-cover border-2 border-white/10 group-hover:border-primary/50 transition-all duration-300 shadow-inner">
                    </div>
                    <!-- Edit Badge -->
                    <div class="absolute bottom-1 right-1 bg-primary text-white size-8 rounded-full flex items-center justify-center shadow-lg border-2 border-background-dark transform group-hover:scale-110 transition-transform">
                        <span class="material-symbols-outlined text-sm">edit</span>
                    </div>
                </div>

                <div class="mt-4 text-center space-y-1">
                    <div class="flex items-center justify-center gap-2">
                        <h2 class="text-2xl font-bold text-white tracking-tight">${userName}</h2>
                        <span onclick="const name = prompt('Nuevo nombre:', '${userName}'); if(name) store.updateProfile(name, '${userAvatar}');" class="material-symbols-outlined text-slate-500 hover:text-primary cursor-pointer text-sm transition-colors">edit</span>
                    </div>
                    <p class="text-sm font-medium text-slate-400">${userEmail}</p>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-3 mt-6 w-full max-w-xs">
                    <button onclick="store.requestNotificationPermission()" 
                        class="flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all active:scale-95 ${store.notificationSettings.enabled ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-slate-800 text-slate-400 border border-white/5 hover:bg-slate-700'}">
                        <span class="material-symbols-outlined text-lg">${store.notificationSettings.enabled ? 'notifications_active' : 'notifications_off'}</span>
                        ${store.notificationSettings.enabled ? 'Notificaciones' : 'Activar Alertas'}
                    </button>
                    <button onclick="store.shareApp()" 
                        class="flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-bold hover:bg-blue-600/30 transition-all active:scale-95">
                        <span class="material-symbols-outlined text-lg">share</span>
                        Compartir
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


            <!-- Save Button -->
            <button onclick="store.saveProfile()" class="w-full bg-gradient-to-r from-primary to-blue-600 text-white py-4 rounded-2xl font-bold text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95 transition-all">
                Guardar Cambios
            </button>

            <!-- Logout -->
            <div class="pt-6 pb-2">
                 <button onclick="store.logout()" class="w-full text-red-400/80 text-xs font-bold hover:text-red-400 transition-colors flex items-center justify-center gap-2 py-3 rounded-xl hover:bg-red-500/10">
                    <span class="material-symbols-outlined text-lg">logout</span>
                    Cerrar Sesión
                </button>
                  <p class="text-center text-[10px] text-slate-700 dark:text-slate-600 mt-2 font-mono">v2.1.4 • Build 2026.02.24 v528.0-AUDIT-COMPLETE</p>
            </div>
        </main>
    `;

    container.innerHTML = html;
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
