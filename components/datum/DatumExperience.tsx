import React from 'react';
import { experiences } from '@/data/experience';

export function DatumExperience() {
  return (
    <section
      id="experience"
      aria-label="Route Taken: Engineering Experience"
      className="band-section band-peak"
    >
      <div className="datum-column">
        {/* Elevation marker */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--contour)]" />
          <span className="font-display text-xs font-bold tracking-widest uppercase text-[var(--contour)]">
            ELEVATION // PEAK RIDGE [BAND 05: ROUTE TAKEN]
          </span>
        </div>

        <h2 className="font-display font-bold text-[clamp(1.75rem,4vw,3rem)] leading-[1.1] text-[var(--ink)] tracking-tight mb-8">
          The Route Taken: Experience
        </h2>

        {/* Route Entries */}
        <div className="space-y-8 border-t border-[var(--contour)]/25 pt-6">
          {experiences.map((exp) => {
            const isCurrent = exp.period.includes('Present');

            return (
              <div key={exp.period + exp.title} className="border-b border-[var(--contour)]/15 pb-6 last:border-b-0 last:pb-0">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <span
                    className={
                      isCurrent
                        ? 'waypoint-tag waypoint-tag-filled'
                        : 'waypoint-tag'
                    }
                  >
                    {exp.period}
                  </span>
                  <span className="font-display text-[11px] uppercase tracking-wider text-[var(--contour)] font-semibold">
                    {exp.category}
                  </span>
                </div>

                <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--ink)] mb-1">
                  {exp.title}
                </h3>

                <p className="font-display text-xs uppercase tracking-wider font-semibold text-[var(--contour)] mb-3">
                  {exp.organization}
                </p>

                <p className="font-sans text-sm leading-[1.7] text-[var(--ink)] mb-3">
                  {exp.description}
                </p>

                {exp.highlights.length > 0 && (
                  <ul className="space-y-1 font-sans text-xs text-[var(--ink)]/80 pl-4 list-disc">
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
