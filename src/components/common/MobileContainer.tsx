import React from 'react';
import { FloatingDoodleBackdrop } from './FloatingDoodleBackdrop';

interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
  hideFloatingArt?: boolean;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({
  children,
  className = '',
  hideFloatingArt = false,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center selection:bg-[#FFB7C5] selection:text-[#3D2730] px-0 sm:px-4 py-0 sm:py-6 relative overflow-x-hidden">
      {/* Subtle ambient lighting orbs on desktop background */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#FFE0E6]/60 to-[#FFB7C5]/30 blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#E7DFFF]/60 to-[#FFF0B8]/40 blur-3xl pointer-events-none -z-10" />

      {/* Modern Responsive Luxe Shell */}
      <div
        className={`w-full max-w-xl md:max-w-2xl lg:max-w-3xl min-h-screen sm:min-h-[92vh] flex flex-col bg-white/85 backdrop-blur-xl sm:rounded-[2.5rem] shadow-[0_15px_50px_-10px_rgba(233,79,100,0.12)] border-0 sm:border sm:border-white/95 sm:ring-1 sm:ring-[#FFB7C5]/30 relative overflow-hidden transition-all duration-300 ${className}`}
      >
        {!hideFloatingArt && <FloatingDoodleBackdrop />}
        <div className="relative z-10 flex flex-col flex-1 w-full">
          {children}
        </div>
      </div>
    </div>
  );
};
