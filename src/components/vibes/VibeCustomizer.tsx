import React, { useState } from 'react';
import { ExternalLink, Heart, Check, Sparkles, Navigation, UtensilsCrossed, Image as ImageIcon, Users, Maximize2 } from 'lucide-react';
import { useDatePlanner } from '../../context/DatePlannerContext';
import { useChotuPreferences } from '../../context/ChotuPreferencesContext';
import type { DateVibeOption, VehicleChoice, ChillAudienceChoice, PujaCompanionChoice, PitstopChoice } from '../../types';
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
  DoodleDurgaPuja,
} from '../common/CuteDoodles';
import { ImageLightboxModal } from '../common/ImageLightboxModal';

const VIBE_MEMORY_MAP: Record<string, { doodle: string; photo: string; caption: string }> = {
  'durga-puja': {
    doodle: '/doodles/doodle_durga_puja_couple.jpg',
    photo: '/photos/chotu_saree.jpg',
    caption: 'Dressed up in festive ethnic wear, dhaak beats, and holding hands tightly in the crowd',
  },
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
    setPujaCompanion,
    setSelectedSpotId,
    setPitstopChoice,
  } = useDatePlanner();
  const { isFavoriteSpot, isFavoritePitstop, isFavoriteVehicle } = useChotuPreferences();

  const [showRealPhoto, setShowRealPhoto] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; caption: string } | null>(null);

  const getMapsUrl = (query: string) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  const memory = VIBE_MEMORY_MAP[vibe.id] || {
    doodle: '/doodles/doodle_sonu_chotu_cozy.jpg',
    photo: '/photos/sonu_chotu_cozy.jpg',
    caption: 'Every second with Chotu is my favorite memory',
  };

  const activeMemorySrc = showRealPhoto ? memory.photo : memory.doodle;

  return (
    <div className="space-y-6">
      {/* 1. Love Slogan Banner with Doodle Art */}
      <div className="relative p-5 glass-panel bg-gradient-to-r from-[#FFF0F5]/90 via-white/85 to-[#FFE0E6]/90 border border-white/95 text-center overflow-hidden shadow-[0_10px_30px_-5px_rgba(233,79,100,0.08)]">
        <div className="w-14 h-14 mx-auto mb-2 rounded-2xl bg-white border border-[#FFB7C5]/40 shadow-xs flex items-center justify-center">
          {getVibeDoodleIcon(vibe.id, 'w-8 h-8')}
        </div>
        <p className="font-display text-xl sm:text-2xl font-black text-[#E94F64] leading-tight tracking-tight">
          {vibe.loveSlogan}
        </p>
        <p className="text-xs sm:text-sm text-[#3D2730]/75 mt-1.5 font-medium max-w-sm mx-auto">
          {vibe.romanticNote}
        </p>
      </div>

      {/* Contextual Polaroid Memory for this Vibe (Uncropped Instagram view with Ambient Background) */}
      <div className="glass-panel p-4 bg-white/90 border border-white/95 shadow-[0_10px_30px_-5px_rgba(233,79,100,0.08)] flex flex-col sm:flex-row items-center gap-4">
        <div
          onClick={() =>
            setLightboxImage({
              url: activeMemorySrc,
              title: `${vibe.title} • Jamshedpur Memory`,
              caption: memory.caption,
            })
          }
          className="relative w-full sm:w-28 h-28 rounded-2xl overflow-hidden border border-white/80 shrink-0 bg-neutral-900 shadow-sm cursor-pointer flex items-center justify-center group"
          title="Click to view full uncropped image"
        >
          {/* Ambient blurred backdrop so image fits without harsh crop */}
          <img
            src={activeMemorySrc}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover blur-md opacity-35 scale-110 pointer-events-none"
          />

          {/* Full uncropped image */}
          <img
            src={activeMemorySrc}
            alt="Our memory"
            className="relative z-10 w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />

          <div className="absolute top-1.5 right-1.5 z-20 p-1 rounded-full bg-black/55 text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <Maximize2 className="w-3 h-3" />
          </div>
        </div>

        <div className="min-w-0 flex-1 w-full text-center sm:text-left">
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span className="font-display text-base font-bold text-[#3D2730] leading-none">
              Special Memory
            </span>
            <button
              type="button"
              onClick={() => setShowRealPhoto(!showRealPhoto)}
              className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#FFE0E6] text-[#E94F64] border border-[#FFB7C5]/60 hover:bg-[#FFB7C5]/30 cursor-pointer flex items-center gap-1 shrink-0 shadow-2xs transition-colors"
              title="Toggle doodle / real memory photo"
            >
              <ImageIcon className="w-3 h-3" />
              <span>{showRealPhoto ? 'Doodle' : 'Photo'}</span>
            </button>
          </div>
          <p className="text-xs text-[#3D2730]/85 leading-snug italic mb-2 font-medium">
            "{memory.caption}"
          </p>
          <p className="text-[10px] text-[#3D2730]/60 flex items-center justify-center sm:justify-start gap-1 font-semibold">
            <Heart className="w-2.5 h-2.5 text-[#E94F64] fill-[#E94F64]" />
            <span>Tap photo for uncropped full view</span>
          </p>
        </div>
      </div>

      {/* 2. SPECIFIC: Road Ride Vehicle Choice */}
      {vibe.id === 'road-ride' && (
        <section className="glass-panel p-4 sm:p-6 bg-white/90 border border-white/95 shadow-[0_10px_30px_-5px_rgba(233,79,100,0.08)]">
          <div className="flex items-center gap-2 text-[#E94F64] mb-1">
            <Navigation className="w-4 h-4" />
            <h4 className="font-display text-lg sm:text-xl font-black text-[#3D2730]">
              Choose Our Ride
            </h4>
          </div>
          <p className="text-xs text-[#3D2730]/70 mb-4 font-medium">
            What vehicle are Sonu and Chotu taking on the road today?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
              const isFavVehicle = isFavoriteVehicle(v.id);
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVehicleChoice(v.id)}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between hover:scale-102 ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#FFE0E6] to-[#FFF0F5] border-[#E94F64] shadow-[0_8px_20px_-3px_rgba(233,79,100,0.25)] ring-1 ring-[#FFB7C5]'
                      : 'bg-white/90 border-[#3D2730]/10 hover:border-[#FFB7C5] hover:bg-white shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-white border border-[#FFB7C5]/40 flex items-center justify-center shrink-0 shadow-2xs">
                        {v.icon}
                      </div>
                      <span className="font-bold text-xs text-[#3D2730]">{v.label}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {isFavVehicle && (
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-gradient-to-r from-[#FFE0E6] to-[#FFF0F5] text-[#E94F64] border border-[#FFB7C5] shadow-2xs">
                          Chotu's Ride 👑
                        </span>
                      )}
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#E94F64] border border-[#FFB7C5]/50 shadow-2xs">
                        {v.tag}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#3D2730]/75 leading-snug font-medium">{v.desc}</p>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. SPECIFIC: Chill Session Audience Choice */}
      {vibe.id === 'chill-session' && (
        <section className="glass-panel p-4 sm:p-6 bg-white/90 border border-white/95 shadow-[0_10px_30px_-5px_rgba(233,79,100,0.08)]">
          <div className="flex items-center gap-2 text-[#E94F64] mb-1">
            <Sparkles className="w-4 h-4" />
            <h4 className="font-display text-lg sm:text-xl font-black text-[#3D2730]">
              Who are we chilling with?
            </h4>
          </div>
          <p className="text-xs text-[#3D2730]/70 mb-4 font-medium">
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
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between hover:scale-102 ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#FFE0E6] to-[#FFF0F5] border-[#E94F64] shadow-[0_8px_20px_-3px_rgba(233,79,100,0.25)] ring-1 ring-[#FFB7C5]'
                      : 'bg-white/90 border-[#3D2730]/10 hover:border-[#FFB7C5] hover:bg-white shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-white border border-[#FFB7C5]/40 flex items-center justify-center shrink-0 shadow-2xs">
                        {aud.icon}
                      </div>
                      <span className="font-bold text-xs text-[#3D2730]">{aud.title}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#E94F64] border border-[#FFB7C5]/50 shadow-2xs">
                      {aud.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#3D2730]/75 leading-snug font-medium">{aud.desc}</p>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* SPECIFIC: Durga Puja Companion Choice (Just Us, Siblings, or Family) */}
      {vibe.id === 'durga-puja' && (
        <section className="glass-panel p-4 sm:p-6 bg-white/90 border border-white/95 shadow-[0_10px_30px_-5px_rgba(233,79,100,0.08)]">
          <div className="flex items-center gap-2 text-[#E94F64] mb-1">
            <DoodleDurgaPuja className="w-5 h-5" />
            <h4 className="font-display text-lg sm:text-xl font-black text-[#3D2730]">
              Who is Pandal Hopping with us?
            </h4>
          </div>
          <p className="text-xs text-[#3D2730]/70 mb-4 font-medium">
            Choose our pandal hopping gang for this festive season:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: 'just-us' as PujaCompanionChoice,
                title: 'Just Sonu & Chotu',
                tag: 'Romantic Couple',
                icon: <Heart className="w-5 h-5 text-[#E94F64] fill-[#E94F64]" />,
                desc: 'Holding hands tightly in the crowd, late-night ride between pandals, sharing mela snacks together.',
              },
              {
                id: 'with-siblings' as PujaCompanionChoice,
                title: 'With Siblings',
                tag: 'Masti & Chaos',
                icon: <Sparkles className="w-5 h-5 text-[#F59E0B]" />,
                desc: '100 selfies at every lighting gate, crazy sibling banter, puchka challenges, and loud festive fun!',
              },
              {
                id: 'with-family' as PujaCompanionChoice,
                title: 'With Family',
                tag: 'Warm Blessings',
                icon: <Users className="w-5 h-5 text-[#EA580C]" />,
                desc: 'Pushpanjali together, seeking Maa Durga’s blessings with elders, serene evening pandal walk & dinner.',
              },
            ].map((comp) => {
              const isSelected = (customization.pujaCompanion || 'just-us') === comp.id;
              return (
                <button
                  key={comp.id}
                  type="button"
                  onClick={() => setPujaCompanion(comp.id)}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between hover:scale-102 ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#FFE0E6] to-[#FFF0F5] border-[#E94F64] shadow-[0_8px_20px_-3px_rgba(233,79,100,0.25)] ring-1 ring-[#FFB7C5]'
                      : 'bg-white/90 border-[#3D2730]/10 hover:border-[#FFB7C5] hover:bg-white shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-white border border-[#FFB7C5]/40 flex items-center justify-center shrink-0 shadow-2xs">
                        {comp.icon}
                      </div>
                      <span className="font-bold text-xs text-[#3D2730]">{comp.title}</span>
                    </div>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white text-[#E94F64] border border-[#FFB7C5]/50 shrink-0 shadow-2xs">
                      {comp.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#3D2730]/75 leading-snug font-medium">{comp.desc}</p>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. Sub-Choices List with Doodle Icons (for vibes that don't already have custom picker) */}
      {vibe.id !== 'road-ride' && vibe.subChoices && vibe.subChoices.length > 0 && (
        <section className="glass-panel p-4 sm:p-6 bg-white/90 border border-white/95 shadow-[0_10px_30px_-5px_rgba(233,79,100,0.08)]">
          <div className="flex items-center gap-2 text-[#E94F64] mb-1">
            <Heart className="w-4 h-4 fill-[#E94F64]" />
            <h4 className="font-display text-lg sm:text-xl font-black text-[#3D2730]">
              {vibe.subChoiceTitle || 'Choose Details:'}
            </h4>
          </div>
          <p className="text-xs text-[#3D2730]/70 mb-4 font-medium">
            {vibe.subChoiceSubtitle || (vibe.allowMultipleSubChoices ? 'Pick everything you feel like:' : 'Pick your favorite:')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {vibe.subChoices.map((choice) => {
              const isSelected = customization.selectedSubChoiceIds.includes(choice.id);
              return (
                <div
                  key={choice.id}
                  onClick={() => toggleSubChoice(choice.id, vibe.allowMultipleSubChoices)}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 hover:scale-101 ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#FFE0E6] to-[#FFF0F5] border-[#E94F64] shadow-[0_6px_16px_-3px_rgba(233,79,100,0.2)] ring-1 ring-[#FFB7C5]'
                      : 'bg-white/90 border-[#3D2730]/10 hover:border-[#FFB7C5] hover:bg-white shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-white border border-[#FFB7C5]/40 flex items-center justify-center shrink-0 shadow-2xs">
                      {getSubChoiceDoodleIcon(choice.id, 'w-5 h-5')}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-xs text-[#3D2730]">
                          {choice.label}
                        </span>
                        {choice.tag && (
                          <span className="text-[10px] font-semibold bg-white text-[#E94F64] px-1.5 py-0.2 rounded-md border border-[#FFB7C5]/40 shadow-2xs">
                            {choice.tag}
                          </span>
                        )}
                      </div>
                      {choice.description && (
                        <p className="text-[11px] text-[#3D2730]/75 mt-0.5 leading-snug font-medium line-clamp-2">
                          {choice.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                      isSelected
                        ? 'bg-[#E94F64] text-white border-[#E94F64] shadow-2xs'
                        : 'bg-white text-transparent border-[#3D2730]/20'
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
      <section className="glass-panel p-4 sm:p-6 bg-white/90 border border-white/95 shadow-[0_10px_30px_-5px_rgba(233,79,100,0.08)]">
        <div className="flex items-center gap-2 text-[#E94F64] mb-1">
          <UtensilsCrossed className="w-4 h-4" />
          <h4 className="font-display text-lg sm:text-xl font-black text-[#3D2730]">
            Pitstop: Food, Desserts or Drinks?
          </h4>
        </div>
        <p className="text-xs text-[#3D2730]/70 mb-4 font-medium">
          Where should Sonu stop to treat Chotu for a delicious bite or refreshment?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            const isFavPitstop = isFavoritePitstop(p.id);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setPitstopChoice(p.id)}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between hover:scale-101 ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#FFE0E6] to-[#FFF0F5] border-[#E94F64] shadow-[0_6px_18px_-3px_rgba(233,79,100,0.2)] ring-1 ring-[#FFB7C5]'
                    : 'bg-white/90 border-[#3D2730]/10 hover:border-[#FFB7C5] hover:bg-white shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-white border border-[#FFB7C5]/40 flex items-center justify-center shrink-0 shadow-2xs">
                      {getPitstopDoodleIcon(p.id, 'w-4 h-4')}
                    </div>
                    <span className="font-bold text-xs text-[#3D2730] leading-tight">
                      {p.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {isFavPitstop && (
                      <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-gradient-to-r from-[#FFE0E6] to-[#FFF0F5] text-[#E94F64] border border-[#FFB7C5] shadow-2xs">
                        Chotu's Craving! 😋
                      </span>
                    )}
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#E94F64] border border-[#FFB7C5]/50 shrink-0 shadow-2xs">
                      {p.tag}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-[#3D2730]/75 leading-snug font-medium pl-10">
                  {p.desc}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* 6. Jamshedpur Spots Section with Doodle Map Pin */}
      {vibe.jamshedpurSpots && vibe.jamshedpurSpots.length > 0 && (
        <section className="glass-panel p-4 sm:p-6 bg-white/90 border border-white/95 shadow-[0_10px_30px_-5px_rgba(233,79,100,0.08)]">
          <div className="flex items-center gap-2 text-[#E94F64] mb-1">
            <DoodleMapPin className="w-5 h-5" />
            <h4 className="font-display text-lg sm:text-xl font-black text-[#3D2730]">
              {vibe.jamshedpurSpotsTitle || 'Where in Jamshedpur?'}
            </h4>
          </div>
          <p className="text-xs text-[#3D2730]/70 mb-4 font-medium">
            Tap a destination to select where Sonu and Chotu will head:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {vibe.jamshedpurSpots.map((spot) => {
              const isSelected = customization.selectedSpotId === spot.id;
              const isFavSpot = isFavoriteSpot(spot.name);
              return (
                <div
                  key={spot.id}
                  onClick={() => setSelectedSpotId(spot.id)}
                  className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between hover:scale-101 ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#FFE0E6] to-[#FFF0F5] border-[#E94F64] shadow-[0_6px_18px_-3px_rgba(233,79,100,0.2)] ring-1 ring-[#FFB7C5]'
                      : 'bg-white/90 border-[#3D2730]/10 hover:border-[#FFB7C5] hover:bg-white shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="min-w-0">
                      <h5 className="font-bold text-xs text-[#3D2730] leading-tight">
                        {spot.name}
                      </h5>
                      <div className="flex items-center gap-1.5 flex-wrap mt-1">
                        <div className="inline-flex items-center gap-1 text-[10px] font-bold text-[#E94F64] bg-white px-2 py-0.5 rounded-full border border-[#FFB7C5]/50 shadow-2xs">
                          <DoodleMapPin className="w-3 h-3" />
                          <span>{spot.locality}</span>
                        </div>
                        {isFavSpot && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-gradient-to-r from-[#FFE0E6] to-[#FFF0F5] text-[#E94F64] border border-[#FFB7C5] shadow-2xs">
                            <Sparkles className="w-2.5 h-2.5 text-[#E94F64]" />
                            <span>Chotu's Spot! 👑</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <a
                      href={getMapsUrl(spot.mapsQuery)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[11px] font-bold text-[#E94F64] hover:bg-[#FFE0E6] flex items-center gap-1 shrink-0 bg-white px-2.5 py-1 rounded-xl border border-[#FFB7C5]/60 shadow-2xs transition-colors"
                    >
                      <span>Map</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <p className="text-[11px] text-[#3D2730]/75 mt-1 leading-snug font-medium">
                    {spot.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Lightbox Modal for Uncropped Photo Zoom */}
      <ImageLightboxModal
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
        photoUrl={lightboxImage?.url || ''}
        title={lightboxImage?.title || ''}
        caption={lightboxImage?.caption || ''}
      />
    </div>
  );
};
