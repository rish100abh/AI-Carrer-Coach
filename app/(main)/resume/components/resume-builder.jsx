// "use client";

// import { useState, useEffect } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   AlertTriangle,
//   Download,
//   Edit,
//   Loader2,
//   Monitor,
//   Save,
// } from "lucide-react";
// import { toast } from "sonner";
// import MDEditor from "@uiw/react-md-editor";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import { saveResume } from "@/actions/resume";
// import { EntryForm } from "./entry-form";
// import useFetch from "@/hooks/use-fetch";
// import { useUser } from "@clerk/nextjs";
// import { entriesToMarkdown } from "@/app/lib/helper";
// import { resumeSchema } from "@/app/lib/schema";
// import html2pdf from "html2pdf.js/dist/html2pdf.min.js";

// export default function ResumeBuilder({ initialContent }) {
//   const [activeTab, setActiveTab] = useState("edit");
//   const [previewContent, setPreviewContent] = useState(initialContent);
//   const { user } = useUser();
//   const [resumeMode, setResumeMode] = useState("preview");

//   const {
//     control,
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(resumeSchema),
//     defaultValues: {
//       contactInfo: {},
//       summary: "",
//       skills: "",
//       experience: [],
//       education: [],
//       projects: [],
//     },
//   });

//   const {
//     loading: isSaving,
//     fn: saveResumeFn,
//     data: saveResult,
//     error: saveError,
//   } = useFetch(saveResume);

//   // Watch form fields for preview updates
//   const formValues = watch();

//   useEffect(() => {
//     if (initialContent) setActiveTab("preview");
//   }, [initialContent]);

//   // Update preview content when form values change
//   useEffect(() => {
//     if (activeTab === "edit") {
//       const newContent = getCombinedContent();
//       setPreviewContent(newContent ? newContent : initialContent);
//     }
//   }, [formValues, activeTab]);

//   // Handle save result
//   useEffect(() => {
//     if (saveResult && !isSaving) {
//       toast.success("Resume saved successfully!");
//     }
//     if (saveError) {
//       toast.error(saveError.message || "Failed to save resume");
//     }
//   }, [saveResult, saveError, isSaving]);

//   const getContactMarkdown = () => {
//     const { contactInfo } = formValues;
//     const parts = [];
//     if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
//     if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
//     if (contactInfo.linkedin)
//       parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
//     if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

//     return parts.length > 0
//       ? `## <div align="center">${user.fullName}</div>
//         \n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
//       : "";
//   };

//   const getCombinedContent = () => {
//     const { summary, skills, experience, education, projects } = formValues;
//     return [
//       getContactMarkdown(),
//       summary && `## Professional Summary\n\n${summary}`,
//       skills && `## Skills\n\n${skills}`,
//       entriesToMarkdown(experience, "Work Experience"),
//       entriesToMarkdown(education, "Education"),
//       entriesToMarkdown(projects, "Projects"),
//     ]
//       .filter(Boolean)
//       .join("\n\n");
//   };

//   const [isGenerating, setIsGenerating] = useState(false);

//   const generatePDF = async () => {
//     setIsGenerating(true);
//     try {
//       const element = document.getElementById("resume-pdf");
//       const opt = {
//         margin: [15, 15],
//         filename: "resume.pdf",
//         image: { type: "jpeg", quality: 0.98 },
//         html2canvas: { scale: 2 },
//         jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
//       };

//       await html2pdf().set(opt).from(element).save();
//     } catch (error) {
//       console.error("PDF generation error:", error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const onSubmit = async (data) => {
//     try {
//       const formattedContent = previewContent
//         .replace(/\n/g, "\n") // Normalize newlines
//         .replace(/\n\s*\n/g, "\n\n") // Normalize multiple newlines to double newlines
//         .trim();

//       console.log(previewContent, formattedContent);
//       await saveResumeFn(previewContent);
//     } catch (error) {
//       console.error("Save error:", error);
//     }
//   };

//   return (
//     <div data-color-mode="light" className="space-y-4">
//       <div className="flex flex-col md:flex-row justify-between items-center gap-2">
//         <h1 className="font-bold gradient-title text-5xl md:text-6xl">
//           Resume Builder
//         </h1>
//         <div className="space-x-2">
//           <Button
//             variant="destructive"
//             onClick={handleSubmit(onSubmit)}
//             disabled={isSaving}
//           >
//             {isSaving ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Saving...
//               </>
//             ) : (
//               <>
//                 <Save className="h-4 w-4" />
//                 Save
//               </>
//             )}
//           </Button>
//           <Button onClick={generatePDF} disabled={isGenerating}>
//             {isGenerating ? (
//               <>
//                 <Loader2 className="h-4 w-4 animate-spin" />
//                 Generating PDF...
//               </>
//             ) : (
//               <>
//                 <Download className="h-4 w-4" />
//                 Download PDF
//               </>
//             )}
//           </Button>
//         </div>
//       </div>

//       <Tabs value={activeTab} onValueChange={setActiveTab}>
//         <TabsList>
//           <TabsTrigger value="edit">Form</TabsTrigger>
//           <TabsTrigger value="preview">Markdown</TabsTrigger>
//         </TabsList>

