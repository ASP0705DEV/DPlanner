import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Sparkles, MapPin, Calendar, Heart, BookmarkCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { LoveMemory, MemoryCategory } from '../../types/memory';
import { AVAILABLE_STOCK_PHOTOS } from '../../data/memoriesData';
import { WashiTape } from '../common/WashiTape';

interface AddMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMemory: (memory: LoveMemory) => void;
}

export const AddMemoryModal: React.FC<AddMemoryModalProps> = ({
  isOpen,
  onClose,
  onAddMemory,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<MemoryCategory>('festive');
  const [caption, setCaption] = useState('');
  const [story, setStory] = useState('');
  const [sonuNote, setSonuNote] = useState('');
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState<string>('/photos/chotu_saree.jpg');
  const [error, setError] = useState<string | null>(null);

  const categoryOptions: { id: MemoryCategory; label: string }[] = [
    { id: 'festive', label: '🪔 Festive & Puja' },
    { id: 'road-ride', label: '🛵 Road Rides' },
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
      setError('Please choose a valid image file');
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
    if (!title.trim()) {
      setError('Please add a title for this memory');
      return;
    }
    if (!story.trim()) {
      setError('Please write a little story or context for this date');
      return;
    }

    const categoryObj = categoryOptions.find((c) => c.id === category);

    const newMemory: LoveMemory = {
      id: `user-mem-${Date.now()}`,
      title: title.trim(),
      date: date.trim() || 'Special Date',
      location: location.trim() || 'Jamshedpur',
      category,
      categoryLabel: categoryObj?.label || 'Love Milestone',
      photoUrl: selectedPhotoUrl,
      caption: caption.trim() || 'A cherished moment of Sonu & Chotu.',
      story: story.trim(),
      sonuNote: sonuNote.trim() || 'Every second with you is my favorite memory.',
      isUserAdded: true,
      createdAt: new Date().toISOString(),
    };

    onAddMemory(newMemory);

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFB7C5', '#E94F64', '#FFE0E6', '#FFF0B8'],
    });

    // Reset fields
    setTitle('');
    setDate('');
    setLocation('');
    setCaption('');
    setStory('');
    setSonuNote('');
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-[#FFF8F0] border-2 border-[#49333A]/20 rounded-3xl shadow-2xl p-5 my-8 overflow-hidden max-h-[92vh] flex flex-col"
        >
          <WashiTape color="pink" rotate="rotate-1" />

          {/* Modal Header */}
          <div className="flex items-start justify-between gap-3 mb-4 shrink-0">
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#E94F64] bg-[#FFE0E6] px-2.5 py-0.5 rounded-full border border-[#FFB7C5]/40 mb-1">
                <Sparkles className="w-3 h-3" />
                <span>Magazine Feature</span>
              </div>
              <h2 className="font-handwritten text-3xl font-bold text-[#49333A] leading-tight">
                Add Our Date Memory
              </h2>
              <p className="text-xs text-[#49333A]/70">
                Mark our little love life with photos and heartfelt stories
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full bg-white border border-[#49333A]/15 text-[#49333A]/70 hover:text-[#E94F64] hover:bg-[#FFE0E6] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {error && (
            <div className="p-2.5 mb-3 rounded-xl bg-[#FEE2E2] border border-[#FCA5A5] text-[#DC2626] text-xs font-medium">
              {error}
            </div>
          )}

          {/* Scrollable Form Body */}
          <form onSubmit={handleSubmit} className="overflow-y-auto space-y-4 pr-1 text-left flex-1">
            {/* Image Picker Section */}
            <div>
              <label className="block text-xs font-bold text-[#49333A] mb-1.5">
                1. Choose Date Photo:
              </label>

              {/* Photo Preview */}
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-[#49333A]/15 shadow-xs mb-3">
                <div className="w-20 h-24 rounded-xl overflow-hidden border border-[#49333A]/10 bg-[#FFF8F0] shrink-0">
                  <img
                    src={selectedPhotoUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold text-[#E94F64] block mb-1">
                    Photo Selected
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-2.5 py-1 rounded-xl bg-[#FFE0E6] text-[#E94F64] border border-[#FFB7C5] text-[11px] font-bold flex items-center gap-1 hover:bg-[#FFB7C5]/30 cursor-pointer"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Upload from Device</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                  <p className="text-[10px] text-[#49333A]/60 mt-1">
                    Or select from our shared collection below
                  </p>
                </div>
              </div>

              {/* Shared Photos Library Thumbnails */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#49333A]/70 uppercase tracking-wide">
                  Our Shared Photos:
                </span>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 max-h-32 overflow-y-auto p-1.5 bg-white/70 rounded-xl border border-[#49333A]/10">
                  {AVAILABLE_STOCK_PHOTOS.map((p) => {
                    const isSelected = selectedPhotoUrl === p.url;
                    return (
                      <button
                        key={p.url}
                        type="button"
                        onClick={() => {
                          setSelectedPhotoUrl(p.url);
                        }}
                        className={`aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#E94F64] scale-95 shadow-xs ring-2 ring-[#FFB7C5]'
                            : 'border-transparent opacity-80 hover:opacity-100 hover:border-[#FFB7C5]'
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
            </div>

            {/* Title & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#49333A] mb-1">
                  2. Memory Title:
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Durga Puja Ashtami Night"
                  className="w-full px-3 py-2 bg-white rounded-xl border border-[#49333A]/15 text-xs text-[#49333A] placeholder-[#49333A]/40 focus:outline-none focus:border-[#E94F64]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#49333A] mb-1">
                  3. Category / Vibe:
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as MemoryCategory)}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-[#49333A]/15 text-xs text-[#49333A] focus:outline-none focus:border-[#E94F64]"
                >
                  {categoryOptions.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#49333A] mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#E94F64]" />
                  <span>Date or Season:</span>
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="e.g. October 2026 / Ashtami Evening"
                  className="w-full px-3 py-2 bg-white rounded-xl border border-[#49333A]/15 text-xs text-[#49333A] placeholder-[#49333A]/40 focus:outline-none focus:border-[#E94F64]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#49333A] mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#E94F64]" />
                  <span>Location in Jamshedpur:</span>
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Kasidih Pandal / Marine Drive"
                  className="w-full px-3 py-2 bg-white rounded-xl border border-[#49333A]/15 text-xs text-[#49333A] placeholder-[#49333A]/40 focus:outline-none focus:border-[#E94F64]"
                />
              </div>
            </div>

            {/* Polaroid Caption */}
            <div>
              <label className="block text-xs font-bold text-[#49333A] mb-1">
                4. Polaroid Caption:
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g. Holding hands tightly in the buzzing festive crowd."
                className="w-full px-3 py-2 bg-white rounded-xl border border-[#49333A]/15 text-xs text-[#49333A] placeholder-[#49333A]/40 focus:outline-none focus:border-[#E94F64]"
              />
            </div>

            {/* Story & Context */}
            <div>
              <label className="block text-xs font-bold text-[#49333A] mb-1">
                5. Love Story / What Happened on This Date:
              </label>
              <textarea
                value={story}
                onChange={(e) => setStory(e.target.value)}
                rows={3}
                placeholder="Tell our story... What made this moment unforgettable? What did Sonu or Chotu do or say?"
                className="w-full px-3 py-2 bg-white rounded-xl border border-[#49333A]/15 text-xs text-[#49333A] placeholder-[#49333A]/40 focus:outline-none focus:border-[#E94F64] resize-none"
              />
            </div>

            {/* Sweet Note from Sonu */}
            <div>
              <label className="block text-xs font-bold text-[#49333A] mb-1 flex items-center gap-1">
                <Heart className="w-3 h-3 text-[#E94F64] fill-[#E94F64]" />
                <span>Note from Sonu:</span>
              </label>
              <input
                type="text"
                value={sonuNote}
                onChange={(e) => setSonuNote(e.target.value)}
                placeholder="e.g. I would choose you in every lifetime, Chotu."
                className="w-full px-3 py-2 bg-white rounded-xl border border-[#49333A]/15 text-xs text-[#49333A] placeholder-[#49333A]/40 focus:outline-none focus:border-[#E94F64]"
              />
            </div>

            {/* Submit Buttons */}
            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#49333A]/70 hover:bg-[#49333A]/5 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-pookie flex items-center gap-2 py-2 px-5 text-xs cursor-pointer shadow-md"
              >
                <BookmarkCheck className="w-4 h-4" />
                <span>Publish to Magazine 💌</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
