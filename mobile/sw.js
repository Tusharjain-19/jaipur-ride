/**
 * JaipurRide — Service Worker
 * Cache-first strategy for all static assets.
 * Enables offline operation.
 */

const CACHE_NAME = 'jaipurride-v2.0.0';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/css/app.css',
  '/css/base.css',
  '/css/components.css',
  '/css/layout.css',
  '/css/metro-route.css',
  '/js/main.js',
  '/js/native-bridge.js',
  '/js/data/stations.js',
  '/js/data/stationsMeta.js',
  '/js/data/stationAttractions.js',
  '/js/ui/dropdown.js',
  '/js/ui/route.js',
  '/manifest.json',
  '/assets/images/logo1.png',
];

// Install: cache all critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache-first, then network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip external requests (CDN) — let them go to network
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        // Don't cache non-OK responses
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Cache the fetched response for future use
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });

        return response;
      }).catch(() => {
        // If both cache and network fail, return offline fallback for navigation
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
        return new Response('Offline', { status: 503 });
      });
    })
  );
});
