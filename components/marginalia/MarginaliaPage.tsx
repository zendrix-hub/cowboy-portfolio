"use client";

import React, { useSyncExternalStore } from "react";
import { TapeStrip } from "./TapeStrip";

interface MarginaliaPageProps {
  id: string;
  pageNumber: number;
  rotation?: number; // seeded rotation in degrees (-1.5 to 1.5)
  leftTapeRotation?: number;
  rightTapeRotation?: number;
  isHero?: boolean;
  isLast?: boolean;
  marginContent?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const TORN_EDGES = [
  "polygon(0% 12px, 3% 6px, 7% 14px, 12% 4px, 18% 12px, 24% 6px, 31% 15px, 38% 5px, 45% 12px, 52% 7px, 59% 14px, 66% 5px, 73% 13px, 80% 6px, 87% 14px, 94% 5px, 100% 11px, 100% 100%, 0% 100%)",
  "polygon(0% 8px, 4% 15px, 9% 5px, 15% 13px, 21% 7px, 28% 16px, 35% 6px, 42% 14px, 49% 8px, 56% 15px, 63% 6px, 70% 13px, 77% 7px, 84% 15px, 91% 6px, 97% 12px, 100% 7px, 100% 100%, 0% 100%)",
  "polygon(0% 14px, 5% 7px, 11% 15px, 17% 6px, 23% 13px, 30% 7px, 37% 16px, 44% 5px, 51% 14px, 58% 8px, 65% 15px, 72% 6px, 79% 14px, 86% 7px, 93% 15px, 98% 8px, 100% 13px, 100% 100%, 0% 100%)",
  "polygon(0% 6px, 4% 13px, 10% 5px, 16% 14px, 22% 8px, 29% 15px, 36% 6px, 43% 13px, 50% 7px, 57% 16px, 64% 5px, 71% 14px, 78% 8px, 85% 15px, 92% 6px, 98% 11px, 100% 5px, 100% 100%, 0% 100%)",
  "polygon(0% 11px, 6% 5px, 12% 14px, 19% 7px, 25% 15px, 32% 6px, 39% 13px, 46% 8px, 53% 16px, 60% 6px, 67% 14px, 74% 7px, 81% 15px, 88% 5px, 95% 13px, 100% 9px, 100% 100%, 0% 100%)",
  "polygon(0% 9px, 5% 14px, 11% 6px, 17% 15px, 24% 7px, 31% 14px, 38% 6px, 45% 15px, 52% 8px, 59% 14px, 66% 5px, 73% 13px, 80% 7px, 87% 16px, 94% 6px, 100% 12px, 100% 100%, 0% 100%)",
];

const emptySubscribe = () => () => {};

function getHeroSettleSnapshot(): boolean {
  try {
    if (typeof window === "undefined") return false;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return false;

    const alreadySettled = sessionStorage.getItem("marginalia-settled");
    if (!alreadySettled) {
      sessionStorage.setItem("marginalia-settled", "true");
      return true;
    }
  } catch {
    // fallback
  }
  return false;
}

export function MarginaliaPage({
  id,
  pageNumber,
  rotation = 0,
  leftTapeRotation = -3,
  rightTapeRotation = 2.5,
  isHero = false,
  isLast = false,
  marginContent,
  children,
  className = "",
}: MarginaliaPageProps) {
  const shouldAnimate = useSyncExternalStore(
    emptySubscribe,
    isHero ? getHeroSettleSnapshot : () => false,
    () => false
  );

  const tornClip = TORN_EDGES[(pageNumber - 1) % TORN_EDGES.length];

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative w-full max-w-[900px] mx-auto ${
        isLast ? "mb-0" : "-mb-10 sm:-mb-12"
      } px-3 sm:px-6 select-text ${className}`}
      style={
        {
          zIndex: pageNumber * 10,
          "--seeded-rotation": `${rotation}deg`,
        } as React.CSSProperties
      }
    >
      {/* Outer Anchor Wrapper holding Fixed Tape Strips (§9.1.4) */}
      <div className="relative w-full">
        {/* Top Tape Strips (Stationary on desk, holding page down) */}
        <TapeStrip
          rotation={leftTapeRotation}
          className="-top-3 sm:-top-3.5 left-8 sm:left-12"
        />
        <TapeStrip
          rotation={rightTapeRotation}
          className="-top-3 sm:-top-3.5 right-8 sm:right-12"
        />

        {/* The Page Container with Torn Edge & Seeded Rotation */}
        <article
          className={`notebook-page relative w-full bg-paper text-ink shadow-lift pt-9 sm:pt-12 pb-8 sm:pb-10 px-5 sm:px-8 lg:px-12 transition-shadow duration-200 ${
            shouldAnimate ? "animate-page-settle" : ""
          }`}
          style={{
            clipPath: tornClip,
            transform: shouldAnimate ? undefined : `rotate(${rotation}deg)`,
          }}
        >
          {/* Internal Grid: Desktop Left Margin Column (~18%) + Reading Column */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Desktop Margin Column (§9.1.2: ~18% width for annotations) */}
            <aside
              className="lg:col-span-3 flex flex-col justify-start space-y-4 pt-1 order-2 lg:order-1"
              aria-label="Margin annotations"
            >
              {marginContent ? (
                <div className="text-sm font-caveat text-ink-2 leading-relaxed">
                  {marginContent}
                </div>
              ) : (
                <div className="hidden lg:block w-full h-8" aria-hidden="true" />
              )}
            </aside>

            {/* Main Reading Column (Max 640px) */}
            <div className="lg:col-span-9 w-full order-1 lg:order-2 flex flex-col space-y-6">
              {children}
            </div>
          </div>

          {/* Page Number (bottom right, Courier Prime meta per §9.1.2) */}
          <div
            aria-hidden="true"
            className="w-full flex justify-end items-center pt-6 mt-6 border-t border-ink-2/15 font-courier text-xs sm:text-[0.8125rem] text-ink-2 select-none tracking-wider"
          >
            <span>p. {pageNumber}</span>
          </div>
        </article>
      </div>
    </section>
  );
}
