// Importar la CDN de workbox
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);
// Verificamos si la variable workbox esta definida y disponible
if (workbox) {
  console.log("workbox esta cargado.");
  workbox.precaching.precacheAndRoute([]);
  // Cahe de imagenes en la carpeta public/img
  workbox.routing.registerRoute(/(.*)others(.*)\.(?:png|gif|jpg)/, new workbox.strategies.CacheFirst({
    cacheName: "images",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60
      })
    ]
  }));
  // Hacemos que el contenido en js y css sean rapidos devolviendo los assets de la cache
  workbox.routing.registerRoute(
    // Cache de js, css y archivos de CND
    /.*\.(?:css|js|scss|)/,
    // Usamos el cache para actualizar en segundo plano
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "assets",
    })
  );
  // Cache de fuentes de Google
  workbox.routing.registerRoute(
    new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
    new workbox.strategies.CacheFirst({
      cacheName: "google-fonts",
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
      ],
    })
  );
  // Agregar analisis Offline
  workbox.googleAnalytics.initialize();

  // Instalar un nuevo service worker
  workbox.core.skipWaiting();
  workbox.core.clientsClaim();
}else{
  console.log("Workbox Fallo imbecil cara e chimba");
}
