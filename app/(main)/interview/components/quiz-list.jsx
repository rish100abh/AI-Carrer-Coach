// "use client";

// import { useState } from "react";
// import { format } from "date-fns";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// export default function QuizList({ assessments }) {
//   const router = useRouter();
//   const [selectedQuiz, setSelectedQuiz] = useState(null);

//   return (
//     <>
//       {/* Main List */}
//       <Card>
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <div>
//               <CardTitle className="gradient-title text-3xl md:text-4xl">
//                 Recent Quizzes
//               </CardTitle>
//               <CardDescription>
//                 Review your past quiz performance
//               </CardDescription>
//             </div>
//             <Button onClick={() => router.push("/interview/mock")}>
//               Start New Quiz
//             </Button>
//           </div>
//         </CardHeader>

//         <CardContent>
//           <div className="space-y-4">
//             {assessments?.map((assessment, i) => (
//               <Card
//                 key={assessment.id}
//                 className="cursor-pointer hover:bg-muted/50 transition-colors"
//                 onClick={() => setSelectedQuiz(assessment)}
//               >
//                 <CardHeader>
//                   <CardTitle className="gradient-title text-2xl">
//                     Quiz {i + 1}
//                   </CardTitle>
//                   <CardDescription className="flex justify-between w-full">
//                     <div>Score: {assessment.quizScore.toFixed(1)}%</div>
//                     <div>
//                       {format(
//                         new Date(assessment.createdAt),
//                         "MMMM dd, yyyy HH:mm"
//                       )}
//                     </div>
//                   </CardDescription>
//                 </CardHeader>

//                 {assessment.improvementTip && (
//                   <CardContent>
//                     <p className="text-sm text-muted-foreground">
//                       {assessment.improvementTip}
//                     </p>
//                   </CardContent>
//                 )}
//               </Card>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Dialog (Result View) */}
//       <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
//         <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle>Quiz Result</DialogTitle>
//           </DialogHeader>

//           {selectedQuiz && (
//             <div className="space-y-6">
//               {/* Score */}
//               <div className="text-center">
//                 <h2 className="text-3xl font-bold">
//                   {selectedQuiz.quizScore.toFixed(1)}%
//                 </h2>
//                 <p className="text-muted-foreground">Your Score</p>
//               </div>

//               {/* Meta Info */}
//               <div className="flex flex-wrap gap-3">
//                 <span className="border px-3 py-1 rounded-full text-sm">
//                   Category: {selectedQuiz.category}
//                 </span>
//                 <span className="border px-3 py-1 rounded-full text-sm">
//                   Total Questions: {selectedQuiz.questions?.length}
//                 </span>
//               </div>

//               {/* Improvement Tip */}
//               {selectedQuiz.improvementTip && (
//                 <div className="p-4 border rounded-xl bg-muted/30">
//                   <h3 className="font-semibold mb-2">💡 Improvement Tip</h3>
//                   <p className="text-sm text-muted-foreground">
//                     {selectedQuiz.improvementTip}
//                   </p>
//                 </div>
//               )}

//               {/* Questions */}
//               <div className="space-y-4">
//                 {selectedQuiz.questions?.map((q, index) => (
//                   <Card key={index}>
//                     <CardContent className="p-4 space-y-2">
//                       <p className="font-semibold">
//                         Q{index + 1}. {q.question}
//                       </p>

//                       <p className="text-sm">
//                         Your Answer:{" "}
//                         <span className="font-medium">
//                           {q.userAnswer || "Not Answered"}
//                         </span>
//                       </p>

//                       <p className="text-sm text-green-600">
//                         Correct Answer:{" "}
//                         <span className="font-medium">
//                           {q.correctAnswerText || q.answer}
//                         </span>
//                       </p>

//                       {q.explanation && (
//                         <p className="text-xs text-muted-foreground">
//                           💡 {q.explanation}
//                         </p>
//                       )}
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>

