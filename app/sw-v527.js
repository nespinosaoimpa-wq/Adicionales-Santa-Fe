const CACHE_NAME = 'centinela-v527';
const ASSETS = [
    './',
    './index.html?v=527.4',
    './styles.css?v=527.4',
    './supabase-config.js?v=527.4',
    './firebase-config.js?v=527.4',
    './db-v211.js?v=527.4',
    './js/utils.js?v=527.4',
    './js/store.js?v=527.4',
    './js/components.js?v=527.4',
    './js/router.js?v=527.4',
    './js/data/directory.js?v=527.4',
    './js/views/auth.js?v=527.4',
    './js/views/agenda.js?v=527.4',
    './js/views/register.js?v=527.4',
    './js/views/control_panel.js?v=527.4',
    './js/views/financial.js?v=527.4',
    './js/views/profile.js?v=527.4',
    './js/views/stats.js?v=527.4',
    './js/views/history.js?v=527.4',
    './js/views/service_details.js?v=527.4',
    './js/views/asistente.js?v=527.4',
    './js/views/admin.js?v=527.4',
    './app-v211.js?v=527.4'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key !== CACHE_NAME) return caches.delete(key);
            })
        ))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
