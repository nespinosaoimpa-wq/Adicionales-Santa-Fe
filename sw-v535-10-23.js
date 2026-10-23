const CACHE_NAME = 'asistentepro-v535.10.23';
const ASSETS = [
    './',
    './index.html?v=535.10.23',
    './styles.css?v=535.10.23',
    './supabase-config.js?v=535.10.23',
    './firebase-config.js?v=535.10.23',
    './db-v211.js?v=535.10.23',
    './js/utils.js?v=535.10.23',
    './js/store.js?v=535.10.23',
    './js/components.js?v=535.10.23',
    './js/router.js?v=535.10.23',
    './js/data/directory.js?v=535.10.23',
    './js/data/resources.js?v=535.10.23',
    './js/data/academy_data.js?v=535.10.23',
    './js/views/auth.js?v=535.10.23',
    './js/views/agenda.js?v=535.10.23',
    './js/views/register.js?v=535.10.23',
    './js/views/control_panel.js?v=535.10.23',
    './js/views/financial.js?v=535.10.23',
    './js/views/info_guia.js?v=535.10.23',
    './js/views/profile.js?v=535.10.23',
    './js/views/stats.js?v=535.10.23',
    './js/views/history.js?v=535.10.23',
    './js/views/service_details.js?v=535.10.23',
    './js/views/asistente.js?v=535.10.23',
    './js/views/actas.js?v=535.10.23',
    './js/views/intervenciones.js?v=535.10.23',
    './js/views/procedimiento.js?v=535.10.23',
    './js/views/archivos.js?v=535.10.23',
    './js/views/auditoria.js?v=535.10.23',
    './js/views/academia.js?v=535.10.23',
    './js/views/admin.js?v=535.10.23',
    './js/views/diagnostics.js?v=535.10.23',
    './js/views/onboarding.js?v=535.10.23',
    './app-v211.js?v=535.10.23'
];

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('[SW v535.10.23] Pre-caching assets');
            return cache.addAll(ASSETS).catch(err => {
                console.warn('[SW v535.10.23] Cache addAll notice:', err);
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
                        console.log('[SW v535.10.23] Purging old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    if (event.request.url.includes('googleapis.com') || event.request.url.includes('firestore') || event.request.url.includes('supabase')) {
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
