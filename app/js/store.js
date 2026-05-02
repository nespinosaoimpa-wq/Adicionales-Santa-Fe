/**
 * Adicionales Santa Fe - State Management (Store)
 */

window.store = {
    user: null, // Will be set by Firebase Auth
    services: [], // Synced with Firestore
    expenses: [], // Synced with Firestore
    // Cache for Admin
    allUsers: [],

    // Config (Defaults from SPA 2026 Decree)
    serviceConfig: {
        'Public': { 'Ordinaria': 9500, 'Extraordinaria': 11400 },
        'Private': { 'Ordinaria': 12825, 'Extraordinaria': 15390 },
        'OSPES': { 'Ordinaria': 8000, 'Extraordinaria': 9600 },
    },

    // Notification Settings
    notificationSettings: {
        enabled: false,
        leadTime: 60 // minutes
    },

    // Auth
    isAuthenticated() {
        return !!this.user;
    },

    // Actions
    async login(email, password) {
        try {
            await DB.login(email, password);
            showToast("Sesión iniciada");
        } catch (e) {
            console.error(e);
            showToast("Error: " + e.message);
        }
    },

    async register(email, password, name) {
        try {
            const userCred = await DB.register(email, password);
            // Save extra details
            await DB.saveUser({
                email: userCred.user.email,
                name: name,
                role: 'user',
                avatar: `https://ui-avatars.com/api/?background=random&color=fff&name=${name}`,
                serviceConfig: this.serviceConfig,
                notificationSettings: this.notificationSettings
            });
            showToast("Cuenta creada");
        } catch (e) {
            console.error(e);
            showToast("Error: " + e.message);
        }
    },

    // --- Profile Actions ---

    async updateProfile(name, avatar) {
        if (!this.user) return;

        this.user.name = name;
        if (avatar) this.user.avatar = avatar;

        try {
            await DB.saveUser(this.user);
            showToast("Perfil actualizado");
            if (router.currentRoute === '#profile') renderProfile(document.getElementById('app'));
        } catch (e) {
            showToast("Error al guardar perfil");
            console.error(e);
        }
    },

    async handleAvatarUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        showToast("⏳ Preparando y comprimiendo foto...");

        const imgEl = document.getElementById('profile-avatar-img');
        const originalSrc = imgEl.src;

        try {
            // Client-side compression logic (Canvas)
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;
                img.onload = async () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 300;
                    const MAX_HEIGHT = 300;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    // Compress to highly optimized JPEG Base64
                    const base64Compressed = canvas.toDataURL('image/jpeg', 0.6); // 60% quality

                    // Test size
                    if (base64Compressed.length > 500000) {
                         showToast("❌ La imagen sigue siendo muy grande. Intenta con otra.");
                         return;
                    }

                    imgEl.src = base64Compressed;

                    showToast("⏳ Subiendo foto (Max. velocidad)...");
                    try {
                        const downloadURL = await DB.uploadAvatar({ isBase64: true, data: base64Compressed }, this.user.email);
                        if (downloadURL) {
                            await this.updateProfile(this.user.name, downloadURL);
                            showToast("✅ Foto actualizada y comprimida");
                        }
                    } catch(upErr) {
                         console.error("Upload error after compression:", upErr);
                         showToast("❌ Error al guardar en base de datos.");
                         imgEl.src = originalSrc;
                    }
                };
            };
        } catch (err) {
            console.error("Client compression error:", err);
            showToast("❌ Error al procesar imagen");
            imgEl.src = originalSrc;
        }
    },

    async requestNotificationPermission() {
        if (!("Notification" in window)) {
            showToast("❌ Tu navegador no soporta notificaciones");
            return;
        }

        // PWA specific warning
        if (window.isIOS() && !window.isInStandaloneMode()) {
            showToast("⚠️ En iPhone, debés 'Agregar a Inicio' la app primero para recibir alarmas.");
            return;
        }

        // If already granted, just toggle
        if (Notification.permission === 'granted') {
            this.notificationSettings.enabled = !this.notificationSettings.enabled;
            showToast(this.notificationSettings.enabled ? "🔔 Alarmas Activadas (Mantené la ventana de fondo)" : "🔕 Alarmas Desactivadas");
        } else {
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
                this.notificationSettings.enabled = true;
                showToast("🔔 Alarmas Activadas. Mantené la pestaña abierta de fondo.");
                new Notification("Adicionales Santa Fe", {
                    body: "¡Alarmas configuradas! Te avisaremos antes de cada adicional.",
                    icon: "./assets/icon-192.png"
                });
            } else {
                showToast("⚠️ Permiso denegado — Habilitá las notificaciones en Ajustes de Safari/Chrome");
                return;
            }
        }

        // Persist settings
        if (this.user) {
            this.user.notificationSettings = this.notificationSettings;
            await DB.saveUser(this.user);
        }

        // Re-schedule alarms
        this.scheduleShiftAlarms();

        // Re-render to show state
        if (router.currentRoute === '#profile') renderProfile(document.getElementById('app'));
    },

    async setNotifLeadTime(minutes) {
        this.notificationSettings.leadTime = minutes;
        if (this.user) {
            this.user.notificationSettings = this.notificationSettings;
            DB.saveUser(this.user).catch(e => console.warn('setNotifLeadTime save error:', e));
        }
        this.scheduleShiftAlarms(); // Re-schedule with new lead time
        if (router.currentRoute === '#profile') renderProfile(document.getElementById('app'));
    },

    async addService(service) {
        const tempId = 'temp-svc-' + Date.now();
        const optimisticService = {
            id: tempId,
            ...service,
            status: 'pending'
        };

        try {
            // Optimistic Update
            this.services.unshift(optimisticService);
            if (router.currentRoute === '#agenda') renderAgenda(document.getElementById('app'));

            const result = await DB.addService(service);

            // Reemplazar tempId con el real si es necesario (el listener lo hará eventualmente, pero esto ayuda)
            if (result && result.id) {
                const idx = this.services.findIndex(s => s.id === tempId);
                if (idx !== -1) this.services[idx].id = result.id;
            }

            showToast("✅ Servicio guardado");
        } catch (e) {
            console.error("Error saving service:", e);
            // Rollback
            this.services = this.services.filter(s => s.id !== tempId);
            if (router.currentRoute === '#agenda') renderAgenda(document.getElementById('app'));

            if (e.message.includes("offline") || e.code === 'unavailable') {
                showToast("❌ Sin conexión - Intenta más tarde");
            } else {
                showToast("❌ Error al guardar: " + e.message);
            }
            throw e;
        }
    },

    async deleteService(id) {
        try {
            await DB.deleteService(id);
            showToast("Servicio eliminado");
        } catch (e) {
            console.error(e);
            showToast("Error al eliminar");
        }
    },

    async updateLocalConfig(type, subType, value) {
        if (this.user && this.user.serviceConfig) {
            if (!this.user.serviceConfig[type]) this.user.serviceConfig[type] = {};
            this.user.serviceConfig[type][subType] = parseFloat(value);
        } else {
            this.serviceConfig[type][subType] = parseFloat(value);
        }
    },

    renameServiceSubtype(type, oldName, newName) {
        if (!newName || newName === oldName) return;

        let configTarget = this.user && this.user.serviceConfig ? this.user.serviceConfig : this.serviceConfig;

        if (configTarget[type] && configTarget[type][oldName] !== undefined) {
            const value = configTarget[type][oldName];
            delete configTarget[type][oldName];
            configTarget[type][newName] = value;

            if (router.currentRoute === '#profile') renderProfile();
        }
    },

    async saveProfile() {
        const name = document.getElementById('profile-name')?.innerText || this.user.name;
        const alias = document.getElementById('user-alias-input')?.value || this.user.alias || '';

        try {
            showToast("⏳ Guardando cambios...");
            await DB.updateUser({
                name,
                alias,
                avatar: this.user.avatar,
                notificationSettings: this.notificationSettings
            });
            // Update local state
            this.user.name = name;
            this.user.alias = alias;
            showToast("✅ Perfil y Tarifas actualizadas");
            await this.saveConfig(); // Seguir guardando config de servicios
        } catch (e) {
            showToast("❌ Error al guardar perfil");
            console.error(e);
        }
    },

    async saveConfig() {
        if (!this.user) return;
        try {
            await DB.saveUser(this.user);
            showToast("Configuración guardada y sincronizada");
        } catch (e) {
            console.error(e);
            showToast("Error al guardar");
        }
    },

    async resetPassword(email) {
        try {
            await auth.sendPasswordResetEmail(email);
            showToast(`Correo enviado a ${email}`);
        } catch (e) {
            showToast("Error: " + e.message);
        }
    },

    showPasswordReset() {
        const email = prompt("Ingresa tu email para recuperar la contraseña:");
        if (email) {
            this.resetPassword(email);
        }
    },

    async logout() {
        await DB.logout();
    },

    async loginWithGoogle() {
        try {
            await DB.loginWithGoogle();
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async shareApp() {
        const shareData = {
            title: 'Adicionales Santa Fe',
            text: 'Gestiona tus servicios de policía adicional y calcula tus ganancias fácil.',
            url: 'https://adicionalessantafe.com.ar/'
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
                showToast("¡Gracias por compartir!");
            } else {
                const text = `¡Probá esta App para Adicionales! ${shareData.url}`;
                window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
            }
        } catch (e) {
            console.error("Share error:", e);
        }
    },

    async installApp() {
        if (!this.deferredPrompt) return;
        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        console.log(`User response to install prompt: ${outcome}`);
        this.deferredPrompt = null;
        document.getElementById('install-banner')?.classList.add('hidden');
    },

    toggleDebug() {
        const el = document.getElementById('debug-console-container');
        if (el) el.classList.toggle('hidden');
    },

    async forceUpdate() {
        if ('serviceWorker' in navigator) {
            const registrations = await navigator.serviceWorker.getRegistrations();
            for (let registration of registrations) {
                await registration.unregister();
            }
            window.location.reload(true);
        } else {
            window.location.reload(true);
        }
    },

    init() {
        console.log("App v535.2.0-FINAL - Standard Deployment");








        // Apply saved theme ASAP
        this.initTheme();

        // Fetch dynamic holidays from Supabase (Improvement #1)
        this.fetchHolidays();

        document.body.insertAdjacentHTML('beforeend', renderOfflineBanner());
        document.body.insertAdjacentHTML('beforeend', renderInstallBanner());

        // iOS Specific Prompt logic
        if (window.isIOS() && !window.isInStandaloneMode()) {
            setTimeout(() => {
                const existing = document.getElementById('ios-install-banner');
                if (!existing) {
                    document.body.insertAdjacentHTML('beforeend', renderIOSInstallPrompt());
                }
            }, 4000);
        }

        setTimeout(() => showAnnouncementModal(), 2000);

        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .catch((e) => console.error("Persistence Error:", e));

        this.unsub = auth.onAuthStateChanged(async user => {
            if (user) {
                console.log("🔐 User Logged In:", user.email);
                try {
                    const dbUser = await DB.getUser(user.email);
                    const baseUser = {
                        uid: user.uid,
                        email: user.email,
                        role: 'user',
                        serviceConfig: JSON.parse(JSON.stringify(this.serviceConfig)),
                        notificationSettings: { enabled: false, leadTime: 60 },
                        name: user.displayName || user.email.split('@')[0],
                        avatar: user.photoURL || `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${user.email}`
                    };

                    if (dbUser) {
                        this.user = {
                            ...baseUser,
                            ...dbUser,
                            serviceConfig: { ...baseUser.serviceConfig, ...(dbUser.serviceConfig || {}) },
                            notificationSettings: { ...baseUser.notificationSettings, ...(dbUser.notificationSettings || {}) }
                        };
                        if (this.user.name === 'undefined' || !this.user.name) this.user.name = baseUser.name;
                        if (this.user.avatar === 'undefined' || !this.user.avatar) this.user.avatar = baseUser.avatar;
                    } else {
                        this.user = baseUser;
                    }

                    if (this.user.status === 'suspended') {
                        showToast("❌ Tu cuenta ha sido suspendida por un administrador.", 8000);
                        this.logout();
                        return;
                    }

                    this.serviceConfig = this.user.serviceConfig;
                    this.notificationSettings = this.user.notificationSettings;
                    console.log("✅ User data synchronized:", this.user.email);
                    await DB.saveUser(this.user);

                    this.unsubscribeServices = DB.subscribeToServices(services => {
                        this.services = services;
                        if (this.checkNotifications) this.checkNotifications();
                        this.scheduleShiftAlarms(); // Schedule push notifications for upcoming shifts
                        if (this.authInitialized) router.handleRoute();
                    });

                    this.unsubscribeAds = DB.subscribeToAds(ads => {
                        this.ads = ads;
                    });

                    this.unsubscribeUsers = DB.subscribeToUsers(users => {
                        this.allUsers = users;
                    });

                    this.unsubscribeAnnouncements = DB.subscribeToAnnouncements(announcement => {
                        this.latestAnnouncement = announcement;
                        if (typeof renderGlobalAnnouncement === 'function') {
                            renderGlobalAnnouncement();
                        }
                    });

                    this.unsubscribeExpenses = DB.subscribeToExpenses(expenses => {
                        this.expenses = expenses;
                        if (window.location.hash === '#financial') router.handleRoute();
                    });

                    if (this.checkNotifications) {
                        if (this.notifInterval) clearInterval(this.notifInterval);
                        this.notifInterval = setInterval(() => this.checkNotifications(), 60000);
                    }

                    // Ocultar banner de actualización ya que el usuario ingresó correctamente
                    localStorage.setItem('banner_v534.9_dismissed', 'true');
                    document.getElementById('update-banner')?.remove();

                    this.authInitialized = true;
                    router.handleRoute();

                    // Trigger onboarding for new users (Mejora 4)
                    setTimeout(() => { if (typeof showOnboarding === 'function') showOnboarding(); }, 1500);

                } catch (error) {
                    console.error("❌ Initialization Error:", error.code || error.message);
                    if (!this.user) {
                        this.user = {
                            email: user.email,
                            role: 'user',
                            serviceConfig: this.serviceConfig,
                            notificationSettings: { enabled: false, leadTime: 60 },
                            name: user.displayName || user.email.split('@')[0],
                            avatar: user.photoURL || `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${user.email}`
                        };
                    }
                    this.authInitialized = true;
                    router.handleRoute();
                }
            } else {
                console.log("👋 User Logged Out");
                this.user = null;
                this.services = [];
                if (this.unsubscribeServices) this.unsubscribeServices();
                if (this.unsubscribeUsers) this.unsubscribeUsers();
                if (this.unsubscribeExpenses) this.unsubscribeExpenses();
                if (this.notifInterval) clearInterval(this.notifInterval);
                this.authInitialized = true;
                router.handleRoute();
            }
        });
    },

    exportData() {
        const headers = ['Fecha', 'Tipo/Categoria', 'Lugar/Descripcion', 'Ingreso', 'Egreso', 'Estado'];
        
        // Map Services (Income)
        const serviceRows = this.services.map(s => [
            s.date, `Servicio ${s.type}`, `"${s.location}"`, s.total, '', s.status
        ]);

        // Map Expenses (and Incomes as Income)
        const expenseRows = this.expenses.map(e => {
            const isIncome = ['Sueldo', 'Cobro Adicionales', 'Otros Ingresos'].includes(e.category);
            return [
                e.date, e.category, `"${e.description || '-'}"`, isIncome ? e.amount : '', isIncome ? '' : e.amount, '-'
            ];
        });


        // Combine and sort by date descending
        const allRows = [...serviceRows, ...expenseRows].sort((a, b) => new Date(b[0]) - new Date(a[0]));

        const csvContent = [headers.join(','), ...allRows.map(r => r.join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'mis_finanzas_sf.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast("Exportando CSV Financiero...");
    },

    // Improvement #3: Advanced PDF Export
    exportToPDF() {
        if (!this.services || this.services.length === 0) {
            showToast("⚠️ No hay servicios para exportar.");
            return;
        }

        showToast("⏳ Generando PDF Profesional...");

        // Usar los datos del reporte que acabamos de ordenar (descendente)
        const sortedServices = [...this.services].sort((a, b) => new Date(b.date) - new Date(a.date));

        // Sum total amount
        const grandTotal = sortedServices.reduce((acc, s) => acc + (parseFloat(s.total) || 0), 0);
        const userName = this.user?.name || this.user?.displayName || 'Usuario';

        // Estructura del Documento Oculto
        const tempContainer = document.createElement('div');
        tempContainer.id = 'pdf-export-container';
        // Estilos ultra limpios específicos para A4
        tempContainer.innerHTML = `
            <div style="padding: 40px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; max-width: 800px; margin: 0 auto; background: white;">
                <div style="border-bottom: 2px solid #0d59f2; padding-bottom: 15px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: flex-end;">
                    <div>
                        <h1 style="color: #0d59f2; font-size: 24px; margin: 0; font-weight: 800;">Adicionales Santa Fe</h1>
                        <p style="margin: 5px 0 0 0; color: #666; font-size: 12px;">Resumen Oficial de Servicios Prestados</p>
                    </div>
                    <div style="text-align: right; font-size: 12px; color: #555;">
                        <p style="margin: 0; font-weight: bold;">AGENTE: ${userName.toUpperCase()}</p>
                        <p style="margin: 2px 0 0 0;">FECHA EMISIÓN: ${new Date().toLocaleDateString('es-AR')}</p>
                    </div>
                </div>

                <div style="margin-bottom: 20px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                    <p style="margin: 0; font-size: 14px; font-weight: bold; color: #0f172a;">TOTAL ACUMULADO: $${grandTotal.toLocaleString('es-AR')}</p>
                    <p style="margin: 5px 0 0 0; font-size: 12px; color: #64748b;">TOTAL SERVICIOS: ${sortedServices.length}</p>
                </div>

                <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
                    <thead>
                        <tr style="background-color: #f1f5f9; text-align: left;">
                            <th style="padding: 8px; border-bottom: 2px solid #cbd5e1; width: 12%;">FECHA</th>
                            <th style="padding: 8px; border-bottom: 2px solid #cbd5e1; width: 15%;">TIPO / CLASE</th>
                            <th style="padding: 8px; border-bottom: 2px solid #cbd5e1; width: 33%;">LUGAR (OBJETIVO)</th>
                            <th style="padding: 8px; border-bottom: 2px solid #cbd5e1; width: 15%;">HORARIO / HS</th>
                            <th style="padding: 8px; border-bottom: 2px solid #cbd5e1; width: 15%; text-align: right;">IMPORTE</th>
                            <th style="padding: 8px; border-bottom: 2px solid #cbd5e1; width: 10%; text-align: center;">ESTADO</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${sortedServices.map((s, idx) => `
                            <tr style="background-color: ${idx % 2 === 0 ? '#ffffff' : '#f8fafc'}">
                                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${s.date.split('-').reverse().join('/')}</td>
                                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: ${s.type === 'Public' ? '#0d59f2' : '#f59e0b'};">
                                    ${s.type === 'Public' ? 'PÚB.' : (s.type === 'Private' ? 'PRIV.' : 'OSP.')} <span style="font-weight: normal; color: #64748b;">${s.subType ? s.subType.substring(0, 3).toUpperCase() : ''}</span>
                                </td>
                                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${s.location.substring(0, 35)}${s.location.length > 35 ? '...' : ''}</td>
                                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #475569;">${s.startTime || '--'} a ${s.endTime || '--'} (${s.hours}h)</td>
                                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: bold;">$${parseFloat(s.total).toLocaleString('es-AR')}</td>
                                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: center;">
                                    ${s.status === 'paid' ? '<span style="color: #10b981;">PAGADO</span>' : '<span style="color: #f59e0b;">PDT</span>'}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <div style="margin-top: 30px; text-align: center; font-size: 9px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 10px;">
                    Generado automáticamente por la App Adicionales Santa Fe. Este documento tiene valor exclusivamente informativo.
                </div>
            </div>
        `;

        document.body.appendChild(tempContainer);

        // html2pdf Opciones
        const opt = {
            margin: 0,
            filename: `Resumen_Adicionales_${userName.replace(/ /g, '_')}_${new Date().getFullYear()}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        // Generar
        html2pdf().set(opt).from(tempContainer).save().then(() => {
            document.body.removeChild(tempContainer);
            showToast("✅ PDF Exportado con Éxito");
        }).catch(err => {
            console.error("PDF Generate error:", err);
            document.body.removeChild(tempContainer);
            showToast("❌ Hubo un error al generar el PDF");
        });
    },

    async addExpense(category, amount, description) {
        const tempId = 'temp-' + Date.now();
        try {
            this.expenses.unshift({
                id: tempId,
                category,
                amount: parseFloat(amount),
                description: description || '',
                date: this.getLocalDateString(),
                timestamp: new Date().toISOString()
            });
            if (window.location.hash === '#financial') router.handleRoute();

            await DB.addExpense({
                category,
                amount: parseFloat(amount),
                description: description || '',
                date: this.getLocalDateString()
            });
            showToast(`Gasto de $${parseFloat(amount).toLocaleString('es-AR')} agregado`);
            return true;
        } catch (e) {
            showToast("Error al guardar gasto");
            console.error(e);
            this.expenses = this.expenses.filter(e => e.id !== tempId);
            if (window.location.hash === '#financial') router.handleRoute();
            return false;
        }
    },

    async deleteExpense(id) {
        try {
            await DB.deleteExpense(id);
            showToast("Gasto eliminado");
        } catch (e) {
            showToast("Error al eliminar gasto");
            console.error(e);
        }
    },

    getFormattedDate(dateStr) {
        if (!dateStr) return '';
        const [year, month, day] = dateStr.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        const options = { weekday: 'short', day: 'numeric', month: 'short' };
        return date.toLocaleDateString('es-ES', options);
    },

    getLocalDateString(date = new Date()) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    // Fetches holidays from Supabase DB to avoid app updates just for calendar changes
    async fetchHolidays() {
        if (typeof DB !== 'undefined' && DB.getHolidays) {
            const remoteHolidays = await DB.getHolidays();
            if (remoteHolidays && remoteHolidays.length > 0) {
                this.holidays2026 = remoteHolidays;
                console.log("📅 Feriados dinámicos cargados exitosamente desde la nube.");
            } else {
                console.log("📅 Feriados dinámicos no encontrados, usando calendario local (fallback).");
            }
        }
    },

    // Feriados Nacionales Argentina 2025 y 2026 — Incluye traslados oficiales (Fallback local)
    holidays2026: [
        // 2025
        '2025-01-01', // Ano Nuevo
        '2025-03-03', '2025-03-04', // Carnaval
        '2025-03-24', // Dia de la Memoria
        '2025-04-02', // Malvinas
        '2025-04-18', // Viernes Santo
        '2025-05-01', // Trabajador
        '2025-05-25', // Revolucion de Mayo
        '2025-06-16', // Paso a la Inmortalidad de Guemes (lunes)
        '2025-06-20', // Belgrano
        '2025-07-09', // Independencia
        '2025-08-18', // San Martin (lunes en lugar del 17)
        '2025-10-12', // Diversidad Cultural
        '2025-11-20', // Soberania
        '2025-11-21', // puente por elecciones
        '2025-12-08', // Virgen
        '2025-12-25', // Navidad
        // 2026
        '2026-01-01', // Ano Nuevo
        '2026-02-16', '2026-02-17', // Carnaval
        '2026-03-24', // Memoria
        '2026-04-02', // Malvinas
        '2026-04-03', // Viernes Santo
        '2026-05-01', // Trabajador
        '2026-05-25', // Revolucion de Mayo
        '2026-06-15', // Guemes
        '2026-06-20', // Belgrano
        '2026-07-09', // Independencia
        '2026-08-17', // San Martin
        '2026-10-12', // Diversidad Cultural
        '2026-11-20', // Soberania
        '2026-12-08', // Virgen
        '2026-12-25', // Navidad
    ],

    calculateHoursSplit(dateStr, startStr, endStr) {
        if (!dateStr || !startStr || !endStr) return { ord: 0, ext: 0 };

        const [y, m, d] = dateStr.split('-').map(Number);
        const start = new Date(y, m - 1, d, ...startStr.split(':').map(Number));
        let end = new Date(y, m - 1, d, ...endStr.split(':').map(Number));

        if (end < start) {
            end.setDate(end.getDate() + 1);
        }

        let ord = 0;
        let ext = 0;

        // Iterate by 30 minute chunks for precision
        let current = new Date(start);
        const step = 30 * 60 * 1000; // 30 mins

        while (current < end) {
            const next = new Date(current.getTime() + step);
            const actualEnd = next > end ? end : next;
            const chunkHours = (actualEnd - current) / (1000 * 60 * 60);

            const day = current.getDay(); // 0: Dom, 6: Sáb
            const hour = current.getHours();
            const minute = current.getMinutes();
            const timeVal = hour + (minute / 60);

            const currentDateStr = this.getLocalDateString(current);
            const isHoliday = this.holidays2026.includes(currentDateStr);

            let isExtra = false;

            // --- LÓGICA DE EXTRAORDINARIA ---

            // 1. Feriados (Todo el día hasta las 06:00 del día hábil siguiente)
            // Nota: Si es hoy feriado, es Extra. Si es mañana temprano (antes de las 6) Y hoy fue feriado, es Extra.
            const prevDay = new Date(current.getTime() - 24 * 60 * 60 * 1000);
            const wasHoliday = this.holidays2026.includes(this.getLocalDateString(prevDay));

            if (isHoliday) {
                isExtra = true;
            } else if (wasHoliday && timeVal < 6) {
                isExtra = true;
            }
            // 2. Fines de semana (Sáb 12:00 a Lun 06:00)
            else if ((day === 6 && timeVal >= 12) || (day === 0) || (day === 1 && timeVal < 6)) {
                isExtra = true;
            }
            // 3. Horario Nocturno (22:00 a 06:00 de Lun a Vie)
            else if (timeVal >= 22 || timeVal < 6) {
                isExtra = true;
            }

            if (isExtra) ext += chunkHours;
            else ord += chunkHours;

            current = next;
        }

        return { ord, ext };
    },

    // --- THEME: Dark / Light Mode ---
    initTheme() {
        const saved = localStorage.getItem('app_theme') || 'dark';
        const root = document.documentElement;
        if (saved === 'light') {
            root.classList.remove('dark');
        } else {
            root.classList.add('dark');
        }
    },

    toggleTheme() {
        const root = document.documentElement;
        const isDark = root.classList.contains('dark');
        if (isDark) {
            root.classList.remove('dark');
            localStorage.setItem('app_theme', 'light');
            showToast('☀️ Modo Claro activado');
        } else {
            root.classList.add('dark');
            localStorage.setItem('app_theme', 'dark');
            showToast('🌙 Modo Oscuro activado');
        }
        // Re-render current view to update theme-dependent UI
        if (router && router.currentRoute) router.handleRoute();
    },

    // --- SHIFT ALARMS: Schedule push notifications for upcoming shifts ---
    scheduleShiftAlarms() {
        if (!this.notificationSettings?.enabled) return;
        if (Notification.permission !== 'granted') return;

        // Clear previous timers
        if (this._alarmTimers) this._alarmTimers.forEach(t => clearTimeout(t));
        this._alarmTimers = [];

        const leadMs = (this.notificationSettings.leadTime || 60) * 60 * 1000;
        const now = Date.now();

        this.services.forEach(service => {
            if (!service.date || !service.startTime) return;
            const [hours, minutes] = service.startTime.split(':').map(Number);
            const [y, m, d] = service.date.split('-').map(Number);
            const shiftDate = new Date(y, m - 1, d, hours, minutes, 0, 0);
            const notifyAt = shiftDate.getTime() - leadMs;

            if (notifyAt <= now) return; // Already past

            const delay = notifyAt - now;
            const timer = setTimeout(() => {
                const location = service.location || 'Sin ubicación';
                const timeRange = service.startTime + (service.endTime ? ` - ${service.endTime}` : '');
                const typeMap = { Public: 'Público', Private: 'Privado', OSPES: 'OSPES' };
                const type = typeMap[service.type] || service.type;
                if (Notification.permission === 'granted') {
                    new Notification(`🚨 Adicional en ${this.notificationSettings.leadTime} min`, {
                        body: `📍 ${location}\n🕐 ${timeRange} — ${type}`,
                        icon: './assets/icon-192.png',
                        badge: './assets/icon-192.png',
                        vibrate: [200, 100, 200],
                        tag: 'shift-alarm-' + service.id,
                        renotify: false
                    });
                }
            }, delay);

            this._alarmTimers.push(timer);
        });

        const count = this._alarmTimers.length;
        if (count > 0) console.log(`⏰ ${count} alarma(s) programada(s)`);
    },

    // --- GAMIFICATION: User Rank System ---
    getUserRank() {
        const now = new Date();
        const cm = now.getMonth();
        const cy = now.getFullYear();
        const monthHours = this.services
            .filter(s => {
                if (!s.date) return false;
                const d = new Date(s.date + 'T00:00:00');
                return d.getMonth() === cm && d.getFullYear() === cy;
            })
            .reduce((sum, s) => sum + (parseFloat(s.hours) || 0), 0);

        const ranks = [
            { name: 'Cadete', icon: '🥉', min: 0, max: 20 },
            { name: 'Oficial de Bronce', icon: '🥈', min: 21, max: 60 },
            { name: 'Centinela de Plata', icon: '⭐', min: 61, max: 120 },
            { name: 'Centinela de Oro', icon: '🏆', min: 121, max: Infinity }
        ];

        let current = ranks[0];
        for (const r of ranks) {
            if (monthHours >= r.min) current = r;
        }

        const nextRank = ranks[ranks.indexOf(current) + 1];
        const hoursToNext = nextRank ? (nextRank.min - monthHours) : 0;

        return { ...current, monthHours, nextRank, hoursToNext };
    },

    getRankProgress() {
        const rank = this.getUserRank();
        if (!rank.nextRank) return 100; // Max rank
        const rangeSize = rank.nextRank.min - rank.min;
        const progress = rank.monthHours - rank.min;
        return Math.min(Math.round((progress / rangeSize) * 100), 100);
    },

    // --- MONTHLY GOAL ---
    setMonthlyGoal(amount) {
        const goal = parseFloat(amount) || 0;
        if (this.user) {
            this.user.monthlyGoal = goal;
            DB.saveUser(this.user).catch(e => console.warn('Goal save error:', e));
        }
        showToast(`🎯 Meta mensual: $${goal.toLocaleString('es-AR')}`);
    },

    getGoalProgress() {
        const goal = (this.user && this.user.monthlyGoal) || 0;
        if (goal <= 0) return { goal: 0, earned: 0, percent: 0 };
        const now = new Date();
        const earned = this.services
            .filter(s => {
                if (!s.date) return false;
                const d = new Date(s.date + 'T00:00:00');
                return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
            })
            .reduce((sum, s) => sum + (parseFloat(s.total) || 0), 0);
        return { goal, earned, percent: Math.min(Math.round((earned / goal) * 100), 100) };
    },

    // --- SHARE CARD ---
    async generateShareCard() {
        const rank = this.getUserRank();
        const now = new Date();
        const monthName = now.toLocaleString('es-AR', { month: 'long' });
        const userName = this.user?.name || 'Agente';

        const monthServices = this.services.filter(s => {
            if (!s.date) return false;
            const d = new Date(s.date + 'T00:00:00');
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        });
        const totalSvcs = monthServices.length;

        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 400;
        const ctx = canvas.getContext('2d');

        // Background gradient
        const grad = ctx.createLinearGradient(0, 0, 600, 400);
        grad.addColorStop(0, '#0f172a');
        grad.addColorStop(1, '#1e293b');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 600, 400);

        // Accent bar
        const accentGrad = ctx.createLinearGradient(0, 0, 600, 0);
        accentGrad.addColorStop(0, '#0d59f2');
        accentGrad.addColorStop(1, '#3b82f6');
        ctx.fillStyle = accentGrad;
        ctx.fillRect(0, 0, 600, 6);

        // Brand
        ctx.fillStyle = '#0d59f2';
        ctx.font = 'bold 16px Inter, sans-serif';
        ctx.fillText('ADICIONALES SANTA FE', 40, 50);

        // Month
        ctx.fillStyle = '#64748b';
        ctx.font = '13px Inter, sans-serif';
        ctx.fillText(`Resumen de ${monthName.toUpperCase()} ${now.getFullYear()}`, 40, 75);

        // User
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px Inter, sans-serif';
        ctx.fillText(userName.toUpperCase(), 40, 130);

        // Rank badge
        ctx.font = '42px sans-serif';
        ctx.fillText(rank.icon, 40, 200);
        ctx.fillStyle = '#e2e8f0';
        ctx.font = 'bold 22px Inter, sans-serif';
        ctx.fillText(rank.name, 95, 195);

        // Stats
        ctx.fillStyle = '#94a3b8';
        ctx.font = '14px Inter, sans-serif';
        ctx.fillText('HORAS TRABAJADAS', 40, 260);
        ctx.fillText('SERVICIOS CUMPLIDOS', 320, 260);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 36px Inter, sans-serif';
        ctx.fillText(`${rank.monthHours.toFixed(1)}h`, 40, 300);
        ctx.fillText(`${totalSvcs}`, 320, 300);

        // Footer
        ctx.fillStyle = '#334155';
        ctx.fillRect(0, 355, 600, 45);
        ctx.fillStyle = '#64748b';
        ctx.font = '11px Inter, sans-serif';
        ctx.fillText('Generado con la App Adicionales Santa Fe • adicionales-sf.app', 40, 382);

        try {
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
            const file = new File([blob], 'mi_resumen_adicionales.png', { type: 'image/png' });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: 'Mi Resumen - Adicionales Santa Fe',
                    text: `Soy ${rank.name} ${rank.icon} este mes con ${rank.monthHours.toFixed(1)} horas trabajadas.`,
                    files: [file]
                });
                showToast('✅ ¡Tarjeta compartida!');
            } else {
                // Fallback: download
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'mi_resumen_adicionales.png';
                a.click();
                URL.revokeObjectURL(url);
                showToast('📥 Imagen descargada');
            }
        } catch (e) {
            console.error('Share card error:', e);
            showToast('Error al compartir');
        }
    }
};

window.store = store;
