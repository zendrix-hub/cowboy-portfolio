import React from "react";
import type { ArchitectureStep, ProjectEvaluation } from "@/data/projects";

/**
 * Field-evaluation results for a project: real numbers, each with its basis.
 */
export function ProjectEvaluationPanel({
  id,
  evaluation,
}: {
  id: string;
  evaluation: ProjectEvaluation;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-24 mt-8 w-full p-5 sm:p-6 rounded-2xl bg-[var(--tributary-surface)]/75 border border-[var(--line)]/30"
    >
      <span className="font-mono text-[0.75rem] uppercase tracking-wider text-[var(--fg-2)] block">
        EVIDENCE // MEASURED WITH USERS
      </span>
      <h4
        id={`${id}-title`}
        className="mt-1.5 font-fraunces text-[1.5rem] leading-[1.2] text-[var(--fg)] font-normal m-0"
      >
        {evaluation.title}
      </h4>
      <p className="mt-2 text-[0.96875rem] leading-[1.6] text-[var(--fg)]">
        {evaluation.summary}
      </p>

      <dl className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5 m-0">
        {evaluation.results.map((r) => (
          <div
            key={r.label}
            className="p-3 rounded-xl bg-[var(--zone-bg)]/60 border border-[var(--line)]/20 flex flex-col-reverse justify-end"
          >
            <dt className="mt-1 text-[0.8125rem] leading-snug text-[var(--fg)]">
              {r.label}
              <span className="block mt-0.5 font-mono text-[0.6875rem] text-[var(--fg-2)]">
                {r.basis}
              </span>
            </dt>
            <dd className="m-0 font-fraunces text-[1.5rem] leading-tight text-[var(--fg)]">
              {r.figure}
            </dd>
          </div>
        ))}
      </dl>

      {evaluation.quote && (
        <figure className="mt-4 m-0 border-l-2 border-[var(--line)]/50 pl-4">
          <blockquote className="m-0 text-[1rem] leading-[1.6] italic text-[var(--fg)]">
            &ldquo;{evaluation.quote.text}&rdquo;
          </blockquote>
          <figcaption className="mt-1 font-mono text-[0.75rem] text-[var(--fg-2)]">
            {evaluation.quote.source}
          </figcaption>
        </figure>
      )}

      <p className="mt-4 font-mono text-[0.6875rem] leading-snug text-[var(--fg-2)]">
        {evaluation.note}
      </p>
    </section>
  );
}

/**
 * "Decisions I made": the trade-off behind each stage of the system,
 * folded shut by default so it does not slow down a quick scan.
 */
export function ProjectDecisions({
  steps,
  projectTitle,
  planned = false,
}: {
  steps: ArchitectureStep[];
  projectTitle: string;
  planned?: boolean;
}) {
  const decisions = steps.filter((s) => s.tradeoff);
  if (decisions.length === 0) return null;

  return (
    <details className="project-decisions group mt-7 w-full rounded-xl border border-[var(--line)]/30 bg-[var(--tributary-surface)]/60">
      <summary className="min-h-[44px] px-4 py-2.5 flex items-center justify-between gap-3 cursor-pointer list-none rounded-xl text-[var(--fg)]">
        <span className="flex flex-col">
          <span className="text-[0.96875rem] font-medium">
            {planned ? "Decisions in the design" : "Decisions I made"}
            <span className="sr-only"> for {projectTitle}</span>
          </span>
          <span className="font-mono text-[0.6875rem] text-[var(--fg-2)]">
            {decisions.length} trade-offs, and why
          </span>
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 transition-transform duration-300 group-open:rotate-180"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </summary>

      <ol className="m-0 px-4 pb-4 pt-1 list-none space-y-3 border-t border-[var(--line)]/20">
        {decisions.map((d, idx) => (
          <li key={d.title} className="pt-3 flex items-start gap-3">
            <span
              className="mt-0.5 font-mono text-[0.75rem] text-[var(--fg-2)] tabular-nums shrink-0"
              aria-hidden="true"
            >
              {String(idx + 1).padStart(2, "0")}
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-[0.9375rem] font-medium text-[var(--fg)]">
                {d.title}
              </span>
              <span className="text-[0.9375rem] leading-[1.6] text-[var(--fg)]">
                {d.tradeoff}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </details>
  );
}
