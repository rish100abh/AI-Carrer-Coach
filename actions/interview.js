// "use server"

// import { db } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// import Groq from "groq-sdk";
// import { ca } from "zod/v4/locales";

// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY,
// });


// export async function generateQuiz(){
//     const { userId } = await auth();
    
//     if (!userId) throw new Error("Unauthorized");

//     const user = await db.user.findUnique({
//         where: { clerkUserId: userId },
//     });

//     if (!user) throw new Error("User not found");

//     const prompt =`Generate  10 technical interview questions for a ${user.industry}
//     professinals${user.skills?.length ?  ` with expertise in ${user.skills.join(", ")}` : ""}.

//     Each question should be multiple choice with 4 options.

//     Return the response in the following JSON format only, no additional text:
//     {
//       "questions": [
//         {
//           "question": "string",
//           "options":["string","string","string","string"],
//           "correctAnswer": "string",
//             "explanation": "string"
// }
// ]
// }
// `;

//  try {

//     const completion = await groq.chat.completions.create({
//       messages: [
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//       model: "llama-3.1-8b-instant",   // ✅ Updated model
//       temperature: 0.3,
//     });

//     const text = completion.choices[0].message.content;

//     const cleanedText = text
//       ?.replace(/```json/g, "")
//       .replace(/```/g, "")
//       .trim();

//     try {
//       const quiz = JSON.parse(cleanedText);
//       return quiz.questions || [];
//     } catch (err) {
//       console.error("JSON Parse Error:", cleanedText);
//       throw new Error("Invalid AI JSON response");
//     }

//   } catch (error) {

//     console.error("Groq AI Error:", error.message);
//     throw new Error("AI generation failed");

//   }

// }

// export async function saveQuizResult(questions, answers,score){

//       const { userId } = await auth();
    
//     if (!userId) throw new Error("Unauthorized");

//     const user = await db.user.findUnique({
//         where: { clerkUserId: userId },
//     });

//     if (!user) throw new Error("User not found");

//     const questionresults = questions.map((q,index)=>({
//         question: q.question,
//         answers:q.correctAnswer,
//         userAnswer: answers[index],
//         isCorrect: q.correctAnswer === answers[index],
//         explanation: q.explanation,
//     }));

//     const wrongAnswers = questionresults.filter((q)=> !q.isCorrect);
//     let improvementTip = null;

//     if(wrongAnswers.length > 0){
//         const wrongQuestionsText = wrongAnswers.map((q)=> `Question: ${q.question}\nYour Answer: ${q.userAnswer}\nCorrect Answer: ${q.answers}\nExplanation: ${q.explanation}`).join("\n\n");

//         const improvementPrompt = `The user scored ${score}% on a quiz for ${user.industry} professionals. Here are the questions they got wrong with explanations:\n\n${wrongQuestionsText}\n\nBased on this,
//          provide personalized learning resources (articles, courses, videos) that can help the user improve in these areas.
//          Return the response in JSON format with an array of resources, each having a title, description, and URL.`;

//         try {
//             const resourceCompletion = await groq.chat.completions.create({
//               messages: [
//                 {
//                   role: "user",
//                   content: improvementPrompt,
//                 },
//               ],
//               model: "llama-3.1-8b-instant",
//               temperature: 0.7,
//             });

//             const improvementTip = resourceCompletion.choices[0].message.content;
//         } catch (error) {
//             console.error("Groq AI Error for Improvement Tips:", error.message);
//         }

//         try {
//             const assessment = await db.assessment.create({
//                 data: {
//                     userId: user.id,
//                     quizScore: score,
//                     questions: questionresults,
//                     category: "Technical",
//                     improvementTip,
//                     },
//                 });

//                 return assessment;
//              }
//              catch (error) {
//                 console.error("Database Error Saving Assessment:", error.message);
//                 throw new Error("Failed to save quiz results");
//              }

//     }

// }

// "use server";

// import { db } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// import Groq from "groq-sdk";

// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY,
// });

// export async function generateQuiz() {
//   const { userId } = await auth();

//   if (!userId) throw new Error("Unauthorized");

//   const user = await db.user.findUnique({
//     where: { clerkUserId: userId },
//   });

//   if (!user) throw new Error("User not found");

//   const prompt = `
// Generate 10 technical interview questions for a ${user.industry} professional
// ${user.skills?.length ? `with expertise in ${user.skills.join(", ")}` : ""}.

// Each question must have:
// - 4 options
// - correctAnswer
// - explanation

// Return ONLY valid JSON in this format:

// {
//  "questions":[
//    {
//      "question":"string",
//      "options":["string","string","string","string"],
//      "correctAnswer":"string",
//      "explanation":"string"
//    }
//  ]
// }
// `;

//   try {
//     const completion = await groq.chat.completions.create({
//       messages: [{ role: "user", content: prompt }],
//       model: "llama-3.1-8b-instant",
//       temperature: 0.3,
//       max_tokens: 2000,
//     });

//     const text = completion.choices[0]?.message?.content;

//     console.log("AI Response:", text);

//     // Remove markdown ```json ```
//     const cleanedText = text
//       ?.replace(/```json/g, "")
//       .replace(/```/g, "")
//       .trim();

//     let quiz;

//     try {
//       quiz = JSON.parse(cleanedText);
//     } catch (error) {
//       console.error("JSON Parse Error:", cleanedText);
//       throw new Error("Invalid AI JSON response");
//     }

//     return quiz.questions || [];

