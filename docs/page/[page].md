---
layout: page
title: 随笔
---

<main class="blog-page">
  <h1 class="page-title">随笔 <small>第 {{ $params.page }} 页</small></h1>
  <PostList :page="Number($params.page)" paginated />
</main>
