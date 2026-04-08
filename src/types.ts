export type EffectType = 
  | 'BACKGROUND' 
  | 'PARTICLES' 
  | 'BORDER' 
  | 'OVERLAY' 
  | 'AVATAR_DECOR' 
  | 'NICKNAME_DECOR' 
  | 'INTERACTIVE';

export interface EffectTemplate {
  id: string;
  name: string;
  type: EffectType;
  duration: number; // in milliseconds
  config: {
    color?: string;
    gradient?: string;
    assetUrl?: string;
    particleCount?: number;
    speed?: number;
    direction?: 'clockwise' | 'counter-clockwise';
    animationType?: string;
  };
}

export interface Gift {
  id: string;
  name: string;
  icon: string;
  price: number;
  effectTemplateId: string;
}

export interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    handle: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  activeEffect?: {
    templateId: string;
    startTime: number;
    expiresAt: number;
  };
}
