export default defineNuxtConfig({
  compatibilityDate: '2026-06-08',

  devtools: {
    enabled: true
  },

  css: ['./main.css', 'leaflet/dist/leaflet.css'],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {}
    }
  },

  modules: ['@nuxtjs/seo', '@nuxtjs/i18n'],

  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'hr',
    vueI18n: './i18n.config.ts',
    locales: [
      { code: 'hr', name: 'Hrvatski', language: 'hr-HR', file: 'hr.json' },
      { code: 'en', name: 'English', language: 'en-US', file: 'en.json' },
      { code: 'de', name: 'Deutsch', language: 'de-DE', file: 'de.json' }
    ],
    detectBrowserLanguage: false
  },

  schemaOrg: {
    defaults: false
  },

  site: {
    url: 'https://stafan.netlify.app',
    name: 'Stafan d.o.o.'
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'hr'
      },

      title:
        'Stafan d.o.o.',

      meta: [
        {
          name: 'description',
          content:
            'Stafan d.o.o. – građevinski radovi, iskopi, pripremni radovi i najam strojeva na području cijele Hrvatske.'
        },

        {
          property: 'og:title',
          content: 'Stafan d.o.o.'
        },

        {
          property: 'og:description',
          content:
            'Pouzdani građevinski radovi, iskopi i pripremni radovi.'
        },

        {
          property: 'og:type',
          content: 'website'
        }
      ]
    }
  }
})