import React from "react";

interface RoomThresholdProps {
  roomNumber: string; // e.g. "01"
  roomName: string;   // e.g. "Entrance"
  className?: string;
}

export function RoomThreshold({
  roomNumber,
  roomName,
  className = "",
}: RoomThresholdProps) {
  return (
    <div
      className={`w-full relative select-none pt-4 pb-12 sm:pb-16 ${className}`}
      aria-hidden="true"
    >
      {/* 3px Brass Line across top of room (§9.3.2) */}
      <div className="w-full h-[3px] bg-brass threshold-line" />

      {/* Wayfinding Plaque mounted at left end (§9.3.2, §9.3.3) */}
      <div className="absolute top-1 left-4 sm:left-8 bg-concrete border border-ink px-3 py-1 flex items-center gap-2 text-xs font-archivo tracking-wider">
        <span className="text-brass font-bold">Room {roomNumber}</span>
        <span className="text-ink-2/60">•</span>
        <span className="text-ink font-semibold uppercase">{roomName}</span>
      </div>
    </div>
  );
}
