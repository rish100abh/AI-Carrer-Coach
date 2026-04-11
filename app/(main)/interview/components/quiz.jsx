// "use client";

// import { generateQuiz, saveQuizResult } from "@/actions/interview";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import useFetch from "@/hooks/use-fetch";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { useEffect, useState } from "react";
// import { BarLoader } from "react-spinners";
// import { toast } from "sonner";


// const Quiz = () => {
// const [currentQuestion, setCurrentQuestion] = useState(0);
// const [answers, setAnswers]= useState([]);
// const [showExplanation, setShowExplanation] = useState(false);

// const {
//     loading: generatingQuiz,
//     fn: generateQuizFn,
//     data:quizData,
// } = useFetch(generateQuiz);

// const {
//     loading: savingResults,
//     fn: saveQuizResultFn,
//     data: resultsData,
//     setData: setResultsData,
// } = useFetch(saveQuizResult);

// console.log(resultsData);

// useEffect(()=> {
//     if(quizData){
//         setAnswers(new Array(quizData.length).fill(null));
//     }
// },[quizData]);

// const handleNext = () => {
//     if(currentQuestion < quizData.length -1){
//         setCurrentQuestion(currentQuestion +1);
//         setShowExplanation(false);
//     } else {
//         finishQuiz();
//     }
// };

// const calculateScore = () => {
//     let correct = 0;
//     answers.forEach((answer,index) => {
//         if(answer === quizData[index].correctAnswer){
//             correct++;
//         }
//     });
//     return (correct / quizData.length) * 100;
// };

// const finishQuiz = async () => {
//     const score = calculateScore();
//     try{
//         await saveQuizResultFn(quizData, answers, score);
//         toast.success("Quiz Completed!");
//     } catch (error){
//         toast.error(error.message || "Failed to save quiz results");
//     }

// };

// if(generatingQuiz){
//     return <BarLoader className="mt-4" width={"100%"} color="gray" />;
// }

// if(!quizData){
//     return (
//         <Card className="mx-2">
//             <CardHeader>
//                 <CardTitle>Ready to test your knowledge?</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <p className="text-muted-foreground">
//                     This quiz contains 10 questions specific to your industry and
//                     skills. Take your time and choose the best answer for each question.
//                     </p>
//             </CardContent>
//             <CardFooter>
//                 <Button className="w-full" onClick={generateQuizFn}>
//                     Start Quiz
//                 </Button>
//             </CardFooter>
//         </Card>
//     );
// }
//     const question = quizData[currentQuestion];

//      return (
//         <Card className="mx-2">
//             <CardHeader>
//                 <CardTitle>Question {currentQuestion+1} of {quizData.length}</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <p className="text-lg font-medium">{question.question}</p>

//                <RadioGroup
//   value={answers[currentQuestion]}
//   onValueChange={(value) => {
//     const newAnswers = [...answers];
//     newAnswers[currentQuestion] = value;
//     setAnswers(newAnswers);
//   }}
//   className="mt-4 space-y-4"
// >
//   {question.options.map((option, index) => (
//     <div
//       key={index}
//       className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted cursor-pointer"
//     >
//       <RadioGroupItem value={option} id={`option-${index}`} />

//       <Label htmlFor={`option-${index}`} className="cursor-pointer">
//         {option}
//       </Label>
//     </div>
//   ))}
// </RadioGroup>

//           {showExplanation && (
//             <div className="mt-4 p-4 bg-muted rounded-lg">
//                 <p className="font-medium">Explanation:</p>
//                 <p className="text-muted-foreground">{question.explanation}</p>
//             </div>
//           )}

//             </CardContent>
//             <CardFooter>
//                 {!showExplanation &&(
//                     <Button
//                     onClick={() => setShowExplanation(true)}
//                     variant="outline"
//                     disabled={!answers[currentQuestion]}
//                     >
//                         Show Explanation
//                     </Button>
//                 )}

//                   <Button
//                     onClick={handleNext}
//                     className="ml-auto"
//                     disabled={!answers[currentQuestion] || savingResults}
//                     >
//                         {savingResults && (
//                             <BarLoader className="mt-4" width={"100%"} color="gray" />
//                         )}
//                         {
//                             currentQuestion < quizData.length-1 ? "Next Question" : "Finish Quiz"
//                         }
//                     </Button>

//             </CardFooter>
//         </Card>
//     );
// }

// export default Quiz;

// "use client";

// import { generateQuiz, saveQuizResult } from "@/actions/interview";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import useFetch from "@/hooks/use-fetch";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { useEffect, useState } from "react";
// import { BarLoader } from "react-spinners";
// import { toast } from "sonner";

// const Quiz = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const [showExplanation, setShowExplanation] = useState(false);

//   const {
//     loading: generatingQuiz,
//     fn: generateQuizFn,
//     data: quizData,
//   } = useFetch(generateQuiz);

//   const {
//     loading: savingResults,
//     fn: saveQuizResultFn,
//     data: resultsData,
//     setData: setResultsData,
//   } = useFetch(saveQuizResult);

//   useEffect(() => {
//     if (quizData) {
//       setAnswers(new Array(quizData.length).fill(null));
//     }
//   }, [quizData]);

//   const handleNext = () => {
//     if (currentQuestion < quizData.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//       setShowExplanation(false);
//     } else {
//       finishQuiz();
//     }
//   };

//   const calculateScore = () => {
//     let correct = 0;

//     answers.forEach((answer, index) => {
//       if (answer === quizData[index].correctAnswer) {
//         correct++;
//       }
//     });

//     return Math.round((correct / quizData.length) * 100);
//   };

//   const finishQuiz = async () => {
//     const score = calculateScore();

//     try {
//       await saveQuizResultFn(quizData, answers, score);
//       toast.success(`Quiz Completed! Score: ${score}%`);
//     } catch (error) {
//       toast.error(error.message || "Failed to save quiz results");
//     }
//   };

//   // Loading quiz
//   if (generatingQuiz) {
//     return <BarLoader className="mt-4" width={"100%"} color="gray" />;
//   }

//   // Result screen
//   if (resultsData) {
//     return (
//       <Card className="mx-2">
//         <CardHeader>
//           <CardTitle>Quiz Completed 🎉</CardTitle>
//         </CardHeader>

//         <CardContent>
//           <p className="text-lg font-semibold">
//             Your Score: {resultsData.quizScore}%
//           </p>

//           <p className="text-muted-foreground mt-2">
//             Category: {resultsData.category}
//           </p>
//         </CardContent>

//         <CardFooter>
//           <Button
//             className="w-full"
//             onClick={() => {
//               setResultsData(null);
//               generateQuizFn();
//               setCurrentQuestion(0);
//             }}
//           >
//             Retake Quiz
//           </Button>
//         </CardFooter>
//       </Card>
//     );
//   }

//   // Start screen
//   if (!quizData) {
//     return (
//       <Card className="mx-2">
//         <CardHeader>
//           <CardTitle>Ready to test your knowledge?</CardTitle>
//         </CardHeader>

