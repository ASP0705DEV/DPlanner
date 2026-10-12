import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Image as ImageIcon, BookOpen } from 'lucide-react';
import { AnimatedEnvelope } from '../components/letter/AnimatedEnvelope';
import { ROMANTIC_CONFIG } from '../config/romanticMessages';
import { MobileContainer } from '../components/common/MobileContainer';
import { WashiTape } from '../components/common/WashiTape';

export const ScreenOneLetter: React.FC = () => {
  const navigate = useNavigate();
  const [showOriginalPhoto, setShowOriginalPhoto] = useState(false);

  const handleOpenComplete = () => {
    navigate('/vibe');
  };

  return (
    <MobileContainer className="px-5 py-7 flex flex-col justify-between items-center text-center">
      <div className="w-full my-auto z-10">
        {/* Intro Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFE0E6] text-[#E94F64] border border-[#FFB7C5] text-xs font-bold uppercase tracking-wider mb-2.5 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>{ROMANTIC_CONFIG.heroSubtitle}</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-handwritten text-5xl font-bold text-[#49333A] tracking-tight mb-2 leading-tight"
        >
          {ROMANTIC_CONFIG.heroGreeting}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs sm:text-sm text-[#49333A]/85 leading-relaxed max-w-xs mx-auto mb-5 font-medium"
        >
          {ROMANTIC_CONFIG.heroDescription}
        </motion.p>

        {/* Interactive Couple Scrapbook Polaroid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="relative inline-block mb-6 group"
        >
          <WashiTape color="pink" rotate="-rotate-2" />
          <div className="bg-white p-3 pb-4 rounded-2xl border-2 border-[#49333A]/15 shadow-xl max-w-[240px] mx-auto transform -rotate-1 hover:rotate-0 transition-transform">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-[#49333A]/10 bg-[#FFF8F0]">
              <img
                src={showOriginalPhoto ? '/photos/sonu_chotu_cozy.jpg' : '/doodles/doodle_sonu_chotu_cozy.jpg'}
                alt="Sonu and Chotu"
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              <button
                type="button"
                onClick={() => setShowOriginalPhoto(!showOriginalPhoto)}
                className="absolute bottom-2 right-2 px-2 py-1 bg-white/90 backdrop-blur-xs rounded-full border border-[#49333A]/15 text-[10px] font-bold text-[#49333A] hover:bg-white flex items-center gap-1 shadow-xs cursor-pointer"
                title="Tap to toggle doodle / real photo"
              >
                <ImageIcon className="w-2.5 h-2.5 text-[#E94F64]" />
                <span>{showOriginalPhoto ? 'Doodle' : 'Photo'}</span>
              </button>
            </div>
            <div className="mt-2.5 flex items-center justify-center gap-1 text-[#E94F64]">
              <Heart className="w-3.5 h-3.5 fill-[#E94F64]" />
              <p className="font-handwritten text-xl font-bold text-[#49333A] leading-none">
                Sonu & Chotu
              </p>
              <Heart className="w-3.5 h-3.5 fill-[#E94F64]" />
            </div>
          </div>
        </motion.div>

        {/* Interactive Envelope with opening animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35 }}
        >
          <AnimatedEnvelope onOpenComplete={handleOpenComplete} />
        </motion.div>

        {/* Memory Magazine Quick Access Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-6 pt-4 border-t border-dashed border-[#49333A]/15 text-center"
        >
          <button
            type="button"
            onClick={() => navigate('/memories')}
            className="inline-flex items-center gap-2 py-2 px-4 rounded-2xl bg-white border border-[#49333A]/15 text-xs font-bold text-[#49333A] hover:border-[#FFB7C5] hover:text-[#E94F64] shadow-xs cursor-pointer transition-all hover:scale-102"
          >
            <BookOpen className="w-4 h-4 text-[#E94F64]" />
            <span>Open Our Love Life Magazine 📖</span>
          </button>
          <p className="text-[10px] text-[#49333A]/60 mt-1">
            Flip through our shared memories, photos & stories in Jamshedpur
          </p>
        </motion.div>
      </div>
    </MobileContainer>
  );
};
