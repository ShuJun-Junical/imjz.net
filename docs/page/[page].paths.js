import { pageCount } from '../.vitepress/content.js'
import { loadSourcePosts } from '../.vitepress/content.node.js'

export default {
  async paths() {
    const posts = loadSourcePosts()
    return Array.from({ length: Math.max(0, pageCount(posts) - 1) }, (_, index) => ({
      params: { page: String(index + 2) },
    }))
  },
}
