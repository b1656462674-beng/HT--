import React, { useState, useEffect } from 'react';
import { PostCard } from './components/PostCard';
import { GiftPanel } from './components/GiftPanel';
import { MOCK_POSTS, EFFECT_TEMPLATES, FESTIVAL_GIFTS } from './constants';
import { Post, Gift } from './types';
import { Bell, Search, Plus, User, BarChart2, Zap, Pencil, Settings } from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [isGiftPanelOpen, setIsGiftPanelOpen] = useState(false);
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [userCoins, setUserCoins] = useState(1250);
  const [currentFestival, setCurrentFestival] = useState<'Spring' | 'Retro' | 'WorldCup'>('Spring');
  const [activeTab, setActiveTab] = useState('推荐');

  const currentGifts = FESTIVAL_GIFTS[currentFestival] || [];

  // Cleanup expired effects
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setPosts(prev => prev.map(post => {
        if (post.activeEffect && post.activeEffect.expiresAt < now) {
          return { ...post, activeEffect: undefined };
        }
        return post;
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleGiftClick = (postId: string) => {
    setActivePostId(postId);
    setIsGiftPanelOpen(true);
  };

  const handleSendGift = (gift: Gift) => {
    if (!activePostId) return;

    const template = EFFECT_TEMPLATES[gift.effectTemplateId];
    if (!template) return;

    const now = Date.now();
    setPosts(prev => prev.map(post => {
      if (post.id === activePostId) {
        return {
          ...post,
          activeEffect: {
            templateId: template.id,
            startTime: now,
            expiresAt: now + template.duration
          }
        };
      }
      return post;
    }));

    setUserCoins(prev => prev - gift.price);
    setIsGiftPanelOpen(false);
    setActivePostId(null);
  };

  const tabs = ['最新', '推荐', '互助', '自拍', '附近'];

  return (
    <div className="min-h-screen bg-[#f7f7f7] font-sans text-gray-900">
      {/* Header - Matching Screenshot */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <BarChart2 size={24} className="text-gray-800 rotate-90" />
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center">
                <Zap size={12} className="text-white fill-current" />
              </div>
            </div>
            
            <div className="flex-1 mx-4">
              <div className="relative flex items-center">
                <Search size={16} className="absolute left-3 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="春日之约" 
                  className="w-full bg-gray-100 border-none rounded-full py-1.5 pl-9 pr-4 text-sm focus:ring-0 placeholder-gray-400"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative">
                <Bell size={24} className="text-gray-800" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
              <Pencil size={24} className="text-gray-800" />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center justify-between px-2 mt-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "text-base transition-all relative pb-2",
                  activeTab === tab 
                    ? "font-bold text-gray-900" 
                    : "text-gray-500"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>
            ))}
            <div className="text-gray-400">
              <Settings size={20} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto pt-2 pb-24 px-0">
        {/* Post Feed */}
        <div className="space-y-2">
          {posts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              onGiftClick={handleGiftClick} 
            />
          ))}
        </div>
      </main>

      {/* Bottom Nav - Matching Screenshot Style */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2 z-30">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex flex-col items-center space-y-1">
            <div className="relative">
              <div className="w-6 h-6 rounded-full border-2 border-indigo-600 flex items-center justify-center">
                <div className="w-3 h-3 bg-indigo-600 rounded-full" />
              </div>
              <span className="absolute -top-2 -right-4 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">212</span>
            </div>
            <span className="text-[10px] text-gray-400">HelloTalk</span>
          </div>
          
          <div className="flex flex-col items-center space-y-1">
            <User size={24} className="text-gray-300" />
            <span className="text-[10px] text-gray-400">找伙伴</span>
          </div>

          <div className="flex flex-col items-center space-y-1">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg">
              <Plus size={20} />
            </div>
            <span className="text-[10px] text-indigo-600 font-bold">动态</span>
          </div>

          <div className="flex flex-col items-center space-y-1">
            <Search size={24} className="text-gray-300" />
            <span className="text-[10px] text-gray-400">语聊/直播</span>
          </div>

          <div className="flex flex-col items-center space-y-1">
            <User size={24} className="text-gray-300" />
            <span className="text-[10px] text-gray-400">我</span>
          </div>
        </div>
      </nav>

      {/* Gift Panel */}
      <GiftPanel 
        isOpen={isGiftPanelOpen}
        onClose={() => setIsGiftPanelOpen(false)}
        onSend={handleSendGift}
        userCoins={userCoins}
        gifts={currentGifts}
      />
    </div>
  );
}
