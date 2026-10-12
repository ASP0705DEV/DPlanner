export interface ChotuPreferences {
  // 1. Favorite Places
  favoritePlacesInJsr: string[];
  customFavoritePlace?: string;
  idealDateSetting: string[];
  dreamGetawayDestination?: string;
  favoriteDateTiming: string;

  // 2. Favorite Food & Drinks
  favoriteStreetFoods: string[];
  customStreetFood?: string;
  favoriteDesserts: string[];
  favoriteDrinks: string[];
  comfortFoodWhenStressed?: string;
  favoriteRestaurantOrCuisine?: string;

  // 3. Favorite Activities with Sonu
  preferredTravelMode: string;
  favoriteFunActivities: string[];
  favoriteCozyMoments: string[];
  festiveDurgaPujaPreferences: string[];

  // 4. Pampering & Mood
  whatCheersChotuUp: string[];
  carRideSongsOrArtists?: string;
  littleThingsThatMeltHeart?: string;
  favoriteNicknames: string[];

  // 5. Bucket List & Note to Sonu
  topDatesToPlanNext?: string;
  secretWish?: string;
  specialNoteForSonu?: string;

  // Metadata
  updatedAt: string;
}
