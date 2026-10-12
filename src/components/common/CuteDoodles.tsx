import React from 'react';

// --- BASE DECORATIVE DOODLES ---

export const DoodleHeart: React.FC<{ className?: string; color?: string; fill?: string }> = ({
  className = 'w-6 h-6',
  color = '#E94F64',
  fill = '#E94F64',
}) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill={fill}
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DoodleStar: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-6 h-6',
  color = '#F59E0B',
}) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M12 2l2.8 6.9 7.2.6-5.5 4.8 1.7 7.2L12 17.6 5.8 21.5l1.7-7.2L2 9.5l7.2-.6L12 2z"
      fill={color}
      stroke="#49333A"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DoodleFlower: React.FC<{ className?: string }> = ({
  className = 'w-8 h-8',
}) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="16" cy="16" r="4" fill="#FFF0B8" stroke="#49333A" strokeWidth="1.5" />
    <circle cx="16" cy="8" r="4" fill="#FFB7C5" stroke="#49333A" strokeWidth="1.5" />
    <circle cx="24" cy="16" r="4" fill="#FFB7C5" stroke="#49333A" strokeWidth="1.5" />
    <circle cx="16" cy="24" r="4" fill="#FFB7C5" stroke="#49333A" strokeWidth="1.5" />
    <circle cx="8" cy="16" r="4" fill="#FFB7C5" stroke="#49333A" strokeWidth="1.5" />
  </svg>
);

export const DoodleBow: React.FC<{ className?: string }> = ({
  className = 'w-8 h-8',
}) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M16 16c-3-5-9-5-11-2-2 3-1 8 4 7l7-5z"
      fill="#FFE0E6"
      stroke="#E94F64"
      strokeWidth="1.5"
    />
    <path
      d="M16 16c3-5 9-5 11-2 2 3 1 8-4 7l-7-5z"
      fill="#FFE0E6"
      stroke="#E94F64"
      strokeWidth="1.5"
    />
    <circle cx="16" cy="16" r="2.5" fill="#E94F64" />
    <path
      d="M14 18c-2 4-4 8-6 10M18 18c2 4 4 8 6 10"
      stroke="#E94F64"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// --- MATURE HAND-DRAWN DOODLE ICONS FOR DATE VIBES ---

// 1. Road Ride (Scooter / Bike)
export const DoodleScooter: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="9" cy="23" r="4" stroke="#49333A" strokeWidth="1.8" fill="#FFF8F0" />
    <circle cx="23" cy="23" r="4" stroke="#49333A" strokeWidth="1.8" fill="#FFF8F0" />
    <path d="M9 23h9l3-9h3" stroke="#E94F64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 14l-2-6h-3" stroke="#49333A" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M12 18h6" stroke="#49333A" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// 2. Princess Treatment (Crown & Lotus)
export const DoodleCrown: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M6 22l2-12 5 6 3-8 3 8 5-6 2 12H6z"
      fill="#FFE0E6"
      stroke="#E94F64"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <circle cx="6" cy="9" r="1.5" fill="#E94F64" />
    <circle cx="16" cy="5" r="1.5" fill="#E94F64" />
    <circle cx="26" cy="9" r="1.5" fill="#E94F64" />
    <path d="M6 24h20" stroke="#49333A" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 3. Foodie Mode (Roll & Shawarma)
export const DoodleFoodieWrap: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M8 24l13-13c2-2 5-2 7 0s2 5 0 7L15 26c-2 2-5 2-7 0s-2-5 0-2z"
      fill="#FEF3C7"
      stroke="#D97706"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path d="M14 10c2 2 4 4 6 6M11 15c2 2 4 4 6 6" stroke="#E94F64" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="23" cy="9" r="2" fill="#10B981" />
  </svg>
);

// 4. Café Date (Steaming Mug)
export const DoodleCoffeeMug: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="7" y="12" width="14" height="13" rx="4" fill="#FFF8F0" stroke="#49333A" strokeWidth="1.8" />
    <path d="M21 15c2.5 0 4 1.5 4 4s-1.5 4-4 4" stroke="#49333A" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M11 8c0-2 1-3 1-3M15 7c0-2 1-3 1-3" stroke="#E94F64" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 17h6" stroke="#E94F64" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 5. Romantic Dinner (Wine Toast & Candle)
