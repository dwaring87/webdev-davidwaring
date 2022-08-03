import { defineNuxtConfig } from 'nuxt';

export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-directus'],
  directus: {
    url: process.env.DIRECTUS_URL,
    token: process.env.DIRECTUS_TOKEN
  }
});
