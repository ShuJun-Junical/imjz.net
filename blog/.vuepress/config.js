module.exports = {
    title: '青章浚的小站', // Title for the site. This will be displayed in the navbar.
    theme: '@vuepress/theme-blog',
    themeConfig: {
        dateFormat: 'YYYY-MM-DD',
        smoothScroll: true,
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
                    text: '本站文章采用 CC-BY-NC-SA 4.0 国际许可协议进行许可。',
                    link: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh'
                },
                {
                    text: '版权所有 © 2021 青章浚'
                }
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
