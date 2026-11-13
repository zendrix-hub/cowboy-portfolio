import React from "react";
import {
  bearingWaypoints,
  selfIntroduction,
  sectionLabelsJa,
  type BearingStatus,
} from "@/data/japan";
import BearingClock from "./BearingClock";

function StatusMarker({ status }: { status: BearingStatus }) {
  // now → filled, pending → half, planned → open. Nothing planned looks done.
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      className="mt-1 shrink-0"
      aria-hidden="true"
    >
      <circle
        cx="9"
        cy="9"
        r="7"
        fill={status === "now" ? "var(--line)" : "none"}
        stroke="var(--line)"
        strokeWidth="2"
        strokeDasharray={status === "planned" ? "3 3" : undefined}
      />
      {status === "pending" && (
        <path d="M9 2a7 7 0 0 1 0 14z" fill="var(--line)" />
      )}
    </svg>
  );
}

/** Schematic chart of the Kuroshio from Cebu to Tokyo (not to scale). */
function KuroshioChart() {
  return (
    <svg
      viewBox="0 0 220 200"
      className="w-full h-auto"
      role="img"
      aria-labelledby="kuroshio-chart-title kuroshio-chart-desc"
    >
      <title id="kuroshio-chart-title">
        The Kuroshio current, from Cebu to Tokyo
      </title>
      <desc id="kuroshio-chart-desc">
        A schematic chart: a current line rises from Cebu at 10 degrees north
        to Tokyo at 36 degrees north.
      </desc>

      {/* Latitude lines */}
      {[
        { y: 164, label: "10°N" },
        { y: 116, label: "20°N" },
        { y: 68, label: "30°N" },
        { y: 20, label: "40°N" },
      ].map((lat) => (
        <g key={lat.label}>
          <line
            x1="34"
            y1={lat.y}
            x2="216"
            y2={lat.y}
            stroke="var(--line)"
            strokeWidth="1"
            opacity="0.22"
          />
          <text
            x="2"
            y={lat.y + 4}
            fontSize="11"
            fill="var(--fg-2)"
            fontFamily="var(--font-geist-mono), ui-monospace, monospace"
          >
            {lat.label}
          </text>
        </g>
      ))}

      {/* The current: soft base + flowing dashes on top */}
      <path
        d="M 62 162 C 104 160, 84 112, 112 92 S 156 74, 164 40"
        fill="none"
        stroke="var(--line)"
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.18"
      />
      <path
        d="M 62 162 C 104 160, 84 112, 112 92 S 156 74, 164 40"
        fill="none"
        stroke="var(--line)"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="tributary-wave-flow"
      />

      {/* Cebu: filled (here now) */}
      <circle cx="62" cy="162" r="6.5" fill="var(--line)" />
      <text x="62" y="186" fontSize="13" fontWeight="600" fill="var(--fg)" textAnchor="middle">
        Cebu
      </text>

      {/* Tokyo: open ring (the heading, not yet reached) */}
      <circle
        cx="164"
        cy="40"
        r="6.5"
        fill="var(--tributary-surface)"
        stroke="var(--line)"
        strokeWidth="2.5"
      />
      <text x="176" y="38" fontSize="13" fontWeight="600" fill="var(--fg)">
        Tokyo
      </text>
      <text x="176" y="53" fontSize="12" fill="var(--fg-2)" lang="ja">
        東京
      </text>

      {/* Current label */}
      <text x="128" y="108" fontSize="14" fill="var(--fg)" lang="ja">
        黒潮
      </text>
      <text
        x="128"
        y="122"
        fontSize="10"
        fill="var(--fg-2)"
        fontFamily="var(--font-geist-mono), ui-monospace, monospace"
      >
        KUROSHIO
      </text>
    </svg>
  );
}

/**
 * "Kuroshio" bearing block: the Japan evidence in one place.
 * Lives inside the Experience zone (no seventh section), anchored as #japan.
 */
