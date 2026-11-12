"use client";

import React, { useState } from "react";

interface Book {
  id: string;
  title: string;
  category: "CS" | "Literature" | "Engineering";
  available: boolean;
  isbn: string;
}

const INITIAL_BOOKS: Book[] = [
  { id: "1", title: "Clean Architecture", category: "CS", available: true, isbn: "978-0134494166" },
  { id: "2", title: "Designing Data-Intensive Apps", category: "CS", available: true, isbn: "978-1449373320" },
  { id: "3", title: "Noli Me Tangere", category: "Literature", available: false, isbn: "978-0143106395" },
  { id: "4", title: "Structural Analysis (9th Ed)", category: "Engineering", available: true, isbn: "978-0133942842" },
];

export function ReadHubSimulator() {
  const [role, setRole] = useState<"STUDENT" | "ADMIN">("STUDENT");
  const [selectedCat, setSelectedCat] = useState<"All" | "CS" | "Literature" | "Engineering">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [actionLog, setActionLog] = useState<{ status: string; latency: string; endpoint: string }>({
    status: "HTTP 200 OK",
    latency: "14ms",
    endpoint: "GET /api/v1/books",
  });

  const filteredBooks = books.filter((b) => {
    const matchCat = selectedCat === "All" || b.category === selectedCat;
    const matchQ = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.isbn.includes(searchQuery);
    return matchCat && matchQ;
  });

  const toggleBorrow = (bookId: string) => {
    setBooks((prev) =>
      prev.map((b) => {
        if (b.id === bookId) {
          const nextState = !b.available;
          setActionLog({
            status: nextState ? "HTTP 200 OK (RETURNED)" : "HTTP 201 CREATED (BORROWED)",
            latency: `${Math.floor(Math.random() * 8 + 12)}ms`,
            endpoint: `POST /api/v1/loans/${bookId}`,
          });
          return { ...b, available: nextState };
        }
        return b;
      })
    );
  };

  return (
    <div className="w-full h-full bg-[#0a0f16] text-[#e2e8f0] flex flex-col justify-between p-3 select-none font-sans overflow-hidden">
      {/* Top Controls: Role & Endpoints */}
      <div className="flex items-center justify-between pb-2 border-b border-[#1b2536] gap-2">
        <div className="flex items-center gap-1.5">
          <span className="text-[0.65rem] font-mono text-zinc-400">JWT RBAC:</span>
          <button
            onClick={() => {
              const newRole = role === "STUDENT" ? "ADMIN" : "STUDENT";
              setRole(newRole);
              setActionLog({
                status: "JWT 200 REFRESHED",
                latency: "11ms",
                endpoint: `/api/v1/auth/role?as=${newRole}`,
              });
            }}
            className={`px-2 py-0.5 rounded text-[0.65rem] font-mono font-bold transition-all border ${
              role === "ADMIN"
                ? "bg-purple-950/80 text-purple-300 border-purple-500/60 shadow-sm"
                : "bg-cyan-950/80 text-cyan-300 border-cyan-500/60 shadow-sm"
            }`}
          >
            ROLE_{role} (Click to Toggle)
          </button>
        </div>

        {/* Live Latency & Status */}
        <div className="flex items-center gap-2 font-mono text-[0.6rem]">
          <span className="text-emerald-400 font-semibold">{actionLog.status}</span>
          <span className="text-zinc-500">•</span>
          <span className="text-cyan-400">{actionLog.latency}</span>
        </div>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="my-2 flex items-center justify-between gap-2">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search catalog or ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-2 py-1 rounded bg-[#111927] border border-[#223048] text-[0.7rem] text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 font-mono"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1">
          {(["All", "CS", "Literature", "Engineering"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-1.5 py-0.5 rounded text-[0.6rem] font-mono transition-all ${
                selectedCat === cat
                  ? "bg-cyan-600 text-white font-semibold"
                  : "bg-[#162133] text-zinc-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Catalog Table */}
      <div className="flex-1 overflow-y-auto space-y-1.5 my-1 pr-1">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="p-2 rounded-lg bg-[#111927] border border-[#1b2536] flex items-center justify-between gap-2 hover:border-[#2a3b56] transition-all"
          >
            <div className="flex flex-col min-w-0">
              <span className="text-[0.75rem] font-semibold text-white truncate">{book.title}</span>
              <span className="text-[0.6rem] font-mono text-zinc-400">
                {book.category} • ISBN: {book.isbn}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`text-[0.6rem] font-mono px-1.5 py-0.5 rounded ${
                  book.available
                    ? "bg-emerald-950/70 text-emerald-400 border border-emerald-800/50"
                    : "bg-rose-950/70 text-rose-400 border border-rose-800/50"
                }`}
              >
                {book.available ? "AVAILABLE" : "ON LOAN"}
              </span>

              <button
                onClick={() => toggleBorrow(book.id)}
                className={`px-2 py-1 rounded text-[0.65rem] font-bold transition-all ${
                  book.available
                    ? "bg-cyan-600 hover:bg-cyan-500 text-white"
                    : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                }`}
              >
                {book.available ? "Borrow" : "Return"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Telemetry Footer */}
      <div className="pt-2 border-t border-[#1b2536] flex items-center justify-between text-[0.6rem] font-mono text-zinc-400">
        <span className="flex items-center gap-1.5 text-cyan-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>{actionLog.endpoint}</span>
        </span>
        <span>SPRING BOOT 3 • SHEDLOCK DISTRIBUTED</span>
      </div>
    </div>
  );
}
