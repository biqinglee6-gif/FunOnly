<template>
  <div class="x-page">
    <header v-if="showHomeShell" class="x-header">
      <button class="avatar-btn" type="button" aria-label="打开菜单" @click="isSidebarOpen = true">
        <img class="avatar" :src="profile.avatar" alt="avatar" />
      </button>
      <div class="x-logo">Fun!Only</div>
      <div class="header-right">
        <button class="upgrade-btn" type="button">升级</button>
        <button class="icon-btn" type="button" aria-label="更多">⋮</button>
      </div>
    </header>

    <nav v-if="showHomeShell" class="x-tabs">
      <button class="x-tab" :class="{ active: activeFeedTab === 'forYou' }" type="button" @click="activeFeedTab = 'forYou'">为你推荐</button>
      <button class="x-tab" :class="{ active: activeFeedTab === 'following' }" type="button" @click="activeFeedTab = 'following'">正在关注</button>
    </nav>

    <main v-if="activeOverlay === null && activeMainPage === 'home'" ref="feedRef" class="x-feed">
      <Twicard
        v-for="tweet in displayedTweets"
        :key="tweet.id"
        :data="tweet"
        @like="handleLike"
        @open="openTweetDetail"
        @comment="openReplyComposer"
        @open-profile="openUserProfileByHandle"
      />
      <div class="feed-bottom-space" />
    </main>

    <SearchPage v-else-if="activeOverlay === null && activeMainPage === 'search'" :trends="searchTrends" />

    <PremiumPage v-else-if="activeOverlay === null && activeMainPage === 'premium'" :plans="premiumPlans" />

    <NotificationsPage
      v-else-if="activeOverlay === null && activeMainPage === 'notifications'"
      :items="notificationItems"
      :current-user-avatar="profile.avatar"
      @open-tweet="openTweetFromNotification"
      @open-profile="openUserProfileByHandle"
    />

    <MessagesPage
      v-else-if="activeOverlay === null && activeMainPage === 'messages'"
      :threads="messageThreads"
      @open-thread="openMessageThread"
      @open-profile="openUserProfileByHandle"
    />

    <MessageDetail
      v-else-if="activeOverlay === 'message-thread'"
      :thread="activeThread"
      :current-user="profile"
      @back="closeOverlay"
      @send-message="sendMessageInThread"
      @open-profile="openUserProfileByHandle"
    />

    <TweetDetail
      v-else-if="activeOverlay === 'detail'"
      :tweet="activeTweet"
      :replies="activeReplies"
      :current-user="profile"
      @back="closeOverlay"
      @like="handleLike"
      @submit-reply="submitReply"
      @open-profile="openUserProfileByHandle"
    />

    <UserProfilePage
      v-else-if="activeOverlay === 'profile'"
      :profile-data="activeProfileData"
      @back="closeOverlay"
      @open-tweet="openTweetDetail"
    />

    <ReplyComposer
      v-else
      :tweet="activeTweet"
      :current-user="profile"
      @close="closeOverlay"
      @submit-reply="submitReplyFromComposer"
    />

    <button
      v-if="activeOverlay === null && activeMainPage === 'home'"
      class="fab"
      type="button"
      aria-label="发帖"
    >
      +
    </button>

    <BottomNav
      v-if="activeOverlay === null"
      :active="activeMainPage"
      @navigate="handleBottomNavigate"
    />

    <Transition name="fade">
      <Sidebar
        v-if="isSidebarOpen"
        :profile="profile"
        @close="isSidebarOpen = false"
        @open-profile="openSidebarProfile"
        @navigate="handleSidebarNavigate"
      />
    </Transition>
  </div>
</template>

