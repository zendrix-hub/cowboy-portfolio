"use client";

import React from "react";
import { CurrentProvider, useCurrentContext } from "./CurrentContext";

function InnerShell({ children }: { children: React.ReactNode }) {
  const { activeTributary } = useCurrentContext();

  return (
    <div
      id="current-page-wrapper"
      data-tributary={activeTributary}
      className="relative w-full overflow-x-hidden min-h-screen transition-colors duration-700"
    >
      {children}
    </div>
  );
}

export default function CurrentShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CurrentProvider>
      <InnerShell>{children}</InnerShell>
    </CurrentProvider>
  );
}
