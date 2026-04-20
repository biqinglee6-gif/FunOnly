<template>
  <section class="premium-page">
    <header class="page-header">
      <h2>订阅</h2>
    </header>

    <section class="hero">
      <h3>升级到 Premium</h3>
      <p>按你的节奏选择套餐，后续开发者可自行修改文案和权益。</p>
    </section>

    <section class="plans">
      <article v-for="plan in plans" :key="plan.id" class="plan-card">
        <div class="plan-head">
          <h4>{{ plan.name }}</h4>
          <p>{{ plan.price }}</p>
        </div>
        <ul>
          <li v-for="item in plan.features" :key="item">{{ item }}</li>
        </ul>
        <button type="button">选择套餐</button>
      </article>
    </section>
  </section>
</template>

<script setup>
defineProps({
  plans: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
.premium-page {
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

.hero {
  padding: 16px 14px;
  border-bottom: 1px solid var(--x-border);
}

.hero h3 {
  margin: 0;
  font-size: clamp(22px, 6vw, 28px);
  font-weight: 800;
}

.hero p {
  margin: 8px 0 0;
  color: var(--x-muted);
  font-size: var(--x-fs-md);
}

.plans {
  padding: 12px 14px 80px;
  display: grid;
  gap: 12px;
}

.plan-card {
  border: 1px solid var(--x-border);
  border-radius: 14px;
  padding: 12px;
}

.plan-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
}

.plan-head h4 {
  margin: 0;
  font-size: var(--x-fs-lg);
  font-weight: 800;
}

.plan-head p {
  margin: 0;
  font-size: var(--x-fs-md);
  color: #0f1419;
  font-weight: 700;
}

.plan-card ul {
  margin: 10px 0;
  padding-left: 18px;
  color: #24303a;
  font-size: var(--x-fs-sm);
}

.plan-card li + li {
  margin-top: 6px;
}

.plan-card button {
  width: 100%;
  border: 0;
  height: 40px;
  border-radius: 20px;
  background: #0f1419;
  color: #fff;
  font-size: var(--x-fs-md);
  font-weight: 700;
}
</style>
