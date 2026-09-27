import React from "react";
import { social } from "@/data/social";
import { experiences } from "@/data/experience";

export function MastheadAbout() {
  const education = experiences.find((e) => e.category === "Education");

  // Verbatim sentence from social.about for the pull quote
  const pullQuoteText =
    "I value disciplined iteration, clear structure, and software that works dependably in production.";

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full max-w-[1200px] mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-ink-2/30"
    >
      {/* Editorial Section Masthead Label */}
      <div className="flex items-center justify-between pb-8 mb-8 border-b border-ink-2/20 text-xs text-ink-2">
        <span className="font-mono text-[11px] uppercase tracking-wider">Folio 02 // Profile &amp; Essay</span>
        <span className="font-mono text-[11px] uppercase tracking-wider">Feature Essay</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column (7 columns): Body Copy with Editorial Drop Cap */}
        <div className="lg:col-span-7 space-y-6 lg:border-r lg:border-ink-2/25 lg:pr-14">
          <header className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-spot font-semibold block">
              Biography
            </span>
            <h2
              id="about-heading"
              className="font-playfair font-bold text-[clamp(2rem,4vw,3.25rem)] leading-tight text-ink"
            >
              System craft and practical engineering.
            </h2>
          </header>

          {/* Opening Paragraph with Drop Cap (§9.2.6) */}
          <p className="masthead-dropcap font-sans text-[1.0625rem] leading-[1.7] text-ink">
            {social.about}
          </p>

          <p className="font-sans text-[1.0625rem] leading-[1.7] text-ink">
            {social.intro}
          </p>

          {/* Academic & Affiliation Baseline Record */}
          <div className="pt-6 border-t border-ink-2/20 space-y-3 font-sans text-xs sm:text-sm text-ink-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-ink-2/15 pb-2">
              <span className="uppercase tracking-wider font-medium text-ink-2/80">Academic Base</span>
              <span className="text-ink font-medium">
                {education ? `${education.title}, ${education.organization}` : "BSIT Senior, CIT-U"}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-ink-2/15 pb-2">
              <span className="uppercase tracking-wider font-medium text-ink-2/80">Current Placement</span>
              <span className="text-ink font-medium">{social.subrole}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-ink-2/15 pb-2">
              <span className="uppercase tracking-wider font-medium text-ink-2/80">Primary Focus</span>
              <span className="text-ink font-medium">Offline-First Mobile Engines &amp; Distributed Backend APIs</span>
            </div>
          </div>
        </div>

        {/* Right Column (5 columns): The Pull Quote (§9.2.3, §9.2.6) */}
        <aside
          className="lg:col-span-5 flex flex-col justify-start pt-2"
          aria-hidden="true"
        >
          <div className="relative border-l-2 border-spot pl-6 sm:pl-8 py-2">
            {/* Spot Quotation Marks */}
            <span
              className="font-playfair text-5xl sm:text-6xl text-spot leading-none select-none block -mb-6"
              aria-hidden="true"
            >
              &ldquo;
            </span>

            <blockquote className="font-playfair italic text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.35] text-ink">
              {pullQuoteText}
            </blockquote>

            <cite className="block text-xs uppercase tracking-widest text-ink-2 font-mono mt-4 not-italic">
              — Zendrix Riva
            </cite>
          </div>
        </aside>
      </div>
    </section>
  );
}
