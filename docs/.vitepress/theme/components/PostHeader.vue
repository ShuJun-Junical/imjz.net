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
