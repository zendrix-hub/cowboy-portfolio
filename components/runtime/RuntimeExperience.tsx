import React from 'react';
import { experiences } from '@/data/experience';

export function RuntimeExperience() {
  return (
    <section
      id="experience"
      aria-label="Process: Engineering Experience"
      className="w-full flex flex-col items-center justify-center py-2"
    >
      <div className="w-full max-w-[720px]">
        {/* Section Header Bar */}
        <div className="runtime-node w-full rounded-lg border border-[var(--ink)] bg-[var(--board)] p-6 sm:p-8 mb-6 transition-colors">
          <div className="flex items-center justify-between border-b border-[var(--ink)]/20 pb-4">
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block w-3.5 h-3.5 border border-[var(--ink)] bg-transparent rounded-sm"
              />
              <h2 className="font-mono text-[clamp(1.25rem,2.5vw,1.75rem)] leading-[1.1] font-bold text-[var(--ink)]">
                Experience
              </h2>
            </div>
            <span className="font-mono text-xs text-[var(--ink-2)] uppercase">
              PROCESS_SEQUENCE // TIMELINE
            </span>
          </div>
          <p className="font-sans text-sm text-[var(--ink-2)] mt-3">
            Execution chronology across enterprise internship, academic foundation, and verified certifications.
          </p>
        </div>

        {/* Process Step Sequence with Downward Flow Connectors */}
        <div className="flex flex-col items-center">
          {experiences.map((exp, idx) => {
            const isCurrent = exp.period.includes('Present');

            return (
              <React.Fragment key={exp.period + exp.title}>
                {/* Process Step Node */}
                <div
                  className={`runtime-node w-full rounded-lg p-6 sm:p-7 transition-colors ${
                    isCurrent
                      ? 'border-2 border-[var(--marker)] bg-[var(--marker)] text-[var(--marker-text)]'
                      : 'border border-[var(--ink)] bg-[var(--board)] text-[var(--ink)]'
                  }`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <span
                      className={`font-mono text-xs font-semibold uppercase tracking-wider ${
                        isCurrent ? 'text-[var(--marker-text)]/90' : 'text-[var(--ink-2)]'
                      }`}
                    >
                      {exp.period}
                    </span>
                    <span
                      className={`font-mono text-[11px] px-2 py-0.5 rounded-full border ${
                        isCurrent
                          ? 'border-[var(--marker-text)]/40 bg-[var(--marker-text)]/10 text-[var(--marker-text)]'
                          : 'border-[var(--ink)]/30 text-[var(--ink-2)]'
                      }`}
                    >
                      {exp.category}
                    </span>
                  </div>

                  <h3
                    className={`font-mono font-bold text-base sm:text-lg mb-1 ${
                      isCurrent ? 'text-[var(--marker-text)]' : 'text-[var(--ink)]'
                    }`}
                  >
                    {exp.title}
                  </h3>

                  <p
                    className={`font-mono text-xs sm:text-sm mb-3 font-medium ${
                      isCurrent ? 'text-[var(--marker-text)]/90' : 'text-[var(--ink)]'
                    }`}
                  >
                    {exp.organization}
                  </p>

                  <p
                    className={`font-sans text-sm leading-relaxed mb-4 ${
                      isCurrent ? 'text-[var(--marker-text)]/95' : 'text-[var(--ink-2)]'
                    }`}
                  >
                    {exp.description}
                  </p>

                  {exp.highlights.length > 0 && (
                    <ul
                      className={`space-y-1.5 font-sans text-xs sm:text-sm border-t pt-3 pl-4 list-disc ${
                        isCurrent
                          ? 'border-[var(--marker-text)]/30 text-[var(--marker-text)]/90'
                          : 'border-[var(--ink)]/15 text-[var(--ink-2)]'
                      }`}
                    >
                      {exp.highlights.map((item, hIdx) => (
                        <li key={hIdx}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Downward flow connector between process steps */}
                {idx < experiences.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="flex flex-col items-center justify-center my-0 py-1 select-none pointer-events-none"
                  >
                    <svg
                      width="24"
                      height="36"
                      viewBox="0 0 24 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="marker-wobble"
                    >
                      <line
                        x1="12"
                        y1="0"
                        x2="12"
                        y2="28"
                        stroke="var(--connector)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <polygon points="8,24 16,24 12,30" fill="var(--connector)" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
