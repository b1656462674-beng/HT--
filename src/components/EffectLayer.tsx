import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EffectTemplate } from '../types';
import { cn } from '../lib/utils';

interface EffectLayerProps {
  template: EffectTemplate;
  onComplete?: () => void;
}

export const EffectLayer: React.FC<EffectLayerProps> = ({ template, onComplete }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Simulate gyroscope with mouse movement for web demo
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const renderEffect = () => {
    switch (template.type) {
      case 'BACKGROUND':
        if (template.config.animationType === 'splash') {
          return (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 1.2], opacity: [0, 0.4, 0.2] }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-0 pointer-events-none"
              style={{ 
                background: template.config.gradient,
                clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)'
              }}
            />
          );
        }
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ background: template.config.gradient }}
          />
        );

      case 'BORDER':
        return (
          <div className="absolute inset-0 z-10 pointer-events-none rounded-xl">
            <motion.div
              animate={{
                top: ["12px", "12px", "calc(100% - 12px)", "calc(100% - 12px)", "12px"],
                left: ["12px", "calc(100% - 12px)", "calc(100% - 12px)", "12px", "12px"],
                rotate: [0, 0, 90, 180, 270],
                scale: [1, 1.2, 1, 1.2, 1]
              }}
              transition={{
                duration: 6 / (template.config.speed || 1),
                repeat: Infinity,
                ease: "linear",
                times: [0, 0.25, 0.5, 0.75, 1]
              }}
              className="absolute text-2xl -ml-3 -mt-3 flex items-center justify-center w-6 h-6"
            >
              <motion.span
                animate={{ scaleY: [1, 0.5, 1] }}
                transition={{ duration: 0.2, repeat: Infinity }}
              >
                {template.config.assetUrl}
              </motion.span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 border-2 border-yellow-400/20 rounded-xl"
            />
          </div>
        );

      case 'OVERLAY':
        if (template.config.animationType === 'explode') {
          return (
            <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1.5, 0],
                    x: Math.cos(i * 30 * Math.PI / 180) * 150,
                    y: Math.sin(i * 30 * Math.PI / 180) * 150,
                    opacity: 0
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute text-2xl"
                >
                  {template.config.assetUrl}
                </motion.div>
              ))}
            </div>
          );
        }
        return null;

      case 'INTERACTIVE':
        if (template.config.animationType === 'gyro-roll') {
          return (
            <div className="absolute inset-0 z-10 pointer-events-none" ref={containerRef}>
              {/* Shadow */}
              <motion.div
                animate={{
                  x: mousePos.x * 240 + 5,
                  y: mousePos.y * 120 + 5,
                  opacity: 0.2
                }}
                transition={{ type: 'spring', damping: 15, stiffness: 60 }}
                className="absolute left-1/2 top-1/2 -ml-6 -mt-6 w-12 h-12 bg-black rounded-full blur-md"
              />
              {/* Ball */}
              <motion.div
                animate={{
                  x: mousePos.x * 240,
                  y: mousePos.y * 120,
                  rotate: mousePos.x * 1080
                }}
                transition={{ type: 'spring', damping: 12, stiffness: 80 }}
                className="absolute left-1/2 top-1/2 -ml-6 -mt-6 text-5xl drop-shadow-xl"
              >
                {template.config.assetUrl}
              </motion.div>
            </div>
          );
        }
        if (template.config.animationType === 'gyro-sand') {
          return (
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" ref={containerRef}>
              {[...Array(template.config.particleCount || 20)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    x: mousePos.x * (100 + i * 2),
                    y: mousePos.y * (50 + i * 1.5) + 80,
                    opacity: [0.4, 0.8, 0.4],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    type: 'spring',
                    damping: 15 + i % 5,
                    stiffness: 50 + i % 10,
                    opacity: { duration: 2, repeat: Infinity },
                    scale: { duration: 1.5, repeat: Infinity }
                  }}
                  className="absolute left-1/2 top-1/2 text-xs"
                  style={{
                    marginLeft: `${(i - 10) * 10}px`,
                    marginTop: `${(i % 5) * 10}px`
                  }}
                >
                  {template.config.assetUrl}
                </motion.div>
              ))}
            </div>
          );
        }
        return null;

      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
      <AnimatePresence>
        {renderEffect()}
      </AnimatePresence>
    </div>
  );
};

export const AvatarDecor: React.FC<{ template: EffectTemplate }> = ({ template }) => {
  if (template.type !== 'AVATAR_DECOR') return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(template.config.particleCount || 8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5],
            x: Math.cos(i * (Math.PI * 2) / 8) * 40,
            y: Math.sin(i * (Math.PI * 2) / 8) * 40,
            rotate: 360
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
          className="absolute left-1/2 top-1/2 -ml-2 -mt-2 text-sm"
        >
          {template.config.assetUrl}
        </motion.div>
      ))}
    </div>
  );
};

export const NicknameDecor: React.FC<{ template: EffectTemplate }> = ({ template }) => {
  if (template.type !== 'NICKNAME_DECOR') return null;

  return (
    <motion.div
      animate={{
        left: ["0%", "100%", "100%", "0%", "0%"],
        scaleX: [-1, -1, 1, 1, -1] // -1 faces right, 1 faces left (assuming cat faces left by default)
      }}
      transition={{
        duration: 5 / (template.config.speed || 1),
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.48, 0.5, 0.98, 1]
      }}
      className="absolute top-0 text-lg flex items-center justify-center -translate-x-1/2"
      style={{ width: '24px', height: '24px' }}
    >
      {template.config.assetUrl}
    </motion.div>
  );
};
