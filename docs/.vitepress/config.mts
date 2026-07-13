import { defineConfig } from 'vitepress'
import { tokenizeSearchText } from './search.js'

export default defineConfig({
  lang: 'zh-CN',
  title: '纾浚的生活随笔',
  description: '记录生活点滴。',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'author', content: '纾浚' }],
  ],
  themeConfig: {
    siteTitle: '纾浚的生活随笔',
    nav: [
      { text: '随笔', link: '/' },
      { text: '纸条', link: '/notes/' },
      { text: '标签', link: '/tag/' },
    ],
    outline: {
      level: [2, 3],
      label: '目录',
    },
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          options: {
            tokenize: tokenizeSearchText,
          },
          searchOptions: {
            combineWith: 'AND',
          },
        },
        _render(src, env, md) {
          const html = md.render(src, env)
          const title = env.frontmatter?.title
          return `${title ? md.render(`# ${title}`) : ''}${html}`
        },
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索',
          },
          modal: {
            noResultsText: '没有找到相关内容',
            resetButtonTitle: '清除搜索',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },
    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short',
      },
    },
    darkModeSwitchLabel: '深色模式',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    notFound: {
      title: '页面不存在',
      quote: '这里暂时没有留下文字。',
      linkLabel: '回到首页',
      linkText: '回到首页',
    },
  },
})
