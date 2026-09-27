"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

export interface ChartWaypoint {
  id: string;
  label: string;
  cx: number;
  cy: number;
}

export const CHART_WAYPOINTS: ChartWaypoint[] = [
  { id: "hero", label: "Chart Title", cx: 65, cy: 16 },
  { id: "about", label: "Observation Notes", cx: 100, cy: 34 },
  { id: "projects", label: "Constellations", cx: 100, cy: 70 },
  { id: "skills", label: "Star Catalog", cx: 65, cy: 88 },
  { id: "experience", label: "Chronology", cx: 30, cy: 70 },
  { id: "contact", label: "Final Waypoint", cx: 30, cy: 34 },
];

const emptySubscribe = () => () => {};

export function OverviewWidget() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const { theme, resolvedTheme, setTheme } = useTheme();

  // Observation is dark, Draft is light
  const isDraft = mounted && (resolvedTheme === "light" || theme === "light");
  const alternateLabel = isDraft ? "Observation mode" : "Draft mode";

  const toggleTheme = () => {
    setTheme(isDraft ? "dark" : "light");
  };

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
      openButtonRef.current?.focus();
    }
  };

  useEffect(() => {
    const sectionIds = CHART_WAYPOINTS.map((w) => w.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        rootMargin: "-45% 0px -50% 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* 1. DESKTOP & TABLET FIXED HEXAGONAL OVERVIEW WIDGET (≥640px) (§9.4.5) */}
      <nav
        aria-label="Star Chart Sections"
        className="hidden sm:block fixed bottom-6 right-6 z-40 select-none"
      >
        <div className="bg-field/90 backdrop-blur-sm border border-ink-2/30 p-3 relative w-36 lg:w-44">
          <div className="flex items-center justify-between pb-1 border-b border-ink-2/20 text-[10px] font-mono text-ink-2">
            <span>CHART OVERVIEW</span>
            {/* 7th distinct dot for theme toggle (§9.4.5) */}
            <button
              type="button"
              onClick={toggleTheme}
              className="text-ink hover:text-gold text-[10px] underline underline-offset-2 focus-visible:outline-none"
              aria-label={`Switch to ${alternateLabel}`}
            >
              {isDraft ? "Draft" : "Observation"}
            </button>
          </div>

          <div className="relative pt-2 flex items-center justify-center">
            <svg
              viewBox="0 0 130 104"
              className="w-28 h-24 lg:w-32 lg:h-28 overflow-visible"
              aria-hidden="true"
            >
              {/* Loop connector lines */}
              <polygon
                points={CHART_WAYPOINTS.map((w) => `${w.cx},${w.cy}`).join(" ")}
                className="fill-none stroke-ink-2/30"
                strokeWidth="1"
              />

              {/* Waypoint Star Dots */}
              {CHART_WAYPOINTS.map((wp) => {
                const isCurrent = activeSection === wp.id;
                const isHovered = hoveredSection === wp.id;

                return (
                  <g key={wp.id}>
                    {/* Ring for active section */}
                    {isCurrent && (
                      <circle
                        cx={wp.cx}
                        cy={wp.cy}
                        r="8"
                        className="fill-none stroke-gold"
                        strokeWidth="1"
                      />
                    )}
                    <circle
                      cx={wp.cx}
                      cy={wp.cy}
                      r={isCurrent ? "4" : isHovered ? "3.5" : "2.5"}
                      className={`transition-colors ${
                        isCurrent || isHovered ? "fill-gold" : "fill-ink-2"
                      }`}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Accessible Link Overlays with min hit area 32x32px */}
            {CHART_WAYPOINTS.map((wp) => {
              const isCurrent = activeSection === wp.id;

              return (
                <a
                  key={wp.id}
                  href={`#${wp.id}`}
                  aria-current={isCurrent ? "location" : undefined}
                  aria-label={`Jump to ${wp.label}`}
                  onMouseEnter={() => setHoveredSection(wp.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                  onFocus={() => setHoveredSection(wp.id)}
                  onBlur={() => setHoveredSection(null)}
                  style={{
                    left: `${(wp.cx / 130) * 100}%`,
                    top: `${(wp.cy / 104) * 100}%`,
                  }}
                  className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 block rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                />
              );
            })}
          </div>

          {/* Section label display */}
          <div className="pt-1 text-center font-mono text-[11px] text-ink truncate">
            {hoveredSection
              ? CHART_WAYPOINTS.find((w) => w.id === hoveredSection)?.label
              : CHART_WAYPOINTS.find((w) => w.id === activeSection)?.label}
          </div>
        </div>
      </nav>

      {/* 2. MOBILE FIXED BOTTOM "CHART" BUTTON (<640px) (§9.4.5) */}
      <nav
        aria-label="Mobile Chart navigation"
        className="sm:hidden fixed bottom-[calc(12px+env(safe-area-inset-bottom))] right-4 z-40 select-none"
      >
        <button
          ref={openButtonRef}
          type="button"
          onClick={openDialog}
          aria-haspopup="dialog"
          aria-label="Open star chart overview"
          className="bg-field/95 border border-ink-2/40 text-ink font-mono text-xs uppercase px-4 py-2.5 shadow-md min-h-[48px] flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-gold inline-block" aria-hidden="true" />
          <span>Chart</span>
        </button>
      </nav>

      {/* 3. MOBILE NATIVE <dialog> STAR CHART OVERVIEW (§9.4.5, §9.4.13) */}
      <dialog
        ref={dialogRef}
        onClose={closeDialog}
        aria-labelledby="chart-dialog-title"
        className="fixed inset-0 m-0 w-full h-full max-w-full max-h-full bg-field text-ink p-6 backdrop:bg-black/60 z-50 overflow-y-auto"
      >
        <div className="max-w-md mx-auto flex flex-col justify-between min-h-full">
          <div>
            <div className="flex items-center justify-between border-b border-ink-2/30 pb-4 mb-6">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-ink-2 font-mono block">
                  Constellation Index
                </span>
                <h2 id="chart-dialog-title" className="font-space text-2xl font-bold">
                  Star Chart Waypoints
                </h2>
              </div>
              <button
                type="button"
                onClick={closeDialog}
                aria-label="Close star chart"
                className="text-sm font-mono underline underline-offset-4 text-ink py-2 px-2"
              >
                Close
              </button>
            </div>

            <nav aria-label="Waypoint list" className="divide-y divide-ink-2/20">
              {CHART_WAYPOINTS.map((wp, idx) => {
                const isCurrent = activeSection === wp.id;

                return (
                  <a
                    key={wp.id}
                    href={`#${wp.id}`}
                    onClick={closeDialog}
                    aria-current={isCurrent ? "location" : undefined}
                    className="flex items-center justify-between py-4 min-h-[48px] group"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-3 h-3 rounded-full border border-gold flex items-center justify-center ${
                          isCurrent ? "bg-gold" : "bg-transparent"
                        }`}
                        aria-hidden="true"
                      />
                      <span
                        className={`font-space text-lg transition-colors ${
                          isCurrent ? "text-gold font-bold" : "text-ink group-hover:text-gold"
                        }`}
                      >
                        {wp.label}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-ink-2">
                      0{idx + 1}
                    </span>
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-ink-2/20 flex items-center justify-between text-xs font-mono text-ink-2">
            <span>Zendrix Riva Portfolio</span>
            <button
              type="button"
              onClick={toggleTheme}
              className="underline underline-offset-4 text-ink"
            >
              {alternateLabel}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
