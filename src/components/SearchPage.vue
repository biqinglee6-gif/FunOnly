<template>
  <section class="search-page">
    <header class="page-header">
      <h2>搜索</h2>
    </header>

    <div class="search-input-wrap">
      <input type="text" placeholder="搜索关键字" />
    </div>

    <section class="block">
      <h3>趋势</h3>
      <article v-for="trend in trends" :key="trend.id" class="trend-item">
        <p class="meta">{{ trend.meta }}</p>
        <p class="title">{{ trend.title }}</p>
        <p class="meta">{{ trend.posts }}</p>
      </article>
    </section>
  </section>
</template>

<script setup>
defineProps({
  trends: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
.search-page {
  height: 100%;
  overflow-y: auto;
  background: #fff;
}

.page-header {
  min-height: 56px;
  display: flex;
  align-items: center;
  padding: calc(8px + var(--x-safe-top)) 14px 8px;
  border-bottom: 1px solid var(--x-border);
}

.page-header h2 {
  margin: 0;
  font-size: var(--x-fs-xl);
  font-weight: 800;
}

.search-input-wrap {
  padding: 12px 14px;
  border-bottom: 1px solid var(--x-border);
}

.search-input-wrap input {
  width: 100%;
  height: 42px;
  border: 1px solid #dae4ea;
  border-radius: 22px;
  padding: 0 14px;
  font-size: var(--x-fs-md);
  outline: none;
}

.block {
  padding: 10px 0 80px;
}

.block h3 {
  margin: 0;
  padding: 8px 14px;
  font-size: var(--x-fs-lg);
  font-weight: 800;
}

.trend-item {
  border-bottom: 1px solid var(--x-border);
  padding: 10px 14px;
}

.title {
  margin: 4px 0;
  font-size: var(--x-fs-md);
  font-weight: 700;
  color: #0f1419;
}

.meta {
  margin: 0;
  font-size: var(--x-fs-sm);
  color: var(--x-muted);
}
</style>
