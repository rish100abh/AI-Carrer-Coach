// "use client";

// import { useState } from "react";
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
// import { educationSchema } from "@/app/lib/schema";
// import { GraduationCap, PlusCircle, Trash2, X } from "lucide-react";
// import { toast } from "sonner";

// const formatDisplayDate = (dateString) => {
//   if (!dateString) return "";
//   const date = parse(dateString, "yyyy-MM", new Date());
//   return format(date, "MMM yyyy");
// };

// export default function EducationForm({ entries = [], onChange }) {
//   const [isAdding, setIsAdding] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     watch,
//     setValue,
//   } = useForm({
//     resolver: zodResolver(educationSchema),
//     defaultValues: {
//       degree: "",
//       institution: "",
//       location: "",
//       startDate: "",
//       endDate: "",
//       current: false,
//       gpa: "",
//       fieldOfStudy: "",
//       achievements: "",
//       description: "",
//     },
//   });

//   const current = watch("current");

//   const handleAdd = handleSubmit((data) => {
//     const formattedEntry = {
//       ...data,
//       startDate: formatDisplayDate(data.startDate),
//       endDate: data.current ? "" : formatDisplayDate(data.endDate),
//     };
//     onChange([...(entries || []), formattedEntry]);
//     reset();
//     setIsAdding(false);
//     toast.success("Education added");
//   });

//   const handleDelete = (index) => {
//     onChange(entries.filter((_, i) => i !== index));
//     toast.success("Education removed");
//   };

//   return (
//     <div className="space-y-4">
//       {!!entries?.length && (
//         <div className="grid gap-4">
//           {entries.map((item, index) => (
//             <Card key={`${item.degree}-${item.institution}-${index}`} className="border shadow-sm">
//               <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 bg-muted/20">
//                 <div className="space-y-2">
//                   <CardTitle className="flex items-center gap-2 text-base">
//                     <GraduationCap className="h-4 w-4 text-primary" />
//                     {item.degree} - {item.institution}
//                   </CardTitle>
//                   <div className="space-y-1 text-sm text-muted-foreground">
//                     <p>{item.current ? `${item.startDate} - Present` : `${item.startDate} - ${item.endDate}`}</p>
//                     {item.location && <p>{item.location}</p>}
//                     {(item.fieldOfStudy || item.gpa) && (
//                       <p>{[item.fieldOfStudy, item.gpa ? `GPA: ${item.gpa}` : ""].filter(Boolean).join(" • ")}</p>
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

//               <CardContent className="pt-4 space-y-2">
//                 {item.achievements && (
//                   <p className="text-sm text-muted-foreground">
//                     <span className="font-medium text-foreground">Achievements:</span> {item.achievements}
//                   </p>
//                 )}
//                 {item.description && (
//                   <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
//                     {item.description}
//                   </p>
//                 )}
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}

//       {isAdding ? (
//         <Card className="border shadow-sm">
//           <CardHeader className="bg-muted/20">
//             <CardTitle>Add Education</CardTitle>
//           </CardHeader>

//           <CardContent className="space-y-5 pt-5">
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Degree</label>
//                 <Input placeholder="B.Tech in Computer Science" {...register("degree")} className="rounded-xl" />
//                 {errors.degree && <p className="text-sm text-red-500">{errors.degree.message}</p>}
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Institution</label>
//                 <Input placeholder="Delhi University" {...register("institution")} className="rounded-xl" />
//                 {errors.institution && <p className="text-sm text-red-500">{errors.institution.message}</p>}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Location</label>
//                 <Input placeholder="Delhi, India" {...register("location")} className="rounded-xl" />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Field of Study</label>
//                 <Input placeholder="Computer Science" {...register("fieldOfStudy")} className="rounded-xl" />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium">GPA / CGPA</label>
//                 <Input placeholder="8.7/10" {...register("gpa")} className="rounded-xl" />
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
//                 id="education-current"
//                 {...register("current")}
//                 onChange={(e) => {
//                   setValue("current", e.target.checked);
//                   if (e.target.checked) setValue("endDate", "");
//                 }}
//                 className="h-4 w-4"
//               />
//               <label htmlFor="education-current" className="text-sm font-medium">
//                 I am currently studying here
//               </label>
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium">Achievements</label>
//               <Textarea
//                 placeholder="Dean's List, scholarships, rank, honors..."
//                 {...register("achievements")}
//                 className="min-h-[90px] rounded-2xl"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium">Additional Details</label>
//               <Textarea
//                 placeholder="Relevant coursework, thesis, activities, leadership..."
//                 {...register("description")}
//                 className="min-h-[110px] rounded-2xl"
//               />
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
//               Add Education
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
//           Add Education
//         </Button>
//       )}
//     </div>
//   );
// }
"use client";

import { Label } from "@/components/ui/label";  
import { useState } from "react";
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
import { educationSchema } from "@/app/lib/schema";
import { GraduationCap, PlusCircle, Trash2, X, MapPin, CalendarDays, Star } from "lucide-react";
import { toast } from "sonner";

const formatDisplayDate = (dateString) => {
  if (!dateString) return "";
  const date = parse(dateString, "yyyy-MM", new Date());
  return format(date, "MMM yyyy");
};

