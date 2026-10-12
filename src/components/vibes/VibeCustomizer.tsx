import React, { useState } from 'react';
import { ExternalLink, Heart, Check, Sparkles, Navigation, UtensilsCrossed, Image as ImageIcon } from 'lucide-react';
import { useDatePlanner } from '../../context/DatePlannerContext';
import type { DateVibeOption, VehicleChoice, ChillAudienceChoice, PitstopChoice } from '../../types';
import {
  getVibeDoodleIcon,
  getSubChoiceDoodleIcon,
  getPitstopDoodleIcon,
  DoodleBike,
  DoodleCar,
  DoodleScooter,
  DoodleCocktailDrink,
  DoodleStar,
  DoodleMapPin,
} from '../common/CuteDoodles';
import { WashiTape } from '../common/WashiTape';

const VIBE_MEMORY_MAP: Record<string, { doodle: string; photo: string; caption: string }> = {
  'road-ride': {
    doodle: '/doodles/sunset_drive_polaroid.jpg',
    photo: '/photos/car_drive_miss_you.jpg',
    caption: 'Long road rides & endless breeze with Chotu',
  },
  'cafe-date': {
    doodle: '/doodles/doodle_cafe_couple.jpg',
    photo: '/photos/sonu_chotu_cafe_date.jpg',
    caption: 'Our cozy cafe moments & hot coffee dates',
  },
  'sports-games': {
    doodle: '/doodles/doodle_gokart_chotu.jpg',
    photo: '/photos/chotu_gokart_racing.jpg',
    caption: 'Chotu speeding like a champion racer!',
  },
  'cuddle-peace': {
    doodle: '/doodles/doodle_home_cuddle.jpg',
    photo: '/photos/sonu_chotu_home_cuddle.jpg',
    caption: 'Warmest hugs and peaceful silence together',
  },
  'chill-session': {
    doodle: '/doodles/doodle_home_cuddle.jpg',
    photo: '/photos/green_chill.jpg',
    caption: 'Unwinding with music, laughter, and zero stress',
  },
  'dinner-date': {
    doodle: '/doodles/doodle_sonu_chotu_cozy.jpg',
    photo: '/photos/sonu_chotu_tilak_night.jpg',
    caption: 'Dressed up and glowing together in Jamshedpur',
  },
  'us-time': {
    doodle: '/doodles/doodle_sunflower_date.jpg',
    photo: '/photos/sonu_chotu_sunflower_field.jpg',
    caption: 'Zero phones, airplane mode, pure US time',
  },
  'steamy-romance': {
    doodle: '/doodles/doodle_home_cuddle.jpg',
    photo: '/photos/sonu_love_promise.jpg',
    caption: 'Every beat of my heart belongs only to you',
  },
  'princess-treatment': {
    doodle: '/doodles/doodle_chotu_candid.jpg',
    photo: '/photos/chotu_saree.jpg',
    caption: 'Rani Saheba mode: pampered like pure royalty',
  },
  'street-food': {
    doodle: '/doodles/doodle_chotu_candid.jpg',
    photo: '/photos/chotu_car_smile.jpg',
    caption: 'Food cravings and cute street food stops',
  },
  'shopping-spree': {
    doodle: '/doodles/doodle_chotu_candid.jpg',
    photo: '/photos/chotu_chic_workwear.jpg',
    caption: 'Sonu carrying bags while Chotu picks her favorites',
  },
  'movie-night': {
    doodle: '/doodles/doodle_home_cuddle.jpg',
    photo: '/photos/sonu_chotu_night_glow.jpg',
    caption: 'Popcorn, dim lights, and leaning against your shoulder',
  },
};

interface VibeCustomizerProps {
  vibe: DateVibeOption;
}

