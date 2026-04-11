// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { certificationSchema } from "@/app/lib/schema";
// import { Award, PlusCircle, Trash2, X, ExternalLink } from "lucide-react";
// import { toast } from "sonner";

// export default function CertificationForm({ entries = [], onChange }) {
//   const [isAdding, setIsAdding] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: zodResolver(certificationSchema),
//     defaultValues: {
//       name: "",
//       issuer: "",
//       issueDate: "",
//       expiryDate: "",
//       credentialId: "",
//       credentialUrl: "",
//     },
//   });

//   const handleAdd = handleSubmit((data) => {
//     onChange([...(entries || []), data]);
//     reset();
//     setIsAdding(false);
//     toast.success("Certification added");
//   });

//   const handleDelete = (index) => {
//     onChange(entries.filter((_, i) => i !== index));
//     toast.success("Certification removed");
//   };

//   return (
//     <div className="space-y-4">
//       {!!entries?.length && (
//         <div className="grid gap-4">
//           {entries.map((item, index) => (
//             <Card key={`${item.name}-${item.issuer}-${index}`} className="border shadow-sm">
//               <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 bg-muted/20">
//                 <div className="space-y-2">
//                   <CardTitle className="flex items-center gap-2 text-base">
//                     <Award className="h-4 w-4 text-primary" />
//                     {item.name}
//                   </CardTitle>
//                   <div className="space-y-1 text-sm text-muted-foreground">
//                     <p>{item.issuer}</p>
//                     <p>{item.expiryDate ? `${item.issueDate} - ${item.expiryDate}` : item.issueDate}</p>
//                     {item.credentialId && <p>Credential ID: {item.credentialId}</p>}
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

//               {item.credentialUrl && (
//                 <CardContent className="pt-4">
//                   <a
//                     href={item.credentialUrl}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
//                   >
//                     <ExternalLink className="h-4 w-4" />
//                     View Credential
//                   </a>
//                 </CardContent>
//               )}
//             </Card>
//           ))}
//         </div>
//       )}

//       {isAdding ? (
//         <Card className="border shadow-sm">
//           <CardHeader className="bg-muted/20">
//             <CardTitle>Add Certification</CardTitle>
//           </CardHeader>

//           <CardContent className="space-y-5 pt-5">
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Certification Name</label>
//                 <Input placeholder="AWS Certified Developer" {...register("name")} className="rounded-xl" />
//                 {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Issuer</label>
//                 <Input placeholder="Amazon Web Services" {...register("issuer")} className="rounded-xl" />
//                 {errors.issuer && <p className="text-sm text-red-500">{errors.issuer.message}</p>}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Issue Date</label>
//                 <Input type="month" {...register("issueDate")} className="rounded-xl" />
//                 {errors.issueDate && <p className="text-sm text-red-500">{errors.issueDate.message}</p>}
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Expiry Date</label>
//                 <Input type="month" {...register("expiryDate")} className="rounded-xl" />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Credential ID</label>
//                 <Input placeholder="ABC123XYZ" {...register("credentialId")} className="rounded-xl" />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Credential URL</label>
//                 <Input placeholder="https://verify.example.com" {...register("credentialUrl")} className="rounded-xl" />
//                 {errors.credentialUrl && <p className="text-sm text-red-500">{errors.credentialUrl.message}</p>}
//               </div>
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
//               Add Certification
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
//           Add Certification
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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { certificationSchema } from "@/app/lib/schema";
import {
  Award,
  PlusCircle,
  Trash2,
  X,
  ExternalLink,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

export default function CertificationForm({ entries = [], onChange }) {
  const [isAdding, setIsAdding] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      name: "",
      issuer: "",
      issueDate: "",
      expiryDate: "",
      credentialId: "",
      credentialUrl: "",
    },
  });

  // ✅ Safe guard: only call onChange if it's actually a function
  const safeOnChange = (newEntries) => {
    if (typeof onChange === "function") {
      onChange(newEntries);
    }
  };

  const handleAdd = handleSubmit((data) => {
    safeOnChange([...(entries || []), data]);
    reset();
    setIsAdding(false);
    toast.success("Certification added");
  });

  const handleDelete = (index) => {
    safeOnChange(entries.filter((_, i) => i !== index));
    toast.success("Certification removed");
  };

  return (
    <div className="space-y-4">
      {!!entries?.length && (
        <div className="grid gap-4">
          {entries.map((item, index) => (
            <Card
              key={`${item.name}-${item.issuer}-${index}`}
              className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm"
            >
              <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 border-b bg-muted/30 px-6 py-4">
                <div className="space-y-2">
                  <CardTitle className="flex items-center gap-3 text-base font-semibold text-foreground">
                    {/* ✅ Fixed: Award icon with proper styling, no broken img */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Award className="h-5 w-5" />
                    </div>
                    {item.name}
                  </CardTitle>

                  <div className="space-y-1 text-sm text-foreground/80">
                    <p className="font-medium text-muted-foreground">{item.issuer}</p>
                    <p className="flex items-center gap-1 text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {item.expiryDate
                        ? `${item.issueDate} – ${item.expiryDate}`
                        : item.issueDate}
                    </p>
                    {item.credentialId && (
                      <p className="text-xs text-muted-foreground">
                        ID: {item.credentialId}
                      </p>
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

              {item.credentialUrl && (
                <CardContent className="px-6 pt-4 pb-4">
                  <a
                    href={item.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Credential
                  </a>
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
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              Add Certification
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 px-6 py-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="certification-name" className="text-sm font-medium">
                  Certification Name
                </Label>
                <Input
                  id="certification-name"
                  placeholder="AWS Certified Developer"
                  {...register("name")}
                  className="h-11 rounded-xl"
                />
                {errors.name && (
                  <p className="text-sm font-medium text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="certification-issuer" className="text-sm font-medium">
                  Issuer
                </Label>
                <Input
                  id="certification-issuer"
                  placeholder="Amazon Web Services"
                  {...register("issuer")}
                  className="h-11 rounded-xl"
                />
                {errors.issuer && (
                  <p className="text-sm font-medium text-red-500">{errors.issuer.message}</p>
                )}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="certification-issueDate"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  Issue Date
                </Label>
                <Input
                  id="certification-issueDate"
                  type="month"
                  {...register("issueDate")}
                  className="h-11 rounded-xl"
                />
                {errors.issueDate && (
                  <p className="text-sm font-medium text-red-500">{errors.issueDate.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="certification-expiryDate" className="text-sm font-medium">
                  Expiry Date <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="certification-expiryDate"
                  type="month"
                  {...register("expiryDate")}
                  className="h-11 rounded-xl"
                />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="certification-credentialId" className="text-sm font-medium">
                  Credential ID <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="certification-credentialId"
                  placeholder="ABC123XYZ"
                  {...register("credentialId")}
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="certification-credentialUrl"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  Credential URL <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="certification-credentialUrl"
                  placeholder="https://verify.example.com"
                  {...register("credentialUrl")}
                  className="h-11 rounded-xl"
                />
                {errors.credentialUrl && (
                  <p className="text-sm font-medium text-red-500">{errors.credentialUrl.message}</p>
                )}
              </div>
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

            <Button type="button" onClick={handleAdd} className="h-10 rounded-xl">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Certification
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsAdding(true)}
          className="h-16 w-full rounded-2xl border border-dashed bg-muted/20 py-8 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-primary"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Add Certification
        </Button>
      )}
    </div>
  );
}