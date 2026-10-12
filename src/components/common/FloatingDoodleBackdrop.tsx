import React from 'react';
import { motion } from 'framer-motion';
import {
  DoodleHeart,
  DoodleStar,
  DoodleFlower,
  DoodleBow,
  DoodleSparkleHeart,
} from './CuteDoodles';

export const FloatingDoodleBackdrop: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating Heart Top Left - Safe Margin */}
      <motion.div
        className="absolute top-3 left-2.5 select-none"
        animate={{
          y: [-4, 6, -4],
          rotate: [-4, 5, -4],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <DoodleHeart className="w-5 h-5 text-[#FFB7C5] opacity-40 hover:opacity-80 transition-opacity" />
      </motion.div>

      {/* Floating Golden Star Top Right - Safe Margin */}
      <motion.div
        className="absolute top-3 right-3 select-none"
        animate={{
          y: [6, -6, 6],
          rotate: [5, -5, 5],
        }}
        transition={{
          duration: 6.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <DoodleStar className="w-5 h-5 text-[#F59E0B] opacity-35 hover:opacity-80 transition-opacity" />
      </motion.div>

      {/* Floating Flower Mid-Left */}
      <motion.div
        className="absolute top-[40%] left-1 select-none"
        animate={{
          y: [-6, 6, -6],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <DoodleFlower className="w-5 h-5 opacity-30 hover:opacity-75 transition-opacity" />
      </motion.div>

      {/* Floating Sparkle Heart Mid-Right */}
      <motion.div
        className="absolute top-[65%] right-1.5 select-none"
        animate={{
          y: [6, -6, 6],
          rotate: [-4, 4, -4],
        }}
        transition={{
          duration: 6.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <DoodleSparkleHeart className="w-5 h-5 text-[#E94F64] opacity-35 hover:opacity-80 transition-opacity" />
      </motion.div>

      {/* Floating Ribbon Bow Bottom Left */}
      <motion.div
        className="absolute bottom-6 left-2 select-none"
        animate={{
          y: [-4, 4, -4],
          rotate: [3, -3, 3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <DoodleBow className="w-5 h-5 opacity-30 hover:opacity-75 transition-opacity" />
      </motion.div>

      {/* Floating Little Star Bottom Right */}
      <motion.div
        className="absolute bottom-6 right-2 select-none"
        animate={{
          y: [5, -5, 5],
          scale: [0.93, 1.07, 0.93],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <DoodleStar className="w-4 h-4 text-[#F59E0B] opacity-30 hover:opacity-75 transition-opacity" />
      </motion.div>
    </div>
  );
};
