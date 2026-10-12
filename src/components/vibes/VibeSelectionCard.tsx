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
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`group relative rounded-3xl p-4 sm:p-5 cursor-pointer select-none transition-all duration-300 overflow-hidden flex flex-col justify-between h-full ${
        isSelected
          ? 'bg-gradient-to-br from-white via-[#FFF5F7] to-[#FFEBF0] border-2 border-[#E94F64] shadow-[0_14px_34px_-6px_rgba(233,79,100,0.24)] ring-2 ring-[#FFB7C5]/50'
          : 'bg-white/95 hover:bg-white hover:border-[#FFB7C5] border border-[#3D2730]/10 shadow-[0_4px_20px_-4px_rgba(61,39,48,0.06)] hover:shadow-[0_10px_25px_-5px_rgba(233,79,100,0.14)]'
      }`}
    >
      <div>
        {/* 1. TOP HEADER: Large prominent doodle icon, titles, badges, and radio */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {/* Enlarged Doodle Icon Container */}
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 shadow-sm border ${
                isSelected
                  ? 'bg-gradient-to-tr from-[#FFE0E6] via-[#FFD6DF] to-white border-[#E94F64] shadow-[0_4px_16px_rgba(233,79,100,0.22)] scale-105'
                  : 'bg-gradient-to-tr from-[#FFF5F7] via-[#FFFDF9] to-white border-[#FFB7C5]/70 group-hover:scale-102'
              }`}
            >
              {getVibeDoodleIcon(vibe.id, 'w-9 h-9 sm:w-10 sm:h-10 text-[#E94F64] drop-shadow-xs')}
            </div>

            {/* Title and Badges Column */}
            <div className="min-w-0 flex-1 flex flex-col justify-center min-h-[48px]">
              <h3 className="font-display text-base sm:text-lg font-black text-[#3D2730] leading-tight tracking-tight line-clamp-1">
                {vibe.title}
              </h3>
              <div className="flex items-center gap-1.5 flex-wrap mt-1">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#FFE0E6] text-[#E94F64] border border-[#FFB7C5]/40 inline-flex items-center shadow-2xs">
                  {vibe.hindiTitle}
                </span>
                {isChotuFavorite && (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-gradient-to-r from-[#FFF0F5] to-[#FFE0E6] text-[#E94F64] border border-[#FFB7C5] shadow-2xs inline-flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-[#E94F64] animate-spin" />
                    <span>Chotu's Fav! 👑</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Radio Indicator */}
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all border shrink-0 mt-1 ${
              isSelected
                ? 'bg-gradient-to-tr from-[#FF758F] to-[#E94F64] text-white border-transparent shadow-xs scale-105'
                : 'bg-white text-transparent border-[#3D2730]/20'
            }`}
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        </div>

        {/* 2. LOVE SLOGAN BOX: Fixed height for 100% uniform row alignment */}
        <div className="min-h-[50px] sm:min-h-[52px] p-2.5 bg-white/80 backdrop-blur-xs rounded-xl border border-[#FFB7C5]/30 my-2.5 flex items-center">
          <p className="text-xs text-[#E94F64] font-bold italic leading-snug line-clamp-2">
            "{vibe.loveSlogan}"
          </p>
        </div>

        {/* 3. DESCRIPTION BOX: Fixed minimum height for grid symmetry */}
        <div className="min-h-[38px] sm:min-h-[42px] flex items-start text-xs text-[#3D2730]/80 leading-relaxed mb-3 font-medium">
          <p className="line-clamp-2">{vibe.description}</p>
        </div>
      </div>

      {/* 4. PINNED FOOTER: Whisper note and status row */}
      <div className="mt-auto pt-2.5 border-t border-[#3D2730]/8 flex flex-col justify-between min-h-[64px]">
        {/* Romantic note */}
        <div className="text-[11px] text-[#3D2730]/75 italic flex items-start gap-1.5 leading-snug min-h-[30px]">
          <Heart className="w-3.5 h-3.5 text-[#E94F64] fill-[#E94F64] shrink-0 mt-0.5" />
          <span className="line-clamp-2">{vibe.romanticNote}</span>
        </div>

        {/* Symmetrical Status Bar */}
        {isSelected ? (
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#E94F64]/15">
            <span className="text-[11px] font-extrabold text-[#E94F64] flex items-center gap-1">
              <Heart className="w-3 h-3 fill-[#E94F64]" />
              <span>Selected mood 💕</span>
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/customize');
              }}
              className="px-3 py-1 rounded-full bg-gradient-to-r from-[#FF758F] to-[#E94F64] text-white text-[11px] font-bold hover:shadow-md active:scale-95 transition-all shadow-xs flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>Customize</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-transparent text-[#3D2730]/45 text-[11px] font-medium">
            <span className="flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-[#E94F64]/70" />
              <span>Tap to choose vibe</span>
            </span>
            <span className="text-[10px] text-[#E94F64] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              Select →
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

