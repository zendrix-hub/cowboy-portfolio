"use client";

import React, { useEffect } from "react";
import { projects } from "@/data/projects";
import {
  useCurrentContext,
  TRIBUTARIES,
  type TributaryId,
} from "./CurrentContext";
import {
  TributaryStationVisualizer,
  TributaryArchitectureFlow,
} from "./TributaryTelemetry";

function mapProjectTitleToTributaryId(
  title: string
): Exclude<TributaryId, "none"> {
  const lower = title.toLowerCase();
  if (lower.includes("daloy")) return "daloyaqua";
  if (lower.includes("playit")) return "playit";
  if (lower.includes("readhub")) return "readhub";
  return "gordon-ramsai";
}

export default function CurrentProjects() {
  const { activeTributary, setActiveTributary } = useCurrentContext();

  const daloyAqua =
    projects.find((p) => p.title === "DaloyAqua") || projects[2];
  const supportingProjects = projects.filter(
    (p) => p.title !== daloyAqua.title
  );

  // Observe individual project tributaries in the center of the viewport
  useEffect(() => {
    const projectSection = document.getElementById("projects");
    if (!projectSection) return;

    const tributaryElements = Array.from(
      projectSection.querySelectorAll<HTMLElement>("[data-tributary-section]")
    );

    const tributaryObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tribId = entry.target.getAttribute(
              "data-tributary-section"
            ) as TributaryId | null;
            if (tribId) {
              setActiveTributary(tribId);
            }
          }
        });
      },
      {
        rootMargin: "-35% 0px -35% 0px",
        threshold: 0,
      }
    );

    tributaryElements.forEach((el) => tributaryObserver.observe(el));

    // Reset tributary to "none" when leaving the #projects section completely
    const sectionExitObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setActiveTributary("none");
          }
        });
      },
      {
        rootMargin: "-10% 0px -10% 0px",
        threshold: 0,
      }
    );

    sectionExitObserver.observe(projectSection);

    return () => {
      tributaryObserver.disconnect();
      sectionExitObserver.disconnect();
    };
  }, [setActiveTributary]);

  const activeMeta =
    activeTributary !== "none" ? TRIBUTARIES[activeTributary] : null;

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      data-active-tributary={activeTributary}
      className="zone-3 relative min-h-screen px-6 sm:px-12 lg:px-20 py-[clamp(140px,18vh,220px)] select-text"
    >
      {/* Subtle Ambient Hydrodynamic Glow matching active project tributary */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden z-0 transition-opacity duration-700"
        aria-hidden="true"
      >
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_75%_35%,var(--tributary-glow)_0%,transparent_65%)] opacity-60 transition-all duration-700" />
      </div>

      <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-24 sm:gap-32 relative z-10">
        {/* Section Heading & Hydrological Basin Telemetry Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[var(--line)]/25 pb-8">
          <div className="max-w-[38rem]">
            <span className="font-mono text-[0.8125rem] uppercase tracking-widest text-[var(--fg-2)] block mb-3">
              ZONE 03 // THE RIVER BASIN • 250m–550m DEPTH
            </span>
            <h2
              id="projects-title"
              className="font-fraunces text-[clamp(2.75rem,7vw,6rem)] leading-[1.0] text-[var(--fg)] tracking-normal m-0"
            >
              Projects
            </h2>
          </div>

          {/* Active Tributary Quick Switcher Bar */}
          <div className="flex flex-col items-start lg:items-end gap-2">
            <span className="font-mono text-[0.75rem] uppercase tracking-wider text-[var(--fg-2)]">
              {activeMeta
                ? `ACTIVE STREAM // ${activeMeta.tributaryName.toUpperCase()} (${activeMeta.depthMeters}m)`
                : "BASIN OVERVIEW // 4 HYDROLOGICAL TRIBUTARIES"}
            </span>
            <div
              className="flex flex-wrap items-center gap-2"
              role="navigation"
              aria-label="Project Tributary Jump Links"
            >
              {(
                [
                  "daloyaqua",
                  "playit",
                  "readhub",
                  "gordon-ramsai",
                ] as Exclude<TributaryId, "none">[]
              ).map((tId) => {
                const tMeta = TRIBUTARIES[tId];
                const isCurr = activeTributary === tId;
                return (
                  <a
                    key={tId}
                    href={`#${tMeta.anchorId}`}
                    className={`px-3 py-1.5 rounded-full font-mono text-[0.75rem] border transition-all duration-300 ${
                      isCurr
                        ? "border-[var(--line)] bg-[var(--line)] text-[var(--zone-bg)] font-semibold shadow-sm"
                        : "border-[var(--line)]/35 bg-[var(--tributary-surface)]/50 text-[var(--fg)] hover:border-[var(--line)]"
                    }`}
                  >
                    {tMeta.projectTitle} • {tMeta.depthMeters}m
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Featured Project: The Eddy Chamber (DaloyAqua) (§6.3.7) */}
        <article
          id={TRIBUTARIES.daloyaqua.anchorId}
          data-tributary-section="daloyaqua"
          aria-labelledby="featured-project-title"
          className="scroll-mt-24 relative min-h-[85svh] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Reading Column: 7 columns (desktop), text on left */}
          <div className="lg:col-span-7 flex flex-col items-start max-w-[40rem]">
            {/* Tributary Coordinate & Status */}
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="w-3.5 h-3.5 rounded-full border-2 border-[var(--line)] bg-[var(--line)]/25"
                aria-hidden="true"
              />
              <span className="font-mono text-[0.8125rem] uppercase tracking-wider text-[var(--fg-2)]">
                {TRIBUTARIES.daloyaqua.depthLabel}
              </span>
              <span className="text-[var(--fg-2)] opacity-50" aria-hidden="true">
                •
              </span>
              <span className="text-[0.9375rem] font-medium text-[var(--fg)]">
                {daloyAqua.status || "Primary Eddy Chamber"}
              </span>
            </div>

            {/* Featured Title */}
            <h3
              id="featured-project-title"
              className="mt-5 font-fraunces text-[clamp(2.5rem,6vw,5.25rem)] leading-[1.0] text-[var(--fg)] font-normal m-0"
            >
              {daloyAqua.title}
            </h3>

            {daloyAqua.subtitle && (
              <p className="mt-2 text-[1.25rem] font-medium text-[var(--fg-2)]">
                {daloyAqua.subtitle}
              </p>
            )}

            {/* Description */}
            <p className="mt-6 text-[1.125rem] leading-[1.7] text-[var(--fg)]">
              {daloyAqua.description}
            </p>

            {/* Problem & Architectural Approach */}
            <p className="mt-4 text-[1.0625rem] leading-[1.65] text-[var(--fg-2)]">
              {daloyAqua.problem}
            </p>

            {/* Interactive Tributary Architecture Pipeline */}
            <TributaryArchitectureFlow
              steps={daloyAqua.architectureSteps}
              projectTitle={daloyAqua.title}
            />

            {/* Stack line */}
            <div className="mt-8 flex flex-col gap-1.5">
              <span className="text-[0.875rem] font-mono uppercase tracking-wider text-[var(--fg-2)]">
                Hydrological Stack & Tooling
              </span>
              <div className="flex flex-wrap gap-2 mt-1">
                {daloyAqua.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-[0.875rem] bg-[var(--tributary-surface)] border border-[var(--line)]/25 text-[var(--fg)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              {daloyAqua.githubUrl && (
                <a
                  href={daloyAqua.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="drawn-link text-[1.0625rem] font-medium"
                  aria-label={`Source code for ${daloyAqua.title}`}
                >
                  <span>Source code</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              )}
              {daloyAqua.liveUrl && (
                <a
                  href={daloyAqua.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="drawn-link text-[1.0625rem] font-medium"
                  aria-label={`Open ${daloyAqua.title}`}
                >
                  <span>Open project</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Right Channel Eddy Node & Live Telemetry Visualizer */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center h-full relative">
            <TributaryStationVisualizer
              tributaryId="daloyaqua"
              isActive={activeTributary === "daloyaqua"}
              nodeId="node-daloyaqua"
              isEddy={true}
            />
          </div>
        </article>

        {/* Supporting Projects: Tributary Stations (§6.3.7) */}
        <div className="flex flex-col gap-28 sm:gap-36 mt-8">
          {supportingProjects.map((project, idx) => {
            const nodeId = `node-project-${idx}`;
            const tribId = mapProjectTitleToTributaryId(project.title);
            const tMeta = TRIBUTARIES[tribId];
            const isStationActive = activeTributary === tribId;

            return (
              <article
                key={project.title}
                id={tMeta.anchorId}
                data-tributary-section={tribId}
                aria-labelledby={`project-${idx}-title`}
                className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative"
              >
                {/* Station Reading Block */}
                <div className="lg:col-span-7 flex flex-col items-start max-w-[40rem]">
                  {/* Tributary Coordinate & Status */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`w-3 h-3 rounded-full border-2 border-[var(--line)] transition-colors duration-500 ${
                        isStationActive ? "bg-[var(--line)]" : "bg-transparent"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="font-mono text-[0.8125rem] uppercase tracking-wider text-[var(--fg-2)]">
                      {tMeta.depthLabel}
                    </span>
                    {project.status && (
                      <>
                        <span
                          className="text-[var(--fg-2)] opacity-50"
                          aria-hidden="true"
                        >
                          •
                        </span>
                        <span className="text-[0.9375rem] font-medium text-[var(--fg-2)] tracking-wide">
                          {project.status}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Title in Fraunces 300 station scale */}
                  <h3
                    id={`project-${idx}-title`}
                    className="mt-4 font-fraunces text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.08] text-[var(--fg)] font-normal m-0"
                  >
                    {project.liveUrl || project.githubUrl ? (
                      <a
                        href={project.liveUrl || project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="drawn-link"
                        aria-label={`Open ${project.title}`}
                      >
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>

                  {project.subtitle && (
                    <p className="mt-1.5 text-[1.1875rem] text-[var(--fg-2)] font-medium">
                      {project.subtitle}
                    </p>
                  )}

                  {/* Description */}
                  <p className="mt-5 text-[1.0625rem] leading-[1.7] text-[var(--fg)]">
                    {project.description}
                  </p>

                  {/* Problem statement */}
                  {project.problem && (
                    <p className="mt-3 text-[1rem] leading-[1.65] text-[var(--fg-2)]">
                      {project.problem}
                    </p>
                  )}

                  {/* Interactive Tributary Architecture Pipeline */}
                  <TributaryArchitectureFlow
                    steps={project.architectureSteps}
                    projectTitle={project.title}
                  />

                  {/* Stack */}
                  <div className="mt-7 flex flex-col gap-1.5">
                    <span className="text-[0.8125rem] font-mono uppercase tracking-wider text-[var(--fg-2)]">
                      Tributary Stack
                    </span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-[0.875rem] bg-[var(--tributary-surface)] border border-[var(--line)]/25 text-[var(--fg)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="mt-7 flex flex-wrap items-center gap-6">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="drawn-link text-[1rem] font-medium"
                        aria-label={`Open project ${project.title}`}
                      >
                        <span>Open project</span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="drawn-link text-[1rem] font-medium"
                        aria-label={`Source code for ${project.title}`}
                      >
                        <span>Source code</span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                {/* Station Node Target & Telemetry Visualizer in Channel */}
                <div className="lg:col-span-5 flex justify-center lg:justify-end items-center h-full relative">
                  <TributaryStationVisualizer
                    tributaryId={tribId}
                    isActive={isStationActive}
                    nodeId={nodeId}
                    isEddy={false}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
