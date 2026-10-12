import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Image as ImageIcon, Camera, Download, Maximize2 } from 'lucide-react';
import { AnimatedEnvelope } from '../components/letter/AnimatedEnvelope';
import { ROMANTIC_CONFIG } from '../config/romanticMessages';
import { MobileContainer } from '../components/common/MobileContainer';
import { WashiTape } from '../components/common/WashiTape';
import { InstallAppModal } from '../components/common/InstallAppModal';
import { ImageLightboxModal } from '../components/common/ImageLightboxModal';

export const ScreenOneLetter: React.FC = () => {
  const navigate = useNavigate();
  const [showOriginalPhoto, setShowOriginalPhoto] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; caption: string } | null>(null);

  const activePhotoSrc = showOriginalPhoto
    ? '/photos/sonu_chotu_cozy.jpg'
    : '/doodles/doodle_sonu_chotu_cozy.jpg';

  const handleOpenComplete = () => {
    navigate('/vibe');
  };

  return (
    <MobileContainer className="px-4 sm:px-5 py-6 sm:py-8 flex flex-col justify-between items-center text-center">
      <div className="w-full my-auto z-10 mx-auto">
        {/* Intro Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#FFE0E6] via-[#FFF0F5] to-[#FFE0E6] text-[#E94F64] border border-[#FFB7C5]/60 text-[11px] font-extrabold uppercase tracking-wider mb-2.5 shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E94F64] animate-spin" />
          <span>{ROMANTIC_CONFIG.heroSubtitle}</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl font-black text-[#3D2730] tracking-tight mb-2 leading-tight"
        >
          {ROMANTIC_CONFIG.heroGreeting}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs sm:text-sm text-[#3D2730]/80 leading-relaxed max-w-md mx-auto mb-6 font-medium"
        >
          {ROMANTIC_CONFIG.heroDescription}
        </motion.p>

        {/* Interactive Couple Scrapbook Polaroid (Uncropped Instagram view with Ambient Background) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="relative inline-block mb-6 group"
        >
          <WashiTape color="pink" rotate="-rotate-2" />
          <div className="bg-white/95 backdrop-blur-md p-3.5 pb-4 rounded-3xl border border-white/90 shadow-[0_20px_45px_-10px_rgba(233,79,100,0.2)] max-w-[280px] sm:max-w-[300px] mx-auto transform -rotate-1 hover:rotate-0 transition-all duration-300 ring-1 ring-[#FFB7C5]/30">
            <div
              className="relative w-full h-[230px] sm:h-[250px] overflow-hidden rounded-2xl border border-[#3D2730]/10 bg-neutral-900 cursor-pointer flex items-center justify-center"
              onClick={() =>
                setLightboxImage({
                  url: activePhotoSrc,
                  title: 'Sonu & Chotu • Cozy Moments',
                  caption: 'Every second spent together is my favorite place in the world 💕',
                })
              }
              title="Click to view full uncropped image"
            >
              {/* Ambient blurred backdrop so image fits perfectly without cropping */}
              <img
                src={activePhotoSrc}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover blur-lg opacity-40 scale-110 pointer-events-none"
              />

              {/* Uncropped full image */}
              <img
                src={activePhotoSrc}
                alt="Sonu and Chotu"
                className="relative z-10 w-full h-full object-contain transition-transform duration-300 group-hover:scale-102"
              />

              {/* Controls Overlay */}
              <div className="absolute bottom-2.5 inset-x-2.5 z-20 flex items-center justify-between pointer-events-none">
                <span className="px-2.5 py-1 bg-black/60 backdrop-blur-xs rounded-full text-[9px] font-bold text-white flex items-center gap-1 shadow-xs">
                  <Maximize2 className="w-2.5 h-2.5" />
                  <span>Tap to Zoom</span>
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowOriginalPhoto(!showOriginalPhoto);
                  }}
                  className="pointer-events-auto px-2.5 py-1 bg-white/95 backdrop-blur-xs rounded-full border border-[#3D2730]/10 text-[10px] font-bold text-[#3D2730] hover:bg-white flex items-center gap-1 shadow-xs cursor-pointer hover:scale-103 transition-transform"
                  title="Tap to toggle doodle / real photo"
                >
                  <ImageIcon className="w-2.5 h-2.5 text-[#E94F64]" />
                  <span>{showOriginalPhoto ? 'Doodle' : 'Photo'}</span>
                </button>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-[#E94F64]">
              <Heart className="w-3.5 h-3.5 fill-[#E94F64]" />
              <p className="font-handwritten text-2xl font-bold text-[#3D2730] leading-none">
                Sonu & Chotu
              </p>
              <Heart className="w-3.5 h-3.5 fill-[#E94F64]" />
            </div>
          </div>
        </motion.div>

        {/* Interactive Envelope with opening animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35 }}
        >
          <AnimatedEnvelope onOpenComplete={handleOpenComplete} />
        </motion.div>

        {/* Quick Actions: Feed & Install App */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-8 pt-5 border-t border-[#3D2730]/10 flex flex-col items-center gap-2.5"
        >
          <div className="flex items-center gap-2.5 flex-wrap justify-center">
            <button
              type="button"
              onClick={() => navigate('/memories')}
              className="inline-flex items-center gap-2 py-2.5 px-4 rounded-full bg-white/95 backdrop-blur-md border border-[#FFB7C5]/60 text-xs font-bold text-[#3D2730] hover:border-[#E94F64] hover:text-[#E94F64] hover:bg-white shadow-xs cursor-pointer transition-all hover:scale-103"
            >
              <Camera className="w-4 h-4 text-[#E94F64]" />
              <span>Our Love Journal 📖</span>
            </button>

            <button
              type="button"
              onClick={() => setShowInstallModal(true)}
              className="inline-flex items-center gap-1.5 py-2.5 px-4 rounded-full bg-white/95 backdrop-blur-md border border-[#FFB7C5]/60 text-xs font-bold text-[#3D2730] hover:border-[#E94F64] hover:text-[#E94F64] hover:bg-white shadow-xs cursor-pointer transition-all hover:scale-103"
            >
              <Download className="w-3.5 h-3.5 text-[#E94F64]" />
              <span>Download App 📲</span>
            </button>
          </div>
          <p className="text-[11px] text-[#3D2730]/65 font-medium">
            Preserve our date moments in our Love Journal or install on desktop/phone
          </p>
        </motion.div>

        <InstallAppModal
          isOpen={showInstallModal}
          onClose={() => setShowInstallModal(false)}
        />

        {/* Full Image Lightbox Modal */}
        <ImageLightboxModal
          isOpen={!!lightboxImage}
          onClose={() => setLightboxImage(null)}
          photoUrl={lightboxImage?.url || ''}
          title={lightboxImage?.title || ''}
          caption={lightboxImage?.caption || ''}
        />
      </div>
    </MobileContainer>
  );
};
