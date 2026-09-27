"use client";

import React from "react";
import Image from "next/image";
import { MarginaliaPage } from "./MarginaliaPage";
import { TapeStrip } from "./TapeStrip";
import { social } from "@/data/social";

export function MarginaliaHero() {
  const marginPhoto = (
    <div className="relative w-full max-w-[180px] mx-auto lg:max-w-none pt-4 lg:pt-0">
      {/* Photo Frame taped into notebook margin (§9.1.3, §9.1.4) */}
      <div className="relative inline-block rotate-[-1.8deg] shadow-sm bg-white dark:bg-[#1E1814] p-1.5 border border-ink-2/20">
        {/* Single Tape Strip holding photo down */}
        <TapeStrip
          rotation={3}
          width="w-10 sm:w-12"
          height="h-4 sm:h-5"
          className="-top-2 left-1/2 -translate-x-1/2"
        />

        <div className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 overflow-hidden bg-desk">
          <Image
            src="/images/Riva_ID.png"
            alt={social.name}
            width={320}
            height={320}
            priority
            unoptimized
            className="w-full h-full object-cover grayscale contrast-[1.05] brightness-[1.02]"
          />
        </div>

        {/* Handwritten margin caption in Caveat */}
        <span
          className="block text-center font-caveat text-xs sm:text-sm text-ink-2 mt-1.5 select-none"
          aria-hidden="true"
        >
          zr-2026 / notebook
        </span>
      </div>
    </div>
  );

  return (
    <MarginaliaPage
      id="home"
      pageNumber={1}
      rotation={-0.75}
      leftTapeRotation={-4}
      rightTapeRotation={2}
      isHero={true}
      marginContent={marginPhoto}
    >
      <div className="space-y-6 sm:space-y-8">
        {/* Mobile Photo Presentation (Above name, centered per §9.1.12) */}
        <div className="lg:hidden flex justify-center pb-2">
          <div className="relative inline-block rotate-[-1.5deg] shadow-sm bg-white dark:bg-[#1E1814] p-1.5 border border-ink-2/20">
            <TapeStrip
              rotation={2.5}
              width="w-10"
              height="h-4"
              className="-top-2 left-1/2 -translate-x-1/2"
            />
            <div className="relative w-32 h-32 overflow-hidden bg-desk">
              <Image
                src="/images/Riva_ID.png"
                alt={social.name}
                width={240}
                height={240}
                priority
                unoptimized
                className="w-full h-full object-cover grayscale contrast-[1.05]"
              />
            </div>
          </div>
        </div>

        {/* Hero Header Area */}
        <header className="space-y-3">
          <h1
            id="home-title"
            className="font-lora font-semibold text-[clamp(2.75rem,8vw,5.5rem)] leading-[1.0] text-ink tracking-tight"
          >
            {social.name}
          </h1>

          {/* Typewritten Byline Role in Courier Prime (§9.1.4) */}
          <div className="flex items-center gap-2 font-courier text-sm sm:text-base text-ink-2 tracking-wide">
            <span className="text-tape font-bold" aria-hidden="true">&gt;</span>
            <p className="font-bold">{social.role}</p>
          </div>
        </header>

        {/* Verbatim Intro Text in Source Serif (§9.1.4) */}
        <div className="max-w-[640px] space-y-4">
          <p className="font-serif text-[1.0625rem] sm:text-[1.125rem] leading-[1.65] text-ink">
            {social.intro}
          </p>

          <p className="font-serif italic text-sm sm:text-base text-ink-2 border-l-2 border-tape pl-3.5">
            &ldquo;{social.tagline}&rdquo;
          </p>
        </div>

        {/* Text-Link Actions (Circle in pen feel per §9.1.3, §9.1.4) */}
        <div className="pt-2 flex flex-wrap items-center gap-6 sm:gap-8">
          <a
            href="#projects"
            className="notebook-link font-courier font-bold text-sm sm:text-base text-ink py-2 inline-flex items-center gap-1.5 focus-visible:outline-none"
          >
            <span>See projects</span>
            <span aria-hidden="true" className="text-xs">&rarr;</span>
          </a>

          <a
            href={`mailto:${social.email}`}
            className="notebook-link font-courier font-bold text-sm sm:text-base text-ink py-2 inline-flex items-center gap-1.5 focus-visible:outline-none"
          >
            <span>Send an email</span>
            <span aria-hidden="true" className="text-xs">&#8599;</span>
          </a>
        </div>
      </div>
    </MarginaliaPage>
  );
}
