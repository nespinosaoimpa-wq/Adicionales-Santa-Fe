const CACHE_NAME = 'asf-v524';
const urlsToCache = [
    './',
    './index.html',
    './js/store.js',
    './js/router.js',
    './js/components.js',
    './js/views/agenda.js',
    './js/views/control_panel.js',
    './js/views/financial.js',
    './js/views/profile.js',
    './js/views/admin.js',
    './js/views/asistente.js',
    './db-v211.js',
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
    // Ignorar peticiones a Firebase y Supabase (deben ser en vivo)
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