//         <CardContent>
//           <p className="text-muted-foreground">
//             This quiz contains 10 questions specific to your industry and
//             skills. Take your time and choose the best answer for each question.
//           </p>
//         </CardContent>

//         <CardFooter>
//           <Button className="w-full" onClick={generateQuizFn}>
//             Start Quiz
//           </Button>
//         </CardFooter>
//       </Card>
//     );
//   }

//   const question = quizData[currentQuestion];

//   return (
//     <Card className="mx-2">
//       <CardHeader>
//         <CardTitle>
//           Question {currentQuestion + 1} of {quizData.length}
//         </CardTitle>
//       </CardHeader>

//       <CardContent>
//         <p className="text-lg font-medium">{question.question}</p>

//         <RadioGroup
//           value={answers[currentQuestion]}
//           onValueChange={(value) => {
//             const newAnswers = [...answers];
//             newAnswers[currentQuestion] = value;
//             setAnswers(newAnswers);
//           }}
//           className="mt-4 space-y-4"
//         >
//           {question.options.map((option, index) => (
//             <div
//               key={index}
//               className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted cursor-pointer"
//             >
//               <RadioGroupItem value={option} id={`option-${index}`} />

//               <Label htmlFor={`option-${index}`} className="cursor-pointer">
//                 {option}
//               </Label>
//             </div>
//           ))}
//         </RadioGroup>

//         {showExplanation && (
//           <div className="mt-4 p-4 bg-muted rounded-lg">
//             <p className="font-medium">Explanation:</p>
//             <p className="text-muted-foreground">{question.explanation}</p>
//           </div>
//         )}
//       </CardContent>

//       <CardFooter>
//         {!showExplanation && (
//           <Button
//             onClick={() => setShowExplanation(true)}
//             variant="outline"
//             disabled={!answers[currentQuestion]}
//           >
//             Show Explanation
//           </Button>
//         )}

//         <Button
//           onClick={handleNext}
//           className="ml-auto"
//           disabled={!answers[currentQuestion] || savingResults}
//         >
//           {savingResults ? (
//             <BarLoader width={100} color="gray" />
//           ) : currentQuestion < quizData.length - 1 ? (
//             "Next Question"
//           ) : (
//             "Finish Quiz"
//           )}
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// };

// export default Quiz;

// "use client";

// import { generateQuiz, saveQuizResult } from "@/actions/interview";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import useFetch from "@/hooks/use-fetch";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { useEffect, useState } from "react";
// import { BarLoader } from "react-spinners";
// import { toast } from "sonner";

// const Quiz = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const [showExplanation, setShowExplanation] = useState(false);

//   const {
//     loading: generatingQuiz,
//     fn: generateQuizFn,
//     data: quizData,
//   } = useFetch(generateQuiz);

//   const {
//     loading: savingResults,
//     fn: saveQuizResultFn,
//     data: resultsData,
//     setData: setResultsData,
//   } = useFetch(saveQuizResult);

//   useEffect(() => {
//     if (quizData) {
//       setAnswers(new Array(quizData.length).fill(null));
//     }
//   }, [quizData]);

//   const handleNext = () => {
//     if (currentQuestion < quizData.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//       setShowExplanation(false);
//     } else {
//       finishQuiz();
//     }
//   };

//   const calculateScore = () => {
//     let correct = 0;

//    const getCorrectOption = (question) => {
//   const index = question.correctAnswer.charCodeAt(0) - 65;
//   return question.options[index];
// };

// const calculateScore = () => {
//   let correct = 0;

//   answers.forEach((answer, index) => {
//     const correctOption = getCorrectOption(quizData[index]);

//     if (answer === correctOption) {
//       correct++;
//     }
//   });

//   return Math.round((correct / quizData.length) * 100);
// };

//     return Math.round((correct / quizData.length) * 100);
//   };

//  const finishQuiz = async () => {
//   const score = calculateScore();

//   const feedback = await generateFeedback(quizData, answers);

//   // manually attach tip
// setResultsData({
//   quizScore: score,
//   category: "General",
//   improvementTip: feedback,
// });



//   if (generatingQuiz) {
//     return <BarLoader className="mt-4" width={"100%"} color="gray" />;
//   }

//  if (resultsData) {
//   return (
//     <Card className="mx-2 p-4">
//       <CardHeader>
//         <CardTitle className="text-2xl flex items-center gap-2">
//           🎉 Quiz Result
//         </CardTitle>
//       </CardHeader>

//       <CardContent className="space-y-6">

//         {/* Score */}
//         <div className="text-center">
//           <p className="text-4xl font-bold text-primary">
//             {resultsData.quizScore}%
//           </p>
//           <p className="text-muted-foreground">
//             Category: {resultsData.category}
//           </p>
//         </div>

//         {/* AI / Improvement Tip */}
//         <div className="p-4 rounded-xl bg-purple-50 border">
//           <h3 className="font-semibold mb-2">💡 Improvement Tip</h3>
//           <p className="text-sm text-muted-foreground">
//             {resultsData.improvementTip || "Keep practicing to improve your skills."}
//           </p>
//         </div>

//         {/* Detailed Analysis */}
//         <div>
//           <h3 className="font-semibold mb-3">📊 Question Analysis</h3>

//           <div className="space-y-4">
//             {quizData.map((q, index) => {
//               const userAnswer = answers[index];
//               const isCorrect = userAnswer === q.correctAnswer;

//               return (
//                 <div
//                   key={index}
//                   className={`p-4 border rounded-xl ${
//                     isCorrect
//                       ? "bg-green-50 border-green-300"
//                       : "bg-red-50 border-red-300"
//                   }`}
//                 >
//                   <p className="font-medium">
//                     Q{index + 1}. {q.question}
//                   </p>

//                   <p className="mt-2">
//                     <strong>Your Answer:</strong>{" "}
//                     <span className={isCorrect ? "text-green-600" : "text-red-600"}>
//                       {userAnswer || "Not Answered"}
//                     </span>
//                   </p>

//                   {!isCorrect && (
//                     <>
//                       <p>
//                         <strong>Correct Answer:</strong>{" "}
//                         <span className="text-green-600">
//                           {q.correctAnswer}
//                         </span>
//                       </p>

//                       <div className="mt-2 p-3 bg-white rounded-lg border">
//                         <p className="font-medium">Explanation:</p>
//                         <p className="text-muted-foreground text-sm">
//                           {q.explanation}
//                         </p>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//       </CardContent>

//       <CardFooter>
//         <Button
//           className="w-full"
//           onClick={() => {
//             setResultsData(null);
//             generateQuizFn();
//             setCurrentQuestion(0);
//           }}
//         >
//           Retake Quiz
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }

//   if (!quizData) {
//     return (
//       <Card className="mx-2">
//         <CardHeader>
//           <CardTitle>Ready to test your knowledge?</CardTitle>
//         </CardHeader>

//         <CardContent>
//           <p className="text-muted-foreground">
//             This quiz contains 10 questions specific to your industry and
//             skills. Take your time and choose the best answer.
//           </p>
//         </CardContent>

