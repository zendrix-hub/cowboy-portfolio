"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { projects, Project } from "@/data/projects";

// Matched skill stars fan-out coordinates for featured constellation (Desktop SVG layout)
const FEATURED_SKILL_NODES = [
  { name: "Spring Boot", x: 280, y: 30 },
  { name: "PostgreSQL", x: 330, y: 75 },
  { name: "Docker", x: 320, y: 130 },
  { name: "Redis", x: 270, y: 175 },
  { name: "REST APIs", x: 190, y: 190 },
];

const emptySubscribe = () => () => {};

function getConstellationSnapshot(): boolean {
  try {
    if (typeof window === "undefined") return false;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return true;
    return Boolean(sessionStorage.getItem("star-chart-constellation-drawn"));
  } catch {
    return false;
  }
}

export function StarProjects() {
  const isAlreadyDrawn = useSyncExternalStore(emptySubscribe, getConstellationSnapshot, () => false);
  const [drawnInSession, setDrawnInSession] = useState(false);
  const featuredRef = useRef<HTMLDivElement>(null);

  const constellationDrawn = isAlreadyDrawn || drawnInSession;
  const daloyAqua = projects.find((p) => p.title === "DaloyAqua") || projects[0];
  const supportingProjects = projects.filter((p) => p.title !== "DaloyAqua");

  // Orchestrated moment: constellation draws when 60% visible (§9.4.11)
  useEffect(() => {
    if (isAlreadyDrawn) return;

    const currentEl = featuredRef.current;
    if (!currentEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            setDrawnInSession(true);
            try {
              sessionStorage.setItem("star-chart-constellation-drawn", "true");
            } catch {
              // ignore
            }
            observer.unobserve(currentEl);
          }
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(currentEl);
    return () => observer.disconnect();
  }, [isAlreadyDrawn]);

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="w-full min-h-[90svh] px-4 sm:px-6 lg:px-8 py-20 relative z-10 space-y-24"
    >
      <div className="max-w-[800px] mx-auto space-y-4 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-ink-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />
          <span>WAYPOINT 03 // CONSTELLATIONS</span>
        </div>
        <h2
          id="projects-title"
          className="font-space font-bold text-[clamp(2rem,5vw,3.75rem)] leading-tight text-ink"
        >
          Systems &amp; Star Formations
        </h2>
        <p className="font-sans text-sm text-ink-2 max-w-lg mx-auto">
          Each project forms a central star in the observation field, wired directly to the verified technical competencies that compose its architecture.
        </p>
      </div>

      {/* FEATURED CONSTELLATION: DaloyAqua (§9.4.7) */}
      <div
        ref={featuredRef}
        className="max-w-[880px] mx-auto space-y-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left / Reading Column */}
          <div className="lg:col-span-7 space-y-5">
            {/* Project Star and Status */}
            <div className="flex items-center gap-3">
              <span
                className="w-4 h-4 rounded-full bg-gold inline-block star-point ring-4 ring-gold/20"
                aria-hidden="true"
              />
              <span className="font-mono text-xs text-gold uppercase tracking-wider font-semibold">
                Major Constellation // {daloyAqua.status || "In Progress"}
              </span>
            </div>

            <div>
              <h3 className="font-space font-bold text-2xl sm:text-3xl text-ink">
                {daloyAqua.title}
              </h3>
              {daloyAqua.subtitle && (
                <p className="font-sans text-xs sm:text-sm text-ink-2 mt-0.5">
                  {daloyAqua.subtitle}
                </p>
              )}
            </div>

            <p className="font-sans text-sm sm:text-base leading-[1.65] text-ink">
              {daloyAqua.description}
            </p>

            {/* Stack Line in JetBrains Mono Data Role */}
            <div className="pt-2 font-mono text-xs space-y-1">
              <span className="text-ink-2 uppercase block">Matched Stack:</span>
              <p className="text-ink font-medium">
                {daloyAqua.tags.join(" • ")}
              </p>
            </div>

            {/* Plain Text Links (§9.4.3: text links with thickening underline) */}
            <div className="pt-2 flex flex-wrap items-center gap-6 font-space text-xs sm:text-sm font-medium">
              {daloyAqua.liveUrl && (
                <a
                  href={daloyAqua.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chart-link text-ink hover:text-gold py-1 focus-visible:outline-none"
                >
                  Open project
                </a>
              )}
              {daloyAqua.githubUrl && (
                <a
                  href={daloyAqua.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chart-link text-ink hover:text-gold py-1 focus-visible:outline-none"
                >
                  Source code
                </a>
              )}
            </div>
          </div>

          {/* Right: Constellation Diagram (Desktop SVG, Mobile Fallback per §9.4.12) */}
          <div className="lg:col-span-5 relative flex justify-center py-4">
            {/* Desktop / Tablet Fanned Constellation SVG */}
            <div className="hidden sm:block w-full max-w-[360px] h-[220px] relative select-none">
              <svg
                viewBox="0 0 360 220"
                className="w-full h-full overflow-visible"
                aria-hidden="true"
              >
                {/* Lines fanning from central star (x: 100, y: 110) to each skill star */}
                {FEATURED_SKILL_NODES.map((node, i) => (
                  <line
                    key={node.name}
                    x1="100"
                    y1="110"
                    x2={node.x}
                    y2={node.y}
                    className={`stroke-gold/70 constellation-stroke ${
                      constellationDrawn ? "animate-constellation-line" : "opacity-0"
                    }`}
                    strokeWidth="1.25"
                    style={{
                      animationDelay: `${i * 60}ms`,
                    }}
                  />
                ))}

                {/* Central Featured Star */}
                <circle
                  cx="100"
                  cy="110"
                  r="7"
                  className="fill-gold star-point"
                />
                <circle
                  cx="100"
                  cy="110"
                  r="13"
                  className="fill-none stroke-gold/40"
                  strokeWidth="1"
                />

                {/* Skill Stars & Labels */}
                {FEATURED_SKILL_NODES.map((node, i) => (
                  <g
                    key={node.name}
                    className={constellationDrawn ? "animate-star-fade" : "opacity-0"}
                    style={{
                      animationDelay: `${300 + i * 60}ms`,
                    }}
                  >
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="3.5"
                      className="fill-gold"
                    />
                    <text
                      x={node.x + 8}
                      y={node.y + 4}
                      className="fill-ink text-[11px] font-mono tracking-tight select-none"
                    >
                      {node.name}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            {/* Mobile Fallback: Plain small row of labelled dots without fanned lines (§9.4.12) */}
            <div className="sm:hidden w-full space-y-2 border-t border-ink-2/20 pt-4">
              <span className="font-mono text-[11px] text-ink-2 uppercase block">
                Connected Skills:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {FEATURED_SKILL_NODES.map((node) => (
                  <div key={node.name} className="flex items-center gap-1.5 text-xs font-mono text-ink">
                    <span className="w-2 h-2 rounded-full bg-gold inline-block" aria-hidden="true" />
                    <span>{node.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SUPPORTING PROJECTS (§9.4.7) */}
      <div className="max-w-[800px] mx-auto space-y-12 pt-12 border-t border-ink-2/20">
        <div className="flex items-center justify-between text-xs font-mono text-ink-2">
          <span>SECONDARY STARS // REPERTORY</span>
          <span>{supportingProjects.length} Catalogued</span>
        </div>

        <div className="space-y-12">
          {supportingProjects.map((p: Project) => (
            <article
              key={p.title}
              className="space-y-4 pl-6 border-l border-ink-2/30 relative"
            >
              {/* Star Bullet */}
              <div
                className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-gold star-point"
                aria-hidden="true"
              />

              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="font-space font-bold text-xl text-ink">
                  {p.title}
                </h4>
                {p.status && (
                  <span className="font-mono text-xs text-gold">
                    [{p.status}]
                  </span>
                )}
              </div>

              {p.subtitle && (
                <p className="font-sans text-xs text-ink-2 -mt-2">
                  {p.subtitle}
                </p>
              )}

              <p className="font-sans text-sm leading-[1.65] text-ink">
                {p.description}
              </p>

              {/* Stack items as connected skill points */}
              <div className="font-mono text-xs text-ink-2 flex flex-wrap items-center gap-2 pt-1">
                <span className="uppercase text-ink-2/70">Nodes:</span>
                {p.tags.slice(0, 4).map((tag, tIdx) => (
                  <span key={tag} className="inline-flex items-center gap-1 text-ink">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/80" aria-hidden="true" />
                    <span>{tag}</span>
                    {tIdx < 3 && tIdx < p.tags.length - 1 && (
                      <span className="text-ink-2/40 ml-1">·</span>
                    )}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="pt-2 flex flex-wrap items-center gap-5 font-space text-xs font-medium">
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chart-link text-ink hover:text-gold py-1 focus-visible:outline-none"
                  >
                    Open project
                  </a>
                )}
                {p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chart-link text-ink hover:text-gold py-1 focus-visible:outline-none"
                  >
                    Source code
                  </a>
                )}
                {!p.liveUrl && !p.githubUrl && (
                  <span className="font-mono text-[11px] text-ink-2/60 uppercase">
                    [DepEd Restricted Offline Operation]
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