//         <TabsContent value="edit">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//             {/* Contact Information */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium">Contact Information</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">Email</label>
//                   <Input
//                     {...register("contactInfo.email")}
//                     type="email"
//                     placeholder="your@email.com"
//                     error={errors.contactInfo?.email}
//                   />
//                   {errors.contactInfo?.email && (
//                     <p className="text-sm text-red-500">
//                       {errors.contactInfo.email.message}
//                     </p>
//                   )}
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">Mobile Number</label>
//                   <Input
//                     {...register("contactInfo.mobile")}
//                     type="tel"
//                     placeholder="+1 234 567 8900"
//                   />
//                   {errors.contactInfo?.mobile && (
//                     <p className="text-sm text-red-500">
//                       {errors.contactInfo.mobile.message}
//                     </p>
//                   )}
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">LinkedIn URL</label>
//                   <Input
//                     {...register("contactInfo.linkedin")}
//                     type="url"
//                     placeholder="https://linkedin.com/in/your-profile"
//                   />
//                   {errors.contactInfo?.linkedin && (
//                     <p className="text-sm text-red-500">
//                       {errors.contactInfo.linkedin.message}
//                     </p>
//                   )}
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">
//                     Twitter/X Profile
//                   </label>
//                   <Input
//                     {...register("contactInfo.twitter")}
//                     type="url"
//                     placeholder="https://twitter.com/your-handle"
//                   />
//                   {errors.contactInfo?.twitter && (
//                     <p className="text-sm text-red-500">
//                       {errors.contactInfo.twitter.message}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Summary */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium">Professional Summary</h3>
//               <Controller
//                 name="summary"
//                 control={control}
//                 render={({ field }) => (
//                   <Textarea
//                     {...field}
//                     className="h-32"
//                     placeholder="Write a compelling professional summary..."
//                     error={errors.summary}
//                   />
//                 )}
//               />
//               {errors.summary && (
//                 <p className="text-sm text-red-500">{errors.summary.message}</p>
//               )}
//             </div>

//             {/* Skills */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium">Skills</h3>
//               <Controller
//                 name="skills"
//                 control={control}
//                 render={({ field }) => (
//                   <Textarea
//                     {...field}
//                     className="h-32"
//                     placeholder="List your key skills..."
//                     error={errors.skills}
//                   />
//                 )}
//               />
//               {errors.skills && (
//                 <p className="text-sm text-red-500">{errors.skills.message}</p>
//               )}
//             </div>

//             {/* Experience */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium">Work Experience</h3>
//               <Controller
//                 name="experience"
//                 control={control}
//                 render={({ field }) => (
//                   <EntryForm
//                     type="Experience"
//                     entries={field.value}
//                     onChange={field.onChange}
//                   />
//                 )}
//               />
//               {errors.experience && (
//                 <p className="text-sm text-red-500">
//                   {errors.experience.message}
//                 </p>
//               )}
//             </div>

//             {/* Education */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium">Education</h3>
//               <Controller
//                 name="education"
//                 control={control}
//                 render={({ field }) => (
//                   <EntryForm
//                     type="Education"
//                     entries={field.value}
//                     onChange={field.onChange}
//                   />
//                 )}
//               />
//               {errors.education && (
//                 <p className="text-sm text-red-500">
//                   {errors.education.message}
//                 </p>
//               )}
//             </div>

//             {/* Projects */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium">Projects</h3>
//               <Controller
//                 name="projects"
//                 control={control}
//                 render={({ field }) => (
//                   <EntryForm
//                     type="Project"
//                     entries={field.value}
//                     onChange={field.onChange}
//                   />
//                 )}
//               />
//               {errors.projects && (
//                 <p className="text-sm text-red-500">
//                   {errors.projects.message}
//                 </p>
//               )}
//             </div>
//           </form>
//         </TabsContent>

//         <TabsContent value="preview">
//           {activeTab === "preview" && (
//             <Button
//               variant="link"
//               type="button"
//               className="mb-2"
//               onClick={() =>
//                 setResumeMode(resumeMode === "preview" ? "edit" : "preview")
//               }
//             >
//               {resumeMode === "preview" ? (
//                 <>
//                   <Edit className="h-4 w-4" />
//                   Edit Resume
//                 </>
//               ) : (
//                 <>
//                   <Monitor className="h-4 w-4" />
//                   Show Preview
//                 </>
//               )}
//             </Button>
//           )}

//           {activeTab === "preview" && resumeMode !== "preview" && (
//             <div className="flex p-3 gap-2 items-center border-2 border-yellow-600 text-yellow-600 rounded mb-2">
//               <AlertTriangle className="h-5 w-5" />
//               <span className="text-sm">
//                 You will lose editied markdown if you update the form data.
//               </span>
//             </div>
//           )}
//           <div className="border rounded-lg">
//             <MDEditor
//               value={previewContent}
//               onChange={setPreviewContent}
//               height={800}
//               preview={resumeMode}
//             />
//           </div>
//           <div className="hidden">
//             <div id="resume-pdf">
//               <MDEditor.Markdown
//                 source={previewContent}
//                 style={{
//                   background: "white",
//                   color: "black",
//                 }}
//               />
//             </div>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

