// import StatsCards from "./components/stats-cards";

// export default function InterviewPrepPage() {
//   return (
//     <div className="space-y-6">
//       <StatsCards assessments={[]} />
//     </div>
//   );
// }

// import { getAssessments } from "@/actions/interview";
// import StatsCards from "./components/stats-cards";
// import PerformanceChart from "./components/performance-charts";
// import QuizList from "./components/quiz-list";

// export default async function InterviewPrepPage() {
//   const assessments = await getAssessments();

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-5">
//         <h1 className="text-6xl font-bold gradient-title">
//           Interview Preparation
//         </h1>
//       </div>
//       <div className="space-y-6">
//         <StatsCards assessments={assessments} />
//         <PerformanceChart assessments={assessments} />
//         <QuizList assessments={assessments} />
//       </div>
//     </div>
//   );
// }

// import { getAssessments } from "@/actions/interview";
// import StatsCards from "./components/stats-cards";
// import PerformanceChart from "./components/performance-charts";
// import QuizList from "./components/quiz-list";
// import { Button } from "@/components/ui/button";
// import { Sparkles, BrainCircuit } from "lucide-react";
// import { Input } from "@/components/ui/input";

// export default async function InterviewPrepPage() {
//   const assessments = await getAssessments();

//   const totalAttempts = assessments?.length || 0;
//   const avgScore = totalAttempts
//     ? (
//         assessments.reduce((sum, item) => sum + (item.quizScore || 0), 0) /
//         totalAttempts
//       ).toFixed(1)
//     : 0;

//   return (
//     <div className="min-h-screen space-y-8 pb-10">
//       <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/10 via-background to-background p-6 md:p-10 shadow-sm">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.12),transparent_30%)] pointer-events-none" />
//         <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
//         <div className="absolute -bottom-16 left-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

//         <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
//           <div className="max-w-3xl space-y-4">
//             <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-sm text-muted-foreground backdrop-blur">
//               <Sparkles className="h-4 w-4 text-primary" />
//               Smart interview practice dashboard
//             </div>

//             <div className="space-y-3">
//               <h1 className="text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl gradient-title">
//                 Interview Preparation
//               </h1>
//               <p className="max-w-2xl text-sm md:text-base text-muted-foreground">
//                 Track your quiz performance, review mistakes, identify weak areas,
//                 and improve with data-driven practice insights.
//               </p>
//             </div>

//             <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
//               <div className="rounded-xl border bg-background/70 px-4 py-2">
//                 <span className="font-semibold text-foreground">{totalAttempts}</span>{" "}
//                 total attempts
//               </div>
//               <div className="rounded-xl border bg-background/70 px-4 py-2">
//                 <span className="font-semibold text-foreground">{avgScore}%</span>{" "}
//                 average score
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-3">
//             <Button size="lg" className="rounded-xl shadow-sm">
//               <BrainCircuit className="mr-2 h-4 w-4" />
//               Start New Quiz
//             </Button>

//             <Button
//               size="lg"
//               variant="outline"
//               className="rounded-xl bg-background/80 backdrop-blur"
//             >
//               View History
//             </Button>
//           </div>
//         </div>
//       </section>

//       <div className="space-y-6">
//         <StatsCards assessments={assessments} />
//         <PerformanceChart assessments={assessments} />
//         <QuizList assessments={assessments} />
//       </div>
//     </div>
//   );
// }

import Link from "next/link";
import { getAssessments } from "@/actions/interview";
import StatsCards from "./components/stats-cards";
import PerformanceChart from "./components/performance-charts";
import QuizList from "./components/quiz-list";
import { Button } from "@/components/ui/button";
import { Sparkles, BrainCircuit, List } from "lucide-react";

export default async function InterviewPrepPage() {
  const assessments = await getAssessments();

  const totalAttempts = assessments?.length || 0;
  const avgScore = totalAttempts
    ? (
        assessments.reduce((sum, item) => sum + (item.quizScore || 0), 0) /
        totalAttempts
      ).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen space-y-8 pb-10">
      <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/10 via-background to-background p-6 md:p-10 shadow-sm">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.12),transparent_30%)]" />
        <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 left-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-sm text-muted-foreground backdrop-blur">
              <Sparkles className="h-4 w-4 text-primary" />
              Smart interview practice dashboard
            </div>

            <div className="space-y-3">
              <h1 className="gradient-title text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl">
                Interview Preparation
              </h1>

              <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
                Track your quiz performance, review mistakes, identify weak areas,
                and improve with data-driven practice insights.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <div className="rounded-xl border bg-background/70 px-4 py-2">
                <span className="font-semibold text-foreground">
                  {totalAttempts}
                </span>{" "}
                total attempts
              </div>

              <div className="rounded-xl border bg-background/70 px-4 py-2">
                <span className="font-semibold text-foreground">
                  {avgScore}%
                </span>{" "}
                average score
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-xl shadow-sm">
              <Link href="/interview/mock">
                <BrainCircuit className="mr-2 h-4 w-4" />
                Start New Quiz
              </Link>
            </Button>

            
          </div>
        </div>
      </section>

      <div className="space-y-6">
        <StatsCards assessments={assessments} />
        <PerformanceChart assessments={assessments} />
        <QuizList assessments={assessments} />
      </div>
    </div>
  );
}