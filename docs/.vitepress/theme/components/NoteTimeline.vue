<script setup>
import { computed } from 'vue'
import { data as notes } from '../../notes.data.js'

const formatMonth = (key) => `${Number(key.slice(5, 7))}月`
const formatDate = (date) => `${date.slice(0, 4)} 年 ${Number(date.slice(5, 7))} 月 ${Number(date.slice(8, 10))} 日`

const noteGroups = computed(() => {
  const groups = new Map()
  for (const note of notes) {
    const key = note.date.slice(0, 7)
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(note)
  }
  return [...groups].map(([key, items]) => ({ key, items }))
})
</script>

<template>
  <div class="note-timeline">
    <section v-for="group in noteGroups" :key="group.key" class="note-month">
      <header class="note-month-header">
        <span class="note-month-year">{{ group.key.slice(0, 4) }}</span>
        <span class="note-month-label">{{ formatMonth(group.key) }}</span>
      </header>

      <div class="note-month-entries">
        <article v-for="note in group.items" :key="note.url" class="note-entry">
          <div class="note-content">
            <h2 v-if="note.title"><a :href="note.url">{{ note.title }}</a></h2>
            <div class="note-body vp-doc" v-html="note.html" />
          </div>
          <a class="note-date" :href="note.url" :aria-label="formatDate(note.date)">
            <time :datetime="note.date">
              <span class="note-day">{{ Number(note.date.slice(8, 10)) }}</span>
              <span class="note-day-unit">日</span>
            </time>
          </a>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.note-timeline {
  margin-top: 20px;
}

.note-month {
  position: relative;
  display: grid;
  grid-template-columns: 140px minmax(0, 1fr);
  padding-bottom: 12px;
}

.note-month::before {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 140px;
  width: 1px;
  background: var(--vp-c-divider);
  content: '';
}

.note-month-header {
  grid-area: 1 / 1;
  position: sticky;
  top: calc(var(--vp-nav-height) + 12px);
  z-index: 1;
  align-self: start;
  display: flex;
  gap: 10px;
  align-items: baseline;
  justify-content: flex-end;
  box-sizing: border-box;
  width: 140px;
  padding: 0 12px 20px 0;
  background: var(--vp-c-bg);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.note-month-entries {
  grid-area: 1 / 2;
  min-width: 0;
  padding-left: 16px;
}

.note-month-year {
  color: var(--vp-c-text-3);
  font-size: 18px;
  font-weight: var(--font-weight-medium);
  line-height: 1;
}

.note-month-label {
  color: var(--vp-c-brand-1);
  font-size: 28px;
  font-weight: var(--font-weight-bold);
  line-height: 1;
}

.note-entry {
  position: relative;
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  gap: 16px;
  padding-bottom: 36px;
}

.note-entry::before {
  position: absolute;
  z-index: 2;
  top: 11px;
  left: -18px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  content: '';
}

.note-date {
  grid-area: 1 / 1;
  align-self: start;
  color: var(--vp-c-text-2);
  text-align: left;
  text-decoration: none;
}

.note-date:hover {
  color: var(--vp-c-brand-1);
}

.note-date time {
  display: flex;
  gap: 3px;
  align-items: baseline;
  justify-content: flex-start;
  font-variant-numeric: tabular-nums;
}

.note-day {
  font-size: 26px;
  font-weight: var(--font-weight-bold);
  line-height: 1;
}

.note-day-unit {
  color: var(--vp-c-text-3);
  font-size: 14px;
}

.note-content {
  grid-area: 1 / 2;
  min-width: 0;
}

.note-entry h2 {
  padding: 0;
  margin: 0 0 12px;
  border: 0;
  font-family: var(--vp-font-family-base);
  font-size: 18px;
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
  margin-top: 0;
}

.note-body :deep(p) {
  text-indent: 0;
}

.note-body :deep(*):first-child {
  margin-top: 0;
}

@media (max-width: 767px) {
  .note-month {
    grid-template-columns: 50px minmax(0, 1fr);
  }

  .note-month-header {
    flex-direction: column;
    gap: 4px;
    align-items: flex-end;
    width: 50px;
    padding-right: 8px;
  }

  .note-month-entries {
    padding-left: 10px;
  }

  .note-month-year {
    font-size: 14px;
  }

  .note-month-label {
    font-size: 22px;
  }

  .note-month::before {
    left: 50px;
  }

  .note-entry {
    grid-template-columns: 40px minmax(0, 1fr);
    gap: 10px;
    padding-bottom: 32px;
  }

  .note-entry::before {
    left: -12px;
  }

  .note-day {
    font-size: 22px;
  }
}
</style>
