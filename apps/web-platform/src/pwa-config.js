export const pwaConfig = {
  strategies: 'generateSW',
  registerType: 'prompt',
  injectRegister: 'inline',
  workbox: {
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,  // 5MB limit per asset
    globPatterns: ['**/*.{js,css,html,png,glb,wav}']
  },
  manifest: {
    name: 'Cathedral Egregore Toolkit',
    short_name: 'Egregore',
    description: 'Master artist autonomous creation system',
    categories: ['games', 'productivity', 'graphics'],
    orientation: 'landscape',
    display: 'standalone',
    start_url: '/?homescreen=1',
    prefer_related_applications: false,
    // iOS specific
    appleTouchIcon: { sizes: '192x192', src: 'icons/icon-192.png' },
    launch_handler: { client_mode: 'navigate-existing' }
  }
}