"use client";

import React, { useState } from "react";

export function DaloyAquaSimulator() {
  const [moisture, setMoisture] = useState<number>(38);
  const [waterLevel, setWaterLevel] = useState<number>(6.4);
  const [copraMoisture, setCopraMoisture] = useState<number>(11.2);

  // Dynamic Rule calculations
  const isCriticalMoisture = moisture < 35;
  const isHighMoisture = moisture > 65;
  const moistureStatus = isCriticalMoisture
    ? "CRITICAL LOW (Trigger Gate 2)"
    : isHighMoisture
    ? "SATURATED (Halt Inflow)"
    : "NOMINAL (Vegetative Rice)";

  // Copra pricing formula
  // Base ₱32/kg; if moisture > 6%, deduct 0.6% price per % excess moisture
  const excessMoisture = Math.max(0, copraMoisture - 6.0);
  const deductionPct = excessMoisture * 0.05;
  const netPrice = Math.max(18, 32.0 * (1 - deductionPct));
  const copraGrade = copraMoisture <= 8 ? "Premium Grade A" : copraMoisture <= 14 ? "Standard Grade B" : "High Moisture (Discounted)";

  return (
    <div className="w-full h-full bg-[#05161a] text-[#e2e8f0] flex flex-col justify-between p-3 select-none font-sans overflow-hidden">
      {/* Telemetry Status Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-[#0f3a44]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-[0.68rem] font-bold tracking-tight text-teal-300 font-mono">
            LORA TELEMETRY HUB // NODE #04 (PLOT 3)
          </span>
        </div>
        <div className="flex items-center gap-2 text-[0.6rem] font-mono">
          <span className="text-emerald-400 font-semibold">TX: 433MHz</span>
          <span className="text-zinc-500">•</span>
          <span className="text-teal-300">BATTERY: 4.12V</span>
        </div>
      </div>

      {/* Interactive Controls & Gauges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
        {/* Left Column: Interactive Telemetry Sliders */}
        <div className="space-y-2.5 bg-[#0a232b] p-2.5 rounded-lg border border-[#11404c]">
          <span className="text-[0.65rem] font-mono font-bold text-teal-300 uppercase block tracking-wider">
            1. Field Sensor Controls (Drag to Test)
          </span>

          {/* Moisture Slider */}
          <div>
            <div className="flex justify-between text-[0.65rem] font-mono">
              <span className="text-zinc-300">Soil Moisture (VWC)</span>
              <span className={`font-bold ${isCriticalMoisture ? "text-amber-400" : "text-teal-300"}`}>
                {moisture}%
              </span>
            </div>
            <input
              type="range"
              aria-label="Soil moisture, percent (demo input)"
              min="15"
              max="85"
              value={moisture}
              onChange={(e) => setMoisture(Number(e.target.value))}
              className="w-full h-1.5 bg-[#05161a] rounded-lg appearance-none cursor-pointer accent-teal-400 my-1"
            />
          </div>

          {/* Water Level Slider */}
          <div>
            <div className="flex justify-between text-[0.65rem] font-mono">
              <span className="text-zinc-300">Canal Water Level</span>
              <span className="font-bold text-sky-300">{waterLevel.toFixed(1)} cm</span>
            </div>
            <input
              type="range"
              aria-label="Canal water level, centimetres (demo input)"
              min="0"
              max="15"
              step="0.2"
              value={waterLevel}
              onChange={(e) => setWaterLevel(Number(e.target.value))}
              className="w-full h-1.5 bg-[#05161a] rounded-lg appearance-none cursor-pointer accent-sky-400 my-1"
            />
          </div>

          {/* Copra Moisture Slider */}
          <div>
            <div className="flex justify-between text-[0.65rem] font-mono">
              <span className="text-zinc-300">Copra Moisture Ratio</span>
              <span className="font-bold text-amber-300">{copraMoisture.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              aria-label="Copra moisture, percent (demo input)"
              min="5"
              max="22"
              step="0.5"
              value={copraMoisture}
              onChange={(e) => setCopraMoisture(Number(e.target.value))}
              className="w-full h-1.5 bg-[#05161a] rounded-lg appearance-none cursor-pointer accent-amber-400 my-1"
            />
          </div>
        </div>

        {/* Right Column: Agronomy Rule Engine & Live Valuation */}
        <div className="space-y-2 bg-[#0a232b] p-2.5 rounded-lg border border-[#11404c] flex flex-col justify-between">
          <div>
            <span className="text-[0.65rem] font-mono font-bold text-teal-300 uppercase block tracking-wider">
              2. Agronomy Rule Engine
            </span>

            {/* Spec 001 Irrigation Status */}
            <div className="mt-1.5 p-1.5 rounded bg-[#06191e] border border-[#0f3a44]">
              <span className="text-[0.58rem] font-mono text-zinc-400 block">SPEC 001 IRRIGATION TRIGGER</span>
              <span
                className={`text-[0.68rem] font-mono font-bold block ${
                  isCriticalMoisture ? "text-amber-400 animate-pulse" : "text-emerald-400"
                }`}
              >
                {moistureStatus}
              </span>
            </div>

            {/* Spec 003 Copra Price Calculator */}
            <div className="mt-1.5 p-1.5 rounded bg-[#06191e] border border-[#0f3a44]">
              <div className="flex justify-between items-center text-[0.58rem] font-mono text-zinc-400">
                <span>SPEC 003 COPRA VALUATION</span>
                <span className="text-amber-300 font-semibold">{copraGrade}</span>
              </div>
              <div className="flex items-baseline justify-between mt-0.5">
                <span className="text-[0.65rem] text-zinc-300 font-mono">Net Fair Market:</span>
                <span className="text-[0.95rem] font-mono font-black text-emerald-400">
                  ₱{netPrice.toFixed(2)}/kg
                </span>
              </div>
            </div>
          </div>

          <span className="text-[0.55rem] font-mono text-zinc-500">
            Eliminates middleman price gouging via transparent field curve
          </span>
        </div>
      </div>

      {/* Outbound SMS Alert Preview */}
      <div className="p-2 rounded-lg bg-[#0e3038] border border-teal-500/40">
        <div className="flex items-center justify-between text-[0.6rem] font-mono mb-1">
          <span className="text-teal-300 font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            <span>OUTBOUND SMS DISPATCH // TO: +63 917 552 ****</span>
          </span>
          <span className="text-emerald-400 font-semibold">GSM 0s LATENCY</span>
        </div>
        <p className="text-[0.65rem] font-mono text-white leading-relaxed">
          &quot;DALOYAQUA ALERT: Plot 3 moisture is {moisture}%. {isCriticalMoisture ? "Canal Gate 2 irrigation required immediately." : "Irrigation levels optimal."} Copra Batch: ₱{netPrice.toFixed(2)}/kg ({copraGrade}).&quot;
        </p>
      </div>
    </div>
  );
}
