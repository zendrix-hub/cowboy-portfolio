export type ConstellationNodeCategory =
  | "origin"
  | "pillar"
  | "skill"
  | "project"
  | "experience"
  | "contact"
  | "nav"
  | "custom";

export type ConstellationNodeTier = "core" | "major" | "minor" | "ambient";

export interface ConstellationNodeRect {
  x: number;
  y: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
  pageCenterX: number;
  pageCenterY: number;
  isVisible: boolean;
}

export interface ConstellationNodeData {
  id: string;
  label: string;
  category: ConstellationNodeCategory;
  tier: ConstellationNodeTier;
  connections: string[];
  color?: string;
  glowColor?: string;
  element?: HTMLElement | null;
  rect?: ConstellationNodeRect;
  metadata?: Record<string, unknown>;
}

export interface ConstellationRegistrationInput {
  id: string;
  label: string;
  category?: ConstellationNodeCategory;
  tier?: ConstellationNodeTier;
  connections?: string[];
  color?: string;
  glowColor?: string;
  element?: HTMLElement | null;
  metadata?: Record<string, unknown>;
}

export interface ConstellationVector {
  id: string;
  fromId: string;
  toId: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  color: string;
  glowColor: string;
  intensity: number;
  isActive: boolean;
}

export interface ConstellationContextValue {
  nodes: Map<string, ConstellationNodeData>;
  nodeList: ConstellationNodeData[];
  activeNodeId: string | null;
  hoveredNodeId: string | null;
  activeConnections: Set<string>;
  activeCategory: ConstellationNodeCategory | null;
  activeVectors: ConstellationVector[];
  setActiveNodeId: (id: string | null) => void;
  setHoveredNodeId: (id: string | null) => void;
  registerNode: (input: ConstellationRegistrationInput) => void;
  unregisterNode: (id: string) => void;
  updateNodeElement: (id: string, element: HTMLElement | null) => void;
  refreshNodeRects: () => void;
  getNode: (id: string) => ConstellationNodeData | undefined;
  getConnectedNodes: (id: string) => ConstellationNodeData[];
  isNodeActive: (id: string) => boolean;
  isNodeConnected: (id: string) => boolean;
  isNodeDimmed: (id: string) => boolean;
}
