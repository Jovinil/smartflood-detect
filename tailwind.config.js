/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app.vue',
    './app/components/**/*.{vue,js,ts}',
    './app/pages/**/*.{vue,js,ts}',
    './assets/css/*.css'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}