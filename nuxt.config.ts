// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  dir: {
    pages: './app/pages',
    layouts: './app/layouts',
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
  css: ['~/assets/css/main.css'],
  
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
    'nuxt-mapbox',
    'nuxt-vuefire',
  ],
  
  vuefire: {
    config: {
      apiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      appId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
      storageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID

      // there could be other properties depending on the project
    },

    auth: {
      enabled: true
    },
  },

  
   runtimeConfig: {
    public: {
      mapboxToken: process.env.NUXT_PUBLIC_MAPBOX_TOKEN,
      // firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      // firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      // firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      // firebaseStorageBucket:  process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      // firebaseMessagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      // firebaseAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
      // firebaseMeasurementId: process.env.NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    }
  },
  mapbox: {
    // Use runtimeConfig value for mapbox
    accessToken: process.env.NUXT_PUBLIC_MAPBOX_TOKEN
  },

  colorMode: { classSuffix: '' },

  plugins: ['~/plugins/firebase.ts']
});