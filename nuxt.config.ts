import Icons from 'unplugin-icons/vite';

export default defineNuxtConfig({

  typescript: {
    strict: true
  },

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/plausible', 'nuxt-image-directus', 'nuxt-directus', 'nuxt-runtime-compiler'],

  vite: {
    plugins: [
      Icons({
        autoInstall: true
      })
    ],
  },

  plausible: {
    domain: process.env.PLAUSIBLE_DOMAIN,
    apiHost: process.env.PLAUSIBLE_HOST,
    autoPageviews: true,
    hashMode: true,
    trackLocalhost: false
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
