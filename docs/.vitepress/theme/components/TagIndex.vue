<script setup>
import { data as posts } from '../../posts.data.js'
import { tagPath, tagsFromPosts } from '../../content.js'

const tags = tagsFromPosts(posts)
</script>

<template>
  <ul class="tag-index">
    <li v-for="tag in tags" :key="tag.name">
      <a :href="tagPath(tag.name)">
        <span>{{ tag.name }}</span>
        <small>{{ tag.count }}</small>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.tag-index {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  padding: 0;
  margin: 16px 0 0;
  list-style: none;
}

.tag-index a {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  min-height: 34px;
  padding: 4px 14px;
  border: 1px solid var(--vp-c-brand-soft);
  border-radius: 3px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-text-2);
  font-size: 15px;
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.tag-index a:hover {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
}

.tag-index small {
  color: var(--vp-c-text-3);
  font-size: 11px;
}

.tag-index a:hover small {
  color: inherit;
}
</style>
