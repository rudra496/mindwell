// Service Worker for MindWell PWA
// Enables offline functionality and caching

const STATIC_CACHE = 'mindwell-static-v1'
const DYNAMIC_CACHE = 'mindwell-dynamic-v1'

// Resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installing...')
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[ServiceWorker] Caching static assets')
      return cache.addAll(STATIC_ASSETS)
    }).then(() => {
      console.log('[ServiceWorker] Skip waiting')
      return self.skipWaiting()
    })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activating...')
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE
          })
          .map((cacheName) => {
            console.log('[ServiceWorker] Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          })
      )
    }).then(() => {
      console.log('[ServiceWorker] Claiming clients')
      return self.clients.claim()
    })
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return
  }

  // API requests - network first, fallback to cache
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone response before caching
          const responseClone = response.clone()
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone)
          })
          return response
        })
        .catch(() => {
          // Fallback to cache for API requests
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse
            }
            // Return offline message for failed API requests
            return new Response(
              JSON.stringify({ error: 'Offline - data may be stale' }),
              {
                headers: { 'Content-Type': 'application/json' },
                status: 503
              }
            )
          })
        })
    )
    return
  }

  // Static assets and pages - cache first, fallback to network
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse
      }

      return fetch(request).then((response) => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200 || response.type === 'error') {
          return response
        }

        // Clone and cache the response
        const responseClone = response.clone()
        caches.open(DYNAMIC_CACHE).then((cache) => {
          cache.put(request, responseClone)
        })

        return response
      }).catch(() => {
        // Return offline page for navigation requests
        if (request.mode === 'navigate') {
          return caches.match('/').then((cachedHome) => {
            return cachedHome || new Response('Offline - please check your connection')
          })
        }
        return new Response('Offline', { status: 503 })
      })
    })
  )
})

// Message event - handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        )
      })
    )
  }
})
