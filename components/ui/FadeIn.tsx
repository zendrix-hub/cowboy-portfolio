"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "motion/react";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: FadeInProps) {
  const getDirectionOffset = () => {
    switch (direction) {
      case "up":
        return { y: 24, x: 0 };
      case "down":
        return { y: -24, x: 0 };
      case "left":
        return { x: -24, y: 0 };
      case "right":
        return { x: 24, y: 0 };
      default:
        return { y: 24, x: 0 };
    }
  };

  const initialOffset = getDirectionOffset();

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className={className}
        initial={{
          opacity: 0,
          x: initialOffset.x,
          y: initialOffset.y,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
        }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.5,
          delay: delay,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
