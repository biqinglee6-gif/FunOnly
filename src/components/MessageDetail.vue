<template>
  <section class="message-detail-page" v-if="thread">
    <header class="detail-header">
      <button class="back-btn" type="button" aria-label="返回" @click="$emit('back')">←</button>
      <button class="thread-title" type="button" @click="$emit('open-profile', thread.handle)">
        <img class="thread-avatar" :src="thread.avatar" alt="avatar" />
        <div class="title-text">
          <strong>{{ thread.name }}</strong>
          <span>{{ thread.handle }}</span>
        </div>
      </button>
      <button class="more-btn" type="button" aria-label="更多">⋮</button>
    </header>

    <main class="message-scroll">
      <article
        v-for="msg in thread.messages || []"
        :key="msg.id"
        class="message-item"
        :class="{ me: msg.senderHandle === currentUser.handle }"
      >
        <div class="bubble">{{ msg.text }}</div>
        <div class="meta">{{ msg.time }}</div>
      </article>

      <p v-if="!(thread.messages || []).length" class="empty">暂无消息，发一条开始聊天吧。</p>
    </main>

    <footer class="composer">
      <input
        v-model="draft"
        type="text"
        placeholder="发送私信"
        @keyup.enter="send"
      />
      <button class="send-btn" type="button" :disabled="!draft.trim()" @click="send">发送</button>
    </footer>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  thread: {
    type: Object,
    default: null,
  },
  currentUser: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['back', 'send-message', 'open-profile']);

const draft = ref('');

watch(
  () => props.thread?.id,
  () => {
    draft.value = '';
  },
  { immediate: true }
);

const send = () => {
  const text = draft.value.trim();
  if (!text) return;
  emit('send-message', { text });
  draft.value = '';
};
</script>

<style scoped>
.message-detail-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.detail-header {
  min-height: 56px;
  display: grid;
  grid-template-columns: 34px 1fr 26px;
  gap: 8px;
  align-items: center;
  padding: calc(8px + var(--x-safe-top)) 12px 8px;
  border-bottom: 1px solid var(--x-border);
}

.back-btn,
.thread-title,
.more-btn,
.send-btn {
  border: 0;
  background: transparent;
  padding: 0;
}

.back-btn {
  font-size: clamp(28px, 7vw, 34px);
  color: #0f1419;
}

.thread-title {
  display: grid;
  grid-template-columns: 34px 1fr;
  align-items: center;
  gap: 8px;
  text-align: left;
}

.thread-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.title-text {
  min-width: 0;
}

.title-text strong {
  display: block;
  color: #0f1419;
  font-size: var(--x-fs-md);
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title-text span {
  display: block;
  color: #5b7083;
  font-size: var(--x-fs-sm);
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.more-btn {
  color: #8b98a5;
  font-size: 22px;
}

.message-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 12px 12px 16px;
  background: #f8fbff;
}

.message-item {
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.message-item.me {
  align-items: flex-end;
}

.bubble {
  max-width: 84%;
  padding: 10px 12px;
  border-radius: 16px;
  background: #edf2f7;
  color: #0f1419;
  font-size: var(--x-fs-md);
  line-height: 1.35;
  white-space: pre-wrap;
}

.message-item.me .bubble {
  background: #1d9bf0;
  color: #fff;
}

.meta {
  margin-top: 4px;
  color: #5b7083;
  font-size: var(--x-fs-xs);
}

.empty {
  margin: 18px 4px;
  color: #5b7083;
  font-size: var(--x-fs-sm);
}

.composer {
  min-height: 58px;
  border-top: 1px solid var(--x-border);
  background: #fff;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  align-items: center;
  padding: 8px 12px calc(8px + var(--x-safe-bottom));
}

.composer input {
  height: 40px;
  border: 1px solid #d9e2ea;
  border-radius: 20px;
  padding: 0 14px;
  outline: none;
  font-size: var(--x-fs-md);
}

.send-btn {
  min-width: 66px;
  height: 40px;
  border-radius: 20px;
  background: #1d9bf0;
  color: #fff;
  font-size: var(--x-fs-sm);
  font-weight: 700;
}

.send-btn:disabled {
  opacity: 0.5;
}
</style>
