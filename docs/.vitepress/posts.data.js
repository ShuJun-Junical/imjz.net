import { createContentLoader } from 'vitepress'
import { normalizePost, sortPosts } from './content.js'

export default createContentLoader('posts/*.md', {
  transform(pages) {
    return sortPosts(
      pages.map(({ url, frontmatter }) => normalizePost({ url, ...frontmatter })),
    )
  },
})
