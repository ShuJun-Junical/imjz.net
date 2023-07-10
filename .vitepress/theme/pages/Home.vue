<template>
  <div class="mt-40 mx-auto max-w-3xl flex flex-col">
    <div class="border-b border-gray-500 pb-6 mb-6" v-for="post in posts">
      <a
        class="link link-hover hover:text-primary ease-in-out duration-300 text-2xl tracking-wider font-medium"
        :href="post.url"
        >{{ post.title }}</a
      >
      <p
        class="my-3.5 text-sm tracking-wide text-gray-500 font-sans font-light"
      >
        {{ post.excerpt }}
      </p>
      <div class="flex font-sans text-xs items-center gap-x-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
        </svg>
        <span class="font-light">{{
          `${post.author} ${post.location ? `于 ${post.location}` : ""}`
        }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ml-6"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <span class="font-light">2022年2月25日</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { data as posts } from "../posts.data.ts";

console.log(posts);
</script>
