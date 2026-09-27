import React from 'react';
import { social } from '@/data/social';

export function DatumHero() {
  return (
    <section
      id="hero"
      aria-label="Base Camp: Zendrix Riva"
      className="band-section band-low"
    >
      <div className="datum-column text-center">
        {/* Elevation marker */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-[var(--contour)]" />
          <span className="font-display text-xs font-bold tracking-widest uppercase text-[var(--contour)]">
            ELEVATION // BASE CAMP [BAND 01: LOW]
          </span>
        </div>

        {/* Candidate Name in Overpass 700 */}
        <h1 className="font-display font-bold text-[clamp(2.75rem,9vw,6.5rem)] leading-none text-[var(--ink)] tracking-tight mb-4">
          {social.displayName}
        </h1>

        {/* Candidate Role in Overpass */}
        <p className="font-display text-base sm:text-lg font-semibold tracking-wide text-[var(--ink)] mb-2">
          {social.role}
        </p>
        <p className="font-display text-xs sm:text-sm tracking-wider uppercase text-[var(--contour)] mb-8 font-medium">
          {social.subrole}
        </p>

        {/* Verbatim Intro in Karla */}
        <p className="font-sans text-base sm:text-lg leading-[1.7] text-[var(--ink)] max-w-xl mx-auto mb-10">
          {social.intro}
        </p>

        {/* Plain text link actions */}
        <div className="flex items-center justify-center gap-8 font-display text-sm uppercase tracking-wider font-semibold">
          <a href="#projects" className="datum-link">
            Ascend to projects ↗
          </a>
          <a href={`mailto:${social.email}`} className="datum-link">
            Send an email ↗
          </a>
        </div>
      </div>
    </section>
  );
}
