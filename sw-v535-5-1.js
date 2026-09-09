// Kill switch for legacy sw-v535-5-1.js: Clear all caches and unregister to upgrade to v535.7.0
self.addEventListener('install', function(event) {
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(keys.map(function(k) { return caches.delete(k); }));
        }).then(function() {
            return self.registration.unregister();
        }).then(function() {
            return self.clients.matchAll();
        }).then(function(clients) {
            clients.forEach(function(client) {
                client.navigate(client.url);
            });
        })
    );
});
