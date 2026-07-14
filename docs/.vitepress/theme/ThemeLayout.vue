<script setup>
import DefaultTheme from 'vitepress/theme-without-fonts'
import DocOutline from './components/DocOutline.vue'
import PostHeader from './components/PostHeader.vue'
import SiteFooter from './components/SiteFooter.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-top>
      <DocOutline />
    </template>
    <template #doc-before>
      <PostHeader />
    </template>
    <template #layout-bottom>
      <SiteFooter />
    </template>
  </Layout>
</template>
