/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  checkDivisibility,
  exactMentalCubeRoot,
  verifyBeejankMultiplication,
  convertPureRepeating,
  convertMixedRepeating,
  calculateTelescoping,
  splitWholeSubtract,
} from '../utils/mathCore';
import { Check, X, Sparkles, Hash, Activity, Calculator } from 'lucide-react';

export const NumberSenseLab: React.FC = () => {
  const [activeModule, setActiveModule] = useState<'divisibility' | 'cuberoot' | 'beejank' | 'recurring' | 'telescoping' | 'splitwhole'>('divisibility');

  // Divisibility
  const [divNum, setDivNum] = useState<number>(57312);

  // Cube Root
  const [cubeVal, setCubeVal] = useState<number>(389017);

  // Beejank
  const [bA, setBA] = useState<number>(43);
  const [bB, setBB] = useState<number>(26);
  const [bProd, setBProd] = useState<number>(1118);

  // Recurring Decimals
  const [recType, setRecType] = useState<'pure' | 'mixed'>('mixed');
  const [pureDigits, setPureDigits] = useState<string>('36');
  const [mixedNonRep, setMixedNonRep] = useState<string>('4');
  const [mixedRep, setMixedRep] = useState<string>('36');

  // Telescoping
  const [teleTerms, setTeleTerms] = useState<number>(49);

  // Split Whole
  const [swWhole, setSwWhole] = useState<number>(500);
  const [swSubWhole, setSwSubWhole] = useState<number>(142);
  const [swNum, setSwNum] = useState<number>(7);
  const [swDen, setSwDen] = useState<number>(19);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Units 01, 02 & 03
            </span>
            <span className="text-xs text-slate-400">Architectural Number Sense & Proofs</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Number Sense & Diagnostic Lab</h2>
          <p className="text-sm text-slate-400">
            Osculator divisibility filters, exact mental cube root inspection, digital root audits, and recurring decimal algebra.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {[
            { id: 'divisibility', label: 'Divisibility 2–13' },
            { id: 'cuberoot', label: 'Mental Cube Root' },
            { id: 'beejank', label: 'Beejank Audit (mod 9)' },
            { id: 'recurring', label: 'Recurring Decimals' },
            { id: 'telescoping', label: 'Telescoping Sum' },
            { id: 'splitwhole', label: 'Split-Whole Subtraction' },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveModule(m.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeModule === m.id
                  ? 'bg-purple-500 text-slate-950 shadow-md shadow-purple-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. DIVISIBILITY DIAGNOSTIC MATRIX */}
      {activeModule === 'divisibility' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center gap-3">
              <label className="text-xs text-slate-400">Test Number:</label>
              <input
                type="number"
                value={divNum}
                onChange={(e) => setDivNum(parseInt(e.target.value, 10) || 1)}
                className="w-36 text-center py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-lg font-bold text-amber-400 font-mono"
              />
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="text-slate-500 self-center">Presets:</span>
              {[57312, 84519, 1728, 658, 91839, 728].map((v) => (
                <button
                  key={v}
                  onClick={() => setDivNum(v)}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Diagnostic Matrix Table */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {checkDivisibility(divNum).map((res) => (
              <div
                key={res.divisor}
                className={`p-3.5 rounded-xl border transition-all ${
                  res.passed
                    ? 'bg-emerald-950/40 border-emerald-500/40 shadow-sm'
                    : 'bg-slate-950/60 border-slate-800/80 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-300 font-mono">
                    Divisor <span className="text-amber-400 text-sm">{res.divisor}</span>
                  </span>
                  <span
                    className={`p-1 rounded-full text-xs ${
                      res.passed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                    }`}
                  >
                    {res.passed ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 mb-1">{res.rule}</div>
                <div className="text-[11px] font-mono text-slate-300 bg-slate-900/80 p-1.5 rounded border border-slate-800">
                  {res.check}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. MENTAL CUBE ROOT INSPECTION */}
      {activeModule === 'cuberoot' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-300">
              Sub-Sutra 12 (Vilokanam): Exact extraction of ∛ for 4-to-6-digit perfect cubes in under 2 seconds!
            </div>
            <div className="flex gap-2 text-xs">
              <span className="text-slate-500 self-center">Presets:</span>
              {[
                { c: 389017, r: 73 },
                { c: 175616, r: 56 },
                { c: 91125, r: 45 },
                { c: 681472, r: 88 },
                { c: 24389, r: 29 },
              ].map((p) => (
                <button
                  key={p.c}
                  onClick={() => setCubeVal(p.c)}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                >
                  ∛{p.c.toLocaleString()} ({p.r})
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Input Perfect Cube (4 to 6 Digits)</label>
                <input
                  type="number"
                  value={cubeVal}
                  onChange={(e) => setCubeVal(parseInt(e.target.value, 10) || 1000)}
                  className="w-full text-center py-2 bg-slate-900 border border-slate-700 rounded-xl text-2xl font-bold text-amber-400 font-mono"
                />
              </div>

              {/* 1-to-1 Unit Digit Lookup Table */}
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
                <div className="text-[11px] font-semibold text-slate-400">Unit Digit 1-to-1 Bijection (n³ → n):</div>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-1 text-center font-mono text-xs">
                  {[
                    { n: 0, c: 0 },
                    { n: 1, c: 1 },
                    { n: 2, c: 8 },
                    { n: 3, c: 7 },
                    { n: 4, c: 4 },
                    { n: 5, c: 5 },
                    { n: 6, c: 6 },
                    { n: 7, c: 3 },
                    { n: 8, c: 2 },
                    { n: 9, c: 9 },
                  ].map((item) => (
                    <div key={item.n} className="p-1 bg-slate-800 rounded border border-slate-700">
                      <div className="text-slate-400 text-[10px]">{item.c}³</div>
                      <div className="font-bold text-cyan-300">{item.n}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step-by-Step Cube Root Result */}
            {(() => {
              try {
                const res = exactMentalCubeRoot(cubeVal);
                return (
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                      Mental Inspection Steps
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="text-slate-400 text-[10px]">Step 1: Strike Last 3 Digits</div>
                        <div className="text-slate-200 mt-1">
                          Prefix = <span className="text-cyan-300 font-bold">{res.prefix}</span> | Strike ={' '}
                          <span className="line-through text-slate-500">{res.last3}</span>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="text-slate-400 text-[10px]">Step 2: Units Digit Bijection</div>
                        <div className="text-slate-200 mt-1">
                          Last digit is {res.lastDigit} → maps uniquely to unit root{' '}
                          <span className="text-amber-300 font-bold">{res.unitRoot}</span>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="text-slate-400 text-[10px]">Step 3: Tens Bracket Inspection</div>
                        <div className="text-slate-200 mt-1">
                          {res.tensRoot}³ ({res.tensLowerBoundCube}) ≤ {res.prefix} &lt; {res.tensRoot + 1}³ ({res.tensUpperBoundCube}) → Tens ={' '}
                          <span className="text-cyan-300 font-bold">{res.tensRoot}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-500/30 text-center">
                      <div className="text-xs text-emerald-400 font-semibold">Exact Mental Cube Root:</div>
                      <div className="text-3xl font-black font-mono text-emerald-300 mt-1">
                        ∛{cubeVal.toLocaleString()} = {res.root}
                      </div>
                    </div>
                  </div>
                );
              } catch (err: any) {
                return (
                  <div className="bg-slate-950 p-6 rounded-2xl border border-rose-500/30 text-rose-400 text-xs text-center">
                    {err.message || 'Please enter a 4-to-6 digit number'}
                  </div>
                );
              }
            })()}
          </div>
        </div>
      )}

      {/* 3. BEEJANK DIGITAL ROOT AUDIT */}
      {activeModule === 'beejank' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-300">
              Sutra 16 (Gunakasamuchyah): Digital Root mod 9 Check. If multiplication is correct,{' '}
              <code className="text-amber-400 font-bold">DR(A × B) = DR(DR(A) × DR(B))</code>.
            </div>
            <div className="flex gap-2 text-xs">
              <button
                onClick={() => {
                  setBA(43);
                  setBB(26);
                  setBProd(1118);
                }}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
              >
                43 × 26 = 1118 (Page 1)
              </button>
              <button
                onClick={() => {
                  setBA(43);
                  setBB(21);
                  setBProd(903);
                }}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
              >
                43 × 21 = 903 (Page 11)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Factor A</label>
                  <input
                    type="number"
                    value={bA}
                    onChange={(e) => setBA(parseInt(e.target.value, 10) || 0)}
                    className="w-full text-center py-2 bg-slate-900 border border-slate-700 rounded-xl text-lg font-bold text-cyan-300 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Factor B</label>
                  <input
                    type="number"
                    value={bB}
                    onChange={(e) => setBB(parseInt(e.target.value, 10) || 0)}
                    className="w-full text-center py-2 bg-slate-900 border border-slate-700 rounded-xl text-lg font-bold text-cyan-300 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Claimed Product</label>
                  <input
                    type="number"
                    value={bProd}
                    onChange={(e) => setBProd(parseInt(e.target.value, 10) || 0)}
                    className="w-full text-center py-2 bg-slate-900 border border-slate-700 rounded-xl text-lg font-bold text-amber-300 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Beejank Verification Results */}
            {(() => {
              const res = verifyBeejankMultiplication(bA, bB, bProd);
              return (
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-center font-mono">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="text-[10px] text-slate-400">DR(A) × DR(B)</div>
                      <div className="text-xs text-slate-500">{res.drA} × {res.drB} = {res.drA * res.drB}</div>
                      <div className="text-2xl font-bold text-cyan-300 mt-1">DR = {res.drProductOfRoots}</div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="text-[10px] text-slate-400">DR(Claimed Product)</div>
                      <div className="text-xs text-slate-500">Digits sum mod 9</div>
                      <div className="text-2xl font-bold text-amber-300 mt-1">DR = {res.drActualProduct}</div>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-xl border text-center ${
                      res.isValid
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                        : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                    }`}
                  >
                    <div className="text-xs font-semibold">
                      {res.isValid ? 'Audit Passed: Modular Arithmetic Matches' : 'Audit Failed: Incorrect Product'}
                    </div>
                    <div className="text-2xl font-bold font-mono mt-1">
                      {res.drProductOfRoots} {res.isValid ? '==' : '≠'} {res.drActualProduct}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* 4. RECURRING DECIMALS ALGEBRA */}
      {activeModule === 'recurring' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-400">Decimal Type:</span>
              <button
                onClick={() => setRecType('pure')}
                className={`px-3 py-1 text-xs rounded-lg font-bold border transition ${
                  recType === 'pure' ? 'bg-purple-500 text-slate-950 border-purple-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                Pure Recurring (The 9s Rule)
              </button>
              <button
                onClick={() => setRecType('mixed')}
                className={`px-3 py-1 text-xs rounded-lg font-bold border transition ${
                  recType === 'mixed' ? 'bg-purple-500 text-slate-950 border-purple-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                Mixed Recurring (The 90s Rule)
              </button>
            </div>

            <div className="flex gap-2 text-xs">
              <span className="text-slate-500 self-center">Presets:</span>
              {recType === 'pure' ? (
                <>
                  <button onClick={() => setPureDigits('36')} className="px-2 py-1 bg-slate-800 rounded text-slate-300">
                    0.3636… (4/11)
                  </button>
                  <button onClick={() => setPureDigits('7')} className="px-2 py-1 bg-slate-800 rounded text-slate-300">
                    0.777… (7/9)
                  </button>
                  <button onClick={() => setPureDigits('27')} className="px-2 py-1 bg-slate-800 rounded text-slate-300">
                    0.2727… (3/11)
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setMixedNonRep('4');
                      setMixedRep('36');
                    }}
                    className="px-2 py-1 bg-slate-800 rounded text-slate-300"
                  >
                    0.43636… (24/55)
                  </button>
                  <button
                    onClick={() => {
                      setMixedNonRep('1');
                      setMixedRep('6');
                    }}
                    className="px-2 py-1 bg-slate-800 rounded text-slate-300"
                  >
                    0.1666… (1/6)
                  </button>
                  <button
                    onClick={() => {
                      setMixedNonRep('4');
                      setMixedRep('6');
                    }}
                    className="px-2 py-1 bg-slate-800 rounded text-slate-300"
                  >
                    0.4666… (7/15)
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              {recType === 'pure' ? (
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Repeating Digit Block (e.g. 36 for 0.3636…)</label>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-mono text-slate-400">0.</span>
                    <input
                      type="text"
                      value={pureDigits}
                      onChange={(e) => setPureDigits(e.target.value.replace(/\D/g, ''))}
                      className="w-full text-center py-2 bg-slate-900 border border-slate-700 rounded-xl text-xl font-bold text-amber-400 font-mono"
                    />
                    <span className="text-lg font-mono text-slate-400">…</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Non-Repeating Digits</label>
                    <input
                      type="text"
                      value={mixedNonRep}
                      onChange={(e) => setMixedNonRep(e.target.value.replace(/\D/g, ''))}
                      className="w-full text-center py-2 bg-slate-900 border border-slate-700 rounded-xl text-lg font-bold text-cyan-300 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Repeating Digits</label>
                    <input
                      type="text"
                      value={mixedRep}
                      onChange={(e) => setMixedRep(e.target.value.replace(/\D/g, ''))}
                      className="w-full text-center py-2 bg-slate-900 border border-slate-700 rounded-xl text-lg font-bold text-amber-300 font-mono"
                    />
                  </div>
                  <div className="text-xs text-slate-400 font-mono text-center">
                    Representing: 0.{mixedNonRep}
                    <span className="underline decoration-amber-400 font-bold text-amber-300">{mixedRep}</span>
                    {mixedRep}…
                  </div>
                </div>
              )}
            </div>

            {/* Fraction Conversion Result */}
            {(() => {
              try {
                if (recType === 'pure') {
                  const res = convertPureRepeating(pureDigits || '1');
                  return (
                    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-center">
                        <div className="text-xs text-slate-400 mb-1">Place Over k Nines:</div>
                        <div className="text-xl text-white font-bold">
                          {res.num} / {res.den}
                        </div>
                      </div>

                      <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-500/30 text-center">
                        <div className="text-xs text-emerald-400 font-semibold">Reduced Simplest Fraction:</div>
                        <div className="text-3xl font-black font-mono text-emerald-300 mt-1">
                          {res.text}
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  const res = convertMixedRepeating(mixedNonRep, mixedRep || '1');
                  return (
                    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-center">
                        <div className="text-xs text-slate-400 mb-1">Subtract Non-Repeating Part:</div>
                        <div className="text-sm text-cyan-300">
                          ({res.fullDigitsStr} − {res.nonRepeatingStr || 0}) / {res.den} = {res.num} / {res.den}
                        </div>
                      </div>

                      <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-500/30 text-center">
                        <div className="text-xs text-emerald-400 font-semibold">Reduced Simplest Fraction:</div>
                        <div className="text-3xl font-black font-mono text-emerald-300 mt-1">
                          {res.text}
                        </div>
                      </div>
                    </div>
                  );
                }
              } catch (err: any) {
                return (
                  <div className="bg-slate-950 p-6 rounded-2xl border border-rose-500/30 text-rose-400 text-xs text-center">
                    Invalid input
                  </div>
                );
              }
            })()}
          </div>
        </div>
      )}

      {/* 5. TELESCOPING SUM */}
      {activeModule === 'telescoping' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-300">
              Identity: <code className="text-amber-400 font-bold">1/[n(n+1)] = 1/n − 1/(n+1)</code>. All intermediate terms cancel!
            </div>
            <div className="flex gap-2 text-xs">
              <button onClick={() => setTeleTerms(49)} className="px-2.5 py-1 bg-slate-800 rounded text-slate-300">
                49 terms (Drill 25: 49/50)
              </button>
              <button onClick={() => setTeleTerms(99)} className="px-2.5 py-1 bg-slate-800 rounded text-slate-300">
                99 terms (99/100)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Number of terms (n)</label>
                <input
                  type="number"
                  value={teleTerms}
                  onChange={(e) => setTeleTerms(parseInt(e.target.value, 10) || 1)}
                  className="w-full text-center py-2 bg-slate-900 border border-slate-700 rounded-xl text-xl font-bold text-amber-400 font-mono"
                />
              </div>
            </div>

            {(() => {
              const res = calculateTelescoping(teleTerms);
              return (
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-center">
                    <div className="text-xs text-slate-400 mb-1">Collapsed Series:</div>
                    <div className="text-base text-cyan-300">{res.formula}</div>
                  </div>

                  <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-500/30 text-center">
                    <div className="text-xs text-emerald-400 font-semibold">Final Exact Fraction:</div>
                    <div className="text-3xl font-black font-mono text-emerald-300 mt-1">
                      {res.numerator}/{res.denominator} ({res.decimal})
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* 6. SPLIT-WHOLE SUBTRACTION */}
      {activeModule === 'splitwhole' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-300">
              Subtract mixed numbers from wholes without tedious improper fraction conversion: rewrite <code className="text-cyan-300">W = (W-1) + d/d</code>.
            </div>
            <div className="flex gap-2 text-xs">
              <button
                onClick={() => {
                  setSwWhole(500);
                  setSwSubWhole(142);
                  setSwNum(7);
                  setSwDen(19);
                }}
                className="px-2.5 py-1 bg-slate-800 rounded text-slate-300"
              >
                500 − 142 7/19 (Drill 02)
              </button>
              <button
                onClick={() => {
                  setSwWhole(100);
                  setSwSubWhole(37);
                  setSwNum(5);
                  setSwDen(13);
                }}
                className="px-2.5 py-1 bg-slate-800 rounded text-slate-300"
              >
                100 − 37 5/13 (Page 3)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Base Whole</label>
                  <input
                    type="number"
                    value={swWhole}
                    onChange={(e) => setSwWhole(parseInt(e.target.value, 10) || 0)}
                    className="w-full text-center py-2 bg-slate-900 border border-slate-700 rounded-xl text-xl font-bold text-amber-400 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Subtracted Whole</label>
                  <input
                    type="number"
                    value={swSubWhole}
                    onChange={(e) => setSwSubWhole(parseInt(e.target.value, 10) || 0)}
                    className="w-full text-center py-2 bg-slate-900 border border-slate-700 rounded-xl text-xl font-bold text-cyan-300 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Fraction Numerator</label>
                  <input
                    type="number"
                    value={swNum}
                    onChange={(e) => setSwNum(parseInt(e.target.value, 10) || 0)}
                    className="w-full text-center py-2 bg-slate-900 border border-slate-700 rounded-xl text-lg font-bold text-slate-300 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Fraction Denominator</label>
                  <input
                    type="number"
                    value={swDen}
                    onChange={(e) => setSwDen(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-full text-center py-2 bg-slate-900 border border-slate-700 rounded-xl text-lg font-bold text-slate-300 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Split Whole Output */}
            {(() => {
              const res = splitWholeSubtract(swWhole, swSubWhole, swNum, swDen);
              return (
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-center space-y-1">
                    <div className="text-xs text-slate-400">Step 1: Rewrite Whole as Complement</div>
                    <div className="text-sm text-cyan-300">
                      {swWhole} = {res.borrowedSplit}
                    </div>
                    <div className="text-xs text-slate-400 pt-1">Step 2: Partition Wholes & Complements</div>
                    <div className="text-sm text-amber-300">
                      ({swWhole - 1} − {swSubWhole}) + ({swDen} − {swNum})/{swDen}
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-500/30 text-center">
                    <div className="text-xs text-emerald-400 font-semibold">Exact Result:</div>
                    <div className="text-3xl font-black font-mono text-emerald-300 mt-1">
                      {res.resultText}
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
