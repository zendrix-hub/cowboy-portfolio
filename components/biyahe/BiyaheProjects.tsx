"use client";

import { useState } from "react";
import { projects, Project } from "@/data/projects";

const STOP_BADGES = [
  { stop: "STOP 02-A", bg: "bg-[#FFC72C]", text: "text-black" },
  { stop: "STOP 02-B", bg: "bg-[#1B3FD1]", text: "text-white" },
  { stop: "STOP 02-C", bg: "bg-[#E4262A]", text: "text-white" },
  { stop: "STOP 02-D", bg: "bg-[#0F9D58]", text: "text-black" },
];

export default function BiyaheProjects() {
  // Track inline expansion state per project (default: first project PlayIT expanded)
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({
    PlayIT: true,
  });

  const toggleExpand = (title: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <section
      id="projects"
      className="bg-white dark:bg-[#0B1440] text-black dark:text-white pt-10 sm:pt-14 lg:pt-16 pb-8 sm:pb-10 lg:pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Title Header (§6.1.7) */}
        <div className="flex items-center justify-between gap-4 flex-wrap border-b-3 border-black pb-4">
          <div className="flex items-center gap-3">
            <div className="biyahe-plate bg-[#1B3FD1] text-white px-5 py-2.5 font-bungee text-xl sm:text-3xl tracking-wide uppercase inline-block shadow-[0_4px_0_#000000]">
              PROJECTS // STOP 02
            </div>
            <div className="h-1 bg-black dark:bg-white w-12 sm:w-24 hidden sm:block" />
          </div>

          <span className="biyahe-plate bg-[#FFC72C] text-black px-3.5 py-1.5 font-bungee text-xs uppercase tracking-wider shadow-[0_2px_0_#000]">
            FLEET MANIFEST // 4 ACTIVE SYSTEMS
          </span>
        </div>

        {/* Full-Width Stacked Destination Boards */}
        <div className="space-y-8 sm:space-y-10">
          {projects.map((proj: Project, index: number) => {
            const badgeConfig = STOP_BADGES[index % STOP_BADGES.length];
            const isPlayIT = proj.title.toLowerCase() === "playit";
            const isExpanded = !!expandedProjects[proj.title];

            return (
              <article
                key={proj.title}
                className="biyahe-board bg-white dark:bg-[#131E57] border-3 border-black text-black dark:text-white p-6 sm:p-8 lg:p-10 space-y-6 shadow-[0_6px_0_#000000] relative"
              >
                {/* Stamped Corner Rivet Accents */}
                <span
                  className="w-2.5 h-2.5 rounded-full bg-black/25 dark:bg-white/25 border border-black/40 absolute top-3 left-3 pointer-events-none"
                  aria-hidden="true"
                />
                <span
                  className="w-2.5 h-2.5 rounded-full bg-black/25 dark:bg-white/25 border border-black/40 absolute top-3 right-3 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Top Header Bar: Route Code, Status, Role, and Immediate Action Links */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b-2 border-black/15 dark:border-white/15 pb-5">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span
                      className={`biyahe-plate ${badgeConfig.bg} ${badgeConfig.text} px-3.5 py-1 font-bungee text-xs tracking-wider shadow-[0_2px_0_#000]`}
                    >
                      {badgeConfig.stop}
                    </span>

                    {proj.status && (
                      <span className="px-3 py-0.5 rounded-full bg-[#FFC72C] text-black font-lexend font-bold text-xs border border-black">
                        {proj.status}
                      </span>
                    )}

                    {proj.category && (
                      <span className="font-mono text-xs font-bold text-[#1B3FD1] dark:text-[#FFC72C] uppercase tracking-wider">
                        [{proj.category}]
                      </span>
                    )}

                    {proj.roleContext && (
                      <span className="biyahe-plate bg-[#F8F9FA] dark:bg-[#0B1440] px-3 py-1 border border-black/25 dark:border-white/20 text-xs font-lexend font-semibold shadow-[0_2px_0_#000]">
                        <strong className="text-[#1B3FD1] dark:text-[#FFC72C] font-bungee text-[10px] uppercase mr-1.5">
                          ROLE:
                        </strong>
                        {proj.roleContext}
                      </span>
                    )}
                  </div>

                  {/* Immediate Direct Action Links or Stamped Gold Emblem for PlayIT */}
                  <div className="flex items-center gap-3 flex-wrap">
                    {isPlayIT ? (
                      <div className="biyahe-plate bg-[#FFC72C] text-black px-4 py-2 border-2 border-black shadow-[0_3px_0_#000] flex flex-col sm:items-end">
                        <div className="font-bungee text-xs tracking-wider flex items-center gap-1.5">
                          <span>★ FLAGSHIP CAPSTONE THESIS</span>
                          <span className="text-[10px] bg-black text-[#FFC72C] px-1.5 py-0.5 rounded">
                            100% ON-DEVICE OFFLINE
                          </span>
                        </div>
                        <div className="font-lexend text-[11px] font-semibold text-black/80">
                          DepEd Grade 1 Deployment • Code Restricted
                        </div>
                      </div>
                    ) : (
                      <>
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${proj.title} live deployment`}
                            style={{ ["--depth-color" as string]: "#B61E22" }}
                            className="pressable-plate px-4 sm:px-5 py-2 sm:py-2.5 bg-[#E4262A] text-white font-bungee text-xs tracking-wider flex items-center gap-1.5 shadow-[0_3px_0_#000]"
                          >
                            <span>★ OPEN LIVE APP</span>
                            <span aria-hidden="true">↗</span>
                          </a>
                        )}

                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${proj.title} source code on GitHub`}
                            style={{ ["--depth-color" as string]: "#1632A7" }}
                            className="pressable-plate px-4 sm:px-5 py-2 sm:py-2.5 bg-[#1B3FD1] text-white font-bungee text-xs tracking-wider flex items-center gap-1.5 shadow-[0_3px_0_#000]"
                          >
                            <span>GITHUB REPO</span>
                            <span aria-hidden="true">↗</span>
                          </a>
                        )}

                        {!proj.liveUrl && proj.status && (
                          <span className="biyahe-plate bg-[#0F9D58] text-black px-3.5 py-2 font-bungee text-[11px] uppercase tracking-wider shadow-[0_2px_0_#000]">
                            {proj.status}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="font-bungee text-3xl sm:text-4xl text-black dark:text-white tracking-wide leading-tight">
                    {proj.title}
                  </h3>
                  {proj.subtitle && (
                    <p className="font-lexend text-sm sm:text-base text-black/75 dark:text-[#FFC72C] font-semibold mt-1">
                      {proj.subtitle}
                    </p>
                  )}
                </div>

                {/* Comprehensive Description */}
                <p className="font-lexend text-sm sm:text-base leading-relaxed text-black/90 dark:text-white/90">
                  {proj.description}
                </p>

                {/* 3-Column Field Problem, Constraints & Architecture Spec Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {proj.problem && (
                    <div className="p-4 biyahe-plate bg-[#F8F9FA] dark:bg-[#0B1440] text-black dark:text-white border-2 border-black/20 dark:border-white/15 space-y-1.5 shadow-[0_2px_0_#000]">
                      <div className="font-bungee text-[11px] text-[#E4262A] uppercase tracking-wider">
                        FIELD PROBLEM
                      </div>
                      <p className="font-lexend text-xs leading-relaxed text-black/85 dark:text-white/85">
                        {proj.problem}
                      </p>
                    </div>
                  )}
                  {proj.constraints && (
                    <div className="p-4 biyahe-plate bg-[#F8F9FA] dark:bg-[#0B1440] text-black dark:text-white border-2 border-black/20 dark:border-white/15 space-y-1.5 shadow-[0_2px_0_#000]">
                      <div className="font-bungee text-[11px] text-[#1B3FD1] dark:text-[#FFC72C] uppercase tracking-wider">
                        ENGINEERING CONSTRAINTS
                      </div>
                      <p className="font-lexend text-xs leading-relaxed text-black/85 dark:text-white/85">
                        {proj.constraints}
                      </p>
                    </div>
                  )}
                  {proj.architecture && (
                    <div className="p-4 biyahe-plate bg-[#F8F9FA] dark:bg-[#0B1440] text-black dark:text-white border-2 border-black/20 dark:border-white/15 space-y-1.5 shadow-[0_2px_0_#000]">
                      <div className="font-bungee text-[11px] text-[#0F9D58] uppercase tracking-wider">
                        SYSTEM ARCHITECTURE
                      </div>
                      <p className="font-lexend text-xs leading-relaxed text-black/85 dark:text-white/85">
                        {proj.architecture}
                      </p>
                    </div>
                  )}
                </div>

                {/* Key Deliverables & Outcomes */}
                {proj.highlights && proj.highlights.length > 0 && (
                  <div className="space-y-2">
                    <div className="font-bungee text-xs text-black/70 dark:text-white/70 uppercase tracking-wider">
                      KEY ENGINEERING DELIVERABLES &amp; IMPACT
                    </div>
                    <ul className="space-y-1.5 text-xs sm:text-sm font-lexend text-black/90 dark:text-white/90">
                      {proj.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#0F9D58] font-bold shrink-0">➔</span>
                          <span className="leading-snug">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* System Stack Chips */}
                <div className="space-y-2">
                  <div className="font-bungee text-xs text-black/70 dark:text-white/70 uppercase tracking-wider">
                    SYSTEM RUNTIME STACK
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-[#0F9D58] text-black font-lexend font-bold text-xs rounded border border-black shadow-[0_2px_0_#000]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Inline Expandable Architecture & Pipeline Disclosure Bar */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => toggleExpand(proj.title)}
                    aria-expanded={isExpanded}
                    style={{ ["--depth-color" as string]: isExpanded ? "#000000" : "#CCCCCC" }}
                    className={`pressable-plate w-full py-3 px-5 font-bungee text-xs sm:text-sm tracking-wider uppercase flex items-center justify-between transition-colors border-2 border-black ${
                      isExpanded
                        ? "bg-[#1B3FD1] text-white shadow-[0_4px_0_#000]"
                        : "bg-[#F1F3F5] dark:bg-[#0B1440] text-black dark:text-white shadow-[0_3px_0_#000]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFC72C] inline-block border border-black" />
                      <span>
                        {isExpanded
                          ? "▲ COLLAPSE 4-STAGE ARCHITECTURE & DATA CONTRACTS"
                          : "▼ EXPAND 4-STAGE ARCHITECTURE & DATA CONTRACTS"}
                      </span>
                    </span>
                    <span className="font-mono text-xs opacity-90 hidden sm:inline">
                      {isExpanded ? "[CLICK TO HIDE]" : "[INSPECT FULL PIPELINE & SPECS]"}
                    </span>
                  </button>
                </div>

                {/* Expanded Inline Specs: Verified LTO Metrics + 4-Stage Architecture Pipeline */}
                {isExpanded && (
                  <div className="space-y-6 pt-4 border-t-2 border-black/20 dark:border-white/20 animate-fade-in">
                    {/* Verified LTO Inspection KPI Badges */}
                    {proj.metrics && proj.metrics.length > 0 && (
                      <div className="space-y-2">
                        <div className="font-bungee text-[11px] text-[#1B3FD1] dark:text-[#FFC72C] uppercase tracking-wider flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#FFC72C] inline-block" />
                          <span>VERIFIED LTO INSPECTION METRICS &amp; CONSTRAINTS</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {proj.metrics.map((m) => (
                            <div
                              key={m.label}
                              className="biyahe-plate bg-[#0B1440] text-white p-3 border-2 border-black shadow-[0_2px_0_#000]"
                            >
                              <div className="font-bungee text-[9px] text-[#FFC72C] uppercase truncate">
                                {m.label}
                              </div>
                              <div className="font-bungee text-base sm:text-lg text-white my-0.5">
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

                    {/* 4-Stage Architecture Pipeline Grid */}
                    {proj.architectureSteps && proj.architectureSteps.length > 0 && (
                      <div className="space-y-3">
                        <div className="font-bungee text-xs sm:text-sm text-[#1B3FD1] dark:text-[#FFC72C] uppercase tracking-wider flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#0F9D58] inline-block border border-black" />
                          <span>4-STAGE ARCHITECTURE PIPELINE // DATA CONTRACTS &amp; SPECS</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                          {proj.architectureSteps.map((step) => (
                            <div
                              key={step.step}
                              className="biyahe-plate bg-[#0B1440] text-white p-4 space-y-2.5 border-2 border-black shadow-[0_3px_0_#000] flex flex-col justify-between"
                            >
                              <div className="space-y-1.5">
                                <div className="flex items-center justify-between gap-1.5 border-b border-white/15 pb-1.5">
                                  <span className="px-2 py-0.5 rounded bg-[#FFC72C] text-black font-bungee text-[10px] uppercase tracking-wider border border-black">
                                    STAGE {step.step}
                                  </span>
                                  <span className="font-mono text-[10px] text-[#FFC72C] font-bold truncate">
                                    {step.subtitle}
                                  </span>
                                </div>

                                <h5 className="font-bungee text-xs text-white">
                                  {step.title}
                                </h5>
                                <p className="font-lexend text-xs leading-relaxed text-white/80">
                                  {step.description}
                                </p>

                                <div className="flex flex-wrap gap-1 pt-1">
                                  {step.technologies.map((t) => (
                                    <span
                                      key={t}
                                      className="px-2 py-0.5 bg-[#0F9D58] text-black text-[10px] font-lexend font-bold rounded border border-black"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Data Contract Box */}
                              {step.dataContract && (
                                <div className="p-2.5 bg-black/60 rounded border border-white/20 space-y-1 font-mono text-[10px] text-white/90 mt-2">
                                  <div className="text-[#FFC72C] font-bold text-[9px] uppercase tracking-wider">
                                    DATA CONTRACT SPEC
                                  </div>
                                  <div className="truncate">
                                    <span className="text-white/60 font-bold">[IN]</span>{" "}
                                    {step.dataContract.input}
                                  </div>
                                  <div className="truncate">
                                    <span className="text-[#0F9D58] font-bold">[PROC]</span>{" "}
                                    {step.dataContract.processing}
                                  </div>
                                  <div className="truncate">
                                    <span className="text-[#E4262A] font-bold">[OUT]</span>{" "}
                                    {step.dataContract.output}
                                  </div>
                                </div>
                              )}

                              {/* Specs & Tradeoffs */}
                              {(step.specs || step.tradeoff) && (
                                <div className="pt-2 border-t border-white/15 text-[10px] space-y-1 font-lexend text-white/80">
                                  {step.specs && (
                                    <div>
                                      <strong className="text-[#FFC72C]">METRIC:</strong>{" "}
                                      <span className="font-mono text-white/95">
                                        {step.specs}
                                      </span>
                                    </div>
                                  )}
                                  {step.tradeoff && (
                                    <div>
                                      <strong className="text-white">TRADEOFF:</strong>{" "}
                                      <span className="italic text-white/90">
                                        {step.tradeoff}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Bottom Repeated Action Links For Ease of Navigation */}
                    <div className="pt-3 border-t border-black/15 dark:border-white/15 flex items-center justify-between gap-3 flex-wrap">
                      <span className="font-mono text-xs text-black/60 dark:text-white/60 font-bold">
                        ROUTE MANIFEST VERIFIED // {proj.title.toUpperCase()}
                      </span>

                      <div className="flex items-center gap-2.5 flex-wrap">
                        {isPlayIT ? (
                          <span className="biyahe-plate bg-[#FFC72C] text-black px-3 py-1 font-bungee text-[10px] uppercase shadow-[0_2px_0_#000]">
                            OFFLINE ACADEMIC THESIS
                          </span>
                        ) : (
                          <>
                            {proj.liveUrl && (
                              <a
                                href={proj.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Open ${proj.title} live demo`}
                                style={{ ["--depth-color" as string]: "#B61E22" }}
                                className="pressable-plate px-4 py-2 bg-[#E4262A] text-white font-bungee text-xs tracking-wider flex items-center gap-1.5 shadow-[0_3px_0_#000]"
                              >
                                <span>OPEN LIVE APP</span>
                                <span aria-hidden="true">↗</span>
                              </a>
                            )}
                            {proj.githubUrl && (
                              <a
                                href={proj.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`View ${proj.title} GitHub repository`}
                                style={{ ["--depth-color" as string]: "#1632A7" }}
                                className="pressable-plate px-4 py-2 bg-[#1B3FD1] text-white font-bungee text-xs tracking-wider flex items-center gap-1.5 shadow-[0_3px_0_#000]"
                              >
                                <span>GITHUB REPO</span>
                                <span aria-hidden="true">↗</span>
                              </a>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
