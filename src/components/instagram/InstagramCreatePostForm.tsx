import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  MapPin,
  Calendar,
  Heart,
  Send,
  X,
  Camera,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { LoveMemory, MemoryCategory } from '../../types/memory';
import { AVAILABLE_STOCK_PHOTOS } from '../../data/memoriesData';
import { playCelebrationTone } from '../../utils/soundEffects';

interface InstagramCreatePostFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMemory: (memory: LoveMemory) => void;
}

export const InstagramCreatePostForm: React.FC<InstagramCreatePostFormProps> = ({
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
      setError('Please write a caption or story for this memory post!');
      return;
    }

    const categoryObj = categoryOptions.find((c) => c.id === category);

    const newMemory: LoveMemory = {
      id: `user-post-${Date.now()}`,
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

    // Reset and close
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#49333A]/15 overflow-hidden max-h-[92vh] flex flex-col my-6"
        >
          {/* Header */}
          <div className="p-3.5 sm:p-4 border-b border-[#49333A]/10 flex items-center justify-between bg-[#FFF8F0]">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-[#FFE0E6] text-[#E94F64]">
                <Camera className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#49333A] leading-tight">
                  New Love Post 📸
                </h3>
                <p className="text-[10px] text-[#49333A]/60">
                  Share a photo & memory to our private feed
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-full text-[#49333A]/60 hover:text-[#E94F64] hover:bg-[#FFE0E6] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="p-2.5 mx-4 mt-3 rounded-xl bg-[#FEE2E2] border border-[#FCA5A5] text-[#DC2626] text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="overflow-y-auto p-4 space-y-4 flex-1 text-left">
            {/* Live Uncropped Photo Preview */}
            <div>
              <label className="block text-xs font-bold text-[#49333A] mb-1.5">
                1. Photo (Fully Visible Without Cropping):
              </label>

              <div className="relative bg-neutral-900 rounded-2xl overflow-hidden border border-[#49333A]/15 max-h-[300px] flex items-center justify-center p-2 mb-2">
                <img
                  src={selectedPhotoUrl}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-110 pointer-events-none"
                />
                <img
                  src={selectedPhotoUrl}
                  alt="Preview"
                  className="relative z-10 max-h-[280px] w-full object-contain block mx-auto"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl bg-[#FFE0E6] text-[#E94F64] border border-[#FFB7C5] text-xs font-bold flex items-center gap-1.5 hover:bg-[#FFB7C5]/40 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Your Photo</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <span className="text-[11px] text-[#49333A]/60">
                  or pick from our shared photos below:
                </span>
              </div>

              {/* Shared Photos Library Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 max-h-28 overflow-y-auto p-1.5 bg-[#FFF8F0] rounded-xl border border-[#49333A]/10">
                {AVAILABLE_STOCK_PHOTOS.map((p) => {
                  const isSelected = selectedPhotoUrl === p.url;
                  return (
                    <button
                      key={p.url}
                      type="button"
                      onClick={() => setSelectedPhotoUrl(p.url)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#E94F64] scale-95 shadow-xs ring-2 ring-[#FFB7C5]'
                          : 'border-transparent opacity-75 hover:opacity-100 hover:border-[#FFB7C5]'
                      }`}
                      title={p.label}
                    >
                      <img
                        src={p.url}
                        alt={p.label}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Post Title & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#49333A] mb-1">
                  2. Post Title:
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Durga Puja Pandal Night"
                  className="w-full px-3 py-2 bg-[#FFF8F0] rounded-xl border border-[#49333A]/15 text-xs font-medium text-[#49333A] focus:outline-none focus:border-[#E94F64]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#49333A] mb-1">
                  3. Category:
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as MemoryCategory)}
                  className="w-full px-3 py-2 bg-[#FFF8F0] rounded-xl border border-[#49333A]/15 text-xs font-medium text-[#49333A] focus:outline-none focus:border-[#E94F64]"
                >
                  {categoryOptions.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#49333A] mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#E94F64]" />
                  <span>Location in Jamshedpur:</span>
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Kasidih Pandal, Sakchi"
                  className="w-full px-3 py-2 bg-[#FFF8F0] rounded-xl border border-[#49333A]/15 text-xs font-medium text-[#49333A] focus:outline-none focus:border-[#E94F64]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#49333A] mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#E94F64]" />
                  <span>Date or Season:</span>
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="e.g. October 2026 / Ashtami Night"
                  className="w-full px-3 py-2 bg-[#FFF8F0] rounded-xl border border-[#49333A]/15 text-xs font-medium text-[#49333A] focus:outline-none focus:border-[#E94F64]"
                />
              </div>
            </div>

            {/* Caption & Story */}
            <div>
              <label className="block text-xs font-bold text-[#49333A] mb-1">
                4. Caption / What Happened on This Date:
              </label>
              <textarea
                value={story}
                onChange={(e) => setStory(e.target.value)}
                rows={3}
                placeholder="Write your story, inside jokes, or why this date was unforgettable..."
                className="w-full px-3 py-2 bg-[#FFF8F0] rounded-xl border border-[#49333A]/15 text-xs font-medium text-[#49333A] focus:outline-none focus:border-[#E94F64] resize-none"
              />
            </div>

            {/* Note from Sonu */}
            <div>
              <label className="block text-xs font-bold text-[#49333A] mb-1 flex items-center gap-1">
                <Heart className="w-3 h-3 text-[#E94F64] fill-[#E94F64]" />
                <span>Sweet Note from Sonu:</span>
              </label>
              <input
                type="text"
                value={sonuNote}
                onChange={(e) => setSonuNote(e.target.value)}
                placeholder="e.g. You looked like pure royalty, Chotu 💕"
                className="w-full px-3 py-2 bg-[#FFF8F0] rounded-xl border border-[#49333A]/15 text-xs font-medium text-[#49333A] focus:outline-none focus:border-[#E94F64]"
              />
            </div>

            {/* Submit */}
            <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#49333A]/10">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-[#49333A]/70 hover:bg-[#49333A]/5 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-pookie flex items-center gap-2 py-2 px-5 text-xs font-bold shadow-md cursor-pointer hover:scale-102"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Share Post to Feed 💖</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
