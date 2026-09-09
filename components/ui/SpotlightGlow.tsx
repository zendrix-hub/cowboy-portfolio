"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive Ambient Spotlight Glow
 * Casts a smooth, blurred cyan radial glow that tracks the cursor across the screen,
 * illuminating glassmorphic cards in the main content while keeping the sidebar crisp and intact.
 * Uses direct CSS variable updates via requestAnimationFrame for zero-re-render 60fps performance.
 */
export default function SpotlightGlow() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let rafId: number | null = null;
    let targetX = -1000;
    let targetY = -1000;

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          if (spotlightRef.current) {
            spotlightRef.current.style.setProperty("--spotlight-x", `${targetX}px`);
            spotlightRef.current.style.setProperty("--spotlight-y", `${targetY}px`);
            spotlightRef.current.style.opacity = "1";
          }
          rafId = null;
        });
      }
    };

    const handleMouseLeave = () => {
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = "0";
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 hidden lg:block transition-opacity duration-500 ease-out"
      style={{
        opacity: 0,
        background:
          "radial-gradient(650px circle at var(--spotlight-x, -1000px) var(--spotlight-y, -1000px), var(--spotlight-color, rgba(6, 182, 212, 0.12)), transparent 80%)",
      }}
    />
  );
}
