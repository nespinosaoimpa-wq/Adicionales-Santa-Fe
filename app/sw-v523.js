const CACHE_NAME = 'centinela-v525';
const ASSETS = [
    './',
    './index.html?v=525',
    './styles.css?v=525',
    './supabase-config.js?v=525',
    './db-v211.js?v=525',
    './js/store.js?v=525',
    './js/components.js?v=525',
    './js/router.js?v=525',
    './js/views/auth.js?v=525',
    './js/views/agenda.js?v=525',
    './js/views/register.js?v=525',
    './js/views/control_panel.js?v=525',
    './js/views/financial.js?v=525',
    './js/views/profile.js?v=525',
    './js/views/stats.js?v=525',
    './js/views/history.js?v=525',
    './js/views/service_details.js?v=525',
    './js/views/asistente.js?v=525',
    './js/views/admin.js?v=525',
    './app-v211.js?v=525'
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
