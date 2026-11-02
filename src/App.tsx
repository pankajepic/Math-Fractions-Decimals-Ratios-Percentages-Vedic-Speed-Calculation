/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ButterflySimulator } from './components/ButterflySimulator';
import { CyclicSeventhRing } from './components/CyclicSeventhRing';
import { VedicMultiplicationVisualizer } from './components/VedicMultiplicationVisualizer';
import { RatioAlligationVisualizer } from './components/RatioAlligationVisualizer';
import { NumberSenseLab } from './components/NumberSenseLab';
import { DrillsWorkbook } from './components/DrillsWorkbook';
import { CheatSheetReferences } from './components/CheatSheetReferences';
import {
  Sparkles,
  PieChart,
  RotateCw,
  Scale,
  Zap,
  Activity,
  Award,
  BookOpen,
  CheckCircle2,
  Bookmark,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'fractions' | 'decimals' | 'ratios' | 'vedic' | 'numbersense' | 'drills' | 'cheatsheet'
  >('fractions');

  useEffect(() => {
    // Check URL parameters for autostart or direct deep linking
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam && ['fractions', 'decimals', 'ratios', 'vedic', 'numbersense', 'drills', 'cheatsheet'].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }
  }, []);

  const navItems = [
    { id: 'fractions', label: '1. Fractions Butterfly', icon: PieChart, badge: 'Cross-Sum' },
    { id: 'decimals', label: '2. Cyclic 142857 Ring', icon: RotateCw, badge: 'Repeating' },
    { id: 'ratios', label: '3. Ratios & Alligation', icon: Scale, badge: 'Mixtures' },
    { id: 'vedic', label: '4. Vedic Speed Engines', icon: Zap, badge: '16 Sutras' },
    { id: 'numbersense', label: '5. Number Sense Lab', icon: Activity, badge: 'Divisibility' },
    { id: 'drills', label: '6. 25 Timed Drills', icon: Award, badge: 'Workbook' },
    { id: 'cheatsheet', label: '7. Master Cheat-Sheet', icon: BookOpen, badge: 'Formulas' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Banner & Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-cyan-500 p-0.5 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-amber-400 font-serif text-lg">
                EP
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">
                  EPICHUB • Verified Academic Edition
                </span>
                <span className="px-2 py-0.2 rounded-full text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                  2026 Curriculum
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                Math, Fractions, Decimals, Ratios & Vedic Speed Studio
              </h1>
            </div>
          </div>

          {/* Quick Stats / Jump to Drills */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('drills')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-md shadow-amber-500/10"
            >
              <Award className="w-4 h-4" />
              <span>Take 25 Speed Drills</span>
            </button>
            <button
              onClick={() => setActiveTab('cheatsheet')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition border border-slate-700"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Formula Guide</span>
            </button>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="border-t border-slate-800/60 bg-slate-950/60 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 py-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold shadow-inner'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                      isActive ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Module Content */}
        {activeTab === 'fractions' && <ButterflySimulator />}
        {activeTab === 'decimals' && <CyclicSeventhRing />}
        {activeTab === 'ratios' && <RatioAlligationVisualizer />}
        {activeTab === 'vedic' && <VedicMultiplicationVisualizer />}
        {activeTab === 'numbersense' && <NumberSenseLab />}
        {activeTab === 'drills' && <DrillsWorkbook />}
        {activeTab === 'cheatsheet' && <CheatSheetReferences />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6 mt-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-medium text-slate-400">
              Published by EPICHUB • Grounded in OpenStax Prealgebra 2e, NCERT Mathematics, Khan Academy, and Bharati Krishna Tirthaji (1965).
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Fractions • Decimals • Ratios & Proportions • Alligation • Percentages • 16 Vedic Sutras & 13 Sub-Sutras.
            </p>
          </div>

          <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
            <span>100% Deterministic Arithmetic</span>
            <span>•</span>
            <span>Zero Fluff Mental Engines</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
