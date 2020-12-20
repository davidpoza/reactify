import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import '@babel/polyfill';

ReactDOM.render(
  <main>
    <App />
  </main>,
document.getElementById('root'));

let worker; // save the worker reference to use it on click event
let refreshing = false;

document.getElementById('reload').addEventListener('click', () => {
  // we send message to sw in order to force activation of the new version of it
  console.log('sending message to force activation and reload page.');
  worker.postMessage({ action: 'skipWaiting' });
});

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      console.log('Service worker registered: ', registration.scope);

      registration.addEventListener('updatefound', () => {
        console.log('update found!');
        worker = registration.installing;

        worker.addEventListener('statechange', () => {
          // once it's installed we display button to force activation and reload
          if (worker.state === 'installed') {
            console.log('sw installed, showing button');
            const updateApp = document.getElementById('updateApplication');
            updateApp.classList.add('show');
          } else if (worker.state === 'activated') {
            console.log('first installation gets directly activated so hide button');
            const updateApp = document.getElementById('updateApplication');
            updateApp.classList.remove('show');
          }
        });
      });
    }, (err) => {
      console.log('Service worker registration has failed!', err);
    });
  });

  // the moment of change from old sw to the new one. this can be triggered multiple times,
  // so we use a flag
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('controllerchange event');
    if (!refreshing) {
      console.log('refreshing');
      window.location.reload();
      refreshing = true;
    }
  });
}