<script setup>
import { computed, nextTick, reactive, ref } from 'vue';
import BottomNav from './components/BottomNav.vue';
import MessageDetail from './components/MessageDetail.vue';
import MessagesPage from './components/MessagesPage.vue';
import NotificationsPage from './components/NotificationsPage.vue';
import PremiumPage from './components/PremiumPage.vue';
import ReplyComposer from './components/ReplyComposer.vue';
import SearchPage from './components/SearchPage.vue';
import Sidebar from './components/Sidebar.vue';
import Twicard from './components/Twicard.vue';
import TweetDetail from './components/TweetDetail.vue';
import UserProfilePage from './components/UserProfilePage.vue';
import {
  AUTO_REPLY_RULES_BY_TWEET,
  CURRENT_USER_PROFILE,
  FOLLOWING_TWEETS,
  FOR_YOU_TWEETS,
  INITIAL_NOTIFICATION_ITEMS,
  INITIAL_REPLIES_BY_TWEET,
  MESSAGE_THREADS,
  NOTIFY_TEMPLATES,
  PINNED_NOTIFY_TWEET_ID,
  PREMIUM_PLANS,
  SEARCH_TRENDS,
  USER_PROFILE_STORE,
} from './data/socialContent';

const isSidebarOpen = ref(false);
const activeMainPage = ref('home');
const activeOverlay = ref(null); // null | detail | compose | profile | message-thread
const selectedTweetId = ref(null);
const selectedThreadId = ref(null);
const selectedProfileHandle = ref('');
const profileBackContext = ref({ overlay: null, tweetId: null });
const activeFeedTab = ref('following');
const feedRef = ref(null);

const showHomeShell = computed(() => activeOverlay.value === null && activeMainPage.value === 'home');
const cloneSeed = (seed) => JSON.parse(JSON.stringify(seed));

const profile = reactive(cloneSeed(CURRENT_USER_PROFILE));
const userProfileStore = reactive(cloneSeed(USER_PROFILE_STORE));
const followingTweets = reactive(cloneSeed(FOLLOWING_TWEETS));
const forYouTweets = reactive(cloneSeed(FOR_YOU_TWEETS));
const searchTrends = reactive(cloneSeed(SEARCH_TRENDS));
const premiumPlans = reactive(cloneSeed(PREMIUM_PLANS));
const messageThreads = reactive(cloneSeed(MESSAGE_THREADS));
const pinnedNotifyTweetId = PINNED_NOTIFY_TWEET_ID;
const notifyTemplates = reactive(cloneSeed(NOTIFY_TEMPLATES));
const notificationItems = reactive(cloneSeed(INITIAL_NOTIFICATION_ITEMS));
const autoReplyRulesByTweet = reactive(cloneSeed(AUTO_REPLY_RULES_BY_TWEET));
const repliesByTweet = reactive(cloneSeed(INITIAL_REPLIES_BY_TWEET));

const allTweets = computed(() => [...followingTweets, ...forYouTweets]);
const displayedTweets = computed(() => (activeFeedTab.value === 'forYou' ? forYouTweets : followingTweets));
const activeTweet = computed(() => allTweets.value.find((item) => item.id === selectedTweetId.value) || null);
const activeReplies = computed(() => repliesByTweet[selectedTweetId.value] || []);
const activeThread = computed(() => messageThreads.find((item) => item.id === selectedThreadId.value) || null);
const activeProfileData = computed(() => {
  const key = normalizeHandle(selectedProfileHandle.value);
  return key ? userProfileStore[key] || null : null;
});

function normalizeHandle(handle) {
  return String(handle || '')
    .trim()
    .replace(/^@/, '')
    .toLowerCase();
}

function findUserByHandle(handle) {
  const normalized = normalizeHandle(handle);
  const replyUsers = Object.values(repliesByTweet)
    .flat()
    .map((item) => item.user);
  const tweetUsers = allTweets.value.map((item) => item.user);
  return [...tweetUsers, ...replyUsers].find((user) => normalizeHandle(user.handle) === normalized) || null;
}

