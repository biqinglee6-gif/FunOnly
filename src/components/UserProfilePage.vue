<template>
  <section class="profile-page" v-if="profileData">
    <header class="profile-cover" :style="coverStyle">
      <button class="floating-btn" type="button" aria-label="返回" @click="$emit('back')">←</button>
      <div class="cover-actions">
        <button class="floating-btn" type="button" aria-label="搜索">⌕</button>
        <button class="floating-btn" type="button" aria-label="更多">⋮</button>
      </div>
      <img class="cover-avatar" :src="profileData.avatar" alt="avatar" />
    </header>

    <main class="profile-scroll">
      <section class="profile-meta">
        <button class="follow-btn" :class="{ following: isFollowing }" type="button" @click="toggleFollow">
          {{ isFollowing ? '正在关注' : '关注' }}
        </button>

        <div class="name-row">
          <span class="name">{{ profileData.name }}</span>
          <span v-if="profileData.verified" class="verified">✔</span>
        </div>
        <div class="handle">{{ profileData.handle }}</div>
        <p class="bio">{{ profileData.bio }}</p>

        <div class="extra-row">◫ {{ profileData.category }} · {{ profileData.joinedAt }}</div>
        <div class="follow-row">
          <span><strong>{{ formatNumber(profileData.following) }}</strong> 正在关注</span>
          <span><strong>{{ formatNumber(profileData.followers) }}</strong> 关注者</span>
        </div>
      </section>

      <nav class="tabs">
        <button class="tab" :class="{ active: activeTab === 'posts' }" type="button" @click="activeTab = 'posts'">帖子</button>
        <button class="tab" :class="{ active: activeTab === 'replies' }" type="button" @click="activeTab = 'replies'">回复</button>
      </nav>

      <section class="timeline">
        <article
          v-for="item in activeItems"
          :key="item.id"
          class="entry"
          @click="handleOpenEntry(item)"
        >
          <div v-if="item.pinned" class="pinned-row">⚑ 已置顶</div>

          <div class="entry-head">
            <img class="entry-avatar" :src="profileData.avatar" alt="avatar" />
            <div class="entry-meta">
              <span class="entry-name">{{ profileData.name }}</span>
              <span class="entry-handle">{{ profileData.handle }} · {{ item.time }}</span>
            </div>
            <button class="more-btn" type="button" aria-label="更多" @click.stop>⋮</button>
          </div>

          <div v-if="item.replyTo" class="reply-to">回复给 {{ item.replyTo }}</div>

          <p class="entry-text">{{ item.text }}</p>

          <ul v-if="item.links?.length" class="link-list">
            <li v-for="(link, idx) in item.links" :key="idx">
              <a href="#" @click.stop.prevent>{{ link }}</a>
            </li>
          </ul>

          <img v-if="item.media" class="entry-media" :src="item.media" alt="media" />

          <div v-else-if="item.mediaList?.length" class="media-grid">
            <img
              v-for="(media, idx) in item.mediaList.slice(0, 4)"
              :key="idx"
              class="grid-item"
              :src="media"
              alt="media"
            />
          </div>

          <div v-if="item.stats" class="action-row">
            <span>◌ {{ item.stats.replies }}</span>
            <span>↻ {{ item.stats.reposts }}</span>
            <span>♡ {{ item.stats.likes }}</span>
            <span>▥ {{ item.stats.views }}</span>
          </div>
        </article>

        <p v-if="!activeItems.length" class="empty">开发者可在该账号的 {{ activeTab === 'posts' ? '帖子' : '回复' }} 数组中补充内容。</p>
      </section>
    </main>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
  profileData: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['back', 'open-tweet']);

const activeTab = ref('posts');
const isFollowing = ref(false);

watch(
  () => props.profileData?.handle,
  () => {
    isFollowing.value = Boolean(props.profileData?.isFollowing);
  },
  { immediate: true }
);

const activeItems = computed(() => {
  if (!props.profileData) return [];
  return activeTab.value === 'posts' ? props.profileData.posts || [] : props.profileData.replies || [];
});

const coverStyle = computed(() => ({
  backgroundImage: `url(${props.profileData?.cover || ''})`,
}));

const formatNumber = (value) => {
  const n = Number(value) || 0;
  return n.toLocaleString('zh-CN');
};

const handleOpenEntry = (item) => {
  if (!item?.tweetId) return;
  emit('open-tweet', item.tweetId);
};

