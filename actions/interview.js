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

//   // Random seed ensures different questions every time
//   const randomSeed = Math.random();

//   const prompt = `
// Generate 3 UNIQUE technical interview questions.

// Industry: ${user.industry}
// Skills: ${user.skills?.join(", ")}

// Rules:
// - Questions must be different every time.
// - Avoid repeating common interview questions.
// - Each question must have 4 options.
// - Include correctAnswer and explanation.

// Random seed: ${randomSeed}

// Return ONLY JSON in this format:

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

//       // Higher temperature = more variety
//       temperature: 0.9,

//       max_tokens: 2000,
//     });

//     const text = completion.choices[0]?.message?.content;

//     console.log("AI Response:", text);

//     // Remove markdown ```json ``` if AI returns it
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

//     // Shuffle questions so order changes each time
//     const shuffledQuestions = quiz.questions.sort(() => Math.random() - 0.5);

//     return shuffledQuestions || [];

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

// //   let improvementTip = null;

// //   if (wrongAnswers.length > 0) {
// //     const wrongQuestionsText = wrongAnswers
// //       .map(
// //         (q) =>
// //           `Question: ${q.question}
// // Your Answer: ${q.userAnswer}
// // Correct Answer: ${q.answer}
// // Explanation: ${q.explanation}`
// //       )
// //       .join("\n\n");

// //     const improvementPrompt = `
// // The user scored ${score}% on a quiz for ${user.industry} professionals.

// // Here are the questions they got wrong:

// // ${wrongQuestionsText}

// // Suggest learning resources (articles, courses, videos) to improve.

// // Return JSON:

// // {
// //  "resources":[
// //    {
// //      "title":"string",
// //      "description":"string",
// //      "url":"string"
// //    }
// //  ]
// // }
// // `;

// //     try {
// //       const resourceCompletion = await groq.chat.completions.create({
// //         messages: [{ role: "user", content: improvementPrompt }],
// //         model: "llama-3.1-8b-instant",
// //         temperature: 0.7,
// //         max_tokens: 1200,
// //       });

// //       improvementTip = resourceCompletion.choices[0]?.message?.content;

// //     } catch (error) {
// //       console.error("Groq AI Error for Improvement Tips:", error.message);
// //     }
// //   }

// let improvementTip = null;

// if (wrongAnswers.length > 0) {
//   const wrongQuestionsText = wrongAnswers
//     .map(
//       (q) =>
//         `Question: ${q.question}
// Your Answer: ${q.userAnswer}
// Correct Answer: ${q.answer}
// Explanation: ${q.explanation}`
//     )
//     .join("\n\n");

//   const improvementPrompt = `
// The user scored ${score}% on a quiz for ${user.industry} professionals.

// Here are the questions they got wrong:

// ${wrongQuestionsText}

// Based on these mistakes, write a personalized improvement tip in plain text.

// Requirements:
// - Write a short paragraph or 3 to 5 simple lines
// - Explain what skills/topics they need to improve
// - Suggest useful learning resources such as articles, courses, or videos
// - Keep the tone motivating and practical
// - Do not return JSON
// - Do not return code
// - Do not use markdown
// - Return only plain text
// `;

//   try {
//     const resourceCompletion = await groq.chat.completions.create({
//       messages: [{ role: "user", content: improvementPrompt }],
//       model: "llama-3.1-8b-instant",
//       temperature: 0.7,
//       max_tokens: 500,
//     });

//     improvementTip =
//       resourceCompletion.choices[0]?.message?.content?.trim() || null;
//   } catch (error) {
//     console.error("Groq AI Error for Improvement Tips:", error.message);
//   }
// }
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

function cleanJsonText(text = "") {
  return text.replace(/```json/g, "").replace(/```/g, "").trim();
}

function getOptionLetter(index) {
  return ["A", "B", "C", "D"][index] || null;
}

function normalizeQuestion(rawQuestion) {
  if (!rawQuestion || !rawQuestion.question || !Array.isArray(rawQuestion.options)) {
    return null;
  }

  const options = rawQuestion.options.slice(0, 4).map((opt) => String(opt).trim());
  if (options.length !== 4) return null;

  const rawCorrect = String(rawQuestion.correctAnswer || "").trim();

  let correctAnswerLetter = null;
  let correctAnswerText = null;

  if (/^[A-D]$/i.test(rawCorrect)) {
    const index = rawCorrect.toUpperCase().charCodeAt(0) - 65;
    correctAnswerLetter = rawCorrect.toUpperCase();
    correctAnswerText = options[index] || null;
  } else {
    const matchedIndex = options.findIndex(
      (opt) => opt.toLowerCase() === rawCorrect.toLowerCase()
    );

    if (matchedIndex !== -1) {
      correctAnswerLetter = getOptionLetter(matchedIndex);
      correctAnswerText = options[matchedIndex];
    }
  }

  if (!correctAnswerLetter || !correctAnswerText) {
    return null;
  }

  return {
    question: String(rawQuestion.question).trim(),
    options,
    correctAnswer: correctAnswerLetter,
    correctAnswerText,
    explanation: String(rawQuestion.explanation || "").trim(),
  };
}

