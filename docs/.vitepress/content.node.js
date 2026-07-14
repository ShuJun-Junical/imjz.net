import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { normalizePost, sortPosts } from './content.js'

const postsDir = fileURLToPath(new URL('../posts', import.meta.url))

export function loadSourcePosts() {
  return sortPosts(
    fs.readdirSync(postsDir)
      .filter((name) => name.endsWith('.md'))
      .map((name) => {
        const { data } = matter(fs.readFileSync(path.join(postsDir, name), 'utf8'))
        return normalizePost({ url: `/posts/${name.slice(0, -3)}`, ...data })
      }),
  )
}
