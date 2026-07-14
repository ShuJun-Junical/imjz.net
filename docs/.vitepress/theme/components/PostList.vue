<script setup>
import { computed } from 'vue'
import { data as posts } from '../../posts.data.js'
import { pageCount, paginate } from '../../content.js'
import Pagination from './Pagination.vue'
import PostMeta from './PostMeta.vue'
import TagList from './TagList.vue'

const props = defineProps({
  page: { type: Number, default: 1 },
  paginated: Boolean,
  tag: String,
})

const matchingPosts = computed(() => props.tag
  ? posts.filter((post) => post.tags.includes(props.tag))
  : posts,
)
const visiblePosts = computed(() => props.paginated
  ? paginate(matchingPosts.value, props.page)
  : matchingPosts.value,
)
const totalPages = computed(() => pageCount(matchingPosts.value))
</script>

<template>
  <div class="post-list">
    <article v-for="post in visiblePosts" :key="post.url" class="post-preview">
      <h2><a :href="post.url">{{ post.title }}</a></h2>
      <p v-if="post.description" class="post-summary">{{ post.description }}</p>
      <TagList :tags="post.tags" />
      <PostMeta :author="post.author" :location="post.location" :date="post.date" />
    </article>
    <p v-if="!visiblePosts.length" class="empty-list">暂时还没有内容。</p>
    <Pagination v-if="paginated" :current="page" :total="totalPages" />
  </div>
</template>
