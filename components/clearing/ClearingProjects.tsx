import React from 'react';

export function ClearingProjects() {
  return (
    <section
      id="projects"
      aria-label="Engineering Projects"
      className="clearing-section"
    >
      <div className="clearing-content clearing-pos-left">
        <h2 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.3] font-normal tracking-[0.02em] text-[var(--ink)] mb-12">
          Projects
        </h2>

        {/* Featured Project: DaloyAqua */}
        <div className="mb-16">
          <div className="flex items-baseline gap-3 mb-2">
            <h3 className="font-serif text-2xl font-normal text-[var(--ink)]">
              DaloyAqua
            </h3>
            <span className="font-sans text-xs tracking-wider text-[var(--ink-2)]">
              In Progress
            </span>
          </div>

          <p className="font-sans text-xs tracking-wider text-[var(--ink-2)] mb-4">
            Agro-Meteorological Advisory Backend • Collaborative Project
          </p>

          <p className="font-sans text-base leading-[1.9] text-[var(--ink)] mb-4">
            An agro-meteorological advisory and decision-support backend that continuously processes microclimate weather telemetry against crop biological stages to deliver actionable automated risk alerts.
          </p>

          <p className="font-sans text-xs leading-relaxed text-[var(--ink-2)] mb-4">
            Architecture: Asynchronous Python/FastAPI with APScheduler periodic pipelines, rigid Pydantic payload validation, and decoupled SMS gateway delivery workers.
          </p>

          <p className="font-sans text-xs tracking-wider text-[var(--ink-2)] mb-4">
            Stack: Python • FastAPI • APScheduler • Pydantic • Async Architecture • SMS Gateway
          </p>

          <div>
            <a
              href="https://github.com/zendrix-hub/daloyaqua"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open source code repository for DaloyAqua"
              className="clearing-link font-sans text-xs tracking-wider uppercase font-medium"
            >
              Source repository ↗
            </a>
          </div>
        </div>

        {/* Supporting Projects */}
        <div className="space-y-14 pt-8">
          {/* PlayIT */}
          <div>
            <div className="flex items-baseline gap-3 mb-1">
              <h3 className="font-serif text-lg font-normal text-[var(--ink)]">
                PlayIT (BasaTrack)
              </h3>
              <span className="font-sans text-xs text-[var(--ink-2)]">
                Flagship Thesis
              </span>
            </div>
            <p className="font-sans text-xs text-[var(--ink-2)] mb-2">
              Project Manager & Core Android Developer • Capstone Team
            </p>
            <p className="font-sans text-sm leading-[1.8] text-[var(--ink)] mb-3">
              A native Android phonics literacy platform engineered for Filipino Grade 1 learners using the Marungko Approach. Designed for zero-connectivity environments with on-device Vosk ASR speech evaluation.
            </p>
            <p className="font-sans text-xs text-[var(--ink-2)] mb-3">
              Stack: Kotlin • Android SDK • Room (SQLite) • Clean Architecture • Vosk
            </p>
            <a
              href="https://github.com/zendrix-hub/BasaTrack"
              target="_blank"
              rel="noopener noreferrer"
              className="clearing-link font-sans text-xs tracking-wider uppercase"
            >
              Source repository ↗
            </a>
          </div>

          {/* ReadHub */}
          <div>
            <div className="flex items-baseline gap-3 mb-1">
              <h3 className="font-serif text-lg font-normal text-[var(--ink)]">
                ReadHub
              </h3>
              <span className="font-sans text-xs text-[var(--ink-2)]">
                Completed
              </span>
            </div>
            <p className="font-sans text-xs text-[var(--ink-2)] mb-2">
              Full-Stack Developer • Independent Project
            </p>
            <p className="font-sans text-sm leading-[1.8] text-[var(--ink)] mb-3">
              A production-style library management system built with Spring Boot 3, Spring Security JWT, Docker, and Nginx. Structured on Controller-Service-Repository architecture with stateless token authorization.
            </p>
            <p className="font-sans text-xs text-[var(--ink-2)] mb-3">
              Stack: Java 17 • Spring Boot 3 • Docker • MySQL • REST APIs
            </p>
            <a
              href="https://github.com/zendrix-hub/ReadHub"
              target="_blank"
              rel="noopener noreferrer"
              className="clearing-link font-sans text-xs tracking-wider uppercase"
            >
              Source repository ↗
            </a>
          </div>

          {/* Gordon RamsAi */}
          <div>
            <div className="flex items-baseline gap-3 mb-1">
              <h3 className="font-serif text-lg font-normal text-[var(--ink)]">
                Gordon RamsAi
              </h3>
              <span className="font-sans text-xs text-[var(--ink-2)]">
                Completed
              </span>
            </div>
            <p className="font-sans text-xs text-[var(--ink-2)] mb-2">
              Core Developer • 6-Member Team
            </p>
            <p className="font-sans text-sm leading-[1.8] text-[var(--ink)] mb-3">
              AI fitness and nutrition chatbot built with Streamlit, ChromaDB vector store for RAG semantic search, and Google Gemini API with Langfuse prompt tracing.
            </p>
            <p className="font-sans text-xs text-[var(--ink-2)] mb-3">
              Stack: Python • Google Gemini API • ChromaDB • Streamlit • RAG
            </p>
            <a
              href="https://github.com/zendrix-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="clearing-link font-sans text-xs tracking-wider uppercase"
            >
              Source repository ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
