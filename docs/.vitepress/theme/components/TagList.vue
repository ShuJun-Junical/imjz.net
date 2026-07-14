<script setup>
import { tagPath } from '../../content.js'

defineProps({
  tags: { type: Array, default: () => [] },
})
</script>

<template>
  <ul v-if="tags.length" class="tag-list" aria-label="文章标签">
    <li v-for="tag in tags" :key="tag">
      <a :href="tagPath(tag)">{{ tag }}</a>
    </li>
  </ul>
</template>

<style scoped>
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0;
  margin: 16px 0 0;
  list-style: none;
}

.tag-list a {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  min-height: 26px;
  padding: 2px 10px;
  border: 1px solid var(--vp-c-brand-soft);
  border-radius: 3px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-text-2);
  font-size: 12px;
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.tag-list a:hover {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
}
</style>
