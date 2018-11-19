self.addEventListener("install", event => {
  const offlinePage = new Request("/");
  event.waitUntil(
    fetch(offlinePage).then(response =>
      caches.open("store").then(cache => cache.put(offlinePage, response))
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(error =>
      caches.open("store").then(cache => cache.match("/"))
    )
  );
});