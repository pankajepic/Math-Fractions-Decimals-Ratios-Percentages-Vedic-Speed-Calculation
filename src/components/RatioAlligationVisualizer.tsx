/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  partitionTotal,
  invertNBridgeRatio,
  calculateAlligation,
  calculateComponendoDividendo,
  commutativePercent,
  successivePercentage,
  productConstancy,
} from '../utils/mathCore';
import { ArrowDownRight, ArrowUpRight, Scale, Percent, Shuffle, Layers } from 'lucide-react';

export const RatioAlligationVisualizer: React.FC = () => {
  const [subTab, setSubTab] = useState<
    'alligation' | 'nbridge' | 'partition' | 'commutative' | 'successive' | 'constancy' | 'componendo'
  >('alligation');

  // Alligation State
  const [cheap, setCheap] = useState<number>(12);
  const [dear, setDear] = useState<number>(32);
  const [mean, setMean] = useState<number>(20);

  // N-Bridge State
  const [nbA, setNbA] = useState<number>(2);
  const [nbB, setNbB] = useState<number>(3);
  const [nbC, setNbC] = useState<number>(4);
  const [nbD, setNbD] = useState<number>(5);

  // Partition State
  const [totalVal, setTotalVal] = useState<number>(1200);
  const [partA, setPartA] = useState<number>(3);
  const [partB, setPartB] = useState<number>(5);

  // Commutative % State
  const [commX, setCommX] = useState<number>(72);
  const [commY, setCommY] = useState<number>(12.5);

  // Successive % State
  const [succA, setSuccA] = useState<number>(30);
  const [succB, setSuccB] = useState<number>(-20);

  // Product Constancy State
  const [constRise, setConstRise] = useState<number>(20);

  // Componendo State
  const [compRatioA, setCompRatioA] = useState<number>(13);
  const [compRatioB, setCompRatioB] = useState<number>(5);

  // Computations
  const alligRes = (() => {
    try {
      return calculateAlligation(cheap, dear, mean);
    } catch {
      return null;
    }
  })();

  const nBridgeRes = invertNBridgeRatio(nbA, nbB, nbC, nbD);
  const partRes = partitionTotal(totalVal, partA, partB);
  const commRes = commutativePercent(commX, commY);
  const succRes = successivePercentage(succA, succB);
  const constRes = productConstancy(constRise);
  const compRes = calculateComponendoDividendo(compRatioA, compRatioB);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Units 04 & Ch. 3–4
            </span>
            <span className="text-xs text-slate-400">OpenStax Rice University & NCERT</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Ratios, Alligation & Percentage Architecture</h2>
          <p className="text-sm text-slate-400">
            Speed scaling laws, inverted N-bridge ratio chaining, mixture cross-flow, and commercial arithmetic shortcuts.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {[
            { id: 'alligation', label: 'Alligation (Mixtures)' },
            { id: 'nbridge', label: 'Inverted N-Bridge' },
            { id: 'partition', label: 'Unit-Box Partitioning' },
            { id: 'commutative', label: 'Commutative % Swap' },
            { id: 'successive', label: 'Successive %' },
            { id: 'constancy', label: 'Product Constancy' },
            { id: 'componendo', label: 'Componendo & Dividendo' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setSubTab(t.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                subTab === t.id
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. ALLIGATION RULE SIMULATOR */}
      {subTab === 'alligation' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-300">
              Cross-subtract around the target Mean Concentration <strong className="text-amber-400">(M)</strong> to find mixing ratio of Cheaper <strong className="text-cyan-400">(C)</strong> to Dearer <strong className="text-rose-400">(D)</strong>.
            </div>
            <div className="flex gap-2 text-xs">
              <span className="text-slate-500 self-center">Presets:</span>
              <button
                onClick={() => {
                  setCheap(12);
                  setDear(32);
                  setMean(20);
                }}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
              >
                12% & 32% → 20% (P8)
              </button>
              <button
                onClick={() => {
                  setCheap(15);
                  setDear(40);
                  setMean(25);
                }}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
              >
                15% & 40% → 25% (Drill 12)
              </button>
              <button
                onClick={() => {
                  setCheap(20);
                  setDear(50);
                  setMean(30);
                }}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
              >
                20% & 50% → 30% (Figure 3.1)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Input Controls */}
            <div className="md:col-span-4 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div>
                <label className="text-xs font-semibold text-cyan-400 block mb-1">Cheaper Ingredient (C)</label>
                <input
                  type="number"
                  aria-label="Cheaper Ingredient"
                  value={cheap}
                  onChange={(e) => setCheap(parseFloat(e.target.value) || 0)}
                  className="w-full text-center py-2 bg-slate-900 border border-cyan-500/30 rounded-xl text-lg font-bold text-cyan-300 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-rose-400 block mb-1">Dearer Ingredient (D)</label>
                <input
                  type="number"
                  aria-label="Dearer Ingredient"
                  value={dear}
                  onChange={(e) => setDear(parseFloat(e.target.value) || 0)}
                  className="w-full text-center py-2 bg-slate-900 border border-rose-500/30 rounded-xl text-lg font-bold text-rose-300 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-amber-400 block mb-1">Target Mean (M)</label>
                <input
                  type="number"
                  aria-label="Target Mean"
                  value={mean}
                  onChange={(e) => setMean(parseFloat(e.target.value) || 0)}
                  className="w-full text-center py-2 bg-slate-900 border border-amber-500/30 rounded-xl text-lg font-bold text-amber-300 font-mono"
                />
              </div>
            </div>

            {/* Visual Alligation Cross Diagram */}
            <div className="md:col-span-8 bg-slate-950 p-6 rounded-2xl border border-slate-800 relative">
              <div className="text-xs font-mono text-slate-500 mb-4 text-center">
                ALLIGATION CROSS-MOTION FLOW (D − M) : (M − C)
              </div>

              {alligRes ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 items-center">
                    {/* Left Column: Ingredients */}
                    <div className="space-y-8">
                      <div className="p-3 bg-cyan-950/70 border border-cyan-500/50 rounded-xl text-center">
                        <div className="text-[10px] text-cyan-400 uppercase font-bold">Cheaper (C)</div>
                        <div className="text-xl font-black text-cyan-200 font-mono">{cheap}%</div>
                      </div>

                      <div className="p-3 bg-rose-950/70 border border-rose-500/50 rounded-xl text-center">
                        <div className="text-[10px] text-rose-400 uppercase font-bold">Dearer (D)</div>
                        <div className="text-xl font-black text-rose-200 font-mono">{dear}%</div>
                      </div>
                    </div>

                    {/* Center Column: Mean */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-20 h-20 rounded-2xl bg-amber-500/20 border-2 border-amber-500 flex flex-col items-center justify-center text-center shadow-lg shadow-amber-500/10">
                        <span className="text-[10px] uppercase font-bold text-amber-400">Mean (M)</span>
                        <span className="text-2xl font-black text-amber-300 font-mono">{mean}%</span>
                      </div>
                    </div>

                    {/* Right Column: Cross Differences */}
                    <div className="space-y-8">
                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-center">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Quantity (Cheaper): |D − M|</div>
                        <div className="text-xl font-black text-amber-400 font-mono">
                          {dear} − {mean} = <span className="text-white">{alligRes.diffDearMinusMean}</span>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-center">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Quantity (Dearer): |M − C|</div>
                        <div className="text-xl font-black text-amber-400 font-mono">
                          {mean} − {cheap} = <span className="text-white">{alligRes.diffMeanMinusCheap}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ratio Verdict */}
                  <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="text-xs text-emerald-400 font-semibold">Required Mixing Ratio (Cheaper : Dearer)</div>
                      <div className="text-xs text-slate-400">
                        {alligRes.diffDearMinusMean} : {alligRes.diffMeanMinusCheap} reduces by GCD to:
                      </div>
                    </div>
                    <div className="text-3xl font-black text-emerald-300 font-mono">
                      {alligRes.ratioText}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 text-rose-400 text-sm">
                  Mean concentration must be strictly between Cheaper and Dearer values ({cheap} &lt; {mean} &lt; {dear}).
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. INVERTED N-BRIDGE */}
      {subTab === 'nbridge' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-300">
              Combine linked ratios <strong>A : B</strong> and <strong>B : C</strong> into a continuous 3-term ratio <strong>A : B : C</strong> via the Zig-Zag N-multiplier.
            </div>
            <div className="flex gap-2 text-xs">
              <span className="text-slate-500 self-center">Presets:</span>
              <button
                onClick={() => {
                  setNbA(2);
                  setNbB(3);
                  setNbC(4);
                  setNbD(5);
                }}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
              >
                2:3 & 4:5 → 8:12:15 (Drill 08)
              </button>
              <button
                onClick={() => {
                  setNbA(3);
                  setNbB(4);
                  setNbC(6);
                  setNbD(7);
                }}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
              >
                3:4 & 6:7 → 9:12:14 (P7)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Input Ratios */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Ratio 1 (A : B) and Ratio 2 (B : C)
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 w-16">A : B</span>
                  <input
                    type="number"
                    value={nbA}
                    onChange={(e) => setNbA(parseInt(e.target.value, 10) || 1)}
                    className="w-20 text-center py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-lg font-bold text-cyan-300 font-mono"
                  />
                  <span className="text-slate-500 font-bold">:</span>
                  <input
                    type="number"
                    value={nbB}
                    onChange={(e) => setNbB(parseInt(e.target.value, 10) || 1)}
                    className="w-20 text-center py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-lg font-bold text-cyan-300 font-mono"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 w-16">B : C</span>
                  <input
                    type="number"
                    value={nbC}
                    onChange={(e) => setNbC(parseInt(e.target.value, 10) || 1)}
                    className="w-20 text-center py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-lg font-bold text-emerald-300 font-mono"
                  />
                  <span className="text-slate-500 font-bold">:</span>
                  <input
                    type="number"
                    value={nbD}
                    onChange={(e) => setNbD(parseInt(e.target.value, 10) || 1)}
                    className="w-20 text-center py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-lg font-bold text-emerald-300 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Zig-Zag N Result */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Zig-Zag N-Multiplier Flow: (a·c) : (b·c) : (b·d)
              </div>

              <div className="grid grid-cols-3 gap-2 text-center font-mono">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400">A = a × c</div>
                  <div className="text-xs text-cyan-400">{nbA} × {nbC}</div>
                  <div className="text-lg font-bold text-white mt-1">{nBridgeRes.rawA}</div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400">B = b × c</div>
                  <div className="text-xs text-amber-400">{nbB} × {nbC}</div>
                  <div className="text-lg font-bold text-white mt-1">{nBridgeRes.rawB}</div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400">C = b × d</div>
                  <div className="text-xs text-emerald-400">{nbB} × {nbD}</div>
                  <div className="text-lg font-bold text-white mt-1">{nBridgeRes.rawC}</div>
                </div>
              </div>

              <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-500/30 text-center">
                <div className="text-xs text-emerald-400 font-semibold">Reduced Continuous Ratio A : B : C</div>
                <div className="text-3xl font-black font-mono text-emerald-300 mt-1">
                  {nBridgeRes.ratioText}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. UNIT-BOX PARTITIONING */}
      {subTab === 'partition' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-300">
              Divide a quantity into given ratio parts using the 3-frame unit-box method (Figure 3.1).
            </div>
            <div className="flex gap-2 text-xs">
              <button
                onClick={() => {
                  setTotalVal(1200);
                  setPartA(3);
                  setPartB(5);
                }}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
              >
                1,200 split in 3 : 5 (Page 5)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Total Quantity</label>
                <input
                  type="number"
                  value={totalVal}
                  onChange={(e) => setTotalVal(parseFloat(e.target.value) || 0)}
                  className="w-full text-center py-2 bg-slate-900 border border-slate-700 rounded-xl text-xl font-bold text-amber-400 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-cyan-400 block mb-1">Part A</label>
                  <input
                    type="number"
                    value={partA}
                    onChange={(e) => setPartA(parseInt(e.target.value, 10) || 1)}
                    className="w-full text-center py-2 bg-slate-900 border border-slate-700 rounded-xl text-lg font-bold text-cyan-300 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-emerald-400 block mb-1">Part B</label>
                  <input
                    type="number"
                    value={partB}
                    onChange={(e) => setPartB(parseInt(e.target.value, 10) || 1)}
                    className="w-full text-center py-2 bg-slate-900 border border-slate-700 rounded-xl text-lg font-bold text-emerald-300 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-8 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 font-semibold">Frame 1: Total Units</div>
                  <div className="text-lg font-bold font-mono text-white mt-1">
                    {partA} + {partB} = <span className="text-amber-400">{partRes.totalParts} Parts</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 font-semibold">Frame 2: 1 Unit Value</div>
                  <div className="text-lg font-bold font-mono text-white mt-1">
                    {totalVal} ÷ {partRes.totalParts} = <span className="text-cyan-400">{partRes.unitValue}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 font-semibold">Frame 3: Shares</div>
                  <div className="text-xs font-bold font-mono text-emerald-400 mt-1">
                    A = {partRes.shareA} | B = {partRes.shareB}
                  </div>
                </div>
              </div>

              {/* Visual Segmented Bar */}
              <div className="space-y-2">
                <div className="text-xs text-slate-400">Visual Box Segment Strip:</div>
                <div className="flex h-10 w-full rounded-xl overflow-hidden border border-slate-700">
                  {Array.from({ length: partA }).map((_, i) => (
                    <div
                      key={`a-${i}`}
                      className="flex-1 bg-cyan-600 border-r border-slate-900 flex items-center justify-center text-[10px] font-bold text-slate-950"
                      title={`Part A: ${partRes.unitValue}`}
                    >
                      {partRes.unitValue}
                    </div>
                  ))}
                  {Array.from({ length: partB }).map((_, i) => (
                    <div
                      key={`b-${i}`}
                      className="flex-1 bg-amber-500 border-r border-slate-900 flex items-center justify-center text-[10px] font-bold text-slate-950"
                      title={`Part B: ${partRes.unitValue}`}
                    >
                      {partRes.unitValue}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. COMMUTATIVE PERCENTAGE SWAP */}
      {subTab === 'commutative' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-300">
              The Golden Law: <code className="text-amber-400 font-bold">x% of y = y% of x</code>. Swap awkward percentages immediately!
            </div>
            <div className="flex gap-2 text-xs">
              <span className="text-slate-500 self-center">Presets:</span>
              <button
                onClick={() => {
                  setCommX(72);
                  setCommY(12.5);
                }}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
              >
                72% of 12.5 (Drill 07)
              </button>
              <button
                onClick={() => {
                  setCommX(48);
                  setCommY(25);
                }}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
              >
                48% of 25 (Page 6)
              </button>
              <button
                onClick={() => {
                  setCommX(84);
                  setCommY(50);
                }}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
              >
                84% of 50
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Percentage (x%)</label>
                  <input
                    type="number"
                    value={commX}
                    onChange={(e) => setCommX(parseFloat(e.target.value) || 0)}
                    className="w-full text-center py-2 bg-slate-900 border border-slate-700 rounded-xl text-xl font-bold text-cyan-300 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Value (y)</label>
                  <input
                    type="number"
                    value={commY}
                    onChange={(e) => setCommY(parseFloat(e.target.value) || 0)}
                    className="w-full text-center py-2 bg-slate-900 border border-slate-700 rounded-xl text-xl font-bold text-amber-300 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center space-y-2">
                <div className="text-xs text-slate-400">Awkward Standard Form:</div>
                <div className="text-lg font-mono text-slate-400">
                  {commX}% of {commY}
                </div>
                <div className="text-xs text-amber-400 font-semibold pt-1">
                  Instant Commutative Flip:
                </div>
                <div className="text-2xl font-bold font-mono text-cyan-300">
                  {commY}% of {commX}
                </div>
              </div>

              <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-500/30 text-center">
                <div className="text-xs text-emerald-400 font-semibold">Evaluated Answer:</div>
                <div className="text-3xl font-black font-mono text-emerald-300 mt-1">
                  {commRes.result}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. SUCCESSIVE PERCENTAGE */}
      {subTab === 'successive' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-300">
              Formula: <code className="text-amber-400 font-bold">Net % = A + B + (A · B)/100</code>
            </div>
            <div className="flex gap-2 text-xs">
              <button
                onClick={() => {
                  setSuccA(30);
                  setSuccB(-20);
                }}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
              >
                +30% then -20% (Drill 10: +4%)
              </button>
              <button
                onClick={() => {
                  setSuccA(20);
                  setSuccB(10);
                }}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
              >
                +20% then +10% (+32%)
              </button>
              <button
                onClick={() => {
                  setSuccA(25);
                  setSuccB(-20);
                }}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
              >
                +25% then -20% (0% Net)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">First Change (A%)</label>
                  <input
                    type="number"
                    value={succA}
                    onChange={(e) => setSuccA(parseFloat(e.target.value) || 0)}
                    className="w-full text-center py-2 bg-slate-900 border border-slate-700 rounded-xl text-xl font-bold text-cyan-300 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Second Change (B%)</label>
                  <input
                    type="number"
                    value={succB}
                    onChange={(e) => setSuccB(parseFloat(e.target.value) || 0)}
                    className="w-full text-center py-2 bg-slate-900 border border-slate-700 rounded-xl text-xl font-bold text-amber-300 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-center">
                <div className="text-xs text-slate-400 mb-1">Calculation:</div>
                <div className="text-base text-slate-200">
                  {succA} + ({succB}) + [({succA} × {succB}) / 100]
                </div>
                <div className="text-sm text-amber-300 mt-1">
                  = {succRes.sum} + ({succRes.productTerm})
                </div>
              </div>

              <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-500/30 text-center">
                <div className="text-xs text-emerald-400 font-semibold">Net Single Equivalent Change:</div>
                <div className="text-3xl font-black font-mono text-emerald-300 mt-1">
                  {succRes.net >= 0 ? `+${succRes.net}%` : `${succRes.net}%`}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. PRODUCT CONSTANCY */}
      {subTab === 'constancy' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-300">
              Constant-Product Offset: If Price rises by <strong>n/d</strong> (+R%), Consumption must drop by <strong>n/(d + n)</strong> to keep expenditure invariant.
            </div>
            <div className="flex gap-2 text-xs">
              <button
                onClick={() => setConstRise(20)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
              >
                +20% (+1/5) → -16.67% (Drill 11)
              </button>
              <button
                onClick={() => setConstRise(25)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
              >
                +25% (+1/4) → -20% (Page 7)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Price Rise Percentage (+%)</label>
                <input
                  type="number"
                  value={constRise}
                  onChange={(e) => setConstRise(parseFloat(e.target.value) || 0)}
                  className="w-full text-center py-2 bg-slate-900 border border-slate-700 rounded-xl text-xl font-bold text-amber-400 font-mono"
                />
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-center">
                <div className="text-xs text-slate-400 mb-1">Fractional Conversion:</div>
                <div className="text-sm text-cyan-300">
                  Rise = +{constRes.riseFractionText} (n={constRes.n}, d={constRes.d})
                </div>
                <div className="text-sm text-amber-300 mt-1">
                  Required Drop = {constRes.dropFractionText}
                </div>
              </div>

              <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-500/30 text-center">
                <div className="text-xs text-emerald-400 font-semibold">Consumption Reduction Needed:</div>
                <div className="text-3xl font-black font-mono text-emerald-300 mt-1">
                  −{constRes.dropPercentage}%
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. COMPONENDO & DIVIDENDO */}
      {subTab === 'componendo' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-300">
              Identity: If <code className="text-cyan-300">(x + y) / (x − y) = a / b</code>, then <code className="text-emerald-300">x / y = (a + b) / (a − b)</code>.
            </div>
            <div className="flex gap-2 text-xs">
              <button
                onClick={() => {
                  setCompRatioA(13);
                  setCompRatioB(5);
                }}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
              >
                13 / 5 → 9 : 4 (Drill 09)
              </button>
              <button
                onClick={() => {
                  setCompRatioA(7);
                  setCompRatioB(3);
                }}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
              >
                7 / 3 → 5 : 2 (Page 5)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Numerator (a)</label>
                  <input
                    type="number"
                    value={compRatioA}
                    onChange={(e) => setCompRatioA(parseInt(e.target.value, 10) || 1)}
                    className="w-full text-center py-2 bg-slate-900 border border-slate-700 rounded-xl text-xl font-bold text-cyan-300 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Denominator (b)</label>
                  <input
                    type="number"
                    value={compRatioB}
                    onChange={(e) => setCompRatioB(parseInt(e.target.value, 10) || 1)}
                    className="w-full text-center py-2 bg-slate-900 border border-slate-700 rounded-xl text-xl font-bold text-amber-300 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-center">
                <div className="text-xs text-slate-400 mb-1">Direct Evaluation:</div>
                <div className="text-sm text-cyan-300">
                  ({compRatioA} + {compRatioB}) / ({compRatioA} − {compRatioB}) = {compRes.rawNum} / {compRes.rawDen}
                </div>
              </div>

              <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-500/30 text-center">
                <div className="text-xs text-emerald-400 font-semibold">Instant Ratio x : y</div>
                <div className="text-3xl font-black font-mono text-emerald-300 mt-1">
                  {compRes.ratioText} ({compRes.fractionText})
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
