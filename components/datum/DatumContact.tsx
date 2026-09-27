'use client';

import React, { useState } from 'react';
import { social } from '@/data/social';

export function DatumContact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(social.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="contact"
      aria-label="The Lookout: Contact at the Summit Peak"
      className="band-section band-peak pt-0 pb-24"
    >
      <div className="datum-column text-center">
        {/* Elevation marker */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[var(--contour)]" />
          <span className="font-display text-xs font-bold tracking-widest uppercase text-[var(--contour)]">
            ELEVATION // THE LOOKOUT [BAND 06: SUMMIT PEAK]
          </span>
        </div>

        <h2 className="font-display font-bold text-[clamp(1.75rem,4vw,3rem)] leading-[1.1] text-[var(--ink)] tracking-tight mb-4">
          The Lookout
        </h2>

        <p className="font-sans text-sm sm:text-base text-[var(--ink)]/80 max-w-md mx-auto mb-6">
          Summit reached. Open to engineering dialogue, production challenges, and systems design collaboration.
        </p>

        {/* Large Mailto Address in Overpass */}
        <div className="mb-6">
          <a
            href={`mailto:${social.email}`}
            aria-label={`Send email to ${social.email}`}
            className="font-display text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--ink)] hover:text-[var(--contour)] transition-colors break-all underline decoration-1 underline-offset-4"
          >
            {social.email}
          </a>
        </div>

        {/* Copy Address Action with Live Region */}
        <div className="mb-8">
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? 'Email address copied' : 'Copy email address'}
            className="datum-link font-display text-xs uppercase tracking-wider font-semibold"
          >
            {copied ? '✓ Copied to clipboard' : 'Copy address'}
          </button>
          <div aria-live="polite" className="sr-only">
            {copied ? 'Email address copied to clipboard.' : ''}
          </div>
        </div>

        {/* Output Social Links */}
        <div className="pt-6 border-t border-[var(--contour)]/25 flex flex-wrap items-center justify-center gap-6 font-display text-xs uppercase tracking-wider">
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="datum-link"
          >
            GitHub / zendrix-hub ↗
          </a>
          <span>•</span>
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="datum-link"
          >
            LinkedIn / in/zendrix-riva ↗
          </a>
          <span>•</span>
          <a
            href={`mailto:${social.academicEmail}`}
            className="datum-link"
          >
            CIT-U Academic ↗
          </a>
        </div>
      </div>
    </section>
  );
}
