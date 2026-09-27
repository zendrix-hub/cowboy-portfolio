'use client';

import React, { useEffect, useRef, useSyncExternalStore } from 'react';
import { wiringStore } from './wiringStore';

export function RuntimeProjects() {
  const isWired = useSyncExternalStore(
    wiringStore.subscribe,
    wiringStore.getSnapshot,
    wiringStore.getServerSnapshot
  );

  const daloyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    wiringStore.init();

    if (!daloyRef.current || isWired) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            wiringStore.trigger();
            observer.disconnect();
          }
        }
      },
      {
        threshold: 0.6,
      }
    );

    observer.observe(daloyRef.current);
    return () => observer.disconnect();
  }, [isWired]);

  return (
    <section
      id="projects"
      aria-label="Modules: Engineering Projects"
      className="w-full flex flex-col items-center justify-center py-2"
    >
      {/* Featured Module: DaloyAqua (2px border, largest module) */}
      <div
        ref={daloyRef}
        className="runtime-node w-full max-w-[720px] rounded-lg border-2 border-[var(--ink)] bg-[var(--board)] p-6 sm:p-8 transition-colors mb-8"
      >
        {/* Module Header Bar */}
        <div className="flex flex-wrap items-center justify-between border-b-2 border-[var(--ink)] pb-3 mb-6 gap-2">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="inline-block w-3.5 h-3.5 border-2 border-[var(--ink)] bg-[var(--marker)] rounded-sm"
            />
            <h3 className="font-mono text-[clamp(1.25rem,2.5vw,1.75rem)] leading-[1.1] font-bold text-[var(--ink)]">
              DaloyAqua
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Status rendered exactly as stored in repo */}
            <span className="font-mono text-xs px-2.5 py-0.5 border border-[var(--ink)] rounded-full text-[var(--ink)] bg-[var(--ink)]/[0.04]">
              In Progress
            </span>
            <span className="font-mono text-xs text-[var(--ink-2)] uppercase">
              MODULE // BACKEND_FLAGSHIP
            </span>
          </div>
        </div>

        {/* Subtitle & Role Context */}
        <p className="font-mono text-xs text-[var(--ink-2)] mb-4">
          Agro-Meteorological Advisory Backend • Backend Developer • Collaborative Project
        </p>

        {/* Verbatim Description in Manrope */}
        <p className="font-sans text-[1.0625rem] leading-[1.65] text-[var(--ink)] mb-6">
          An agro-meteorological advisory and decision-support backend that continuously processes microclimate weather telemetry against crop biological stages to deliver actionable automated risk alerts.
        </p>

        {/* System Architecture Specifications */}
        <div className="border border-[var(--ink)]/20 bg-[var(--ink)]/[0.02] rounded p-4 font-mono text-xs space-y-2 mb-6">
          <div>
            <span className="text-[var(--ink-2)] font-semibold">Problem: </span>
            <span className="text-[var(--ink)]">
              Smallholder farmers suffer severe crop loss from abrupt microclimate swings in rainfall and soil moisture.
            </span>
          </div>
          <div>
            <span className="text-[var(--ink-2)] font-semibold">Architecture: </span>
            <span className="text-[var(--ink)]">
              Asynchronous Python/FastAPI backend utilizing APScheduler for non-blocking cron jobs and Pydantic validation.
            </span>
          </div>
        </div>

        {/* Ports Section */}
        <div className="pt-4 border-t border-[var(--ink)]/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Bottom edge: in: ports (Skills Exact-Match Stack) */}
          <div>
            <span className="block font-mono text-[11px] font-bold text-[var(--ink-2)] uppercase tracking-wider mb-2">
              IN: PORTS (MATCHED SKILL COMPONENTS)
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'Python', matched: true },
                { name: 'FastAPI', matched: true },
                { name: 'APScheduler', matched: true },
                { name: 'Async Architecture', matched: false },
                { name: 'Pydantic', matched: false },
              ].map((port) => (
                <span
                  key={port.name}
                  className={`port-tab inline-flex items-center px-2 py-1 font-mono text-xs border rounded-none transition-colors ${
                    port.matched && isWired
                      ? 'border-[var(--marker)] text-[var(--marker)] font-semibold'
                      : 'border-[var(--ink)] text-[var(--ink)]'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`inline-block w-1.5 h-1.5 mr-1.5 rounded-full ${
                      port.matched ? 'bg-[var(--marker)]' : 'bg-[var(--ink-2)]'
                    }`}
                  />
                  in: {port.name}
                </span>
              ))}
            </div>
          </div>

          {/* Right edge: out: ports (Repository Links) */}
          <div className="md:text-right">
            <span className="block font-mono text-[11px] font-bold text-[var(--ink-2)] uppercase tracking-wider mb-2">
              OUT: PORTS
            </span>
            <div className="flex flex-wrap md:justify-end gap-2">
              <a
                href="https://github.com/zendrix-hub/daloyaqua"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open source code repository for DaloyAqua"
                className="port-tab inline-flex items-center min-h-[44px] px-3 py-1 font-mono text-xs border border-[var(--ink)] rounded-none text-[var(--ink)] hover:border-[var(--marker)] hover:text-[var(--marker)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--marker)] transition-colors"
              >
                out: Source Code ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Supporting Project Modules (1px border) */}
      <div className="w-full max-w-[720px] space-y-6">
        {/* PlayIT */}
        <div className="runtime-node w-full rounded-lg border border-[var(--ink)] bg-[var(--board)] p-6 transition-colors">
          <div className="flex flex-wrap items-center justify-between border-b border-[var(--ink)]/20 pb-3 mb-4 gap-2">
            <h4 className="font-mono text-base font-bold text-[var(--ink)]">
              PlayIT (BasaTrack)
            </h4>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 border border-[var(--ink)] rounded-full text-[var(--ink)] bg-[var(--ink)]/[0.04]">
                Flagship Engineering Thesis
              </span>
              <span className="font-mono text-xs text-[var(--ink-2)]">
                MODULE // MOBILE
              </span>
            </div>
          </div>

          <p className="font-sans text-sm text-[var(--ink)] mb-4">
            A native Android phonics literacy platform engineered for Filipino Grade 1 learners using the Marungko Approach. Designed for zero-connectivity environments with on-device Vosk ASR speech evaluation.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[var(--ink)]/15">
            <div className="flex flex-wrap gap-1.5">
              {['Kotlin', 'Android SDK', 'Room (SQLite)', 'Clean Architecture'].map((tech) => (
                <span
                  key={tech}
                  className="port-tab inline-flex items-center px-2 py-0.5 font-mono text-[11px] border border-[var(--ink)] rounded-none text-[var(--ink-2)]"
                >
                  in: {tech}
                </span>
              ))}
            </div>
            <a
              href="https://github.com/zendrix-hub/BasaTrack"
              target="_blank"
              rel="noopener noreferrer"
              className="port-tab inline-flex items-center min-h-[44px] px-3 py-1 font-mono text-xs border border-[var(--ink)] rounded-none text-[var(--ink)] hover:border-[var(--marker)] transition-colors self-start sm:self-auto"
            >
              out: Source Code ↗
            </a>
          </div>
        </div>

        {/* ReadHub */}
        <div className="runtime-node w-full rounded-lg border border-[var(--ink)] bg-[var(--board)] p-6 transition-colors">
          <div className="flex flex-wrap items-center justify-between border-b border-[var(--ink)]/20 pb-3 mb-4 gap-2">
            <h4 className="font-mono text-base font-bold text-[var(--ink)]">
              ReadHub
            </h4>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 border border-[var(--ink)] rounded-full text-[var(--ink)] bg-[var(--ink)]/[0.04]">
                Completed
              </span>
              <span className="font-mono text-xs text-[var(--ink-2)]">
                MODULE // FULL-STACK
              </span>
            </div>
          </div>

          <p className="font-sans text-sm text-[var(--ink)] mb-4">
            A production-style library management system built with Spring Boot 3, Spring Security JWT, Docker, and Nginx. Structured on Controller-Service-Repository architecture with strict stateless authorization.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[var(--ink)]/15">
            <div className="flex flex-wrap gap-1.5">
              {['Java 17', 'Spring Boot 3', 'Docker', 'MySQL', 'REST APIs'].map((tech) => (
                <span
                  key={tech}
                  className="port-tab inline-flex items-center px-2 py-0.5 font-mono text-[11px] border border-[var(--ink)] rounded-none text-[var(--ink-2)]"
                >
                  in: {tech}
                </span>
              ))}
            </div>
            <a
              href="https://github.com/zendrix-hub/ReadHub"
              target="_blank"
              rel="noopener noreferrer"
              className="port-tab inline-flex items-center min-h-[44px] px-3 py-1 font-mono text-xs border border-[var(--ink)] rounded-none text-[var(--ink)] hover:border-[var(--marker)] transition-colors self-start sm:self-auto"
            >
              out: Source Code ↗
            </a>
          </div>
        </div>

        {/* Gordon RamsAi */}
        <div className="runtime-node w-full rounded-lg border border-[var(--ink)] bg-[var(--board)] p-6 transition-colors">
          <div className="flex flex-wrap items-center justify-between border-b border-[var(--ink)]/20 pb-3 mb-4 gap-2">
            <h4 className="font-mono text-base font-bold text-[var(--ink)]">
              Gordon RamsAi
            </h4>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 border border-[var(--ink)] rounded-full text-[var(--ink)] bg-[var(--ink)]/[0.04]">
                Completed
              </span>
              <span className="font-mono text-xs text-[var(--ink-2)]">
                MODULE // AI
              </span>
            </div>
          </div>

          <p className="font-sans text-sm text-[var(--ink)] mb-4">
            AI-powered fitness & nutrition chatbot using Streamlit, ChromaDB vector store for RAG semantic search, and Google Gemini API with Langfuse prompt tracing.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[var(--ink)]/15">
            <div className="flex flex-wrap gap-1.5">
              {['Google Gemini API', 'ChromaDB', 'Streamlit'].map((tech) => (
                <span
                  key={tech}
                  className="port-tab inline-flex items-center px-2 py-0.5 font-mono text-[11px] border border-[var(--ink)] rounded-none text-[var(--ink-2)]"
                >
                  in: {tech}
                </span>
              ))}
            </div>
            <a
              href="https://github.com/zendrix-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="port-tab inline-flex items-center min-h-[44px] px-3 py-1 font-mono text-xs border border-[var(--ink)] rounded-none text-[var(--ink)] hover:border-[var(--marker)] transition-colors self-start sm:self-auto"
            >
              out: Source Code ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
