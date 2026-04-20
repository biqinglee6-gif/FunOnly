<template>
  <article class="tweet-card" @click="$emit('open', data.id)">
    <button class="avatar-link" type="button" @click.stop="$emit('open-profile', data.user.handle)">
      <img class="tweet-avatar" :src="data.user.avatar" alt="avatar" />
    </button>

    <div class="tweet-main">
      <header class="tweet-head">
        <div class="identity-row">
          <button class="user-link user-name" type="button" @click.stop="$emit('open-profile', data.user.handle)">
            {{ data.user.name }}
          </button>
          <span v-if="data.user.verified" class="verified">✔</span>
          <button class="user-link handle-link" type="button" @click.stop="$emit('open-profile', data.user.handle)">
            {{ data.user.handle }}
          </button>
          <span class="meta">· {{ data.time }}</span>
        </div>
        <button class="more-btn" type="button" aria-label="更多" @click.stop>⋮</button>
      </header>

      <div v-if="data.replyTo" class="reply-row">
        回复给
        <button class="reply-link" type="button" @click.stop="$emit('open-profile', extractFirstHandle(data.replyTo))">
          {{ data.replyTo }}
        </button>
      </div>

      <p class="tweet-text">{{ data.content }}</p>

      <div class="stat-row">
        <span>{{ data.stats.replies }} 转帖</span>
        <span>{{ data.stats.reposts }} 引用</span>
        <span>{{ formatLikes(data.stats.likes) }} 喜欢</span>
        <span>{{ data.stats.views }} 查看</span>
      </div>

      <div class="action-row">
        <button class="action-btn" type="button" @click.stop="$emit('comment', data.id)">◌</button>
        <button class="action-btn" type="button" @click.stop>↻</button>
        <button
          class="action-btn"
          type="button"
          :class="{ liked: data.isLikedByMe }"
          @click.stop="$emit('like', data.id)"
        >
          {{ data.isLikedByMe ? '♥' : '♡' }}
        </button>
        <button class="action-btn" type="button" @click.stop>⌑</button>
        <button class="action-btn" type="button" @click.stop>⤴</button>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
  },
});

defineEmits(['like', 'open', 'comment', 'open-profile']);

const extractFirstHandle = (text) => {
  const matched = String(text || '').match(/@[\w.]+/);
  return matched ? matched[0] : text;
};

const formatLikes = (value) => {
  if (value >= 10000) {
    return `${(value / 1000).toFixed(1)}k`;
  }
  return value.toLocaleString('zh-CN');
};
</script>

<style scoped>
.tweet-card {
  display: grid;
  grid-template-columns: 46px 1fr;
  gap: 8px;
  padding: 12px 12px;
  border-bottom: 1px solid var(--x-border);
  cursor: pointer;
}

.tweet-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

.avatar-link,
.user-link,
.reply-link {
  border: 0;
  background: transparent;
  padding: 0;
  cursor: pointer;
}

.avatar-link {
  width: 42px;
  height: 42px;
  display: block;
  align-self: start;
  overflow: hidden;
  border-radius: 50%;
}

.tweet-main {
  min-width: 0;
}

.tweet-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.identity-row {
  display: flex;
  align-items: center;
  min-width: 0;
  gap: 4px;
}

.user-name {
  font-weight: 800;
  font-size: var(--x-fs-lg);
  color: #0f1419;
  white-space: nowrap;
}

.handle-link {
  color: var(--x-muted);
  font-size: var(--x-fs-sm);
}

.verified {
  color: #f4b400;
  font-size: 14px;
}

.meta {
  color: var(--x-muted);
  font-size: var(--x-fs-sm);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.more-btn,
.action-btn {
  border: 0;
  background: transparent;
  padding: 0;
  cursor: pointer;
}

.more-btn {
  color: #8b98a5;
  font-size: 22px;
}

.reply-row {
  margin-bottom: 6px;
  font-size: var(--x-fs-sm);
  color: var(--x-muted);
}

.reply-row span {
  color: var(--x-blue);
}

.reply-link {
  color: var(--x-blue);
  margin-left: 4px;
  font-size: var(--x-fs-sm);
}

.tweet-text {
  margin: 0;
  white-space: pre-line;
  color: #0f1419;
  font-size: clamp(15px, 4vw, 18px);
  line-height: 1.35;
}

.stat-row {
  margin-top: 12px;
  min-height: 26px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  color: #536471;
  font-size: var(--x-fs-xs);
  border-top: 1px solid var(--x-border);
  border-bottom: 1px solid var(--x-border);
  padding: 8px 0;
}

.action-row {
  height: 36px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  color: #536471;
}

.action-btn {
  text-align: left;
  color: inherit;
  font-size: clamp(20px, 5.5vw, 24px);
}

.action-btn.liked {
  color: #f91880;
}
</style>