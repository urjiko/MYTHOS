const CACHE_VERSION = '2026-08-pwa-1'
const SHELL_CACHE = `mythos-shell-${CACHE_VERSION}`
const RUNTIME_CACHE = `mythos-runtime-${CACHE_VERSION}`
const MOBILE_CACHE = `mythos-mobile-${CACHE_VERSION}`
const PREVIEW_CACHE = `mythos-preview-${CACHE_VERSION}`
const OWNED_CACHES = new Set([SHELL_CACHE, RUNTIME_CACHE, MOBILE_CACHE, PREVIEW_CACHE])
const STATIC_FILES = [
  './manifest.webmanifest',
  './favicon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
]

const scopedUrl = (path) => new URL(path, self.registration.scope).href

async function cacheShell() {
  const cache = await caches.open(SHELL_CACHE)
  const indexUrl = scopedUrl('./index.html')
  const indexResponse = await fetch(new Request(indexUrl, { cache: 'reload' }))
  if (!indexResponse.ok) throw new Error(`Unable to cache MYTHOS shell: ${indexResponse.status}`)

  await Promise.all([
    cache.put(indexUrl, indexResponse.clone()),
    cache.put(scopedUrl('./'), indexResponse.clone()),
    cache.addAll(STATIC_FILES.map(scopedUrl)),
  ])

  const markup = await indexResponse.text()
  const builtAssets = [...markup.matchAll(/(?:src|href)="(\.\/assets\/[^"?#]+\.(?:js|css))"/g)]
    .map((match) => scopedUrl(match[1]))
  await cache.addAll([...new Set(builtAssets)])
}

async function trimCache(cacheName, maximumEntries) {
  const cache = await caches.open(cacheName)
  const keys = await cache.keys()
  const overflow = keys.length - maximumEntries
  if (overflow <= 0) return
  await Promise.all(keys.slice(0, overflow).map((key) => cache.delete(key)))
}

async function cacheFirst(request, cacheName, maximumEntries) {
  const cache = await caches.open(cacheName)
  const cached = await cache.match(request)
  if (cached) return cached

  const response = await fetch(request)
  if (response.ok) {
    await cache.put(request, response.clone())
    await trimCache(cacheName, maximumEntries)
  }
  return response
}

async function staleWhileRevalidate(event) {
  const cache = await caches.open(RUNTIME_CACHE)
  const cached = await cache.match(event.request)
  const update = fetch(event.request)
    .then(async (response) => {
      if (response.ok) {
        await cache.put(event.request, response.clone())
        await trimCache(RUNTIME_CACHE, 36)
      }
      return response
    })
    .catch(() => undefined)

  if (cached) {
    event.waitUntil(update)
    return cached
  }
  return (await update) ?? Response.error()
}

async function networkFirstNavigation(request) {
  const cache = await caches.open(SHELL_CACHE)
  try {
    const response = await fetch(request)
    if (response.ok) await cache.put(request, response.clone())
    return response
  } catch {
    return (await cache.match(request))
      ?? (await cache.match(scopedUrl('./index.html')))
      ?? Response.error()
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil(cacheShell().then(() => self.skipWaiting()))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys
        .filter((key) => key.startsWith('mythos-') && !OWNED_CACHES.has(key))
        .map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  if (request.mode === 'navigate') {
    event.respondWith(networkFirstNavigation(request))
    return
  }

  if (url.pathname.includes('/assets/mobile/') && url.pathname.endsWith('.webp')) {
    event.respondWith(cacheFirst(request, MOBILE_CACHE, 8))
    return
  }

  if (url.pathname.includes('/assets/previews/') && url.pathname.endsWith('.webp')) {
    event.respondWith(cacheFirst(request, PREVIEW_CACHE, 16))
    return
  }

  if (
    request.destination === 'script'
    || request.destination === 'style'
    || url.pathname.includes('/data/')
    || STATIC_FILES.some((path) => url.href === scopedUrl(path))
  ) {
    event.respondWith(staleWhileRevalidate(event))
  }
})
