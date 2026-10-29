/**
 * Adicionales Santa Fe - Retention & Notification Engine
 * Sistema inteligente de retención, alertas de guardia (pre/post-servicio),
 * recordatorios de liquidación salarial, entrenamiento ISeP y centro de notificaciones.
 */

window.RetentionNotifications = {
    STORAGE_READ_IDS: 'asf_retention_read_ids_v1',
    STORAGE_DISMISSED_OPTIN: 'asf_notif_optin_dismissed_v1',
    STORAGE_PRE_NOTIFIED: 'asf_notified_shifts_pre_v1',
    STORAGE_POST_NOTIFIED: 'asf_notified_shifts_post_v1',
    STORAGE_QUINCENA_NOTIFIED: 'asf_notified_quincena_v1',
    STORAGE_ISEP_NOTIFIED: 'asf_notified_isep_streak_v1',

    _initialized: false,
    _intervalId: null,

    /**
     * Inicializa el motor de retención
     */
    init() {
        if (this._initialized) return;
        this._initialized = true;

        // Ejecutar primer chequeo a los 2 segundos de arranque
        setTimeout(() => this.runRetentionChecks(), 2000);

        // Chequeo periódico cada 60 segundos
        if (this._intervalId) clearInterval(this._intervalId);
        this._intervalId = setInterval(() => this.runRetentionChecks(), 60000);

        // Chequeo al recuperar visibilidad (ej: al volver a la app en el celular)
        if (typeof document !== 'undefined') {
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'visible') {
                    this.runRetentionChecks();
                }
            });
        }

        console.log('[RetentionNotifications] Motor de retención y alertas inicializado ✅');
    },

    /**
     * Obtiene el conjunto de IDs marcados como leídos
     */
    getReadIds() {
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_READ_IDS) || '[]');
        } catch {
            return [];
        }
    },

    /**
     * Marca un ID como leído
     */
    markAsRead(id) {
        if (!id) return;
        const readIds = new Set(this.getReadIds());
        readIds.add(id);
        localStorage.setItem(this.STORAGE_READ_IDS, JSON.stringify([...readIds]));
        this._updateBellBadge();
    },

    /**
     * Marca todas las notificaciones actuales como leídas
     */
    markAllAsRead() {
        const feed = this.getFeed();
        const readIds = new Set(this.getReadIds());
        feed.forEach(item => readIds.add(item.id));
        localStorage.setItem(this.STORAGE_READ_IDS, JSON.stringify([...readIds]));
        this._updateBellBadge();
        showToast("✅ Todas las notificaciones marcadas como leídas");
        this.openCenter(); // Refrescar modal
    },

    /**
     * Verifica si existen notificaciones no leídas
     */
    hasUnread() {
        const feed = this.getFeed();
        const readIds = new Set(this.getReadIds());
        return feed.some(item => !readIds.has(item.id));
    },

    /**
     * Actualiza visualmente el indicador rojo de la campana en la barra superior
     */
    _updateBellBadge() {
        const badge = document.getElementById('notif-bell-badge');
        if (badge) {
            badge.style.display = this.hasUnread() ? 'block' : 'none';
        }
    },

    /**
     * Construye el feed de notificaciones operativas dinámicas
     */
    getFeed() {
        const feed = [];
        const now = new Date();
        const services = (typeof store !== 'undefined' && Array.isArray(store.services)) ? store.services : [];

        // 1. Notificación: Próximo servicio programado
        const upcomingShifts = services
            .filter(s => {
                if (!s.date) return false;
                const d = new Date(s.date + 'T' + (s.startTime || '00:00'));
                return d > now;
            })
            .sort((a, b) => new Date(a.date + 'T' + (a.startTime || '00:00')) - new Date(b.date + 'T' + (b.startTime || '00:00')));

        if (upcomingShifts.length > 0) {
            const next = upcomingShifts[0];
            const dateFmt = (typeof store !== 'undefined' && store.getFormattedDate) ? store.getFormattedDate(next.date) : next.date;
            feed.push({
                id: `shift-upcoming-${next.id || next.date}`,
                type: 'shift',
                priority: 'high',
                title: '🚨 Próximo Servicio Programado',
                message: `${next.hours || 0}hs en ${next.location || 'Servicio policial'} — ${dateFmt} a las ${next.startTime || '00:00'}hs.`,
                actionLabel: 'Ver Agenda',
                route: '#agenda',
                timestamp: next.date + ' ' + (next.startTime || '00:00'),
                icon: 'alarm'
            });
        }

        // 2. Notificación: Cierre de guardia / Liquidación pendiente (si terminó en las últimas 24hs)
        const recentPastShifts = services
            .filter(s => {
                if (!s.date || !s.endTime) return false;
                const dEnd = new Date(s.date + 'T' + s.endTime);
                const diffHours = (now - dEnd) / (1000 * 60 * 60);
                return diffHours >= 0.25 && diffHours <= 24; // entre 15 min y 24hs de haber terminado
            })
            .sort((a, b) => new Date(b.date + 'T' + b.endTime) - new Date(a.date + 'T' + a.endTime));

        if (recentPastShifts.length > 0) {
            const lastPast = recentPastShifts[0];
            feed.push({
                id: `shift-checkin-${lastPast.id || lastPast.date}`,
                type: 'checkin',
                priority: 'medium',
                title: '🏁 Confirmación de Guardia',
                message: `¿Finalizaste tu servicio en ${lastPast.location || 'tu adicional'}? Verificá las horas para asegurar el cálculo exacto de tu cobro.`,
                actionLabel: 'Revisar Balance',
                route: '#financial',
                timestamp: 'Reciente',
                icon: 'task_alt'
            });
        }

        // 3. Notificación: Recordatorio de liquidación salarial / Quincena
        const dayOfMonth = now.getDate();
        if (dayOfMonth >= 10 && dayOfMonth <= 16) {
            feed.push({
                id: `money-quincena-1-${now.getFullYear()}-${now.getMonth() + 1}`,
                type: 'money',
                priority: 'medium',
                title: '💰 Control de 1ra Quincena',
                message: 'Cierre de planilla de la 1ra quincena. Compará tus servicios registrados con las planillas complementarias de tu dependencia.',
                actionLabel: 'Ver Finanzas',
                route: '#financial',
                timestamp: 'Esta semana',
                icon: 'payments'
            });
        } else if (dayOfMonth >= 26 || dayOfMonth <= 3) {
            feed.push({
                id: `money-quincena-2-${now.getFullYear()}-${now.getMonth() + 1}`,
                type: 'money',
                priority: 'medium',
                title: '💰 Cierre Mensual de Adicionales',
                message: 'Verificá tu total acumulado de SPA/OSESP del mes para anticipar tu liquidación oficial de haberes.',
                actionLabel: 'Calcular Total',
                route: '#financial',
                timestamp: 'Fin de Mes',
                icon: 'account_balance_wallet'
            });
        }

        // 4. Notificación: Concurso ISeP 2026 (Simulacro y Leyes)
        feed.push({
            id: 'isep-ascenso-concurso-2026',
            type: 'academia',
            priority: 'low',
            title: '🎯 Concurso ISeP 2026 Vigente',
            message: 'Practicá con preguntas oficiales de Tiro Policial, Seguridad de la Información, Conducción y CPP Santa Fe.',
            actionLabel: 'Rendir Simulacro',
            route: '#academia',
            timestamp: 'Oficial',
            icon: 'school'
        });

        // 5. Notificación: Tarifas y Decretos Oficiales vigentes
        feed.push({
            id: 'normativa-decreto-0075',
            type: 'normativa',
            priority: 'low',
            title: '📜 Tarifas y Horas Extras (Dec. 0075)',
            message: 'Horas extraordinarias habilitadas desde las 22:00hs en días hábiles y desde las 12:00hs los sábados. Consultá los montos en la guía.',
            actionLabel: 'Ver Guía',
            route: '#info-guia',
            timestamp: 'Vigente',
            icon: 'gavel'
        });

        // 6. Global announcement de Firebase si existe
        if (typeof store !== 'undefined' && store.latestAnnouncement) {
            const ann = store.latestAnnouncement;
            feed.unshift({
                id: `announcement-${ann.id || 'current'}`,
                type: 'announcement',
                priority: 'high',
                title: '📢 Comunicado Oficial ASF',
                message: ann.message,
                actionLabel: 'Entendido',
                route: '#agenda',
                timestamp: 'Novedad',
                icon: 'campaign'
            });
        }

        return feed;
    },

    /**
     * Ejecuta chequeos proactivos de retención y dispara notificaciones del sistema
     */
    runRetentionChecks() {
        if (!('Notification' in window)) return;
        if (Notification.permission !== 'granted') return;
        if (typeof store === 'undefined' || !store.notificationSettings?.enabled) return;

        const now = Date.now();
        const services = Array.isArray(store.services) ? store.services : [];
        const leadMs = (store.notificationSettings.leadTime || 60) * 60 * 1000;

        // A. Alerta de Entrada a Guardia (Pre-shift)
        services.forEach(service => {
            if (!service.date || !service.startTime) return;
            const [y, m, d] = service.date.split('-').map(Number);
            const [h, min] = service.startTime.split(':').map(Number);
            const shiftStart = new Date(y, m - 1, d, h, min, 0, 0).getTime();
            const notifyTime = shiftStart - leadMs;

            // Ventana de disparo: dentro de los últimos 15 min de la hora objetivo
            if (now >= notifyTime && now < shiftStart) {
                const notifiedKey = `pre_${service.id || (service.date + '_' + service.startTime)}`;
                const preNotified = this._getMap(this.STORAGE_PRE_NOTIFIED);
                if (!preNotified[notifiedKey]) {
                    preNotified[notifiedKey] = now;
                    this._saveMap(this.STORAGE_PRE_NOTIFIED, preNotified);

                    const location = service.location || 'tu objetivo asignado';
                    const leadMins = store.notificationSettings.leadTime || 60;
                    this.dispatchSystemNotification(`🚨 Adicional en ${leadMins} min`, {
                        body: `📍 ${location}\n🕐 Horario: ${service.startTime}hs. ¡Buen servicio y buena guardia!`,
                        tag: `shift-alarm-pre-${service.id}`,
                        url: './#agenda'
                    });
                }
            }
        });

        // B. Alerta de Fin de Guardia (Post-shift check-in)
        services.forEach(service => {
            if (!service.date || !service.endTime) return;
            const [y, m, d] = service.date.split('-').map(Number);
            const [h, min] = service.endTime.split(':').map(Number);
            const shiftEnd = new Date(y, m - 1, d, h, min, 0, 0).getTime();

            // Disparar entre 10 y 90 minutos después de terminar el servicio
            const diffMin = (now - shiftEnd) / (1000 * 60);
            if (diffMin >= 10 && diffMin <= 90) {
                const notifiedKey = `post_${service.id || (service.date + '_' + service.endTime)}`;
                const postNotified = this._getMap(this.STORAGE_POST_NOTIFIED);
                if (!postNotified[notifiedKey]) {
                    postNotified[notifiedKey] = now;
                    this._saveMap(this.STORAGE_POST_NOTIFIED, postNotified);

                    const location = service.location || 'tu adicional';
                    this.dispatchSystemNotification(`🏁 ¿Finalizaste tu servicio?`, {
                        body: `📍 ${location} ha concluido. Registrá tus horas y verificá tu ganancia acumulada del mes.`,
                        tag: `shift-alarm-post-${service.id}`,
                        url: './#financial'
                    });
                }
            }
        });

        // C. Recordatorio Concurso ISeP (cada 3 días de inactividad)
        try {
            const todayStr = new Date().toISOString().slice(0, 10);
            const lastIsepNotif = localStorage.getItem(this.STORAGE_ISEP_NOTIFIED);
            const quizHist = JSON.parse(localStorage.getItem('quiz_history') || '[]');
            const lastQuiz = quizHist[0];
            const lastQuizTime = lastQuiz ? new Date(lastQuiz.date).getTime() : 0;
            const daysSinceQuiz = (now - lastQuizTime) / (1000 * 60 * 60 * 24);

            if (daysSinceQuiz >= 3 && lastIsepNotif !== todayStr) {
                // Disparar solo en turno mañana o tarde (09:00 a 20:00)
                const currentHour = new Date().getHours();
                if (currentHour >= 9 && currentHour <= 20) {
                    localStorage.setItem(this.STORAGE_ISEP_NOTIFIED, todayStr);
                    this.dispatchSystemNotification(`🎯 Concurso ISeP 2026`, {
                        body: `Mantené el entrenamiento. Completá un simulacro rápido de 25 preguntas para tu ascenso.`,
                        tag: 'retention-isep-streak',
                        url: './#academia'
                    });
                }
            }
        } catch(e) {}
    },

    /**
     * Despacha una notificación del sistema mediante Service Worker o Notification API
     */
    dispatchSystemNotification(title, options = {}) {
        if (!('Notification' in window)) return;
        if (Notification.permission !== 'granted') return;

        const defaultOpts = {
            icon: './assets/icon-192.png',
            badge: './assets/icon-192.png',
            vibrate: [200, 100, 200],
            data: { url: options.url || './#agenda' }
        };

        const finalOpts = { ...defaultOpts, ...options };

        try {
            if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                navigator.serviceWorker.ready.then(reg => {
                    reg.showNotification(title, finalOpts).catch(err => {
                        console.warn('[Retention] Fallback SW notification error:', err);
                        new Notification(title, finalOpts);
                    });
                }).catch(() => new Notification(title, finalOpts));
            } else {
                new Notification(title, finalOpts);
            }

            if (window.TelemetryService) {
                window.TelemetryService.trackEvent('notification', 'displayed', options.tag || 'general');
            }
        } catch (err) {
            console.warn('[Retention] Error dispatching notification:', err);
        }
    },

    /**
     * Renderiza la tarjeta de Opt-in sutil para capturar permisos de notificación
     */
    renderOptInCard() {
        const hasPermission = ('Notification' in window) && Notification.permission === 'granted';
        const isEnabled = typeof store !== 'undefined' && store.notificationSettings?.enabled;

        // Si ya está activo y concedido, no mostrar el prompt
        if (hasPermission && isEnabled) return '';

        // Si el usuario lo descartó recientemente (hace menos de 4 días), no molestar
        const dismissedAt = parseInt(localStorage.getItem(this.STORAGE_DISMISSED_OPTIN) || '0', 10);
        if (Date.now() - dismissedAt < 4 * 24 * 60 * 60 * 1000) {
            return '';
        }

        return `
            <div id="retention-optin-card" class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-primary/20 to-slate-900 border border-primary/30 p-4 shadow-xl mb-4 animate-fade-in">
                <div class="flex items-start gap-3">
                    <div class="size-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0 mt-0.5">
                        <span class="material-symbols-outlined text-primary text-2xl animate-bounce">notifications_active</span>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between gap-2">
                            <span class="text-[9px] font-black uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">Alertas Operativas</span>
                            <button onclick="window.RetentionNotifications.dismissOptIn()" class="text-slate-400 hover:text-white p-1 rounded-full transition-colors" title="Posponer">
                                <span class="material-symbols-outlined text-sm">close</span>
                            </button>
                        </div>
                        <h4 class="text-sm font-bold text-white mt-1 leading-snug">No te pierdas ninguna guardia ni aumento</h4>
                        <p class="text-xs text-slate-300 mt-0.5 leading-relaxed">
                            Activá las alarmas de guardia para recibir avisos 60 min antes de tu adicional y alertas cuando se actualicen las tarifas de haberes.
                        </p>
                        <div class="flex items-center gap-2 mt-3">
                            <button onclick="window.RetentionNotifications.requestOptIn()" class="px-4 py-2 bg-primary hover:bg-blue-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-primary/25 flex items-center gap-1.5 active:scale-95 transition-all">
                                <span class="material-symbols-outlined text-sm">notifications</span>
                                Activar Alertas de Guardia
                            </button>
                            <button onclick="window.RetentionNotifications.dismissOptIn()" class="px-3 py-2 text-slate-400 hover:text-white text-xs font-semibold rounded-xl hover:bg-white/5 transition-colors">
                                Más tarde
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Solicita permisos y activa notificaciones con 1 clic
     */
    async requestOptIn() {
        if (typeof store !== 'undefined' && store.requestNotificationPermission) {
            await store.requestNotificationPermission();
            const card = document.getElementById('retention-optin-card');
            if (card) {
                card.innerHTML = `
                    <div class="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2 text-emerald-400 text-xs font-bold">
                        <span class="material-symbols-outlined text-base">verified</span>
                        ¡Alertas de guardia activadas con éxito! Te avisaremos antes de cada servicio.
                    </div>
                `;
                setTimeout(() => card.remove(), 4000);
            }
            this._updateBellBadge();
        }
    },

    /**
     * Posponer la tarjeta de opt-in por 4 días
     */
    dismissOptIn() {
        localStorage.setItem(this.STORAGE_DISMISSED_OPTIN, Date.now().toString());
        const card = document.getElementById('retention-optin-card');
        if (card) card.remove();
        showToast("Recordatorio pospuesto");
    },

    /**
     * Abre el Centro de Notificaciones y Alertas (Modal completo)
     */
    openCenter() {
        // Remover si ya existe modal previo
        const existing = document.getElementById('asf-notif-center-modal');
        if (existing) existing.remove();

        const feed = this.getFeed();
        const readIds = new Set(this.getReadIds());
        const hasPermission = ('Notification' in window) && Notification.permission === 'granted';
        const isEnabled = typeof store !== 'undefined' && store.notificationSettings?.enabled;

        const modal = document.createElement('div');
        modal.id = 'asf-notif-center-modal';
        modal.className = 'fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in';

        modal.innerHTML = `
            <div class="w-full max-w-lg bg-slate-900 border border-white/10 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-slide-up">
                <!-- Header -->
                <div class="p-4 border-b border-white/10 flex items-center justify-between bg-slate-900/90 sticky top-0 z-10">
                    <div class="flex items-center gap-2.5">
                        <div class="size-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
                            <span class="material-symbols-outlined text-xl">notifications</span>
                        </div>
                        <div>
                            <h3 class="text-sm font-bold text-white">Centro de Alertas & Notificaciones</h3>
                            <p class="text-[10px] text-slate-400">Policía de Santa Fe • Novedades en tiempo real</p>
                        </div>
                    </div>
                    <button onclick="document.getElementById('asf-notif-center-modal')?.remove()" class="size-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                        <span class="material-symbols-outlined text-base">close</span>
                    </button>
                </div>

                <!-- Fast Settings Bar -->
                <div class="p-3 bg-white/5 border-b border-white/5 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-sm ${isEnabled && hasPermission ? 'text-emerald-400' : 'text-amber-400'}">
                            ${isEnabled && hasPermission ? 'notifications_active' : 'notifications_off'}
                        </span>
                        <span class="text-xs font-semibold text-slate-300">
                            Alarmas de Guardia: <strong class="${isEnabled && hasPermission ? 'text-emerald-400' : 'text-amber-400'}">${isEnabled && hasPermission ? 'Activas' : 'Inactivas'}</strong>
                        </span>
                    </div>
                    <button onclick="store.requestNotificationPermission(); setTimeout(() => window.RetentionNotifications.openCenter(), 600);" class="px-2.5 py-1 text-[11px] font-bold rounded-lg ${isEnabled && hasPermission ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-primary/20 text-primary hover:bg-primary/30'} transition-colors">
                        ${isEnabled && hasPermission ? 'Desactivar' : 'Activar Ahora'}
                    </button>
                </div>

                <!-- Feed List -->
                <div class="p-4 space-y-3 overflow-y-auto flex-1 custom-scrollbar">
                    ${feed.length === 0 ? `
                        <div class="text-center py-10">
                            <span class="material-symbols-outlined text-slate-600 text-4xl mb-2">mark_email_read</span>
                            <p class="text-xs text-slate-400">Sin notificaciones operativas pendientes</p>
                        </div>
                    ` : feed.map(item => {
                        const isRead = readIds.has(item.id);
                        const iconBg = item.type === 'shift' ? 'bg-primary/20 text-primary border-primary/30' :
                                       item.type === 'checkin' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                                       item.type === 'money' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                                       item.type === 'academia' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                                       'bg-slate-800 text-slate-300 border-white/10';

                        return `
                            <div class="p-3.5 rounded-2xl border transition-all ${isRead ? 'bg-white/[0.02] border-white/5 opacity-75' : 'bg-white/5 border-primary/30 shadow-md shadow-primary/5'}">
                                <div class="flex items-start gap-3">
                                    <div class="size-9 rounded-xl border flex items-center justify-center shrink-0 ${iconBg}">
                                        <span class="material-symbols-outlined text-lg">${item.icon || 'info'}</span>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <div class="flex items-center justify-between gap-1 mb-0.5">
                                            <h4 class="text-xs font-bold text-white truncate">${item.title}</h4>
                                            <span class="text-[9px] font-mono text-slate-400 shrink-0">${item.timestamp}</span>
                                        </div>
                                        <p class="text-[11px] text-slate-300 leading-relaxed">${item.message}</p>
                                        <div class="flex items-center justify-between mt-2.5 pt-2 border-t border-white/5">
                                            <button onclick="window.RetentionNotifications.navigateFromNotif('${item.id}', '${item.route}')" class="text-[11px] font-bold text-primary hover:text-blue-400 flex items-center gap-1">
                                                ${item.actionLabel || 'Ver más'}
                                                <span class="material-symbols-outlined text-xs">arrow_forward</span>
                                            </button>
                                            ${!isRead ? `
                                                <button onclick="window.RetentionNotifications.markAsRead('${item.id}'); this.closest('.rounded-2xl').classList.add('opacity-75'); this.remove();" class="text-[10px] text-slate-400 hover:text-slate-200">
                                                    Marcar leída
                                                </button>
                                            ` : '<span class="text-[9px] text-slate-500">Leída</span>'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>

                <!-- Footer Actions -->
                <div class="p-3 border-t border-white/10 bg-slate-900/90 flex items-center justify-between">
                    <button onclick="window.RetentionNotifications.markAllAsRead()" class="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">done_all</span>
                        Marcar todas leídas
                    </button>
                    <button onclick="document.getElementById('asf-notif-center-modal')?.remove()" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors">
                        Cerrar
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Cerrar al clickear el fondo
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    /**
     * Navega a la ruta indicada desde una notificación y cierra el modal
     */
    navigateFromNotif(id, route) {
        this.markAsRead(id);
        const modal = document.getElementById('asf-notif-center-modal');
        if (modal) modal.remove();
        if (typeof router !== 'undefined' && router.navigateTo && route) {
            router.navigateTo(route);
        }
    },

    _getMap(key) {
        try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch { return {}; }
    },
    _saveMap(key, map) {
        try { localStorage.setItem(key, JSON.stringify(map)); } catch {}
    }
};

// Autoinicialización
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        window.RetentionNotifications.init();
    });
}
