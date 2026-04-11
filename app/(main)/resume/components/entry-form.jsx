// // app/resume/_components/entry-form.jsx
// "use client";

// import { useEffect, useState } from "react";
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
// import { entrySchema } from "@/app/lib/schema";
// import { Sparkles, PlusCircle, X, Pencil, Save, Loader2 } from "lucide-react";
// import { improveWithAI } from "@/actions/resume";
// import { toast } from "sonner";
// import useFetch from "@/hooks/use-fetch";

// const formatDisplayDate = (dateString) => {
//   if (!dateString) return "";
//   const date = parse(dateString, "yyyy-MM", new Date());
//   return format(date, "MMM yyyy");
// };

// export function EntryForm({ type, entries, onChange }) {
//   const [isAdding, setIsAdding] = useState(false);

//   const {
//     register,
//     handleSubmit: handleValidation,
//     formState: { errors },
//     reset,
//     watch,
//     setValue,
//   } = useForm({
//     resolver: zodResolver(entrySchema),
//     defaultValues: {
//       title: "",
//       organization: "",
//       startDate: "",
//       endDate: "",
//       description: "",
//       current: false,
//     },
//   });

//   const current = watch("current");

//   const handleAdd = handleValidation((data) => {
//     const formattedEntry = {
//       ...data,
//       startDate: formatDisplayDate(data.startDate),
//       endDate: data.current ? "" : formatDisplayDate(data.endDate),
//     };

//     onChange([...entries, formattedEntry]);

//     reset();
//     setIsAdding(false);
//   });

//   const handleDelete = (index) => {
//     const newEntries = entries.filter((_, i) => i !== index);
//     onChange(newEntries);
//   };

//   const {
//     loading: isImproving,
//     fn: improveWithAIFn,
//     data: improvedContent,
//     error: improveError,
//   } = useFetch(improveWithAI);

//   // Add this effect to handle the improvement result
//   useEffect(() => {
//     if (improvedContent && !isImproving) {
//       setValue("description", improvedContent);
//       toast.success("Description improved successfully!");
//     }
//     if (improveError) {
//       toast.error(improveError.message || "Failed to improve description");
//     }
//   }, [improvedContent, improveError, isImproving, setValue]);

//   // Replace handleImproveDescription with this
//   const handleImproveDescription = async () => {
//     const description = watch("description");
//     if (!description) {
//       toast.error("Please enter a description first");
//       return;
//     }

//     await improveWithAIFn({
//       current: description,
//       type: type.toLowerCase(), // 'experience', 'education', or 'project'
//     });
//   };

//   return (
//     <div className="space-y-4">
//       <div className="space-y-4">
//         {entries.map((item, index) => (
//           <Card key={index}>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">
//                 {item.title} @ {item.organization}
//               </CardTitle>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 type="button"
//                 onClick={() => handleDelete(index)}
//               >
//                 <X className="h-4 w-4" />
//               </Button>
//             </CardHeader>
//             <CardContent>
//               <p className="text-sm text-muted-foreground">
//                 {item.current
//                   ? `${item.startDate} - Present`
//                   : `${item.startDate} - ${item.endDate}`}
//               </p>
//               <p className="mt-2 text-sm whitespace-pre-wrap">
//                 {item.description}
//               </p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {isAdding && (
//         <Card>
//           <CardHeader>
//             <CardTitle>Add {type}</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Input
//                   placeholder="Title/Position"
//                   {...register("title")}
//                   error={errors.title}
//                 />
//                 {errors.title && (
//                   <p className="text-sm text-red-500">{errors.title.message}</p>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <Input
//                   placeholder="Organization/Company"
//                   {...register("organization")}
//                   error={errors.organization}
//                 />
//                 {errors.organization && (
//                   <p className="text-sm text-red-500">
//                     {errors.organization.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Input
//                   type="month"
//                   {...register("startDate")}
//                   error={errors.startDate}
//                 />
//                 {errors.startDate && (
//                   <p className="text-sm text-red-500">
//                     {errors.startDate.message}
//                   </p>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <Input
//                   type="month"
//                   {...register("endDate")}
//                   disabled={current}
//                   error={errors.endDate}
//                 />
//                 {errors.endDate && (
//                   <p className="text-sm text-red-500">
//                     {errors.endDate.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="current"
//                 {...register("current")}
//                 onChange={(e) => {
//                   setValue("current", e.target.checked);
//                   if (e.target.checked) {
//                     setValue("endDate", "");
//                   }
//                 }}
//               />
//               <label htmlFor="current">Current {type}</label>
//             </div>