//               {/* Action */}
//               <Button
//                 className="w-full"
//                 onClick={() => router.push("/interview/mock")}
//               >
//                 Start New Quiz
//               </Button>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  BadgeCheck,
  Brain,
  CalendarDays,
  CircleAlert,
  Search,
  Sparkles,
  Target,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function QuizList({ assessments }) {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [search, setSearch] = useState("");

  const filteredAssessments = useMemo(() => {
    if (!assessments?.length) return [];

    return assessments.filter((assessment, i) => {
      const value = search.toLowerCase();
      return (
        `quiz ${i + 1}`.toLowerCase().includes(value) ||
        assessment.category?.toLowerCase().includes(value) ||
        assessment.improvementTip?.toLowerCase().includes(value)
      );
    });
  }, [assessments, search]);

  const getScoreVariant = (score) => {
    if (score >= 85) {
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    }
    if (score >= 60) {
      return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    }
    return "bg-rose-500/10 text-rose-600 border-rose-500/20";
  };

  const getCorrectCount = (questions = []) => {
    return questions.filter((q) => {
      const user = (q.userAnswer || "").toString().trim().toLowerCase();
      const correct = (q.correctAnswerText || q.answer || "")
        .toString()
        .trim()
        .toLowerCase();

      return user && correct && user === correct;
    }).length;
  };

  const getAccuracy = (questions = []) => {
    if (!questions.length) return 0;
    const correct = getCorrectCount(questions);
    return Math.round((correct / questions.length) * 100);
  };

  return (
    <>
      <Card id="quiz-history" className="border shadow-sm">
        <CardHeader className="gap-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle className="gradient-title text-2xl md:text-3xl">
                Quiz History
              </CardTitle>
              <CardDescription>
                Review previous attempts, reopen details, and learn from mistakes
              </CardDescription>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative min-w-[240px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by category or tip..."
                  className="pl-9 rounded-xl"
                />
              </div>

              <Button
                onClick={() => router.push("/interview/mock")}
                className="rounded-xl"
              >
                Start New Quiz
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {!filteredAssessments.length ? (
            <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/20 text-center">
              <Sparkles className="mb-3 h-10 w-10 text-muted-foreground" />
              <p className="text-lg font-semibold">No quiz records found</p>
              <p className="text-sm text-muted-foreground">
                Try another search or start a fresh mock interview.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredAssessments.map((assessment, i) => {
                const score = Number(assessment.quizScore || 0);
                const accuracy = getAccuracy(assessment.questions || []);

                return (
                  <Card
                    key={assessment.id}
                    className="group cursor-pointer overflow-hidden border bg-gradient-to-br from-background to-muted/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    onClick={() => setSelectedQuiz(assessment)}
                  >
                    <CardContent className="p-5">
                      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <div className="rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
                              Quiz {i + 1}
                            </div>
                            <div
                              className={`rounded-full border px-3 py-1 text-xs font-semibold ${getScoreVariant(
                                score
                              )}`}
                            >
                              {score.toFixed(1)}%
                            </div>
                            <div className="rounded-full border bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                              {assessment.category || "General"}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <CalendarDays className="h-4 w-4" />
                              {format(
                                new Date(assessment.createdAt),
                                "MMMM dd, yyyy HH:mm"
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              <Brain className="h-4 w-4" />
                              {assessment.questions?.length || 0} questions
                            </div>

                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4" />
                              {accuracy}% answer match
                            </div>
                          </div>

                          {assessment.improvementTip && (
                            <p className="max-w-3xl text-sm text-muted-foreground line-clamp-2">
                              {assessment.improvementTip}
                            </p>
                          )}
                        </div>

                        <div className="min-w-[220px] space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Performance</span>
                            <span className="font-medium">{score.toFixed(1)}%</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-primary transition-all"
                              style={{ width: `${score}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                            Tap to view full result analysis
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Quiz Result Analysis</DialogTitle>
          </DialogHeader>

          {selectedQuiz && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border bg-muted/20">
                  <CardContent className="p-5 text-center">
                    <p className="text-sm text-muted-foreground">Final Score</p>
                    <h2 className="mt-2 text-4xl font-bold text-primary">
                      {selectedQuiz.quizScore.toFixed(1)}%
                    </h2>
                  </CardContent>
                </Card>

                <Card className="border bg-muted/20">
                  <CardContent className="p-5 text-center">
                    <p className="text-sm text-muted-foreground">Category</p>
                    <h3 className="mt-2 text-xl font-semibold">
                      {selectedQuiz.category}
                    </h3>
                  </CardContent>
                </Card>

                <Card className="border bg-muted/20">
                  <CardContent className="p-5 text-center">
                    <p className="text-sm text-muted-foreground">Questions</p>
                    <h3 className="mt-2 text-xl font-semibold">
                      {selectedQuiz.questions?.length || 0}
                    </h3>
                  </CardContent>
                </Card>
              </div>

              {selectedQuiz.improvementTip && (
                <div className="rounded-2xl border bg-primary/5 p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <BadgeCheck className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Improvement Tip</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selectedQuiz.improvementTip}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                {selectedQuiz.questions?.map((q, index) => {
                  const userAnswer = q.userAnswer || "Not Answered";
                  const correctAnswer = q.correctAnswerText || q.answer;
                  const isCorrect =
                    userAnswer.toString().trim().toLowerCase() ===
                    correctAnswer?.toString().trim().toLowerCase();

                  return (
                    <Card key={index} className="overflow-hidden border">
                      <CardContent className="p-0">
                        <div className="border-b bg-muted/20 px-5 py-4">
                          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                            <p className="font-semibold leading-7">
                              Q{index + 1}. {q.question}
                            </p>
                            <span
                              className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold ${
                                isCorrect
                                  ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                                  : "bg-rose-500/10 text-rose-600 border-rose-500/20"
                              }`}
                            >
                              {isCorrect ? "Correct" : "Needs Review"}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-4 p-5">
                          <div className="rounded-xl border bg-background p-4">
                            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                              Your Answer
                            </p>
                            <p className="text-sm font-medium">{userAnswer}</p>
                          </div>

                          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-emerald-600">
                              Correct Answer
                            </p>
                            <p className="text-sm font-medium">{correctAnswer}</p>
                          </div>

                          {q.explanation && (
                            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                              <div className="mb-2 flex items-center gap-2">
                                <CircleAlert className="h-4 w-4 text-amber-600" />
                                <p className="text-sm font-semibold">Explanation</p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {q.explanation}
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <Button
                className="w-full rounded-xl"
                size="lg"
                onClick={() => router.push("/interview/mock")}
              >
                Start New Quiz
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}