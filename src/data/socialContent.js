export const CURRENT_USER_PROFILE = {
  name: 'theRisingGrace',
  handle: '@BiqingLee',
  avatar: '../../photo/EB4CC4CD4A39F547CBB1826A15425026.jpg',
  following: 2,
  followers: 0,
};

// 开发者维护入口 1：按账号维护主页信息（key 为去掉 @ 后的小写 handle）
export const USER_PROFILE_STORE = {
  biqinglee: {
    name: 'theRisingGrace',
    handle: '@BiqingLee',
    avatar: '../../photo/EB4CC4CD4A39F547CBB1826A15425026.jpg',
    cover: '../../photo/007ZgaBFly1i63xqv74joj32bc38oe83.jpg',
    verified: false,
    bio: '爱狗人士',
    category: '创作者',
    joinedAt: '2024年6月 加入',
    following: 2,
    followers: 0,
    posts: [
      {
        id: 9001,
        pinned: true,
        text: '这是我的主页帖子占位。',
        time: '1小时',
        links: ['https://example.com/demo-post'],
        stats: { replies: 2, reposts: 1, likes: 4, views: '138' },
      },
    ],
    replies: [
      {
        id: 9101,
        text: '这是我的主页回复占位。',
        time: '刚刚',
      },
    ],
  },
  lars0421: {
    name: 'Lars',
    handle: '@lars0421',
    avatar: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=120&q=80',
    cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1400&q=80',
    verified: true,
    bio: '合作请私信@superlarssss0421',
    category: '音乐',
    joinedAt: '2018年11月 加入',
    following: 8,
    followers: 42100,
    posts: [
    {
        id: 9003,
        pinned: true,
        text: 'HelloTtttttest！',
        time: '1小时',
        links: ['https://example.com/demo-post'],
        stats: { replies: 2, reposts: 1, likes: 4, views: '138' },
      },
    
    ],
    replies: [{ id: 9201, text: '感谢大家支持。', time: '2小时' }],
  },
  tobori_tw: {
    name: 'tobori.tw',
    handle: '@tobori_tw',
    avatar: 'https://images.unsplash.com/photo-1642761704729-b5b7cbf0a4df?auto=format&fit=crop&w=120&q=80',
    cover: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1400&q=80',
    verified: false,
    bio: '账号主页占位',
    category: '娱乐',
    joinedAt: '2010年3月 加入',
    following: 649,
    followers: 50332,
    posts: [{ id: 11, tweetId: 11, text: "《Mr. A's Farm》", time: '2月' }],
    replies: [{ id: 9301, text: '主页回复内容占位。', time: '3天' }],
  },
  yoasobi_staff: {
    name: 'YOASOBI',
    handle: '@YOASOBI_staff',
    avatar: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?auto=format&fit=crop&w=120&q=80',
    cover: 'https://images.unsplash.com/photo-1527489377706-5bf97e608852?auto=format&fit=crop&w=1400&q=80',
    verified: true,
    bio: 'Vocal: ikura\nSongs: youtube.com/playlist?list=...\n\n账号主页帖子占位示例。',
    category: '娱乐和休闲',
    joinedAt: '2019年10月 加入',
    following: 124,
    followers: 1335047,
    isFollowing: false,
    posts: [
      {
        id: 9901,
        pinned: true,
        text: '【「BABY」MV公开】\nTVアニメ「花ざかりの君たちへ」エンディングテーマ',
        time: '1月11日',
        links: ['youtu.be/tWqZxTAy7rU', 'link.to/yoasobi-baby', 'hanakimi-anime.com/special/novel/...'],
        mediaList: [
          'https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
        ],
        stats: { replies: 22, reposts: 491, likes: 3631, views: '73.6万' },
      },
    ],
    replies: [
      {
        id: 9902,
        text: '开发者可编辑：这里是账号主页回复占位。',
        time: '3小时',
        replyTo: '@fans_account',
        stats: { replies: 3, reposts: 0, likes: 25, views: '1,428' },
      },
    ],
  },
};

