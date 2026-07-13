<script setup>
import { dateString } from '../../content.js'

defineProps({
  author: String,
  location: String,
  date: { type: [String, Date], required: true },
})

const formatDate = (date) => new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  timeZone: 'UTC',
}).format(new Date(`${dateString(date)}T00:00:00Z`))
</script>

<template>
  <div class="post-meta">
    <span v-if="author" class="post-meta-item">
      <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m3 11 19-9-9 19-2-8-8-2Z" /></svg>
      {{ author }}<template v-if="location"> 于 {{ location }}</template>
    </span>
    <time class="post-meta-item" :datetime="dateString(date)">
      <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
      {{ formatDate(date) }}
    </time>
  </div>
</template>
