const cacheName = "DefaultCompany-Resume-0.1";
const contentToCache = [
    "Build/16194915ed5322a5d4f0dc34f48bc0b7.loader.js",
    "Build/520198b690cb0974a1653ee9039c0bd1.framework.js",
    "Build/237d1dae01f690498c634b8323b5aa7f.data",
    "Build/1197df99de6ec385d8d2da27e1252f3e.wasm",
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
