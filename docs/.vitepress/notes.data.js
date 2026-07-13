import { createContentLoader } from 'vitepress'
import { dateString } from './content.js'

export default createContentLoader('notes/*.md', {
  render: true,
  transform(pages) {
    return pages
      .filter(({ frontmatter }) => frontmatter.type === 'note')
      .map(({ url, frontmatter, html }) => {
        const date = dateString(frontmatter.date)
        return {
          title: frontmatter.title,
          date,
          timestamp: Date.parse(`${date}T00:00:00Z`),
          url: url.replace(/\.html$/, ''),
          html,
        }
      })
      .sort((a, b) => b.timestamp - a.timestamp)
  },
})
