"use client";

import { useState, useEffect } from "react";
import { projects, Project } from "@/data/projects";

const STOP_BADGES = [
  { stop: "STOP 02-A", bg: "bg-[#FFC72C]", text: "text-black" },
  { stop: "STOP 02-B", bg: "bg-[#1B3FD1]", text: "text-white" },
  { stop: "STOP 02-C", bg: "bg-[#E4262A]", text: "text-white" },
  { stop: "STOP 02-D", bg: "bg-[#0F9D58]", text: "text-black" },
];

export default function BiyaheProjects() {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // Close modal on Escape key & lock body scroll while modal is open
  useEffect(() => {
    if (!activeModalProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalProject(null);
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModalProject]);

  return (
    <section
      id="projects"
      className="bg-white dark:bg-[#0B1440] text-black dark:text-white pt-10 sm:pt-14 lg:pt-16 pb-8 sm:pb-10 lg:pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Title Header (§6.1.7) */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
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

        {/* 2x2 Dedicated Terminal Card Grid (Punchy & Scannable for 10-Second Reviews) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((proj: Project, index: number) => {
            const badgeConfig = STOP_BADGES[index % STOP_BADGES.length];
            const isPlayIT = proj.title.toLowerCase() === "playit";

            return (
              <article
                key={proj.title}
                className="biyahe-board bg-white dark:bg-[#131E57] border-3 border-black text-black dark:text-white p-6 sm:p-7 space-y-5 shadow-[0_6px_0_#000000] flex flex-col justify-between relative transition-shadow hover:shadow-[0_8px_0_#000000]"
              >
                {/* Stamped Corner Rivet Accents */}
                <span
                  className="w-2.5 h-2.5 rounded-full bg-black/25 dark:bg-white/25 border border-black/40 absolute top-2.5 left-2.5 pointer-events-none"
                  aria-hidden="true"
                />
                <span
                  className="w-2.5 h-2.5 rounded-full bg-black/25 dark:bg-white/25 border border-black/40 absolute top-2.5 right-2.5 pointer-events-none"
                  aria-hidden="true"
                />

                <div className="space-y-4">
                  {/* Top Bar: Stop Badge, Status, Category */}
                  <div className="flex items-center justify-between gap-2 flex-wrap border-b-2 border-black/15 dark:border-white/15 pb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`biyahe-plate ${badgeConfig.bg} ${badgeConfig.text} px-3 py-1 font-bungee text-xs tracking-wider shadow-[0_2px_0_#000]`}
                      >
                        {badgeConfig.stop}
                      </span>
                      {proj.status && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FFC72C] text-black font-lexend font-bold text-[11px] border border-black">
                          {proj.status}
                        </span>
                      )}
                    </div>

                    {proj.category && (
                      <span className="font-mono text-xs font-bold text-[#1B3FD1] dark:text-[#FFC72C] uppercase tracking-wider">
                        [{proj.category}]
                      </span>
                    )}
                  </div>

                  {/* Title & 1-Sentence Hook */}
                  <div>
                    <h3 className="font-bungee text-2xl sm:text-3xl text-black dark:text-white tracking-wide leading-tight">
                      {proj.title}
                    </h3>
                    <p className="font-lexend text-xs sm:text-sm text-black/75 dark:text-[#FFC72C] font-semibold mt-1">
                      {proj.subtitle || proj.description.split(".")[0] + "."}
                    </p>
                  </div>

                  {/* Engineering Role Callout */}
                  {proj.roleContext && (
                    <div className="biyahe-plate bg-[#F8F9FA] dark:bg-[#0B1440] p-2.5 border border-black/25 dark:border-white/20 text-xs font-lexend flex items-center gap-2 shadow-[0_2px_0_#000]">
                      <span className="font-bungee text-[10px] text-[#1B3FD1] dark:text-[#FFC72C] uppercase shrink-0">
                        ROLE:
                      </span>
                      <span className="text-black/85 dark:text-white/90 font-medium">
                        {proj.roleContext}
                      </span>
                    </div>
                  )}

                  {/* 3 Crisp Engineering Deliverables & Metrics */}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <div className="space-y-2">
                      <div className="font-bungee text-[10px] text-black/70 dark:text-white/70 uppercase tracking-wider">
                        KEY ENGINEERING DELIVERABLES &amp; OUTCOMES
                      </div>
                      <ul className="space-y-1.5 text-xs font-lexend text-black/90 dark:text-white/90">
                        {proj.highlights.slice(0, 3).map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#0F9D58] font-bold shrink-0">➔</span>
                            <span className="leading-snug">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* System Stack Chips */}
                  <div className="space-y-1.5">
                    <div className="font-bungee text-[10px] text-black/70 dark:text-white/70 uppercase tracking-wider">
                      SYSTEM STACK
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 bg-[#0F9D58] text-black font-lexend font-bold text-[11px] rounded border border-black shadow-[0_1px_0_#000]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pinned Direct Action Plates at Bottom of Card */}
                <div className="mt-auto pt-4 border-t-2 border-black/15 dark:border-white/15 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {isPlayIT ? (
                      <div className="biyahe-plate bg-[#0B1440] text-white px-3 py-2 border-2 border-[#FFC72C] shadow-[0_2px_0_#000] flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#FFC72C] text-black font-bungee text-[10px] uppercase tracking-wider rounded border border-black shrink-0">
                          OFFLINE THESIS
                        </span>
                        <span className="font-lexend text-[11px] text-white/90 hidden sm:inline">
                          100% On-Device APK
                        </span>
                      </div>
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
                            <span>★ OPEN LIVE APP</span>
                            <span aria-hidden="true">↗</span>
                          </a>
                        )}

                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${proj.title} repository`}
                            style={{ ["--depth-color" as string]: "#1632A7" }}
                            className="pressable-plate px-4 py-2 bg-[#1B3FD1] text-white font-bungee text-xs tracking-wider flex items-center gap-1.5 shadow-[0_3px_0_#000]"
                          >
                            <span>GITHUB REPO</span>
                            <span aria-hidden="true">↗</span>
                          </a>
                        )}

                        {!proj.liveUrl && proj.status && (
                          <span className="biyahe-plate bg-[#0F9D58] text-black px-3 py-1.5 font-bungee text-[10px] uppercase tracking-wider shadow-[0_2px_0_#000]">
                            {proj.status}
                          </span>
                        )}
                      </>
                    )}
                  </div>

                  {/* Stamped 'Full Technical Specs' Deep-Dive Button */}
                  <button
                    type="button"
                    onClick={() => setActiveModalProject(proj)}
                    aria-label={`Inspect full technical specifications for ${proj.title}`}
                    style={{ ["--depth-color" as string]: "#CCCCCC" }}
                    className="pressable-plate px-4 py-2 bg-white text-black font-bungee text-xs tracking-wider flex items-center gap-1.5 shadow-[0_3px_0_#000] border-2 border-black"
                  >
                    <span>FULL SPECS</span>
                    <span aria-hidden="true">➔</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Centered Transit Blueprint Modal (Deep-Dive Technical Manifest) */}
      {activeModalProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="biyahe-board bg-[#0B1440] text-white border-3 border-black max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-[0_10px_0_#000000] relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Hazard Bar Accent */}
            <div className="h-3 w-full bg-[#FFC72C] border-b-2 border-black" />

            {/* Modal Header Bar */}
            <div className="p-5 sm:p-7 border-b-2 border-white/20 flex items-start justify-between gap-4 sticky top-0 bg-[#0B1440]/95 backdrop-blur z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="biyahe-plate bg-[#FFC72C] text-black px-2.5 py-0.5 font-bungee text-[11px] uppercase tracking-wider shadow-[0_2px_0_#000]">
                    TECHNICAL MANIFEST
                  </span>
                  {activeModalProject.status && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#0F9D58] text-black font-lexend font-bold text-[10px] border border-black">
                      {activeModalProject.status}
                    </span>
                  )}
                  {activeModalProject.category && (
                    <span className="font-mono text-xs text-[#FFC72C] font-bold">
                      [{activeModalProject.category}]
                    </span>
                  )}
                </div>

                <h3
                  id="modal-title"
                  className="font-bungee text-2xl sm:text-4xl text-white tracking-tight"
                >
                  {activeModalProject.title}
                </h3>
                {activeModalProject.subtitle && (
                  <p className="font-lexend text-xs sm:text-sm text-[#FFC72C] font-medium">
                    {activeModalProject.subtitle}
                  </p>
                )}
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                aria-label="Close manifest"
                style={{ ["--depth-color" as string]: "#B61E22" }}
                className="pressable-plate px-3 py-1.5 bg-[#E4262A] text-white font-bungee text-xs tracking-wider uppercase flex items-center gap-1 shrink-0 shadow-[0_3px_0_#000]"
              >
                <span>✕ CLOSE</span>
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-5 sm:p-7 space-y-6">
              {/* Engineering Role Callout */}
              {activeModalProject.roleContext && (
                <div className="biyahe-plate bg-[#FFC72C] text-black p-3 font-lexend font-bold text-xs flex items-center gap-2 shadow-[0_2px_0_#000]">
                  <span className="font-bungee text-[10px] text-[#1B3FD1] uppercase">
                    ENGINEERING ROLE CONTEXT:
                  </span>
                  <span>{activeModalProject.roleContext}</span>
                </div>
              )}

              {/* Verified LTO Inspection KPI Badges */}
              {activeModalProject.metrics && activeModalProject.metrics.length > 0 && (
                <div className="space-y-2">
                  <div className="font-bungee text-[11px] text-[#FFC72C] uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FFC72C] inline-block" />
                    <span>VERIFIED LTO INSPECTION METRICS &amp; CONSTRAINTS</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {activeModalProject.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="biyahe-plate bg-black/60 text-white p-3 border border-white/20 shadow-[0_2px_0_#000]"
                      >
                        <div className="font-bungee text-[9px] text-[#FFC72C] uppercase truncate">
                          {m.label}
                        </div>
                        <div className="font-bungee text-base text-white my-0.5">
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

              {/* Narrative Description */}
              <div className="biyahe-plate bg-white text-black p-4 sm:p-5 space-y-2 shadow-[0_3px_0_#000]">
                <div className="font-bungee text-[11px] text-[#1B3FD1] uppercase">
                  SYSTEM OVERVIEW
                </div>
                <p className="font-lexend text-xs sm:text-sm leading-relaxed text-black/90">
                  {activeModalProject.description}
                </p>
              </div>

              {/* Field Problem, Constraints & Architecture Spec Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {activeModalProject.problem && (
                  <div className="p-3.5 biyahe-plate bg-black/50 text-white border border-white/20 space-y-1">
                    <div className="font-bungee text-[10px] text-[#E4262A] uppercase">
                      FIELD PROBLEM
                    </div>
                    <p className="font-lexend text-xs leading-relaxed text-white/90">
                      {activeModalProject.problem}
                    </p>
                  </div>
                )}
                {activeModalProject.constraints && (
                  <div className="p-3.5 biyahe-plate bg-black/50 text-white border border-white/20 space-y-1">
                    <div className="font-bungee text-[10px] text-[#FFC72C] uppercase">
                      ENGINEERING CONSTRAINTS
                    </div>
                    <p className="font-lexend text-xs leading-relaxed text-white/90">
                      {activeModalProject.constraints}
                    </p>
                  </div>
                )}
                {activeModalProject.architecture && (
                  <div className="p-3.5 biyahe-plate bg-black/50 text-white border border-white/20 space-y-1">
                    <div className="font-bungee text-[10px] text-[#0F9D58] uppercase">
                      SYSTEM ARCHITECTURE
                    </div>
                    <p className="font-lexend text-xs leading-relaxed text-white/90">
                      {activeModalProject.architecture}
                    </p>
                  </div>
                )}
              </div>

              {/* Full 4-Stage Architecture Pipeline Flow */}
              {activeModalProject.architectureSteps &&
                activeModalProject.architectureSteps.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <div className="font-bungee text-xs text-[#FFC72C] uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFC72C] inline-block border border-black" />
                      <span>4-STAGE ARCHITECTURE PIPELINE // DATA CONTRACTS</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      {activeModalProject.architectureSteps.map((step) => (
                        <div
                          key={step.step}
                          className="biyahe-plate bg-black/70 text-white p-4 space-y-2 border border-white/25 shadow-[0_3px_0_#000] flex flex-col justify-between"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-1.5">
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
                            <div className="p-2.5 bg-black rounded border border-white/20 space-y-1 font-mono text-[10px] text-white/90 mt-2">
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
                                  <strong className="text-[#FFC72C]">METRIC SPEC:</strong>{" "}
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

              {/* Key Deliverables & Outcomes */}
              {activeModalProject.highlights && activeModalProject.highlights.length > 0 && (
                <div className="space-y-2">
                  <div className="font-bungee text-xs text-[#FFC72C] uppercase tracking-wider">
                    COMPLETE ENGINEERING DELIVERABLES &amp; OUTCOMES
                  </div>
                  <ul className="space-y-1.5 text-xs font-lexend text-white/90">
                    {activeModalProject.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#0F9D58] font-bold">➔</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* System Stack Chips */}
              <div className="space-y-2">
                <div className="font-bungee text-xs text-[#FFC72C] uppercase tracking-wider">
                  COMPLETE SYSTEM RUNTIME STACK
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#0F9D58] text-black font-lexend font-bold text-xs rounded border border-black shadow-[0_2px_0_#000]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Bar */}
            <div className="p-5 sm:p-7 border-t-2 border-white/20 bg-[#0B1440] flex flex-wrap items-center justify-between gap-3 sticky bottom-0 z-10">
              <div className="flex flex-wrap items-center gap-3">
                {activeModalProject.title.toLowerCase() === "playit" ? (
                  <div className="biyahe-plate bg-black text-white px-4 py-2 border border-[#FFC72C] text-xs font-lexend">
                    <strong>OFFLINE CAPSTONE THESIS:</strong> Evaluated in DepEd Grade 1 classrooms • Proprietary/Restricted repository.
                  </div>
                ) : (
                  <>
                    {activeModalProject.liveUrl && (
                      <a
                        href={activeModalProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${activeModalProject.title} live demo`}
                        style={{ ["--depth-color" as string]: "#B61E22" }}
                        className="pressable-plate px-5 py-2.5 bg-[#E4262A] text-white font-bungee text-xs tracking-wider flex items-center gap-1.5 shadow-[0_3px_0_#000]"
                      >
                        <span>OPEN LIVE APP</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    {activeModalProject.githubUrl && (
                      <a
                        href={activeModalProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${activeModalProject.title} source repository`}
                        style={{ ["--depth-color" as string]: "#1632A7" }}
                        className="pressable-plate px-5 py-2.5 bg-[#1B3FD1] text-white font-bungee text-xs tracking-wider flex items-center gap-1.5 shadow-[0_3px_0_#000]"
                      >
                        <span>GITHUB REPO</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </>
                )}
              </div>

              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                style={{ ["--depth-color" as string]: "#CCCCCC" }}
                className="pressable-plate px-5 py-2.5 bg-white text-black font-bungee text-xs tracking-wider uppercase flex items-center gap-1 shadow-[0_3px_0_#000]"
              >
                <span>✕ CLOSE MANIFEST</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
