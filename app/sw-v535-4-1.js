// Force unregister of sw-v535-4-1.js to update to sw-v535-4-2.js
self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        self.registration.unregister().then(() => {
            console.log("Outdated Service Worker sw-v535-4-1 unregistered. Reloading clients...");
            return self.clients.matchAll();
        }).then(clients => {
            clients.forEach(client => {
                client.navigate(client.url);
            });
        })
    );
});
