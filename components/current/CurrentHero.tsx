import React from "react";
import Image from "next/image";
import { social } from "@/data/social";

export default function CurrentHero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="zone-1 relative min-h-[90svh] flex flex-col justify-between px-6 sm:px-12 lg:px-20 pt-[clamp(140px,18vh,220px)] pb-[clamp(80px,10vh,140px)] select-text"
    >
      <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
        {/* Reading Column: 7 columns (desktop), text on left */}
        <div className="lg:col-span-8 flex flex-col items-start max-w-[36rem]">
          {/* Name in Fraunces 300 with origin marker */}
          <h1
            id="hero-title"
            className="font-fraunces text-[clamp(3.5rem,11.5vw,10.5rem)] leading-[0.92] tracking-normal text-[var(--fg)] relative m-0"
          >
            <span>{social.name}</span>
            {/* Zero-size origin node marker measured by CurrentLine (§6.3.4, §6.3.12) */}
            <span
              id="hero-line-origin"
              data-origin="true"
              className="inline-block w-0 h-0 overflow-hidden opacity-0 pointer-events-none align-baseline"
              aria-hidden="true"
            />
          </h1>

          {/* Role in Hanken 500 1.25rem */}
          <p className="mt-8 text-[1.25rem] font-medium text-[var(--fg-2)] tracking-normal">
            {social.role}
          </p>

          {/* Intro in Hanken 1.125rem / 1.7 */}
          <p className="mt-6 text-[1.125rem] leading-[1.7] text-[var(--fg)]">
            {social.intro}
          </p>

          {/* Actions: Primary pill & Secondary drawn link */}
          <div className="mt-10 flex flex-wrap items-center gap-6 sm:gap-8">
            <a
              href="#projects"
              className="primary-pill focus-visible:ring-2 focus-visible:ring-[var(--focus)]"
            >
              See projects
            </a>

            <a
              href={`mailto:${social.email}`}
              className="drawn-link text-[1.0625rem] font-medium text-[var(--fg)]"
            >
              <span>Send an email</span>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-70"
                aria-hidden="true"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </div>

        {/* Channel Side: 4 columns (desktop), unframed 3:4 editorial portrait with soft bottom dissolve */}
        <div className="lg:col-span-4 flex justify-start lg:justify-end items-center pt-4 lg:pt-0">
          <div className="w-full max-w-[15rem] sm:max-w-[17rem] lg:max-w-[20rem] aspect-[3/4] overflow-hidden current-portrait-mask">
            <Image
              src="/images/Riva_ID.png"
              alt={social.name}
              width={400}
              height={533}
              priority
              className="w-full h-full object-cover object-top brightness-[1.02] contrast-[1.02] dark:brightness-[0.94] dark:contrast-[1.01] transition-[transform,filter] duration-700 ease-out hover:scale-[1.015]"
              sizes="(max-width: 640px) 15rem, (max-width: 1024px) 17rem, 20rem"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
