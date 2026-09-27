import React from "react";
import { RoomThreshold } from "./RoomThreshold";
import { projects, Project } from "@/data/projects";

export function WingProjects() {
  const daloyAqua = projects.find((p) => p.title === "DaloyAqua") || projects[0];
  const supportingProjects = projects.filter((p) => p.title !== "DaloyAqua");

  return (
    <section
      id="room-03"
      aria-labelledby="exhibits-room-heading"
      className="w-full min-h-[90svh] flex flex-col justify-between max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 pb-16"
    >
      <RoomThreshold roomNumber="03" roomName="The Exhibits" />

      <div className="flex-1 space-y-16 sm:space-y-24 py-8">
        <header className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-brass font-archivo font-bold block">
            Gallery Exhibits
          </span>
          <h2
            id="exhibits-room-heading"
            className="font-archivo font-bold text-[clamp(2rem,5vw,4rem)] leading-tight text-ink uppercase"
          >
            Engineering Installations
          </h2>
          <p className="font-sans text-sm text-ink-2 max-w-xl">
            Selected software systems and capstone engines presented with complete architectural specifications and wall labels.
          </p>
        </header>

        {/* 1. THE MAIN WALL: DaloyAqua (§9.3.7) */}
        <div className="space-y-4">
          <span className="text-xs font-archivo uppercase tracking-widest text-ink-2/80 block">
            Primary Installation // Lead Wall
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* The Exhibit Frame (§9.3.3: 1px ink border) */}
            <div className="lg:col-span-6 exhibit-frame bg-concrete border border-ink p-8 sm:p-12 flex flex-col justify-between min-h-[300px] sm:min-h-[360px] relative">
              <div className="flex items-center justify-between text-xs font-mono text-ink-2 pb-4 border-b border-ink/20">
                <span>INSTALLATION NO. 01</span>
                <span>STATUS: {daloyAqua.status || "IN PROGRESS"}</span>
              </div>

              {/* Minimalist Architectural Schematic Representation */}
              <div className="py-8 space-y-3">
                <span className="font-archivo text-2xl sm:text-3xl font-bold uppercase text-ink block">
                  {daloyAqua.title}
                </span>
                <p className="font-sans text-xs sm:text-sm text-ink-2">
                  {daloyAqua.subtitle}
                </p>
                <div className="h-[2px] w-20 bg-brass" aria-hidden="true" />
              </div>

              <div className="text-[11px] font-mono text-ink-2/60 pt-4 border-t border-ink/20 flex items-center justify-between">
                <span>BACKEND RULE ENGINE</span>
                <span>WEST WING INSTALLATION</span>
              </div>
            </div>

            {/* The Wall Label (§9.3.7) */}
            <div className="lg:col-span-6 wall-label bg-concrete border border-ink p-6 sm:p-8 space-y-5">
              <div className="flex items-baseline justify-between border-b border-ink/20 pb-3">
                <h3 className="font-archivo font-bold text-xl sm:text-2xl text-ink uppercase">
                  {daloyAqua.title}
                </h3>
                {daloyAqua.status && (
                  <span className="font-mono text-xs font-bold text-brass uppercase">
                    [{daloyAqua.status}]
                  </span>
                )}
              </div>

              <p className="font-sans text-sm sm:text-base leading-[1.65] text-ink">
                {daloyAqua.description}
              </p>

              <div className="space-y-1.5 font-sans text-xs sm:text-sm pt-2 border-t border-ink/15">
                <span className="font-archivo uppercase text-xs font-bold text-ink-2 block">
                  Stack:
                </span>
                <p className="text-ink font-medium">{daloyAqua.tags.join(" • ")}</p>
              </div>

              <div className="space-y-1.5 font-sans text-xs sm:text-sm pt-2 border-t border-ink/15">
                <span className="font-archivo uppercase text-xs font-bold text-ink-2 block">
                  Links:
                </span>
                <div className="flex flex-wrap gap-5 font-sans font-medium text-xs sm:text-sm">
                  {daloyAqua.liveUrl && (
                    <a
                      href={daloyAqua.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="wing-link text-ink"
                    >
                      Open project
                    </a>
                  )}
                  {daloyAqua.githubUrl && (
                    <a
                      href={daloyAqua.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="wing-link text-ink"
                    >
                      Source code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. THE SECONDARY WALL: Supporting Projects (§9.3.7) */}
        <div className="space-y-6 pt-8 border-t border-ink/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-archivo uppercase tracking-widest text-ink-2/80">
              Secondary Gallery Wall // Repertory
            </span>
            <span className="text-xs font-mono text-ink-2">
              {supportingProjects.length} Installations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {supportingProjects.map((p: Project, idx: number) => (
              <div key={p.title} className="space-y-4 flex flex-col justify-between">
                {/* Secondary Exhibit Frame */}
                <div className="exhibit-frame bg-concrete border border-ink p-6 min-h-[140px] flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[11px] font-mono text-ink-2">
                    <span aria-hidden="true">Exhibit 0{idx + 1}</span>
                    {p.status && <span>{p.status}</span>}
                  </div>
                  <h4 className="font-archivo font-bold text-lg text-ink uppercase">
                    {p.title}
                  </h4>
                  <div className="w-8 h-[2px] bg-brass/80" aria-hidden="true" />
                </div>

                {/* Secondary Wall Label */}
                <div className="wall-label bg-concrete border border-ink p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="font-sans text-xs sm:text-sm text-ink leading-relaxed">
                      {p.description}
                    </p>
                    <p className="text-[11px] font-mono text-ink-2">
                      <span className="uppercase text-ink-2/70 font-semibold block">Stack:</span>
                      {p.tags.slice(0, 4).join(", ")}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-ink/15 flex flex-wrap gap-4 text-xs font-medium">
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="wing-link text-ink"
                      >
                        Open project
                      </a>
                    )}
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="wing-link text-ink"
                      >
                        Source code
                      </a>
                    )}
                    {!p.liveUrl && !p.githubUrl && (
                      <span className="text-[11px] font-mono text-ink-2/60 uppercase">
                        [DepEd Offline Spec]
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full text-right text-[11px] font-mono text-ink-2/60 pt-6 border-t border-ink-2/15 select-none">
        <span>ROOM 03 // EXHIBITS INSTALLATION</span>
      </div>
    </section>
  );
}
