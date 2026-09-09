"use client";

import { useState } from "react";
import Image from "next/image";
import { useStoryMode } from "@/components/story/StoryModeContext";
import { playCRTPowerSound } from "@/lib/audio/retroAudio";
import { ConstellationNode } from "@/components/interactive/ConstellationNode";
import FadeIn from "@/components/ui/FadeIn";
import {
  Power,
  Sparkles,
  Terminal,
  Volume2,
  VolumeX,
  Compass,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STORY_CHAPTERS = [
  {
    epoch: "00",
    title: "The First Spark",
    subtitle: "Childhood curiosity meets vintage CRT",
    active: true,
  },
  {
    epoch: "01",
    title: "The Frontier Trail",
    subtitle: "CIT-U BSIT 4th Year • Systems & algorithms",
    active: false,
  },
  {
    epoch: "02",
    title: "The Offline Outlaw",
    subtitle: "PlayIT thesis: zero-cloud edge ASR",
    active: false,
  },
  {
    epoch: "03",
    title: "The Orbital Relay",
    subtitle: "NEC Telecom Software Philippines • Spring Boot 3",
    active: false,
  },
  {
    epoch: "04",
    title: "Cognitive Horizon",
    subtitle: "ChromaDB RAG & Gemini vector intelligence",
    active: false,
  },
];

export default function EpochZeroPrologue() {
  const { mode } = useStoryMode();
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [soundMuted, setSoundMuted] = useState(false);
  const [expandedInSpec, setExpandedInSpec] = useState(false);

  const handleTogglePower = () => {
    const nextState = !isPowerOn;
    setIsPowerOn(nextState);
    if (!soundMuted) {
      playCRTPowerSound(nextState);
    }
  };

  const isSpecCollapsed = mode === "spec" && !expandedInSpec;

  return (
    <section
      id="prologue"
      className="scroll-mt-24 space-y-6 pt-4 sm:pt-6"
      aria-label="Story Epoch 0: The Little Cowboy"
    >
      <FadeIn>
        {isSpecCollapsed ? (
          <ConstellationNode
            id="origin-crt"
            label="Epoch 0: The Little Cowboy (Archival Origin)"
            category="origin"
            tier="core"
            color="#06b6d4"
            glowColor="rgba(6, 182, 212, 0.45)"
            connections={[
              "origin-avatar",
              "origin-zendrix",
              "pillar-offline",
              "pillar-backend",
              "pillar-ai",
              "project-playit",
            ]}
            showAnchorPip
            pipPosition="top-left"
            className="rounded-2xl block"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-zinc-900/90 dark:bg-zinc-950/90 border border-zinc-800 hover:border-cyan-500/40 transition-colors text-xs font-mono shadow-md">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-cyan-500/50 shrink-0">
                  <Image
                    src="/images/little-cowboy-v2.jpg"
                    alt="The Little Cowboy CRT archival origin"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-200 font-bold">ARCHIVAL_ORIGIN // 1990s</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/80 font-mono">
                      Epoch 00
                    </span>
                  </div>
                  <p className="text-zinc-400 text-xs font-sans truncate sm:whitespace-normal">
                    The Little Cowboy: Childhood CRT curiosity evolved into offline-first Android systems &amp; telecom architectures.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setExpandedInSpec(true)}
                className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-800/80 text-xs font-medium transition-all shadow-sm"
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Launch CRT Terminal</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>
            </div>
          </ConstellationNode>
        ) : (
          <>
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border border-cyan-200/80 dark:border-cyan-800/60 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Story Odyssey • Epoch 00</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                  The Little Cowboy:{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-500 dark:from-cyan-400 dark:via-sky-300 dark:to-indigo-300">
                    The First Spark
                  </span>
                </h2>
                <p className="mt-1 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl font-normal">
                  Before modern microservices or edge speech models, it all began with a toddler, a beige CRT monitor, and the instinct to see what happens when you press the power button.
                </p>
              </div>

              {/* Controls: Audio Toggle & Optional Collapse */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                {mode === "spec" && expandedInSpec && (
                  <button
                    type="button"
                    onClick={() => setExpandedInSpec(false)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-mono text-zinc-400 hover:text-zinc-200 bg-zinc-800/80 border border-zinc-700 transition-colors"
                  >
                    <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Collapse to Spec</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setSoundMuted((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 transition-colors"
                  title={soundMuted ? "Unmute Retro CRT Audio" : "Mute Retro Audio"}
                >
                  {soundMuted ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Audio: Muted</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
                      <span>Audio: 8-Bit</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Main Interactive CRT Terminal Card */}
            <ConstellationNode
              id="origin-crt"
              label="Epoch 0: The Little Cowboy (The First Spark)"
              category="origin"
              tier="core"
              color="#06b6d4"
              glowColor="rgba(6, 182, 212, 0.45)"
              connections={[
                "origin-avatar",
                "origin-zendrix",
                "pillar-offline",
                "pillar-backend",
                "pillar-ai",
                "project-playit",
              ]}
              showAnchorPip
              pipPosition="top-left"
              className="rounded-3xl block overflow-hidden"
            >
              <div className="relative rounded-3xl bg-zinc-900/95 dark:bg-zinc-950 border-2 border-cyan-500/40 dark:border-cyan-500/30 p-5 sm:p-7 shadow-2xl shadow-cyan-950/30">
                {/* Top Terminal Title Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-5 text-xs font-mono">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <span className="font-semibold text-zinc-200">
                      ARCHIVAL_STATION_00 // COWBOY_BOOT_ROM.SYS
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono",
                        isPowerOn
                          ? "bg-emerald-950/70 text-emerald-300 border border-emerald-700/60"
                          : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                      )}
                    >
                      <span
                        className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          isPowerOn ? "bg-emerald-400 animate-pulse" : "bg-zinc-500"
                        )}
                      />
                      <span>{isPowerOn ? "CRT SYNC: ON" : "CRT STANDBY"}</span>
                    </span>
                  </div>
                </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Left Column: The Vintage CRT Monitor Display */}
              <div className="lg:col-span-7 space-y-3">
                {/* CRT Bezel Chassis */}
                <div
                  className={cn(
                    "relative rounded-2xl p-2 sm:p-3 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 border-4 shadow-2xl transition-all duration-300",
                    isPowerOn
                      ? "border-zinc-600 shadow-cyan-500/20"
                      : "border-zinc-800 opacity-80"
                  )}
                >
                  {/* Screen Frame */}
                  <div
                    onClick={handleTogglePower}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleTogglePower();
                      }
                    }}
                    title="Click monitor to toggle CRT power & sound"
                    className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group bg-black select-none"
                  >
                    {/* The Archival Photo (little cowboy_v2) */}
                    <Image
                      src="/images/little-cowboy-v2.jpg"
                      alt="The Little Cowboy: Young Zendrix touching the vintage CRT computer monitor"
                      fill
                      sizes="(max-width: 1024px) 100vw, 550px"
                      priority
                      className={cn(
                        "object-cover transition-all duration-500",
                        isPowerOn
                          ? "filter-none brightness-105 contrast-105 group-hover:scale-102"
                          : "brightness-20 contrast-125 grayscale"
                      )}
                    />

                    {/* Interactive Scanlines Overlay */}
                    {isPowerOn && (
                      <div className="absolute inset-0 crt-scanlines pointer-events-none opacity-40 mix-blend-overlay" />
                    )}

                    {/* Phosphor Bloom & Vignette */}
                    {isPowerOn && (
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-cyan-900/30 via-transparent to-cyan-500/10 mix-blend-screen" />
                    )}

                    {/* Interactive Target Reticle on the Button */}
                    <div
                      className={cn(
                        "absolute top-[48%] right-[28%] -translate-y-1/2 w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center",
                        isPowerOn
                          ? "border-cyan-400 bg-cyan-500/20 shadow-[0_0_12px_#22d3ee] animate-pulse"
                          : "border-zinc-500/60 bg-black/40"
                      )}
                      title="Click power button"
                    >
                      <Power
                        className={cn(
                          "w-3.5 h-3.5 transition-colors",
                          isPowerOn ? "text-cyan-200" : "text-zinc-400"
                        )}
                      />
                    </div>

                    {/* Floating Instruction Pill */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-lg bg-zinc-950/80 backdrop-blur-md border border-zinc-700/80 text-[11px] font-mono text-zinc-300">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        <span>Tap monitor to {isPowerOn ? "power down" : "power on"}</span>
                      </span>
                      <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[9px] text-cyan-300">
                        CLICK / TAP
                      </kbd>
                    </div>
                  </div>

                  {/* Physical Monitor Chassis Bottom Trim */}
                  <div className="pt-2 px-1 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      <span>CRT MODEL // 1990s RETRO-VISION</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleTogglePower}
                      className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 hover:text-white transition-colors"
                    >
                      <Power className="w-2.5 h-2.5 text-cyan-400" />
                      <span>{isPowerOn ? "STANDBY" : "POWER ON"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: The Cowboy Narrative & Chapter Index */}
              <div className="lg:col-span-5 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold">
                    <Compass className="w-4 h-4" />
                    <span>The Genesis Story</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-100">
                    From Green Phosphor to the Distributed Cloud
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                    The photo shows young Zendrix reaching forward to turn on a cathode-ray tube monitor. There were no cloud dependencies or abstractions back then—just raw silicon, clicking keys, and real hardware constraints.
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                    That same frontier spirit drives my engineering approach today: building <strong className="text-cyan-300 font-medium">offline-first edge systems</strong> that survive in zero-connectivity classrooms, and <strong className="text-sky-300 font-medium">stateless backend services</strong> engineered with disciplined architectures.
                  </p>
                </div>

                {/* Narrative Odyssey Milestones */}
                <div className="pt-2 border-t border-zinc-800 space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold flex items-center justify-between">
                    <span>The Odyssey Trail</span>
                    <span className="text-cyan-400">5 Epochs</span>
                  </div>

                  <div className="space-y-1.5">
                    {STORY_CHAPTERS.map((ch) => (
                      <div
                        key={ch.epoch}
                        className={cn(
                          "p-2 rounded-xl text-xs font-mono flex items-center justify-between transition-colors",
                          ch.active
                            ? "bg-cyan-950/60 border border-cyan-700/60 text-cyan-200 shadow-sm"
                            : "bg-zinc-800/40 text-zinc-400 border border-zinc-800/80"
                        )}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className={cn(
                              "text-[10px] px-1.5 py-0.2 rounded font-bold",
                              ch.active
                                ? "bg-cyan-500 text-zinc-950"
                                : "bg-zinc-800 text-zinc-500"
                            )}
                          >
                            {ch.epoch}
                          </span>
                          <div className="truncate">
                            <span className="font-semibold text-zinc-200 block truncate">
                              {ch.title}
                            </span>
                            <span className="text-[10px] text-zinc-500 block truncate font-sans">
                              {ch.subtitle}
                            </span>
                          </div>
                        </div>

                        {ch.active && (
                          <span className="text-[10px] font-mono text-cyan-400 shrink-0 flex items-center gap-0.5">
                            <span>CURRENT</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ConstellationNode>
          </>
        )}
      </FadeIn>
    </section>
  );
}
