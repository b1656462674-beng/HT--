import { EffectTemplate, Gift, Post } from './types';

export const EFFECT_TEMPLATES: Record<string, EffectTemplate> = {
  'avatar-petals': {
    id: 'avatar-petals',
    name: 'Avatar Petals',
    type: 'AVATAR_DECOR',
    duration: 10000, // 10s
    config: {
      assetUrl: '🌸',
      particleCount: 12,
      speed: 1,
      animationType: 'float-around'
    }
  },
  'nickname-animal': {
    id: 'nickname-animal',
    name: 'Nickname Animal',
    type: 'NICKNAME_DECOR',
    duration: 15000, // 15s
    config: {
      assetUrl: '🐈',
      speed: 2,
      animationType: 'walk-back-forth'
    }
  },
  'pacman-border': {
    id: 'pacman-border',
    name: 'Pacman Border',
    type: 'BORDER',
    duration: 20000, // 20s
    config: {
      assetUrl: '👾',
      speed: 3,
      direction: 'clockwise'
    }
  },
  'football-tilt': {
    id: 'football-tilt',
    name: 'Football Tilt',
    type: 'INTERACTIVE',
    duration: 30000, // 30s
    config: {
      assetUrl: '⚽',
      animationType: 'gyro-roll'
    }
  },
  'sand-tilt': {
    id: 'sand-tilt',
    name: 'Sand Tilt',
    type: 'INTERACTIVE',
    duration: 30000, // 30s
    config: {
      assetUrl: '✨',
      particleCount: 40,
      animationType: 'gyro-sand'
    }
  },
  'firecrackers': {
    id: 'firecrackers',
    name: 'Firecrackers',
    type: 'OVERLAY',
    duration: 5000, // 5s
    config: {
      assetUrl: '🧨',
      animationType: 'explode'
    }
  },
  'holi-splash': {
    id: 'holi-splash',
    name: 'Holi Splash',
    type: 'BACKGROUND',
    duration: 10000, // 10s
    config: {
      gradient: 'linear-gradient(135deg, #ff0080, #7928ca, #ff0080)',
      animationType: 'splash'
    }
  }
};

export const FESTIVAL_GIFTS: Record<string, Gift[]> = {
  'Spring': [
    { id: 'g1', name: 'Spring Petals', icon: '🌸', price: 9, effectTemplateId: 'avatar-petals' },
    { id: 'g3', name: 'Retro Pac', icon: '👾', price: 49, effectTemplateId: 'pacman-border' },
    { id: 'g4', name: 'World Cup Ball', icon: '⚽', price: 99, effectTemplateId: 'football-tilt' },
    { id: 'g2', name: 'Kitty Friend', icon: '🐈', price: 19, effectTemplateId: 'nickname-animal' },
    { id: 'g7', name: 'Holi Splash', icon: '🎨', price: 999, effectTemplateId: 'holi-splash' },
  ],
  'Retro': [
    { id: 'g3', name: 'Retro Pac', icon: '👾', price: 49, effectTemplateId: 'pacman-border' },
    { id: 'g8', name: 'Pixel Heart', icon: '👾', price: 19, effectTemplateId: 'avatar-petals' },
  ],
  'WorldCup': [
    { id: 'g4', name: 'World Cup Ball', icon: '⚽', price: 99, effectTemplateId: 'football-tilt' },
    { id: 'g5', name: 'Magic Sand', icon: '✨', price: 199, effectTemplateId: 'sand-tilt' },
    { id: 'g6', name: 'Firecracker', icon: '🧨', price: 599, effectTemplateId: 'firecrackers' },
  ]
};

// Default for backward compatibility or initial load
export const GIFTS: Gift[] = [...FESTIVAL_GIFTS['Spring'], ...FESTIVAL_GIFTS['Retro'], ...FESTIVAL_GIFTS['WorldCup']];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    author: {
      name: 'Ye Jin',
      handle: 'yejin_kr',
      avatar: 'https://picsum.photos/seed/yejin/200/200'
    },
    content: 'I really want to learn Chinese well. Looking for a Chinese friend to talk with for a long time! 🙇‍♀️',
    timestamp: '2h ago',
    likes: 37,
    comments: 11
  },
  {
    id: 'p2',
    author: {
      name: 'Bu',
      handle: 'bu_bu',
      avatar: 'https://picsum.photos/seed/bu/200/200'
    },
    content: 'Do I not look Korean? I don\'t know why so many people ask me if I\'m Korean. 🤔🤔🤔🤔🤔',
    timestamp: '4h ago',
    likes: 16,
    comments: 2
  },
  {
    id: 'p3',
    author: {
      name: 'Pat',
      handle: 'pat_vip',
      avatar: 'https://picsum.photos/seed/pat/200/200'
    },
    content: 'Check out this amazing view from my window today! Nature is so beautiful. 🌿✨',
    timestamp: '1d ago',
    likes: 124,
    comments: 45
  }
];
