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
