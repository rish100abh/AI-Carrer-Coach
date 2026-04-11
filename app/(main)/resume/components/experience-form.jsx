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
// import { experienceSchema } from "@/app/lib/schema";
// import {
//   Sparkles,
//   PlusCircle,
//   X,
//   Loader2,
//   Trash2,
//   Briefcase,
//   MapPin,
//   Building2,
// } from "lucide-react";
// import { useActionState } from "react";
// import { improveWithAI } from "@/actions/resume";
// import { toast } from "sonner";

// const formatDisplayDate = (dateString) => {
//   if (!dateString) return "";
//   const date = parse(dateString, "yyyy-MM", new Date());
//   return format(date, "MMM yyyy");
// };

// export default function ExperienceForm({ entries = [], onChange }) {
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
//     resolver: zodResolver(experienceSchema),
//     defaultValues: {
//       title: "",
//       organization: "",
//       location: "",
//       employmentType: "",
//       startDate: "",
//       endDate: "",
//       description: "",
//       current: false,
//     },
//   });

//   const current = watch("current");
//   const description = watch("description");

//   useEffect(() => {
//     if (aiState?.improved && aiState.success) {
//       setValue("description", aiState.improved);
//       toast.success("Description improved with AI");
//     }
//   }, [aiState, setValue]);

//   const handleAdd = handleSubmit((data) => {
//     const formattedEntry = {
//       ...data,
//       startDate: formatDisplayDate(data.startDate),
//       endDate: data.current ? "" : formatDisplayDate(data.endDate),
//     };
//     onChange([...(entries || []), formattedEntry]);
//     reset();
//     setIsAdding(false);
//     toast.success("Experience added");
//   });

//   const handleDelete = (index) => {
//     onChange(entries.filter((_, i) => i !== index));
//     toast.success("Experience removed");
//   };

//   const handleImproveDescription = () => {
//     if (!description?.trim()) {
//       toast.error("Please enter a description first");
//       return;
//     }

//     startTransition(() => {
//       improveAction({
//         current: description,
//         type: "experience",
//         level: "mid",
//       });
//     });
//   };

//   return (
//     <div className="space-y-4">
//       {!!entries?.length && (
//         <div className="grid gap-4">
//           {entries.map((item, index) => (
//             <Card key={`${item.title}-${item.organization}-${index}`} className="border shadow-sm">
//               <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 bg-muted/20">
//                 <div className="space-y-2">
//                   <CardTitle className="flex items-center gap-2 text-base">
//                     <Briefcase className="h-4 w-4 text-primary" />
//                     {item.title} @ {item.organization}
//                   </CardTitle>
//                   <div className="space-y-1 text-sm text-muted-foreground">
//                     <p>{item.current ? `${item.startDate} - Present` : `${item.startDate} - ${item.endDate}`}</p>
//                     {(item.location || item.employmentType) && (
//                       <p>{[item.location, item.employmentType].filter(Boolean).join(" • ")}</p>
//                     )}
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

//               <CardContent className="pt-4">
//                 <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
//                   {item.description}
//                 </p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}

//       {isAdding ? (
//         <Card className="border shadow-sm">
//           <CardHeader className="bg-muted/20">
//             <CardTitle>Add Experience</CardTitle>
//           </CardHeader>

//           <CardContent className="space-y-5 pt-5">
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Job Title</label>
//                 <Input placeholder="Frontend Developer" {...register("title")} className="rounded-xl" />
//                 {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Company</label>
//                 <Input placeholder="Google" {...register("organization")} className="rounded-xl" />
//                 {errors.organization && <p className="text-sm text-red-500">{errors.organization.message}</p>}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Location</label>
//                 <Input placeholder="Bengaluru, India" {...register("location")} className="rounded-xl" />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Employment Type</label>
//                 <Input placeholder="Full-time / Internship / Freelance" {...register("employmentType")} className="rounded-xl" />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Start Date</label>
//                 <Input type="month" {...register("startDate")} className="rounded-xl" />
//                 {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium">End Date</label>
//                 <Input type="month" {...register("endDate")} disabled={current} className="rounded-xl" />
//                 {errors.endDate && <p className="text-sm text-red-500">{errors.endDate.message}</p>}
//               </div>
//             </div>

//             <div className="flex items-center gap-2 rounded-xl border bg-muted/20 px-3 py-3">
//               <input
//                 type="checkbox"
//                 id="experience-current"
//                 {...register("current")}
//                 onChange={(e) => {
//                   setValue("current", e.target.checked);
//                   if (e.target.checked) setValue("endDate", "");
//                 }}
//                 className="h-4 w-4"
//               />
//               <label htmlFor="experience-current" className="text-sm font-medium">
//                 This is my current role
//               </label>
//             </div>

//             <div className="space-y-3">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Description</label>
//                 <Textarea
//                   placeholder="Describe your impact, tools used, ownership, and measurable outcomes..."
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
//               Add Experience
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
//           Add Experience
//         </Button>
//       )}
//     </div>
//   );
// }

