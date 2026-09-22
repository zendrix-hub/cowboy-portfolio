"use client";

import React, { useRef, useState, useEffect, useSyncExternalStore } from "react";

interface RevisionCloudProps {
  status: string;
  className?: string;
}

const subscribeReducedMotion = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};

const getReducedMotionSnapshot = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const getReducedMotionServerSnapshot = () => false;

/**
 * Orchestrated moment: Redline revision cloud per §6.2.7 & §6.2.11:
 * - Status typeset in Kalam in --redline at 1.25rem or larger.
 * - Single static inline SVG positioned around status with inset: -14px -18px.
 * - viewBox="0 0 240 90", preserveAspectRatio="none", aria-hidden="true".
 * - pathLength="1" and vector-effect="non-scaling-stroke".
 * - When 60% visible: cloud draws over 800ms linear, then revision triangle fades in over 160ms.
 * - Status text is real text and visible the whole time.
 * - Reduced motion or already visible at hydration: fully drawn state instantly.
 */
export function RevisionCloud({ status, className = "" }: RevisionCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const [hasIntersected, setHasIntersected] = useState(false);
  const [isAnimationCompleted, setIsAnimationCompleted] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasIntersected(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.6,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const isDrawn = prefersReducedMotion || isAnimationCompleted;
  const isAnimating = !prefersReducedMotion && hasIntersected && !isAnimationCompleted;

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center justify-center px-4 py-1.5 select-none ${className}`}
    >
      {/* 
        Revision Triangle per §6.2.11:
        16px SVG M1 15 L8 1 L15 15 Z, no fill (fill with --sheet behind it so cloud line does not cross it),
        placed on cloud's top-left corner.
      */}
      <svg
        className={`absolute -top-2 -left-2 w-4 h-4 z-20 text-redline ${
          isDrawn
            ? "opacity-100"
            : isAnimating
            ? "fade-in-triangle"
            : "opacity-0"
        }`}
        viewBox="0 0 16 16"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M1 15 L8 1 L15 15 Z"
          fill="var(--sheet)"
          stroke="var(--redline)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* 
        Cloud SVG per §6.2.11:
        Absolute positioned around status (inset: -14px -18px), viewBox="0 0 240 90".
        Exact path with 12 scallops on long sides, 4 on short sides.
      */}
      <svg
        className="absolute -inset-x-[18px] -inset-y-[14px] w-[calc(100%+36px)] h-[calc(100%+28px)] pointer-events-none z-10"
        viewBox="0 0 240 90"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M12 12 A9 9 0 0 1 30 12 A9 9 0 0 1 48 12 A9 9 0 0 1 66 12 A9 9 0 0 1 84 12 A9 9 0 0 1 102 12 A9 9 0 0 1 120 12 A9 9 0 0 1 138 12 A9 9 0 0 1 156 12 A9 9 0 0 1 174 12 A9 9 0 0 1 192 12 A9 9 0 0 1 210 12 A9 9 0 0 1 228 12 A8.25 8.25 0 0 1 228 28.5 A8.25 8.25 0 0 1 228 45 A8.25 8.25 0 0 1 228 61.5 A8.25 8.25 0 0 1 228 78 A9 9 0 0 1 210 78 A9 9 0 0 1 192 78 A9 9 0 0 1 174 78 A9 9 0 0 1 156 78 A9 9 0 0 1 138 78 A9 9 0 0 1 120 78 A9 9 0 0 1 102 78 A9 9 0 0 1 84 78 A9 9 0 0 1 66 78 A9 9 0 0 1 48 78 A9 9 0 0 1 30 78 A9 9 0 0 1 12 78 A8.25 8.25 0 0 1 12 61.5 A8.25 8.25 0 0 1 12 45 A8.25 8.25 0 0 1 12 28.5 A8.25 8.25 0 0 1 12 12 Z"
          fill="none"
          stroke="var(--redline)"
          strokeWidth="2"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={isDrawn ? 0 : 1}
          vectorEffect="non-scaling-stroke"
          className={isAnimating ? "draw-redline" : ""}
          onAnimationEnd={() => setIsAnimationCompleted(true)}
        />
      </svg>

      {/* Real accessible status text in Kalam font, visible the entire time */}
      <span className="relative z-10 font-kalam text-[1.25rem] sm:text-[1.375rem] text-redline leading-none tracking-normal">
        {status}
      </span>
    </div>
  );
}
