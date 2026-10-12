import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MapPin,
  CheckCircle2,
  Trash2,
  Maximize2,
} from 'lucide-react';
import type { LoveMemory } from '../../types/memory';
import { playHeartNudgeSound } from '../../utils/soundEffects';

interface InstagramPostCardProps {
  memory: LoveMemory;
  onDelete?: (id: string) => void;
  onOpenLightbox?: (memory: LoveMemory) => void;
}

export const InstagramPostCard: React.FC<InstagramPostCardProps> = ({
  memory,
  onDelete,
  onOpenLightbox,
}) => {
  const [likes, setLikes] = useState(143);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [comments, setComments] = useState<string[]>([]);
  const [commentInput, setCommentInput] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    if (!isLiked) {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
      playHeartNudgeSound(3);
    } else {
      setLikes((prev) => prev - 1);
      setIsLiked(false);
    }
  };

  const handleDoubleTap = () => {
    if (!isLiked) {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
    }
    playHeartNudgeSound(5);
    setShowHeartBurst(true);
    setTimeout(() => setShowHeartBurst(false), 900);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setComments((prev) => [...prev, commentInput.trim()]);
    setCommentInput('');
    playHeartNudgeSound(2);
  };

  const handleWhatsAppShare = () => {
    const text = `Look at our memory on Date Planner! 💕\n\n📸 ${memory.title} (${memory.location})\n"${memory.story}"\n\nLove from Chotu & Sonu! 💖`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <article className="bg-white rounded-3xl border border-[#49333A]/15 shadow-md overflow-hidden transition-all hover:shadow-lg mb-6">
      {/* 1. INSTAGRAM POST HEADER */}
      <div className="p-3 sm:p-4 flex items-center justify-between border-b border-[#49333A]/10">
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Gradient Story Avatar */}
          <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] shrink-0">
            <div className="w-9 h-9 rounded-full bg-white p-0.5">
              <img
                src="/photos/sonu_chotu_tilak_night.jpg"
                alt="chotu_and_sonu"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-bold text-xs text-[#49333A] truncate">
                chotu_and_sonu
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#E94F64] fill-[#FFE0E6] shrink-0" />
            </div>
            <div className="flex items-center gap-1 text-[10px] text-[#49333A]/65 font-medium truncate">
              <MapPin className="w-2.5 h-2.5 text-[#E94F64] shrink-0" />
              <span className="truncate">{memory.location || 'Jamshedpur, India'}</span>
            </div>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-bold text-[#E94F64] bg-[#FFE0E6] px-2 py-0.5 rounded-full border border-[#FFB7C5]/40">
            {memory.categoryLabel}
          </span>
          {memory.isUserAdded && onDelete && (
            <button
              type="button"
              onClick={() => onDelete(memory.id)}
              className="text-[#DC2626] hover:bg-[#FEE2E2] p-1.5 rounded-full transition-colors cursor-pointer"
              title="Delete post"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. FULL UNCROPPED IMAGE DISPLAY (INSTAGRAM POST VIEW) */}
      <div
        onDoubleClick={handleDoubleTap}
        className="relative bg-neutral-900 overflow-hidden flex items-center justify-center cursor-pointer group min-h-[300px] max-h-[560px]"
      >
        {/* Soft Blurred Ambient Backdrop so image fits beautifully without empty borders */}
        <img
          src={memory.photoUrl}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-110 pointer-events-none"
        />

        {/* FULL IMAGE (object-contain ensures 100% of the image is visible!) */}
        <img
          src={memory.photoUrl}
          alt={memory.title}
          className="relative z-10 w-full max-h-[540px] object-contain block mx-auto transition-transform duration-300"
        />

        {/* Expand Lightbox Button */}
        {onOpenLightbox && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenLightbox(memory);
            }}
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/50 text-white/90 hover:text-white hover:bg-black/75 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-md"
            title="View full image in high-res"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        )}

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

      {/* 3. INSTAGRAM ACTION BAR */}
      <div className="p-3 sm:p-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3.5">
            {/* Like Heart */}
            <motion.button
              type="button"
              whileTap={{ scale: 1.3 }}
              onClick={handleLike}
              className="cursor-pointer transition-colors"
            >
              <Heart
                className={`w-6 h-6 transition-colors ${
                  isLiked
                    ? 'fill-[#E94F64] text-[#E94F64]'
                    : 'text-[#49333A] hover:text-[#E94F64]'
                }`}
              />
            </motion.button>

            {/* Comment Bubble */}
            <button
              type="button"
              onClick={() => setShowComments(!showComments)}
              className="text-[#49333A] hover:text-[#E94F64] cursor-pointer"
            >
              <MessageCircle className="w-6 h-6" />
            </button>

            {/* WhatsApp Share */}
            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="text-[#49333A] hover:text-[#25D366] cursor-pointer"
              title="Share on WhatsApp"
            >
              <Send className="w-5 h-5 -rotate-12" />
            </button>
          </div>

          {/* Bookmark */}
          <button
            type="button"
            onClick={() => setIsSaved(!isSaved)}
            className="cursor-pointer"
          >
            <Bookmark
              className={`w-6 h-6 ${
                isSaved ? 'fill-[#E94F64] text-[#E94F64]' : 'text-[#49333A]'
              }`}
            />
          </button>
        </div>

        {/* Likes Count */}
        <p className="font-bold text-xs text-[#49333A] mb-1.5">
          Liked by <span className="font-extrabold text-[#E94F64]">sonu_0705</span> and{' '}
          <span className="font-extrabold">{likes} others</span>
        </p>

        {/* Title & Caption */}
        <div className="text-xs text-[#49333A] leading-relaxed mb-2">
          <p className="font-bold text-sm text-[#49333A] mb-0.5">
            {memory.title}
          </p>
          <span className="font-bold mr-1.5 text-[#49333A]">chotu_and_sonu</span>
          <span className="text-[#49333A]/90">{memory.story}</span>
        </div>

        {/* Caption Polaroid Quote */}
        {memory.caption && (
          <div className="p-2 bg-[#FFF8F0] rounded-xl border border-dashed border-[#FFB7C5] mb-2 text-[11px] text-[#E94F64] italic font-semibold">
            “{memory.caption}”
          </div>
        )}

        {/* Note from Sonu */}
        {memory.sonuNote && (
          <div className="p-2 bg-[#FFE0E6]/50 rounded-xl border border-[#FFB7C5] mb-2 flex items-center gap-1.5 text-[11px] text-[#49333A]">
            <Heart className="w-3 h-3 fill-[#E94F64] text-[#E94F64] shrink-0" />
            <span>
              <strong>sonu_0705:</strong> {memory.sonuNote}
            </span>
          </div>
        )}

        {/* Comments section */}
        {comments.length > 0 && (
          <div className="space-y-1 my-2 pt-1 border-t border-[#49333A]/10 text-xs">
            {comments.map((c, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[#49333A]">
                <span className="font-bold">chotu:</span>
                <span>{c}</span>
              </div>
            ))}
          </div>
        )}

        {/* Add Comment Input */}
        <form onSubmit={handleAddComment} className="flex items-center gap-2 mt-2 pt-2 border-t border-[#49333A]/10">
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Add a cute love comment..."
            className="flex-1 text-xs text-[#49333A] placeholder-[#49333A]/40 outline-none bg-transparent"
          />
          {commentInput.trim() && (
            <button
              type="submit"
              className="text-xs font-bold text-[#E94F64] hover:underline cursor-pointer"
            >
              Post
            </button>
          )}
        </form>

        {/* Date Timestamp */}
        <p className="text-[10px] uppercase font-bold text-[#49333A]/50 tracking-wider mt-2">
          {memory.date || 'Romantic Date'} • Jamshedpur
        </p>
      </div>
    </article>
  );
};
