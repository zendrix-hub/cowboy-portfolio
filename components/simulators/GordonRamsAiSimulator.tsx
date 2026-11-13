"use client";

import React, { useState } from "react";

interface PromptPreset {
  chip: string;
  query: string;
  ragChunk: string;
  roast: string;
}

const PRESETS: PromptPreset[] = [
  {
    chip: "Broke Student Dinner",
    query: "Cheap high-protein dinner after BJJ training?",
    ragChunk: "RULE 3: BROKE STUDENT NUTRITION (Eggs, Canned Tuna, Local Kangkong)",
    roast:
      "Right, wake up! You just rolled for two hours and you want cheap fuel? Eggs, canned tuna, and fresh kangkong stir-fry. 46g of clean protein for under 110 pesos (420 kcal | 46g P | 12g F | 8g C). Do NOT drown it in instant sodium rubbish or I'll throw you out of my kitchen. Proper food!",
  },
  {
    chip: "Post-BJJ Recovery",
    query: "Should I skip my rest day to cut faster?",
    ragChunk: "RULE 2: RECOVERY PROTOCOL FOR ENDURANCE (Rest days mandatory, 15m hip flexors)",
    roast:
      "Are you out of your mind?! Rest days are NOT optional! If you don't do your 15 minutes of dynamic hip flexor mobility and take an ice bath, your muscles will be stiffer than an overcooked steak. Rest properly or you won't last three rounds!",
  },
  {
    chip: "Keto Hydration",
    query: "Why do I feel exhausted on day 3 of low carb?",
    ragChunk: "RULE 1: KETO HYDRATION (Min 3L water + sodium & potassium replenishment)",
    roast:
      "Because you're completely dehydrated, you doughnut! When you drop carbs, your body flushes water like a broken faucet. Drink at least 3 liters of water today and supplement with sodium and potassium immediately to kill the keto flu. Move it!",
  },
];

