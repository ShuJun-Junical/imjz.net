<template>
  <footer class="site-footer">
    <div class="site-footer-links">
      <a href="https://github.com/ShuJun-Junical" target="_blank" rel="noreferrer">GitHub</a>
      <a href="mailto:me@imjz.net">邮箱</a>
    </div>
    <div class="site-footer-copy">
      <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">琼ICP备2022001156号-1</a>
      <span>本站文章禁止转载</span>
      <span>版权所有 © 2022-{{ new Date().getFullYear() }} 纾浚</span>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: space-between;
  min-height: 68px;
  padding: 16px 32px;
  background: hsl(47, 7%, 9%);
  color: hsla(47, 33%, 94%, 0.55);
  font-size: 12px;
}

.site-footer-links,
.site-footer-copy {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 20px;
  align-items: center;
}

.site-footer a {
  color: inherit;
  text-decoration: none;
}

.site-footer a:hover {
  color: var(--vp-c-white);
}

@media (max-width: 767px) {
  .site-footer {
    flex-direction: column;
    align-items: flex-start;
    padding: 24px 20px;
  }
}
</style>
