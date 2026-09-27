import React from 'react';

export function DatumProjects() {
  return (
    <section
      id="projects"
      aria-label="Engineering Projects: The Summit Approach"
      className="band-section band-high"
    >
      <div className="datum-column">
        {/* Elevation marker */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--contour)]" />
          <span className="font-display text-xs font-bold tracking-widest uppercase text-[var(--contour)]">
            ELEVATION // HIGH CONTOUR [BAND 03: SUMMIT APPROACH]
          </span>
        </div>

        <h2 className="font-display font-bold text-[clamp(1.75rem,4vw,3rem)] leading-[1.1] text-[var(--ink)] tracking-tight mb-8">
          The Summit Approach: Projects
        </h2>

        {/* Featured Project: DaloyAqua (The Summit) */}
        <div className="border-b border-[var(--contour)]/30 pb-10 mb-12">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--ink)]">
              DaloyAqua
            </h3>
            <span className="waypoint-tag">
              STATUS: In Progress
            </span>
          </div>

          <p className="font-display text-xs tracking-wider uppercase text-[var(--contour)] font-semibold mb-4">
            Agro-Meteorological Advisory Backend • Collaborative Project
          </p>

          <p className="font-sans text-base leading-[1.7] text-[var(--ink)] mb-4">
            An agro-meteorological advisory and decision-support backend that continuously processes microclimate weather telemetry against crop biological stages to deliver actionable automated risk alerts.
          </p>

          <div className="bg-[var(--ink)]/[0.04] p-3.5 border-l-2 border-[var(--contour)] mb-4 text-xs font-sans space-y-1">
            <p>
              <span className="font-bold text-[var(--ink)]">Architecture: </span>
              Asynchronous FastAPI with non-blocking APScheduler pipelines and Pydantic validation.
            </p>
            <p>
              <span className="font-bold text-[var(--ink)]">Impact: </span>
              Translates environmental shifts into crop risk assessments delivered via SMS to smallholder farmers.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap gap-1.5">
              {['Python', 'FastAPI', 'APScheduler', 'Pydantic', 'Async Architecture'].map((tech) => (
                <span key={tech} className="waypoint-tag text-[10px]">
                  {tech}
                </span>
              ))}
            </div>
            <a
              href="https://github.com/zendrix-hub/daloyaqua"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open source code repository for DaloyAqua"
              className="datum-link font-display text-xs uppercase tracking-wider font-bold"
            >
              Summit Repository ↗
            </a>
          </div>
        </div>

        {/* Supporting Projects Sequence */}
        <div className="space-y-8">
          <p className="font-display text-xs font-bold tracking-widest uppercase text-[var(--contour)] mb-4">
            ASCENT TRANSECTS // SUPPORTING PROJECTS
          </p>

          {/* PlayIT */}
          <div className="border-b border-[var(--contour)]/15 pb-6">
            <div className="flex items-baseline justify-between gap-2 mb-1">
              <h4 className="font-display text-lg font-bold text-[var(--ink)]">
                PlayIT (BasaTrack)
              </h4>
              <span className="waypoint-tag text-[10px]">
                Flagship Thesis
              </span>
            </div>
            <p className="font-sans text-xs text-[var(--ink)]/70 mb-2">
              Project Manager & Core Android Developer • Capstone Team
            </p>
            <p className="font-sans text-sm leading-[1.7] text-[var(--ink)] mb-3">
              Native Android phonics literacy platform engineered for Filipino Grade 1 learners using the Marungko Approach with on-device Vosk ASR speech evaluation.
            </p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--contour)] text-[11px] font-display font-medium">
                Kotlin • Room SQLite • Clean Architecture
              </span>
              <a
                href="https://github.com/zendrix-hub/BasaTrack"
                target="_blank"
                rel="noopener noreferrer"
                className="datum-link font-display text-[11px] uppercase tracking-wider"
              >
                Repository ↗
              </a>
            </div>
          </div>

          {/* ReadHub */}
          <div className="border-b border-[var(--contour)]/15 pb-6">
            <div className="flex items-baseline justify-between gap-2 mb-1">
              <h4 className="font-display text-lg font-bold text-[var(--ink)]">
                ReadHub
              </h4>
              <span className="waypoint-tag text-[10px]">
                Completed
              </span>
            </div>
            <p className="font-sans text-xs text-[var(--ink)]/70 mb-2">
              Full-Stack Developer • Independent Project
            </p>
            <p className="font-sans text-sm leading-[1.7] text-[var(--ink)] mb-3">
              Production-style library management system built with Spring Boot 3, Spring Security JWT, Docker, and Nginx.
            </p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--contour)] text-[11px] font-display font-medium">
                Java 17 • Spring Boot 3 • Docker • MySQL
              </span>
              <a
                href="https://github.com/zendrix-hub/ReadHub"
                target="_blank"
                rel="noopener noreferrer"
                className="datum-link font-display text-[11px] uppercase tracking-wider"
              >
                Repository ↗
              </a>
            </div>
          </div>

          {/* Gordon RamsAi */}
          <div>
            <div className="flex items-baseline justify-between gap-2 mb-1">
              <h4 className="font-display text-lg font-bold text-[var(--ink)]">
                Gordon RamsAi
              </h4>
              <span className="waypoint-tag text-[10px]">
                Completed
              </span>
            </div>
            <p className="font-sans text-xs text-[var(--ink)]/70 mb-2">
              Core Developer • 6-Member Team
            </p>
            <p className="font-sans text-sm leading-[1.7] text-[var(--ink)] mb-3">
              AI fitness and nutrition chatbot built with Streamlit, ChromaDB vector store RAG, and Google Gemini API.
            </p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--contour)] text-[11px] font-display font-medium">
                Streamlit • ChromaDB • Google Gemini API
              </span>
              <a
                href="https://github.com/zendrix-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="datum-link font-display text-[11px] uppercase tracking-wider"
              >
                Repository ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
