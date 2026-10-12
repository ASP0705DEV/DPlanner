import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Heart, ArrowRight } from 'lucide-react';
import type { DateVibeOption } from '../../types';
import { getVibeDoodleIcon } from '../common/CuteDoodles';

interface VibeSelectionCardProps {
  vibe: DateVibeOption;
  isSelected: boolean;
  onSelect: () => void;
}

export const VibeSelectionCard: React.FC<VibeSelectionCardProps> = ({
  vibe,
  isSelected,
  onSelect,
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`relative scrapbook-card p-4 sm:p-5 cursor-pointer select-none transition-all duration-200 overflow-hidden ${
        isSelected
          ? 'ring-4 ring-[#E94F64]/40 bg-[#FFF5F7] border-[#E94F64] shadow-md'
          : 'bg-white hover:border-[#FFB7C5] border-2 border-[#49333A]/10'
      }`}
    >
      {/* Top row with Doodle icon, title, and radio indicator */}
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF8F0] border border-[#49333A]/15 shadow-xs flex items-center justify-center shrink-0">
            {getVibeDoodleIcon(vibe.id, 'w-8 h-8')}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-handwritten text-2xl font-bold text-[#49333A] leading-tight">
              {vibe.title}
            </h3>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FFE0E6] text-[#E94F64] border border-[#FFB7C5]/40 inline-flex items-center mt-0.5">
              {vibe.hindiTitle}
            </span>
          </div>
        </div>

        {/* Radio Indicator */}
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors border shrink-0 ${
            isSelected
              ? 'bg-[#E94F64] text-white border-[#E94F64]'
              : 'bg-white text-transparent border-[#49333A]/25'
          }`}
        >
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </div>
      </div>

      {/* Love Slogan */}
      <div className="p-2.5 bg-[#FFF8F0] rounded-xl border border-dashed border-[#49333A]/15 my-2.5">
        <p className="text-xs text-[#E94F64] font-bold italic leading-relaxed">
          {vibe.loveSlogan}
        </p>
      </div>

      {/* Description */}
      <p className="text-xs text-[#49333A]/85 leading-relaxed mb-2.5">
        {vibe.description}
      </p>

      {/* Romantic whisper - completely visible, no text hidden */}
      <div className="text-[11px] text-[#49333A]/75 italic flex items-start gap-1.5 pt-2 border-t border-[#49333A]/10">
        <Heart className="w-3.5 h-3.5 text-[#E94F64] fill-[#E94F64] shrink-0 mt-0.5" />
        <span className="leading-snug">{vibe.romanticNote}</span>
      </div>

      {/* Instant Next Button directly inside selected card */}
      {isSelected && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 pt-3 border-t border-[#E94F64]/20 flex items-center justify-between gap-2"
        >
          <span className="text-[11px] font-bold text-[#E94F64] flex items-center gap-1">
            <Heart className="w-3 h-3 fill-[#E94F64]" />
            <span>Selected for today!</span>
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate('/customize');
            }}
            className="px-4 py-2 rounded-full bg-[#E94F64] text-white text-xs font-bold hover:bg-[#D43D52] active:scale-95 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Customize This Date</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};
