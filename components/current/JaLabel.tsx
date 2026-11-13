import React from "react";

/** Small Japanese sub-label shown beside an English section eyebrow. */
export default function JaLabel({ children }: { children: string }) {
  return (
    <span
      lang="ja"
      className="jp-text ml-2 pl-2 border-l border-[var(--line)]/40 normal-case tracking-normal"
    >
      {children}
    </span>
  );
}
