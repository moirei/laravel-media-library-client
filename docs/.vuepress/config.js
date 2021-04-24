module.exports = {
  title: 'Laravel Media Library Client',
  description: 'A JS/TS client for laravel-media-library',
  themeConfig: {
    // logo: '/logo.png',
    repo: 'moirei/laravel-media-library-client',
    repoLabel: 'Github',
    docsRepo: 'moirei/laravel-media-library-client',
    docsDir: 'docs',
    docsBranch: 'master',
    sidebar: [
      '/',
      '/usage/',
      '/usage/files',
      '/usage/folders',
      '/usage/attachments',
      '/usage/sync',
    ],
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Laravel Media Library', link: 'https://github.com/moirei/laravel-media-library', target: '_blank' },
    ]
  },
  head: [
    // ['link', { rel: 'icon', href: '/logo.png' }],
    // ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ],
  plugins: [
    '@vuepress/register-components',
    '@vuepress/active-header-links',
    ['@vuepress/search', {
      searchMaxSuggestions: 10
    }],
    'seo',
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '~': '/',
        '@': '/src/',
      }
    }
  },
}