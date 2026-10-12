import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';
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

    // Trigger sweet romantic confetti bursting with hearts and pastel colors
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFB7C5', '#FFE0E6', '#E94F64', '#FFF0B8', '#E7DFFF'],
    });

    setTimeout(() => {
      onOpenComplete();
    }, 1200);
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-2">

      {/* Main Interactive Envelope Container */}
      <div
        className="relative cursor-pointer group"
        onClick={triggerOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <WashiTape color="pink" rotate="-rotate-2" />

        {/* Envelope Body */}
        <motion.div
          animate={isOpen ? { scale: 1.08, y: -15 } : { scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative w-80 sm:w-96 h-56 sm:h-64 bg-[#FFE0E6] rounded-2xl border-2 border-[#49333A]/20 shadow-xl flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage:
              'linear-gradient(135deg, #FFE0E6 0%, #FFB7C5 50%, #FFE0E6 100%)',
          }}
        >
          {/* Envelope Back Triangle Lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 384 256"
            fill="none"
          >
            <path
              d="M0 256L192 120L384 256"
              stroke="#49333A"
              strokeWidth="2"
              strokeOpacity="0.25"
            />
            <path
              d="M0 0L192 135L384 0"
              stroke="#49333A"
              strokeWidth="2"
              strokeOpacity="0.25"
            />
          </svg>

          {/* Letter Peeking out */}
          <motion.div
            animate={
              isOpen
                ? { y: -115, opacity: 1, scale: 1.05 }
                : isHovered
                ? { y: -30, opacity: 1 }
                : { y: -8, opacity: 0.95 }
            }
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute -top-10 w-[90%] h-44 bg-[#FFF8F0] border-2 border-dashed border-[#E94F64]/40 rounded-2xl shadow-md px-4 py-3 flex flex-col items-center text-center z-10"
          >
            <div className="flex items-center gap-1.5 text-[#E94F64] mb-0.5">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span className="font-handwritten text-lg font-bold">
                A Letter for Chotu
              </span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <p className="font-handwritten text-2xl font-bold text-[#49333A] leading-tight mb-1">
              “Aaj kya karein, meri jaan?”
            </p>
            <p className="text-xs text-[#E94F64] font-semibold bg-[#FFE0E6] px-3 py-1 rounded-full border border-[#FFB7C5]/50 inline-block shadow-2xs">
              Tap to unveil our cozy date universe
            </p>
          </motion.div>

          {/* Front Flap & Wax Seal Stamp */}
          <div className="absolute inset-0 flex items-end justify-center pb-5 pointer-events-none z-20">
            <motion.div
              animate={isOpen ? { scale: [1, 1.4, 0], opacity: 0 } : { scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-14 h-14 rounded-full bg-[#E94F64] border-4 border-white shadow-lg flex items-center justify-center text-white cursor-pointer pointer-events-auto"
              title="Tap to open!"
            >
              <Heart className="w-7 h-7 fill-white animate-pulse" />
            </motion.div>
          </div>

          {/* Floating Hearts Erupting when opened */}
          <AnimatePresence>
            {isOpen && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 1, scale: 0.5, y: 0, x: 0 }}
                    animate={{
                      opacity: 0,
                      scale: 1.5,
                      y: -120 - i * 20,
                      x: (i % 2 === 0 ? 1 : -1) * (30 + i * 15),
                    }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="absolute z-30 pointer-events-none"
                  >
                    <DoodleHeart
                      className="w-7 h-7"
                      color={i % 2 === 0 ? '#E94F64' : '#FFB7C5'}
                    />
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Button & Romantic Text below */}
      <div className="mt-8 flex flex-col items-center text-center max-w-md relative z-10">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={triggerOpen}
          disabled={isOpen}
          className="btn-pookie flex items-center gap-2 text-base font-bold px-7 py-3 shadow-xl cursor-pointer"
        >
          <span>{ROMANTIC_CONFIG.heroButtonText}</span>
          <Heart className="w-4 h-4 fill-white" />
        </motion.button>
        <p className="mt-2.5 text-xs text-[#49333A]/70 font-medium">
          {ROMANTIC_CONFIG.heroFooterText}
        </p>
      </div>
    </div>
  );
};
