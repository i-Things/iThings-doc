module.exports = {
  base: '/',
  temp: '.temp',
  locales: {
    '/': {
      lang: 'zh-CN',
    }
  },
  title: 'iThings',
  description: 'iThings是一个轻量级物联网边缘网关开发框架',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  theme: require.resolve('../../packages/@qcyblm/vuepress-theme-vpx'),
  themeConfig: {
    logo: '/assets/img/logo/Group.png',
    BackToTop: true,
    nav: [
      { text: '首页', link: '/' },
      { text: '快速上手', link: '/quickstart/index.html' },
      // { text: 'V1.0文档', link: '/V10/index.html' },
      { text: '案例应用', link: '/apply/index.html' },
      {
        text: 'iThings生态',
        items: [
          { text: 'iThings边缘网关', link: 'https://iThings.pages.dev' },
        ]
      },
    ],
    sidebar: {
      '/quickstart/': [
        {
          title: "快速开始",
          collapsable: false,
          children: [
            '/quickstart/安装教程.html',
            '/quickstart/服务简介.html',
            '/quickstart/应用场景.html',
          ]
        },
      ],
      '/V10/': [
        {
          title: "1.0 文档",
          collapsable: false,
          children: [
            '/V10/1-source.html',
            '/V10/2-target.html',
            '/V10/3-rule.html',
            '/V10/4-plugin.html',
            '/V10/5-driver.html',
            '/V10/6-hook.html',
            '/V10/7-stdlib.html',
            '/V10/8-iThingsui.html',
            '/V10/9-models.html',
            '/V10/10-daemon.html',
            '/V10/11-debug.html',
          ]
        },
      ],
      '/apply/': [
        {
          title: "行业应用",
          collapsable: false,
          children: [
            '/apply/宠物定位项圈.html',
          ]
        },
      ],
      '/product/': [
        {
          title: "自研产品",
          collapsable: false,
        },
      ],
      '/ecosystem/': [
        {
          title: "iThings生态",
          collapsable: false,
          children: [
            // '/ecosystem/things_broker.html',
            // '/ecosystem/iabus.html',
            '/ecosystem/ilex.html',
          ]
        },
      ],
    },
    repo: {
      platform: 'https://github.com/',
      icon: 'fab fa-github',
      owner: 'i4de',
      repositories: 'iThings',
    },
    editLinks: true,
    editLinkText: '编辑当前页',
    edit: {
      docsPlatform: 'https://github.com/',
      docsRepo: 'i4de/ithings',
      docsBranch: 'master',
      docsDir: 'src',
    },
    footer: {
      licensedLink: 'https://github.com/i4de/ithings/blob/master/LICENSE',
      licensed: 'GNU',
      createYear: '2022',
      author: 'iThings',
      authorLink: 'https://github.com/i4de/ithings',
    }
  },
  plugins: [
    ['vuepress-plugin-code-copy',
      {
        align: 'bottom',
        color: 'rgba(255,255,255,0.4)',
        backgroundTransition: 'bottom',
        backgroundColor: '#0075b8',
        successText: '复制成功',
        staticIcon: false,
      }
    ],
  ],
}
