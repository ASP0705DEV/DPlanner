import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Sparkles, Sliders, Clock, FileHeart, Camera, Download, Lock } from 'lucide-react';
import { useDatePlanner } from '../../context/DatePlannerContext';
import { useAuth } from '../../context/AuthContext';
import { ROMANTIC_CONFIG } from '../../config/romanticMessages';
import { DATE_VIBES } from '../../data/dateVibes';
import { getVibeDoodleIcon } from './CuteDoodles';
import { InstallAppModal } from './InstallAppModal';

export const Header: React.FC = () => {
  const location = useLocation();
  const { selectedVibeId } = useDatePlanner();
  const { logout, isUnlocked } = useAuth();
  const [showInstallModal, setShowInstallModal] = useState(false);

  const chosenVibe = DATE_VIBES.find((v) => v.id === selectedVibeId);

  const steps = [
    { path: '/vibe', label: '1. Vibe', icon: Sparkles },
    { path: '/customize', label: '2. Details', icon: Sliders },
    { path: '/timing-note', label: '3. Time', icon: Clock },
    { path: '/wishlist', label: '4. Postcard', icon: FileHeart },
  ];

  const isHome = location.pathname === '/';
  const isMemories = location.pathname === '/memories';
  const isSecretDashboard = location.pathname.startsWith('/our-secret-dashboard');

  return (
    <header className="sticky top-1 sm:top-2 z-40 px-2 py-1.5 transition-all">
      <div className="max-w-[430px] mx-auto bg-white/90 backdrop-blur-2xl border border-white/95 shadow-[0_10px_30px_-5px_rgba(233,79,100,0.12)] rounded-3xl px-3.5 py-2 transition-all">
        <div className="flex items-center justify-between gap-2">
          {/* Brand / Title with Modern Luxe Accent */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 hover:opacity-95 transition-opacity"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FFB7C5] via-[#FF758F] to-[#E94F64] flex items-center justify-center text-white shadow-sm shrink-0 transition-transform group-hover:scale-105">
                <Heart className="w-4 h-4 fill-white" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#E94F64] animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="font-display text-sm sm:text-base font-extrabold text-[#3D2730] tracking-tight leading-none">
                  Sonu & Chotu
                </span>
                <span className="hidden sm:inline-flex bg-[#FFE0E6] text-[#E94F64] text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-[#FFB7C5]/50 shadow-2xs">
                  For {ROMANTIC_CONFIG.girlfriendNickname} 💕
                </span>
              </div>
            </div>
          </Link>

          {/* Right Side Actions: Install App + Journal Link + Chosen Vibe + Lock */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setShowInstallModal(true)}
              className="text-[11px] font-bold px-2 sm:px-2.5 py-1.5 rounded-full bg-[#FFFDF9] text-[#3D2730]/80 border border-[#3D2730]/10 hover:border-[#FFB7C5] hover:text-[#E94F64] hover:bg-white inline-flex items-center gap-1 cursor-pointer transition-all shadow-2xs hover:scale-102"
              title="Download app to desktop or phone"
            >
              <Download className="w-3.5 h-3.5 text-[#E94F64]" />
              <span className="hidden sm:inline">Install App</span>
              <span className="sm:hidden text-[10px]">App 📲</span>
            </button>

            <Link
              to="/memories"
              className={`text-[11px] font-bold px-2.5 sm:px-3 py-1.5 rounded-full border inline-flex items-center gap-1.5 transition-all shadow-2xs hover:scale-102 ${
                isMemories
                  ? 'bg-gradient-to-r from-[#FF758F] to-[#E94F64] text-white border-transparent shadow-xs'
                  : 'bg-white text-[#E94F64] border-[#FFB7C5]/60 hover:bg-[#FFE0E6]/50'
              }`}
              title="View our romantic memory journal"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Journal 📖</span>
            </Link>

            {isUnlocked && (
              <button
                type="button"
                onClick={logout}
                className="p-1.5 rounded-full bg-white text-[#3D2730]/70 border border-[#3D2730]/10 hover:border-[#FCA5A5] hover:text-[#DC2626] hover:bg-[#FEE2E2] cursor-pointer transition-all shadow-2xs hover:scale-105"
                title="Lock app for Chotu only 🔒"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            )}

            {chosenVibe && !isHome && !isMemories && (
              <span className="text-[11px] font-bold bg-[#FFF0B8]/80 text-[#92400E] px-2.5 py-1 rounded-full border border-[#FDE68A] hidden md:inline-flex items-center gap-1.5 shadow-2xs">
                {getVibeDoodleIcon(chosenVibe.id, 'w-3.5 h-3.5 shrink-0')}
                <span className="leading-none truncate max-w-[100px]">{chosenVibe.title}</span>
              </span>
            )}
          </div>
        </div>

        {/* Modern Step Indicator Bar */}
        {!isHome && !isSecretDashboard && !isMemories && (
          <div className="mt-2 pt-2 border-t border-[#3D2730]/5 grid grid-cols-4 gap-1">
            {steps.map((step) => {
              const isActive = location.pathname === step.path;
              const StepIcon = step.icon;
              return (
                <Link
                  key={step.path}
                  to={step.path}
                  className={`flex items-center justify-center gap-1 py-1 px-1 rounded-full text-[10px] sm:text-[11px] font-bold transition-all text-center ${
                    isActive
                      ? 'bg-gradient-to-r from-[#FF758F] to-[#E94F64] text-white shadow-xs scale-101'
                      : 'text-[#3D2730]/65 hover:bg-[#FFE0E6]/50 hover:text-[#3D2730]'
                  }`}
                >
                  <StepIcon className="w-3 h-3 shrink-0 hidden xs:inline" />
                  <span className="truncate">{step.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <InstallAppModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
      />
    </header>
  );
};
