<script setup lang="ts">
import PageMeta from '@theme/VPPageMeta.vue'
import PageNav from '@theme/VPPageNav.vue'
import SidebarItems from '@theme/VPSidebarItems.vue'
import ArticleInfoList from "./ArticleInfoList.vue";
import {usePageData} from "vuepress/client";
import {useSidebarItems} from "@vuepress/theme-default/lib/client/composables/useSidebarItems.js";

defineSlots<{
  'top'?: (props: Record<never, never>) => any
  'bottom'?: (props: Record<never, never>) => any
  'content-top'?: (props: Record<never, never>) => any
  'content-bottom'?: (props: Record<never, never>) => any
}>()

const data = usePageData()
const sidebarItems = useSidebarItems()
console.log(sidebarItems.value)
</script>

<template>
  <main class="page">
    <slot name="top"/>

    <div class="theme-default-content">
      <h1>{{ data.title }}</h1>

      <ArticleInfoList :author="data.frontmatter.author" :location="data.frontmatter.location"
                       :date="data.frontmatter.date?data.frontmatter.date.split('T')[0]:''"/>

      <slot name="content-top"/>

      <Content class="inner-content"/>

      <slot name="content-bottom"/>
    </div>


    <PageMeta/>

    <PageNav/>

    <slot name="bottom"/>
  </main>
  <div class="content-toc" v-if="sidebarItems.length">
    <p class="toc-title">目录</p>
    <SidebarItems :items="sidebarItems[0].children"/>
  </div>
</template>

<style scoped>
.page {
  box-shadow: 0 10px 20px rgba(0, 0, 0, .05), 0 6px 6px rgba(0, 0, 0, .07);
  border-radius: 0;
  width: 60vw;
  margin: calc(var(--navbar-height) + 8rem) auto 2rem;
  @media (max-width: 1300px) {
    margin: calc(var(--navbar-height) + 8rem) 4rem 2rem;
  }
  @media (max-width: 959px) {
    margin: var(--navbar-height) 0 2rem;
    width: 100%;
  }
  padding: 0 0 2rem;
}

.theme-default-content {
  font-family: var(--font-noto-serif-sc);
  padding-left: 2.5rem;
  padding-right: 2.5rem;
}

.content-toc {
  position: fixed;
  top: var(--navbar-height);
  right: 0;
  bottom: 0;
  width: 12rem;
  height: fit-content;
  overflow-y: auto;
  padding: 1rem 0 0.6rem 1rem;
  @media (max-width: 1100px) {
    box-shadow: -2px 6px 6px rgba(0, 0, 0, .07);
    border-bottom-left-radius: 4px;
    background: var(--vp-c-bg);
  }
  @media (max-width: 719px) {
    display: none;
  }
}
</style>

<style>
.inner-content {
  h1 {
    display: none;
  }
}

.content-toc {
  ul {
    list-style-type: none;
    margin: 0;
    padding-left: 0.1rem;
  }

  li a {
    font-size: 0.8rem !important;
    padding: 0.1rem 1rem 0.1rem 1rem !important;
    transition: border-left-color 0.3s ease;
    border-left: 2px solid transparent;
    font-weight: 400;
  }

  .toc-title {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0.3rem;
    padding: 0;
  }

  .sidebar-heading {
    display: none;
  }

  .sidebar-item-children ul {
    padding-left: 0;
  }
}
</style>