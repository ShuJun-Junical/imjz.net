<script setup>
import { data as notes } from '../../notes.data.js'
import PostMeta from './PostMeta.vue'
</script>

<template>
  <div class="note-timeline">
    <article v-for="note in notes" :key="note.url" class="note-entry">
      <h2><a :href="note.url">{{ note.title }}</a></h2>
      <PostMeta :date="note.date" />
      <div class="note-body vp-doc" v-html="note.html" />
    </article>
  </div>
</template>

<style scoped>
.note-entry {
  position: relative;
  padding: 0 0 32px 24px;
  margin-bottom: 32px;
  border-left: 1px solid var(--vp-c-divider);
}

.note-entry::before {
  position: absolute;
  top: 8px;
  left: -5px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  content: '';
}

.note-entry h2 {
  padding: 0;
  margin: 0 0 12px;
  border: 0;
  font-family: var(--vp-font-family-base);
  font-size: 22px;
  font-weight: var(--font-weight-semibold);
  line-height: 1.4;
}

.note-entry h2 a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.2s ease;
}

.note-entry h2 a:hover {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-underline-offset: 4px;
}

.note-body {
  padding: 0;
  margin-top: 20px;
}

.note-body :deep(p) {
  text-indent: 0;
}
</style>
