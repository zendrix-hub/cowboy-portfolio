import React from "react";
import { MarginaliaPage } from "./MarginaliaPage";
import { social } from "@/data/social";
import { experiences } from "@/data/experience";

export function MarginaliaAbout() {
  const education = experiences.find((e) => e.category === "Education");

  const marginAnnotations = (
    <div className="space-y-6 pt-2 select-none">
      {/* Hand-drawn note 1 */}
      <div className="relative pl-3 border-l-2 border-tape/40 rotate-[-1.5deg]">
        <span className="font-courier text-[10px] uppercase text-tape block tracking-widest font-bold">
          [NOTE // BASE]
        </span>
        <p className="font-caveat text-sm sm:text-base text-ink-2 leading-tight">
          Cebu Institute of Technology — University • BSIT candidate
        </p>
      </div>

      {/* Hand-drawn note 2 */}
      <div className="relative pl-3 border-l-2 border-tape/40 rotate-[1deg]">
        <span className="font-courier text-[10px] uppercase text-tape block tracking-widest font-bold">
          [FOCUS]
        </span>
        <p className="font-caveat text-sm sm:text-base text-ink-2 leading-tight">
          Offline-first mobile engines &amp; robust backend services.
        </p>
      </div>
    </div>
  );

  const facts = [
    { label: "STATUS", value: social.role },
    { label: "AFFILIATION", value: social.subrole },
    {
      label: "FORMATION",
      value: education ? `${education.title}, ${education.organization}` : "BSIT Senior, CIT-U",
    },
    { label: "LOCATION", value: social.location },
    { label: "ACADEMIC", value: social.academicEmail },
  ];

  return (
    <MarginaliaPage
      id="about"
      pageNumber={2}
      rotation={1.1}
      leftTapeRotation={2.5}
      rightTapeRotation={-3}
      marginContent={marginAnnotations}
    >
      <div className="space-y-6 sm:space-y-8">
        <header>
          <span className="font-courier text-xs uppercase tracking-widest text-tape font-bold block mb-1">
            SECTION // BIOGRAPHY
          </span>
          <h2
            id="about-title"
            className="font-lora font-semibold text-[clamp(1.75rem,4vw,3rem)] leading-tight text-ink"
          >
            About &amp; Background
          </h2>
        </header>

        {/* Full Unedited Bio Text in Source Serif (§9.1.6: no "Read more" truncation) */}
        <div className="space-y-4 max-w-[640px]">
          <p className="font-serif text-[1.0625rem] leading-[1.7] text-ink">
            {social.about}
          </p>

          <p className="font-serif text-[1.0625rem] leading-[1.7] text-ink-2">
            Currently working across distributed architectures, on-device ML/ASR pipelines, and accessible systems for low-bandwidth environments.
          </p>
        </div>

        {/* Handwritten Margin Notes displayed inline on mobile (<640px per §9.1.12) */}
        <div className="lg:hidden border-l-2 border-tape pl-3 py-1 space-y-1 my-4">
          <span className="font-courier text-[11px] font-bold text-tape uppercase tracking-wider block">
            MARGIN NOTE:
          </span>
          <p className="font-caveat text-base text-ink-2 leading-snug">
            Cebu Institute of Technology — University • BSIT candidate. Focused on offline-first mobile engines &amp; robust backend services.
          </p>
        </div>

        {/* Verified Facts Schedule Box */}
        <div className="pt-2 border-t border-ink-2/20">
          <h3 className="font-courier text-xs uppercase tracking-wider text-ink-2 mb-3">
            VERIFIED FACTS // SUMMARY LOG
          </h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 font-courier text-xs sm:text-[0.8125rem]">
            {facts.map((fact) => (
              <div key={fact.label} className="border-b border-ink-2/15 pb-2">
                <dt className="text-ink-2 opacity-80">{fact.label}</dt>
                <dd className="font-bold text-ink mt-0.5">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </MarginaliaPage>
  );
}
