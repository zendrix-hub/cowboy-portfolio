"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { social } from "@/data/social";

export default function CurrentHero() {
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = portraitRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const vh = window.innerHeight;
          const aboutEl =
            document.getElementById("about-title") ||
            document.getElementById("about");

          if (aboutEl) {
            const rect = aboutEl.getBoundingClientRect();
            // Fading effect activates upon scrolling when the 'about' text reaches 70% of viewport
            const fadeStart = vh * 0.7;
            const fadeEnd = vh * 0.3;

            let opacity = 1;
            let progress = 0;

            if (rect.top <= fadeStart) {
              progress = Math.min(
                1,
                Math.max(0, (fadeStart - rect.top) / (fadeStart - fadeEnd))
              );
              opacity = Math.max(0, 1 - progress);
            }

            if (el) {
              el.style.opacity = opacity.toFixed(3);
              if (!prefersReducedMotion) {
                // Natural submersion drift as about scrolls into reading view
                const translateY = progress * 45;
                el.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`;
              }
            }
          } else {
            // Fallback if about element is not yet found
            const scrollY = window.scrollY || window.pageYOffset;
            const fadeStart = vh * 0.4;
            const fadeEnd = vh * 0.8;
            let opacity = 1;
            if (scrollY > fadeStart) {
              const progress = Math.min(
                1,
                Math.max(0, (scrollY - fadeStart) / (fadeEnd - fadeStart))
              );
              opacity = Math.max(0, 1 - progress);
            }
            if (el) {
              el.style.opacity = opacity.toFixed(3);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="zone-1 relative min-h-[85svh] flex flex-col justify-start px-6 sm:px-12 lg:px-20 pt-[50px] sm:pt-[56px] lg:pt-[60px] pb-10 sm:pb-14 select-text"
    >
      <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Reading Column: 7 columns (desktop), text on left */}
        <div className="lg:col-span-7 flex flex-col items-start max-w-[38rem]">
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
          <p className="mt-4 sm:mt-5 text-[1.25rem] font-medium text-[var(--fg-2)] tracking-normal">
            {social.role}
          </p>

          {/* Intro in Hanken 1.125rem / 1.7 */}
          <p className="mt-3 sm:mt-4 text-[1.125rem] leading-[1.7] text-[var(--fg)]">
            {social.intro}
          </p>

          {/* Actions: Primary pill & Secondary drawn link */}
          <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-6 sm:gap-8">
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

        {/* Channel Side: 5 columns (desktop), beautifully placed, centered on mobile, right-aligned on desktop */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end items-center pt-6 lg:pt-0">
          <div
            ref={portraitRef}
            className="relative w-full max-w-[19rem] sm:max-w-[22rem] lg:max-w-[25rem] will-change-transform"
          >
            {/* Luminous ambient lighting backdrop */}
            <div
              className="absolute inset-0 -m-6 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,var(--line)_0%,transparent_70%)] opacity-50 dark:opacity-20 pointer-events-none blur-3xl"
              aria-hidden="true"
            />

            <div className="relative w-full aspect-square current-portrait-mask">
              <Image
                src="/images/Riva_ID.png"
                alt={social.name}
                width={1254}
                height={1254}
                priority
                unoptimized
                className="w-full h-full object-contain brightness-[1.01] contrast-[1.02] dark:brightness-[0.96] dark:contrast-[1.01] transition-transform duration-500 ease-out hover:scale-[1.015]"
                sizes="(max-width: 640px) 19rem, (max-width: 1024px) 22rem, 25rem"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