export const DoodleWineDinner: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10 7c0 4 2 7 5 7v7M15 21h-3m3 0h3" stroke="#49333A" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M7 7h8c0 3-1.5 5.5-4 5.5S7 10 7 7z" fill="#FFE0E6" stroke="#E94F64" strokeWidth="1.5" />
    <path d="M22 7c0 4-2 7-5 7v7M17 21h-3m3 0h3" stroke="#49333A" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M17 7h8c0 3-1.5 5.5-4 5.5S17 10 17 7z" fill="#FFE0E6" stroke="#E94F64" strokeWidth="1.5" />
  </svg>
);

// 6. Street Food (Puchka Bowl)
export const DoodleStreetFood: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6 16c0 6 4.5 10 10 10s10-4 10-10H6z" fill="#FFFBEB" stroke="#B45309" strokeWidth="1.8" />
    <circle cx="12" cy="13" r="3.5" fill="#FDE68A" stroke="#B45309" strokeWidth="1.5" />
    <circle cx="20" cy="13" r="3.5" fill="#FDE68A" stroke="#B45309" strokeWidth="1.5" />
    <path d="M16 8v4" stroke="#E94F64" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 7. Sports & Games (Bowling & Controller)
export const DoodleBowlingGame: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M8 24c0-3 1.5-6 1.5-9 0-2-.5-4 1.5-5 2 1 1.5 3 1.5 5 0 3 1.5 6 1.5 9H8z"
      fill="#F3E8FF"
      stroke="#7E22CE"
      strokeWidth="1.8"
    />
    <circle cx="21" cy="20" r="5" fill="#FFF8F0" stroke="#49333A" strokeWidth="1.8" />
    <circle cx="19.5" cy="18.5" r="0.8" fill="#49333A" />
    <circle cx="22.5" cy="18.5" r="0.8" fill="#49333A" />
    <circle cx="21" cy="21" r="0.8" fill="#49333A" />
  </svg>
);

// 8. Movie Date (Popcorn & Film Ticket)
export const DoodleMoviePopcorn: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M9 14l2 12h10l2-12H9z" fill="#FFE0E6" stroke="#E94F64" strokeWidth="1.8" />
    <path d="M9 14c-1-2 0-4 2-4s2 2 3 1c1-1 3-1 3 1s2 0 3-1 2 2 3 3" fill="#FFF0B8" stroke="#D97706" strokeWidth="1.5" />
    <path d="M13 18v6M19 18v6" stroke="#E94F64" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 9. Shopping Queen (Shopping Bag & Sparkles)
export const DoodleShoppingBag: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="7" y="11" width="18" height="15" rx="3" fill="#FFF1F2" stroke="#BE185D" strokeWidth="1.8" />
    <path d="M12 11V8a4 4 0 018 0v3" stroke="#49333A" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M16 16v5M13.5 18.5h5" stroke="#E94F64" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 10. US Time (Airplane Mode & Two Hearts)
export const DoodleAirplaneSanctuary: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M7 16l18-8-5 18-3-7-7-3z"
      fill="#ECFDF5"
      stroke="#047857"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path d="M17 19l8-11" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="24" r="2.5" fill="#FFB7C5" />
    <circle cx="12" cy="24" r="2" fill="#E94F64" />
  </svg>
);

// 11. Steamy Times (Candle & Flame)
export const DoodleSteamyCandle: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="11" y="14" width="10" height="13" rx="2" fill="#FFF1F2" stroke="#E11D48" strokeWidth="1.8" />
    <path d="M16 14v-3" stroke="#49333A" strokeWidth="1.5" strokeLinecap="round" />
    <path
      d="M16 5c2 2 2.5 3.5 1.5 5s-3 1.5-3 0 1-3 1.5-5z"
      fill="#F59E0B"
      stroke="#D97706"
      strokeWidth="1.3"
    />
  </svg>
);

