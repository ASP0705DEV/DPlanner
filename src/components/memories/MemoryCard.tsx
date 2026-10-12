import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Calendar,
  Heart,
  Image as ImageIcon,
  Trash2,
  Sparkles,
  Quote,
} from 'lucide-react';
import type { LoveMemory } from '../../types/memory';
import { WashiTape } from '../common/WashiTape';

interface MemoryCardProps {
  memory: LoveMemory;
  onDelete?: (id: string) => void;
  viewMode?: 'magazine' | 'polaroid';
}

export const MemoryCard: React.FC<MemoryCardProps> = ({
  memory,
  onDelete,
  viewMode = 'magazine',
}) => {
  const [showDoodle, setShowDoodle] = useState(false);
  const hasDoodle = Boolean(memory.doodleUrl);

  const displayImage = hasDoodle && showDoodle ? memory.doodleUrl : memory.photoUrl;

  if (viewMode === 'polaroid') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="scrapbook-card bg-white p-3.5 pb-4 rounded-3xl border-2 border-[#49333A]/10 shadow-md flex flex-col justify-between hover:shadow-lg transition-all relative group"
      >
        <WashiTape color={memory.isUserAdded ? 'mint' : 'pink'} rotate="-rotate-1" />

        {/* Polaroid Picture */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-[#49333A]/10 bg-[#FFF8F0] mb-3">
          <img
            src={displayImage}
            alt={memory.title}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          />

          {hasDoodle && (
            <button
              type="button"
              onClick={() => setShowDoodle(!showDoodle)}
              className="absolute bottom-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-xs text-[#E94F64] border border-[#FFB7C5] hover:bg-white shadow-xs cursor-pointer flex items-center gap-1"
            >
              <ImageIcon className="w-2.5 h-2.5" />
              <span>{showDoodle ? 'Photo' : 'Doodle'}</span>
            </button>
          )}

          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full text-[9px] font-bold text-[#E94F64] border border-[#FFB7C5]/40">
            {memory.categoryLabel}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1 text-[10px] text-[#49333A]/60 font-semibold mb-1">
              <Calendar className="w-2.5 h-2.5 text-[#E94F64]" />
              <span>{memory.date}</span>
              <span>•</span>
              <MapPin className="w-2.5 h-2.5 text-[#E94F64]" />
              <span className="truncate">{memory.location}</span>
            </div>

            <h3 className="font-handwritten text-xl font-bold text-[#49333A] leading-tight mb-1">
              {memory.title}
            </h3>

            <p className="text-[11px] text-[#49333A]/75 italic leading-snug line-clamp-2 mb-2">
              "{memory.caption}"
            </p>
          </div>

          <div className="pt-2 border-t border-dashed border-[#49333A]/10 flex items-center justify-between text-[10px]">
            <span className="text-[#E94F64] font-bold flex items-center gap-1">
              <Heart className="w-3 h-3 fill-[#E94F64]" />
              <span>Sonu & Chotu</span>
            </span>

            {memory.isUserAdded && onDelete && (
              <button
                type="button"
                onClick={() => onDelete(memory.id)}
                className="text-[#DC2626] hover:bg-[#FEE2E2] p-1 rounded-lg transition-colors cursor-pointer"
                title="Delete this memory"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Default: Magazine Editorial View
  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="relative scrapbook-card bg-white p-4 sm:p-5 rounded-3xl border-2 border-[#49333A]/15 shadow-lg overflow-hidden transition-all"
    >
      <WashiTape color={memory.isUserAdded ? 'butter' : 'pink'} rotate={memory.isUserAdded ? 'rotate-1' : '-rotate-1'} />

      {/* Top Editorial Row */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#E94F64] bg-[#FFE0E6] px-2.5 py-0.5 rounded-full border border-[#FFB7C5]/50 inline-flex items-center gap-1 shadow-2xs">
            <Sparkles className="w-2.5 h-2.5" />
            <span>{memory.categoryLabel}</span>
          </span>

          {memory.isUserAdded && (
            <span className="text-[9px] font-bold text-[#059669] bg-[#D1FAE5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
              User Added Memory
            </span>
          )}
        </div>

        {memory.isUserAdded && onDelete && (
          <button
            type="button"
            onClick={() => onDelete(memory.id)}
            className="text-[#DC2626] p-1.5 rounded-xl hover:bg-[#FEE2E2] transition-colors cursor-pointer text-xs flex items-center gap-1"
            title="Remove memory"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold hidden sm:inline">Delete</span>
          </button>
        )}
      </div>

      {/* Headline & Meta */}
      <div className="mb-3.5">
        <h3 className="font-handwritten text-2xl sm:text-3xl font-bold text-[#49333A] leading-tight mb-1.5">
          {memory.title}
        </h3>

        <div className="flex items-center gap-3 text-xs text-[#49333A]/70 font-semibold flex-wrap">
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#E94F64]" />
            <span>{memory.date}</span>
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#E94F64]" />
            <span>{memory.location}</span>
          </span>
        </div>
      </div>

      {/* Feature Photo Frame */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-[#49333A]/10 bg-[#FFF8F0] shadow-sm mb-3.5">
        <div className="aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden">
          <img
            src={displayImage}
            alt={memory.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-101"
          />
        </div>

        {hasDoodle && (
          <div className="absolute top-3 right-3">
            <button
              type="button"
              onClick={() => setShowDoodle(!showDoodle)}
              className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[#E94F64] border border-[#FFB7C5] hover:bg-white shadow-sm cursor-pointer flex items-center gap-1.5 transition-all"
            >
              <ImageIcon className="w-3 h-3" />
              <span>{showDoodle ? 'View Real Photo' : 'View Doodle Art'}</span>
            </button>
          </div>
        )}

        {/* Photo Polaroid Caption Bar */}
        <div className="p-2.5 bg-white/95 border-t border-[#49333A]/10 flex items-center gap-2">
          <Quote className="w-3.5 h-3.5 text-[#E94F64] shrink-0" />
          <p className="text-xs text-[#49333A]/85 italic font-medium leading-snug">
            {memory.caption}
          </p>
        </div>
      </div>

      {/* Editorial Story Context */}
      <div className="p-3.5 bg-[#FFF8F0] rounded-2xl border border-dashed border-[#49333A]/15 mb-3">
        <span className="text-[10px] font-bold text-[#E94F64] uppercase tracking-wider block mb-1">
          The Story & Context:
        </span>
        <p className="text-xs sm:text-sm text-[#49333A]/90 leading-relaxed font-normal">
          {memory.story}
        </p>
      </div>

      {/* Note from Sonu */}
      {memory.sonuNote && (
        <div className="p-3 bg-gradient-to-r from-[#FFE0E6]/50 to-[#FFF8F0] rounded-2xl border border-[#FFB7C5] flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-full bg-[#FFE0E6] border border-[#FFB7C5] flex items-center justify-center shrink-0 mt-0.5">
            <Heart className="w-3 h-3 fill-[#E94F64] text-[#E94F64]" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold text-[#E94F64] uppercase tracking-wide block">
              Sonu's Note:
            </span>
            <p className="font-handwritten text-lg text-[#49333A] italic leading-snug">
              “{memory.sonuNote}”
            </p>
          </div>
        </div>
      )}
    </motion.article>
  );
};
