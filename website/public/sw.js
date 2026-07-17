/**
   * JaipurRide — Self-Destructing Service Worker
   * Immediately unregisters itself to clear any legacy domain-root caches.
   */

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  self.registration.unregister()
    .then(() => {
      return self.clients.claim();
    })
    .then(() => {
      return self.clients.matchAll();
    })
    .then((clients) => {
      clients.forEach((client) => {
        if (client.url && 'navigate' in client) {
          // Force clients to reload from network
          client.navigate(client.url);
        }
      });
    });
});
