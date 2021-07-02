export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Insta Youtube',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Responsive YOUTUBE app, for Instabug as Frontend task <3',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // app runtime env
  publicRuntimeConfig: {
    apiURL: process.env.API_URL,
    apiKey: process.env.API_KEY,
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#e74c3c',
    background: 'white',
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/style-resources',
  ],

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/main'],

  // You will have to add this new object if it doesn't exist already
  styleResources: {
    scss: ['@/assets/css/*.scss'],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '@/plugins/vee-validate',
      ssr: false,
    },
    '@/plugins/filters',
    '@/plugins/api',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
