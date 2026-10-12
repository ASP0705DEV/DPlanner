import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Download, X } from 'lucide-react';
import type { LoveMemory } from '../../types/memory';
import { playCelebrationTone } from '../../utils/soundEffects';

interface MultiShareFloatingBarProps {
  selectedMemories: LoveMemory[];
  onClearSelection: () => void;
}

export const MultiShareFloatingBar: React.FC<MultiShareFloatingBarProps> = ({
  selectedMemories,
  onClearSelection,
}) => {
  const [downloading, setDownloading] = useState(false);

  if (selectedMemories.length === 0) return null;

  // 1. Consolidated WhatsApp Album Share
  const handleWhatsAppAlbumShare = () => {
    let message = `💖 Sonu & Chotu • Selected Memory Album (${selectedMemories.length} Moments) 💖\n\n`;

    selectedMemories.forEach((mem, index) => {
      message += `[${index + 1}] ${mem.title}\n📍 ${mem.location} (${mem.date})\n"${mem.story}"\n\n`;
    });

    message += `Forever My Pookie & Rani Saheba 💕`;

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank');
    playCelebrationTone();
  };

  // 2. Native Multi-Share (Web Share API)
  const handleNativeMultiShare = async () => {
    const titles = selectedMemories.map((m) => m.title).join(', ');
    const shareData = {
      title: `Our Love Moments (${selectedMemories.length}) • Sonu & Chotu`,
      text: `Look at our memories: ${titles} 💕`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled
      }
    } else {
      handleWhatsAppAlbumShare();
    }
  };

  // 3. Batch Download Selected Photos
  const handleBatchDownload = async () => {
    setDownloading(true);
    for (let i = 0; i < selectedMemories.length; i++) {
      const mem = selectedMemories[i];
      try {
        const response = await fetch(mem.photoUrl);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `sonu_chotu_${mem.id}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
        // Small delay between downloads
        await new Promise((resolve) => setTimeout(resolve, 400));
      } catch (err) {
        window.open(mem.photoUrl, '_blank');
      }
    }
    setDownloading(false);
    playCelebrationTone();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        className="fixed bottom-4 left-0 right-0 z-50 pointer-events-none px-3"
      >
        <div className="max-w-[430px] mx-auto pointer-events-auto">
          <div className="glass-panel bg-white/95 backdrop-blur-2xl p-2.5 sm:px-4 py-2.5 rounded-3xl border border-white/95 shadow-[0_20px_45px_-8px_rgba(233,79,100,0.3)] ring-1 ring-[#FFB7C5]/50 flex items-center justify-between gap-2.5">
            {/* Selection Count Pill */}
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#FF758F] to-[#E94F64] text-white flex items-center justify-center shrink-0 font-bold text-sm shadow-2xs">
                {selectedMemories.length}
              </div>
              <div className="min-w-0">
                <span className="font-display font-bold text-xs sm:text-sm text-[#3D2730] block leading-tight truncate">
                  {selectedMemories.length} {selectedMemories.length === 1 ? 'Photo' : 'Photos'} Selected
                </span>
                <span className="text-[10px] text-[#3D2730]/65 font-medium">Ready to share together</span>
              </div>
            </div>

            {/* Actions Toolbar */}
            <div className="flex items-center gap-2 shrink-0">
              {/* WhatsApp Album Share */}
              <button
                type="button"
                onClick={handleWhatsAppAlbumShare}
                className="btn-pookie flex items-center gap-1.5 py-2 px-3 sm:px-4 text-xs font-bold shadow-sm cursor-pointer hover:scale-103 active:scale-97 transition-transform"
                title="Share all selected on WhatsApp"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share WhatsApp</span>
              </button>

              {/* Native Web Share */}
              <button
                type="button"
                onClick={handleNativeMultiShare}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-2 rounded-2xl bg-white border border-[#3D2730]/15 text-xs font-bold text-[#3D2730] hover:border-[#FFB7C5] hover:text-[#E94F64] transition-all cursor-pointer shadow-2xs"
                title="AirDrop or Share to Other Apps"
              >
                <Share2 className="w-3.5 h-3.5 text-[#E94F64]" />
                <span>AirDrop / Apps</span>
              </button>

              {/* Batch Download */}
              <button
                type="button"
                onClick={handleBatchDownload}
                disabled={downloading}
                className="p-2 rounded-2xl bg-white border border-[#3D2730]/15 text-[#3D2730]/80 hover:border-[#FFB7C5] hover:text-[#E94F64] transition-all cursor-pointer shadow-2xs hover:scale-105"
                title="Download all selected photos"
              >
                <Download className="w-4 h-4" />
              </button>

              {/* Clear / Cancel */}
              <button
                type="button"
                onClick={onClearSelection}
                className="p-2 rounded-2xl bg-[#FEE2E2] text-[#DC2626] border border-[#FCA5A5] hover:bg-[#FCA5A5]/30 transition-colors cursor-pointer"
                title="Clear selection"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
