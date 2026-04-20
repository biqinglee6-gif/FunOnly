<template>
  <div class="sidebar-overlay" @click="$emit('close')">
    <aside class="sidebar-content" @click.stop>
      <div class="sidebar-header">
        <button class="avatar-trigger" type="button" @click="$emit('open-profile', profile.handle)">
          <img class="avatar-lg" :src="profile.avatar" alt="avatar" />
        </button>
        <button class="more-options" type="button" aria-label="更多">◉</button>
      </div>

      <button class="user-info" type="button" @click="$emit('open-profile', profile.handle)">
        <div class="name">{{ profile.name }}</div>
        <div class="handle">{{ profile.handle }}</div>
        <div class="stats">
          <span><strong>{{ profile.following }}</strong> 正在关注</span>
          <span><strong>{{ profile.followers }}</strong> 关注者</span>
        </div>
      </button>

      <div class="sidebar-menu">
        <button type="button" class="menu-item" @click="$emit('open-profile', profile.handle)"><span>◠</span>个人资料</button>
        <button type="button" class="menu-item" @click="$emit('navigate', 'premium')"><span>X</span>Premium</button>
        <button type="button" class="menu-item"><span>◍</span>社群</button>
        <button type="button" class="menu-item"><span>⌑</span>书签</button>
        <button type="button" class="menu-item"><span>☰</span>列表</button>
        <button type="button" class="menu-item"><span>◔</span>空间</button>
        <button type="button" class="menu-item"><span>⌬</span>创作者工作室</button>
      </div>

      <div class="support-row">
        设置 & 支持
        <span>﹀</span>
      </div>

      <button class="theme-btn" type="button" aria-label="主题">☼</button>
    </aside>
  </div>
</template>

<script setup>
defineProps({
  profile: {
    type: Object,
    required: true,
  },
});

defineEmits(['close', 'open-profile', 'navigate']);
</script>

<style scoped>
.sidebar-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 20, 25, 0.42);
  z-index: 20;
}

.sidebar-content {
  width: min(84vw, 330px);
  height: 100%;
  background: #fff;
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  box-shadow: 3px 0 20px rgba(0, 0, 0, 0.15);
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.avatar-lg {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-trigger {
  border: 0;
  background: transparent;
  padding: 0;
}

.more-options,
.menu-item,
.theme-btn {
  border: 0;
  background: transparent;
}

.more-options {
  font-size: 28px;
  color: #3a4550;
}

.user-info {
  border: 0;
  background: transparent;
  text-align: left;
  width: 100%;
  border-bottom: 1px solid var(--x-border);
  padding: 14px 0 16px;
}

.name {
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 2px;
}

.handle {
  font-size: 16px;
  color: var(--x-muted);
}

.stats {
  margin-top: 14px;
  display: flex;
  gap: 16px;
  font-size: 16px;
  color: var(--x-muted);
}

.stats strong {
  color: #0f1419;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 0 18px;
  border-bottom: 1px solid var(--x-border);
}

.menu-item {
  height: 50px;
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 21px;
  font-weight: 800;
  color: #0f1419;
  text-align: left;
}

.menu-item span {
  display: inline-block;
  width: 28px;
  text-align: center;
  color: #1f2933;
  font-size: 24px;
}

.support-row {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 19px;
  font-weight: 800;
  color: #0f1419;
}

.theme-btn {
  width: 34px;
  height: 34px;
  font-size: 32px;
  color: #3c4a59;
  margin-top: auto;
}
</style>