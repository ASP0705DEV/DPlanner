import React from 'react';
import { Sparkles } from 'lucide-react';
import { useDatePlanner } from '../context/DatePlannerContext';
import { DATE_VIBES } from '../data/dateVibes';
import { VibeSelectionCard } from '../components/vibes/VibeSelectionCard';
import { StepNavigation } from '../components/common/StepNavigation';
import { ROMANTIC_CONFIG } from '../config/romanticMessages';
import { WashiTape } from '../components/common/WashiTape';
import { MobileContainer } from '../components/common/MobileContainer';

export const ScreenTwoVibe: React.FC = () => {
  const { selectedVibeId, selectVibe } = useDatePlanner();

  const chosenVibe = DATE_VIBES.find((v) => v.id === selectedVibeId) || DATE_VIBES[0];

  return (
    <MobileContainer className="px-4 py-6 pb-24">
      {/* Header */}
      <div className="text-center max-w-sm mx-auto mb-6 relative">
        <WashiTape color="butter" rotate="rotate-1" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE0E6] text-[#E94F64] border border-[#FFB7C5] text-[11px] font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3 h-3" />
          <span>Step 1: Pick Today's Vibe</span>
        </div>

        <h1 className="font-handwritten text-4xl font-bold text-[#49333A] mb-1.5 leading-tight">
          {ROMANTIC_CONFIG.vibeScreen.heading}
        </h1>

        <p className="text-xs text-[#49333A]/80 font-medium">
          {ROMANTIC_CONFIG.vibeScreen.subheading}
        </p>

        <p className="text-[11px] text-[#E94F64] font-bold mt-2 bg-white/80 py-1 px-3 rounded-full inline-block border border-[#FFB7C5]/40 shadow-xs">
          Pick one mood today — Sonu will customize every detail!
        </p>
      </div>

      {/* Single-select Vibe Cards */}
      <div className="space-y-3.5 mb-6">
        {DATE_VIBES.map((vibe) => {
          const isSelected = selectedVibeId === vibe.id;
          return (
            <VibeSelectionCard
              key={vibe.id}
              vibe={vibe}
              isSelected={isSelected}
              onSelect={() => selectVibe(vibe.id)}
            />
          );
        })}
      </div>

      {/* Persistent Step Navigation */}
      <StepNavigation
        prevPath="/"
        prevLabel="Letter"
        nextPath="/customize"
        nextLabel={`Customize ${chosenVibe.title}`}
        sweetNote="You pick the vibe, Sonu plans the magic"
      />
    </MobileContainer>
  );
};