// 12. Chill Session (Cocktail & Herb Leaf)
export const DoodleChillCocktail: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M9 8h14l-7 9v7M12 24h8" stroke="#49333A" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M11 10h10l-5 6.5L11 10z" fill="#EDE9FE" />
    <circle cx="21" cy="7" r="2.5" fill="#10B981" />
  </svg>
);

// 13. Her Time (Safe Listening & Hug)
export const DoodleListeningHeart: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="16" cy="16" r="10" stroke="#2563EB" strokeWidth="1.8" fill="#EFF6FF" />
    <path d="M11 16c0-2 2-4 4-2 2-2 4 0 4 2s-4 5-4 5-4-3-4-5z" fill="#E94F64" />
    <path d="M21 11c2 1 3 3 3 5s-1 4-3 5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 14. Cuddle & Peace (Soft Pillow & Cloud)
export const DoodleCuddlePillow: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="7" y="10" width="18" height="13" rx="4" fill="#FFF8F0" stroke="#EA580C" strokeWidth="1.8" />
    <path d="M7 10l18 13M25 10L7 23" stroke="#EA580C" strokeWidth="1" strokeDasharray="2 2" />
    <circle cx="16" cy="16.5" r="1.5" fill="#EA580C" />
  </svg>
);

// --- VEHICLE DOODLES ---

export const DoodleBike: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="8" cy="22" r="4.5" stroke="#49333A" strokeWidth="1.8" fill="#FFF8F0" />
    <circle cx="24" cy="22" r="4.5" stroke="#49333A" strokeWidth="1.8" fill="#FFF8F0" />
    <path d="M8 22l6-9h5l5 9M14 13l3 9" stroke="#E94F64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19 13l2-5h3" stroke="#49333A" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const DoodleCar: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M5 20l3-8h16l3 8v4H5v-4z" fill="#FFF1F2" stroke="#E94F64" strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="10" cy="24" r="2.5" fill="#FFF8F0" stroke="#49333A" strokeWidth="1.8" />
    <circle cx="22" cy="24" r="2.5" fill="#FFF8F0" stroke="#49333A" strokeWidth="1.8" />
    <path d="M10 16h12" stroke="#E94F64" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// --- PRINCESS TREATMENT DOODLES ---

export const DoodleSpa: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M16 8c3 4 7 8 7 12 0 3.8-3.1 7-7 7s-7-3.2-7-7c0-4 4-8 7-12z" fill="#ECFDF5" stroke="#059669" strokeWidth="1.8" />
    <path d="M16 14v10M12 21c2-1 4-1 4-1M20 21c-2-1-4-1-4-1" stroke="#059669" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const DoodleHair: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="10" cy="22" r="3" stroke="#49333A" strokeWidth="1.8" />
    <circle cx="22" cy="22" r="3" stroke="#49333A" strokeWidth="1.8" />
    <path d="M12 20L22 8M20 20L10 8" stroke="#E94F64" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const DoodleNails: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="10" y="14" width="12" height="12" rx="3" fill="#FFE0E6" stroke="#E94F64" strokeWidth="1.8" />
    <rect x="13" y="6" width="6" height="8" rx="1" fill="#FFF8F0" stroke="#49333A" strokeWidth="1.8" />
    <path d="M16 18v4" stroke="#E94F64" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const DoodlePedicure: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6 18c0 7 5 10 10 10s10-3 10-10H6z" fill="#EFF6FF" stroke="#2563EB" strokeWidth="1.8" />
    <circle cx="12" cy="14" r="2" fill="#93C5FD" />
    <circle cx="17" cy="11" r="2.5" fill="#93C5FD" />
    <circle cx="21" cy="14" r="1.5" fill="#93C5FD" />
  </svg>
);

// --- FOODIE & PITSTOP DOODLES ---

export const DoodleChaiTapri: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M8 14l2 12h12l2-12H8z" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.8" />
    <path d="M12 9c0-2 1-3 1-3M16 8c0-2 1-3 1-3M20 9c0-2 1-3 1-3" stroke="#D97706" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M7 14h18" stroke="#B45309" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const DoodleColdCoffee: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="9" y="11" width="14" height="16" rx="3" fill="#FFFBEB" stroke="#78350F" strokeWidth="1.8" />
    <path d="M13 11V5l4-1" stroke="#E94F64" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M12 18c2 1 5 1 8 0" stroke="#78350F" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="16" cy="22" r="1.5" fill="#D97706" />
  </svg>
);

