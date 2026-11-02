/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { getCyclicSeventh } from '../utils/mathCore';
import { RotateCw, Sparkles, Compass, ShieldCheck } from 'lucide-react';

export const CyclicSeventhRing: React.FC = () => {
  const [k, setK] = useState<number>(5); // default to 5/7 as in workbook drill 05

  const cyclicData = getCyclicSeventh(k);

  // Geometry for 6 nodes arranged in circle: 1 -> 4 -> 2 -> 8 -> 5 -> 7
  // Coordinates on a 300x300 canvas (radius 100, center 150, 150)
  const nodes = [
    { digit: 1, angle: -90, opposite: 8 },
    { digit: 4, angle: -30, opposite: 5 },
    { digit: 2, angle: 30, opposite: 7 },
    { digit: 8, angle: 90, opposite: 1 },
    { digit: 5, angle: 150, opposite: 4 },
    { digit: 7, angle: 210, opposite: 2 },
  ];

  const center = 160;
  const radius = 105;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Figure 3.1 & Drill 05
            </span>
            <span className="text-xs text-slate-400">Cyclic Period & Nikhilam Symmetry</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">The Cyclic Seventh Wheel (142857 Magic Ring)</h2>
          <p className="text-sm text-slate-400">
            Every proper multiple of 1/7 rotates the exact same 6-digit necklace clockwise without division scratchwork.
          </p>
        </div>

        {/* Fraction Selector Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => setK(num)}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold transition ${
                k === num
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {num}/7
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* SVG Interactive Wheel */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 bg-slate-950 rounded-2xl border border-slate-800/80 relative">
          <div className="text-xs font-mono text-slate-500 mb-2 flex items-center gap-1">
            <RotateCw className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '10s' }} />
            CLOCKWISE ROTATION NECKLACE
          </div>

          <div className="relative w-80 h-80">
            <svg className="w-full h-full" viewBox="0 0 320 320">
              {/* Outer circle */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="#1e293b"
                strokeWidth="4"
              />

              {/* Directional Arc Arrow */}
              <path
                d="M 160 45 A 115 115 0 1 1 159 45"
                fill="none"
                stroke="#334155"
                strokeWidth="2"
                strokeDasharray="6 6"
              />

              {/* Opposite Nikhilam Complement lines (sum to 9) */}
              <line x1={center} y1={center - radius} x2={center} y2={center + radius} stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
              <line
                x1={center + radius * Math.cos((-30 * Math.PI) / 180)}
                y1={center + radius * Math.sin((-30 * Math.PI) / 180)}
                x2={center + radius * Math.cos((150 * Math.PI) / 180)}
                y2={center + radius * Math.sin((150 * Math.PI) / 180)}
                stroke="#475569"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <line
                x1={center + radius * Math.cos((30 * Math.PI) / 180)}
                y1={center + radius * Math.sin((30 * Math.PI) / 180)}
                x2={center + radius * Math.cos((210 * Math.PI) / 180)}
                y2={center + radius * Math.sin((210 * Math.PI) / 180)}
                stroke="#475569"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />

              {/* Center Hub */}
              <circle cx={center} cy={center} r="36" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
              <text
                x={center}
                y={center + 6}
                textAnchor="middle"
                fill="#fbbf24"
                fontSize="20"
                fontWeight="bold"
                fontFamily="sans-serif"
              >
                {k}/7
              </text>

              {/* 6 Digit Nodes */}
              {nodes.map((node, i) => {
                const rad = (node.angle * Math.PI) / 180;
                const x = center + radius * Math.cos(rad);
                const y = center + radius * Math.sin(rad);
                const isStart = node.digit === cyclicData.startDigit;

                return (
                  <g key={i}>
                    {/* Node circle */}
                    <circle
                      cx={x}
                      cy={y}
                      r="22"
                      fill={isStart ? '#f59e0b' : '#1e293b'}
                      stroke={isStart ? '#fbbf24' : '#475569'}
                      strokeWidth={isStart ? '3' : '2'}
                      className="transition-colors duration-300"
                    />
                    {/* Node text */}
                    <text
                      x={x}
                      y={y + 6}
                      textAnchor="middle"
                      fill={isStart ? '#020617' : '#e2e8f0'}
                      fontSize="18"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {node.digit}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-2 text-center text-xs text-slate-400">
            Opposite pairs across the center diameter always sum to 9:{' '}
            <span className="font-semibold text-amber-400">1+8=9, 4+5=9, 2+7=9</span>
          </div>
        </div>

        {/* Right Explanations & Mental Algorithm */}
        <div className="lg:col-span-6 space-y-4">
          {/* Result Card */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                Instant Cyclic Result for {k}/7
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Exact Repeating Period
              </span>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">Clockwise Stream Starting from Digit {cyclicData.startDigit}:</div>
              <div className="text-3xl font-extrabold font-mono text-emerald-400 tracking-wider">
                {cyclicData.decimalStr}
              </div>
              <div className="text-xs text-slate-400">
                Exact mathematical decimal value: {cyclicData.exactVal.toFixed(8)}…
              </div>
            </div>

            {/* Algorithm Steps */}
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-amber-400 font-bold shrink-0">
                  1
                </span>
                <p>
                  Sort the six base digits: <code className="bg-slate-800 px-1 py-0.5 rounded text-cyan-300">1, 2, 4, 5, 7, 8</code>.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-amber-400 font-bold shrink-0">
                  2
                </span>
                <p>
                  For numerator <strong>k = {k}</strong>, pick the{' '}
                  <span className="text-amber-400 font-bold">{k}th smallest</span> digit in the sorted set, which is{' '}
                  <span className="text-amber-300 font-bold px-1.5 py-0.5 bg-slate-800 rounded">{cyclicData.startDigit}</span>.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-amber-400 font-bold shrink-0">
                  3
                </span>
                <p>
                  Read around the necklace clockwise starting from{' '}
                  <span className="text-amber-300 font-bold">{cyclicData.startDigit}</span>: [
                  {cyclicData.rotatedDigits.join(' → ')}].
                </p>
              </div>
            </div>
          </div>

          {/* Quick Table for all 1/7 to 6/7 */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-xs font-semibold text-slate-300 mb-2">All 6 Proper Multiples of 1/7:</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { f: '1/7', s: '1', v: '0.142857…' },
                { f: '2/7', s: '2', v: '0.285714…' },
                { f: '3/7', s: '4', v: '0.428571…' },
                { f: '4/7', s: '5', v: '0.571428…' },
                { f: '5/7', s: '7', v: '0.714285…' },
                { f: '6/7', s: '8', v: '0.857142…' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setK(idx + 1)}
                  className={`p-2 rounded-lg text-left border text-xs transition ${
                    k === idx + 1
                      ? 'bg-amber-500/10 border-amber-500/50 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold">{item.f}</div>
                  <div className="font-mono text-[11px] truncate">{item.v}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
