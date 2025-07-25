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
      path: '~/app/components', // Path to your components directory
      extensions: ['vue'], // Auto-import .vue files
      pathPrefix: false, // Disable prefixing with directory name
    },
    { path: '~/app/components/userComponents/modal', extensions: ['vue'], pathPrefix: false },
    { path: '~/app/components/userComponents/modal/modalBodyContent', extensions: ['vue'], pathPrefix: false },
    { path: '~/app/components/userComponents/modal/modalMainComponents', extensions: ['vue'], pathPrefix: false },
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
    '@nuxtjs/color-mode'
  ],
  colorMode: { classSuffix: '' },
});

