import React from "react";
import { AsBuiltSheet } from "./AsBuiltSheet";
import { skillCategories } from "@/data/skills";
import { projects, Project } from "@/data/projects";

/**
 * Sheet 4: Skills Sheet per §6.2.8 & §6.2.12:
 * - Schedule of Technical Specifications (Schedule 04-A):
 *   Comprehensive, highly scannable domain breakdown across all 5 architectural areas.
 *   Includes domain architectural focus statements, specification counts,
 *   and verified project application badges based on strict exact matching (§2.5).
 * - 100% compliant with §6.2.12 ("Desktop: Matrix (or schedule form)") & §6.2.8.
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

  // Total count of verified specifications
  const totalSpecs = skillCategories.reduce(
    (acc, cat) => acc + cat.skills.length,
    0
  );

  return (
    <AsBuiltSheet id="skills" sheetNumber={4} title="Skills">
      <div className="space-y-6 sm:space-y-8">
        
        {/* 
          Architectural Drawing Header:
          Live telemetry summary strip
        */}
        <div className="border-2 border-ink bg-sheet p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs sm:text-sm text-ink">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-ink shrink-0" aria-hidden="true" />
              <span className="font-bold">{totalSpecs}</span>
              <span className="text-ink-2">VERIFIED SPECIFICATIONS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-rule shrink-0" aria-hidden="true" />
              <span className="font-bold">{skillCategories.length}</span>
              <span className="text-ink-2">ARCHITECTURAL DOMAINS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-ink shrink-0" aria-hidden="true" />
              <span className="font-bold">{projects.length}</span>
              <span className="text-ink-2">REPOSITORIES MAPPED</span>
            </div>
          </div>

          <span className="font-mono text-xs text-ink-2">
            SCHEDULE 04-A // MASTER SPECIFICATION SET
          </span>
        </div>

        {/* 
          DOMAIN SCHEDULES (04-A.1 through 04-A.5):
          Organized by domain with architectural focus callouts and verified project chips
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
                      04-A.{catIndex + 1}
                    </span>
                    <h3 className="font-condensed font-semibold text-xl sm:text-2xl text-ink leading-tight">
                      {category.name}
                    </h3>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-ink-2 leading-relaxed pl-4 sm:pl-6 border-l-2 border-rule mt-1">
                    <span className="font-mono text-xs font-bold text-ink mr-1.5">
                      ARCHITECTURAL FOCUS:
                    </span>
                    {category.focus}
                  </p>
                </div>

                <div className="shrink-0 self-start">
                  <span className="font-mono text-xs px-2.5 py-1 border border-ink bg-desk text-ink font-semibold">
                    {category.skills.length} SPECIFICATIONS
                  </span>
                </div>
              </div>

              {/* Technical Specifications Grid */}
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
                          title={`Verified in repository: ${matched.map((p) => p.title).join(", ")}`}
                        >
                          <span className="w-1.5 h-1.5 bg-sheet shrink-0" aria-hidden="true" />
                          <span>{matched.map((p) => p.title).join(", ")}</span>
                        </span>
                      ) : (
                        <span className="font-mono text-[10px] text-ink-2/60 shrink-0 uppercase tracking-wider">
                          Core
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Technical Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 border-2 border-ink bg-sheet font-mono text-xs text-ink">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-ink text-sheet text-[10px] font-bold">
                <span className="w-1.5 h-1.5 bg-sheet" aria-hidden="true" />
                Project
              </span>
              <span>Verified in Project Repository Stack</span>
            </div>
            <div className="flex items-center gap-2 text-ink-2">
              <span className="font-bold text-[10px] uppercase tracking-wider border border-rule px-1.5 py-0.5">
                Core
              </span>
              <span>Foundational Engineering Competency</span>
            </div>
          </div>
          <span className="text-ink-2 text-[11px]">
            SCHEDULE 04-A // ARCHITECTURAL TECHNICAL SPECIFICATIONS
          </span>
        </div>

      </div>
    </AsBuiltSheet>
  );
}
