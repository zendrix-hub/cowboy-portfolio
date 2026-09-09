import React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignmentClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`mb-12 max-w-2xl ${alignmentClass}`}>
      {eyebrow && (
        <span className="inline-block text-xs font-mono font-medium uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-2">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
