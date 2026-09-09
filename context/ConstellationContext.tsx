"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import type {
  ConstellationNodeCategory,
  ConstellationNodeData,
  ConstellationNodeRect,
  ConstellationRegistrationInput,
  ConstellationVector,
  ConstellationContextValue,
} from "@/types/constellation";

const DEFAULT_CATEGORY_COLORS: Record<ConstellationNodeCategory, string> = {
  origin: "#38bdf8",     // sky-400
  pillar: "#06b6d4",     // cyan-500
  skill: "#818cf8",      // indigo-400
  project: "#34d399",    // emerald-400
  experience: "#fbbf24", // amber-400
  contact: "#ec4899",    // pink-500
  nav: "#a78bfa",        // violet-400
  custom: "#06b6d4",
};

const DEFAULT_GLOW_COLORS: Record<ConstellationNodeCategory, string> = {
  origin: "rgba(56, 189, 248, 0.4)",
  pillar: "rgba(6, 182, 212, 0.45)",
  skill: "rgba(129, 140, 248, 0.35)",
  project: "rgba(52, 211, 153, 0.4)",
  experience: "rgba(251, 191, 36, 0.35)",
  contact: "rgba(236, 72, 153, 0.4)",
  nav: "rgba(167, 139, 250, 0.35)",
  custom: "rgba(6, 182, 212, 0.35)",
};

const EMPTY_SET = new Set<string>();
const EMPTY_VECTORS: ConstellationVector[] = [];
const EMPTY_CONNECTIONS: string[] = [];

export function isRectEqual(a?: ConstellationNodeRect, b?: ConstellationNodeRect): boolean {
  if (a === b) return true;
  if (!a || !b) return false;
  return (
    a.isVisible === b.isVisible &&
    Math.abs(a.centerX - b.centerX) <= 0.5 &&
    Math.abs(a.centerY - b.centerY) <= 0.5 &&
    Math.abs(a.width - b.width) <= 0.5 &&
    Math.abs(a.height - b.height) <= 0.5
  );
}

