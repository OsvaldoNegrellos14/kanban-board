/* eslint-disable array-callback-return */
const cacheName = 'cacheV1'
const contentCache = [
  '/',
  'static/js/bundle.js',
  'static/js/vendors~main.chunk.js',
  'static/js/main.chunk.js',
  'static/media/idea.0989fa83.svg',
  'static/media/sandglass.1f144e33.svg',
  'static/media/work-in-progress.05e15602.svg',
  'static/media/star.de82f684.svg',
  'assets/favicon-32x32.png',
  'manifest.json',
  'assets/android-icon-144x144.png',
  'app.js',
  'sw.js',
  'localhost'
]

self.addEventListener('install', (event) => {
  console.log('Service Worker install')
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(contentCache)
    })
  )
})

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate')
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== cacheName) {
          // console.log('[ServiceWorker] Removing old cache', key)
          return caches.delete(key)
        }
      }))
    })
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  event.respondWith((async () => {
    const request = await caches.match(event.request)
    // console.log(`Fetching resource: ${event.request.url}`)
    if (request) return request
    const response = await fetch(event.request)
    const cache = await caches.open(cacheName)
    // console.log(`Caching new resource: ${event.request.url}`)
    cache.put(event.request, response.clone())
    // console.log('No entro')
    return response
  })())
})
