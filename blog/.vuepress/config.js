module.exports = {
    title: '马浚哲的生活随笔', // Title for the site. This will be displayed in the navbar.
    theme: '@vuepress/theme-blog',
    themeConfig: {
        dateFormat: 'YYYY-MM-DD',
        smoothScroll: true,
        // sitemap:{
        //     hostname: 'https://imjz.net'
        // },
        // feed:{
        //     canonical_base:'https://imjz.net'
        // },
        footer: {
            contact: [
                {
                    type: 'github',
                    link: 'https://github.com/JupiterJun',
                },
                {
                    type: 'mail',
                    link: 'mailto:me@imjz.net',
                },
            ],
            copyright: [
                {
                    text: '琼ICP备2022001156号-1',
                    link: 'https://beian.miit.gov.cn/'
                },
                {
                    text: '本站文章不允许转载。',
                },
                {
                    text: '版权所有 © 2022 马浚哲'
                },
            ],
        },
        frontmatters: [
            {
                id: 'tag',
                keys: ['tag'],
                path: '/tag/',
                title: '标签',
            }
        ],
        directories: [
            {
                id: 'post',
                dirname: '_post',
                path: '/',
                title: '随笔',
            },
            {
                id:'private',
                dirname:'private',
                path:'/private',
                itemPermalink: '/:slug',
                title:'个人'
            }
        ],
        nav: [
            {
                text: '随笔',
                link: '/',
            },
            {
                text: '标签',
                link: '/tag/',
            },
        ]
    },
    dest: './dist'
}
