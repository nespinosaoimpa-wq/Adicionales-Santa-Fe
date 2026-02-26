const CACHE_NAME = 'centinela-v531.1';
const ASSETS = [
    './',
    './index.html?v531.1',
    './styles.css?v531.1',
    './supabase-config.js?v531.1',
    './firebase-config.js?v531.1',
    './db-v211.js?v531.1',
    './js/utils.js?v531.1',
    './js/store.js?v531.1',
    './js/components.js?v531.1',
    './js/router.js?v531.1',
    './js/data/directory.js?v531.1',
    './js/views/auth.js?v531.1',
    './js/views/agenda.js?v531.1',
    './js/views/register.js?v531.1',
    './js/views/control_panel.js?v531.1',
    './js/views/financial.js?v531.1',
    './js/views/profile.js?v531.1',
    './js/views/stats.js?v531.1',
    './js/views/history.js?v531.1',
    './js/views/service_details.js?v531.1',
    './js/views/asistente.js?v531.1',
    './js/views/admin.js?v531.1',
    './app-v211.js?v531.1'
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
                    console.log('[SW v530] Purging old cache:', key);
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
