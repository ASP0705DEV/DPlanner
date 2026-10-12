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
    <header className="sticky top-0 z-40 bg-[#FFF8F0]/95 backdrop-blur-md border-b-2 border-dashed border-[#49333A]/15 py-2.5 px-3.5 transition-all">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        {/* Brand / Title */}
        <Link
          to="/"
          className="group flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FFB7C5] to-[#E94F64] flex items-center justify-center text-white shadow-sm shrink-0">
            <Heart className="w-4 h-4 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-handwritten text-xl font-bold text-[#49333A] leading-tight">
                Date Planner
              </span>
              <span className="bg-[#FFE0E6] text-[#E94F64] text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-[#FFB7C5]">
                For {ROMANTIC_CONFIG.girlfriendNickname}
              </span>
            </div>
          </div>
        </Link>

        {/* Right Side: Install App + Feed Link + Chosen Vibe + Lock */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowInstallModal(true)}
            className="text-[11px] font-bold px-2 py-1 rounded-full bg-white text-[#49333A]/80 border border-[#49333A]/15 hover:border-[#FFB7C5] hover:text-[#E94F64] inline-flex items-center gap-1 cursor-pointer transition-all shadow-2xs"
            title="Download app to desktop or phone"
          >
            <Download className="w-3 h-3 text-[#E94F64]" />
            <span className="hidden sm:inline">Install App</span>
            <span className="sm:hidden">App 📲</span>
          </button>

          <Link
            to="/memories"
            className={`text-[11px] font-bold px-2.5 py-1 rounded-full border inline-flex items-center gap-1 transition-all ${
              isMemories
                ? 'bg-[#E94F64] text-white border-[#E94F64] shadow-xs'
                : 'bg-white text-[#E94F64] border-[#FFB7C5] hover:bg-[#FFE0E6]'
            }`}
            title="View our romantic Instagram feed & post memories"
          >
            <Camera className="w-3 h-3" />
            <span>Feed 📸</span>
          </Link>

          {isUnlocked && (
            <button
              type="button"
              onClick={logout}
              className="p-1.5 rounded-full bg-white text-[#49333A]/70 border border-[#49333A]/15 hover:border-[#FCA5A5] hover:text-[#DC2626] hover:bg-[#FEE2E2] cursor-pointer transition-all shadow-2xs"
              title="Lock app for Chotu only 🔒"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          )}

          {chosenVibe && !isHome && !isMemories && (
            <span className="text-[11px] font-bold bg-[#FFF0B8] text-[#92400E] px-2 py-1 rounded-full border border-[#FDE68A] hidden sm:inline-flex items-center gap-1 shadow-2xs">
              {getVibeDoodleIcon(chosenVibe.id, 'w-3 h-3 shrink-0')}
              <span className="leading-none truncate max-w-[90px]">{chosenVibe.title}</span>
            </span>
          )}
        </div>
      </div>

      <InstallAppModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
      />

      {/* Step Pills on Mobile */}
      {!isHome && !isSecretDashboard && !isMemories && (
        <div className="max-w-md mx-auto mt-2 pt-2 border-t border-[#49333A]/10 flex items-center justify-between gap-1">
          {steps.map((step) => {
            const isActive = location.pathname === step.path;
            const StepIcon = step.icon;
            return (
              <Link
                key={step.path}
                to={step.path}
                className={`flex-1 flex items-center justify-center gap-1 py-1 rounded-full text-[11px] font-bold transition-all ${
                  isActive
                    ? 'bg-[#E94F64] text-white shadow-xs'
                    : 'text-[#49333A]/70 hover:bg-[#FFE0E6]/40'
                }`}
              >
                <StepIcon className="w-3 h-3" />
                <span>{step.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
