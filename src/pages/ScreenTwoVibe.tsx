import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { useDatePlanner } from '../context/DatePlannerContext';
import { useChotuPreferences } from '../context/ChotuPreferencesContext';
import { DATE_VIBES } from '../data/dateVibes';
import { VibeSelectionCard } from '../components/vibes/VibeSelectionCard';
import { StepNavigation } from '../components/common/StepNavigation';
import { ROMANTIC_CONFIG } from '../config/romanticMessages';
import { WashiTape } from '../components/common/WashiTape';
import { MobileContainer } from '../components/common/MobileContainer';
import { getVibeDoodleIcon } from '../components/common/CuteDoodles';

export const ScreenTwoVibe: React.FC = () => {
  const navigate = useNavigate();
  const { selectedVibeId, selectVibe } = useDatePlanner();
  const { isFavoriteVibe } = useChotuPreferences();

  const chosenVibe = DATE_VIBES.find((v) => v.id === selectedVibeId) || DATE_VIBES[0];

  return (
    <MobileContainer className="px-4 py-6 pb-36 relative">
      {/* Header */}
      <div className="text-center max-w-sm mx-auto mb-6 relative">
        <WashiTape color="butter" rotate="rotate-1" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE0E6] text-[#E94F64] border border-[#FFB7C5] text-[11px] font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3 h-3" />
          <span>Step 1: Pick Today's Vibe</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-black text-[#3D2730] mb-1.5 leading-tight tracking-tight">
          {ROMANTIC_CONFIG.vibeScreen.heading}
        </h1>

        <p className="text-xs sm:text-sm text-[#3D2730]/75 font-medium">
          {ROMANTIC_CONFIG.vibeScreen.subheading}
        </p>

        <p className="text-[11px] text-[#E94F64] font-bold mt-2 bg-white/90 py-1 px-3 rounded-full inline-block border border-[#FFB7C5]/40 shadow-xs">
          Pick one mood today — Sonu will customize every detail!
        </p>
      </div>

      {/* Single-select Vibe Cards in Responsive Modern Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-8">
        {DATE_VIBES.map((vibe) => {
          const isSelected = selectedVibeId === vibe.id;
          return (
            <VibeSelectionCard
              key={vibe.id}
              vibe={vibe}
              isSelected={isSelected}
              isChotuFavorite={isFavoriteVibe(vibe.id)}
              onSelect={() => selectVibe(vibe.id)}
            />
          );
        })}
      </div>

      {/* Persistent Step Navigation when nothing is selected */}
      {!selectedVibeId && (
        <StepNavigation
          prevPath="/"
          prevLabel="Letter"
          nextPath="/customize"
          nextLabel={`Customize ${chosenVibe.title}`}
          sweetNote="You pick the vibe, Sonu plans the magic"
        />
      )}

      {/* FLOATING NEXT DOCK AT THE BOTTOM WHEN ANY VIBE IS SELECTED */}
      <AnimatePresence>
        {selectedVibeId && (
          <motion.div
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 90, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
          >
            <div className="max-w-[430px] mx-auto p-2.5 sm:p-3 pointer-events-auto">
              <div className="bg-white/95 backdrop-blur-2xl rounded-2xl border border-white/95 p-3 shadow-[0_15px_40px_-8px_rgba(233,79,100,0.25)] flex items-center justify-between gap-3 ring-1 ring-[#FFB7C5]/40">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FFE0E6] via-[#FFF0F5] to-white border border-[#FFB7C5]/60 flex items-center justify-center shrink-0 shadow-xs">
                    {getVibeDoodleIcon(chosenVibe.id, 'w-8 h-8 text-[#E94F64] drop-shadow-xs')}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-extrabold text-[#E94F64] uppercase tracking-wider flex items-center gap-1">
                      <Heart className="w-2.5 h-2.5 fill-[#E94F64]" />
                      <span>Ready to Plan</span>
                    </span>
                    <h4 className="font-display text-base sm:text-lg font-bold text-[#3D2730] leading-tight truncate">
                      {chosenVibe.title}
                    </h4>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigate('/customize')}
                  className="btn-pookie flex items-center gap-2 py-2.5 px-5 text-xs font-bold shrink-0 shadow-md cursor-pointer hover:scale-103 active:scale-97 transition-transform"
                >
                  <span>Next: Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MobileContainer>
  );
};
