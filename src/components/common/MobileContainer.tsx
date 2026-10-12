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
    <div className="min-h-screen bg-[#FFF8F0] flex justify-center selection:bg-[#FFB7C5] selection:text-[#49333A] overflow-x-hidden">
      {/* Mobile-proportioned centered view */}
      <div
        className={`w-full max-w-md min-h-screen flex flex-col bg-[#FFF8F0] shadow-2xl relative md:border-x-2 md:border-[#49333A]/10 overflow-hidden ${className}`}
      >
        {!hideFloatingArt && <FloatingDoodleBackdrop />}
        <div className="relative z-10 flex flex-col flex-1 w-full">
          {children}
        </div>
      </div>
    </div>
  );
};
