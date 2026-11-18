// Kill switch for sw-v535-9-0.js: Clear all caches and unregister to upgrade to v535.9.1
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
            .then(() => self.registration.unregister())
            .then(() => self.clients.matchAll({ type: 'window' }))
            .then(clients => clients.forEach(c => c.navigate(c.url)))
    );
});
