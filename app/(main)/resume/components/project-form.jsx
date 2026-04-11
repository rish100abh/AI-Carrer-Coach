// "use client";

// import { useEffect, useState, useTransition } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { format, parse } from "date-fns";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { projectSchema } from "@/app/lib/schema";
// import {
//   Sparkles,
//   PlusCircle,
//   X,
//   Loader2,
//   Trash2,
//   FolderKanban,
//   Link as LinkIcon,
//   Github,
// } from "lucide-react";
// import { useActionState } from "react";
// import { improveWithAI } from "@/actions/resume";
// import { toast } from "sonner";

// const formatDisplayDate = (dateString) => {
//   if (!dateString) return "";
//   const date = parse(dateString, "yyyy-MM", new Date());
//   return format(date, "MMM yyyy");
// };

// export default function ProjectForm({ entries = [], onChange }) {
//   const [isAdding, setIsAdding] = useState(false);
//   const [aiState, improveAction, isImproving] = useActionState(improveWithAI, {
//     original: null,
//     improved: null,
//     success: false,
//   });
//   const [isTransitioning, startTransition] = useTransition();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     watch,
//     setValue,
//   } = useForm({
//     resolver: zodResolver(projectSchema),
//     defaultValues: {
//       title: "",
//       role: "",
//       startDate: "",
//       endDate: "",
//       technologies: "",
//       liveUrl: "",
//       githubUrl: "",
//       description: "",
//     },
//   });

//   const description = watch("description");

//   useEffect(() => {
//     if (aiState?.improved && aiState.success) {
//       setValue("description", aiState.improved);
//       toast.success("Project description improved with AI");
//     }
//   }, [aiState, setValue]);

//   const handleAdd = handleSubmit((data) => {
//     const formattedEntry = {
//       ...data,
//       startDate: data.startDate ? formatDisplayDate(data.startDate) : "",
//       endDate: data.endDate ? formatDisplayDate(data.endDate) : "",
//     };
//     onChange([...(entries || []), formattedEntry]);
//     reset();
//     setIsAdding(false);
//     toast.success("Project added");
//   });

//   const handleDelete = (index) => {
//     onChange(entries.filter((_, i) => i !== index));
//     toast.success("Project removed");
//   };

//   const handleImproveDescription = () => {
//     if (!description?.trim()) {
//       toast.error("Please enter a description first");
//       return;
//     }

//     startTransition(() => {
//       improveAction({
//         current: description,
//         type: "project",
//         level: "mid",
//       });
//     });
//   };

//   return (
//     <div className="space-y-4">
//       {!!entries?.length && (
//         <div className="grid gap-4">
//           {entries.map((item, index) => (
//             <Card key={`${item.title}-${index}`} className="border shadow-sm">
//               <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 bg-muted/20">
//                 <div className="space-y-2">
//                   <CardTitle className="flex items-center gap-2 text-base">
//                     <FolderKanban className="h-4 w-4 text-primary" />
//                     {item.title}
//                   </CardTitle>
//                   <div className="space-y-1 text-sm text-muted-foreground">
//                     {item.role && <p>{item.role}</p>}
//                     {(item.startDate || item.endDate) && (
//                       <p>{[item.startDate, item.endDate].filter(Boolean).join(" - ")}</p>
//                     )}
//                     <p>{item.technologies}</p>
//                   </div>
//                 </div>

//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   type="button"
//                   onClick={() => handleDelete(index)}
//                   className="rounded-xl text-muted-foreground hover:bg-red-500/10 hover:text-red-500"
//                 >
//                   <Trash2 className="h-4 w-4" />
//                 </Button>
//               </CardHeader>

//               <CardContent className="pt-4 space-y-3">
//                 <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
//                   {item.description}
//                 </p>
//                 {(item.liveUrl || item.githubUrl) && (
//                   <div className="flex flex-wrap gap-3 text-sm">
//                     {item.liveUrl && (
//                       <a href={item.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
//                         <LinkIcon className="h-4 w-4" />
//                         Live Demo
//                       </a>
//                     )}
//                     {item.githubUrl && (
//                       <a href={item.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
//                         <Github className="h-4 w-4" />
//                         GitHub
//                       </a>
//                     )}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}

//       {isAdding ? (
//         <Card className="border shadow-sm">
//           <CardHeader className="bg-muted/20">
//             <CardTitle>Add Project</CardTitle>
//           </CardHeader>

//           <CardContent className="space-y-5 pt-5">
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Project Title</label>
//                 <Input placeholder="AI Resume Builder" {...register("title")} className="rounded-xl" />
//                 {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Your Role</label>
//                 <Input placeholder="Full Stack Developer" {...register("role")} className="rounded-xl" />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Start Date</label>
//                 <Input type="month" {...register("startDate")} className="rounded-xl" />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium">End Date</label>
//                 <Input type="month" {...register("endDate")} className="rounded-xl" />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium">Technologies</label>
//               <Input
//                 placeholder="Next.js, React, Node.js, PostgreSQL, Prisma, Tailwind CSS"
//                 {...register("technologies")}
//                 className="rounded-xl"
//               />
//               {errors.technologies && <p className="text-sm text-red-500">{errors.technologies.message}</p>}
//             </div>

