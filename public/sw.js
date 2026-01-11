// Service Worker for CareerMap - Performance Optimization
const CACHE_NAME = "careermap-v1";
const STATIC_CACHE = "careermap-static-v1";

// Assets to cache on install
const STATIC_ASSETS = [
  "/",
  "/logo.svg",
  "/logo.png",
  "/CareerMap_unified_payload.json",
  "/placeholder.svg",
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log("Caching static assets");
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting()),
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE;
            })
            .map((cacheName) => {
              console.log("Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }),
        );
      })
      .then(() => self.clients.claim()),
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Skip cross-origin requests
  if (!request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached version if available
        return cachedResponse;
      }

      // Otherwise fetch from network
      return fetch(request)
        .then((response) => {
          // Don't cache if not a valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Cache the response
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // Return offline fallback for HTML pages
          if (request.headers.get("accept").includes("text/html")) {
            return caches.match("/");
          }
        });
    }),
  );
});

// Background sync for job auto-fetch
self.addEventListener("sync", (event) => {
  if (event.tag === "job-auto-fetch") {
    event.waitUntil(
      fetch("/api/jobs/auto-fetch", { method: "POST" })
        .then((response) => {
          console.log("Auto-fetch jobs completed");
        })
        .catch((error) => {
          console.error("Auto-fetch jobs failed:", error);
        }),
    );
  }
});

// Push notifications for new jobs (future enhancement)
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || "New job opportunities available",
      icon: "/logo.png",
      badge: "/logo.png",
      tag: "job-notification",
      actions: [
        {
          action: "view",
          title: "View Jobs",
        },
        {
          action: "dismiss",
          title: "Dismiss",
        },
      ],
    };

    event.waitUntil(
      self.registration.showNotification(data.title || "CareerMap", options),
    );
  }
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "view") {
    event.waitUntil(clients.openWindow("/latest-jobs"));
  }
});
