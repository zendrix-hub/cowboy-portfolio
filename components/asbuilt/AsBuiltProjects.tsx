import React from "react";
import { AsBuiltSheet } from "./AsBuiltSheet";
import { RevisionCloud } from "./RevisionCloud";
import { FramedViewport } from "./FramedViewport";
import { ExternalLinkIcon } from "./Icons";
import { projects } from "@/data/projects";

/**
 * Sheet 3: Projects Sheet per §6.2.7:
 * - Featured (DaloyAqua): Detail block with title clamp(2.25rem, 5vw, 4rem),
 *   status in Kalam in --redline inside redline revision cloud,
 *   description (7 cols), hatch window (5 cols), and 2-col spec table.
 * - Other projects: Real project schedule <table>: Project | Status | Stack | Links.
 *   Project column takes at least 40% width.
 * - Title block: {NAME} | Projects | Sheet 3 of 6.
 */
export function AsBuiltProjects() {
  const daloyAqua = projects.find((p) => p.title === "DaloyAqua") || projects[0];
  const supportingProjects = projects.filter((p) => p.title !== "DaloyAqua");

  return (
    <AsBuiltSheet id="projects" sheetNumber={3} title="Projects">
      <div className="space-y-10 sm:space-y-12">
        
        {/* 
          FEATURED PROJECT (DaloyAqua): The Detail Block per §6.2.7
          Outlined 2px --ink block containing title, redline status cloud,
          description, spec table, and hatch window.
        */}
        <div className="border-2 border-ink p-4 sm:p-6 lg:p-8 bg-sheet">
          
          {/* Header row: Project Title & Redline Revision Cloud Status */}
          <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-rule">
            <div>
              <h3 className="font-condensed font-semibold text-[clamp(2.25rem,5vw,4rem)] leading-none text-ink">
                {daloyAqua.title}
              </h3>
              {daloyAqua.subtitle && (
                <p className="font-sans text-sm sm:text-base text-ink-2 mt-1">
                  {daloyAqua.subtitle}
                </p>
              )}
            </div>

            {/* Redline status cloud in Kalam font */}
            {daloyAqua.status && (
              <div className="py-2">
                <RevisionCloud status={daloyAqua.status} />
              </div>
            )}
          </div>

          {/* Body: 12-column split between description/specs (7 cols) and hatch window (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-start">
            
            {/* Left 7 cols: Description & Specification Table */}
            <div className="lg:col-span-7 space-y-6">
              <p className="font-sans text-[1.0625rem] leading-[1.65] text-ink">
                {daloyAqua.description}
              </p>

              {/* Two-column specification table per §6.2.7 (Status is NOT repeated) */}
              <div className="border-2 border-ink bg-sheet">
                <table
                  role="table"
                  className="w-full text-left border-collapse"
                >
                  <caption className="sr-only">
                    Specification table for {daloyAqua.title}
                  </caption>
                  <tbody
                    role="rowgroup"
                    className="divide-y divide-rule font-sans text-[0.875rem]"
                  >
                    {/* Stack row */}
                    <tr
                      role="row"
                      className="hover:bg-desk transition-none flex flex-col sm:table-row border-b border-rule sm:border-b-0"
                    >
                      <th
                        role="rowheader"
                        scope="row"
                        className="py-2.5 px-3 font-semibold text-ink sm:border-r sm:border-rule sm:w-1/3 align-top bg-sheet sm:bg-transparent"
                      >
                        Stack
                      </th>
                      <td
                        role="cell"
                        className="py-2.5 px-3 text-ink font-mono text-[0.8125rem] sm:text-[0.875rem] leading-relaxed align-top"
                      >
                        {daloyAqua.tags.join(", ")}
                      </td>
                    </tr>

                    {/* Links row */}
                    {daloyAqua.githubUrl && (
                      <tr
                        role="row"
                        className="hover:bg-desk transition-none flex flex-col sm:table-row border-b border-rule sm:border-b-0"
                      >
                        <th
                          role="rowheader"
                          scope="row"
                          className="py-2.5 px-3 font-semibold text-ink sm:border-r sm:border-rule align-top bg-sheet sm:bg-transparent"
                        >
                          Links
                        </th>
                        <td
                          role="cell"
                          className="py-2.5 px-3 align-top"
                        >
                          <a
                            href={daloyAqua.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Source code for ${daloyAqua.title}`}
                            className="inline-flex items-center gap-1.5 font-sans font-semibold text-ink underline hover:bg-ink hover:text-sheet px-1 transition-none"
                          >
                            <span>Source code</span>
                            <ExternalLinkIcon className="w-3.5 h-3.5" />
                          </a>
                        </td>
                      </tr>
                    )}

                    {/* Role context row */}
                    {daloyAqua.roleContext && (
                      <tr
                        role="row"
                        className="hover:bg-desk transition-none flex flex-col sm:table-row border-b border-rule sm:border-b-0"
                      >
                        <th
                          role="rowheader"
                          scope="row"
                          className="py-2.5 px-3 font-semibold text-ink sm:border-r sm:border-rule align-top bg-sheet sm:bg-transparent"
                        >
                          Role
                        </th>
                        <td
                          role="cell"
                          className="py-2.5 px-3 text-ink-2 align-top"
                        >
                          {daloyAqua.roleContext}
                        </td>
                      </tr>
                    )}

                    {/* Architecture row */}
                    {daloyAqua.architecture && (
                      <tr
                        role="row"
                        className="hover:bg-desk transition-none flex flex-col sm:table-row"
                      >
                        <th
                          role="rowheader"
                          scope="row"
                          className="py-2.5 px-3 font-semibold text-ink sm:border-r sm:border-rule align-top bg-sheet sm:bg-transparent"
                        >
                          Architecture
                        </th>
                        <td
                          role="cell"
                          className="py-2.5 px-3 text-ink-2 leading-relaxed align-top"
                        >
                          {daloyAqua.architecture}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right 5 cols: Hatch window per §6.2.3 & §6.2.7 */}
            <div className="lg:col-span-5 w-full">
              <FramedViewport
                aspectRatio="aspect-[4/3] sm:aspect-[16/10] w-full"
                className="bg-desk"
              >
                <svg
                  className="w-full h-full"
                  aria-hidden="true"
                  focusable="false"
                >
                  <defs>
                    <pattern
                      id="hatch-pattern-daloyaqua"
                      width="8"
                      height="8"
                      patternTransform="rotate(45 0 0)"
                      patternUnits="userSpaceOnUse"
                    >
                      <line
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="8"
                        stroke="var(--rule)"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width="100%"
                    height="100%"
                    fill="url(#hatch-pattern-daloyaqua)"
                  />
                </svg>
              </FramedViewport>
              <p
                className="font-mono text-xs text-ink-2 mt-2 text-right"
                aria-hidden="true"
              >
                SECTION HATCH // DALOYAQUA
              </p>
            </div>

          </div>
        </div>

        {/* 
          OTHER PROJECTS: Project Schedule Table per §6.2.7
          Project | Status | Stack | Links
        */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-condensed font-semibold text-2xl sm:text-3xl text-ink">
              Project Schedule
            </h3>
            <span className="font-mono text-xs text-ink-2">
              SCHEDULE 03-A
            </span>
          </div>

          <div className="border-2 border-ink bg-sheet overflow-x-auto">
            <table
              role="table"
              className="w-full text-left border-collapse min-w-[600px] sm:min-w-full"
            >
              <caption className="sr-only">
                Schedule of completed and thesis software projects
              </caption>
              <thead>
                <tr
                  role="row"
                  className="border-b-2 border-ink bg-ink text-sheet h-10 font-sans text-xs sm:text-sm font-semibold tracking-normal"
                >
                  <th
                    role="columnheader"
                    scope="col"
                    className="py-2 px-3 w-[40%] border-r border-rule"
                  >
                    Project
                  </th>
                  <th
                    role="columnheader"
                    scope="col"
                    className="py-2 px-3 w-[18%] border-r border-rule"
                  >
                    Status
                  </th>
                  <th
                    role="columnheader"
                    scope="col"
                    className="py-2 px-3 w-[26%] border-r border-rule"
                  >
                    Stack
                  </th>
                  <th
                    role="columnheader"
                    scope="col"
                    className="py-2 px-3 w-[16%]"
                  >
                    Links
                  </th>
                </tr>
              </thead>
              <tbody
                role="rowgroup"
                className="divide-y divide-rule font-sans text-[0.875rem]"
              >
                {supportingProjects.map((p) => {
                  const targetLink = p.liveUrl || p.githubUrl;
                  return (
                    <tr
                      key={p.title}
                      role="row"
                      className="hover:bg-desk transition-none"
                    >
                      {/* Project Column: >= 40% width per §6.2.7 */}
                      <th
                        role="rowheader"
                        scope="row"
                        className="py-3 px-3 align-top border-r border-rule"
                      >
                        <div className="font-semibold text-ink text-[1rem]">
                          {targetLink ? (
                            <a
                              href={targetLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View ${p.title}`}
                              className="hover:underline"
                            >
                              {p.title}
                            </a>
                          ) : (
                            p.title
                          )}
                        </div>
                        <div className="text-ink-2 text-xs sm:text-[0.8125rem] font-normal mt-1 line-clamp-1">
                          {p.description}
                        </div>
                      </th>

                      {/* Status Column */}
                      <td
                        role="cell"
                        className="py-3 px-3 align-top text-ink-2 font-mono text-xs sm:text-[0.8125rem] border-r border-rule"
                      >
                        {p.status || "—"}
                      </td>

                      {/* Stack Column */}
                      <td
                        role="cell"
                        className="py-3 px-3 align-top text-ink font-mono text-xs sm:text-[0.8125rem] border-r border-rule leading-relaxed"
                      >
                        {p.tags.join(", ")}
                      </td>

                      {/* Links Column */}
                      <td
                        role="cell"
                        className="py-3 px-3 align-top"
                      >
                        <div className="flex flex-col gap-1.5 text-xs font-semibold">
                          {p.liveUrl && (
                            <a
                              href={p.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Open project for ${p.title}`}
                              className="inline-flex items-center gap-1 text-ink underline hover:bg-ink hover:text-sheet px-1 w-fit transition-none"
                            >
                              <span>Open project</span>
                              <ExternalLinkIcon className="w-3 h-3" />
                            </a>
                          )}
                          {p.githubUrl && (
                            <a
                              href={p.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Source code for ${p.title}`}
                              className="inline-flex items-center gap-1 text-ink underline hover:bg-ink hover:text-sheet px-1 w-fit transition-none"
                            >
                              <span>Source code</span>
                              <ExternalLinkIcon className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AsBuiltSheet>
  );
}
