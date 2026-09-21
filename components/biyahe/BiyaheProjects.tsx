"use client";

import { projects } from "@/data/projects";

// Schematic transit window for Featured Project (§6.1.3, §6.1.7)
function SchematicStripeWindow({ slug, title }: { slug: string; title: string }) {
  const hash = slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const angles = [45, 135, -45];
  const angle = angles[hash % angles.length];

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
      <div className="p-5 sm:p-6 bg-[#0B1440] text-white flex flex-col justify-between min-h-[260px]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/20 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#E4262A] border border-black inline-block animate-pulse" />
            <span className="font-bungee text-xs text-[#FFC72C] uppercase tracking-wider">
              TELEMETRY BUS // REAL-TIME RUNTIME
            </span>
          </div>
          <span className="font-mono text-[10px] text-white/60 uppercase">
            CH: FASTAPI-ASYNC
          </span>
        </div>

        {/* Schematic Flow Diagram */}
        <div className="py-4 my-auto space-y-3">
          {/* Step 1 & 2 Flow */}
          <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
            <div className="p-2 biyahe-plate bg-[#1B3FD1] text-white">
              <div className="font-bungee text-[9px] text-[#FFC72C]">SENSORS</div>
              <div className="text-[10px] font-bold">SOIL / RAIN</div>
            </div>
            <div className="p-2 biyahe-plate bg-white text-black">
              <div className="font-bungee text-[9px] text-[#1B3FD1]">ENGINE</div>
              <div className="text-[10px] font-bold">APSCHEDULER</div>
            </div>
            <div className="p-2 biyahe-plate bg-[#E4262A] text-white">
              <div className="font-bungee text-[9px] text-[#FFC72C]">DISPATCH</div>
              <div className="text-[10px] font-bold">SMS GATEWAY</div>
            </div>
          </div>

          {/* Signal Connection Track */}
          <div className="flex items-center justify-between px-4 text-xs text-[#FFC72C] font-mono">
            <span>[INGEST] ➔➔</span>
            <span>[ANALYZE] ➔➔</span>
            <span>[ALERT]</span>
          </div>
        </div>

        {/* Terminal Footer */}
        <div className="pt-3 border-t border-white/20 flex items-center justify-between">
          <span className="biyahe-plate bg-black text-[#FFC72C] px-2.5 py-1 font-bungee text-[10px] uppercase tracking-widest">
            SYS-SPEC // {title.toUpperCase()}
          </span>
          <span className="font-mono text-[10px] text-[#0F9D58] font-bold">
            STATUS: PIPELINE ACTIVE
          </span>
        </div>
      </div>
    </div>
  );
}

const CHIP_CYCLE = [
  { bg: "bg-[#FFC72C]", text: "text-black", depth: "#CC9F23" },
  { bg: "bg-[#E4262A]", text: "text-white", depth: "#B61E22" },
  { bg: "bg-[#0F9D58]", text: "text-black", depth: "#0C7E46" },
  { bg: "bg-white", text: "text-black", depth: "#CCCCCC" },
];

