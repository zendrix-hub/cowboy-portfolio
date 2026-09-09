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

const ConstellationContext = createContext<ConstellationContextValue | null>(null);

function calculateNodeRect(element: HTMLElement): ConstellationNodeRect {
  const rect = element.getBoundingClientRect();
  const scrollX = window.scrollX || window.pageXOffset || 0;
  const scrollY = window.scrollY || window.pageYOffset || 0;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const isVisible =
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

      setNodes((currentNodes) => {
        let changed = false;
        const updatedMap = new Map<string, ConstellationNodeData>(currentNodes);

        for (const [id, node] of updatedMap.entries()) {
          if (!node.element || !document.contains(node.element)) continue;

          const newRect = calculateNodeRect(node.element);
          const oldRect = node.rect;

          if (
            !oldRect ||
            Math.abs(oldRect.centerX - newRect.centerX) > 0.5 ||
            Math.abs(oldRect.centerY - newRect.centerY) > 0.5 ||
            oldRect.isVisible !== newRect.isVisible
          ) {
            updatedMap.set(id, {
              ...node,
              rect: newRect,
            });
            changed = true;
          }
        }

        return changed ? updatedMap : currentNodes;
      });
    });
  }, []);

  // Register a node
  const registerNode = useCallback(
    (input: ConstellationRegistrationInput) => {
      const category: ConstellationNodeCategory = input.category || "custom";
      const tier = input.tier || "minor";
      const color = input.color || DEFAULT_CATEGORY_COLORS[category];
      const glowColor = input.glowColor || DEFAULT_GLOW_COLORS[category];

      let initialRect: ConstellationNodeRect | undefined;
      if (input.element && typeof window !== "undefined") {
        initialRect = calculateNodeRect(input.element);
      }

      const nodeData: ConstellationNodeData = {
        id: input.id,
        label: input.label,
        category,
        tier,
        connections: input.connections || [],
        color,
        glowColor,
        element: input.element,
        rect: initialRect,
        metadata: input.metadata,
      };

      setNodes((prev) => {
        const next = new Map(prev);
        next.set(input.id, nodeData);
        return next;
      });

      // Trigger a batch rect recalculation on next frame
      refreshNodeRects();
    },
    [refreshNodeRects]
  );

  // Unregister a node
  const unregisterNode = useCallback((id: string) => {
    setNodes((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  }, []);

  // Update DOM element reference
  const updateNodeElement = useCallback(
    (id: string, element: HTMLElement | null) => {
      setNodes((prev) => {
        const existing = prev.get(id);
        if (!existing) return prev;
        if (existing.element === element) return prev;

        const next = new Map(prev);
        const newRect =
          element && typeof window !== "undefined"
            ? calculateNodeRect(element)
            : existing.rect;

        next.set(id, {
          ...existing,
          element,
          rect: newRect,
        });
        return next;
      });

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
      }
    };
  }, [refreshNodeRects]);

  // Compute active connections (bidirectional)
  const activeConnections = useMemo<Set<string>>(() => {
    if (!currentFocusId) return new Set();

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
    if (!currentFocusId) return [];

    const focusNode = nodes.get(currentFocusId);
    if (!focusNode?.rect || !focusNode.rect.isVisible) return [];

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
  const getNode = useCallback((id: string) => nodes.get(id), [nodes]);

  const getConnectedNodes = useCallback(
    (id: string) => {
      const node = nodes.get(id);
      if (!node) return [];

      const connected: ConstellationNodeData[] = [];
      const ids = new Set(node.connections || []);

      for (const [otherId, otherNode] of nodes.entries()) {
        if (otherNode.connections?.includes(id)) {
          ids.add(otherId);
        }
      }

      for (const connId of ids) {
        const found = nodes.get(connId);
        if (found) connected.push(found);
      }

      return connected;
    },
    [nodes]
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
