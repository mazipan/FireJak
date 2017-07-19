(global => {
  'use strict';

  var versionCache = '-FireJak-20170719-11-30'

  // Load the sw-tookbox library.
  importScripts('/FireJak/sw/sw-toolbox.js');

  // Turn on debug logging, visible in the Developer Tools' console.
  // global.toolbox.options.debug = true;
  toolbox.precache([
    '/index.html', 
    '/static/images/FireJak-logo.png', 
    '/static/images/loading.gif'
    ]);

  toolbox.router.get('/FireJak/sw/*', global.toolbox.cacheFirst, {
      cache: {
          name: 'serviceWorkerCacheVue' + versionCache,
          maxEntries: 200
      }
  });
  toolbox.router.get('/FireJak/**/*.{css}', global.toolbox.cacheFirst, {
    cache: {
      name: 'staticCssCacheVue' + versionCache,
      maxEntries: 200
    }
  });
  toolbox.router.get('/FireJak/**/*.{js}', global.toolbox.cacheFirst, {
    cache: {
      name: 'staticJsCacheVue' + versionCache,
      maxEntries: 200
    }
  });  
  toolbox.router.get(/\.(?:png|gif|jpg)$/, global.toolbox.cacheFirst, {
    cache: {
      name: 'imageCacheVue' + versionCache,
      maxEntries: 200
    }
  });
  toolbox.router.get('/FireJak/(.*)', toolbox.cacheFirst, {
    cache: {
      name: 'staticOtherVue' + versionCache,
      maxEntries: 200
    }
  });
  toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
    cache: {
      name: 'googleapis',
      maxEntries: 20,
    },
    origin: /\.googleapis\.com$/
  });  
  toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
    cache: {
      name: 'cloudflare',
      maxEntries: 20,
    },
    origin: /\.cloudflare\.com$/
  });
  toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
    cache: {
      name: 'jakarta-api',
      maxEntries: 200,
      maxAgeSeconds: 518400,
    },
    origin: /\.api\.jakarta\.go\.id$/
  });

  // Boilerplate to ensure our service worker takes control of the page as soon as possible.
  global.addEventListener('install', event => event.waitUntil(global.skipWaiting()));
  global.addEventListener('activate', event => event.waitUntil(global.clients.claim()));
})(self);
