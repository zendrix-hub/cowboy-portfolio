"use client";

import React, { useSyncExternalStore } from "react";

const formatters = {
  cebu: new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Manila",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }),
  tokyo: new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }),
};

function subscribe(callback: () => void) {
  const id = window.setInterval(callback, 15_000);
  return () => window.clearInterval(id);
}

function getSnapshot() {
  const now = new Date();
  return `${formatters.cebu.format(now)}|${formatters.tokyo.format(now)}`;
}

// Rendered on the server and during hydration: no time yet, so no mismatch.
function getServerSnapshot() {
  return "--:--|--:--";
}

/**
 * Cebu and Tokyo local time side by side: the two are always one hour apart,
 * which matters to anyone planning a call or a working day across both.
 */
export default function BearingClock() {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  const [cebu, tokyo] = snapshot.split("|");

  return (
    <div className="w-full grid grid-cols-2 gap-2.5">
      <div className="p-3 rounded-xl bg-[var(--zone-bg)]/60 border border-[var(--line)]/20">
        <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--fg-2)] block">
          Cebu <span lang="ja">セブ</span> · UTC+8
        </span>
        <span className="font-fraunces text-[1.5rem] leading-tight text-[var(--fg)] tabular-nums">
          {cebu}
        </span>
      </div>
      <div className="p-3 rounded-xl bg-[var(--zone-bg)]/60 border border-[var(--line)]/20">
        <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--fg-2)] block">
          Tokyo <span lang="ja">東京</span> · UTC+9
        </span>
        <span className="font-fraunces text-[1.5rem] leading-tight text-[var(--fg)] tabular-nums">
          {tokyo}
        </span>
      </div>
      <p className="col-span-2 m-0 font-mono text-[0.6875rem] text-[var(--fg-2)]">
        Cebu is one hour behind Tokyo, all year: a shared working day.
      </p>
    </div>
  );
}
