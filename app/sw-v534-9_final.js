const CACHE_NAME = 'centinela-v535.1.6';
const ASSETS = [
    './',
    './index.html?v=535.1.6',
    './styles.css?v=535.1.6',
    './supabase-config.js?v=535.1.6',
    './firebase-config.js?v=535.1.6',
    './db-v211.js?v=535.1.6',
    './js/utils.js?v=535.1.6',
    './js/store.js?v=535.1.6',
    './js/components.js?v=535.1.6',
    './js/router.js?v=535.1.6',
    './js/data/directory.js?v=535.1.6',
    './js/data/resources.js?v=535.1.6',
    './js/views/auth.js?v=535.1.6',
    './js/views/agenda.js?v=535.1.6',
    './js/views/register.js?v=535.1.6',
    './js/views/control_panel.js?v=535.1.6',
    './js/views/financial.js?v=535.1.6',
    './js/views/info_guia.js?v=535.1.6',
    './js/views/profile.js?v=535.1.6',
    './js/views/stats.js?v=535.1.6',
    './js/views/history.js?v=535.1.6',
    './js/views/service_details.js?v=535.1.6',
    './js/views/asistente.js?v=535.1.6',
    './js/views/admin.js?v=535.1.6',
    './js/views/diagnostics.js?v=535.1.6',
    './js/views/onboarding.js?v=535.1.6',
    './app-v211.js?v=535.1.6'
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