//         <CardFooter>
//           <Button className="w-full" onClick={generateQuizFn}>
//             Start Quiz
//           </Button>
//         </CardFooter>
//       </Card>
//     );
//   }

//   const question = quizData[currentQuestion];

//   return (
//     <Card className="mx-2">
//       <CardHeader>
//         <CardTitle>
//           Question {currentQuestion + 1} of {quizData.length}
//         </CardTitle>
//       </CardHeader>

//       <CardContent>
//         <p className="text-lg font-medium">{question.question}</p>

//         <p className="text-sm text-muted-foreground mt-2">
//           Select the correct answer
//         </p>

//         <RadioGroup
//           value={answers[currentQuestion]}
//           onValueChange={(value) => {
//             const newAnswers = [...answers];
//             newAnswers[currentQuestion] = value;
//             setAnswers(newAnswers);
//           }}
//           className="mt-6 space-y-3"
//         >
//           {question.options.map((option, index) => {
//             const selected = answers[currentQuestion] === option;

//             return (
//               <Label
//                 key={index}
//                 htmlFor={`option-${index}`}
//                 className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
//                   selected
//                     ? "border-primary bg-primary/10"
//                     : "hover:bg-muted"
//                 }`}
//               >
//                 <RadioGroupItem value={option} id={`option-${index}`} />

//                 <span className="font-semibold">
//                   {String.fromCharCode(65 + index)}.
//                 </span>

//                 <span>{option}</span>
//               </Label>
//             );
//           })}
//         </RadioGroup>

//         {showExplanation && (
//           <div className="mt-5 p-4 bg-muted rounded-lg">
//             <p className="font-medium">Explanation:</p>
//             <p className="text-muted-foreground">
//               {question.explanation}
//             </p>
//           </div>
//         )}
//       </CardContent>

//       <CardFooter>
//         {!showExplanation && (
//           <Button
//             variant="outline"
//             onClick={() => setShowExplanation(true)}
//             disabled={!answers[currentQuestion]}
//           >
//             Show Explanation
//           </Button>
//         )}

//         <Button
//           onClick={handleNext}
//           className="ml-auto"
//           disabled={!answers[currentQuestion] || savingResults}
//         >
//           {savingResults ? (
//             <BarLoader width={100} color="gray" />
//           ) : currentQuestion < quizData.length - 1 ? (
//             "Next Question"
//           ) : (
//             "Finish Quiz"
//           )}
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// };

// export default Quiz;
// "use client";

// import { generateQuiz, saveQuizResult } from "@/actions/interview";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import useFetch from "@/hooks/use-fetch";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { useEffect, useMemo, useState } from "react";
// import { BarLoader } from "react-spinners";
// import { toast } from "sonner";
// import {
//   CheckCircle2,
//   XCircle,
//   Trophy,
//   RotateCcw,
//   Brain,
//   Target,
//   Sparkles,
// } from "lucide-react";

// const Quiz = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const [showExplanation, setShowExplanation] = useState(false);

//   const {
//     loading: generatingQuiz,
//     fn: generateQuizFn,
//     data: quizData,
//   } = useFetch(generateQuiz);

//   const {
//     loading: savingResults,
//     fn: saveQuizResultFn,
//     data: resultsData,
//     setData: setResultsData,
//   } = useFetch(saveQuizResult);

//   useEffect(() => {
//     if (quizData) {
//       setAnswers(new Array(quizData.length).fill(null));
//     }
//   }, [quizData]);

//   const getCorrectOption = (question) => {
//     const index = question.correctAnswer.charCodeAt(0) - 65;
//     return question.options[index];
//   };

//   const calculateScore = () => {
//     let correct = 0;

//     answers.forEach((answer, index) => {
//       const correctOption = getCorrectOption(quizData[index]);
//       if (answer === correctOption) correct++;
//     });

//     return Math.round((correct / quizData.length) * 100);
//   };

//   const finishQuiz = async () => {
//     const score = calculateScore();

//     try {
//       const result = await saveQuizResultFn(quizData, answers, score);
//       setResultsData(result);
//       toast.success(`Quiz Completed! Score: ${score}%`);
//     } catch (error) {
//       toast.error(error?.message || "Failed to save quiz results");
//     }
//   };

//   const handleNext = () => {
//     if (currentQuestion < quizData.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//       setShowExplanation(false);
//     } else {
//       finishQuiz();
//     }
//   };

//   const resultStats = useMemo(() => {
//     if (!resultsData?.questions) return null;

//     const total = resultsData.questions.length;
//     const correct = resultsData.questions.filter((q) => q.isCorrect).length;
//     const incorrect = total - correct;

//     return {
//       total,
//       correct,
//       incorrect,
//       accuracy: resultsData.quizScore ?? 0,
//       passed: (resultsData.quizScore ?? 0) >= 60,
//     };
//   }, [resultsData]);

//   if (generatingQuiz) {
//     return <BarLoader className="mt-4" width={"100%"} color="gray" />;
//   }

//   if (savingResults) {
//     return (
//       <div className="mx-2 mt-6 space-y-3">
//         <BarLoader width={"100%"} color="gray" />
//         <p className="text-center text-sm text-muted-foreground">
//           Saving your results...
//         </p>
//       </div>
//     );
//   }

//   if (resultsData && resultStats) {
//     return (
//       <div className="mx-2 space-y-6">
//         <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-background via-background to-primary/5">
//           <CardHeader className="pb-4">
//             <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//               <div className="space-y-2">
//                 <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
//                   <Trophy className="h-4 w-4" />
//                   Quiz Completed
//                 </div>

//                 <CardTitle className="text-2xl font-bold md:text-3xl">
//                   Your Interview Quiz Result
//                 </CardTitle>

//                 <p className="text-muted-foreground">
//                   Here’s a complete breakdown of your performance.
//                 </p>
//               </div>

//               <div className="relative flex items-center justify-center">
//                 <div className="h-28 w-28 rounded-full bg-gradient-to-br from-primary to-primary/70 p-1 shadow-lg">
//                   <div className="flex h-full w-full items-center justify-center rounded-full bg-background">
//                     <div className="text-center">
//                       <p className="text-3xl font-bold text-primary">
//                         {resultsData.quizScore}%
//                       </p>
//                       <p className="text-xs text-muted-foreground">Score</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </CardHeader>

//           <CardContent className="space-y-6">
//             <div className="flex flex-wrap gap-3">
//               <span className="rounded-full border bg-secondary px-3 py-1 text-sm font-medium">
//                 Category: {resultsData.category}
//               </span>

//               <span
//                 className={`rounded-full px-3 py-1 text-sm font-medium ${
//                   resultStats.passed
//                     ? "border border-green-200 bg-green-100 text-green-700"
//                     : "border border-red-200 bg-red-100 text-red-700"
//                 }`}
//               >
//                 {resultStats.passed ? "Passed" : "Needs Improvement"}
//               </span>
//             </div>

