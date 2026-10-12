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
} from 'lucide-react';
import type { LoveMemory } from '../types/memory';
import { InstagramStoriesTray } from '../components/instagram/InstagramStoriesTray';
import { InstagramPostCard } from '../components/instagram/InstagramPostCard';
import { InstagramCreatePostForm } from '../components/instagram/InstagramCreatePostForm';
import { ImageLightboxModal } from '../components/common/ImageLightboxModal';
import { MobileContainer } from '../components/common/MobileContainer';
import { useAuth } from '../context/AuthContext';

const FEED_STORAGE_KEY = 'chotu_user_instagram_posts_v3';

export const ScreenMemoriesMagazine: React.FC = () => {
  const { logout } = useAuth();

  // Empty by default as requested: user creates their memories via the form
  const [posts, setPosts] = useState<LoveMemory[]>(() => {
    try {
      const saved = localStorage.getItem(FEED_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load feed posts from storage', e);
    }
    return [];
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedLightboxMemory, setSelectedLightboxMemory] = useState<LoveMemory | null>(null);

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
  };

  const handleStorySelect = (story: {
    id: string;
    label: string;
    image: string;
    location: string;
    caption: string;
  }) => {
    setSelectedLightboxMemory({
      id: story.id,
      title: story.label,
      date: 'Our Love Story',
      location: story.location,
      category: 'special',
      categoryLabel: story.label,
      photoUrl: story.image,
      caption: story.caption,
      story: story.caption,
    });
  };

  const handleLoadSamplePost = () => {
    const samplePost: LoveMemory = {
      id: `sample-${Date.now()}`,
      title: 'Sharodiya Utsav & Pandal Hopping with My Rani Saheba 🪔',
      date: 'Durga Puja Ashtami Night',
      location: 'Kasidih Durga Puja Pandal, Sakchi',
      category: 'festive',
      categoryLabel: '🪔 Durga Puja Special',
      photoUrl: '/photos/chotu_saree.jpg',
      caption: 'Dhaak beats, festive lights, and holding hands tightly in the crowd.',
      story:
        'Chotu looked absolutely stunning in her festive saree! We walked hand in hand through the illumination gates of Kasidih, ate hot puchka and Kathi rolls, and admired Maa Durga together. Sonu’s favorite view was Chotu’s sparkling smile in the festive lights.',
      sonuNote: 'I’d walk across every pandal in Jamshedpur a thousand times just to see you smile like this 💕',
      isUserAdded: true,
      createdAt: new Date().toISOString(),
    };
    setPosts([samplePost, ...posts]);
  };

  return (
    <MobileContainer className="px-3 sm:px-4 py-4 pb-28">
      {/* 1. INSTAGRAM PROFILE HEADER */}
      <div className="glass-panel bg-white/90 backdrop-blur-2xl border border-white/95 p-5 sm:p-6 shadow-[0_15px_35px_-5px_rgba(233,79,100,0.08)] mb-5">
        <div className="flex items-start justify-between gap-4 mb-4">
          {/* Avatar with Gradient Story Ring */}
          <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] shrink-0 shadow-sm">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-1 overflow-hidden">
              <img
                src="/photos/sonu_chotu_tilak_night.jpg"
                alt="chotu_and_sonu"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex-1 flex items-center justify-around text-center pt-2 sm:pt-3">
            <div>
              <span className="block font-display font-extrabold text-base sm:text-lg text-[#3D2730]">
                {posts.length}
              </span>
              <span className="text-[10px] text-[#3D2730]/60 font-bold uppercase tracking-wider">Posts</span>
            </div>
            <div>
              <span className="block font-display font-extrabold text-base sm:text-lg text-[#E94F64]">
                15+
              </span>
              <span className="text-[10px] text-[#3D2730]/60 font-bold uppercase tracking-wider">Vibes</span>
            </div>
            <div>
              <span className="block font-display font-extrabold text-base sm:text-lg text-[#E94F64]">
                Forever
              </span>
              <span className="text-[10px] text-[#3D2730]/60 font-bold uppercase tracking-wider">Love</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-4 text-xs text-[#3D2730]">
          <div className="flex items-center gap-1.5 font-bold text-sm text-[#3D2730] mb-0.5">
            <span className="font-display font-bold">chotu_and_sonu</span>
            <CheckCircle2 className="w-4 h-4 text-[#E94F64] fill-[#FFE0E6]" />
          </div>
          <p className="font-bold text-[11px] text-[#E94F64] mb-1">
            Sonu & Chotu • Our Private Love Feed 💍
          </p>
          <p className="text-[11px] text-[#3D2730]/80 leading-relaxed font-medium">
            Marking our date moments, festive smiles, and quiet hugs across Jamshedpur. Locked & private for us only 💕
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="flex-1 btn-pookie flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold cursor-pointer shadow-sm hover:scale-102 active:scale-98 transition-transform"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Memory Post 📸</span>
          </button>

          <Link
            to="/vibe"
            className="px-3 py-2.5 rounded-2xl bg-white border border-[#FFB7C5] text-xs font-bold text-[#E94F64] hover:bg-[#FFE0E6]/50 transition-colors shadow-2xs hover:scale-102"
            title="Plan our next date"
          >
            <Sparkles className="w-4 h-4" />
          </Link>

          <button
            type="button"
            onClick={logout}
            className="p-2.5 rounded-2xl bg-[#FEE2E2] border border-[#FCA5A5] text-[#DC2626] text-xs font-bold hover:bg-[#FCA5A5]/30 cursor-pointer transition-colors shadow-2xs hover:scale-102"
            title="Lock our app"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. INSTAGRAM STORIES TRAY */}
      <InstagramStoriesTray onSelectStory={handleStorySelect} />

      {/* 3. POSTS FEED */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="font-bold text-xs uppercase tracking-wider text-[#49333A]/70 flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-[#E94F64]" />
            <span>Memories Feed ({posts.length})</span>
          </h2>

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="text-xs font-bold text-[#E94F64] hover:underline cursor-pointer flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Post</span>
          </button>
        </div>

        {posts.length === 0 ? (
          /* Clean Instagram-style Empty State */
          <div className="bg-white rounded-3xl border border-[#49333A]/15 p-8 text-center shadow-xs">
            <div className="w-16 h-16 rounded-full bg-[#FFE0E6] border border-[#FFB7C5] flex items-center justify-center mx-auto mb-3 text-[#E94F64]">
              <Camera className="w-8 h-8" />
            </div>

            <h3 className="font-handwritten text-3xl font-bold text-[#49333A] mb-1">
              No Memory Posts Yet 📸
            </h3>

            <p className="text-xs text-[#49333A]/75 max-w-xs mx-auto mb-4 leading-relaxed">
              Start sharing your favorite date photos, Durga Puja smiles, or late-night rides! Every post displays full uncropped photos like an authentic Instagram feed.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-xs mx-auto">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(true)}
                className="w-full btn-pookie flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create Your First Post 💖</span>
              </button>

              <button
                type="button"
                onClick={handleLoadSamplePost}
                className="w-full px-3 py-2.5 rounded-2xl bg-[#FFF8F0] border border-[#FFB7C5] text-xs font-bold text-[#E94F64] hover:bg-[#FFE0E6] cursor-pointer"
              >
                Load Sample Durga Puja Post 🪔
              </button>
            </div>
          </div>
        ) : (
          /* Active Instagram Post Cards */
          <div>
            <AnimatePresence>
              {posts.map((post) => (
                <InstagramPostCard
                  key={post.id}
                  memory={post}
                  onDelete={handleDeletePost}
                  onOpenLightbox={(mem) => setSelectedLightboxMemory(mem)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Footer Return */}
      <div className="mt-8 pt-4 border-t border-[#49333A]/10 flex items-center justify-between text-xs font-bold text-[#49333A]/70">
        <Link to="/" className="inline-flex items-center gap-1 hover:text-[#E94F64]">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Letter</span>
        </Link>
        <Link to="/vibe" className="inline-flex items-center gap-1 text-[#E94F64] hover:underline">
          <span>Plan a Date</span>
          <Sparkles className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Create Post Form Modal */}
      <InstagramCreatePostForm
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onAddMemory={handleAddPost}
      />

      {/* Lightbox for Full Uncropped Image View */}
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