//             <div className="space-y-2">
//               <Textarea
//                 placeholder={`Description of your ${type.toLowerCase()}`}
//                 className="h-32"
//                 {...register("description")}
//                 error={errors.description}
//               />
//               {errors.description && (
//                 <p className="text-sm text-red-500">
//                   {errors.description.message}
//                 </p>
//               )}
//             </div>
//             <Button
//               type="button"
//               variant="ghost"
//               size="sm"
//               onClick={handleImproveDescription}
//               disabled={isImproving || !watch("description")}
//             >
//               {isImproving ? (
//                 <>
//                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                   Improving...
//                 </>
//               ) : (
//                 <>
//                   <Sparkles className="h-4 w-4 mr-2" />
//                   Improve with AI
//                 </>
//               )}
//             </Button>
//           </CardContent>
//           <CardFooter className="flex justify-end space-x-2">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => {
//                 reset();
//                 setIsAdding(false);
//               }}
//             >
//               Cancel
//             </Button>
//             <Button type="button" onClick={handleAdd}>
//               <PlusCircle className="h-4 w-4 mr-2" />
//               Add Entry
//             </Button>
//           </CardFooter>
//         </Card>
//       )}

//       {!isAdding && (
//         <Button
//           className="w-full"
//           variant="outline"
//           onClick={() => setIsAdding(true)}
//         >
//           <PlusCircle className="h-4 w-4 mr-2" />
//           Add {type}
//         </Button>
//       )}
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
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
// import { entrySchema } from "@/app/lib/schema";
// import {
//   Sparkles,
//   PlusCircle,
//   X,
//   Loader2,
//   Trash2,
//   Briefcase,
// } from "lucide-react";
// import { improveWithAI } from "@/actions/resume";
// import { toast } from "sonner";
// import useFetch from "@/hooks/use-fetch";

// const formatDisplayDate = (dateString) => {
//   if (!dateString) return "";
//   const date = parse(dateString, "yyyy-MM", new Date());
//   return format(date, "MMM yyyy");
// };

// export function EntryForm({ type, entries = [], onChange }) {
//   const [isAdding, setIsAdding] = useState(false);

//   const {
//     register,
//     handleSubmit: handleValidation,
//     formState: { errors },
//     reset,
//     watch,
//     setValue,
//   } = useForm({
//     resolver: zodResolver(entrySchema),
//     defaultValues: {
//       title: "",
//       organization: "",
//       startDate: "",
//       endDate: "",
//       description: "",
//       current: false,
//     },
//   });

//   const current = watch("current");

//   const handleAdd = handleValidation((data) => {
//     const formattedEntry = {
//       ...data,
//       startDate: formatDisplayDate(data.startDate),
//       endDate: data.current ? "" : formatDisplayDate(data.endDate),
//     };

//     onChange([...(entries || []), formattedEntry]);
//     reset();
//     setIsAdding(false);
//     toast.success(`${type} added successfully`);
//   });

//   const handleDelete = (index) => {
//     const newEntries = entries.filter((_, i) => i !== index);
//     onChange(newEntries);
//     toast.success(`${type} removed`);
//   };

//   const {
//     loading: isImproving,
//     fn: improveWithAIFn,
//     data: improvedContent,
//     error: improveError,
//   } = useFetch(improveWithAI);

