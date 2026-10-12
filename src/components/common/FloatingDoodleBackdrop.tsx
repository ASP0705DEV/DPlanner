import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DoodleHeart,
  DoodleStar,
  DoodleFlower,
  DoodleBow,
  DoodleSparkleHeart,
  DoodleDurgaPuja,
  DoodleCoffeeMug,
  DoodleCrown,
  DoodleVintageCamera,
  DoodleMusicNotes,
  DoodleLoveEnvelope,
  DoodleHeartBalloon,
  DoodleSparklesCluster,
} from './CuteDoodles';
import { playHeartNudgeSound } from '../../utils/soundEffects';

interface FloatingStickerProps {
  imageSrc: string;
  caption: string;
  rotateDeg: number;
  topPct: string;
  side: 'left' | 'right';
}

const FloatingPhotoSticker: React.FC<FloatingStickerProps> = ({
  imageSrc,
  caption,
  rotateDeg,
  topPct,
  side,
}) => {
  const [isWiggling, setIsWiggling] = useState(false);

  const handleTap = () => {
    setIsWiggling(true);
    playHeartNudgeSound(Math.floor(Math.random() * 5) + 1);
    setTimeout(() => setIsWiggling(false), 600);
  };

  const positionClass =
    side === 'left' ? 'left-1 sm:-left-3.5' : 'right-1 sm:-right-3.5';

  return (
    <motion.div
      onClick={handleTap}
      style={{
        top: topPct,
        rotate: rotateDeg,
      }}
      animate={{
        y: [-5, 5, -5],
        rotate: [rotateDeg - 2, rotateDeg + 2, rotateDeg - 2],
        scale: isWiggling ? [1, 1.15, 1] : 1,
      }}
      transition={{
        y: { duration: 6 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' },
        rotate: { duration: 5 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' },
        scale: { duration: 0.35 },
      }}
      className={`absolute z-10 pointer-events-auto cursor-pointer select-none group ${positionClass}`}
      title={`Our Moment: ${caption} (Tap for a chime!)`}
    >
      <div className="bg-white/95 backdrop-blur-xs p-1 pb-1.5 rounded-xl border border-[#3D2730]/15 shadow-sm group-hover:shadow-md group-hover:border-[#E94F64] transition-all max-w-[52px] sm:max-w-[62px]">
        {/* Tiny Washi Tape */}
        <div className="w-4 h-1.5 bg-[#FFB7C5]/85 mx-auto -mt-2 mb-0.5 rounded-xs transform -rotate-2" />
        <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-lg overflow-hidden border border-[#3D2730]/10 bg-[#FFF8F0]">
          <img
            src={imageSrc}
            alt={caption}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
          />
        </div>
        <p className="font-handwritten text-[9px] font-bold text-center text-[#E94F64] mt-0.5 leading-none truncate px-0.5">
          {caption}
        </p>
      </div>
    </motion.div>
  );
};

export const FloatingDoodleBackdrop: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* 1. FLOATING DOODLE ICONS (EXPANDED COLLECTION) */}

      {/* Floating Heart Top Left */}
      <motion.div
        className="absolute top-4 left-3 select-none pointer-events-auto cursor-pointer"
        animate={{ y: [-5, 7, -5], rotate: [-6, 8, -6] }}
        whileHover={{ scale: 1.25, rotate: 12 }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => playHeartNudgeSound(1)}
        title="Tap me!"
      >
        <DoodleHeart className="w-8 h-8 sm:w-9 sm:h-9 text-[#E94F64] opacity-75 hover:opacity-100 transition-opacity drop-shadow-xs" />
      </motion.div>

      {/* Floating Golden Star Top Right */}
      <motion.div
        className="absolute top-5 right-3 select-none pointer-events-auto cursor-pointer"
        animate={{ y: [7, -7, 7], rotate: [6, -8, 6] }}
        whileHover={{ scale: 1.25, rotate: -15 }}
        transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => playHeartNudgeSound(2)}
        title="Tap me!"
      >
        <DoodleStar className="w-9 h-9 sm:w-10 sm:h-10 text-[#F59E0B] opacity-80 hover:opacity-100 transition-opacity drop-shadow-xs" />
      </motion.div>

      {/* NEW: Floating Love Letter Envelope (Top Center-Left) */}
      <motion.div
        className="absolute top-[8%] left-[12%] select-none pointer-events-auto cursor-pointer hidden sm:block"
        animate={{ y: [-6, 6, -6], rotate: [-8, 6, -8] }}
        whileHover={{ scale: 1.25 }}
        transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => playHeartNudgeSound(3)}
        title="Love note for Chotu!"
      >
        <DoodleLoveEnvelope className="w-8 h-8 opacity-75 hover:opacity-100 transition-opacity drop-shadow-xs" />
      </motion.div>

      {/* Floating Durga Puja Diya / Flame (Upper Right) */}
      <motion.div
        className="absolute top-[18%] right-2.5 select-none pointer-events-auto cursor-pointer"
        animate={{ y: [-5, 6, -5], rotate: [-4, 6, -4] }}
        whileHover={{ scale: 1.25 }}
        transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => playHeartNudgeSound(4)}
        title="Festive puja sparkle!"
      >
        <DoodleDurgaPuja className="w-8 h-8 sm:w-9 sm:h-9 text-[#EA580C] opacity-75 hover:opacity-100 transition-opacity drop-shadow-xs" />
      </motion.div>

      {/* NEW: Floating Music Notes (Upper Left) */}
      <motion.div
        className="absolute top-[23%] left-2.5 select-none pointer-events-auto cursor-pointer"
        animate={{ y: [6, -6, 6], rotate: [5, -5, 5] }}
        whileHover={{ scale: 1.25 }}
        transition={{ duration: 6.6, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => playHeartNudgeSound(5)}
        title="Our acoustic playlist!"
      >
        <DoodleMusicNotes className="w-8 h-8 sm:w-9 sm:h-9 opacity-75 hover:opacity-100 transition-opacity drop-shadow-xs" />
      </motion.div>

      {/* Floating Flower (Mid-Left) */}
      <motion.div
        className="absolute top-[35%] left-2 select-none pointer-events-auto cursor-pointer"
        animate={{ y: [-6, 6, -6], scale: [0.95, 1.05, 0.95], rotate: [0, 12, 0] }}
        whileHover={{ scale: 1.3 }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => playHeartNudgeSound(6)}
        title="Sunflower bloom!"
      >
        <DoodleFlower className="w-9 h-9 sm:w-10 sm:h-10 opacity-75 hover:opacity-100 transition-opacity drop-shadow-xs" />
      </motion.div>

      {/* NEW: Floating Vintage Camera (Mid-Right) */}
      <motion.div
        className="absolute top-[36%] right-2 select-none pointer-events-auto cursor-pointer"
        animate={{ y: [6, -6, 6], rotate: [-6, 6, -6] }}
        whileHover={{ scale: 1.25 }}
        transition={{ duration: 6.3, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => playHeartNudgeSound(7)}
        title="Capturing memories!"
      >
        <DoodleVintageCamera className="w-8 h-8 sm:w-9 sm:h-9 opacity-80 hover:opacity-100 transition-opacity drop-shadow-xs" />
      </motion.div>

      {/* NEW: Floating Heart Balloon (Center-Right) */}
      <motion.div
        className="absolute top-[48%] right-3 select-none pointer-events-auto cursor-pointer"
        animate={{ y: [-8, 8, -8], rotate: [-4, 6, -4] }}
        whileHover={{ scale: 1.25 }}
        transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => playHeartNudgeSound(1)}
        title="Love balloon!"
      >
        <DoodleHeartBalloon className="w-8 h-8 sm:w-9 sm:h-9 opacity-75 hover:opacity-100 transition-opacity drop-shadow-xs" />
      </motion.div>

      {/* Floating Steaming Coffee Mug (Mid-Lower Right) */}
      <motion.div
        className="absolute top-[56%] right-2 select-none pointer-events-auto cursor-pointer"
        animate={{ y: [5, -5, 5], rotate: [-5, 5, -5] }}
        whileHover={{ scale: 1.25 }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => playHeartNudgeSound(2)}
        title="Warm coffee date!"
      >
        <DoodleCoffeeMug className="w-8 h-8 sm:w-9 sm:h-9 text-[#78350F] opacity-75 hover:opacity-100 transition-opacity drop-shadow-xs" />
      </motion.div>

      {/* NEW: Floating Sparkles Cluster (Mid-Lower Left) */}
      <motion.div
        className="absolute top-[58%] left-2.5 select-none pointer-events-auto cursor-pointer"
        animate={{ y: [-6, 6, -6], scale: [0.92, 1.08, 0.92] }}
        whileHover={{ scale: 1.3 }}
        transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => playHeartNudgeSound(3)}
        title="Sparkle magic!"
      >
        <DoodleSparklesCluster className="w-8 h-8 sm:w-9 sm:h-9 opacity-80 hover:opacity-100 transition-opacity drop-shadow-xs" />
      </motion.div>

      {/* Floating Sparkle Heart (Lower-Left) */}
      <motion.div
        className="absolute top-[70%] left-2 select-none pointer-events-auto cursor-pointer"
        animate={{ y: [6, -6, 6], rotate: [-6, 6, -6] }}
        whileHover={{ scale: 1.25 }}
        transition={{ duration: 6.4, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => playHeartNudgeSound(4)}
        title="Sparkle heart!"
      >
        <DoodleSparkleHeart className="w-9 h-9 sm:w-10 sm:h-10 text-[#E94F64] opacity-80 hover:opacity-100 transition-opacity drop-shadow-xs" />
      </motion.div>

      {/* NEW: Floating Crown (Lower-Right) */}
      <motion.div
        className="absolute top-[72%] right-2.5 select-none pointer-events-auto cursor-pointer"
        animate={{ y: [-5, 5, -5], rotate: [5, -5, 5] }}
        whileHover={{ scale: 1.25 }}
        transition={{ duration: 5.9, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => playHeartNudgeSound(5)}
        title="For my Rani Saheba!"
      >
        <DoodleCrown className="w-8 h-8 sm:w-9 sm:h-9 opacity-80 hover:opacity-100 transition-opacity drop-shadow-xs" />
      </motion.div>

      {/* Floating Ribbon Bow (Bottom Left) */}
      <motion.div
        className="absolute bottom-16 left-3 select-none pointer-events-auto cursor-pointer"
        animate={{ y: [-5, 5, -5], rotate: [4, -4, 4] }}
        whileHover={{ scale: 1.25 }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => playHeartNudgeSound(6)}
        title="Cute bow!"
      >
        <DoodleBow className="w-8 h-8 sm:w-9 sm:h-9 opacity-75 hover:opacity-100 transition-opacity drop-shadow-xs" />
      </motion.div>

      {/* Floating Golden Star (Bottom Right) */}
      <motion.div
        className="absolute bottom-16 right-3 select-none pointer-events-auto cursor-pointer"
        animate={{ y: [5, -5, 5], scale: [0.92, 1.1, 0.92] }}
        whileHover={{ scale: 1.25 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => playHeartNudgeSound(7)}
        title="Star!"
      >
        <DoodleStar className="w-8 h-8 sm:w-9 sm:h-9 text-[#F59E0B] opacity-80 hover:opacity-100 transition-opacity drop-shadow-xs" />
      </motion.div>

      {/* 2. REAL SHARED PHOTOS AS FLOATING INTERACTIVE STICKERS (SAFE MARGINS) */}
      <FloatingPhotoSticker
        imageSrc="/photos/chotu_car_smile.jpg"
        caption="Sunshine ☀️"
        rotateDeg={5}
        topPct="11%"
        side="right"
      />

      <FloatingPhotoSticker
        imageSrc="/photos/sonu_chotu_sunflower.jpg"
        caption="Pure US 🌻"
        rotateDeg={-6}
        topPct="26%"
        side="left"
      />

      <FloatingPhotoSticker
        imageSrc="/photos/chotu_saree.jpg"
        caption="Rani Saheba 🪔"
        rotateDeg={7}
        topPct="43%"
        side="right"
      />

      <FloatingPhotoSticker
        imageSrc="/photos/heart_cookie.jpg"
        caption="Sweet Love 🍪"
        rotateDeg={-5}
        topPct="60%"
        side="left"
      />

      <FloatingPhotoSticker
        imageSrc="/photos/chotu_gokart_racing.jpg"
        caption="Racer Queen 🏎️"
        rotateDeg={6}
        topPct="77%"
        side="right"
      />

      <FloatingPhotoSticker
        imageSrc="/photos/sonu_chotu_home_cuddle.jpg"
        caption="My Safe Place 🛋️"
        rotateDeg={-7}
        topPct="89%"
        side="left"
      />
    </div>
  );
};
