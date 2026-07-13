<script setup>
import DefaultTheme from 'vitepress/theme-without-fonts'
import PostHeader from './components/PostHeader.vue'
import SiteFooter from './components/SiteFooter.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-before>
      <PostHeader />
    </template>
  </Layout>
  <SiteFooter />
</template>
