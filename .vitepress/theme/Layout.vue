<script setup>
import DefaultTheme from 'vitepress/theme'
import BackToTop from './BackToTop.vue'
</script>

<template>
  <DefaultTheme.Layout>
    <template #sidebar-nav-before>
      <div class="sidebar-logo">
        <img src="/logo.png" alt="logo">
        <span>星天模组文档</span>
      </div>
    </template>
    <template #layout-bottom>
      <BackToTop />
    </template>
  </DefaultTheme.Layout>
</template>

<style scoped>
.sidebar-logo {
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 8px;
}
.sidebar-logo img {
  width: 28px;
  height: 28px;
}
.sidebar-logo span {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
/* 桌面端（>=960px）：顶栏本身就有 logo + 站名，侧栏再放一份会在左上角出现两份
   “星天模组文档”，所以桌面隐藏侧栏品牌块，只保留移动端抽屉里的那份 */
@media (min-width: 960px) {
  .sidebar-logo {
    display: none;
  }
}
</style>
