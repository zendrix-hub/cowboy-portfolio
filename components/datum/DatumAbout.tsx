import React from 'react';
import { social } from '@/data/social';

export function DatumAbout() {
  return (
    <section
      id="about"
      aria-label="About Zendrix Riva"
      className="band-section band-mid"
    >
      <div className="datum-column">
        {/* Elevation marker */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--contour)]" />
          <span className="font-display text-xs font-bold tracking-widest uppercase text-[var(--contour)]">
            ELEVATION // MID CONTOUR [BAND 02]
          </span>
        </div>

        <h2 className="font-display font-bold text-[clamp(1.75rem,4vw,3rem)] leading-[1.1] text-[var(--ink)] tracking-tight mb-6">
          About
        </h2>

        {/* Unedited Candidate Bio in Karla */}
        <p className="font-sans text-base sm:text-lg leading-[1.7] text-[var(--ink)] mb-6 whitespace-pre-line">
          {social.about}
        </p>

        {/* Tagline */}
        <p className="font-sans text-sm italic text-[var(--ink)]/80 mb-8">
          &ldquo;{social.tagline}&rdquo;
        </p>

        {/* Verified Fact Waypoint Tags */}
        <div className="pt-4 border-t border-[var(--contour)]/25">
          <p className="font-display text-[11px] font-bold tracking-widest uppercase text-[var(--contour)] mb-3">
            TERRAIN WAYPOINTS // RECORDED METADATA
          </p>
          <div className="flex flex-wrap gap-2.5">
            <span className="waypoint-tag">
              LOC: {social.location}
            </span>
            <span className="waypoint-tag">
              EDU: CIT-U (BSIT, 2027)
            </span>
            <span className="waypoint-tag">
              STATION: NEC Telecom Software (GDC)
            </span>
            <span className="waypoint-tag">
              CORE: Offline-First • Clean Architecture
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