function ensureProfileRecord(handle) {
  const normalized = normalizeHandle(handle);
  if (!normalized) return;
  if (userProfileStore[normalized]) return;

  const foundUser = findUserByHandle(handle);
  const displayHandle = handle?.startsWith('@') ? handle : `@${normalized}`;
  userProfileStore[normalized] = {
    name: foundUser?.name || normalized,
    handle: foundUser?.handle || displayHandle,
    avatar: foundUser?.avatar || profile.avatar,
    cover: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80',
    verified: false,
    bio: '开发者可编辑该账号主页简介。',
    category: '账号分类占位',
    joinedAt: '2026年4月 加入',
    following: 0,
    followers: 0,
    posts: [{ id: Date.now(), pinned: true, text: '开发者可编辑：主页帖子内容占位', time: '刚刚', stats: { replies: 0, reposts: 0, likes: 0, views: '1' } }],
    replies: [{ id: Date.now() + 1, text: '开发者可编辑：主页回复内容占位', time: '刚刚', replyTo: profile.handle, stats: { replies: 0, reposts: 0, likes: 0, views: '1' } }],
  };
}

const handleLike = (tweetId) => {
  const tweet = allTweets.value.find((item) => item.id === tweetId) ||
    Object.values(repliesByTweet).flat().find((item) => item.id === tweetId);

  if (!tweet) return;
  tweet.isLikedByMe = !tweet.isLikedByMe;
  tweet.stats.likes += tweet.isLikedByMe ? 1 : -1;
};

const openTweetDetail = (tweetId) => {
  selectedTweetId.value = tweetId;
  if (!repliesByTweet[tweetId]) repliesByTweet[tweetId] = [];
  activeOverlay.value = 'detail';
};

const openReplyComposer = (tweetId) => {
  selectedTweetId.value = tweetId;
  if (!repliesByTweet[tweetId]) repliesByTweet[tweetId] = [];
  activeOverlay.value = 'compose';
};

const openUserProfileByHandle = (handle) => {
  const normalized = normalizeHandle(handle);
  if (!normalized) return;

  isSidebarOpen.value = false;
  ensureProfileRecord(normalized);
  selectedProfileHandle.value = normalized;
  profileBackContext.value = {
    overlay: activeOverlay.value,
    tweetId: selectedTweetId.value,
  };
  activeOverlay.value = 'profile';
};

const openSidebarProfile = (handle) => {
  openUserProfileByHandle(handle || profile.handle);
};

const handleSidebarNavigate = (target) => {
  isSidebarOpen.value = false;
  if (!target) return;
  activeOverlay.value = null;
  activeMainPage.value = target;
};

const openMessageThread = (threadId) => {
  selectedThreadId.value = threadId;
  activeOverlay.value = 'message-thread';
};

const sendMessageInThread = (payload) => {
  if (!activeThread.value) return;
  const text = String(payload?.text || '').trim();
  if (!text) return;

  if (!Array.isArray(activeThread.value.messages)) {
    activeThread.value.messages = [];
  }

  activeThread.value.messages.push({
    id: Date.now(),
    senderHandle: profile.handle,
    text,
    time: '刚刚',
  });

  activeThread.value.preview = text;
  activeThread.value.time = '刚刚';
};

const openTweetFromNotification = (tweetId) => {
  if (!tweetId) return;
  openTweetDetail(tweetId);
};

const closeOverlay = () => {
  if (activeOverlay.value === 'profile' && profileBackContext.value.overlay) {
    selectedTweetId.value = profileBackContext.value.tweetId;
    activeOverlay.value = profileBackContext.value.overlay;
    profileBackContext.value = { overlay: null, tweetId: null };
    return;
  }

  profileBackContext.value = { overlay: null, tweetId: null };
  selectedThreadId.value = null;
  activeOverlay.value = null;
};

const injectNotifyItemsForReply = (tweetId) => {
  if (tweetId !== pinnedNotifyTweetId) return;

  notifyTemplates.forEach((tpl, index) => {
    const id = `${tpl.id}-${Date.now()}-${index}`;
    notificationItems.unshift({
      id,
      type: tpl.type,
      actor: tpl.actor,
      text: tpl.text,
      time: '刚刚',
      tweetId,
      replyTo: tpl.replyTo,
      stats: tpl.stats || { replies: 0, reposts: 0, likes: 0, views: '0' },
    });
  });
};

