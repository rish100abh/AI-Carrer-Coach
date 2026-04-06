import next from "next";
import { inngest } from "./client";
import { db } from "../prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const models = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

export const generateIndustryInsights = inngest.createFunction(
    {name: "Generate Industry Insights"},
    {cron: "0 0 * * 0"}, // Run daily at midnight
    async ({step})=>{
        const industries = await step.run("Fetch Industries", async()=>{
            return await db.industryInsights.findMany({
                select: {
                    industry: true,
                },
            });
    });

    for(const { industry } of industries){
        const prompt = `
Analyze the current state of the ${industry} industry and provide insights
in the following JSON format without any additional notes or explanations:

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
Return ONLY JSON.
Include at least 5 roles, skills, and trends.
Growth rate should be a percentage.
`;

const res = await step.ai.wrap("gemini",async (p)=>{
    return await models.generateContent(p);
}, prompt);

const text = res.response.candidates[0].content.text || "";

const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
const insights = JSON.parse(cleanedText);

await step.run(`Update ${industry} Insights`, async()=>{
    await db.industryInsights.update({
        where: { industry },
        data: {
            ...insights,
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Schedule next update in 7 days
        },
    });
});

}
}
);