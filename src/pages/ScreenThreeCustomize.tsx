import React from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDatePlanner } from '../context/DatePlannerContext';
import { DATE_VIBES } from '../data/dateVibes';
import { VibeCustomizer } from '../components/vibes/VibeCustomizer';
import { StepNavigation } from '../components/common/StepNavigation';
import { WashiTape } from '../components/common/WashiTape';
import { MobileContainer } from '../components/common/MobileContainer';

export const ScreenThreeCustomize: React.FC = () => {
  const { selectedVibeId } = useDatePlanner();

  const chosenVibe = DATE_VIBES.find((v) => v.id === selectedVibeId) || DATE_VIBES[0];

  return (
    <MobileContainer className="px-4 py-6 pb-24">
      {/* Header */}
      <div className="text-center max-w-sm mx-auto mb-6 relative">
        <WashiTape color="pink" rotate="-rotate-1" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE0E6] text-[#E94F64] border border-[#FFB7C5] text-[11px] font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3 h-3" />
          <span>Step 2: Customizing Your Vibe</span>
        </div>

        <h1 className="font-handwritten text-4xl font-bold text-[#49333A] mb-1 leading-tight">
          {chosenVibe.title}
        </h1>

        <p className="text-xs text-[#49333A]/80 font-medium">
          Let's tailor all the cute details and Jamshedpur spots!
        </p>

        <Link
          to="/vibe"
          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E94F64] hover:underline mt-1.5"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>Change Vibe</span>
        </Link>
      </div>

      {/* Dynamic Vibe Customizer */}
      <VibeCustomizer vibe={chosenVibe} />

      {/* Bottom Step Navigation */}
      <StepNavigation
        prevPath="/vibe"
        prevLabel="Change Vibe"
        nextPath="/timing-note"
        nextLabel="Next: Time & Note"
        sweetNote="Every detail is curated with love for Chotu"
      />
    </MobileContainer>
  );
};
