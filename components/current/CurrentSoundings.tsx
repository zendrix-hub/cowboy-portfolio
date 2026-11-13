import React from "react";
import { soundings } from "@/data/soundings";

/**
 * Soundings: headline facts, each with a link to where it can be checked.
 * (A sounding is a depth measurement — it fits the page's water metaphor.)
 */
export default function CurrentSoundings() {
  return (
    <div
      className="w-full max-w-[1440px] mx-auto relative z-10 mt-10 sm:mt-12 lg:pr-16"
      role="group"
      aria-labelledby="soundings-title"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-3">
        <span
          id="soundings-title"
          className="font-mono text-[0.75rem] uppercase tracking-wider text-[var(--fg-2)]"
        >
          SOUNDINGS // FIVE FACTS YOU CAN CHECK
        </span>
        <span className="font-mono text-[0.6875rem] text-[var(--fg-2)]">
          Each figure links to its source
        </span>
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 list-none m-0 p-0">
        {soundings.map((s) => (
          <li
            key={s.label}
            className="p-3.5 rounded-xl bg-[var(--tributary-surface)]/75 border border-[var(--line)]/25 flex flex-col"
          >
            <span className="font-fraunces text-[1.5rem] leading-tight text-[var(--fg)] font-normal">
              {s.figure}
            </span>
            <span className="mt-1.5 text-[0.8125rem] font-medium text-[var(--fg)] leading-snug">
              {s.label}
            </span>
            <span className="mt-0.5 font-mono text-[0.6875rem] text-[var(--fg-2)] leading-tight">
              {s.detail}
            </span>
            <a
              href={s.sourceHref}
              {...(s.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="drawn-link mt-auto pt-2.5 font-mono text-[0.6875rem] font-semibold text-[var(--fg)]"
              aria-label={`Source for "${s.figure} ${s.label}": ${s.sourceLabel}${
                s.external ? " (opens in a new tab)" : ""
              }`}
            >
              <span>Source: {s.sourceLabel}</span>
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {s.external ? (
                  <>
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </>
                ) : (
                  <>
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                  </>
                )}
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
