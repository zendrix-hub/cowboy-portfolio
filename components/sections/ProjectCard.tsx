import { Project } from "@/data/projects";
import {
  ExternalLink,
  Smartphone,
  Droplets,
  BookOpen,
  Sparkles,
  Folder,
  Layers,
  ShieldAlert,
  HelpCircle,
  Cpu,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import ArchitectureFlow from "@/components/sections/ArchitectureFlow";
import CardSpotlight from "@/components/ui/CardSpotlight";
import { ConstellationNode } from "@/components/interactive/ConstellationNode";

interface ProjectCardProps {
  project: Project;
}

function renderProjectIcon(title: string, className = "w-6 h-6") {
  const t = title.toLowerCase();
  if (t.includes("playit")) return <Smartphone className={className} />;
  if (t.includes("daloy")) return <Droplets className={className} />;
  if (t.includes("readhub")) return <BookOpen className={className} />;
  if (t.includes("ramsa") || t.includes("rasma"))
    return <Sparkles className={className} />;
  return <Folder className={className} />;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const isFlagship = project.title === "PlayIT";
  const projectNodeId = `project-${project.title.toLowerCase().replace(/[^a-z0-9]/g, "")}`;

  const connections: string[] = [];
  if (project.category === "Mobile") {
    connections.push("pillar-offline");
  } else if (project.category === "Backend" || project.category === "Web") {
    connections.push("pillar-backend");
  } else if (project.category === "AI / Full-Stack") {
    connections.push("pillar-ai");
  }

  if (project.tags) {
    for (const tag of project.tags) {
      connections.push(`skill-${tag.toLowerCase().replace(/[^a-z0-9]/g, "-")}`);
    }
  }

  const nodeColor =
    project.category === "Mobile"
      ? "#06b6d4"
      : project.category === "AI / Full-Stack"
      ? "#a855f7"
      : "#38bdf8";

  return (
    <ConstellationNode
      id={projectNodeId}
      label={project.title}
      category="project"
      tier={isFlagship ? "major" : "minor"}
      color={nodeColor}
      connections={connections}
      showAnchorPip
      pipPosition="top-right"
      className="h-full block rounded-2xl"
    >
      <CardSpotlight
        className={`group flex flex-col h-full rounded-2xl bg-white/90 dark:bg-zinc-900/60 backdrop-blur-md border hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-cyan-950/30 transition-all duration-200 p-6 sm:p-7 ${
          isFlagship
            ? "border-cyan-500/50 dark:border-cyan-500/40 ring-1 ring-cyan-500/30 shadow-md shadow-cyan-950/20"
            : "border-zinc-200/80 dark:border-zinc-800/90 hover:border-cyan-500/50 dark:hover:border-cyan-500/40"
        }`}
      >
      {/* Card Header */}
      <div className="flex items-start gap-4 mb-3">
        {/* Item Icon Box */}
        <div
          className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center border transition-all duration-200 ${
            isFlagship
              ? "bg-cyan-100/80 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-300 border-cyan-300 dark:border-cyan-700 shadow-sm"
              : "bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 border-cyan-100 dark:border-cyan-900/60 group-hover:scale-105 group-hover:border-cyan-500/40"
          }`}
        >
          {renderProjectIcon(project.title, "w-6 h-6")}
        </div>

        {/* Item Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors truncate">
                {project.title}
              </h3>
              {isFlagship && (
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-50 dark:bg-cyan-950/70 text-cyan-700 dark:text-cyan-300 border border-cyan-200/80 dark:border-cyan-800/60">
                  Primary Thesis
                </span>
              )}
            </div>

            {project.featured && !isFlagship && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-cyan-100/80 dark:bg-cyan-950/70 text-cyan-800 dark:text-cyan-300 border border-cyan-300/70 dark:border-cyan-800/60 flex-shrink-0">
                Featured
              </span>
            )}
          </div>

          {project.subtitle && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5 truncate">
              {project.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Badges & Role Row */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {project.status && (
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider ${
              project.status === "Flagship Engineering Thesis"
                ? "bg-cyan-100/80 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-700/80 font-bold"
                : project.status === "In Progress"
                ? "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60"
                : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60"
            }`}
          >
            {project.status}
          </span>
        )}

        {project.category && (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60">
            {project.category}
          </span>
        )}

        {project.roleContext && (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-cyan-800 dark:text-cyan-300/90 bg-cyan-50/70 dark:bg-cyan-950/40 border border-cyan-200/60 dark:border-cyan-800/40">
            {project.roleContext}
          </span>
        )}
      </div>

      {/* High-level Summary */}
      <p className="text-sm text-zinc-700 dark:text-zinc-200 leading-relaxed mb-4">
        {project.description}
      </p>

      {/* Engineering Specs & Architectural Context Block */}
      <div className="space-y-3.5 p-4 rounded-xl bg-zinc-50/80 dark:bg-zinc-950/60 border border-zinc-200/70 dark:border-zinc-800/80 text-xs mb-5">
        {/* Problem */}
        {project.problem && (
          <div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Problem & Context</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed pl-5">
              {project.problem}
            </p>
          </div>
        )}

        {/* Constraints */}
        {project.constraints && (
          <div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Constraints & Environment</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed pl-5">
              {project.constraints}
            </p>
          </div>
        )}

        {/* Architecture */}
        {project.architecture && (
          <div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
              <Layers className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Architecture & Approach</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed pl-5">
              {project.architecture}
            </p>
          </div>
        )}

        {/* Key Engineering Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="pt-1">
            <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              <Cpu className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Key Technical Highlights</span>
            </div>
            <ul className="space-y-1.5 pl-5">
              {project.highlights.map((highlight, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-zinc-600 dark:text-zinc-300 leading-relaxed"
                >
                  <span className="text-cyan-500 font-mono font-bold mt-0.5">›</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* System Architecture Flow */}
      {project.architectureSteps && (
        <div className="mb-5">
          <ArchitectureFlow
            steps={project.architectureSteps}
            projectTitle={project.title}
            defaultOpen={isFlagship}
          />
        </div>
      )}

      {/* Tech Stack Tags */}
      <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 mb-6">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 border border-zinc-200/70 dark:border-zinc-700/60 hover:border-cyan-500/40 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Actions */}
      <div className="flex items-center gap-3 mt-auto">
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700/70 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            aria-label={`${project.title} repository on GitHub`}
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>Source Code</span>
          </a>
        ) : (
          <div className="flex-1 py-2 text-center text-xs font-mono text-zinc-400 dark:text-zinc-500 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800">
            Repository Pending
          </div>
        )}

        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-zinc-950 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 shadow-sm"
            aria-label={`${project.title} live demo`}
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center p-2 rounded-lg text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/60 border border-cyan-200/80 dark:border-cyan-900/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            title="Open Repository"
            aria-label={`Open ${project.title} repository`}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        ) : null}
      </div>
    </CardSpotlight>
  </ConstellationNode>
  );
}