"use client";

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
import { experienceSchema } from "@/app/lib/schema";
import {
  Sparkles,
  PlusCircle,
  X,
  Loader2,
  Trash2,
  Briefcase,
  MapPin,
  Building2,
} from "lucide-react";
import { useActionState } from "react";
import { improveWithAI } from "@/actions/resume";
import { toast } from "sonner";

const formatDisplayDate = (dateString) => {
  if (!dateString) return "";
  const date = parse(dateString, "yyyy-MM", new Date());
  return format(date, "MMM yyyy");
};

export default function ExperienceForm({ entries = [], onChange }) {
  const [isAdding, setIsAdding] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const [isTransitioning, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      title: "",
      organization: "",
      location: "",
      employmentType: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    },
  });

  const current = watch("current");
  const description = watch("description");


  const handleAdd = handleSubmit((data) => {
    const formattedEntry = {
      ...data,
      startDate: formatDisplayDate(data.startDate),
      endDate: data.current ? "" : formatDisplayDate(data.endDate),
    };
    
    // Safe onChange check - prevents "not a function" error
    if (onChange && typeof onChange === 'function') {
      onChange([...(entries || []), formattedEntry]);
    }
    
    reset();
    setIsAdding(false);
    toast.success("Experience added");
  });

  const handleDelete = (index) => {
    // Safe onChange check - prevents "not a function" error
    if (onChange && typeof onChange === 'function') {
      onChange(entries.filter((_, i) => i !== index));
    }
    toast.success("Experience removed");
  };

  const handleImproveDescription = async () => {
  if (!description?.trim()) {
    toast.error("Please enter a description first");
    return;
  }

  try {
    setIsImproving(true);

    const result = await improveWithAI({
      current: description,
      type: "experience",
      level: "mid",
    });

    console.log("AI RESULT:", result); // 👈 DEBUG

    if (result?.success && result?.improved) {
      setValue("description", result.improved);
      toast.success("Description improved");
    } else {
      toast.error(result?.error || "AI failed");
    }
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
  } finally {
    setIsImproving(false);
  }
};

  return (
    <div className="space-y-4">
      {!!entries?.length && (
        <div className="grid gap-4">
          {entries.map((item, index) => (
            <Card key={`${item.title}-${item.organization}-${index}`} className="border shadow-sm">
              <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 bg-muted/20">
                <div className="space-y-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Briefcase className="h-4 w-4 text-primary" />
                    {item.title} @ {item.organization}
                  </CardTitle>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>{item.current ? `${item.startDate} - Present` : `${item.startDate} - ${item.endDate}`}</p>
                    {(item.location || item.employmentType) && (
                      <p>{[item.location, item.employmentType].filter(Boolean).join(" • ")}</p>
                    )}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="rounded-xl text-muted-foreground hover:bg-red-500/10 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>

              <CardContent className="pt-4">
                <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {isAdding ? (
        <Card className="border shadow-sm">
          <CardHeader className="bg-muted/20">
            <CardTitle>Add Experience</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5 pt-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Job Title</label>
                <Input placeholder="Frontend Developer" {...register("title")} className="rounded-xl" />
                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Company</label>
                <Input placeholder="Google" {...register("organization")} className="rounded-xl" />
                {errors.organization && <p className="text-sm text-red-500">{errors.organization.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input placeholder="Bengaluru, India" {...register("location")} className="rounded-xl" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Employment Type</label>
                <Input placeholder="Full-time / Internship / Freelance" {...register("employmentType")} className="rounded-xl" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <Input type="month" {...register("startDate")} className="rounded-xl" />
                {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <Input type="month" {...register("endDate")} disabled={current} className="rounded-xl" />
                {errors.endDate && <p className="text-sm text-red-500">{errors.endDate.message}</p>}
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl border bg-muted/20 px-3 py-3">
              <input
                type="checkbox"
                id="experience-current"
                {...register("current")}
                onChange={(e) => {
                  setValue("current", e.target.checked);
                  if (e.target.checked) setValue("endDate", "");
                }}
                className="h-4 w-4"
              />
              <label htmlFor="experience-current" className="text-sm font-medium">
                This is my current role
              </label>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Describe your impact, tools used, ownership, and measurable outcomes..."
                  className="min-h-[140px] rounded-2xl"
                  {...register("description")}
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleImproveDescription}
               disabled={isImproving || !description?.trim()}
                className="flex w-full items-center gap-2 rounded-xl sm:w-auto"
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

          <CardFooter className="flex justify-end gap-2 border-t bg-muted/10 py-4">
            <Button
              type="button"
              variant="outline"
              className="rounded-xl"
              onClick={() => {
                reset();
                setIsAdding(false);
              }}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button type="button" onClick={handleAdd} className="rounded-xl">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Experience
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsAdding(true)}
          className="w-full rounded-2xl border border-dashed bg-muted/20 py-6 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-primary"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      )}
    </div>
  );
}