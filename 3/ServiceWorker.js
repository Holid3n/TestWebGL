const cacheName = "DefaultCompany-Resume-0.1";
const contentToCache = [
    "Build/16194915ed5322a5d4f0dc34f48bc0b7.loader.js",
    "Build/d3bcc669e3aabc1eab24dd8c1e9d46a6.framework.js",
    "Build/adf4a19bb537a0292eb54383bebfb677.data",
    "Build/4ec550b380ad8bb6136ba9cf0a15dd62.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
