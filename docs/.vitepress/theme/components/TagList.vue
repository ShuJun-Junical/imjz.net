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
