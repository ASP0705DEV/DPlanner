import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar } from 'lucide-react';

interface ImageLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl?: string | null;
  photoUrl?: string | null;
  title?: string;
  caption?: string;
  location?: string;
  date?: string;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  photoUrl,
  title,
  caption,
  location,
  date,
}) => {
  const activeUrl = imageUrl || photoUrl;

  // Lock body scrolling when lightbox is open so swiping never scrolls the background
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      const prevTouchAction = document.body.style.touchAction;
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = prevOverflow;
        document.body.style.touchAction = prevTouchAction;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !activeUrl) return null;

  const modalContent = (
    <AnimatePresence>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[9999] flex flex-col justify-between items-center bg-black/94 backdrop-blur-2xl h-[100dvh] max-h-[100dvh] w-screen overflow-hidden select-none p-2 sm:p-4"
        style={{ touchAction: 'none' }}
      >
        {/* 1. TOP HEADER: Location/Date Badge & Prominent Close Button */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl flex items-center justify-between shrink-0 z-30 pt-1 pb-1.5 px-1"
        >
          <div className="flex items-center gap-2 min-w-0">
            {location && (
              <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold flex items-center gap-1 shadow-xs truncate">
                <MapPin className="w-3 h-3 text-[#FFB7C5] shrink-0" />
                <span className="truncate max-w-[180px]">{location}</span>
              </span>
            )}
            {date && (
              <span className="hidden xs:inline-flex px-2 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/80 text-[10px] font-semibold items-center gap-1 shrink-0">
                <Calendar className="w-3 h-3 text-[#FFB7C5] shrink-0" />
                <span>{date}</span>
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 active:scale-90 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md border border-white/30 shadow-lg shrink-0 ml-2"
            title="Close photo"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* 2. MIDDLE STAGE: Photo strictly constrained to remaining flex height */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          onClick={(e) => e.stopPropagation()}
          className="flex-1 min-h-0 w-full max-w-xl flex items-center justify-center my-auto p-1 overflow-hidden"
        >
          <div className="relative w-full h-full max-h-full max-w-full flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-neutral-950/90">
            {/* Ambient blurred backdrop glow */}
            <img
              src={activeUrl}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-110 pointer-events-none"
            />
            {/* Full uncropped photo strictly constrained to 100% of flex box - ZERO scroll */}
            <img
              src={activeUrl}
              alt={title || 'Full photo view'}
              className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain block mx-auto rounded-xl drop-shadow-2xl"
            />
          </div>
        </motion.div>

        {/* 3. BOTTOM CAPTION BAR: Compact and cleanly fitted inside viewport */}
        {(title || caption) && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md shrink-0 text-center px-4 py-2 bg-black/60 backdrop-blur-md rounded-2xl border border-white/15 shadow-lg z-30 my-1"
          >
            {title && (
              <h4 className="font-display text-sm sm:text-base font-extrabold text-[#FFB7C5] leading-tight truncate">
                {title}
              </h4>
            )}
            {caption && (
              <p className="text-xs text-white/90 italic font-medium leading-snug line-clamp-2 mt-0.5">
                "{caption}"
              </p>
            )}
          </div>
        )}
      </div>
    </AnimatePresence>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
};

