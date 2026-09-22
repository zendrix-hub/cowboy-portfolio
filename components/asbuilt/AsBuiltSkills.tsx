"use client";

import React, { useState } from "react";
import { AsBuiltSheet } from "./AsBuiltSheet";
import { skillCategories } from "@/data/skills";
import { projects, Project } from "@/data/projects";

/**
 * Sheet 4: Skills Sheet per §6.2.8 & §6.2.12:
 * - Dual Architectural Presentations:
 *   1. Schedule of Specifications (Schedule 04-A):
 *      Comprehensive, highly scannable domain breakdown with architectural focus,
 *      specification counts, and project application verification badges.
 *   2. Project Cross-Reference Matrix (Matrix 04-B):
 *      Formal cross-referencing matrix with vertical project headers, sticky first column,
 *      filled 10px --ink squares on exact matches (§2.5), and technical em-dashes for non-matches.
 * - Strict exact matching only (`skill === tag`), zero heuristics.
 * - Mobile (<640px): Optimized schedule form with responsive single-column layout.
 */
export function AsBuiltSkills() {
  const [activeTab, setActiveTab] = useState<"schedule" | "matrix">("schedule");

  // Strict exact matching per §6.2.8 & §2.5: skill === tag
  const hasSkillMatch = (skill: string, project: Project) => {
    return project.tags.some((tag) => tag === skill);
  };

  // Find all projects where a skill is explicitly verified
  const getMatchingProjects = (skill: string) => {
    return projects.filter((p) => p.tags && hasSkillMatch(skill, p));
  };

  // Candidate projects that have stack tags and at least one exact match
  const matrixProjects = projects.filter(
    (p) =>
      p.tags &&
      p.tags.length > 0 &&
      skillCategories.some((cat) =>
        cat.skills.some((s) => hasSkillMatch(s, p))
      )
  );

  // Total count of verified specifications
  const totalSpecs = skillCategories.reduce(
    (acc, cat) => acc + cat.skills.length,
    0
  );

  return (
    <AsBuiltSheet id="skills" sheetNumber={4} title="Skills">
      <div className="space-y-6 sm:space-y-8">
        
        {/* 
          Architectural Drawing Sub-Header:
          Telemetry summary strip & view mode switcher
        */}
        <div className="border-2 border-ink bg-sheet p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Telemetry Summary */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs sm:text-sm text-ink">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-ink shrink-0" aria-hidden="true" />
              <span className="font-bold">{totalSpecs}</span>
              <span className="text-ink-2">SPECIFICATIONS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-rule shrink-0" aria-hidden="true" />
              <span className="font-bold">{skillCategories.length}</span>
              <span className="text-ink-2">DOMAINS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-ink shrink-0" aria-hidden="true" />
              <span className="font-bold">{matrixProjects.length}</span>
              <span className="text-ink-2">REPOSITORIES</span>
            </div>
          </div>

          {/* Architectural View Mode Switcher */}
          <div
            role="tablist"
            aria-label="Skills view presentation mode"
            className="inline-flex border-2 border-ink self-start md:self-auto select-none"
          >
            <button
              type="button"
              role="tab"
              id="tab-schedule"
              aria-selected={activeTab === "schedule"}
              aria-controls="panel-schedule"
              onClick={() => setActiveTab("schedule")}
              className={`px-3 sm:px-4 py-1.5 font-sans text-xs sm:text-sm font-semibold transition-none ${
                activeTab === "schedule"
                  ? "bg-ink text-sheet"
                  : "bg-sheet text-ink hover:bg-desk"
              }`}
            >
              Schedule View [04-A]
            </button>
            <button
              type="button"
              role="tab"
              id="tab-matrix"
              aria-selected={activeTab === "matrix"}
              aria-controls="panel-matrix"
              onClick={() => setActiveTab("matrix")}
              className={`px-3 sm:px-4 py-1.5 font-sans text-xs sm:text-sm font-semibold border-l-2 border-ink transition-none ${
                activeTab === "matrix"
                  ? "bg-ink text-sheet"
                  : "bg-sheet text-ink hover:bg-desk"
              }`}
            >
              Matrix View [04-B]
            </button>
          </div>
        </div>

        {/* 
          ════════════════════════════════════════════════════════════════════════
          PRESENTATION 1: COMPREHENSIVE ARCHITECTURAL SCHEDULE (SCHEDULE 04-A)
          ════════════════════════════════════════════════════════════════════════
          Rich, readable, domain-grouped technical specifications with architectural
          focus principles and verified project application chips.
        */}
        {activeTab === "schedule" && (
          <div
            id="panel-schedule"
            role="tabpanel"
            aria-labelledby="tab-schedule"
            className="space-y-6"
          >
            {skillCategories.map((category, catIndex) => (
              <div
                key={category.name}
                className="border-2 border-ink bg-sheet p-4 sm:p-6 space-y-4"
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
                    <p className="font-sans text-xs sm:text-sm text-ink-2 leading-relaxed pl-6 border-l-2 border-rule mt-1">
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
                        <span className="font-mono text-xs sm:text-[0.875rem] text-ink font-medium truncate mr-2">
                          {skill}
                        </span>

                        {isVerified ? (
                          <span
                            className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] px-2 py-0.5 bg-ink text-sheet shrink-0 font-semibold"
                            title={`Verified in project: ${matched.map((p) => p.title).join(", ")}`}
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
        )}

        {/* 
          ════════════════════════════════════════════════════════════════════════
          PRESENTATION 2: PROJECT CROSS-REFERENCE MATRIX (MATRIX 04-B)
          ════════════════════════════════════════════════════════════════════════
          Formal drafting cross-reference matrix with vertical headers, sticky column,
          filled 10px --ink squares, and technical em-dashes for non-matches.
        */}
        {activeTab === "matrix" && (
          <div
            id="panel-matrix"
            role="tabpanel"
            aria-labelledby="tab-matrix"
            className="space-y-4"
          >
            <div
              tabIndex={0}
              aria-label="Skills and projects matrix"
              className="border-2 border-ink bg-sheet overflow-x-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            >
              <table
                role="table"
                className="w-full text-left border-collapse min-w-[680px]"
              >
                <caption className="sr-only">
                  Technical skills and technologies mapped against verified software projects
                </caption>
                <thead>
                  <tr role="row" className="border-b-2 border-ink bg-ink text-sheet h-36">
                    <th
                      role="columnheader"
                      scope="col"
                      className="py-3 px-4 w-1/2 border-r border-rule align-bottom font-sans font-semibold text-sm sticky left-0 bg-ink z-20"
                    >
                      Skill / Specification
                    </th>
                    {matrixProjects.map((p) => (
                      <th
                        key={p.title}
                        role="columnheader"
                        scope="col"
                        className="py-3 px-2 w-[12.5%] border-r border-rule align-bottom text-center"
                      >
                        <div
                          className="font-condensed font-semibold text-sm sm:text-base tracking-normal whitespace-nowrap inline-block pb-2 select-none"
                          style={{
                            writingMode: "vertical-rl",
                            transform: "rotate(180deg)",
                          }}
                        >
                          {p.title}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody role="rowgroup" className="font-sans text-[0.875rem]">
                  {skillCategories.map((category) => (
                    <React.Fragment key={category.name}>
                      {/* Category Header Row: Barlow Condensed 600, 1.125rem, 2px top rule */}
                      <tr
                        role="row"
                        className="border-t-2 border-b border-ink bg-desk/80 text-ink"
                      >
                        <th
                          role="rowheader"
                          colSpan={matrixProjects.length + 1}
                          scope="colgroup"
                          className="py-2.5 px-4 font-condensed font-semibold text-[1.125rem] tracking-normal sticky left-0 z-10"
                        >
                          <span>{category.name}</span>
                          <span className="font-sans font-normal text-xs text-ink-2 ml-3">
                            — {category.focus}
                          </span>
                        </th>
                      </tr>

                      {/* Individual Skill Rows */}
                      {category.skills.map((skill) => (
                        <tr
                          key={skill}
                          role="row"
                          className="border-b border-rule hover:bg-desk transition-none"
                        >
                          <th
                            role="rowheader"
                            scope="row"
                            className="py-2 px-4 font-mono text-[0.875rem] text-ink border-r border-rule font-normal sticky left-0 bg-sheet z-10 hover:bg-desk"
                          >
                            {skill}
                          </th>

                          {matrixProjects.map((p) => {
                            const isMatched = hasSkillMatch(skill, p);

                            return (
                              <td
                                key={`${skill}-${p.title}`}
                                role="cell"
                                className="py-2 px-2 border-r border-rule text-center align-middle"
                              >
                                {isMatched ? (
                                  <div className="flex items-center justify-center">
                                    {/* Filled 10px square per §6.2.8 */}
                                    <span
                                      className="w-2.5 h-2.5 bg-ink inline-block shrink-0"
                                      aria-hidden="true"
                                    />
                                    <span className="sr-only">
                                      Used in {p.title}
                                    </span>
                                  </div>
                                ) : (
                                  <span
                                    className="text-rule/40 font-mono text-xs select-none"
                                    aria-hidden="true"
                                  >
                                    —
                                  </span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Matrix Legend */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 border-2 border-ink bg-sheet font-mono text-xs text-ink">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-ink inline-block shrink-0" aria-hidden="true" />
                  <span>Verified in Project Stack</span>
                </div>
                <div className="flex items-center gap-1.5 text-ink-2">
                  <span className="font-bold">—</span>
                  <span>Core Domain Competency</span>
                </div>
              </div>
              <span className="text-ink-2 text-[11px]">
                SCHEDULE 04-B // CROSS-REFERENCE MATRIX
              </span>
            </div>
          </div>
        )}

      </div>
    </AsBuiltSheet>
  );
}
