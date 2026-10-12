import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Heart, Eye, EyeOff, KeyRound, AlertCircle, HelpCircle } from 'lucide-react';
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
    <div className="min-h-screen bg-[#FFFDF9] flex items-center justify-center p-4 selection:bg-[#FFB7C5] selection:text-[#3D2730] relative overflow-hidden">
      {/* Decorative ambient background lighting */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#FFE0E6]/70 to-[#FFB7C5]/30 blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#E7DFFF]/70 to-[#FFF0B8]/40 blur-3xl pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          x: isShaking ? [-8, 8, -6, 6, -3, 3, 0] : 0,
        }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm relative bg-white/90 backdrop-blur-2xl p-7 sm:p-8 rounded-[2rem] border border-white/95 shadow-[0_25px_60px_-12px_rgba(233,79,100,0.22)] ring-1 ring-[#FFB7C5]/40 text-center overflow-hidden"
      >
        <WashiTape color="pink" rotate="-rotate-1" />

        {/* Couple Photo Avatar with Lock Badge */}
        <div className="relative w-24 h-24 mx-auto mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white p-0.5 shadow-md bg-gradient-to-tr from-[#FFB7C5] via-[#FF758F] to-[#E94F64]">
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
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFE0E6] text-[#E94F64] border border-[#FFB7C5] text-[10px] font-extrabold uppercase tracking-wider mb-2 shadow-2xs">
          <KeyRound className="w-3 h-3" />
          <span>Private Love Portal</span>
        </div>

        <h1 className="font-display text-2xl sm:text-3xl font-black text-[#3D2730] tracking-tight leading-tight mb-1">
          For Chotu Only 🔐
        </h1>

        <p className="text-xs text-[#3D2730]/75 mb-5 max-w-xs mx-auto leading-relaxed font-medium">
          This romantic date world is exclusively reserved for Sonu’s girl. Enter your secret passcode to unlock!
        </p>

        {/* Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-3 mb-4 rounded-2xl bg-[#FEE2E2] border border-[#FCA5A5] text-[#DC2626] text-xs font-semibold flex items-center gap-2 text-left shadow-xs"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p className="leading-snug">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Passcode Form */}
        <form onSubmit={handleUnlock} className="space-y-3.5">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter secret passcode..."
              autoFocus
              className="w-full pl-4 pr-11 py-3.5 bg-white/90 border border-[#3D2730]/15 focus:ring-2 focus:ring-[#FFB7C5] focus:border-[#E94F64] rounded-2xl text-sm font-semibold text-[#3D2730] placeholder-[#3D2730]/40 outline-none transition-all shadow-inner"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#3D2730]/50 hover:text-[#E94F64] p-1 cursor-pointer transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full btn-pookie flex items-center justify-center gap-2 py-3.5 text-sm font-bold shadow-md cursor-pointer hover:scale-102 active:scale-98 transition-transform"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Unlock Our Love Space 💕</span>
          </button>
        </form>

        {/* Clue / Hint Toggle */}
        <div className="mt-5 pt-3.5 border-t border-[#3D2730]/10 text-center">
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
              className="mt-2.5 p-3 bg-[#FFFDF9] rounded-2xl border border-[#FFB7C5] text-[11px] text-[#3D2730] leading-snug font-medium shadow-xs"
            >
              {passwordHint}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
