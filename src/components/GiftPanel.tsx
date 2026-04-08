import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GIFTS } from '../constants';
import { Gift } from '../types';
import { X, Coins } from 'lucide-react';
import { cn } from '../lib/utils';

interface GiftPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (gift: Gift) => void;
  userCoins: number;
  gifts: Gift[];
}

export const GiftPanel: React.FC<GiftPanelProps> = ({ isOpen, onClose, onSend, userCoins, gifts }) => {
  const [selectedGiftId, setSelectedGiftId] = React.useState<string | null>(null);

  const handleSend = () => {
    const gift = gifts.find(g => g.id === selectedGiftId);
    if (gift) {
      onSend(gift);
      setSelectedGiftId(null);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          />
          
          {/* Panel */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 shadow-2xl max-w-lg mx-auto overflow-hidden"
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
                  <Coins size={16} className="text-yellow-600" />
                  <span className="text-sm font-bold text-yellow-700">{userCoins}</span>
                  <span className="text-xs font-bold text-yellow-500">+</span>
                </div>
                <h2 className="text-lg font-bold text-gray-800">Send Gift</h2>
                <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-3 mb-8">
                {gifts.map((gift) => (
                  <button
                    key={gift.id}
                    onClick={() => setSelectedGiftId(gift.id)}
                    className={cn(
                      "flex flex-col items-center p-3 rounded-2xl transition-all duration-200 border-2",
                      selectedGiftId === gift.id 
                        ? "bg-purple-50 border-purple-500 scale-105 shadow-md" 
                        : "bg-gray-50 border-transparent hover:bg-gray-100"
                    )}
                  >
                    <span className="text-3xl mb-2 drop-shadow-sm">{gift.icon}</span>
                    <span className="text-[10px] font-bold text-gray-800 text-center line-clamp-1 mb-1">
                      {gift.name}
                    </span>
                    <div className="flex items-center space-x-0.5">
                      <Coins size={10} className="text-yellow-600" />
                      <span className="text-[10px] font-bold text-yellow-700">{gift.price}</span>
                    </div>
                  </button>
                ))}
              </div>

              <button
                disabled={!selectedGiftId || userCoins < (gifts.find(g => g.id === selectedGiftId)?.price || 0)}
                onClick={handleSend}
                className={cn(
                  "w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg",
                  selectedGiftId 
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 active:scale-[0.98]" 
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                )}
              >
                Send Gift
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
