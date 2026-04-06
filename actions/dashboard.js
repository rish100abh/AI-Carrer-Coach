// "use server";

// import { db } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// const model = genAI.getGenerativeModel({
//   model: "gemini-pro",
// });

// // AI GENERATION FUNCTION
// export const generateAIInsights = async (industry) => {
//   const prompt = `
// Analyze the current state of the ${industry} industry and return ONLY JSON:

// {
//   "salaryRanges": [
//     { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
//   ],
//   "growthRate": number,
//   "demandLevel": "HIGH" | "MEDIUM" | "LOW",
//   "topSkills": ["skill1","skill2"],
//   "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
//   "keyTrends": ["trend1","trend2"],
//   "recommendedSkills": ["skill1","skill2"]
// }

// Return ONLY JSON.
// `;

//   try {
//     const result = await model.generateContent({
//       contents: [
//         {
//           role: "user",
//           parts: [{ text: prompt }],
//         },
//       ],
//     });

//     const response = await result.response;
//     const text = response.text();

//     const cleanedText = text
//       .replace(/```json/g, "")
//       .replace(/```/g, "")
//       .trim();

//     return JSON.parse(cleanedText);

//   } catch (error) {
//     console.error("Gemini AI Error:", error);

//     return {
//       salaryRanges: [],
//       growthRate: 10,
//       demandLevel: "HIGH",
//       topSkills: ["Communication", "Problem Solving"],
//       marketOutlook: "POSITIVE",
//       keyTrends: ["AI Adoption", "Automation"],
//       recommendedSkills: ["Leadership", "Technical Skills"]
//     };
//   }
// };



// // MAIN DASHBOARD FUNCTION
// export const getIndustryInsights = async () => {

//   const { userId } = await auth();

//   if (!userId) {
//     throw new Error("Unauthorized");
//   }

//   // find user in database
//   const user = await db.user.findUnique({
//     where: { clerkUserId: userId },
//   });

//   if (!user || !user.industry) {
//     throw new Error("User industry not found");
//   }

//   // generate insights using AI
//   const insights = await generateAIInsights(user.industry);

//   return {
//     ...insights,
//     lastUpdated: new Date(),
//     nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//   };
// };

// "use server";

// import { db } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// // import { generateAIInsights } from "./dashboard";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
// const model = genAI.getGenerativeModel({
//   model: "gemini-2.0-flash",
// });

// export const generateAIInsights = async (industry) => {
//   const prompt = `
//   Analyze the current state of the ${industry} industry and provide insights
//   in the following JSON format without any additional notes or explanations:
//   {
//     "salaryRanges": [
//       { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
//     ],
//     "growthRate": number,
//     "demandLevel": "HIGH" | "MEDIUM" | "LOW",
//     "topSkills": ["skill1","skill2"],
//     "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
//     "keyTrends": ["trend1","trend2"],
//     "recommendedSkills": ["skill1","skill2"]
//   }

//   IMPORTANT: Return ONLY the JSON. No additional text,notes, or markdown formatting.
//   Include at least 5 common roles for salary ranges.
//   Growth rate should be a percentage.
//   Include at least 5 skills and trends.
//   `;

//   const result = await model.generateContent(prompt);
//   const response =result.response;
//   const text = response.text();

//   const cleanedText = text.replace(/```(?:json)?\n/g,"").trim();
//   return JSON.parse(cleanedText);
// };



// export async function getIndustryInsights() {
//   const { userId } = await auth();

//   if (!userId) throw new Error("Unauthorized");

//   const user = await db.user.findUnique({
//     where: { clerkUserId: userId },
//   });

//   if (!user) {
//     throw new Error("User industry not found");
//   }
  
//   if(!user.industryInsight){
//     const insights = await generateAIInsights(user.industry);
    
//     const industryInsight = await db.industryInsight.create({
//       data: {
//         industry: user.industry,
//         ...insights,
//         nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//       },
//     });

//     return industryInsight;
//   }

//   return user.industryInsight;

// }






// "use server";

// import { db } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
//   const model = genAI.getGenerativeModel({
//     model: "gemini-2.0-flash",
//   });

// export const generateAIInsights = async (industry) => {
  


//   const prompt = `
// Analyze the current state of the ${industry} industry and provide insights
// in the following JSON format without any additional notes or explanations:

// {
//   "salaryRanges": [
//     { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
//   ],
//   "growthRate": number,
//   "demandLevel": "HIGH" | "MEDIUM" | "LOW",
//   "topSkills": ["skill1","skill2"],
//   "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
//   "keyTrends": ["trend1","trend2"],
//   "recommendedSkills": ["skill1","skill2"]
// }

// IMPORTANT:
// Return ONLY JSON.
// Include at least 5 roles, skills, and trends.
// Growth rate should be a percentage.
// `;


//   try {

//     const result = await model.generateContent(prompt);
//     const text = result.response.text();

//     const cleanedText = text
//       .replace(/```json/g, "")
//       .replace(/```/g, "")
//       .trim();

//     return JSON.parse(cleanedText);

//   } catch (error) {

//     console.error("Gemini Error:", error.message);

//     //Retry if rate limited
//     if (error.status === 429) {

//       console.log("Rate limit hit. Retrying in 40 seconds...");

//       await new Promise((resolve) => setTimeout(resolve, 10000));

//       try {

//         const retry = await model.generateContent(prompt);
//         const text = retry.response.text();

//         const cleanedText = text
//           .replace(/```json/g, "")
//           .replace(/```/g, "")
//           .trim();

//         return JSON.parse(cleanedText);

//       } catch (retryError) {
//         console.error("Retry failed:", retryError.message);
//       }
//     }
    

//     // fallback data so app never crashes
//     return {
//   salaryRanges: [
//     {
//       role: "Software Engineer",
//       min: 50000,
//       max: 100000,
//       median: 75000,
//       location: "Global"
//     }
//   ],
//   growthRate: 10,
//   demandLevel: "MEDIUM",
//   topSkills: [
//     "Communication",
//     "Problem Solving",
//     "Adaptability",
//     "Technical Skills",
//     "Teamwork"
//   ],
//   marketOutlook: "NEUTRAL",
//   keyTrends: [
//     "AI Integration",
//     "Remote Work",
//     "Sustainability",
//     "Automation",
//     "Upskilling"
//   ],
//   recommendedSkills: [
//     "Leadership",
//     "Data Analysis",
//     "Project Management",
//     "Technical Skills",
//     "Critical Thinking"
//   ]
// };
//   }
// };


// export async function getIndustryInsights() {

//   const { userId } = await auth();

//   if (!userId) throw new Error("Unauthorized");

//   const user = await db.user.findUnique({
//     where: { clerkUserId: userId },
//     include: { industryInsight: true },
//   });

//   if (!user) {
//     throw new Error("User not found");
//   }

//   // if insights already exist
//   if (user.industryInsight) {
//     return user.industryInsight;
//   }

//   const insights = await generateAIInsights(user.industry);

//   const industryInsight = await db.industryInsight.create({
//     data: {
//       industry: user.industry,
//       ...insights,
//       nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//       userId: user.id,
//     },
//   });

//   return industryInsight;
// }
"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generateAIInsights = async (industry) => {

  const prompt = `
Analyze the current state of the ${industry} industry and provide insights
in the following JSON format.

Return ONLY valid JSON.

{
  "salaryRanges": [
    { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
  ],
  "growthRate": number,
  "demandLevel": "HIGH" | "MEDIUM" | "LOW",
  "topSkills": ["skill1","skill2"],
  "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
  "keyTrends": ["trend1","trend2"],
  "recommendedSkills": ["skill1","skill2"]
}

IMPORTANT:
- Include at least 5 roles
- Include at least 5 skills
- Include at least 5 trends
`;

  try {

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.1-8b-instant",   // ✅ Updated model
      temperature: 0.3,
    });

    const text = completion.choices[0].message.content;

    const cleanedText = text
      ?.replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      return JSON.parse(cleanedText);
    } catch (err) {
      console.error("JSON Parse Error:", cleanedText);
      throw new Error("Invalid AI JSON response");
    }

  } catch (error) {

    console.error("Groq AI Error:", error.message);
    throw new Error("AI generation failed");

  }
};


export async function getIndustryInsights() {

  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: { industryInsight: true },
  });

  if (!user) throw new Error("User not found");

  // Return cached insights
  if (user.industryInsight) {
    return user.industryInsight;
  }

  const insights = await generateAIInsights(user.industry);

  const industryInsight = await db.industryInsight.create({
    data: {
      industry: user.industry,
      ...insights,
      nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      userId: user.id,
    },
  });

  return industryInsight;
}