//   useEffect(() => {
//     if (improvedContent && !isImproving) {
//       const aiText =
//         improvedContent?.improved ||
//         improvedContent?.content ||
//         improvedContent;

//       if (typeof aiText === "string") {
//         setValue("description", aiText);
//         toast.success("Description improved successfully!");
//       }
//     }

//     if (improveError) {
//       toast.error(improveError.message || "Failed to improve description");
//     }
//   }, [improvedContent, improveError, isImproving, setValue]);

//   const handleImproveDescription = async () => {
//     const description = watch("description");
//     if (!description?.trim()) {
//       toast.error("Please enter a description first");
//       return;
//     }

//     await improveWithAIFn({
//       current: description,
//       type: type.toLowerCase(),
//       level: "mid",
//     });
//   };

//   return (
//     <div className="space-y-4">
//       {!!entries?.length && (
//         <div className="grid gap-4">
//           {entries.map((item, index) => (
//             <Card
//               key={`${item.title}-${item.organization}-${index}`}
//               className="overflow-hidden border shadow-sm"
//             >
//               <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 bg-muted/20 pb-4">
//                 <div className="space-y-1">
//                   <CardTitle className="flex items-center gap-2 text-base">
//                     <Briefcase className="h-4 w-4 text-primary" />
//                     {item.title} @ {item.organization}
//                   </CardTitle>
//                   <p className="text-sm text-muted-foreground">
//                     {item.current
//                       ? `${item.startDate} - Present`
//                       : `${item.startDate} - ${item.endDate}`}
//                   </p>
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
//         <Card className="overflow-hidden border shadow-sm">
//           <CardHeader className="bg-muted/20">
//             <CardTitle>Add {type}</CardTitle>
//           </CardHeader>

//           <CardContent className="space-y-5 pt-5">
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Title / Position</label>
//                 <Input
//                   placeholder="Frontend Developer"
//                   {...register("title")}
//                   className="rounded-xl"
//                 />
//                 {errors.title && (
//                   <p className="text-sm text-red-500">{errors.title.message}</p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium">
//                   Organization / Company
//                 </label>
//                 <Input
//                   placeholder="Company name"
//                   {...register("organization")}
//                   className="rounded-xl"
//                 />
//                 {errors.organization && (
//                   <p className="text-sm text-red-500">
//                     {errors.organization.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Start Date</label>
//                 <Input
//                   type="month"
//                   {...register("startDate")}
//                   className="rounded-xl"
//                 />
//                 {errors.startDate && (
//                   <p className="text-sm text-red-500">
//                     {errors.startDate.message}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium">End Date</label>
//                 <Input
//                   type="month"
//                   {...register("endDate")}
//                   disabled={current}
//                   className="rounded-xl"
//                 />
//                 {errors.endDate && (
//                   <p className="text-sm text-red-500">
//                     {errors.endDate.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="flex items-center gap-2 rounded-xl border bg-muted/20 px-3 py-3">
//               <input
//                 type="checkbox"
//                 id={`${type}-current`}
//                 {...register("current")}
//                 onChange={(e) => {
//                   setValue("current", e.target.checked);
//                   if (e.target.checked) {
//                     setValue("endDate", "");
//                   }
//                 }}
//                 className="h-4 w-4"
//               />
//               <label
//                 htmlFor={`${type}-current`}
//                 className="text-sm font-medium"
//               >
//                 This is my current {type.toLowerCase()}
//               </label>
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium">Description</label>
//               <Textarea
//                 placeholder={`Describe your ${type.toLowerCase()} with impact, tools, ownership, and results...`}
//                 className="min-h-[140px] rounded-2xl"
//                 {...register("description")}
//               />
//               {errors.description && (
//                 <p className="text-sm text-red-500">
//                   {errors.description.message}
//                 </p>
//               )}
//             </div>

