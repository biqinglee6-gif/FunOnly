<template>
  <section class="compose-page">
    <header class="compose-header">
      <button class="close-btn" type="button" aria-label="关闭" @click="$emit('close')">×</button>
      <button class="submit-btn" type="button" :disabled="!replyText.trim()" @click="handleSubmit">回复</button>
    </header>

    <main class="compose-main">
      <div class="context-line" />

      <div class="target-row">
        回复给 <span>{{ tweet?.user?.handle || '' }}</span>
      </div>

      <div class="composer-row">
        <img class="avatar" :src="currentUser.avatar" alt="avatar" />
        <textarea
          v-model="replyText"
          rows="5"
          placeholder="发布你的回复"
        />
      </div>
    </main>

    <footer class="toolbar">
      <button class="tool-btn" type="button">▣</button>
      <button class="tool-btn" type="button">GIF</button>
      <button class="tool-btn" type="button">☰</button>
      <button class="tool-btn" type="button">⌖</button>
    </footer>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  tweet: {
    type: Object,
    default: null,
  },
  currentUser: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close', 'submit-reply']);

const replyText = ref('');

watch(
  () => props.tweet?.id,
  () => {
    replyText.value = '';
  },
  { immediate: true }
);

const handleSubmit = () => {
  const content = replyText.value.trim();
  if (!content) return;
  emit('submit-reply', { content });
  replyText.value = '';
};
</script>

<style scoped>
.compose-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.compose-header {
  min-height: 56px;
  border-bottom: 1px solid var(--x-border);
  padding: calc(8px + var(--x-safe-top)) 14px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.close-btn,
.submit-btn,
.tool-btn {
  border: 0;
  background: transparent;
  font: inherit;
}

.close-btn {
  font-size: clamp(34px, 9vw, 42px);
  line-height: 1;
  color: #0f1419;
}

.submit-btn {
  min-width: 92px;
  height: 42px;
  padding: 0 16px;
  border-radius: 21px;
  background: #7fc9f6;
  color: #fff;
  font-size: var(--x-fs-lg);
  font-weight: 700;
}

.submit-btn:disabled {
  opacity: 0.55;
}

.compose-main {
  flex: 1;
  position: relative;
  padding: 14px 16px;
  overflow-y: auto;
}

.context-line {
  position: absolute;
  top: 0;
  left: 52px;
  width: 2px;
  height: 64px;
  background: #d7dfe4;
}

.target-row {
  margin-left: 66px;
  color: #657786;
  font-size: var(--x-fs-lg);
}

.target-row span {
  color: var(--x-blue);
}

.composer-row {
  margin-top: 12px;
  display: grid;
  grid-template-columns: 44px 1fr;
  gap: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

textarea {
  width: 100%;
  min-height: 160px;
  border: 0;
  resize: none;
  outline: none;
  font-size: var(--x-fs-xl);
  line-height: 1.35;
  color: #536471;
  padding-top: 4px;
}

textarea::placeholder {
  color: #5f7483;
  font-weight: 600;
}

.toolbar {
  min-height: 56px;
  border-top: 1px solid var(--x-border);
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px 16px calc(8px + var(--x-safe-bottom));
  background: #fff;
}

.tool-btn {
  color: var(--x-blue);
  font-size: var(--x-fs-lg);
  font-weight: 700;
}

@media (max-width: 360px) {
  .target-row {
    margin-left: 58px;
  }

  .context-line {
    left: 46px;
  }

  .composer-row {
    grid-template-columns: 38px 1fr;
  }

  .avatar {
    width: 34px;
    height: 34px;
  }
}
</style>
