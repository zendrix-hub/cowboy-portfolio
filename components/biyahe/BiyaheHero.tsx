"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import { social } from "@/data/social";

const emptySubscribe = () => () => {};

function getRollSnapshot(): boolean {
  try {
    const alreadyPlayed = sessionStorage.getItem("biyahe-rolled");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!alreadyPlayed && !prefersReducedMotion) {
      sessionStorage.setItem("biyahe-rolled", "true");
      return true;
    }
  } catch {
    // Fallback
  }
  return false;
}

const ROLL_SECTIONS = [
  "BIYAHE EXPRESS",
  "CEBU ➔ MANILA",
  "FULL-STACK ROUTE",
  "ANDROID / BACKEND",
  social.displayName.toUpperCase(),
];

export default function BiyaheHero() {
  const shouldAnimate = useSyncExternalStore(
    emptySubscribe,
    getRollSnapshot,
    () => false
  );

  return (
    <section
      id="home"
      className="bg-[#1B3FD1] text-white py-12 sm:py-20 lg:py-28 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Main Sun Destination Board (§6.1.4) */}
        <div className="biyahe-board bg-[#FFC72C] text-black p-6 sm:p-8 lg:p-10 relative">
          {/* Decorative Lamp Dots along top edge */}
          <div
            className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
            aria-hidden="true"
          >
            {[...Array(9)].map((_, i) => (
              <span
                key={i}
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-black border border-[#CC9F23] inline-block"
              />
            ))}
          </div>

          {/* Roll Sign Container / Final H1 */}
          <div className="relative overflow-hidden h-14 sm:h-24 lg:h-32 mb-4">
            {shouldAnimate ? (
              <div
                className="flex flex-col animate-roll-sign"
                style={{
                  animation:
                    "rollSign 850ms steps(4, end) forwards",
                }}
              >
                {ROLL_SECTIONS.map((text, idx) => {
                  const isFinal = idx === ROLL_SECTIONS.length - 1;
                  return isFinal ? (
                    <h1
                      key={idx}
                      className="font-bungee text-3xl sm:text-6xl lg:text-7xl leading-none tracking-tight text-black shrink-0 h-14 sm:h-24 lg:h-32 flex items-center"
                    >
                      {social.displayName.toUpperCase()}
                    </h1>
                  ) : (
                    <div
                      key={idx}
                      aria-hidden="true"
                      className="font-bungee text-3xl sm:text-6xl lg:text-7xl leading-none tracking-tight text-black opacity-80 shrink-0 h-14 sm:h-24 lg:h-32 flex items-center"
                    >
                      {text}
                    </div>
                  );
                })}
              </div>
            ) : (
              <h1 className="font-bungee text-3xl sm:text-6xl lg:text-7xl leading-none tracking-tight text-black shrink-0 h-full flex items-center">
                {social.displayName.toUpperCase()}
              </h1>
            )}
          </div>

          {/* Cobalt Role Plate Below Name */}
          <div className="inline-block mt-1">
            <div className="biyahe-plate bg-[#1B3FD1] text-white px-4 py-2 sm:px-6 sm:py-2.5 font-lexend font-bold text-sm sm:text-base lg:text-lg tracking-wide uppercase">
              {social.role}
            </div>
          </div>
        </div>

        {/* Intro, Avatar, and Action Plates (§6.1.4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Intro Reading Plate & Avatar */}
          <div className="lg:col-span-8 flex flex-col sm:flex-row items-center sm:items-start gap-4 p-5 sm:p-6 biyahe-plate bg-white dark:bg-[#131E57] text-black dark:text-white">
            {/* Framed Avatar Plate */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 biyahe-plate overflow-hidden bg-[#FFC72C] relative">
              <Image
                src="/images/avatar.webp"
                alt="Zendrix Riva"
                width={96}
                height={96}
                className="w-full h-full object-cover object-top"
                priority
              />
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <div className="font-bungee text-xs text-[#E4262A] dark:text-[#FFC72C] uppercase tracking-wider">
                PASSENGER MANIFEST // INTRO
              </div>
              <p className="font-lexend text-base sm:text-lg leading-relaxed text-black dark:text-white font-medium max-w-[65ch]">
                {social.intro}
              </p>
            </div>
          </div>

          {/* Action CTAs: Two Pressable Plates */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 w-full">
            <a
              href="#projects"
              style={{ ["--depth-color" as string]: "#B61E22" }}
              className="pressable-plate flex-1 min-h-[52px] sm:min-h-[56px] px-6 py-3.5 bg-[#E4262A] text-white font-bungee text-center text-sm sm:text-base tracking-wide flex items-center justify-center gap-2"
            >
              <span>SEE PROJECTS</span>
              <span aria-hidden="true">➔</span>
            </a>

            <a
              href={`mailto:${social.email}`}
              style={{ ["--depth-color" as string]: "#CCCCCC" }}
              className="pressable-plate flex-1 min-h-[52px] sm:min-h-[56px] px-6 py-3.5 bg-white dark:bg-[#FFC72C] text-black font-bungee text-center text-sm sm:text-base tracking-wide flex items-center justify-center gap-2"
            >
              <span>SEND AN EMAIL</span>
              <span aria-hidden="true">✉</span>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes rollSign {
          0% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(-80%);
          }
        }
      `}</style>
    </section>
  );
}
