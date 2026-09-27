import React from 'react';
import { social } from '@/data/social';

export function RuntimeHero() {
  return (
    <section
      id="hero"
      aria-label="Start Node: Zendrix Riva"
      className="w-full flex flex-col items-center justify-center pt-8 pb-2"
    >
      {/* Stadium Start Node */}
      <div className="runtime-node w-full max-w-[720px] rounded-full border-2 border-[var(--ink)] bg-[var(--board)] px-6 py-10 sm:px-12 sm:py-14 text-center transition-colors">
        {/* Node classification indicator */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full bg-[var(--marker)]"
          />
          <span className="font-mono text-xs font-bold tracking-widest text-[var(--ink-2)] uppercase">
            START NODE // EXECUTION_INIT
          </span>
        </div>

        {/* Candidate Name in Space Mono 700 */}
        <h1 className="font-mono font-bold text-[clamp(2.25rem,7vw,4.75rem)] leading-none text-[var(--ink)] tracking-tight mb-3">
          {social.displayName}
        </h1>

        {/* Candidate Role in Space Mono */}
        <p className="font-mono text-sm sm:text-base text-[var(--ink)] font-semibold mb-2">
          {social.role}
        </p>
        <p className="font-mono text-xs sm:text-sm text-[var(--ink-2)] mb-6">
          {social.subrole}
        </p>

        {/* Verbatim Candidate Intro in Manrope */}
        <p className="font-sans text-[1.0625rem] leading-[1.65] text-[var(--ink-2)] max-w-lg mx-auto mb-8">
          {social.intro}
        </p>

        {/* Action Buttons: Outlined Rectangles */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href="#projects" className="runtime-btn">
            See projects
          </a>
          <a
            href={`mailto:${social.email}`}
            className="runtime-btn"
          >
            Send email
          </a>
        </div>
      </div>
    </section>
  );
}
