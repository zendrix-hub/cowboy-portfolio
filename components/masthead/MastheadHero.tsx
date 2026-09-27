"use client";

import React, { useSyncExternalStore } from "react";
import { social } from "@/data/social";

const emptySubscribe = () => () => {};

function getMastheadDrawSnapshot(): boolean {
  try {
    if (typeof window === "undefined") return false;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return false;

    const alreadySettled = sessionStorage.getItem("masthead-settled");
    if (!alreadySettled) {
      sessionStorage.setItem("masthead-settled", "true");
      return true;
    }
  } catch {
    // fallback
  }
  return false;
}

export function MastheadHero() {
  const shouldAnimate = useSyncExternalStore(
    emptySubscribe,
    getMastheadDrawSnapshot,
    () => false
  );

  return (
    <section
      id="hero"
      aria-labelledby="masthead-name"
      className="w-full max-w-[1200px] mx-auto pt-16 sm:pt-24 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 text-center"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Folio / Volume Header Info (strictly uninvented, verified publication meta) */}
        <div className="w-full flex items-center justify-between text-xs text-ink-2 pb-6 border-b border-ink-2/20">
          <span className="font-mono text-[11px] uppercase tracking-wider">Folio 01 // Front Page</span>
          <span className="font-mono text-[11px] tracking-wide">{social.location}</span>
        </div>

        {/* Top Horizontal Rule (Draws outward from center) */}
        <div
          className={`w-full h-[2px] bg-ink my-6 sm:my-8 rule-ink ${
            shouldAnimate ? "animate-rule-draw" : ""
          }`}
          aria-hidden="true"
        />

        {/* Nameplate Hero Title */}
        <div className={`w-full ${shouldAnimate ? "animate-fade-up" : ""}`}>
          <h1
            id="masthead-name"
            className="font-playfair font-bold text-[clamp(2.75rem,10vw,7.5rem)] leading-[0.95] tracking-tight text-ink py-2"
          >
            {social.name}
          </h1>
        </div>

        {/* Bottom Horizontal Rule (Draws outward from center) */}
        <div
          className={`w-full h-[2px] bg-ink my-6 sm:my-8 rule-ink ${
            shouldAnimate ? "animate-rule-draw" : ""
          }`}
          aria-hidden="true"
        />

        {/* Cover Line & Editorial Intro */}
        <div className={`space-y-6 max-w-2xl mx-auto pt-2 ${shouldAnimate ? "animate-fade-up" : ""}`}>
          <p className="font-playfair italic text-[clamp(1.25rem,2.5vw,1.75rem)] leading-[1.3] text-ink">
            {social.role}
          </p>

          <p className="font-sans text-[1.0625rem] leading-[1.65] text-ink">
            {social.intro}
          </p>

          {/* Text-Link Actions: Strictly no arrow glyphs per §9.2.2 and §9.2.14 */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-8 text-sm sm:text-base font-medium">
            <a
              href="#projects"
              className="masthead-link text-ink py-1 focus-visible:outline-none"
            >
              See projects
            </a>
            <a
              href={`mailto:${social.email}`}
              className="masthead-link text-ink py-1 focus-visible:outline-none"
            >
              Send an email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
