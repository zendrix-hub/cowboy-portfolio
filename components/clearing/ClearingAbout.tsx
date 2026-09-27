import React from 'react';
import { social } from '@/data/social';

export function ClearingAbout() {
  return (
    <section
      id="about"
      aria-label="About Zendrix Riva"
      className="clearing-section"
    >
      <div className="clearing-content clearing-pos-right">
        <h2 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.3] font-normal tracking-[0.02em] text-[var(--ink)] mb-6">
          About
        </h2>

        {/* Unedited Candidate Bio */}
        <p className="font-sans text-base leading-[1.9] text-[var(--ink)] mb-6 whitespace-pre-line">
          {social.about}
        </p>

        {/* Tagline */}
        <p className="font-sans text-sm italic leading-[1.9] text-[var(--ink-2)] mb-8">
          &ldquo;{social.tagline}&rdquo;
        </p>

        {/* Plain parameter lines at end of measure */}
        <div className="space-y-1.5 font-sans text-xs tracking-wider text-[var(--ink-2)] pt-4">
          <p>Location: {social.location}</p>
          <p>Education: CIT-U (BSIT, Expected Jan 2027)</p>
          <p>Internship: NEC Telecom Software Philippines (GDC)</p>
          <p>Focus: Offline-First Android • Spring Boot APIs • Clean Architecture</p>
        </div>
      </div>
    </section>
  );
}