// "use client";
// import { useState, useEffect, useMemo } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   AlertTriangle,
//   Download,
//   Edit,
//   Eye,
//   FileText,
//   Loader2,
//   Monitor,
//   Save,
//   Sparkles,
//   Wand2,
// } from "lucide-react";
// import { toast } from "sonner";
// import MDEditor from "@uiw/react-md-editor";
// import { Button } from "@/components/ui/button";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import { saveResume } from "@/actions/resume";
// import { EntryForm } from "./entry-form";
// import useFetch from "@/hooks/use-fetch";
// import { useUser } from "@clerk/nextjs";
// import { entriesToMarkdown } from "@/app/lib/helper";
// import { resumeSchema } from "@/app/lib/schema";
// import html2pdf from "html2pdf.js/dist/html2pdf.min.js";

// export default function ResumeBuilder({ initialContent = "" }) {
//   const [activeTab, setActiveTab] = useState(initialContent ? "preview" : "edit");
//   const [previewContent, setPreviewContent] = useState(initialContent || "");
//   const [resumeMode, setResumeMode] = useState("preview");
//   const [isGenerating, setIsGenerating] = useState(false);
//   const { user } = useUser();

//   const {
//     control,
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(resumeSchema),
//     defaultValues: {
//       contactInfo: {
//         email: "",
//         mobile: "",
//         linkedin: "",
//         twitter: "",
//       },
//       summary: "",
//       skills: "",
//       experience: [],
//       education: [],
//       projects: [],
//     },
//   });

//   const {
//     loading: isSaving,
//     fn: saveResumeFn,
//     data: saveResult,
//     error: saveError,
//   } = useFetch(saveResume);

//   const formValues = watch();

//   useEffect(() => {
//     if (saveResult && !isSaving) {
//       if (saveResult?.success || saveResult?.resume || !saveResult?.error) {
//         toast.success("Resume saved successfully!");
//       }
//     }
//     if (saveError) {
//       toast.error(saveError.message || "Failed to save resume");
//     }
//   }, [saveResult, saveError, isSaving]);

//   const getContactMarkdown = () => {
//     const contact = formValues.contactInfo || {};
//     const parts = [];

//     if (contact.email) parts.push(`📧 ${contact.email}`);
//     if (contact.mobile) parts.push(`📱 ${contact.mobile}`);
//     if (contact.linkedin) parts.push(`💼 [LinkedIn](${contact.linkedin})`);
//     if (contact.twitter) parts.push(`🐦 [Twitter/X](${contact.twitter})`);

//     const fullName = user?.fullName || user?.firstName || "Your Name";

//     return parts.length > 0
//       ? `# ${fullName}\n\n${parts.join(" | ")}`
//       : `# ${fullName}`;
//   };

//   const getCombinedContent = () => {
//     const { summary, skills, experience, education, projects } = formValues;

//     return [
//       getContactMarkdown(),
//       summary?.trim() ? `## Professional Summary\n\n${summary.trim()}` : "",
//       skills?.trim() ? `## Skills\n\n${skills.trim()}` : "",
//       entriesToMarkdown(experience, "Work Experience"),
//       entriesToMarkdown(education, "Education"),
//       entriesToMarkdown(projects, "Projects"),
//     ]
//       .filter(Boolean)
//       .join("\n\n");
//   };

//   const generatedContent = useMemo(() => getCombinedContent(), [formValues, user]);

//   useEffect(() => {
//     if (activeTab === "edit") {
//       setPreviewContent(generatedContent || initialContent || "");
//     }
//   }, [generatedContent, activeTab, initialContent]);

//   const generatePDF = async () => {
//     setIsGenerating(true);
//     try {
//       const element = document.getElementById("resume-pdf");
//       if (!element) {
//         toast.error("Resume preview not found for PDF generation");
//         return;
//       }

//       const opt = {
//         margin: [12, 12],
//         filename: "resume.pdf",
//         image: { type: "jpeg", quality: 0.98 },
//         html2canvas: { scale: 2, useCORS: true },
//         jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
//       };

