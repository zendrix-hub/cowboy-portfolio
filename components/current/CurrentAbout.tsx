import React from "react";
import { social } from "@/data/social";

export default function CurrentAbout() {
  // First sentence is 135 chars (<= 160 chars), lifted verbatim (§6.3.6)
  const fullText = social.about;
  const periodIndex = fullText.indexOf(".");
  const leadSentence =
    periodIndex !== -1 ? fullText.slice(0, periodIndex + 1) : fullText;
  const remainingText =
    periodIndex !== -1 ? fullText.slice(periodIndex + 1).trim() : "";

  const facts = [
    { label: "Engineering Role", value: social.role },
    { label: "Current Affiliation", value: social.subrole },
    { label: "Degree & Specialization", value: "CIT-U • BSIT (Mobile, Backend & AI)" },
    { label: "Engineering Location", value: social.location },
    { label: "Academic Inquiries", value: social.academicEmail },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="zone-2 relative min-h-[90svh] flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-[clamp(100px,12vh,160px)] select-text"
    >
      <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
        {/* Left Area (Desktop Channel Margin & Lifted Lead Sentence + Facts): 5 columns (§6.4) */}
        <div className="lg:col-span-5 flex flex-col gap-10 order-2 lg:order-1 pt-6 lg:pt-0">
          {/* Lifted lead sentence positioned directly beside the line's path in the channel */}
          <div className="border-l-2 border-[var(--line)] pl-5 py-1">
            <span className="text-[0.8125rem] font-medium tracking-widest uppercase text-[var(--fg-2)] block mb-2 font-mono">
              CHANNEL WAYPOINT // CORE DISCIPLINE
            </span>
            <p className="font-fraunces text-[clamp(1.35rem,2.2vw,1.75rem)] leading-[1.4] text-[var(--fg)] m-0">
              {leadSentence}
            </p>
          </div>

          {/* Verified Facts Stack */}
          <div className="flex flex-col gap-6 pt-2">
            {facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1">
                <span className="text-[0.9375rem] font-medium text-[var(--fg-2)] tracking-wide">
                  {fact.label}
                </span>
                <span className="text-[1.125rem] text-[var(--fg)] font-normal">
                  {fact.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Area (Reading Column): 7 columns (desktop), text on right */}
        <div className="lg:col-span-7 flex flex-col items-start max-w-[36rem] order-1 lg:order-2">
          <h2
            id="about-title"
            className="font-fraunces text-[clamp(2.75rem,7vw,6rem)] leading-[1.0] text-[var(--fg)] tracking-normal m-0"
          >
            About
          </h2>

          {/* Remaining About Text in Hanken 1.125rem / 1.7 */}
          {remainingText && (
            <p className="mt-8 text-[1.125rem] leading-[1.7] text-[var(--fg)]">
              {remainingText}
            </p>
          )}

          {/* Architectural Tagline */}
          <p className="mt-6 text-[1.0625rem] leading-[1.65] text-[var(--fg-2)] italic">
            &ldquo;{social.tagline}&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
