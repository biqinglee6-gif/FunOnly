<template>
  <section class="notifications-page">
    <header class="page-header">
      <img class="me-avatar" :src="currentUserAvatar" alt="me" />
      <h2>通知</h2>
      <button class="gear-btn" type="button" aria-label="设置">⚙</button>
    </header>

    <nav class="tabs">
      <button class="tab active" type="button">全部</button>
      <button class="tab" type="button">已认证</button>
      <button class="tab" type="button">提及</button>
    </nav>

    <section class="list-wrap">
      <article
        v-for="item in items"
        :key="item.id"
        class="notice-item"
        @click="item.tweetId && $emit('open-tweet', item.tweetId)"
      >
        <template v-if="item.type === 'reply'">
          <img class="avatar" :src="item.actor.avatar" alt="avatar" @click.stop="$emit('open-profile', item.actor.handle)" />
          <div class="content reply-layout">
            <div class="head-row">
              <button class="user-btn" type="button" @click.stop="$emit('open-profile', item.actor.handle)">
                {{ item.actor.name }}
              </button>
              <span class="handle">{{ item.actor.handle }} · {{ item.time }}</span>
              <button class="more-btn" type="button" aria-label="更多" @click.stop>⋮</button>
            </div>
            <div class="reply-to">回复给 <span>{{ item.replyTo }}</span></div>
            <p class="text">{{ item.text }}</p>
            <div class="reply-actions">
              <span>◌ {{ item.stats?.replies ?? 0 }}</span>
              <span>↻ {{ item.stats?.reposts ?? 0 }}</span>
              <span>♡ {{ item.stats?.likes ?? 0 }}</span>
              <span>▥ {{ item.stats?.views ?? 0 }}</span>
              <span>⌑</span>
              <span>⤴</span>
            </div>
          </div>
        </template>

        <template v-else-if="item.type === 'like'">
          <div class="symbol heart">♥</div>
          <div class="content like-layout">
            <img class="avatar" :src="item.actor.avatar" alt="avatar" @click.stop="$emit('open-profile', item.actor.handle)" />
            <p class="like-line">
              <button class="user-btn" type="button" @click.stop="$emit('open-profile', item.actor.handle)">
                {{ item.actor.name }}
              </button>
              {{ item.text }}
            </p>
            <p class="preview">{{ item.preview || '。' }}</p>
          </div>
        </template>

        <template v-else>
          <div class="symbol star">✦</div>
          <div class="content system-layout">
            <div class="head-row">
              <img class="avatar" :src="item.actor.avatar" alt="avatar" @click.stop="$emit('open-profile', item.actor.handle)" />
              <button class="more-btn" type="button" aria-label="更多" @click.stop>⋮</button>
            </div>
            <p class="system-title">{{ item.actor.name }}</p>
            <p class="text">{{ item.text }}</p>
          </div>
        </template>
      </article>

      <p v-if="!items.length" class="empty">暂无通知</p>
    </section>
  </section>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  currentUserAvatar: {
    type: String,
    required: true,
  },
});

defineEmits(['open-tweet', 'open-profile']);
</script>

<style scoped>
.notifications-page {
  height: 100%;
  overflow-y: auto;
  background: #fff;
}

.page-header {
  min-height: 56px;
  display: grid;
  grid-template-columns: 36px 1fr 36px;
  align-items: center;
  gap: 10px;
  padding: calc(8px + var(--x-safe-top)) 14px 8px;
}

.me-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.page-header h2 {
  margin: 0;
  font-size: var(--x-fs-xl);
  font-weight: 800;
}

.gear-btn,
.tab,
.user-btn,
.more-btn {
  border: 0;
  background: transparent;
  padding: 0;
}

.gear-btn {
  font-size: 28px;
  color: #0f1419;
}

.tabs {
  border-bottom: 1px solid var(--x-border);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.tab {
  height: 50px;
  font-size: var(--x-fs-xl);
  font-weight: 700;
  color: #5f7483;
  position: relative;
}

.tab.active {
  color: #0f1419;
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 44%;
  height: 4px;
  background: var(--x-blue);
  border-radius: 999px;
}

.list-wrap {
  padding-bottom: 90px;
}

.notice-item {
  border-bottom: 1px solid var(--x-border);
  padding: 10px 14px;
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 10px;
}

.notice-item .avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.reply-layout {
  margin-left: 8px;
}

.head-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.user-btn {
  font-size: var(--x-fs-xl);
  font-weight: 800;
  color: #0f1419;
}

.handle {
  color: #5f7483;
  font-size: var(--x-fs-lg);
}

.more-btn {
  margin-left: auto;
  color: #97a4af;
  font-size: 22px;
}

.reply-to {
  color: #5f7483;
  font-size: var(--x-fs-lg);
}

.reply-to span {
  color: var(--x-blue);
}

.text,
.like-line,
.preview,
.system-title {
  margin: 0;
}

.text {
  margin-top: 4px;
  font-size: var(--x-fs-xl);
  color: #0f1419;
  line-height: 1.35;
}

.reply-actions {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  color: #5f7483;
  font-size: var(--x-fs-md);
}

.symbol {
  margin-top: 6px;
  font-size: 26px;
  line-height: 1;
}

.heart {
  color: #f91880;
}

.star {
  color: #7a4cc5;
}

.like-layout {
  margin-left: 8px;
}

.like-layout .avatar {
  margin-bottom: 8px;
}

.like-line {
  font-size: var(--x-fs-xl);
  font-weight: 700;
  color: #0f1419;
}

.preview {
  margin-top: 4px;
  color: #5f7483;
  font-size: var(--x-fs-lg);
}

.system-layout {
  margin-left: 8px;
}

.system-title {
  font-size: var(--x-fs-xl);
  font-weight: 800;
  color: #0f1419;
}

.empty {
  margin: 20px 14px;
  color: var(--x-muted);
  font-size: var(--x-fs-md);
}
</style>