export function GordonRamsAiSimulator() {
  const [calories, setCalories] = useState<number>(1850);
  const [protein, setProtein] = useState<number>(142);
  const [activePreset, setActivePreset] = useState<PromptPreset>(PRESETS[0]);
  const [isQuerying, setIsQuerying] = useState<boolean>(false);

  // Michelin Rating Calculation
  const targetCalories = 2310;
  const diffPct = (Math.abs(calories - targetCalories) / targetCalories) * 100;
  const isMichelin = diffPct <= 20;
  const isDisapproved = diffPct > 35;

  const ratingTitle = isMichelin
    ? "*** RATING (MICHELIN STANDARD)"
    : isDisapproved
    ? "DISAPPROVED (0 STARS)"
    : "** RATING (WORK IN PROGRESS)";
  const ratingColor = isMichelin ? "#FFD700" : isDisapproved ? "#E32636" : "#E6C229";
  const ratingQuote = isMichelin
    ? '"Solid discipline, Chef! Macros on track for optimal athletic recovery."'
    : isDisapproved
    ? '"An absolute caloric disaster! Wake up and stick to your fuel targets!"'
    : '"Decent plate, but tighten up your macros before dinner service!"';

  const selectPreset = (p: PromptPreset) => {
    setIsQuerying(true);
    setActivePreset(p);
    setTimeout(() => {
      setIsQuerying(false);
    }, 450);
  };

  return (
    <div className="w-full h-full bg-[#050505] text-[#FAFAFA] flex flex-col justify-between p-3 select-none font-sans overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#222]">
        <div className="flex items-center gap-2">
          <span className="text-[0.7rem] font-black text-[#E32636] font-mono tracking-wider">
            GORDON RAMSAI
          </span>
          <span className="text-[0.6rem] text-zinc-400 font-mono hidden sm:inline">
            {"// CHEF ZENDRIX (BJJ / MARTIAL ARTS)"}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[0.6rem] font-mono">
          <span className="px-1.5 py-0.5 rounded bg-[#1C080A] text-[#E32636] border border-[#E32636]/40 font-bold">
            HELL&apos;S KITCHEN INFERNO
          </span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 my-2 flex-1 overflow-hidden">
        {/* Left Column: Interactive Macro Tracker & Michelin Widget (5 cols) */}
        <div className="sm:col-span-5 flex flex-col justify-between space-y-2 bg-[#0c0c0e] p-2.5 rounded-lg border border-[#222]">
          {/* Michelin Star Rating Card */}
          <div
            className="p-2 rounded bg-[#121214] border-l-4 transition-all"
            style={{ borderColor: ratingColor }}
          >
            <span className="text-[0.55rem] font-mono font-bold text-zinc-400 block tracking-wider uppercase">
              Chef&apos;s Accountability Rating
            </span>
            <span
              className="text-[0.75rem] font-black tracking-tight block my-0.5"
              style={{ color: ratingColor }}
            >
              {ratingTitle}
            </span>
            <p className="text-[0.6rem] text-zinc-300 italic leading-snug">
              {ratingQuote}
            </p>
          </div>

          {/* Interactive Intake Sliders */}
          <div className="space-y-1.5">
            <span className="text-[0.6rem] font-mono font-bold text-zinc-300 uppercase tracking-wider block">
              Daily Fuel Sliders (Drag to Test)
            </span>

            {/* Calories Slider */}
            <div>
              <div className="flex justify-between text-[0.6rem] font-mono">
                <span className="text-zinc-400">Calories</span>
                <span className="font-bold text-amber-300">{calories} / 2,310 kcal</span>
              </div>
              <input
                type="range"
                aria-label="Calories eaten today (demo input)"
                min="1000"
                max="3200"
                step="50"
                value={calories}
                onChange={(e) => setCalories(Number(e.target.value))}
                className="w-full h-1.5 bg-[#1a1a1e] rounded appearance-none cursor-pointer accent-[#E32636]"
              />
            </div>

            {/* Protein Slider */}
            <div>
              <div className="flex justify-between text-[0.6rem] font-mono">
                <span className="text-zinc-400">Protein</span>
                <span className="font-bold text-emerald-400">{protein} / 154 g</span>
              </div>
              <input
                type="range"
                aria-label="Protein eaten today, grams (demo input)"
                min="60"
                max="220"
                step="2"
                value={protein}
                onChange={(e) => setProtein(Number(e.target.value))}
                className="w-full h-1.5 bg-[#1a1a1e] rounded appearance-none cursor-pointer accent-emerald-400"
              />
            </div>
          </div>
        </div>

        {/* Right Column: RAG Retrieval & Gordon's Signature Roast Box (7 cols) */}
        <div className="sm:col-span-7 flex flex-col justify-between bg-[#0c0c0e] p-2.5 rounded-lg border border-[#222]">
          {/* Quick Prompt Chips */}
          <div>
            <span className="text-[0.6rem] font-mono font-bold text-zinc-400 uppercase tracking-wider block mb-1">
              Select Test Query (ChromaDB RAG)
            </span>
            <div className="flex flex-wrap gap-1">
              {PRESETS.map((p) => (
                <button
                  key={p.chip}
                  onClick={() => selectPreset(p)}
                  className={`px-2 py-0.5 rounded text-[0.6rem] font-mono transition-all border ${
                    activePreset.chip === p.chip
                      ? "bg-[#E32636] text-white border-[#E32636] font-bold shadow-sm"
                      : "bg-[#18181b] text-zinc-300 border-[#333] hover:border-zinc-500"
                  }`}
                >
                  {p.chip}
                </button>
              ))}
            </div>
          </div>

          {/* ChromaDB Vector Retrieval Line */}
          <div className="p-1.5 rounded bg-[#0f172a] border border-sky-500/30 my-1">
            <span className="text-[0.55rem] font-mono text-sky-400 font-bold block">
              CHROMADB LOCAL RAG // COSINE SIMILARITY 0.94
            </span>
            <span className="text-[0.6rem] font-mono text-slate-300 truncate block">
              {activePreset.ragChunk}
            </span>
          </div>

          {/* Gordon's Roast Box */}
          <div
            className={`p-2 rounded bg-[#1C080A] border-l-4 border-[#E32636] transition-opacity duration-200 ${
              isQuerying ? "opacity-50" : "opacity-100"
            }`}
          >
            <span className="text-[0.58rem] font-mono font-bold text-[#E32636] block tracking-wide uppercase mb-0.5">
              Chef Gordon Critique (Inferno Mood)
            </span>
            <p className="text-[0.65rem] text-[#FAFAFA] font-sans leading-relaxed line-clamp-3">
              &quot;{activePreset.roast}&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Telemetry Footer */}
      <div className="pt-2 border-t border-[#222] flex items-center justify-between text-[0.6rem] font-mono text-zinc-400">
        <span className="flex items-center gap-1.5 text-[#E32636]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E32636] animate-pulse" />
          <span>GEMINI 1.5 PRO // LOCAL RAG GROUNDED</span>
        </span>
        <span>STREAMLIT • LANGFUSE OBSERVABILITY</span>
      </div>
    </div>
  );
}
