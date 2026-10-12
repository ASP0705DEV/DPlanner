export interface DateEmailPayload {
  vibe_title: string;
  hindi_title?: string;
  love_slogan?: string;
  preferred_timing: string;
  preferred_date?: string;
  special_note?: string;
  vehicle_choice?: string;
  chill_audience?: string;
  puja_companion?: string;
  sub_choices?: string[];
  pitstop_treat?: string;
  spot_name?: string;
  spot_locality?: string;
  maps_url?: string;
  submitted_at?: string;
}

export async function sendDateEmailNotification(
  payload: DateEmailPayload
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errData.error || `HTTP ${response.status}`,
      };
    }

    const data = await response.json();
    return { success: true, ...data };
  } catch (err: any) {
    console.error('Failed to dispatch date email notification:', err);
    return {
      success: false,
      error: err.message || 'Network error while sending notification email',
    };
  }
}
