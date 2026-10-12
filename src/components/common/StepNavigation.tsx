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
    <div className="sticky bottom-0 z-30 bg-[#FFF8F0]/95 backdrop-blur-md border-t-2 border-dashed border-[#49333A]/15 py-2.5 px-4 shadow-lg transition-all">
      <div className="max-w-md mx-auto">
        {sweetNote && (
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#49333A]/75 font-medium mb-2">
            <Heart className="w-3 h-3 fill-[#E94F64] text-[#E94F64] shrink-0" />
            <span className="truncate">{sweetNote}</span>
            <Heart className="w-3 h-3 fill-[#E94F64] text-[#E94F64] shrink-0" />
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          {/* Prev Button */}
          {prevPath ? (
            <button
              type="button"
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border-2 border-[#49333A]/20 bg-white text-[#49333A] font-bold text-xs hover:bg-[#FFE0E6]/30 hover:border-[#FFB7C5] transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{prevLabel}</span>
            </button>
          ) : (
            <div className="w-8" />
          )}

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            className="btn-pookie flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs sm:text-sm font-bold cursor-pointer group shadow-md"
          >
            <span className="truncate">{nextLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};
