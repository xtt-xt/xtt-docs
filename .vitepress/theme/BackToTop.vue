<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const visible = ref(false)
const THRESHOLD = 400

let lastY = 0
let ticking = false
// 点击后平滑回顶期间临时忽略滚动判断，避免按钮又闪出来
let suppress = false

function isHome() {
  const p = route.path || ''
  return p === '/' || p === '/index.html'
}

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const y = window.scrollY || document.documentElement.scrollTop || 0
    if (suppress) {
      lastY = y
      ticking = false
      return
    }
    if (isHome() || y <= THRESHOLD) {
      visible.value = false
    } else if (y < lastY) {
      // 向上滚动：出现（满足“滑下去后再往上滑”的条件）
      visible.value = true
    } else if (y > lastY + 4) {
      // 向下滚动：收起
      visible.value = false
    }
    lastY = y
    ticking = false
  })
}

function toTop() {
  visible.value = false
  suppress = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
  window.setTimeout(() => {
    suppress = false
  }, 900)
}

onMounted(() => {
  lastY = window.scrollY || 0
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

watch(
  () => route.path,
  () => {
    visible.value = false
    lastY = window.scrollY || 0
  }
)
</script>

<template>
  <Transition name="btt">
    <button
      v-show="visible"
      class="btt-btn"
      type="button"
      aria-label="回到顶部"
      title="回到顶部"
      @click="toTop"
    >
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path d="M12 5l7 7-1.4 1.4L13 8.8V19h-2V8.8L6.4 13.4 5 12z" fill="currentColor" />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.btt-btn {
  position: fixed;
  right: 26px;
  bottom: 34px;
  z-index: 40;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  padding: 0;
  border-radius: 50%;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
  transition: opacity 0.25s ease, transform 0.25s ease, background-color 0.2s ease;
}
.btt-btn svg {
  display: block;
}
.btt-btn:hover {
  background: var(--vp-c-bg-mute);
  transform: translateY(-1px);
}
.btt-enter-from,
.btt-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
@media (max-width: 768px) {
  .btt-btn {
    right: 14px;
    bottom: 20px;
    width: 42px;
    height: 42px;
  }
  .btt-btn svg {
    width: 20px;
    height: 20px;
  }
}
</style>

