import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Heart } from 'lucide-react';

interface StepNavigationProps {
  prevPath?: string;
  prevLabel?: string;
  nextPath: string;
  nextLabel: string;
  sweetNote?: string;
  onNextClick?: () => boolean | void;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  prevPath,
  prevLabel = 'Back',
  nextPath,
  nextLabel,
  sweetNote = 'Pick whatever your heart wants, Chotu',
  onNextClick,
}) => {
  const navigate = useNavigate();

  const handleNext = () => {
    if (onNextClick) {
      const allowed = onNextClick();
      if (allowed === false) return;
    }
    navigate(nextPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (prevPath) {
      navigate(prevPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="sticky bottom-4 z-40 px-2 mt-8 pointer-events-none">
      <div className="max-w-md mx-auto glass-panel p-3 bg-white/92 backdrop-blur-xl border border-white/95 shadow-[0_15px_35px_-5px_rgba(233,79,100,0.18)] pointer-events-auto rounded-3xl">
        {sweetNote && (
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#3D2730]/75 font-semibold mb-2">
            <Heart className="w-3 h-3 fill-[#E94F64] text-[#E94F64] shrink-0 animate-pulse" />
            <span className="truncate">{sweetNote}</span>
            <Heart className="w-3 h-3 fill-[#E94F64] text-[#E94F64] shrink-0 animate-pulse" />
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          {/* Prev Button */}
          {prevPath ? (
            <button
              type="button"
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border border-[#3D2730]/12 bg-white text-[#3D2730] font-bold text-xs hover:bg-[#FFE0E6]/40 hover:border-[#FFB7C5] transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#E94F64]" />
              <span>{prevLabel}</span>
            </button>
          ) : (
            <div className="w-8" />
          )}

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            className="btn-pookie flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs sm:text-sm font-bold cursor-pointer group shadow-[0_6px_20px_-3px_rgba(233,79,100,0.35)]"
          >
            <span className="truncate font-display tracking-wide">{nextLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};
