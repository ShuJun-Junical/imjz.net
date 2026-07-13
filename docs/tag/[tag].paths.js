import { tagsFromPosts } from '../.vitepress/content.js'
import { loadSourcePosts } from '../.vitepress/content.node.js'

export default {
  async paths() {
    const posts = loadSourcePosts()
    return tagsFromPosts(posts).map(({ name }) => ({ params: { tag: name } }))
  },
}
