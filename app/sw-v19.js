const CACHE_NAME = 'adicionales-sf-v509';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './styles.css?v=509',
    './firebase-config.js',
    './supabase-config.js',
    './db-v211.js?v=509',
    './app-v211.js?v=509',
    './js/utils.js?v=509',
    './js/store.js?v=509',
    './js/router.js?v=509',
    './js/components.js?v=509',
    './js/data/directory.js?v=509',
    './js/views/auth.js?v=509',
    './js/views/agenda.js?v=509',
    './js/views/register.js?v=509',
    './js/views/control_panel.js?v=509',
    './js/views/financial.js?v=509',
    './js/views/profile.js?v=509',
    './js/views/stats.js?v=509',
    './js/views/history.js?v=509',
    './js/views/service_details.js?v=509',
    './js/views/asistente.js?v=509',
    './js/views/admin.js?v=508',
    'https://cdn.tailwindcss.com/3.4.15?plugins=forms,container-queries',
    'https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap',
    'https://cdn.jsdelivr.net/npm/chart.js',
    'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) return caches.delete(cache);
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => response || fetch(event.request))
    );
});
