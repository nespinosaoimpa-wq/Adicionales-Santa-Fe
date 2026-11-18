const CACHE_NAME = 'asistentepro-v535.10.54';
const ASSETS = [
    './',
    './index.html?v=535.10.54',
    './styles.css?v=535.10.54',
    './supabase-config.js?v=535.10.54',
    './firebase-config.js?v=535.10.54',
    './db-v211.js?v=535.10.54',
    './js/utils.js?v=535.10.54',
    './js/store.js?v=535.10.54',
    './js/components.js?v=535.10.54',
    './js/router.js?v=535.10.54',
    './js/data/directory.js?v=535.10.54',
    './js/data/resources.js?v=535.10.54',
    './js/data/academy_data.js?v=535.10.54',
    './js/views/auth.js?v=535.10.54',
    './js/views/agenda.js?v=535.10.54',
    './js/views/register.js?v=535.10.54',
    './js/views/control_panel.js?v=535.10.54',
    './js/views/financial.js?v=535.10.54',
    './js/views/info_guia.js?v=535.10.54',
    './js/views/profile.js?v=535.10.54',
    './js/views/stats.js?v=535.10.54',
    './js/views/history.js?v=535.10.54',
    './js/views/service_details.js?v=535.10.54',
    './js/views/asistente.js?v=535.10.54',
    './js/views/actas.js?v=535.10.54',
    './js/views/intervenciones.js?v=535.10.54',
    './js/views/procedimiento.js?v=535.10.54',
    './js/views/archivos.js?v=535.10.54',
    './js/views/auditoria.js?v=535.10.54',
    './js/views/academia.js?v=535.10.54',
    './js/views/admin.js?v=535.10.54',
    './js/views/diagnostics.js?v=535.10.54',
    './js/views/onboarding.js?v=535.10.54',
    './app-v211.js?v=535.10.54'
];

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('[SW v535.10.54] Pre-caching assets');
            return cache.addAll(ASSETS).catch(err => {
                console.warn('[SW v535.10.54] Cache addAll notice:', err);
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
                        console.log('[SW v535.10.54] Purging old cache:', cacheName);
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
