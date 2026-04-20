<template>
  <nav class="x-bottom-nav">
    <button class="nav-item" :class="{ active: active === 'home' }" type="button" aria-label="首页" @click="$emit('navigate', 'home')">⌂</button>
    <button class="nav-item" :class="{ active: active === 'search' }" type="button" aria-label="搜索" @click="$emit('navigate', 'search')">⌕</button>
    <button class="nav-item" :class="{ active: active === 'premium' }" type="button" aria-label="订阅" @click="$emit('navigate', 'premium')">◌</button>
    <button class="nav-item" :class="{ active: active === 'notifications' }" type="button" aria-label="通知" @click="$emit('navigate', 'notifications')">◔</button>
    <button class="nav-item" :class="{ active: active === 'messages' }" type="button" aria-label="消息" @click="$emit('navigate', 'messages')">✉</button>
  </nav>
</template>

<script setup>
defineProps({
  active: {
    type: String,
    default: 'home',
  },
});

defineEmits(['navigate']);
</script>

<style scoped>
.x-bottom-nav {
  min-height: 58px;
  border-top: 1px solid var(--x-border);
  background: #fff;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  place-items: center;
  position: sticky;
  bottom: 0;
  padding-bottom: var(--x-safe-bottom);
  z-index: 9;
}

.nav-item {
  border: 0;
  background: transparent;
  color: #5b7083;
  font-size: clamp(24px, 6vw, 30px);
  line-height: 1;
  cursor: pointer;
}

.nav-item.active {
  color: #0f1419;
}
</style>