export default function EducationForm({ entries = [], onChange }) {
  const [isAdding, setIsAdding] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      gpa: "",
      fieldOfStudy: "",
      achievements: "",
      description: "",
    },
  });

  const current = watch("current");

  // ✅ SAFE CHANGE: Only call onChange if it's actually a function
  const safeOnChange = (newEntries) => {
    if (typeof onChange === "function") {
      onChange(newEntries);
    }
  };

  const handleAdd = handleSubmit((data) => {
    const formattedEntry = {
      ...data,
      startDate: formatDisplayDate(data.startDate),
      endDate: data.current ? "" : formatDisplayDate(data.endDate),
    };
    // ✅ FIXED: Safe onChange call
    safeOnChange([...(entries || []), formattedEntry]);
    reset();
    setIsAdding(false);
    toast.success("Education added");
  });

  const handleDelete = (index) => {
    // ✅ FIXED: Safe onChange call
    safeOnChange(entries.filter((_, i) => i !== index));
    toast.success("Education removed");
  };

  return (
    <div className="space-y-4">
      {!!entries?.length && (
        <div className="grid gap-4">
          {entries.map((item, index) => (
            <Card key={`${item.degree}-${item.institution}-${index}`} className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
              <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 border-b bg-muted/30 px-6 py-4">
                <div className="space-y-2">
                  <CardTitle className="flex items-center gap-3 text-base font-semibold text-foreground">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    {item.degree} - {item.institution}
                  </CardTitle>
                  <div className="space-y-1 text-sm text-foreground/80">
                    <p>{item.current ? `${item.startDate} - Present` : `${item.startDate} - ${item.endDate}`}</p>
                    {item.location && <p>{item.location}</p>}
                    {(item.fieldOfStudy || item.gpa) && (
                      <p>{[item.fieldOfStudy, item.gpa ? `GPA: ${item.gpa}` : ""].filter(Boolean).join(" • ")}</p>
                    )}
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
                {item.achievements && (
                  <div className="space-y-1">
                    <span className="font-medium text-foreground">Achievements:</span>
                    <p className="text-sm text-foreground/90">{item.achievements}</p>
                  </div>
                )}
                {item.description && (
                  <p className="whitespace-pre-wrap text-sm leading-6 text-foreground/90">
                    {item.description}
                  </p>
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
                <GraduationCap className="h-5 w-5" />
              </div>
              Add Education
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 px-6 py-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="education-degree" className="text-sm font-medium">
                  Degree
                </Label>
                <Input
                  id="education-degree"
                  placeholder="B.Tech in Computer Science"
                  {...register("degree")}
                  className="h-11 rounded-xl"
                />
                {errors.degree && <p className="text-sm font-medium text-red-500">{errors.degree.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="education-institution" className="text-sm font-medium">
                  Institution
                </Label>
                <Input
                  id="education-institution"
                  placeholder="Delhi University"
                  {...register("institution")}
                  className="h-11 rounded-xl"
                />
                {errors.institution && <p className="text-sm font-medium text-red-500">{errors.institution.message}</p>}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="education-location" className="flex items-center gap-2 text-sm font-medium">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  Location
                </Label>
                <Input
                  id="education-location"
                  placeholder="Delhi, India"
                  {...register("location")}
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="education-fieldOfStudy" className="text-sm font-medium">
                  Field of Study
                </Label>
                <Input
                  id="education-fieldOfStudy"
                  placeholder="Computer Science"
                  {...register("fieldOfStudy")}
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="education-gpa" className="flex items-center gap-2 text-sm font-medium">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  GPA / CGPA
                </Label>
                <Input
                  id="education-gpa"
                  placeholder="8.7/10"
                  {...register("gpa")}
                  className="h-11 rounded-xl"
                />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="education-startDate" className="flex items-center gap-2 text-sm font-medium">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  Start Date
                </Label>
                <Input
                  type="month"
                  id="education-startDate"
                  {...register("startDate")}
                  className="h-11 rounded-xl"
                />
                {errors.startDate && <p className="text-sm font-medium text-red-500">{errors.startDate.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="education-endDate" className="text-sm font-medium">
                  End Date
                </Label>
                <Input
                  type="month"
                  id="education-endDate"
                  {...register("endDate")}
                  disabled={current}
                  className="h-11 rounded-xl disabled:cursor-not-allowed disabled:opacity-50"
                />
                {errors.endDate && <p className="text-sm font-medium text-red-500">{errors.endDate.message}</p>}
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/20 px-4 py-3">
              <input
                type="checkbox"
                id="education-current"
                {...register("current")}
                onChange={(e) => {
                  setValue("current", e.target.checked);
                  if (e.target.checked) setValue("endDate", "");
                }}
                className="h-4 w-4 rounded"
              />
              <label htmlFor="education-current" className="text-sm font-medium cursor-pointer">
                I am currently studying here
              </label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="education-achievements" className="text-sm font-medium">
                Achievements
              </Label>
              <Textarea
                id="education-achievements"
                placeholder="Dean's List, scholarships, rank, honors..."
                {...register("achievements")}
                className="min-h-[90px] rounded-2xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="education-description" className="text-sm font-medium">
                Additional Details
              </Label>
              <Textarea
                id="education-description"
                placeholder="Relevant coursework, thesis, activities, leadership..."
                {...register("description")}
                className="min-h-[110px] rounded-2xl"
              />
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
              Add Education
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
          Add Education
        </Button>
      )}
    </div>
  );
}