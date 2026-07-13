import assert from 'node:assert/strict'
import test from 'node:test'
import {
  dateString,
  normalizePost,
  pageCount,
  pagePath,
  paginate,
  sortPosts,
  tagPath,
  tagsFromPosts,
} from '../docs/.vitepress/content.js'
import { tokenizeSearchText } from '../docs/.vitepress/search.js'

const makePosts = (length) => Array.from({ length }, (_, index) => ({ id: index }))

test('normalizes and sorts post metadata', () => {
  const older = normalizePost({ url: '/posts/old.html', title: 'Old', date: '2022-01-01' })
  const newer = normalizePost({ url: '/posts/new.html', title: 'New', date: '2022-01-02', tags: ['生活'] })
  assert.deepEqual(sortPosts([older, newer]).map(({ title }) => title), ['New', 'Old'])
  assert.equal(older.url, '/posts/old')
  assert.deepEqual(older.tags, [])
  assert.equal(normalizePost({ url: '/date', title: 'Date', date: new Date('2022-01-03') }).date, '2022-01-03')
  assert.equal(dateString('2022-01-04T00:00:00.000Z'), '2022-01-04')
})

test('paginates lists and builds page paths', () => {
  assert.equal(pageCount(makePosts(0)), 0)
  assert.equal(pageCount(makePosts(7)), 1)
  assert.equal(pageCount(makePosts(10)), 1)
  assert.equal(pageCount(makePosts(11)), 2)
  assert.equal(pageCount(makePosts(21)), 3)
  assert.deepEqual(paginate(makePosts(21), 2).map(({ id }) => id), [10, 11, 12, 13, 14, 15, 16, 17, 18, 19])
  assert.equal(pagePath(1), '/')
  assert.equal(pagePath(2), '/page/2')
})

test('counts tags and encodes tag paths', () => {
  const tags = tagsFromPosts([{ tags: ['生活', '高中'] }, { tags: ['生活'] }])
  assert.deepEqual(tags, [{ name: '高中', count: 1 }, { name: '生活', count: 2 }])
  assert.equal(tagPath('高中生活'), '/tag/%E9%AB%98%E4%B8%AD%E7%94%9F%E6%B4%BB')
})

test('tokenizes continuous Chinese and Latin search text', () => {
  assert.deepEqual(tokenizeSearchText('高考三日 VitePress 1.6'), [
    '高',
    '考',
    '三',
    '日',
    'vitepress',
    '1',
    '6',
  ])
})
