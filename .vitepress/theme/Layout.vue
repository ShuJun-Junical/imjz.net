<template>
  <div class="flex flex-col min-h-screen overflow-hidden">
    <Herder :current-path="path.path" />
    <main class="grow">
      <Home v-if="path.path == '/'" />
      <Tags v-else-if="path.path == '/tags'" />
      <NotFound v-else-if="page.isNotFound" />
      <Article v-else />
    </main>
    <BackTop />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useData, useRoute } from "vitepress";
import Herder from "./components/Header.vue";
import BackTop from "./components/BackTop.vue";

import Home from "./pages/Home.vue";
import Article from "./pages/Article.vue";
import NotFound from "./pages/NotFound.vue";
import Tags from "./pages/Tags.vue";

const { page, frontmatter } = useData();
const path = reactive(useRoute());
</script>