//       await html2pdf().set(opt).from(element).save();
//       toast.success("PDF generated successfully");
//     } catch (error) {
//       console.error("PDF generation error:", error);
//       toast.error("Failed to generate PDF");
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const onSubmit = async () => {
//     try {
//       const formattedContent = (previewContent || "")
//         .replace(/\n{3,}/g, "\n\n")
//         .trim();

//       if (!formattedContent) {
//         toast.error("Resume content is empty");
//         return;
//       }

//       await saveResumeFn(formattedContent);
//     } catch (error) {
//       console.error("Save error:", error);
//       toast.error("Failed to save resume");
//     }
//   };

//   const completionStats = useMemo(() => {
//     const sections = [
//       formValues.summary,
//       formValues.skills,
//       formValues.experience?.length ? "yes" : "",
//       formValues.education?.length ? "yes" : "",
//       formValues.projects?.length ? "yes" : "",
//     ];
//     const filled = sections.filter(Boolean).length;
//     return Math.round((filled / sections.length) * 100);
//   }, [formValues]);

//   return (
//     <div data-color-mode="light" className="space-y-6">
//       <Card className="overflow-hidden border shadow-sm">
//         <CardContent className="flex flex-col gap-5 p-5 md:flex-row md:items-center md:justify-between">
//           <div className="space-y-2">
//             <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
//               Build your resume
//             </h2>
//             <p className="max-w-2xl text-sm text-muted-foreground">
//               Fill each section, enhance descriptions with AI, review the final
//               markdown, and export a clean PDF version.
//             </p>
//           </div>

//           <div className="flex flex-wrap gap-3">
//             <div className="rounded-xl border bg-muted/30 px-4 py-2 text-sm">
//               <span className="font-semibold text-foreground">
//                 {completionStats}%
//               </span>{" "}
//               complete
//             </div>

//             <Button
//               variant="outline"
//               onClick={handleSubmit(onSubmit)}
//               disabled={isSaving}
//               className="rounded-xl"
//             >
//               {isSaving ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Saving...
//                 </>
//               ) : (
//                 <>
//                   <Save className="mr-2 h-4 w-4" />
//                   Save Resume
//                 </>
//               )}
//             </Button>

//             <Button
//               onClick={generatePDF}
//               disabled={isGenerating}
//               className="rounded-xl"
//             >
//               {isGenerating ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Generating PDF...
//                 </>
//               ) : (
//                 <>
//                   <Download className="mr-2 h-4 w-4" />
//                   Download PDF
//                 </>
//               )}
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-5">
//         <TabsList className="grid w-full grid-cols-2 md:w-fit">
//           <TabsTrigger value="edit" className="gap-2">
//             <FileText className="h-4 w-4" />
//             Form Builder
//           </TabsTrigger>
//           <TabsTrigger value="preview" className="gap-2">
//             <Eye className="h-4 w-4" />
//             Markdown Preview
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="edit" className="space-y-8">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//             <section className="rounded-2xl border bg-card p-5 shadow-sm">
//               <div className="mb-5">
//                 <h3 className="text-lg font-semibold">Contact Information</h3>
//                 <p className="text-sm text-muted-foreground">
//                   Add your personal and professional profile links.
//                 </p>
//               </div>

//               <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">Email</label>
//                   <Input
//                     {...register("contactInfo.email")}
//                     type="email"
//                     placeholder="your@email.com"
//                     className="rounded-xl"
//                   />
//                   {errors.contactInfo?.email && (
//                     <p className="text-sm text-red-500">
//                       {errors.contactInfo.email.message}
//                     </p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">Mobile Number</label>
//                   <Input
//                     {...register("contactInfo.mobile")}
//                     type="tel"
//                     placeholder="+91 9876543210"
//                     className="rounded-xl"
//                   />
//                   {errors.contactInfo?.mobile && (
//                     <p className="text-sm text-red-500">
//                       {errors.contactInfo.mobile.message}
//                     </p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">LinkedIn URL</label>
//                   <Input
//                     {...register("contactInfo.linkedin")}
//                     type="url"
//                     placeholder="https://linkedin.com/in/your-profile"
//                     className="rounded-xl"
//                   />
//                   {errors.contactInfo?.linkedin && (
//                     <p className="text-sm text-red-500">
//                       {errors.contactInfo.linkedin.message}
//                     </p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">Twitter/X URL</label>
//                   <Input
//                     {...register("contactInfo.twitter")}
//                     type="url"
//                     placeholder="https://x.com/your-handle"
//                     className="rounded-xl"
//                   />
//                   {errors.contactInfo?.twitter && (
//                     <p className="text-sm text-red-500">
//                       {errors.contactInfo.twitter.message}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </section>

//             <section className="rounded-2xl border bg-card p-5 shadow-sm">
//               <div className="mb-5">
//                 <h3 className="text-lg font-semibold">Professional Summary</h3>
//                 <p className="text-sm text-muted-foreground">
//                   Write a concise summary focused on your value, experience, and
//                   core strengths.
//                 </p>
//               </div>

//               <Controller
//                 name="summary"
//                 control={control}
//                 render={({ field }) => (
//                   <Textarea
//                     {...field}
//                     className="min-h-[140px] rounded-2xl"
//                     placeholder="Write a compelling professional summary..."
//                   />
//                 )}
//               />
//               {errors.summary && (
//                 <p className="mt-2 text-sm text-red-500">
//                   {errors.summary.message}
//                 </p>
//               )}
//             </section>

//             <section className="rounded-2xl border bg-card p-5 shadow-sm">
//               <div className="mb-5">
//                 <h3 className="text-lg font-semibold">Skills</h3>
//                 <p className="text-sm text-muted-foreground">
//                   Add technical skills, tools, frameworks, and domain strengths.
//                 </p>
//               </div>

//               <Controller
//                 name="skills"
//                 control={control}
//                 render={({ field }) => (
//                   <Textarea
//                     {...field}
//                     className="min-h-[140px] rounded-2xl"
//                     placeholder="JavaScript, TypeScript, React, Node.js, PostgreSQL, Prisma..."
//                   />
//                 )}
//               />
//               {errors.skills && (
//                 <p className="mt-2 text-sm text-red-500">
//                   {errors.skills.message}
//                 </p>
//               )}
//             </section>

//             <section className="rounded-2xl border bg-card p-5 shadow-sm">
//               <div className="mb-5 flex items-center gap-2">
//                 <Wand2 className="h-5 w-5 text-primary" />
//                 <div>
//                   <h3 className="text-lg font-semibold">Work Experience</h3>
//                   <p className="text-sm text-muted-foreground">
//                     Add your achievements and use AI to make them stronger.
//                   </p>
//                 </div>
//               </div>

//               <Controller
//                 name="experience"
//                 control={control}
//                 render={({ field }) => (
//                   <EntryForm
//                     type="Experience"
//                     entries={field.value}
//                     onChange={field.onChange}
//                   />
//                 )}
//               />
//               {errors.experience && (
//                 <p className="mt-2 text-sm text-red-500">
//                   {errors.experience.message}
//                 </p>
//               )}
//             </section>

//             <section className="rounded-2xl border bg-card p-5 shadow-sm">
//               <div className="mb-5">
//                 <h3 className="text-lg font-semibold">Education</h3>
//                 <p className="text-sm text-muted-foreground">
//                   Add degrees, colleges, dates, and key academic details.
//                 </p>
//               </div>

//               <Controller
//                 name="education"
//                 control={control}
//                 render={({ field }) => (
//                   <EntryForm
//                     type="Education"
//                     entries={field.value}
//                     onChange={field.onChange}
//                   />
//                 )}
//               />
//               {errors.education && (
//                 <p className="mt-2 text-sm text-red-500">
//                   {errors.education.message}
//                 </p>
//               )}
//             </section>

//             <section className="rounded-2xl border bg-card p-5 shadow-sm">
//               <div className="mb-5">
//                 <h3 className="text-lg font-semibold">Projects</h3>
//                 <p className="text-sm text-muted-foreground">
//                   Showcase real project impact, stack, and outcomes.
//                 </p>
//               </div>

//               <Controller
//                 name="projects"
//                 control={control}
//                 render={({ field }) => (
//                   <EntryForm
//                     type="Project"
//                     entries={field.value}
//                     onChange={field.onChange}
//                   />
//                 )}
//               />
//               {errors.projects && (
//                 <p className="mt-2 text-sm text-red-500">
//                   {errors.projects.message}
//                 </p>
//               )}
//             </section>
//           </form>
//         </TabsContent>

//         <TabsContent value="preview" className="space-y-4">
//           <div className="flex flex-wrap items-center justify-between gap-3">
//             <div className="max-w-2xl">
//               <h3 className="text-lg font-semibold">Markdown Resume</h3>
//               <p className="text-sm text-muted-foreground">
//                 Review or directly edit the final markdown before saving or
//                 exporting.
//               </p>
//             </div>

//             <Button
//               variant="outline"
//               type="button"
//               className="rounded-xl"
//               onClick={() =>
//                 setResumeMode(resumeMode === "preview" ? "edit" : "preview")
//               }
//             >
//               {resumeMode === "preview" ? (
//                 <>
//                   <Edit className="mr-2 h-4 w-4" />
//                   Edit Markdown
//                 </>
//               ) : (
//                 <>
//                   <Monitor className="mr-2 h-4 w-4" />
//                   Show Preview
//                 </>
//               )}
//             </Button>
//           </div>

//           {resumeMode !== "preview" && (
//             <div className="flex items-center gap-2 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-3 text-yellow-700 dark:text-yellow-300">
//               <AlertTriangle className="h-5 w-5" />
//               <span className="text-sm">
//                 If you manually edit markdown here and then change the form, the
//                 form-generated content may overwrite your manual edits.
//               </span>
//             </div>
//           )}

//           <div className="overflow-hidden rounded-2xl border shadow-sm">
//             <MDEditor
//               value={previewContent}
//               onChange={(value) => setPreviewContent(value || "")}
//               height={800}
//               preview={resumeMode}
//             />
//           </div>

//           <div className="hidden">
//             <div
//               id="resume-pdf"
//               className="bg-white p-8 text-black"
//               style={{ minHeight: "1122px", width: "794px" }}
//             >
//               <MDEditor.Markdown
//                 source={previewContent}
//                 style={{
//                   background: "white",
//                   color: "black",
//                   fontFamily: "Arial, sans-serif",
//                 }}
//               />
//             </div>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import { saveResume } from "@/actions/resume";
import { resumeSchema } from "@/app/lib/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Briefcase,
  GraduationCap,
  FolderGit2,
  Award,
  Trophy,
  User,
  FileText,
  Eye,
  Edit,
  Monitor,
  AlertTriangle,
  Save,
  Download,
  FileDown,
} from "lucide-react";

