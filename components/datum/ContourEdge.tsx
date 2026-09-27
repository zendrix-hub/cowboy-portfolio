'use client';

import React, { useSyncExternalStore } from 'react';

interface ContourEdgeProps {
  topColor: string;
  bottomColor: string;
  seed?: number;
  isFirstEdge?: boolean;
}

const CONTOUR_KEY = 'datum-contour-drawn';

let isContourDrawn = false;
let initialized = false;
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  if (!initialized && typeof window !== 'undefined') {
    initialized = true;
    try {
      const alreadyPlayed = sessionStorage.getItem(CONTOUR_KEY);
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (alreadyPlayed || prefersReducedMotion) {
        isContourDrawn = true;
      } else {
        sessionStorage.setItem(CONTOUR_KEY, 'true');
        setTimeout(() => {
          isContourDrawn = true;
          listeners.forEach((l) => l());
        }, 950);
      }
    } catch {
      isContourDrawn = true;
    }
  }
  return isContourDrawn;
}

function getServerSnapshot() {
  return true;
}

export function ContourEdge({
  topColor,
  bottomColor,
  seed = 1,
  isFirstEdge = false,
}: ContourEdgeProps) {
  const isDrawn = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Organic wave curves seeded per transition
  const pathD =
    seed === 1
      ? 'M 0 35 C 240 10, 480 60, 720 30 C 960 0, 1200 50, 1440 25 L 1440 70 L 0 70 Z'
      : seed === 2
      ? 'M 0 25 C 320 55, 640 10, 960 45 C 1200 65, 1340 20, 1440 35 L 1440 70 L 0 70 Z'
      : seed === 3
      ? 'M 0 40 C 280 15, 560 55, 840 25 C 1120 -5, 1300 45, 1440 30 L 1440 70 L 0 70 Z'
      : 'M 0 30 C 200 50, 500 15, 800 40 C 1100 65, 1300 20, 1440 35 L 1440 70 L 0 70 Z';

  const strokeLineD =
    seed === 1
      ? 'M 0 35 C 240 10, 480 60, 720 30 C 960 0, 1200 50, 1440 25'
      : seed === 2
      ? 'M 0 25 C 320 55, 640 10, 960 45 C 1200 65, 1340 20, 1440 35'
      : seed === 3
      ? 'M 0 40 C 280 15, 560 55, 840 25 C 1120 -5, 1300 45, 1440 30'
      : 'M 0 30 C 200 50, 500 15, 800 40 C 1100 65, 1300 20, 1440 35';

  return (
    <div
      aria-hidden="true"
      style={{ backgroundColor: topColor }}
      className="w-full relative overflow-hidden select-none pointer-events-none leading-none -my-[1px]"
    >
      <svg
        viewBox="0 0 1440 70"
        preserveAspectRatio="none"
        className="w-full h-12 sm:h-16 md:h-20 block"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Bottom elevation ground fill */}
        <path d={pathD} fill={bottomColor} />

        {/* 2px Contour Line dividing bands */}
        <path
          d={strokeLineD}
          stroke="var(--contour)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          className={
            isFirstEdge
              ? isDrawn
                ? ''
                : 'animate-contour-draw'
              : ''
          }
        />
      </svg>
    </div>
  );
}