//             <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//               <div className="rounded-2xl border bg-background p-4 shadow-sm">
//                 <div className="flex items-center justify-between">
//                   <p className="text-sm text-muted-foreground">Total Questions</p>
//                   <Brain className="h-4 w-4 text-primary" />
//                 </div>
//                 <p className="mt-2 text-2xl font-bold">{resultStats.total}</p>
//               </div>

//               <div className="rounded-2xl border bg-background p-4 shadow-sm">
//                 <div className="flex items-center justify-between">
//                   <p className="text-sm text-muted-foreground">Correct</p>
//                   <CheckCircle2 className="h-4 w-4 text-green-600" />
//                 </div>
//                 <p className="mt-2 text-2xl font-bold text-green-600">
//                   {resultStats.correct}
//                 </p>
//               </div>

//               <div className="rounded-2xl border bg-background p-4 shadow-sm">
//                 <div className="flex items-center justify-between">
//                   <p className="text-sm text-muted-foreground">Incorrect</p>
//                   <XCircle className="h-4 w-4 text-red-600" />
//                 </div>
//                 <p className="mt-2 text-2xl font-bold text-red-600">
//                   {resultStats.incorrect}
//                 </p>
//               </div>

//               <div className="rounded-2xl border bg-background p-4 shadow-sm">
//                 <div className="flex items-center justify-between">
//                   <p className="text-sm text-muted-foreground">Accuracy</p>
//                   <Target className="h-4 w-4 text-primary" />
//                 </div>
//                 <p className="mt-2 text-2xl font-bold">{resultStats.accuracy}%</p>
//               </div>
//             </div>

//             <div className="rounded-2xl border bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-primary/10 p-5">
//               <div className="flex items-start gap-3">
//                 <div className="rounded-full bg-white/80 p-2 shadow-sm">
//                   <Sparkles className="h-5 w-5 text-purple-600" />
//                 </div>
//                 <div>
//                   <h3 className="text-base font-semibold">AI Improvement Tip</h3>
//                   <p className="mt-1 whitespace-pre-line text-sm leading-6 text-muted-foreground">
//                     {resultsData.improvementTip}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <h3 className="text-lg font-semibold">Question Review</h3>
//                 <p className="text-sm text-muted-foreground">
//                   Review your answers and understand where you can improve.
//                 </p>
//               </div>

//               <div className="space-y-4">
//                 {resultsData.questions.map((q, index) => (
//                   <Card
//                     key={index}
//                     className={`shadow-sm ${
//                       q.isCorrect
//                         ? "border border-green-200 bg-green-50/60"
//                         : "border border-red-200 bg-red-50/60"
//                     }`}
//                   >
//                     <CardContent className="space-y-4 p-5">
//                       <div className="flex items-start justify-between gap-3">
//                         <div>
//                           <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
//                             Question {index + 1}
//                           </p>
//                           <p className="mt-1 font-medium leading-6">{q.question}</p>
//                         </div>

//                         <div
//                           className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
//                             q.isCorrect
//                               ? "bg-green-100 text-green-700"
//                               : "bg-red-100 text-red-700"
//                           }`}
//                         >
//                           {q.isCorrect ? "Correct" : "Incorrect"}
//                         </div>
//                       </div>

//                       <div className="grid gap-3 md:grid-cols-2">
//                         <div className="rounded-xl border bg-background p-3">
//                           <p className="mb-1 text-xs text-muted-foreground">
//                             Your Answer
//                           </p>
//                           <p
//                             className={`font-medium ${
//                               q.isCorrect ? "text-green-600" : "text-red-600"
//                             }`}
//                           >
//                             {q.userAnswer || "Not Answered"}
//                           </p>
//                         </div>

//                         <div className="rounded-xl border bg-background p-3">
//                           <p className="mb-1 text-xs text-muted-foreground">
//                             Correct Answer
//                           </p>
//                           <p className="font-medium text-green-600">{q.answer}</p>
//                         </div>
//                       </div>

//                       {!q.isCorrect && (
//                         <div className="rounded-xl border bg-background/80 p-4">
//                           <p className="mb-1 text-sm font-medium">Explanation</p>
//                           <p className="text-sm leading-6 text-muted-foreground">
//                             {q.explanation}
//                           </p>
//                         </div>
//                       )}
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           </CardContent>

//           <CardFooter className="flex flex-col gap-3 sm:flex-row">
//             <Button
//               className="w-full sm:w-auto"
//               onClick={() => {
//                 setResultsData(null);
//                 generateQuizFn();
//                 setCurrentQuestion(0);
//                 setShowExplanation(false);
//               }}
//             >
//               <RotateCcw className="mr-2 h-4 w-4" />
//               Retake Quiz
//             </Button>
//           </CardFooter>
//         </Card>
//       </div>
//     );
//   }

//   if (!quizData) {
//     return (
//       <Card className="mx-2 border-0 shadow-lg">
//         <CardHeader>
//           <CardTitle>Ready to test your knowledge?</CardTitle>
//         </CardHeader>

//         <CardContent>
//           <p className="text-muted-foreground">
//             This quiz contains questions based on your skills.
//           </p>
//         </CardContent>

//         <CardFooter>
//           <Button className="w-full" onClick={generateQuizFn}>
//             Start Quiz
//           </Button>
//         </CardFooter>
//       </Card>
//     );
//   }

//   const question = quizData[currentQuestion];

//   return (
//     <Card className="mx-2 border-0 shadow-lg">
//       <CardHeader>
//         <CardTitle>
//           Question {currentQuestion + 1} of {quizData.length}
//         </CardTitle>
//       </CardHeader>

//       <CardContent>
//         <p className="text-lg font-medium">{question.question}</p>

//         <RadioGroup
//           value={answers[currentQuestion]}
//           onValueChange={(value) => {
//             const newAnswers = [...answers];
//             newAnswers[currentQuestion] = value;
//             setAnswers(newAnswers);
//           }}
//           className="mt-6 space-y-3"
//         >
//           {question.options.map((option, index) => (
//             <Label
//               key={index}
//               className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all ${
//                 answers[currentQuestion] === option
//                   ? "border-primary bg-primary/10"
//                   : "hover:bg-muted"
//               }`}
//             >
//               <RadioGroupItem value={option} />
//               <span className="font-semibold">
//                 {String.fromCharCode(65 + index)}.
//               </span>
//               <span>{option}</span>
//             </Label>
//           ))}
//         </RadioGroup>

//         {showExplanation && (
//           <div className="mt-4 rounded-lg border bg-muted p-4">
//             <p className="font-medium">Explanation</p>
//             <p className="mt-1 text-sm text-muted-foreground">
//               {question.explanation}
//             </p>
//           </div>
//         )}
//       </CardContent>

//       <CardFooter className="gap-3">
//         {!showExplanation && (
//           <Button
//             variant="outline"
//             onClick={() => setShowExplanation(true)}
//             disabled={!answers[currentQuestion]}
//           >
//             Show Explanation
//           </Button>
//         )}

//         <Button
//           onClick={handleNext}
//           className="ml-auto"
//           disabled={!answers[currentQuestion]}
//         >
//           {currentQuestion < quizData.length - 1
//             ? "Next Question"
//             : "Finish Quiz"}
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// };

