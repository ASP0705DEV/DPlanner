import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ChotuPreferences } from '../types/preferences';
import { DEFAULT_CHOTU_PREFERENCES } from '../data/defaultPreferences';
import { supabase } from '../services/supabase';

const STORAGE_KEY = 'chotu_favorites_profile_v1';

interface ChotuPreferencesContextType {
  preferences: ChotuPreferences;
  savePreferences: (newPreferences: ChotuPreferences) => Promise<{ success: boolean; error?: string }>;
  isFavoriteVibe: (vibeId: string) => boolean;
  isFavoriteSpot: (spotName: string) => boolean;
  isFavoritePitstop: (pitstopId: string) => boolean;
  isFavoriteVehicle: (vehicleId: string) => boolean;
}

const ChotuPreferencesContext = createContext<ChotuPreferencesContextType | undefined>(undefined);

export const ChotuPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<ChotuPreferences>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_CHOTU_PREFERENCES, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to load Chotu preferences from localStorage', e);
    }
    return DEFAULT_CHOTU_PREFERENCES;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (e) {
      console.warn('Failed to save Chotu preferences to localStorage', e);
    }
  }, [preferences]);

  const savePreferences = async (newPreferences: ChotuPreferences) => {
    const updated = {
      ...newPreferences,
      updatedAt: new Date().toISOString(),
    };
    setPreferences(updated);

    // Save to localStorage immediately
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }

    // Attempt Supabase sync if connected
    if (supabase) {
      try {
        await supabase
          .from('chotu_preferences')
          .upsert([
            {
              id: 'current_chotu_profile',
              data: updated,
              updated_at: updated.updatedAt,
            },
          ]);
      } catch (err) {
        console.warn('Supabase preferences sync skipped (table optional)', err);
      }
    }

    // Send email notification to Sonu (saiprithvi0705@gmail.com)
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient: 'saiprithvi0705@gmail.com',
          vibe_title: 'Chotu Updated Her Favorites & Date Preferences Profile! 👑',
          preferred_timing: updated.favoriteDateTiming,
          special_note: `Fav Places: ${updated.favoritePlacesInJsr.join(', ')}\nFav Foods: ${updated.favoriteStreetFoods.join(', ')}\nDrinks: ${updated.favoriteDrinks.join(', ')}\nActivities: ${updated.favoriteFunActivities.join(', ')}\nNote to Sonu: ${updated.specialNoteForSonu || 'None'}`,
          customization: {
            vehicleChoice: updated.preferredTravelMode,
            chillAudience: 'just-us',
            selectedSubChoiceIds: [],
          },
        }),
      });
    } catch (err) {
      // Offline fallback
    }

    return { success: true };
  };

  // Helper matching functions to dynamically update the rest of the application
  const isFavoriteVibe = (vibeId: string): boolean => {
    const acts = (preferences.favoriteFunActivities || []).join(' ').toLowerCase();
    const cozy = (preferences.favoriteCozyMoments || []).join(' ').toLowerCase();
    const places = (preferences.favoritePlacesInJsr || []).join(' ').toLowerCase();

    if (vibeId === 'durga-puja' && (places.includes('pandal') || acts.includes('pandal') || acts.includes('durga'))) return true;
    if (vibeId === 'road-ride' && (preferences.preferredTravelMode === 'car' || preferences.preferredTravelMode === 'bike' || acts.includes('drive'))) return true;
    if (vibeId === 'cafe-date' && (places.includes('cafe') || (preferences.favoriteDrinks || []).length > 0)) return true;
    if (vibeId === 'sports-games' && acts.includes('gokart')) return true;
    if (vibeId === 'cuddle-peace' && cozy.includes('cuddle')) return true;
    if (vibeId === 'street-food' && (preferences.favoriteStreetFoods || []).length > 0) return true;
    return false;
  };

  const isFavoriteSpot = (spotName: string): boolean => {
    const list = preferences.favoritePlacesInJsr || [];
    return list.some((p) => spotName.toLowerCase().includes(p.toLowerCase()) || p.toLowerCase().includes(spotName.toLowerCase()));
  };

  const isFavoritePitstop = (pitstopId: string): boolean => {
    const street = (preferences.favoriteStreetFoods || []).join(' ').toLowerCase();
    const desserts = (preferences.favoriteDesserts || []).join(' ').toLowerCase();
    const drinks = (preferences.favoriteDrinks || []).join(' ').toLowerCase();

    if (pitstopId === 'puchka-chaat' && street.includes('puchka')) return true;
    if (pitstopId === 'kathi-shawarma' && street.includes('roll')) return true;
    if (pitstopId === 'icecream-waffles' && (desserts.includes('waffle') || desserts.includes('gelato'))) return true;
    if (pitstopId === 'cold-coffee-shakes' && (drinks.includes('coffee') || drinks.includes('shake'))) return true;
    if (pitstopId === 'chai-maggi' && (drinks.includes('chai') || street.includes('maggi'))) return true;
    if (pitstopId === 'pastries-bakery' && desserts.includes('cheesecake')) return true;
    return false;
  };

  const isFavoriteVehicle = (vehicleId: string): boolean => {
    return preferences.preferredTravelMode === vehicleId;
  };

  return (
    <ChotuPreferencesContext.Provider
      value={{
        preferences,
        savePreferences,
        isFavoriteVibe,
        isFavoriteSpot,
        isFavoritePitstop,
        isFavoriteVehicle,
      }}
    >
      {children}
    </ChotuPreferencesContext.Provider>
  );
};

export const useChotuPreferences = () => {
  const context = useContext(ChotuPreferencesContext);
  if (!context) {
    throw new Error('useChotuPreferences must be used within a ChotuPreferencesProvider');
  }
  return context;
};
