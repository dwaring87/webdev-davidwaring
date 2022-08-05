import { defineNuxtConfig } from 'nuxt';
import Icons from 'unplugin-icons/vite';

export default defineNuxtConfig({
  typescript: {
    strict: true
  },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-directus'],
  vite: {
    plugins: [
      Icons({
        autoInstall: true
      })
    ]
  },
  directus: {
    url: process.env.DIRECTUS_URL,
    token: process.env.DIRECTUS_TOKEN
  }
});