import React from "react";
import { skillCategories } from "@/data/skills";

export function MastheadSkills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="w-full max-w-[1200px] mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-ink-2/30"
    >
      {/* Editorial Section Masthead Label */}
      <div className="flex items-center justify-between pb-8 mb-8 border-b border-ink-2/20 text-xs text-ink-2">
        <span className="font-mono text-[11px] uppercase tracking-wider">Folio 04 // Index &amp; Reference</span>
        <span className="font-mono text-[11px] uppercase tracking-wider">Technical Index</span>
      </div>

      <header className="mb-12 max-w-2xl">
        <span className="text-xs uppercase tracking-widest text-spot font-semibold block mb-2">
          Index of Disciplines
        </span>
        <h2
          id="skills-heading"
          className="font-playfair font-bold text-[clamp(2rem,4.5vw,3.75rem)] leading-tight text-ink"
        >
          Contributor Index &amp; Technical Capabilities
        </h2>
        <p className="font-sans text-sm text-ink-2 mt-2">
          A comprehensive alphabetical catalog of languages, systems, and engineering frameworks utilized across production and thesis deployments.
        </p>
      </header>

      {/* Dense Columnar Contributor Index (§9.2.8) */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-10 space-y-10">
        {skillCategories.map((category) => (
          <div
            key={category.name}
            className="break-inside-avoid space-y-3"
          >
            {/* Category Heading with thin Spot Rule */}
            <div className="border-b border-spot pb-1.5">
              <h3 className="font-mono text-xs uppercase tracking-wider text-ink-2 font-semibold">
                {category.name}
              </h3>
            </div>

            {category.focus && (
              <p className="font-playfair italic text-xs text-ink-2 leading-snug">
                {category.focus}
              </p>
            )}

            {/* Plain one-per-line list in Work Sans (§9.2.8) */}
            <ul className="divide-y divide-ink-2/15 font-sans text-sm text-ink pt-1">
              {category.skills.map((skill) => (
                <li
                  key={skill}
                  className="py-1.5 flex items-center justify-between"
                >
                  <span className="font-medium text-ink">{skill}</span>
                  <span className="text-[11px] font-mono text-ink-2/60" aria-hidden="true">
                    ref. verified
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
