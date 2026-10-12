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
      className={`relative rounded-3xl p-4 sm:p-5 cursor-pointer select-none transition-all duration-300 overflow-hidden flex flex-col justify-between ${
        isSelected
          ? 'bg-gradient-to-br from-white via-[#FFF5F7] to-[#FFEBF0] border-2 border-[#E94F64] shadow-[0_14px_34px_-6px_rgba(233,79,100,0.22)] ring-2 ring-[#FFB7C5]/50'
          : 'bg-white/90 hover:bg-white hover:border-[#FFB7C5] border border-[#3D2730]/10 shadow-[0_4px_20px_-4px_rgba(61,39,48,0.05)] hover:shadow-md'
      }`}
    >
      <div>
        {/* Top row with Doodle icon, title, and radio indicator */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 ${
                isSelected
                  ? 'bg-gradient-to-tr from-[#FFE0E6] to-white border border-[#E94F64]/30 shadow-xs scale-105'
                  : 'bg-[#FFFDF9] border border-[#3D2730]/10'
              }`}
            >
              {getVibeDoodleIcon(vibe.id, 'w-7 h-7')}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-lg sm:text-xl font-extrabold text-[#3D2730] leading-tight tracking-tight">
                {vibe.title}
              </h3>
              <div className="flex items-center gap-1.5 flex-wrap mt-1">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#FFE0E6] text-[#E94F64] border border-[#FFB7C5]/40 inline-flex items-center">
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
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all border shrink-0 ${
              isSelected
                ? 'bg-gradient-to-tr from-[#FF758F] to-[#E94F64] text-white border-transparent shadow-xs scale-105'
                : 'bg-white text-transparent border-[#3D2730]/20'
            }`}
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        </div>

        {/* Love Slogan */}
        <div className="p-2.5 bg-white/70 backdrop-blur-xs rounded-xl border border-[#FFB7C5]/30 my-2.5">
          <p className="text-xs text-[#E94F64] font-bold italic leading-relaxed">
            "{vibe.loveSlogan}"
          </p>
        </div>

        {/* Description */}
        <p className="text-xs text-[#3D2730]/80 leading-relaxed mb-3 font-medium">
          {vibe.description}
        </p>
      </div>

      {/* Romantic whisper note */}
      <div>
        <div className="text-[11px] text-[#3D2730]/75 italic flex items-start gap-1.5 pt-2.5 border-t border-[#3D2730]/8">
          <Heart className="w-3.5 h-3.5 text-[#E94F64] fill-[#E94F64] shrink-0 mt-0.5" />
          <span className="leading-snug">{vibe.romanticNote}</span>
        </div>

        {/* Instant Next Button directly inside selected card */}
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 pt-3 border-t border-[#E94F64]/15 flex items-center justify-between gap-2"
          >
            <span className="text-[11px] font-extrabold text-[#E94F64] flex items-center gap-1">
              <Heart className="w-3 h-3 fill-[#E94F64]" />
              <span>Selected for today!</span>
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/customize');
              }}
              className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FF758F] to-[#E94F64] text-white text-xs font-bold hover:shadow-md active:scale-95 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>Customize Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
