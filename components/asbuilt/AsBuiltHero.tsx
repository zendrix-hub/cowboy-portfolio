import React from "react";
import Image from "next/image";
import { AsBuiltSheet } from "./AsBuiltSheet";
import { DimensionLine } from "./DimensionLine";
import { FramedViewport } from "./FramedViewport";
import { MobileCoverThemeToggle } from "./AsBuiltNav";
import { social } from "@/data/social";

export function AsBuiltHero() {
  return (
    <AsBuiltSheet
      id="home"
      sheetNumber={1}
      title={social.name}
      isCover={true}
      className="mt-4 sm:mt-6"
    >
      {/* Mobile Theme Toggle bar placed at the top of the Cover sheet per §6.2.5 */}
      <MobileCoverThemeToggle />

      <div className="w-full">
        {/* Name as the <h1> at cover scale per §6.2.4: clamp(3rem, 12vw, 9.5rem) / line-height 0.92 */}
        <div className="w-full mb-4 sm:mb-6">
          <h1
            id="home-heading"
            className="font-condensed font-semibold text-[clamp(2.75rem,11vw,9.25rem)] leading-[0.92] text-ink tracking-normal uppercase-none"
          >
            {social.name}
          </h1>
          <DimensionLine className="w-full max-w-4xl mt-3 sm:mt-4" />
        </div>

        {/* 12-column grid layout per §6.2.4 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start pt-2 sm:pt-4">
          
          {/* Left Column (8 cols): Intro prose & CTAs */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-6 sm:space-y-8">
            <p className="font-sans text-[1.125rem] sm:text-[1.25rem] leading-[1.55] text-ink max-w-[56ch]">
              {social.intro}
            </p>

            {/* CTAs per §6.2.4: Cell buttons min height 48px (56px on mobile), Barlow 600 */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2 sm:pt-4">
              {/* "See projects" cell button: filled --ink with --sheet text */}
              <a
                href="#projects"
                className="inline-flex items-center justify-center min-h-[56px] sm:min-h-[48px] px-6 py-3 border-2 border-ink bg-ink text-sheet font-sans font-semibold text-base sm:text-[1rem] hover:bg-sheet hover:text-ink transition-none"
              >
                See projects
              </a>

              {/* "Send an email" cell button: outlined */}
              <a
                href={`mailto:${social.email}`}
                className="inline-flex items-center justify-center min-h-[56px] sm:min-h-[48px] px-6 py-3 border-2 border-ink bg-sheet text-ink font-sans font-semibold text-base sm:text-[1rem] hover:bg-ink hover:text-sheet transition-none"
              >
                Send an email
              </a>
            </div>

            {/* Official Architectural Engineering Stamp Block */}
            <div
              className="mt-6 border-2 border-ink p-3 w-fit bg-sheet select-none relative"
              aria-label="Official drawing set issuance stamp"
            >
              <div className="border border-rule/50 p-2.5 flex flex-col gap-1 text-center font-mono text-[11px] sm:text-xs leading-tight text-ink">
                <div className="font-bold tracking-wider text-ink border-b border-rule/30 pb-1">
                  ISSUED FOR RECORD SET
                </div>
                <div className="text-ink-2">
                  DOC NO: <span className="text-ink font-semibold">AS-BUILT-2026</span> • REV D
                </div>
                <div className="text-[10px] text-rule">
                  VERIFIED ARCHITECTURE & SYSTEM DATA
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (cols 9 to 12): Owner photo in framed viewport */}
          <div className="lg:col-span-4 w-full max-w-[280px] sm:max-w-[320px] lg:max-w-none mx-auto lg:mx-0">
            <FramedViewport aspectRatio="aspect-square w-full">
              <Image
                src="/images/Riva_ID.png"
                alt={social.name}
                fill
                priority
                quality={95}
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 380px, 420px"
                className="object-cover object-top"
              />
            </FramedViewport>
          </div>

        </div>
      </div>
    </AsBuiltSheet>
  );
}
