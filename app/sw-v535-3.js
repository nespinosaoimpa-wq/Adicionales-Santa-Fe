// Force unregister of sw-v535-3.js to break PWA cache deadlock
self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        self.registration.unregister().then(() => {
            console.log("Outdated Service Worker unregistered. Reloading clients...");
            return self.clients.matchAll();
        }).then(clients => {
            clients.forEach(client => {
                client.navigate(client.url);
            });
        })
    );
});
