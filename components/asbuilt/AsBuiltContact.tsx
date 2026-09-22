"use client";

import React, { useState } from "react";
import { AsBuiltSheet } from "./AsBuiltSheet";
import { DimensionLine } from "./DimensionLine";
import { CopyIcon, ExternalLinkIcon } from "./Icons";
import { social } from "@/data/social";

export function AsBuiltContact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(social.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const socialRows = [
    { platform: "GitHub", address: social.github, href: social.github },
    { platform: "LinkedIn", address: social.linkedin, href: social.linkedin },
    { platform: "Academic Email", address: social.academicEmail, href: `mailto:${social.academicEmail}` },
    { platform: "Engineering Resume", address: "View PDF Document", href: social.resumeUrl },
  ];

  return (
    <>
      <AsBuiltSheet id="contact" sheetNumber={6} title="Contact">
        <div className="space-y-10">
          
          {/* 
            Transmittal Block per §6.2.10:
            Large mailto link with small label and 3px underline,
            plus Copy address cell button with aria-live region.
          */}
          <div className="border-2 border-ink p-6 sm:p-8 bg-sheet space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              
              <div className="flex-1 min-w-0">
                <span className="block font-mono text-xs sm:text-sm text-ink-2 mb-1">
                  Send an email
                </span>
                <a
                  href={`mailto:${social.email}`}
                  className="font-condensed font-semibold text-[clamp(1.75rem,5.5vw,4.5rem)] text-ink leading-tight hover:opacity-80 block truncate overflow-hidden transition-none"
                  style={{ overflowWrap: "anywhere" }}
                >
                  {social.email}
                </a>
                <DimensionLine className="w-full mt-2" />
              </div>

              {/* Copy address cell button with role="status" */}
              <div className="shrink-0">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-2.5 border-2 border-ink bg-sheet text-ink font-sans font-semibold text-sm sm:text-base hover:bg-ink hover:text-sheet transition-none w-full sm:w-auto"
                >
                  <CopyIcon className="w-4 h-4" />
                  <span>{copied ? "Copied" : "Copy address"}</span>
                </button>
                {/* Accessible live region announcement per §6.2.10 & §11.6 */}
                <div role="status" aria-live="polite" className="sr-only">
                  {copied ? "Email address copied to clipboard" : ""}
                </div>
              </div>

            </div>
          </div>

          {/* Social Links Table: Platform | Address per §6.2.10 */}
          <div className="space-y-4">
            <h3 className="font-condensed font-semibold text-2xl text-ink">
              Transmittal Records
            </h3>

            <div className="border-2 border-ink bg-sheet">
              <table
                role="table"
                className="w-full text-left border-collapse"
              >
                <caption className="sr-only">
                  Directory of verified professional profiles and contacts
                </caption>
                <thead>
                  <tr
                    role="row"
                    className="border-b-2 border-ink bg-ink text-sheet h-10 font-sans text-xs sm:text-sm font-semibold tracking-normal"
                  >
                    <th
                      role="columnheader"
                      scope="col"
                      className="py-2 px-4 w-1/3 border-r border-rule"
                    >
                      Platform
                    </th>
                    <th
                      role="columnheader"
                      scope="col"
                      className="py-2 px-4 w-2/3"
                    >
                      Address
                    </th>
                  </tr>
                </thead>
                <tbody
                  role="rowgroup"
                  className="divide-y divide-rule font-sans text-[0.875rem]"
                >
                  {socialRows.map((row) => (
                    <tr
                      key={row.platform}
                      role="row"
                      className="hover:bg-desk transition-none"
                    >
                      <th
                        role="rowheader"
                        scope="row"
                        className="py-3 px-4 font-semibold text-ink border-r border-rule align-middle"
                      >
                        {row.platform}
                      </th>
                      <td
                        role="cell"
                        className="py-3 px-4 align-middle"
                      >
                        <a
                          href={row.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${row.platform}`}
                          className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm text-ink underline hover:bg-ink hover:text-sheet px-1 transition-none"
                          style={{ overflowWrap: "anywhere" }}
                        >
                          <span>{row.address}</span>
                          <ExternalLinkIcon className="w-3.5 h-3.5 shrink-0" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </AsBuiltSheet>

      {/* 
        Desk Footer below Sheet 6 per §6.2.10:
        Existing footer content only, in Plex Mono 0.875rem on the desk.
      */}
      <footer
        role="contentinfo"
        className="w-full max-w-[1120px] mx-auto py-8 text-center text-ink-2 font-mono text-[0.875rem] border-t-2 border-rule/40"
      >
        <p className="mb-1">
          © 2026 Zendrix Bello Riva. All verified portfolio data preserved.
        </p>
        <p className="text-xs text-rule">
          AS-BUILT RECORD SET // DRAWING SET EDITION // NO CAD SIMULATION
        </p>
      </footer>
    </>
  );
}
