"use client";

import type { CategoryResult } from "@/app/page";
import RadarChart from "./RadarChart";

interface Props {
  results: CategoryResult[];
  totalScore: number;
  maxScore: number;
  overallZone: { label: string; color: string; insight: string };
  onReset: () => void;
}

const bandColorMap: Record<string, string> = {
  red: "bg-red-50 border-red-200 text-red-800",
  yellow: "bg-amber-50 border-amber-200 text-amber-800",
  green: "bg-emerald-50 border-emerald-200 text-emerald-800",
  blue: "bg-blue-50 border-blue-200 text-blue-800",
};

const bandBadgeMap: Record<string, string> = {
  red: "bg-red-100 text-red-700",
  yellow: "bg-amber-100 text-amber-700",
  green: "bg-emerald-100 text-emerald-700",
  blue: "bg-blue-100 text-blue-700",
};

const zoneGradientMap: Record<string, string> = {
  red: "from-red-500 to-red-600",
  yellow: "from-amber-400 to-amber-500",
  green: "from-emerald-500 to-emerald-600",
};

export default function ResultsDashboard({
  results,
  totalScore,
  maxScore,
  overallZone,
  onReset,
}: Props) {
  const pct = Math.round((totalScore / maxScore) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Executive Insights
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Delivery Excellence Assessment Results
            </p>
          </div>
          <button
            onClick={onReset}
            className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer"
          >
            Retake Assessment
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Overall Score Card */}
        <div
          className={`rounded-2xl bg-gradient-to-r ${
            zoneGradientMap[overallZone.color]
          } p-8 text-white shadow-xl`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-white/80 uppercase tracking-wider">
                Overall Delivery Maturity
              </p>
              <h2 className="text-3xl font-bold mt-1">{overallZone.label}</h2>
              <p className="text-white/90 mt-2 max-w-xl">
                {overallZone.insight}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <div className="text-center">
                  <p className="text-3xl font-bold">{totalScore}</p>
                  <p className="text-sm text-white/80">/ {maxScore}</p>
                </div>
              </div>
              <p className="text-sm font-medium mt-2 text-white/80">
                {pct}% Score
              </p>
            </div>
          </div>
        </div>

        {/* Charts + Summary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Radar Chart */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Maturity Radar
            </h3>
            <RadarChart results={results} />
          </div>

          {/* Score Summary Table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Category Scores
            </h3>
            <div className="space-y-3">
              {results.map((r) => (
                <div key={r.config.name} className="flex items-center gap-3">
                  <span className="text-lg w-7">{r.config.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">
                        {r.config.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            bandBadgeMap[r.band.color]
                          }`}
                        >
                          {r.band.label}
                        </span>
                        <span className="text-xs text-slate-400">
                          {r.score}/{r.config.maxScore}
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          r.band.color === "red"
                            ? "bg-red-400"
                            : r.band.color === "yellow"
                            ? "bg-amber-400"
                            : r.band.color === "blue"
                            ? "bg-blue-500"
                            : "bg-emerald-500"
                        }`}
                        style={{ width: `${r.percentage * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Insights */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Detailed Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((r) => (
              <div
                key={r.config.name}
                className={`rounded-xl border p-5 ${
                  bandColorMap[r.band.color]
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{r.config.icon}</span>
                  <h4 className="font-semibold">{r.config.name}</h4>
                  <span
                    className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full ${
                      bandBadgeMap[r.band.color]
                    }`}
                  >
                    {r.band.emoji} {r.band.label}
                  </span>
                </div>
                <p className="text-sm leading-relaxed opacity-90">
                  {r.band.insight}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Print / Actions */}
        <div className="flex justify-center gap-4 pb-12 pt-4">
          <button
            onClick={() => window.print()}
            className="px-6 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Print Report
          </button>
          <button
            onClick={onReset}
            className="px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            New Assessment
          </button>
        </div>
      </main>
    </div>
  );
}
