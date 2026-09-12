/* ==========================================================================
   GFF 2026 Digital Pass - Ultra Fast Offline & Poor Network Service Worker
   ========================================================================== */

const CACHE_NAME = "gff-pass-cache-v15";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./export.html",
  "./styles.css",
  "./app.js",
  "./assets/abhigya_photo.jpg",
  "./assets/rishi_photo.jpg",
  "./assets/kamal_photo.jpg",
  "./assets/mahavir_photo.jpg",
  "./assets/gff_banner.png",
  "./assets/gff_banner.jpg",
  "./assets/npci_logo.svg",
  "./assets/npci_logo.png",
  "./assets/fingpay_logo.jpg",
  "./assets/nerds_logo.png",
  "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800&display=swap",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"
];

// Install Event - Pre-cache all core assets & immediate skipWaiting
self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate Event - Clean all old caches and claim clients immediately
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Instant 0ms Cache-First with Background Revalidation for Poor Connection
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;

  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      const fetchPromise = fetch(e.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => cachedResponse);

      // Return cached asset instantly for 0ms load speed if network is slow/offline
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetchPromise;
    })
  );
});
