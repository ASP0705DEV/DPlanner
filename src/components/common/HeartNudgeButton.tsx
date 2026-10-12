import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, MessageSquare, Volume2 } from 'lucide-react';
import { playHeartNudgeSound, playCelebrationTone } from '../../utils/soundEffects';

interface FloatingHeartParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const SONU_PHONE = '917070362117';

export const HeartNudgeButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [nudgeCount, setNudgeCount] = useState(0);
  const [particles, setParticles] = useState<FloatingHeartParticle[]>([]);
  const [customNote, setCustomNote] = useState('');
  const [hasSent, setHasSent] = useState(false);

  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getRomanceMessage = (count: number) => {
    if (count <= 3) return 'Hey Sonu, just thinking about you... 💕';
    if (count <= 7) return 'Missing you so much right now! 🥰';
    if (count <= 14) return 'Sonu, come give Chotu attention immediately! 🥺💖';
    if (count <= 25) return '🚨 EMERGENCY POOKIE CRAVING! Calling Sonu duty right now! 🚨';
    return `🔥 ULTRA LOVE COMBO x${count}! Sonu, drop everything and kiss Chotu! 💖🔥`;
  };

  const handleHeartPress = () => {
    const newCount = nudgeCount + 1;
    setNudgeCount(newCount);
    setHasSent(false);

    // Play tone with combo scaling
    playHeartNudgeSound(newCount);

    // Spawn floating heart particles
    const colors = ['#E94F64', '#FFB7C5', '#F43F5E', '#FB7185', '#FDA4AF'];
    const newParticle: FloatingHeartParticle = {
      id: Date.now() + Math.random(),
      x: (Math.random() - 0.5) * 80,
      y: -(Math.random() * 50 + 40),
      size: Math.floor(Math.random() * 12) + 16,
      color: colors[Math.floor(Math.random() * colors.length)],
    };

    setParticles((prev) => [...prev.slice(-15), newParticle]);

    // Clear particle after animation
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 1200);

    // Auto-reset combo count after 20 seconds of inactivity
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => {
      // Keep count in memory or reset if not sent
    }, 20000);
  };

  const handleSendWhatsAppNotification = () => {
    const count = Math.max(nudgeCount, 1);
    const romanticNote = customNote.trim() || getRomanceMessage(count);

    const message = `Hey Sonu! 💌 Chotu just gave you ${count} Heart Nudges on Our Date Planner! 💖

"${romanticNote}"

Phone Nudge to 7070362117: Come give Chotu attention right now! 🥰`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${SONU_PHONE}&text=${encodeURIComponent(
      message
    )}`;

    playCelebrationTone();
    setHasSent(true);

    // Also dispatch background email notification
    fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vibe_title: `💖 Chotu Sent You ${count} Heart Nudges!`,
        hindi_title: 'Love Nudge Alert',
        love_slogan: romanticNote,
        preferred_timing: 'Right Now!',
        special_note: `Chotu pressed the heart nudge ${count} times on her phone! Make sure to reply and give her attention.`,
        submitted_at: new Date().toLocaleString(),
      }),
    }).catch(() => {});

    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  return (
    <>
      {/* FLOATING TRIGGER BUTTON (Always visible at bottom-right) */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end">
        <motion.button
          type="button"
          onClick={() => {
            setIsOpen(true);
            handleHeartPress();
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="relative group p-3 sm:p-3.5 rounded-full bg-gradient-to-tr from-[#E94F64] to-[#FF8DA1] text-white shadow-xl border-2 border-white cursor-pointer flex items-center gap-2 hover:shadow-2xl transition-all"
          title="Nudge Sonu on WhatsApp (7070362117)"
        >
          <div className="relative">
            <Heart className="w-6 h-6 fill-white text-white animate-pulse" />
            {nudgeCount > 0 && (
              <span className="absolute -top-2.5 -right-2.5 bg-white text-[#E94F64] text-[10px] font-black px-1.5 py-0.2 rounded-full border border-[#FFB7C5] shadow-xs">
                {nudgeCount}
              </span>
            )}
          </div>
          <span className="font-handwritten text-lg font-bold pr-1 hidden sm:inline leading-none">
            Nudge Sonu 💕
          </span>

          {/* Floating heart badge */}
          <span className="absolute -top-1 -left-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFE0E6] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FFF0B8]" />
          </span>
        </motion.button>
      </div>

      {/* EXPANDED INTERACTIVE HEART NUDGE DRAWER / MODAL */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/45 backdrop-blur-xs">
            <motion.div
              initial={{ y: 80, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 80, opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-gradient-to-b from-[#FFF5F7] via-[#FFF8F0] to-white border-2 border-[#E94F64]/30 rounded-3xl shadow-2xl p-5 overflow-hidden text-center"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-white/80 border border-[#49333A]/10 text-[#49333A]/70 hover:text-[#E94F64] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFE0E6] text-[#E94F64] border border-[#FFB7C5] text-[10px] font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" />
                <span>Direct Nudge to Sonu</span>
              </div>

              <h3 className="font-handwritten text-3xl font-bold text-[#49333A] leading-tight mb-1">
                Send Sonu a Love Nudge 💕
              </h3>

              <p className="text-[11px] text-[#49333A]/75 mb-4 max-w-xs mx-auto">
                Continuously tap the heart below! Each tap plays a chime tone and adds to your love combo to notify Sonu on WhatsApp (<strong>7070362117</strong>).
              </p>

              {/* Big Interactive Heart Button with Particles */}
              <div className="relative py-4 my-2 flex flex-col items-center justify-center">
                {/* Floating Particles Container */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <AnimatePresence>
                    {particles.map((p) => (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
                        animate={{
                          opacity: 0,
                          scale: 1.4,
                          x: p.x,
                          y: p.y,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="absolute"
                        style={{ color: p.color }}
                      >
                        <Heart
                          className="fill-current"
                          style={{ width: p.size, height: p.size }}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Big Heart Touch Button */}
                <motion.button
                  type="button"
                  onClick={handleHeartPress}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.85 }}
                  className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#E94F64] to-[#FF8DA1] text-white flex items-center justify-center shadow-2xl border-4 border-white cursor-pointer active:shadow-inner transition-transform"
                >
                  <Heart className="w-12 h-12 fill-white text-white drop-shadow-md" />
                </motion.button>

                {/* Combo Counter Badge */}
                <div className="mt-3">
                  <span className="font-handwritten text-3xl font-black text-[#E94F64]">
                    {nudgeCount > 0 ? `${nudgeCount} Nudges!` : 'Tap the Heart!'}
                  </span>
                </div>

                {/* Sound Tone Indicator */}
                <div className="inline-flex items-center gap-1 text-[10px] text-[#49333A]/60 font-semibold mt-0.5">
                  <Volume2 className="w-3 h-3 text-[#E94F64]" />
                  <span>Chime Sound Enabled</span>
                </div>
              </div>

              {/* Romantic Feedback Bubble */}
              <div className="p-3 bg-white rounded-2xl border border-[#FFB7C5] shadow-xs mb-3 text-left">
                <span className="text-[10px] font-bold text-[#E94F64] uppercase tracking-wider block mb-0.5">
                  Nudge Message:
                </span>
                <p className="font-handwritten text-xl font-bold text-[#49333A] leading-snug">
                  “{getRomanceMessage(nudgeCount || 1)}”
                </p>
              </div>

              {/* Optional Custom Note */}
              <div className="mb-3 text-left">
                <input
                  type="text"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Add a cute custom note (optional)..."
                  className="w-full px-3 py-1.5 bg-white rounded-xl border border-[#49333A]/15 text-xs text-[#49333A] placeholder-[#49333A]/40 focus:outline-none focus:border-[#E94F64]"
                />
              </div>

              {/* Send Notification Button */}
              <button
                type="button"
                onClick={handleSendWhatsAppNotification}
                className="w-full btn-pookie flex items-center justify-center gap-2 py-3 text-xs font-bold cursor-pointer shadow-lg hover:scale-102 active:scale-98 transition-transform"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>
                  Notify Sonu on WhatsApp ({nudgeCount > 0 ? `${nudgeCount}x` : '1x'}) 💌
                </span>
              </button>

              {hasSent && (
                <p className="text-[11px] text-[#059669] bg-[#D1FAE5] p-2 rounded-xl border border-[#A7F3D0] mt-2 font-semibold">
                  Notification opened for Sonu's number (7070362117)! 💕
                </p>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
