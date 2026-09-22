import React from "react";
import { AsBuiltSheet } from "./AsBuiltSheet";
import { skillCategories } from "@/data/skills";
import { projects, Project } from "@/data/projects";

/**
 * Sheet 4: Skills Sheet per §6.2.8 & §6.2.12:
 * - Technical Stack & Capabilities Schedule:
 *   Comprehensive, highly scannable domain breakdown across all 5 technical areas.
 *   Includes core domain focus statements, skill counts, and verified project application badges
 *   based on strict exact matching (§2.5).
 */
export function AsBuiltSkills() {
  // Strict exact matching per §6.2.8 & §2.5: skill === tag
  const hasSkillMatch = (skill: string, project: Project) => {
    return project.tags.some((tag) => tag === skill);
  };

  // Find all projects where a skill is explicitly verified
  const getMatchingProjects = (skill: string) => {
    return projects.filter((p) => p.tags && hasSkillMatch(skill, p));
  };

  // Total count of verified skills
  const totalSkills = skillCategories.reduce(
    (acc, cat) => acc + cat.skills.length,
    0
  );

  return (
    <AsBuiltSheet id="skills" sheetNumber={4} title="Skills">
      <div className="space-y-6 sm:space-y-8">
        
        {/* 
          Summary Telemetry Strip:
          High-level metrics without obscure CAD jargon
        */}
        <div className="border-2 border-ink bg-sheet p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs sm:text-sm text-ink">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-ink shrink-0" aria-hidden="true" />
              <span className="font-bold">{totalSkills}</span>
              <span className="text-ink-2">TECHNOLOGIES & SKILLS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-rule shrink-0" aria-hidden="true" />
              <span className="font-bold">{skillCategories.length}</span>
              <span className="text-ink-2">TECHNICAL DOMAINS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-ink shrink-0" aria-hidden="true" />
              <span className="font-bold">{projects.length}</span>
              <span className="text-ink-2">PROJECTS DEPLOYED</span>
            </div>
          </div>

          <span className="font-mono text-xs text-ink-2">
            Core Technical Stack & Tooling
          </span>
        </div>

        {/* 
          DOMAIN SCHEDULES (01 through 05):
          Organized by domain with core focus callouts and verified project chips
        */}
        <div className="space-y-6">
          {skillCategories.map((category, catIndex) => (
            <div
              key={category.name}
              className="border-2 border-ink bg-sheet p-5 sm:p-6 space-y-4"
            >
              {/* Domain Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b-2 border-ink pb-3">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-ink">
                      {String(catIndex + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-condensed font-semibold text-xl sm:text-2xl text-ink leading-tight">
                      {category.name}
                    </h3>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-ink-2 leading-relaxed pl-4 sm:pl-6 border-l-2 border-rule mt-1">
                    <span className="font-mono text-xs font-bold text-ink mr-1.5">
                      CORE FOCUS:
                    </span>
                    {category.focus}
                  </p>
                </div>

                <div className="shrink-0 self-start">
                  <span className="font-mono text-xs px-2.5 py-1 border border-ink bg-desk text-ink font-semibold">
                    {category.skills.length} SKILLS
                  </span>
                </div>
              </div>

              {/* Technical Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                {category.skills.map((skill) => {
                  const matched = getMatchingProjects(skill);
                  const isVerified = matched.length > 0;

                  return (
                    <div
                      key={skill}
                      className="flex items-center justify-between p-2.5 border border-rule bg-sheet hover:bg-desk hover:border-ink transition-none group"
                    >
                      <span className="font-mono text-xs sm:text-[0.8125rem] text-ink font-medium truncate mr-2">
                        {skill}
                      </span>

                      {isVerified ? (
                        <span
                          className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] px-2 py-0.5 bg-ink text-sheet shrink-0 font-semibold"
                          title={`Applied in project: ${matched.map((p) => p.title).join(", ")}`}
                        >
                          <span className="w-1.5 h-1.5 bg-sheet shrink-0" aria-hidden="true" />
                          <span>{matched.map((p) => p.title).join(", ")}</span>
                        </span>
                      ) : (
                        <span className="font-mono text-[10px] text-ink-2/60 shrink-0 uppercase tracking-wider">
                          Foundational
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 border-2 border-ink bg-sheet font-mono text-xs text-ink">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-ink text-sheet text-[10px] font-bold">
                <span className="w-1.5 h-1.5 bg-sheet" aria-hidden="true" />
                Project
              </span>
              <span>Applied in Featured Projects</span>
            </div>
            <div className="flex items-center gap-2 text-ink-2">
              <span className="font-bold text-[10px] uppercase tracking-wider border border-rule px-1.5 py-0.5">
                Foundational
              </span>
              <span>Core Engineering Competency</span>
            </div>
          </div>
          <span className="text-ink-2 text-[11px]">
            Technical Stack & Capabilities Overview
          </span>
        </div>

      </div>
    </AsBuiltSheet>
  );
}
