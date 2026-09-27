'use client';

import React, { useSyncExternalStore } from 'react';
import { wiringStore } from './wiringStore';

export function WiringChannel() {
  const isWired = useSyncExternalStore(
    wiringStore.subscribe,
    wiringStore.getSnapshot,
    wiringStore.getServerSnapshot
  );

  return (
    <div
      aria-hidden="true"
      className="hidden sm:flex relative w-full max-w-[720px] mx-auto h-24 my-0 items-center justify-center select-none pointer-events-none"
    >
      <svg
        className="w-full h-full overflow-visible marker-wobble"
        viewBox="0 0 720 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Central structural connector */}
        <line
          x1="360"
          y1="0"
          x2="360"
          y2="88"
          stroke="var(--connector)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <polygon points="355,82 365,82 360,90" fill="var(--connector)" />

        {/* Orthogonal Marker Wiring 1: Python (left channel) */}
        <path
          d="M 180 0 L 180 32 L 280 32 L 280 96"
          stroke="var(--marker)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={isWired ? 'animate-wire' : 'opacity-0'}
          style={{ animationDelay: '0ms' }}
        />
        <circle
          cx="180"
          cy="2"
          r="3"
          fill="var(--marker)"
          className={`transition-opacity duration-150 ${isWired ? 'opacity-100' : 'opacity-0'}`}
        />
        <circle
          cx="280"
          cy="94"
          r="3"
          fill="var(--marker)"
          className={`transition-opacity duration-150 ${isWired ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Orthogonal Marker Wiring 2: FastAPI (central-right channel) */}
        <path
          d="M 260 0 L 260 48 L 440 48 L 440 96"
          stroke="var(--marker)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={isWired ? 'animate-wire' : 'opacity-0'}
          style={{ animationDelay: '60ms' }}
        />
        <circle
          cx="260"
          cy="2"
          r="3"
          fill="var(--marker)"
          className={`transition-opacity duration-150 ${isWired ? 'opacity-100' : 'opacity-0'}`}
        />
        <circle
          cx="440"
          cy="94"
          r="3"
          fill="var(--marker)"
          className={`transition-opacity duration-150 ${isWired ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Orthogonal Marker Wiring 3: APScheduler (far-right channel) */}
        <path
          d="M 380 0 L 380 64 L 520 64 L 520 96"
          stroke="var(--marker)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={isWired ? 'animate-wire' : 'opacity-0'}
          style={{ animationDelay: '120ms' }}
        />
        <circle
          cx="380"
          cy="2"
          r="3"
          fill="var(--marker)"
          className={`transition-opacity duration-150 ${isWired ? 'opacity-100' : 'opacity-0'}`}
        />
        <circle
          cx="520"
          cy="94"
          r="3"
          fill="var(--marker)"
          className={`transition-opacity duration-150 ${isWired ? 'opacity-100' : 'opacity-0'}`}
        />
      </svg>
    </div>
  );
}