export const DoodleWaffleGelato: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M16 28L8 16h16L16 28z" fill="#FDE68A" stroke="#B45309" strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="16" cy="11" r="6" fill="#FCE7F3" stroke="#DB2777" strokeWidth="1.8" />
    <circle cx="16" cy="7" r="1.5" fill="#E11D48" />
    <path d="M12 18l4 4M20 18l-4 4" stroke="#B45309" strokeWidth="1.2" />
  </svg>
);

export const DoodleBakeryPastry: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6 19c2-5 8-8 14-6 4 1 6 4 6 7-3 3-9 4-15 2l-5-3z" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.8" />
    <path d="M11 16c2 1 5 1 7 0M16 13c1 1 3 1 4 0" stroke="#B45309" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const DoodleCocktailDrink: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10 8l6 10v7M16 18l6-10H10zM13 25h6" stroke="#49333A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="21" cy="7" r="3" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.4" />
  </svg>
);

export const DoodlePuchkaPlate: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <ellipse cx="16" cy="21" rx="12" ry="5" fill="#FFFBEB" stroke="#B45309" strokeWidth="1.8" />
    <circle cx="11" cy="16" r="3.5" fill="#FDE68A" stroke="#B45309" strokeWidth="1.5" />
    <circle cx="18" cy="15" r="3.5" fill="#FDE68A" stroke="#B45309" strokeWidth="1.5" />
    <circle cx="22" cy="18" r="2.5" fill="#FDE68A" stroke="#B45309" strokeWidth="1.5" />
    <path d="M14 11c1 2 2 3 2 3" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// --- SPORTS & GAMES DOODLES ---

export const DoodlePickleball: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="8" y="7" width="12" height="14" rx="4" fill="#D1FAE5" stroke="#059669" strokeWidth="1.8" />
    <path d="M14 21v6" stroke="#49333A" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="23" cy="14" r="3.5" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
  </svg>
);

export const DoodlePoolTable: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="13" cy="16" r="7" fill="#18181B" stroke="#49333A" strokeWidth="1.8" />
    <circle cx="13" cy="16" r="3" fill="#FFFFFF" />
    <path d="M12.5 15h1v2h-1z" fill="#18181B" />
    <path d="M22 7l4 18" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const DoodleArcade: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="8" y="10" width="16" height="16" rx="4" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.8" />
    <circle cx="13" cy="17" r="2.5" fill="#E11D48" />
    <circle cx="19" cy="19" r="1.8" fill="#F59E0B" />
    <circle cx="18" cy="15" r="1.8" fill="#10B981" />
  </svg>
);

export const DoodleBadminton: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="13" cy="13" r="6" stroke="#2563EB" strokeWidth="1.8" fill="#EFF6FF" />
    <path d="M17 17l8 8" stroke="#49333A" strokeWidth="2" strokeLinecap="round" />
    <path d="M10 13h6M13 10v6" stroke="#93C5FD" strokeWidth="1.2" />
  </svg>
);

// --- TIMING & MOOD DOODLES ---

export const DoodleLightning: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M18 4L8 18h7l-3 10 12-14h-7l4-10z" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

export const DoodleSun: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="16" cy="16" r="6" fill="#FDE047" stroke="#D97706" strokeWidth="1.8" />
    <path d="M16 4v4M16 24v4M4 16h4M24 16h4M7.5 7.5l3 3M21.5 21.5l3 3M7.5 24.5l3-3M21.5 10.5l3-3" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const DoodleSunset: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10 20a6 6 0 0112 0H10z" fill="#FB923C" stroke="#EA580C" strokeWidth="1.8" />
    <path d="M5 24h22M8 27h16" stroke="#49333A" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M16 8v3M10 11l2 2M22 11l-2 2" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const DoodleMoonStars: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M21 17a8 8 0 11-9-9 7 7 0 009 9z" fill="#DDD6FE" stroke="#6D28D9" strokeWidth="1.8" />
    <circle cx="24" cy="9" r="1.5" fill="#F59E0B" />
    <circle cx="20" cy="5" r="1" fill="#F59E0B" />
  </svg>
);

