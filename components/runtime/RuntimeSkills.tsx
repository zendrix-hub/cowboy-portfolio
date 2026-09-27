'use client';

import React, { useSyncExternalStore } from 'react';
import { skillCategories } from '@/data/skills';
import { wiringStore } from './wiringStore';

// Set of skills that are wired/matched from projects
const WIRED_SKILLS = new Set([
  'Python',
  'FastAPI',
  'APScheduler',
  'REST APIs',
  'Kotlin',
  'Android SDK',
  'Room (SQLite)',
  'Clean Architecture',
  'Vosk (Edge ASR)',
  'Java 17',
  'Spring Boot 3',
  'Docker',
  'MySQL',
  'Google Gemini API',
  'ChromaDB',
  'Streamlit',
]);

export function RuntimeSkills() {
  const isWired = useSyncExternalStore(
    wiringStore.subscribe,
    wiringStore.getSnapshot,
    wiringStore.getServerSnapshot
  );

  return (
    <section
      id="skills"
      aria-label="Components: Technical Skills"
      className="w-full flex flex-col items-center justify-center py-2"
    >
      {/* Rectangular Module Node */}
      <div className="runtime-node w-full max-w-[720px] rounded-lg border border-[var(--ink)] bg-[var(--board)] p-6 sm:p-8 transition-colors">
        {/* Module Header Bar */}
        <div className="flex items-center justify-between border-b border-[var(--ink)]/20 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block w-3.5 h-3.5 border border-[var(--ink)] bg-transparent rounded-sm"
            />
            <h2 className="font-mono text-[clamp(1.25rem,2.5vw,1.75rem)] leading-[1.1] font-bold text-[var(--ink)]">
              Skills
            </h2>
          </div>
          <span className="font-mono text-xs text-[var(--ink-2)] uppercase">
            COMPONENT_REGISTRY // ARCHITECTURE
          </span>
        </div>

        {/* Legend / Wiring explanation */}
        <div className="flex items-center gap-4 mb-6 font-mono text-xs text-[var(--ink-2)] border-b border-[var(--ink)]/10 pb-3">
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="inline-block w-2.5 h-2.5 border border-[var(--marker)] bg-transparent rounded-none"
            />
            <span>Wired Component (In-Port Active)</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="inline-block w-2.5 h-2.5 border border-[var(--ink)] bg-transparent rounded-none"
            />
            <span>Standard Component</span>
          </span>
        </div>

        {/* Skill Categories */}
        <div className="space-y-6">
          {skillCategories.map((category) => (
            <div key={category.name} className="border-t border-[var(--ink)]/15 pt-4 first:border-t-0 first:pt-0">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-3 gap-1">
                <h3 className="font-mono text-xs font-bold text-[var(--ink)] uppercase tracking-wider">
                  {category.name}
                </h3>
                <span className="font-sans text-xs text-[var(--ink-2)]">
                  {category.focus}
                </span>
              </div>

              {/* Component Tags (0px radius, 1px border, Space Mono) */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => {
                  const hasWire = WIRED_SKILLS.has(skill);
                  const showMarker = hasWire && isWired;

                  return (
                    <span
                      key={skill}
                      className={`component-tag inline-flex items-center px-2.5 py-1 font-mono text-xs border rounded-none transition-colors duration-150 ${
                        showMarker
                          ? 'border-[var(--marker)] text-[var(--ink)] font-semibold bg-[var(--marker)]/[0.06]'
                          : hasWire
                          ? 'border-[var(--ink)] text-[var(--ink)] font-semibold'
                          : 'border-[var(--ink)] text-[var(--ink-2)]'
                      }`}
                    >
                      {hasWire && (
                        <span
                          aria-hidden="true"
                          className={`inline-block w-1.5 h-1.5 mr-1.5 rounded-none ${
                            showMarker ? 'bg-[var(--marker)]' : 'bg-[var(--ink-2)]'
                          }`}
                        />
                      )}
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
