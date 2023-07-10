<template>
  <header
    :class="`navbar shadow-xl md:bg-opacity-90 fixed transition duration-300 ease-in-out md:px-6 ${
      top ? '' : 'bg-white backdrop-blur-sm shadow-lg'
    }`"
    style="height: 4.8rem"
  >
    <div class="flex-1 px-2 lg:flex-none">
      <a class="text-3xl" href="/" style="letter-spacing: 0.16em">{{
        site.title
      }}</a>
    </div>
    <div class="flex justify-end flex-1 px-2 item">
      <a
        :class="`text-xl mx-3 hover:text-primary ease-in-out duration-200 ${
          props.currentPath === link.path ? 'text-primary' : ''
        }`"
        v-for="link in NavBarList"
        :href="link.path"
        >{{ link.name }}</a
      >

      <!-- TODO: 亮暗色模式切换 -->
      <!-- <label class="swap swap-rotate">
        <input type="checkbox" v-model="themeMode" />
        <svg
          class="swap-on fill-current w-10 h-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
          />
        </svg>
        <svg
          class="swap-off fill-current w-10 h-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
          />
        </svg>
      </label> -->

      <!-- TODO: 手机端菜单 -->
      <!-- <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost rounded-btn">Dropdown</label>
          <ul
            tabindex="0"
            class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
          >
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </div> -->
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineComponent } from "vue";
import { useRouter, useData } from "vitepress";
const { site, page, frontmatter } = useData();
console.log(site);

const { go } = useRouter();
const top = ref(true);
const mobileNavOpen = ref(false);
const themeMode = ref(true);
const props = withDefaults(
  defineProps<{
    currentPath: string;
  }>(),
  {
    currentPath: "",
  }
);

const NavBarList = [
  {
    name: "文章",
    path: "/",
  },
  {
    name: "标签",
    path: "/tags",
  },
  {
    name: "归档",
    path: "/archives",
  },
  {
    name: "关于",
    path: "/about",
  },
];
const NavBarButton = {
  name: "加入我们",
  path: "/join",
};

onMounted(() => {
  window.addEventListener("scroll", scrollHandler);
  document.addEventListener("keydown", keyHandler);
});
onUnmounted(() => {
  window.removeEventListener("scroll", scrollHandler);
  document.removeEventListener("keydown", keyHandler);
});

function scrollHandler() {
  window.pageYOffset > 10 ? (top.value = false) : (top.value = true);
}

function keyHandler(e: any) {
  if (e.keyCode === 27) {
    mobileNavOpen.value = false;
  }
}
</script>