export const DoodleSparkleHeart: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M16 23.5l-1.2-1.1C9.5 17.5 6 14.5 6 10.8 6 7.8 8.3 5.5 11.3 5.5c1.7 0 3.3.8 4.7 2.1 1.4-1.3 3-2.1 4.7-2.1 3 0 5.3 2.3 5.3 5.3 0 3.7-3.5 6.7-8.8 11.6L16 23.5z" fill="#FFE0E6" stroke="#E94F64" strokeWidth="1.8" />
    <path d="M25 6l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" fill="#F59E0B" />
  </svg>
);

export const DoodleMapPin: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 21s-6-5.8-6-10.5a6 6 0 1112 0C18 15.2 12 21 12 21z" fill="#FFF1F2" stroke="#E94F64" strokeWidth="1.8" />
    <circle cx="12" cy="10.5" r="2.5" fill="#E94F64" />
  </svg>
);

// 15. Durga Puja Pandal Hopping (Festive Diya, Flame & Sparkles)
export const DoodleDurgaPuja: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Diya Base */}
    <path
      d="M5 19C5 24 10 27 16 27C22 27 27 24 27 19H5Z"
      fill="#F97316"
      stroke="#49333A"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    {/* Diya Rim */}
    <ellipse cx="16" cy="19" rx="11" ry="3" fill="#FDBA74" stroke="#49333A" strokeWidth="1.5" />
    {/* Flame */}
    <path
      d="M16 4C14 8 12 11 12 14C12 16.2 13.8 18 16 18C18.2 18 20 16.2 20 14C20 11 18 8 16 4Z"
      fill="#FBBF24"
      stroke="#EA580C"
      strokeWidth="1.6"
    />
    <path
      d="M16 9C15 11 14.5 13 14.5 14.5C14.5 15.3 15.2 16 16 16C16.8 16 17.5 15.3 17.5 14.5C17.5 13 17 11 16 9Z"
      fill="#EF4444"
    />
    {/* Decorative Sparkles */}
    <path d="M6 10L7 12L9 13L7 14L6 16L5 14L3 13L5 12Z" fill="#F59E0B" />
    <path d="M26 9L27 11L29 12L27 13L26 15L25 13L23 12L25 11Z" fill="#F59E0B" />
  </svg>
);

// --- VIBE DOODLE RESOLVER ---

export const getVibeDoodleIcon = (vibeId: string, className = 'w-7 h-7') => {
  switch (vibeId) {
    case 'durga-puja':
      return <DoodleDurgaPuja className={className} />;
    case 'road-ride':
      return <DoodleScooter className={className} />;
    case 'princess-treatment':
      return <DoodleCrown className={className} />;
    case 'foodie-mode':
      return <DoodleFoodieWrap className={className} />;
    case 'cafe-date':
      return <DoodleCoffeeMug className={className} />;
    case 'dinner-date':
      return <DoodleWineDinner className={className} />;
    case 'street-food':
      return <DoodleStreetFood className={className} />;
    case 'sports-games':
      return <DoodleBowlingGame className={className} />;
    case 'movie-date':
      return <DoodleMoviePopcorn className={className} />;
    case 'shopping-queen':
      return <DoodleShoppingBag className={className} />;
    case 'us-time':
      return <DoodleAirplaneSanctuary className={className} />;
    case 'steamy-times':
      return <DoodleSteamyCandle className={className} />;
    case 'chill-session':
      return <DoodleChillCocktail className={className} />;
    case 'her-time':
      return <DoodleListeningHeart className={className} />;
    case 'cuddle-peace':
      return <DoodleCuddlePillow className={className} />;
    default:
      return <DoodleHeart className={className} />;
  }
};

// --- SUB-CHOICE DOODLE RESOLVER ---

