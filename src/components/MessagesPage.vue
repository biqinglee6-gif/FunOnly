<template>
  <section class="messages-page">
    <header class="page-header">
      <h2>私信</h2>
    </header>

    <section class="threads">
      <article v-for="item in threads" :key="item.id" class="thread-item" @click="$emit('open-thread', item.id)">
        <img class="avatar" :src="item.avatar" alt="avatar" @click.stop="$emit('open-profile', item.handle)" />
        <div class="body">
          <p class="top-line">
            <button class="name-btn" type="button" @click.stop="$emit('open-profile', item.handle)">
              {{ item.name }}
            </button>
            <span>{{ item.handle }}</span>
            <span>· {{ item.time }}</span>
          </p>
          <p class="preview">{{ item.preview }}</p>
        </div>
      </article>

      <p v-if="!threads.length" class="empty">还没有私信会话</p>
    </section>
  </section>
</template>

<script setup>
defineProps({
  threads: {
    type: Array,
    default: () => [],
  },
});

defineEmits(['open-thread', 'open-profile']);
</script>

<style scoped>
.messages-page {
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

.threads {
  padding-bottom: 80px;
}

.thread-item {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 10px;
  padding: 12px 14px;
  border-bottom: 1px solid var(--x-border);
  cursor: pointer;
}

.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
}

.top-line,
.preview {
  margin: 0;
}

.top-line {
  display: flex;
  gap: 6px;
  align-items: baseline;
  font-size: var(--x-fs-sm);
  color: var(--x-muted);
}

.top-line strong {
  color: #0f1419;
  font-size: var(--x-fs-md);
}

.name-btn {
  border: 0;
  background: transparent;
  padding: 0;
  color: #0f1419;
  font-size: var(--x-fs-md);
  font-weight: 700;
}

.preview {
  margin-top: 5px;
  color: #24303a;
  font-size: var(--x-fs-sm);
}

.empty {
  margin: 20px 14px;
  color: var(--x-muted);
  font-size: var(--x-fs-md);
}
</style>
