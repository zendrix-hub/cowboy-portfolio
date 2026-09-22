import React from "react";
import { projects } from "@/data/projects";

export default function CurrentProjects() {
  const daloyAqua =
    projects.find((p) => p.title === "DaloyAqua") || projects[2];
  const supportingProjects = projects.filter((p) => p.title !== daloyAqua.title);

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="zone-3 relative min-h-screen px-6 sm:px-12 lg:px-20 py-[clamp(140px,18vh,220px)] select-text"
    >
      <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-24 sm:gap-32 relative z-10">
        {/* Section Heading */}
        <div className="max-w-[36rem]">
          <h2
            id="projects-title"
            className="font-fraunces text-[clamp(2.75rem,7vw,6rem)] leading-[1.0] text-[var(--fg)] tracking-normal m-0"
          >
            Projects
          </h2>
        </div>

        {/* Featured Project: The Eddy Chamber (DaloyAqua) (§6.3.7) */}
        <article
          aria-labelledby="featured-project-title"
          className="relative min-h-[90svh] flex flex-col justify-center grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Reading Column: 7 columns (desktop), text on left */}
          <div className="lg:col-span-8 flex flex-col items-start max-w-[36rem]">
            {/* Status node indicator & text */}
            <div className="flex items-center gap-3">
              <span
                className="w-3.5 h-3.5 rounded-full border-2 border-[var(--line)] bg-transparent"
                aria-hidden="true"
              />
              <span className="text-[1.0625rem] font-medium text-[var(--fg)]">
                {daloyAqua.status}
              </span>
            </div>

            {/* Featured Title */}
            <h3
              id="featured-project-title"
              className="mt-6 font-fraunces text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.0] text-[var(--fg)] font-normal m-0"
            >
              {daloyAqua.title}
            </h3>

            {daloyAqua.subtitle && (
              <p className="mt-2 text-[1.25rem] font-medium text-[var(--fg-2)]">
                {daloyAqua.subtitle}
              </p>
            )}

            {/* Description (max-w-[36rem]) */}
            <p className="mt-6 text-[1.125rem] leading-[1.7] text-[var(--fg)]">
              {daloyAqua.description}
            </p>

            {/* Problem & Architectural Approach */}
            <p className="mt-4 text-[1.0625rem] leading-[1.65] text-[var(--fg-2)]">
              {daloyAqua.problem}
            </p>

            {/* Stack line */}
            <div className="mt-8 flex flex-col gap-1.5">
              <span className="text-[0.9375rem] font-medium text-[var(--fg-2)] tracking-wide">
                Stack
              </span>
              <p className="text-[1.0625rem] text-[var(--fg)] leading-[1.6]">
                {daloyAqua.tags.join(", ")}
              </p>
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

          {/* Right Channel Eddy Node Target (§6.3.7, §6.3.12) */}
          <div className="lg:col-span-4 hidden lg:flex justify-center items-center h-full min-h-[300px] relative">
            <div
              id="node-daloyaqua"
              data-node="eddy"
              className="w-14 h-14 rounded-full flex items-center justify-center opacity-0 pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </article>

        {/* Supporting Projects: Stations (§6.3.7) */}
        <div className="flex flex-col gap-24 sm:gap-32 mt-12">
          {supportingProjects.map((project, idx) => {
            const nodeId = `node-project-${idx}`;

            return (
              <article
                key={project.title}
                aria-labelledby={`project-${idx}-title`}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative"
              >
                {/* Station Reading Block */}
                <div className="lg:col-span-8 flex flex-col items-start max-w-[36rem]">
                  {/* Status if present */}
                  {project.status && (
                    <span className="text-[0.9375rem] font-medium text-[var(--fg-2)] tracking-wide">
                      {project.status}
                    </span>
                  )}

                  {/* Title in Fraunces 300 station scale */}
                  <h3
                    id={`project-${idx}-title`}
                    className="mt-2 font-fraunces text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] text-[var(--fg)] font-normal m-0"
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
                    <p className="mt-1 text-[1.125rem] text-[var(--fg-2)] font-normal">
                      {project.subtitle}
                    </p>
                  )}

                  {/* One-line or concise description */}
                  <p className="mt-4 text-[1.0625rem] leading-[1.65] text-[var(--fg)]">
                    {project.description}
                  </p>

                  {/* Stack */}
                  <div className="mt-6 flex flex-col gap-1">
                    <span className="text-[0.875rem] font-medium text-[var(--fg-2)] tracking-wide">
                      Stack
                    </span>
                    <p className="text-[1rem] text-[var(--fg-2)] leading-[1.6]">
                      {project.tags.join(", ")}
                    </p>
                  </div>

                  {/* Links */}
                  <div className="mt-6 flex flex-wrap items-center gap-6">
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

                {/* Station Node Target in Channel (§6.3.7, §6.3.12) */}
                <div className="lg:col-span-4 hidden lg:flex justify-center items-center h-full relative">
                  <div
                    id={nodeId}
                    data-node="station"
                    className="w-6 h-6 rounded-full opacity-0 pointer-events-none"
                    aria-hidden="true"
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
