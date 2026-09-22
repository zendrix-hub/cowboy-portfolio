import React from "react";
import { AsBuiltSheet } from "./AsBuiltSheet";
import { social } from "@/data/social";
import { experiences } from "@/data/experience";

export function AsBuiltAbout() {
  const education = experiences.find((e) => e.category === "Education");

  // Facts that strictly exist in the repository under verified labels per §6.2.6
  const scheduleFacts = [
    { label: "Role", value: social.role },
    { label: "Current Affiliation", value: social.subrole },
    {
      label: "Education",
      value: education ? `${education.title} (${education.organization})` : "BSIT, CIT-U",
    },
    { label: "Location", value: social.location },
    { label: "Academic Inquiries", value: social.academicEmail },
  ];

  return (
    <AsBuiltSheet id="about" sheetNumber={2} title="About">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* Left Column (7 cols): Verbatim unedited about text */}
        <div className="lg:col-span-7 space-y-4">
          <p className="font-sans text-[1.0625rem] leading-[1.65] text-ink max-w-[62ch]">
            {social.about}
          </p>
          <p className="font-sans text-[1.0625rem] leading-[1.65] text-ink-2 max-w-[62ch] border-l-2 border-rule pl-4 mt-4">
            {social.tagline}
          </p>
        </div>

        {/* Right Column (5 cols): Verified facts schedule table */}
        <div className="lg:col-span-5 w-full">
          <div className="border-2 border-ink bg-sheet">
            <table
              role="table"
              className="w-full text-left border-collapse"
            >
              <caption className="sr-only">
                Schedule of verified candidate facts
              </caption>
              <thead>
                <tr
                  role="row"
                  className="border-b-2 border-ink bg-ink text-sheet h-10 font-sans text-xs sm:text-sm font-semibold uppercase-none tracking-normal"
                >
                  <th
                    role="columnheader"
                    scope="col"
                    className="py-2 px-3 w-2/5 border-r border-rule"
                  >
                    Field
                  </th>
                  <th
                    role="columnheader"
                    scope="col"
                    className="py-2 px-3 w-3/5"
                  >
                    Detail
                  </th>
                </tr>
              </thead>
              <tbody
                role="rowgroup"
                className="divide-y divide-rule font-sans text-[0.875rem] leading-normal"
              >
                {scheduleFacts.map((fact) => (
                  <tr
                    key={fact.label}
                    role="row"
                    className="hover:bg-desk transition-none flex flex-col sm:table-row border-b border-rule sm:border-b-0"
                  >
                    <th
                      role="rowheader"
                      scope="row"
                      className="py-2 px-3 font-semibold text-ink sm:border-r sm:border-rule align-top bg-sheet sm:bg-transparent"
                    >
                      {fact.label}
                    </th>
                    <td
                      role="cell"
                      className="py-2 px-3 text-ink-2 align-top"
                    >
                      {fact.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AsBuiltSheet>
  );
}
