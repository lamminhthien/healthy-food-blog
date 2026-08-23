import withPWAInit from '@ducanh2912/next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {};

const withPWA = withPWAInit({
  dest: 'public',
  // Disable in dev to avoid spamming GET / 200 via the SW + reloadOnOnline.
  // The plugin is only useful in production for installability/offline.
  disable: process.env.NODE_ENV === 'development',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  // Only pre-cache the app shell + static assets. Runtime caching is
  // enabled for images (CacheFirst). JSON/API are intentionally
  // excluded via navigateFallbackDenylist to keep the content fresh.
  workboxOptions: {
    navigateFallback: '/',
    navigateFallbackDenylist: [/^\/api/, /^\/googlef50272b24e27d5c3\.html$/],
    runtimeCaching: [
      {
        urlPattern: ({ request }) => request.destination === 'image',
        handler: 'CacheFirst',
        options: {
          cacheName: 'images',
          expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
        },
      },
    ],
  },
});

export default withPWA(nextConfig);
