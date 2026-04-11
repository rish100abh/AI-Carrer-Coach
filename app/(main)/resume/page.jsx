// import { getResume } from "@/actions/resume";
// import ResumeBuilder from "./components/resume-builder";

// export default async function ResumePage() {
//   const resume = await getResume();

//   return (
//     <div className="container mx-auto py-6">
//       <ResumeBuilder initialContent={resume?.content} />
//     </div>
//   );
// }
import { getResume } from "@/actions/resume";
import ResumeBuilder from "./components/resume-builder";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, FileText, Sparkles } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";

export default async function ResumePage() {
  const result = await getResume();
  const user = await currentUser();

  const resumeContent =
    result?.resume?.content || result?.content || "";

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
        <div className="mb-8 flex flex-col gap-4">
          <Button
            asChild
            variant="outline"
            className="group w-fit rounded-full border-border/60 bg-background/80 px-2 py-2 pr-5 text-sm font-medium text-foreground shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:text-primary hover:shadow-md"
          >
            <Link href="/dashboard" className="flex items-center">
              <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              </span>
              Back to Dashboard
            </Link>
          </Button>

          <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/10 via-background to-background p-6 shadow-sm md:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.14),transparent_30%)]" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-sm text-muted-foreground backdrop-blur">
                  <Sparkles className="h-4 w-4 text-primary" />
                  AI-powered resume optimization
                </div>

                <div className="space-y-3">
                  <h1 className="gradient-title text-4xl font-bold tracking-tight md:text-5xl">
                    Resume Builder
                  </h1>
                  <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
                    Create, edit, enhance, preview, and export a professional
                    ATS-friendly resume with structured sections and AI-assisted
                    content improvement.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <div className="rounded-xl border bg-background/70 px-4 py-2">
                    <span className="font-semibold text-foreground">Live</span>{" "}
                    markdown preview
                  </div>
                  <div className="rounded-xl border bg-background/70 px-4 py-2">
                    <span className="font-semibold text-foreground">PDF</span>{" "}
                    export ready
                  </div>
                  <div className="rounded-xl border bg-background/70 px-4 py-2">
                    <span className="font-semibold text-foreground">AI</span>{" "}
                    section enhancement
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border bg-background/80 px-5 py-4 shadow-sm backdrop-blur">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Resume status</p>
                  <p className="font-semibold">
                    {resumeContent ? "Draft available" : "Start new resume"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

       
<ResumeBuilder
  initialContent={result?.resume?.markdown || result?.resume?.content || ""}
  initialData={result?.resume || {}}
  userName={user?.fullName || user?.firstName || "Rishabh Yadav"}
/>
      </div>
    </div>
  );
}