import ExperienceForm from "./experience-form";
import EducationForm from "./education-form";
import ProjectForm from "./project-form";
import CertificationForm from "./certification-form";
import AchievementForm from "./achievement-form";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

const MarkdownPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
);

function buildResumeMarkdown(values, userName) {
  const lines = [];

  lines.push(`# ${userName || "Your Name"}`);
  lines.push("");

  const contact = [];
  if (values?.contactInfo?.email) contact.push(`Email: ${values.contactInfo.email}`);
  if (values?.contactInfo?.mobile) contact.push(`Phone: ${values.contactInfo.mobile}`);
  if (values?.contactInfo?.linkedin) contact.push(`[LinkedIn](${values.contactInfo.linkedin})`);
  if (values?.contactInfo?.twitter) contact.push(`[Twitter](${values.contactInfo.twitter})`);

  if (contact.length) {
    lines.push(contact.join(" | "));
    lines.push("");
  }

  if (values?.summary) {
    lines.push("## Professional Summary");
    lines.push("");
    lines.push(values.summary);
    lines.push("");
  }

  if (values?.skills) {
    lines.push("## Skills");
    lines.push("");
    lines.push(values.skills);
    lines.push("");
  }

  if (values?.experience?.length) {
    lines.push("## Experience");
    lines.push("");

    values.experience.forEach((item) => {
      lines.push(
        `### ${item.title || "Role"}${
          item.organization ? ` - ${item.organization}` : ""
        }`
      );

      const meta = [
        item.location,
        item.startDate
          ? `${item.startDate} to ${item.current ? "Present" : item.endDate || "Present"}`
          : "",
        item.employmentType,
      ].filter(Boolean);

      if (meta.length) lines.push(meta.join(" | "));

      if (item.description) {
        lines.push("");
        lines.push(item.description);
      }

      lines.push("");
    });
  }

  if (values?.education?.length) {
    lines.push("## Education");
    lines.push("");

    values.education.forEach((item) => {
      lines.push(
        `### ${item.degree || "Degree"}${
          item.institution ? ` - ${item.institution}` : ""
        }`
      );

      const meta = [
        item.fieldOfStudy,
        item.location,
        item.startDate
          ? `${item.startDate} to ${item.current ? "Present" : item.endDate || "Present"}`
          : "",
        item.gpa ? `GPA: ${item.gpa}` : "",
      ].filter(Boolean);

      if (meta.length) lines.push(meta.join(" | "));

      if (item.achievements) {
        lines.push("");
        lines.push(item.achievements);
      }

      lines.push("");
    });
  }

  if (values?.projects?.length) {
    lines.push("## Projects");
    lines.push("");

    values.projects.forEach((item) => {
      lines.push(`### ${item.title || "Project"}${item.role ? ` - ${item.role}` : ""}`);

      const meta = [
        item.startDate ? `${item.startDate} to ${item.endDate || "Present"}` : "",
        item.technologies ? `Tech: ${item.technologies}` : "",
      ].filter(Boolean);

      if (meta.length) lines.push(meta.join(" | "));

      if (item.description) {
        lines.push("");
        lines.push(item.description);
      }

      const links = [];
      if (item.liveUrl) links.push(`[Live Project](${item.liveUrl})`);
      if (item.githubUrl) links.push(`[GitHub](${item.githubUrl})`);

      if (links.length) {
        lines.push("");
        lines.push(links.join(" | "));
      }

      lines.push("");
    });
  }

  if (values?.certifications?.length) {
    lines.push("## Certifications");
    lines.push("");

    values.certifications.forEach((item) => {
      lines.push(
        `- **${item.name || "Certification"}**${item.issuer ? ` - ${item.issuer}` : ""}`
      );

      const extra = [
        item.issueDate ? `Issued: ${item.issueDate}` : "",
        item.expiryDate ? `Expiry: ${item.expiryDate}` : "",
        item.credentialId ? `Credential ID: ${item.credentialId}` : "",
      ].filter(Boolean);

      if (extra.length) lines.push(`  - ${extra.join(" | ")}`);
      if (item.credentialUrl) lines.push(`  - [View Credential](${item.credentialUrl})`);
    });

    lines.push("");
  }

  if (values?.achievements?.length) {
    lines.push("## Achievements");
    lines.push("");

    values.achievements.forEach((item) => {
      lines.push(
        `- **${item.title || "Achievement"}**${item.issuer ? ` - ${item.issuer}` : ""}${
          item.date ? ` (${item.date})` : ""
        }`
      );

      if (item.description) {
        lines.push(`  - ${item.description}`);
      }
    });

    lines.push("");
  }

  return lines.join("\n");
}

