"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ✅ Fixed: Template strings now use function parameters instead of undefined ${type}, ${user.role}, etc.
// ✅ Added type parameter to all prompt functions for consistency
const IMPROVEMENT_PROMPTS = {
  experience: {
    junior: (type, role, industry, keywords, current) => `
You are an expert resume writer with 15+ years helping tech professionals land FAANG jobs. 
Rewrite this ${type} description for a **JUNIOR** ${role || 'professional'} in ${industry || 'tech'}.

TASK: Transform generic responsibilities into **quantifiable achievements** using:
1. **STAR method** (Situation→Task→Action→Result)
2. **Power verbs** (Engineered, Optimized, Delivered, Scaled, etc.)
3. **Metrics** (increased X by Y%, reduced Z by W hours, supported N users)
4. **Technical impact** (improved performance 40%, cut costs $50K)

Current: "${current}"

Output ONLY the improved bullet point (1 line, 1-2 sentences max). 
Make it ATS-friendly with industry keywords: ${keywords || 'React, Node.js, AWS, Docker'}.
`,

    mid: (type, role, industry, keywords, current) => `
You are a senior tech recruiter who screens 1000+ resumes yearly. 
Rewrite this ${type} description for a **MID-LEVEL** ${role || 'engineer'} with 3-7 years experience.

CRITICAL: Replace "responsible for" with **achievement-focused** language:
- "Managed team" → "Led 5-person team to deliver $2M project 20% under budget"
- "Used React" → "Built React dashboard serving 10K daily users, 99.9% uptime"

Current: "${current}"

Output ONLY 1 powerful bullet point. Include:
• 1-2 **hard metrics** (%, $, users, time saved)
• 1 **technical skill** from job description
• 1 **business result**
ATS keywords: ${keywords || 'TypeScript, PostgreSQL, CI/CD, Kubernetes'}
`,

    senior: (type, role, industry, keywords, current) => `
You are a CTO with hiring experience at Google/Microsoft. 
Rewrite for **SENIOR/LEAD** ${role || 'engineer'} (7+ years).

Transform into executive-level impact statement:
Current: "${current}"

→ Target format: "Led [SCOPE] → Delivered [RESULT] → Impacted [METRIC]"

Examples:
- "Maintained codebase" → "Architected microservices platform handling 1M+ req/min, 99.99% uptime"
- "Coded features" → "Designed payment system processing $100M annually, reducing fraud 87%"

Output ONLY the executive bullet. Max 24 words.
`
  }
};

export async function saveResume(payload) {
  try {
    const { userId } = await auth();
   if (!userId) {
  return { success: false, error: "Unauthorized. Please sign in." };
}

   let user = await db.user.findUnique({
  where: { clerkUserId: userId },
});

if (!user) {
  user = await db.user.create({
    data: {
      clerkUserId: userId,
    },
  });
}

    const dataToStore = {
      markdown: payload.markdown || "",
      contactInfo: payload.contactInfo || {},
      summary: payload.summary || "",
      skills: payload.skills || "",
      experience: payload.experience || [],
      education: payload.education || [],
      projects: payload.projects || [],
      certifications: payload.certifications || [],
      achievements: payload.achievements || [],
    };

let resume = await db.resume.findUnique({
  where: { userId: user.id },
});

if (resume) {
  // ✅ UPDATE EXISTING
  resume = await db.resume.update({
    where: { userId: user.id },
    data: {
      content: JSON.stringify(dataToStore),
    },
  });
} else {
  // ✅ CREATE NEW
  resume = await db.resume.create({
    data: {
      userId: user.id,
      content: JSON.stringify(dataToStore),
    },
  });
}

    revalidatePath("/resume");

    return {
      success: true,
      resume,
    };
  } catch (error) {
    console.error("❌ Save resume error:", error);
    return {
      error: "Failed to save resume. Please try again.",
    };
  }
}

