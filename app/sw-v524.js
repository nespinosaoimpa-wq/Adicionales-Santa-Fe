const CACHE_NAME = 'asf-v524-fix';
const urlsToCache = [
    './',
    './index.html',
    './styles.css?v=524',
    './js/store.js?v=524',
    './js/router.js?v=524',
    './js/components.js?v=524',
    './js/views/agenda.js?v=524',
    './js/views/control_panel.js?v=524',
    './js/views/financial.js?v=524',
    './js/views/profile.js?v=524',
    './js/views/admin.js?v=524',
    './js/views/asistente.js?v=524',
    './js/views/stats.js?v=524',
    './js/views/history.js?v=524',
    './js/views/auth.js?v=524',
    './js/views/register.js?v=524',
    './js/views/service_details.js?v=524',
    './db-v211.js?v=524',
    './manifest.json',
    './icon.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    if (event.request.url.includes('firestore.googleapis.com') ||
        event.request.url.includes('supabase.co') ||
        event.request.url.includes('firebasestorage.googleapis.com')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request).then(response => {
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                    });
                    return response;
                });
            })
    );
});
