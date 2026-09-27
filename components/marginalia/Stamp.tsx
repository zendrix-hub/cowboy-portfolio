import React from "react";

interface StampProps {
  status: string;
  className?: string;
  rotation?: number; // e.g. -11deg
}

export function Stamp({
  status,
  className = "",
  rotation = -11,
}: StampProps) {
  return (
    <div
      role="note"
      aria-label={`Project status stamp: ${status}`}
      style={{ transform: `rotate(${rotation}deg)` }}
      className={`inline-block select-none pointer-events-none text-stamp ${className}`}
    >
      <div className="relative border-2 border-dashed border-stamp rounded-full px-4 py-2 sm:px-5 sm:py-2.5 flex flex-col items-center justify-center opacity-95">
        <span className="font-courier text-[10px] sm:text-xs font-bold tracking-widest uppercase opacity-80">
          FIELD RECORD
        </span>
        <span className="font-courier text-xs sm:text-sm font-bold tracking-wider uppercase underline underline-offset-2 my-0.5">
          {status}
        </span>
        <span className="font-courier text-[9px] sm:text-[10px] tracking-tight opacity-75">
          STAMP // ARCHIVE
        </span>
      </div>
    </div>
  );
}
