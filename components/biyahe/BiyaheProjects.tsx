"use client";

import { useState, useEffect } from "react";
import { projects, Project, ArchitectureStep } from "@/data/projects";

// Dynamic schematic transit window for the Flagship Board with real-time stage sync
function DynamicSchematicWindow({
  project,
  activeStep,
  activeStepIndex,
  isSimulating,
  onToggleSimulate,
}: {
  project: Project;
  activeStep?: ArchitectureStep;
  activeStepIndex: number;
  isSimulating: boolean;
  onToggleSimulate: () => void;
}) {
  const slug = project.title.toLowerCase();
  const hash = slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const angles = [45, 135, -45];
  const angle = angles[hash % angles.length];

  // Schematic configurations per project
  const schematicConfig = (() => {
    switch (slug) {
      case "playit":
        return {
          busTitle: "AUDIO TELEMETRY BUS // EDGE ASR",
          channel: "KOTLIN STATEFLOW // OFFLINE",
          stage1: { label: "AUDIO IN", value: "16KHZ MONO" },
          stage2: { label: "ASR ENGINE", value: "VOSK (KALDI)" },
          stage3: { label: "DISPATCH", value: "ROOM / PDF" },
          track: "[MIC BUFFER] ➔➔ [EDGE ASR] ➔➔ [BASATRACK]",
          status: "100% OFFLINE EDGE RUNTIME",
        };
      case "readhub":
        return {
          busTitle: "API GATEWAY BUS // STATELESS RUNTIME",
          channel: "SPRING SECURITY // DOCKER",
          stage1: { label: "GATEWAY", value: "NGINX PROXY" },
          stage2: { label: "SERVICE", value: "SPRING BOOT 3" },
          stage3: { label: "STORAGE", value: "MYSQL / CDN" },
          track: "[JWT AUTH] ➔➔ [SHEDLOCK CRON] ➔➔ [REST API]",
          status: "CONTAINER NETWORK VERIFIED",
        };
      case "gordon ramsai":
        return {
          busTitle: "RAG PIPELINE // GEMINI VECTOR RUNTIME",
          channel: "CHROMADB // STREAMLIT",
          stage1: { label: "SESSION", value: "STREAMLIT UI" },
          stage2: { label: "VECTOR RAG", value: "CHROMADB" },
          stage3: { label: "TELEMETRY", value: "LANGFUSE" },
          track: "[PROMPT] ➔➔ [VECTOR EMBED] ➔➔ [GROUNDED AI]",
          status: "ZERO-HALLUCINATION GATED",
        };
      case "daloyaqua":
      default:
        return {
          busTitle: "TELEMETRY BUS // REAL-TIME RUNTIME",
          channel: "FASTAPI ASYNCIO // PYTHON",
          stage1: { label: "SENSORS", value: "SOIL / RAIN" },
          stage2: { label: "ENGINE", value: "APSCHEDULER" },
          stage3: { label: "DISPATCH", value: "SMS GATEWAY" },
          track: "[INGEST] ➔➔ [ANALYZE] ➔➔ [ALERT]",
          status: "PIPELINE ACTIVE",
        };
    }
  })();

  return (
    <div
      aria-hidden="true"
      className="w-full biyahe-plate overflow-hidden relative bg-[#0B1440] border-3 border-black shadow-[0_6px_0_#000000] flex flex-col"
    >
      {/* Top Hazard Bar */}
      <div className="h-4 w-full bg-[#FFC72C] border-b-2 border-black relative overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id={`hazard-bar-${slug}`}
              width="16"
              height="16"
              patternTransform={`rotate(${angle} 0 0)`}
              patternUnits="userSpaceOnUse"
            >
              <rect width="8" height="16" fill="#000000" />
              <rect x="8" width="8" height="16" fill="#FFC72C" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#hazard-bar-${slug})`} />
        </svg>
      </div>

      {/* Schematic Graphic Canvas */}
      <div className="p-5 sm:p-6 bg-[#0B1440] text-white flex flex-col justify-between min-h-[300px]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/20 pb-3 gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full border border-black inline-block ${
                isSimulating ? "bg-[#0F9D58] animate-pulse" : "bg-[#FFC72C]"
              }`}
            />
            <span className="font-bungee text-xs text-[#FFC72C] uppercase tracking-wider">
              {schematicConfig.busTitle}
            </span>
          </div>
          <button
            type="button"
            onClick={onToggleSimulate}
            className="px-2.5 py-1 bg-black/80 hover:bg-black text-[#FFC72C] border border-[#FFC72C] rounded font-mono text-[10px] uppercase font-bold flex items-center gap-1.5 transition-colors"
          >
            <span>{isSimulating ? "⏸ PAUSE SIM" : "▶ AUTO-SIMULATE"}</span>
          </button>
        </div>

        {/* Live Active Stage Monitor */}
        <div className="py-2 px-3 bg-black/60 rounded border border-white/15 my-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-white/70">
            <span>STAGE MONITOR:</span>
            <span className="text-[#FFC72C] font-bold">
              STAGE 0{activeStepIndex + 1} / 04
            </span>
          </div>
          <div className="font-bungee text-xs sm:text-sm text-white truncate mt-0.5">
            {activeStep ? activeStep.title : "PIPELINE INITIALIZED"}
          </div>
          {activeStep?.specs && (
            <div className="text-[10px] font-mono text-[#0F9D58] truncate mt-0.5">
              SPEC: {activeStep.specs}
            </div>
          )}
        </div>

        {/* Schematic Flow 3-Block Matrix */}
        <div className="py-2 space-y-3">
          <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
            <div
              className={`p-2 biyahe-plate text-white shadow-[0_2px_0_#000] transition-colors ${
                activeStepIndex === 0
                  ? "bg-[#1B3FD1] ring-2 ring-[#FFC72C]"
                  : "bg-[#1B3FD1]/60"
              }`}
            >
              <div className="font-bungee text-[9px] text-[#FFC72C]">
                {schematicConfig.stage1.label}
              </div>
              <div className="text-[10px] font-bold truncate">
                {schematicConfig.stage1.value}
              </div>
            </div>
            <div
              className={`p-2 biyahe-plate shadow-[0_2px_0_#000] transition-colors ${
                activeStepIndex === 1 || activeStepIndex === 2
                  ? "bg-white text-black ring-2 ring-[#FFC72C]"
                  : "bg-white/80 text-black/80"
              }`}
            >
              <div className="font-bungee text-[9px] text-[#1B3FD1]">
                {schematicConfig.stage2.label}
              </div>
              <div className="text-[10px] font-bold truncate">
                {schematicConfig.stage2.value}
              </div>
            </div>
            <div
              className={`p-2 biyahe-plate text-white shadow-[0_2px_0_#000] transition-colors ${
                activeStepIndex === 3
                  ? "bg-[#E4262A] ring-2 ring-[#FFC72C]"
                  : "bg-[#E4262A]/60"
              }`}
            >
              <div className="font-bungee text-[9px] text-[#FFC72C]">
                {schematicConfig.stage3.label}
              </div>
              <div className="text-[10px] font-bold truncate">
                {schematicConfig.stage3.value}
              </div>
            </div>
          </div>

          {/* Connection Track */}
          <div className="flex items-center justify-center px-2 text-center text-xs text-[#FFC72C] font-mono tracking-wider">
            <span>{schematicConfig.track}</span>
          </div>
        </div>

        {/* Terminal Footer */}
        <div className="pt-3 border-t border-white/20 flex items-center justify-between gap-2 text-xs">
          <span className="biyahe-plate bg-black text-[#FFC72C] px-2.5 py-1 font-bungee text-[10px] uppercase tracking-widest truncate">
            SYS-SPEC // {project.title.toUpperCase()}
          </span>
          <span className="font-mono text-[10px] text-[#0F9D58] font-bold shrink-0">
            {isSimulating ? "LOOP: TRANSMITTING" : `STATUS: ${schematicConfig.status}`}
          </span>
        </div>
      </div>
    </div>
  );
}

// 4-Stage Architecture Pipeline Component (interactive step-through & data contract display)
function ArchitecturePipelineFlow({
  steps,
  activeStepIndex,
  onSelectStep,
  isSimulating,
  onToggleSimulate,
}: {
  steps: ArchitectureStep[];
  activeStepIndex: number;
  onSelectStep: (index: number) => void;
  isSimulating: boolean;
  onToggleSimulate: () => void;
}) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="space-y-4 pt-2">
      {/* Pipeline Header with Simulation Controls */}
      <div className="flex items-center justify-between gap-3 flex-wrap border-b border-white/20 pb-3">
        <div className="font-bungee text-xs sm:text-sm text-[#FFC72C] uppercase tracking-wider flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFC72C] inline-block border border-black" />
          <span>4-STAGE ARCHITECTURE PIPELINE // STEP-THROUGH DATA CONTRACTS</span>
        </div>

        <button
          type="button"
          onClick={onToggleSimulate}
          style={{ ["--depth-color" as string]: isSimulating ? "#B61E22" : "#0C7E46" }}
          className={`pressable-plate px-4 py-1.5 font-bungee text-[11px] tracking-wider uppercase flex items-center gap-1.5 ${
            isSimulating
              ? "bg-[#E4262A] text-white shadow-[0_2px_0_#000]"
              : "bg-[#0F9D58] text-black shadow-[0_3px_0_#000]"
          }`}
        >
          <span>{isSimulating ? "⏸ PAUSE SIMULATOR" : "▶ SIMULATE DATA FLOW"}</span>
        </button>
      </div>

      {/* 4 Interactive Stage Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {steps.map((s, idx) => {
          const isActive = idx === activeStepIndex;
          return (
            <div
              key={s.step}
              role="button"
              tabIndex={0}
              onClick={() => onSelectStep(idx)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectStep(idx);
                }
              }}
              aria-pressed={isActive}
              className={`biyahe-plate p-4 space-y-2.5 border-2 transition-all cursor-pointer text-left flex flex-col justify-between ${
                isActive
                  ? "bg-[#111C4E] text-white border-[#FFC72C] ring-2 ring-[#FFC72C] shadow-[0_5px_0_#FFC72C]"
                  : "bg-[#0B1440] text-white/90 border-black shadow-[0_3px_0_#000000] hover:border-white/40"
              }`}
            >
              <div className="space-y-2">
                {/* Stage Header */}
                <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded font-bungee text-[10px] uppercase tracking-wider border border-black ${
                        isActive
                          ? "bg-[#FFC72C] text-black font-black"
                          : "bg-black/60 text-[#FFC72C]"
                      }`}
                    >
                      STAGE {s.step}
                    </span>
                    {isActive && (
                      <span className="text-[10px] font-mono text-[#0F9D58] font-bold flex items-center gap-1 animate-pulse">
                        ● ACTIVE STAGE
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-[11px] text-[#FFC72C] font-bold truncate">
                    {s.subtitle}
                  </span>
                </div>

                <h5 className="font-bungee text-xs sm:text-sm text-white tracking-wide">
                  {s.title}
                </h5>

                <p className="font-lexend text-xs leading-relaxed text-white/85">
                  {s.description}
                </p>

                {/* Technologies in stage */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {s.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-[#0F9D58] text-black text-[10px] font-lexend font-bold rounded border border-black"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Data Contract Box */}
              {s.dataContract && (
                <div
                  className={`p-2.5 rounded border space-y-1 font-mono text-[10px] transition-colors mt-2 ${
                    isActive
                      ? "bg-black/80 border-[#FFC72C] text-white"
                      : "bg-black/50 border-white/15 text-white/90"
                  }`}
                >
                  <div className="text-[#FFC72C] font-bold text-[9px] uppercase tracking-wider flex items-center justify-between">
                    <span>DATA CONTRACT SPECIFICATION</span>
                    <span className="text-[9px] text-white/60">I/O VALIDATED</span>
                  </div>
                  <div className="truncate">
                    <span className="text-white/60 font-bold">[IN]</span> {s.dataContract.input}
                  </div>
                  <div className="truncate">
                    <span className="text-[#0F9D58] font-bold">[PROC]</span> {s.dataContract.processing}
                  </div>
                  <div className="truncate">
                    <span className="text-[#E4262A] font-bold">[OUT]</span> {s.dataContract.output}
                  </div>
                </div>
              )}

              {/* Specs & Architectural Tradeoff */}
              {(s.specs || s.tradeoff) && (
                <div className="pt-2 border-t border-white/15 text-[10px] space-y-1 font-lexend text-white/80">
                  {s.specs && (
                    <div>
                      <strong className="text-[#FFC72C]">METRIC SPEC:</strong>{" "}
                      <span className="font-mono text-white/95">{s.specs}</span>
                    </div>
                  )}
                  {s.tradeoff && (
                    <div>
                      <strong className="text-white">ENGINEERING TRADEOFF:</strong>{" "}
                      <span className="italic text-white/90">{s.tradeoff}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function BiyaheProjects() {
  // Default featured project is PlayIT (Flagship Capstone Thesis), with capability to inspect any project as flagship
  const [featuredTitle, setFeaturedTitle] = useState<string>("PlayIT");
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const featured =
    projects.find((p) => p.title.toLowerCase() === featuredTitle.toLowerCase()) ||
    projects[0];
  const supporting = projects.filter(
    (p) => p.title.toLowerCase() !== featured.title.toLowerCase()
  );

  // Auto-simulation interval timer
  useEffect(() => {
    if (!isSimulating) return;
    const stepsCount = featured.architectureSteps?.length || 4;
    const timer = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % stepsCount);
    }, 1600);
    return () => clearInterval(timer);
  }, [isSimulating, featured]);

  // Reset active step when changing featured project
  const handleSelectFeatured = (title: string) => {
    setFeaturedTitle(title);
    setActiveStepIndex(0);
  };

  const handleToggleSimulate = () => {
    setIsSimulating((prev) => !prev);
  };

  const currentStep = featured.architectureSteps?.[activeStepIndex];

  return (
    <section
      id="projects"
      className="bg-white dark:bg-[#0B1440] text-black dark:text-white py-12 sm:py-20 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Title Header */}
        <div className="flex items-center gap-3">
          <div className="biyahe-plate bg-[#1B3FD1] text-white px-5 py-2.5 font-bungee text-xl sm:text-3xl tracking-wide uppercase inline-block shadow-[0_4px_0_#000000]">
            PROJECTS // STOP 02
          </div>
          <div className="h-1 bg-black dark:bg-white flex-1 hidden sm:block" />
        </div>

        {/* Flagship Route Switcher Tabs */}
        <div className="space-y-2">
          <div className="font-bungee text-xs text-black/70 dark:text-white/70 uppercase tracking-wider flex items-center gap-2">
            <span>SELECT FLAGSHIP SPECIFICATION BOARD // DISPATCH CONTROL</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {projects.map((p) => {
              const isSelected = p.title.toLowerCase() === featured.title.toLowerCase();
              return (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => handleSelectFeatured(p.title)}
                  aria-pressed={isSelected}
                  style={{ ["--depth-color" as string]: isSelected ? "#000000" : "#CCCCCC" }}
                  className={`pressable-plate px-4 py-2 font-bungee text-xs tracking-wider uppercase flex items-center gap-2 ${
                    isSelected
                      ? "bg-[#1B3FD1] text-white pressed-in ring-2 ring-black dark:ring-white"
                      : "bg-[#FFC72C] text-black shadow-[0_3px_0_#000000]"
                  }`}
                >
                  <span>★ {p.title.toUpperCase()}</span>
                  {p.category && (
                    <span className="font-mono text-[10px] opacity-80">
                      [{p.category}]
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 1. Featured Project: Full-Width Cobalt Board */}
        {featured && (
          <div className="biyahe-board bg-[#1B3FD1] text-white p-6 sm:p-8 lg:p-10 space-y-6 shadow-[0_6px_0_#000000]">
            {/* Top Bar: Category, Status, Flagship, Role Context */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-white/20 pb-4">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="biyahe-plate bg-[#FFC72C] text-black px-3.5 py-1 font-bungee text-xs uppercase tracking-wider shadow-[0_2px_0_#000]">
                  FLAGSHIP SPECIFICATION
                </span>
                {featured.status && (
                  <span className="px-3.5 py-1 rounded-full bg-[#FFC72C] text-black font-lexend font-black text-xs tracking-wider border-2 border-black shadow-[0_2px_0_#000]">
                    {featured.status}
                  </span>
                )}
                {featured.roleContext && (
                  <span className="biyahe-plate bg-[#0F9D58] text-black px-3 py-1 font-lexend font-bold text-xs uppercase shadow-[0_2px_0_#000]">
                    ROLE: {featured.roleContext}
                  </span>
                )}
              </div>

              {featured.category && (
                <span className="font-mono text-xs text-[#FFC72C] uppercase tracking-wider font-bold">
                  [{featured.category} SYSTEM]
                </span>
              )}
            </div>

            {/* High-Impact Engineering KPI Inspection Badges */}
            {featured.metrics && featured.metrics.length > 0 && (
              <div className="space-y-1.5">
                <div className="font-bungee text-[10px] text-[#FFC72C] uppercase tracking-widest flex items-center gap-2">
                  <span>★ VERIFIED LTO INSPECTION METRICS &amp; CONSTRAINTS</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {featured.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="biyahe-plate bg-[#0B1440] text-white p-3 border-2 border-black shadow-[0_3px_0_#000] flex flex-col justify-between"
                    >
                      <div className="font-bungee text-[9px] text-[#FFC72C] uppercase tracking-wider truncate">
                        {m.label}
                      </div>
                      <div className="font-bungee text-base sm:text-lg text-white tracking-wide my-0.5">
                        {m.value}
                      </div>
                      <div className="font-lexend text-[10px] text-white/70 truncate">
                        {m.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left Column (7 cols): Title, Description, Spec Plate, Stack, Actions */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <h3 className="font-bungee text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-none">
                    {featured.title}
                  </h3>
                  {featured.subtitle && (
                    <p className="font-lexend text-base sm:text-lg text-[#FFC72C] font-semibold mt-2">
                      {featured.subtitle}
                    </p>
                  )}
                </div>

                {/* Chalk Reading Plate for Description & Constraints */}
                <div className="biyahe-plate bg-white text-black p-5 sm:p-6 space-y-3 shadow-[0_4px_0_#000000]">
                  <p className="font-lexend text-base leading-relaxed">
                    {featured.description}
                  </p>
                  <div className="pt-2 border-t border-black/10 text-xs sm:text-sm font-lexend text-black/80 space-y-1.5">
                    {featured.problem && (
                      <p>
                        <strong className="text-[#E4262A]">FIELD PROBLEM:</strong>{" "}
                        {featured.problem}
                      </p>
                    )}
                    {featured.constraints && (
                      <p>
                        <strong className="text-[#1B3FD1]">ENGINEERING CONSTRAINTS:</strong>{" "}
                        {featured.constraints}
                      </p>
                    )}
                    {featured.architecture && (
                      <p>
                        <strong className="text-[#0F9D58]">SYSTEM ARCHITECTURE:</strong>{" "}
                        {featured.architecture}
                      </p>
                    )}
                  </div>
                </div>

                {/* Highlights List */}
                {featured.highlights && featured.highlights.length > 0 && (
                  <div className="biyahe-plate bg-[#0B1440] text-white p-4 space-y-2 border-2 border-black shadow-[0_3px_0_#000]">
                    <div className="font-bungee text-[11px] text-[#FFC72C] uppercase tracking-wider">
                      KEY ENGINEERING DELIVERABLES &amp; OUTCOMES
                    </div>
                    <ul className="space-y-1.5 text-xs font-lexend text-white/90">
                      {featured.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#0F9D58] font-bold">➔</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Stack Chips */}
                <div className="space-y-2">
                  <div className="font-bungee text-xs text-[#FFC72C] tracking-wider uppercase">
                    SYSTEM STACK
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="biyahe-plate bg-[#0F9D58] text-black px-3 py-1 text-xs font-lexend font-bold rounded-lg shadow-[0_2px_0_#000]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Plates: If PlayIT -> Offline Institutional Thesis Plate; Else -> External Links */}
                <div className="pt-2 flex flex-wrap gap-3">
                  {featured.title.toLowerCase() === "playit" ? (
                    <div className="biyahe-plate bg-[#0B1440] text-white p-4 border-2 border-[#FFC72C] shadow-[0_4px_0_#000] flex items-center gap-3 w-full sm:w-auto">
                      <span className="px-2.5 py-1 bg-[#FFC72C] text-black font-bungee text-[10px] uppercase tracking-wider rounded border border-black shrink-0">
                        OFFLINE THESIS
                      </span>
                      <div className="font-lexend text-xs text-white/90">
                        <strong>INSTITUTIONAL / CODE RESTRICTED:</strong> Evaluated in DepEd Grade 1 classrooms on bounded Android hardware.
                      </div>
                    </div>
                  ) : (
                    <>
                      {featured.githubUrl && (
                        <a
                          href={featured.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${featured.title} source code on GitHub`}
                          style={{ ["--depth-color" as string]: "#CCCCCC" }}
                          className="pressable-plate px-6 py-3 bg-white text-black font-bungee text-xs tracking-wider flex items-center gap-2 shadow-[0_4px_0_#000]"
                        >
                          <span>SOURCE CODE REPO</span>
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}
                      {featured.liveUrl && (
                        <a
                          href={featured.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${featured.title} live demo`}
                          style={{ ["--depth-color" as string]: "#B61E22" }}
                          className="pressable-plate px-6 py-3 bg-[#E4262A] text-white font-bungee text-xs tracking-wider flex items-center gap-2 shadow-[0_4px_0_#000]"
                        >
                          <span>OPEN LIVE DEMO</span>
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Right Column (5 cols): Dynamic Schematic / Telemetry Window */}
              <div className="lg:col-span-5 space-y-4">
                <DynamicSchematicWindow
                  project={featured}
                  activeStep={currentStep}
                  activeStepIndex={activeStepIndex}
                  isSimulating={isSimulating}
                  onToggleSimulate={handleToggleSimulate}
                />

                {/* Architecture Paradigm Box */}
                {featured.architecture && (
                  <div className="biyahe-plate bg-[#FFC72C] text-black p-4 space-y-1 shadow-[0_4px_0_#000]">
                    <div className="font-bungee text-[10px] text-[#1B3FD1] uppercase">
                      ARCHITECTURE PARADIGM
                    </div>
                    <p className="font-lexend font-bold text-xs leading-snug">
                      {featured.architecture}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Complete 4-Stage Architecture Pipeline */}
            {featured.architectureSteps && (
              <ArchitecturePipelineFlow
                steps={featured.architectureSteps}
                activeStepIndex={activeStepIndex}
                onSelectStep={setActiveStepIndex}
                isSimulating={isSimulating}
                onToggleSimulate={handleToggleSimulate}
              />
            )}
          </div>
        )}

        {/* 2. Supporting Route List */}
        <div className="space-y-4 pt-6">
          <div className="flex items-center gap-3">
            <span className="biyahe-plate bg-[#0F9D58] text-black px-4 py-1.5 font-bungee text-sm sm:text-base tracking-wider uppercase inline-block shadow-[0_3px_0_#000000]">
              OTHER ROUTES IN FLEET // EXPAND FOR FULL SPECS
            </span>
            <div className="h-0.5 bg-black/30 dark:bg-white/30 flex-1 hidden sm:block" />
          </div>

          <div className="space-y-3">
            {supporting.map((proj, index) => {
              const stopNum = `STOP 02-${String.fromCharCode(66 + index)}`;
              const isPlayIT = proj.title.toLowerCase() === "playit";

              return (
                <details
                  key={proj.title}
                  className="biyahe-board biyahe-accordion group bg-white dark:bg-[#0B1440] border-3 border-black text-black dark:text-white p-5 sm:p-6 shadow-[0_4px_0_#000000] open:shadow-[0_6px_0_#000000] transition-all"
                >
                  <summary className="cursor-pointer list-none flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none focus:outline-none focus:ring-2 focus:ring-[#1B3FD1]">
                    <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      {/* Stamped Stop Plate */}
                      <span className="biyahe-plate bg-[#FFC72C] text-black px-3 py-1 font-bungee text-xs tracking-wider shrink-0 shadow-[0_2px_0_#000]">
                        {stopNum}
                      </span>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bungee text-base sm:text-xl tracking-wide text-black dark:text-white">
                            {proj.title}
                          </h4>
                          {proj.status && (
                            <span className="px-2.5 py-0.5 rounded-full bg-[#FFC72C] text-black text-[11px] font-lexend font-bold border border-black">
                              {proj.status}
                            </span>
                          )}
                          {proj.category && (
                            <span className="font-mono text-xs text-black/60 dark:text-white/60 font-bold">
                              [{proj.category}]
                            </span>
                          )}
                          {proj.roleContext && (
                            <span className="text-[11px] font-lexend text-black/60 dark:text-white/60 font-semibold hidden md:inline">
                              • {proj.roleContext}
                            </span>
                          )}
                        </div>
                        <p className="font-lexend text-xs sm:text-sm text-black/75 dark:text-white/75 truncate max-w-2xl mt-0.5">
                          {proj.subtitle || proj.description}
                        </p>
                      </div>
                    </div>

                    {/* Outer Action Plates & Chevron */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center flex-wrap">
                      {isPlayIT ? (
                        <span className="px-3 py-1 bg-black text-[#FFC72C] font-bungee text-[10px] uppercase tracking-wider rounded border border-black shadow-[0_2px_0_#000]">
                          OFFLINE THESIS
                        </span>
                      ) : (
                        <>
                          {proj.githubUrl && (
                            <a
                              href={proj.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`Source code for ${proj.title}`}
                              style={{ ["--depth-color" as string]: "#0C7E46" }}
                              className="pressable-plate px-3 py-1.5 bg-[#0F9D58] text-black font-bungee text-[11px] tracking-wider inline-flex items-center gap-1 shadow-[0_2px_0_#000]"
                            >
                              <span>REPO</span>
                              <span aria-hidden="true">↗</span>
                            </a>
                          )}
                          {proj.liveUrl && (
                            <a
                              href={proj.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`Live demo for ${proj.title}`}
                              style={{ ["--depth-color" as string]: "#B61E22" }}
                              className="pressable-plate px-3 py-1.5 bg-[#E4262A] text-white font-bungee text-[11px] tracking-wider inline-flex items-center gap-1 shadow-[0_2px_0_#000]"
                            >
                              <span>LIVE APP</span>
                              <span aria-hidden="true">↗</span>
                            </a>
                          )}
                        </>
                      )}
                      <span className="biyahe-chevron font-bungee text-sm transition-transform duration-100 p-1">
                        ▼
                      </span>
                    </div>
                  </summary>

                  {/* Expanded Details: Full Engineering Manifest */}
                  <div className="pt-5 mt-4 border-t-2 border-black/15 dark:border-white/15 space-y-5">
                    {/* Role Context Callout */}
                    {proj.roleContext && (
                      <div className="p-3 biyahe-plate bg-[#FFC72C] text-black font-lexend font-bold text-xs flex items-center gap-2 shadow-[0_2px_0_#000]">
                        <span className="font-bungee text-[10px] text-[#1B3FD1] uppercase">
                          ENGINEERING ROLE:
                        </span>
                        <span>{proj.roleContext}</span>
                      </div>
                    )}

                    {/* KPI Metrics */}
                    {proj.metrics && proj.metrics.length > 0 && (
                      <div className="space-y-1">
                        <div className="font-bungee text-[10px] text-[#1B3FD1] dark:text-[#FFC72C] uppercase tracking-wider">
                          VERIFIED SYSTEM METRICS &amp; PERFORMANCE
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {proj.metrics.map((m) => (
                            <div
                              key={m.label}
                              className="p-2.5 biyahe-plate bg-[#0B1440] text-white border border-black shadow-[0_2px_0_#000]"
                            >
                              <div className="font-bungee text-[9px] text-[#FFC72C] uppercase truncate">
                                {m.label}
                              </div>
                              <div className="font-bungee text-sm text-white my-0.5">
                                {m.value}
                              </div>
                              <div className="font-lexend text-[10px] text-white/70 truncate">
                                {m.detail}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <p className="font-lexend text-sm sm:text-base leading-relaxed text-black dark:text-white max-w-4xl">
                      {proj.description}
                    </p>

                    {/* Problem, Constraints & Architecture Spec Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {proj.problem && (
                        <div className="p-3.5 biyahe-plate bg-[#F8F9FA] dark:bg-[#0B1440] text-black dark:text-white space-y-1">
                          <div className="font-bungee text-[10px] text-[#E4262A] uppercase">
                            FIELD PROBLEM
                          </div>
                          <p className="font-lexend text-xs leading-relaxed">
                            {proj.problem}
                          </p>
                        </div>
                      )}
                      {proj.constraints && (
                        <div className="p-3.5 biyahe-plate bg-[#F8F9FA] dark:bg-[#0B1440] text-black dark:text-white space-y-1">
                          <div className="font-bungee text-[10px] text-[#1B3FD1] dark:text-[#FFC72C] uppercase">
                            CONSTRAINTS
                          </div>
                          <p className="font-lexend text-xs leading-relaxed">
                            {proj.constraints}
                          </p>
                        </div>
                      )}
                      {proj.architecture && (
                        <div className="p-3.5 biyahe-plate bg-[#F8F9FA] dark:bg-[#0B1440] text-black dark:text-white space-y-1">
                          <div className="font-bungee text-[10px] text-[#0F9D58] uppercase">
                            ARCHITECTURE
                          </div>
                          <p className="font-lexend text-xs leading-relaxed">
                            {proj.architecture}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Complete 4-Stage Architecture Pipeline */}
                    {proj.architectureSteps && (
                      <ArchitecturePipelineFlow
                        steps={proj.architectureSteps}
                        activeStepIndex={0}
                        onSelectStep={() => {}}
                        isSimulating={false}
                        onToggleSimulate={() => {}}
                      />
                    )}

                    {/* Key Engineering Highlights */}
                    {proj.highlights && proj.highlights.length > 0 && (
                      <div className="space-y-2">
                        <div className="font-bungee text-xs text-[#1B3FD1] dark:text-[#FFC72C] uppercase">
                          KEY ENGINEERING HIGHLIGHTS &amp; DELIVERABLES
                        </div>
                        <ul className="space-y-1.5 text-xs sm:text-sm font-lexend text-black/90 dark:text-white/90">
                          {proj.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-[#0F9D58] font-bold">➔</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Stack Tags */}
                    <div className="space-y-2">
                      <div className="font-bungee text-xs text-[#0F9D58] uppercase">
                        STACK &amp; RUNTIME LIBRARIES
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {proj.tags.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 rounded bg-[#FFC72C] text-black font-lexend font-bold text-xs border-2 border-black shadow-[0_2px_0_#000]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Links & Feature Switcher */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      {isPlayIT ? (
                        <span className="px-3 py-1.5 bg-black text-[#FFC72C] font-bungee text-xs uppercase tracking-wider rounded border border-black shadow-[0_2px_0_#000]">
                          OFFLINE CAPSTONE THESIS • REPO RESTRICTED
                        </span>
                      ) : (
                        <>
                          {proj.githubUrl && (
                            <a
                              href={proj.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Source code for ${proj.title}`}
                              style={{ ["--depth-color" as string]: "#0C7E46" }}
                              className="pressable-plate px-5 py-2.5 bg-[#0F9D58] text-black font-bungee text-xs tracking-wider inline-flex items-center gap-1.5 shadow-[0_3px_0_#000]"
                            >
                              <span>GITHUB REPO</span>
                              <span aria-hidden="true">↗</span>
                            </a>
                          )}
                          {proj.liveUrl && (
                            <a
                              href={proj.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Live demo for ${proj.title}`}
                              style={{ ["--depth-color" as string]: "#B61E22" }}
                              className="pressable-plate px-5 py-2.5 bg-[#E4262A] text-white font-bungee text-xs tracking-wider inline-flex items-center gap-1.5 shadow-[0_3px_0_#000]"
                            >
                              <span>LIVE DEMO</span>
                              <span aria-hidden="true">↗</span>
                            </a>
                          )}
                        </>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          handleSelectFeatured(proj.title);
                          window.scrollTo({
                            top:
                              (document.getElementById("projects")?.offsetTop || 0) - 80,
                            behavior: "smooth",
                          });
                        }}
                        style={{ ["--depth-color" as string]: "#1632A7" }}
                        className="pressable-plate px-5 py-2.5 bg-[#1B3FD1] text-white font-bungee text-xs tracking-wider inline-flex items-center gap-1.5 shadow-[0_3px_0_#000]"
                      >
                        <span>★ INSPECT ON MAIN BOARD</span>
                        <span aria-hidden="true">↑</span>
                      </button>
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
