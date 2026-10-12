import React from 'react';
import { motion } from 'framer-motion';

interface StoryItem {
  id: string;
  label: string;
  image: string;
  location: string;
  caption: string;
}

const STORIES: StoryItem[] = [
  {
    id: 's-saree',
    label: 'Rani Saheba',
    image: '/photos/chotu_saree.jpg',
    location: 'Kasidih Durga Puja Pandal',
    caption: 'Dressed up in festive saree, holding hands in the crowd.',
  },
  {
    id: 's-sunflower',
    label: 'Sunflower 🌻',
    image: '/photos/sonu_chotu_sunflower.jpg',
    location: 'Sunflower Valley',
    caption: 'Giant yellow sunflowers and your brightest smile.',
  },
  {
    id: 's-gokart',
    label: 'Racer Queen 🏎️',
    image: '/photos/chotu_gokart_racing.jpg',
    location: 'Circuit 77 Gokarting',
    caption: 'Fast on the racing track, overtaking everyone!',
  },
  {
    id: 's-car',
    label: 'Marine Drive 🛵',
    image: '/photos/car_drive_miss_you.jpg',
    location: 'Marine Drive Jamshedpur',
    caption: 'Windows rolled down and late-night river breeze.',
  },
  {
    id: 's-cafe',
    label: 'Cafe Regal ☕',
    image: '/photos/sonu_chotu_cafe_date.jpg',
    location: 'Cafe Regal Bistupur',
    caption: 'Warm cappuccino and endless laughing.',
  },
  {
    id: 's-tilak',
    label: 'Tilak Night ✨',
    image: '/photos/sonu_chotu_tilak_night.jpg',
    location: 'Northern Town',
    caption: 'Traditional festive radiance and blessings together.',
  },
  {
    id: 's-cookie',
    label: 'Heart Cookie 🍪',
    image: '/photos/heart_cookie.jpg',
    location: 'Bistupur Bakery',
    caption: 'Buttery heart cookie for the queen of my heart.',
  },
  {
    id: 's-cuddle',
    label: 'Cuddle Safe 🛋️',
    image: '/photos/sonu_chotu_home_cuddle.jpg',
    location: 'Our Cozy Nest',
    caption: 'Warmest blanket and complete peace.',
  },
  {
    id: 's-rain',
    label: 'Monsoon 🌧️',
    image: '/photos/chotu_rain_umbrella.jpg',
    location: 'Jubilee Park Walk',
    caption: 'Sharing one tiny umbrella in the rain.',
  },
  {
    id: 's-sunset',
    label: 'Sunset View 🌅',
    image: '/photos/sonu_chotu_sunset_silhouette.jpg',
    location: 'Dimna Dam Lake',
    caption: 'Golden silhouettes against Dalma hills.',
  },
];

export const InstagramStoriesTray: React.FC<{
  onSelectStory: (story: StoryItem) => void;
}> = ({ onSelectStory }) => {
  return (
    <div className="bg-white rounded-3xl border border-[#49333A]/10 p-3 shadow-xs mb-6 overflow-hidden">
      <div className="flex items-center gap-3.5 overflow-x-auto pb-1 scrollbar-none">
        {STORIES.map((story) => (
          <motion.button
            key={story.id}
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => onSelectStory(story)}
            className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group"
          >
            {/* Instagram Gradient Ring */}
            <div className="p-0.5 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] group-hover:scale-105 transition-transform">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white p-0.5 overflow-hidden">
                <img
                  src={story.image}
                  alt={story.label}
                  className="w-full h-full object-cover rounded-full group-hover:scale-108 transition-transform duration-300"
                />
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#49333A]/85 truncate max-w-[64px] text-center">
              {story.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
