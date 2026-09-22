import React from "react";

interface IconProps {
  className?: string;
}

/**
 * World 02 only allows three icons per §6.2.3:
 * external link, copy, theme.
 * Drawn with 1.5px square-cap strokes, no decorative graphics.
 */

export function ExternalLinkIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6 3H3V13H13V10" />
      <path d="M9 3H13V7" />
      <path d="M7 9L13 3" />
    </svg>
  );
}

export function CopyIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="5" y="5" width="8" height="8" />
      <path d="M3 11V3H11" />
    </svg>
  );
}

export function ThemeIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3" y="3" width="10" height="10" />
      <line x1="3" y1="3" x2="13" y2="13" />
    </svg>
  );
}
