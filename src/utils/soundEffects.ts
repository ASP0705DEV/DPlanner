// Audio synthesizer for romantic sound effects using Web Audio API

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// Musical notes frequencies for ascending cute combo
const COMBO_FREQUENCIES = [
  523.25, // C5
  587.33, // D5
  659.25, // E5
  698.46, // F5
  783.99, // G5
  880.00, // A5
  987.77, // B5
  1046.50, // C6
  1174.66, // D6
  1318.51, // E6
];

/**
 * Plays a sweet heart chime / bubble pop tone.
 * Consecutive taps can increase pitch based on combo count.
 */
export function playHeartNudgeSound(comboCount = 1) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const freqIndex = Math.min(comboCount - 1, COMBO_FREQUENCIES.length - 1);
    const baseFreq = COMBO_FREQUENCIES[freqIndex % COMBO_FREQUENCIES.length];

    // Primary warm sine wave oscillator
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    // Gentle upward pitch glide
    osc.frequency.setValueAtTime(baseFreq * 0.9, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq, now + 0.05);

    // Warm envelope: attack and smooth exponential decay
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.22, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

    // Secondary sparkle harmonic
    const shimmerOsc = ctx.createOscillator();
    const shimmerGain = ctx.createGain();

    shimmerOsc.type = 'triangle';
    shimmerOsc.frequency.setValueAtTime(baseFreq * 2, now);

    shimmerGain.gain.setValueAtTime(0.001, now);
    shimmerGain.gain.linearRampToValueAtTime(0.08, now + 0.03);
    shimmerGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

    osc.connect(gainNode);
    shimmerOsc.connect(shimmerGain);

    gainNode.connect(ctx.destination);
    shimmerGain.connect(ctx.destination);

    osc.start(now);
    shimmerOsc.start(now);

    osc.stop(now + 0.3);
    shimmerOsc.stop(now + 0.22);
  } catch (e) {
    console.warn('Audio playback not supported or blocked:', e);
  }
}

/**
 * Plays a cheerful double-chime celebration tone (e.g. when dispatching nudges or completing a date).
 */
export function playCelebrationTone() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [659.25, 783.99, 1046.5]; // E5 -> G5 -> C6

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.001, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.26);
    });
  } catch (e) {
    console.warn('Celebration audio tone note:', e);
  }
}
