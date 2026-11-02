"use client";

import React, { useState } from "react";
import type { TributaryId } from "./CurrentContext";
import { TRIBUTARIES } from "./CurrentContext";
import type { ArchitectureStep } from "@/data/projects";

export function TributaryStationVisualizer({
  tributaryId,
  isActive,
  nodeId,
  isEddy = false,
}: {
  tributaryId: Exclude<TributaryId, "none">;
  isActive: boolean;
  nodeId: string;
  isEddy?: boolean;
}) {
  const meta = TRIBUTARIES[tributaryId];

  return (
    <div className="w-full flex flex-col items-center lg:items-end justify-center relative py-4">
      {/* Hidden anchor target measured by CurrentLine SVG spline */}
      <div
        id={nodeId}
        data-node={isEddy ? "eddy" : "station"}
        data-tributary-node={tributaryId}
        className="w-6 h-6 rounded-full opacity-0 pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />

      {/* Docked Hydrological Station Telemetry Card */}
      <div
        className={`w-full max-w-[22rem] rounded-2xl border transition-all duration-700 p-5 backdrop-blur-sm ${
          isActive
            ? "border-[var(--line)] bg-[var(--tributary-surface)] shadow-lg scale-[1.01]"
            : "border-[var(--line)]/30 bg-[var(--tributary-surface)]/60 opacity-80"
        }`}
      >
        {/* Top Station Header */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-[var(--line)]/25">
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
              {meta.tributaryName}
            </span>
          </div>
          <span className="font-mono text-[0.75rem] text-[var(--fg-2)] font-medium">
            {meta.depthMeters}m
          </span>
        </div>

        {/* Domain-Specific Fluid SVG Visualizer */}
        <div className="my-4 h-28 w-full flex items-center justify-center overflow-hidden rounded-xl bg-[var(--zone-bg)]/50 border border-[var(--line)]/15 px-3">
          {tributaryId === "daloyaqua" && (
            <svg
              viewBox="0 0 240 90"
              className="w-full h-full overflow-visible"
              aria-hidden="true"
            >
              {/* Concentric Hydrological Sensor Ripples */}
              <circle
                cx="60"
                cy="45"
                r="12"
                fill="none"
                stroke="var(--line)"
                strokeWidth="1.75"
                className={isActive ? "tributary-ripple-1" : ""}
              />
              <circle
                cx="60"
                cy="45"
                r="24"
                fill="none"
                stroke="var(--line)"
                strokeWidth="1.25"
                strokeDasharray="4 3"
                opacity="0.7"
                className={isActive ? "tributary-ripple-2" : ""}
              />
              <circle
                cx="60"
                cy="45"
                r="36"
                fill="none"
                stroke="var(--line)"
                strokeWidth="1"
                opacity="0.4"
                className={isActive ? "tributary-ripple-3" : ""}
              />
              <circle cx="60" cy="45" r="4" fill="var(--line)" />

              {/* Hydrological Sine Wave Stream */}
              <path
                d="M 105 32 Q 125 18, 145 32 T 185 32 T 225 32"
                fill="none"
                stroke="var(--line)"
                strokeWidth="2"
                strokeLinecap="round"
                className={isActive ? "tributary-wave-flow" : ""}
              />
              <path
                d="M 105 48 Q 125 36, 145 48 T 185 48 T 225 48"
                fill="none"
                stroke="var(--line)"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.65"
                className={isActive ? "tributary-wave-flow" : ""}
              />
              <path
                d="M 105 64 Q 125 54, 145 64 T 185 64 T 225 64"
                fill="none"
                stroke="var(--line)"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.4"
              />
            </svg>
          )}

          {tributaryId === "playit" && (
            <svg
              viewBox="0 0 240 90"
              className="w-full h-full"
              aria-hidden="true"
            >
              {/* 16kHz Acoustic Phoneme Harmonics */}
              {[
                { x: 20, h: 18 },
                { x: 34, h: 36 },
                { x: 48, h: 58 },
                { x: 62, h: 30 },
                { x: 76, h: 68 },
                { x: 90, h: 46 },
                { x: 104, h: 24 },
                { x: 118, h: 62 },
                { x: 132, h: 74 },
                { x: 146, h: 42 },
                { x: 160, h: 28 },
                { x: 174, h: 54 },
                { x: 188, h: 36 },
                { x: 202, h: 20 },
                { x: 216, h: 14 },
              ].map((bar, i) => (
                <rect
                  key={i}
                  x={bar.x}
                  y={45 - bar.h / 2}
                  width="6"
                  height={bar.h}
                  rx="3"
                  fill="var(--line)"
                  opacity={i % 2 === 0 ? "0.9" : "0.55"}
                  className={
                    isActive
                      ? i % 2 === 0
                        ? "tributary-bar-pulse-a"
                        : "tributary-bar-pulse-b"
                      : ""
                  }
                />
              ))}
              {/* Carrier Current Line */}
              <path
                d="M 10 45 L 230 45"
                stroke="var(--line)"
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.5"
              />
            </svg>
          )}

          {tributaryId === "readhub" && (
            <svg
              viewBox="0 0 240 90"
              className="w-full h-full"
              aria-hidden="true"
            >
              {/* Parallel Conduit Channels (Nginx -> JWT -> Service -> DB) */}
              <line
                x1="20"
                y1="25"
                x2="220"
                y2="25"
                stroke="var(--line)"
                strokeWidth="2"
                strokeDasharray="8 4"
                className={isActive ? "tributary-stream-dash" : ""}
              />
              <line
                x1="20"
                y1="45"
                x2="220"
                y2="45"
                stroke="var(--line)"
                strokeWidth="2.5"
              />
              <line
                x1="20"
                y1="65"
                x2="220"
                y2="65"
                stroke="var(--line)"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                opacity="0.7"
                className={isActive ? "tributary-stream-dash" : ""}
              />
              {/* Gateway Checkpoint Nodes */}
              {[45, 95, 145, 195].map((cx, i) => (
                <g key={i}>
                  <circle
                    cx={cx}
                    cy="45"
                    r="8"
                    fill="var(--zone-bg)"
                    stroke="var(--line)"
                    strokeWidth="2"
                  />
                  <circle cx={cx} cy="45" r="3" fill="var(--line)" />
                </g>
              ))}
            </svg>
          )}

          {tributaryId === "gordon-ramsai" && (
            <svg
              viewBox="0 0 240 90"
              className="w-full h-full"
              aria-hidden="true"
            >
              {/* Thermal Convection & RAG Vector Cosine Stream */}
              <path
                d="M 15 65 C 55 65, 65 22, 115 22 C 165 22, 175 65, 225 25"
                fill="none"
                stroke="var(--line)"
                strokeWidth="2.25"
                strokeLinecap="round"
                className={isActive ? "tributary-wave-flow" : ""}
              />
              <path
                d="M 15 35 C 60 35, 75 68, 125 55 C 175 42, 185 20, 225 55"
                fill="none"
                stroke="var(--line)"
                strokeWidth="1.5"
                strokeDasharray="5 3"
                opacity="0.75"
                className={isActive ? "tributary-stream-dash" : ""}
              />
              {/* Vector Embedding Cluster Points */}
              {[
                { x: 52, y: 48 },
                { x: 96, y: 26 },
                { x: 138, y: 52 },
                { x: 182, y: 34 },
                { x: 212, y: 28 },
              ].map((pt, i) => (
                <circle
                  key={i}
                  cx={pt.x}
                  cy={pt.y}
                  r="4.5"
                  fill="var(--line)"
                  className={isActive ? "tributary-ripple-1" : ""}
                />
              ))}
            </svg>
          )}
        </div>

        {/* Telemetry Readout Metrics */}
        <div className="grid grid-cols-2 gap-2.5 text-[0.75rem] font-mono">
          {tributaryId === "daloyaqua" && (
            <>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block">INGESTION</span>
                <span className="text-[var(--fg)] font-semibold">
                  Zod Validated
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block">CRON PIPELINE</span>
                <span className="text-[var(--fg)] font-semibold">
                  Async Worker
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block">RULE ENGINE</span>
                <span className="text-[var(--fg)] font-semibold">
                  Phenological
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block">DISPATCH</span>
                <span className="text-[var(--fg)] font-semibold">
                  SMS Alerts
                </span>
              </div>
            </>
          )}

          {tributaryId === "playit" && (
            <>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block">AUDIO STREAM</span>
                <span className="text-[var(--fg)] font-semibold">
                  16kHz PCM Mono
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block">ASR ENGINE</span>
                <span className="text-[var(--fg)] font-semibold">
                  Vosk Offline
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block">LATENCY</span>
                <span className="text-[var(--fg)] font-semibold">
                  &lt; 40ms Buffer
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block">PERSISTENCE</span>
                <span className="text-[var(--fg)] font-semibold">
                  Room SQLite
                </span>
              </div>
            </>
          )}

          {tributaryId === "readhub" && (
            <>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block">INGRESS</span>
                <span className="text-[var(--fg)] font-semibold">
                  Nginx Proxy
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block">SECURITY</span>
                <span className="text-[var(--fg)] font-semibold">
                  Stateless JWT
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block">RUNTIME</span>
                <span className="text-[var(--fg)] font-semibold">
                  Spring Boot 3
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block">STORAGE</span>
                <span className="text-[var(--fg)] font-semibold">
                  ACID MySQL
                </span>
              </div>
            </>
          )}

          {tributaryId === "gordon-ramsai" && (
            <>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block">VECTOR DB</span>
                <span className="text-[var(--fg)] font-semibold">
                  ChromaDB RAG
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block">RETRIEVAL</span>
                <span className="text-[var(--fg)] font-semibold">
                  &lt; 85ms Cosine
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block">SYNTHESIS</span>
                <span className="text-[var(--fg)] font-semibold">
                  Gemini API
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--zone-bg)]/40 border border-[var(--line)]/15">
                <span className="text-[var(--fg-2)] block">TRACING</span>
                <span className="text-[var(--fg)] font-semibold">
                  Langfuse SDK
                </span>
              </div>
            </>
          )}
        </div>

        {/* Footer Flow Rate */}
        <div className="mt-3 pt-2.5 border-t border-[var(--line)]/20 flex items-center justify-between text-[0.7rem] font-mono text-[var(--fg-2)]">
          <span>STREAM // {meta.flowRate}</span>
          <span>{isActive ? "ACTIVE CURRENT" : "STANDBY"}</span>
        </div>
      </div>
    </div>
  );
}