export default function CurrentBearing() {
  return (
    <article
      id="japan"
      aria-labelledby="japan-title"
      className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative"
    >
      <div className="lg:col-span-8 flex flex-col items-start max-w-[44rem] p-6 sm:p-8 rounded-2xl bg-[var(--tributary-surface)]/75 border border-[var(--line)]/30 shadow-sm">
        {/* Top bar */}
        <div className="w-full flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--line)]/20">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[0.875rem] font-semibold text-[var(--fg)] tracking-wide font-mono px-3 py-1 rounded-full bg-[var(--zone-bg)] border border-[var(--line)]/25">
              Cebu → Japan
            </span>
            <span className="font-mono text-[0.75rem] uppercase tracking-wider text-[var(--fg-2)]">
              {"//"} Bearing
            </span>
          </div>
          <span lang="ja" className="text-[0.9375rem] text-[var(--fg-2)]">
            {sectionLabelsJa.japan}
          </span>
        </div>

        <h3
          id="japan-title"
          className="mt-5 font-fraunces text-[clamp(1.6rem,3vw,2.15rem)] leading-[1.15] text-[var(--fg)] font-normal m-0"
        >
          Following the Kuroshio
        </h3>
        <p className="mt-1.5 text-[1.125rem] text-[var(--fg-2)] font-medium">
          Working towards a software engineering career in Japan
        </p>
        <p className="mt-4 text-[1.0625rem] leading-[1.65] text-[var(--fg)]">
          The Kuroshio (<span lang="ja">黒潮</span>) is the warm current that
          runs north from the Philippines to Japan. It is the direction this
          page has been flowing all along. Here is where I am on that route
          today, stated plainly: what is done, what is waiting on a result, and
          what is still ahead.
        </p>

        {/* Chart + clocks | waypoints */}
        <div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-7 items-start">
          <div className="sm:col-span-2 flex flex-col gap-3">
            <div className="p-3 rounded-xl bg-[var(--zone-bg)]/60 border border-[var(--line)]/20">
              <KuroshioChart />
              <p className="m-0 mt-1 font-mono text-[0.625rem] text-[var(--fg-2)] text-center">
                Schematic, not to scale
              </p>
            </div>
            <BearingClock />
          </div>

          <ol className="sm:col-span-3 m-0 p-0 list-none flex flex-col gap-4">
            {bearingWaypoints.map((w) => (
              <li key={w.id} className="flex items-start gap-3">
                <StatusMarker status={w.status} />
                <div className="flex flex-col gap-0.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="font-mono text-[0.6875rem] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--zone-bg)] border border-[var(--line)]/25 text-[var(--fg)]">
                      {w.statusLabel}
                    </span>
                    <span lang="ja" className="text-[0.8125rem] text-[var(--fg-2)]">
                      {w.titleJa}
                    </span>
                  </div>
                  <span className="text-[1rem] font-medium leading-snug text-[var(--fg)]">
                    {w.title}
                  </span>
                  <span className="text-[0.9375rem] leading-[1.55] text-[var(--fg-2)]">
                    {w.detail}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Marker legend */}
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1.5 font-mono text-[0.6875rem] text-[var(--fg-2)]">
          <span className="inline-flex items-center gap-1.5">
            <StatusMarker status="now" /> done or under way
          </span>
          <span className="inline-flex items-center gap-1.5">
            <StatusMarker status="pending" /> awaiting result
          </span>
          <span className="inline-flex items-center gap-1.5">
            <StatusMarker status="planned" /> planned
          </span>
        </div>

        {/* 自己紹介: short self-introduction in Japanese */}
        <div className="mt-7 pt-6 border-t border-[var(--line)]/20 w-full">
          <h4 className="m-0 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span lang="ja" className="font-fraunces text-[1.5rem] text-[var(--fg)] font-normal">
              自己紹介
            </span>
            <span className="font-mono text-[0.75rem] uppercase tracking-wider text-[var(--fg-2)]">
              Self-introduction
            </span>
          </h4>
          <p
            lang="ja"
            className="jp-text mt-3 text-[1.0625rem] leading-[1.95] text-[var(--fg)]"
          >
            {selfIntroduction.map((s) => s.ja).join("")}
          </p>
          <details className="project-decisions group mt-3">
            <summary className="min-h-[44px] inline-flex items-center gap-2 cursor-pointer list-none font-mono text-[0.75rem] font-semibold text-[var(--fg)] rounded-lg">
              <span>English meaning</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-open:rotate-180"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </summary>
            <p className="mt-1 text-[0.9375rem] leading-[1.6] text-[var(--fg-2)]">
              {selfIntroduction.map((s) => s.en).join(" ")}
            </p>
          </details>
        </div>
      </div>

      {/* Waypoint node the drawn line passes through (desktop channel) */}
      <div className="lg:col-span-4 hidden lg:flex justify-center items-center h-full relative">
        <div
          id="node-japan"
          data-node="waypoint"
          data-current="false"
          className="w-6 h-6 rounded-full opacity-0 pointer-events-none"
          aria-hidden="true"
        />
      </div>
    </article>
  );
}