// export default Quiz;


// "use client";

// import { generateQuiz, saveQuizResult } from "@/actions/interview";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import useFetch from "@/hooks/use-fetch";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { useEffect, useMemo, useState } from "react";
// import { BarLoader } from "react-spinners";
// import { toast } from "sonner";
// import {
//   CheckCircle2,
//   XCircle,
//   Trophy,
//   RotateCcw,
//   Brain,
//   Target,
//   Sparkles,
// } from "lucide-react";

// const Quiz = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const [showExplanation, setShowExplanation] = useState(false);

//   const {
//     loading: generatingQuiz,
//     fn: generateQuizFn,
//     data: quizData,
//   } = useFetch(generateQuiz);

//   const {
//     loading: savingResults,
//     fn: saveQuizResultFn,
//     data: resultsData,
//     setData: setResultsData,
//   } = useFetch(saveQuizResult);

//   useEffect(() => {
//     if (quizData) {
//       setAnswers(new Array(quizData.length).fill(null));
//     }
//   }, [quizData]);

//   const getCorrectOption = (question) => {
//     if (!question?.options || !question?.correctAnswer) return "Answer unavailable";
//     try {
//       const index = question.correctAnswer.charCodeAt(0) - 65;
//       return question.options[index] || "Option not found";
//     } catch {
//       return "Error parsing answer";
//     }
//   };

//   const calculateScore = () => {
//     if (!quizData?.length) return 0;
//     let correct = 0;
//     answers.forEach((answer, index) => {
//       const correctOption =
//         quizData[index]?.correctAnswerText || getCorrectOption(quizData[index]);
//       if (answer === correctOption) correct++;
//     });
//     return Math.round((correct / quizData.length) * 100);
//   };

//   const finishQuiz = async () => {
//     const score = calculateScore();
//     try {
//       const result = await saveQuizResultFn(quizData, answers, score);
//       setResultsData(result);
//       toast.success(`Quiz Completed! Score: ${score}%`);
//     } catch (error) {
//       toast.error(error?.message || "Failed to save quiz results");
//     }
//   };

//   const handleNext = () => {
//     if (currentQuestion < quizData.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//       setShowExplanation(false);
//     } else {
//       finishQuiz();
//     }
//   };

//   const resultStats = useMemo(() => {
//     if (!resultsData?.questions) return null;
//     const total = resultsData.questions.length;
//     const correct = resultsData.questions.filter((q) => q.isCorrect).length;
//     const incorrect = total - correct;
//     const accuracy = resultsData.quizScore;
//     return { total, correct, incorrect, accuracy, passed: accuracy >= 60 };
//   }, [resultsData]);

//   if (generatingQuiz) {
//     return <BarLoader className="mt-4" width={"100%"} color="gray" />;
//   }

//   if (savingResults) {
//     return (
//       <div className="mx-2 mt-6 space-y-3">
//         <BarLoader width={"100%"} color="gray" />
//         <p className="text-center text-sm text-muted-foreground">
//           Saving your results...
//         </p>
//       </div>
//     );
//   }

//   if (resultsData && resultStats) {
//     return (
//       <div className="mx-2 space-y-6">
//         <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-background via-background to-primary/5">
//           <CardHeader className="pb-4">
//             <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//               <div className="space-y-2">
//                 <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
//                   <Trophy className="h-4 w-4" />
//                   Quiz Completed
//                 </div>
//                 <CardTitle className="text-2xl font-bold md:text-3xl">
//                   Your Interview Quiz Result
//                 </CardTitle>
//                 <p className="text-muted-foreground">
//                   Here's a complete breakdown of your performance across 10 questions.
//                 </p>
//               </div>
//               <div className="relative flex items-center justify-center">
//                 <div className="h-28 w-28 rounded-full bg-gradient-to-br from-primary to-primary/70 p-1 shadow-lg">
//                   <div className="flex h-full w-full items-center justify-center rounded-full bg-background">
//                     <div className="text-center">
//                       <p className="text-3xl font-bold text-primary">
//                         {resultStats.accuracy}%
//                       </p>
//                       <p className="text-xs text-muted-foreground">Score</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </CardHeader>

//           <CardContent className="space-y-6">
//             <div className="flex flex-wrap gap-3">
//               <span className="rounded-full border bg-secondary px-3 py-1 text-sm font-medium">
//                 Category: {resultsData.category}
//               </span>
//               <span
//                 className={`rounded-full px-3 py-1 text-sm font-medium ${resultStats.passed
//                   ? "border border-green-200 bg-green-100 text-green-700"
//                   : "border border-red-200 bg-red-100 text-red-700"
//                 }`}
//               >
//                 {resultStats.passed ? "✅ Passed" : "📈 Needs Improvement"}
//               </span>
//             </div>

//             <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//               <div className="rounded-2xl border bg-background p-4 shadow-sm">
//                 <div className="flex items-center justify-between">
//                   <p className="text-sm text-muted-foreground">Total Questions</p>
//                   <Brain className="h-4 w-4 text-primary" />
//                 </div>
//                 <p className="mt-2 text-2xl font-bold">{resultStats.total}</p>
//               </div>
//               <div className="rounded-2xl border bg-background p-4 shadow-sm">
//                 <div className="flex items-center justify-between">
//                   <p className="text-sm text-muted-foreground">Correct</p>
//                   <CheckCircle2 className="h-4 w-4 text-green-600" />
//                 </div>
//                 <p className="mt-2 text-2xl font-bold text-green-600">
//                   {resultStats.correct}
//                 </p>
//               </div>
//               <div className="rounded-2xl border bg-background p-4 shadow-sm">
//                 <div className="flex items-center justify-between">
//                   <p className="text-sm text-muted-foreground">Incorrect</p>
//                   <XCircle className="h-4 w-4 text-red-600" />
//                 </div>
//                 <p className="mt-2 text-2xl font-bold text-red-600">
//                   {resultStats.incorrect}
//                 </p>
//               </div>
//               <div className="rounded-2xl border bg-background p-4 shadow-sm">
//                 <div className="flex items-center justify-between">
//                   <p className="text-sm text-muted-foreground">Accuracy</p>
//                   <Target className="h-4 w-4 text-primary" />
//                 </div>
//                 <p className="mt-2 text-2xl font-bold">{resultStats.accuracy}%</p>
//               </div>
//             </div>

//             {resultsData.improvementTip && (
//               <div className="rounded-2xl border bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-primary/10 p-6">
//                 <div className="flex items-start gap-3">
//                   <div className="rounded-full bg-white/80 p-2 shadow-sm flex-shrink-0 mt-0.5">
//                     <Sparkles className="h-5 w-5 text-purple-600" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h3 className="font-semibold text-base mb-2">💡 AI Improvement Tip</h3>
//                     <p className="whitespace-pre-line text-sm leading-6 text-muted-foreground">
//                       {resultsData.improvementTip}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div className="space-y-4">
//               <div>
//                 <h3 className="text-lg font-semibold mb-1">📝 Question Review</h3>
//                 <p className="text-sm text-muted-foreground">
//                   Review your answers and see exactly what the correct answers were.
//                 </p>
//               </div>

