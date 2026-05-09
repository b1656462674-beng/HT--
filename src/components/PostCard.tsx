import React from 'react';
import { Post, EffectTemplate } from '../types';
import { EFFECT_TEMPLATES } from '../constants';
import { EffectLayer, AvatarDecor, NicknameDecor } from './EffectLayer';
import { Heart, MessageCircle, Share2, MoreHorizontal, Gift as GiftIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface PostCardProps {
  post: Post;
  onGiftClick: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onGiftClick }) => {
  const activeEffects = post.activeEffects || [];

  return (
    <div className={cn(
      "relative bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100 transition-all duration-500",
      activeEffects.some(ae => EFFECT_TEMPLATES[ae.templateId]?.type === 'BACKGROUND') && "overflow-hidden"
    )}>
      {/* Effect Layer - Background & Border */}
      {activeEffects.map(ae => (
        <EffectLayer key={ae.instanceId} instanceId={ae.instanceId} template={EFFECT_TEMPLATES[ae.templateId]} />
      ))}

      {/* Header */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center space-x-3 flex-shrink-0">
          <div className="relative">
            <img 
              src={post.author.avatar} 
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              referrerPolicy="no-referrer"
            />
            {activeEffects
              .filter(ae => EFFECT_TEMPLATES[ae.templateId]?.type === 'AVATAR_DECOR')
              .map(ae => (
                <AvatarDecor key={ae.instanceId} template={EFFECT_TEMPLATES[ae.templateId]} />
              ))
            }
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-gray-900 text-lg">{post.author.name}</h3>
            </div>
            <div className="flex items-center space-x-1 text-[10px] font-bold">
              <span className="text-gray-900">KR</span>
              <span className="text-gray-300">⇌</span>
              <span className="text-gray-900">CN</span>
              <div className="flex space-x-0.5 ml-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={cn("w-1 h-1 rounded-full", i < 3 ? "bg-green-400" : "bg-gray-200")} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Roaming area for cat/nickname decor */}
        <div className="flex-1 relative h-8 mx-2 overflow-visible">
          {activeEffects
            .filter(ae => EFFECT_TEMPLATES[ae.templateId]?.type === 'NICKNAME_DECOR')
            .map(ae => (
              <NicknameDecor key={ae.instanceId} template={EFFECT_TEMPLATES[ae.templateId]} />
            ))
          }
        </div>

        <button className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-sm hover:bg-indigo-700 transition-colors flex-shrink-0">
          关注
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 mb-4">
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 relative z-10">
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-1.5 text-gray-400 hover:text-red-500 transition-colors">
            <Heart size={22} />
            <span className="text-sm font-medium">{post.likes}</span>
          </button>
          <button className="flex items-center space-x-1.5 text-gray-400 hover:text-blue-500 transition-colors">
            <MessageCircle size={22} />
            <span className="text-sm font-medium">{post.comments}</span>
          </button>
          <button className="text-gray-400 hover:text-green-500 transition-colors">
            <Share2 size={22} />
          </button>
        </div>
        
        <button 
          onClick={() => onGiftClick(post.id)}
          className={cn(
            "flex items-center space-x-1.5 px-3 py-1.5 rounded-full transition-all duration-300",
            activeEffects.length > 0 
              ? "bg-purple-100 text-purple-600 shadow-sm scale-105" 
              : "text-gray-400 hover:bg-purple-50 hover:text-purple-600"
          )}
        >
          <GiftIcon size={22} className={activeEffects.length > 0 ? "animate-bounce" : ""} />
        </button>
      </div>

      {/* Mock Comments - Matching Screenshot */}
      <div className="mt-4 space-y-2 relative z-10">
        <div className="text-sm">
          <span className="text-indigo-600 font-medium">向北: </span>
          <span className="text-gray-800">🙋‍♂️</span>
        </div>
        <div className="text-sm">
          <span className="text-indigo-600 font-medium">半夏拾陆: </span>
          <span className="text-gray-800">我可以</span>
        </div>
        <div className="text-sm text-gray-400">查看全部{post.comments}条评论</div>
      </div>
    </div>
  );
};
