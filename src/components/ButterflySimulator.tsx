/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { calculateButterfly, compareFractions } from '../utils/mathCore';
import { ArrowRight, Sparkles, RefreshCw, CheckCircle2, Split } from 'lucide-react';

export const ButterflySimulator: React.FC = () => {
  const [a, setA] = useState<number>(4);
  const [b, setB] = useState<number>(7);
  const [c, setC] = useState<number>(3);
  const [d, setD] = useState<number>(8);
  const [op, setOp] = useState<'+' | '-'>('+');
  const [activeFrame, setActiveFrame] = useState<number>(3); // 1: Left Wing, 2: Right Wing, 3: Combined & Base

  const result = calculateButterfly(a || 1, b || 1, c || 1, d || 1, op);
  const comparison = compareFractions(a || 1, b || 1, c || 1, d || 1);

  const presets = [
    { label: '4/7 + 3/8 (Textbook P1)', a: 4, b: 7, c: 3, d: 8, op: '+' as const },
    { label: '2/5 + 3/7 (Figure 1.2)', a: 2, b: 5, c: 3, d: 7, op: '+' as const },
    { label: '5/6 − 2/5 (Page 3)', a: 5, b: 6, c: 2, d: 5, op: '-' as const },
    { label: '3/5 + 2/7 (Page 2 Unit 2)', a: 3, b: 5, c: 2, d: 7, op: '+' as const },
    { label: '9/13 vs 11/16 (Problem P3)', a: 9, b: 13, c: 11, d: 16, op: '+' as const },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Vedic & Visual Fractions
            </span>
            <span className="text-xs text-slate-400">OpenStax Ch. 4 & Urdhva Cross-Flow</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Butterfly Cross-Multiplication Simulator</h2>
          <p className="text-sm text-slate-400">
            Rapid single-line addition, subtraction, and inequality testing without computing slow lowest common denominators.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Presets:</span>
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setA(preset.a);
                setB(preset.b);
                setC(preset.c);
                setD(preset.d);
                setOp(preset.op);
                setActiveFrame(3);
              }}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700/60"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Controls & Operation Picker */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
        {/* Fraction 1 */}
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-xs font-semibold text-cyan-400">Fraction 1</span>
          <div className="flex flex-col items-center w-20">
            <input
              type="number"
              aria-label="Fraction 1 Numerator"
              value={a}
              onChange={(e) => setA(parseInt(e.target.value, 10) || 0)}
              className="w-full text-center py-1.5 bg-slate-800 border border-cyan-500/30 rounded-t-lg text-lg font-bold text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <div className="w-full h-0.5 bg-cyan-500/50"></div>
            <input
              type="number"
              aria-label="Fraction 1 Denominator"
              value={b}
              min="1"
              onChange={(e) => setB(Math.max(1, parseInt(e.target.value, 10) || 1))}
              className="w-full text-center py-1.5 bg-slate-800 border border-cyan-500/30 rounded-b-lg text-lg font-bold text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        {/* Operation Picker */}
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="text-xs font-semibold text-slate-400">Operation</span>
          <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setOp('+')}
              className={`px-3 py-1 text-sm font-bold rounded-lg transition ${
                op === '+' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              +
            </button>
            <button
              onClick={() => setOp('-')}
              className={`px-3 py-1 text-sm font-bold rounded-lg transition ${
                op === '-' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              −
            </button>
          </div>
        </div>

        {/* Fraction 2 */}
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-xs font-semibold text-emerald-400">Fraction 2</span>
          <div className="flex flex-col items-center w-20">
            <input
              type="number"
              aria-label="Fraction 2 Numerator"
              value={c}
              onChange={(e) => setC(parseInt(e.target.value, 10) || 0)}
              className="w-full text-center py-1.5 bg-slate-800 border border-emerald-500/30 rounded-t-lg text-lg font-bold text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <div className="w-full h-0.5 bg-emerald-500/50"></div>
            <input
              type="number"
              aria-label="Fraction 2 Denominator"
              value={d}
              min="1"
              onChange={(e) => setD(Math.max(1, parseInt(e.target.value, 10) || 1))}
              className="w-full text-center py-1.5 bg-slate-800 border border-emerald-500/30 rounded-b-lg text-lg font-bold text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Step Flow Buttons */}
        <div className="md:col-span-2 flex flex-col gap-2">
          <span className="text-xs font-semibold text-slate-400">Interactive Frame Animation</span>
          <div className="flex gap-1.5">
            <button
              onClick={() => setActiveFrame(1)}
              className={`flex-1 py-1 px-2 text-xs rounded-lg border font-medium transition ${
                activeFrame === 1
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              1. Left Wing
            </button>
            <button
              onClick={() => setActiveFrame(2)}
              className={`flex-1 py-1 px-2 text-xs rounded-lg border font-medium transition ${
                activeFrame === 2
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              2. Right Wing
            </button>
            <button
              onClick={() => setActiveFrame(3)}
              className={`flex-1 py-1 px-2 text-xs rounded-lg border font-medium transition ${
                activeFrame === 3
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              3. Full Result
            </button>
          </div>
        </div>
      </div>

      {/* Visual Butterfly Canvas & Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: The Visual Butterfly Wings Representation */}
        <div className="lg:col-span-7 bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-3 left-4 text-xs font-mono text-slate-500">
            FRAME {activeFrame}/3: {activeFrame === 1 ? 'Diagonal Arrow d ↗ a' : activeFrame === 2 ? 'Diagonal Arrow b ↖ c' : 'Add Wings & Multiply Base b·d'}
          </div>

          <div className="w-full max-w-md my-4 relative">
            {/* Upper Antennae Wings Values */}
            <div className="flex justify-between items-center mb-4 px-8">
              {/* Left Antenna Badge */}
              <div
                className={`p-3 rounded-2xl border transition-all duration-300 text-center ${
                  activeFrame >= 1
                    ? 'bg-cyan-950/80 border-cyan-500 shadow-lg shadow-cyan-500/10 scale-105'
                    : 'bg-slate-900 border-slate-800 opacity-40'
                }`}
              >
                <div className="text-[10px] uppercase font-bold text-cyan-400">Left Wing (a · d)</div>
                <div className="text-xl font-extrabold text-cyan-200">
                  {a} × {d} = <span className="text-amber-400">{result.leftWing}</span>
                </div>
              </div>

              <div className="text-slate-500 font-bold text-sm px-2">{op}</div>

              {/* Right Antenna Badge */}
              <div
                className={`p-3 rounded-2xl border transition-all duration-300 text-center ${
                  activeFrame >= 2
                    ? 'bg-emerald-950/80 border-emerald-500 shadow-lg shadow-emerald-500/10 scale-105'
                    : 'bg-slate-900 border-slate-800 opacity-40'
                }`}
              >
                <div className="text-[10px] uppercase font-bold text-emerald-400">Right Wing (b · c)</div>
                <div className="text-xl font-extrabold text-emerald-200">
                  {b} × {c} = <span className="text-amber-400">{result.rightWing}</span>
                </div>
              </div>
            </div>

            {/* SVG Connecting Diagonal Wings & Arrows */}
            <div className="relative h-44 flex items-center justify-center">
              <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 400 160">
                {/* Diagonal Left: (70, 120) to (330, 30) - b to c */}
                <path
                  d="M 120 120 L 280 40"
                  stroke={activeFrame >= 2 ? '#10b981' : '#334155'}
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                />
                {/* Diagonal Right: (280, 120) to (120, 40) - d to a */}
                <path
                  d="M 280 120 L 120 40"
                  stroke={activeFrame >= 1 ? '#06b6d4' : '#334155'}
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                />
                {/* Base curve: connecting b and d */}
                <path
                  d="M 120 135 Q 200 155 280 135"
                  stroke={activeFrame >= 3 ? '#f59e0b' : '#334155'}
                  strokeWidth="3"
                  fill="none"
                />
              </svg>

              {/* Fractions Grid */}
              <div className="grid grid-cols-3 gap-8 items-center z-10 w-full px-12">
                {/* Fraction 1 */}
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-xl bg-cyan-900/60 border border-cyan-500 flex items-center justify-center text-2xl font-bold text-cyan-200 shadow-md">
                    {a}
                  </div>
                  <div className="w-12 h-0.5 bg-slate-600 my-1"></div>
                  <div className="w-14 h-14 rounded-xl bg-cyan-950/90 border border-cyan-500/80 flex items-center justify-center text-2xl font-bold text-cyan-200 shadow-md">
                    {b}
                  </div>
                </div>

                {/* Operation Symbol */}
                <div className="text-3xl font-black text-amber-400 text-center">{op}</div>

                {/* Fraction 2 */}
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-xl bg-emerald-900/60 border border-emerald-500 flex items-center justify-center text-2xl font-bold text-emerald-200 shadow-md">
                    {c}
                  </div>
                  <div className="w-12 h-0.5 bg-slate-600 my-1"></div>
                  <div className="w-14 h-14 rounded-xl bg-emerald-950/90 border border-emerald-500/80 flex items-center justify-center text-2xl font-bold text-emerald-200 shadow-md">
                    {d}
                  </div>
                </div>
              </div>
            </div>

            {/* Base Product */}
            <div className="mt-2 flex justify-center">
              <div
                className={`py-2 px-6 rounded-xl border text-center transition-all ${
                  activeFrame >= 3
                    ? 'bg-amber-950/70 border-amber-500 text-amber-200 scale-105'
                    : 'bg-slate-900 border-slate-800 text-slate-500'
                }`}
              >
                <div className="text-[10px] uppercase font-bold text-amber-400">Base Product (b · d)</div>
                <div className="text-lg font-bold">
                  {b} × {d} = <span className="text-white">{result.baseProduct}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Step Breakdown, Reduction, and Inequality Comparison */}
        <div className="lg:col-span-5 space-y-4">
          {/* Butterfly Result Box */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400">Synthesized Result</span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                {result.simplifiedNum}/{result.simplifiedDen}
              </span>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">Step 1: Combine Wings over Base Product</div>
              <div className="text-base font-mono text-slate-200">
                ({result.leftWing} {op} {result.rightWing}) / {result.baseProduct} ={' '}
                <span className="font-bold text-amber-400">
                  {result.combinedWing} / {result.baseProduct}
                </span>
              </div>

              <div className="text-xs text-slate-400 pt-1">Step 2: Reduced to Lowest Terms</div>
              <div className="flex items-center gap-3">
                <div className="text-2xl font-extrabold text-emerald-400">
                  {result.simplifiedNum} / {result.simplifiedDen}
                </div>
                {result.simplifiedNum >= result.simplifiedDen && (
                  <div className="text-xs px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold">
                    Mixed: {result.mixedNumber}
                  </div>
                )}
                <div className="text-xs text-slate-400 font-mono">≈ {result.decimal}</div>
              </div>
            </div>
          </div>

          {/* Rapid Inequality Comparison Panel */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Upward Cross-Product Inequality Test
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Compare <span className="text-cyan-300 font-semibold">{a}/{b}</span> vs{' '}
              <span className="text-emerald-300 font-semibold">{c}/{d}</span> instantly:
            </p>

            <div className="grid grid-cols-3 gap-2 text-center p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div>
                <div className="text-[10px] text-slate-400">Left Product (a·d)</div>
                <div className="text-lg font-bold text-cyan-400">{comparison.leftProduct}</div>
              </div>
              <div className="flex items-center justify-center text-xl font-black text-amber-400">
                {comparison.symbol}
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Right Product (b·c)</div>
                <div className="text-lg font-bold text-emerald-400">{comparison.rightProduct}</div>
              </div>
            </div>

            <div className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              Verdict: Since {comparison.leftProduct} {comparison.symbol} {comparison.rightProduct},{' '}
              <span className="font-bold text-amber-300">
                {a}/{b} {comparison.symbol} {c}/{d}
              </span>
              .
            </div>
          </div>

          {/* Linear Bar Equivalence Strip */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Proportional Strip Model</span>
              <span className="text-[10px] text-slate-500 font-mono">OpenStax Prealgebra 2e Sec 4.1</span>
            </div>
            <div className="w-full bg-slate-800 h-6 rounded-lg overflow-hidden flex border border-slate-700">
              <div
                className="bg-gradient-to-r from-cyan-500 to-amber-500 h-full transition-all duration-500 flex items-center justify-end pr-2 text-[10px] font-bold text-slate-950"
                style={{ width: `${Math.min(100, Math.max(0, result.decimal * 100))}%` }}
              >
                {Math.round(result.decimal * 100)}%
              </div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0% (0.0)</span>
              <span>50% (0.5)</span>
              <span>100% (1.0 Whole)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
