"use client";

import React, { useState } from "react";
import { Project, ArchitectureStep } from "@/data/projects";
import { DimensionLine } from "./DimensionLine";
import { ExternalLinkIcon } from "./Icons";

interface ProjectSubSheetProps {
  project: Project;
  subSheetCode: string;
  onBackToOverview: () => void;
}

export function ProjectSubSheet({
  project,
  subSheetCode,
  onBackToOverview,
}: ProjectSubSheetProps) {
  const steps = project.architectureSteps || [];
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const activeStep: ArchitectureStep | undefined = steps[activeStepIndex] || steps[0];

  return (
    <div className="space-y-8 animate-none">
      
      {/* Top action bar: Return to Schedule + Sub-sheet code */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-rule">
        <button
          type="button"
          onClick={onBackToOverview}
          className="inline-flex items-center gap-2 px-3 py-1.5 border-2 border-ink bg-sheet text-ink font-sans font-semibold text-xs sm:text-sm hover:bg-ink hover:text-sheet transition-none"
        >
          <span>← Return to Overview & Schedule (Sheet 3-A)</span>
        </button>

        <div className="font-mono text-xs text-ink-2 font-semibold">
          TECHNICAL SPEC SHEET {subSheetCode} {"//"} {project.title.toUpperCase()}
        </div>
      </div>

      {/* Project Master Specification Header */}
      <div className="border-2 border-ink p-4 sm:p-6 bg-sheet space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="font-mono text-xs text-ink-2 uppercase tracking-wider block">
              {project.category} System Architecture
            </span>
            <h3 className="font-condensed font-semibold text-3xl sm:text-4xl text-ink">
              {project.title}
            </h3>
            {project.subtitle && (
              <p className="font-sans text-sm sm:text-base text-ink-2 mt-0.5">
                {project.subtitle}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Source repository for ${project.title}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-ink bg-sheet text-ink font-sans font-semibold text-xs hover:bg-ink hover:text-sheet transition-none"
              >
                <span>Repository</span>
                <ExternalLinkIcon className="w-3.5 h-3.5" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live deployment for ${project.title}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-ink bg-ink text-sheet font-sans font-semibold text-xs hover:bg-sheet hover:text-ink transition-none"
              >
                <span>Live System</span>
                <ExternalLinkIcon className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Role & Context bar */}
        {project.roleContext && (
          <div className="pt-2 border-t border-rule/30 font-mono text-xs text-ink-2">
            ASSIGNMENT CONTEXT: <span className="text-ink font-semibold">{project.roleContext}</span>
          </div>
        )}

        {/* Problem Statement & System Constraints Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="border border-rule p-3 bg-desk/30">
            <span className="font-mono text-xs font-bold text-ink block mb-1">
              [PROBLEM DEFINITION]
            </span>
            <p className="font-sans text-xs sm:text-sm text-ink leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="border border-rule p-3 bg-desk/30">
            <span className="font-mono text-xs font-bold text-ink block mb-1">
              [OPERATIONAL BOUNDARY CONSTRAINTS]
            </span>
            <p className="font-sans text-xs sm:text-sm text-ink-2 leading-relaxed">
              {project.constraints}
            </p>
          </div>
        </div>
      </div>

      {/* 
        4-STAGE PIPELINE SCHEMATIC per §6.2
        Visual horizontal connected blocks for Steps 01 - 04.
      */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-condensed font-semibold text-xl sm:text-2xl text-ink">
            System Pipeline & Dataflow Schematics
          </h4>
          <span className="font-mono text-xs text-ink-2">
            SELECT STAGE TO INSPECT
          </span>
        </div>

        {/* 4 Pipeline Step Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {steps.map((step, idx) => {
            const isSelected = idx === activeStepIndex;
            return (
              <button
                key={step.step}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                aria-current={isSelected ? "step" : undefined}
                className={`text-left p-3 border-2 transition-none flex flex-col justify-between min-h-[110px] ${
                  isSelected
                    ? "border-ink bg-ink text-sheet"
                    : "border-rule bg-sheet text-ink hover:bg-desk"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`font-mono text-xs font-bold ${
                        isSelected ? "text-sheet" : "text-ink"
                      }`}
                    >
                      STAGE {step.step}
                    </span>
                    {isSelected && (
                      <span className="font-mono text-[10px] uppercase border border-sheet px-1">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="font-sans font-semibold text-sm leading-tight">
                    {step.title}
                  </div>
                </div>

                <div
                  className={`font-mono text-[11px] truncate mt-2 ${
                    isSelected ? "text-sheet/80" : "text-ink-2"
                  }`}
                >
                  {step.subtitle}
                </div>
              </button>
            );
          })}
        </div>
        <DimensionLine className="w-full my-2" />
      </div>

      {/* 
        INTERACTIVE STEP INSPECTOR:
        Data Contract, Operational Specs, and Engineering Tradeoffs
      */}
      {activeStep && (
        <div className="border-2 border-ink p-4 sm:p-6 bg-sheet space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
            <div>
              <span className="font-mono text-xs text-ink-2">
                STAGE {activeStep.step} DEEP INSPECTION
              </span>
              <h5 className="font-condensed font-semibold text-2xl text-ink">
                {activeStep.title} — {activeStep.subtitle}
              </h5>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {activeStep.technologies.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs px-2 py-0.5 border border-rule bg-desk/50 text-ink"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <p className="font-sans text-[0.9375rem] leading-relaxed text-ink">
            {activeStep.description}
          </p>

          {/* Data Contract Table */}
          {activeStep.dataContract && (
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-ink block uppercase tracking-wider">
                Stage Data Contract (I/O Schema)
              </span>
              <div className="border-2 border-ink bg-sheet overflow-x-auto">
                <table className="w-full text-left border-collapse font-sans text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b-2 border-ink bg-ink text-sheet h-8">
                      <th className="py-1.5 px-3 w-1/4 border-r border-rule font-semibold">
                        Contract Phase
                      </th>
                      <th className="py-1.5 px-3 w-3/4 font-semibold">
                        Specification & Schema Payload
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rule font-mono text-xs">
                    <tr className="hover:bg-desk transition-none">
                      <th className="py-2 px-3 font-semibold text-ink border-r border-rule bg-sheet">
                        INPUT
                      </th>
                      <td className="py-2 px-3 text-ink-2">
                        {activeStep.dataContract.input}
                      </td>
                    </tr>
                    <tr className="hover:bg-desk transition-none">
                      <th className="py-2 px-3 font-semibold text-ink border-r border-rule bg-sheet">
                        PROCESSING
                      </th>
                      <td className="py-2 px-3 text-ink-2">
                        {activeStep.dataContract.processing}
                      </td>
                    </tr>
                    <tr className="hover:bg-desk transition-none">
                      <th className="py-2 px-3 font-semibold text-ink border-r border-rule bg-sheet">
                        OUTPUT
                      </th>
                      <td className="py-2 px-3 text-ink font-semibold">
                        {activeStep.dataContract.output}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Operational Specs & Engineering Tradeoff Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {activeStep.specs && (
              <div className="border border-rule p-3 bg-desk/40">
                <span className="font-mono text-xs font-bold text-ink block mb-1">
                  HARDWARE & TIMING SPECS
                </span>
                <p className="font-mono text-xs text-ink leading-relaxed">
                  {activeStep.specs}
                </p>
              </div>
            )}

            {activeStep.tradeoff && (
              <div className="border border-rule p-3 bg-desk/40">
                <span className="font-mono text-xs font-bold text-ink block mb-1">
                  ENGINEERING TRADEOFF ANALYSIS
                </span>
                <p className="font-sans text-xs text-ink-2 leading-relaxed">
                  {activeStep.tradeoff}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Highlights checklist from repo */}
      {project.highlights && project.highlights.length > 0 && (
        <div className="border-2 border-ink p-4 sm:p-5 bg-sheet space-y-3">
          <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider block">
            Verification Highlights & Deliverables
          </span>
          <ul className="divide-y divide-rule/40 font-sans text-xs sm:text-sm text-ink">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="py-2 flex items-start gap-2.5">
                <span className="font-mono font-bold text-ink shrink-0">■</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}
