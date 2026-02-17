const CACHE_NAME = 'adicionales-sf-v5';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './app.js',
    './styles.css',
    'https://cdn.tailwindcss.com?plugins=forms,container-queries',
    'https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap'
];

// Install Event: Cache Core Assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Caching core assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activate Event: Cleanup Old Caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('[Service Worker] Clearing old cache', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch Event: Stale-While-Revalidate Strategy
self.addEventListener('fetch', (event) => {
    // Skip cross-origin requests that aren't critical (optional optimization)
    // But we want to cache CDNs, so we keep them.

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Return cached response if found
            if (cachedResponse) {
                // Background update (Stale-While-Revalidate)
                fetch(event.request).then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, networkResponse.clone());
                        });
                    }
                }).catch(() => { /* loose network connection, ignore */ });

                return cachedResponse;
            }

            // If not cached, fetch from network
            return fetch(event.request).then((networkResponse) => {
                // Check if valid response
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                    return networkResponse;
                }

                // Cache new resources (dynamic caching)
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    // Only cache same-origin or specific CDNs to avoid clutter
                    if (event.request.url.startsWith('http')) {
                        cache.put(event.request, responseToCache);
                    }
                });

                return networkResponse;
            }).catch(() => {
                // Offline fallback logic could go here
                console.log('[Service Worker] Fetch failed (Offline)', event.request.url);
            });
        })
    );
});
