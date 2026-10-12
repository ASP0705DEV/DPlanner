import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Heart, Eye, EyeOff, Sparkles, KeyRound, AlertCircle, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../../context/AuthContext';
import { playCelebrationTone, playHeartNudgeSound } from '../../utils/soundEffects';
import { WashiTape } from '../common/WashiTape';

export const PasswordGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, login, passwordHint } = useAuth();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  if (isAuthenticated) {
    return <>{children}</>;
  }

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please type the secret passcode Sonu shared with you! 💕');
      return;
    }

    const success = login(password);
    if (success) {
      setError(null);
      playCelebrationTone();
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFB7C5', '#E94F64', '#FFE0E6', '#FFF0B8', '#F43F5E'],
      });
    } else {
      setIsShaking(true);
      playHeartNudgeSound(1);
      setError('Access Denied 🙅‍♂️ Only Chotu holds the key to Sonu’s heart! Try your nickname sweetheart.');
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center p-4 selection:bg-[#FFB7C5] selection:text-[#49333A] relative overflow-hidden">
      {/* Decorative background sparkles */}
      <div className="absolute top-8 left-8 text-[#FFB7C5]/40 animate-pulse pointer-events-none">
        <Heart className="w-16 h-16 fill-current" />
      </div>
      <div className="absolute bottom-8 right-8 text-[#F59E0B]/30 animate-pulse pointer-events-none">
        <Sparkles className="w-14 h-14" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          x: isShaking ? [-8, 8, -6, 6, -3, 3, 0] : 0,
        }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm relative scrapbook-card bg-white p-6 sm:p-7 rounded-3xl border-2 border-[#49333A]/15 shadow-2xl text-center overflow-hidden"
      >
        <WashiTape color="pink" rotate="-rotate-1" />

        {/* Couple Photo Avatar with Lock Badge */}
        <div className="relative w-24 h-24 mx-auto mb-3.5">
          <div className="w-24 h-24 rounded-full overflow-hidden border-3 border-[#FFB7C5] p-1 shadow-md bg-[#FFF8F0]">
            <img
              src="/photos/sonu_chotu_tilak_night.jpg"
              alt="Sonu & Chotu"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-tr from-[#E94F64] to-[#FF8DA1] border-2 border-white flex items-center justify-center text-white shadow-sm">
            <Lock className="w-4 h-4" />
          </div>
        </div>

        {/* Heading */}
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFE0E6] text-[#E94F64] border border-[#FFB7C5] text-[10px] font-bold uppercase tracking-wider mb-2">
          <KeyRound className="w-3 h-3" />
          <span>Private Love Portal</span>
        </div>

        <h1 className="font-handwritten text-4xl font-bold text-[#49333A] leading-tight mb-1">
          For Chotu Only 🔐
        </h1>

        <p className="text-xs text-[#49333A]/75 mb-5 max-w-xs mx-auto leading-relaxed">
          This romantic date world is exclusively reserved for Sonu’s girl. Enter your secret passcode to unlock!
        </p>

        {/* Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-2.5 mb-4 rounded-xl bg-[#FEE2E2] border border-[#FCA5A5] text-[#DC2626] text-xs font-semibold flex items-center gap-2 text-left"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p className="leading-snug">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Passcode Form */}
        <form onSubmit={handleUnlock} className="space-y-3">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter secret passcode..."
              autoFocus
              className="w-full pl-4 pr-10 py-3 bg-[#FFF8F0] border-2 border-[#49333A]/15 focus:border-[#E94F64] rounded-2xl text-sm font-semibold text-[#49333A] placeholder-[#49333A]/40 outline-none transition-all shadow-inner"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#49333A]/50 hover:text-[#E94F64] p-1 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full btn-pookie flex items-center justify-center gap-2 py-3 text-sm font-bold shadow-md cursor-pointer hover:scale-102 active:scale-98 transition-transform"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Unlock Our Love Space 💕</span>
          </button>
        </form>

        {/* Clue / Hint Toggle */}
        <div className="mt-4 pt-3 border-t border-dashed border-[#49333A]/15 text-center">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="text-[11px] font-bold text-[#E94F64] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHint ? 'Hide Clue' : 'Need a Clue from Sonu? 💡'}</span>
          </button>

          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-2 p-2.5 bg-[#FFF8F0] rounded-xl border border-[#FFB7C5] text-[11px] text-[#49333A] leading-snug font-medium"
            >
              {passwordHint}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
