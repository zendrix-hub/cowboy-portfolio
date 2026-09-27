import React from "react";
import { projects, Project } from "@/data/projects";

export function MastheadProjects() {
  const daloyAqua = projects.find((p) => p.title === "DaloyAqua") || projects[0];
  const supportingProjects = projects.filter((p) => p.title !== "DaloyAqua");

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="w-full max-w-[1200px] mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-ink-2/30"
    >
      {/* Editorial Section Masthead Label */}
      <div className="flex items-center justify-between pb-8 mb-8 border-b border-ink-2/20 text-xs text-ink-2">
        <span className="font-mono text-[11px] uppercase tracking-wider">Folio 03 // Feature Articles</span>
        <span className="font-mono text-[11px] uppercase tracking-wider">Engineering Dispatch</span>
      </div>

      <header className="mb-12">
        <span className="text-xs uppercase tracking-widest text-spot font-semibold block mb-2">
          Special Report
        </span>
        <h2
          id="projects-heading"
          className="font-playfair font-bold text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.05] text-ink"
        >
          Selected Systems &amp; Technical Dispatches
        </h2>
      </header>

      {/* LEAD FEATURE: DaloyAqua (§9.2.7) */}
      <article
        aria-labelledby="lead-feature-title"
        className="pb-16 mb-16 border-b border-ink-2/30"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-ink-2 font-mono block mb-1">
                Lead Feature // Architecture
              </span>
              <h3
                id="lead-feature-title"
                className="font-playfair font-bold text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] text-ink"
              >
                {daloyAqua.title}
              </h3>
              {daloyAqua.subtitle && (
                <p className="font-sans text-sm text-ink-2 mt-1">
                  {daloyAqua.subtitle}
                </p>
              )}
            </div>

            {/* The Dek: Set larger in Playfair italic (§9.2.7) */}
            <p className="font-playfair italic text-[clamp(1.25rem,2.5vw,1.75rem)] leading-[1.3] text-ink">
              {daloyAqua.description}
            </p>

            {/* Problem & Architectural Notes as Body Copy */}
            <div className="space-y-4 font-sans text-[1.0625rem] leading-[1.65] text-ink pt-2">
              <p>{daloyAqua.problem}</p>
              <p>{daloyAqua.architecture}</p>
            </div>

            {/* Byline Meta & Status */}
            <div className="pt-6 border-t border-ink-2/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-sans text-ink-2">
              <div className="space-y-1">
                <span className="font-medium text-ink-2/80 uppercase tracking-wider block">
                  Filed under:
                </span>
                <span className="text-ink font-medium">
                  {daloyAqua.tags.join(" • ")}
                </span>
              </div>
              {daloyAqua.status && (
                <div className="sm:text-right">
                  <span className="font-medium text-ink-2/80 uppercase tracking-wider block">
                    Status:
                  </span>
                  <span className="text-spot font-semibold">
                    {daloyAqua.status}
                  </span>
                </div>
              )}
            </div>

            {/* Text Links: Strictly no arrow glyphs per §9.2.2 */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-sm font-medium">
              {daloyAqua.liveUrl && (
                <a
                  href={daloyAqua.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="masthead-link text-ink py-1 focus-visible:outline-none"
                  aria-label={`Open ${daloyAqua.title}`}
                >
                  Open project
                </a>
              )}
              {daloyAqua.githubUrl && (
                <a
                  href={daloyAqua.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="masthead-link text-ink py-1 focus-visible:outline-none"
                  aria-label={`Source code for ${daloyAqua.title}`}
                >
                  Source code
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Architectural Highlights Sidebar */}
          <div className="lg:col-span-4 lg:border-l lg:border-ink-2/25 lg:pl-8 space-y-6 pt-2">
            <h4 className="font-mono text-xs uppercase tracking-wider text-ink-2 font-semibold">
              Field Specifications
            </h4>
            <div className="space-y-4">
              {daloyAqua.highlights.map((h, i) => (
                <div key={i} className="space-y-1 text-xs sm:text-sm font-sans text-ink-2">
                  <span className="font-mono text-[10px] text-spot font-bold block">
                    [REF // 0{i + 1}]
                  </span>
                  <p className="leading-relaxed text-ink">{h}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* SUPPORTING PROJECTS: "In Brief" Roundup (§9.2.7) */}
      <section aria-labelledby="in-brief-heading" className="space-y-8">
        <div className="flex items-center justify-between border-b border-ink-2/20 pb-3">
          <h3
            id="in-brief-heading"
            className="font-playfair text-xl sm:text-2xl font-bold text-ink"
          >
            In Brief: Additional Works
          </h3>
          <span className="font-mono text-xs text-ink-2">
            Roundup // {supportingProjects.length} Entries
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 divide-y md:divide-y-0 md:divide-x divide-ink-2/20">
          {supportingProjects.map((p: Project, index: number) => {
            // First sentence as dek
            const firstSentence = p.description.split(". ")[0] + ".";
            const remainder = p.description.slice(firstSentence.length).trim();

            return (
              <div
                key={p.title}
                className={`space-y-4 ${index > 0 ? "pt-8 md:pt-0 md:pl-10" : ""}`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-ink-2 mb-1">
                    <span className="font-mono text-[11px] text-spot font-medium">
                      Item 0{index + 2}
                    </span>
                    {p.status && (
                      <span className="font-mono text-[10px] uppercase text-ink-2/80">
                        {p.status}
                      </span>
                    )}
                  </div>
                  <h4 className="font-playfair font-bold text-xl sm:text-2xl text-ink leading-snug">
                    {p.title}
                  </h4>
                  {p.subtitle && (
                    <p className="font-sans text-xs text-ink-2 mt-0.5">
                      {p.subtitle}
                    </p>
                  )}
                </div>

                {/* Dek: first sentence in italic */}
                <p className="font-playfair italic text-sm sm:text-base leading-snug text-ink">
                  {firstSentence}
                </p>

                {remainder && (
                  <p className="font-sans text-xs leading-relaxed text-ink-2">
                    {remainder}
                  </p>
                )}

                {/* Stack line */}
                <p className="font-mono text-[11px] text-ink-2">
                  <span className="uppercase text-ink-2/70 block mb-0.5">Filed:</span>
                  {p.tags.slice(0, 4).join(", ")}
                </p>

                {/* Links */}
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium">
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="masthead-link text-ink py-1 focus-visible:outline-none"
                      aria-label={`Open ${p.title}`}
                    >
                      Open project
                    </a>
                  )}
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="masthead-link text-ink py-1 focus-visible:outline-none"
                      aria-label={`Source code for ${p.title}`}
                    >
                      Source code
                    </a>
                  )}
                  {!p.liveUrl && !p.githubUrl && (
                    <span className="font-mono text-[10px] text-ink-2/70 uppercase">
                      [DepEd Offline Deployment]
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
}
