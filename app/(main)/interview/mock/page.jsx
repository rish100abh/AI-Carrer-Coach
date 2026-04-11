// import { Button } from '@/components/ui/button';
// import { ArrowLeft } from 'lucide-react';
// import Link from 'next/link';
// import React from 'react'
// import Quiz from  '../components/Quiz';

// const MockInterviewPage = () => {
//   return (
//     <div className="container mx-auto space-y-4 py-10">
//       <div className="flex flex-col space-y-2 mx-2">
//         <Link href={"/interview"}>
//         <Button variant="link" className="gap-2 pl-0">
//           <ArrowLeft className="h-4 w-4" />
//           Back to Interview Preparation
//         </Button>
//         </Link>

//         <div>
//           <h1 className="text-6xl font-bold graident-title">Mock Interview</h1>
//           <p className="text-muted-foreground">
//             Prepare for your next interview with our mock interview feature.
//           </p>
//         </div>
//       </div>

//       <Quiz />

    
//     </div>
//   );
// };

// export default MockInterviewPage;

// import { Button } from "@/components/ui/button";
// import { ArrowLeft } from "lucide-react";
// import Link from "next/link";
// import Quiz from "../components/Quiz";

// const MockInterviewPage = () => {
//   return (
//     <div className="container mx-auto space-y-6 py-10">
//       <div className="flex flex-col space-y-3 mx-2">
//         <Button asChild variant="link" className="gap-2 pl-0">
//           <Link href="/interview">
//             <ArrowLeft className="h-4 w-4" />
//             Back to Interview Preparation
//           </Link>
//         </Button>

//         <div>
//           <h1 className="text-6xl font-bold gradient-title">
//             Mock Interview
//           </h1>

//           <p className="text-muted-foreground mt-2">
//             Prepare for your next interview with our mock interview feature.
//           </p>
//         </div>
//       </div>

//       <Quiz />
//     </div>
//   );
// };

// export default MockInterviewPage;

import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BrainCircuit,
  Clock3,
  Sparkles,
  Target,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import Quiz from "../components/Quiz";

const mockFeatures = [
  {
    icon: BrainCircuit,
    title: "Real Interview Practice",
    description:
      "Sharpen your thinking with mock questions designed to simulate actual interview pressure.",
  },
  {
    icon: Target,
    title: "Focused Skill Testing",
    description:
      "Measure accuracy, identify weak topics, and improve with targeted practice sessions.",
  },
  {
    icon: Clock3,
    title: "Fast Feedback Loop",
    description:
      "Complete quizzes quickly, review performance, and build confidence before the real interview.",
  },
];

const quickChecklist = [
  "Read every question carefully before answering.",
  "Stay calm and focus on accuracy over speed.",
  "Use each result to improve your next attempt.",
];

const MockInterviewPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-10">
      <div className="space-y-8">
        <div className="flex flex-col space-y-3">
         <Button
  asChild
  variant="outline"
  className="group w-fit rounded-full border-border/60 bg-background/80 px-4 py-2 text-sm font-medium text-foreground shadow-sm backdrop-blur transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:text-primary hover:shadow-md"
>
  <Link href="/interview">
    <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
    Back to Interview Preparation
  </Link>
</Button>

          <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/10 via-background to-background shadow-sm">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.15),transparent_28%)]" />
            <div className="absolute -top-16 right-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative grid gap-6 p-6 md:p-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-sm text-muted-foreground backdrop-blur">
                  <Sparkles className="h-4 w-4 text-primary" />
                  AI-powered interview simulation
                </div>

                <div className="space-y-3">
                  <h1 className="text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl gradient-title">
                    Mock Interview
                  </h1>

                  <p className="max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                    Prepare for your next interview with a smarter mock experience
                    designed to improve confidence, reveal weak areas, and help you
                    perform better under pressure.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="rounded-xl border bg-background/70 px-4 py-2 text-sm backdrop-blur">
                    Professional practice flow
                  </div>
                  <div className="rounded-xl border bg-background/70 px-4 py-2 text-sm backdrop-blur">
                    Instant performance review
                  </div>
                  <div className="rounded-xl border bg-background/70 px-4 py-2 text-sm backdrop-blur">
                    Better interview readiness
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border bg-background/80 p-5 shadow-sm backdrop-blur">
                <div className="mb-4 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">Before you begin</h2>
                </div>

                <div className="space-y-3">
                  {quickChecklist.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-xl border bg-muted/20 px-3 py-3"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <p className="text-sm text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-xl bg-primary/10 px-4 py-3">
                  <p className="text-sm font-medium text-foreground">
                    Tip: Treat this like a real interview attempt.
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    A focused practice session gives you better results than random guessing.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          {mockFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border bg-gradient-to-br from-background to-muted/20 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>

                <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                  Interview ready
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </section>

        <section className="rounded-3xl border bg-card shadow-sm">
          <div className="border-b px-5 py-4 md:px-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Start Your Interview Session
                </h2>
                <p className="text-sm text-muted-foreground">
                  Answer carefully, stay consistent, and use this session to simulate a
                  real interview environment.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border bg-muted/30 px-3 py-1 text-xs text-muted-foreground">
                <BrainCircuit className="h-3.5 w-3.5 text-primary" />
                Smart assessment in progress
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6">
            <div className="rounded-3xl border bg-gradient-to-br from-background to-muted/10 p-4 md:p-6">
              <Quiz />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MockInterviewPage;