/* FitCoach service worker — auto-updating.
   App shell (HTML/JS) is network-first so a fresh deploy always lands and
   index.html + data.js can never get stuck as a mismatched pair.
   Static assets (icons) stay cache-first. Offline still works from cache. */
const CACHE = 'fitcoach-v11';
const ASSETS = ['./','./index.html','./data.js','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-180.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function networkFirst(req) {
  return fetch(req).then(res => {
    const copy = res.clone();
    caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
    return res;
  }).catch(() => caches.match(req).then(hit => hit || caches.match('./index.html')));
}
function cacheFirst(req) {
  return caches.match(req).then(hit => hit || fetch(req).then(res => {
    const copy = res.clone();
    caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
    return res;
  }));
}

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const isShell = e.request.mode === 'navigate'
    || url.pathname.endsWith('/')
    || url.pathname.endsWith('.html')
    || url.pathname.endsWith('.js')
    || url.pathname.endsWith('.webmanifest');
  e.respondWith(isShell ? networkFirst(e.request) : cacheFirst(e.request));
});
