"use client";

import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { CategoryResult } from "@/app/page";

interface Props {
  results: CategoryResult[];
}

export default function RadarChart({ results }: Props) {
  const data = results.map((r) => ({
    category: r.config.name.length > 15
      ? r.config.name.split(" ").slice(0, 2).join(" ")
      : r.config.name,
    fullName: r.config.name,
    score: Math.round(r.percentage * 100),
    fullMark: 100,
  }));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <RechartsRadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis
          dataKey="category"
          tick={{ fontSize: 11, fill: "#64748b" }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fontSize: 10, fill: "#94a3b8" }}
          tickCount={5}
        />
        <Radar
          name="Score"
          dataKey="score"
          stroke="#6366f1"
          fill="#6366f1"
          fillOpacity={0.25}
          strokeWidth={2}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            fontSize: "13px",
          }}
          formatter={(value: unknown) => [`${value}%`, "Score"]}
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
}
