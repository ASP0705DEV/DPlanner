import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone, Monitor, Share2, PlusSquare, Sparkles, Check } from 'lucide-react';
import { WashiTape } from './WashiTape';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const InstallAppModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if running as installed PWA already
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    ) {
      setIsStandalone(true);
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
        setTimeout(() => onClose(), 2000);
      }
      setDeferredPrompt(null);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          className="relative w-full max-w-sm bg-gradient-to-b from-[#FFF5F7] to-white border-2 border-[#49333A]/20 rounded-3xl shadow-2xl p-5 overflow-hidden text-center"
        >
          <WashiTape color="pink" rotate="-rotate-1" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-white/80 border border-[#49333A]/10 text-[#49333A]/70 hover:text-[#E94F64] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Icon Header */}
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-white border-2 border-[#FFB7C5] p-2 shadow-sm flex items-center justify-center">
            <img src="/icons/icon-192.png" alt="App Icon" className="w-full h-full object-contain rounded-xl" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFE0E6] text-[#E94F64] border border-[#FFB7C5] text-[10px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Install on Desktop & Mobile</span>
          </div>

          <h3 className="font-handwritten text-3xl font-bold text-[#49333A] leading-tight mb-1">
            Download Our Date App 📲
          </h3>

          <p className="text-xs text-[#49333A]/75 mb-4">
            Install on your desktop or phone home screen so Chotu can open our Date Planner anytime like a real app!
          </p>

          {isStandalone || isInstalled ? (
            <div className="p-3 bg-[#D1FAE5] border border-[#A7F3D0] rounded-2xl text-xs text-[#059669] font-bold flex items-center justify-center gap-2 mb-2">
              <Check className="w-4 h-4 stroke-[3]" />
              <span>App is already installed on your device! 💕</span>
            </div>
          ) : isIOS ? (
            /* iOS Specific Guidance */
            <div className="p-3.5 bg-white rounded-2xl border border-[#FFB7C5] shadow-xs text-left space-y-2 mb-4">
              <span className="text-[11px] font-bold text-[#E94F64] block">
                How to install on iPhone / iPad (Safari):
              </span>
              <div className="flex items-start gap-2 text-xs text-[#49333A]">
                <div className="w-5 h-5 rounded-md bg-[#FFE0E6] text-[#E94F64] flex items-center justify-center font-bold text-[10px] shrink-0">
                  1
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                  <span>Tap the <strong>Share button</strong></span>
                  <Share2 className="w-3.5 h-3.5 text-[#007AFF] inline" />
                  <span>at the bottom of Safari.</span>
                </div>
              </div>
              <div className="flex items-start gap-2 text-xs text-[#49333A]">
                <div className="w-5 h-5 rounded-md bg-[#FFE0E6] text-[#E94F64] flex items-center justify-center font-bold text-[10px] shrink-0">
                  2
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                  <span>Scroll down and tap <strong>Add to Home Screen</strong></span>
                  <PlusSquare className="w-3.5 h-3.5 text-[#49333A] inline" />
                </div>
              </div>
              <div className="flex items-start gap-2 text-xs text-[#49333A]">
                <div className="w-5 h-5 rounded-md bg-[#FFE0E6] text-[#E94F64] flex items-center justify-center font-bold text-[10px] shrink-0">
                  3
                </div>
                <span>Tap <strong>Add</strong> in the top-right corner. All done! 💕</span>
              </div>
            </div>
          ) : deferredPrompt ? (
            /* Native Install Prompt for Desktop Chrome/Edge & Android */
            <div className="space-y-3 mb-2">
              <button
                type="button"
                onClick={handleInstallClick}
                className="w-full btn-pookie flex items-center justify-center gap-2 py-3 text-xs font-bold cursor-pointer shadow-lg hover:scale-102 active:scale-98 transition-transform"
              >
                <Download className="w-4 h-4" />
                <span>1-Click Install to Device 💻 📱</span>
              </button>
              <div className="flex items-center justify-center gap-3 text-[10px] text-[#49333A]/60 font-semibold">
                <span className="flex items-center gap-1">
                  <Monitor className="w-3 h-3" /> Desktop App
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Smartphone className="w-3 h-3" /> Android / Mobile
                </span>
              </div>
            </div>
          ) : (
            /* Fallback browser menu prompt */
            <div className="p-3 bg-white rounded-2xl border border-[#FFB7C5] shadow-xs text-left space-y-1.5 mb-3 text-xs text-[#49333A]">
              <span className="text-[11px] font-bold text-[#E94F64] block">
                How to install on Chrome / Edge:
              </span>
              <p className="leading-snug">
                Click the <strong>Install App icon (⊕)</strong> in the right side of your browser address bar, or open your browser menu (⋮) and choose <strong>"Install Date Planner"</strong>.
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 text-xs font-bold text-[#49333A]/70 hover:text-[#49333A] cursor-pointer"
          >
            Close
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
