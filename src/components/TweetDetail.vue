<template>
  <section class="detail-page">
    <header class="detail-header">
      <button class="back-btn" type="button" aria-label="返回" @click="$emit('back')">←</button>
      <h2>发帖</h2>
    </header>

    <div class="detail-scroll">
      <article v-if="tweet" class="detail-post">
        <header class="post-head">
          <button class="user-link" type="button" @click="$emit('open-profile', tweet.user.handle)">
            <img class="avatar" :src="tweet.user.avatar" alt="avatar" />
          </button>
          <div class="user-block">
            <div class="name-row">
              <button class="user-link name" type="button" @click="$emit('open-profile', tweet.user.handle)">
                {{ tweet.user.name }}
              </button>
              <span v-if="tweet.user.verified" class="verified">✔</span>
            </div>
            <button class="user-link handle" type="button" @click="$emit('open-profile', tweet.user.handle)">
              {{ tweet.user.handle }}
            </button>
          </div>
          <button class="more-btn" type="button" aria-label="更多">⋮</button>
        </header>

        <div class="post-content-container">
          <div class="post-text">{{ tweet.content }}</div>
        </div>

        <figure v-if="tweet.media?.url" class="media-container">
          <img :src="tweet.media.url" :alt="tweet.media.alt || 'media'" />
        </figure>

        <div class="source-row">来自 {{ tweet.source }}</div>
        <div class="time-row">{{ tweet.publishAt }} · <strong>{{ tweet.stats.views }}</strong> 查看</div>

        <div class="count-row">
          <span><strong>{{ tweet.stats.replies }}</strong> 转帖</span>
          <span><strong>{{ tweet.stats.reposts }}</strong> 引用</span>
          <span><strong>{{ tweet.stats.likes }}</strong> 喜欢</span>
        </div>

        <div class="action-row">
          <button class="action-btn" type="button">◌</button>
          <button class="action-btn" type="button">↻</button>
          <button
            class="action-btn"
            type="button"
            :class="{ liked: tweet.isLikedByMe }"
            @click="$emit('like', tweet.id)"
          >
            {{ tweet.isLikedByMe ? '♥' : '♡' }}
          </button>
          <button class="action-btn" type="button">⌑</button>
          <button class="action-btn" type="button">⤴</button>
        </div>
      </article>

      <section class="reply-block">
        <div class="reply-title">最相关的回复</div>

        <article v-for="reply in topLevelReplies" :key="reply.id" class="reply-item">
          <button class="user-link" type="button" @click="$emit('open-profile', reply.user.handle)">
            <img class="avatar" :src="reply.user.avatar" alt="avatar" />
          </button>
          <div class="reply-main">
            <div class="reply-top">
              <button class="user-link name" type="button" @click="$emit('open-profile', reply.user.handle)">
                {{ reply.user.name }}
              </button>
              <span class="meta">
                <button class="user-link handle" type="button" @click="$emit('open-profile', reply.user.handle)">
                  {{ reply.user.handle }}
                </button>
                · {{ reply.time }}
              </span>
              <button class="more-btn" type="button" aria-label="更多">⋮</button>
            </div>

            <div v-if="reply.replyTo" class="reply-to">
              回复给
              <button
                class="user-link mention-link"
                type="button"
                @click="$emit('open-profile', extractFirstHandle(reply.replyTo))"
              >
                {{ reply.replyTo }}
              </button>
            </div>

            <div class="reply-content-container">
              <p>{{ reply.content }}</p>
            </div>

            <div class="reply-actions">
              <button class="action-btn" type="button">◌ {{ reply.stats.replies }}</button>
              <button class="action-btn" type="button">↻ {{ reply.stats.reposts }}</button>
              <button
                class="action-btn"
                type="button"
                :class="{ liked: reply.isLikedByMe }"
                @click="$emit('like', reply.id)"
              >
                {{ reply.isLikedByMe ? '♥' : '♡' }} {{ reply.stats.likes }}
              </button>
              <span class="views">▥ {{ reply.stats.views }}</span>
            </div>

            <section v-if="getChildReplies(reply.id).length" class="child-replies">
              <article v-for="child in getChildReplies(reply.id)" :key="child.id" class="child-item">
                <button class="user-link" type="button" @click="$emit('open-profile', child.user.handle)">
                  <img class="avatar child-avatar" :src="child.user.avatar" alt="avatar" />
                </button>
                <div class="child-main">
                  <div class="reply-top">
                    <button class="user-link name" type="button" @click="$emit('open-profile', child.user.handle)">
                      {{ child.user.name }}
                    </button>
                    <span class="meta">
                      <button class="user-link handle" type="button" @click="$emit('open-profile', child.user.handle)">
                        {{ child.user.handle }}
                      </button>
                      · {{ child.time }}
                    </span>
                    <button class="more-btn" type="button" aria-label="更多">⋮</button>
                  </div>
                  <div v-if="child.replyTo" class="reply-to">
                    回复给
                    <button
                      class="user-link mention-link"
                      type="button"
                      @click="$emit('open-profile', extractFirstHandle(child.replyTo))"
                    >
                      {{ child.replyTo }}
                    </button>
                  </div>
                  <div class="reply-content-container">
                    <p>{{ child.content }}</p>
                  </div>
                  <div class="reply-actions">
                    <button class="action-btn" type="button">◌ {{ child.stats.replies }}</button>
                    <button class="action-btn" type="button">↻ {{ child.stats.reposts }}</button>
                    <button
                      class="action-btn"
                      type="button"
                      :class="{ liked: child.isLikedByMe }"
                      @click="$emit('like', child.id)"
                    >
                      {{ child.isLikedByMe ? '♥' : '♡' }} {{ child.stats.likes }}
                    </button>
                    <span class="views">▥ {{ child.stats.views }}</span>
                  </div>
                </div>
              </article>
            </section>
          </div>
        </article>
      </section>
    </div>

    <footer class="reply-input-wrap">
      <input
        v-model="replyText"
        type="text"
        placeholder="发布你的回复"
        @keyup.enter="handleSubmit"
      />
      <button class="send-btn" type="button" @click="handleSubmit">发送</button>
    </footer>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
  tweet: {
    type: Object,
    default: null,
  },
  replies: {
    type: Array,
    default: () => [],
  },
  currentUser: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['back', 'like', 'submit-reply', 'open-profile']);