export async function generateQuiz() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const randomSeed = Math.random();

  const prompt = `
You are a strict JSON generator.

Generate 10 UNIQUE technical interview questions.

Industry: ${user.industry}
Skills: ${user.skills?.join(", ")}

STRICT RULES:
- Return ONLY valid JSON
- No markdown (no \`\`\`)
- No extra text
- No trailing commas
- Use double quotes only
- Exactly 10 questions

FORMAT:
{
  "questions": [
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswer": "A",
      "explanation": "string"
    }
  ]
}

Random seed: ${randomSeed}
`;

  // 🔁 Retry mechanism (max 2 attempts)
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.5, // 🔥 lower = stable JSON
        max_tokens: 4000,
        // response_format: { type: "json_object" }, // ✅ enable if supported
      });

      let text = completion.choices[0]?.message?.content || "";

      // ✅ CLEAN AI RESPONSE
      text = text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      // remove trailing commas
      text = text.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]");

      let parsed;

      try {
        parsed = JSON.parse(text);
      } catch (err) {
        console.error("❌ RAW AI RESPONSE:\n", text);

        if (attempt === 2) {
          throw new Error("Invalid AI JSON response");
        }
        continue; // retry
      }

      // ✅ VALIDATE STRUCTURE
      if (!parsed?.questions || !Array.isArray(parsed.questions)) {
        if (attempt === 2) {
          throw new Error("Quiz format invalid");
        }
        continue;
      }

      // ✅ NORMALIZE QUESTIONS
      const normalizedQuestions = parsed.questions
        .map((q) => {
          if (
            !q.question ||
            !Array.isArray(q.options) ||
            q.options.length !== 4 ||
            !["A", "B", "C", "D"].includes(q.correctAnswer)
          ) {
            return null;
          }

          return {
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation || "",
          };
        })
        .filter(Boolean)
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

      // ✅ FINAL VALIDATION
      if (normalizedQuestions.length !== 10) {
        console.error("Invalid questions count:", normalizedQuestions);

        if (attempt === 2) {
          throw new Error(
            `Failed to generate valid quiz questions (${normalizedQuestions.length}/10)`
          );
        }
        continue;
      }

      // 🎉 SUCCESS
      return normalizedQuestions;

    } catch (error) {
      console.error(`🔥 Attempt ${attempt} failed:`, error.message);

      if (attempt === 2) {
        throw new Error("AI generation failed");
      }
    }
  }
}

export async function saveQuizResult(questions, answers, frontendScore) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  if (!Array.isArray(questions) || questions.length === 0) {
    throw new Error("No questions provided");
  }

  const questionResults = questions.map((q, index) => {
    const userAnswer = answers?.[index] || null;

    const correctText =
      q.correctAnswerText ||
      (Array.isArray(q.options) && /^[A-D]$/i.test(q.correctAnswer || "")
        ? q.options[q.correctAnswer.toUpperCase().charCodeAt(0) - 65]
        : null) ||
      "Answer unavailable";

    const isCorrect = userAnswer === correctText;

    return {
      question: q.question || "Question unavailable",
      options: q.options || [],
      answer: correctText,
      correctAnswer: q.correctAnswer || null,
      correctAnswerText: correctText,
      userAnswer,
      explanation: q.explanation || "",
      isCorrect,
    };
  });

  const correctCount = questionResults.filter((q) => q.isCorrect).length;
  const calculatedScore = Math.round((correctCount / questions.length) * 100);

  console.log("=== QUIZ DEBUG (10 Questions) ===");
  console.log("frontendScore:", frontendScore);
  console.log("totalQuestions:", questions.length);
  console.log("correctCount:", correctCount);
  console.log("calculatedScore:", calculatedScore);
  console.log("============================");

  const wrongAnswers = questionResults.filter((q) => !q.isCorrect);
  let improvementTip = null;

  if (wrongAnswers.length > 0) {
    const wrongQuestionsText = wrongAnswers
      .map(
        (q) => `Question: ${q.question}
Your Answer: ${q.userAnswer || "Not answered"}
Correct Answer: ${q.answer}
Explanation: ${q.explanation}`
      )
      .join("\n\n");

    const improvementPrompt = `
The user scored ${calculatedScore}% on a 10-question quiz for ${user.industry} professionals.

Here are the questions they got wrong:

${wrongQuestionsText}

Based on these mistakes, write a personalized improvement tip in plain text.

Requirements:
- Write a short paragraph or 3 to 5 simple lines
- Explain what skills/topics they need to improve
- Suggest useful learning resources such as articles, courses, or videos
- Keep the tone motivating and practical
- Return only plain text
`;

    try {
      const resourceCompletion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: improvementPrompt }],
        temperature: 0.7,
        max_tokens: 500,
      });

      improvementTip =
        resourceCompletion.choices[0]?.message?.content?.trim() || null;
    } catch (error) {
      console.error("Improvement Tip Error:", error.message);
    }
  }

  try {
    const assessment = await db.assessment.create({
      data: {
        userId: user.id,
        quizScore: calculatedScore,
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

export async function getAssessments() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return [];
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { id: true },
    });

    if (!user) {
      return [];
    }

    const assessments = await db.assessment.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return Array.isArray(assessments) ? assessments : [];
  } catch (error) {
    console.error("getAssessments Error:", error);
    return [];
  }
}