// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/strapi'],
  ssr: false,
  devtools: {enabled: true},

  app: {
    head: {
      htmlAttrs: {
        lang: 'fr',
      },
      title: 'PAORN : La chronique du chaos',
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
    url: 'http://localhost:1337',
    //url:'https://cappa.hd.free.fr',
    prefix: '/api',
    admin: '/admin',
    cookie: {},
    cookieName: 'strapi_jwt'
  },
  compatibilityDate: '2024-12-20',
})