import React from "react";
import { AsBuiltSheet } from "./AsBuiltSheet";
import { skillCategories } from "@/data/skills";
import { projects, Project } from "@/data/projects";

/**
 * Sheet 4: Skills Sheet per §6.2.8:
 * - Matrix Form on Desktop & Tablet (≥640px):
 *   Rows are skills grouped by category; full-width category row (Barlow Condensed 600, 1.125rem, 2px top rule).
 *   Columns are projects with at least one match.
 *   Cell holds a filled 10px --ink square only when skill name exactly matches an item in that project's stack list (§2.5).
 *   Visually hidden text: "Used in {project title}".
 *   Project headers set vertically (writing-mode: vertical-rl; transform: rotate(180deg)).
 *   Maximum 12 columns; beyond that scrolls inside its own container with sticky first column.
 * - Schedule Form on Mobile (<640px):
 *   Two-column table: Category | Items with items in Plex Mono 0.9375rem separated by 16px gaps and wrapping.
 */
export function AsBuiltSkills() {
  // Candidate projects that have stack tags and at least one exact match (§6.2.8 & §2.5)
  const hasSkillMatch = (skill: string, project: Project) => {
    return project.tags.some((tag) => tag === skill);
  };

  const matrixProjects = projects.filter(
    (p) =>
      p.tags &&
      p.tags.length > 0 &&
      skillCategories.some((cat) =>
        cat.skills.some((s) => hasSkillMatch(s, p))
      )
  );

  return (
    <AsBuiltSheet id="skills" sheetNumber={4} title="Skills">
      <div className="space-y-6">
        
        {/* 
          1. MATRIX FORM for Desktop & Tablet (≥640px) per §6.2.8
          Scrollable container with keyboard accessibility
        */}
        <div
          tabIndex={0}
          aria-label="Skills and projects matrix"
          className="hidden sm:block border-2 border-ink bg-sheet overflow-x-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        >
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
                    className="border-t-2 border-b border-ink bg-desk/70 text-ink"
                  >
                    <th
                      role="rowheader"
                      colSpan={matrixProjects.length + 1}
                      scope="colgroup"
                      className="py-2.5 px-4 font-condensed font-semibold text-[1.125rem] tracking-normal"
                    >
                      {category.name}
                      <span className="font-sans font-normal text-xs text-ink-2 ml-3">
                        {category.focus}
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
                        className="py-2 px-4 font-mono text-[0.875rem] text-ink border-r border-rule font-normal"
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
                            ) : null}
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

        {/* 
          2. SCHEDULE FORM for Mobile (<640px) per §6.2.8 & §6.2.12
          Two-column table: Category | Items
          Items in Plex Mono 0.9375rem separated by 16px gaps and wrapping.
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
                    className="py-3 px-3 text-ink font-mono text-[0.9375rem] leading-relaxed align-top"
                  >
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
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
