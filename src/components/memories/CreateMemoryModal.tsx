import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  MapPin,
  Calendar,
  Heart,
  X,
  Camera,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { LoveMemory, MemoryCategory } from '../../types/memory';
import { AVAILABLE_STOCK_PHOTOS } from '../../data/memoriesData';
import { playCelebrationTone } from '../../utils/soundEffects';

interface CreateMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMemory: (memory: LoveMemory) => void;
}

export const CreateMemoryModal: React.FC<CreateMemoryModalProps> = ({
  isOpen,
  onClose,
  onAddMemory,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Jamshedpur, India');
  const [date, setDate] = useState('Today');
  const [category, setCategory] = useState<MemoryCategory>('festive');
  const [story, setStory] = useState('');
  const [caption, setCaption] = useState('');
  const [sonuNote, setSonuNote] = useState('');
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState<string>('/photos/chotu_saree.jpg');
  const [error, setError] = useState<string | null>(null);

  const categoryOptions: { id: MemoryCategory; label: string }[] = [
    { id: 'festive', label: '🪔 Durga Puja Festive' },
    { id: 'road-ride', label: '🛵 Road Ride / Drive' },
    { id: 'cafe', label: '☕ Cafe & Food' },
    { id: 'nature', label: '🌻 Nature & Walks' },
    { id: 'cuddle', label: '🛋️ Cozy Peace' },
    { id: 'fun', label: '🏎️ Fun & Games' },
    { id: 'special', label: '✨ Love Milestone' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please choose a valid photo');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSelectedPhotoUrl(reader.result);
        setError(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!story.trim()) {
      setError('Please write a story or note for this memory entry!');
      return;
    }

    const categoryObj = categoryOptions.find((c) => c.id === category);

    const newMemory: LoveMemory = {
      id: `user-mem-${Date.now()}`,
      title: title.trim() || 'Date Moment',
      date: date.trim() || 'Special Day',
      location: location.trim() || 'Jamshedpur, India',
      category,
      categoryLabel: categoryObj?.label || 'Special Moment',
      photoUrl: selectedPhotoUrl,
      caption: caption.trim() || 'Captured with love.',
      story: story.trim(),
      sonuNote: sonuNote.trim() || 'Every second with you is my favorite memory.',
      isUserAdded: true,
      createdAt: new Date().toISOString(),
    };

    onAddMemory(newMemory);
    playCelebrationTone();

    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#FFB7C5', '#E94F64', '#FFE0E6', '#FFF0B8', '#F43F5E'],
    });

    // Reset and Close
    setTitle('');
    setStory('');
    setCaption('');
    setSonuNote('');
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          className="relative w-full max-w-lg bg-white/95 backdrop-blur-2xl rounded-[2rem] border border-white/95 shadow-[0_25px_60px_-15px_rgba(233,79,100,0.3)] my-auto overflow-hidden ring-1 ring-[#FFB7C5]/40"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#3D2730]/8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#FFE0E6] text-[#E94F64] flex items-center justify-center">
                <Camera className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-black text-base sm:text-lg text-[#3D2730] leading-none">
                  Add Memory Entry
                </h3>
                <span className="text-[11px] text-[#3D2730]/65 font-medium">Preserve our date story</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-[#3D2730]/60 hover:text-[#3D2730] hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {error && (
              <div className="p-3 bg-[#FEE2E2] border border-[#FCA5A5] rounded-2xl text-xs font-bold text-[#DC2626]">
                {error}
              </div>
            )}

            {/* Photo Preview & Selection */}
            <div>
              <label className="block text-xs font-extrabold text-[#3D2730] uppercase tracking-wider mb-2">
                1. Select Memory Photo
              </label>

              <div className="relative rounded-2xl overflow-hidden border border-[#3D2730]/15 bg-neutral-900 aspect-video flex items-center justify-center mb-3 group">
                <img
                  src={selectedPhotoUrl}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/40 text-white flex flex-col items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-2xs"
                >
                  <Upload className="w-6 h-6" />
                  <span className="text-xs font-bold">Upload Custom Photo from Device</span>
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-pookie py-2 px-3.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload from Device 📁</span>
                </button>

                <span className="text-[11px] text-[#3D2730]/60 font-semibold">or choose stock photo below ↓</span>
              </div>

              {/* Stock Photo Chips */}
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {AVAILABLE_STOCK_PHOTOS.map((stock) => (
                  <button
                    key={stock.url}
                    type="button"
                    onClick={() => {
                      setSelectedPhotoUrl(stock.url);
                      setError(null);
                    }}
                    className={`shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedPhotoUrl === stock.url
                        ? 'border-[#E94F64] ring-2 ring-[#FFB7C5] scale-105'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={stock.url} alt={stock.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-extrabold text-[#3D2730] uppercase tracking-wider mb-1.5">
                2. Headline / Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Kasidih Pandal Hopping with My Rani Saheba 🪔"
                className="w-full px-3.5 py-2.5 rounded-2xl border border-[#3D2730]/15 bg-white text-xs font-medium text-[#3D2730] placeholder-[#3D2730]/40 focus:outline-none focus:border-[#E94F64] focus:ring-1 focus:ring-[#E94F64]"
              />
            </div>

            {/* Date & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-extrabold text-[#3D2730] uppercase tracking-wider mb-1.5">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#E94F64] absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. Durga Puja Ashtami Night"
                    className="w-full pl-9 pr-3 py-2.5 rounded-2xl border border-[#3D2730]/15 bg-white text-xs font-medium text-[#3D2730] placeholder-[#3D2730]/40 focus:outline-none focus:border-[#E94F64]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#3D2730] uppercase tracking-wider mb-1.5">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#E94F64] absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Kasidih Pandal, Sakchi"
                    className="w-full pl-9 pr-3 py-2.5 rounded-2xl border border-[#3D2730]/15 bg-white text-xs font-medium text-[#3D2730] placeholder-[#3D2730]/40 focus:outline-none focus:border-[#E94F64]"
                  />
                </div>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-extrabold text-[#3D2730] uppercase tracking-wider mb-1.5">
                Vibe Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MemoryCategory)}
                className="w-full px-3.5 py-2.5 rounded-2xl border border-[#3D2730]/15 bg-white text-xs font-bold text-[#3D2730] focus:outline-none focus:border-[#E94F64]"
              >
                {categoryOptions.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Story */}
            <div>
              <label className="block text-xs font-extrabold text-[#3D2730] uppercase tracking-wider mb-1.5">
                3. Story Narrative (What made this moment special?)
              </label>
              <textarea
                value={story}
                onChange={(e) => setStory(e.target.value)}
                rows={3}
                placeholder="Write our date story here... e.g. Dhaak beats playing, holding hands tightly in the crowd, hot puchka challenge, laughing endlessly."
                className="w-full px-3.5 py-2.5 rounded-2xl border border-[#3D2730]/15 bg-white text-xs font-medium text-[#3D2730] placeholder-[#3D2730]/40 focus:outline-none focus:border-[#E94F64]"
              />
            </div>

            {/* Romantic Quote */}
            <div>
              <label className="block text-xs font-extrabold text-[#3D2730] uppercase tracking-wider mb-1.5">
                4. Romantic Quote / Slogan (Optional)
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g. Holding hands tightly in the crowd 💕"
                className="w-full px-3.5 py-2.5 rounded-2xl border border-[#3D2730]/15 bg-white text-xs font-medium text-[#3D2730] placeholder-[#3D2730]/40 focus:outline-none focus:border-[#E94F64]"
              />
            </div>

            {/* Sonu's Note */}
            <div>
              <label className="block text-xs font-extrabold text-[#3D2730] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Heart className="w-3 h-3 text-[#E94F64] fill-[#E94F64]" />
                <span>5. Sonu's Love Promise / Note (Optional)</span>
              </label>
              <input
                type="text"
                value={sonuNote}
                onChange={(e) => setSonuNote(e.target.value)}
                placeholder="e.g. I’d walk every pandal in Jamshedpur just to see your smile."
                className="w-full px-3.5 py-2.5 rounded-2xl border border-[#3D2730]/15 bg-white text-xs font-medium text-[#3D2730] placeholder-[#3D2730]/40 focus:outline-none focus:border-[#E94F64]"
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full btn-pookie py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer hover:scale-102 active:scale-98 transition-transform"
              >
                <Sparkles className="w-4 h-4" />
                <span>Save to Our Love Journal 💖</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
