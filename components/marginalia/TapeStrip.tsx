import React from "react";

interface TapeStripProps {
  className?: string;
  rotation?: number; // degrees, e.g. -4 to 4
  width?: string;
  height?: string;
}

export function TapeStrip({
  className = "",
  rotation = 0,
  width = "w-12 sm:w-14",
  height = "h-5 sm:h-6",
}: TapeStripProps) {
  return (
    <div
      aria-hidden="true"
      style={{ transform: `rotate(${rotation}deg)` }}
      className={`absolute z-20 pointer-events-none select-none rounded-[2px] bg-tape/85 dark:bg-tape/75 shadow-sm backdrop-blur-[0.5px] border border-tape-light/30 ${width} ${height} ${className}`}
    />
  );
}
