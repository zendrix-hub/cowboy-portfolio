'use client';

import React, { useState } from 'react';
import { social } from '@/data/social';

export function RuntimeContact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(social.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  return (
    <section
      id="contact"
      aria-label="End Node: Contact & Output"
      className="w-full flex flex-col items-center justify-center pt-2 pb-16"
    >
      {/* Stadium End Node */}
      <div className="runtime-node w-full max-w-[720px] rounded-full border-2 border-[var(--ink)] bg-[var(--board)] px-6 py-10 sm:px-12 sm:py-14 text-center transition-colors">
        {/* Node classification indicator */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full bg-[var(--marker)]"
          />
          <span className="font-mono text-xs font-bold tracking-widest text-[var(--ink-2)] uppercase">
            END NODE // OUTPUT_TERMINAL
          </span>
        </div>

        <h2 className="font-mono font-bold text-[clamp(1.5rem,4vw,2.5rem)] text-[var(--ink)] mb-3">
          Initialize Connection
        </h2>

        <p className="font-sans text-sm sm:text-base text-[var(--ink-2)] max-w-md mx-auto mb-6">
          Open to backend and full-stack software engineering conversations, internships, and architectural collaboration.
        </p>

        {/* Large Mailto Address in Space Mono */}
        <div className="mb-6">
          <a
            href={`mailto:${social.email}`}
            aria-label={`Send email to ${social.email}`}
            className="font-mono text-lg sm:text-2xl font-bold text-[var(--ink)] hover:text-[var(--marker)] break-all underline decoration-1 underline-offset-4 transition-colors"
          >
            {social.email}
          </a>
        </div>

        {/* Copy Address Button with Label Swap & Live Region */}
        <div className="flex flex-col items-center justify-center gap-2 mb-8">
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? 'Email address copied' : 'Copy email address'}
            className="runtime-btn text-xs font-mono"
          >
            {copied ? '✓ Copied to clipboard' : 'Copy address'}
          </button>
          <div aria-live="polite" className="sr-only">
            {copied ? 'Email address copied to clipboard.' : ''}
          </div>
        </div>

        {/* Output Ports: Social and Academic Links */}
        <div className="pt-6 border-t border-[var(--ink)]/15">
          <span className="block font-mono text-[11px] font-bold text-[var(--ink-2)] uppercase tracking-wider mb-3">
            OUT: PORTS // NETWORK_LINKS
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open GitHub profile"
              className="port-tab inline-flex items-center min-h-[44px] px-3.5 py-1.5 font-mono text-xs border border-[var(--ink)] rounded-none text-[var(--ink)] hover:border-[var(--marker)] hover:text-[var(--marker)] transition-colors"
            >
              out: GitHub (zendrix-hub) ↗
            </a>
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open LinkedIn profile"
              className="port-tab inline-flex items-center min-h-[44px] px-3.5 py-1.5 font-mono text-xs border border-[var(--ink)] rounded-none text-[var(--ink)] hover:border-[var(--marker)] hover:text-[var(--marker)] transition-colors"
            >
              out: LinkedIn ↗
            </a>
            <a
              href={`mailto:${social.academicEmail}`}
              aria-label={`Send email to academic address ${social.academicEmail}`}
              className="port-tab inline-flex items-center min-h-[44px] px-3.5 py-1.5 font-mono text-xs border border-[var(--ink)] rounded-none text-[var(--ink)] hover:border-[var(--marker)] hover:text-[var(--marker)] transition-colors"
            >
              out: Academic (CIT-U) ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
