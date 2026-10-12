import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Send } from 'lucide-react';
import { ROMANTIC_CONFIG } from '../../config/romanticMessages';
import { DoodleHeart } from '../common/CuteDoodles';
import { WashiTape } from '../common/WashiTape';

interface AnimatedEnvelopeProps {
  onOpenComplete: () => void;
}

export const AnimatedEnvelope: React.FC<AnimatedEnvelopeProps> = ({ onOpenComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const triggerOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Burst of romantic pastel confetti
    confetti({
      particleCount: 60,
      spread: 75,
      origin: { y: 0.62 },
      colors: ['#FFB7C5', '#FFE0E6', '#E94F64', '#FFF0B8', '#E7DFFF'],
    });

    setTimeout(() => {
      onOpenComplete();
    }, 1300);
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-2 w-full max-w-sm mx-auto select-none">
      {/* Interactive Envelope Wrapper (overflow-visible so letter isn't clipped) */}
      <div
        className="relative cursor-pointer group mt-4 mb-2 pt-6 pb-2"
        onClick={triggerOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <WashiTape color="pink" rotate="-rotate-2" />

        {/* Outer Envelope Stage */}
        <div className="relative w-72 sm:w-80 h-48 sm:h-52 flex items-center justify-center">
          {/* 1. Envelope Back Wall */}
          <div
            className="absolute inset-0 rounded-2xl bg-[#F8A5B5] border-2 border-[#49333A]/20 shadow-lg"
            style={{
              backgroundImage: 'linear-gradient(145deg, #F9B2C0 0%, #F096A8 100%)',
            }}
          />

          {/* 2. Letter Card nestled inside */}
          <motion.div
            animate={
              isOpen
                ? { y: -80, scale: 1.03, opacity: 1 }
                : isHovered
                ? { y: -25, scale: 1, opacity: 1 }
                : { y: -6, scale: 0.98, opacity: 0.95 }
            }
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="absolute z-10 w-[88%] bg-[#FFFDF9] rounded-2xl border-2 border-dashed border-[#E94F64]/40 shadow-md p-4 text-center flex flex-col items-center justify-between"
            style={{ height: '150px' }}
          >
            {/* Stamp in upper right */}
            <div className="absolute top-2.5 right-3 w-7 h-9 rounded-md border border-dashed border-[#E94F64]/40 bg-[#FFF5F7] p-0.5 flex flex-col items-center justify-between">
              <span className="text-[6px] font-bold text-[#E94F64]">LOVE</span>
              <Heart className="w-2.5 h-2.5 text-[#E94F64] fill-[#E94F64]" />
              <span className="text-[5px] text-[#49333A]/60 font-semibold">10/10</span>
            </div>

            <div className="flex items-center gap-1.5 text-[#E94F64] mb-0.5 pr-8">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] animate-spin" />
              <span className="font-handwritten text-lg font-bold">
                A Letter for Chotu
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            </div>

            <p className="font-handwritten text-2xl font-bold text-[#49333A] leading-tight my-auto">
              “Aaj kya karein, meri jaan?”
            </p>

            <span className="text-[11px] font-bold text-[#E94F64] bg-[#FFE0E6] px-3 py-1 rounded-full border border-[#FFB7C5] shadow-2xs">
              Tap to unveil our cozy date universe ✨
            </span>
          </motion.div>

          {/* 3. Envelope Front Pocket (Left & Right folded triangles) */}
          <div className="absolute inset-0 z-20 pointer-events-none rounded-2xl overflow-hidden">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 320 208"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Bottom fold */}
              <polygon
                points="0,208 160,105 320,208"
                fill="#FFCAD4"
                stroke="#49333A"
                strokeWidth="1.5"
                strokeOpacity="0.2"
              />
              {/* Left fold */}
              <polygon
                points="0,0 0,208 160,105"
                fill="#FFB7C5"
                fillOpacity="0.9"
                stroke="#49333A"
                strokeWidth="1.5"
                strokeOpacity="0.2"
              />
              {/* Right fold */}
              <polygon
                points="320,0 320,208 160,105"
                fill="#FFAEBE"
                fillOpacity="0.9"
                stroke="#49333A"
                strokeWidth="1.5"
                strokeOpacity="0.2"
              />
            </svg>
          </div>

          {/* 4. Top Triangular Flap & Wax Seal Stamp */}
          <motion.div
            className="absolute top-0 inset-x-0 h-28 z-30 pointer-events-none origin-top"
            animate={
              isOpen
                ? { rotateX: 180, opacity: 0 }
                : isHovered
                ? { rotateX: 30 }
                : { rotateX: 0 }
            }
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ perspective: 1000 }}
          >
            <svg
              className="w-full h-full drop-shadow-sm"
              viewBox="0 0 320 112"
              preserveAspectRatio="none"
              fill="none"
            >
              <polygon
                points="0,0 320,0 160,112"
                fill="#FFA8B9"
                stroke="#49333A"
                strokeWidth="1.5"
                strokeOpacity="0.25"
              />
            </svg>

            {/* Red Wax Seal sitting directly on the triangle flap tip */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
              <motion.div
                animate={
                  isOpen
                    ? { scale: 0, opacity: 0 }
                    : isHovered
                    ? { scale: 1.1 }
                    : { scale: 1 }
                }
                transition={{ duration: 0.3 }}
                className="w-12 h-12 rounded-full bg-[#E94F64] border-2 border-white shadow-md flex items-center justify-center text-white cursor-pointer pointer-events-auto"
                title="Tap to break the seal!"
              >
                <Heart className="w-6 h-6 fill-white drop-shadow-xs animate-pulse" />
              </motion.div>
            </div>
          </motion.div>

          {/* 5. Hearts bursting out upon opening */}
          <AnimatePresence>
            {isOpen && (
              <>
                {[...Array(7)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 1, scale: 0.4, y: 0, x: 0 }}
                    animate={{
                      opacity: 0,
                      scale: 1.4,
                      y: -100 - i * 18,
                      x: (i % 2 === 0 ? 1 : -1) * (25 + i * 12),
                    }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="absolute z-40 pointer-events-none"
                  >
                    <DoodleHeart
                      className="w-6 h-6"
                      color={i % 2 === 0 ? '#E94F64' : '#FFB7C5'}
                    />
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Button & Romantic Text below */}
      <div className="mt-5 flex flex-col items-center text-center max-w-xs relative z-10">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={triggerOpen}
          disabled={isOpen}
          className="btn-pookie flex items-center justify-center gap-2 text-base font-bold px-8 py-3 shadow-lg cursor-pointer w-full"
        >
          <span>{ROMANTIC_CONFIG.heroButtonText}</span>
          <Send className="w-4 h-4 fill-white" />
        </motion.button>
        <p className="mt-2 text-xs text-[#49333A]/70 font-medium">
          {ROMANTIC_CONFIG.heroFooterText}
        </p>
      </div>
    </div>
  );
};