const replyText = ref('');

const topLevelReplies = computed(() => props.replies.filter((reply) => !reply.parentId));

const getChildReplies = (parentId) => props.replies.filter((reply) => reply.parentId === parentId);

const extractFirstHandle = (text) => {
  const matched = String(text || '').match(/@[\w.]+/);
  return matched ? matched[0] : text;
};

watch(
  () => props.tweet?.id,
  () => {
    replyText.value = '';
  }
);

const handleSubmit = () => {
  const text = replyText.value.trim();
  if (!text) return;

  emit('submit-reply', {
    content: text,
    authorName: props.currentUser.name,
    authorHandle: props.currentUser.handle,
  });

  replyText.value = '';
};
</script>

<style scoped>
.detail-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.detail-header {
  min-height: 56px;
  display: grid;
  grid-template-columns: 38px 1fr;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid var(--x-border);
  padding: calc(8px + var(--x-safe-top)) 12px 8px;
}

.back-btn,
.more-btn,
.action-btn,
.send-btn {
  border: 0;
  background: transparent;
  padding: 0;
}

.user-link {
  border: 0;
  background: transparent;
  padding: 0;
  margin: 0;
  text-align: left;
}

.back-btn {
  font-size: clamp(30px, 8vw, 36px);
  line-height: 1;
  color: #0f1419;
}

.detail-header h2 {
  margin: 0;
  font-size: clamp(24px, 6vw, 32px);
  line-height: 1;
  font-weight: 800;
}

