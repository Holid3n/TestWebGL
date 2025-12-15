const cacheName = "DefaultCompany-Resume-0.1";
const contentToCache = [
    "Build/16194915ed5322a5d4f0dc34f48bc0b7.loader.js",
    "Build/a45c8c1255e5b14515135baf09c790da.framework.js",
    "Build/0d30749971d2eee3d3a867261e57df30.data",
    "Build/18c28845854e8863196abaca40bf6c7e.wasm",
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