const submitReply = (payload) => {
  if (!activeTweet.value) return;
  const text = payload.content.trim();
  if (!text) return;

  const targetTweetId = activeTweet.value.id;
  const newReplyId = Date.now();
  const newReply = {
    id: newReplyId,
    parentId: null,
    user: {
      name: profile.name,
      handle: profile.handle,
      avatar: profile.avatar,
    },
    time: '刚刚',
    replyTo: activeTweet.value.user.handle,
    content: text,
    stats: { replies: 0, reposts: 0, likes: 0, views: '0' },
    isLikedByMe: false,
  };

  repliesByTweet[targetTweetId].unshift(newReply);

  const templates = autoReplyRulesByTweet[targetTweetId]?.length
    ? autoReplyRulesByTweet[targetTweetId]
    : autoReplyRulesByTweet.default;

  const autoReplies = templates.map((tpl, index) => ({
    id: newReplyId + index + 1,
    parentId: newReplyId,
    user: {
      name: tpl.actor.name,
      handle: tpl.actor.handle,
      avatar: tpl.actor.avatar,
    },
    time: '刚刚',
    replyTo: profile.handle,
    content: tpl.text,
    stats: { replies: 0, reposts: 0, likes: 0, views: '0' },
    isLikedByMe: false,
  }));

  if (autoReplies.length) {
    repliesByTweet[targetTweetId].unshift(...autoReplies);
  }

  activeTweet.value.stats.replies += 1 + autoReplies.length;
  injectNotifyItemsForReply(targetTweetId);
};

const submitReplyFromComposer = (payload) => {
  submitReply(payload);
  activeOverlay.value = 'detail';
};

const scrollFeedTop = (smooth = true) => {
  if (!feedRef.value) return;
  feedRef.value.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
};

const handleBottomNavigate = async (target) => {
  isSidebarOpen.value = false;

  if (target === 'home') {
    if (activeMainPage.value !== 'home') {
      activeMainPage.value = 'home';
      await nextTick();
      scrollFeedTop(false);
      return;
    }

    await nextTick();
    scrollFeedTop(true);
    return;
  }

  activeMainPage.value = target;
};
</script>

<style scoped>
.x-page {
  width: 100%;
  max-width: var(--x-max-width);
  height: 100svh;
  margin: 0 auto;
  background: var(--x-bg);
  color: var(--x-text);
  display: flex;
  flex-direction: column;
  position: relative;
  border-left: 1px solid var(--x-border);
  border-right: 1px solid var(--x-border);
  overflow: hidden;
}

.x-header {
  min-height: 56px;
  display: grid;
  grid-template-columns: 40px 1fr auto;
  align-items: center;
  padding: calc(8px + var(--x-safe-top)) 12px 8px;
  background: rgba(255, 255, 255, 0.96);
  border-bottom: 1px solid var(--x-border);
}

.avatar-btn,
.icon-btn,
.x-tab,
.upgrade-btn,
.fab {
  border: 0;
  background: transparent;
  padding: 0;
  cursor: pointer;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.x-logo {
  text-align: center;
  font-size: clamp(18px, 3vw, 22px);
  font-weight: 700;
  color: #0f1419;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.upgrade-btn {
  font-size: var(--x-fs-md);
  font-weight: 700;
  color: #0f1419;
}

.icon-btn {
  width: 24px;
  font-size: 24px;
  line-height: 1;
  color: #0f1419;
}

.x-tabs {
  height: 52px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid var(--x-border);
}

.x-tab {
  font-size: var(--x-fs-lg);
  font-weight: 700;
  color: var(--x-muted);
  position: relative;
}

.x-tab.active {
  color: #0f1419;
}

.x-tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 72%;
  height: 4px;
  border-radius: 999px;
  background: var(--x-blue);
}

.x-feed {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.feed-bottom-space {
  height: 14px;
}

.fab {
  position: absolute;
  right: 18px;
  bottom: calc(78px + var(--x-safe-bottom));
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--x-blue);
  color: #fff;
  font-size: 36px;
  line-height: 52px;
  box-shadow: 0 10px 24px rgba(29, 155, 240, 0.35);
  z-index: 8;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
