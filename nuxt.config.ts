import Icons from 'unplugin-icons/vite';

export default defineNuxtConfig({

  typescript: {
    strict: true
  },

  modules: ['@nuxtjs/tailwindcss', 'nuxt-image-directus', 'nuxt-directus', 'nuxt-runtime-compiler'],

  vite: {
    plugins: [
      Icons({
        autoInstall: true
      })
    ],
  },

  nuxtImageDirectus: {
    baseURL: process.env.DIRECTUS_URL,
    token: process.env.DIRECTUS_TOKEN
  },

  directus: {
    url: process.env.DIRECTUS_URL,
    token: process.env.DIRECTUS_TOKEN
  }

});
