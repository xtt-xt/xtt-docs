import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: "星天模组文档",
  description: "星天的模组文档，包含模组api，教程等，可用于学习和模组联动",
  
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }]
  ],
  
  themeConfig: {
    logo: '/logo.png',
    siteTitle: '星天模组文档',
  
    nav: [
      { text: '首页', link: '/' },
      { text: '模组列表', link: '/mod-list' }
    ],

    sidebar: [
      {
        text: '目录',
        collapsed: false,
        items: [
          { text: '主页', link: '/' },
          { text: '模组列表', link: '/mod-list' }
        ]
      },
      {
        text: '通用模组前置（CardRegistry）',
        collapsed: false,
        items: [
          { text: '模组介绍', link: '/dependency/' },
          { text: 'API 总览', link: '/dependency/api-overview' },
          { text: '客户端 API', link: '/dependency/api-client' },
          { text: '服务端 API', link: '/dependency/api-server' },
          { text: '事件', link: '/dependency/api-events' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xtt-xt' }
    ],

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '本页目录',
      level: [2, 3]
    },

    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    langMenuLabel: '多语言',

    // 404 页面自定义（加这一整块）
    notFound: {
      title: '页面未找到',
      quote: '你来到了一个未被加载的区块 Σ(ﾟдﾟ;)',
      linkText: '回到主页',
      linkLabel: '返回首页',
      code: '404'
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    }
  }
})
