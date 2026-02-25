const CACHE_NAME = 'centinela-v529.3';
const ASSETS = [
    './',
    './index.html?v=529.3',
    './styles.css?v=529.3',
    './supabase-config.js?v=529.3',
    './firebase-config.js?v=529.3',
    './db-v211.js?v=529.3',
    './js/utils.js?v=529.3',
    './js/store.js?v=529.3',
    './js/components.js?v=529.3',
    './js/router.js?v=529.3',
    './js/data/directory.js?v=529.3',
    './js/views/auth.js?v=529.3',
    './js/views/agenda.js?v=529.3',
    './js/views/register.js?v=529.3',
    './js/views/control_panel.js?v=529.3',
    './js/views/financial.js?v=529.3',
    './js/views/profile.js?v=529.3',
    './js/views/stats.js?v=529.3',
    './js/views/history.js?v=529.3',
    './js/views/service_details.js?v=529.3',
    './js/views/asistente.js?v=529.3',
    './js/views/admin.js?v=529.3',
    './app-v211.js?v=529.3'
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
                    console.log('[SW v529] Purging old cache:', key);
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
