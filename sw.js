const cacheName = 'v1';

// Assets to cache
const cacheAssets = [
    '/',
    '/index.html',
    '/app.js',
    '/font/Rimouski.css'
];

// Call Install Event
self.addEventListener('install', (e) => {
    console.log('Service Worker: Installed');
    
    e.waitUntil(
        caches.open(cacheName)
        .then((cache) => {
            console.log('Service Worker: Caching Files');
            cache.addAll(cacheAssets);
        })
//        .then(() => self.skipWaiting())
    );
});

// Activate SW
self.addEventListener('activate', (e) => {
    console.log('Service Worker: Activated');
    
    // remove unwanted caches
    e.waitUntil(
    caches.keys().then((cacheNames) => {
        return Promise.all(
            cacheNames.map((cache) => {
                if(cache !== cacheName){
                    console.log('SW: Clearing Old Cache');
                    return caches.delete(cache);
                }
            })
        )
    }));
});

// Fetch Event
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then((response) => {
         console.log('SW Fetching: '+e.request.url);
      return response || fetch(e.request).then((response) => {
                return caches.open(cacheName).then((cache) => {
          console.log('SW Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});