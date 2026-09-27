'use client';

import React, { useState } from 'react';
import { social } from '@/data/social';

export function ClearingContact() {
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
      aria-label="Contact Zendrix Riva"
      className="clearing-section"
    >
      <div className="clearing-content clearing-pos-right">
        <h2 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.3] font-normal tracking-[0.02em] text-[var(--ink)] mb-8">
          Contact
        </h2>

        {/* Mailto address set at name-scale in Shippori Mincho */}
        <div className="mb-6">
          <a
            href={`mailto:${social.email}`}
            aria-label={`Send email to ${social.email}`}
            className="font-serif text-2xl sm:text-3xl font-normal text-[var(--ink)] hover:text-[var(--mark)] transition-colors break-all"
          >
            {social.email}
          </a>
        </div>

        {/* Copy Address Action */}
        <div className="mb-10">
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? 'Email address copied' : 'Copy email address'}
            className="clearing-link font-sans text-xs tracking-widest uppercase"
          >
            {copied ? 'Copied' : 'Copy address'}
          </button>
          <div aria-live="polite" className="sr-only">
            {copied ? 'Email address copied to clipboard.' : ''}
          </div>
        </div>

        {/* Social Links as a short plain list */}
        <div className="space-y-2 font-sans text-xs tracking-wider">
          <p>
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="clearing-link"
            >
              GitHub / zendrix-hub ↗
            </a>
          </p>
          <p>
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="clearing-link"
            >
              LinkedIn / in/zendrix-riva ↗
            </a>
          </p>
          <p>
            <a
              href={`mailto:${social.academicEmail}`}
              className="clearing-link"
            >
              Academic / zendrix.riva@cit.edu ↗
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
