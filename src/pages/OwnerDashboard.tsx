import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Lock,
  Unlock,
  Heart,
  Clock,
  Eye,
  RefreshCw,
  Crown,
  MapPin,
  UtensilsCrossed,
  Sparkles,
  Navigation,
  Send,
  Smile,
  ExternalLink,
} from 'lucide-react';
import type { DateSubmission, SubmissionStatus } from '../types';
import { useChotuPreferences } from '../context/ChotuPreferencesContext';
import {
  fetchOwnerSubmissions,
  updateSubmissionStatus,
  isSupabaseConfigured,
  supabase,
} from '../services/supabase';
import { WashiTape } from '../components/common/WashiTape';

export const OwnerDashboard: React.FC = () => {
  const { preferences } = useChotuPreferences();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  const [submissions, setSubmissions] = useState<DateSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<DateSubmission | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dataSource, setDataSource] = useState<'supabase' | 'local'>('local');
  const [activeDashboardTab, setActiveDashboardTab] = useState<'wishlists' | 'handbook'>('wishlists');

  // Check auth session
  useEffect(() => {
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setIsAuthenticated(true);
          loadSubmissions();
        }
      });
    } else {
      // In dev mode without Supabase, check local session storage
      const devAuth = sessionStorage.getItem('owner_dev_auth');
      if (devAuth === 'true') {
        setIsAuthenticated(true);
        loadSubmissions();
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: authEmail,
        password: authPassword,
      });

      if (error) {
        setAuthError(error.message);
      } else if (data.session) {
        setIsAuthenticated(true);
        loadSubmissions();
      }
    } else {
      // Dev access when backend credentials are not set up yet
      if (authPassword === 'chotu123' || authPassword === 'pookie') {
        sessionStorage.setItem('owner_dev_auth', 'true');
        setIsAuthenticated(true);
        loadSubmissions();
      } else {
        setAuthError('Incorrect password! (Dev fallback password is: chotu123)');
      }
    }
  };

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    sessionStorage.removeItem('owner_dev_auth');
    setIsAuthenticated(false);
  };

  const loadSubmissions = async () => {
    setLoading(true);
    const res = await fetchOwnerSubmissions();
    setSubmissions(res.submissions);
    setDataSource(res.source);
    setLoading(false);
  };

  const handleStatusChange = async (id: string, newStatus: SubmissionStatus) => {
    const res = await updateSubmissionStatus(id, newStatus);
    if (res.success) {
      setSubmissions((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, submission_status: newStatus } : item
        )
      );
      if (selectedSubmission?.id === id) {
        setSelectedSubmission((prev) =>
          prev ? { ...prev, submission_status: newStatus } : null
        );
      }
    }
  };

  const filteredSubmissions = submissions.filter((sub) => {
    if (statusFilter === 'all') return true;
    return sub.submission_status === statusFilter;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-24">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-8 relative">
        <WashiTape color="lavender" rotate="-rotate-1" />

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#49333A] text-white text-xs font-bold uppercase tracking-wider mb-2">
          <Lock className="w-3.5 h-3.5" />
          <span>Sonu's Command Center</span>
        </div>

        <h1 className="font-handwritten text-4xl sm:text-5xl font-bold text-[#49333A] mb-1 leading-tight">
          Sonu's Secret Date Dashboard
        </h1>

        <p className="text-sm text-[#49333A]/80 font-medium">
          Chotu's wishes, moods, and dream dates waiting for Sonu to execute.
        </p>
      </div>

      {/* LOGIN MODAL / FORM IF NOT AUTHENTICATED */}
      {!isAuthenticated ? (
        <div className="max-w-md mx-auto p-6 sm:p-8 bg-white border-2 border-[#49333A]/20 rounded-3xl shadow-xl text-center">
          <div className="w-12 h-12 rounded-full bg-[#FFE0E6] text-[#E94F64] flex items-center justify-center mx-auto mb-4 border border-[#FFB7C5]">
            <Lock className="w-6 h-6" />
          </div>

          <h2 className="font-handwritten text-3xl font-bold text-[#49333A] mb-1">
            Sonu Access Only
          </h2>
          <p className="text-xs text-[#49333A]/70 mb-5">
            Authenticate to review Chotu's private date requests and update your planning status.
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            {isSupabaseConfigured && (
              <div>
                <label className="block text-xs font-bold text-[#49333A]/70 uppercase mb-1">
                  Owner Email
                </label>
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="your-email@example.com"
                  className="w-full p-2.5 bg-[#FFF8F0] border border-[#49333A]/20 rounded-xl text-xs text-[#49333A] focus:outline-none focus:border-[#E94F64]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#49333A]/70 uppercase mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full p-2.5 bg-[#FFF8F0] border border-[#49333A]/20 rounded-xl text-xs text-[#49333A] focus:outline-none focus:border-[#E94F64]"
              />
            </div>

            {authError && (
              <p className="text-xs text-[#DC2626] font-semibold bg-[#FEE2E2] p-2 rounded-lg">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full btn-pookie flex items-center justify-center gap-2 py-3 text-sm cursor-pointer shadow-md"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Secret Dashboard</span>
            </button>
          </form>

          {!isSupabaseConfigured && (
            <div className="mt-5 p-3 bg-[#FFF0B8]/40 rounded-xl border border-[#FDE68A] text-left text-[11px] text-[#92400E]">
              <p className="font-bold mb-0.5">ℹ️ Local Testing Notice:</p>
              <p>
                Supabase credentials not yet detected in `.env`. You can unlock immediately using the local passcode <span className="font-bold underline">chotu123</span> to review local wishlist test drafts.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* AUTHENTICATED DASHBOARD CONTENT */
        <div className="space-y-6">
          {/* Main Dashboard Mode Switcher */}
          <div className="flex items-center gap-2 max-w-md mx-auto p-1.5 bg-white rounded-2xl border-2 border-[#49333A]/10 shadow-xs">
            <button
              type="button"
              onClick={() => setActiveDashboardTab('wishlists')}
              className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeDashboardTab === 'wishlists'
                  ? 'bg-gradient-to-r from-[#FF758F] to-[#E94F64] text-white shadow-xs'
                  : 'text-[#49333A]/70 hover:text-[#49333A] hover:bg-[#FFE0E6]/40'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Date Wishlists ({submissions.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveDashboardTab('handbook')}
              className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeDashboardTab === 'handbook'
                  ? 'bg-gradient-to-r from-[#FF758F] to-[#E94F64] text-white shadow-xs'
                  : 'text-[#49333A]/70 hover:text-[#49333A] hover:bg-[#FFE0E6]/40'
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Chotu's Handbook 👑</span>
            </button>
          </div>

          {activeDashboardTab === 'handbook' ? (
            /* CHOTU'S FAVORITES HANDBOOK PROFILE VIEW */
            <div className="space-y-6">
              {/* Handbook Header Card */}
              <div className="p-6 bg-gradient-to-br from-white via-[#FFF5F7] to-[#FFEBF0] rounded-3xl border-2 border-[#E94F64]/30 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#FFE0E6] via-[#FFF0F5] to-white border border-[#FFB7C5] flex items-center justify-center text-[#E94F64] shadow-sm shrink-0">
                    <Crown className="w-9 h-9 stroke-[1.8]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-display text-2xl font-black text-[#3D2730]">
                        Chotu's Official Favorites Handbook
                      </h2>
                      <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#FFE0E6] text-[#E94F64] border border-[#FFB7C5]/60 shadow-2xs">
                        👑 Queen's Profile
                      </span>
                    </div>
                    <p className="text-xs text-[#3D2730]/75 mt-1">
                      Last Updated by Chotu: <span className="font-bold text-[#E94F64]">{new Date(preferences.updatedAt || Date.now()).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
                  <a
                    href={`https://api.whatsapp.com/send?phone=917070362117&text=${encodeURIComponent("Hey Chotu 💕 Sonu just reviewed your Favorites Handbook! Getting ready to pamper you 🥰")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pookie py-2 px-4 text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>WhatsApp Chotu</span>
                  </a>

                  <Link
                    to="/favorites"
                    className="py-2 px-3.5 rounded-full bg-white border border-[#3D2730]/15 hover:border-[#FFB7C5] text-xs font-bold text-[#3D2730] inline-flex items-center gap-1.5 shadow-2xs hover:bg-[#FFE0E6]/30 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#E94F64]" />
                    <span>Open Form</span>
                  </Link>
                </div>
              </div>

              {/* Handbook Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* 1. Favorite Places */}
                <div className="p-5 bg-white rounded-3xl border-2 border-[#49333A]/10 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[#E94F64] mb-3">
                      <MapPin className="w-5 h-5" />
                      <h3 className="font-display text-lg font-bold text-[#3D2730]">
                        Favorite Places & Setting
                      </h3>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <span className="font-bold text-[#3D2730]/70 uppercase text-[10px] block mb-1.5">
                          Top Jamshedpur Spots:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {(preferences.favoritePlacesInJsr || []).map((p, i) => (
                            <span key={i} className="px-2.5 py-1 rounded-full bg-[#FFE0E6] text-[#E94F64] font-bold text-[11px] border border-[#FFB7C5]/60 shadow-2xs">
                              📍 {p}
                            </span>
                          ))}
                          {preferences.customFavoritePlace && (
                            <span className="px-2.5 py-1 rounded-full bg-[#FFF0B8] text-[#92400E] font-bold text-[11px] border border-[#FDE68A] shadow-2xs">
                              ⭐ {preferences.customFavoritePlace}
                            </span>
                          )}
                        </div>
                      </div>

                      <div>
                        <span className="font-bold text-[#3D2730]/70 uppercase text-[10px] block mb-1.5">
                          Ideal Date Setting:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {(preferences.idealDateSetting || []).map((s, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-lg bg-[#FFF8F0] text-[#3D2730] font-semibold text-[11px] border border-[#3D2730]/10">
                              ✨ {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#3D2730]/8 flex flex-col gap-1 text-[11px]">
                        <p><span className="font-bold text-[#3D2730]/70">Preferred Timing:</span> <span className="font-bold text-[#E94F64]">{preferences.favoriteDateTiming}</span></p>
                        {preferences.dreamGetawayDestination && (
                          <p><span className="font-bold text-[#3D2730]/70">Dream Getaway:</span> <span className="font-bold">{preferences.dreamGetawayDestination}</span></p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Favorite Food & Cravings */}
                <div className="p-5 bg-white rounded-3xl border-2 border-[#49333A]/10 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[#E94F64] mb-3">
                      <UtensilsCrossed className="w-5 h-5" />
                      <h3 className="font-display text-lg font-bold text-[#3D2730]">
                        Food, Cravings & Drinks
                      </h3>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <span className="font-bold text-[#3D2730]/70 uppercase text-[10px] block mb-1.5">
                          Street Food Cravings:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {(preferences.favoriteStreetFoods || []).map((f, i) => (
                            <span key={i} className="px-2.5 py-1 rounded-full bg-[#FFF0F5] text-[#E94F64] font-bold text-[11px] border border-[#FFB7C5]/60 shadow-2xs">
                              😋 {f}
                            </span>
                          ))}
                          {preferences.customStreetFood && (
                            <span className="px-2.5 py-1 rounded-full bg-[#FFF0B8] text-[#92400E] font-bold text-[11px] border border-[#FDE68A] shadow-2xs">
                              ⭐ {preferences.customStreetFood}
                            </span>
                          )}
                        </div>
                      </div>

                      <div>
                        <span className="font-bold text-[#3D2730]/70 uppercase text-[10px] block mb-1.5">
                          Favorite Desserts & Drinks:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {(preferences.favoriteDesserts || []).map((d, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-lg bg-[#FFF8F0] text-[#3D2730] font-semibold text-[11px] border border-[#3D2730]/10">
                              🍰 {d}
                            </span>
                          ))}
                          {(preferences.favoriteDrinks || []).map((dr, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-lg bg-[#FFF8F0] text-[#3D2730] font-semibold text-[11px] border border-[#3D2730]/10">
                              🥤 {dr}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#3D2730]/8 flex flex-col gap-1 text-[11px]">
                        {preferences.comfortFoodWhenStressed && (
                          <p><span className="font-bold text-[#3D2730]/70">Comfort Food:</span> <span className="font-bold text-[#E94F64]">{preferences.comfortFoodWhenStressed}</span></p>
                        )}
                        {preferences.favoriteRestaurantOrCuisine && (
                          <p><span className="font-bold text-[#3D2730]/70">Fav Cuisine:</span> <span className="font-bold">{preferences.favoriteRestaurantOrCuisine}</span></p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Favorite Activities with Sonu */}
                <div className="p-5 bg-white rounded-3xl border-2 border-[#49333A]/10 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[#E94F64] mb-3">
                      <Navigation className="w-5 h-5" />
                      <h3 className="font-display text-lg font-bold text-[#3D2730]">
                        Activities & Ride with Sonu
                      </h3>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <span className="font-bold text-[#3D2730]/70 uppercase text-[10px] block mb-1">
                          Preferred Travel Mode with Sonu:
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#FF758F] to-[#E94F64] text-white font-extrabold text-xs shadow-xs">
                          🛵 {preferences.preferredTravelMode?.toUpperCase()} WITH SONU
                        </span>
                      </div>

                      <div>
                        <span className="font-bold text-[#3D2730]/70 uppercase text-[10px] block mb-1.5">
                          Fun Activities She Loves:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {(preferences.favoriteFunActivities || []).map((a, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-lg bg-[#FFF8F0] text-[#3D2730] font-semibold text-[11px] border border-[#3D2730]/10">
                              🎮 {a}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="font-bold text-[#3D2730]/70 uppercase text-[10px] block mb-1.5">
                          Favorite Cozy Moments:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {(preferences.favoriteCozyMoments || []).map((c, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-lg bg-[#FFE0E6]/50 text-[#E94F64] font-semibold text-[11px] border border-[#FFB7C5]/40">
                              🧸 {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      {preferences.festiveDurgaPujaPreferences && preferences.festiveDurgaPujaPreferences.length > 0 && (
                        <div>
                          <span className="font-bold text-[#3D2730]/70 uppercase text-[10px] block mb-1.5">
                            Durga Puja Vibes:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {preferences.festiveDurgaPujaPreferences.map((pu, i) => (
                              <span key={i} className="px-2 py-0.5 rounded-md bg-[#FFF0B8]/60 text-[#92400E] font-bold text-[10px] border border-[#FDE68A]">
                                🌸 {pu}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 4. Pampering & Mood */}
                <div className="p-5 bg-white rounded-3xl border-2 border-[#49333A]/10 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[#E94F64] mb-3">
                      <Smile className="w-5 h-5" />
                      <h3 className="font-display text-lg font-bold text-[#3D2730]">
                        Pampering & Mood Boosters
                      </h3>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <span className="font-bold text-[#3D2730]/70 uppercase text-[10px] block mb-1.5">
                          What Cheers Her Up When Upset:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {(preferences.whatCheersChotuUp || []).map((w, i) => (
                            <span key={i} className="px-2.5 py-1 rounded-full bg-[#DDF3E4] text-[#065F46] font-bold text-[11px] border border-[#BBF7D0] shadow-2xs">
                              💖 {w}
                            </span>
                          ))}
                        </div>
                      </div>

                      {preferences.carRideSongsOrArtists && (
                        <div>
                          <span className="font-bold text-[#3D2730]/70 uppercase text-[10px] block mb-1">
                            Car Ride Songs / Playlist:
                          </span>
                          <p className="p-2.5 bg-[#FFF8F0] rounded-xl border border-[#3D2730]/10 font-medium text-[#3D2730]">
                            🎵 {preferences.carRideSongsOrArtists}
                          </p>
                        </div>
                      )}

                      {preferences.littleThingsThatMeltHeart && (
                        <div>
                          <span className="font-bold text-[#3D2730]/70 uppercase text-[10px] block mb-1">
                            Things That Melt Her Heart:
                          </span>
                          <p className="p-2.5 bg-[#FFE0E6]/30 rounded-xl border border-[#FFB7C5]/40 italic text-[#E94F64]">
                            🥰 "{preferences.littleThingsThatMeltHeart}"
                          </p>
                        </div>
                      )}

                      <div>
                        <span className="font-bold text-[#3D2730]/70 uppercase text-[10px] block mb-1.5">
                          Favorite Nicknames:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {(preferences.favoriteNicknames || []).map((n, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-full bg-[#FFF0F5] text-[#E94F64] font-bold text-[10px] border border-[#FFB7C5]/50">
                              💕 {n}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Secret Wish & Note for Sonu */}
                <div className="p-5 bg-gradient-to-br from-[#FFF5F7] to-white rounded-3xl border-2 border-[#E94F64]/30 shadow-sm flex flex-col justify-between md:col-span-2">
                  <div>
                    <div className="flex items-center gap-2 text-[#E94F64] mb-3">
                      <Sparkles className="w-5 h-5" />
                      <h3 className="font-display text-lg font-bold text-[#3D2730]">
                        Chotu's Secret Wishes & Note to Sonu
                      </h3>
                    </div>

                    <div className="space-y-3.5 text-xs">
                      {preferences.topDatesToPlanNext && (
                        <div>
                          <span className="font-bold text-[#3D2730]/70 uppercase text-[10px] block mb-1">
                            Top Dates She Wants Next:
                          </span>
                          <p className="p-3 bg-white rounded-xl border border-[#3D2730]/10 font-bold text-[#3D2730]">
                            ✨ {preferences.topDatesToPlanNext}
                          </p>
                        </div>
                      )}

                      {preferences.secretWish && (
                        <div>
                          <span className="font-bold text-[#E94F64] uppercase text-[10px] block mb-1">
                            Her Secret Wish:
                          </span>
                          <p className="p-3 bg-[#FFE0E6]/40 rounded-xl border border-[#FFB7C5]/60 font-bold text-[#E94F64]">
                            🔒 "{preferences.secretWish}"
                          </p>
                        </div>
                      )}

                      {preferences.specialNoteForSonu && (
                        <div>
                          <span className="font-bold text-[#3D2730]/70 uppercase text-[10px] block mb-1">
                            Special Note From Chotu:
                          </span>
                          <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-[#FFB7C5] shadow-2xs">
                            <p className="font-handwritten text-2xl text-[#3D2730] italic leading-relaxed">
                              "{preferences.specialNoteForSonu}"
                            </p>
                            <p className="text-[11px] text-right font-bold text-[#E94F64] mt-2">
                              — Chotu 💕
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* DATE WISHLISTS LIST VIEW */
            <>
              {/* Top Bar with Status Counts and Logout */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-2xl border-2 border-[#49333A]/10 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#49333A]/70 uppercase">
                    Filter Status:
                  </span>
                  {(['all', 'new', 'reviewed', 'planning', 'completed'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1 rounded-full text-xs font-bold capitalize transition-all cursor-pointer border ${
                        statusFilter === st
                          ? 'bg-[#E94F64] text-white border-[#E94F64]'
                          : 'bg-[#FFF8F0] text-[#49333A] border-[#49333A]/10 hover:border-[#FFB7C5]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    dataSource === 'supabase'
                      ? 'bg-[#DDF3E4] text-[#065F46] border-[#BBF7D0]'
                      : 'bg-[#FFF0B8] text-[#92400E] border-[#FDE68A]'
                  }`}>
                    {dataSource === 'supabase' ? '● Supabase Cloud' : '● Local Storage'}
                  </span>
                  <button
                    onClick={loadSubmissions}
                    disabled={loading}
                    className="p-2 rounded-full border border-[#49333A]/20 bg-[#FFF8F0] hover:bg-[#FFE0E6] transition-colors cursor-pointer"
                    title="Refresh Submissions"
                  >
                    <RefreshCw className={`w-4 h-4 text-[#49333A] ${loading ? 'animate-spin' : ''}`} />
                  </button>

                  <button
                    onClick={handleLogout}
                    className="px-3.5 py-1.5 rounded-full border border-[#49333A]/20 text-xs font-bold text-[#49333A] hover:bg-[#FFE0E6] cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              </div>

          {/* Submissions List */}
          {filteredSubmissions.length === 0 ? (
            <div className="p-12 bg-white rounded-3xl border-2 border-dashed border-[#49333A]/20 text-center">
              <Heart className="w-12 h-12 text-[#FFB7C5] mx-auto mb-3" />
              <h3 className="font-handwritten text-3xl font-bold text-[#49333A] mb-1">
                No wishlists found yet! 💌
              </h3>
              <p className="text-xs text-[#49333A]/70 max-w-sm mx-auto">
                Once Chotu completes her date choices and sends her wishlist, it will show up here immediately with all her choices.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredSubmissions.map((sub) => {
                const subDate = new Date(sub.created_at).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <div
                    key={sub.id}
                    className="p-5 bg-white rounded-2xl border-2 border-[#49333A]/10 hover:border-[#FFB7C5] shadow-sm flex flex-col justify-between transition-all"
                  >
                    <div>
                      {/* Top status & date */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold text-[#49333A]/60 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{subDate}</span>
                        </span>

                        <select
                          value={sub.submission_status}
                          onChange={(e) =>
                            handleStatusChange(sub.id, e.target.value as SubmissionStatus)
                          }
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border focus:outline-none cursor-pointer ${
                            sub.submission_status === 'new'
                              ? 'bg-[#FFE0E6] text-[#E94F64] border-[#FFB7C5]'
                              : sub.submission_status === 'planning'
                              ? 'bg-[#FFF0B8] text-[#92400E] border-[#FDE68A]'
                              : sub.submission_status === 'completed'
                              ? 'bg-[#DDF3E4] text-[#065F46] border-[#BBF7D0]'
                              : 'bg-[#E7DFFF] text-[#6B21A8] border-[#DDD6FE]'
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="planning">Planning</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>

                      {/* Vibe Title */}
                      <div className="mb-2">
                        <span className="text-xs font-bold text-[#E94F64] uppercase tracking-wider">
                          Vibe:
                        </span>
                        <h4 className="font-handwritten text-2xl font-bold text-[#49333A] leading-tight">
                          {sub.vibe_title}
                        </h4>
                      </div>

                      {/* Customization Details */}
                      <div className="text-xs text-[#49333A]/85 space-y-1 mb-3 bg-[#FFF8F0] p-2.5 rounded-xl border border-[#49333A]/10">
                        {sub.customization.vehicleChoice && (
                          <p>
                            <span className="font-semibold">Ride:</span> {sub.customization.vehicleChoice.toUpperCase()}
                          </p>
                        )}
                        {sub.customization.chillAudience && (
                          <p>
                            <span className="font-semibold">Session:</span>{' '}
                            {sub.customization.chillAudience === 'just-us' ? 'Just Sonu & Chotu' : 'With Siblings'}
                          </p>
                        )}
                        {sub.customization.pitstopChoice && sub.customization.pitstopChoice !== 'none' && (
                          <p>
                            <span className="font-semibold">Pitstop:</span> {sub.customization.pitstopChoice}
                          </p>
                        )}
                        {sub.customization.selectedSubChoiceIds && sub.customization.selectedSubChoiceIds.length > 0 && (
                          <p className="truncate">
                            <span className="font-semibold">Choices:</span> {sub.customization.selectedSubChoiceIds.join(', ')}
                          </p>
                        )}
                        <p>
                          <span className="font-semibold">Time:</span> {sub.preferred_timing}
                        </p>
                      </div>

                      {/* Special Note Snippet */}
                      {sub.special_note && (
                        <div className="p-2.5 bg-[#FFE0E6]/30 rounded-xl border border-[#FFB7C5]/40 text-xs text-[#49333A] italic mb-3">
                          "{sub.special_note}"
                        </div>
                      )}
                    </div>

                    {/* View Details Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedSubmission(sub)}
                      className="w-full py-2 px-3 rounded-full bg-[#FFF8F0] hover:bg-[#FFE0E6] border border-[#49333A]/15 text-xs font-bold text-[#49333A] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#E94F64]" />
                      <span>Inspect Chotu's Full Wish</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* DETAIL MODAL */}
          {selectedSubmission && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
              <div className="bg-[#FFF8F0] border-2 border-[#49333A]/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto relative">
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white border border-[#49333A]/20 flex items-center justify-center font-bold text-[#49333A] hover:bg-[#FFE0E6] cursor-pointer"
                >
                  ✕
                </button>

                <div className="mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E94F64] bg-[#FFE0E6] px-3 py-1 rounded-full border border-[#FFB7C5]/40 inline-block mb-1">
                    Date Request Details
                  </span>
                  <h3 className="font-handwritten text-3xl font-bold text-[#49333A]">
                    {selectedSubmission.vibe_title}
                  </h3>
                  <p className="text-xs text-[#49333A]/60">
                    ID: {selectedSubmission.id} • Submitted at {selectedSubmission.created_at}
                  </p>
                </div>

                {/* Sub details */}
                <div className="p-4 bg-white rounded-2xl border border-[#49333A]/10 text-xs space-y-2 mb-4">
                  {selectedSubmission.customization.vehicleChoice && (
                    <p>
                      <span className="font-bold text-[#49333A]/70">Selected Vehicle:</span>{' '}
                      <span className="font-bold text-[#E94F64] capitalize">{selectedSubmission.customization.vehicleChoice} 🛵</span>
                    </p>
                  )}
                  {selectedSubmission.customization.chillAudience && (
                    <p>
                      <span className="font-bold text-[#49333A]/70">Chill Circle:</span>{' '}
                      <span className="font-bold text-[#6D28D9]">
                        {selectedSubmission.customization.chillAudience === 'just-us' ? 'Just Me & You 🥂' : 'With All the Siblings 🎉'}
                      </span>
                    </p>
                  )}
                  {selectedSubmission.customization.selectedSubChoiceIds && selectedSubmission.customization.selectedSubChoiceIds.length > 0 && (
                    <div>
                      <span className="font-bold text-[#49333A]/70 block mb-1">Specific Choices:</span>
                      <div className="flex flex-wrap gap-1">
                        {selectedSubmission.customization.selectedSubChoiceIds.map((sc, i) => (
                          <span key={i} className="bg-[#FFF8F0] px-2 py-0.5 rounded-md border text-[11px] font-bold">
                            ✓ {sc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <p>
                    <span className="font-bold text-[#49333A]/70">Timing:</span>{' '}
                    <span className="font-bold capitalize">{selectedSubmission.preferred_timing}</span>
                  </p>
                  {selectedSubmission.preferred_date && (
                    <p>
                      <span className="font-bold text-[#49333A]/70">Date:</span> {selectedSubmission.preferred_date}
                    </p>
                  )}
                </div>

                {/* Special Note Highlight */}
                {selectedSubmission.special_note && (
                  <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-[#E94F64]/40 mb-4">
                    <p className="text-xs font-bold uppercase text-[#E94F64] mb-1">
                      Chotu's Personal Request:
                    </p>
                    <p className="font-handwritten text-2xl text-[#49333A] italic">
                      "{selectedSubmission.special_note}"
                    </p>
                  </div>
                )}

                {/* Status Update Dropdown inside modal */}
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#49333A]/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#49333A]">Status:</span>
                    <select
                      value={selectedSubmission.submission_status}
                      onChange={(e) =>
                        handleStatusChange(
                          selectedSubmission.id,
                          e.target.value as SubmissionStatus
                        )
                      }
                      className="text-xs font-bold p-2 bg-white rounded-xl border border-[#49333A]/20"
                    >
                      <option value="new">New</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="planning">Planning</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setSelectedSubmission(null)}
                    className="py-2 px-5 rounded-full bg-white border border-[#49333A]/20 font-bold text-xs"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
        </div>
      )}
    </div>
  );
};
