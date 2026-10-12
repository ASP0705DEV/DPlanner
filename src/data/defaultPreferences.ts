import type { ChotuPreferences } from '../types/preferences';

export const DEFAULT_CHOTU_PREFERENCES: ChotuPreferences = {
  // 1. Favorite Places
  favoritePlacesInJsr: [
    'Marine Drive Riverfront',
    'Kasidih & Bistupur Durga Puja Pandals',
    'Cafe Regal / Brubeck Bakery',
    'Dimna Dam Viewpoint',
  ],
  customFavoritePlace: 'Any quiet spot where Sonu holds my hand',
  idealDateSetting: [
    'Cozy Boutique Cafe',
    'Breezy Long Drive / Ride',
    'Late Night Riverfront Walk',
    'Festive Lights & Mela Pandals',
  ],
  dreamGetawayDestination: 'A misty hill station cottage with hot chocolate and fairy lights',
  favoriteDateTiming: 'late-night',

  // 2. Favorite Food & Treats
  favoriteStreetFoods: [
    'Spicy Bistupur Puchkas & Dahi Puri',
    'Buttery Chicken / Paneer Kathi Roll',
    'Hot roadside Tapri Maggi',
  ],
  customStreetFood: 'Spicy puchka competition with Sonu',
  favoriteDesserts: [
    'Warm Belgian Waffles with Nutella & Ice Cream',
    'Blueberry Cheesecake',
    'Artisan Gelato',
  ],
  favoriteDrinks: [
    'Thick Cold Coffee / Hazelnut Frappe',
    'Hot Kulhad Chai',
    'Belgian Chocolate Shake',
  ],
  comfortFoodWhenStressed: 'Hot cheesy pizza or crispy fries and chocolate shake',
  favoriteRestaurantOrCuisine: 'Cozy Italian cafe or sizzlers & butter naan dinner',

  // 3. Favorite Activities with Sonu
  preferredTravelMode: 'car',
  favoriteFunActivities: [
    'Go-Kart Racing (Circuit 77)',
    'Late Night Long Road Drive',
    'Street Food Crawl',
    'Festive Pandal Hopping in Ethnic Wear',
  ],
  favoriteCozyMoments: [
    'Listening to our playlist while driving at night',
    'Deep 2 AM heart-to-heart talks',
    'Cuddles and watching a movie under a warm blanket',
  ],
  festiveDurgaPujaPreferences: [
    'Late-night pandal hopping holding hands tightly',
    'Eating hot puchkas & rolls at mela stalls',
    'Festive saree & traditional couple photos',
  ],

  // 4. Pampering & Mood
  whatCheersChotuUp: [
    'Warm tight hugs and forehead kisses',
    'Sonu bringing her favorite dessert/food without asking',
    'Late night car drive with her favorite acoustic songs',
    'Sonu pampering her and listening patiently',
  ],
  carRideSongsOrArtists: 'Acoustic Hindi love songs, Arijit Singh, Prateek Kuhad, and chill lofi beats',
  littleThingsThatMeltHeart: 'When Sonu gently adjusts my hair, holds my hand while driving, and makes sure I ate properly',
  favoriteNicknames: ['Rani Saheba 🪔', 'Pookie 💕', 'Chotu 🥰', 'Princess 👑'],

  // 5. Bucket List & Note to Sonu
  topDatesToPlanNext: '1. Midnight Marine Drive drive with hot chai\n2. Grand Durga Puja pandal hopping night in saree\n3. Surprise cafe dessert date',
  secretWish: 'A surprise stargazing date with blankets and our favorite songs',
  specialNoteForSonu: 'Every second with you is my happiest place in the world. Always stay with me Sonu 💕',

  updatedAt: new Date().toISOString(),
};
