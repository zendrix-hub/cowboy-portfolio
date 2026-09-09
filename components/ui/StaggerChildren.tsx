"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "motion/react";

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export default function StaggerChildren({
  children,
  className = "",
  staggerDelay = 0.08,
}: StaggerChildrenProps) {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className={className}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-30px" }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}

interface AnimatedItemProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedItem({ children, className = "" }: AnimatedItemProps) {
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.21, 0.47, 0.32, 0.98] as const,
      },
    },
  };

  return (
    <m.div className={className} variants={itemVariants}>
      {children}
    </m.div>
  );
}
