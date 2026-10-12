import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  FileHeart,
  Send,
  Sparkles,
  Copy,
  Check,
  MessageSquare,
  AlertCircle,
  ArrowLeft,
  Image as ImageIcon,
  Clock,
  Heart,
  Camera,
  Maximize2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDatePlanner } from '../context/DatePlannerContext';
import { DATE_VIBES } from '../data/dateVibes';
import { submitDateWishlist } from '../services/supabase';
import { ROMANTIC_CONFIG } from '../config/romanticMessages';
import { WashiTape } from '../components/common/WashiTape';
import { ImageLightboxModal } from '../components/common/ImageLightboxModal';
import {
  DoodleHeart,
  getVibeDoodleIcon,
  DoodleMapPin,
  getPitstopDoodleIcon,
} from '../components/common/CuteDoodles';
import { MobileContainer } from '../components/common/MobileContainer';

import { sendDateEmailNotification } from '../services/email';

export const ScreenFiveWishlist: React.FC = () => {
  const {
    selectedVibeId,
    customization,
    preferredTiming,
    preferredDate,
    specialNote,
    submissionSuccessId,
    setSubmissionSuccessId,
  } = useDatePlanner();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [showRealPhoto, setShowRealPhoto] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; caption: string } | null>(null);

  const chosenVibe = DATE_VIBES.find((v) => v.id === selectedVibeId) || DATE_VIBES[0];
  const chosenSpot = chosenVibe.jamshedpurSpots?.find((s) => s.id === customization.selectedSpotId);

  // Sub-choices labels
  const selectedSubChoiceLabels = (chosenVibe.subChoices || [])
    .filter((sc) => customization.selectedSubChoiceIds.includes(sc.id))
    .map((sc) => sc.label);

  const getPitstopLabel = (choiceId?: string) => {
    switch (choiceId) {
      case 'chai-maggi':
        return 'Scenic Tapri Chai & Maggi';
      case 'cold-coffee-shakes':
        return 'Thick Cold Coffee & Shakes';
      case 'icecream-waffles':
        return 'Artisan Gelato & Waffles';
      case 'kathi-shawarma':
        return 'Crispy Kathi Roll / Shawarma';
      case 'pastries-bakery':
        return 'Fresh Pastries & Cheesecakes';
      case 'puchka-chaat':
        return 'Evening Puchka & Chaat';
      case 'cocktails-drinks':
        return 'Cocktails / Mocktails & Starters';
      default:
        return null;
    }
  };

  const getPujaCompanionLabel = (companion?: string) => {
    switch (companion) {
      case 'just-us':
        return 'Just Sonu & Chotu 💕';
      case 'with-siblings':
        return 'With Siblings (Masti & Chaos) 🎉';
      case 'with-family':
        return 'With Family (Blessings & Love) 🌸';
      default:
        return 'Just Sonu & Chotu 💕';
    }
  };

  const pitstopLabel = getPitstopLabel(customization.pitstopChoice);

  const handleSubmit = async () => {
    if (isSubmitting || submissionSuccessId) return;
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const result = await submitDateWishlist({
        selected_vibe_id: chosenVibe.id,
        vibe_title: chosenVibe.title,
        customization,
        preferred_date: preferredDate || 'Upcoming Date',
        preferred_timing: preferredTiming,
        special_note: specialNote,
      });

      // Dispatch romantic email notification to Sonu via Gmail SMTP
      try {
        await sendDateEmailNotification({
          vibe_title: chosenVibe.title,
          hindi_title: chosenVibe.hindiTitle,
          love_slogan: chosenVibe.loveSlogan,
          preferred_timing: preferredTiming,
          preferred_date: preferredDate || 'Upcoming Date',
          special_note: specialNote,
          vehicle_choice: customization.vehicleChoice,
          chill_audience: customization.chillAudience,
          puja_companion: chosenVibe.id === 'durga-puja' ? getPujaCompanionLabel(customization.pujaCompanion) : undefined,
          sub_choices: selectedSubChoiceLabels,
          pitstop_treat: pitstopLabel || undefined,
          spot_name: chosenSpot?.name,
          spot_locality: chosenSpot?.locality,
          maps_url: chosenSpot ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(chosenSpot.mapsQuery)}` : undefined,
          submitted_at: new Date().toLocaleString(),
        });
      } catch (emailErr) {
        console.warn('Email notification dispatch note:', emailErr);
      }

      if (result.success) {
        setSubmissionSuccessId(result.id);
        setIsOfflineMode(result.isOfflineBackup);

        confetti({
          particleCount: 70,
          spread: 75,
          origin: { y: 0.55 },
          colors: ['#FFB7C5', '#E94F64', '#FFE0E6', '#FFF0B8', '#E7DFFF'],
        });
      } else {
        setSubmissionError(
          result.error ||
            'Saved securely on device! Ready to send on WhatsApp to Sonu.'
        );
      }
    } catch (err: any) {
      setSubmissionError(
        err.message || 'An unexpected error occurred. You can still WhatsApp it directly to Sonu!'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // WhatsApp formatted sweet message
  const generateWhatsAppMessage = () => {
    let subDetails = '';
    if (chosenVibe.id === 'road-ride' && customization.vehicleChoice) {
      subDetails += `\nRide: ${customization.vehicleChoice.toUpperCase()}`;
    }
    if (chosenVibe.id === 'chill-session' && customization.chillAudience) {
      subDetails += `\nSession Circle: ${customization.chillAudience === 'just-us' ? 'Just Sonu & Chotu' : 'With All the Siblings'}`;
    }
    if (chosenVibe.id === 'durga-puja' && customization.pujaCompanion) {
      subDetails += `\nPandal Hopping Gang: ${getPujaCompanionLabel(customization.pujaCompanion)}`;
    }
    if (selectedSubChoiceLabels.length > 0) {
      subDetails += `\nSub-choices: ${selectedSubChoiceLabels.join(', ')}`;
    }
    if (pitstopLabel) {
      subDetails += `\nPitstop Treat: ${pitstopLabel}`;
    }
    if (chosenSpot) {
      subDetails += `\nJamshedpur Spot: ${chosenSpot.name} (${chosenSpot.locality})`;
    }

    const text = `Hey Sonu! 💌 Chotu has picked her Date Vibe:

💖 Vibe: ${chosenVibe.title} (${chosenVibe.hindiTitle})${subDetails}
⏰ Timing: ${preferredTiming}${preferredDate ? ` (${preferredDate})` : ''}
💌 Note from Chotu: "${specialNote || 'Surprise me with love!'}"

Now do your Sonu duties properly and let's make this date happen! 💕`;

    return encodeURIComponent(text);
  };

  const handleCopySummary = () => {
    const rawText = decodeURIComponent(generateWhatsAppMessage());
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleOpenWhatsApp = () => {
    const encoded = generateWhatsAppMessage();
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <MobileContainer className="px-4 py-6 pb-24">
      {/* Header */}
      <div className="text-center max-w-sm mx-auto mb-6 relative">
        <WashiTape color="pink" rotate="rotate-1" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE0E6] text-[#E94F64] border border-[#FFB7C5] text-[11px] font-bold uppercase tracking-wider mb-2">
          <FileHeart className="w-3.5 h-3.5" />
          <span>Final Step: Love Wishlist</span>
        </div>

        <h1 className="font-handwritten text-4xl font-bold text-[#49333A] mb-1 leading-tight">
          {ROMANTIC_CONFIG.wishlistScreen.heading}
        </h1>

        <p className="text-xs text-[#49333A]/80 font-medium">
          Review your dream date and send it straight to Sonu!
        </p>
      </div>

      {/* SUCCESS BANNER WHEN DELIVERED */}
      {submissionSuccessId && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-5 bg-gradient-to-tr from-[#FFE0E6] to-[#FFF8F0] border-2 border-[#E94F64] rounded-3xl shadow-lg text-center mb-6"
        >
          <div className="flex items-center justify-center gap-1.5 text-[#E94F64] mb-1">
            <Sparkles className="w-5 h-5 animate-spin" />
            <h3 className="font-handwritten text-3xl font-bold text-[#E94F64]">
              {ROMANTIC_CONFIG.wishlistScreen.successHeading}
            </h3>
          </div>

          <p className="font-handwritten text-xl text-[#49333A] mb-1">
            {ROMANTIC_CONFIG.wishlistScreen.successSubheading}
          </p>
          <p className="text-xs font-semibold text-[#49333A]/80 mb-3">
            {ROMANTIC_CONFIG.wishlistScreen.successNote}
          </p>

          <p className="text-[11px] text-[#047857] bg-[#D1FAE5] p-2 rounded-xl border border-[#A7F3D0] mb-2 font-semibold">
            Notification email sent to Sonu! Check your inbox or send on WhatsApp.
          </p>

          {isOfflineMode && (
            <p className="text-[11px] text-[#92400E] bg-[#FFF0B8]/60 p-2 rounded-xl border border-[#FDE68A] mb-3">
              Stored safely on your phone and ready to send directly on WhatsApp!
            </p>
          )}

          <div className="flex flex-col gap-2">
            <button
              onClick={handleOpenWhatsApp}
              className="btn-pookie flex items-center justify-center gap-2 py-3 text-xs cursor-pointer shadow-md"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>{ROMANTIC_CONFIG.wishlistScreen.whatsAppButton}</span>
            </button>

            <button
              onClick={handleCopySummary}
              className="btn-pookie-secondary flex items-center justify-center gap-2 py-2 text-xs cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#059669]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : ROMANTIC_CONFIG.wishlistScreen.copySummaryButton}</span>
            </button>

            <Link
              to="/memories"
              className="btn-pookie-secondary flex items-center justify-center gap-2 py-2 text-xs cursor-pointer text-center bg-white"
            >
              <Camera className="w-3.5 h-3.5 text-[#E94F64]" />
              <span>View Our Love Feed 📸</span>
            </Link>
          </div>
        </motion.div>
      )}

      {submissionError && (
        <div className="p-3 bg-[#FEE2E2] border border-[#FCA5A5] rounded-2xl text-xs text-[#DC2626] mb-5 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <p>{submissionError}</p>
        </div>
      )}

      {/* THE ROMANTIC POSTCARD */}
      <div className="relative scrapbook-card p-5 bg-white border-2 border-[#49333A]/20 shadow-xl rounded-3xl overflow-hidden mb-6">
        <WashiTape color="pink" rotate="-rotate-1" />

        {/* Heading Row with Vintage Stamp (Clean Flow Layout - No Absolute Collision) */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#E94F64] bg-[#FFE0E6] px-2.5 py-0.5 rounded-full border border-[#FFB7C5]/40 inline-flex items-center gap-1 mb-1.5">
              <Heart className="w-3 h-3 fill-[#E94F64]" />
              <span>For Chotu</span>
            </span>
            <div className="flex items-center gap-2.5 mt-0.5">
              <div className="w-10 h-10 rounded-xl bg-[#FFF8F0] border border-[#49333A]/10 flex items-center justify-center shrink-0">
                {getVibeDoodleIcon(chosenVibe.id, 'w-6 h-6')}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-handwritten text-3xl font-bold text-[#49333A] leading-tight">
                  {chosenVibe.title}
                </h2>
                <p className="text-xs font-semibold text-[#E94F64]">
                  {chosenVibe.hindiTitle}
                </p>
              </div>
            </div>
          </div>

          {/* Vintage Postcard Stamp */}
          <div className="w-12 h-16 stamp-border bg-[#FFF8F0] p-1 flex flex-col items-center justify-between text-center select-none shrink-0 shadow-2xs">
            <span className="text-[7px] font-bold text-[#E94F64]">JSR</span>
            <DoodleHeart className="w-4 h-4" color="#E94F64" />
            <span className="text-[6px] font-bold text-[#49333A]/60">LOVE MAIL</span>
          </div>
        </div>

        {/* Love Slogan */}
        <div className="p-3 bg-[#FFF8F0] rounded-xl border border-dashed border-[#49333A]/15 mb-3.5">
          <p className="text-xs text-[#E94F64] italic font-semibold leading-relaxed">
            {chosenVibe.loveSlogan}
          </p>
        </div>

        {/* Mini Keepsake Photo in Postcard (Uncropped with Lightbox) */}
        <div className="mb-3.5 p-2 bg-[#FFF8F0] rounded-2xl border border-[#49333A]/10 flex items-center gap-3">
          <div
            onClick={() => {
              const src =
                chosenVibe.id === 'durga-puja'
                  ? showRealPhoto
                    ? '/photos/chotu_saree.jpg'
                    : '/doodles/doodle_durga_puja_couple.jpg'
                  : showRealPhoto
                  ? '/photos/sonu_chotu_sunflower.jpg'
                  : '/doodles/doodle_sunflower_date.jpg';
              setLightboxImage({
                url: src,
                title: chosenVibe.id === 'durga-puja' ? 'Kasidih Durga Puja Pandal' : 'Sonu & Chotu Keepsake',
                caption:
                  chosenVibe.id === 'durga-puja'
                    ? 'Dressed up in festive wear and celebrating Puja together.'
                    : 'Every day with you is my favorite memory in Jamshedpur 💕',
              });
            }}
            className="relative w-20 h-20 rounded-xl overflow-hidden border border-[#49333A]/15 shrink-0 bg-neutral-900 shadow-xs cursor-pointer flex items-center justify-center group"
            title="Click to view full uncropped image"
          >
            {/* Ambient blurred backdrop so image fits perfectly without cropping */}
            <img
              src={
                chosenVibe.id === 'durga-puja'
                  ? showRealPhoto
                    ? '/photos/chotu_saree.jpg'
                    : '/doodles/doodle_durga_puja_couple.jpg'
                  : showRealPhoto
                  ? '/photos/sonu_chotu_sunflower.jpg'
                  : '/doodles/doodle_sunflower_date.jpg'
              }
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover blur-md opacity-35 scale-110 pointer-events-none"
            />
            {/* Full uncropped image */}
            <img
              src={
                chosenVibe.id === 'durga-puja'
                  ? showRealPhoto
                    ? '/photos/chotu_saree.jpg'
                    : '/doodles/doodle_durga_puja_couple.jpg'
                  : showRealPhoto
                  ? '/photos/sonu_chotu_sunflower.jpg'
                  : '/doodles/doodle_sunflower_date.jpg'
              }
              alt="Sonu & Chotu"
              className="relative z-10 w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-1 right-1 z-20 p-1 rounded-full bg-black/55 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-2.5 h-2.5" />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1 mb-0.5">
              <span className="font-handwritten text-lg font-bold text-[#49333A]">
                {chosenVibe.id === 'durga-puja' ? 'Puja Keepsake' : 'Our Date Keepsake'}
              </span>
              <button
                type="button"
                onClick={() => setShowRealPhoto(!showRealPhoto)}
                className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white text-[#E94F64] border border-[#FFB7C5] hover:bg-[#FFE0E6] cursor-pointer flex items-center gap-0.5 shadow-2xs"
              >
                <ImageIcon className="w-2.5 h-2.5" />
                <span>{showRealPhoto ? 'Doodle' : 'Photo'}</span>
              </button>
            </div>
            <p className="text-[10px] text-[#49333A]/70 leading-snug mb-1">
              {chosenVibe.id === 'durga-puja'
                ? 'Dressed up in festive wear and celebrating Puja together.'
                : 'Every day with you is my favorite memory in Jamshedpur.'}
            </p>
            <span className="text-[9px] font-semibold text-[#E94F64] flex items-center gap-0.5">
              <Heart className="w-2 h-2 fill-[#E94F64]" />
              <span>Tap photo to zoom in full</span>
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="space-y-2 text-xs text-[#49333A] pb-3 border-b border-dashed border-[#49333A]/15">
          {/* Vehicle for road ride */}
          {chosenVibe.id === 'road-ride' && customization.vehicleChoice && (
            <div className="p-2.5 bg-[#FFF8F0] rounded-xl border border-[#49333A]/10 flex items-center justify-between">
              <span className="font-bold text-[#49333A]/70">Selected Ride:</span>
              <span className="font-bold text-[#E94F64] capitalize">
                {customization.vehicleChoice}
              </span>
            </div>
          )}

          {/* Chill Audience */}
          {chosenVibe.id === 'chill-session' && customization.chillAudience && (
            <div className="p-2.5 bg-[#FFF8F0] rounded-xl border border-[#49333A]/10 flex items-center justify-between">
              <span className="font-bold text-[#49333A]/70">Session Circle:</span>
              <span className="font-bold text-[#6D28D9]">
                {customization.chillAudience === 'just-us' ? 'Just Sonu & Chotu' : 'With All the Siblings'}
              </span>
            </div>
          )}

          {/* Puja Companion */}
          {chosenVibe.id === 'durga-puja' && customization.pujaCompanion && (
            <div className="p-2.5 bg-[#FFF8F0] rounded-xl border border-[#49333A]/10 flex items-center justify-between">
              <span className="font-bold text-[#49333A]/70">Pandal Hopping Gang:</span>
              <span className="font-bold text-[#EA580C]">
                {getPujaCompanionLabel(customization.pujaCompanion)}
              </span>
            </div>
          )}

          {/* Sub choices */}
          {selectedSubChoiceLabels.length > 0 && (
            <div className="p-2.5 bg-[#FFF8F0] rounded-xl border border-[#49333A]/10">
              <p className="font-bold text-[#49333A]/70 text-[10px] uppercase mb-1">
                Your Choices:
              </p>
              <div className="flex flex-wrap gap-1">
                {selectedSubChoiceLabels.map((lbl, idx) => (
                  <span
                    key={idx}
                    className="font-bold bg-white text-[#49333A] px-2 py-0.5 rounded-md border border-[#49333A]/10 text-[11px]"
                  >
                    ✓ {lbl}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Pitstop Treat */}
          {pitstopLabel && customization.pitstopChoice && (
            <div className="p-2.5 bg-[#FFF8F0] rounded-xl border border-[#49333A]/10 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-[#49333A]/70 font-bold">
                <div className="w-5 h-5 rounded-md bg-white border border-[#49333A]/10 flex items-center justify-center shrink-0">
                  {getPitstopDoodleIcon(customization.pitstopChoice, 'w-3.5 h-3.5')}
                </div>
                <span>Pitstop Treat:</span>
              </div>
              <span className="font-bold text-[#E94F64] text-right">
                {pitstopLabel}
              </span>
            </div>
          )}

          {/* Jamshedpur Spot */}
          {chosenSpot && (
            <div className="p-2.5 bg-[#FFF8F0] rounded-xl border border-[#49333A]/10 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-[#49333A]/70 font-bold">
                <DoodleMapPin className="w-3.5 h-3.5" />
                <span>Destination:</span>
              </div>
              <span className="font-bold text-xs text-[#49333A] text-right">
                {chosenSpot.name} ({chosenSpot.locality})
              </span>
            </div>
          )}

          {/* Timing */}
          <div className="p-2.5 bg-[#FFF8F0] rounded-xl border border-[#49333A]/10 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[#49333A]/70 font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>Preferred Time:</span>
            </div>
            <span className="font-bold capitalize text-[#49333A]">
              {preferredTiming} {preferredDate ? `(${preferredDate})` : ''}
            </span>
          </div>

          {/* Special note */}
          {specialNote && (
            <div className="p-2.5 bg-[#FFE0E6]/30 rounded-xl border border-[#FFB7C5]">
              <p className="text-[10px] font-bold text-[#E94F64] uppercase mb-0.5">
                Chotu's Note for Sonu:
              </p>
              <p className="font-handwritten text-lg text-[#49333A] italic">
                "{specialNote}"
              </p>
            </div>
          )}
        </div>

        {/* Buttons inside postcard */}
        <div className="mt-4 pt-2 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || Boolean(submissionSuccessId)}
            className={`btn-pookie flex items-center justify-center gap-2 py-3 text-sm cursor-pointer shadow-md ${
              submissionSuccessId ? 'opacity-60 cursor-default' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>{ROMANTIC_CONFIG.wishlistScreen.submittingButton}</span>
              </>
            ) : submissionSuccessId ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Wishlist Delivered to Sonu</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{ROMANTIC_CONFIG.wishlistScreen.submitButton}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="w-full py-2.5 px-4 rounded-full bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:bg-[#20ba59] transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Send Directly on WhatsApp to Sonu</span>
          </button>
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/timing-note"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#49333A]/70 hover:text-[#E94F64]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Change Details</span>
        </Link>
      </div>

      {/* Lightbox Modal for Uncropped Photo Zoom */}
      <ImageLightboxModal
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
        photoUrl={lightboxImage?.url || ''}
        title={lightboxImage?.title || ''}
        caption={lightboxImage?.caption || ''}
      />
    </MobileContainer>
  );
};
