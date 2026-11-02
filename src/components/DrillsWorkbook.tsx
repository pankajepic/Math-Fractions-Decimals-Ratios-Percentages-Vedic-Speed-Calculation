/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { WORKBOOK_DRILLS, WorkbookDrill } from '../data/workbookDrills';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  ChevronDown,
  ChevronUp,
  Brain,
  Check,
} from 'lucide-react';

export const DrillsWorkbook: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'A' | 'B'>('ALL');
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [evaluations, setEvaluations] = useState<Record<number, boolean | null>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<number, boolean>>({});
  const [revealedHints, setRevealedHints] = useState<Record<number, boolean>>({});

  // Timer: 8 mins target (480 seconds)
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const filteredDrills = WORKBOOK_DRILLS.filter((d) => {
    if (filter === 'ALL') return true;
    return d.section === filter;
  });

  const handleAnswerChange = (id: number, val: string) => {
    setUserAnswers((prev) => ({ ...prev, [id]: val }));
    // Reset eval on type
    if (evaluations[id] !== undefined) {
      setEvaluations((prev) => ({ ...prev, [id]: null }));
    }
  };

  const checkAnswer = (drill: WorkbookDrill) => {
    const raw = (userAnswers[drill.id] || '').trim().toLowerCase();
    if (!raw) return;

    // Normalization: strip commas, spaces, percent signs, etc.
    const cleanRaw = raw.replace(/[,\s%]/g, '');
    const isCorrect = drill.acceptedAnswers.some((accepted) => {
      const cleanAccepted = accepted.toLowerCase().replace(/[,\s%]/g, '');
      return cleanRaw === cleanAccepted || raw.includes(cleanAccepted);
    });

    setEvaluations((prev) => ({ ...prev, [drill.id]: isCorrect }));
  };

  const toggleSolution = (id: number) => {
    setRevealedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleHint = (id: number) => {
    setRevealedHints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetAll = () => {
    setUserAnswers({});
    setEvaluations({});
    setRevealedSolutions({});
    setRevealedHints({});
    setSecondsElapsed(0);
    setIsTimerRunning(false);
  };

  // Stats
  const totalCount = WORKBOOK_DRILLS.length;
  const answeredCount = Object.keys(userAnswers).filter((k) => userAnswers[Number(k)]?.trim()).length;
  const correctCount = Object.values(evaluations).filter((v) => v === true).length;
  const accuracyPct = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
              Unit 06 & Ch. 6.2
            </span>
            <span className="text-xs text-slate-400">Target Time: 8:00 Mins (No Calculator Permitted)</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">25 Timed Speed-Drill Practice Workbook</h2>
          <p className="text-sm text-slate-400">
            Apply Vedic Sutras & Arithmetic shortcuts. Record your mental workspace partitions and verify your speed & accuracy.
          </p>
        </div>

        {/* Stopwatch & Stats Bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Timer Card */}
          <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
            <Timer className={`w-5 h-5 ${isTimerRunning ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`} />
            <div className="font-mono text-xl font-bold text-white tracking-wider">
              {formatTime(secondsElapsed)}
            </div>
            <div className="flex items-center gap-1 border-l border-slate-800 pl-2">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                title={isTimerRunning ? 'Pause' : 'Start'}
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => {
                  setSecondsElapsed(0);
                  setIsTimerRunning(false);
                }}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Score Badge */}
          <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
            <Award className="w-5 h-5 text-amber-400" />
            <div className="text-xs">
              <div className="font-bold text-white">
                Score: <span className="text-emerald-400">{correctCount}</span> / {totalCount}
              </div>
              <div className="text-slate-400 font-mono text-[10px]">
                {accuracyPct}% accuracy
              </div>
            </div>
          </div>

          <button
            onClick={resetAll}
            className="text-xs px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            Reset All
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-2 rounded-xl border border-slate-800">
        <div className="flex gap-1.5">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === 'ALL'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            All 25 Problems
          </button>
          <button
            onClick={() => setFilter('A')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === 'A'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Section A: Fractions & Decimals (1–12)
          </button>
          <button
            onClick={() => setFilter('B')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === 'B'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Section B: Vedic Speed Arithmetic (13–25)
          </button>
        </div>

        <div className="text-xs text-slate-400 px-2">
          Showing {filteredDrills.length} problems
        </div>
      </div>

      {/* Drills List */}
      <div className="space-y-4">
        {filteredDrills.map((drill) => {
          const userVal = userAnswers[drill.id] || '';
          const isEvaluated = evaluations[drill.id] !== undefined && evaluations[drill.id] !== null;
          const isCorrect = evaluations[drill.id] === true;
          const isHintOpen = revealedHints[drill.id];
          const isSolOpen = revealedSolutions[drill.id];

          return (
            <div
              key={drill.id}
              className={`p-4 rounded-xl border transition-all ${
                isEvaluated
                  ? isCorrect
                    ? 'bg-emerald-950/20 border-emerald-500/50'
                    : 'bg-rose-950/20 border-rose-500/50'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                {/* Problem Statement */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-slate-800 font-mono text-xs font-bold text-amber-400 flex items-center justify-center border border-slate-700">
                      P{drill.id < 10 ? `0${drill.id}` : drill.id}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {drill.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                      Method: {drill.speedMethod}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-white">{drill.problem}</p>

                  {/* Hint Toggle */}
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={() => toggleHint(drill.id)}
                      className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      {isHintOpen ? 'Hide Tactical Hint' : 'Show Tactical Hint'}
                    </button>

                    <button
                      onClick={() => toggleSolution(drill.id)}
                      className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition"
                    >
                      <Brain className="w-3.5 h-3.5" />
                      {isSolOpen ? 'Hide Worked Solution' : 'Show Textbook Proof'}
                    </button>
                  </div>

                  {isHintOpen && (
                    <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200">
                      <strong>Tactical Hint:</strong> {drill.tacticalHint}
                    </div>
                  )}
                </div>

                {/* Input & Check Column */}
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 w-full md:w-auto">
                  <div className="relative w-full sm:w-52">
                    <input
                      type="text"
                      aria-label={`Answer for problem ${drill.id}`}
                      placeholder="Answer (e.g. 65/77 or 35,717)"
                      value={userVal}
                      onChange={(e) => handleAnswerChange(drill.id, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') checkAnswer(drill);
                      }}
                      className={`w-full py-2 px-3 text-sm font-mono rounded-xl border bg-slate-900 focus:outline-none transition ${
                        isEvaluated
                          ? isCorrect
                            ? 'border-emerald-500 text-emerald-300'
                            : 'border-rose-500 text-rose-300'
                          : 'border-slate-700 text-white focus:border-amber-500'
                      }`}
                    />
                    {isEvaluated && (
                      <span className="absolute right-2.5 top-2.5">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-400" />
                        )}
                      </span>
                    )}
                  </div>

                  <button
                    aria-label={`Check answer for problem ${drill.id}`}
                    onClick={() => checkAnswer(drill)}
                    className="w-full sm:w-auto px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition shadow-md shadow-amber-500/10"
                  >
                    Check
                  </button>
                </div>
              </div>

              {/* Solution Expansion */}
              {isSolOpen && (
                <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                    <span>Canonical Answer:</span>
                    <span className="font-mono bg-slate-900 px-2 py-0.5 rounded text-white border border-slate-700">
                      {drill.canonicalAnswer}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed">
                    <strong>Step-by-Step Breakdown:</strong> {drill.workedSolution}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