//               <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
//                 {resultsData.questions.map((q, index) => {
//                   const displayCorrectAnswer =
//                     q.correctAnswerText ||
//                     q.answer ||
//                     getCorrectOption(q) ||
//                     "Answer unavailable";

//                   return (
//                     <Card
//                       key={index}
//                       className={`shadow-sm border-l-4 hover:shadow-md transition-all p-0 ${q.isCorrect
//                         ? "border-l-green-500 bg-green-50/70"
//                         : "border-l-red-500 bg-red-50/70"
//                       }`}
//                     >
//                       <CardContent className="p-5 space-y-3">
//                         <div className="flex items-start justify-between gap-3">
//                           <div className="flex-1 min-w-0">
//                             <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
//                               Question {index + 1}
//                             </p>
//                             <p className="mt-1 font-semibold leading-tight line-clamp-2 text-sm">
//                               {q.question}
//                             </p>
//                           </div>
//                           <div
//                             className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shrink-0 ${q.isCorrect
//                               ? "bg-green-100 text-green-800 border-2 border-green-200"
//                               : "bg-red-100 text-red-800 border-2 border-red-200"
//                             }`}
//                           >
//                             {q.isCorrect ? "✅ CORRECT" : "❌ WRONG"}
//                           </div>
//                         </div>

//                         <div className="grid gap-3 sm:grid-cols-2">
//                           <div className="space-y-1.5">
//                             <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
//                               Your Answer
//                             </p>
//                             <div
//                               className={`p-3 rounded-xl border-3 min-h-[60px] flex items-center justify-center shadow-sm text-sm ${q.isCorrect
//                                 ? "bg-green-100 border-green-300 !text-slate-950"
//                                 : "bg-red-100 border-red-300 !text-slate-950"
//                               }`}
//                             >
//                               <span className="!text-slate-950 font-semibold">
//                                 {q.userAnswer || "Not Answered"}
//                               </span>
//                             </div>
//                           </div>

//                           <div className="space-y-1.5">
//                             <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
//                               Correct Answer
//                             </p>
//                             <div className="p-3 rounded-xl border-3 bg-green-100 border-green-400 min-h-[60px] flex items-center justify-center shadow-sm !text-slate-950 text-sm">
//                               <span className="!text-slate-950 font-semibold">
//                                 {displayCorrectAnswer}
//                               </span>
//                             </div>
//                           </div>
//                         </div>

//                         {q.explanation && (
//                           <div className="p-4 rounded-xl border bg-gradient-to-r from-muted/50 to-background mt-2">
//                             <div className="flex items-start gap-2 mb-2">
//                               <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
//                                 <span className="text-primary font-semibold text-xs">💡</span>
//                               </div>
//                               <h4 className="font-semibold text-sm">Key Takeaway</h4>
//                             </div>
//                             <p className="text-xs leading-relaxed text-muted-foreground">
//                               {q.explanation}
//                             </p>
//                           </div>
//                         )}
//                       </CardContent>
//                     </Card>
//                   );
//                 })}
//               </div>
//             </div>
//           </CardContent>

//           <CardFooter className="flex flex-col gap-3 sm:flex-row pt-6">
//             <Button
//               className="w-full sm:w-auto"
//               variant="outline"
//               onClick={() => {
//                 setResultsData(null);
//                 generateQuizFn();
//                 setCurrentQuestion(0);
//                 setAnswers([]);
//                 setShowExplanation(false);
//               }}
//             >
//               <RotateCcw className="mr-2 h-4 w-4" />
//               New Quiz
//             </Button>
//             <Button
//               className="w-full sm:w-auto"
//               onClick={() => {
//                 setResultsData(null);
//                 generateQuizFn();
//                 setCurrentQuestion(0);
//                 setAnswers([]);
//                 setShowExplanation(false);
//               }}
//             >
//               Retake Same Quiz
//             </Button>
//           </CardFooter>
//         </Card>
//       </div>
//     );
//   }

//   if (!quizData) {
//     return (
//       <Card className="mx-2 border-0 shadow-xl max-w-2xl mx-auto">
//         <CardHeader className="text-center">
//           <CardTitle className="text-3xl">🎯 Interview Quiz</CardTitle>
//         </CardHeader>
//         <CardContent className="text-center py-12">
//           <p className="text-muted-foreground mb-8 text-lg max-w-md mx-auto leading-relaxed">
//             Test your technical knowledge with <strong>10 interview questions</strong> tailored to your skills.
//           </p>
//           <Button className="w-full max-w-sm text-lg h-12" onClick={generateQuizFn}>
//             🚀 Start Quiz
//           </Button>
//         </CardContent>
//       </Card>
//     );
//   }

//   const question = quizData[currentQuestion];

//   return (
//     <Card className="mx-2 border-0 shadow-xl max-w-3xl mx-auto">
//       <CardHeader>
//         <div className="flex items-center justify-between">
//           <CardTitle className="text-2xl">
//             Question {currentQuestion + 1} / {quizData.length}
//           </CardTitle>
//           <div className="text-sm font-medium text-muted-foreground">
//             {Math.round((currentQuestion / quizData.length) * 100)}% complete
//           </div>
//         </div>
//       </CardHeader>

//       <CardContent className="p-8">
//         <div className="space-y-6">
//           <div className="bg-gradient-to-r from-primary/5 p-6 rounded-2xl">
//             <p className="text-lg font-semibold leading-relaxed text-foreground">
//               {question.question}
//             </p>
//           </div>

//           <RadioGroup
//             value={answers[currentQuestion] || ""}
//             onValueChange={(value) => {
//               const newAnswers = [...answers];
//               newAnswers[currentQuestion] = value;
//               setAnswers(newAnswers);
//             }}
//             className="space-y-3"
//           >
//             {question.options.map((option, index) => (
//               <Label
//                 key={index}
//                 className={`group flex cursor-pointer items-center gap-4 p-5 rounded-2xl border-2 transition-all hover:shadow-md ${answers[currentQuestion] === option
//                   ? "border-primary bg-primary/10 shadow-md scale-[1.02]"
//                   : "border-border hover:border-primary/50 hover:bg-primary/5"
//                 }`}
//               >
//                 <RadioGroupItem value={option} className="border-2 h-5 w-5" />
//                 <div className="flex items-center gap-3 flex-1">
//                   <span className="w-8 h-8 rounded-lg bg-muted font-bold text-lg flex items-center justify-center group-hover:bg-primary/10 transition-all">
//                     {String.fromCharCode(65 + index)}
//                   </span>
//                   <span className="font-medium text-base">{option}</span>
//                 </div>
//               </Label>
//             ))}
//           </RadioGroup>

//           {showExplanation && (
//             <div className="p-6 rounded-2xl border bg-gradient-to-r from-muted/50 to-background">
//               <div className="flex items-start gap-3 mb-4">
//                 <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
//                   <span className="text-primary font-bold text-lg">💡</span>
//                 </div>
//                 <h4 className="font-semibold text-xl">Explanation</h4>
//               </div>
//               <p className="text-base leading-relaxed text-muted-foreground">
//                 {question.explanation}
//               </p>
//             </div>
//           )}
//         </div>
//       </CardContent>

