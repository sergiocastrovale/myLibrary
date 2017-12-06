module.exports = {

  /*
  ** Headers of the page
  */
  head: {
    title: 'myLibrary',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Roboto:500,400' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  loading: '~/components/loading.vue',

  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/fa/font-awesome.scss',
    '@/assets/scss/main.scss'
  ],

  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios'],

    babel: {
      'presets': [
        ['env', {
          'targets': {
            'node': 'current'
          }
        }],
        'stage-1'
      ],
      'plugins': []
    },

    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  modules: [
    '@nuxtjs/toast'
  ],

  plugins: [
    './plugins/truncate'
  ],

  toast: {
    className: 'mylibrary',
    position: 'bottom-right',
    duration: 4000,
    singleton: true
  }
}