export const VibeCustomizer: React.FC<VibeCustomizerProps> = ({ vibe }) => {
  const {
    customization,
    toggleSubChoice,
    setVehicleChoice,
    setChillAudience,
    setSelectedSpotId,
    setPitstopChoice,
  } = useDatePlanner();

  const [showRealPhoto, setShowRealPhoto] = useState(false);

  const getMapsUrl = (query: string) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  const memory = VIBE_MEMORY_MAP[vibe.id] || {
    doodle: '/doodles/doodle_sonu_chotu_cozy.jpg',
    photo: '/photos/sonu_chotu_cozy.jpg',
    caption: 'Every second with Chotu is my favorite memory',
  };

  return (
    <div className="space-y-6">
      {/* 1. Love Slogan Banner with Doodle Art */}
      <div className="relative p-5 bg-[#FFE0E6]/40 rounded-3xl border-2 border-dashed border-[#FFB7C5] text-center overflow-hidden">
        <WashiTape color="pink" rotate="-rotate-1" />
        <div className="w-14 h-14 mx-auto mb-2 rounded-2xl bg-white border border-[#49333A]/10 shadow-xs flex items-center justify-center">
          {getVibeDoodleIcon(vibe.id, 'w-9 h-9')}
        </div>
        <p className="font-handwritten text-2xl font-bold text-[#E94F64] leading-tight">
          {vibe.loveSlogan}
        </p>
        <p className="text-xs text-[#49333A]/80 mt-1.5 font-medium max-w-xs mx-auto">
          {vibe.romanticNote}
        </p>
      </div>

      {/* Contextual Polaroid Memory for this Vibe */}
      <div className="scrapbook-card p-3.5 bg-white border-2 border-[#49333A]/10 flex items-center gap-3.5 shadow-sm">
        <div className="w-20 h-20 rounded-2xl overflow-hidden border border-[#49333A]/15 shrink-0 bg-[#FFF8F0] shadow-2xs relative">
          <img
            src={showRealPhoto ? memory.photo : memory.doodle}
            alt="Our memory"
            className="w-full h-full object-cover transition-opacity duration-200"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="font-handwritten text-xl font-bold text-[#49333A] leading-none">
              Our Memory
            </span>
            <button
              type="button"
              onClick={() => setShowRealPhoto(!showRealPhoto)}
              className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFE0E6] text-[#E94F64] border border-[#FFB7C5] hover:bg-[#FFB7C5]/30 cursor-pointer flex items-center gap-1 shrink-0"
              title="Toggle doodle / real memory photo"
            >
              <ImageIcon className="w-3 h-3" />
              <span>{showRealPhoto ? 'Doodle' : 'Photo'}</span>
            </button>
          </div>
          <p className="text-[11px] text-[#49333A]/75 leading-snug italic">
            "{memory.caption}"
          </p>
        </div>
      </div>

      {/* 2. SPECIFIC: Road Ride Vehicle Choice */}
      {vibe.id === 'road-ride' && (
        <section className="scrapbook-card p-4 sm:p-5 bg-white border-2 border-[#49333A]/10">
          <div className="flex items-center gap-2 text-[#E94F64] mb-1">
            <Navigation className="w-4 h-4" />
            <h4 className="font-handwritten text-2xl font-bold text-[#49333A]">
              Choose Our Ride
            </h4>
          </div>
          <p className="text-xs text-[#49333A]/70 mb-3.5">
            What vehicle are Sonu and Chotu taking on the road today?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              {
                id: 'bike' as VehicleChoice,
                label: 'Bike Ride',
                tag: 'Hold Tight',
                icon: <DoodleBike className="w-6 h-6" />,
                desc: 'Breezy ride, hands around my waist, leaning into the wind together.',
              },
              {
                id: 'car' as VehicleChoice,
                label: 'Car Drive',
                tag: 'Cozy & Songs',
                icon: <DoodleCar className="w-6 h-6" />,
                desc: 'Warm AC/heater, windows down at night, private car playlist.',
              },
              {
                id: 'scooter' as VehicleChoice,
                label: 'Scooter Cruise',
                tag: 'Chill Breeze',
                icon: <DoodleScooter className="w-6 h-6" />,
                desc: 'Cute, easy cruising through green lanes, stopping anywhere.',
              },
            ].map((v) => {
              const isSelected = customization.vehicleChoice === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVehicleChoice(v.id)}
                  className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#FFE0E6] border-[#E94F64] shadow-xs'
                      : 'bg-white border-[#49333A]/15 hover:border-[#FFB7C5]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-[#FFF8F0] border border-[#49333A]/10 flex items-center justify-center shrink-0">
                        {v.icon}
                      </div>
                      <span className="font-bold text-xs text-[#49333A]">{v.label}</span>
                    </div>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white text-[#E94F64] border border-[#FFB7C5]">
                      {v.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#49333A]/80 leading-snug">{v.desc}</p>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. SPECIFIC: Chill Session Audience Choice */}
      {vibe.id === 'chill-session' && (
        <section className="scrapbook-card p-4 sm:p-5 bg-white border-2 border-[#49333A]/10">
          <div className="flex items-center gap-2 text-[#E94F64] mb-1">
            <Sparkles className="w-4 h-4" />
            <h4 className="font-handwritten text-2xl font-bold text-[#49333A]">
              Who are we chilling with?
            </h4>
          </div>
          <p className="text-xs text-[#49333A]/70 mb-3.5">
            Choose our circle for tonight's session:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                id: 'just-us' as ChillAudienceChoice,
                title: 'Just Sonu & Chotu',
                tag: 'Intimate Couple Vibe',
                icon: <DoodleCocktailDrink className="w-6 h-6" />,
                desc: 'Deep heart talks, acoustics playing softly, cuddles on the couch, pure intimate peace.',
              },
              {
                id: 'with-siblings' as ChillAudienceChoice,
                title: 'With All the Siblings',
                tag: 'Crazy Party Energy',
                icon: <DoodleStar className="w-6 h-6 text-[#F59E0B]" />,
                desc: 'Chaotic jokes, fun card games, loud music, laughing till our stomachs hurt with everyone!',
              },
            ].map((aud) => {
              const isSelected = customization.chillAudience === aud.id;
              return (
                <button
                  key={aud.id}
                  type="button"
                  onClick={() => setChillAudience(aud.id)}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#FFE0E6] border-[#E94F64] shadow-xs'
                      : 'bg-white border-[#49333A]/15 hover:border-[#FFB7C5]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-[#FFF8F0] border border-[#49333A]/10 flex items-center justify-center shrink-0">
                        {aud.icon}
                      </div>
                      <span className="font-bold text-sm text-[#49333A]">{aud.title}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#E94F64] border border-[#FFB7C5]">
                      {aud.tag}
                    </span>
                  </div>
                  <p className="text-xs text-[#49333A]/80 leading-snug">{aud.desc}</p>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. Sub-Choices List with Doodle Icons (for vibes that don't already have custom picker) */}
      {vibe.id !== 'road-ride' && vibe.subChoices && vibe.subChoices.length > 0 && (
        <section className="scrapbook-card p-4 sm:p-5 bg-white border-2 border-[#49333A]/10">
          <div className="flex items-center gap-2 text-[#E94F64] mb-1">
            <Heart className="w-4 h-4 fill-[#E94F64]" />
            <h4 className="font-handwritten text-2xl font-bold text-[#49333A]">
              {vibe.subChoiceTitle || 'Choose Details:'}
            </h4>
          </div>
          <p className="text-xs text-[#49333A]/70 mb-3.5">
            {vibe.subChoiceSubtitle || (vibe.allowMultipleSubChoices ? 'Pick everything you feel like:' : 'Pick your favorite:')}
          </p>

          <div className="space-y-2">
            {vibe.subChoices.map((choice) => {
              const isSelected = customization.selectedSubChoiceIds.includes(choice.id);
              return (
                <div
                  key={choice.id}
                  onClick={() => toggleSubChoice(choice.id, vibe.allowMultipleSubChoices)}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#FFE0E6] border-[#E94F64] shadow-xs'
                      : 'bg-[#FFF8F0]/60 border-[#49333A]/10 hover:border-[#FFB7C5]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#49333A]/10 flex items-center justify-center shrink-0 shadow-xs">
                      {getSubChoiceDoodleIcon(choice.id, 'w-6 h-6')}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-xs text-[#49333A]">
                          {choice.label}
                        </span>
                        {choice.tag && (
                          <span className="text-[10px] font-semibold bg-white text-[#E94F64] px-1.5 py-0.2 rounded-md border border-[#FFB7C5]/40">
                            {choice.tag}
                          </span>
                        )}
                      </div>
                      {choice.description && (
                        <p className="text-[11px] text-[#49333A]/75 mt-0.5 leading-snug">
                          {choice.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                      isSelected
                        ? 'bg-[#E94F64] text-white border-[#E94F64]'
                        : 'bg-white text-transparent border-[#49333A]/20'
                    }`}
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 5. USER REQUESTED: Pitstop for Food, Desserts or Drinks */}
      <section className="scrapbook-card p-4 sm:p-5 bg-white border-2 border-[#49333A]/10">
        <div className="flex items-center gap-2 text-[#E94F64] mb-1">
          <UtensilsCrossed className="w-4 h-4" />
          <h4 className="font-handwritten text-2xl font-bold text-[#49333A]">
            Pitstop: Food, Desserts or Drinks?
          </h4>
        </div>
        <p className="text-xs text-[#49333A]/70 mb-3.5">
          Where should Sonu stop to treat Chotu for a delicious bite or refreshment?
        </p>

        <div className="grid grid-cols-1 gap-2.5">
          {[
            {
              id: 'chai-maggi' as PitstopChoice,
              label: 'Scenic Tapri Chai & Maggi',
              tag: 'Breeze & Warmth',
              desc: 'Hot kulhad chai & spicy Maggi overlooking Marine Drive or Dimna Dam.',
            },
            {
              id: 'cold-coffee-shakes' as PitstopChoice,
              label: 'Thick Cold Coffee & Shakes',
              tag: 'Chilled Sweetness',
              desc: 'Rich hazelnut frappe, Irish cold brew, or thick Belgian chocolate shake.',
            },
            {
              id: 'icecream-waffles' as PitstopChoice,
              label: 'Artisan Gelato & Waffles',
              tag: 'Sweet Tooth',
              desc: 'Crispy warm Belgian waffles dripping in Nutella with scoops of ice cream.',
            },
            {
              id: 'kathi-shawarma' as PitstopChoice,
              label: 'Crispy Kathi Roll or Shawarma',
              tag: 'Savory Craving',
              desc: 'Buttery chicken or paneer roll with onions & mint chutney, or garlicky wrap.',
            },
            {
              id: 'pastries-bakery' as PitstopChoice,
              label: 'Fresh Pastries & Cheesecakes',
              tag: 'Boutique Bakery',
              desc: 'Le Bon / Brubeck fresh tarts, blueberry cheesecake, and warm croissants.',
            },
            {
              id: 'puchka-chaat' as PitstopChoice,
              label: 'Evening Puchka & Chaat',
              tag: 'Street Craving',
              desc: 'Spicy mint puchkas, dahi puri, and aloo tikki chaat in Bistupur.',
            },
            {
              id: 'cocktails-drinks' as PitstopChoice,
              label: 'Cocktails / Mocktails & Starters',
              tag: 'Lounge Vibe',
              desc: 'Chic coolers, mojitos, and sizzling appetizers in a cozy booth.',
            },
            {
              id: 'none' as PitstopChoice,
              label: 'Direct Date (No Pitstop Needed)',
              tag: 'Focused Vibe',
              desc: 'Keep it straight to our primary plan with all focus on us.',
            },
          ].map((p) => {
            const isSelected = customization.pitstopChoice === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setPitstopChoice(p.id)}
                className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#FFE0E6] border-[#E94F64] shadow-xs'
                    : 'bg-white border-[#49333A]/10 hover:border-[#FFB7C5]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-[#FFF8F0] border border-[#49333A]/10 flex items-center justify-center shrink-0">
                      {getPitstopDoodleIcon(p.id, 'w-5 h-5')}
                    </div>
                    <span className="font-bold text-xs text-[#49333A] leading-tight">
                      {p.label}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFF8F0] text-[#E94F64] border border-[#FFB7C5] shrink-0">
                    {p.tag}
                  </span>
                </div>
                <p className="text-[11px] text-[#49333A]/75 leading-snug pl-10.5">
                  {p.desc}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* 6. Jamshedpur Spots Section with Doodle Map Pin */}
      {vibe.jamshedpurSpots && vibe.jamshedpurSpots.length > 0 && (
        <section className="scrapbook-card p-4 sm:p-5 bg-white border-2 border-[#49333A]/10">
          <div className="flex items-center gap-2 text-[#E94F64] mb-1">
            <DoodleMapPin className="w-5 h-5" />
            <h4 className="font-handwritten text-2xl font-bold text-[#49333A]">
              {vibe.jamshedpurSpotsTitle || 'Where in Jamshedpur?'}
            </h4>
          </div>
          <p className="text-xs text-[#49333A]/70 mb-3.5">
            Tap a destination to select where Sonu and Chotu will head:
          </p>

          <div className="space-y-2.5">
            {vibe.jamshedpurSpots.map((spot) => {
              const isSelected = customization.selectedSpotId === spot.id;
              return (
                <div
                  key={spot.id}
                  onClick={() => setSelectedSpotId(spot.id)}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#FFE0E6] border-[#E94F64] shadow-xs'
                      : 'bg-white border-[#49333A]/10 hover:border-[#FFB7C5]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="min-w-0">
                      <h5 className="font-bold text-xs text-[#49333A] leading-tight">
                        {spot.name}
                      </h5>
                      <div className="inline-flex items-center gap-1 text-[10px] font-bold text-[#E94F64] bg-white px-2 py-0.5 rounded-full border border-[#FFB7C5] mt-1">
                        <DoodleMapPin className="w-3 h-3" />
                        <span>{spot.locality}</span>
                      </div>
                    </div>

                    <a
                      href={getMapsUrl(spot.mapsQuery)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[11px] font-bold text-[#E94F64] hover:underline flex items-center gap-1 shrink-0 bg-[#FFF8F0] px-2.5 py-1 rounded-xl border border-[#FFB7C5]/40"
                    >
                      <span>Map</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <p className="text-[11px] text-[#49333A]/75 mt-1.5 leading-snug">
                    {spot.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
