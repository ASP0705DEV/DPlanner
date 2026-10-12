import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin } from 'lucide-react';
import { playHeartNudgeSound } from '../../utils/soundEffects';

interface HighlightItem {
  id: string;
  label: string;
  image: string;
  location: string;
  caption: string;
}

const HIGHLIGHTS: HighlightItem[] = [
  {
    id: 's-saree',
    label: 'Rani Saheba 🪔',
    image: '/photos/chotu_saree.jpg',
    location: 'Kasidih Durga Puja',
    caption: 'Dressed up in festive saree, holding hands in the crowd.',
  },
  {
    id: 's-sunflower',
    label: 'Sunflower Valley 🌻',
    image: '/photos/sonu_chotu_sunflower.jpg',
    location: 'Sunflower Field',
    caption: 'Giant yellow sunflowers and your brightest smile.',
  },
  {
    id: 's-gokart',
    label: 'Racer Queen 🏎️',
    image: '/photos/chotu_gokart_racing.jpg',
    location: 'Circuit 77 Track',
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
    label: 'Cafe Date ☕',
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
    label: 'Sweet Surprise 🍪',
    image: '/photos/heart_cookie.jpg',
    location: 'Bistupur Bakery',
    caption: 'Buttery heart cookie for the queen of my heart.',
  },
];

interface MemoriesHighlightReelProps {
  onSelectHighlight: (item: HighlightItem) => void;
}

export const MemoriesHighlightReel: React.FC<MemoriesHighlightReelProps> = ({
  onSelectHighlight,
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2.5 px-1">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#3D2730]/70 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#E94F64]" />
          <span>Featured Date Highlights</span>
        </span>
        <span className="text-[10px] text-[#3D2730]/60 font-semibold">Swipe to explore →</span>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory -mx-3 px-3 sm:-mx-0 sm:px-0">
        {HIGHLIGHTS.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              playHeartNudgeSound(2);
              onSelectHighlight(item);
            }}
            className="flex-shrink-0 w-36 sm:w-40 rounded-2xl overflow-hidden glass-panel bg-white/90 border border-white/95 shadow-sm hover:shadow-md cursor-pointer snap-start transition-all duration-200 group"
          >
            {/* Image Thumbnail with Ambient Blur */}
            <div className="relative h-24 sm:h-28 bg-neutral-900 overflow-hidden">
              <img
                src={item.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover blur-sm opacity-40 scale-110"
              />
              <img
                src={item.image}
                alt={item.label}
                className="relative z-10 w-full h-full object-cover group-hover:scale-106 transition-transform duration-300"
              />
            </div>

            {/* Label and Locality */}
            <div className="p-2 sm:p-2.5">
              <h5 className="font-display font-bold text-xs text-[#3D2730] truncate group-hover:text-[#E94F64] transition-colors">
                {item.label}
              </h5>
              <p className="text-[10px] text-[#3D2730]/65 truncate flex items-center gap-1 mt-0.5">
                <MapPin className="w-2.5 h-2.5 text-[#E94F64] shrink-0" />
                <span className="truncate">{item.location}</span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
