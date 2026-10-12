import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Share2,
  Download,
  Copy,
  Check,
  MapPin,
  Calendar,
  Maximize2,
  Trash2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import type { LoveMemory } from '../../types/memory';
import { playHeartNudgeSound, playCelebrationTone } from '../../utils/soundEffects';

interface MemoryJournalCardProps {
  memory: LoveMemory;
  isSelected?: boolean;
  isSelectionMode?: boolean;
  onToggleSelect?: (id: string) => void;
  onDelete?: (id: string) => void;
  onOpenLightbox?: (memory: LoveMemory) => void;
}

export const MemoryJournalCard: React.FC<MemoryJournalCardProps> = ({
  memory,
  isSelected = false,
  isSelectionMode = false,
  onToggleSelect,
  onDelete,
  onOpenLightbox,
}) => {
  const [likes, setLikes] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleLike = () => {
    if (!isLiked) {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
      setShowHeartBurst(true);
      playHeartNudgeSound(2);
      setTimeout(() => setShowHeartBurst(false), 900);
    } else {
      setLikes((prev) => Math.max(1, prev - 1));
      setIsLiked(false);
    }
  };

  const handleDoubleTap = () => {
    if (!isLiked) {
      handleLike();
    } else {
      setShowHeartBurst(true);
      playHeartNudgeSound(3);
      setTimeout(() => setShowHeartBurst(false), 900);
    }
  };

  // 1. WhatsApp Share
  const handleWhatsAppShare = () => {
    const text = `✨ Our Love Memory • Sonu & Chotu ✨\n\n📸 ${memory.title}\n📍 ${memory.location} • 📅 ${memory.date}\n\n"${memory.story}"\n\n${memory.caption ? `“${memory.caption}”\n\n` : ''}${memory.sonuNote ? `💖 Sonu's Note: "${memory.sonuNote}"\n\n` : ''}Forever Sonu & Chotu 💕`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    playCelebrationTone();
  };

  // 2. Native Web Share (AirDrop / Instagram / Any App)
  const handleNativeShare = async () => {
    const shareData = {
      title: `${memory.title} • Sonu & Chotu`,
      text: `Look at our memory: "${memory.story}" 💕`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      } catch (err) {
        // User cancelled share
      }
    } else {
      // Fallback: Copy link
      handleCopyText();
    }
  };

  // 3. Download Photo to Device
  const handleDownloadPhoto = async () => {
    try {
      const response = await fetch(memory.photoUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `sonu_chotu_${memory.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      playCelebrationTone();
    } catch (err) {
      // Direct open in new tab fallback
      window.open(memory.photoUrl, '_blank');
    }
  };

  // 4. Copy Memory Quote
  const handleCopyText = () => {
    const quote = `"${memory.title}"\n📍 ${memory.location}\n\n${memory.story}\n\n— Sonu & Chotu 💕`;
    navigator.clipboard.writeText(quote);
    setCopied(true);
    playHeartNudgeSound(1);
    setTimeout(() => setCopied(false), 2200);
  };

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(memory.location || 'Jamshedpur')}`;

  return (
    <article
      className={`glass-panel bg-white/92 backdrop-blur-2xl border transition-all duration-300 rounded-[2rem] overflow-hidden mb-7 sm:mb-8 shadow-[0_12px_35px_-8px_rgba(233,79,100,0.12)] hover:shadow-[0_20px_50px_-8px_rgba(233,79,100,0.22)] ${
        isSelected
          ? 'ring-2 ring-[#E94F64] border-[#E94F64] bg-gradient-to-b from-[#FFF0F5]/90 to-white/95'
          : 'border-white/95 ring-1 ring-[#FFB7C5]/30'
      }`}
    >
      {/* 1. EDITORIAL HEADER */}
      <div className="p-4 sm:p-5 pb-3.5 flex items-start justify-between gap-3 border-b border-[#3D2730]/6">
        <div className="flex items-center gap-3 min-w-0">
          {/* Multi-Selection Checkbox */}
          {isSelectionMode && (
            <button
              type="button"
              onClick={() => onToggleSelect && onToggleSelect(memory.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#E94F64] border-[#E94F64] text-white shadow-xs'
                  : 'bg-white border-[#3D2730]/25 hover:border-[#E94F64]'
              }`}
              title={isSelected ? 'Deselect memory' : 'Select memory to share'}
            >
              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </button>
          )}

          <div className="min-w-0">
            {/* Date & Location Pills */}
            <div className="flex items-center gap-2 flex-wrap text-[11px] font-semibold text-[#3D2730]/75">
              <span className="inline-flex items-center gap-1 bg-[#FFF0F5] text-[#E94F64] px-2.5 py-0.5 rounded-full border border-[#FFB7C5]/50 shadow-2xs">
                <Calendar className="w-3 h-3" />
                <span>{memory.date || 'Special Memory'}</span>
              </span>

              {memory.location && (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#E94F64] hover:underline"
                  title="View on Google Maps"
                >
                  <MapPin className="w-3 h-3 text-[#E94F64]" />
                  <span className="truncate max-w-[160px] sm:max-w-[240px]">{memory.location}</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Category Badge & Delete Action */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[10px] font-extrabold text-[#E94F64] bg-[#FFE0E6] px-2.5 py-0.5 rounded-full border border-[#FFB7C5]/50 shadow-2xs">
            {memory.categoryLabel || 'Keepsake'}
          </span>

          {memory.isUserAdded && onDelete && (
            <button
              type="button"
              onClick={() => onDelete(memory.id)}
              className="text-[#DC2626] hover:bg-[#FEE2E2] p-1.5 rounded-full transition-colors cursor-pointer"
              title="Delete memory"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. FULL UNCROPPED EDITORIAL PHOTO DISPLAY */}
      <div
        onClick={() => onOpenLightbox && onOpenLightbox(memory)}
        onDoubleClick={handleDoubleTap}
        className="relative bg-neutral-900 overflow-hidden flex items-center justify-center cursor-pointer group min-h-[300px] max-h-[580px]"
        title="Tap to open full photo • Double-tap for heart chime"
      >
        {/* Soft Ambient Blurred Backdrop */}
        <img
          src={memory.photoUrl}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-110 pointer-events-none"
        />

        {/* 100% Full Uncropped Image */}
        <img
          src={memory.photoUrl}
          alt={memory.title}
          className="relative z-10 w-full max-h-[560px] object-contain block mx-auto transition-transform duration-300"
        />

        {/* Top-Right Lightbox Zoom */}
        {onOpenLightbox && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenLightbox(memory);
            }}
            className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full bg-black/55 text-white hover:bg-black/80 backdrop-blur-xs transition-all cursor-pointer shadow-md opacity-85 hover:opacity-100 hover:scale-105"
            title="Open high-res full view"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        )}

        {/* Bottom Ambient Tag */}
        <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-xs text-[10px] font-bold text-white/90 border border-white/20 shadow-xs flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#FFB7C5]" />
            <span>Sonu & Chotu</span>
          </span>
        </div>

        {/* Double-tap Heart Burst Animation */}
        <AnimatePresence>
          {showHeartBurst && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 0.9] }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute z-30 pointer-events-none text-white drop-shadow-xl"
            >
              <Heart className="w-24 h-24 fill-[#E94F64] text-[#E94F64]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. MULTI-SHARE & INTERACTION ACTION BAR */}
      <div className="p-4 sm:p-5 pt-3 pb-4">
        <div className="flex items-center justify-between gap-2 border-b border-[#3D2730]/6 pb-3 mb-3.5">
          {/* Left: Romantic Heart Reaction */}
          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              whileTap={{ scale: 1.3 }}
              onClick={handleLike}
              className={`p-2 rounded-2xl border transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
                isLiked
                  ? 'bg-[#FFE0E6] border-[#E94F64] text-[#E94F64]'
                  : 'bg-white border-[#3D2730]/12 text-[#3D2730]/80 hover:border-[#FFB7C5]'
              }`}
              title="Give love reaction"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#E94F64] text-[#E94F64]' : ''}`} />
              <span className="text-xs font-bold">{likes}</span>
            </motion.button>
          </div>

          {/* Right: Multiple Share Actions */}
          <div className="flex items-center gap-1.5">
            {/* Share to WhatsApp */}
            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="p-2 rounded-2xl bg-white border border-[#3D2730]/12 text-[#25D366] hover:bg-[#D1FAE5] hover:border-[#25D366] transition-all cursor-pointer shadow-2xs hover:scale-105"
              title="Share story on WhatsApp"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Native Web Share (Instagram Story / AirDrop / Any App) */}
            <button
              type="button"
              onClick={handleNativeShare}
              className={`px-3 py-1.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer shadow-2xs inline-flex items-center gap-1 hover:scale-103 ${
                shareSuccess
                  ? 'bg-[#D1FAE5] border-[#10B981] text-[#059669]'
                  : 'bg-white border-[#3D2730]/12 text-[#3D2730] hover:border-[#FFB7C5] hover:text-[#E94F64]'
              }`}
              title="Share photo via device share sheet"
            >
              <Share2 className="w-3.5 h-3.5 text-[#E94F64]" />
              <span>{shareSuccess ? 'Shared!' : 'Share Photo'}</span>
            </button>

            {/* Download Photo */}
            <button
              type="button"
              onClick={handleDownloadPhoto}
              className="p-2 rounded-2xl bg-white border border-[#3D2730]/12 text-[#3D2730]/80 hover:border-[#FFB7C5] hover:text-[#E94F64] transition-all cursor-pointer shadow-2xs hover:scale-105"
              title="Save high-res photo to device"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Copy Story Quote */}
            <button
              type="button"
              onClick={handleCopyText}
              className="p-2 rounded-2xl bg-white border border-[#3D2730]/12 text-[#3D2730]/80 hover:border-[#FFB7C5] hover:text-[#E94F64] transition-all cursor-pointer shadow-2xs hover:scale-105"
              title="Copy quote & caption"
            >
              {copied ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 4. EDITORIAL STORY & TEXT CONTENT */}
        <div className="space-y-2.5">
          {/* Main Title */}
          <h3 className="font-display font-black text-xl sm:text-2xl text-[#3D2730] leading-snug tracking-tight">
            {memory.title}
          </h3>

          {/* Narrative Story */}
          <p className="text-xs sm:text-sm text-[#3D2730]/85 leading-relaxed font-medium">
            {memory.story}
          </p>

          {/* Romantic Handwritten Quote */}
          {memory.caption && (
            <div className="p-3 bg-gradient-to-r from-[#FFF0F5] to-[#FFE0E6]/50 rounded-2xl border border-dashed border-[#FFB7C5] my-2">
              <p className="font-handwritten text-xl sm:text-2xl font-bold text-[#E94F64] leading-snug">
                “{memory.caption}”
              </p>
            </div>
          )}

          {/* Sonu's Special Note */}
          {memory.sonuNote && (
            <div className="p-3 bg-white/95 rounded-2xl border border-[#FFB7C5]/60 shadow-2xs flex items-start gap-2.5 text-xs text-[#3D2730]">
              <div className="w-6 h-6 rounded-full bg-[#FFE0E6] text-[#E94F64] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                <Heart className="w-3.5 h-3.5 fill-[#E94F64]" />
              </div>
              <div>
                <span className="font-display font-bold text-[#E94F64] block text-[11px] uppercase tracking-wider">
                  Sonu's Note:
                </span>
                <p className="text-xs text-[#3D2730]/90 font-medium leading-relaxed italic mt-0.5">
                  "{memory.sonuNote}"
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
