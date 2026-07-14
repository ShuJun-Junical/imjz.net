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

<style scoped>
.pagination {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 20px;
  align-items: center;
  margin-top: 56px;
  font-size: 14px;
}

.pagination > a:last-child {
  justify-self: end;
}

.pagination-pages {
  display: flex;
  gap: 6px;
}

.pagination a {
  color: var(--vp-c-text-2);
  text-decoration: none;
}

.pagination-pages a {
  display: grid;
  width: 32px;
  height: 32px;
  place-items: center;
  border-radius: 3px;
}

.pagination a:hover,
.pagination a[aria-current='page'] {
  color: var(--vp-c-brand-1);
}

.pagination-pages a[aria-current='page'] {
  background: var(--vp-c-brand-soft);
  font-weight: var(--font-weight-bold);
}

@media (max-width: 767px) {
  .pagination {
    gap: 10px;
  }
}
</style>