//             <Button
//               type="button"
//               variant="outline"
//               size="sm"
//               onClick={handleImproveDescription}
//               disabled={isImproving || !watch("description")}
//               className="rounded-xl"
//             >
//               {isImproving ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Improving...
//                 </>
//               ) : (
//                 <>
//                   <Sparkles className="mr-2 h-4 w-4 text-primary" />
//                   Improve with AI
//                 </>
//               )}
//             </Button>
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
//               Add Entry
//             </Button>
//           </CardFooter>
//         </Card>
//       ) : (
//         <Button
//           type="button"
//           className="w-full rounded-2xl border border-dashed bg-muted/20 py-6 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-primary"
//           variant="outline"
//           onClick={() => setIsAdding(true)}
//         >
//           <PlusCircle className="mr-2 h-4 w-4" />
//           Add {type}
//         </Button>
//       )}
//     </div>
//   );
// // }
// "use client";

// import { useEffect, useState } from "react";
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
// import { entrySchema } from "@/app/lib/schema";
// import {
//   Sparkles,
//   PlusCircle,
//   X,
//   Loader2,
//   Trash2,
//   Briefcase,
// } from "lucide-react";
// // ✅ FIXED IMPORT - Correct for Next.js 15/canary
// import { useActionState as useActionStateNext15, useTransition } from "react";
// import { improveWithAI } from "@/actions/resume";
// import { toast } from "sonner";

// const formatDisplayDate = (dateString) => {
//   if (!dateString) return "";
//   const date = parse(dateString, "yyyy-MM", new Date());
//   return format(date, "MMM yyyy");
// };

// export function EntryForm({ type, entries = [], onChange }) {
//   const [isAdding, setIsAdding] = useState(false);

//   // ✅ FIXED: Correct import + initial state
//   const [aiState, improveAction, isImproving] = useActionStateNext15(improveWithAI, {
//     original: null,
//     improved: null,
//     success: false,
//   });
//   const [isTransitioning, startTransition] = useTransition();

//   const {
//     register,
//     handleSubmit: handleValidation,
//     formState: { errors },
//     reset,
//     watch,
//     setValue,
//   } = useForm({
//     resolver: zodResolver(entrySchema),
//     defaultValues: {
//       title: "",
//       organization: "",
//       startDate: "",
//       endDate: "",
//       description: "",
//       current: false,
//     },
//   });

//   const current = watch("current");
//   const description = watch("description");

//   // Apply AI result automatically
//   useEffect(() => {
//     if (aiState?.improved && aiState.success) {
//       setValue("description", aiState.improved);
//       toast.success("✅ Description improved with AI!");
//     }
//   }, [aiState, setValue]);

//   const handleAdd = handleValidation((data) => {
//     const formattedEntry = {
//       ...data,
//       startDate: formatDisplayDate(data.startDate),
//       endDate: data.current ? "" : formatDisplayDate(data.endDate),
//     };

//     onChange([...(entries || []), formattedEntry]);
//     reset();
//     setIsAdding(false);
//     toast.success(`${type} added successfully`);
//   });

//   const handleDelete = (index) => {
//     const newEntries = entries.filter((_, i) => i !== index);
//     onChange(newEntries);
//     toast.success(`${type} removed`);
//   };

//   const handleImproveDescription = () => {
//     if (!description?.trim()) {
//       toast.error("Please enter a description first");
//       return;
//     }

//     startTransition(() => {
//       improveAction({
//         current: description,
//         type: type.toLowerCase(),
//         level: "mid",
//       });
//     });
//   };

//   return (
//     <div className="space-y-4">
//       {/* Existing Entries */}
//       {!!entries?.length && (
//         <div className="grid gap-4">
//           {entries.map((item, index) => (
//             <Card
//               key={`${item.title}-${item.organization}-${index}`}
//               className="overflow-hidden border shadow-sm"
//             >
//               <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 bg-muted/20 pb-4">
//                 <div className="space-y-1">
//                   <CardTitle className="flex items-center gap-2 text-base">
//                     <Briefcase className="h-4 w-4 text-primary" />
//                     {item.title} @ {item.organization}
//                   </CardTitle>
//                   <p className="text-sm text-muted-foreground">
//                     {item.current
//                       ? `${item.startDate} - Present`
//                       : `${item.startDate} - ${item.endDate}`}
//                   </p>
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

