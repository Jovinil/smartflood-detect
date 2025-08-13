// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

 

  dir: {
    pages: './app/pages',
    layouts: './app/layouts',
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
  ],
  
   runtimeConfig: {
    public: {
      mapboxToken: process.env.NUXT_PUBLIC_MAPBOX_TOKEN
    }
  },
  mapbox: {
    // Use runtimeConfig value for mapbox
    accessToken: process.env.NUXT_PUBLIC_MAPBOX_TOKEN
  },

  colorMode: { classSuffix: '' }
});