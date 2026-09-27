import React from 'react';
import { skillCategories } from '@/data/skills';

export function DatumSkills() {
  return (
    <section
      id="skills"
      aria-label="Technical Skills: Inventory of Equipment and Methods"
      className="band-section band-high pt-0"
    >
      <div className="datum-column">
        {/* Elevation marker */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--contour)]" />
          <span className="font-display text-xs font-bold tracking-widest uppercase text-[var(--contour)]">
            ELEVATION // HIGH CONTOUR [BAND 04: METHODS]
          </span>
        </div>

        <h2 className="font-display font-bold text-[clamp(1.75rem,4vw,3rem)] leading-[1.1] text-[var(--ink)] tracking-tight mb-8">
          Equipment & Methods: Skills
        </h2>

        {/* Categories as Waypoint Tag Sets */}
        <div className="space-y-6">
          {skillCategories.map((category) => (
            <div key={category.name} className="border-t border-[var(--contour)]/20 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-3 gap-1">
                <h3 className="font-display text-xs font-bold tracking-wider uppercase text-[var(--ink)]">
                  {category.name}
                </h3>
                <span className="font-sans text-xs text-[var(--ink)]/70">
                  {category.focus}
                </span>
              </div>

              {/* Waypoint tags wrapping cleanly in row */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="waypoint-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
