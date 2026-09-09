"use client";

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Procedural retro CRT power toggle sound using Web Audio API.
 * Synthesizes a degauss coil swell, phosphor whistle, and mechanical switch click.
 */
export function playCRTPowerSound(isPoweringOn: boolean) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. Mechanical switch click (filtered noise burst)
    const bufferSize = ctx.sampleRate * 0.04;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(1400, now);
    noiseFilter.Q.setValueAtTime(3.0, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.35, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    whiteNoise.start(now);

    if (isPoweringOn) {
      // 2. Low-frequency degauss coil swell (sine wave pitch drop)
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(120, now + 0.02);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.35);

      oscGain.gain.setValueAtTime(0.001, now);
      oscGain.gain.linearRampToValueAtTime(0.25, now + 0.06);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(now + 0.02);
      osc.stop(now + 0.36);

      // 3. High-frequency phosphor flyback transformer whistle (15.7 kHz emulation scaled down to pleasant 3.8 kHz)
      const flyback = ctx.createOscillator();
      const flybackGain = ctx.createGain();

      flyback.type = "triangle";
      flyback.frequency.setValueAtTime(2800, now + 0.05);
      flyback.frequency.linearRampToValueAtTime(3600, now + 0.2);

      flybackGain.gain.setValueAtTime(0.001, now);
      flybackGain.gain.linearRampToValueAtTime(0.08, now + 0.1);
      flybackGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      flyback.connect(flybackGain);
      flybackGain.connect(ctx.destination);
      flyback.start(now + 0.05);
      flyback.stop(now + 0.42);
    } else {
      // Powering off: descending cathode ray collapse
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(1800, now + 0.02);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.28);

      oscGain.gain.setValueAtTime(0.12, now + 0.02);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(now + 0.02);
      osc.stop(now + 0.3);
    }
  } catch {
    // Graceful fallback if Web Audio API is disabled or blocked
  }
}
