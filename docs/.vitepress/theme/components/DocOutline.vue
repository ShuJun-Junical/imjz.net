<script setup>
import { getScrollOffset, onContentUpdated, useData } from 'vitepress'
import { computed, onMounted, onUnmounted, ref, shallowRef } from 'vue'

const { frontmatter, theme } = useData()

const container = ref()
const marker = ref()
const headers = shallowRef([])
let activeLink = null

const title = computed(() => {
  const outline = theme.value.outline
  return outline && typeof outline === 'object' && !Array.isArray(outline) && outline.label
    ? outline.label
    : theme.value.outlineTitle || 'On this page'
})

onContentUpdated(() => {
  headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline)
  requestAnimationFrame(setActiveLink)
})

onMounted(() => {
  window.addEventListener('scroll', setActiveLink, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', setActiveLink)
})

function getHeaders(range) {
  if (range === false) return []

  const levels = resolveRange(range)
  const headings = [...document.querySelectorAll('.VPDoc :where(h1,h2,h3,h4,h5,h6)')]
    .filter((el) => el.id && el.hasChildNodes())
    .map((el) => ({
      element: el,
      level: Number(el.tagName[1]),
      title: serializeHeader(el),
      link: `#${el.id}`,
      children: [],
    }))
    .filter((item) => item.level >= levels[0] && item.level <= levels[1])

  const result = []
  const stack = []

  for (const item of headings) {
    while (stack.length && stack[stack.length - 1].level >= item.level) stack.pop()
    const parent = stack[stack.length - 1]
    if (parent) parent.children.push(item)
    else result.push(item)
    stack.push(item)
  }

  return result
}

function resolveRange(range) {
  const value = range && typeof range === 'object' && !Array.isArray(range) ? range.level : range || 2
  if (value === 'deep') return [2, 6]
  return Array.isArray(value) ? value : [value, value]
}

function serializeHeader(el) {
  return [...el.childNodes]
    .filter((node) => !(node.nodeType === 1 && /\b(?:VPBadge|header-anchor|footnote-ref|ignore-header)\b/.test(node.className)))
    .map((node) => node.textContent)
    .join('')
    .trim()
}

function flatten(items) {
  return items.flatMap((item) => [item, ...flatten(item.children || [])])
}

function setActiveLink() {
  if (!container.value || !marker.value) return

  activeLink?.classList.remove('active')

  const items = flatten(headers.value)
    .map(({ element, link }) => ({ link, top: getAbsoluteTop(element) }))
    .filter(({ top }) => !Number.isNaN(top))
    .sort((a, b) => a.top - b.top)

  const scrollY = window.scrollY
  const isBottom = Math.abs(scrollY + window.innerHeight - document.body.offsetHeight) < 1
  const active = isBottom ? items.at(-1)?.link : items.findLast(({ top }) => top <= scrollY + getScrollOffset() + 4)?.link

  activeLink = active ? container.value.querySelector(`a[href="${decodeURIComponent(active)}"]`) : null
  if (!activeLink) {
    marker.value.style.opacity = '0'
    return
  }

  activeLink.classList.add('active')
  marker.value.style.top = `${activeLink.offsetTop + 39}px`
  marker.value.style.opacity = '1'
}

function getAbsoluteTop(element) {
  let top = 0
  while (element && element !== document.body) {
    top += element.offsetTop
    element = element.offsetParent
  }
  return element ? top : NaN
}

function focusHeading(event) {
  const id = event.currentTarget.href.split('#')[1]
  document.getElementById(decodeURIComponent(id))?.focus({ preventScroll: true })
}
</script>

<template>
  <aside v-if="headers.length" class="doc-outline" aria-labelledby="doc-outline-aria-label" ref="container">
    <nav class="VPDocAsideOutline has-outline">
      <div class="content">
        <div class="outline-marker" ref="marker" />
        <div id="doc-outline-aria-label" class="outline-title" role="heading" aria-level="2">
          {{ title }}
        </div>
        <ul class="VPDocOutlineItem root">
          <li v-for="item in headers" :key="item.link">
            <a class="outline-link" :href="item.link" :title="item.title" @click="focusHeading">{{ item.title }}</a>
            <ul v-if="item.children.length" class="VPDocOutlineItem nested">
              <li v-for="child in item.children" :key="child.link">
                <a class="outline-link" :href="child.link" :title="child.title" @click="focusHeading">{{ child.title }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>

<style scoped>
.doc-outline {
  display: none;
}

.VPDocAsideOutline {
  display: none;
}

.VPDocAsideOutline.has-outline {
  display: block;
}

.VPDocAsideOutline .content {
  position: relative;
  padding-left: 16px;
  border-left: 1px solid var(--vp-c-divider);
  font-size: 13px;
  font-weight: var(--font-weight-medium);
}

.outline-marker {
  position: absolute;
  top: 32px;
  left: -1px;
  z-index: 0;
  width: 2px;
  height: 18px;
  border-radius: 2px;
  background-color: var(--vp-c-brand-1);
  opacity: 0;
  transition:
    top 0.25s cubic-bezier(0, 1, 0.5, 1),
    background-color 0.5s,
    opacity 0.25s;
}

.outline-title {
  font-size: 14px;
  font-weight: var(--font-weight-semibold);
  line-height: 32px;
}

.VPDocOutlineItem.root {
  position: relative;
  z-index: 1;
}

.VPDocOutlineItem.nested {
  padding-right: 16px;
  padding-left: 16px;
}

.outline-link {
  display: block;
  overflow: hidden;
  color: var(--vp-c-text-2);
  font-size: 14px;
  font-weight: var(--font-weight-regular);
  line-height: 32px;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.5s;
}

.outline-link:hover,
.outline-link.active {
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

@media (min-width: 1280px) {
  .doc-outline {
    position: sticky;
    top: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + var(--vp-doc-top-height, 0px) + 48px);
    grid-area: 1 / 2;
    display: block;
    width: 224px;
    max-height: calc(100vh - var(--vp-nav-height) - var(--vp-layout-top-height, 0px) - var(--vp-doc-top-height, 0px) - 80px);
    overflow-y: auto;
    scrollbar-width: none;
  }

  .doc-outline::-webkit-scrollbar {
    display: none;
  }
}
</style>
