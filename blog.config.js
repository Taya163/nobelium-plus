const BLOG = {
  title: 'TayaW',
  author: 'TayaW',
  email: 'web_zhen@163.com',
  link: 'https://sc.taya163.com',
  newsletter: '每周案例',
  description: '一个静悄悄的技术博客.',
  notes: 'TayaW的笔记',
  notesNav: {
    index: '全部笔记',
    blog: '返回博客',
    contact: '联系我'
  },
  notesLink: {
    index: '/',
    blog: 'https://sc.taya163.com',
    contact: 'https://sc.taya163.com/contact'
  },
  lang: 'zh-CN', // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES']
  appearance: 'auto', // ['light', 'dark', 'auto'],
  font: 'sans-serif', // ['sans-serif', 'serif']
  lightBackground: '#F6F8FA', // use hex value, don't forget '#' e.g #fffefc
  darkBackground: '#212936', // use hex value, don't forget '#'
  path: '', // leave this empty unless you want to deploy Nobelium in a folder
  since: 2022, // If leave this empty, current year will be used.
  postsPerPage: 10,
  sortByDate: true,
  showAbout: true,
  showArchive: true,
  showTitlebarText: false, // Craft Docs page show title bar text on desktop
  autoCollapsedNavBar: false, // The automatically collapsed navigation bar
  ogImageGenerateURL: 'https://og-zl.vercel.app', // The link to generate OG image, don't end with a slash
  socialLink: {
    twitter: 'https://twitter.com/TayaW37828491',
    github: 'https://github.com/Taya163',
    telegram: 'https://t.me/zhenzhida'
  },
  seo: {
    keywords: ['TayaW', '博客', 'Blog'],
    googleSiteVerification: '' // Remove the value or replace it with your own google site verification code
  },
  notionPageId: process.env.NOTION_PAGE_ID, // DO NOT CHANGE THIS! Edit .env file!
  notionSpacesId: process.env.NOTION_SPACES_ID, // DO NOT CHANGE THIS! Edit .env file!
  notionAccessToken: process.env.NOTION_ACCESS_TOKEN, // Useful if you prefer not to make your database public
  telegramToken: process.env.TELEGRAM_TOKEN, // The token of your Telegram bot
  telegramChatId: '5470347768', // The chat id of your Telegram bot
  telegramChannelUrl: 'https://t.me/s/webfrontblog', // The link of your Telegram channel
  telegramChannelName: '前端旅程', // The name of your Telegram channel
  craftConfigShareUrl: 'https://www.craft.do/s/tsw6gy0hNivQWa', // The link to share your craft config
  analytics: {
    provider: '', // Currently we support Google Analytics, Ackee and Umami, please fill with 'ga' or 'ackee' or 'umami', leave it empty to disable it.
    umamiConfig: {
      scriptUrl: '', // The url of your Umami script
      websiteId: '' // The website id of your Umami instance
    },
    ackeeConfig: {
      tracker: '', // e.g 'https://ackee.craigary.net/tracker.js'
      dataAckeeServer: '', // e.g https://ackee.craigary.net , don't end with a slash
      domainId: '' // e.g '0e2257a8-54d4-4847-91a1-0311ea48cc7b'
    },
    gaConfig: {
      measurementId: '' // e.g: G-XXXXXXXXXX
    }
  },
  comment: {
    // support provider: utterances, cusdis, supacomments
    provider: 'supacomments', // leave it empty if you don't need any comment plugin
    supaCommentsConfig: {
      supabaseUrl: 'https://nleovqejstgkpjvwryft.supabase.co', // The url of your Supabase instance
      supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sZW92cWVqc3Rna3BqdndyeWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTkyNDU1ODYsImV4cCI6MTk3NDgyMTU4Nn0.bjb34wxqQqBk7OVhCNacOYgu4do278MGmCT60Hhe-UM', // The anonymous key of your Supabase instance
    },
    utterancesConfig: {
      repo: ''
    },
    cusdisConfig: {
      appId: '', // data-app-id
      host: '', // data-host, change this if you're using self-hosted version
      scriptSrc: '' // change this if you're using self-hosted version
    }
  },
  isProd: process.env.VERCEL_ENV === 'production' // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
}
// export default BLOG
module.exports = BLOG
