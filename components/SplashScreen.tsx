
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
        >
          <div className="relative w-72 h-72 flex flex-col items-center justify-center overflow-visible">
            {/* Subtle Drop Shadow Filter */}
            <svg width="0" height="0">
              <filter id="ring-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                <feOffset dx="0" dy="4" result="offsetblur" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.2" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </svg>

            {/* The Logo SVG: Minimalist golden ring with faceted diamond */}
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full drop-shadow-sm"
              style={{ filter: 'url(#ring-shadow)' }}
            >
              {/* Circular Band */}
              <motion.circle
                cx="100"
                cy="110"
                r="65"
                fill="none"
                stroke="#C9A758"
                strokeWidth="3"
                initial={{ pathLength: 0, rotate: -90 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              
              {/* Faceted Diamond (Light Gold/Beige) */}
              <motion.g
                initial={{ opacity: 0, scale: 0, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
              >
                {/* Main Gem Body (Simplified polygon) */}
                <path
                  d="M100 25 L125 45 L100 65 L75 45 Z"
                  fill="#F4E8D1"
                  stroke="#C9A758"
                  strokeWidth="0.5"
                />
                {/* Facets to suggest light striking */}
                <path
                  d="M100 25 L125 45 L100 45 Z"
                  fill="#FDF6E3"
                  className="opacity-80"
                />
                <path
                  d="M100 25 L112 35 L100 45 L88 35 Z"
                  fill="white"
                  className="opacity-90"
                />
              </motion.g>
            </svg>

            {/* Logo Text */}
            <div className="flex items-baseline font-serif text-6xl tracking-tighter mt-4 logo-text-shadow">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                className="text-brand-graphite"
              >
                11
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
                className="text-brand-gold"
              >
                11
              </motion.span>
            </div>
            
            <motion.div
              initial={{ opacity: 0, letterSpacing: '1em' }}
              animate={{ opacity: 0.6, letterSpacing: '0.5em' }}
              transition={{ delay: 2.6, duration: 1 }}
              className="text-brand-graphite font-sans text-[10px] mt-2 uppercase font-bold text-center"
            >
              JOIAS EXCLUSIVAS
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