//       <CardFooter className="p-8 gap-4">
//         {!showExplanation && (
//           <Button
//             variant="outline"
//             size="lg"
//             className="flex-1 h-12"
//             onClick={() => setShowExplanation(true)}
//             disabled={!answers[currentQuestion]}
//           >
//             💡 Show Explanation
//           </Button>
//         )}
//         <Button
//           size="lg"
//           className="flex-1 h-12 ml-auto"
//           onClick={handleNext}
//           disabled={!answers[currentQuestion]}
//         >
//           {currentQuestion < quizData.length - 1 ? "➡️ Next" : "🎉 Finish Quiz"}
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// };

// export default Quiz;

"use client";

import { generateQuiz, saveQuizResult } from "@/actions/interview";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useFetch from "@/hooks/use-fetch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useEffect, useMemo, useState } from "react";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";
import {
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  Brain,
  Target,
  Sparkles,
  ShieldCheck,
  BarChart3,
  Progress,
} from "lucide-react";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  const {
    loading: savingResults,
    fn: saveQuizResultFn,
    data: resultsData,
    setData: setResultsData,
  } = useFetch(saveQuizResult);

  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null));
    }
  }, [quizData]);

  const getCorrectOption = (question) => {
    if (!question?.options || !question?.correctAnswer) return "Answer unavailable";
    try {
      const index = question.correctAnswer.charCodeAt(0) - 65;
      return question.options[index] || "Option not found";
    } catch {
      return "Error parsing answer";
    }
  };

  const calculateScore = () => {
    if (!quizData?.length) return 0;
    let correct = 0;
    answers.forEach((answer, index) => {
      const correctOption =
        quizData[index]?.correctAnswerText || getCorrectOption(quizData[index]);
      if (answer === correctOption) correct++;
    });
    return Math.round((correct / quizData.length) * 100);
  };

  const finishQuiz = async () => {
    const score = calculateScore();
    try {
      const result = await saveQuizResultFn(quizData, answers, score);
      setResultsData(result);
      toast.success(`Quiz Completed! Score: ${score}%`);
    } catch (error) {
      toast.error(error?.message || "Failed to save quiz results");
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const resultStats = useMemo(() => {
    if (!resultsData?.questions) return null;
    const total = resultsData.questions.length;
    const correct = resultsData.questions.filter((q) => q.isCorrect).length;
    const incorrect = total - correct;
    const accuracy = resultsData.quizScore;
    return { total, correct, incorrect, accuracy, passed: accuracy >= 60 };
  }, [resultsData]);

  // Loading states
  if (generatingQuiz) {
    return (
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
          </div>
          <BarLoader width="200px" color="hsl(var(--primary))" />
          <p className="mt-3 text-sm text-muted-foreground">
            Generating your personalized interview quiz...
          </p>
        </div>
      </div>
    );
  }

  if (savingResults) {
    return (
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Trophy className="h-8 w-8 text-primary animate-pulse" />
          </div>
          <BarLoader width="200px" color="hsl(var(--primary))" />
          <p className="mt-3 text-sm text-muted-foreground">
            Saving your results and calculating performance...
          </p>
        </div>
      </div>
    );
  }

  // Results screen
  if (resultsData && resultStats) {
    return (
      <div className="mx-auto w-full max-w-5xl">
        <Card className="overflow-hidden border shadow-2xl bg-gradient-to-br from-background via-background to-primary/3">
          <CardHeader className="pb-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                  <Trophy className="h-4 w-4" />
                  Quiz Completed
                </div>
                <CardTitle className="text-3xl font-bold tracking-tight md:text-4xl">
                  Interview Quiz Results
                </CardTitle>
                <p className="text-muted-foreground">
                  Here's your complete performance breakdown across {resultStats.total} questions.
                </p>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/30 p-1 shadow-xl">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-background shadow-lg">
                    <div className="text-center">
                      <p className="text-4xl font-black text-primary">
                        {resultStats.accuracy}%
                      </p>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Final Score
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="flex flex-wrap gap-3">
              <span className="rounded-xl border bg-secondary/80 px-4 py-2 text-sm font-medium">
                Category: {resultsData.category || "Technical"}
              </span>
              <span
                className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                  resultStats.passed
                    ? "border-green-500/20 bg-green-500/10 text-green-600"
                    : "border-red-500/20 bg-red-500/10 text-red-600"
                }`}
              >
                {resultStats.passed ? "✅ Passed" : "📈 Needs Improvement"}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="group rounded-2xl border bg-background/80 p-6 shadow-sm backdrop-blur hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-muted-foreground">Total Questions</p>
                  <Brain className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-3xl font-bold text-foreground">{resultStats.total}</p>
              </div>

              <div className="group rounded-2xl border bg-background/80 p-6 shadow-sm backdrop-blur hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-muted-foreground">Correct</p>
                  <CheckCircle2 className="h-5 w-5 text-green-600 group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-3xl font-bold text-green-600">{resultStats.correct}</p>
              </div>

              <div className="group rounded-2xl border bg-background/80 p-6 shadow-sm backdrop-blur hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-muted-foreground">Incorrect</p>
                  <XCircle className="h-5 w-5 text-red-600 group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-3xl font-bold text-red-600">{resultStats.incorrect}</p>
              </div>

              <div className="group rounded-2xl border bg-background/80 p-6 shadow-sm backdrop-blur hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                  <Target className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-3xl font-bold">{resultStats.accuracy}%</p>
              </div>
            </div>

            {resultsData.improvementTip && (
              <div className="rounded-3xl border bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-primary/10 p-8 shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-gradient-to-br from-purple-500/20 to-primary/20 p-4 shadow-lg flex-shrink-0">
                    <Sparkles className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-3">AI Improvement Tip</h3>
                    <p className="whitespace-pre-line text-base leading-relaxed text-muted-foreground max-w-4xl">
                      {resultsData.improvementTip}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold">Detailed Question Review</h3>
              </div>

              <div className="max-h-[50vh] overflow-y-auto space-y-4 pr-2">
                {resultsData.questions.map((q, index) => {
                  const displayCorrectAnswer =
                    q.correctAnswerText ||
                    q.answer ||
                    getCorrectOption(q) ||
                    "Answer unavailable";

                  return (
                    <Card
                      key={index}
                      className={`shadow-sm border hover:shadow-md transition-all p-0 ${
                        q.isCorrect
                          ? "border-green-500/30 bg-green-50/50"
                          : "border-red-500/30 bg-red-50/50"
                      }`}
                    >
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                              Question {index + 1}
                            </p>
                            <p className="mt-2 font-semibold leading-tight line-clamp-2 text-base">
                              {q.question}
                            </p>
                          </div>
                          <div
                            className={`px-3 py-2 rounded-full text-sm font-bold flex items-center gap-1 shrink-0 ${
                              q.isCorrect
                                ? "bg-green-500/10 text-green-700 border-2 border-green-500/30"
                                : "bg-red-500/10 text-red-700 border-2 border-red-500/30"
                            }`}
                          >
                            {q.isCorrect ? "✅ CORRECT" : "❌ WRONG"}
                          </div>
                        </div>

                        <div className="grid gap-4 lg:grid-cols-2">
                          <div className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                              Your Answer
                            </p>
                            <div
                              className={`p-4 rounded-2xl border-2 min-h-[70px] flex items-center justify-center shadow-sm text-sm font-medium ${
                                q.isCorrect
                                  ? "bg-green-100/80 border-green-300 text-foreground"
                                  : "bg-red-100/80 border-red-300 text-foreground"
                              }`}
                            >
                              {q.userAnswer || "Not Answered"}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                              Correct Answer
                            </p>
                            <div className="p-4 rounded-2xl border-2 bg-green-100/90 border-green-400 min-h-[70px] flex items-center justify-center shadow-sm text-sm font-bold text-foreground">
                              {displayCorrectAnswer}
                            </div>
                          </div>
                        </div>

                        {q.explanation && (
                          <div className="pt-4 border-t border-muted/50 mt-4">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary/20 to-muted/30 flex items-center justify-center flex-shrink-0">
                                <Sparkles className="h-5 w-5 text-primary" />
                              </div>
                              <h4 className="font-semibold text-base">Key Takeaway</h4>
                            </div>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                              {q.explanation}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 sm:flex-row pt-8">
            <Button
              className="w-full sm:w-auto"
              variant="outline"
              size="lg"
              onClick={() => {
                setResultsData(null);
                generateQuizFn();
                setCurrentQuestion(0);
                setAnswers([]);
                setShowExplanation(false);
              }}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              New Quiz
            </Button>
            <Button
              className="w-full sm:w-auto"
              size="lg"
              onClick={() => {
                setResultsData(null);
                generateQuizFn();
                setCurrentQuestion(0);
                setAnswers([]);
                setShowExplanation(false);
              }}
            >
              Retake Same Quiz
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Quiz start screen
  if (!quizData) {
    return (
      <div className="mx-auto w-full max-w-4xl">
        <Card className="overflow-hidden border shadow-2xl bg-gradient-to-br from-background via-background to-primary/5">
          <CardHeader className="pb-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              Professional mock assessment
            </div>
            <CardTitle className="text-center text-3xl md:text-4xl font-bold tracking-tight">
              Interview Quiz
            </CardTitle>
          </CardHeader>

          <CardContent className="p-8 md:p-10">
            <div className="mx-auto max-w-2xl text-center space-y-8">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Test your technical knowledge with <strong>10 interview questions</strong> tailored to your skills
                and improve your confidence with a focused practice session.
              </p>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="group rounded-2xl border bg-background/80 p-6 shadow-sm backdrop-blur hover:shadow-xl transition-all">
                  <Brain className="h-6 w-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium">Skill Based</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Questions aligned with your preparation flow.
                  </p>
                </div>

                <div className="group rounded-2xl border bg-background/80 p-6 shadow-sm backdrop-blur hover:shadow-xl transition-all">
                  <Target className="h-6 w-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium">Performance Focused</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Build accuracy and identify weak areas quickly.
                  </p>
                </div>

                <div className="group rounded-2xl border bg-background/80 p-6 shadow-sm backdrop-blur hover:shadow-xl transition-all">
                  <ShieldCheck className="h-6 w-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium">Interview Ready</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Practice that simulates real interview pressure.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-xl border bg-background/70 px-4 py-3 text-sm text-muted-foreground">
                  10 Questions
                </div>
                <div className="rounded-xl border bg-background/70 px-4 py-3 text-sm text-muted-foreground">
                  Smart Evaluation
                </div>
                <div className="rounded-xl border bg-background/70 px-4 py-3 text-sm text-muted-foreground">
                  Instant Results
                </div>
              </div>

              <div className="mt-12 flex flex-col items-center gap-4">
                <Button
                  size="lg"
                  onClick={generateQuizFn}
                  className="min-w-[220px] rounded-2xl px-8 shadow-lg hover:shadow-xl h-12 text-base"
                >
                  🚀 Start Quiz
                </Button>
                <p className="text-xs text-muted-foreground">
                  10 questions • smart evaluation • interview-style practice
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Active quiz screen
  const question = quizData[currentQuestion];

  return (
    <div className="mx-auto w-full max-w-5xl">
      <Card className="overflow-hidden border shadow-2xl bg-gradient-to-br from-background via-background to-primary/3">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight">
                Question {currentQuestion + 1} / {quizData.length}
              </CardTitle>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-primary to-primary/70 h-1.5 rounded-full transition-all"
                  style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="text-sm font-medium text-muted-foreground">
              {Math.round(((currentQuestion + 1) / quizData.length) * 100)}% complete
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 lg:p-8">
          <div className="space-y-6">
            <div className="p-6 lg:p-8 rounded-3xl border bg-gradient-to-br from-muted/10 to-background shadow-sm">
              <p className="text-lg md:text-xl font-semibold leading-relaxed text-foreground">
                {question.question}
              </p>
            </div>

            <RadioGroup
              value={answers[currentQuestion] || ""}
              onValueChange={(value) => {
                const newAnswers = [...answers];
                newAnswers[currentQuestion] = value;
                setAnswers(newAnswers);
              }}
              className="space-y-3"
            >
              {question.options.map((option, index) => (
                <Label
                  key={index}
                  className={`group flex cursor-pointer items-center gap-4 p-5 rounded-3xl border-2 transition-all hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/50 ${
                    answers[currentQuestion] === option
                      ? "border-primary bg-primary/10 shadow-lg scale-[1.02]"
                      : "border-border hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  <RadioGroupItem
                    value={option}
                    className="border-2 h-6 w-6 rounded-full"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <span className="w-10 h-10 rounded-xl bg-muted font-bold text-lg flex items-center justify-center group-hover:bg-primary/20 transition-all shrink-0">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="font-medium text-base leading-relaxed">
                      {option}
                    </span>
                  </div>
                </Label>
              ))}
            </RadioGroup>

            {showExplanation && (
              <div className="p-6 rounded-3xl border bg-gradient-to-r from-muted/30 to-background shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-bold text-xl">Key Explanation</h4>
                </div>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {question.explanation}
                </p>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-6 lg:p-8 gap-4">
          {!showExplanation && (
            <Button
              variant="outline"
              size="lg"
              className="flex-1 h-14 rounded-2xl"
              onClick={() => setShowExplanation(true)}
              disabled={!answers[currentQuestion]}
            >
              💡 Show Explanation
            </Button>
          )}
          <Button
            size="lg"
            className="flex-1 h-14 rounded-2xl ml-auto shadow-lg hover:shadow-xl"
            onClick={handleNext}
            disabled={!answers[currentQuestion]}
          >
            {currentQuestion < quizData.length - 1 ? "➡️ Next Question" : "🎉 Finish Quiz"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Quiz;