.detail-scroll {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.detail-post {
  border-bottom: 1px solid var(--x-border);
  padding: 14px;
}

.post-head {
  display: grid;
  grid-template-columns: 48px 1fr 20px;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
}

.user-block {
  min-width: 0;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 4px;
}

.name {
  font-size: var(--x-fs-xl);
  font-weight: 800;
  color: #0f1419;
}

.verified {
  color: #f4b400;
  font-size: 14px;
}

.handle,
.meta {
  color: var(--x-muted);
  font-size: var(--x-fs-sm);
}

.more-btn {
  color: #8b98a5;
  font-size: 22px;
}

.post-content-container {
  margin-top: 12px;
}

.post-text {
  white-space: pre-line;
  font-size: clamp(17px, 4.6vw, 21px);
  line-height: 1.38;
  color: #0f1419;
}

.media-container {
  margin: 12px 0 0;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--x-border);
}

.media-container img {
  display: block;
  width: 100%;
  height: auto;
}

.source-row {
  margin-top: 10px;
  font-size: var(--x-fs-md);
  color: var(--x-muted);
}

.time-row {
  margin-top: 8px;
  font-size: var(--x-fs-md);
  color: #536471;
}

.time-row strong {
  color: #0f1419;
}

.count-row {
  margin-top: 10px;
  border-top: 1px solid var(--x-border);
  border-bottom: 1px solid var(--x-border);
  padding: 10px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-size: var(--x-fs-sm);
  color: #536471;
}

.count-row strong {
  color: #0f1419;
}

.action-row {
  height: 40px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
}

.action-btn {
  font-size: clamp(22px, 5.6vw, 26px);
  color: #536471;
  text-align: left;
}

.action-btn.liked {
  color: #f91880;
}

.reply-block {
  padding-bottom: 6px;
}

.reply-title {
  border-bottom: 1px solid var(--x-border);
  padding: 14px;
  font-size: var(--x-fs-xl);
  font-weight: 800;
  color: #0f1419;
}

.reply-item {
  border-bottom: 1px solid var(--x-border);
  display: grid;
  grid-template-columns: 46px 1fr;
  gap: 10px;
  padding: 12px 14px;
}

.reply-main {
  min-width: 0;
}

.reply-top {
  display: grid;
  grid-template-columns: auto 1fr 16px;
  align-items: center;
  gap: 6px;
}

.reply-to {
  margin-top: 4px;
  font-size: var(--x-fs-sm);
  color: var(--x-muted);
}

.reply-to span {
  color: var(--x-blue);
}

.mention-link {
  color: var(--x-blue);
  margin-left: 4px;
  font-size: var(--x-fs-sm);
}

.reply-content-container {
  margin-top: 6px;
}

.reply-content-container p {
  margin: 0;
  white-space: pre-line;
  color: #0f1419;
  font-size: clamp(16px, 4.2vw, 20px);
  line-height: 1.35;
}

.reply-actions {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 8px;
}

.reply-actions .action-btn {
  font-size: var(--x-fs-md);
}

.views {
  margin-left: auto;
  color: #536471;
  font-size: var(--x-fs-sm);
}

.reply-input-wrap {
  min-height: 60px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 8px;
  border-top: 1px solid var(--x-border);
  padding: 8px 12px calc(8px + var(--x-safe-bottom));
  background: #fff;
}

.child-replies {
  margin-top: 8px;
  margin-left: 8px;
  border-left: 2px solid #d9e2e8;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.child-item {
  display: grid;
  grid-template-columns: 38px 1fr;
  gap: 8px;
}

.child-avatar {
  width: 34px;
  height: 34px;
}

.child-main {
  min-width: 0;
}

.reply-input-wrap input {
  height: 40px;
  border: 0;
  border-bottom: 2px solid #dce4e8;
  font-size: var(--x-fs-md);
  color: #0f1419;
  outline: none;
}

.reply-input-wrap input::placeholder {
  color: #657786;
}

.send-btn {
  height: 34px;
  padding: 0 14px;
  border-radius: 18px;
  background: var(--x-blue);
  color: #fff;
  font-size: var(--x-fs-sm);
  font-weight: 700;
}

@media (max-width: 360px) {
  .post-text,
  .reply-content-container p {
    font-size: 18px;
  }
}
</style>
