// import { Brain, Target, Trophy } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export default function StatsCards({ assessments }) {
//   const getAverageScore = () => {
//     if (!assessments?.length) return 0;
//     const total = assessments.reduce(
//       (sum, assessment) => sum + assessment.quizScore,
//       0
//     );
//     return (total / assessments.length).toFixed(1);
//   };

//   const getLatestAssessment = () => {
//     if (!assessments?.length) return null;
//     return assessments[0];
//   };

//   const getTotalQuestions = () => {
//     if (!assessments?.length) return 0;
//     return assessments.reduce(
//       (sum, assessment) => sum + assessment.questions.length,
//       0
//     );
//   };

//   return (
//     <div className="grid gap-4 md:grid-cols-3">
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Average Score</CardTitle>
//           <Trophy className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{getAverageScore()}%</div>
//           <p className="text-xs text-muted-foreground">
//             Across all assessments
//           </p>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">
//             Questions Practiced
//           </CardTitle>
//           <Brain className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{getTotalQuestions()}</div>
//           <p className="text-xs text-muted-foreground">Total questions</p>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Latest Score</CardTitle>
//           <Target className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">
//             {getLatestAssessment()?.quizScore.toFixed(1) || 0}%
//           </div>
//           <p className="text-xs text-muted-foreground">Most recent quiz</p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import {
  Brain,
  Target,
  Trophy,
  TrendingUp,
  CircleCheckBig,
  Flame,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsCards({ assessments }) {
  const totalAssessments = assessments?.length || 0;

  const getAverageScore = () => {
    if (!totalAssessments) return 0;
    const total = assessments.reduce(
      (sum, assessment) => sum + (assessment.quizScore || 0),
      0
    );
    return Number((total / totalAssessments).toFixed(1));
  };

  const getLatestAssessment = () => {
    if (!totalAssessments) return null;
    return assessments[0];
  };

  const getTotalQuestions = () => {
    if (!totalAssessments) return 0;
    return assessments.reduce(
      (sum, assessment) => sum + (assessment.questions?.length || 0),
      0
    );
  };

  const getBestScore = () => {
    if (!totalAssessments) return 0;
    return Math.max(...assessments.map((assessment) => assessment.quizScore || 0));
  };

  const getImprovement = () => {
    if (totalAssessments < 2) return 0;
    const latest = assessments[0]?.quizScore || 0;
    const previous = assessments[1]?.quizScore || 0;
    return Number((latest - previous).toFixed(1));
  };

  const getStrongPerformanceCount = () => {
    if (!totalAssessments) return 0;
    return assessments.filter((assessment) => (assessment.quizScore || 0) >= 80)
      .length;
  };

  const avgScore = getAverageScore();
  const latest = getLatestAssessment();
  const totalQuestions = getTotalQuestions();
  const bestScore = getBestScore();
  const improvement = getImprovement();
  const strongCount = getStrongPerformanceCount();

  const getScoreLabel = (score) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Strong";
    if (score >= 60) return "Good";
    if (score >= 40) return "Improving";
    return "Needs work";
  };

  const stats = [
    {
      title: "Average Score",
      value: `${avgScore}%`,
      subtitle: `${getScoreLabel(avgScore)} overall performance`,
      icon: Trophy,
      accent:
        "from-amber-500/15 via-amber-500/5 to-transparent border-amber-500/20",
    },
    {
      title: "Questions Practiced",
      value: totalQuestions,
      subtitle: `${totalAssessments} total assessments completed`,
      icon: Brain,
      accent:
        "from-blue-500/15 via-blue-500/5 to-transparent border-blue-500/20",
    },
    {
      title: "Latest Score",
      value: `${latest?.quizScore?.toFixed(1) || 0}%`,
      subtitle: latest
        ? `${improvement >= 0 ? "+" : ""}${improvement}% vs previous attempt`
        : "No recent assessment yet",
      icon: Target,
      accent:
        "from-emerald-500/15 via-emerald-500/5 to-transparent border-emerald-500/20",
    },
    {
      title: "Best Score",
      value: `${bestScore?.toFixed?.(1) || 0}%`,
      subtitle: "Your top recorded quiz result",
      icon: TrendingUp,
      accent:
        "from-violet-500/15 via-violet-500/5 to-transparent border-violet-500/20",
    },
    {
      title: "Strong Attempts",
      value: strongCount,
      subtitle: "Scores above 80%",
      icon: CircleCheckBig,
      accent:
        "from-cyan-500/15 via-cyan-500/5 to-transparent border-cyan-500/20",
    },
    {
      title: "Consistency",
      value: totalAssessments > 0 ? `${Math.min(100, totalAssessments * 10)}%` : "0%",
      subtitle: "Practice momentum indicator",
      icon: Flame,
      accent:
        "from-rose-500/15 via-rose-500/5 to-transparent border-rose-500/20",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.title}
            className={`relative overflow-hidden border bg-gradient-to-br ${stat.accent} shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
          >
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="rounded-xl border bg-background/80 p-2 shadow-sm">
                <Icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>

            <CardContent className="space-y-2">
              <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.subtitle}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}