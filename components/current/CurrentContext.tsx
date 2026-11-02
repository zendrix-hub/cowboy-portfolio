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
  daloyaqua: {
    id: "daloyaqua",
    projectTitle: "DaloyAqua",
    tributaryName: "DaloyAqua Basin",
    depthLabel: "320m • Hydrological Basin",
    depthMeters: 320,
    flowRate: "2.4 m³/s • Sensor Telemetry Stream",
    anchorId: "tributary-daloyaqua",
    nodeId: "node-daloyaqua",
  },
  playit: {
    id: "playit",
    projectTitle: "PlayIT",
    tributaryName: "PlayIT Acoustic Reach",
    depthLabel: "400m • Acoustic Reach",
    depthMeters: 400,
    flowRate: "16.0 kHz • Phoneme Resonance Stream",
    anchorId: "tributary-playit",
    nodeId: "node-project-0",
  },
  readhub: {
    id: "readhub",
    projectTitle: "ReadHub",
    tributaryName: "ReadHub Trench",
    depthLabel: "480m • Architectural Trench",
    depthMeters: 480,
    flowRate: "1.2 Gbps • Gateway Conduit Stream",
    anchorId: "tributary-readhub",
    nodeId: "node-project-1",
  },
  "gordon-ramsai": {
    id: "gordon-ramsai",
    projectTitle: "Gordon RamsAi",
    tributaryName: "RamsAI Thermal Stream",
    depthLabel: "550m • Thermal Convection",
    depthMeters: 550,
    flowRate: "85 ms • RAG Vector Stream",
    anchorId: "tributary-gordon-ramsai",
    nodeId: "node-project-2",
  },
};

export const TRIBUTARY_LIST: TributaryMeta[] = [
  TRIBUTARIES.daloyaqua,
  TRIBUTARIES.playit,
  TRIBUTARIES.readhub,
  TRIBUTARIES["gordon-ramsai"],
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