//       {/* Add New Entry Form */}
//       {isAdding ? (
//         <Card className="overflow-hidden border shadow-sm">
//           <CardHeader className="bg-muted/20">
//             <CardTitle>Add {type}</CardTitle>
//           </CardHeader>

//           <CardContent className="space-y-5 pt-5">
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Title / Position</label>
//                 <Input
//                   placeholder="Frontend Developer"
//                   {...register("title")}
//                   className="rounded-xl"
//                 />
//                 {errors.title && (
//                   <p className="text-sm text-red-500">{errors.title.message}</p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Organization / Company</label>
//                 <Input
//                   placeholder="Company name"
//                   {...register("organization")}
//                   className="rounded-xl"
//                 />
//                 {errors.organization && (
//                   <p className="text-sm text-red-500">{errors.organization.message}</p>
//                 )}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Start Date</label>
//                 <Input type="month" {...register("startDate")} className="rounded-xl" />
//                 {errors.startDate && (
//                   <p className="text-sm text-red-500">{errors.startDate.message}</p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium">End Date</label>
//                 <Input
//                   type="month"
//                   {...register("endDate")}
//                   disabled={current}
//                   className="rounded-xl"
//                 />
//                 {errors.endDate && (
//                   <p className="text-sm text-red-500">{errors.endDate.message}</p>
//                 )}
//               </div>
//             </div>

//             <div className="flex items-center gap-2 rounded-xl border bg-muted/20 px-3 py-3">
//               <input
//                 type="checkbox"
//                 id={`${type}-current`}
//                 {...register("current")}
//                 onChange={(e) => {
//                   setValue("current", e.target.checked);
//                   if (e.target.checked) setValue("endDate", "");
//                 }}
//                 className="h-4 w-4"
//               />
//               <label htmlFor={`${type}-current`} className="text-sm font-medium">
//                 This is my current {type.toLowerCase()}
//               </label>
//             </div>

//             <div className="space-y-3">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Description</label>
//                 <Textarea
//                   placeholder={`Describe your ${type.toLowerCase()} with impact, tools, ownership, and results...`}
//                   className="min-h-[140px] rounded-2xl"
//                   {...register("description")}
//                 />
//                 {errors.description && (
//                   <p className="text-sm text-red-500">{errors.description.message}</p>
//                 )}
//               </div>

//               <Button
//                 type="button"
//                 variant="outline"
//                 size="sm"
//                 onClick={handleImproveDescription}
//                 disabled={isImproving || isTransitioning || !description?.trim()}
//                 className="rounded-xl w-full sm:w-auto flex items-center gap-2 group hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all"
//               >
//                 {isImproving || isTransitioning ? (
//                   <>
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                     <span>Improving...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Sparkles className="h-4 w-4 group-hover:animate-pulse" />
//                     <span>✨ Improve with AI</span>
//                   </>
//                 )}
//               </Button>

//               {aiState?.improved && (
//                 <div className="p-4 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-xl">
//                   <div className="flex items-center gap-2 mb-2 text-sm font-medium text-emerald-800">
//                     <Sparkles className="h-4 w-4" />
//                     AI Suggestion Applied:
//                   </div>
//                   <p className="text-sm bg-white p-3 rounded-lg border-l-4 border-emerald-500 font-medium">
//                     {aiState.improved}
//                   </p>
//                 </div>
//               )}
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
//               Add Entry
//             </Button>
//           </CardFooter>
//         </Card>
//       ) : (
//         <Button
//           type="button"
//           className="w-full rounded-2xl border border-dashed bg-muted/20 py-6 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-primary"
//           variant="outline"
//           onClick={() => setIsAdding(true)}
//         >
//           <PlusCircle className="mr-2 h-4 w-4" />
//           Add {type}
//         </Button>
//       )}
//     </div>
//   );
// }