import { z } from "zod";

export const onboardingSchema = z.object({
  industry: z.string({
    required_error: "Please select an industry",
  }),

  subIndustry: z.string({
    required_error: "Please select a specialization",
  }),

  bio: z.string().max(500).optional(),

  experience: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(
      z
        .number()
        .min(0, "Experience must be at least 0 years")
        .max(50, "Experience cannot exceed 50 years")
    ),

  skills: z
    .string()
    .transform((val) =>
      val
        ? val
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean)
        : []
    ),
});


// export const contactSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   mobile: z.string().optional(),
//   linkedin: z.string().optional(),
//   twitter: z.string().optional(),
// });

// export const entrySchema = z
//   .object({
//     title: z.string().min(1, "Title is required"),
//     organization: z.string().min(1, "Organization is required"),
//     startDate: z.string().min(1, "Start date is required"),
//     endDate: z.string().optional(),
//     description: z.string().min(1, "Description is required"),
//     current: z.boolean().default(false),
//   })
//   .refine(
//     (data) => {
//       if (!data.current && !data.endDate) {
//         return false;
//       }
//       return true;
//     },
//     {
//       message: "End date is required unless this is your current position",
//       path: ["endDate"],
//     }
//   );

// export const resumeSchema = z.object({
//   contactInfo: contactSchema,
//   summary: z.string().min(1, "Professional summary is required"),
//   skills: z.string().min(1, "Skills are required"),
//   experience: z.array(entrySchema),
//   education: z.array(entrySchema),
//   projects: z.array(entrySchema),
// });

// export const coverLetterSchema = z.object({
//   companyName: z.string().min(1, "Company name is required"),
//   jobTitle: z.string().min(1, "Job title is required"),
//   jobDescription: z.string().min(1, "Job description is required"),
// });

// import { z } from "zod";

// export const contactSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   mobile: z.string().optional(),
//   linkedin: z
//     .string()
//     .optional()
//     .refine((val) => !val || val.startsWith("http"), {
//       message: "LinkedIn URL must be a valid link",
//     }),
//   twitter: z
//     .string()
//     .optional()
//     .refine((val) => !val || val.startsWith("http"), {
//       message: "Twitter/X URL must be a valid link",
//     }),
// });

// export const entrySchema = z
//   .object({
//     title: z.string().min(1, "Title is required"),
//     organization: z.string().min(1, "Organization is required"),
//     startDate: z.string().min(1, "Start date is required"),
//     endDate: z.string().optional(),
//     description: z.string().min(1, "Description is required"),
//     current: z.boolean().default(false),
//   })
//   .refine(
//     (data) => {
//       if (!data.current && !data.endDate) {
//         return false;
//       }
//       return true;
//     },
//     {
//       message: "End date is required unless this is your current position",
//       path: ["endDate"],
//     }
//   );

// export const resumeSchema = z.object({
//   contactInfo: contactSchema,
//   summary: z.string().min(1, "Professional summary is required"),
//   skills: z.string().min(1, "Skills are required"),
//   experience: z.array(entrySchema),
//   education: z.array(entrySchema),
//   projects: z.array(entrySchema),
// });

// export const coverLetterSchema = z.object({
//   companyName: z.string().min(1, "Company name is required"),
//   jobTitle: z.string().min(1, "Job title is required"),
//   jobDescription: z.string().min(1, "Job description is required"),
// });


const emptyStringToUndefined = z.literal("").transform(() => undefined);

const optionalText = z.string().trim().optional().or(emptyStringToUndefined);

const optionalUrl = z
  .string()
  .trim()
  .url("Must be a valid URL")
  .optional()
  .or(emptyStringToUndefined);

const optionalMonth = z.string().trim().optional().or(emptyStringToUndefined);

export const contactSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address"),

  mobile: z
    .string()
    .trim()
    .optional()
    .or(emptyStringToUndefined)
    .refine((val) => !val || val.replace(/\D/g, "").length >= 10, {
      message: "Mobile number must be valid",
    }),

  linkedin: optionalUrl.refine(
    (val) => !val || val.includes("linkedin.com"),
    {
      message: "LinkedIn URL must be a valid LinkedIn link",
    }
  ),

  twitter: optionalUrl.refine(
    (val) =>
      !val || val.includes("twitter.com") || val.includes("x.com"),
    {
      message: "Twitter/X URL must be a valid link",
    }
  ),
});

export const experienceSchema = z
  .object({
    title: z.string().trim().min(1, "Job title is required"),
    organization: z.string().trim().min(1, "Company name is required"),
    location: optionalText,
    employmentType: optionalText,
    startDate: z.string().trim().min(1, "Start date is required"),
    endDate: optionalMonth,
    description: z.string().trim().min(1, "Description is required"),
    current: z.boolean().default(false),
  })
  .refine((data) => data.current || !!data.endDate, {
    message: "End date is required unless this is your current position",
    path: ["endDate"],
  });

export const educationSchema = z
  .object({
    degree: z.string().trim().min(1, "Degree is required"),
    institution: z.string().trim().min(1, "Institution is required"),
    location: optionalText,
    startDate: z.string().trim().min(1, "Start date is required"),
    endDate: optionalMonth,
    current: z.boolean().default(false),
    gpa: optionalText,
    fieldOfStudy: optionalText,
    achievements: optionalText,
    description: optionalText,
  })
  .refine((data) => data.current || !!data.endDate, {
    message: "End date is required unless this is your current education",
    path: ["endDate"],
  });

export const projectSchema = z.object({
  title: z.string().trim().min(1, "Project title is required"),
  role: optionalText,
  startDate: optionalMonth,
  endDate: optionalMonth,
  technologies: z.string().trim().min(1, "Technologies are required"),
  liveUrl: optionalUrl,
  githubUrl: optionalUrl,
  description: z.string().trim().min(1, "Project description is required"),
});

export const certificationSchema = z.object({
  name: z.string().trim().min(1, "Certification name is required"),
  issuer: z.string().trim().min(1, "Issuer is required"),
  issueDate: z.string().trim().min(1, "Issue date is required"),
  expiryDate: optionalMonth,
  credentialId: optionalText,
  credentialUrl: optionalUrl,
});

export const achievementSchema = z.object({
  title: z.string().trim().min(1, "Achievement title is required"),
  issuer: optionalText,
  date: optionalMonth,
  description: z.string().trim().min(1, "Achievement description is required"),
});

export const resumeSchema = z.object({
  contactInfo: contactSchema,
  summary: z.string().trim().min(1, "Professional summary is required"),
  skills: z.string().trim().min(1, "Skills are required"),
  experience: z.array(experienceSchema).default([]),
  education: z.array(educationSchema).default([]),
  projects: z.array(projectSchema).default([]),
  certifications: z.array(certificationSchema).default([]),
  achievements: z.array(achievementSchema).default([]),
});

export const coverLetterSchema = z.object({
  companyName: z.string().trim().min(1, "Company name is required"),
  jobTitle: z.string().trim().min(1, "Job title is required"),
  jobDescription: z.string().trim().min(1, "Job description is required"),
});
