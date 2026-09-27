import React from "react";
import { skillCategories } from "@/data/skills";
import { projects } from "@/data/projects";

export function StarSkills() {
  // Collect all unique tags across projects to determine which skills are in constellations
  const constellationSkills = new Set<string>();
  projects.forEach((p) => {
    p.tags.forEach((t) => constellationSkills.add(t.toLowerCase()));
  });

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="w-full min-h-[85svh] px-4 sm:px-6 lg:px-8 py-20 relative z-10"
    >
      <div className="max-w-[800px] mx-auto space-y-12">
        <header className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-ink-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />
            <span>WAYPOINT 04 // COMPLETE CATALOG</span>
          </div>
          <h2
            id="skills-title"
            className="font-space font-bold text-[clamp(2rem,5vw,3.5rem)] leading-tight text-ink"
          >
            Star Catalog &amp; Competencies
          </h2>
          <p className="font-sans text-sm text-ink-2 max-w-xl">
            A comprehensive catalog of languages, systems, and engineering frameworks. Hollow points indicate verified proficiencies; filled points indicate active participation in the project constellations above.
          </p>
        </header>

        {/* Categories Catalog in 2 Columns (§9.4.8, §9.4.12) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
          {skillCategories.map((category) => (
            <div key={category.name} className="space-y-4">
              <div className="border-b border-ink-2/30 pb-2">
                <h3 className="font-space font-semibold text-base text-ink">
                  {category.name}
                </h3>
                {category.focus && (
                  <p className="font-sans text-xs text-ink-2 mt-0.5">
                    {category.focus}
                  </p>
                )}
              </div>

              {/* Plain List in Data Role (JetBrains Mono) with Hollow/Filled Dot */}
              <ul className="space-y-2 font-mono text-xs sm:text-[0.8125rem] text-ink">
                {category.skills.map((skill) => {
                  const isConstellationNode = constellationSkills.has(skill.toLowerCase());

                  return (
                    <li
                      key={skill}
                      className="flex items-center justify-between py-0.5"
                    >
                      <div className="flex items-center gap-2.5">
                        {/* Dot Bullet: Filled gold if in constellation, hollow ink-2 otherwise (§9.4.8) */}
                        <span
                          className={`w-2 h-2 rounded-full inline-block shrink-0 ${
                            isConstellationNode
                              ? "bg-gold"
                              : "border border-ink-2/60 bg-transparent"
                          }`}
                          aria-hidden="true"
                        />
                        <span className={isConstellationNode ? "text-ink font-medium" : "text-ink-2"}>
                          {skill}
                        </span>
                      </div>

                      {isConstellationNode && (
                        <span className="text-[10px] font-mono text-gold/80 uppercase">
                          connected
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