export async function getResume() {
  try {
    const { userId } = await auth();
  if (!userId) {
  return { success: false, error: "Unauthorized. Please sign in." };
}

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      return { success: false, error: "User profile not found." };
    }

    const resume = await db.resume.findUnique({
      where: { userId: user.id },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!resume) {
      return {
        success: true,
        resume: null,
      };
    }

    let parsedData = {};

    try {
      parsedData = resume.content ? JSON.parse(resume.content) : {};
    } catch {
      parsedData = {
        markdown: resume.content || "",
      };
    }

    return {
      success: true,
      resume: {
        id: resume.id,
        content: resume.content || "",
        markdown: parsedData.markdown || resume.content || "",
        contactInfo: parsedData.contactInfo || {},
        summary: parsedData.summary || "",
        skills: parsedData.skills || "",
        experience: parsedData.experience || [],
        education: parsedData.education || [],
        projects: parsedData.projects || [],
        certifications: parsedData.certifications || [],
        achievements: parsedData.achievements || [],
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt,
      },
    };
  } catch (error) {
    console.error("❌ Get resume error:", error);
    return { error: "Failed to fetch resume." };
  }
}

export async function improveWithAI({ current, type = "experience", level = "mid" }) {
  try {
    const { userId } = await auth();
   if (!userId) {
  return { success: false, error: "Unauthorized. Please sign in." };
}

  const user = await db.user.findUnique({
  where: { clerkUserId: userId },
});

    if (!user) {
  return { success: false, error: "User profile not found." };
}

    if (!current?.trim()) {
      return { error: "No content provided to improve." };
    }

    if (current.trim().length < 10) {
      return { error: "Content too short. Please provide more details." };
    }

    // ✅ Fixed: Use function with parameters to avoid undefined template variables
    const promptFn = IMPROVEMENT_PROMPTS.experience[level] || IMPROVEMENT_PROMPTS.experience.mid;
    const systemPrompt = promptFn(
  type,
  user?.role || "software developer",
  user?.industry || "tech",
  user?.industryKeywords || "React, Node.js, PostgreSQL",
  current
);
    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
      ],
      temperature: 0.1,
      max_tokens: 150,
    });

    const improvedContent = chatCompletion.choices[0]?.message?.content?.trim();
    
    if (!improvedContent) {
      return { 
        error: "AI failed to generate improvement. Please try again.",
        original: current 
      };
    }

    // ✅ Validate improvement quality
    const isBetter = improvedContent.length > current.length * 0.8 && 
                     !improvedContent.includes("Current") &&
                     improvedContent.match(/[0-9%$\s]/);

    return {
      success: true,
      original: current,
      improved: improvedContent,
      isBetter,
      stats: {
        originalLength: current.length,
        improvedLength: improvedContent.length,
        wordCount: improvedContent.split(/\s+/).length,
      },
    };

  } catch (error) {
    console.error("❌ AI improvement error:", error);
    
    if (error.status === 429) {
      return { 
        error: "Rate limit reached. Please wait before trying again.",
        original: current 
      };
    }
    
    return { 
  success: false,
  error: "AI service temporarily unavailable",
  original: current 
};
  }
}

// ✅ Fixed: Removed undefined ${type} - now takes type as parameter
export async function analyzeResumeSection(content, type = "section") {
  try {
    const { userId } = await auth();
    if (!userId) return { error: "Unauthorized" };

    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `
You are a senior tech recruiter. Analyze this resume ${type} section and return:
1. Overall score (1-10)
2. Top 3 strengths
3. Top 3 areas for improvement
4. ATS compatibility score (1-10)
5. 2-3 suggested keywords to add

Format as JSON only.
          `,
        },
        { role: "user", content },
      ],
      temperature: 0.3,
    });

    const analysisContent = chatCompletion.choices[0].message.content;
    const analysis = JSON.parse(analysisContent);

    return {
      success: true,
      analysis,
    };
  } catch (error) {
    console.error("Analysis error:", error);
    return { error: "Analysis failed" };
  }
}