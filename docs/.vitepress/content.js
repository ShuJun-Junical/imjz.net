export const PAGE_SIZE = 10

export function dateString(date) {
  return date instanceof Date ? date.toISOString().slice(0, 10) : String(date).slice(0, 10)
}

export function normalizePost({ url, title, date, author, location, tags, description }) {
  const normalizedDate = dateString(date)
  const timestamp = Date.parse(`${normalizedDate}T00:00:00Z`)
  if (!title || !normalizedDate || Number.isNaN(timestamp)) {
    throw new Error(`Invalid post metadata: ${url || title || 'unknown post'}`)
  }

  return {
    title,
    url: url.replace(/\.html$/, ''),
    date: normalizedDate,
    timestamp,
    ...(author && { author }),
    ...(location && { location }),
    tags: Array.isArray(tags) ? tags : [],
    ...(description && { description }),
  }
}

export function sortPosts(posts) {
  return [...posts].sort((a, b) => b.timestamp - a.timestamp)
}

export function paginate(items, page, pageSize = PAGE_SIZE) {
  const start = (page - 1) * pageSize
  return items.slice(start, start + pageSize)
}

export function pageCount(items, pageSize = PAGE_SIZE) {
  return Math.ceil(items.length / pageSize)
}

export function pagePath(page) {
  return page === 1 ? '/' : `/page/${page}`
}

export function tagsFromPosts(posts) {
  const counts = new Map()
  for (const post of posts) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) || 0) + 1)
  }
  return [...counts].map(([name, count]) => ({ name, count })).sort((a, b) =>
    a.name.localeCompare(b.name, 'zh-CN'),
  )
}

export function tagPath(tag) {
  return `/tag/${encodeURIComponent(tag)}`
}
