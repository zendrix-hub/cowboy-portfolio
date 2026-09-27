import React from 'react';
import { skillCategories } from '@/data/skills';

export function SlateSkills() {
  return (
    <section
      id="skills"
      aria-label="Scene 04: Technical Crew Credits"
      className="slate-shot"
    >
      {/* Corner Scene-Slate Mark */}
      <div
        aria-hidden="true"
        className="absolute top-4 right-6 sm:top-6 sm:right-10 flex items-center gap-2 select-none pointer-events-none"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--tally)]" />
        <span className="font-sans text-xs tracking-widest uppercase text-[var(--ink-2)] font-semibold">
          SCENE 04 // CREW LIST
        </span>
      </div>

      <div className="shot-content px-6 max-w-4xl mx-auto my-auto py-6 w-full">
        <h2 className="shot-title text-center mb-2">
          Technical Crew Credits
        </h2>
        <p className="font-sans text-xs tracking-[0.2em] text-[var(--ink-2)] uppercase text-center mb-8">
          PRODUCTION CAPABILITIES & ENGINEERING PROFICIENCIES
        </p>

        {/* 2-Column Credit-Roll Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 border-t border-b border-[var(--ink)]/20 py-8">
          {skillCategories.map((category) => (
            <div key={category.name} className="flex flex-col">
              {/* Department Heading (Archivo Narrow 500, uppercase) */}
              <div className="border-b border-[var(--ink)]/15 pb-1.5 mb-3">
                <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-[var(--ink)]">
                  {category.name}
                </h3>
                <span className="font-sans text-[11px] text-[var(--ink-2)] tracking-wider">
                  {category.focus}
                </span>
              </div>

              {/* Credit-roll style: one item per line, plain text */}
              <ul className="space-y-1 list-none m-0 p-0 font-sans text-sm tracking-wider uppercase text-[var(--ink)]">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-center justify-between py-0.5">
                    <span>{skill}</span>
                    <span className="text-[var(--ink-2)]/40 text-xs font-mono">•</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