export function TributaryArchitectureFlow({
  steps,
  projectTitle,
}: {
  steps: ArchitectureStep[];
  projectTitle: string;
}) {
  const [selectedStep, setSelectedStep] = useState<number>(0);

  if (!steps || steps.length === 0) return null;

  const active = steps[selectedStep] || steps[0];

  return (
    <div className="mt-8 w-full rounded-2xl border border-[var(--line)]/30 bg-[var(--tributary-surface)]/70 p-5 sm:p-6 transition-colors duration-700">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <span className="font-mono text-[0.75rem] uppercase tracking-wider text-[var(--fg-2)] font-semibold">
          TRIBUTARY PIPELINE // {projectTitle.toUpperCase()} ARCHITECTURE FLOW
        </span>
        <span className="font-mono text-[0.75rem] text-[var(--fg-2)]">
          STAGE {active.step} OF 0{steps.length}
        </span>
      </div>

      {/* Interactive Step Selector Pills */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5"
        role="tablist"
        aria-label={`${projectTitle} architecture stages`}
      >
        {steps.map((s, idx) => {
          const isSelected = idx === selectedStep;
          return (
            <button
              key={s.step}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedStep(idx)}
              className={`text-left p-2.5 rounded-xl border transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] ${
                isSelected
                  ? "border-[var(--line)] bg-[var(--zone-bg)] text-[var(--fg)] shadow-sm"
                  : "border-[var(--line)]/20 bg-transparent text-[var(--fg-2)] hover:border-[var(--line)]/50 hover:text-[var(--fg)]"
              }`}
            >
              <div className="font-mono text-[0.7rem] opacity-75">
                STAGE {s.step}
              </div>
              <div className="text-[0.8125rem] font-medium leading-tight mt-0.5 truncate">
                {s.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Step Detail Stream */}
      <div className="rounded-xl bg-[var(--zone-bg)]/60 border border-[var(--line)]/20 p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h4 className="font-fraunces text-[1.125rem] text-[var(--fg)] m-0">
            {active.step}. {active.title}{" "}
            <span className="text-[0.9375rem] font-sans text-[var(--fg-2)] font-normal">
              — {active.subtitle}
            </span>
          </h4>
          {active.specs && (
            <span className="font-mono text-[0.75rem] text-[var(--fg-2)] bg-[var(--tributary-surface)] px-2.5 py-0.5 rounded-full border border-[var(--line)]/25">
              {active.specs}
            </span>
          )}
        </div>

        <p className="mt-2.5 text-[0.9375rem] leading-[1.6] text-[var(--fg)]">
          {active.description}
        </p>

        {active.dataContract && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-[var(--line)]/15 text-[0.8125rem]">
            <div className="p-2.5 rounded-lg bg-[var(--tributary-surface)]/60">
              <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--fg-2)] block mb-1">
                INFLOW // INPUT
              </span>
              <span className="text-[var(--fg)] leading-snug block">
                {active.dataContract.input}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-[var(--tributary-surface)]/60">
              <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--fg-2)] block mb-1">
                CHANNEL // PROCESS
              </span>
              <span className="text-[var(--fg)] leading-snug block">
                {active.dataContract.processing}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-[var(--tributary-surface)]/60">
              <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--fg-2)] block mb-1">
                OUTFLOW // OUTPUT
              </span>
              <span className="text-[var(--fg)] leading-snug block">
                {active.dataContract.output}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TributaryStationVisualizer;
