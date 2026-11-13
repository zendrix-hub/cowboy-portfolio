"use client";

import React, { useEffect } from "react";
import { projects } from "@/data/projects";
import {
  useCurrentContext,
  TRIBUTARIES,
  type TributaryId,
} from "./CurrentContext";
import { TributaryStationVisualizer } from "./TributaryTelemetry";
import { TechLogo } from "./BrandLogos";
import JaLabel from "./JaLabel";
import { ProjectDecisions, ProjectEvaluationPanel } from "./ProjectProof";
import { sectionLabelsJa } from "@/data/japan";

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

  const flagshipProject =
    projects.find((p) => p.slug === "playit") || projects[0];
  const supportingProjects = [
    projects.find((p) => p.slug === "readhub") || projects[1],
    projects.find((p) => p.slug === "gordon-ramsai") || projects[3],
    projects.find((p) => p.slug === "daloyaqua") || projects[2],
  ];


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
        {/* Section Heading & Project Telemetry Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[var(--line)]/25 pb-8">
          <div className="max-w-[38rem]">
            <span className="font-mono text-[0.8125rem] uppercase tracking-widest text-[var(--fg-2)] block mb-3">
              SECTION 03 // FEATURED ENGINEERING PROJECTS
            <JaLabel>{sectionLabelsJa.projects}</JaLabel>
            </span>
            <h2
              id="projects-title"
              className="font-fraunces text-[clamp(2.75rem,7vw,6rem)] leading-[1.0] text-[var(--fg)] tracking-normal m-0"
            >
              Projects
            </h2>
          </div>

          {/* Active Project Quick Switcher Bar */}
          <div className="flex flex-col items-start lg:items-end gap-2">
            <span className="font-mono text-[0.75rem] uppercase tracking-wider text-[var(--fg-2)]">
              {activeMeta
                ? `ACTIVE PROJECT // ${activeMeta.projectTitle.toUpperCase()}`
                : "PROJECT OVERVIEW // 3 BUILT SYSTEMS + 1 IN SPECIFICATION"}
            </span>
            <div
              className="flex flex-wrap items-center gap-2"
              role="navigation"
              aria-label="Project Jump Links"
            >
              {(
                [
                  "playit",
                  "readhub",
                  "gordon-ramsai",
                  "daloyaqua",
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

        {/* Featured Project: Flagship Engineering Thesis (PlayIT) */}
        <article
          id={TRIBUTARIES.playit.anchorId}
          data-tributary-section="playit"
          aria-labelledby="featured-project-title"
          className="scroll-mt-24 relative min-h-[85svh] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-start"
        >
          {/* Reading Column: 7 columns (desktop), text on left */}
          <div className="lg:col-span-7 flex flex-col items-start max-w-[42rem]">
            {/* Coordinate, Role & Status */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span
                className="w-3.5 h-3.5 rounded-full border-2 border-[var(--line)] bg-[var(--line)]/25"
                aria-hidden="true"
              />
              <span className="font-mono text-[0.8125rem] uppercase tracking-wider text-[var(--fg-2)]">
                {TRIBUTARIES.playit.depthLabel}
              </span>
              <span className="text-[var(--fg-2)] opacity-50" aria-hidden="true">
                •
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[0.8125rem] font-mono font-medium bg-[var(--tributary-surface)] border border-[var(--line)]/30 text-[var(--fg)]">
                {flagshipProject.status || "Flagship Engineering Thesis"}
              </span>
              {flagshipProject.roleContext && (
                <span className="text-[0.875rem] font-medium text-[var(--fg-2)]">
                  • {flagshipProject.roleContext}
                </span>
              )}
            </div>

            {/* Featured Title */}
            <h3
              id="featured-project-title"
              className="mt-4 font-fraunces text-[clamp(2.5rem,6vw,5.25rem)] leading-[1.0] text-[var(--fg)] font-normal m-0"
            >
              {flagshipProject.title}
            </h3>

            {flagshipProject.subtitle && (
              <p className="mt-2 text-[1.25rem] font-medium text-[var(--fg-2)]">
                {flagshipProject.subtitle}
              </p>
            )}

            {/* Description */}
            <p className="mt-5 text-[1.125rem] leading-[1.7] text-[var(--fg)]">
              {flagshipProject.description}
            </p>

            {/* Problem & Architectural Approach */}
            <p className="mt-3 text-[1.0625rem] leading-[1.65] text-[var(--fg-2)]">
              {flagshipProject.problem}
            </p>

            {/* Key Engineering Highlights from Resume */}
            {flagshipProject.highlights && flagshipProject.highlights.length > 0 && (
              <ul className="mt-5 space-y-2 text-[0.96875rem] leading-[1.6] text-[var(--fg)]">
                {flagshipProject.highlights.map((hl, hIdx) => (
                  <li key={hIdx} className="flex items-start gap-2.5">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--line)"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-1 shrink-0"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Stack line with Technology Logos */}
            <div className="mt-8 flex flex-col gap-2">
              <span className="text-[0.8125rem] font-mono uppercase tracking-wider text-[var(--fg-2)]">
                Tech Stack & Engineering Tools
              </span>
              <div className="flex flex-wrap gap-2">
                {flagshipProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.875rem] font-medium bg-[var(--tributary-surface)] border border-[var(--line)]/30 text-[var(--fg)] shadow-sm"
                  >
                    <TechLogo name={tag} className="w-4 h-4 shrink-0" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Decisions I made (folded by default) */}
            <ProjectDecisions
              steps={flagshipProject.architectureSteps}
              projectTitle={flagshipProject.title}
            />

            {/* Links */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              {flagshipProject.githubUrl && (
                <a
                  href={flagshipProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="drawn-link text-[1.0625rem] font-medium"
                  aria-label={`Source code for ${flagshipProject.title}`}
                >
                  <TechLogo name="GitHub" className="w-4 h-4" />
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
              {flagshipProject.liveUrl && (
                <a
                  href={flagshipProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="drawn-link text-[1.0625rem] font-medium"
                  aria-label={`Open ${flagshipProject.title}`}
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

            {/* Field evaluation: measured results with real users */}
            {flagshipProject.evaluation && (
              <ProjectEvaluationPanel
                id="playit-evaluation"
                evaluation={flagshipProject.evaluation}
              />
            )}
          </div>

          {/* Right Channel Showcase for Flagship Project */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-start lg:sticky lg:top-24 h-full relative print:hidden">
            <TributaryStationVisualizer
              tributaryId="playit"
              isActive={activeTributary === "playit"}
              nodeId="node-playit"
              isEddy={true}
              videoUrl={flagshipProject.videoUrl}
              posterUrl={flagshipProject.posterUrl}
              projectSlug={flagshipProject.slug}
              projectTitle={flagshipProject.title}
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
                className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-start relative"
              >
                {/* Station Reading Block */}
                <div className="lg:col-span-7 flex flex-col items-start max-w-[42rem]">
                  {/* Tributary Coordinate, Role & Status */}
                  <div className="flex flex-wrap items-center gap-2.5">
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
                        <span className="px-2.5 py-0.5 rounded-full text-[0.8125rem] font-mono font-medium bg-[var(--tributary-surface)] border border-[var(--line)]/30 text-[var(--fg)]">
                          {project.status}
                        </span>
                      </>
                    )}
                    {project.roleContext && (
                      <span className="text-[0.875rem] font-medium text-[var(--fg-2)]">
                        • {project.roleContext}
                      </span>
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

                  {/* Key Engineering Highlights from Resume */}
                  {project.highlights && project.highlights.length > 0 && (
                    <ul className="mt-5 space-y-2 text-[0.96875rem] leading-[1.6] text-[var(--fg)]">
                      {project.highlights.map((hl, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2.5">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--line)"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mt-1 shrink-0"
                            aria-hidden="true"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Stack with Tech Logos */}
                  <div className="mt-7 flex flex-col gap-2">
                    <span className="text-[0.8125rem] font-mono uppercase tracking-wider text-[var(--fg-2)]">
                      Tributary Stack & Environment
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.875rem] font-medium bg-[var(--tributary-surface)] border border-[var(--line)]/30 text-[var(--fg)] shadow-sm"
                        >
                          <TechLogo
                            name={tag}
                            className="w-4 h-4 shrink-0"
                          />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Decisions (folded by default) */}
                  <ProjectDecisions
                    steps={project.architectureSteps}
                    projectTitle={project.title}
                    planned={project.slug === "daloyaqua"}
                  />

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
                        <span>Live deployment</span>
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
                        <TechLogo name="GitHub" className="w-4 h-4" />
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

                {/* Station Node Target & Animated Short Video Showcase in Channel */}
                <div className="lg:col-span-5 flex justify-center lg:justify-end items-start lg:sticky lg:top-24 h-full relative print:hidden">
                  <TributaryStationVisualizer
                    tributaryId={tribId}
                    isActive={isStationActive}
                    nodeId={nodeId}
                    isEddy={false}
                    videoUrl={project.videoUrl}
                    posterUrl={project.posterUrl}
                    projectSlug={project.slug}
                    projectTitle={project.title}
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
