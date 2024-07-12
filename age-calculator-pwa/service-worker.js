const CACHE_NAME = "my-app-cache-v1";

const urlsToCache = [
    "/app-calculator-pwa/index.html",
    "/app-calculator-pwa/output.css",
    "/app-calculator-pwa/scripts/main.js",
    "/app-calculator-pwa/assets/images/ageCalcon.jpg"
];

self.addEventListener("install", (event)=>{
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache=>{
            console.log(cache.addAll(urlsToCache));
            return cache.addAll(urlsToCache);
        })
        .then(()=>{
            console.log("Caching completed successfully");
        }).catch(error=>{
            console.error("Failed to cache assets during install", error);
        })
    )
});

self.addEventListener('activate', (event)=>{
    const cacheWhiteList = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames)=>{
            return Promise.all(
                cacheNames.map((cacheName)=>{
                    if (!cacheWhiteList.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            )
        }).catch((error)=>{
            console.error('Failed to delete old cache', error);
        })
    )
});

self.addEventListener("fetch", (event)=>{
    event.respondWith(
        caches.match(event.request)
        .then(response=>{
            return response || fetch(event.request);
        })
    );
})