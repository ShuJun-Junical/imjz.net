<script setup>
import { useData } from 'vitepress'
import PostMeta from './PostMeta.vue'
import TagList from './TagList.vue'

const { frontmatter } = useData()
</script>

<template>
  <header v-if="frontmatter.type === 'post' || frontmatter.type === 'note'" class="post-header">
    <h1>{{ frontmatter.title }}</h1>
    <PostMeta
      :author="frontmatter.author"
      :location="frontmatter.location"
      :date="frontmatter.date"
    />
    <TagList :tags="frontmatter.tags" />
  </header>
</template>

<style scoped>
.post-header {
  padding-bottom: 28px;
  margin-bottom: 36px;
}

.post-header h1 {
  margin: 0 0 16px;
  font-family: var(--vp-font-family-base);
  font-size: 34px;
  font-weight: var(--font-weight-bold);
  line-height: 1.35;
}

@media (max-width: 767px) {
  .post-header h1 {
    font-size: 28px;
  }
}
</style>
