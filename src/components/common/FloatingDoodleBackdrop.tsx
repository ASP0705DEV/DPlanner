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
} from './CuteDoodles';
import { playHeartNudgeSound } from '../../utils/soundEffects';

interface FloatingStickerProps {
  imageSrc: string;
  caption: string;
  rotateDeg: number;
  topPct: string;
  side: 'left' | 'right';
  sideOffset: string;
}

const FloatingPhotoSticker: React.FC<FloatingStickerProps> = ({
  imageSrc,
  caption,
  rotateDeg,
  topPct,
  side,
  sideOffset,
}) => {
  const [isWiggling, setIsWiggling] = useState(false);

  const handleTap = () => {
    setIsWiggling(true);
    playHeartNudgeSound(Math.floor(Math.random() * 5) + 1);
    setTimeout(() => setIsWiggling(false), 600);
  };

  return (
    <motion.div
      onClick={handleTap}
      style={{
        top: topPct,
        [side]: sideOffset,
        rotate: rotateDeg,
      }}
      animate={{
        y: [-6, 6, -6],
        rotate: [rotateDeg - 2, rotateDeg + 2, rotateDeg - 2],
        scale: isWiggling ? [1, 1.15, 1] : 1,
      }}
      transition={{
        y: { duration: 6 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' },
        rotate: { duration: 5 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' },
        scale: { duration: 0.4 },
      }}
      className="absolute z-10 pointer-events-auto cursor-pointer select-none group"
      title={`Our Moment: ${caption} (Tap for a chime!)`}
    >
      <div className="bg-white p-1 pb-1.5 rounded-xl border border-[#49333A]/20 shadow-md group-hover:shadow-lg group-hover:border-[#E94F64] transition-all max-w-[56px] sm:max-w-[64px]">
        {/* Tiny Washi Tape */}
        <div className="w-4 h-1.5 bg-[#FFB7C5]/80 mx-auto -mt-2 mb-0.5 rounded-xs transform -rotate-2" />
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border border-[#49333A]/10 bg-[#FFF8F0]">
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
      {/* 1. LARGER FLOATING DOODLES (INCREASED SIZES & HIGHER CONTRAST) */}

      {/* Floating Heart Top Left (40px) */}
      <motion.div
        className="absolute top-4 left-3 select-none pointer-events-auto cursor-pointer"
        animate={{
          y: [-6, 8, -6],
          rotate: [-6, 8, -6],
        }}
        whileHover={{ scale: 1.25, rotate: 12 }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => playHeartNudgeSound(1)}
        title="Tap me!"
      >
        <DoodleHeart className="w-9 h-9 text-[#E94F64] opacity-70 hover:opacity-100 transition-opacity drop-shadow-xs" />
      </motion.div>

      {/* Floating Golden Star Top Right (44px) */}
      <motion.div
        className="absolute top-5 right-3 select-none pointer-events-auto cursor-pointer"
        animate={{
          y: [8, -8, 8],
          rotate: [6, -8, 6],
        }}
        whileHover={{ scale: 1.25, rotate: -15 }}
        transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => playHeartNudgeSound(2)}
        title="Tap me!"
      >
        <DoodleStar className="w-10 h-10 text-[#F59E0B] opacity-75 hover:opacity-100 transition-opacity drop-shadow-xs" />
      </motion.div>

      {/* Floating Durga Puja Diya / Flame (Festive special) (36px) */}
      <motion.div
        className="absolute top-[22%] right-2 select-none pointer-events-auto cursor-pointer"
        animate={{
          y: [-5, 7, -5],
          rotate: [-4, 6, -4],
        }}
        whileHover={{ scale: 1.25 }}
        transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => playHeartNudgeSound(3)}
        title="Puja Sparkle!"
      >
        <DoodleDurgaPuja className="w-9 h-9 text-[#EA580C] opacity-70 hover:opacity-100 transition-opacity drop-shadow-xs" />
      </motion.div>

      {/* Floating Flower Mid-Left (40px) */}
      <motion.div
        className="absolute top-[36%] left-2 select-none pointer-events-auto cursor-pointer"
        animate={{
          y: [-7, 7, -7],
          scale: [0.95, 1.08, 0.95],
          rotate: [0, 15, 0],
        }}
        whileHover={{ scale: 1.3 }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => playHeartNudgeSound(4)}
        title="Bloom!"
      >
        <DoodleFlower className="w-10 h-10 opacity-70 hover:opacity-100 transition-opacity drop-shadow-xs" />
      </motion.div>

      {/* Floating Coffee Cup Mid-Right (36px) */}
      <motion.div
        className="absolute top-[52%] right-2 select-none pointer-events-auto cursor-pointer"
        animate={{
          y: [6, -6, 6],
          rotate: [-5, 5, -5],
        }}
        whileHover={{ scale: 1.25 }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => playHeartNudgeSound(5)}
        title="Warm coffee!"
      >
        <DoodleCoffeeMug className="w-9 h-9 text-[#78350F] opacity-65 hover:opacity-100 transition-opacity drop-shadow-xs" />
      </motion.div>

      {/* Floating Sparkle Heart Lower-Left (44px) */}
      <motion.div
        className="absolute top-[68%] left-2.5 select-none pointer-events-auto cursor-pointer"
        animate={{
          y: [7, -7, 7],
          rotate: [-6, 6, -6],
        }}
        whileHover={{ scale: 1.25 }}
        transition={{ duration: 6.4, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => playHeartNudgeSound(6)}
        title="Sparkle heart!"
      >
        <DoodleSparkleHeart className="w-10 h-10 text-[#E94F64] opacity-75 hover:opacity-100 transition-opacity drop-shadow-xs" />
      </motion.div>

      {/* Floating Ribbon Bow Bottom Left (40px) */}
      <motion.div
        className="absolute bottom-16 left-3 select-none pointer-events-auto cursor-pointer"
        animate={{
          y: [-5, 5, -5],
          rotate: [4, -4, 4],
        }}
        whileHover={{ scale: 1.25 }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => playHeartNudgeSound(7)}
        title="Cute bow!"
      >
        <DoodleBow className="w-9 h-9 opacity-70 hover:opacity-100 transition-opacity drop-shadow-xs" />
      </motion.div>

      {/* Floating Golden Star Bottom Right (36px) */}
      <motion.div
        className="absolute bottom-16 right-3 select-none pointer-events-auto cursor-pointer"
        animate={{
          y: [6, -6, 6],
          scale: [0.92, 1.1, 0.92],
        }}
        whileHover={{ scale: 1.25 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => playHeartNudgeSound(8)}
        title="Star!"
      >
        <DoodleStar className="w-9 h-9 text-[#F59E0B] opacity-75 hover:opacity-100 transition-opacity drop-shadow-xs" />
      </motion.div>

      {/* 2. REAL SHARED PHOTOS AS FLOATING INTERACTIVE STICKERS */}
      {/* Photo Sticker 1: Chotu Car Smile (Top Right) */}
      <FloatingPhotoSticker
        imageSrc="/photos/chotu_car_smile.jpg"
        caption="Sunshine ☀️"
        rotateDeg={6}
        topPct="11%"
        side="right"
        sideOffset="-6px"
      />

      {/* Photo Sticker 2: Sunflower Bloom (Mid Left) */}
      <FloatingPhotoSticker
        imageSrc="/photos/sonu_chotu_sunflower.jpg"
        caption="Pure US 🌻"
        rotateDeg={-7}
        topPct="26%"
        side="left"
        sideOffset="-6px"
      />

      {/* Photo Sticker 3: Chotu Festive Saree (Mid Right) */}
      <FloatingPhotoSticker
        imageSrc="/photos/chotu_saree.jpg"
        caption="Rani Saheba 🪔"
        rotateDeg={8}
        topPct="43%"
        side="right"
        sideOffset="-6px"
      />

      {/* Photo Sticker 4: Heart Cookie Surprise (Lower Left) */}
      <FloatingPhotoSticker
        imageSrc="/photos/heart_cookie.jpg"
        caption="Sweet Love 🍪"
        rotateDeg={-6}
        topPct="59%"
        side="left"
        sideOffset="-6px"
      />

      {/* Photo Sticker 5: Go-Kart Racer Queen (Lower Right) */}
      <FloatingPhotoSticker
        imageSrc="/photos/chotu_gokart_racing.jpg"
        caption="Racer Queen 🏎️"
        rotateDeg={5}
        topPct="77%"
        side="right"
        sideOffset="-6px"
      />

      {/* Photo Sticker 6: Home Cuddle Peace (Bottom Left) */}
      <FloatingPhotoSticker
        imageSrc="/photos/sonu_chotu_home_cuddle.jpg"
        caption="My Safe Place 🛋️"
        rotateDeg={-8}
        topPct="88%"
        side="left"
        sideOffset="-6px"
      />
    </div>
  );
};
