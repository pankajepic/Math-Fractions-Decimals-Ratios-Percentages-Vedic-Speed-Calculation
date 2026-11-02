/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  urdhva2x2,
  urdhva3x3,
  nikhilamBaseMultiply,
  ekadhikenaSquare,
  antyayordashakeMultiply,
  ekanyunenaMultiply9s,
  yaavadunamSquare,
  duplexSquare2Digit,
  nikhilamSubtractPowerOf10,
  multiplyBy11Sliding,
} from '../utils/mathCore';
import { Sparkles, Layers, ArrowRight, Play, CheckCircle, Zap } from 'lucide-react';

export const VedicMultiplicationVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'urdhva' | 'nikhilam' | 'ekadhikena' | 'ekanyunena' | 'yaavadunam' | 'sliding11'
  >('urdhva');

  // Urdhva state
  const [uMode, setUMode] = useState<'2x2' | '3x3'>('2x2');
  const [uA, setUA] = useState<number>(43);
  const [uB, setUB] = useState<number>(21);
  const [uStep, setUStep] = useState<number>(0); // 0: all, 1-3 or 1-5

  // Nikhilam state
  const [nBase, setNBase] = useState<100 | 1000>(100);
  const [nA, setNA] = useState<number>(96);
  const [nB, setNB] = useState<number>(92);

  // Ekadhikena state
  const [ekaMode, setEkaMode] = useState<'ends5' | 'complementary'>('ends5');
  const [ekaNum, setEkaNum] = useState<number>(85);
  const [compA, setCompA] = useState<number>(43);
  const [compB, setCompB] = useState<number>(47);

  // Ekanyunena state
  const [ekanyunenaVal, setEkanyunenaVal] = useState<number>(584);
  const [ekanyunenaNines, setEkanyunenaNines] = useState<number>(3);

  // Yaavadunam state
  const [yavNum, setYavNum] = useState<number>(94);
  const [yavBase, setYavBase] = useState<100 | 1000>(100);

  // Sliding 11 state
  const [slideNum, setSlideNum] = useState<number>(6274);

  // Calculated results
  const resUrdhva2 = uMode === '2x2' ? urdhva2x2(Math.max(10, Math.min(99, uA)), Math.max(10, Math.min(99, uB))) : null;
  const resUrdhva3 = uMode === '3x3' ? urdhva3x3(Math.max(100, Math.min(999, uA)), Math.max(100, Math.min(999, uB))) : null;
  const resNikhilam = nikhilamBaseMultiply(nA, nB, nBase);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Unit 05 & Ch. 5
            </span>
            <span className="text-xs text-slate-400">Bharati Krishna Tirthaji (1965)</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Vedic Speed Calculation Engines</h2>
          <p className="text-sm text-slate-400">
            Interactive pattern-recognition engines replacing multi-row scratchwork with single-line mental flow.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {[
            { id: 'urdhva', label: 'Urdhva (Crosswise)' },
            { id: 'nikhilam', label: 'Nikhilam (Base)' },
            { id: 'ekadhikena', label: 'Ekadhikena (5s & 10s)' },
            { id: 'ekanyunena', label: 'Ekanyunena (Strings of 9s)' },
            { id: 'yaavadunam', label: 'Yaavadunam (Squaring)' },
            { id: 'sliding11', label: 'Sliding 11' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: URDHVA TIRYAGBHYAM */}
      {activeTab === 'urdhva' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-400">Dimension:</span>
              <button
                onClick={() => {
                  setUMode('2x2');
                  setUA(43);
                  setUB(21);
                  setUStep(0);
                }}
                className={`px-3 py-1 text-xs rounded-lg font-bold border transition ${
                  uMode === '2x2' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                2×2 (I - X - I)
              </button>
              <button
                onClick={() => {
                  setUMode('3x3');
                  setUA(213);
                  setUB(132);
                  setUStep(0);
                }}
                className={`px-3 py-1 text-xs rounded-lg font-bold border transition ${
                  uMode === '3x3' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                3×3 Star (I - X - * - X - I)
              </button>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="text-slate-500 self-center">Presets:</span>
              {uMode === '2x2' ? (
                <>
                  <button
                    onClick={() => {
                      setUA(43);
                      setUB(21);
                    }}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                  >
                    43 × 21 (Fig 5.2)
                  </button>
                  <button
                    onClick={() => {
                      setUA(34);
                      setUB(52);
                    }}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                  >
                    34 × 52 (P13)
                  </button>
                  <button
                    onClick={() => {
                      setUA(54);
                      setUB(37);
                    }}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                  >
                    54 × 37 (Drill 21)
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setUA(123);
                      setUB(321);
                    }}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                  >
                    123 × 321 (Page 10)
                  </button>
                  <button
                    onClick={() => {
                      setUA(213);
                      setUB(132);
                    }}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                  >
                    213 × 132 (Drill 22)
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Inputs */}
          <div className="flex items-center justify-center gap-4 py-2">
            <div className="flex flex-col items-center">
              <label className="text-xs text-slate-400 mb-1">Multiplicand</label>
              <input
                type="number"
                value={uA}
                onChange={(e) => setUA(parseInt(e.target.value, 10) || 0)}
                className="w-28 text-center py-2 bg-slate-950 border border-slate-700 rounded-xl text-xl font-mono font-bold text-amber-400"
              />
            </div>
            <div className="text-2xl font-bold text-slate-500 self-end mb-2">×</div>
            <div className="flex flex-col items-center">
              <label className="text-xs text-slate-400 mb-1">Multiplier</label>
              <input
                type="number"
                value={uB}
                onChange={(e) => setUB(parseInt(e.target.value, 10) || 0)}
                className="w-28 text-center py-2 bg-slate-950 border border-slate-700 rounded-xl text-xl font-mono font-bold text-amber-400"
              />
            </div>
            <div className="text-2xl font-bold text-slate-500 self-end mb-2">=</div>
            <div className="flex flex-col items-center">
              <label className="text-xs text-emerald-400 mb-1 font-semibold">One-Line Product</label>
              <div className="w-36 text-center py-2 bg-emerald-950/60 border border-emerald-500/50 rounded-xl text-xl font-mono font-extrabold text-emerald-300">
                {(uA * uB).toLocaleString()}
              </div>
            </div>
          </div>

          {/* 2x2 Storyboard Frames */}
          {uMode === '2x2' && resUrdhva2 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Frame 1: Left Vertical */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-cyan-400">FRAME 1: Left Vertical (I)</span>
                  <span className="font-mono text-slate-500">Tens × Tens</span>
                </div>

                <div className="flex justify-center items-center py-4">
                  <div className="flex gap-8 items-center bg-slate-900/80 px-6 py-4 rounded-xl border border-cyan-500/30">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-cyan-500 text-slate-950 font-extrabold text-lg flex items-center justify-center">
                        {resUrdhva2.digitsA[0]}
                      </div>
                      <div className="w-0.5 h-6 bg-cyan-400"></div>
                      <div className="w-10 h-10 rounded-full bg-cyan-500 text-slate-950 font-extrabold text-lg flex items-center justify-center">
                        {resUrdhva2.digitsB[0]}
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 opacity-30">
                      <div className="w-10 h-10 rounded-full bg-slate-700 text-slate-300 font-bold text-lg flex items-center justify-center">
                        {resUrdhva2.digitsA[1]}
                      </div>
                      <div className="w-0.5 h-6 bg-slate-700"></div>
                      <div className="w-10 h-10 rounded-full bg-slate-700 text-slate-300 font-bold text-lg flex items-center justify-center">
                        {resUrdhva2.digitsB[1]}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center font-mono text-sm bg-slate-900 p-2 rounded-lg border border-slate-800 text-slate-300">
                  {resUrdhva2.digitsA[0]} × {resUrdhva2.digitsB[0]} ={' '}
                  <span className="text-cyan-400 font-bold">{resUrdhva2.f1}</span>
                </div>
              </div>

              {/* Frame 2: Crosswise Sum */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/30 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-400">FRAME 2: Crosswise (X)</span>
                  <span className="font-mono text-slate-500">Cross Sum</span>
                </div>

                <div className="flex justify-center items-center py-4">
                  <div className="relative bg-slate-900/80 px-6 py-4 rounded-xl border border-amber-500/30">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 160 100">
                      <line x1="38" y1="28" x2="122" y2="72" stroke="#f59e0b" strokeWidth="2.5" />
                      <line x1="122" y1="28" x2="38" y2="72" stroke="#f59e0b" strokeWidth="2.5" />
                    </svg>
                    <div className="flex gap-8 items-center z-10 relative">
                      <div className="flex flex-col items-center gap-6">
                        <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-extrabold text-lg flex items-center justify-center">
                          {resUrdhva2.digitsA[0]}
                        </div>
                        <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-extrabold text-lg flex items-center justify-center">
                          {resUrdhva2.digitsB[0]}
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-6">
                        <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-extrabold text-lg flex items-center justify-center">
                          {resUrdhva2.digitsA[1]}
                        </div>
                        <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-extrabold text-lg flex items-center justify-center">
                          {resUrdhva2.digitsB[1]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center font-mono text-sm bg-slate-900 p-2 rounded-lg border border-slate-800 text-slate-300">
                  ({resUrdhva2.digitsA[0]}×{resUrdhva2.digitsB[1]}) + ({resUrdhva2.digitsA[1]}×{resUrdhva2.digitsB[0]}) ={' '}
                  <span className="text-amber-400 font-bold">{resUrdhva2.f2}</span>
                </div>
              </div>

              {/* Frame 3: Right Vertical */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-400">FRAME 3: Right Vertical (I)</span>
                  <span className="font-mono text-slate-500">Units × Units</span>
                </div>

                <div className="flex justify-center items-center py-4">
                  <div className="flex gap-8 items-center bg-slate-900/80 px-6 py-4 rounded-xl border border-emerald-500/30">
                    <div className="flex flex-col items-center gap-2 opacity-30">
                      <div className="w-10 h-10 rounded-full bg-slate-700 text-slate-300 font-bold text-lg flex items-center justify-center">
                        {resUrdhva2.digitsA[0]}
                      </div>
                      <div className="w-0.5 h-6 bg-slate-700"></div>
                      <div className="w-10 h-10 rounded-full bg-slate-700 text-slate-300 font-bold text-lg flex items-center justify-center">
                        {resUrdhva2.digitsB[0]}
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 font-extrabold text-lg flex items-center justify-center">
                        {resUrdhva2.digitsA[1]}
                      </div>
                      <div className="w-0.5 h-6 bg-emerald-400"></div>
                      <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 font-extrabold text-lg flex items-center justify-center">
                        {resUrdhva2.digitsB[1]}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center font-mono text-sm bg-slate-900 p-2 rounded-lg border border-slate-800 text-slate-300">
                  {resUrdhva2.digitsA[1]} × {resUrdhva2.digitsB[1]} ={' '}
                  <span className="text-emerald-400 font-bold">{resUrdhva2.f3}</span>
                </div>
              </div>
            </div>
          )}

          {/* 3x3 Star Pattern Steps */}
          {uMode === '3x3' && resUrdhva3 && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {resUrdhva3.stepDetails.map((st) => (
                <div key={st.step} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-[11px] font-bold text-amber-400 uppercase">
                    Step {st.step}: {st.name}
                  </div>
                  <div className="text-xs font-mono text-slate-400">{st.formula}</div>
                  <div className="text-lg font-bold font-mono text-white text-right">
                    = <span className="text-emerald-400">{st.value}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Final Assembly with Carries */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              <span className="font-semibold text-white">Intermediate Partitions: </span>
              <code className="bg-slate-900 px-2 py-1 rounded text-amber-300 font-mono text-sm ml-2">
                {uMode === '2x2' ? resUrdhva2?.intermediate : resUrdhva3?.intermediate}
              </code>
            </div>
            <div className="text-xs text-slate-400">
              Carry propagation resolves to{' '}
              <span className="text-emerald-400 font-mono font-bold text-base">
                {(uA * uB).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: NIKHILAM BASE MULTIPLICATION */}
      {activeTab === 'nikhilam' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-400">Base System:</span>
              <button
                onClick={() => {
                  setNBase(100);
                  setNA(96);
                  setNB(92);
                }}
                className={`px-3 py-1 text-xs rounded-lg font-bold border transition ${
                  nBase === 100 ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                Base 100 (2 digits RHS)
              </button>
              <button
                onClick={() => {
                  setNBase(1000);
                  setNA(994);
                  setNB(988);
                }}
                className={`px-3 py-1 text-xs rounded-lg font-bold border transition ${
                  nBase === 1000 ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                Base 1000 (3 digits RHS)
              </button>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="text-slate-500 self-center">Textbook Presets:</span>
              <button
                onClick={() => {
                  setNBase(100);
                  setNA(96);
                  setNB(92);
                }}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
              >
                96 × 92 (Deficit -4, -8)
              </button>
              <button
                onClick={() => {
                  setNBase(100);
                  setNA(104);
                  setNB(107);
                }}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
              >
                104 × 107 (Surplus +4, +7)
              </button>
              <button
                onClick={() => {
                  setNBase(100);
                  setNA(105);
                  setNB(93);
                }}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
              >
                105 × 93 (Mixed Borrow)
              </button>
              <button
                onClick={() => {
                  setNBase(1000);
                  setNA(994);
                  setNB(988);
                }}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
              >
                994 × 988 (Base 1000 P17)
              </button>
            </div>
          </div>

          {/* Nikhilam Visual Cross Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="text-xs font-semibold uppercase text-amber-400 tracking-wider">
                Deficit / Surplus Deviation Table (Base {nBase})
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400">Factor 1</label>
                  <input
                    type="number"
                    value={nA}
                    onChange={(e) => setNA(parseInt(e.target.value, 10) || 0)}
                    className="w-full text-center py-2 bg-slate-900 border border-slate-700 rounded-xl text-xl font-bold text-cyan-300 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Deviation from {nBase}</label>
                  <div
                    className={`py-2 text-center rounded-xl font-mono text-xl font-bold border ${
                      resNikhilam.defA >= 0
                        ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                        : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                    }`}
                  >
                    {resNikhilam.defA >= 0 ? `+${resNikhilam.defA}` : resNikhilam.defA}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400">Factor 2</label>
                  <input
                    type="number"
                    value={nB}
                    onChange={(e) => setNB(parseInt(e.target.value, 10) || 0)}
                    className="w-full text-center py-2 bg-slate-900 border border-slate-700 rounded-xl text-xl font-bold text-cyan-300 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Deviation from {nBase}</label>
                  <div
                    className={`py-2 text-center rounded-xl font-mono text-xl font-bold border ${
                      resNikhilam.defB >= 0
                        ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                        : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                    }`}
                  >
                    {resNikhilam.defB >= 0 ? `+${resNikhilam.defB}` : resNikhilam.defB}
                  </div>
                </div>
              </div>

              {/* Cross Arrows Diagram */}
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
                <div className="font-semibold text-slate-300">Cross Operation:</div>
                <div>
                  Left Part = {nA} + ({resNikhilam.defB}) = <span className="text-amber-400 font-bold">{resNikhilam.rawLhs}</span>
                </div>
                <div>
                  Right Part = ({resNikhilam.defA}) × ({resNikhilam.defB}) ={' '}
                  <span className="text-amber-400 font-bold">{resNikhilam.rawRhs}</span>
                </div>
              </div>
            </div>

            {/* Nikhilam Result Flow */}
            <div className="md:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="text-xs font-semibold uppercase text-emerald-400 tracking-wider">
                Single-Line Assembly: LHS | RHS
              </div>

              <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between font-mono">
                  <div className="text-center flex-1">
                    <div className="text-xs text-slate-400 mb-1">LHS Partition</div>
                    <div className="text-3xl font-extrabold text-cyan-300">{resNikhilam.formattedLhs}</div>
                  </div>
                  <div className="text-2xl font-bold text-slate-600">|</div>
                  <div className="text-center flex-1">
                    <div className="text-xs text-slate-400 mb-1">RHS Partition ({nBase === 100 ? '2 digits' : '3 digits'})</div>
                    <div className="text-3xl font-extrabold text-amber-300">{resNikhilam.formattedRhs}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-center">
                  <div className="text-xs text-slate-400">Final Concatenated Result:</div>
                  <div className="text-3xl font-black text-emerald-400 font-mono">
                    {resNikhilam.finalResult.toLocaleString()}
                  </div>
                </div>
              </div>

              {resNikhilam.note && (
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300">
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    <Zap className="w-4 h-4" />
                    Special Nikhilam Rule Applied:
                  </div>
                  {resNikhilam.note}
                </div>
              )}

              {/* Nikhilam Subtraction Power of 10 */}
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/80 text-xs space-y-2">
                <div className="font-semibold text-slate-300">Companion Rule: Nikhilam Subtraction ("All from 9, last from 10")</div>
                <div className="text-slate-400">
                  Try mentally subtracting from 10,000 or 100,000 with zero borrows:
                </div>
                <div className="font-mono text-cyan-300">
                  100,000 − 64,283 = (9−6)(9−4)(9−2)(9−8)(10−3) = <span className="text-amber-400 font-bold">35,717</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: EKADHIKENA PURVENA */}
      {activeTab === 'ekadhikena' && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-semibold text-slate-400">Mode:</span>
            <button
              onClick={() => setEkaMode('ends5')}
              className={`px-3 py-1 text-xs rounded-lg font-bold border transition ${
                ekaMode === 'ends5' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              Square Numbers Ending in 5 (N5²)
            </button>
            <button
              onClick={() => setEkaMode('complementary')}
              className={`px-3 py-1 text-xs rounded-lg font-bold border transition ${
                ekaMode === 'complementary' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              Antyayordashake'pi (Tens match & Units sum to 10)
            </button>
          </div>

          {ekaMode === 'ends5' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Sutra 1: Ekadhikena Purvena — Instant Squaring
                </div>
                <p className="text-xs text-slate-400">
                  To square any number ending in 5, multiply the prefix <span className="text-amber-300 font-bold">N</span> by{' '}
                  <span className="text-amber-300 font-bold">(N + 1)</span> and append{' '}
                  <span className="text-emerald-300 font-bold">25</span>.
                </p>

                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Number to Square (must end in 5)</label>
                  <input
                    type="number"
                    value={ekaNum}
                    step="10"
                    onChange={(e) => {
                      const v = parseInt(e.target.value, 10) || 5;
                      setEkaNum(v % 10 === 5 ? v : Math.floor(v / 10) * 10 + 5);
                    }}
                    className="w-full text-center py-2 bg-slate-900 border border-slate-700 rounded-xl text-2xl font-bold text-amber-400 font-mono"
                  />
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="text-slate-500 self-center">Quick tests:</span>
                  {[35, 65, 85, 95, 115, 195].map((val) => (
                    <button
                      key={val}
                      onClick={() => setEkaNum(val)}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                    >
                      {val}²
                    </button>
                  ))}
                </div>
              </div>

              {/* Ekadhikena Flow Visual Card */}
              {(() => {
                const sq = ekadhikenaSquare(ekaNum);
                return (
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                      Animated Partition Flow
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="p-4 bg-cyan-950/60 border border-cyan-500/40 rounded-xl">
                        <div className="text-xs text-cyan-400 font-semibold">Prefix N × (N + 1)</div>
                        <div className="text-2xl font-bold font-mono text-cyan-200 mt-1">
                          {sq.prefix} × {sq.prefix + 1} ={' '}
                          <span className="text-amber-400">{sq.prefixTimesNext}</span>
                        </div>
                      </div>

                      <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-xl">
                        <div className="text-xs text-emerald-400 font-semibold">Always 5²</div>
                        <div className="text-2xl font-bold font-mono text-emerald-300 mt-1">
                          5² = <span className="text-emerald-400">25</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                      <div className="text-xs text-slate-400">Join Left & Right Partitions:</div>
                      <div className="text-3xl font-black font-mono text-emerald-400 mt-1">
                        {sq.prefixTimesNext} | 25 = {sq.result.toLocaleString()}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Sub-Sutra 8: Antyayordashake'pi
                </div>
                <p className="text-xs text-slate-400">
                  When tens digits match and unit digits sum to 10 (e.g., 43 × 47 or 72 × 78), multiply Prefix × (Prefix + 1) and attach Unit₁ × Unit₂.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400">Factor 1</label>
                    <input
                      type="number"
                      value={compA}
                      onChange={(e) => setCompA(parseInt(e.target.value, 10) || 10)}
                      className="w-full text-center py-2 bg-slate-900 border border-slate-700 rounded-xl text-xl font-bold text-cyan-300 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">Factor 2</label>
                    <input
                      type="number"
                      value={compB}
                      onChange={(e) => setCompB(parseInt(e.target.value, 10) || 10)}
                      className="w-full text-center py-2 bg-slate-900 border border-slate-700 rounded-xl text-xl font-bold text-cyan-300 font-mono"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="text-slate-500 self-center">Presets:</span>
                  {[
                    { a: 43, b: 47 },
                    { a: 72, b: 78 },
                    { a: 63, b: 67 },
                    { a: 81, b: 89 },
                  ].map((p, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCompA(p.a);
                        setCompB(p.b);
                      }}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                    >
                      {p.a} × {p.b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Worked Complementary Flow */}
              {(() => {
                const isValid =
                  Math.floor(compA / 10) === Math.floor(compB / 10) && (compA % 10) + (compB % 10) === 10;
                if (!isValid) {
                  return (
                    <div className="bg-slate-950 p-6 rounded-2xl border border-rose-500/30 text-rose-300 text-xs">
                      Tens digits must be equal and units digits must sum to 10. Click a preset above to see the rule in action.
                    </div>
                  );
                }
                const res = antyayordashakeMultiply(compA, compB);
                return (
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                      Instant 2-Second Computation
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-center font-mono">
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="text-xs text-slate-400">Tens: {res.prefix} × ({res.prefix} + 1)</div>
                        <div className="text-2xl font-bold text-cyan-300 mt-1">{res.left}</div>
                      </div>
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="text-xs text-slate-400">Units: {res.unitA} × {res.unitB}</div>
                        <div className="text-2xl font-bold text-amber-300 mt-1">{res.rightStr}</div>
                      </div>
                    </div>

                    <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-500/30 text-center">
                      <div className="text-xs text-emerald-400 font-semibold">Combined One-Line Result:</div>
                      <div className="text-3xl font-black font-mono text-emerald-300 mt-1">
                        {res.left} | {res.rightStr} = {res.result.toLocaleString()}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: EKANYUNENA PURVENA */}
      {activeTab === 'ekanyunena' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Sutra 14: Ekanyunena Purvena — Strings of 9s
              </div>
              <p className="text-xs text-slate-400">
                To multiply any number N by an equal-length string of 9s (99, 999, 9999), subtract 1 from N on the left, and apply its 9s complement on the right.
              </p>

              <div>
                <label className="text-xs text-slate-400 mb-1 block">Number N</label>
                <input
                  type="number"
                  value={ekanyunenaVal}
                  onChange={(e) => setEkanyunenaVal(parseInt(e.target.value, 10) || 1)}
                  className="w-full text-center py-2 bg-slate-900 border border-slate-700 rounded-xl text-xl font-bold text-amber-400 font-mono"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block">Number of 9s: {'9'.repeat(ekanyunenaNines)}</label>
                <div className="flex gap-2">
                  {[2, 3, 4].map((count) => (
                    <button
                      key={count}
                      onClick={() => setEkanyunenaNines(count)}
                      className={`flex-1 py-1 text-xs rounded-lg font-bold border transition ${
                        ekanyunenaNines === count ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {'9'.repeat(count)} ({count} nines)
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="text-slate-500 self-center">Presets:</span>
                {[
                  { n: 73, nines: 2 },
                  { n: 458, nines: 3 },
                  { n: 584, nines: 3 },
                  { n: 839, nines: 3 },
                ].map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setEkanyunenaVal(p.n);
                      setEkanyunenaNines(p.nines);
                    }}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                  >
                    {p.n} × {'9'.repeat(p.nines)}
                  </button>
                ))}
              </div>
            </div>

            {/* Ekanyunena Result Flow */}
            {(() => {
              const res = ekanyunenaMultiply9s(ekanyunenaVal, ekanyunenaNines);
              return (
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    Instant 2-Step Decomposition
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-center font-mono">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="text-xs text-slate-400">LHS: Subtract 1</div>
                      <div className="text-xs text-slate-500 mb-1">
                        {ekanyunenaVal} − 1
                      </div>
                      <div className="text-2xl font-bold text-cyan-300">{res.lhs}</div>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="text-xs text-slate-400">RHS: 9s Complement</div>
                      <div className="text-xs text-slate-500 mb-1">
                        {'9'.repeat(ekanyunenaNines)} − {res.lhs}
                      </div>
                      <div className="text-2xl font-bold text-amber-300">{res.rhs}</div>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-500/30 text-center">
                    <div className="text-xs text-emerald-400 font-semibold">Concatenated Product:</div>
                    <div className="text-3xl font-black font-mono text-emerald-300 mt-1">
                      {res.lhs} | {res.rhs} = {res.result.toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* TAB 5: YAAVADUNAM BASE SQUARING & DUPLEX */}
      {activeTab === 'yaavadunam' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Sutra 10: Yaavadunam — Base Squaring Algorithm
              </div>
              <p className="text-xs text-slate-400">
                Formula: <code className="text-amber-300 font-bold">N² = (N ± d) | d²</code>, where d is deviation from base 100 or 1000.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400">Base</label>
                  <select
                    aria-label="Yaavadunam Base Selector"
                    value={yavBase}
                    onChange={(e) => setYavBase(parseInt(e.target.value, 10) as 100 | 1000)}
                    className="w-full py-2 bg-slate-900 border border-slate-700 rounded-xl text-center font-bold text-cyan-300 text-sm"
                  >
                    <option value={100}>Base 100</option>
                    <option value={1000}>Base 1000</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400">Number N</label>
                  <input
                    type="number"
                    value={yavNum}
                    onChange={(e) => setYavNum(parseInt(e.target.value, 10) || 1)}
                    className="w-full text-center py-2 bg-slate-900 border border-slate-700 rounded-xl text-xl font-bold text-amber-400 font-mono"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="text-slate-500 self-center">Presets:</span>
                {[
                  { n: 94, b: 100 },
                  { n: 92, b: 100 },
                  { n: 108, b: 100 },
                  { n: 988, b: 1000 },
                ].map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setYavNum(p.n);
                      setYavBase(p.b as any);
                    }}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                  >
                    {p.n}² (Base {p.b})
                  </button>
                ))}
              </div>
            </div>

            {/* Yaavadunam Result Card */}
            {(() => {
              const res = yaavadunamSquare(yavNum, yavBase);
              return (
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    Instant 2-Second Squaring Flow
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-center font-mono">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="text-xs text-slate-400">LHS: Number + Deviation</div>
                      <div className="text-xs text-slate-500 mb-1">
                        {yavNum} + ({res.deviation})
                      </div>
                      <div className="text-2xl font-bold text-cyan-300">{res.lhs}</div>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="text-xs text-slate-400">RHS: Deviation²</div>
                      <div className="text-xs text-slate-500 mb-1">
                        ({res.deviation})²
                      </div>
                      <div className="text-2xl font-bold text-amber-300">{res.rhsPadded}</div>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-500/30 text-center">
                    <div className="text-xs text-emerald-400 font-semibold">Exact Square:</div>
                    <div className="text-3xl font-black font-mono text-emerald-300 mt-1">
                      {res.lhs} | {res.rhsPadded} = {res.result.toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* TAB 6: SLIDING WINDOW MULTIPLICATION BY 11 */}
      {activeTab === 'sliding11' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Sliding-Pair Neighbor Addition (× 11)
              </div>
              <p className="text-xs text-slate-400">
                To multiply any multi-digit integer by 11, write the outer digits, and insert the sum of adjacent neighbor pairs moving right-to-left with carry.
              </p>

              <div>
                <label className="text-xs text-slate-400 mb-1 block">Input Multi-Digit Number</label>
                <input
                  type="number"
                  value={slideNum}
                  onChange={(e) => setSlideNum(parseInt(e.target.value, 10) || 1)}
                  className="w-full text-center py-2 bg-slate-900 border border-slate-700 rounded-xl text-xl font-bold text-amber-400 font-mono"
                />
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="text-slate-500 self-center">Presets:</span>
                {[352, 4523, 6274, 89145].map((val) => (
                  <button
                    key={val}
                    onClick={() => setSlideNum(val)}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                  >
                    {val} × 11
                  </button>
                ))}
              </div>
            </div>

            {/* Sliding 11 Flow */}
            {(() => {
              const res = multiplyBy11Sliding(slideNum);
              return (
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    Neighbor Decomposition Flow
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-center">
                    <div className="text-xs text-slate-400 mb-2">Partition Equation:</div>
                    <div className="text-lg text-amber-300 font-bold">{res.explanation}</div>
                  </div>

                  <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-500/30 text-center">
                    <div className="text-xs text-emerald-400 font-semibold">Evaluated Product:</div>
                    <div className="text-3xl font-black font-mono text-emerald-300 mt-1">
                      {res.finalResult.toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
