// "use client";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { useEffect, useState } from "react";
// import { format } from "date-fns";

// export default function PerformanceChart({ assessments }) {
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     if (assessments && assessments.length > 0) {
//       const formattedData = assessments
//         .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
//         .map((assessment, index) => ({
//           index, // ✅ unique X-axis key (fixes same-date issue)
//           date: format(new Date(assessment.createdAt), "MMM dd"),
//           fullDate: format(
//             new Date(assessment.createdAt),
//             "MMM dd, yyyy HH:mm"
//           ),
//           score: assessment.quizScore,
//         }));

//       setChartData(formattedData);
//     }
//   }, [assessments]);

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="gradient-title text-3xl md:text-4xl">
//           Performance Trend
//         </CardTitle>
//         <CardDescription>Your quiz scores over time</CardDescription>
//       </CardHeader>

//       <CardContent>
//         <div className="h-[300px]">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />

//               {/* ✅ Use index instead of date */}
//               <XAxis
//                 dataKey="index"
//                 tickFormatter={(value) =>
//                   chartData[value]?.date || ""
//                 }
//               />

//               <YAxis domain={[0, 100]} />

//               <Tooltip
//                 content={({ active, payload }) => {
//                   if (active && payload?.length) {
//                     const data = payload[0].payload;
//                     return (
//                       <div className="bg-background border rounded-lg p-2 shadow-md">
//                         <p className="text-sm font-medium">
//                           Score: {data.score}%
//                         </p>
//                         <p className="text-xs text-muted-foreground">
//                           {data.fullDate}
//                         </p>
//                       </div>
//                     );
//                   }
//                   return null;
//                 }}
//               />

//               <Line
//                 type="monotone"
//                 dataKey="score"
//                 stroke="hsl(var(--primary))"
//                 strokeWidth={3}
//                 dot={{ r: 5 }}
//                 activeDot={{ r: 7 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
"use client";

import { useMemo } from "react";
import { format } from "date-fns";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp, Activity, BarChart3 } from "lucide-react";

export default function PerformanceChart({ assessments = [] }) {
  const chartData = useMemo(() => {
    if (!assessments.length) return [];

    return [...assessments]
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
      .map((assessment, index) => ({
        index,
        shortDate: format(new Date(assessment.createdAt), "MMM dd"),
        fullDate: format(new Date(assessment.createdAt), "MMM dd, yyyy HH:mm"),
        score: Number(assessment.quizScore || 0),
        questions: assessment.questions?.length || 0,
        category: assessment.category || "General",
      }));
  }, [assessments]);

  const averageScore = useMemo(() => {
    if (!chartData.length) return 0;
    return Number(
      (
        chartData.reduce((sum, item) => sum + item.score, 0) / chartData.length
      ).toFixed(1)
    );
  }, [chartData]);

  const trendText = useMemo(() => {
    if (chartData.length < 2) return "Not enough data";
    const first = chartData[0].score;
    const last = chartData[chartData.length - 1].score;
    const diff = Number((last - first).toFixed(1));

    if (diff > 0) return `Up by ${diff}%`;
    if (diff < 0) return `Down by ${Math.abs(diff)}%`;
    return "Stable";
  }, [chartData]);

  const highestScore = useMemo(() => {
    if (!chartData.length) return 0;
    return Math.max(...chartData.map((item) => item.score));
  }, [chartData]);

  if (!chartData.length) {
    return (
      <Card className="border border-border/60 bg-background/60 shadow-sm backdrop-blur">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl gradient-title">
            Performance Trend
          </CardTitle>
          <CardDescription>
            Your quiz scores will appear here after you complete assessments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/20 text-center">
            <Activity className="mb-3 h-10 w-10 text-muted-foreground" />
            <p className="text-lg font-semibold">No performance data yet</p>
            <p className="text-sm text-muted-foreground">
              Start your first interview quiz to unlock analytics.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border border-border/60 bg-background/60 shadow-sm backdrop-blur">
      <CardHeader className="gap-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <BarChart3 className="h-3.5 w-3.5" />
              Performance analytics
            </div>

            <CardTitle className="text-2xl md:text-4xl gradient-title">
              Performance Trend
            </CardTitle>
            <CardDescription className="mt-2 text-sm md:text-base">
              Visualize score progression across your interview practice sessions
            </CardDescription>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/60 bg-background/70 px-4 py-3 shadow-sm">
              <p className="text-xs text-muted-foreground">Average</p>
              <p className="text-xl font-bold text-foreground">{averageScore}%</p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-background/70 px-4 py-3 shadow-sm">
              <p className="text-xs text-muted-foreground">Trend</p>
              <p className="text-xl font-bold text-foreground">{trendText}</p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-background/70 px-4 py-3 shadow-sm">
              <p className="text-xs text-muted-foreground">Best Score</p>
              <p className="text-xl font-bold text-foreground">{highestScore}%</p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-2xl border border-border/50 bg-gradient-to-b from-primary/5 via-background to-background p-3 md:p-5">
          <div className="h-[360px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={chartData}
                margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
              >
                <defs>
                  <linearGradient id="scoreAreaFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.35} />
                    <stop offset="35%" stopColor="#06b6d4" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#0f172a" stopOpacity={0.03} />
                  </linearGradient>

                  <linearGradient id="lineStroke" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>

                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <CartesianGrid
                  stroke="rgba(148, 163, 184, 0.18)"
                  strokeDasharray="4 4"
                  vertical={false}
                />

                <XAxis
                  dataKey="index"
                  tickLine={false}
                  axisLine={false}
                  interval="preserveStartEnd"
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  tickFormatter={(value) => chartData[value]?.shortDate || ""}
                />

                <YAxis
                  domain={[0, 100]}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />

                <Tooltip
                  cursor={{ stroke: "rgba(255,255,255,0.25)", strokeWidth: 1 }}
                  content={({ active, payload }) => {
                    if (active && payload?.length) {
                      const data = payload[0].payload;

                      return (
                        <div className="min-w-[200px] rounded-2xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl backdrop-blur">
                          <p className="text-base font-bold text-white">
                            {data.score}% score
                          </p>
                          <p className="mt-1 text-xs text-slate-300">
                            {data.fullDate}
                          </p>
                          <div className="mt-3 space-y-1 text-sm">
                            <p className="text-slate-300">
                              Category: <span className="font-medium text-white">{data.category}</span>
                            </p>
                            <p className="text-slate-300">
                              Questions: <span className="font-medium text-white">{data.questions}</span>
                            </p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <ReferenceLine
                  y={averageScore}
                  stroke="rgba(255,255,255,0.35)"
                  strokeDasharray="6 6"
                  label={{
                    value: `Avg ${averageScore}%`,
                    position: "right",
                    fill: "#cbd5e1",
                    fontSize: 12,
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="score"
                  fill="url(#scoreAreaFill)"
                  stroke="none"
                />

                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="url(#lineStroke)"
                  strokeWidth={4}
                  filter="url(#glow)"
                  dot={{
                    r: 5,
                    strokeWidth: 3,
                    stroke: "#ffffff",
                    fill: "#0ea5e9",
                  }}
                  activeDot={{
                    r: 8,
                    strokeWidth: 3,
                    stroke: "#ffffff",
                    fill: "#8b5cf6",
                  }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4 text-primary" />
          This chart helps you quickly spot consistency, growth, and weak phases.
        </div>
      </CardContent>
    </Card>
  );
}