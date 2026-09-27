import React from "react";

// 48 Deterministically seeded starfield coordinates (§9.4.2, §9.4.3)
const STATIC_STARS = [
  { x: 5, y: 7, s: 1.5, o: 0.25 },
  { x: 12, y: 19, s: 1, o: 0.35 },
  { x: 23, y: 8, s: 2, o: 0.2 },
  { x: 34, y: 22, s: 1, o: 0.4 },
  { x: 45, y: 11, s: 1.5, o: 0.3 },
  { x: 56, y: 27, s: 1, o: 0.25 },
  { x: 67, y: 9, s: 2, o: 0.35 },
  { x: 78, y: 18, s: 1.5, o: 0.2 },
  { x: 89, y: 6, s: 1, o: 0.4 },
  { x: 94, y: 25, s: 2, o: 0.3 },
  { x: 8, y: 38, s: 1.5, o: 0.3 },
  { x: 18, y: 44, s: 1, o: 0.2 },
  { x: 29, y: 33, s: 2, o: 0.35 },
  { x: 41, y: 49, s: 1, o: 0.25 },
  { x: 52, y: 36, s: 1.5, o: 0.4 },
  { x: 63, y: 42, s: 1, o: 0.3 },
  { x: 74, y: 31, s: 2, o: 0.25 },
  { x: 85, y: 47, s: 1.5, o: 0.35 },
  { x: 92, y: 39, s: 1, o: 0.2 },
  { x: 4, y: 58, s: 2, o: 0.3 },
  { x: 15, y: 66, s: 1, o: 0.25 },
  { x: 26, y: 54, s: 1.5, o: 0.35 },
  { x: 37, y: 69, s: 1, o: 0.2 },
  { x: 48, y: 59, s: 2, o: 0.4 },
  { x: 59, y: 64, s: 1.5, o: 0.25 },
  { x: 71, y: 56, s: 1, o: 0.35 },
  { x: 82, y: 68, s: 2, o: 0.2 },
  { x: 95, y: 57, s: 1.5, o: 0.3 },
  { x: 9, y: 78, s: 1, o: 0.35 },
  { x: 21, y: 86, s: 2, o: 0.25 },
  { x: 31, y: 74, s: 1.5, o: 0.4 },
  { x: 44, y: 89, s: 1, o: 0.2 },
  { x: 55, y: 79, s: 2, o: 0.3 },
  { x: 66, y: 84, s: 1.5, o: 0.35 },
  { x: 77, y: 76, s: 1, o: 0.25 },
  { x: 88, y: 88, s: 2, o: 0.2 },
  { x: 96, y: 81, s: 1, o: 0.4 },
  { x: 14, y: 94, s: 1.5, o: 0.3 },
  { x: 27, y: 97, s: 1, o: 0.25 },
  { x: 39, y: 93, s: 2, o: 0.35 },
  { x: 51, y: 96, s: 1.5, o: 0.2 },
  { x: 62, y: 92, s: 1, o: 0.3 },
  { x: 73, y: 98, s: 2, o: 0.25 },
  { x: 84, y: 95, s: 1, o: 0.35 },
  { x: 91, y: 99, s: 1.5, o: 0.4 },
];

export function StarfieldBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {STATIC_STARS.map((star, idx) => (
          <circle
            key={idx}
            cx={`${star.x}%`}
            cy={`${star.y}%`}
            r={star.s}
            className="fill-ink-2"
            style={{ opacity: star.o }}
          />
        ))}
      </svg>
    </div>
  );
}
