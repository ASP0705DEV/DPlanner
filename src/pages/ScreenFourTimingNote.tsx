import React from 'react';
import { Clock, Calendar, Sparkles } from 'lucide-react';
import { useDatePlanner } from '../context/DatePlannerContext';
import type { DateTiming } from '../types';
import { StepNavigation } from '../components/common/StepNavigation';
import { ROMANTIC_CONFIG } from '../config/romanticMessages';
import { WashiTape } from '../components/common/WashiTape';
import { MobileContainer } from '../components/common/MobileContainer';
import {
  DoodleLightning,
  DoodleSun,
  DoodleSunset,
  DoodleWineDinner,
  DoodleMoonStars,
  DoodleSparkleHeart,
} from '../components/common/CuteDoodles';

const TIMING_OPTIONS: {
  id: DateTiming;
  label: string;
  icon: React.ReactNode;
  desc: string;
}[] = [
  {
    id: 'right-now',
    label: 'Right Now!',
    icon: <DoodleLightning className="w-5 h-5" />,
    desc: 'Drop everything, Sonu is on the way!',
  },
  {
    id: 'afternoon',
    label: 'Sunny Afternoon',
    icon: <DoodleSun className="w-5 h-5" />,
    desc: 'Warm golden hours, post-lunch chilling & drives.',
  },
  {
    id: 'evening',
    label: 'Golden Evening',
    icon: <DoodleSunset className="w-5 h-5" />,
    desc: 'Sunset breeze, tea, and warm twilight lights (4PM - 7PM).',
  },
  {
    id: 'dinner-time',
    label: 'Dinner Time',
    icon: <DoodleWineDinner className="w-5 h-5" />,
    desc: 'Candlelight food, dressed up pretty for the night.',
  },
  {
    id: 'late-night',
    label: 'Late Night',
    icon: <DoodleMoonStars className="w-5 h-5" />,
    desc: 'Empty quiet streets, starry skies, and deep heart talks.',
  },
  {
    id: 'any-time',
    label: 'Any Time',
    icon: <DoodleSparkleHeart className="w-5 h-5" />,
    desc: 'Whenever you are free, Sonu’s day is completely yours.',
  },
];

export const ScreenFourTimingNote: React.FC = () => {
  const {
    preferredTiming,
    setPreferredTiming,
    preferredDate,
    setPreferredDate,
    specialNote,
    setSpecialNote,
  } = useDatePlanner();

  return (
    <MobileContainer className="px-4 py-6 pb-24">
      {/* Header */}
      <div className="text-center max-w-sm mx-auto mb-6 relative">
        <WashiTape color="lavender" rotate="-rotate-1" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7DFFF] text-[#6B21A8] border border-[#DDD6FE] text-[11px] font-bold uppercase tracking-wider mb-2">
          <Clock className="w-3 h-3" />
          <span>Step 3: Timing & Wishes</span>
        </div>

        <h1 className="font-handwritten text-4xl font-bold text-[#49333A] mb-1 leading-tight">
          {ROMANTIC_CONFIG.timingScreen.heading}
        </h1>

        <p className="text-xs text-[#49333A]/80 font-medium">
          {ROMANTIC_CONFIG.timingScreen.subheading}
        </p>
      </div>

      <div className="space-y-5">
        {/* Timing options */}
        <section className="glass-panel p-4 sm:p-6 bg-white/90 border border-white/95 shadow-[0_10px_30px_-5px_rgba(233,79,100,0.08)]">
          <div className="flex items-center gap-2 text-[#E94F64] mb-1">
            <Clock className="w-4 h-4" />
            <h4 className="font-display text-lg sm:text-xl font-extrabold text-[#3D2730]">
              Preferred Time of Day
            </h4>
          </div>
          <p className="text-xs text-[#3D2730]/70 mb-4 font-medium">
            When are we starting our date together?
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TIMING_OPTIONS.map((t) => {
              const isSelected = preferredTiming === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setPreferredTiming(t.id)}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between hover:scale-102 ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#FFE0E6] to-[#FFF0F5] border-[#E94F64] shadow-[0_8px_20px_-3px_rgba(233,79,100,0.25)] ring-1 ring-[#FFB7C5]'
                      : 'bg-white/90 border-[#3D2730]/10 hover:border-[#FFB7C5] hover:bg-white shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-white border border-[#FFB7C5]/40 flex items-center justify-center shrink-0 shadow-2xs">
                      {t.icon}
                    </div>
                    <span className="font-bold text-xs text-[#3D2730] leading-tight min-w-0 flex-1">
                      {t.label}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#3D2730]/70 leading-snug font-medium">
                    {t.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Date (Optional) */}
        <section className="glass-panel p-4 sm:p-6 bg-white/90 border border-white/95 shadow-[0_10px_30px_-5px_rgba(233,79,100,0.08)]">
          <div className="flex items-center gap-2 text-[#E94F64] mb-1">
            <Calendar className="w-4 h-4" />
            <h4 className="font-display text-lg sm:text-xl font-extrabold text-[#3D2730]">
              Specific Day (Optional)
            </h4>
          </div>
          <p className="text-xs text-[#3D2730]/70 mb-3 font-medium">
            Leave blank if it's for today or whenever you want!
          </p>
          <input
            type="date"
            value={preferredDate || ''}
            onChange={(e) => setPreferredDate(e.target.value)}
            className="w-full p-3 bg-white/80 border border-[#3D2730]/15 rounded-2xl text-xs text-[#3D2730] focus:outline-none focus:ring-2 focus:ring-[#FFB7C5] focus:border-[#E94F64] font-semibold transition-all shadow-inner"
          />
        </section>

        {/* Sweet Note */}
        <section className="glass-panel p-4 sm:p-6 bg-white/90 border border-white/95 shadow-[0_10px_30px_-5px_rgba(233,79,100,0.08)]">
          <div className="flex items-center gap-2 text-[#E94F64] mb-1">
            <Sparkles className="w-4 h-4" />
            <h4 className="font-display text-lg sm:text-xl font-extrabold text-[#3D2730]">
              Tell Sonu anything, Chotu…
            </h4>
          </div>
          <p className="text-xs text-[#3D2730]/70 mb-3 font-medium">
            {ROMANTIC_CONFIG.timingScreen.notePrompt}
          </p>
          <textarea
            rows={3}
            value={specialNote}
            onChange={(e) => setSpecialNote(e.target.value)}
            placeholder="e.g. Wear your black shirt! And can we also get cold coffee on the way?"
            className="w-full p-3.5 bg-white/80 border border-[#3D2730]/15 rounded-2xl text-xs text-[#3D2730] focus:outline-none focus:ring-2 focus:ring-[#FFB7C5] focus:border-[#E94F64] font-medium leading-relaxed resize-none shadow-inner transition-all"
          />
        </section>
      </div>

      {/* Step Navigation */}
      <StepNavigation
        prevPath="/customize"
        prevLabel="Customize"
        nextPath="/wishlist"
        nextLabel="Review Wishlist"
        sweetNote="One cute date coming up for Chotu"
      />
    </MobileContainer>
  );
};
