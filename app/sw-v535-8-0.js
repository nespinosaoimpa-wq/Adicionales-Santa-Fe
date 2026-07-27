const CACHE_NAME = 'asistentepro-v535.8.0';
const ASSETS = [
    './',
    './index.html?v=535.8.0',
    './styles.css?v=535.8.0',
    './supabase-config.js?v=535.8.0',
    './firebase-config.js?v=535.8.0',
    './db-v211.js?v=535.8.0',
    './js/utils.js?v=535.8.0',
    './js/store.js?v=535.8.0',
    './js/components.js?v=535.8.0',
    './js/router.js?v=535.8.0',
    './js/data/directory.js?v=535.8.0',
    './js/data/resources.js?v=535.8.0',
    './js/views/auth.js?v=535.8.0',
    './js/views/agenda.js?v=535.8.0',
    './js/views/register.js?v=535.8.0',
    './js/views/control_panel.js?v=535.8.0',
    './js/views/financial.js?v=535.8.0',
    './js/views/info_guia.js?v=535.8.0',
    './js/views/profile.js?v=535.8.0',
    './js/views/stats.js?v=535.8.0',
    './js/views/history.js?v=535.8.0',
    './js/views/service_details.js?v=535.8.0',
    './js/views/asistente.js?v=535.8.0',
    './js/views/actas.js?v=535.8.0',
    './js/views/intervenciones.js?v=535.8.0',
    './js/views/procedimiento.js?v=535.8.0',
    './js/views/archivos.js?v=535.8.0',
    './js/views/auditoria.js?v=535.8.0',
    './js/views/admin.js?v=535.8.0',
    './js/views/diagnostics.js?v=535.8.0',
    './js/views/onboarding.js?v=535.8.0',
    './app-v211.js?v=535.8.0'
];

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS).catch(e => console.warn('SW cache partial:', e)))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key !== CACHE_NAME) {
                    console.log('[SW v535.8.0] Purging old cache:', key);
                    return caches.delete(key);
                }
            })
        )).then(() => self.clients.claim())
    );
});

// Network-First Strategy for Code Assets (Guarantees freshest JS/CSS/HTML from Netlify)
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;
    const url = new URL(event.request.url);
    if (url.origin !== self.location.origin) return;

    event.respondWith(
        fetch(event.request).then(fetchResponse => {
            if (fetchResponse && fetchResponse.ok) {
                const cacheClone = fetchResponse.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, cacheClone));
            }
            return fetchResponse;
        }).catch(() => {
            return caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) return cachedResponse;
                if (event.request.mode === 'navigate') {
                    return caches.match('./index.html');
                }
            });
        })
    );
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    const urlToOpen = (event.notification.data && event.notification.data.url) || './';
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
            for (let client of windowClients) {
                if (client.url === new URL(urlToOpen, self.location.origin).href && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});

self.addEventListener('push', event => {
    let data = {};
    try {
        if (event.data) {
            data = event.data.json();
        }
    } catch (e) {
        console.error('Error parsing push data', e);
        data = {
            title: 'Adicionales Santa Fe',
            body: 'Tienes una nueva notificación'
        };
    }
    
    const title = data.title || 'Adicionales Santa Fe';
    const options = {
        body: data.body || 'Nueva actualización',
        icon: data.icon || './assets/icon-512.png',
        badge: './assets/icon-512.png',
        vibrate: [200, 100, 200],
        data: {
            url: data.url || './'
        }
    };
    
    event.waitUntil(self.registration.showNotification(title, options));
});
