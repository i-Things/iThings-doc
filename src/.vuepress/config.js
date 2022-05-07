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
      { text: '使用文档', link: '/iThings/iThings简介/iThings简介.md' },
      { text: '案例应用', link: '/apply/index.md' },
    ],
    sidebar: {
      '/iThings/': [
        {
          title: "iThings简介",
          collapsable: true,
          children: [
            '/iThings/iThings简介/iThings简介.md',
            '/iThings/iThings简介/服务简介.md',
            '/iThings/iThings简介/应用场景.md',
          ]
        },
        {
          title: "快速开始",
          collapsable: true,
          children: [
            '/iThings/快速开始/安装教程.md',
          ]
        },
        {
          title: "开发中心",
          collapsable: true,
          children: [
            '/iThings/开发中心/项目管理.md',
            '/iThings/开发中心/产品开发.md',
          ]
        },
        {
          title: "云端开发指南",
          collapsable: true,
          children: [
            '/iThings/云端开发指南/设备身份认证.md',
            '/iThings/云端开发指南/物模型协议.md',
          ]
        },
        {
          title: "api文档",
          collapsable: false,
          children: [
            '/iThings/api文档/文档地址.md',
          ]
        },
      ],
      '/apply/': [
        {
          title: "行业应用",
          collapsable: false,
          children: [
            '/apply/宠物定位项圈.md',
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
      docsRepo: 'i4de/ithings-doc',
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
