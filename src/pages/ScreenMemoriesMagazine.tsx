import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Plus,
  Sparkles,
  ArrowLeft,
  LayoutGrid,
  FileText,
  Heart,
} from 'lucide-react';
import type { LoveMemory, MemoryCategory } from '../types/memory';
import { CURATED_LOVE_MEMORIES } from '../data/memoriesData';
import { MemoryCard } from '../components/memories/MemoryCard';
import { AddMemoryModal } from '../components/memories/AddMemoryModal';
import { WashiTape } from '../components/common/WashiTape';
import { MobileContainer } from '../components/common/MobileContainer';

const STORAGE_KEY = 'our_love_life_magazine_memories_v2';

export const ScreenMemoriesMagazine: React.FC = () => {
  const [memories, setMemories] = useState<LoveMemory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: LoveMemory[] = JSON.parse(saved);
        // Merge user added with curated to ensure new curated ones always show
        const userAdded = parsed.filter((m) => m.isUserAdded);
        return [...userAdded, ...CURATED_LOVE_MEMORIES];
      }
    } catch (e) {
      console.warn('Failed to load memories from localStorage', e);
    }
    return CURATED_LOVE_MEMORIES;
  });

  const [activeCategory, setActiveCategory] = useState<MemoryCategory>('all');
  const [viewMode, setViewMode] = useState<'magazine' | 'polaroid'>('magazine');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
    } catch (e) {
      console.warn('Failed to save memories to localStorage', e);
    }
  }, [memories]);

  const handleAddMemory = (newMemory: LoveMemory) => {
    setMemories((prev) => [newMemory, ...prev]);
  };

  const handleDeleteMemory = (id: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
  };

  const categories: { id: MemoryCategory; label: string }[] = [
    { id: 'all', label: 'All Memories' },
    { id: 'festive', label: '🪔 Durga Puja' },
    { id: 'road-ride', label: '🛵 Road Rides' },
    { id: 'cafe', label: '☕ Cafes' },
    { id: 'nature', label: '🌻 Nature' },
    { id: 'cuddle', label: '🛋️ Cozy Peace' },
    { id: 'fun', label: '🏎️ Fun & Games' },
    { id: 'special', label: '✨ Milestones' },
  ];

  const filteredMemories = memories.filter((m) => {
    if (activeCategory === 'all') return true;
    return m.category === activeCategory;
  });

  return (
    <MobileContainer className="px-4 py-6 pb-28">
      {/* Editorial Magazine Masthead */}
      <div className="relative scrapbook-card p-6 bg-gradient-to-b from-[#FFF5F7] to-white rounded-3xl border-2 border-[#49333A]/15 shadow-xl text-center mb-6 overflow-hidden">
        <WashiTape color="pink" rotate="-rotate-1" />

        <div className="flex items-center justify-between border-b border-[#49333A]/10 pb-2 mb-3 text-[10px] font-bold text-[#49333A]/60 uppercase tracking-widest">
          <span>The Jamshedpur Edition</span>
          <span>Vol. 1 • Autumn 2026</span>
          <span>For Chotu</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFE0E6] text-[#E94F64] border border-[#FFB7C5] text-[11px] font-bold uppercase tracking-wider mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Our Love Life Magazine</span>
        </div>

        <h1 className="font-handwritten text-4xl sm:text-5xl font-bold text-[#49333A] leading-none mb-1.5">
          Chotu & Sonu Chronicles
        </h1>

        <p className="text-xs sm:text-sm text-[#49333A]/80 font-medium max-w-sm mx-auto leading-relaxed mb-4">
          Capturing our little love life, date milestones, quiet moments, and endless laughter across Jamshedpur.
        </p>

        {/* Action Button to Add New Memory */}
        <div className="flex items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="btn-pookie flex items-center gap-2 py-2.5 px-5 text-xs font-bold cursor-pointer shadow-md hover:scale-102 active:scale-98 transition-transform"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Our Date Memory 📸</span>
          </button>

          <Link
            to="/vibe"
            className="btn-pookie-secondary flex items-center gap-1.5 py-2 px-3 text-xs font-bold cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E94F64]" />
            <span>Plan Date</span>
          </Link>
        </div>
      </div>

      {/* Toolbar: Category Filters & View Toggle */}
      <div className="space-y-3 mb-6">
        {/* Category Pills Carousel */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
          {categories.map((c) => {
            const isSelected = activeCategory === c.id;
            const count =
              c.id === 'all'
                ? memories.length
                : memories.filter((m) => m.category === c.id).length;

            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCategory(c.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#E94F64] text-white shadow-xs'
                    : 'bg-white text-[#49333A]/80 border border-[#49333A]/10 hover:border-[#FFB7C5]'
                }`}
              >
                <span>{c.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? 'bg-white text-[#E94F64]'
                      : 'bg-[#FFF8F0] text-[#49333A]/60'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* View Switcher & Counter */}
        <div className="flex items-center justify-between text-xs text-[#49333A]/70 px-1">
          <div className="flex items-center gap-1 font-semibold">
            <Heart className="w-3.5 h-3.5 text-[#E94F64] fill-[#E94F64]" />
            <span>
              Showing {filteredMemories.length} {filteredMemories.length === 1 ? 'memory' : 'memories'}
            </span>
          </div>

          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#49333A]/10 shadow-2xs">
            <button
              type="button"
              onClick={() => setViewMode('magazine')}
              className={`p-1 rounded-lg text-xs font-bold cursor-pointer flex items-center gap-1 transition-colors ${
                viewMode === 'magazine'
                  ? 'bg-[#FFE0E6] text-[#E94F64]'
                  : 'text-[#49333A]/60 hover:text-[#49333A]'
              }`}
              title="Magazine Layout"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">Magazine</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('polaroid')}
              className={`p-1 rounded-lg text-xs font-bold cursor-pointer flex items-center gap-1 transition-colors ${
                viewMode === 'polaroid'
                  ? 'bg-[#FFE0E6] text-[#E94F64]'
                  : 'text-[#49333A]/60 hover:text-[#49333A]'
              }`}
              title="Polaroid Grid"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">Polaroids</span>
            </button>
          </div>
        </div>
      </div>

      {/* Memory Content */}
      {filteredMemories.length === 0 ? (
        <div className="scrapbook-card p-8 bg-white rounded-3xl border-2 border-dashed border-[#49333A]/20 text-center my-6">
          <BookOpen className="w-8 h-8 text-[#E94F64] mx-auto mb-2 opacity-60" />
          <h3 className="font-handwritten text-2xl font-bold text-[#49333A] mb-1">
            No memories under this category yet
          </h3>
          <p className="text-xs text-[#49333A]/70 mb-4">
            Be the first to add a date memory or choose another category!
          </p>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="btn-pookie inline-flex items-center gap-1.5 py-2 px-4 text-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add a Memory</span>
          </button>
        </div>
      ) : viewMode === 'polaroid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AnimatePresence>
            {filteredMemories.map((memory) => (
              <MemoryCard
                key={memory.id}
                memory={memory}
                viewMode="polaroid"
                onDelete={handleDeleteMemory}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="space-y-6">
          <AnimatePresence>
            {filteredMemories.map((memory) => (
              <MemoryCard
                key={memory.id}
                memory={memory}
                viewMode="magazine"
                onDelete={handleDeleteMemory}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="mt-8 pt-4 border-t border-dashed border-[#49333A]/15 flex items-center justify-between text-xs">
        <Link
          to="/"
          className="inline-flex items-center gap-1 font-bold text-[#49333A]/70 hover:text-[#E94F64]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Letter</span>
        </Link>

        <Link
          to="/vibe"
          className="inline-flex items-center gap-1 font-bold text-[#E94F64] hover:underline"
        >
          <span>Plan Our Next Date</span>
          <Sparkles className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Add Memory Modal */}
      <AddMemoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddMemory={handleAddMemory}
      />
    </MobileContainer>
  );
};