export function areStringArraysEqual(a?: string[], b?: string[]): boolean {
  if (a === b) return true;
  if (!a || !b) return !a && !b;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export function areObjectsShallowEqual(
  a?: Record<string, unknown>,
  b?: Record<string, unknown>
): boolean {
  if (a === b) return true;
  if (!a || !b) return !a && !b;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (const key of keysA) {
    if (a[key] !== b[key]) return false;
  }
  return true;
}

const ConstellationContext = createContext<ConstellationContextValue | null>(null);

export function calculateNodeRect(element: HTMLElement): ConstellationNodeRect {
  const rect = element.getBoundingClientRect();
  const scrollX = window.scrollX || window.pageXOffset || 0;
  const scrollY = window.scrollY || window.pageYOffset || 0;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const isVisible =
    rect.width > 0 &&
    rect.height > 0 &&
    rect.bottom >= -100 &&
    rect.top <= viewportHeight + 100 &&
    rect.right >= -100 &&
    rect.left <= viewportWidth + 100;

  return {
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height,
    centerX,
    centerY,
    top: rect.top,
    left: rect.left,
    right: rect.right,
    bottom: rect.bottom,
    pageCenterX: centerX + scrollX,
    pageCenterY: centerY + scrollY,
    isVisible,
  };
}

export function ConstellationProvider({ children }: { children: React.ReactNode }) {
  const [nodes, setNodes] = useState<Map<string, ConstellationNodeData>>(() => new Map());
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const nodesRef = useRef<Map<string, ConstellationNodeData>>(new Map());
  const rafIdRef = useRef<number | null>(null);
  const isScheduledRef = useRef<boolean>(false);

  // The primary focus node (hover takes precedence over persistent click)
  const currentFocusId = hoveredNodeId || activeNodeId;

  // Refresh bounding boxes for all registered nodes with rAF batching
  const refreshNodeRects = useCallback(() => {
    if (typeof window === "undefined") return;

    if (isScheduledRef.current) return;
    isScheduledRef.current = true;

    rafIdRef.current = window.requestAnimationFrame(() => {
      isScheduledRef.current = false;
      rafIdRef.current = null;

      let changed = false;
      for (const [id, node] of nodesRef.current.entries()) {
        if (!node.element || !document.contains(node.element)) {
          if (node.rect?.isVisible) {
            nodesRef.current.set(id, {
              ...node,
              rect: { ...node.rect, isVisible: false },
            });
            changed = true;
          }
          continue;
        }

        const newRect = calculateNodeRect(node.element);
        const oldRect = node.rect;

        if (!isRectEqual(oldRect, newRect)) {
          nodesRef.current.set(id, {
            ...node,
            rect: newRect,
          });
          changed = true;
        }
      }

      if (changed) {
        setNodes(new Map(nodesRef.current));
      }
    });
  }, []);

  // Register a node with strict change detection to avoid unnecessary re-renders
  const registerNode = useCallback(
    (input: ConstellationRegistrationInput) => {
      const category: ConstellationNodeCategory = input.category || "custom";
      const tier = input.tier || "minor";
      const color = input.color || DEFAULT_CATEGORY_COLORS[category];
      const glowColor = input.glowColor || DEFAULT_GLOW_COLORS[category];
      const connections = input.connections || EMPTY_CONNECTIONS;

      const existing = nodesRef.current.get(input.id);

      if (existing) {
        const elementChanged =
          input.element !== undefined && existing.element !== input.element;
        const labelChanged = existing.label !== input.label;
        const categoryChanged = existing.category !== category;
        const tierChanged = existing.tier !== tier;
        const colorChanged = existing.color !== color;
        const glowColorChanged = existing.glowColor !== glowColor;
        const connectionsChanged = !areStringArraysEqual(
          existing.connections,
          connections
        );
        const metadataChanged = !areObjectsShallowEqual(
          existing.metadata,
          input.metadata
        );

        // Bail out immediately without queuing state update if nothing changed
        if (
          !elementChanged &&
          !labelChanged &&
          !categoryChanged &&
          !tierChanged &&
          !colorChanged &&
          !glowColorChanged &&
          !connectionsChanged &&
          !metadataChanged
        ) {
          return;
        }

        const element =
          input.element !== undefined ? input.element : existing.element;
        let rect: ConstellationNodeRect | undefined;

        if (
          element &&
          typeof window !== "undefined" &&
          document.contains(element)
        ) {
          rect =
            !existing.rect || elementChanged
              ? calculateNodeRect(element)
              : existing.rect;
        } else {
          rect = undefined;
        }

        nodesRef.current.set(input.id, {
          ...existing,
          label: input.label,
          category,
          tier,
          connections,
          color,
          glowColor,
          element,
          rect,
          metadata: input.metadata,
        });

        setNodes(new Map(nodesRef.current));

        if (elementChanged || !rect) {
          refreshNodeRects();
        }
        return;
      }

      // New node registration
      let initialRect: ConstellationNodeRect | undefined;
      if (
        input.element &&
        typeof window !== "undefined" &&
        document.contains(input.element)
      ) {
        initialRect = calculateNodeRect(input.element);
      }

      const nodeData: ConstellationNodeData = {
        id: input.id,
        label: input.label,
        category,
        tier,
        connections,
        color,
        glowColor,
        element: input.element,
        rect: initialRect,
        metadata: input.metadata,
      };

      nodesRef.current.set(input.id, nodeData);
      setNodes(new Map(nodesRef.current));
      refreshNodeRects();
    },
    [refreshNodeRects]
  );

  // Unregister a node
  const unregisterNode = useCallback((id: string) => {
    if (!nodesRef.current.has(id)) return;

    nodesRef.current.delete(id);
    setNodes(new Map(nodesRef.current));

    setActiveNodeId((prev) => (prev === id ? null : prev));
    setHoveredNodeId((prev) => (prev === id ? null : prev));
  }, []);

  // Update DOM element reference
  const updateNodeElement = useCallback(
    (id: string, element: HTMLElement | null) => {
      const existing = nodesRef.current.get(id);
      if (!existing) return;
      if (existing.element === element) return;

      const newRect =
        element &&
        typeof window !== "undefined" &&
        document.contains(element)
          ? calculateNodeRect(element)
          : undefined;

      nodesRef.current.set(id, {
        ...existing,
        element,
        rect: newRect,
      });

      setNodes(new Map(nodesRef.current));
      refreshNodeRects();
    },
    [refreshNodeRects]
  );

  // Scroll and resize listeners
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScrollOrResize = () => {
      refreshNodeRects();
    };

    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize, { passive: true });

    // Initial pass
    refreshNodeRects();

    return () => {
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
      if (rafIdRef.current) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      isScheduledRef.current = false;
    };
  }, [refreshNodeRects]);

  // Compute active connections (bidirectional)
  const activeConnections = useMemo<Set<string>>(() => {
    if (!currentFocusId) return EMPTY_SET;

    const result = new Set<string>();
    const currentNode = nodes.get(currentFocusId);

    // Direct connections from current node
    if (currentNode?.connections) {
      for (const targetId of currentNode.connections) {
        result.add(targetId);
      }
    }

    // Inverse connections: any node that lists currentFocusId in its connections
    for (const [id, node] of nodes.entries()) {
      if (node.connections?.includes(currentFocusId)) {
        result.add(id);
      }
    }

    return result;
  }, [currentFocusId, nodes]);

  // Active Category (category of current focus node, if any)
  const activeCategory = useMemo<ConstellationNodeCategory | null>(() => {
    if (!currentFocusId) return null;
    return nodes.get(currentFocusId)?.category || null;
  }, [currentFocusId, nodes]);

  // Active Vectors (visible lines to be drawn between currentFocusId and its connections)
  const activeVectors = useMemo<ConstellationVector[]>(() => {
    if (!currentFocusId) return EMPTY_VECTORS;

    const focusNode = nodes.get(currentFocusId);
    if (!focusNode?.rect || !focusNode.rect.isVisible) return EMPTY_VECTORS;

    const vectors: ConstellationVector[] = [];

    for (const targetId of activeConnections) {
      const targetNode = nodes.get(targetId);
      if (!targetNode?.rect || !targetNode.rect.isVisible) continue;

      const vectorId = [currentFocusId, targetId].sort().join("<->");
      vectors.push({
        id: vectorId,
        fromId: currentFocusId,
        toId: targetId,
        fromX: focusNode.rect.centerX,
        fromY: focusNode.rect.centerY,
        toX: targetNode.rect.centerX,
        toY: targetNode.rect.centerY,
        color: focusNode.color || "#06b6d4",
        glowColor: focusNode.glowColor || "rgba(6, 182, 212, 0.4)",
        intensity: 1.0,
        isActive: true,
      });
    }

    return vectors;
  }, [currentFocusId, activeConnections, nodes]);

  // Query helpers
  const getNode = useCallback((id: string) => nodesRef.current.get(id), []);

  const getConnectedNodes = useCallback(
    (id: string) => {
      const node = nodesRef.current.get(id);
      if (!node) return [];

      const connected: ConstellationNodeData[] = [];
      const ids = new Set(node.connections || []);

      for (const [otherId, otherNode] of nodesRef.current.entries()) {
        if (otherNode.connections?.includes(id)) {
          ids.add(otherId);
        }
      }

      for (const connId of ids) {
        const found = nodesRef.current.get(connId);
        if (found) connected.push(found);
      }

      return connected;
    },
    []
  );

  const isNodeActive = useCallback(
    (id: string) => currentFocusId === id,
    [currentFocusId]
  );

  const isNodeConnected = useCallback(
    (id: string) => activeConnections.has(id),
    [activeConnections]
  );

  const isNodeDimmed = useCallback(
    (id: string) => {
      if (!currentFocusId) return false;
      return currentFocusId !== id && !activeConnections.has(id);
    },
    [currentFocusId, activeConnections]
  );

  const nodeList = useMemo(() => Array.from(nodes.values()), [nodes]);

  const value = useMemo<ConstellationContextValue>(
    () => ({
      nodes,
      nodeList,
      activeNodeId,
      hoveredNodeId,
      activeConnections,
      activeCategory,
      activeVectors,
      setActiveNodeId,
      setHoveredNodeId,
      registerNode,
      unregisterNode,
      updateNodeElement,
      refreshNodeRects,
      getNode,
      getConnectedNodes,
      isNodeActive,
      isNodeConnected,
      isNodeDimmed,
    }),
    [
      nodes,
      nodeList,
      activeNodeId,
      hoveredNodeId,
      activeConnections,
      activeCategory,
      activeVectors,
      registerNode,
      unregisterNode,
      updateNodeElement,
      refreshNodeRects,
      getNode,
      getConnectedNodes,
      isNodeActive,
      isNodeConnected,
      isNodeDimmed,
    ]
  );

  return (
    <ConstellationContext.Provider value={value}>
      {children}
    </ConstellationContext.Provider>
  );
}

export function useConstellation(): ConstellationContextValue {
  const context = useContext(ConstellationContext);
  if (!context) {
    throw new Error("useConstellation must be used within a ConstellationProvider");
  }
  return context;
}
