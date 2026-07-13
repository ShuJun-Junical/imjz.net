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
