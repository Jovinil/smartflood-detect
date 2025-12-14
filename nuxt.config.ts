// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: false,

  dir: {
    pages: './app/pages',
    layouts: './app/layouts',
    middleware: './app/middleware',
  },

  imports: {
    dirs: [
      'app/composables',
      'app/composables/**',
    ],
  },

  components: [
    {
      path: '~/app/components',
      extensions: ['vue'],
      pathPrefix: false,
    },
  ],

  css: [
    '~/assets/css/main.css',
    'mapbox-gl/dist/mapbox-gl.css',
    '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css',
  ],

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'nuxt-charts',
    'nuxt-vuefire',
    '@pinia/nuxt',
  ],

  // ✅ Make html2pdf use html2canvas-pro (fixes oklch parsing crash)
  vite: {
    resolve: {
      alias: {
        html2canvas: 'html2canvas-pro',
      },
    },

    optimizeDeps: {
      include: [
        // if you're using html2pdf now:
        'html2pdf.js',
        'html2canvas-pro',

        // you already had these (keep them)
        'html-to-image',
        'jspdf',
        'canvg',
        'dompurify',
      ],
    },
  },

  vuefire: {
    config: {
      apiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.NUXT_PUBLIC_FIREBASE_DATABASE_URL,
      projectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    },
    auth: {
      enabled: true,
      // sessionCookie: true,
    },
  },

  runtimeConfig: {
    public: {
      mapboxToken: process.env.NUXT_PUBLIC_MAPBOX_TOKEN,
      recaptchaSiteKey: process.env.NUXT_PUBLIC_RECAPTCHA_SITE_KEY,
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
    },
  },

  colorMode: { classSuffix: '' },

  devServer: {
    host: '127.0.0.1',
    port: 3001,
  },
})
