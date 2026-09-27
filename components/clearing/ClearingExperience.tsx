import React from 'react';
import { experiences } from '@/data/experience';

export function ClearingExperience() {
  return (
    <section
      id="experience"
      aria-label="Engineering Experience"
      className="clearing-section"
    >
      <div className="clearing-content clearing-pos-left">
        <h2 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.3] font-normal tracking-[0.02em] text-[var(--ink)] mb-10">
          Experience
        </h2>

        {/* Stacked entries separated by generous space */}
        <div className="space-y-12">
          {experiences.map((exp) => {
            const isCurrent = exp.period.includes('Present');

            return (
              <div key={exp.period + exp.title}>
                <p
                  className={`font-sans text-xs tracking-widest uppercase mb-1 ${
                    isCurrent ? 'text-[var(--ink)] font-bold' : 'text-[var(--ink-2)]'
                  }`}
                >
                  {exp.period} • {exp.category}
                </p>

                <h3
                  className={`font-serif text-lg font-normal mb-1 ${
                    isCurrent ? 'text-[var(--ink)] font-medium text-xl' : 'text-[var(--ink)]'
                  }`}
                >
                  {exp.title}
                </h3>

                <p
                  className={`font-sans text-xs tracking-wider mb-3 ${
                    isCurrent ? 'text-[var(--ink)] font-medium' : 'text-[var(--ink-2)]'
                  }`}
                >
                  {exp.organization}
                </p>

                <p
                  className={`font-sans text-sm leading-[1.9] mb-3 ${
                    isCurrent ? 'text-[var(--ink)]' : 'text-[var(--ink-2)]'
                  }`}
                >
                  {exp.description}
                </p>

                {exp.highlights.length > 0 && (
                  <ul
                    className={`space-y-1 font-sans text-xs leading-[1.8] list-none p-0 m-0 ${
                      isCurrent ? 'text-[var(--ink)]' : 'text-[var(--ink-2)]'
                    }`}
                  >
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
