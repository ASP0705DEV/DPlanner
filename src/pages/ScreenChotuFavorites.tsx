import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Heart,
  Sparkles,
  MapPin,
  UtensilsCrossed,
  Navigation,
  Smile,
  Send,
  ArrowLeft,
  Crown,
  Coffee,
  Car,
  Music,
} from 'lucide-react';
import { useChotuPreferences } from '../context/ChotuPreferencesContext';
import { MobileContainer } from '../components/common/MobileContainer';
import { playCelebrationTone, playHeartNudgeSound } from '../utils/soundEffects';

const SONU_PHONE = '917070362117';

export const ScreenChotuFavorites: React.FC = () => {
  const navigate = useNavigate();
  const { preferences, savePreferences } = useChotuPreferences();

  // Local form state
  const [formData, setFormData] = useState({ ...preferences });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'places' | 'food' | 'activities' | 'pampering' | 'wishes'>('places');

  const toggleArrayItem = (key: keyof typeof formData, item: string) => {
    playHeartNudgeSound(1);
    setFormData((prev) => {
      const arr = (prev[key] as string[]) || [];
      const updated = arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
      return { ...prev, [key]: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    playCelebrationTone();

    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FFB7C5', '#E94F64', '#FFE0E6', '#F59E0B', '#FFF0B8'],
    });

    await savePreferences(formData);
    setIsSubmitting(false);
    setShowSuccessModal(true);
  };

  const handleSendToWhatsApp = () => {
    const text = `👑 Chotu's Favorites & Date Preferences Profile 👑\n\n` +
      `📍 Favorite Places: ${(formData.favoritePlacesInJsr || []).join(', ')}${formData.customFavoritePlace ? ` (${formData.customFavoritePlace})` : ''}\n` +
      `🍕 Favorite Foods: ${(formData.favoriteStreetFoods || []).join(', ')}${formData.customStreetFood ? ` (${formData.customStreetFood})` : ''}\n` +
      `🍰 Desserts & Drinks: ${(formData.favoriteDesserts || []).join(', ')} | ${(formData.favoriteDrinks || []).join(', ')}\n` +
      `🛵 Travel Mode: ${formData.preferredTravelMode?.toUpperCase()} with Sonu\n` +
      `💖 Favorite Activities: ${(formData.favoriteFunActivities || []).join(', ')}\n` +
      `🥰 What Cheers Chotu Up: ${(formData.whatCheersChotuUp || []).join(', ')}\n` +
      `🎵 Car Songs: ${formData.carRideSongsOrArtists || 'Acoustic vibes'}\n` +
      `✨ Secret Wish: ${formData.secretWish || 'Surprise date'}\n\n` +
      `💌 Note for Sonu: "${formData.specialNoteForSonu || 'Love you!'}"\n\n` +
      `Sonu, check this and pamper your queen accordingly! 💕`;

    window.open(`https://api.whatsapp.com/send?phone=${SONU_PHONE}&text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <MobileContainer className="px-3.5 sm:px-5 py-4 pb-32">
      {/* 1. HEADER */}
      <div className="glass-panel bg-white/95 backdrop-blur-2xl border border-white/95 p-5 rounded-[2.2rem] shadow-[0_15px_40px_-10px_rgba(233,79,100,0.12)] mb-5 text-center">
        <div className="w-14 h-14 mx-auto mb-2.5 rounded-2xl bg-gradient-to-tr from-[#FFE0E6] via-[#FFF0F5] to-white border border-[#FFB7C5]/50 flex items-center justify-center text-[#E94F64] shadow-xs">
          <Crown className="w-8 h-8 stroke-[1.8]" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFE0E6] text-[#E94F64] border border-[#FFB7C5]/60 text-[10px] font-extrabold uppercase tracking-wider mb-1.5 shadow-2xs">
          <Sparkles className="w-3 h-3 text-[#E94F64]" />
          <span>The Queen's Handbook</span>
        </div>

        <h1 className="font-display font-black text-2xl sm:text-3xl text-[#3D2730] tracking-tight mb-1">
          All About Chotu 💕
        </h1>

        <p className="text-xs text-[#3D2730]/75 font-medium max-w-xs mx-auto leading-relaxed">
          Fill in your favorite places, foods, activities & secret wishes so Sonu can plan the ultimate surprises!
        </p>

        <p className="text-[10px] font-bold text-[#E94F64] mt-2 bg-[#FFF0F5] py-0.5 px-2.5 rounded-full inline-block border border-[#FFB7C5]/40 shadow-2xs">
          ✨ Updates your app & notifies Sonu automatically
        </p>
      </div>

      {/* 2. TOPIC TABS */}
      <div className="grid grid-cols-5 gap-1.5 bg-white/90 p-1.5 rounded-2xl border border-white/95 shadow-xs mb-5">
        {[
          { id: 'places', label: 'Places', icon: MapPin },
          { id: 'food', label: 'Food', icon: UtensilsCrossed },
          { id: 'activities', label: 'Fun', icon: Navigation },
          { id: 'pampering', label: 'Mood', icon: Heart },
          { id: 'wishes', label: 'Wishes', icon: Sparkles },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id as any);
                playHeartNudgeSound(1);
              }}
              className={`py-2 px-1 rounded-xl text-center flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#FF758F] to-[#E94F64] text-white shadow-xs scale-102 font-extrabold'
                  : 'text-[#3D2730]/65 hover:text-[#3D2730] hover:bg-[#FFE0E6]/30 font-bold'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] leading-none">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* TAB 1: PLACES */}
        {activeTab === 'places' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Jamshedpur Spots */}
            <div className="glass-panel p-4 sm:p-5 bg-white/92 rounded-[2rem] border border-white/95 shadow-xs">
              <label className="flex items-center gap-2 font-display font-black text-sm text-[#3D2730] mb-1">
                <MapPin className="w-4 h-4 text-[#E94F64]" />
                <span>1. Favorite Spots in Jamshedpur</span>
              </label>
              <p className="text-[11px] text-[#3D2730]/70 mb-3 font-medium">
                Tap all the places where you love being with Sonu:
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
                {[
                  'Marine Drive Riverfront',
                  'Kasidih & Bistupur Durga Puja Pandals',
                  'Cafe Regal / Brubeck Bakery',
                  'Dimna Dam Viewpoint',
                  'Jubilee Park Lake',
                  'Circuit 77 Gokarting',
                  'Northern Town Green Lanes',
                  'Dalma Foothills Drive',
                ].map((place) => {
                  const isChecked = (formData.favoritePlacesInJsr || []).includes(place);
                  return (
                    <button
                      key={place}
                      type="button"
                      onClick={() => toggleArrayItem('favoritePlacesInJsr', place)}
                      className={`text-xs font-bold py-1.5 px-3 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#FFE0E6] text-[#E94F64] border-[#E94F64] shadow-2xs scale-102'
                          : 'bg-white text-[#3D2730]/75 border-[#3D2730]/15 hover:border-[#FFB7C5]'
                      }`}
                    >
                      {isChecked ? '✓ ' : '+ '}
                      {place}
                    </button>
                  );
                })}
              </div>

              <input
                type="text"
                value={formData.customFavoritePlace || ''}
                onChange={(e) => setFormData({ ...formData, customFavoritePlace: e.target.value })}
                placeholder="Or type another favorite place in Jamshedpur..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#3D2730]/15 bg-white text-xs font-medium text-[#3D2730] placeholder-[#3D2730]/40 focus:outline-none focus:border-[#E94F64]"
              />
            </div>

            {/* Ideal Date Setting */}
            <div className="glass-panel p-4 sm:p-5 bg-white/92 rounded-[2rem] border border-white/95 shadow-xs">
              <label className="flex items-center gap-2 font-display font-black text-sm text-[#3D2730] mb-1">
                <Sparkles className="w-4 h-4 text-[#E94F64]" />
                <span>2. Ideal Date Atmosphere</span>
              </label>
              <p className="text-[11px] text-[#3D2730]/70 mb-3 font-medium">
                What date environment feels most romantic to Chotu?
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  'Cozy Boutique Cafe',
                  'Breezy Long Drive / Ride',
                  'Late Night Riverfront Walk',
                  'Festive Lights & Mela Pandals',
                  'Quiet Candlelight Dinner',
                  'Warm Couch at Home with Cuddles',
                ].map((env) => {
                  const isChecked = (formData.idealDateSetting || []).includes(env);
                  return (
                    <button
                      key={env}
                      type="button"
                      onClick={() => toggleArrayItem('idealDateSetting', env)}
                      className={`text-xs font-bold py-1.5 px-3 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#FFE0E6] text-[#E94F64] border-[#E94F64] shadow-2xs scale-102'
                          : 'bg-white text-[#3D2730]/75 border-[#3D2730]/15 hover:border-[#FFB7C5]'
                      }`}
                    >
                      {isChecked ? '✓ ' : '+ '}
                      {env}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dream Getaway Destination */}
            <div className="glass-panel p-4 sm:p-5 bg-white/92 rounded-[2rem] border border-white/95 shadow-xs">
              <label className="flex items-center gap-2 font-display font-black text-sm text-[#3D2730] mb-1">
                <Navigation className="w-4 h-4 text-[#E94F64]" />
                <span>3. Dream Getaway Destination with Sonu</span>
              </label>
              <input
                type="text"
                value={formData.dreamGetawayDestination || ''}
                onChange={(e) => setFormData({ ...formData, dreamGetawayDestination: e.target.value })}
                placeholder="e.g. Hill station cabin with hot chocolate & bonfires..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#3D2730]/15 bg-white text-xs font-medium text-[#3D2730] placeholder-[#3D2730]/40 focus:outline-none focus:border-[#E94F64]"
              />
            </div>
          </motion.div>
        )}

        {/* TAB 2: FOOD */}
        {activeTab === 'food' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Street Food Cravings */}
            <div className="glass-panel p-4 sm:p-5 bg-white/92 rounded-[2rem] border border-white/95 shadow-xs">
              <label className="flex items-center gap-2 font-display font-black text-sm text-[#3D2730] mb-1">
                <UtensilsCrossed className="w-4 h-4 text-[#E94F64]" />
                <span>1. Street Food Cravings</span>
              </label>
              <p className="text-[11px] text-[#3D2730]/70 mb-3 font-medium">
                What does Chotu crave most when stopping for snacks?
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
                {[
                  'Spicy Bistupur Puchkas & Dahi Puri',
                  'Buttery Chicken / Paneer Kathi Roll',
                  'Hot roadside Tapri Maggi',
                  'Crispy Steamed Momos',
                  'Street Shawarma',
                  'Aloo Tikki Chaat',
                ].map((item) => {
                  const isChecked = (formData.favoriteStreetFoods || []).includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleArrayItem('favoriteStreetFoods', item)}
                      className={`text-xs font-bold py-1.5 px-3 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#FFE0E6] text-[#E94F64] border-[#E94F64] shadow-2xs scale-102'
                          : 'bg-white text-[#3D2730]/75 border-[#3D2730]/15 hover:border-[#FFB7C5]'
                      }`}
                    >
                      {isChecked ? '✓ ' : '+ '}
                      {item}
                    </button>
                  );
                })}
              </div>

              <input
                type="text"
                value={formData.customStreetFood || ''}
                onChange={(e) => setFormData({ ...formData, customStreetFood: e.target.value })}
                placeholder="Another favorite snack/dish..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#3D2730]/15 bg-white text-xs font-medium text-[#3D2730] placeholder-[#3D2730]/40 focus:outline-none focus:border-[#E94F64]"
              />
            </div>

            {/* Desserts & Sweet Tooth */}
            <div className="glass-panel p-4 sm:p-5 bg-white/92 rounded-[2rem] border border-white/95 shadow-xs">
              <label className="flex items-center gap-2 font-display font-black text-sm text-[#3D2730] mb-1">
                <Heart className="w-4 h-4 text-[#E94F64]" />
                <span>2. Sweet Tooth / Desserts</span>
              </label>
              <p className="text-[11px] text-[#3D2730]/70 mb-3 font-medium">
                Chotu's favorite sweet indulgence:
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  'Warm Belgian Waffles with Nutella & Ice Cream',
                  'Blueberry Cheesecake',
                  'Artisan Gelato',
                  'Hot Brownie with Vanilla Fudge',
                  'Warm Butter Croissants',
                  'Mela Jalebi with Rabdi',
                ].map((item) => {
                  const isChecked = (formData.favoriteDesserts || []).includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleArrayItem('favoriteDesserts', item)}
                      className={`text-xs font-bold py-1.5 px-3 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#FFE0E6] text-[#E94F64] border-[#E94F64] shadow-2xs scale-102'
                          : 'bg-white text-[#3D2730]/75 border-[#3D2730]/15 hover:border-[#FFB7C5]'
                      }`}
                    >
                      {isChecked ? '✓ ' : '+ '}
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Favorite Drinks */}
            <div className="glass-panel p-4 sm:p-5 bg-white/92 rounded-[2rem] border border-white/95 shadow-xs">
              <label className="flex items-center gap-2 font-display font-black text-sm text-[#3D2730] mb-1">
                <Coffee className="w-4 h-4 text-[#E94F64]" />
                <span>3. Drinks & Beverages</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  'Thick Cold Coffee / Hazelnut Frappe',
                  'Hot Kulhad Chai',
                  'Belgian Chocolate Shake',
                  'Virgin Mojito / Coolers',
                  'Cappuccino with Cinnamon',
                ].map((item) => {
                  const isChecked = (formData.favoriteDrinks || []).includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleArrayItem('favoriteDrinks', item)}
                      className={`text-xs font-bold py-1.5 px-3 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#FFE0E6] text-[#E94F64] border-[#E94F64] shadow-2xs scale-102'
                          : 'bg-white text-[#3D2730]/75 border-[#3D2730]/15 hover:border-[#FFB7C5]'
                      }`}
                    >
                      {isChecked ? '✓ ' : '+ '}
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Comfort Food */}
            <div className="glass-panel p-4 sm:p-5 bg-white/92 rounded-[2rem] border border-white/95 shadow-xs">
              <label className="block font-display font-black text-sm text-[#3D2730] mb-1">
                4. Go-To Comfort Food (When Stressed or Low)
              </label>
              <input
                type="text"
                value={formData.comfortFoodWhenStressed || ''}
                onChange={(e) => setFormData({ ...formData, comfortFoodWhenStressed: e.target.value })}
                placeholder="e.g. Cheesy pizza, french fries, or momos..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#3D2730]/15 bg-white text-xs font-medium text-[#3D2730] placeholder-[#3D2730]/40 focus:outline-none focus:border-[#E94F64]"
              />
            </div>
          </motion.div>
        )}

        {/* TAB 3: ACTIVITIES */}
        {activeTab === 'activities' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Travel Mode */}
            <div className="glass-panel p-4 sm:p-5 bg-white/92 rounded-[2rem] border border-white/95 shadow-xs">
              <label className="flex items-center gap-2 font-display font-black text-sm text-[#3D2730] mb-2">
                <Car className="w-4 h-4 text-[#E94F64]" />
                <span>1. Preferred Travel Mode with Sonu</span>
              </label>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'car', label: 'Car Drive', desc: 'Cozy & Songs 🚗' },
                  { id: 'bike', label: 'Bike Ride', desc: 'Hold Tight 🏍️' },
                  { id: 'scooter', label: 'Scooter Cruise', desc: 'Chill Breeze 🛵' },
                ].map((mode) => {
                  const isSelected = formData.preferredTravelMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, preferredTravelMode: mode.id })}
                      className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#FFE0E6] text-[#E94F64] border-[#E94F64] shadow-xs scale-102 font-bold'
                          : 'bg-white text-[#3D2730] border-[#3D2730]/15 font-medium'
                      }`}
                    >
                      <span className="block text-xs font-bold leading-tight">{mode.label}</span>
                      <span className="text-[10px] opacity-75">{mode.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fun Activities */}
            <div className="glass-panel p-4 sm:p-5 bg-white/92 rounded-[2rem] border border-white/95 shadow-xs">
              <label className="flex items-center gap-2 font-display font-black text-sm text-[#3D2730] mb-1">
                <Navigation className="w-4 h-4 text-[#E94F64]" />
                <span>2. Favorite Date Activities</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  'Go-Kart Racing (Circuit 77)',
                  'Late Night Long Road Drive',
                  'Street Food Crawl',
                  'Festive Pandal Hopping in Ethnic Wear',
                  'Shopping & Trying Out Cute Fits',
                  'Bowling & Fun Arcade Games',
                  'Movie Night with Popcorn',
                ].map((act) => {
                  const isChecked = (formData.favoriteFunActivities || []).includes(act);
                  return (
                    <button
                      key={act}
                      type="button"
                      onClick={() => toggleArrayItem('favoriteFunActivities', act)}
                      className={`text-xs font-bold py-1.5 px-3 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#FFE0E6] text-[#E94F64] border-[#E94F64] shadow-2xs scale-102'
                          : 'bg-white text-[#3D2730]/75 border-[#3D2730]/15 hover:border-[#FFB7C5]'
                      }`}
                    >
                      {isChecked ? '✓ ' : '+ '}
                      {act}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cozy Moments */}
            <div className="glass-panel p-4 sm:p-5 bg-white/92 rounded-[2rem] border border-white/95 shadow-xs">
              <label className="flex items-center gap-2 font-display font-black text-sm text-[#3D2730] mb-1">
                <Heart className="w-4 h-4 text-[#E94F64]" />
                <span>3. Favorite Cozy Moments</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  'Listening to our playlist while driving at night',
                  'Deep 2 AM heart-to-heart talks',
                  'Cuddles and watching a movie under a warm blanket',
                  'Holding hands silently while watching sunset',
                  'Laughing at silly jokes until our stomachs hurt',
                ].map((moment) => {
                  const isChecked = (formData.favoriteCozyMoments || []).includes(moment);
                  return (
                    <button
                      key={moment}
                      type="button"
                      onClick={() => toggleArrayItem('favoriteCozyMoments', moment)}
                      className={`text-xs font-bold py-1.5 px-3 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#FFE0E6] text-[#E94F64] border-[#E94F64] shadow-2xs scale-102'
                          : 'bg-white text-[#3D2730]/75 border-[#3D2730]/15 hover:border-[#FFB7C5]'
                      }`}
                    >
                      {isChecked ? '✓ ' : '+ '}
                      {moment}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: PAMPERING & MOOD */}
        {activeTab === 'pampering' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* What Cheers Her Up */}
            <div className="glass-panel p-4 sm:p-5 bg-white/92 rounded-[2rem] border border-white/95 shadow-xs">
              <label className="flex items-center gap-2 font-display font-black text-sm text-[#3D2730] mb-1">
                <Smile className="w-4 h-4 text-[#E94F64]" />
                <span>1. What Instantly Cheers Chotu Up</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  'Warm tight hugs and forehead kisses',
                  'Sonu bringing her favorite dessert/food without asking',
                  'Late night car drive with her favorite acoustic songs',
                  'Sonu pampering her and listening patiently',
                  'Gentle head massage & reassurance',
                  'Silly funny faces & teasing that makes her giggle',
                ].map((item) => {
                  const isChecked = (formData.whatCheersChotuUp || []).includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleArrayItem('whatCheersChotuUp', item)}
                      className={`text-xs font-bold py-1.5 px-3 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#FFE0E6] text-[#E94F64] border-[#E94F64] shadow-2xs scale-102'
                          : 'bg-white text-[#3D2730]/75 border-[#3D2730]/15 hover:border-[#FFB7C5]'
                      }`}
                    >
                      {isChecked ? '✓ ' : '+ '}
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Car Music */}
            <div className="glass-panel p-4 sm:p-5 bg-white/92 rounded-[2rem] border border-white/95 shadow-xs">
              <label className="flex items-center gap-2 font-display font-black text-sm text-[#3D2730] mb-1">
                <Music className="w-4 h-4 text-[#E94F64]" />
                <span>2. Favorite Songs / Artists for Car Drives</span>
              </label>
              <input
                type="text"
                value={formData.carRideSongsOrArtists || ''}
                onChange={(e) => setFormData({ ...formData, carRideSongsOrArtists: e.target.value })}
                placeholder="e.g. Arijit Singh, Prateek Kuhad, acoustic Hindi love tracks..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#3D2730]/15 bg-white text-xs font-medium text-[#3D2730] placeholder-[#3D2730]/40 focus:outline-none focus:border-[#E94F64]"
              />
            </div>

            {/* Little Things That Melt Heart */}
            <div className="glass-panel p-4 sm:p-5 bg-white/92 rounded-[2rem] border border-white/95 shadow-xs">
              <label className="flex items-center gap-2 font-display font-black text-sm text-[#3D2730] mb-1">
                <Heart className="w-4 h-4 text-[#E94F64]" />
                <span>3. Little Things Sonu Does That Melt Your Heart</span>
              </label>
              <textarea
                value={formData.littleThingsThatMeltHeart || ''}
                onChange={(e) => setFormData({ ...formData, littleThingsThatMeltHeart: e.target.value })}
                rows={2}
                placeholder="When Sonu holds my hand while driving, texts to check if I ate..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#3D2730]/15 bg-white text-xs font-medium text-[#3D2730] placeholder-[#3D2730]/40 focus:outline-none focus:border-[#E94F64]"
              />
            </div>
          </motion.div>
        )}

        {/* TAB 5: WISHES & NOTES */}
        {activeTab === 'wishes' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Secret Wish */}
            <div className="glass-panel p-4 sm:p-5 bg-white/92 rounded-[2rem] border border-white/95 shadow-xs">
              <label className="flex items-center gap-2 font-display font-black text-sm text-[#3D2730] mb-1">
                <Sparkles className="w-4 h-4 text-[#E94F64]" />
                <span>1. Secret Wish You Want Sonu to Plan</span>
              </label>
              <textarea
                value={formData.secretWish || ''}
                onChange={(e) => setFormData({ ...formData, secretWish: e.target.value })}
                rows={2}
                placeholder="A surprise picnic date under the stars, or..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#3D2730]/15 bg-white text-xs font-medium text-[#3D2730] placeholder-[#3D2730]/40 focus:outline-none focus:border-[#E94F64]"
              />
            </div>

            {/* Message for Sonu */}
            <div className="glass-panel p-4 sm:p-5 bg-white/92 rounded-[2rem] border border-white/95 shadow-xs">
              <label className="flex items-center gap-2 font-display font-black text-sm text-[#3D2730] mb-1">
                <Heart className="w-4 h-4 text-[#E94F64] fill-[#E94F64]" />
                <span>2. Special Note / Message for Sonu 💕</span>
              </label>
              <textarea
                value={formData.specialNoteForSonu || ''}
                onChange={(e) => setFormData({ ...formData, specialNoteForSonu: e.target.value })}
                rows={3}
                placeholder="Write whatever is in your heart for Sonu..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#3D2730]/15 bg-white text-xs font-medium text-[#3D2730] placeholder-[#3D2730]/40 focus:outline-none focus:border-[#E94F64]"
              />
            </div>
          </motion.div>
        )}

        {/* SUBMIT BUTTON */}
        <div className="pt-2 sticky bottom-3 z-30">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-pookie py-3.5 px-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-[0_15px_35px_-5px_rgba(233,79,100,0.35)] cursor-pointer hover:scale-102 active:scale-98 transition-transform"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isSubmitting ? 'Saving...' : 'Save & Update My Favorites 💖'}</span>
          </button>
        </div>
      </form>

      {/* FOOTER NAV */}
      <div className="mt-8 pt-4 border-t border-[#3D2730]/10 flex items-center justify-between text-xs font-bold text-[#3D2730]/70">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 hover:text-[#E94F64] cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={() => navigate('/vibe')}
          className="inline-flex items-center gap-1 text-[#E94F64] hover:underline cursor-pointer"
        >
          <span>Plan Date with My Favorites</span>
          <Sparkles className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* SUCCESS CONFIRMATION MODAL */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              className="bg-white/95 backdrop-blur-2xl rounded-[2rem] p-6 max-w-sm w-full text-center border border-white/95 shadow-[0_25px_60px_-10px_rgba(233,79,100,0.3)] ring-1 ring-[#FFB7C5]/40"
            >
              <div className="w-14 h-14 rounded-full bg-[#FFE0E6] text-[#E94F64] mx-auto mb-3 flex items-center justify-center shadow-xs">
                <Crown className="w-7 h-7" />
              </div>

              <h3 className="font-display font-black text-xl text-[#3D2730] mb-1">
                Favorites Updated! 👑
              </h3>

              <p className="text-xs text-[#3D2730]/75 mb-4 leading-relaxed font-medium">
                Your favorite places, foods & cravings are saved! Your date choices will now highlight all your top picks.
              </p>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleSendToWhatsApp}
                  className="w-full btn-pookie py-3 text-xs font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Favorites Summary to Sonu on WhatsApp 💌</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate('/vibe');
                  }}
                  className="w-full py-2.5 px-3 rounded-2xl bg-white border border-[#3D2730]/15 text-xs font-bold text-[#3D2730] hover:border-[#FFB7C5] hover:text-[#E94F64] transition-all cursor-pointer"
                >
                  Plan Date with My Favorites →
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </MobileContainer>
  );
};
