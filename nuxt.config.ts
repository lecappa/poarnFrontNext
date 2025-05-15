// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/strapi', '@nuxt/icon', 'nuxt-tiptap-editor', 'floating-vue/nuxt'],
  ssr: false,
  devtools: {enabled: true},

  app: {
    head: {
      htmlAttrs: {
        lang: 'fr',
      },
      title: 'PAORN',
      charset: 'utf-8',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      meta: [
        {charset: 'utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {name: 'apple-mobile-web-app-capable', content: 'yes'},
        {name: 'apple-mobile-web-app-status-bar-style', content: 'black'},
        {name: 'msapplication-TileColor', content: '#000'},
        {name: 'theme-color', content: 'black'},
      ]
    }
  },

  css: ['~/assets/sass/app.scss'],

  strapi: {
    url: 'https://paorn.fr',
    //url:'https://cappa.hd.free.fr',
    version: 'v5',
    prefix: '/api',
    admin: '/admin',
    cookie: {},
    cookieName: 'strapi_jwt'
  },
  compatibilityDate: '2024-12-20',
})