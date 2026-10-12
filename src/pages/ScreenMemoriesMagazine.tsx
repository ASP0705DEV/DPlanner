import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import {
  Camera,
  Plus,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Share2,
} from 'lucide-react';
import type { LoveMemory, MemoryCategory } from '../types/memory';
import { CURATED_LOVE_MEMORIES } from '../data/memoriesData';
import { MemoryJournalCard } from '../components/memories/MemoryJournalCard';
import { MultiShareFloatingBar } from '../components/memories/MultiShareFloatingBar';
import { MemoriesHighlightReel } from '../components/memories/MemoriesHighlightReel';
import { CreateMemoryModal } from '../components/memories/CreateMemoryModal';
import { ImageLightboxModal } from '../components/common/ImageLightboxModal';
import { MobileContainer } from '../components/common/MobileContainer';
import { useAuth } from '../context/AuthContext';
import { playHeartNudgeSound } from '../utils/soundEffects';
import { fetchCloudMemories } from '../services/supabase';

const FEED_STORAGE_KEY = 'chotu_user_love_journal_v4';

export const ScreenMemoriesMagazine: React.FC = () => {
  const { logout } = useAuth();

  // Load from localStorage, or provide curated memories
  const [posts, setPosts] = useState<LoveMemory[]>(() => {
    try {
      const saved = localStorage.getItem(FEED_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load feed posts from storage', e);
    }
    // Default to curated date memories so the journal is immediately alive
    return CURATED_LOVE_MEMORIES;
  });

  const [activeCategory, setActiveCategory] = useState<MemoryCategory>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedLightboxMemory, setSelectedLightboxMemory] = useState<LoveMemory | null>(null);

  // Multi-Photo Selection Mode state
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedMemoryIds, setSelectedMemoryIds] = useState<string[]>([]);

  useEffect(() => {
    fetchCloudMemories().then((cloudItems) => {
      if (cloudItems && cloudItems.length > 0) {
        setPosts((prev) => {
          const map = new Map<string, LoveMemory>();
          prev.forEach((p) => map.set(p.id, p));
          cloudItems.forEach((c: any) => {
            const mapped: LoveMemory = {
              id: c.id,
              title: c.title,
              date: c.date,
              location: c.location,
              category: c.category,
              categoryLabel: c.category_label,
              photoUrl: c.photo_url,
              caption: c.caption,
              story: c.story,
              sonuNote: c.sonu_note,
              isUserAdded: c.is_user_added,
              createdAt: c.created_at,
            };
            map.set(mapped.id, mapped);
          });
          return Array.from(map.values());
        });
      }
    });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(FEED_STORAGE_KEY, JSON.stringify(posts));
    } catch (e) {
      console.warn('Failed to save feed posts', e);
    }
  }, [posts]);

  const handleAddPost = (newPost: LoveMemory) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleDeletePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setSelectedMemoryIds((prev) => prev.filter((i) => i !== id));
  };

  const handleToggleSelectMemory = (id: string) => {
    playHeartNudgeSound(1);
    setSelectedMemoryIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleClearSelection = () => {
    setSelectedMemoryIds([]);
    setIsSelectionMode(false);
  };

  const handleSelectAll = () => {
    const visibleIds = filteredPosts.map((p) => p.id);
    setSelectedMemoryIds(visibleIds);
    playHeartNudgeSound(2);
  };

  const handleHighlightSelect = (item: {
    id: string;
    label: string;
    image: string;
    location: string;
    caption: string;
  }) => {
    setSelectedLightboxMemory({
      id: item.id,
      title: item.label,
      date: 'Special Moment',
      location: item.location,
      category: 'special',
      categoryLabel: item.label,
      photoUrl: item.image,
      caption: item.caption,
      story: item.caption,
    });
  };

  const handleRestoreCuratedMemories = () => {
    setPosts(CURATED_LOVE_MEMORIES);
    playHeartNudgeSound(3);
  };

  // Filter posts by category
  const filteredPosts =
    activeCategory === 'all'
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const selectedMemoriesList = posts.filter((p) => selectedMemoryIds.includes(p.id));

  const filterCategories: { id: MemoryCategory; label: string }[] = [
    { id: 'all', label: 'All Moments' },
    { id: 'festive', label: '🪔 Durga Puja' },
    { id: 'road-ride', label: '🛵 Road Rides' },
    { id: 'cafe', label: '☕ Cafe Dates' },
    { id: 'nature', label: '🌻 Nature & Us' },
    { id: 'cuddle', label: '🛋️ Cozy Peace' },
    { id: 'fun', label: '🏎️ Games & Fun' },
  ];

  return (
    <MobileContainer className="px-3.5 sm:px-4 py-3 sm:py-4 pb-32">
      {/* 1. LUXURY EDITORIAL JOURNAL HEADER */}
      <div className="glass-panel bg-white/92 backdrop-blur-2xl border border-white/95 p-4 sm:p-5 shadow-[0_15px_40px_-10px_rgba(233,79,100,0.12)] mb-5 rounded-[2rem]">
        {/* Top Tag & Lock Button */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE0E6] text-[#E94F64] border border-[#FFB7C5]/60 text-[10px] font-extrabold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3 h-3 text-[#E94F64]" />
            <span>The Love Archive • Jamshedpur Edition</span>
          </div>

          <button
            type="button"
            onClick={logout}
            className="p-1.5 rounded-full bg-white text-[#3D2730]/70 border border-[#3D2730]/12 hover:border-[#FCA5A5] hover:text-[#DC2626] hover:bg-[#FEE2E2] cursor-pointer transition-all shadow-2xs hover:scale-105"
            title="Lock journal for Chotu only 🔒"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Profile / Journal Brand */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3.5">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-white p-0.5 shadow-md bg-gradient-to-tr from-[#FFB7C5] via-[#FF758F] to-[#E94F64] shrink-0">
              <img
                src="/photos/sonu_chotu_tilak_night.jpg"
                alt="Sonu & Chotu"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-display font-black text-xl sm:text-2xl text-[#3D2730] tracking-tight leading-none">
                  Sonu & Chotu
                </h1>
                <CheckCircle2 className="w-4 h-4 text-[#E94F64] fill-[#FFE0E6] shrink-0" />
              </div>
              <p className="text-xs font-bold text-[#E94F64] mt-1 leading-snug">
                Our Private Keepsake Journal 💍
              </p>
              <p className="text-[11px] text-[#3D2730]/75 font-medium mt-0.5 hidden sm:block">
                Marking every date moment, festive smile, and quiet corner in Jamshedpur.
              </p>
            </div>
          </div>

          {/* Quick Counter */}
          <div className="text-right shrink-0 pt-1">
            <span className="block font-display font-black text-2xl text-[#E94F64] leading-none">
              {posts.length}
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#3D2730]/60">
              Moments
            </span>
          </div>
        </div>

        {/* Action Controls Toolbar */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#3D2730]/6">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="flex-1 btn-pookie flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold cursor-pointer shadow-sm hover:scale-102 active:scale-98 transition-transform"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Memory 📸</span>
          </button>

          {/* Multiple Photo Selection Mode Toggle */}
          <button
            type="button"
            onClick={() => {
              setIsSelectionMode(!isSelectionMode);
              if (isSelectionMode) setSelectedMemoryIds([]);
            }}
            className={`px-3 py-2.5 rounded-2xl border text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs hover:scale-102 ${
              isSelectionMode
                ? 'bg-[#E94F64] text-white border-[#E94F64] shadow-xs'
                : 'bg-white text-[#3D2730] border-[#FFB7C5] hover:bg-[#FFE0E6]/50'
            }`}
            title="Select multiple photos to share together"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isSelectionMode ? 'Cancel Select' : 'Multi-Share Photos'}
            </span>
            <span className="sm:hidden">{isSelectionMode ? 'Cancel' : 'Select'}</span>
          </button>

          <Link
            to="/vibe"
            className="px-3 py-2.5 rounded-2xl bg-white border border-[#FFB7C5] text-xs font-bold text-[#E94F64] hover:bg-[#FFE0E6]/50 transition-colors shadow-2xs hover:scale-102"
            title="Plan our next date"
          >
            <Sparkles className="w-4 h-4" />
          </Link>
        </div>

        {/* Multi-Selection Control Bar (When active) */}
        {isSelectionMode && (
          <div className="mt-3 pt-3 border-t border-[#3D2730]/6 flex items-center justify-between text-xs">
            <span className="text-[#3D2730]/80 font-bold">
              Tap checkboxes on photos to select:
            </span>
            <button
              type="button"
              onClick={handleSelectAll}
              className="text-[#E94F64] font-extrabold hover:underline cursor-pointer"
            >
              Select All ({filteredPosts.length})
            </button>
          </div>
        )}
      </div>

      {/* 2. FEATURED DATE HIGHLIGHTS REEL (CAROUSEL) */}
      <MemoriesHighlightReel onSelectHighlight={handleHighlightSelect} />

      {/* 3. CATEGORY FILTER CHIPS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 scrollbar-none -mx-3.5 px-3.5 sm:-mx-0 sm:px-0">
        {filterCategories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setActiveCategory(cat.id);
                playHeartNudgeSound(1);
              }}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-2xs hover:scale-102 ${
                isActive
                  ? 'bg-gradient-to-r from-[#FF758F] to-[#E94F64] text-white shadow-xs'
                  : 'bg-white/90 text-[#3D2730]/75 border border-[#3D2730]/10 hover:border-[#FFB7C5] hover:text-[#E94F64]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* 4. MEMORIES LIST (EDITORIAL MAGAZINE CARDS) */}
      <div>
        {filteredPosts.length === 0 ? (
          /* Clean Empty State */
          <div className="glass-panel bg-white/90 rounded-[2rem] border border-white/95 p-8 text-center shadow-xs">
            <div className="w-16 h-16 rounded-full bg-[#FFE0E6] border border-[#FFB7C5] flex items-center justify-center mx-auto mb-3 text-[#E94F64]">
              <Camera className="w-8 h-8" />
            </div>

            <h3 className="font-display font-black text-2xl text-[#3D2730] mb-1">
              No Memories in this category 📸
            </h3>

            <p className="text-xs text-[#3D2730]/75 max-w-xs mx-auto mb-5 leading-relaxed">
              Add your favorite date moments or restore our curated Jamshedpur memories!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-sm mx-auto">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(true)}
                className="w-full btn-pookie flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Memory 💖</span>
              </button>

              <button
                type="button"
                onClick={handleRestoreCuratedMemories}
                className="w-full px-3 py-2.5 rounded-2xl bg-white border border-[#FFB7C5] text-xs font-bold text-[#E94F64] hover:bg-[#FFE0E6] cursor-pointer"
              >
                Load All Curated Memories 🪔
              </button>
            </div>
          </div>
        ) : (
          <div>
            <AnimatePresence>
              {filteredPosts.map((post) => (
                <MemoryJournalCard
                  key={post.id}
                  memory={post}
                  isSelected={selectedMemoryIds.includes(post.id)}
                  isSelectionMode={isSelectionMode}
                  onToggleSelect={handleToggleSelectMemory}
                  onDelete={handleDeletePost}
                  onOpenLightbox={(mem) => setSelectedLightboxMemory(mem)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* 5. MULTI-PHOTO BATCH SHARING FLOATING DOCK */}
      <MultiShareFloatingBar
        selectedMemories={selectedMemoriesList}
        onClearSelection={handleClearSelection}
      />

      {/* 6. FOOTER RETURN */}
      <div className="mt-8 pt-4 border-t border-[#3D2730]/10 flex items-center justify-between text-xs font-bold text-[#3D2730]/70">
        <Link to="/" className="inline-flex items-center gap-1 hover:text-[#E94F64]">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Letter</span>
        </Link>
        <Link to="/vibe" className="inline-flex items-center gap-1 text-[#E94F64] hover:underline">
          <span>Plan a Date Next</span>
          <Sparkles className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 7. CREATE MEMORY MODAL */}
      <CreateMemoryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onAddMemory={handleAddPost}
      />

      {/* 8. LIGHTBOX FOR FULL UNCROPPED VIEW */}
      <ImageLightboxModal
        isOpen={Boolean(selectedLightboxMemory)}
        onClose={() => setSelectedLightboxMemory(null)}
        imageUrl={selectedLightboxMemory?.photoUrl || null}
        title={selectedLightboxMemory?.title}
        caption={selectedLightboxMemory?.caption}
        location={selectedLightboxMemory?.location}
        date={selectedLightboxMemory?.date}
      />
    </MobileContainer>
  );
};
