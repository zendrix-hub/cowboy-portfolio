"use client";

import { useState } from "react";
import { ArchitectureStep } from "@/data/projects";
import {
  ChevronDown,
  ChevronUp,
  Workflow,
  ArrowDown,
  Activity,
  GitCommit,
  Scale,
  Cpu,
  ArrowRight,
} from "lucide-react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "motion/react";

interface ArchitectureFlowProps {
  steps: ArchitectureStep[];
  projectTitle: string;
  defaultOpen?: boolean;
}

export default function ArchitectureFlow({
  steps,
  projectTitle,
  defaultOpen = false,
}: ArchitectureFlowProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [selectedStepIndex, setSelectedStepIndex] = useState<number | null>(0);

  if (!steps || steps.length === 0) return null;

  const currentStep =
    selectedStepIndex !== null ? steps[selectedStepIndex] : null;

  return (
    <div className="mt-4 pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60">
      {/* Toggle Button */}
      <button
        type="button"
        suppressHydrationWarning
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono font-medium text-cyan-800 dark:text-cyan-300 bg-cyan-50/60 dark:bg-cyan-950/40 hover:bg-cyan-100/70 dark:hover:bg-cyan-900/50 border border-cyan-200/60 dark:border-cyan-800/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <Workflow className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span>
            {isOpen ? "Hide Architecture Flow" : "Inspect System Architecture Flow"}
          </span>
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
          <span className="px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-300 font-bold text-[10px]">
            Interactive
          </span>
          <span>{steps.length} Stages</span>
          {isOpen ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </span>
      </button>

      {/* Collapsible Interactive Pipeline */}
      {isOpen && (
        <LazyMotion features={domAnimation} strict>
          <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-zinc-50/90 dark:bg-zinc-950/80 border border-cyan-500/20 shadow-inner space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-zinc-200/60 dark:border-zinc-800/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-700 dark:text-cyan-400 font-bold">
                  {projectTitle} Pipeline Inspector
                </span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                Click any stage to inspect data contracts &amp; trade-offs
              </span>
            </div>

            {/* Stages Flow Grid / List */}
            <div className="space-y-2 pt-1" role="tablist" aria-label={`${projectTitle} architecture stages`}>
              {steps.map((step, idx) => {
                const isSelected = selectedStepIndex === idx;
                return (
                  <div key={step.step} className="relative">
                    {/* Node Card Button */}
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() =>
                        setSelectedStepIndex(isSelected ? null : idx)
                      }
                      className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 ${
                        isSelected
                          ? "bg-white dark:bg-zinc-900 border-cyan-500 shadow-md shadow-cyan-950/20 ring-1 ring-cyan-500/40"
                          : "bg-white/80 dark:bg-zinc-900/60 border-zinc-200/80 dark:border-zinc-800/80 hover:border-cyan-500/40 hover:bg-white dark:hover:bg-zinc-900"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border transition-colors ${
                              isSelected
                                ? "bg-cyan-600 text-white border-cyan-500"
                                : "bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800/60"
                            }`}
                          >
                            STAGE {step.step}
                          </span>
                          <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                            {step.title}
                          </h4>
                        </div>

                        <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-medium">
                          {step.subtitle}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mb-2.5">
                        {step.description}
                      </p>

                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex flex-wrap gap-1.5">
                          {step.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 text-[10px] font-mono rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/70 dark:border-zinc-700/60"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 font-medium flex items-center gap-1">
                          <span>{isSelected ? "Hide Specs" : "Inspect Data Contract"}</span>
                          <ChevronDown
                            className={`w-3 h-3 transition-transform ${
                              isSelected ? "rotate-180" : ""
                            }`}
                          />
                        </span>
                      </div>
                    </button>

                    {/* Connector Arrow */}
                    {idx < steps.length - 1 && (
                      <div className="flex justify-center py-1 text-cyan-500/70 dark:text-cyan-400/60">
                        <ArrowDown className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Deep-Dive Architecture Inspector Drawer */}
            <AnimatePresence mode="wait">
              {currentStep && (
                <m.div
                  key={currentStep.step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="p-4 rounded-xl bg-cyan-950/20 dark:bg-cyan-950/30 border border-cyan-500/40 text-xs space-y-3.5"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20">
                    <span className="font-mono font-bold text-cyan-800 dark:text-cyan-300 flex items-center gap-1.5 text-xs">
                      <Activity className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      Stage {currentStep.step} Architecture Deep-Dive ({currentStep.title})
                    </span>
                    {currentStep.specs && (
                      <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
                        {currentStep.specs}
                      </span>
                    )}
                  </div>

                  {/* Data Contract (Input -> Processing -> Output) */}
                  {currentStep.dataContract && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold block">
                        Data Flow Contract (I/O Pipeline)
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono">
                        <div className="p-2.5 rounded-lg bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800">
                          <div className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-semibold mb-1 flex items-center gap-1">
                            <GitCommit className="w-3 h-3 text-cyan-500" /> Input
                          </div>
                          <div className="text-zinc-800 dark:text-zinc-200 leading-snug">
                            {currentStep.dataContract.input}
                          </div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800">
                          <div className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-semibold mb-1 flex items-center gap-1">
                            <Cpu className="w-3 h-3 text-cyan-500" /> Processing
                          </div>
                          <div className="text-zinc-800 dark:text-zinc-200 leading-snug">
                            {currentStep.dataContract.processing}
                          </div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800">
                          <div className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-semibold mb-1 flex items-center gap-1">
                            <ArrowRight className="w-3 h-3 text-emerald-500" /> Output
                          </div>
                          <div className="text-zinc-800 dark:text-zinc-200 leading-snug">
                            {currentStep.dataContract.output}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Architectural Trade-off Rationale */}
                  {currentStep.tradeoff && (
                    <div className="p-3 rounded-lg bg-white/80 dark:bg-zinc-900/80 border border-cyan-500/30 text-xs">
                      <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider mb-1">
                        <Scale className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        Engineering Trade-off Rationale
                      </div>
                      <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans text-xs">
                        {currentStep.tradeoff}
                      </p>
                    </div>
                  )}
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </LazyMotion>
      )}
    </div>
  );
}
