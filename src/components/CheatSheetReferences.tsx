/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SIXTEEN_SUTRAS, THIRTEEN_SUB_SUTRAS } from '../data/vedicSutras';
import { RECIPROCAL_GRID } from '../data/reciprocalGrid';
import { Search, BookOpen, ExternalLink, FileText, CheckCircle2, Bookmark } from 'lucide-react';

export const CheatSheetReferences: React.FC = () => {
  const [section, setSection] = useState<'formulas' | 'sutras' | 'reciprocals' | 'bibliography'>('formulas');
  const [recSearch, setRecSearch] = useState<string>('');
  const [sutraSearch, setSutraSearch] = useState<string>('');

  const filteredReciprocals = RECIPROCAL_GRID.filter((r) =>
    r.fraction.includes(recSearch) ||
    r.decimal.includes(recSearch) ||
    r.percentage.toLowerCase().includes(recSearch.toLowerCase()) ||
    r.mentalTip.toLowerCase().includes(recSearch.toLowerCase())
  );

  const filteredSutras = SIXTEEN_SUTRAS.filter((s) =>
    s.sanskrit.includes(sutraSearch) ||
    s.transliteration.toLowerCase().includes(sutraSearch.toLowerCase()) ||
    s.english.toLowerCase().includes(sutraSearch.toLowerCase()) ||
    s.application.toLowerCase().includes(sutraSearch.toLowerCase())
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Reference Guide & Bibliography
            </span>
            <span className="text-xs text-slate-400">Chapters 6 & 7 • Verified Curriculum Texts</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Master Formula Cheat-Sheet & Verified Sources</h2>
          <p className="text-sm text-slate-400">
            Consolidated one-page mathematical identities, Sanskrit sutra compendium, 1/2 to 1/25 reciprocal grid, and citations.
          </p>
        </div>

        {/* Section Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {[
            { id: 'formulas', label: 'Master Formulas' },
            { id: 'sutras', label: '16 Sutras & Sub-Sutras' },
            { id: 'reciprocals', label: '1/2 to 1/25 Grid' },
            { id: 'bibliography', label: 'Academic Sources' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSection(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                section === tab.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. MASTER FORMULAS TABLE */}
      {section === 'formulas' && (
        <div className="space-y-4">
          <div className="text-xs text-slate-400">
            Consolidated from Page 10 of textbook for instant mental recall and last-minute exam revision:
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                  <th className="py-3 px-4">Topic Domain</th>
                  <th className="py-3 px-4">Core Identity / Speed Shortcut</th>
                  <th className="py-3 px-4">Tactical Verification / Worked Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-mono">
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-bold text-cyan-300 font-sans">Fraction Cross-Sum</td>
                  <td className="py-3 px-4 text-amber-300">a/b ± c/d = (ad ± bc) / bd</td>
                  <td className="py-3 px-4 text-slate-300">3/4 + 2/5 = (15 + 8)/20 = 23/20 = 1.15</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-bold text-cyan-300 font-sans">Recurring Decimal → Fraction</td>
                  <td className="py-3 px-4 text-amber-300">
                    0.abab… = ab / 99 <br /> 0.abbb… = (ab − a) / 90
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    0.4545… = 45/99 = 5/11 <br /> 0.1666… = (16−1)/90 = 15/90 = 1/6
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-bold text-cyan-300 font-sans">Componendo-Dividendo</td>
                  <td className="py-3 px-4 text-amber-300">a/b = c/d ⇒ (a+b)/(a−b) = (c+d)/(c−d)</td>
                  <td className="py-3 px-4 text-slate-300">7/3 ⇒ (7+3)/(7−3) = 10/4 = 5/2</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-bold text-cyan-300 font-sans">Alligation Mixture Rule</td>
                  <td className="py-3 px-4 text-amber-300">Qty(Cheap) / Qty(Dear) = (D − M) / (M − C)</td>
                  <td className="py-3 px-4 text-slate-300">Mix 15% and 40% for 25% → (40−25) : (25−15) = 3 : 2</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-bold text-cyan-300 font-sans">Successive Net % Change</td>
                  <td className="py-3 px-4 text-amber-300">Net % = A + B + (A · B / 100)</td>
                  <td className="py-3 px-4 text-slate-300">+20% then −20% → 20 − 20 − 400/100 = −4%</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-bold text-cyan-300 font-sans">Multiply by 5, 25, 125</td>
                  <td className="py-3 px-4 text-amber-300">×5 = ×10/2 | ×25 = ×100/4 | ×125 = ×1000/8</td>
                  <td className="py-3 px-4 text-slate-300">64 × 125 = 64,000 ÷ 8 = 8,000</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-bold text-cyan-300 font-sans">Multiply by 11 (Neighbor Sum)</td>
                  <td className="py-3 px-4 text-amber-300">(a b c) × 11 = a | (a+b) | (b+c) | c</td>
                  <td className="py-3 px-4 text-slate-300">352 × 11 = 3 | (3+5) | (5+2) | 2 = 3,872</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-bold text-cyan-300 font-sans">Digital Root (Beejank Audit)</td>
                  <td className="py-3 px-4 text-amber-300">DR(A × B) = DR(DR(A) × DR(B))</td>
                  <td className="py-3 px-4 text-slate-300">43 × 21 = 903: DR(43)=7, DR(21)=3, DR(21)=3 = DR(903)</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-bold text-cyan-300 font-sans">Product Constancy</td>
                  <td className="py-3 px-4 text-amber-300">Price +n/d requires usage drop by n/(d+n)</td>
                  <td className="py-3 px-4 text-slate-300">+25% (+1/4) requires 1/(4+1) = 1/5 = 20% cut</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-bold text-cyan-300 font-sans">Telescoping Sum</td>
                  <td className="py-3 px-4 text-amber-300">1/[n(n+1)] = 1/n − 1/(n+1)</td>
                  <td className="py-3 px-4 text-slate-300">∑ 1/(n(n+1)) from 1 to 49 = 1 − 1/50 = 49/50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. ALL 16 SUTRAS & 13 SUB-SUTRAS */}
      {section === 'sutras' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search sutras or keywords..."
                value={sutraSearch}
                onChange={(e) => setSutraSearch(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="text-xs text-slate-400">
              Complete Reference: 16 Main Sutras & 13 Sub-Sutras
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase text-amber-400 tracking-wider">The 16 Primary Sutras</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSutras.map((sutra) => (
                <div key={sutra.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400">Sutra #{sutra.id}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">{sutra.category}</span>
                  </div>
                  <div>
                    <div className="text-base font-bold text-white font-serif">{sutra.sanskrit}</div>
                    <div className="text-xs font-semibold text-cyan-300">{sutra.transliteration}</div>
                    <div className="text-xs text-slate-300 italic">"{sutra.english}"</div>
                  </div>
                  <div className="text-xs text-slate-400 pt-1 border-t border-slate-800">
                    <strong>Application:</strong> {sutra.application}
                  </div>
                  <div className="text-[11px] font-mono text-emerald-400 bg-slate-900/60 p-1.5 rounded">
                    Ex: {sutra.example}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 13 Sub-Sutras Table */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold uppercase text-emerald-400 tracking-wider">The 13 Sub-Sutras (Upa-Sutras)</h3>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">Sanskrit & Transliteration</th>
                    <th className="py-2.5 px-3">English Meaning</th>
                    <th className="py-2.5 px-3">Mental Speed Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {THIRTEEN_SUB_SUTRAS.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-800/30">
                      <td className="py-2 px-3 font-mono text-amber-400">{sub.id}</td>
                      <td className="py-2 px-3">
                        <span className="font-serif text-slate-200">{sub.sanskrit}</span>{' '}
                        <span className="text-cyan-400 font-semibold">({sub.transliteration})</span>
                      </td>
                      <td className="py-2 px-3 italic text-slate-300">{sub.english}</td>
                      <td className="py-2 px-3 text-slate-400 font-sans">{sub.application}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. 1/2 TO 1/25 RECIPROCAL GRID */}
      {section === 'reciprocals' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search fractions, decimals, or tips..."
                value={recSearch}
                onChange={(e) => setRecSearch(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="text-xs text-slate-400">
              Master Table from Unit 03 (Pages 3–4 & Page 6)
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                  <th className="py-3 px-3">Unit Fraction</th>
                  <th className="py-3 px-3">Decimal</th>
                  <th className="py-3 px-3">Exact %</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">Key Multiples & Benchmarks</th>
                  <th className="py-3 px-3">Tactical Mental Tip</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                {filteredReciprocals.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-800/30">
                    <td className="py-2.5 px-3 font-bold text-amber-300 text-sm">{r.fraction}</td>
                    <td className="py-2.5 px-3 text-cyan-300">{r.decimal}</td>
                    <td className="py-2.5 px-3 text-emerald-300 font-bold">{r.percentage} ({r.fractionalPct})</td>
                    <td className="py-2.5 px-3 font-sans">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded ${
                          r.type === 'Terminating'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-purple-500/10 text-purple-400'
                        }`}
                      >
                        {r.type}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">{r.keyMultiples}</td>
                    <td className="py-2.5 px-3 text-slate-400 font-sans">{r.mentalTip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. VERIFIED ACADEMIC SOURCES */}
      {section === 'bibliography' && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
              Verified Academic Sources & Scholarly Grounding
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every mathematical definition, visual bar model, reciprocal identity, and historical note in this application is strictly grounded in peer-reviewed open-access curriculum textbooks:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-white">OpenStax Rice University</span>
              </div>
              <p className="text-xs text-slate-300">
                Marecek, L., Anthony-Smith, M., & Mathis, A. H. (2020). <em>Prealgebra 2e</em>.
              </p>
              <ul className="text-xs text-slate-400 list-disc list-inside space-y-1">
                <li>Section 4.1: Visualize Fractions & Mixed-Number conversions</li>
                <li>Section 5.1: Decimals & Place Value beyond unit point</li>
                <li>Section 5.6: Ratios and Rate</li>
                <li>Section 6.1: Understand Percent & Three-Way conversions</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">NCERT National Mathematics (India)</span>
              </div>
              <p className="text-xs text-slate-300">
                NCERT Class 7 & Class 8 Mathematics Textbooks:
              </p>
              <ul className="text-xs text-slate-400 list-disc list-inside space-y-1">
                <li><em>A Peek Beyond the Point</em>: Base-10 Decimal Operations</li>
                <li><em>Fractions in Disguise</em>: Reciprocal Equivalence Grid</li>
                <li><em>Comparing Quantities Exemplar</em>: Successive Percentages & Compound Growth</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold text-white">Khan Academy Curricula</span>
              </div>
              <ul className="text-xs text-slate-400 list-disc list-inside space-y-1">
                <li>Pre-Algebra: Fraction, Decimal, and Percent from Visual Model</li>
                <li>Grade 7 Math: Unit 4 - Rate, Ratio, Proportion and Percentage</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white">Vedic Speed Calculation Primary Treatise</span>
              </div>
              <p className="text-xs text-slate-300">
                Tirthaji, Swami Bharati Krishna (1965). <em>Vedic Mathematics: Sixteen Simple Mathematical Formulae from the Vedas</em>. Motilal Banarsidass.
              </p>
              <p className="text-xs text-slate-400">
                Historiographical analysis by Prof. S. G. Dani (IIT Bombay) and K. S. Shukla (16 Sutras & 13 Sub-Sutras compendium).
              </p>
            </div>
          </div>

          {/* Direct Embedded PDF Links */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <div className="text-xs font-bold uppercase text-slate-400">Attached Primary Textbooks in Workspace:</div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/assets/aistudio/EPICHUB_Math_Fractions_Decimals_Ratios_Percentages_Vedic_Guide_d5164fb9.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-cyan-300 border border-slate-700 transition"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>EPICHUB Illustrated Guide (13 Pages PDF)</span>
                <ExternalLink className="w-3.5 h-3.5 ml-auto text-slate-500" />
              </a>

              <a
                href="/assets/aistudio/Math__Fractions__Decimals__Ratios__Percentages___Vedic_Speed_Calculation___Complete_Reference_Guide_3408d520.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-amber-300 border border-slate-700 transition"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Complete Reference Guide & Drills (10 Pages PDF)</span>
                <ExternalLink className="w-3.5 h-3.5 ml-auto text-slate-500" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