const toggleFollow = () => {
  isFollowing.value = !isFollowing.value;
  if (props.profileData) {
    props.profileData.isFollowing = isFollowing.value;
  }
};
</script>

<style scoped>
.profile-page {
  height: 100%;
  background: #fff;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.profile-cover {
  height: 180px;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: calc(10px + var(--x-safe-top)) 12px 0;
  position: relative;
  z-index: 1;
  overflow: visible;
}

.cover-avatar {
  width: 92px;
  height: 92px;
  border-radius: 50%;
  border: 4px solid #fff;
  object-fit: cover;
  position: absolute;
  left: 14px;
  bottom: -46px;
  z-index: 6;
}

.floating-btn,
.more-btn,
.tab,
.follow-btn {
  border: 0;
  background: transparent;
}

.cover-actions {
  display: flex;
  gap: 8px;
}

.floating-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(15, 20, 25, 0.72);
  color: #fff;
  font-size: 30px;
  line-height: 1;
}

.profile-scroll {
  overflow: visible;
}

.profile-meta {
  padding: 12px 14px 10px;
  position: relative;
  z-index: 3;
  margin-top: 0;
  padding-top: 56px;
}

.follow-btn {
  float: right;
  margin-top: 10px;
  min-width: 104px;
  height: 44px;
  border-radius: 22px;
  background: #0f1419;
  color: #fff;
  font-size: var(--x-fs-lg);
  font-weight: 800;
}

.follow-btn.following {
  background: #ffffff;
  color: #0f1419;
  border: 1px solid var(--x-border);
}

.name-row {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.name {
  font-size: var(--x-fs-xl);
  font-weight: 800;
}

.verified {
  color: var(--x-blue);
  font-size: 16px;
}

.handle {
  margin-top: 2px;
  color: var(--x-muted);
  font-size: var(--x-fs-lg);
}

.bio {
  margin: 12px 0;
  white-space: pre-line;
  line-height: 1.35;
  color: #0f1419;
  font-size: var(--x-fs-lg);
}

.extra-row {
  color: #5f7483;
  font-size: var(--x-fs-md);
}

.follow-row {
  margin-top: 10px;
  display: flex;
  gap: 18px;
  color: #5f7483;
  font-size: var(--x-fs-md);
}

.follow-row strong {
  color: #0f1419;
}

.tabs {
  border-top: 1px solid var(--x-border);
  border-bottom: 1px solid var(--x-border);
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.tab {
  height: 52px;
  font-size: var(--x-fs-xl);
  font-weight: 700;
  color: #5b7083;
  position: relative;
}

.tab.active {
  color: #0f1419;
}

.tab.active::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  width: 46%;
  height: 4px;
  border-radius: 999px;
  background: var(--x-blue);
}

.timeline {
  padding-bottom: 80px;
}

.entry {
  border-bottom: 1px solid var(--x-border);
  padding: 12px 14px;
}

.pinned-row {
  color: #5f7483;
  font-size: var(--x-fs-sm);
  font-weight: 700;
  margin-bottom: 6px;
}

.entry-head {
  display: grid;
  grid-template-columns: 42px 1fr 18px;
  align-items: center;
  gap: 8px;
}

.entry-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.entry-name {
  font-size: var(--x-fs-lg);
  font-weight: 800;
  color: #0f1419;
}

.entry-handle {
  margin-left: 6px;
  color: #5b7083;
  font-size: var(--x-fs-sm);
}

.more-btn {
  color: #8b98a5;
  font-size: 20px;
}

.entry-text {
  margin: 8px 0 0;
  white-space: pre-line;
  color: #0f1419;
  font-size: var(--x-fs-lg);
  line-height: 1.35;
}

.reply-to {
  margin-top: 6px;
  color: #5f7483;
  font-size: var(--x-fs-sm);
}

.link-list {
  list-style: none;
  margin: 8px 0 0;
  padding: 0;
}

.link-list li {
  margin-top: 4px;
}

.link-list a {
  color: var(--x-blue);
  text-decoration: none;
  font-size: var(--x-fs-lg);
}

.entry-media {
  margin-top: 10px;
  width: 100%;
  border-radius: 14px;
  border: 1px solid var(--x-border);
}

.media-grid {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid var(--x-border);
}

.grid-item {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

.action-row {
  margin-top: 10px;
  display: flex;
  gap: 14px;
  color: #5f7483;
  font-size: var(--x-fs-md);
}

.empty {
  margin: 18px 14px;
  color: #5b7083;
  font-size: var(--x-fs-md);
}
</style>
