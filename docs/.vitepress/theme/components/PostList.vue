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

<style scoped>
.post-preview {
  padding-bottom: 28px;
  margin-bottom: 28px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.post-preview:last-of-type {
  border-bottom: 0;
}

.post-preview h2 {
  padding: 0;
  margin: 0 0 12px;
  border: 0;
  font-family: var(--vp-font-family-base);
  font-size: 27px;
  font-weight: var(--font-weight-semibold);
  line-height: 1.4;
}

.post-preview h2 a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.2s ease;
}

.post-preview h2 a:hover {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-underline-offset: 4px;
}

.post-summary {
  margin: 0 0 16px;
  color: var(--vp-c-text-2);
  font-size: 14px;
  font-weight: var(--font-weight-regular);
  line-height: 1.8;
  text-indent: 0;
}

.empty-list {
  color: var(--vp-c-text-3);
  text-align: center;
  text-indent: 0;
}

@media (max-width: 767px) {
  .post-preview h2 {
    font-size: 22px;
  }
}
</style>
