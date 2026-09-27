import React from "react";

interface ConnectorLineProps {
  height?: number;
  label?: string;
}

export function ConnectorLine({ height = 72, label }: ConnectorLineProps) {
  const midY = height / 2;
  const arrowY = height - 8;

  return (
    <div
      aria-hidden="true"
      className="flex flex-col items-center justify-center my-0 select-none pointer-events-none"
    >
      <svg
        width="32"
        height={height}
        viewBox={`0 0 32 ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="marker-wobble overflow-visible"
      >
        {/* Vertical connector line */}
        <line
          x1="16"
          y1="0"
          x2="16"
          y2={arrowY}
          stroke="var(--connector)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Direction marker triangle */}
        <polygon
          points={`11,${arrowY - 6} 21,${arrowY - 6} 16,${arrowY}`}
          fill="var(--connector)"
        />

        {label && (
          <text
            x="20"
            y={midY}
            fill="var(--ink-2)"
            fontSize="10"
            fontFamily="var(--font-space-mono)"
            dominantBaseline="middle"
          >
            {label}
          </text>
        )}
      </svg>
    </div>
  );
}