// 开发者维护入口 2：首页时间线帖子（按作者区分）
export const FOLLOWING_TWEETS = [
  {
    id: 1,
    user: {
      name: 'Lars',
      handle: '@lars0421',
      avatar: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=120&q=80',
      verified: true,
    },
    time: '1天',
    publishAt: '26年4月11日, 21:00',
    source: 'youtube.com',
    content: 'THE FIRST TAKE\nOUT\n\nAPR 15\n22:00\n\nTheFirstTake.lnk.to/YouTube\n\n@POP_YOURS\n@3pylanabby\n@ELLETERESA\n\n#THEFIRSTTAKE',
    stats: { replies: 722, reposts: 247, likes: 5549, views: '21.7万' },
    isLikedByMe: false,
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80',
      alt: 'post media',
    },
  },
  {
    id: 2,
    user: {
      name: 'HIPHOP大好き少年',
      handle: '@Geography11',
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=120&q=80',
      verified: false,
    },
    time: '1天',
    publishAt: '26年4月12日, 19:00',
    source: 'x.com',
    replyTo: '@The_FirstTake @POP_YOURS 及另外 2 人',
    content: '分かってたけどやっぱこっちだったか...\nSTARLIGHTがよかった',
    stats: { replies: 1, reposts: 3, likes: 10, views: '1,097' },
    isLikedByMe: true,
    media: null,
  },
];

//推荐栏的内容：

export const FOR_YOU_TWEETS = [
  {
    id: 11,
    user: {
      name: 'tobori.tw',
      handle: '@tobori_tw',
      avatar: 'https://images.unsplash.com/photo-1642761704729-b5b7cbf0a4df?auto=format&fit=crop&w=120&q=80',
      verified: false,
    },
    time: '2月',
    publishAt: '26年1月5日, 13:38',
    source: 'bomtoon.tw',
    content: "《Mr. A's Farm》\n\n来自 bomtoon.tw\n\n这是为你推荐里的示例推文",
    stats: { replies: 74, reposts: 12, likes: 4839, views: '410万' },
    isLikedByMe: false,
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80',
      alt: 'for you media',
    },
  },
];

export const SEARCH_TRENDS = [
  { id: 1, meta: '娱乐 · 热门', title: '#THEFIRSTTAKE', posts: '12.4万 帖子' },
  { id: 2, meta: '音乐 · 趋势', title: 'SAYONARAベイベー', posts: '4,810 帖子' },
  { id: 3, meta: '科技 · 趋势', title: 'Vue 3 响应式', posts: '9,120 帖子' },
];

export const PREMIUM_PLANS = [
  { id: 'basic', name: 'Basic', price: '¥ 18 / 月', features: ['权益占位 A', '权益占位 B', '权益占位 C'] },
  { id: 'plus', name: 'Plus', price: '¥ 38 / 月', features: ['权益占位 A', '权益占位 B', '权益占位 C'] },
  { id: 'pro', name: 'Pro', price: '¥ 68 / 月', features: ['权益占位 A', '权益占位 B', '权益占位 C'] },
];

export const MESSAGE_THREADS = [
  {
    id: 1,
    name: 'Airi',
    handle: '@airi_music',
    time: '10分',
    preview: '下次联动你有兴趣吗？',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=120&q=80',
    messages: [
      { id: 10001, senderHandle: '@airi_music', text: '嘿，最近有新作品吗？', time: '09:12' },
      { id: 10002, senderHandle: '@BiqingLee67078', text: '有计划，下周会发一条。', time: '09:15' },
      { id: 10003, senderHandle: '@airi_music', text: '太好了，记得艾特我！', time: '09:17' },
    ],
  },
  {
    id: 2,
    name: 'Frontend Weekly',
    handle: '@fe_weekly',
    time: '2小时',
    preview: '本周趋势已更新，欢迎查看。',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    messages: [
      { id: 10011, senderHandle: '@fe_weekly', text: '你好，这周榜单已更新。', time: '昨天' },
      { id: 10012, senderHandle: '@BiqingLee67078', text: '收到，我晚点看看。', time: '昨天' },
    ],
  },
];

