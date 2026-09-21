"use client";

import { projects } from "@/data/projects";

// Deterministic stripe pattern generator for image-less windows (§6.1.3, §6.1.7)
function StripeWindow({ slug }: { slug: string }) {
  const hash = slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const angles = [45, 135, -45];
  const angle = angles[hash % angles.length];

  return (
    <div
      aria-hidden="true"
      className="w-full h-48 sm:h-64 biyahe-plate overflow-hidden relative bg-[#0B1440]"
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`stripes-${slug}`}
            width="28"
            height="28"
            patternTransform={`rotate(${angle} 0 0)`}
            patternUnits="userSpaceOnUse"
          >
            <rect width="14" height="28" fill="#FFC72C" />
            <rect x="14" width="14" height="28" fill="#1B3FD1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#stripes-${slug})`} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="biyahe-plate bg-black text-white px-3 py-1 font-bungee text-xs uppercase tracking-widest">
          SYS-SPEC // {slug.toUpperCase()}
        </span>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Title */}
        <div className="flex items-center gap-3">
          <div className="biyahe-plate bg-[#1B3FD1] text-white px-5 py-2.5 font-bungee text-xl sm:text-3xl tracking-wide uppercase inline-block">
            PROJECTS // STOP 02
          </div>
          <div className="h-1 bg-black dark:bg-white flex-1 hidden sm:block" />
        </div>

        {/* 1. Featured Project (DaloyAqua): Full-Width Cobalt Board (§6.1.7) */}
        {featured && (
          <div className="biyahe-board bg-[#1B3FD1] text-white p-6 sm:p-8 lg:p-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="biyahe-plate bg-[#FFC72C] text-black px-3 py-1 font-bungee text-xs uppercase">
                  FLAGSHIP FEATURED
                </span>
                {featured.status && (
                  <span className="px-3.5 py-1 rounded-full bg-[#FFC72C] text-black font-lexend font-extrabold text-xs tracking-wider border-2 border-black">
                    {featured.status}
                  </span>
                )}
              </div>

              {featured.category && (
                <span className="font-mono text-xs text-[#FFC72C] uppercase tracking-wider">
                  [{featured.category}]
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left Column: Title, Description, Stack, Actions */}
              <div className="lg:col-span-7 space-y-5">
                <h3 className="font-bungee text-3xl sm:text-5xl text-white tracking-tight">
                  {featured.title}
                </h3>
                {featured.subtitle && (
                  <p className="font-lexend text-sm sm:text-base text-white/90 font-medium">
                    {featured.subtitle}
                  </p>
                )}

                {/* Chalk Reading Plate for Description */}
                <div className="biyahe-plate bg-white text-black p-5 sm:p-6 space-y-3">
                  <p className="font-lexend text-base leading-relaxed">
                    {featured.description}
                  </p>
                  <p className="font-lexend text-xs text-black/70 font-medium">
                    <strong>Challenge:</strong> {featured.problem}
                  </p>
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
                        className="biyahe-plate bg-[#0F9D58] text-black px-3 py-1 text-xs font-lexend font-bold rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Plates */}
                <div className="pt-2 flex flex-wrap gap-3">
                  {featured.liveUrl && (
                    <a
                      href={featured.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${featured.title} demo`}
                      style={{ ["--depth-color" as string]: "#B61E22" }}
                      className="pressable-plate px-5 py-2.5 bg-[#E4262A] text-white font-bungee text-xs tracking-wider flex items-center gap-1.5"
                    >
                      <span>OPEN PROJECT</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                  {featured.githubUrl && (
                    <a
                      href={featured.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${featured.title} source code`}
                      style={{ ["--depth-color" as string]: "#CCCCCC" }}
                      className="pressable-plate px-5 py-2.5 bg-white text-black font-bungee text-xs tracking-wider flex items-center gap-1.5"
                    >
                      <span>SOURCE CODE</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Spec / Stripe Pattern Window */}
              <div className="lg:col-span-5">
                <StripeWindow slug={featured.title.toLowerCase()} />
              </div>
            </div>
          </div>
        )}

        {/* 2. Supporting Projects: The Route List (Rows, Not Cards) (§6.1.7) */}
        {supporting.length > 0 && (
          <div className="space-y-4">
            <div className="font-bungee text-sm text-black dark:text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E4262A] inline-block" />
              <span>SUPPORTING ROUTE LIST // EXPAND FOR SPECIFICATION</span>
            </div>

            <div className="space-y-3">
              {supporting.map((proj, idx) => {
                const initial = proj.title.charAt(0).toUpperCase();
                const cycle = CHIP_CYCLE[idx % CHIP_CYCLE.length];

                return (
                  <details
                    key={proj.title}
                    className="biyahe-plate bg-white dark:bg-[#131E57] text-black dark:text-white group p-4 sm:p-5 transition-all"
                  >
                    <summary className="list-none cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none">
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Square Route Chip */}
                        <div
                          className={`w-10 h-10 shrink-0 biyahe-plate ${cycle.bg} ${cycle.text} font-bungee text-lg flex items-center justify-center`}
                          aria-hidden="true"
                        >
                          {initial}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bungee text-base sm:text-lg tracking-wide text-black dark:text-white">
                              {proj.title}
                            </h4>
                            {proj.status && (
                              <span className="px-2.5 py-0.5 rounded-full bg-[#FFC72C] text-black text-[11px] font-lexend font-bold border border-black">
                                {proj.status}
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
                            aria-label={`Open ${proj.title}`}
                            style={{ ["--depth-color" as string]: "#B61E22" }}
                            className="pressable-plate px-3 py-1.5 bg-[#E4262A] text-white font-bungee text-xs tracking-wider"
                          >
                            OPEN
                          </a>
                        )}
                        <span className="biyahe-chevron font-bungee text-sm transition-transform duration-100">
                          ▼
                        </span>
                      </div>
                    </summary>

                    {/* Expanded Details (§6.1.7) */}
                    <div className="pt-4 mt-4 border-t-2 border-black/15 dark:border-white/15 space-y-4">
                      <p className="font-lexend text-sm sm:text-base leading-relaxed text-black dark:text-white">
                        {proj.description}
                      </p>

                      {proj.highlights && proj.highlights.length > 0 && (
                        <div className="space-y-1.5">
                          <div className="font-bungee text-xs text-[#1B3FD1] dark:text-[#FFC72C] uppercase">
                            KEY HIGHLIGHTS
                          </div>
                          <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm font-lexend text-black/90 dark:text-white/90">
                            {proj.highlights.map((h, i) => (
                              <li key={i}>{h}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Stack Chips */}
                      <div className="space-y-1.5">
                        <div className="font-bungee text-xs text-[#1B3FD1] dark:text-[#FFC72C] uppercase">
                          TECHNOLOGY STACK
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {proj.tags.map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-1 rounded bg-[#FFC72C] text-black font-lexend font-bold text-xs border border-black"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-3 pt-2">
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Source code for ${proj.title}`}
                            style={{ ["--depth-color" as string]: "#0C7E46" }}
                            className="pressable-plate px-4 py-2 bg-[#0F9D58] text-black font-bungee text-xs tracking-wider inline-flex items-center gap-1"
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
                            className="pressable-plate px-4 py-2 bg-[#E4262A] text-white font-bungee text-xs tracking-wider inline-flex items-center gap-1"
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
