module.exports = {
  base: '/',
  temp: '.temp',
  locales: {
    '/': {
      lang: 'zh-CN',
    }
  },
  title: 'RULEX',
  description: 'RULEX是一个轻量级物联网边缘网关开发框架',
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
      { text: 'V1.0文档', link: '/V10/index.html' },
      { text: '案例应用', link: '/apply/index.html' },
      {
        text: 'RULEX生态',
        items: [
          { text: 'RULEX边缘网关', link: '/ecosystem/index.html' },
          { text: 'Ithings设备平台', link: 'https://github.com/i4de/ithings' },
          { text: 'IoT Kit 套件', link: '/' }
        ]
      },
    ],
    sidebar: {
      '/quickstart/': [
        {
          title: "快速开始",
          collapsable: false,
          children: [
            '/quickstart/download.html',
            '/quickstart/compile.html',
            '/quickstart/docker.html',
            '/quickstart/cli.html',
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
            '/V10/8-rulexui.html',
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
            '/apply/modbus.html',
            '/apply/simens.html',
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
          title: "RULEX生态",
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
      repositories: 'rulex',
    },
    editLinks: true,
    editLinkText: '编辑当前页',
    edit: {
      docsPlatform: 'https://github.com/',
      docsRepo: 'i4de/rulex',
      docsBranch: 'master',
      docsDir: 'src',
    },
    footer: {
      licensedLink: 'https://github.com/i4de/rulex/blob/master/LICENSE',
      licensed: 'GPL2',
      createYear: '2022',
      author: 'RULEX',
      authorLink: 'https://github.com/i4de/rulex',
      copyright: [
        {
          text: '个人主页',
          link: 'https://wwhai.github.io/'
        }
      ]
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