export default function BiyaheProjects() {
  const featured = projects.find((p) => p.title.toLowerCase() === "daloyaqua") || projects[0];
  const supporting = projects.filter((p) => p.title !== featured.title);

  return (
    <section id="projects" className="bg-white dark:bg-[#0B1440] text-black dark:text-white py-12 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Title */}
        <div className="flex items-center gap-3">
          <div className="biyahe-plate bg-[#1B3FD1] text-white px-5 py-2.5 font-bungee text-xl sm:text-3xl tracking-wide uppercase inline-block shadow-[0_4px_0_#000000]">
            PROJECTS // STOP 02
          </div>
          <div className="h-1 bg-black dark:bg-white flex-1 hidden sm:block" />
        </div>

        {/* 1. Featured Project (DaloyAqua): Full-Width Cobalt Board (§6.1.7) */}
        {featured && (
          <div className="biyahe-board bg-[#1B3FD1] text-white p-6 sm:p-8 lg:p-10 space-y-6 shadow-[0_6px_0_#000000]">
            {/* Header Plate: Category, Status, Flagship */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-white/20 pb-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="biyahe-plate bg-[#FFC72C] text-black px-3.5 py-1 font-bungee text-xs uppercase tracking-wider shadow-[0_2px_0_#000]">
                  FLAGSHIP SPECIFICATION
                </span>
                {featured.status && (
                  <span className="px-3.5 py-1 rounded-full bg-[#FFC72C] text-black font-lexend font-black text-xs tracking-wider border-2 border-black shadow-[0_2px_0_#000]">
                    {featured.status}
                  </span>
                )}
              </div>

              {featured.category && (
                <span className="font-mono text-xs text-[#FFC72C] uppercase tracking-wider font-bold">
                  [{featured.category} SYSTEM]
                </span>
              )}
            </div>

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

                {/* Chalk Reading Plate for Description */}
                <div className="biyahe-plate bg-white text-black p-5 sm:p-6 space-y-3 shadow-[0_4px_0_#000000]">
                  <p className="font-lexend text-base leading-relaxed">
                    {featured.description}
                  </p>
                  <div className="pt-2 border-t border-black/10 text-xs sm:text-sm font-lexend text-black/80 space-y-1">
                    <p>
                      <strong>Field Challenge:</strong> {featured.problem}
                    </p>
                  </div>
                </div>

                {/* Vehicle Spec Plate (3-column sub-grid §6.1.7) */}
                <div className="biyahe-plate bg-[#0B1440] text-white p-4 sm:p-5 border-2 border-black shadow-[0_4px_0_#000000]">
                  <div className="font-bungee text-[11px] text-[#FFC72C] uppercase tracking-wider mb-3">
                    VEHICLE ENGINE &amp; CAPACITY SPECIFICATION
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-white/10 rounded border border-white/20">
                      <div className="font-mono text-[10px] text-white/70 uppercase">INGESTION</div>
                      <div className="font-mono font-bold text-sm sm:text-base text-[#FFC72C]">&gt; 500 REQ/S</div>
                      <div className="font-lexend text-[10px] text-white/80 mt-0.5">Pydantic Bounds</div>
                    </div>
                    <div className="p-3 bg-white/10 rounded border border-white/20">
                      <div className="font-mono text-[10px] text-white/70 uppercase">RISK ENGINE</div>
                      <div className="font-mono font-bold text-sm sm:text-base text-[#0F9D58]">&lt; 15MS / PARCEL</div>
                      <div className="font-lexend text-[10px] text-white/80 mt-0.5">Phenology Matrix</div>
                    </div>
                    <div className="p-3 bg-white/10 rounded border border-white/20">
                      <div className="font-mono text-[10px] text-white/70 uppercase">SMS DISPATCH</div>
                      <div className="font-mono font-bold text-sm sm:text-base text-[#E4262A]">20 SMS / SEC</div>
                      <div className="font-lexend text-[10px] text-white/80 mt-0.5">Rate-Limited Queue</div>
                    </div>
                  </div>
                </div>

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

                {/* Action Plates */}
                <div className="pt-2 flex flex-wrap gap-3">
                  {featured.githubUrl && (
                    <a
                      href={featured.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${featured.title} source code on GitHub`}
                      style={{ ["--depth-color" as string]: "#CCCCCC" }}
                      className="pressable-plate px-6 py-3 bg-white text-black font-bungee text-xs tracking-wider flex items-center gap-2 shadow-[0_4px_0_#000]"
                    >
                      <span>SOURCE CODE</span>
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
                      <span>OPEN PROJECT</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column (5 cols): Schematic / Stripe Window */}
              <div className="lg:col-span-5">
                <SchematicStripeWindow slug={featured.title.toLowerCase()} title={featured.title} />
              </div>
            </div>
          </div>
        )}

        {/* 2. Supporting Projects: The Route List (Rows, Not Cards) (§6.1.7) */}
        {supporting.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bungee text-sm sm:text-base text-black dark:text-white uppercase tracking-wider">
              <span className="w-3 h-3 rounded-full bg-[#E4262A] inline-block border border-black" />
              <span>SUPPORTING ROUTE LIST // EXPAND FOR SPECIFICATION</span>
            </div>

            <div className="space-y-4">
              {supporting.map((proj, idx) => {
                const initial = proj.title.charAt(0).toUpperCase();
                const cycle = CHIP_CYCLE[idx % CHIP_CYCLE.length];

                return (
                  <details
                    key={proj.title}
                    className="biyahe-plate bg-white dark:bg-[#131E57] text-black dark:text-white group p-4 sm:p-5 transition-all shadow-[0_4px_0_#000000]"
                  >
                    <summary className="list-none cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none">
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Square Route Chip */}
                        <div
                          className={`w-11 h-11 shrink-0 biyahe-plate ${cycle.bg} ${cycle.text} font-bungee text-xl flex items-center justify-center shadow-[0_2px_0_#000]`}
                          aria-hidden="true"
                        >
                          {initial}
                        </div>

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
                              <span className="font-mono text-xs text-black/60 dark:text-white/60">
                                [{proj.category}]
                              </span>
                            )}
                          </div>
                          <p className="font-lexend text-xs sm:text-sm text-black/75 dark:text-white/75 truncate max-w-xl">
                            {proj.subtitle || proj.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`Open ${proj.title}`}
                            style={{ ["--depth-color" as string]: "#B61E22" }}
                            className="pressable-plate px-3.5 py-1.5 bg-[#E4262A] text-white font-bungee text-xs tracking-wider inline-flex items-center gap-1 shadow-[0_2px_0_#000]"
                          >
                            <span>OPEN</span>
                            <span aria-hidden="true">↗</span>
                          </a>
                        )}
                        <span className="biyahe-chevron font-bungee text-sm transition-transform duration-100 p-1">
                          ▼
                        </span>
                      </div>
                    </summary>

                    {/* Expanded Details (§6.1.7) */}
                    <div className="pt-5 mt-4 border-t-2 border-black/15 dark:border-white/15 space-y-5">
                      <p className="font-lexend text-sm sm:text-base leading-relaxed text-black dark:text-white max-w-4xl">
                        {proj.description}
                      </p>

                      {/* Problem & Constraints Callout Plates */}
                      {(proj.problem || proj.constraints) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                                ENGINEERING CONSTRAINTS
                              </div>
                              <p className="font-lexend text-xs leading-relaxed">
                                {proj.constraints}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Highlights */}
                      {proj.highlights && proj.highlights.length > 0 && (
                        <div className="space-y-2">
                          <div className="font-bungee text-xs text-[#1B3FD1] dark:text-[#FFC72C] uppercase">
                            KEY HIGHLIGHTS
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

                      {/* Technology Stack Chips */}
                      <div className="space-y-2">
                        <div className="font-bungee text-xs text-[#1B3FD1] dark:text-[#FFC72C] uppercase">
                          TECHNOLOGY STACK
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

                      {/* Action Links */}
                      <div className="flex flex-wrap items-center gap-3 pt-2">
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
                      </div>
                    </div>
                  </details>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
