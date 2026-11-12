"use client";

import React, { useState } from "react";

export function PlayITSimulator() {
  const [activeStep, setActiveStep] = useState<"hearit" | "sayit" | "findit">("hearit");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [micRecognized, setMicRecognized] = useState(false);
  const [matchedTiles, setMatchedTiles] = useState<number[]>([0]);
  const [hearts, setHearts] = useState(5);
  const [stars, setStars] = useState(3);

  // Web Audio synth for phoneme sound
  const playPhonemeSound = () => {
    setIsPlayingAudio(true);
    try {
      if (typeof window !== "undefined" && (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        // /m/ nasal hum frequency around 220Hz humming
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(190, ctx.currentTime + 0.8);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.85);
      }
    } catch {
      // Fallback gracefully if AudioContext blocked
    }
    setTimeout(() => setIsPlayingAudio(false), 900);
  };

  const simulateMic = () => {
    setIsListeningMic(true);
    setMicRecognized(false);
    setTimeout(() => {
      setIsListeningMic(false);
      setMicRecognized(true);
    }, 1200);
  };

  const toggleTile = (idx: number, isTarget: boolean) => {
    if (matchedTiles.includes(idx)) {
      setMatchedTiles(matchedTiles.filter((i) => i !== idx));
    } else {
      if (isTarget) {
        setMatchedTiles([...matchedTiles, idx]);
      } else {
        setHearts((h) => Math.max(1, h - 1));
        if (hearts <= 2) setStars(2);
      }
    }
  };

  return (
    <div className="w-full h-full bg-[#0d1520] text-[#e2e8f0] flex flex-col justify-between p-3 pt-6 sm:pt-7 select-none font-sans overflow-hidden">
      {/* Top App Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#1e293b]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-[0.65rem] font-bold text-emerald-300">
            L
          </div>
          <div className="flex flex-col">
            <span className="text-[0.7rem] font-bold tracking-tight text-white flex items-center gap-1.5">
              PlayIT // Unit 1: M
            </span>
            <span className="text-[0.6rem] text-zinc-400">Marungko 4-Step Method</span>
          </div>
        </div>

        {/* Heart & Star Meters */}
        <div className="flex items-center gap-2 text-[0.65rem] font-mono">
          <div className="flex items-center gap-0.5 text-rose-400 font-semibold bg-rose-950/40 px-1.5 py-0.5 rounded border border-rose-800/40">
            <span>HP:</span>
            <span>{hearts}/5</span>
          </div>
          <div className="flex items-center gap-0.5 text-amber-400 font-semibold bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-800/40">
            <span>STARS:</span>
            <span>{stars}</span>
          </div>
        </div>
      </div>

      {/* Step Navigation Tabs */}
      <div className="grid grid-cols-3 gap-1.5 my-2">
        {(["hearit", "sayit", "findit"] as const).map((step) => {
          const isActive = activeStep === step;
          const labels = {
            hearit: "1. Hear It",
            sayit: "2. Say It",
            findit: "3. Find It",
          };
          return (
            <button
              key={step}
              onClick={() => setActiveStep(step)}
              className={`py-1 rounded text-[0.65rem] font-medium transition-all ${
                isActive
                  ? "bg-emerald-600 text-white shadow-sm font-semibold"
                  : "bg-[#162032] text-zinc-400 hover:text-white"
              }`}
            >
              {labels[step]}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="flex-1 flex flex-col items-center justify-center relative my-1">
        {/* STAGE 1: HEAR IT */}
        {activeStep === "hearit" && (
          <div className="flex flex-col items-center text-center max-w-xs animate-in fade-in duration-200">
            <div className="text-[0.65rem] text-emerald-400 font-mono tracking-wider uppercase mb-1">
              Lily Models The Sound
            </div>
            <div className="w-20 h-24 rounded-lg bg-emerald-950/40 border-2 border-emerald-500/50 flex flex-col items-center justify-center shadow-lg relative my-1">
              <span className="text-3xl font-black text-emerald-300">Mm</span>
              <span className="text-[0.65rem] font-semibold text-emerald-200 mt-1">/m/ • Mouse</span>
              {isPlayingAudio && (
                <div className="absolute -inset-1 rounded-xl border border-emerald-400 animate-ping opacity-60 pointer-events-none" />
              )}
            </div>

            <button
              onClick={playPhonemeSound}
              className={`mt-2 px-3 py-1.5 rounded-full text-[0.7rem] font-bold flex items-center gap-1.5 transition-all shadow-md ${
                isPlayingAudio
                  ? "bg-emerald-400 text-emerald-950 scale-95"
                  : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 animate-pulse"
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
              <span>{isPlayingAudio ? "Playing /m/ Sound..." : "Tap to Hear /m/"}</span>
            </button>
            <span className="text-[0.6rem] text-zinc-400 mt-1.5 font-mono">
              Pure offline synthesized phonetic model
            </span>
          </div>
        )}

        {/* STAGE 2: SAY IT */}
        {activeStep === "sayit" && (
          <div className="flex flex-col items-center text-center max-w-xs animate-in fade-in duration-200">
            <div className="text-[0.65rem] text-rose-400 font-mono tracking-wider uppercase mb-1">
              Edge Vosk Speech Evaluator
            </div>
            
            <div className="flex items-center gap-3 my-1.5">
              {/* Mouth Articulation Scaffolding */}
              <div className="w-16 h-20 rounded-lg bg-[#162032] border border-zinc-700 flex flex-col items-center justify-center p-1.5 text-center">
                <span className="text-[0.6rem] font-mono text-zinc-400 leading-tight">Mouth Cue</span>
                <div className="w-8 h-4 rounded-full border-2 border-rose-400 bg-rose-950/60 my-1" />
                <span className="text-[0.55rem] text-zinc-300">Lips closed</span>
              </div>

              {/* Vosk Microphone Button */}
              <button
                onClick={simulateMic}
                className={`w-16 h-16 rounded-full flex flex-col items-center justify-center border-2 transition-all shadow-lg ${
                  isListeningMic
                    ? "bg-rose-500 border-white text-white animate-pulse"
                    : micRecognized
                    ? "bg-emerald-600 border-emerald-400 text-white"
                    : "bg-[#1e293b] hover:bg-[#334155] border-rose-500 text-rose-300"
                }`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" x2="12" y1="19" y2="22" />
                </svg>
              </button>
            </div>

            <div className="text-[0.65rem] font-mono mt-1">
              {isListeningMic ? (
                <span className="text-rose-400 font-semibold animate-pulse">Evaluating audio frame buffer...</span>
              ) : micRecognized ? (
                <span className="text-emerald-400 font-semibold">Match Accepted: /m/ (Confidence: 96%)</span>
              ) : (
                <span className="text-zinc-400">Tap mic and pronounce &quot;Mouse&quot;</span>
              )}
            </div>
            <span className="text-[0.6rem] text-zinc-500 font-mono mt-1">
              Zero network permission • In-memory ring buffer
            </span>
          </div>
        )}

        {/* STAGE 3: FIND IT */}
        {activeStep === "findit" && (
          <div className="flex flex-col items-center text-center w-full px-2 animate-in fade-in duration-200">
            <div className="text-[0.65rem] text-amber-400 font-mono tracking-wider uppercase mb-1">
              Select 3 Pictures Starting with /m/
            </div>

            <div className="grid grid-cols-4 gap-1.5 w-full max-w-xs my-1">
              {[
                { name: "Mouse", target: true },
                { name: "Mango", target: true },
                { name: "Dog", target: false },
                { name: "Moon", target: true },
              ].map((item, idx) => {
                const isSelected = matchedTiles.includes(idx);
                return (
                  <button
                    key={item.name}
                    onClick={() => toggleTile(idx, item.target)}
                    className={`p-1.5 rounded-lg border text-center transition-all ${
                      isSelected
                        ? "bg-emerald-950/80 border-emerald-400 text-emerald-200 scale-95"
                        : "bg-[#162032] border-[#27354a] text-zinc-300 hover:border-zinc-500"
                    }`}
                  >
                    <span className="block text-[0.7rem] font-bold">{item.name}</span>
                    <span className="text-[0.55rem] font-mono text-zinc-400">
                      {isSelected ? "Match!" : "Tap"}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="text-[0.65rem] font-mono text-zinc-400 mt-1">
              Mastery Progress: {matchedTiles.length}/3 targets found
            </div>
          </div>
        )}
      </div>

      {/* Simulator Telemetry Status Line */}
      <div className="pt-2 border-t border-[#1e293b] flex items-center justify-between text-[0.6rem] font-mono text-zinc-400">
        <span className="flex items-center gap-1 text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>ROOM SQLITE READY</span>
        </span>
        <span>CLEAN ARCHITECTURE MVVM</span>
      </div>
    </div>
  );
}
