import React from 'react';
import { experiences } from '@/data/experience';

export function SlateExperience() {
  return (
    <section
      id="experience"
      aria-label="Scene 05: Production Timeline of Takes"
      className="slate-shot"
    >
      {/* Corner Scene-Slate Mark */}
      <div
        aria-hidden="true"
        className="absolute top-4 right-6 sm:top-6 sm:right-10 flex items-center gap-2 select-none pointer-events-none"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--tally)]" />
        <span className="font-sans text-xs tracking-widest uppercase text-[var(--ink-2)] font-semibold">
          SCENE 05 // TIMELINE OF TAKES
        </span>
      </div>

      <div className="shot-content px-6 max-w-3xl mx-auto my-auto py-6 w-full">
        <h2 className="shot-title text-center mb-2">
          Production Takes
        </h2>
        <p className="font-sans text-xs tracking-[0.2em] text-[var(--ink-2)] uppercase text-center mb-8">
          EXECUTION CHRONOLOGY & FIELD RECORDINGS
        </p>

        {/* Compact Credit Line Sequence */}
        <div className="space-y-6 border-t border-b border-[var(--ink)]/20 py-6">
          {experiences.map((exp) => {
            const isCurrent = exp.period.includes('Present');

            return (
              <div
                key={exp.period + exp.title}
                className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-6 border-b border-[var(--ink)]/10 pb-5 last:border-b-0 last:pb-0"
              >
                {/* Left: Period & Category */}
                <div className="sm:w-1/3 flex flex-col">
                  <div className="flex items-center gap-2">
                    {isCurrent && (
                      <span
                        aria-hidden="true"
                        className="inline-block w-2 h-2 rounded-full bg-[var(--tally)] animate-pulse"
                      />
                    )}
                    <span className="font-sans text-xs font-bold tracking-wider uppercase text-[var(--ink)]">
                      {exp.period}
                    </span>
                  </div>
                  <span className="font-sans text-[11px] tracking-wider uppercase text-[var(--ink-2)]">
                    TAKE // {exp.category}
                  </span>
                </div>

                {/* Right: Title (Bebas Neue) & Organization & Description */}
                <div className="sm:w-2/3">
                  <h3 className="font-display text-xl sm:text-2xl tracking-wide uppercase text-[var(--ink)] mb-1">
                    {exp.title}
                  </h3>
                  <p className="font-sans text-xs tracking-wider uppercase font-semibold text-[var(--ink-2)] mb-2">
                    {exp.organization}
                  </p>
                  <p className="font-sans text-sm leading-relaxed text-[var(--ink)]">
                    {exp.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
