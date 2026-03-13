const CACHE_NAME = 'centinela-v535.1.0';
const ASSETS = [
    './',
    './index.html?v534.9.0',
    './styles.css?v534.9.0',
    './supabase-config.js?v534.9.0',
    './firebase-config.js?v534.9.0',
    './db-v211.js?v534.9.0',
    './js/utils.js?v534.9.0',
    './js/store.js?v534.9.0',
    './js/components.js?v534.9.0',
    './js/router.js?v534.9.0',
    './js/data/directory.js?v534.9.0',
    './js/views/auth.js?v534.9.0',
    './js/views/agenda.js?v534.9.0',
    './js/views/register.js?v534.9.0',
    './js/views/control_panel.js?v534.9.0',
    './js/views/financial.js?v534.9.0',
    './js/views/profile.js?v534.9.0',
    './js/views/stats.js?v534.9.0',
    './js/views/history.js?v534.9.0',
    './js/views/service_details.js?v534.9.0',
    './js/views/asistente.js?v534.9.0',
    './js/views/admin.js?v534.9.0',
    './js/views/diagnostics.js?v534.9.0',
    './js/views/onboarding.js?v534.9.0',
    './app-v211.js?v534.9.0'
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
                    console.log('[SW v534.9] Purging old cache:', key);
                    return caches.delete(key);
                }
            })
        )).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;
    const url = new URL(event.request.url);
    if (url.origin !== self.location.origin) return;

    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) return response;
            return fetch(event.request).then(fetchResponse => {
                if (fetchResponse.ok && (url.pathname.includes('.js') || url.pathname.includes('.css'))) {
                    const cacheClone = fetchResponse.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, cacheClone));
                }
                return fetchResponse;
            });
        }).catch(() => caches.match('./index.html'))
    );
});
