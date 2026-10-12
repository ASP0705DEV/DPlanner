import { createClient } from '@supabase/supabase-js';
import type { DateSubmission, SubmissionStatus } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const LOCAL_STORAGE_BACKUP_KEY = 'chotu_date_planner_submissions_v2';

export async function submitDateWishlist(
  payload: Omit<DateSubmission, 'id' | 'created_at' | 'submission_status'>
): Promise<{ success: boolean; id: string; isOfflineBackup: boolean; error?: string }> {
  const generatedId = crypto.randomUUID();
  const timestamp = new Date().toISOString();

  const newSubmission: DateSubmission = {
    ...payload,
    id: generatedId,
    created_at: timestamp,
    submission_status: 'new',
  };

  // Keep local copy on device
  try {
    const existing = getLocalBackups();
    existing.unshift(newSubmission);
    localStorage.setItem(LOCAL_STORAGE_BACKUP_KEY, JSON.stringify(existing));
  } catch (err) {
    console.warn('Could not cache locally in localStorage', err);
  }

  if (!supabase) {
    return {
      success: true,
      id: generatedId,
      isOfflineBackup: true,
      error: 'Supabase credentials not configured in .env. Saved to device storage & ready for 1-tap WhatsApp sharing!',
    };
  }

  try {
    const { data, error } = await supabase
      .from('date_submissions')
      .insert([
        {
          id: generatedId,
          selected_vibe_id: payload.selected_vibe_id,
          vibe_title: payload.vibe_title,
          customization: payload.customization,
          preferred_date: payload.preferred_date || null,
          preferred_timing: payload.preferred_timing,
          special_note: payload.special_note || null,
          submission_status: 'new',
        },
      ])
      .select('id')
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return {
        success: false,
        id: generatedId,
        isOfflineBackup: true,
        error: error.message,
      };
    }

    return {
      success: true,
      id: data?.id || generatedId,
      isOfflineBackup: false,
    };
  } catch (err: any) {
    console.error('Network error during wishlist submission:', err);
    return {
      success: false,
      id: generatedId,
      isOfflineBackup: true,
      error: err.message || 'Network error occurred while connecting to backend.',
    };
  }
}

export function getLocalBackups(): DateSubmission[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_BACKUP_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function fetchOwnerSubmissions(): Promise<{
  submissions: DateSubmission[];
  error?: string;
  source: 'supabase' | 'local';
}> {
  if (!supabase) {
    return {
      submissions: getLocalBackups(),
      source: 'local',
      error: 'Showing local drafts. Connect Supabase credentials in .env to access cloud database.',
    };
  }

  try {
    const { data, error } = await supabase
      .from('date_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return {
        submissions: getLocalBackups(),
        source: 'local',
        error: `Supabase Error (${error.message}). Falling back to local storage.`,
      };
    }

    return {
      submissions: data as DateSubmission[],
      source: 'supabase',
    };
  } catch (err: any) {
    return {
      submissions: getLocalBackups(),
      source: 'local',
      error: err.message || 'Failed to fetch from Supabase',
    };
  }
}

export async function updateSubmissionStatus(
  submissionId: string,
  newStatus: SubmissionStatus
): Promise<{ success: boolean; error?: string }> {
  try {
    const list = getLocalBackups();
    const updated = list.map((item) =>
      item.id === submissionId ? { ...item, submission_status: newStatus } : item
    );
    localStorage.setItem(LOCAL_STORAGE_BACKUP_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to update local backup status', err);
  }

  if (!supabase) {
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from('date_submissions')
      .update({ submission_status: newStatus })
      .eq('id', submissionId);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
