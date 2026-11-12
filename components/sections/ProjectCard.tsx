"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Project } from "@/data/projects";
import {
  ExternalLink,
  Smartphone,
  Droplets,
  BookOpen,
  Sparkles,
  Folder,
  Layers,
  ShieldAlert,
  HelpCircle,
  Cpu,
  Play,
  Pause,
  Maximize2,
  X,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import ArchitectureFlow from "@/components/sections/ArchitectureFlow";
import CardSpotlight from "@/components/ui/CardSpotlight";
import { ConstellationNode } from "@/components/interactive/ConstellationNode";
import { TechLogo } from "@/components/current/BrandLogos";

interface ProjectCardProps {
  project: Project;
}

function renderProjectIcon(title: string, className = "w-6 h-6") {
  const t = title.toLowerCase();
  if (t.includes("playit")) return <Smartphone className={className} />;
  if (t.includes("daloy")) return <Droplets className={className} />;
  if (t.includes("readhub")) return <BookOpen className={className} />;
  if (t.includes("ramsa") || t.includes("rasma"))
    return <Sparkles className={className} />;
  return <Folder className={className} />;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const isFlagship = project.title === "PlayIT";
  const projectNodeId = `project-${project.title.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaContainerRef = useRef<HTMLDivElement | null>(null);

  const [activeBeatIndex, setActiveBeatIndex] = useState<number>(0);
  const [selectedStageIndex, setSelectedStageIndex] = useState<number | null>(0);
  const [forceOpenInspector, setForceOpenInspector] =
    useState<boolean>(isFlagship);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasStartedVideo, setHasStartedVideo] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"video" | "storyboard">("video");
  const [isTheaterOpen, setIsTheaterOpen] = useState<boolean>(false);

  // Detect prefers-reduced-motion: reduce
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setPrefersReducedMotion(mq.matches);
      if (mq.matches) {
        setViewMode("storyboard");
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      }
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Auto-play on viewport intersection when reduced-motion is off
  useEffect(() => {
    if (prefersReducedMotion || viewMode !== "video" || !project.videoUrl)
      return;
    const el = mediaContainerRef.current;
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
                setHasStartedVideo(true);
              })
              .catch(() => {});
          } else if (!v.paused) {
            v.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [prefersReducedMotion, viewMode, project.videoUrl]);

  // Jump to one of the 6 beats (each beat is 5.0 seconds in the 30.0s loop)
  const selectBeat = (beatIdx: number, seekVideo = true) => {
    setActiveBeatIndex(beatIdx);
    const beatMeta = project.storyboardBeats?.[beatIdx];
    if (beatMeta && beatMeta.stageIndex !== null) {
      setSelectedStageIndex(beatMeta.stageIndex);
      setForceOpenInspector(true);
    }
    if (seekVideo && videoRef.current && viewMode === "video") {
      videoRef.current.currentTime = beatIdx * 5;
      if (videoRef.current.paused && !prefersReducedMotion) {
        videoRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasStartedVideo(true);
          })
          .catch(() => {});
      }
    }
  };

  // When a user selects Stage 01-04 in ArchitectureFlow.tsx, sync to Beat 2-5
  const handleSelectStageFromInspector = (stageIdx: number | null) => {
    setSelectedStageIndex(stageIdx);
    if (stageIdx !== null) {
      const targetBeatIdx = stageIdx + 1; // Stage 01..04 maps to Beat 2..5 (indices 1..4)
      setActiveBeatIndex(targetBeatIdx);
      if (videoRef.current && viewMode === "video") {
        videoRef.current.currentTime = targetBeatIdx * 5;
      }
    }
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play()
        .then(() => {
          setIsPlaying(true);
          setHasStartedVideo(true);
        })
        .catch(() => {});
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const connections = useMemo(() => {
    const conns: string[] = [];
    if (project.category === "Mobile") {
      conns.push("pillar-offline");
    } else if (project.category === "Backend" || project.category === "Web") {
      conns.push("pillar-backend");
    } else if (project.category === "AI / Full-Stack") {
      conns.push("pillar-ai");
    }

    if (project.tags) {
      for (const tag of project.tags) {
        conns.push(`skill-${tag.toLowerCase().replace(/[^a-z0-9]/g, "-")}`);
      }
    }
    return conns;
  }, [project.category, project.tags]);

  const nodeColor =
    project.category === "Mobile"
      ? "#06b6d4"
      : project.category === "AI / Full-Stack"
      ? "#a855f7"
      : "#38bdf8";

  const currentBeat =
    project.storyboardBeats?.[activeBeatIndex] || project.storyboardBeats?.[0];

  const isBeat1Problem = activeBeatIndex === 0;
  const isBeat6Tradeoff = activeBeatIndex === 5;

  return (
    <ConstellationNode
      id={projectNodeId}
      label={project.title}
      category="project"
      tier={isFlagship ? "major" : "minor"}
      color={nodeColor}
      connections={connections}
      showAnchorPip
      pipPosition="top-right"
      className="h-full block rounded-2xl"
    >
      <CardSpotlight
        className={`group flex flex-col h-full rounded-2xl bg-white/90 dark:bg-zinc-900/60 backdrop-blur-md border hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-cyan-950/30 transition-all duration-200 p-6 sm:p-7 ${
          isFlagship
            ? "border-cyan-500/50 dark:border-cyan-500/40 ring-1 ring-cyan-500/30 shadow-md shadow-cyan-950/20"
            : "border-zinc-200/80 dark:border-zinc-800/90 hover:border-cyan-500/50 dark:hover:border-cyan-500/40"
        }`}
      >
        {/* Card Header */}
        <div className="flex items-start gap-4 mb-3">
          {/* Item Icon Box */}
          <div
            className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center border transition-all duration-200 ${
              isFlagship
                ? "bg-cyan-100/80 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-300 border-cyan-300 dark:border-cyan-700 shadow-sm"
                : "bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 border-cyan-100 dark:border-cyan-900/60 group-hover:scale-105 group-hover:border-cyan-500/40"
            }`}
          >
            {renderProjectIcon(project.title, "w-6 h-6")}
          </div>

          {/* Item Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors truncate">
                  {project.title}
                </h3>
                {isFlagship && (
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-50 dark:bg-cyan-950/70 text-cyan-700 dark:text-cyan-300 border border-cyan-200/80 dark:border-cyan-800/60">
                    Primary Thesis
                  </span>
                )}
              </div>

              {project.featured && !isFlagship && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-cyan-100/80 dark:bg-cyan-950/70 text-cyan-800 dark:text-cyan-300 border border-cyan-300/70 dark:border-cyan-800/60 flex-shrink-0">
                  Featured
                </span>
              )}
            </div>

            {project.subtitle && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5 truncate">
                {project.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Badges & Role Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            {project.status && (
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider ${
                  project.status === "Flagship Engineering Thesis"
                    ? "bg-cyan-100/80 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-700/80 font-bold"
                    : project.status === "In Progress"
                    ? "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60"
                    : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60"
                }`}
              >
                {project.status}
              </span>
            )}

            {project.category && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60">
                {project.category}
              </span>
            )}

            {project.roleContext && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-cyan-800 dark:text-cyan-300/90 bg-cyan-50/70 dark:bg-cyan-950/40 border border-cyan-200/60 dark:border-cyan-800/40">
                {project.roleContext}
              </span>
            )}
          </div>

          {/* Mode Toggle: 30s Anime Loop vs 6-Beat Storyboard Carousel */}
          {project.videoUrl && (
            <div
              className="inline-flex rounded-lg border border-cyan-500/30 bg-zinc-950/80 p-0.5"
              role="group"
              aria-label={`${project.title} Storyboard Mode`}
            >
              <button
                type="button"
                onClick={() => setViewMode("video")}
                className={`px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                  viewMode === "video"
                    ? "bg-cyan-500 text-zinc-950 font-bold"
                    : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                Video Walkthrough
              </button>
              <button
                type="button"
                onClick={() => setViewMode("storyboard")}
                className={`px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                  viewMode === "storyboard"
                    ? "bg-cyan-500 text-zinc-950 font-bold"
                    : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                Storyboard Grid
              </button>
            </div>
          )}
        </div>

        {/* Drop-In Integration Pattern (portfolio_ghibli_storyboards.md §137-143):
            1. Theme-Blended 16:9 Container (rounded-xl border border-cyan-500/30 bg-zinc-950) directly below Badges & Role Row
            2. Interactive 6-Beat Chapter Scrubber (00:00 - 00:30)
            3. <80 KB WebP Poster via next/image + preload="none" + prefers-reduced-motion 6-beat storyboard carousel */}
        {project.videoUrl && (
          <div ref={mediaContainerRef} className="mb-5 space-y-2.5">
            {viewMode === "video" && !prefersReducedMotion ? (
              <div
                className="relative w-full aspect-video rounded-xl border border-cyan-500/30 bg-zinc-950 shadow-inner shadow-cyan-950/40 overflow-hidden group/video"
                onMouseEnter={() => {
                  if (videoRef.current?.paused) {
                    videoRef.current
                      .play()
                      .then(() => {
                        setIsPlaying(true);
                        setHasStartedVideo(true);
                      })
                      .catch(() => {});
                  }
                }}
              >
                {/* <80 KB WebP Poster via next/image */}
                {project.posterUrl && (
                  <Image
                    src={project.posterUrl}
                    alt={`${project.title} Hybrid Ghibli x Pixar storyboard poster`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`object-cover transition-opacity duration-500 pointer-events-none ${
                      hasStartedVideo ? "opacity-0" : "opacity-100"
                    }`}
                  />
                )}

                <video
                  ref={videoRef}
                  src={project.videoUrl}
                  poster={project.posterUrl}
                  preload="none"
                  muted
                  loop
                  playsInline
                  onPlay={() => {
                    setIsPlaying(true);
                    setHasStartedVideo(true);
                  }}
                  onPause={() => setIsPlaying(false)}
                  onTimeUpdate={(e) => {
                    const t = e.currentTarget.currentTime;
                    const beatIdx = Math.min(5, Math.floor(t / 5));
                    if (beatIdx !== activeBeatIndex) {
                      setActiveBeatIndex(beatIdx);
                      const beatMeta = project.storyboardBeats?.[beatIdx];
                      if (beatMeta && beatMeta.stageIndex !== null) {
                        setSelectedStageIndex(beatMeta.stageIndex);
                      }
                    }
                  }}
                  aria-label={`${project.title} 30-second Hybrid Ghibli x Pixar explanatory video`}
                  className="w-full h-full object-cover relative z-10"
                />

                {/* Bottom Gradient Fade so #09090b video canvas merges seamlessly into card body */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent z-20"
                  aria-hidden="true"
                />

                {/* Top-Right Play/Pause & Theater Controls */}
                <div className="absolute top-2.5 right-2.5 z-30 flex items-center gap-1.5 opacity-90 group-hover/video:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                    className="px-2.5 py-1 rounded-md bg-zinc-900/90 border border-cyan-500/40 text-zinc-100 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 hover:bg-zinc-900 cursor-pointer shadow-md"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-3 h-3 text-cyan-400" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 text-cyan-400" />
                        <span>Play</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsTheaterOpen(true)}
                    aria-label={`Expand ${project.title} 30-second storyboard video`}
                    className="px-2.5 py-1 rounded-md bg-zinc-900/90 border border-cyan-500/40 text-zinc-100 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 hover:bg-zinc-900 cursor-pointer shadow-md"
                  >
                    <Maximize2 className="w-3 h-3 text-cyan-400" />
                    <span>Theater</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Static 6-Beat Storyboard Carousel (prefers-reduced-motion: reduce fallback or 6-Beat Strip tab) */
              <div className="rounded-xl border border-cyan-500/30 bg-zinc-950 p-3 shadow-inner shadow-cyan-950/40 space-y-2.5">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {project.storyboardBeats?.map((beat, idx) => {
                    const isSelected = activeBeatIndex === idx;
                    return (
                      <button
                        key={beat.beat}
                        type="button"
                        onClick={() => selectBeat(idx, false)}
                        onMouseEnter={() => selectBeat(idx, false)}
                        className={`group/panel relative aspect-video rounded-lg overflow-hidden border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-cyan-400 ring-2 ring-cyan-500/40 scale-[1.01]"
                            : "border-zinc-800 opacity-80 hover:opacity-100 hover:border-cyan-500/40"
                        }`}
                      >
                        <Image
                          src={`/images/projects/${project.slug}-beat-${idx + 1}.webp`}
                          alt={`${project.title} ${beat.shortLabel}: ${beat.role}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 20vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/75 to-transparent px-2 py-1.5">
                          <div className="text-[9px] font-mono font-bold uppercase tracking-wider text-cyan-300 truncate">
                            {beat.shortLabel} ({beat.timeRange})
                          </div>
                          <div className="text-[10px] font-mono text-zinc-200 truncate">
                            {beat.hudBadge}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Interactive 6-Beat Chapter Scrubber (00:00 – 00:30) */}
            {project.storyboardBeats && (
              <div className="space-y-2">
                <div
                  className="grid grid-cols-2 sm:grid-cols-6 gap-1.5"
                  role="tablist"
                  aria-label={`${project.title} 30-second video beats`}
                >
                  {project.storyboardBeats.map((beat, idx) => {
                    const isCurrent = activeBeatIndex === idx;
                    const accentClasses =
                      beat.semanticAccent === "rose"
                        ? isCurrent
                          ? "bg-rose-500/20 border-rose-500 text-rose-300"
                          : "hover:border-rose-500/50"
                        : beat.semanticAccent === "amber"
                        ? isCurrent
                          ? "bg-amber-500/20 border-amber-500 text-amber-300"
                          : "hover:border-amber-500/50"
                        : beat.semanticAccent === "emerald"
                        ? isCurrent
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                          : "hover:border-emerald-500/50"
                        : isCurrent
                        ? "bg-cyan-500/20 border-cyan-400 text-cyan-200"
                        : "hover:border-cyan-500/50";

                    return (
                      <button
                        key={beat.beat}
                        type="button"
                        role="tab"
                        aria-selected={isCurrent}
                        onClick={() => selectBeat(idx, true)}
                        onMouseEnter={() => selectBeat(idx, true)}
                        className={`px-2 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider border transition-all cursor-pointer text-center truncate ${
                          isCurrent
                            ? `${accentClasses} font-bold shadow-sm`
                            : `bg-zinc-900/90 border-zinc-800 text-zinc-400 hover:text-zinc-200 ${accentClasses}`
                        }`}
                      >
                        {beat.shortLabel}
                      </button>
                    );
                  })}
                </div>

                {/* Synchronized Geist Mono HUD Overlay Caption Strip */}
                {currentBeat && (
                  <div className="px-3 py-2 rounded-xl bg-zinc-900/90 border border-cyan-500/40 text-xs flex flex-col gap-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                        {currentBeat.shortLabel} ({currentBeat.timeRange}) •{" "}
                        {currentBeat.role}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border ${
                          currentBeat.semanticAccent === "rose"
                            ? "bg-rose-950/70 text-rose-300 border-rose-500/40"
                            : currentBeat.semanticAccent === "amber"
                            ? "bg-amber-950/70 text-amber-300 border-amber-500/40"
                            : currentBeat.semanticAccent === "emerald"
                            ? "bg-emerald-950/70 text-emerald-300 border-emerald-500/40"
                            : "bg-cyan-950/70 text-cyan-300 border-cyan-500/40"
                        }`}
                      >
                        {currentBeat.hudBadge}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-300 leading-relaxed font-sans">
                      {currentBeat.action}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* High-level Summary */}
        <p className="text-sm text-zinc-700 dark:text-zinc-200 leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Engineering Specs & Architectural Context Block */}
        <div
          className={`space-y-3.5 p-4 rounded-xl bg-zinc-50/80 dark:bg-zinc-950/60 border text-xs mb-5 transition-all ${
            isBeat1Problem
              ? "border-rose-500/50 dark:border-rose-500/50 ring-1 ring-rose-500/20"
              : "border-zinc-200/70 dark:border-zinc-800/80"
          }`}
        >
          {/* Problem */}
          {project.problem && (
            <div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                <HelpCircle className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
                <span>Problem &amp; Context</span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed pl-5">
                {project.problem}
              </p>
            </div>
          )}

          {/* Constraints */}
          {project.constraints && (
            <div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Constraints &amp; Environment</span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed pl-5">
                {project.constraints}
              </p>
            </div>
          )}

          {/* Architecture */}
          {project.architecture && (
            <div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                <Layers className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Architecture &amp; Approach</span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed pl-5">
                {project.architecture}
              </p>
            </div>
          )}

          {/* Key Engineering Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="pt-1">
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                <Cpu className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Key Technical Highlights</span>
              </div>
              <ul className="space-y-1.5 pl-5">
                {project.highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-zinc-600 dark:text-zinc-300 leading-relaxed"
                  >
                    <span className="text-cyan-500 font-mono font-bold mt-0.5">
                      ›
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* System Architecture Flow (Synchronized with 6-Beat Video Scrubber) */}
        {project.architectureSteps && (
          <div className="mb-5">
            <ArchitectureFlow
              steps={project.architectureSteps}
              projectTitle={project.title}
              defaultOpen={isFlagship}
              forceOpen={forceOpenInspector}
              selectedStepIndex={selectedStageIndex}
              onSelectStepIndex={handleSelectStageFromInspector}
              highlightTradeoff={isBeat6Tradeoff}
            />
          </div>
        )}

        {/* Tech Stack Tags with Vector Logos */}
        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 mb-6">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 border border-zinc-200/70 dark:border-zinc-700/60 hover:border-cyan-500/40 transition-colors"
              >
                <TechLogo
                  name={tag}
                  className="w-3.5 h-3.5 shrink-0"
                />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Card Actions */}
        <div className="flex items-center gap-3 mt-auto">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700/70 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              aria-label={`${project.title} repository on GitHub`}
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Source Code</span>
            </a>
          ) : (
            <div className="flex-1 py-2 text-center text-xs font-mono text-zinc-400 dark:text-zinc-500 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800">
              Repository Pending
            </div>
          )}

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-zinc-950 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 shadow-sm"
              aria-label={`${project.title} live demo`}
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center p-2 rounded-lg text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/60 border border-cyan-200/80 dark:border-cyan-900/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              title="Open Repository"
              aria-label={`Open ${project.title} repository`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : null}
        </div>
      </CardSpotlight>

      {/* Fullscreen Theater Modal */}
      {isTheaterOpen && project.videoUrl && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} 30-Second Storyboard Video`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-8"
          onClick={() => setIsTheaterOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl rounded-2xl border border-cyan-500/40 bg-zinc-950 p-4 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 pb-3 mb-3 border-b border-zinc-800">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-cyan-400 block">
                  30-SECOND HYBRID GHIBLI × PIXAR STORYBOARD
                </span>
                <h4 className="text-lg font-bold text-zinc-100">
                  {project.title} — {project.subtitle}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsTheaterOpen(false)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-200 font-mono text-xs hover:bg-zinc-800 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close</span>
              </button>
            </div>
            <div className="w-full aspect-video rounded-xl overflow-hidden bg-zinc-950 border border-cyan-500/30">
              <video
                src={project.videoUrl}
                poster={project.posterUrl}
                autoPlay
                loop
                muted
                controls
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </ConstellationNode>
  );
}
