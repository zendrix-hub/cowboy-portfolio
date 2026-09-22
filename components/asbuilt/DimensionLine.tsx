import React from "react";

interface DimensionLineProps {
  className?: string;
}

/**
 * Dimension line under sheet titles per §6.2.3:
 * A 1px --rule line with 45° end ticks spanning the title's width.
 * Strictly decorative, aria-hidden="true", focusable="false", no numbers.
 */
export function DimensionLine({ className = "" }: DimensionLineProps) {
  return (
    <div
      className={`relative flex items-center w-full h-3 my-2 text-rule ${className}`}
      aria-hidden="true"
    >
      {/* Left 45-degree tick */}
      <svg
        className="w-3 h-3 shrink-0"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      >
        <line x1="2" y1="10" x2="10" y2="2" />
      </svg>
      {/* Continuous horizontal dimension line */}
      <div className="flex-1 h-[1px] bg-rule" />
      {/* Right 45-degree tick */}
      <svg
        className="w-3 h-3 shrink-0"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      >
        <line x1="2" y1="10" x2="10" y2="2" />
      </svg>
    </div>
  );
}
