import React from 'react';
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
  if (!isOpen || !activeUrl) return null;

  return (
    <AnimatePresence>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-hidden select-none"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-2xl max-h-[94vh] flex flex-col items-center"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute -top-12 right-0 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Full uncropped image container */}
          <div className="relative rounded-2xl overflow-hidden bg-black/40 shadow-2xl border border-white/20">
            <img
              src={activeUrl}
              alt={title || 'Full photo view'}
              className="max-h-[75vh] max-w-[90vw] sm:max-w-xl object-contain block mx-auto"
            />
          </div>

          {/* Meta bar below uncropped image */}
          {(title || caption || location) && (
            <div className="mt-3 text-center text-white max-w-lg px-3">
              {title && (
                <h4 className="font-handwritten text-2xl font-bold text-[#FFB7C5] leading-tight mb-0.5">
                  {title}
                </h4>
              )}
              {caption && (
                <p className="text-xs text-white/90 italic font-medium leading-snug mb-1">
                  "{caption}"
                </p>
              )}
              <div className="flex items-center justify-center gap-3 text-[11px] text-white/70 font-semibold">
                {location && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#FFB7C5]" />
                    <span>{location}</span>
                  </span>
                )}
                {date && (
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#FFB7C5]" />
                    <span>{date}</span>
                  </span>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
