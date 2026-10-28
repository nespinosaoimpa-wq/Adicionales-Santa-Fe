const CACHE_NAME = 'asistentepro-v535.10.62';
const ASSETS = [
    './',
    './index.html?v=535.10.62',
    './styles.css?v=535.10.62',
    './supabase-config.js?v=535.10.62',
    './firebase-config.js?v=535.10.62',
    './db-v211.js?v=535.10.62',
    './js/utils.js?v=535.10.62',
    './js/utils/gemini_api.js?v=535.10.62',
    './js/utils/agent_learning.js?v=535.10.62',
    './js/utils/telemetry.js?v=535.10.62',
    './js/store.js?v=535.10.62',
    './js/components.js?v=535.10.62',
    './js/router.js?v=535.10.62',
    './js/data/directory.js?v=535.10.62',
    './js/data/resources.js?v=535.10.62',
    './js/data/academy_data.js?v=535.10.62',
    './js/data/quiz_bank.js?v=535.10.62',
    './js/views/auth.js?v=535.10.62',
    './js/views/legal.js?v=535.10.62',
    './js/views/agenda.js?v=535.10.62',
    './js/views/register.js?v=535.10.62',
    './js/views/control_panel.js?v=535.10.62',
    './js/views/financial.js?v=535.10.62',
    './js/views/info_guia.js?v=535.10.62',
    './js/views/profile.js?v=535.10.62',
    './js/views/stats.js?v=535.10.62',
    './js/views/history.js?v=535.10.62',
    './js/views/service_details.js?v=535.10.62',
    './js/views/asistente.js?v=535.10.62',
    './js/views/actas.js?v=535.10.62',
    './js/views/intervenciones.js?v=535.10.62',
    './js/views/procedimiento.js?v=535.10.62',
    './js/views/archivos.js?v=535.10.62',
    './js/views/auditoria.js?v=535.10.62',
    './js/views/iapos.js?v=535.10.62',
    './js/views/academia.js?v=535.10.62',
    './js/views/admin.js?v=535.10.62',
    './js/views/diagnostics.js?v=535.10.62',
    './js/views/onboarding.js?v=535.10.62',
    './app-v211.js?v=535.10.62'
];

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('[SW v535.10.62] Pre-caching assets');
            return cache.addAll(ASSETS).catch(err => {
                console.warn('[SW v535.10.62] Cache addAll notice:', err);
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
                        console.log('[SW v535.10.62] Purging old cache:', cacheName);
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