//   } catch (error) {
//     console.error("Groq AI Error:", error.message);
//     throw new Error("AI generation failed");
//   }
// }

// export async function saveQuizResult(questions, answers, score) {
//   const { userId } = await auth();

//   if (!userId) throw new Error("Unauthorized");

//   const user = await db.user.findUnique({
//     where: { clerkUserId: userId },
//   });

//   if (!user) throw new Error("User not found");

//   const questionResults = questions.map((q, index) => ({
//     question: q.question,
//     answer: q.correctAnswer,
//     userAnswer: answers[index],
//     isCorrect: q.correctAnswer === answers[index],
//     explanation: q.explanation,
//   }));

//   const wrongAnswers = questionResults.filter((q) => !q.isCorrect);

//   let improvementTip = null;

//   if (wrongAnswers.length > 0) {
//     const wrongQuestionsText = wrongAnswers
//       .map(
//         (q) =>
//           `Question: ${q.question}
// Your Answer: ${q.userAnswer}
// Correct Answer: ${q.answer}
// Explanation: ${q.explanation}`
//       )
//       .join("\n\n");

//     const improvementPrompt = `
// The user scored ${score}% on a quiz for ${user.industry} professionals.

// Here are the questions they got wrong:

// ${wrongQuestionsText}

// Suggest learning resources (articles, courses, videos) to improve.

// Return JSON:

// {
//  "resources":[
//    {
//      "title":"string",
//      "description":"string",
//      "url":"string"
//    }
//  ]
// }
// `;

//     try {
//       const resourceCompletion = await groq.chat.completions.create({
//         messages: [{ role: "user", content: improvementPrompt }],
//         model: "llama-3.1-8b-instant",
//         temperature: 0.7,
//         max_tokens: 1200,
//       });

//       improvementTip = resourceCompletion.choices[0]?.message?.content;

//     } catch (error) {
//       console.error("Groq AI Error for Improvement Tips:", error.message);
//     }
//   }

//   try {
//     const assessment = await db.assessment.create({
//       data: {
//         userId: user.id,
//         quizScore: score,
//         questions: questionResults,
//         category: "Technical",
//         improvementTip,
//       },
//     });

//     return assessment;

//   } catch (error) {
//     console.error("Database Error Saving Assessment:", error.message);
//     throw new Error("Failed to save quiz results");
//   }
// }

"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateQuiz() {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  // Random seed ensures different questions every time
  const randomSeed = Math.random();

  const prompt = `
Generate 10 UNIQUE technical interview questions.

Industry: ${user.industry}
Skills: ${user.skills?.join(", ")}

Rules:
- Questions must be different every time.
- Avoid repeating common interview questions.
- Each question must have 4 options.
- Include correctAnswer and explanation.

Random seed: ${randomSeed}

Return ONLY JSON in this format:

{
 "questions":[
   {
     "question":"string",
     "options":["string","string","string","string"],
     "correctAnswer":"string",
     "explanation":"string"
   }
 ]
}
`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-8b-instant",

      // Higher temperature = more variety
      temperature: 0.9,

      max_tokens: 2000,
    });

    const text = completion.choices[0]?.message?.content;

    console.log("AI Response:", text);

    // Remove markdown ```json ``` if AI returns it
    const cleanedText = text
      ?.replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let quiz;

    try {
      quiz = JSON.parse(cleanedText);
    } catch (error) {
      console.error("JSON Parse Error:", cleanedText);
      throw new Error("Invalid AI JSON response");
    }

    // Shuffle questions so order changes each time
    const shuffledQuestions = quiz.questions.sort(() => Math.random() - 0.5);

    return shuffledQuestions || [];

  } catch (error) {
    console.error("Groq AI Error:", error.message);
    throw new Error("AI generation failed");
  }
}

export async function saveQuizResult(questions, answers, score) {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const questionResults = questions.map((q, index) => ({
    question: q.question,
    answer: q.correctAnswer,
    userAnswer: answers[index],
    isCorrect: q.correctAnswer === answers[index],
    explanation: q.explanation,
  }));

  const wrongAnswers = questionResults.filter((q) => !q.isCorrect);

  let improvementTip = null;

  if (wrongAnswers.length > 0) {
    const wrongQuestionsText = wrongAnswers
      .map(
        (q) =>
          `Question: ${q.question}
Your Answer: ${q.userAnswer}
Correct Answer: ${q.answer}
Explanation: ${q.explanation}`
      )
      .join("\n\n");

    const improvementPrompt = `
The user scored ${score}% on a quiz for ${user.industry} professionals.

Here are the questions they got wrong:

${wrongQuestionsText}

Suggest learning resources (articles, courses, videos) to improve.

Return JSON:

{
 "resources":[
   {
     "title":"string",
     "description":"string",
     "url":"string"
   }
 ]
}
`;

    try {
      const resourceCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: improvementPrompt }],
        model: "llama-3.1-8b-instant",
        temperature: 0.7,
        max_tokens: 1200,
      });

      improvementTip = resourceCompletion.choices[0]?.message?.content;

    } catch (error) {
      console.error("Groq AI Error for Improvement Tips:", error.message);
    }
  }

  try {
    const assessment = await db.assessment.create({
      data: {
        userId: user.id,
        quizScore: score,
        questions: questionResults,
        category: "Technical",
        improvementTip,
      },
    });

    return assessment;

  } catch (error) {
    console.error("Database Error Saving Assessment:", error.message);
    throw new Error("Failed to save quiz results");
  }
}

