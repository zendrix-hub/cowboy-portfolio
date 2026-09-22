"use client";

import React, { useState } from "react";
import { AsBuiltSheet } from "./AsBuiltSheet";
import { experiences } from "@/data/experience";

export function AsBuiltExperience() {
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});

  const toggleRow = (index: number) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Chronological Rev letters (oldest is A, latest is D) per §6.2.9
  // Repo order has:
  // [0] NEC Telecom Software (Sept 2026 - Present) -> Rev D (Current)
  // [1] CIT-U (2023 - 2027) -> Rev C
  // [2] Certifications -> Rev B
  // [3] Self-Directed Study -> Rev A
  const revLetters = ["D", "C", "B", "A"];

  return (
    <AsBuiltSheet id="experience" sheetNumber={5} title="Experience">
      <div className="space-y-8">
        
        <div className="border-2 border-ink bg-sheet overflow-x-auto">
          <table
            role="table"
            className="w-full text-left border-collapse min-w-[620px] sm:min-w-full"
          >
            <caption className="sr-only">
              Revision history of professional experience, education, and credentials
            </caption>
            <thead>
              <tr
                role="row"
                className="border-b-2 border-ink bg-ink text-sheet h-10 font-sans text-xs sm:text-sm font-semibold tracking-normal"
              >
                <th
                  role="columnheader"
                  scope="col"
                  className="py-2 px-3 w-[8%] border-r border-rule text-center"
                  title="Revision Sequence (Chronological: A = Oldest, D = Latest)"
                >
                  Rev <span className="sr-only">(Chronological Order)</span>
                </th>
                <th
                  role="columnheader"
                  scope="col"
                  className="py-2 px-3 w-[20%] border-r border-rule"
                >
                  Period
                </th>
                <th
                  role="columnheader"
                  scope="col"
                  className="py-2 px-3 w-[24%] border-r border-rule"
                >
                  Title
                </th>
                <th
                  role="columnheader"
                  scope="col"
                  className="py-2 px-3 w-[22%] border-r border-rule"
                >
                  Organization
                </th>
                <th
                  role="columnheader"
                  scope="col"
                  className="py-2 px-3 w-[26%]"
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody
              role="rowgroup"
              className="divide-y divide-rule font-sans text-[0.875rem]"
            >
              {experiences.map((item, index) => {
                const isCurrent = item.period.toLowerCase().includes("present");
                const revLetter = revLetters[index] || "A";
                const isExpanded = !!expandedRows[index];

                return (
                  <tr
                    key={item.title}
                    role="row"
                    className="hover:bg-desk transition-none"
                  >
                    {/* Rev Column with Revision Triangle on current entry per §6.2.9 */}
                    <td
                      role="cell"
                      className="py-3 px-2 text-center align-top border-r border-rule"
                    >
                      {isCurrent ? (
                        <div className="relative inline-flex items-center justify-center w-6 h-6">
                          <svg
                            className="absolute inset-0 w-6 h-6 text-redline pointer-events-none"
                            viewBox="0 0 16 16"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <path
                              d="M1 15 L8 1 L15 15 Z"
                              fill="var(--sheet)"
                              stroke="var(--redline)"
                              strokeWidth="2"
                              vectorEffect="non-scaling-stroke"
                            />
                          </svg>
                          <span className="font-mono text-xs font-bold text-redline pt-0.5 relative z-10">
                            {revLetter}
                          </span>
                        </div>
                      ) : (
                        <span className="font-mono text-xs font-semibold text-ink">
                          {revLetter}
                        </span>
                      )}
                    </td>

                    {/* Period Column */}
                    <td
                      role="cell"
                      className="py-3 px-3 align-top font-mono text-xs sm:text-[0.8125rem] text-ink-2 border-r border-rule"
                    >
                      {item.period}
                    </td>

                    {/* Title Column */}
                    <th
                      role="rowheader"
                      scope="row"
                      className="py-3 px-3 align-top font-semibold text-ink text-[0.9375rem] border-r border-rule"
                    >
                      {item.title}
                    </th>

                    {/* Organization Column */}
                    <td
                      role="cell"
                      className="py-3 px-3 align-top text-ink-2 text-[0.875rem] border-r border-rule"
                    >
                      {item.organization}
                    </td>

                    {/* Description Column: clamped to 2 lines with Read more toggle if longer */}
                    <td
                      role="cell"
                      className="py-3 px-3 align-top text-ink text-[0.875rem] leading-relaxed"
                    >
                      <div className={isExpanded ? "" : "line-clamp-2"}>
                        {item.description}
                      </div>
                      {item.description.length > 90 && (
                        <button
                          type="button"
                          onClick={() => toggleRow(index)}
                          aria-expanded={isExpanded}
                          className="mt-1 text-xs font-semibold text-ink underline hover:bg-ink hover:text-sheet px-1 transition-none"
                        >
                          {isExpanded ? "Show less" : "Read more"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </AsBuiltSheet>
  );
}
