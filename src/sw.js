import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', (event) => {
  console.log('Service worker installed!');
});

self.addEventListener('message', (e) => {
  // skips waiting state passing to active
  if (e.data.action === 'skipWaiting') {
    console.log('message received by sw');
    self.skipWaiting();
  }
});