export default function ResumeBuilder({
  userName = "Rishabh Yadav",
  initialContent = "",
  initialData = {},
}) {
  const [resumeMode, setResumeMode] = useState("preview");
  const [previewContent, setPreviewContent] = useState(initialContent || "");
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const form = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {
        email: initialData?.contactInfo?.email || "",
        mobile: initialData?.contactInfo?.mobile || "",
        linkedin: initialData?.contactInfo?.linkedin || "",
        twitter: initialData?.contactInfo?.twitter || "",
      },
      summary: initialData?.summary || "",
      skills: initialData?.skills || "",
      experience: initialData?.experience || [],
      education: initialData?.education || [],
      projects: initialData?.projects || [],
      certifications: initialData?.certifications || [],
      achievements: initialData?.achievements || [],
    },
  });

  const {
    register,
    watch,
    setValue,
    reset,
    formState: { errors },
    handleSubmit,
  } = form;

  const resumeValues = watch();

  useEffect(() => {
    reset({
      contactInfo: {
        email: initialData?.contactInfo?.email || "",
        mobile: initialData?.contactInfo?.mobile || "",
        linkedin: initialData?.contactInfo?.linkedin || "",
        twitter: initialData?.contactInfo?.twitter || "",
      },
      summary: initialData?.summary || "",
      skills: initialData?.skills || "",
      experience: initialData?.experience || [],
      education: initialData?.education || [],
      projects: initialData?.projects || [],
      certifications: initialData?.certifications || [],
      achievements: initialData?.achievements || [],
    });
  }, [initialData, reset]);

  const generatedMarkdown = useMemo(() => {
    return buildResumeMarkdown(resumeValues, userName);
  }, [resumeValues, userName]);

  useEffect(() => {
    if (resumeMode === "preview") {
      setPreviewContent(generatedMarkdown);
    }
  }, [generatedMarkdown, resumeMode]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSaving(true);

      const payload = {
        ...data,
        markdown: previewContent || generatedMarkdown,
      };

      const result = await saveResume(payload);

      if (!result?.success) {
        throw new Error(result?.error || "Failed to save");
      }

      toast.success("Resume saved successfully!");
    } catch (error) {
      toast.error(error?.message || "Failed to save resume");
    } finally {
      setIsSaving(false);
    }
  });

  const handleDownloadMarkdown = () => {
    try {
      const blob = new Blob([previewContent], {
        type: "text/markdown;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${
        userName?.replace(/\s+/g, "-").toLowerCase() || "resume"
      }.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Markdown downloaded");
    } catch (error) {
      console.error(error);
      toast.error("Failed to download markdown");
    }
  };

  const handleDownloadPdf = async () => {
  try {
    setIsDownloadingPdf(true);

    const element = document.getElementById("resume-pdf");
    if (!element) {
      toast.error("Resume PDF content not found");
      return;
    }

    // ✅ FORCE SAFE COLORS (VERY IMPORTANT)
    element.style.background = "#ffffff";
    element.style.color = "#000000";

    const html2pdf = (await import("html2pdf.js")).default;

    await html2pdf()
      .set({
        margin: 10,
        filename: "resume.pdf",
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      })
      .from(element)
      .save();

    toast.success("PDF downloaded");
  } catch (error) {
    console.error(error);
    toast.error("Failed to download PDF");
  } finally {
    setIsDownloadingPdf(false);
  }
};

  

  return (
    <form onSubmit={onSubmit} className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <Tabs defaultValue="form" className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-2 rounded-2xl">
            <TabsTrigger
              value="form"
              className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <FileText className="mr-2 h-4 w-4" />
              Form Builder
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Eye className="mr-2 h-4 w-4" />
              Resume Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="space-y-8">
            <Card className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
              <CardHeader className="bg-gradient-to-r from-muted/50 to-transparent px-6 py-4">
                <CardTitle className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <User className="h-5 w-5" />
                  </div>
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    {...register("contactInfo.email")}
                    placeholder="name@example.com"
                    className="h-11 rounded-xl"
                  />
                  {errors.contactInfo?.email && (
                    <p className="text-sm font-medium text-red-500">
                      {errors.contactInfo.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input
                    id="mobile"
                    {...register("contactInfo.mobile")}
                    placeholder="+91 98765 43210"
                    className="h-11 rounded-xl"
                  />
                  {errors.contactInfo?.mobile && (
                    <p className="text-sm font-medium text-red-500">
                      {errors.contactInfo.mobile.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    {...register("contactInfo.linkedin")}
                    placeholder="linkedin.com/in/yourprofile"
                    className="h-11 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter/X</Label>
                  <Input
                    id="twitter"
                    {...register("contactInfo.twitter")}
                    placeholder="twitter.com/yourhandle"
                    className="h-11 rounded-xl"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
              <CardHeader className="bg-gradient-to-r from-muted/50 to-transparent px-6 py-4">
                <CardTitle>Professional Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Textarea
                  rows={6}
                  {...register("summary")}
                  placeholder="Write your summary..."
                  className="min-h-[140px] rounded-2xl"
                />
                {errors.summary && (
                  <p className="mt-2 text-sm font-medium text-red-500">
                    {errors.summary.message}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
              <CardHeader className="bg-gradient-to-r from-muted/50 to-transparent px-6 py-4">
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Textarea
                  rows={4}
                  {...register("skills")}
                  placeholder="React, Node.js, PostgreSQL..."
                  className="min-h-[120px] rounded-2xl"
                />
                {errors.skills && (
                  <p className="mt-2 text-sm font-medium text-red-500">
                    {errors.skills.message}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
              <CardHeader className="bg-gradient-to-r from-muted/50 to-transparent px-6 py-4">
                <CardTitle className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  Professional Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ExperienceForm
                  entries={resumeValues.experience || []}
                  onChange={(value) => setValue("experience", value)}
                />
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
              <CardHeader className="bg-gradient-to-r from-muted/50 to-transparent px-6 py-4">
                <CardTitle className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <EducationForm
                  entries={resumeValues.education || []}
                  onChange={(value) => setValue("education", value)}
                />
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
              <CardHeader className="bg-gradient-to-r from-muted/50 to-transparent px-6 py-4">
                <CardTitle className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FolderGit2 className="h-5 w-5" />
                  </div>
                  Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ProjectForm
                  entries={resumeValues.projects || []}
                  onChange={(value) => setValue("projects", value)}
                />
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
              <CardHeader className="bg-gradient-to-r from-muted/50 to-transparent px-6 py-4">
                <CardTitle className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Award className="h-5 w-5" />
                  </div>
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <CertificationForm
                  entries={resumeValues.certifications || []}
                  onChange={(value) => setValue("certifications", value)}
                />
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
              <CardHeader className="bg-gradient-to-r from-muted/50 to-transparent px-6 py-4">
                <CardTitle className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Trophy className="h-5 w-5" />
                  </div>
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <AchievementForm
                  entries={resumeValues.achievements || []}
                  onChange={(value) => setValue("achievements", value)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="max-w-2xl">
                <h3 className="text-lg font-semibold">Markdown Resume</h3>
                <p className="text-sm text-muted-foreground">
                  Review, edit, save, or download your resume.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl"
                  onClick={() =>
                    setResumeMode(resumeMode === "preview" ? "edit" : "preview")
                  }
                >
                  {resumeMode === "preview" ? (
                    <>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Markdown
                    </>
                  ) : (
                    <>
                      <Monitor className="mr-2 h-4 w-4" />
                      Show Preview
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl"
                  onClick={handleDownloadMarkdown}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download .md
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl"
                  onClick={handleDownloadPdf}
                  disabled={isDownloadingPdf}
                >
                  <FileDown className="mr-2 h-4 w-4" />
                  {isDownloadingPdf ? "Downloading..." : "Download PDF"}
                </Button>

                <Button
                  type="submit"
                  className="rounded-xl"
                  disabled={isSaving}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Resume"}
                </Button>
              </div>
            </div>

            {resumeMode !== "preview" && (
              <div className="flex items-center gap-2 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-3 text-yellow-700 dark:text-yellow-300">
                <AlertTriangle className="h-5 w-5" />
                <span className="text-sm">
                  If you manually edit markdown here and then change the form,
                  the generated content may overwrite your manual edits.
                </span>
              </div>
            )}

            <div
              data-color-mode="dark"
              className="overflow-hidden rounded-2xl border border-border bg-[#0b0b0c] shadow-sm"
            >
              <MDEditor
                value={previewContent}
                onChange={(value) => setPreviewContent(value || "")}
                height={800}
                preview={resumeMode}
                visibleDragbar={false}
              />
            </div>

            <div className="hidden">
              <div
                id="resume-pdf"
                className="bg-white p-8 text-black"
                style={{
                  minHeight: "1122px",
                  width: "794px",
                  fontFamily:
                    "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  fontSize: "12px",
                  lineHeight: "1.6",
                }}
              >
                <MarkdownPreview
                  source={previewContent}
                  style={{
                    background: "#ffffff",
                    color: "#111111",
                    fontFamily:
                      "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    fontSize: "12px",
                  }}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <style jsx global>{`
  .w-md-editor {
    background: #0b0b0c !important;
    color: #f3f4f6 !important;
  }

  .w-md-editor-toolbar {
    background: #111214 !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
  }

  .w-md-editor-toolbar button {
    color: #d1d5db !important;
  }

  .w-md-editor-toolbar button:hover {
    background: rgba(255, 255, 255, 0.08) !important;
  }

  .w-md-editor-text-pre,
  .w-md-editor-text-input,
  .w-md-editor-text {
    background: #0b0b0c !important;
    color: #f3f4f6 !important;
  }

  .wmde-markdown,
  .wmde-markdown-var {
    background: #0b0b0c !important;
    color: #f3f4f6 !important;
  }

  .wmde-markdown h1,
  .wmde-markdown h2,
  .wmde-markdown h3,
  .wmde-markdown h4,
  .wmde-markdown h5,
  .wmde-markdown h6 {
    color: #ffffff !important;
    border-bottom-color: rgba(255, 255, 255, 0.12) !important;
  }

  .wmde-markdown hr {
    border-color: rgba(255, 255, 255, 0.12) !important;
  }

  .wmde-markdown blockquote {
    color: #cbd5e1 !important;
    border-left-color: #3b82f6 !important;
    background: rgba(255, 255, 255, 0.03) !important;
  }

  .wmde-markdown code,
  .wmde-markdown pre {
    background: #111214 !important;
  }

  .wmde-markdown a {
    color: #60a5fa !important;
  }

 #resume-pdf * {
  color: #000 !important;
  background: #fff !important;
}

  #resume-pdf h1 {
    font-size: 28px !important;
    font-weight: 700 !important;
    margin: 0 0 12px 0 !important;
    color: #1a1a1a !important;
    text-align: center !important;
    border-bottom: none !important;
  }

  #resume-pdf h2 {
    font-size: 18px !important;
    font-weight: 600 !important;
    margin: 24px 0 12px 0 !important;
    color: #1a1a1a !important;
    border-bottom: 2px solid #e5e5e5 !important;
    padding-bottom: 6px !important;
  }

  #resume-pdf h3 {
    font-size: 14px !important;
    font-weight: 600 !important;
    margin: 16px 0 8px 0 !important;
    color: #1a1a1a !important;
    border-bottom: none !important;
  }

  #resume-pdf p,
  #resume-pdf li {
    margin: 4px 0 !important;
    color: #333333 !important;
  }

  #resume-pdf ul {
    padding-left: 20px !important;
  }

  #resume-pdf strong {
    color: #111111 !important;
  }

  #resume-pdf a {
    color: #0066cc !important;
    text-decoration: underline !important;
  }

  #resume-pdf hr {
    border-color: #e5e5e5 !important;
  }

  #resume-pdf code,
  #resume-pdf pre {
    background: #f5f5f5 !important;
    color: #111111 !important;
  }

  #resume-pdf blockquote {
    color: #444444 !important;
    border-left: 4px solid #d1d5db !important;
    background: #f9fafb !important;
    padding: 8px 12px !important;
  }
`}</style>

    </form>
  );
}
