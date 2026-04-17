"use client";

import { useState } from "react";
import Image from "next/image";
import {
  questions,
  categoryConfigs,
  TOTAL_MAX_SCORE,
  getOverallMaturityZone,
} from "@/lib/data";
import type { Category, CategoryConfig, MaturityBand } from "@/lib/data";
import ResultsDashboard from "@/components/ResultsDashboard";

export interface CategoryResult {
  config: CategoryConfig;
  score: number;
  percentage: number;
  band: MaturityBand;
}

export default function Home() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  function handleSelect(questionId: number, score: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  }

  function handleSubmit() {
    if (allAnswered) setSubmitted(true);
  }

  function handleReset() {
    setAnswers({});
    setSubmitted(false);
  }

  if (submitted) {
    const categoryScores: Record<Category, number> = {} as Record<
      Category,
      number
    >;
    for (const cfg of categoryConfigs) {
      categoryScores[cfg.name] = 0;
    }
    for (const q of questions) {
      categoryScores[q.category] += answers[q.id] ?? 0;
    }

    const results: CategoryResult[] = categoryConfigs.map((cfg) => {
      const score = categoryScores[cfg.name];
      const percentage = cfg.maxScore > 0 ? score / cfg.maxScore : 0;
      const band = cfg.bands.find(
        (b) => score >= b.scoreRange[0] && score <= b.scoreRange[1]
      )!;
      return { config: cfg, score, percentage, band };
    });

    const totalScore = results.reduce((s, r) => s + r.score, 0);
    const overallZone = getOverallMaturityZone(totalScore, TOTAL_MAX_SCORE);

    return (
      <ResultsDashboard
        results={results}
        totalScore={totalScore}
        maxScore={TOTAL_MAX_SCORE}
        overallZone={overallZone}
        onReset={handleReset}
      />
    );
  }

  const grouped: { category: Category; questions: typeof questions }[] = [];
  const seen = new Set<Category>();
  for (const q of questions) {
    if (!seen.has(q.category)) {
      seen.add(q.category);
      grouped.push({
        category: q.category,
        questions: questions.filter((qq) => qq.category === q.category),
      });
    }
  }

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center gap-4">
          <Image src="/pmp_logo.png" alt="PMP Logo" width={160} height={80} />
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Delivery Excellence Dipstick
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 mt-6">
        <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
          <span>Progress</span>
          <span>
            {answeredCount} of {questions.length} answered
          </span>
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-500"
            style={{ width: `${(answeredCount / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-10">
        {grouped.map((group) => {
          const cfg = categoryConfigs.find((c) => c.name === group.category)!;
          return (
            <section key={group.category}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">{cfg.icon}</span>
                <h2 className="text-lg font-semibold text-slate-800">
                  {group.category}
                </h2>
              </div>
              <div className="space-y-4">
                {group.questions.map((q) => (
                  <div
                    key={q.id}
                    className={`bg-white rounded-xl border p-5 transition-all duration-200 ${
                      answers[q.id] !== undefined
                        ? "border-indigo-200 shadow-sm"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <p className="text-sm font-medium text-slate-700 mb-3">
                      <span className="text-indigo-600 font-semibold mr-2">
                        Q{q.id}.
                      </span>
                      {q.text}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {q.options.map((opt) => (
                        <button
                          key={opt.label}
                          onClick={() => handleSelect(q.id, opt.score)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
                            answers[q.id] === opt.score
                              ? "bg-indigo-600 text-white shadow-md"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        <div className="pt-4 pb-12">
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`w-full py-3.5 rounded-xl text-base font-semibold transition-all duration-200 cursor-pointer ${
              allAnswered
                ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            {allAnswered
              ? "View Assessment Results"
              : `Answer all questions to continue (${
                  questions.length - answeredCount
                } remaining)`}
          </button>
        </div>
      </main>
    </div>
  );
}