//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Live URL</label>
//                 <Input placeholder="https://yourproject.com" {...register("liveUrl")} className="rounded-xl" />
//                 {errors.liveUrl && <p className="text-sm text-red-500">{errors.liveUrl.message}</p>}
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium">GitHub URL</label>
//                 <Input placeholder="https://github.com/username/repo" {...register("githubUrl")} className="rounded-xl" />
//                 {errors.githubUrl && <p className="text-sm text-red-500">{errors.githubUrl.message}</p>}
//               </div>
//             </div>

//             <div className="space-y-3">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Description</label>
//                 <Textarea
//                   placeholder="Describe the problem solved, core features, stack, and impact..."
//                   className="min-h-[140px] rounded-2xl"
//                   {...register("description")}
//                 />
//                 {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
//               </div>

//               <Button
//                 type="button"
//                 variant="outline"
//                 size="sm"
//                 onClick={handleImproveDescription}
//                 disabled={isImproving || isTransitioning || !description?.trim()}
//                 className="flex w-full items-center gap-2 rounded-xl sm:w-auto"
//               >
//                 {isImproving || isTransitioning ? (
//                   <>
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                     <span>Improving...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Sparkles className="h-4 w-4" />
//                     <span>Improve with AI</span>
//                   </>
//                 )}
//               </Button>
//             </div>
//           </CardContent>

//           <CardFooter className="flex justify-end gap-2 border-t bg-muted/10 py-4">
//             <Button
//               type="button"
//               variant="outline"
//               className="rounded-xl"
//               onClick={() => {
//                 reset();
//                 setIsAdding(false);
//               }}
//             >
//               <X className="mr-2 h-4 w-4" />
//               Cancel
//             </Button>
//             <Button type="button" onClick={handleAdd} className="rounded-xl">
//               <PlusCircle className="mr-2 h-4 w-4" />
//               Add Project
//             </Button>
//           </CardFooter>
//         </Card>
//       ) : (
//         <Button
//           type="button"
//           variant="outline"
//           onClick={() => setIsAdding(true)}
//           className="w-full rounded-2xl border border-dashed bg-muted/20 py-6 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-primary"
//         >
//           <PlusCircle className="mr-2 h-4 w-4" />
//           Add Project
//         </Button>
//       )}
//     </div>
//   );
// }
"use client";

import { Label } from "@/components/ui/label";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { projectSchema } from "@/app/lib/schema";
import {
  Sparkles,
  PlusCircle,
  X,
  Loader2,
  Trash2,
  FolderKanban,
  Link as LinkIcon,
  Github,
  CalendarDays,
} from "lucide-react";
import { useActionState } from "react";
import { improveWithAI } from "@/actions/resume";
import { toast } from "sonner";

const formatDisplayDate = (dateString) => {
  if (!dateString) return "";
  const date = parse(dateString, "yyyy-MM", new Date());
  return format(date, "MMM yyyy");
};

