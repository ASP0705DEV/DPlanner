import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Heart, ArrowRight, Sparkles } from 'lucide-react';
import type { DateVibeOption } from '../../types';
import { getVibeDoodleIcon } from '../common/CuteDoodles';

interface VibeSelectionCardProps {
  vibe: DateVibeOption;
  isSelected: boolean;
  isChotuFavorite?: boolean;
  onSelect: () => void;
}

export const VibeSelectionCard: React.FC<VibeSelectionCardProps> = ({
  vibe,
  isSelected,
  isChotuFavorite,
  onSelect,
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      onClick={onSelect}
      className={`group w-full rounded-3xl p-4 sm:p-5 cursor-pointer select-none transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
        isSelected
          ? 'bg-gradient-to-br from-white via-[#FFF5F7] to-[#FFEBF0] border-2 border-[#E94F64] shadow-[0_12px_32px_-6px_rgba(233,79,100,0.22)] ring-2 ring-[#FFB7C5]/40'
          : 'bg-white/95 hover:bg-white border border-[#3D2730]/10 shadow-[0_4px_20px_-4px_rgba(61,39,48,0.06)] hover:border-[#FFB7C5]/80 hover:shadow-[0_8px_24px_-4px_rgba(233,79,100,0.12)]'
      }`}
    >
      <div>
        {/* 1. TOP HEADER: Large prominent doodle icon, titles, badges, and radio */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {/* Enlarged Doodle Icon Container */}
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 shadow-xs border ${
                isSelected
                  ? 'bg-gradient-to-tr from-[#FFE0E6] via-[#FFD6DF] to-white border-[#E94F64] shadow-[0_4px_16px_rgba(233,79,100,0.22)] scale-105'
                  : 'bg-gradient-to-tr from-[#FFF5F7] via-[#FFFDF9] to-white border-[#FFB7C5]/70'
              }`}
            >
              {getVibeDoodleIcon(vibe.id, 'w-9 h-9 sm:w-10 sm:h-10 text-[#E94F64] drop-shadow-xs')}
            </div>

            {/* Title and Badges Column */}
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-base sm:text-lg font-black text-[#3D2730] leading-snug tracking-tight">
                {vibe.title}
              </h3>
              <div className="flex items-center gap-1.5 flex-wrap mt-1">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#FFE0E6] text-[#E94F64] border border-[#FFB7C5]/40 inline-flex items-center shadow-2xs">
                  {vibe.hindiTitle}
                </span>
                {isChotuFavorite && (
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#FFF0F5] to-[#FFE0E6] text-[#E94F64] border border-[#FFB7C5] shadow-2xs inline-flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-[#E94F64] animate-spin" />
                    <span>Chotu's Fav! 👑</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Radio Indicator */}
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all border shrink-0 ${
              isSelected
                ? 'bg-gradient-to-tr from-[#FF758F] to-[#E94F64] text-white border-transparent shadow-xs scale-105'
                : 'bg-[#FFFDF9] text-transparent border-[#3D2730]/20'
            }`}
          >
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
        </div>

        {/* 2. LOVE SLOGAN BOX */}
        <div className="p-3 bg-white/80 backdrop-blur-xs rounded-2xl border border-[#FFB7C5]/35 my-2 shadow-2xs">
          <p className="text-xs sm:text-[13px] text-[#E94F64] font-bold italic leading-relaxed">
            "{vibe.loveSlogan}"
          </p>
        </div>

        {/* 3. DESCRIPTION */}
        <p className="text-xs text-[#3D2730]/80 leading-relaxed font-medium my-2">
          {vibe.description}
        </p>

        {/* 4. ROMANTIC NOTE */}
        <div className="text-[11px] text-[#3D2730]/75 italic flex items-start gap-1.5 leading-snug pt-2.5 border-t border-[#3D2730]/8 my-2.5">
          <Heart className="w-3.5 h-3.5 text-[#E94F64] fill-[#E94F64] shrink-0 mt-0.5" />
          <span>{vibe.romanticNote}</span>
        </div>
      </div>

      {/* 5. PERFECTLY ALIGNED FULL-WIDTH ACTION BUTTON */}
      <div className="mt-1 pt-1">
        {isSelected ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate('/customize');
            }}
            className="w-full py-2.5 sm:py-3 px-4 rounded-2xl bg-gradient-to-r from-[#FF758F] to-[#E94F64] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-[#E94F64]/25 hover:shadow-lg active:scale-98 transition-all cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>Selected Mood • Customize Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="w-full py-2.5 sm:py-3 px-4 rounded-2xl bg-white/90 hover:bg-[#FFE0E6]/50 text-[#E94F64] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-[#FFB7C5]/60 hover:border-[#E94F64]/50 shadow-2xs active:scale-98 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E94F64]" />
            <span>Select This Vibe</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};