export const PINNED_NOTIFY_TWEET_ID = 1;

// 开发者维护入口 3：通知模板和通知初始内容
export const NOTIFY_TEMPLATES = [
  {
    id: 'tpl-like-1',
    type: 'like',
    actor: {
      name: 'mika',
      handle: '@mika_sound',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
    },
    text: '点赞了你的帖子',
  },
  {
    id: 'tpl-reply-1',
    type: 'reply',
    actor: {
      name: 'ryu',
      handle: '@ryu_music',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    },
    replyTo: '@BiqingLee67078',
    text: '太喜欢这个版本了',
    stats: { replies: 1, reposts: 0, likes: 2, views: '28' },
  },
];

export const INITIAL_NOTIFICATION_ITEMS = [
  {
    id: 'init-reply-1',
    type: 'reply',
    actor: {
      name: 'Zzeenn',
      handle: '@wang_han50048',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&q=80',
    },
    replyTo: '@BiqingLee67078',
    text: 'Zzzz',
    time: '1小时',
    tweetId: 1,
    stats: { replies: 1, reposts: 0, likes: 0, views: '2' },
  },
  {
    id: 'init-like-1',
    type: 'like',
    actor: {
      name: 'Zzeenn',
      handle: '@wang_han50048',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&q=80',
    },
    text: '点赞了你的帖子',
    preview: '。',
    time: '58分',
    tweetId: 1,
  },
  {
    id: 'init-system-1',
    type: 'system',
    actor: {
      name: '卷毛狗培育鉴赏中心',
      handle: '@dogs_lab',
      avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=120&q=80',
    },
    text: 'tttttttttttttestt',
    time: '2小时',
    tweetId: 2,
  },
];

// 开发者维护入口 4：自动回复模板（按 tweetId 区分）
export const AUTO_REPLY_RULES_BY_TWEET = {
  1: [
    {
      actor: {
        name: 'Zzeenn',
        handle: '@wang_han50048',
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&q=80',
      },
      text: '同感，这首现场状态真的很好。',
    },
    {
      actor: {
        name: 'vivi',
        handle: '@viviasparu1',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
      },
      text: '这条评论很有意思，我也想到了同样的点。',
    },
  ],
  11: [
    {
      actor: {
        name: 'Bruce li',
        handle: '@Bruceli18022405',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
      },
      text: '你的看法很赞，我也在追这个话题。',
    },
  ],
  default: [
    {
      actor: {
        name: 'X User',
        handle: '@x_user',
        avatar: 'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?auto=format&fit=crop&w=120&q=80',
      },
      text: '收到，感谢你的分享。',
    },
  ],
};

// 开发者维护入口 5：帖子详情下的初始评论
export const INITIAL_REPLIES_BY_TWEET = {
  1: [
    {
      id: 101,
      user: {
        name: 'Zerui Hui',
        handle: '@zeruihui',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      },
      time: '2月4日',
      replyTo: '@The_FirstTake',
      content: '放心吧，我会一直支持你，努力一定有回报！',
      stats: { replies: 0, reposts: 1, likes: 8, views: '8,477' },
      isLikedByMe: false,
    },
  ],
  2: [
    {
      id: 201,
      user: {
        name: 'chopa',
        handle: '@chopa_c',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
      },
      time: '1天',
      replyTo: '@The_FirstTake @POP_YOURS',
      content: 'tohjiは？ ニューカマーは？',
      stats: { replies: 1, reposts: 0, likes: 39, views: '5,454' },
      isLikedByMe: false,
    },
  ],
  11: [],
};
