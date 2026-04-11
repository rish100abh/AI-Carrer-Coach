// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
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
// import { achievementSchema } from "@/app/lib/schema";
// import { Trophy, PlusCircle, Trash2, X } from "lucide-react";
// import { toast } from "sonner";

// export default function AchievementForm({ entries = [], onChange }) {
//   const [isAdding, setIsAdding] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: zodResolver(achievementSchema),
//     defaultValues: {
//       title: "",
//       issuer: "",
//       date: "",
//       description: "",
//     },
//   });

//   const handleAdd = handleSubmit((data) => {
//     onChange([...(entries || []), data]);
//     reset();
//     setIsAdding(false);
//     toast.success("Achievement added");
//   });

//   const handleDelete = (index) => {
//     onChange(entries.filter((_, i) => i !== index));
//     toast.success("Achievement removed");
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
//                     <Trophy className="h-4 w-4 text-primary" />
//                     {item.title}
//                   </CardTitle>
//                   <div className="space-y-1 text-sm text-muted-foreground">
//                     {item.issuer && <p>{item.issuer}</p>}
//                     {item.date && <p>{item.date}</p>}
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
//             <CardTitle>Add Achievement</CardTitle>
//           </CardHeader>

//           <CardContent className="space-y-5 pt-5">
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Title</label>
//                 <Input placeholder="Hackathon Winner" {...register("title")} className="rounded-xl" />
//                 {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Issuer</label>
//                 <Input placeholder="Google Developer Group" {...register("issuer")} className="rounded-xl" />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium">Date</label>
//               <Input type="month" {...register("date")} className="rounded-xl" />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium">Description</label>
//               <Textarea
//                 placeholder="Describe what you achieved and why it matters..."
//                 {...register("description")}
//                 className="min-h-[120px] rounded-2xl"
//               />
//               {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
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
//               Add Achievement
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
//           Add Achievement
//         </Button>
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { achievementSchema } from "@/app/lib/schema";
import {
  Trophy,
  PlusCircle,
  Trash2,
  X,
  CalendarDays,
  Medal,
} from "lucide-react";
import { toast } from "sonner";

export default function AchievementForm({
  entries = [],
  onChange = () => {},
}) {
  const [isAdding, setIsAdding] = useState(false);

  const safeEntries = Array.isArray(entries) ? entries : [];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(achievementSchema),
    defaultValues: {
      title: "",
      issuer: "",
      date: "",
      description: "",
    },
  });

  const handleAdd = handleSubmit((data) => {
    onChange([...safeEntries, data]);
    reset();
    setIsAdding(false);
    toast.success("Achievement added");
  });

  const handleDelete = (index) => {
    onChange(safeEntries.filter((_, i) => i !== index));
    toast.success("Achievement removed");
  };

  return (
    <div className="space-y-4">
      {!!safeEntries.length && (
        <div className="grid gap-4">
          {safeEntries.map((item, index) => (
            <Card
              key={`${item.title}-${index}`}
              className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm"
            >
              <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 border-b bg-muted/30 px-6 py-4">
                <div className="space-y-2">
                  <CardTitle className="flex items-center gap-3 text-base font-semibold text-foreground">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Trophy className="h-5 w-5" />
                    </div>
                    {item.title}
                  </CardTitle>

                  <div className="space-y-1 text-sm text-foreground/80">
                    {item.issuer && <p>{item.issuer}</p>}
                    {item.date && <p>{item.date}</p>}
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

              {item.description && (
                <CardContent className="px-6 pt-6">
                  <p className="whitespace-pre-wrap text-sm leading-6 text-foreground/90">
                    {item.description}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {isAdding ? (
        <Card className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
          <CardHeader className="bg-muted/30">
            <CardTitle className="flex items-center gap-3 text-foreground">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Medal className="h-5 w-5" />
              </div>
              Add Achievement
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 px-6 py-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="achievement-title"
                  className="text-sm font-medium text-foreground"
                >
                  Title
                </Label>
                <Input
                  id="achievement-title"
                  placeholder="Hackathon Winner"
                  {...register("title")}
                  className="h-11 rounded-xl border-input bg-background text-foreground placeholder:text-muted-foreground"
                />
                {errors.title && (
                  <p className="text-sm font-medium text-red-500">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="achievement-issuer"
                  className="text-sm font-medium text-foreground"
                >
                  Issuer
                </Label>
                <Input
                  id="achievement-issuer"
                  placeholder="Google Developer Group"
                  {...register("issuer")}
                  className="h-11 rounded-xl border-input bg-background text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="achievement-date"
                className="flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                Date
              </Label>
              <Input
                id="achievement-date"
                type="month"
                {...register("date")}
                className="h-11 rounded-xl border-input bg-background text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="achievement-description"
                className="text-sm font-medium text-foreground"
              >
                Description
              </Label>
              <Textarea
                id="achievement-description"
                placeholder="Describe what you achieved, the competition or recognition, and why it matters..."
                {...register("description")}
                className="min-h-[120px] rounded-2xl border-input bg-background text-foreground placeholder:text-muted-foreground"
              />
              {errors.description && (
                <p className="text-sm font-medium text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-2 border-t bg-muted/10 px-6 py-4">
            <Button
              type="button"
              variant="outline"
              className="h-10 rounded-xl"
              onClick={() => {
                reset();
                setIsAdding(false);
              }}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>

            <Button
              type="button"
              onClick={handleAdd}
              className="h-10 rounded-xl"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Achievement
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsAdding(true)}
          className="h-16 w-full rounded-2xl border border-dashed bg-muted/20 py-8 text-sm font-medium text-foreground hover:bg-primary/5 hover:text-primary"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Add Achievement
        </Button>
      )}
    </div>
  );
}