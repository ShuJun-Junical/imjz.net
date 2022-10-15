const { getPosts, generatePaginationPages } = require('./theme/serverUtils')

async function config() {
    const pageSize = 10
    await generatePaginationPages(pageSize)
    return {
        title: '纾浚的生活随笔',
        description: '记录生活点滴。',
        lang: 'zh-CN',
        lastUpdated: true,
        outDir: '/dist',
        cleanUrls: 'without-subfolders',
        ignoreDeadLinks:true,
        themeConfig: {
            lastUpdatedText:'上次更新',
            posts: await getPosts(),
            pageSize: pageSize,
            nav: [
                { text: '首页', link: '/' },
                { text: '归档', link: '/pages/archives' },
                { text: '标签', link: '/pages/tags' },
                { text: '关于我', link: '/pages/about' }
            ],
            //outline:[2,3],
            outlineTitle:'文章摘要',
            // socialLinks:[{ icon: 'github', link: 'https://github.com/airene/vitepress-blog-pure' }],
        },
        srcExclude: ['README.md'], // exclude the README.md , needn't to compiler

        // vite: {
        //     //build: { minify: false }
        //     server: { port: 5000 },
        // },
        /*
      optimizeDeps: {
          keepNames: true
      }
      */
    }
}

module.exports = config()
