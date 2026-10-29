const CACHE_NAME = 'asistentepro-v535.10.65';
const ASSETS = [
    './',
    './index.html?v=535.10.65',
    './styles.css?v=535.10.65',
    './supabase-config.js?v=535.10.65',
    './firebase-config.js?v=535.10.65',
    './db-v211.js?v=535.10.65',
    './js/utils.js?v=535.10.65',
    './js/utils/gemini_api.js?v=535.10.65',
    './js/utils/agent_learning.js?v=535.10.65',
    './js/utils/telemetry.js?v=535.10.65',
    './js/utils/retention_notifications.js?v=535.10.65',
    './js/store.js?v=535.10.65',
    './js/components.js?v=535.10.65',
    './js/router.js?v=535.10.65',
    './js/data/directory.js?v=535.10.65',
    './js/data/resources.js?v=535.10.65',
    './js/data/academy_data.js?v=535.10.65',
    './js/data/quiz_bank.js?v=535.10.65',
    './js/views/auth.js?v=535.10.65',
    './js/views/legal.js?v=535.10.65',
    './js/views/agenda.js?v=535.10.65',
    './js/views/register.js?v=535.10.65',
    './js/views/control_panel.js?v=535.10.65',
    './js/views/financial.js?v=535.10.65',
    './js/views/info_guia.js?v=535.10.65',
    './js/views/profile.js?v=535.10.65',
    './js/views/stats.js?v=535.10.65',
    './js/views/history.js?v=535.10.65',
    './js/views/service_details.js?v=535.10.65',
    './js/views/asistente.js?v=535.10.65',
    './js/views/actas.js?v=535.10.65',
    './js/views/intervenciones.js?v=535.10.65',
    './js/views/procedimiento.js?v=535.10.65',
    './js/views/archivos.js?v=535.10.65',
    './js/views/auditoria.js?v=535.10.65',
    './js/views/iapos.js?v=535.10.65',
    './js/views/academia.js?v=535.10.65',
    './js/views/admin.js?v=535.10.65',
    './js/views/diagnostics.js?v=535.10.65',
    './js/views/onboarding.js?v=535.10.65',
    './app-v211.js?v=535.10.65'
];

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('[SW v535.10.65] Pre-caching assets');
            return cache.addAll(ASSETS).catch(err => {
                console.warn('[SW v535.10.65] Cache addAll notice:', err);
            });
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[SW v535.10.65] Purging old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    const url = event.request.url;
    // Completely bypass external services and auth handlers so service worker never touches them
    if (
        url.includes('googleapis.com') ||
        url.includes('google.com') ||
        url.includes('google-analytics.com') ||
        url.includes('googletagmanager.com') ||
        url.includes('firestore') ||
        url.includes('supabase') ||
        url.includes('/__/auth/') ||
        url.includes('firebaseapp.com') ||
        url.includes('firebase')
    ) {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then(networkResponse => {
                if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
                }
                return networkResponse;
            })
            .catch(() => caches.match(event.request))
    );
});

// ── NOTIFICATION HANDLING (Background PWA Re-engagement) ──
self.addEventListener('notificationclick', event => {
    event.notification.close();
    const targetUrl = (event.notification.data && event.notification.data.url) ? event.notification.data.url : './#agenda';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
            for (let client of windowClients) {
                if ('focus' in client) {
                    client.focus();
                    if ('navigate' in client && targetUrl) {
                        client.navigate(targetUrl);
                    }
                    return;
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(targetUrl);
            }
        })
    );
});

self.addEventListener('push', event => {
    let payload = { title: 'Adicionales Santa Fe', body: 'Nueva alerta operativa disponible', url: './#agenda' };
    if (event.data) {
        try {
            payload = event.data.json();
        } catch(e) {
            payload.body = event.data.text();
        }
    }
    event.waitUntil(
        self.registration.showNotification(payload.title || 'Adicionales Santa Fe', {
            body: payload.body,
            icon: './assets/icon-192.png',
            badge: './assets/icon-192.png',
            vibrate: [200, 100, 200],
            tag: payload.tag || 'asf-push-alert',
            data: { url: payload.url || './#agenda' }
        })
    );
});
