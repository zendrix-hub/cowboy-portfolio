"use client";

import { useCallback, useEffect, useRef } from "react";
import { useConstellation } from "@/context/ConstellationContext";
import type {
  ConstellationNodeCategory,
  ConstellationNodeTier,
  ConstellationNodeData,
} from "@/types/constellation";

export interface UseConstellationNodeOptions {
  id: string;
  label: string;
  category?: ConstellationNodeCategory;
  tier?: ConstellationNodeTier;
  connections?: string[];
  color?: string;
  glowColor?: string;
  metadata?: Record<string, unknown>;
  disabled?: boolean;
}

export interface UseConstellationNodeReturn<T extends HTMLElement = HTMLElement> {
  ref: (node: T | null) => void;
  nodeData: ConstellationNodeData | undefined;
  isActive: boolean;
  isHovered: boolean;
  isConnected: boolean;
  isDimmed: boolean;
  isConnecting: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleFocus: () => void;
  handleBlur: () => void;
  handleClick: () => void;
}

const EMPTY_CONNECTIONS: string[] = [];

export function useConstellationNode<T extends HTMLElement = HTMLElement>(
  options: UseConstellationNodeOptions
): UseConstellationNodeReturn<T> {
  const {
    id,
    label,
    category = "custom",
    tier = "minor",
    connections = EMPTY_CONNECTIONS,
    color,
    glowColor,
    metadata,
    disabled = false,
  } = options;

  const {
    hoveredNodeId,
    setActiveNodeId,
    setHoveredNodeId,
    registerNode,
    unregisterNode,
    updateNodeElement,
    getNode,
    isNodeActive,
    isNodeConnected,
    isNodeDimmed,
  } = useConstellation();

  const elementRef = useRef<T | null>(null);

  // Stable ref callback: only updates the DOM element reference
  // Does NOT depend on connections, label, or metadata to avoid re-invoking ref callback on render
  const ref = useCallback(
    (node: T | null) => {
      if (elementRef.current === node) return;
      elementRef.current = node;

      if (disabled) return;

      updateNodeElement(id, node);
    },
    [id, disabled, updateNodeElement]
  );

  // Register or re-register node when configuration or element changes
  useEffect(() => {
    if (disabled) {
      unregisterNode(id);
      return;
    }

    registerNode({
      id,
      label,
      category,
      tier,
      connections,
      color,
      glowColor,
      element: elementRef.current,
      metadata,
    });
  }, [
    id,
    label,
    category,
    tier,
    connections,
    color,
    glowColor,
    metadata,
    disabled,
    registerNode,
    unregisterNode,
  ]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      unregisterNode(id);
    };
  }, [id, unregisterNode]);

  const handleMouseEnter = useCallback(() => {
    if (disabled) return;
    setHoveredNodeId(id);
  }, [id, disabled, setHoveredNodeId]);

  const handleMouseLeave = useCallback(() => {
    if (disabled) return;
    setHoveredNodeId((prev) => (prev === id ? null : prev));
  }, [id, disabled, setHoveredNodeId]);

  const handleFocus = useCallback(() => {
    if (disabled) return;
    setHoveredNodeId(id);
  }, [id, disabled, setHoveredNodeId]);

  const handleBlur = useCallback(() => {
    if (disabled) return;
    setHoveredNodeId((prev) => (prev === id ? null : prev));
  }, [id, disabled, setHoveredNodeId]);

  const handleClick = useCallback(() => {
    if (disabled) return;
    setActiveNodeId((prev) => (prev === id ? null : id));
  }, [id, disabled, setActiveNodeId]);

  const isActive = isNodeActive(id);
  const isHovered = hoveredNodeId === id;
  const isConnected = isNodeConnected(id);
  const isDimmed = isNodeDimmed(id);
  const isConnecting = isActive || isConnected;

  return {
    ref,
    nodeData: getNode(id),
    isActive,
    isHovered,
    isConnected,
    isDimmed,
    isConnecting,
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
    handleBlur,
    handleClick,
  };
}