export default function ProjectForm({ entries = [], onChange }) {
  const [isAdding, setIsAdding] = useState(false);
  const [aiState, improveAction, isImproving] = useActionState(improveWithAI, {
    original: null,
    improved: null,
    success: false,
  });
  const [isTransitioning, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      role: "",
      startDate: "",
      endDate: "",
      technologies: "",
      liveUrl: "",
      githubUrl: "",
      description: "",
    },
  });

  const description = watch("description");

  useEffect(() => {
    if (aiState?.improved && aiState.success) {
      setValue("description", aiState.improved);
      toast.success("Project description improved with AI");
    }
  }, [aiState, setValue]);

  // ✅ SAFE CHANGE: Only call onChange if it's actually a function
  const safeOnChange = (newEntries) => {
    if (typeof onChange === "function") {
      onChange(newEntries);
    }
  };

  const handleAdd = handleSubmit((data) => {
    const formattedEntry = {
      ...data,
      startDate: data.startDate ? formatDisplayDate(data.startDate) : "",
      endDate: data.endDate ? formatDisplayDate(data.endDate) : "",
    };
    // ✅ FIXED: Safe onChange call
    safeOnChange([...(entries || []), formattedEntry]);
    reset();
    setIsAdding(false);
    toast.success("Project added");
  });

  const handleDelete = (index) => {
    // ✅ FIXED: Safe onChange call
    safeOnChange(entries.filter((_, i) => i !== index));
    toast.success("Project removed");
  };

  const handleImproveDescription = () => {
    if (!description?.trim()) {
      toast.error("Please enter a description first");
      return;
    }

    startTransition(() => {
      improveAction({
        current: description,
        type: "project",
        level: "mid",
      });
    });
  };

  return (
    <div className="space-y-4">
      {!!entries?.length && (
        <div className="grid gap-4">
          {entries.map((item, index) => (
            <Card key={`${item.title}-${index}`} className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
              <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 border-b bg-muted/30 px-6 py-4">
                <div className="space-y-2">
                  <CardTitle className="flex items-center gap-3 text-base font-semibold text-foreground">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <FolderKanban className="h-5 w-5" />
                    </div>
                    {item.title}
                  </CardTitle>
                  <div className="space-y-1 text-sm text-foreground/80">
                    {item.role && <p>{item.role}</p>}
                    {(item.startDate || item.endDate) && (
                      <p>{[item.startDate, item.endDate].filter(Boolean).join(" - ")}</p>
                    )}
                    <p>{item.technologies}</p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="rounded-xl text-foreground/70 hover:bg-red-500/10 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>

              <CardContent className="pt-6 px-6 space-y-3">
                <p className="whitespace-pre-wrap text-sm leading-6 text-foreground/90">
                  {item.description}
                </p>
                {(item.liveUrl || item.githubUrl) && (
                  <div className="flex flex-wrap gap-3 text-sm">
                    {item.liveUrl && (
                      <a 
                        href={item.liveUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1.5 text-primary hover:bg-primary/20 transition-colors"
                      >
                        <LinkIcon className="h-4 w-4" />
                        Live Demo
                      </a>
                    )}
                    {item.githubUrl && (
                      <a 
                        href={item.githubUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-1 rounded-lg bg-muted/50 px-3 py-1.5 text-foreground/80 hover:bg-muted transition-colors"
                      >
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {isAdding ? (
        <Card className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
          <CardHeader className="bg-muted/30">
            <CardTitle className="flex items-center gap-3 text-foreground">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FolderKanban className="h-5 w-5" />
              </div>
              Add Project
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 px-6 py-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="project-title" className="text-sm font-medium">
                  Project Title
                </Label>
                <Input
                  id="project-title"
                  placeholder="AI Resume Builder"
                  {...register("title")}
                  className="h-11 rounded-xl"
                />
                {errors.title && <p className="text-sm font-medium text-red-500">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-role" className="text-sm font-medium">
                  Your Role
                </Label>
                <Input
                  id="project-role"
                  placeholder="Full Stack Developer"
                  {...register("role")}
                  className="h-11 rounded-xl"
                />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="project-startDate" className="flex items-center gap-2 text-sm font-medium">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  Start Date
                </Label>
                <Input
                  id="project-startDate"
                  type="month"
                  {...register("startDate")}
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-endDate" className="text-sm font-medium">
                  End Date
                </Label>
                <Input
                  id="project-endDate"
                  type="month"
                  {...register("endDate")}
                  className="h-11 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-technologies" className="text-sm font-medium">
                Technologies
              </Label>
              <Input
                id="project-technologies"
                placeholder="Next.js, React, Node.js, PostgreSQL, Prisma, Tailwind CSS"
                {...register("technologies")}
                className="h-11 rounded-xl"
              />
              {errors.technologies && <p className="text-sm font-medium text-red-500">{errors.technologies.message}</p>}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="project-liveUrl" className="flex items-center gap-2 text-sm font-medium">
                  <LinkIcon className="h-4 w-4 text-muted-foreground" />
                  Live URL
                </Label>
                <Input
                  id="project-liveUrl"
                  placeholder="https://yourproject.com"
                  {...register("liveUrl")}
                  className="h-11 rounded-xl"
                />
                {errors.liveUrl && <p className="text-sm font-medium text-red-500">{errors.liveUrl.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-githubUrl" className="flex items-center gap-2 text-sm font-medium">
                  <Github className="h-4 w-4 text-muted-foreground" />
                  GitHub URL
                </Label>
                <Input
                  id="project-githubUrl"
                  placeholder="https://github.com/username/repo"
                  {...register("githubUrl")}
                  className="h-11 rounded-xl"
                />
                {errors.githubUrl && <p className="text-sm font-medium text-red-500">{errors.githubUrl.message}</p>}
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="project-description" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id="project-description"
                  placeholder="Describe the problem solved, core features, technical stack, your contributions, and measurable impact..."
                  className="min-h-[140px] rounded-2xl"
                  {...register("description")}
                />
                {errors.description && <p className="text-sm font-medium text-red-500">{errors.description.message}</p>}
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleImproveDescription}
                disabled={isImproving || isTransitioning || !description?.trim()}
                className="flex w-full items-center gap-2 rounded-xl sm:w-auto h-10"
              >
                {isImproving || isTransitioning ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Improving...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Improve with AI</span>
                  </>
                )}
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-2 border-t bg-muted/10 px-6 py-4">
            <Button
              type="button"
              variant="outline"
              className="rounded-xl h-10"
              onClick={() => {
                reset();
                setIsAdding(false);
              }}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button type="button" onClick={handleAdd} className="rounded-xl h-10">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsAdding(true)}
          className="w-full rounded-2xl border border-dashed bg-muted/20 py-8 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-primary h-16"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Add Project
        </Button>
      )}
    </div>
  );
}