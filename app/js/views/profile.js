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

    const targetHierarchy = (() => {
        try {
            return localStorage.getItem('isep_selected_hierarchy_v1') || 'suboficial-oficial';
        } catch(e) {
            return 'suboficial-oficial';
        }
    })();

    window.saveUserTargetConcurso = (val) => {
        try {
            localStorage.setItem('isep_selected_hierarchy_v1', val);
            if (window._quizState) {
                window._quizState.selectedHierarchy = val;
            }
            if (typeof showToast === 'function') {
                const hierNames = {
                    'suboficial-oficial': 'Suboficial → Oficial de Policía',
                    'oficial-subinspector': 'Oficial → Subinspector',
                    'subinspector-inspector': 'Subinspector → Inspector',
                    'inspector-subcomisario': 'Inspector → Subcomisario',
                    'subcomisario-comisario': 'Subcomisario → Comisario',
                    'comisario-supervisor': 'Comisario → Com. Supervisor',
                    'simulacro-integral': 'Simulacro General ISEP'
                };
                showToast('🎯 Concurso fijado: ' + (hierNames[val] || val));
            }
        } catch(e){}
    };

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

            <!-- 🎯 Mi Concurso de Ascenso Policial ISEP -->
            <div class="glass-card p-4 rounded-3xl border border-white/5 space-y-3">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2.5">
                        <div class="size-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                            <span class="material-symbols-outlined text-lg">military_tech</span>
                        </div>
                        <div>
                            <h3 class="text-xs font-black text-white uppercase tracking-wider">Mi Concurso de Ascenso ISEP</h3>
                            <p class="text-[10px] text-slate-400">Personalizá tu programa y simulador</p>
                        </div>
                    </div>
                    <span class="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 text-[9px] font-black uppercase">Santa Fe</span>
                </div>

                <div class="space-y-1.5">
                    <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1">Jerarquía a Concursar:</label>
                    <select id="profile-concurso-select" onchange="window.saveUserTargetConcurso(this.value)"
                        class="w-full bg-slate-900 border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-primary transition-all">
                        <option value="suboficial-oficial" ${targetHierarchy === 'suboficial-oficial' ? 'selected' : ''}>Suboficial → Oficial de Policía</option>
                        <option value="oficial-subinspector" ${targetHierarchy === 'oficial-subinspector' ? 'selected' : ''}>Oficial → Subinspector</option>
                        <option value="subinspector-inspector" ${targetHierarchy === 'subinspector-inspector' ? 'selected' : ''}>Subinspector → Inspector</option>
                        <option value="inspector-subcomisario" ${targetHierarchy === 'inspector-subcomisario' ? 'selected' : ''}>Inspector → Subcomisario</option>
                        <option value="subcomisario-comisario" ${targetHierarchy === 'subcomisario-comisario' ? 'selected' : ''}>Subcomisario → Comisario</option>
                        <option value="comisario-supervisor" ${targetHierarchy === 'comisario-supervisor' ? 'selected' : ''}>Comisario → Comisario Supervisor / Director</option>
                        <option value="simulacro-integral" ${targetHierarchy === 'simulacro-integral' ? 'selected' : ''}>Simulacro General (Todas las Materias)</option>
                    </select>
                    <p class="text-[10px] text-slate-500 mt-1 ml-1 leading-snug">
                        El simulador y la academia adaptarán el 100% de las preguntas de examen para ser estrictamente concordantes con este proceso.
                    </p>
                </div>
            </div>

            <!-- ☕ Aporte al Desarrollo Independiente -->
                <div class="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800/95 border-2 border-amber-500/40 rounded-3xl p-5 shadow-2xl space-y-4 relative overflow-hidden">
                    <div class="absolute -top-10 -right-10 size-28 bg-amber-500/15 rounded-full blur-2xl pointer-events-none"></div>
                    
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="size-11 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">
                                <span class="material-symbols-outlined text-2xl">volunteer_activism</span>
                            </div>
                            <div>
                                <h3 class="text-sm font-black text-white uppercase tracking-wider">Aporte al Desarrollo Policial</h3>
                                <p class="text-[10px] text-amber-300/80 font-bold">Desarrollo 100% independiente de Santa Fe</p>
                            </div>
                        </div>
                        <span class="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] font-black uppercase">Comunidad</span>
                    </div>
                    
                    <p class="text-[11px] text-slate-300 leading-relaxed">
                        Adicionales Santa Fe es una herramienta creada a pulmón por y para la Policía provincial, sin subsidios ni publicidad invasiva. Tu colaboración voluntaria nos permite pagar los servidores de Google y el soporte continuo.
                    </p>

                    <!-- 3 BOTONES DE MONTO DIRECTOS A LA VISTA -->
                    <div class="space-y-2">
                        <p class="text-[10px] font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                            <span class="material-symbols-outlined text-sm">touch_app</span>
                            Montos sugeridos con 1 toque:
                        </p>
                        <div class="grid grid-cols-3 gap-2">
                            <div onclick="copyToClipboard('SmartFlow.Digital', 'Alias'); showToast('☕ Alias SmartFlow.Digital copiado ($1.000)');" 
                                class="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/60 hover:bg-amber-500/10 text-center cursor-pointer transition-all active:scale-95 group shadow-md">
                                <p class="text-lg mb-0.5">☕</p>
                                <p class="text-sm font-black text-white group-hover:text-amber-300">$1.000</p>
                                <p class="text-[8px] text-slate-400 uppercase font-black tracking-tight mt-0.5">Un café</p>
                            </div>
                            <div onclick="copyToClipboard('SmartFlow.Digital', 'Alias'); showToast('🛡️ Alias SmartFlow.Digital copiado ($2.500)');" 
                                class="p-3 rounded-2xl bg-amber-500/15 border-2 border-amber-500/50 hover:border-amber-400 hover:bg-amber-500/25 text-center cursor-pointer transition-all active:scale-95 relative group shadow-lg shadow-amber-500/10">
                                <span class="absolute -top-2 right-2 px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 text-[7px] font-black uppercase shadow-sm">Popular</span>
                                <p class="text-lg mb-0.5">🛡️</p>
                                <p class="text-sm font-black text-amber-300">$2.500</p>
                                <p class="text-[8px] text-amber-200 uppercase font-black tracking-tight mt-0.5">Servidores</p>
                            </div>
                            <div onclick="copyToClipboard('SmartFlow.Digital', 'Alias'); showToast('🚀 Alias SmartFlow.Digital copiado ($5.000)');" 
                                class="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/60 hover:bg-amber-500/10 text-center cursor-pointer transition-all active:scale-95 group shadow-md">
                                <p class="text-lg mb-0.5">🚀</p>
                                <p class="text-sm font-black text-white group-hover:text-amber-300">$5.000</p>
                                <p class="text-[8px] text-slate-400 uppercase font-black tracking-tight mt-0.5">Destacado</p>
                            </div>
                        </div>
                    </div>

                    <!-- DATOS DE TRANSFERENCIA RÁPIDA -->
                    <div onclick="copyToClipboard('SmartFlow.Digital', 'Alias')" class="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-amber-500/30 cursor-pointer hover:bg-amber-500/10 transition-all active:scale-[0.98]">
                        <div>
                            <p class="text-[8px] text-slate-400 uppercase font-black tracking-widest mb-0.5">Alias Mercado Pago (Tocá para copiar)</p>
                            <p class="text-xs font-mono font-black text-amber-300">SmartFlow.Digital</p>
                        </div>
                        <div class="size-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
                            <span class="material-symbols-outlined text-sm">content_copy</span>
                        </div>
                    </div>

                    <!-- BOTONES DE ACCIÓN -->
                    <div class="flex gap-2">
                        <button onclick="window.showDonationModal()" class="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all">
                            <span class="material-symbols-outlined text-sm text-amber-400">info</span> Ver CVU y Más
                        </button>
                        <a href="https://wa.me/5493425162372?text=Hola%20Nico!%20Te%20acabo%20de%20enviar%20un%20aporte%20voluntario%20para%20apoyar%20el%20desarrollo%20de%20Adicionales%20Santa%20Fe." target="_blank" 
                           class="py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1 shadow-md shadow-emerald-500/20 active:scale-95 transition-all">
                            <span class="material-symbols-outlined text-sm">chat</span> Avisar WhatsApp
                        </a>
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
                ` : ''}

                <button onclick="store.logout()" class="w-full text-red-400/80 text-xs font-bold hover:text-red-400 transition-colors flex items-center justify-center gap-2 py-3 rounded-xl hover:bg-red-500/10 mt-2">
                    <span class="material-symbols-outlined text-lg">logout</span>
                    Cerrar Sesión
                </button>
                <p onclick="window.handleSecretAdminTap()" class="text-center text-[10px] text-slate-700 dark:text-slate-600 font-mono cursor-pointer select-none py-2 hover:text-slate-400 transition-colors" title="Toque 5 veces para acceso administrativo">v535.10.91 • Adicionales Santa Fe</p>
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


let _secretTapCount = 0;
let _secretTapTimer = null;
window.handleSecretAdminTap = function() {
    _secretTapCount++;
    clearTimeout(_secretTapTimer);
    _secretTapTimer = setTimeout(() => { _secretTapCount = 0; }, 3000);
    
    if (_secretTapCount >= 5) {
        _secretTapCount = 0;
        const pin = prompt("🔐 Ingrese Clave de Acceso Super Admin:");
        if (pin === "2026" || pin === "ADMIN2026" || pin === "SF2026") {
            localStorage.setItem('super_admin_mode', 'true');
            if (typeof store !== 'undefined' && store.user) {
                store.user.role = 'admin';
                store.user.isSuperAdmin = true;
            }
            if (typeof showToast === 'function') showToast("👑 Modo Super Admin Activado");
            if (window.router) window.router.navigateTo('#admin');
        } else if (pin !== null) {
            if (typeof showToast === 'function') showToast("❌ Clave incorrecta");
        }
    }
};
