<script setup>
import { computed } from 'vue'
import { pagePath } from '../../content.js'

const props = defineProps({
  current: { type: Number, required: true },
  total: { type: Number, required: true },
})

const pages = computed(() => Array.from({ length: props.total }, (_, index) => index + 1))
</script>

<template>
  <nav v-if="total > 1" class="pagination" aria-label="文章分页">
    <a v-if="current > 1" :href="pagePath(current - 1)" rel="prev">上一页</a>
    <span v-else />
    <div class="pagination-pages">
      <a
        v-for="page in pages"
        :key="page"
        :href="pagePath(page)"
        :aria-current="page === current ? 'page' : undefined"
      >{{ page }}</a>
    </div>
    <a v-if="current < total" :href="pagePath(current + 1)" rel="next">下一页</a>
    <span v-else />
  </nav>
</template>
