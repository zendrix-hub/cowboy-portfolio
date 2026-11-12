"use client";

import React, { createContext, useContext, useState, useMemo } from "react";

export type TributaryId =
  | "none"
  | "daloyaqua"
  | "playit"
  | "readhub"
  | "gordon-ramsai";

export interface TributaryMeta {
  id: TributaryId;
  projectTitle: string;
  tributaryName: string;
  depthLabel: string;
  depthMeters: number;
  flowRate: string;
  anchorId: string;
  nodeId: string;
}

export const TRIBUTARIES: Record<Exclude<TributaryId, "none">, TributaryMeta> = {
  playit: {
    id: "playit",
    projectTitle: "PlayIT (BasaTrack)",
    tributaryName: "PlayIT Offline ASR",
    depthLabel: "Flagship Thesis • Offline Vosk ASR",
    depthMeters: 320,
    flowRate: "16kHz PCM Audio Pipeline",
    anchorId: "tributary-playit",
    nodeId: "node-playit",
  },
  readhub: {
    id: "readhub",
    projectTitle: "ReadHub",
    tributaryName: "ReadHub Full-Stack",
    depthLabel: "Spring Boot 3 & JWT Security",
    depthMeters: 400,
    flowRate: "REST API & Gateway Routing",
    anchorId: "tributary-readhub",
    nodeId: "node-project-0",
  },
  "gordon-ramsai": {
    id: "gordon-ramsai",
    projectTitle: "Gordon RamsAi",
    tributaryName: "Gordon RamsAi RAG",
    depthLabel: "ChromaDB Vector Search & Gemini",
    depthMeters: 480,
    flowRate: "RAG & Telemetry Pipeline",
    anchorId: "tributary-gordon-ramsai",
    nodeId: "node-project-1",
  },
  daloyaqua: {
    id: "daloyaqua",
    projectTitle: "DaloyAqua",
    tributaryName: "DaloyAqua AgriTech",
    depthLabel: "SDLC Phase 0 • System Architecture Spec",
    depthMeters: 560,
    flowRate: "Fieldwork Research & Data Contracts",
    anchorId: "tributary-daloyaqua",
    nodeId: "node-project-2",
  },
};

export const TRIBUTARY_LIST: TributaryMeta[] = [
  TRIBUTARIES.playit,
  TRIBUTARIES.readhub,
  TRIBUTARIES["gordon-ramsai"],
  TRIBUTARIES.daloyaqua,
];

interface CurrentContextValue {
  activeSection: string;
  setActiveSection: (section: string) => void;
  activeTributary: TributaryId;
  setActiveTributary: (tributary: TributaryId) => void;
  scrollDepthMeters: number;
  setScrollDepthMeters: (meters: number) => void;
}

const CurrentContext = createContext<CurrentContextValue>({
  activeSection: "home",
  setActiveSection: () => {},
  activeTributary: "none",
  setActiveTributary: () => {},
  scrollDepthMeters: 0,
  setScrollDepthMeters: () => {},
});

export function CurrentProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [activeTributary, setActiveTributary] = useState<TributaryId>("none");
  const [scrollDepthMeters, setScrollDepthMeters] = useState<number>(0);

  const value = useMemo(
    () => ({
      activeSection,
      setActiveSection,
      activeTributary,
      setActiveTributary,
      scrollDepthMeters,
      setScrollDepthMeters,
    }),
    [activeSection, activeTributary, scrollDepthMeters]
  );

  return (
    <CurrentContext.Provider value={value}>{children}</CurrentContext.Provider>
  );
}

export function useCurrentContext() {
  return useContext(CurrentContext);
}
