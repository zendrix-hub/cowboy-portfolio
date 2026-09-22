import React from "react";
import { DimensionLine } from "./DimensionLine";
import { social } from "@/data/social";

interface AsBuiltSheetProps {
  id: string;
  sheetNumber: number;
  totalSheets?: number;
  title: string;
  middleBlockText?: string;
  isCover?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * Double-frame As-Built drafting sheet per §6.2.2 & §6.2.3:
 * - 3px --ink outer border.
 * - 1px --rule inner border inset 8px on tablet/desktop (dropped on mobile <640px).
 * - Dimension line under sheet title.
 * - Standard 3-cell title block at bottom right: {NAME} | {ROLE/section} | Sheet n of 6.
 */
export function AsBuiltSheet({
  id,
  sheetNumber,
  totalSheets = 6,
  title,
  middleBlockText,
  isCover = false,
  children,
  className = "",
}: AsBuiltSheetProps) {
  // On cover, middle cell is ROLE; on other sheets, it is the section title per §6.2.3
  const sectionLabel = isCover
    ? (middleBlockText || social.role)
    : (middleBlockText || title);

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`w-full max-w-[1120px] mx-auto mb-12 sm:mb-14 lg:mb-16 bg-sheet border-[3px] border-ink text-ink relative ${className}`}
    >
      {/* 
        Inner frame per §6.2.3 & §6.2.12:
        1px --rule inner frame inset 8px on tablet/desktop (p-2 on wrapper, border border-rule).
        On mobile (<640px), drop inner frame and m-2 inset.
      */}
      <div className="p-0 sm:p-2">
        <div className="border-0 sm:border sm:border-rule p-4 sm:p-6 lg:p-8 flex flex-col justify-between min-h-[400px]">
          
          {/* Header area: Sheet Title with Dimension Line */}
          {!isCover && (
            <div className="mb-6 sm:mb-8">
              <div className="inline-block max-w-full">
                <h2
                  id={`${id}-heading`}
                  className="font-condensed text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-none tracking-normal"
                >
                  {title}
                </h2>
                <DimensionLine className="w-full max-w-md" />
              </div>
            </div>
          )}

          {/* Sheet Main Body Content */}
          <div className="flex-1 w-full">
            {children}
          </div>

          {/* 
            Title Block per §6.2.3 & §6.2.12:
            2px outlined row, 40px tall, aligned bottom-right.
            Desktop: ~400-420px wide; Mobile: full width.
            Three cells with 1px dividers:
            {NAME} | section name (or {ROLE}) | Sheet n of N
            aria-hidden="true" because values exist elsewhere as accessible text.
          */}
          <div
            aria-hidden="true"
            className="mt-8 pt-4 border-t border-rule/30 flex justify-end"
          >
            <div className="w-full sm:w-auto sm:min-w-[380px] lg:min-w-[420px] h-10 border-2 border-ink grid grid-cols-3 divide-x divide-ink items-center bg-sheet text-ink text-center">
              {/* Cell 1: Name */}
              <div className="px-2 truncate font-condensed font-semibold text-[1.0625rem] leading-tight">
                {social.name}
              </div>
              {/* Cell 2: Section name or Role */}
              <div className="px-2 truncate font-sans text-[0.875rem] sm:text-[0.9375rem] leading-tight text-ink-2">
                {sectionLabel}
              </div>
              {/* Cell 3: Sheet n of N */}
              <div className="px-2 truncate font-mono text-[0.875rem] leading-tight text-ink">
                Sheet {sheetNumber} of {totalSheets}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