export const getSubChoiceDoodleIcon = (subChoiceId: string, className = 'w-6 h-6') => {
  switch (subChoiceId) {
    // Vehicles
    case 'bike':
      return <DoodleBike className={className} />;
    case 'car':
      return <DoodleCar className={className} />;
    case 'scooter':
      return <DoodleScooter className={className} />;

    // Princess Treatments
    case 'spa':
      return <DoodleSpa className={className} />;
    case 'hair':
      return <DoodleHair className={className} />;
    case 'nails':
      return <DoodleNails className={className} />;
    case 'pedicure':
      return <DoodlePedicure className={className} />;
    case 'all-princess':
      return <DoodleCrown className={className} />;

    // Food cravings
    case 'shawarma':
    case 'kathi-rolls':
      return <DoodleFoodieWrap className={className} />;
    case 'momos':
    case 'dimsum':
      return <DoodleBakeryPastry className={className} />;
    // Durga Puja Treats
    case 'bhog-khichuri':
      return <DoodleDurgaPuja className={className} />;
    case 'kathi-roll-stall':
      return <DoodleFoodieWrap className={className} />;
    case 'mela-chaat-puchka':
      return <DoodlePuchkaPlate className={className} />;
    case 'biryani-chaap':
      return <DoodleWineDinner className={className} />;
    case 'hot-jalebi-rabdi':
      return <DoodleWaffleGelato className={className} />;
    case 'mela-chowmein':
      return <DoodleBakeryPastry className={className} />;

    // Sports & Games
    case 'bowling':
      return <DoodleBowlingGame className={className} />;
    case 'pickleball':
      return <DoodlePickleball className={className} />;
    case 'pool-snooker':
      return <DoodlePoolTable className={className} />;
    case 'arcade-vr':
      return <DoodleArcade className={className} />;
    case 'badminton':
      return <DoodleBadminton className={className} />;

    // Movies
    case 'theater-luxury':
      return <DoodleMoviePopcorn className={className} />;
    case 'cozy-home':
      return <DoodleCuddlePillow className={className} />;

    // Shopping
    case 'clothes':
      return <DoodleShoppingBag className={className} />;
    case 'jewelry':
    case 'makeup':
    case 'cute-gifts':
      return <DoodleCrown className={className} />;

    // US Time & Steamy
    case 'deep-talks':
    case 'rant-vent':
      return <DoodleListeningHeart className={className} />;
    case 'music-vibe':
    case 'slow-dance':
      return <DoodleWineDinner className={className} />;
    case 'tea-coffee':
      return <DoodleCoffeeMug className={className} />;
    case 'photos-polaroid':
      return <DoodleHeart className={className} />;
    case 'candlelight-whispers':
    case 'sweet-kisses':
      return <DoodleSteamyCandle className={className} />;
    case 'stargazing':
      return <DoodleMoonStars className={className} />;

    // Chill Audience
    case 'just-us':
      return <DoodleCocktailDrink className={className} />;
    case 'with-siblings':
      return <DoodleStar className={className} />;

    // Timing
    case 'right-now':
      return <DoodleLightning className={className} />;
    case 'afternoon':
      return <DoodleSun className={className} />;
    case 'evening':
      return <DoodleSunset className={className} />;
    case 'dinner-time':
      return <DoodleWineDinner className={className} />;
    case 'late-night':
      return <DoodleMoonStars className={className} />;
    case 'any-time':
      return <DoodleSparkleHeart className={className} />;

    default:
      return <DoodleHeart className={className} />;
  }
};

// --- PITSTOP DOODLE RESOLVER ---

export const getPitstopDoodleIcon = (pitstopId: string, className = 'w-6 h-6') => {
  switch (pitstopId) {
    case 'chai-maggi':
      return <DoodleChaiTapri className={className} />;
    case 'cold-coffee-shakes':
      return <DoodleColdCoffee className={className} />;
    case 'icecream-waffles':
      return <DoodleWaffleGelato className={className} />;
    case 'kathi-shawarma':
      return <DoodleFoodieWrap className={className} />;
    case 'pastries-bakery':
      return <DoodleBakeryPastry className={className} />;
    case 'puchka-chaat':
      return <DoodlePuchkaPlate className={className} />;
    case 'cocktails-drinks':
      return <DoodleCocktailDrink className={className} />;
    default:
      return <DoodleCoffeeMug className={className} />;
  }
};
