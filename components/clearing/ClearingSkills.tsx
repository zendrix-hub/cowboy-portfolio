import React from 'react';
import { skillCategories } from '@/data/skills';

export function ClearingSkills() {
  return (
    <section
      id="skills"
      aria-label="Technical Skills"
      className="clearing-section"
    >
      <div className="clearing-content clearing-pos-right">
        <h2 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.3] font-normal tracking-[0.02em] text-[var(--ink)] mb-8">
          Skills
        </h2>

        {/* Categories with items as running text separated by generous spacing */}
        <div className="space-y-10">
          {skillCategories.map((category) => (
            <div key={category.name}>
              <h3 className="font-serif text-sm font-normal tracking-wider text-[var(--ink)] mb-1">
                {category.name}
              </h3>
              <p className="font-sans text-xs tracking-wider text-[var(--ink-2)] mb-3">
                {category.focus}
              </p>

              {/* Running text separated by generous spacing */}
              <p className="font-sans text-sm leading-[2.2] tracking-widest text-[var(--ink)]">
                {category.skills.map((skill) => (
                  <span key={skill} className="inline-block mr-6">
                    {skill}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
