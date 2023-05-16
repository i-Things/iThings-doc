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
      { text: '在线体验', link: 'http://42.193.250.251:7777/' },
      {text:'接口文档',link: 'https://www.apifox.cn/apidoc/shared-0fb2272b-5f25-4ce0-90ce-f5bf82958c6d'},
      { text: '边缘网关', link: 'https://rulex.pages.dev/' },
    ],
    sidebar: {
      '/iThings/': [
        {
          title: "iThings简介",
          collapsable: true,
          children: [
            '/iThings/iThings简介/iThings简介.md',
            '/iThings/iThings简介/服务设计.md',
            '/iThings/iThings简介/iThings主要流程.md',
            '/iThings/iThings简介/许可版本.md',
          ]
        },
        {
          title: "应用案例",
          collapsable: true,
          children: [
            '/iThings/应用案例/应用场景.md',
          ]
        },
        {
          title: "快速开始",
          collapsable: true,
          children: [
            '/iThings/快速开始/安装教程.md',
            '/iThings/快速开始/产品开发.md',
            '/iThings/快速开始/设备接入指引.md',
          ]
        },
        // {
        //   title: "开发中心",
        //   collapsable: true,
        //   children: [
        //     // '/iThings/开发中心/项目管理.md',
        //
        //   ]
        // },
        {
          title: "云端开发指南",
          collapsable: true,
          children: [
            '/iThings/云端开发指南/设备身份认证.md',
            '/iThings/云端开发指南/password生成工具.md',
            '/iThings/云端开发指南/物模型协议.md',
            '/iThings/云端开发指南/网关子设备.md',
            '/iThings/云端开发指南/设备本地日志上报.md',
            '/iThings/云端开发指南/设备远程配置.md',
            '/iThings/云端开发指南/消息解析.md',
          ]
        },
        {
          title: "设备端开发指南",
          collapsable: true,
          children: [
            '/iThings/设备端开发指南/开发者指引.md',
            '/iThings/设备端开发指南/设备基于mqtt协议接入.md',
          ]
        },
        {
          title: "高级",
          collapsable: true,
          children: [
            '/iThings/高级/开放认证.md',
            '/iThings/高级/消息推送.md',
          ]
        },
        {
          title: "iThings开发",
          collapsable: true,
          children: [
            '/iThings/iThings开发/单体模式编辑及运行.md',
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
      owner: 'i-Things',
      repositories: 'iThings',
    },
    editLinks: true,
    editLinkText: '编辑当前页',
    edit: {
      docsPlatform: 'https://github.com/',
      docsRepo: 'i-Things/iThings-doc',
      docsBranch: 'master',
      docsDir: 'src',
    },
    footer: {
      licensedLink: 'https://github.com/i-Things/iThings/blob/master/LICENSE',
      licensed: 'GNU',
      createYear: '2022',
      author: 'iThings',
      authorLink: 'https://github.com/i-Things/iThings',
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
