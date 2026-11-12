"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { TributaryId } from "./CurrentContext";
import { TRIBUTARIES } from "./CurrentContext";
import type { ArchitectureStep } from "@/data/projects";
import {
  PlayITSimulator,
  ReadHubSimulator,
  DaloyAquaSimulator,
  GordonRamsAiSimulator,
} from "../simulators";

export function TributaryStationVisualizer({
  tributaryId,
  isActive,
  nodeId,
  isEddy = false,
  videoUrl,
  posterUrl,
  projectTitle,
}: {
  tributaryId: Exclude<TributaryId, "none">;
  isActive: boolean;
  nodeId: string;
  isEddy?: boolean;
  videoUrl?: string;
  posterUrl?: string;
  projectSlug?: string;
  projectTitle?: string;
  storyboardBeats?: unknown[];
  selectedStage?: number;
  onSelectStage?: (stageIdx: number) => void;
}) {
  const meta = TRIBUTARIES[tributaryId];
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [hasStartedPlayback, setHasStartedPlayback] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState<boolean>(false);
  const [isCinemaOpen, setIsCinemaOpen] = useState<boolean>(false);
  const [playbackTime, setPlaybackTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(12);
  const [viewMode, setViewMode] = useState<"simulator" | "video">("simulator");

  // Detect prefers-reduced-motion: reduce
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => {
      setPrefersReducedMotion(mq.matches);
      if (mq.matches && videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };
    handleChange();
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  // Play video on viewport intersection when reduced-motion is off
  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = containerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v = videoRef.current;
          if (!v) return;
          if (entry.isIntersecting) {
            v.play()
              .then(() => {
                setIsPlaying(true);
                setHasStartedPlayback(true);
              })
              .catch(() => {});
          } else {
            if (!v.paused) {
              v.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: 0.35 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [prefersReducedMotion]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play()
        .then(() => {
          setIsPlaying(true);
          setHasStartedPlayback(true);
        })
        .catch(() => {});
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    v.currentTime = pct * v.duration;
  };

  const formattedTitle = projectTitle || meta.projectTitle;

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-center lg:items-end justify-center relative py-4"
    >
      {/* Hidden anchor target measured by CurrentLine SVG spline */}
      <div
        id={nodeId}
        data-node={isEddy ? "eddy" : "station"}
        data-tributary-node={tributaryId}
        className="w-6 h-6 rounded-full opacity-0 pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />

      {/* Showcase Card containing the Device Hardware Mockup Frame */}
      <div
        className={`w-full max-w-[34rem] rounded-2xl border transition-all duration-700 p-3.5 sm:p-5 backdrop-blur-sm ${
          isActive
            ? "border-[var(--line)] bg-[var(--tributary-surface)] shadow-2xl scale-[1.01]"
            : "border-[var(--line)]/35 bg-[var(--tributary-surface)]/75 opacity-90"
        }`}
      >
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--line)]/25">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${
                isActive
                  ? "bg-[var(--line)] animate-pulse"
                  : "bg-[var(--fg-2)]/50"
              }`}
              aria-hidden="true"
            />
            <span className="font-mono text-[0.75rem] uppercase tracking-wider font-semibold text-[var(--fg)]">
              {formattedTitle}
            </span>
            <span className="font-mono text-[0.75rem] text-[var(--fg-2)] font-medium hidden sm:inline">
              ({meta.depthMeters}m)
            </span>
          </div>

          {/* Interactive Mode Switcher: Micro-Simulator vs Video Walkthrough */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center p-0.5 rounded-lg bg-[var(--zone-bg)]/80 border border-[var(--line)]/30">
              <button
                type="button"
                onClick={() => setViewMode("simulator")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[0.6875rem] font-bold transition-all cursor-pointer ${
                  viewMode === "simulator"
                    ? "bg-[var(--line)] text-[#071E24] shadow-sm"
                    : "text-[var(--fg-2)] hover:text-[var(--fg)]"
                }`}
                aria-pressed={viewMode === "simulator"}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    viewMode === "simulator"
                      ? "bg-[#071E24] animate-pulse"
                      : "bg-emerald-400"
                  }`}
                  aria-hidden="true"
                />
                <span>SIMULATOR</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("video")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[0.6875rem] font-semibold transition-all cursor-pointer ${
                  viewMode === "video"
                    ? "bg-[var(--line)] text-[#071E24] shadow-sm"
                    : "text-[var(--fg-2)] hover:text-[var(--fg)]"
                }`}
                aria-pressed={viewMode === "video"}
              >
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>VIDEO</span>
              </button>
            </div>

            {videoUrl && (
              <button
                type="button"
                onClick={() => setIsCinemaOpen(true)}
                title="Expand video in cinema theater mode"
                aria-label="Expand video in cinema theater mode"
                className="p-1.5 rounded-lg bg-[var(--zone-bg)]/80 border border-[var(--line)]/30 text-[var(--fg-2)] hover:text-[var(--line)] hover:border-[var(--line)]/60 cursor-pointer transition-all"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Tailored Hardware Device Mockup Frame */}
        <div className="my-3.5">
          {/* 1. Android Tablet Frame for PlayIT */}
          {tributaryId === "playit" && (
            <div className="relative rounded-[1.25rem] bg-[#18181b] p-2 sm:p-2.5 border-2 border-[#3f3f46]/80 shadow-2xl">
              {/* Top Camera Dot */}
              <div className="flex items-center justify-center pb-1.5 pt-0.5">
                <div className="w-2 h-2 rounded-full bg-[#09090b] border border-[#52525b]" />
              </div>

              {/* Tablet Screen */}
              <div
                className={`relative rounded-lg overflow-hidden bg-[#09090b] border border-[#27272a] group ${
                  viewMode === "simulator"
                    ? "min-h-[350px] sm:min-h-[380px]"
                    : "aspect-video"
                }`}
              >
                {/* Android Status Bar */}
                <div className="absolute top-0 inset-x-0 z-20 h-5 px-3 flex items-center justify-between text-[0.625rem] font-mono text-[#a1a1aa] bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none">
                  <span>09:41</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[0.5625rem] px-1 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60 font-semibold">
                      VOSK ON-DEVICE
                    </span>
                    <span className="tabular-nums">100%</span>
                  </div>
                </div>

                {viewMode === "simulator" ? (
                  <PlayITSimulator />
                ) : (
                  <>
                    {/* Poster */}
                    {posterUrl && (
                      <Image
                        src={posterUrl}
                        alt={`${formattedTitle} Android App Interface`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={`object-cover transition-opacity duration-500 pointer-events-none ${
                          hasStartedPlayback ? "opacity-0" : "opacity-100"
                        }`}
                      />
                    )}

                    {/* Video */}
                    {videoUrl && (
                      <video
                        ref={videoRef}
                        src={videoUrl}
                        poster={posterUrl}
                        preload="metadata"
                        autoPlay={!prefersReducedMotion}
                        loop
                        muted
                        playsInline
                        onLoadedMetadata={(e) => {
                          if (e.currentTarget.duration) {
                            setDuration(e.currentTarget.duration);
                          }
                        }}
                        onPlay={() => {
                          setIsPlaying(true);
                          setHasStartedPlayback(true);
                        }}
                        onPause={() => setIsPlaying(false)}
                        onTimeUpdate={(e) => {
                          setPlaybackTime(e.currentTarget.currentTime);
                        }}
                        aria-label={`${formattedTitle} Android App Walkthrough`}
                        className="w-full h-full object-cover relative z-10"
                      />
                    )}

                    {/* Floating Video Controls Overlay */}
                    <VideoControlsBar
                      isPlaying={isPlaying}
                      isMuted={isMuted}
                      playbackTime={playbackTime}
                      duration={duration}
                      onTogglePlay={togglePlay}
                      onToggleMute={toggleMute}
                      onOpenCinema={() => setIsCinemaOpen(true)}
                      onSeek={handleSeek}
                    />
                  </>
                )}
              </div>

              {/* Bottom Gesture Nav Pill */}
              <div className="flex justify-center pt-2">
                <div className="w-20 h-1 bg-[#52525b] rounded-full" />
              </div>
            </div>
          )}

          {/* 2. Modern Browser Frame for ReadHub */}
          {tributaryId === "readhub" && (
            <div className="relative rounded-xl bg-[#18181b] border border-[#3f3f46]/80 shadow-2xl overflow-hidden">
              {/* Browser Window Chrome */}
              <div className="px-3 py-2 bg-[#121214] border-b border-[#27272a] flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                </div>
                <div className="flex-1 flex items-center justify-center px-1 sm:px-4">
                  <div className="max-w-md w-full flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#09090b] border border-[#27272a] font-mono text-[0.625rem] text-[#a1a1aa] truncate">
                    <svg
                      className="w-2.5 h-2.5 text-emerald-400 shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                    </svg>
                    <span className="truncate">
                      https://readhub-three.vercel.app/catalog
                    </span>
                  </div>
                </div>
                <span className="font-mono text-[0.625rem] text-emerald-400 font-semibold shrink-0 hidden sm:inline">
                  JWT 200
                </span>
              </div>

              {/* Viewport */}
              <div
                className={`relative overflow-hidden bg-[#09090b] group ${
                  viewMode === "simulator"
                    ? "min-h-[350px] sm:min-h-[380px]"
                    : "aspect-video"
                }`}
              >
                {viewMode === "simulator" ? (
                  <ReadHubSimulator />
                ) : (
                  <>
                    {posterUrl && (
                      <Image
                        src={posterUrl}
                        alt={`${formattedTitle} Web Application`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={`object-cover transition-opacity duration-500 pointer-events-none ${
                          hasStartedPlayback ? "opacity-0" : "opacity-100"
                        }`}
                      />
                    )}

                    {videoUrl && (
                      <video
                        ref={videoRef}
                        src={videoUrl}
                        poster={posterUrl}
                        preload="metadata"
                        autoPlay={!prefersReducedMotion}
                        loop
                        muted
                        playsInline
                        onLoadedMetadata={(e) => {
                          if (e.currentTarget.duration) {
                            setDuration(e.currentTarget.duration);
                          }
                        }}
                        onPlay={() => {
                          setIsPlaying(true);
                          setHasStartedPlayback(true);
                        }}
                        onPause={() => setIsPlaying(false)}
                        onTimeUpdate={(e) => {
                          setPlaybackTime(e.currentTarget.currentTime);
                        }}
                        aria-label={`${formattedTitle} Web App Walkthrough`}
                        className="w-full h-full object-cover relative z-10"
                      />
                    )}

                    <VideoControlsBar
                      isPlaying={isPlaying}
                      isMuted={isMuted}
                      playbackTime={playbackTime}
                      duration={duration}
                      onTogglePlay={togglePlay}
                      onToggleMute={toggleMute}
                      onOpenCinema={() => setIsCinemaOpen(true)}
                      onSeek={handleSeek}
                    />
                  </>
                )}
              </div>
            </div>
          )}

          {/* 3. AgriTech Research & Architecture Frame for DaloyAqua */}
          {tributaryId === "daloyaqua" && (
            <div className="relative rounded-xl bg-[#081A1F] border-2 border-[#14B8A6]/50 shadow-2xl overflow-hidden">
              {/* Blueprint Header */}
              <div className="px-3 py-2 bg-[#041B20] border-b border-[#14B8A6]/30 flex items-center justify-between font-mono text-[0.6875rem]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  <span className="text-[#5EEAD4] font-semibold tracking-wider">
                    SDLC PHASE 0 // ARCHITECTURE SPEC
                  </span>
                  <span className="text-zinc-500 hidden sm:inline">
                    • Baleno, Masbate
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[0.625rem]">
                  <span className="px-1.5 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800">
                    STAGE S0
                  </span>
                  <span className="text-teal-400 font-semibold">VERIFIED</span>
                </div>
              </div>

              {/* Viewport */}
              <div
                className={`relative overflow-hidden bg-[#081A1F] group ${
                  viewMode === "simulator"
                    ? "min-h-[350px] sm:min-h-[380px]"
                    : "aspect-video"
                }`}
              >
                {viewMode === "simulator" ? (
                  <DaloyAquaSimulator />
                ) : (
                  <>
                    {posterUrl && (
                      <Image
                        src={posterUrl}
                        alt={`${formattedTitle} Telemetry Dashboard`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={`object-cover transition-opacity duration-500 pointer-events-none ${
                          hasStartedPlayback ? "opacity-0" : "opacity-100"
                        }`}
                      />
                    )}

                    {videoUrl && (
                      <video
                        ref={videoRef}
                        src={videoUrl}
                        poster={posterUrl}
                        preload="metadata"
                        autoPlay={!prefersReducedMotion}
                        loop
                        muted
                        playsInline
                        onLoadedMetadata={(e) => {
                          if (e.currentTarget.duration) {
                            setDuration(e.currentTarget.duration);
                          }
                        }}
                        onPlay={() => {
                          setIsPlaying(true);
                          setHasStartedPlayback(true);
                        }}
                        onPause={() => setIsPlaying(false)}
                        onTimeUpdate={(e) => {
                          setPlaybackTime(e.currentTarget.currentTime);
                        }}
                        aria-label={`${formattedTitle} Telemetry Dashboard Walkthrough`}
                        className="w-full h-full object-cover relative z-10"
                      />
                    )}

                    <VideoControlsBar
                      isPlaying={isPlaying}
                      isMuted={isMuted}
                      playbackTime={playbackTime}
                      duration={duration}
                      onTogglePlay={togglePlay}
                      onToggleMute={toggleMute}
                      onOpenCinema={() => setIsCinemaOpen(true)}
                      onSeek={handleSeek}
                    />
                  </>
                )}
              </div>
            </div>
          )}

          {/* 4. AI Studio Browser for Gordon RamsAi */}
          {tributaryId === "gordon-ramsai" && (
            <div className="relative rounded-xl bg-[#18181b] border border-[#a855f7]/50 shadow-2xl overflow-hidden">
              {/* Studio Header */}
              <div className="px-3 py-2 bg-[#121214] border-b border-[#27272a] flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                </div>
                <div className="flex-1 flex items-center justify-center px-1 sm:px-4">
                  <div className="max-w-md w-full flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#09090b] border border-[#27272a] font-mono text-[0.625rem] text-[#a1a1aa] truncate">
                    <span className="text-[#a855f7] font-semibold text-[0.7rem]">
                      STREAMLIT
                    </span>
                    <span className="truncate">
                      https://gordon-ramsai.streamlit.app
                    </span>
                  </div>
                </div>
                <span className="font-mono text-[0.625rem] text-purple-400 px-1.5 py-0.5 rounded bg-purple-950/60 border border-purple-800/60 font-semibold shrink-0 hidden sm:inline">
                  RAG AGENT
                </span>
              </div>

              {/* Viewport */}
              <div
                className={`relative overflow-hidden bg-[#09090b] group ${
                  viewMode === "simulator"
                    ? "min-h-[350px] sm:min-h-[380px]"
                    : "aspect-video"
                }`}
              >
                {viewMode === "simulator" ? (
                  <GordonRamsAiSimulator />
                ) : (
                  <>
                    {posterUrl && (
                      <Image
                        src={posterUrl}
                        alt={`${formattedTitle} Streamlit Interface`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={`object-cover transition-opacity duration-500 pointer-events-none ${
                          hasStartedPlayback ? "opacity-0" : "opacity-100"
                        }`}
                      />
                    )}

                    {videoUrl && (
                      <video
                        ref={videoRef}
                        src={videoUrl}
                        poster={posterUrl}
                        preload="metadata"
                        autoPlay={!prefersReducedMotion}
                        loop
                        muted
                        playsInline
                        onLoadedMetadata={(e) => {
                          if (e.currentTarget.duration) {
                            setDuration(e.currentTarget.duration);
                          }
                        }}
                        onPlay={() => {
                          setIsPlaying(true);
                          setHasStartedPlayback(true);
                        }}
                        onPause={() => setIsPlaying(false)}
                        onTimeUpdate={(e) => {
                          setPlaybackTime(e.currentTarget.currentTime);
                        }}
                        aria-label={`${formattedTitle} Streamlit App Walkthrough`}
                        className="w-full h-full object-cover relative z-10"
                      />
                    )}

                    <VideoControlsBar
                      isPlaying={isPlaying}
                      isMuted={isMuted}
                      playbackTime={playbackTime}
                      duration={duration}
                      onTogglePlay={togglePlay}
                      onToggleMute={toggleMute}
                      onOpenCinema={() => setIsCinemaOpen(true)}
                      onSeek={handleSeek}
                    />
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Technical Architecture Specifications */}
        <div className="grid grid-cols-2 gap-2 text-[0.75rem] font-mono mt-3">
          {tributaryId === "daloyaqua" && (
            <>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block text-[0.6875rem]">
                  INGESTION
                </span>
                <span className="text-[var(--fg)] font-semibold truncate block">
                  LoRa Sensor Payloads
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block text-[0.6875rem]">
                  RULE ENGINE
                </span>
                <span className="text-[var(--fg)] font-semibold truncate block">
                  Spec 001–003 Phenology
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block text-[0.6875rem]">
                  VALUATION
                </span>
                <span className="text-[var(--fg)] font-semibold truncate block">
                  Copra Moisture Formula
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block text-[0.6875rem]">
                  SMS DISPATCH
                </span>
                <span className="text-[var(--fg)] font-semibold truncate block">
                  Low-Latency Farmer Alerts
                </span>
              </div>
            </>
          )}

          {tributaryId === "playit" && (
            <>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block text-[0.6875rem]">
                  AUDIO STREAM
                </span>
                <span className="text-[var(--fg)] font-semibold truncate block">
                  16kHz PCM Mono
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block text-[0.6875rem]">
                  ASR ENGINE
                </span>
                <span className="text-[var(--fg)] font-semibold truncate block">
                  ~68MB Vosk Model
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block text-[0.6875rem]">
                  SCORING
                </span>
                <span className="text-[var(--fg)] font-semibold truncate block">
                  Levenshtein + Phonetic
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block text-[0.6875rem]">
                  PERSISTENCE
                </span>
                <span className="text-[var(--fg)] font-semibold truncate block">
                  Room SQLite (6 Profiles)
                </span>
              </div>
            </>
          )}

          {tributaryId === "readhub" && (
            <>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block text-[0.6875rem]">
                  INGRESS
                </span>
                <span className="text-[var(--fg)] font-semibold truncate block">
                  Nginx Reverse Proxy
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block text-[0.6875rem]">
                  SECURITY
                </span>
                <span className="text-[var(--fg)] font-semibold truncate block">
                  Stateless JWT RBAC
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block text-[0.6875rem]">
                  RUNTIME
                </span>
                <span className="text-[var(--fg)] font-semibold truncate block">
                  Spring Boot 3 + ShedLock
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block text-[0.6875rem]">
                  STORAGE
                </span>
                <span className="text-[var(--fg)] font-semibold truncate block">
                  MySQL + Cloudinary
                </span>
              </div>
            </>
          )}

          {tributaryId === "gordon-ramsai" && (
            <>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block text-[0.6875rem]">
                  ACCOUNTABILITY
                </span>
                <span className="text-[var(--fg)] font-semibold truncate block">
                  Michelin Star Tracking
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block text-[0.6875rem]">
                  VECTOR RAG
                </span>
                <span className="text-[var(--fg)] font-semibold truncate block">
                  ChromaDB Semantic Search
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block text-[0.6875rem]">
                  AGENT PIPELINE
                </span>
                <span className="text-[var(--fg)] font-semibold truncate block">
                  Google Gemini Model
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block text-[0.6875rem]">
                  HEAT ENGINE
                </span>
                <span className="text-[var(--fg)] font-semibold truncate block">
                  Inferno Roast Prompting
                </span>
              </div>
            </>
          )}
        </div>

        {/* Footer System Status */}
        <div className="mt-3 pt-2.5 border-t border-[var(--line)]/20 flex items-center justify-between text-[0.7rem] font-mono text-[var(--fg-2)]">
          <span>SPECIFICATION // PRODUCTION ARCHITECTURE</span>
          <span className="font-semibold text-[var(--line)]">
            {isActive ? "ACTIVE SYSTEM" : "STANDBY"}
          </span>
        </div>
      </div>

      {/* Full-Scale Cinema Lightbox Modal */}
      {isCinemaOpen && videoUrl && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${formattedTitle} Video Walkthrough`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-8"
          onClick={() => setIsCinemaOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl rounded-2xl border border-[#F2FBFA]/30 bg-[#071E24] p-4 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 pb-3 mb-3 border-b border-[#F2FBFA]/20">
              <div>
                <span className="font-mono text-[0.75rem] uppercase tracking-widest text-[#7CE8DD] block">
                  SYSTEM WALKTHROUGH // {formattedTitle.toUpperCase()}
                </span>
                <h4 className="font-fraunces text-[1.375rem] sm:text-[1.5rem] text-[#F2FBFA] m-0">
                  {formattedTitle} — Software UI Walkthrough
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsCinemaOpen(false)}
                className="px-3.5 py-1.5 rounded-lg border border-[#F2FBFA]/40 bg-[#0B2A30] text-[#F2FBFA] font-mono text-[0.75rem] hover:bg-[#134E5A] cursor-pointer"
              >
                CLOSE [ESC]
              </button>
            </div>
            <div className="w-full aspect-video rounded-xl overflow-hidden bg-black border border-[#F2FBFA]/20">
              <video
                src={videoUrl}
                poster={posterUrl}
                autoPlay
                loop
                muted={isMuted}
                controls
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Reusable Minimal Video Controls Bar with Playhead Scrubber
 */
function VideoControlsBar({
  isPlaying,
  isMuted,
  playbackTime,
  duration,
  onTogglePlay,
  onToggleMute,
  onOpenCinema,
  onSeek,
}: {
  isPlaying: boolean;
  isMuted: boolean;
  playbackTime: number;
  duration: number;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onOpenCinema: () => void;
  onSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  const currentSec = Math.floor(playbackTime);
  const totalSec = Math.max(1, Math.floor(duration));
  const progressPercent = Math.min(
    100,
    Math.max(0, (playbackTime / totalSec) * 100)
  );

  return (
    <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-[#09090b]/95 via-[#09090b]/60 to-transparent pt-6 pb-2 px-3 flex flex-col gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
      {/* Top Status & Timestamp */}
      <div className="flex items-center justify-between font-mono text-[0.625rem] text-[#F2FBFA]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onTogglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className="px-2 py-0.5 rounded bg-[#18181b]/90 border border-white/20 text-[#F2FBFA] hover:bg-white/10 cursor-pointer flex items-center gap-1 font-semibold"
          >
            {isPlaying ? (
              <>
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>PLAY</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            className="p-1 rounded bg-[#18181b]/90 border border-white/20 text-[#F2FBFA] hover:bg-white/10 cursor-pointer"
          >
            {isMuted ? (
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>

          <span className="text-[#7CE8DD] font-semibold hidden sm:inline">
            {isPlaying ? "PRODUCT DEMO" : "PAUSED"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="tabular-nums text-[#F2FBFA]/90">
            00:{String(currentSec).padStart(2, "0")} / 00:
            {String(totalSec).padStart(2, "0")}
          </span>

          <button
            type="button"
            onClick={onOpenCinema}
            aria-label="Expand video in theater mode"
            className="px-2 py-0.5 rounded bg-[#18181b]/90 border border-white/20 text-[#F2FBFA] hover:bg-white/10 cursor-pointer flex items-center gap-1"
          >
            <svg
              width="9"
              height="9"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
            <span className="hidden sm:inline">THEATER</span>
          </button>
        </div>
      </div>

      {/* Interactive Seek Bar */}
      <div
        className="w-full h-1.5 rounded-full bg-[#18181b]/90 overflow-hidden border border-white/20 relative cursor-pointer"
        onClick={onSeek}
      >
        <div
          className="h-full bg-gradient-to-r from-[#06b6d4] via-[#10b981] to-[#38bdf8] transition-all duration-150"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}

/**
 * Backward-compatible dummy export for TributaryArchitectureFlow (system diagram removed per user instruction)
 */
export function TributaryArchitectureFlow(props: {
  steps?: ArchitectureStep[];
  projectTitle?: string;
  selectedStep?: number;
  onSelectStep?: (idx: number) => void;
}) {
  void props;
  return null;
}
