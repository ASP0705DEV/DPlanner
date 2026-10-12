// Types for Our Little Date Planner 💌 (For Chotu)
// Mobile-first, no budgets, single-select vibe flow with deep customizations

export type DateVibeId =
  | 'durga-puja'
  | 'road-ride'
  | 'princess-treatment'
  | 'foodie-mode'
  | 'cafe-date'
  | 'dinner-date'
  | 'street-food'
  | 'sports-games'
  | 'movie-date'
  | 'shopping-queen'
  | 'us-time'
  | 'steamy-times'
  | 'chill-session'
  | 'her-time'
  | 'cuddle-peace';

export interface VibeSubChoiceItem {
  id: string;
  label: string;
  emoji: string;
  description?: string;
  tag?: string;
}

export interface DateVibeOption {
  id: DateVibeId;
  title: string;
  hindiTitle: string;
  emoji: string;
  loveSlogan: string;
  description: string;
  romanticNote: string;
  categoryLabel: string;
  colorScheme: {
    bg: string;
    border: string;
    badge: string;
  };
  // Specific customizer configuration
  subChoiceTitle?: string;
  subChoiceSubtitle?: string;
  subChoices?: VibeSubChoiceItem[];
  allowMultipleSubChoices?: boolean;
  jamshedpurSpotsTitle?: string;
  jamshedpurSpots?: {
    id: string;
    name: string;
    locality: string;
    description: string;
    mapsQuery: string;
  }[];
}

export type VehicleChoice = 'bike' | 'car' | 'scooter';
export type ChillAudienceChoice = 'just-us' | 'with-siblings';
export type PujaCompanionChoice = 'just-us' | 'with-siblings' | 'with-family';
export type PitstopChoice =
  | 'chai-maggi'
  | 'cold-coffee-shakes'
  | 'icecream-waffles'
  | 'kathi-shawarma'
  | 'pastries-bakery'
  | 'puchka-chaat'
  | 'cocktails-drinks'
  | 'none';

export interface VibeCustomizationState {
  selectedSubChoiceIds: string[];
  vehicleChoice?: VehicleChoice;
  selectedRoute?: string;
  chillAudience?: ChillAudienceChoice;
  pujaCompanion?: PujaCompanionChoice;
  selectedSpotId?: string;
  customSpotName?: string;
  pitstopChoice?: PitstopChoice;
  pitstopNote?: string;
}

export type DateTiming =
  | 'right-now'
  | 'afternoon'
  | 'evening'
  | 'dinner-time'
  | 'late-night'
  | 'any-time';

export interface DatePlannerState {
  selectedVibeId: DateVibeId | null;
  customization: VibeCustomizationState;
  preferredTiming: DateTiming;
  preferredDate?: string;
  specialNote: string;
  submissionSuccessId: string | null;
}

export type SubmissionStatus = 'new' | 'reviewed' | 'planning' | 'completed';

export interface DateSubmission {
  id: string;
  created_at: string;
  selected_vibe_id: DateVibeId;
  vibe_title: string;
  customization: VibeCustomizationState;
  preferred_date?: string;
  preferred_timing: DateTiming;
  special_note?: string;
  submission_status: SubmissionStatus;
}
