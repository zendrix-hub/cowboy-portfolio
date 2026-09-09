"use client";

import React, { forwardRef, HTMLAttributes, useCallback, useRef } from "react";
import { useConstellationNode, UseConstellationNodeOptions } from "@/hooks/useConstellationNode";
import { cn } from "@/lib/utils";

const EMPTY_CONNECTIONS: string[] = [];

export interface ConstellationNodeProps
  extends UseConstellationNodeOptions,
    Omit<HTMLAttributes<HTMLDivElement>, "id"> {
  children?: React.ReactNode;
  as?: React.ElementType;
  showAnchorPip?: boolean;
  pipPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  interactive?: boolean;
}

export const ConstellationNode = forwardRef<HTMLDivElement, ConstellationNodeProps>(
  function ConstellationNode(
    {
      id,
      label,
      category = "custom",
      tier = "minor",
      connections = EMPTY_CONNECTIONS,
      color,
      glowColor,
      metadata,
      disabled = false,
      children,
      as: Component = "div",
      showAnchorPip = false,
      pipPosition = "top-right",
      interactive = true,
      className,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      onClick,
      ...rest
    },
    forwardedRef
  ) {
    const {
      ref: internalRef,
      isActive,
      isHovered,
      isConnected,
      isDimmed,
      handleMouseEnter,
      handleMouseLeave,
      handleFocus,
      handleBlur,
      handleClick,
    } = useConstellationNode<HTMLDivElement>({
      id,
      label,
      category,
      tier,
      connections,
      color,
      glowColor,
      metadata,
      disabled,
    });

    const forwardedRefRef = useRef(forwardedRef);
    forwardedRefRef.current = forwardedRef;

    // Stable ref callback: will never change identity between renders
    const setRef = useCallback(
      (node: HTMLDivElement | null) => {
        internalRef(node);
        const fRef = forwardedRefRef.current;
        if (typeof fRef === "function") {
          fRef(node);
        } else if (fRef) {
          fRef.current = node;
        }
      },
      [internalRef]
    );

    const handleEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (interactive) handleMouseEnter();
        onMouseEnter?.(e);
      },
      [interactive, handleMouseEnter, onMouseEnter]
    );

    const handleLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (interactive) handleMouseLeave();
        onMouseLeave?.(e);
      },
      [interactive, handleMouseLeave, onMouseLeave]
    );

    const handleFoc = useCallback(
      (e: React.FocusEvent<HTMLDivElement>) => {
        if (interactive) handleFocus();
        onFocus?.(e);
      },
      [interactive, handleFocus, onFocus]
    );

    const handleBlr = useCallback(
      (e: React.FocusEvent<HTMLDivElement>) => {
        if (interactive) handleBlur();
        onBlur?.(e);
      },
      [interactive, handleBlur, onBlur]
    );

    const handleClk = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (interactive) handleClick();
        onClick?.(e);
      },
      [interactive, handleClick, onClick]
    );

    const pipPositionClasses = {
      "top-left": "-top-1 -left-1",
      "top-right": "-top-1 -right-1",
      "bottom-left": "-bottom-1 -left-1",
      "bottom-right": "-bottom-1 -right-1",
      center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    };

    return (
      <Component
        ref={setRef}
        data-constellation-id={id}
        data-constellation-category={category}
        data-constellation-tier={tier}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onFocus={handleFoc}
        onBlur={handleBlr}
        onClick={handleClk}
        className={cn(
          "relative transition-all duration-300 ease-out",
          // Visual states: Active, Connected, Dimmed
          isActive &&
            "ring-2 ring-cyan-400 dark:ring-cyan-300 shadow-[0_0_28px_rgba(6,182,212,0.4)] scale-[1.01] z-20",
          isConnected &&
            !isActive &&
            "ring-1 ring-cyan-500/70 dark:ring-cyan-400/80 shadow-[0_0_18px_rgba(6,182,212,0.25)] z-10",
          isDimmed && "opacity-35 blur-[0.2px] hover:opacity-90 hover:blur-none",
          className
        )}
        {...rest}
      >
        {children}

        {/* Optional visual celestial star anchor pip */}
        {showAnchorPip && (
          <span
            aria-hidden="true"
            className={cn(
              "absolute pointer-events-none z-30 transition-all duration-300 flex items-center justify-center",
              pipPositionClasses[pipPosition]
            )}
          >
            <span
              className={cn(
                "rounded-full transition-all duration-300",
                tier === "core" ? "w-2.5 h-2.5" : "w-1.5 h-1.5",
                isActive
                  ? "bg-cyan-300 shadow-[0_0_10px_#22d3ee] scale-150 animate-pulse"
                  : isConnected
                  ? "bg-cyan-400 shadow-[0_0_6px_#06b6d4] scale-125"
                  : isHovered
                  ? "bg-cyan-400 shadow-[0_0_8px_#06b6d4]"
                  : "bg-cyan-500/60 group-hover:bg-cyan-400"
              )}
            />
          </span>
        )}
      </Component>
    );
  }
);
