"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { social } from "@/data/social";
import {
  NecLogo,
  CitUniversityLogo,
  AwsLogo,
  IbmLogo,
  TechLogo,
} from "./BrandLogos";

const CORE_HERO_STACK = [
  "Kotlin",
  "Android SDK",
  "Java 17",
  "Spring Boot 3",
  "Python",
  "FastAPI",
  "Google Gemini API",
  "Docker",
];

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
                const translateY = progress * 45;
                el.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`;
              }
            }
          } else {
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
        <div className="lg:col-span-7 flex flex-col items-start max-w-[40rem]">
          {/* Recruiter & OJT Status Badge */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-mono text-[0.75rem] uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-semibold inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              AVAILABLE FOR 500-HR OJT &bull; SOFTWARE ENGINEER
            </span>
            <span className="font-mono text-[0.75rem] text-[var(--fg-2)]">
              CIT-U BSIT 4TH YEAR &bull; CEBU / REMOTE
            </span>
          </div>

          <span className="font-mono text-[0.8125rem] uppercase tracking-widest text-[var(--fg-2)] block mb-3">
            SECTION 01 // SOFTWARE ENGINEER & SYSTEM BUILDER
          </span>
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

          {/* Institutional Affiliations & Verified Credentials Strip */}
          <div className="mt-6 w-full pt-5 border-t border-[var(--line)]/20">
            <span className="font-mono text-[0.75rem] uppercase tracking-wider text-[var(--fg-2)] block mb-3">
              AFFILIATIONS & VERIFIED CREDENTIALS
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#experience"
                className="inline-flex items-center hover:scale-[1.02] transition-transform"
                title="Software Engineering Intern at NEC Telecom Software Philippines"
              >
                <NecLogo />
              </a>

              <a
                href="#experience"
                className="inline-flex items-center hover:scale-[1.02] transition-transform"
                title="Cebu Institute of Technology – University (BSIT)"
              >
                <CitUniversityLogo />
              </a>

              <a
                href="https://www.credly.com/go/e84CaxMW"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center hover:scale-[1.02] transition-transform"
                title="Verify AWS Academy Cloud Foundations & Cloud Architecting on Credly"
              >
                <AwsLogo />
              </a>

              <a
                href="https://www.credly.com/badges/a0c1b4ab-45eb-4e8c-9736-b7e00b66659e"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center hover:scale-[1.02] transition-transform"
                title="Verify IBM SkillsBuild AI Fundamentals on Credly"
              >
                <IbmLogo />
              </a>
            </div>
          </div>

          {/* Core Engineering Stack Quick Pills */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {CORE_HERO_STACK.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.78125rem] font-mono bg-[var(--tributary-surface)]/80 border border-[var(--line)]/25 text-[var(--fg)] shadow-xs"
              >
                <TechLogo name={tech} className="w-3.5 h-3.5 shrink-0" />
                <span>{tech}</span>
              </span>
            ))}
          </div>

          {/* Dual Quick-Actions for Recruiters and Engineering Managers */}
          <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3.5 sm:gap-4">
            <a
              href="/resume.pdf"
              download="RIVA_ZendrixB_BSIT_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="primary-pill focus-visible:ring-2 focus-visible:ring-[var(--focus)] inline-flex items-center gap-2 text-[0.9375rem] font-semibold cursor-pointer"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download Resume (PDF)</span>
              <span className="text-[0.6875rem] opacity-75 font-mono ml-0.5">54 KB</span>
            </a>

            <a
              href="#projects"
              className="px-4 py-2.5 rounded-full border border-[var(--line)]/40 bg-[var(--tributary-surface)]/70 text-[var(--fg)] hover:border-[var(--line)] hover:bg-[var(--line)]/10 font-medium text-[0.9375rem] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--focus)]"
            >
              View Projects
            </a>

            <a
              href={`mailto:${social.email}`}
              className="drawn-link text-[1rem] font-medium text-[var(--fg)] ml-1"
            >
              <span>{social.email}</span>
              <svg
                width="14"
                height="14"
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

        {/* Channel Side: 5 columns (desktop), full increased size with smooth current float animation */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end items-center pt-8 lg:pt-0">
          <div
            ref={portraitRef}
            className="relative w-full max-w-[21rem] sm:max-w-[26rem] lg:max-w-[31rem] xl:max-w-[33rem] will-change-transform animate-portrait-enter"
          >
            {/* Inner Floating Buoyancy Wrapper */}
            <div className="relative w-full aspect-square animate-current-float">
              {/* Luminous ambient lighting backdrop with gentle pulse */}
              <div
                className="absolute inset-0 -m-8 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.75)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,var(--line)_0%,transparent_70%)] opacity-50 dark:opacity-25 pointer-events-none blur-3xl animate-ambient-pulse"
                aria-hidden="true"
              />

              <div className="relative w-full h-full aspect-square current-portrait-mask">
                <Image
                  src="/images/Riva_ID.png"
                  alt={social.name}
                  width={1254}
                  height={1254}
                  priority
                  unoptimized
                  className="w-full h-full object-contain brightness-[1.01] contrast-[1.02] dark:brightness-[0.96] dark:contrast-[1.01] transition-transform duration-500 ease-out hover:scale-[1.02]"
                  sizes="(max-width: 640px) 21rem, (max-width: 1024px) 26rem, 33rem"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
