// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

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
      'app/composables',          // Top-level composables in app folder
      'app/composables/**'        // All nested files within composables
    ]
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
    '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
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
    'nuxt-vuefire',
    '@pinia/nuxt'
  ],
  
   vuefire: {
    config: {
      apiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    },
    auth: {
      enabled: true,
      // sessionCookie: true, // Consider carefully if session cookies are needed for your use case
    },
    appCheck: {
      enabled: true,
      provider: 'ReCaptchaV3', // Use ReCaptchaV3 for non-enterprise
      key: process.env.NUXT_PUBLIC_RECAPTCHA_SITE_KEY, // Your reCAPTCHA v3 site key
      isTokenAutoRefreshEnabled: true,
      // debug: process.env.NODE_ENV !== 'production', // Enable debug mode in development
    },
  },

  
  runtimeConfig: {
    public: {
      mapboxToken: process.env.NUXT_PUBLIC_MAPBOX_TOKEN,
    }
  },

  colorMode: { classSuffix: '' },

});