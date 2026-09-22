import React from "react";

interface FramedViewportProps {
  children: React.ReactNode;
  className?: string;
  aspectRatio?: string;
}

/**
 * Framed viewport per §6.2.3:
 * 1px --rule frame with four 12px L-shaped corner ticks, object-fit: cover, no filters.
 */
export function FramedViewport({
  children,
  className = "",
  aspectRatio = "aspect-square sm:aspect-[4/5]",
}: FramedViewportProps) {
  return (
    <div
      className={`relative border border-rule bg-sheet p-1.5 ${aspectRatio} ${className}`}
    >
      {/* 4 L-shaped corner ticks (12px = 3rem in w-3 h-3) */}
      <span
        className="absolute -top-[2px] -left-[2px] w-3 h-3 border-t-2 border-l-2 border-ink pointer-events-none"
        aria-hidden="true"
      />
      <span
        className="absolute -top-[2px] -right-[2px] w-3 h-3 border-t-2 border-r-2 border-ink pointer-events-none"
        aria-hidden="true"
      />
      <span
        className="absolute -bottom-[2px] -left-[2px] w-3 h-3 border-b-2 border-l-2 border-ink pointer-events-none"
        aria-hidden="true"
      />
      <span
        className="absolute -bottom-[2px] -right-[2px] w-3 h-3 border-b-2 border-r-2 border-ink pointer-events-none"
        aria-hidden="true"
      />

      {/* Viewport inner content */}
      <div className="relative w-full h-full overflow-hidden bg-desk">
        {children}
      </div>
    </div>
  );
}
