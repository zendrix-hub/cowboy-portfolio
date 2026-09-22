"use client";

import React, { useState } from "react";
import { AsBuiltSheet } from "./AsBuiltSheet";
import { skillCategories } from "@/data/skills";
import { projects, Project } from "@/data/projects";

export function AsBuiltSkills() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Candidate projects that have stack tags
  const matrixProjects = projects.filter((p) => p.tags && p.tags.length > 0);

  // Check if a skill matches a project stack per §6.2.8
  const hasSkillMatch = (skill: string, project: Project) => {
    const normalize = (str: string) =>
      str.toLowerCase().replace(/\s*\(.*?\)\s*/g, "").trim();
    const sNorm = normalize(skill);
    return project.tags.some((tag) => {
      const tNorm = normalize(tag);
      return (
        tNorm === sNorm ||
        tNorm.includes(sNorm) ||
        sNorm.includes(tNorm)
      );
    });
  };

  const handleProjectClick = (projectName: string) => {
    setSelectedProject((prev) => (prev === projectName ? null : projectName));
    setSelectedSkill(null);
  };

  const handleSkillClick = (skillName: string) => {
    setSelectedSkill((prev) => (prev === skillName ? null : skillName));
    setSelectedProject(null);
  };

  const clearHighlight = () => {
    setSelectedProject(null);
    setSelectedSkill(null);
  };

  return (
    <AsBuiltSheet id="skills" sheetNumber={4} title="Skills">
      <div className="space-y-6">
        
        {/* Interactive Matrix Filter Bar */}
        {(selectedProject || selectedSkill) && (
          <div className="flex items-center justify-between p-2.5 border-2 border-ink bg-ink text-sheet font-mono text-xs select-none">
            <div className="flex items-center gap-2">
              <span className="font-bold">CROSS-REFERENCE ACTIVE:</span>
              {selectedProject && (
                <span>Filtering by Project: <span className="underline font-bold">{selectedProject}</span></span>
              )}
              {selectedSkill && (
                <span>Filtering by Skill: <span className="underline font-bold">{selectedSkill}</span></span>
              )}
            </div>
            <button
              type="button"
              onClick={clearHighlight}
              className="px-2 py-0.5 border border-sheet text-sheet hover:bg-sheet hover:text-ink transition-none font-sans font-semibold text-xs"
            >
              Reset Matrix [×]
            </button>
          </div>
        )}

        {/* 
          1. MATRIX FORM for Desktop & Tablet (≥640px) per §6.2.8
          Rows: skills grouped by category.
          Columns: projects.
          Mark: filled 10px --ink square with visually hidden text "Used in {project}".
          Project headers set vertically: writing-mode: vertical-rl; transform: rotate(180deg).
        */}
        <div className="hidden sm:block border-2 border-ink bg-sheet overflow-x-auto">
          <table
            role="table"
            className="w-full text-left border-collapse min-w-[640px]"
          >
            <caption className="sr-only">
              Skills and technologies matrix mapped against software projects
            </caption>
            <thead>
              <tr role="row" className="border-b-2 border-ink bg-ink text-sheet h-36">
                <th
                  role="columnheader"
                  scope="col"
                  className="py-3 px-4 w-1/2 border-r border-rule align-bottom font-sans font-semibold text-sm"
                >
                  <div className="flex items-end justify-between">
                    <span>Skill / Specification</span>
                    <span className="font-mono text-[10px] text-sheet/70 font-normal">
                      CLICK COLUMN TO CROSS-FILTER
                    </span>
                  </div>
                </th>
                {matrixProjects.map((p) => {
                  const isColActive = selectedProject === p.title;
                  return (
                    <th
                      key={p.title}
                      role="columnheader"
                      scope="col"
                      onClick={() => handleProjectClick(p.title)}
                      className={`py-3 px-2 w-[12.5%] border-r border-rule align-bottom text-center cursor-pointer transition-none ${
                        isColActive ? "bg-desk text-ink border-b-4 border-b-ink" : "hover:bg-ink-2/30"
                      }`}
                      title={`Click to highlight skills used in ${p.title}`}
                    >
                      <button
                        type="button"
                        className="w-full h-full flex items-center justify-center focus:outline-none"
                      >
                        <div
                          className="font-condensed font-semibold text-sm sm:text-base tracking-normal whitespace-nowrap inline-block"
                          style={{
                            writingMode: "vertical-rl",
                            transform: "rotate(180deg)",
                          }}
                        >
                          {p.title}
                        </div>
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody role="rowgroup" className="font-sans text-[0.875rem]">
              {skillCategories.map((category) => (
                <React.Fragment key={category.name}>
                  {/* Category Header Row: Barlow Condensed 600, 1.125rem, 2px top rule */}
                  <tr
                    role="row"
                    className="border-t-2 border-b border-ink bg-desk/70 text-ink"
                  >
                    <th
                      role="rowheader"
                      colSpan={matrixProjects.length + 1}
                      scope="colgroup"
                      className="py-2 px-4 font-condensed font-semibold text-[1.125rem] tracking-normal"
                    >
                      {category.name}
                      <span className="font-sans font-normal text-xs text-ink-2 ml-3">
                        {category.focus}
                      </span>
                    </th>
                  </tr>

                  {/* Individual Skill Rows */}
                  {category.skills.map((skill) => {
                    const isSkillSelected = selectedSkill === skill;
                    const matchedProjectsCount = matrixProjects.filter((p) =>
                      hasSkillMatch(skill, p)
                    ).length;

                    // If a project is selected, check if this skill is in it
                    const isRelevantToSelectedProject =
                      selectedProject &&
                      matrixProjects.some(
                        (p) => p.title === selectedProject && hasSkillMatch(skill, p)
                      );

                    return (
                      <tr
                        key={skill}
                        role="row"
                        onClick={() => handleSkillClick(skill)}
                        className={`border-b border-rule cursor-pointer transition-none ${
                          isSkillSelected
                            ? "bg-ink text-sheet font-bold"
                            : isRelevantToSelectedProject
                            ? "bg-desk/80 font-semibold"
                            : "hover:bg-desk"
                        }`}
                      >
                        <th
                          role="rowheader"
                          scope="row"
                          className={`py-2 px-4 font-mono text-[0.875rem] border-r border-rule flex items-center justify-between ${
                            isSkillSelected ? "text-sheet" : "text-ink"
                          }`}
                        >
                          <span>{skill}</span>
                          {matchedProjectsCount > 0 && (
                            <span
                              className={`text-[10px] font-mono px-1.5 py-0.2 border ${
                                isSkillSelected
                                  ? "border-sheet text-sheet"
                                  : "border-rule text-ink-2"
                              }`}
                            >
                              {matchedProjectsCount} {matchedProjectsCount === 1 ? "proj" : "projs"}
                            </span>
                          )}
                        </th>

                        {matrixProjects.map((p) => {
                          const isMatched = hasSkillMatch(skill, p);
                          const isColActive = selectedProject === p.title;

                          return (
                            <td
                              key={`${skill}-${p.title}`}
                              role="cell"
                              className={`py-2 px-2 border-r border-rule text-center align-middle ${
                                isColActive ? "bg-desk/40" : ""
                              }`}
                            >
                              {isMatched ? (
                                <div className="flex items-center justify-center">
                                  {/* Filled 10px square per §6.2.8 */}
                                  <span
                                    className={`w-2.5 h-2.5 inline-block shrink-0 ${
                                      isSkillSelected ? "bg-sheet" : "bg-ink"
                                    }`}
                                    aria-hidden="true"
                                  />
                                  <span className="sr-only">
                                    Used in {p.title}
                                  </span>
                                </div>
                              ) : null}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* 
          2. SCHEDULE FORM FALLBACK for Mobile (<640px) per §6.2.8 & §6.2.12
          Two-column table: Category | Items
        */}
        <div className="block sm:hidden border-2 border-ink bg-sheet">
          <table
            role="table"
            className="w-full text-left border-collapse"
          >
            <caption className="sr-only">
              Skills schedule by category
            </caption>
            <thead>
              <tr
                role="row"
                className="border-b-2 border-ink bg-ink text-sheet h-10 font-sans text-xs font-semibold"
              >
                <th
                  role="columnheader"
                  scope="col"
                  className="py-2 px-3 w-1/3 border-r border-rule"
                >
                  Category
                </th>
                <th
                  role="columnheader"
                  scope="col"
                  className="py-2 px-3 w-2/3"
                >
                  Items
                </th>
              </tr>
            </thead>
            <tbody
              role="rowgroup"
              className="divide-y divide-rule font-sans text-[0.875rem]"
            >
              {skillCategories.map((category) => (
                <tr
                  key={category.name}
                  role="row"
                  className="hover:bg-desk transition-none"
                >
                  <th
                    role="rowheader"
                    scope="row"
                    className="py-3 px-3 font-semibold text-ink border-r border-rule align-top text-xs"
                  >
                    {category.name}
                  </th>
                  <td
                    role="cell"
                    className="py-3 px-3 text-ink font-mono text-xs leading-relaxed align-top"
                  >
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {category.skills.map((s) => (
                        <span key={s} className="whitespace-nowrap">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </AsBuiltSheet>
  );
}
