import React from 'react';

export function SlateProjects() {
  return (
    <section
      id="projects"
      aria-label="Scene 03: The Reel of Projects"
      className="slate-shot"
    >
      {/* Corner Scene-Slate Mark */}
      <div
        aria-hidden="true"
        className="absolute top-4 right-6 sm:top-6 sm:right-10 flex items-center gap-2 select-none pointer-events-none"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--tally)]" />
        <span className="font-sans text-xs tracking-widest uppercase text-[var(--ink-2)] font-semibold">
          SCENE 03 // THE REEL
        </span>
      </div>

      <div className="shot-content px-4 sm:px-8 max-w-6xl mx-auto my-auto py-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Featured Shot: DaloyAqua (Left / Main Stage ~7 cols) */}
          <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-[var(--ink)]/20 pb-6 lg:pb-0 lg:pr-8">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-sans text-xs tracking-widest uppercase text-[var(--tally)] font-bold">
                TAKE 01 // FEATURED
              </span>
              <span className="font-sans text-xs text-[var(--ink-2)] uppercase">
                STATUS: IN PROGRESS
              </span>
            </div>

            <h2 className="shot-title mb-2">
              DaloyAqua
            </h2>

            <p className="font-sans text-xs tracking-widest uppercase text-[var(--ink-2)] mb-4">
              Agro-Meteorological Advisory Backend • Collaborative Project
            </p>

            <p className="font-sans text-sm sm:text-base leading-relaxed text-[var(--ink)] mb-4">
              An agro-meteorological advisory and decision-support backend that continuously processes microclimate weather telemetry against crop biological stages to deliver actionable automated risk alerts.
            </p>

            <div className="bg-[var(--ink)]/[0.04] border border-[var(--ink)]/15 p-3.5 mb-4 text-xs font-sans space-y-1.5">
              <div>
                <span className="text-[var(--ink-2)] uppercase font-semibold">Architecture: </span>
                <span className="text-[var(--ink)]">
                  FastAPI, APScheduler non-blocking cron jobs, Pydantic validation, SMS gateway delivery.
                </span>
              </div>
              <div>
                <span className="text-[var(--ink-2)] uppercase font-semibold">Domain: </span>
                <span className="text-[var(--ink)]">
                  Translating environmental thresholds into actionable crop risk scores for smallholder farmers.
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wider text-[var(--ink-2)]">
                <span>Python</span> • <span>FastAPI</span> • <span>APScheduler</span> • <span>Pydantic</span>
              </div>
              <a
                href="https://github.com/zendrix-hub/daloyaqua"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open source code repository for DaloyAqua"
                className="slate-link text-xs uppercase tracking-widest font-bold"
              >
                Source reel ↗
              </a>
            </div>
          </div>

          {/* Contact Sheet Stills: Supporting Projects (Right ~5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <div className="border-b border-[var(--ink)]/20 pb-2 mb-1">
              <span className="font-sans text-xs tracking-widest uppercase text-[var(--ink-2)] font-bold">
                CONTACT SHEET // PRODUCTION STILLS
              </span>
            </div>

            {/* Still 1: PlayIT */}
            <div className="border border-[var(--ink)]/20 p-3.5 bg-[var(--ink)]/[0.02]">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-[var(--ink)]">
                  PlayIT (BasaTrack)
                </h3>
                <span className="font-sans text-[10px] text-[var(--ink-2)] uppercase">
                  Flagship Thesis
                </span>
              </div>
              <p className="font-sans text-xs text-[var(--ink-2)] mb-2">
                Native Android phonics literacy platform engineered for Filipino Grade 1 learners using the Marungko Approach with on-device Vosk ASR.
              </p>
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[var(--ink)]/10">
                <span className="text-[var(--ink-2)]">Kotlin • Room • MVVM</span>
                <a
                  href="https://github.com/zendrix-hub/BasaTrack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="slate-link tracking-wider uppercase font-semibold"
                >
                  Still ↗
                </a>
              </div>
            </div>

            {/* Still 2: ReadHub */}
            <div className="border border-[var(--ink)]/20 p-3.5 bg-[var(--ink)]/[0.02]">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-[var(--ink)]">
                  ReadHub
                </h3>
                <span className="font-sans text-[10px] text-[var(--ink-2)] uppercase">
                  Completed
                </span>
              </div>
              <p className="font-sans text-xs text-[var(--ink-2)] mb-2">
                Production-style library management system built with Spring Boot 3, Spring Security JWT, Docker, and Nginx.
              </p>
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[var(--ink)]/10">
                <span className="text-[var(--ink-2)]">Java 17 • Spring Boot 3</span>
                <a
                  href="https://github.com/zendrix-hub/ReadHub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="slate-link tracking-wider uppercase font-semibold"
                >
                  Still ↗
                </a>
              </div>
            </div>

            {/* Still 3: Gordon RamsAi */}
            <div className="border border-[var(--ink)]/20 p-3.5 bg-[var(--ink)]/[0.02]">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-[var(--ink)]">
                  Gordon RamsAi
                </h3>
                <span className="font-sans text-[10px] text-[var(--ink-2)] uppercase">
                  Completed
                </span>
              </div>
              <p className="font-sans text-xs text-[var(--ink-2)] mb-2">
                AI fitness and nutrition chatbot with Streamlit, ChromaDB vector store RAG, and Google Gemini API.
              </p>
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[var(--ink)]/10">
                <span className="text-[var(--ink-2)]">Gemini API • ChromaDB</span>
                <a
                  href="https://github.com/zendrix-hub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="slate-link tracking-wider uppercase font-semibold"
                >
                  Still ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
