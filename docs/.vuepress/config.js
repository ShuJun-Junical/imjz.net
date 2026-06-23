import {blogPlugin} from '@vuepress/plugin-blog'
import {defaultTheme} from '@vuepress/theme-default'
import {defineUserConfig} from 'vuepress'
import {viteBundler} from '@vuepress/bundler-vite'
import {searchPlugin} from '@vuepress/plugin-search'
import * as path from "node:path";

export default defineUserConfig({
  lang: 'zh-CN',

  title: '纾浚的生活随笔', description: '记录生活点滴。',

  head: [['link', {
    rel: 'icon',
    href: '/favicon.ico'
  }], ['meta', {name: 'author', content: '纾浚'}], ['meta', {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
  }],],

  theme: defaultTheme({
    // logo: 'https://vuejs.press/images/hero.png',
    sidebarDepth: 2,
    navbar: [// '/',
      {
        text: '随笔', link: '/article/',
      },
      {
        text: '纸条', link: '/note/',
      },
      {
        text: '标签', link: '/tag/',
      }
    ],
    lastUpdatedText: '最后更新', contributorsText: '贡献者',
  }),

  alias: {
    // 覆盖默认主题的 Page.vue
    '@theme/VPPage.vue': path.resolve(
      __dirname,
      './components/Page.vue',
    ),
  },

  plugins: [blogPlugin({
    // Only files under posts are articles
    filter: ({filePathRelative}) =>
      filePathRelative ? filePathRelative.startsWith('articles/') || filePathRelative.startsWith('notes/') : false,

    // Getting article info
    getInfo: ({
                frontmatter,
                title,
                data,
                filePathRelative,
                contentRendered
              }) => ({
      title,
      author: frontmatter.author || '',
      date: frontmatter.date || null,
      tag: frontmatter.tag || [],
      sticky: frontmatter.sticky || null,
      location: frontmatter.location || null,
      content: filePathRelative.startsWith('notes/') ? contentRendered : null,
      excerpt: // Support manually set excerpt through frontmatter
        typeof frontmatter.excerpt === 'string' ? frontmatter.excerpt : data?.excerpt || '',
    }),

    excerpt: true, // Generate excerpt for all pages excerpt those users choose
                   // to disable
    excerptFilter: ({frontmatter, filePathRelative}) =>
      !frontmatter.home &&
      frontmatter.excerpt !== false &&
      typeof frontmatter.excerpt !== 'string' &&
      !filePathRelative?.startsWith('notes/'),
    excerptLength: 100,

    category: [
      {
        key: 'tag',
        getter: (page) => page.frontmatter.tag || [],
        layout: 'Tag',
        itemLayout: 'Tag',
        frontmatter: () => ({
          title: '标签', sidebar: false,
        }),
        itemFrontmatter: (name) => ({
          title: `标签 ${name}`, sidebar: false,
        }),
      }
    ],

    type: [{
      key: 'article', // Remove archive articles
      filter: (page) =>
        page.filePathRelative.startsWith('articles/') && !page.frontmatter.archive,
      layout: 'Article',
      frontmatter: () => ({
        title: '随笔', sidebar: false,
      }), // Sort pages with time and sticky
      sorter: (pageA, pageB) => {
        if (pageA.frontmatter.sticky && pageB.frontmatter.sticky) return pageB.frontmatter.sticky - pageA.frontmatter.sticky

        if (pageA.frontmatter.sticky && !pageB.frontmatter.sticky) return -1

        if (!pageA.frontmatter.sticky && pageB.frontmatter.sticky) return 1

        if (!pageB.frontmatter.date) return 1
        if (!pageA.frontmatter.date) return -1

        return (new Date(pageB.frontmatter.date).getTime() - new Date(pageA.frontmatter.date).getTime())
      },
    }, {
      key: 'note', // Only article with date should be added to timeline
      filter: (page) =>
        page.filePathRelative.startsWith('notes/') && !page.frontmatter.archive, // Sort pages with time
      sorter: (pageA, pageB) => new Date(pageB.frontmatter.date).getTime() - new Date(pageA.frontmatter.date).getTime(),
      layout: 'Note',
      frontmatter: () => ({
        title: '纸条', sidebar: false,
      }),
    },],
    hotReload: true,
  }), searchPlugin({}),],

  bundler: viteBundler(),
})
