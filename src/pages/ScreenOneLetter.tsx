import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Camera, Crown } from 'lucide-react';
import { AnimatedEnvelope } from '../components/letter/AnimatedEnvelope';
import { ROMANTIC_CONFIG } from '../config/romanticMessages';
import { MobileContainer } from '../components/common/MobileContainer';
import { InstallAppModal } from '../components/common/InstallAppModal';

export const ScreenOneLetter: React.FC = () => {
  const navigate = useNavigate();
  const [showInstallModal, setShowInstallModal] = useState(false);

  const handleOpenComplete = () => {
    navigate('/vibe');
  };

  return (
    <MobileContainer className="px-4 sm:px-5 py-6 sm:py-8 flex flex-col justify-between items-center text-center">
      <div className="w-full my-auto z-10 mx-auto">
        {/* Intro Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#FFE0E6] via-[#FFF0F5] to-[#FFE0E6] text-[#E94F64] border border-[#FFB7C5]/60 text-[11px] font-extrabold uppercase tracking-wider mb-2.5 shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E94F64] animate-spin" />
          <span>{ROMANTIC_CONFIG.heroSubtitle}</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl font-black text-[#3D2730] tracking-tight mb-2 leading-tight"
        >
          {ROMANTIC_CONFIG.heroGreeting}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs sm:text-sm text-[#3D2730]/80 leading-relaxed max-w-md mx-auto mb-6 font-medium"
        >
          {ROMANTIC_CONFIG.heroDescription}
        </motion.p>

        {/* Interactive Envelope with opening animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
        >
          <AnimatedEnvelope onOpenComplete={handleOpenComplete} />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-8 pt-5 border-t border-[#3D2730]/10 flex flex-col items-center gap-2.5"
        >
          <div className="flex items-center gap-2.5 flex-wrap justify-center">
            <button
              type="button"
              onClick={() => navigate('/favorites')}
              className="inline-flex items-center gap-2 py-2.5 px-4 rounded-full bg-gradient-to-r from-[#FFE0E6] to-[#FFF0F5] border border-[#FFB7C5] text-xs font-bold text-[#E94F64] hover:border-[#E94F64] hover:bg-white shadow-xs cursor-pointer transition-all hover:scale-103"
            >
              <Crown className="w-4 h-4 text-[#E94F64] fill-[#E94F64]/20" />
              <span>Queen's Handbook 👑</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/memories')}
              className="inline-flex items-center gap-2 py-2.5 px-4 rounded-full bg-white/95 backdrop-blur-md border border-[#FFB7C5]/60 text-xs font-bold text-[#3D2730] hover:border-[#E94F64] hover:text-[#E94F64] hover:bg-white shadow-xs cursor-pointer transition-all hover:scale-103"
            >
              <Camera className="w-4 h-4 text-[#E94F64]" />
              <span>Love Journal 📖</span>
            </button>
          </div>
          <p className="text-[11px] text-[#3D2730]/65 font-medium">
            Fill Chotu's favorites handbook or explore our romantic memories
          </p>
        </motion.div>

        <InstallAppModal
          isOpen={showInstallModal}
          onClose={() => setShowInstallModal(false)}
        />
      </div>
    </MobileContainer>
  );
};
