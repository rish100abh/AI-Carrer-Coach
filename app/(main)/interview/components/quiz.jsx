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
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";

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

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const calculateScore = () => {
    let correct = 0;

    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        correct++;
      }
    });

    return Math.round((correct / quizData.length) * 100);
  };

  const finishQuiz = async () => {
    const score = calculateScore();

    try {
      await saveQuizResultFn(quizData, answers, score);
      toast.success(`Quiz Completed! Score: ${score}%`);
    } catch (error) {
      toast.error(error.message || "Failed to save quiz results");
    }
  };

  if (generatingQuiz) {
    return <BarLoader className="mt-4" width={"100%"} color="gray" />;
  }

  if (resultsData) {
    return (
      <Card className="mx-2">
        <CardHeader>
          <CardTitle>Quiz Completed 🎉</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-xl font-semibold">
            Your Score: {resultsData.quizScore}%
          </p>

          <p className="text-muted-foreground mt-2">
            Category: {resultsData.category}
          </p>
        </CardContent>

        <CardFooter>
          <Button
            className="w-full"
            onClick={() => {
              setResultsData(null);
              generateQuizFn();
              setCurrentQuestion(0);
            }}
          >
            Retake Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (!quizData) {
    return (
      <Card className="mx-2">
        <CardHeader>
          <CardTitle>Ready to test your knowledge?</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground">
            This quiz contains 10 questions specific to your industry and
            skills. Take your time and choose the best answer.
          </p>
        </CardContent>

        <CardFooter>
          <Button className="w-full" onClick={generateQuizFn}>
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const question = quizData[currentQuestion];

  return (
    <Card className="mx-2">
      <CardHeader>
        <CardTitle>
          Question {currentQuestion + 1} of {quizData.length}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-lg font-medium">{question.question}</p>

        <p className="text-sm text-muted-foreground mt-2">
          Select the correct answer
        </p>

        <RadioGroup
          value={answers[currentQuestion]}
          onValueChange={(value) => {
            const newAnswers = [...answers];
            newAnswers[currentQuestion] = value;
            setAnswers(newAnswers);
          }}
          className="mt-6 space-y-3"
        >
          {question.options.map((option, index) => {
            const selected = answers[currentQuestion] === option;

            return (
              <Label
                key={index}
                htmlFor={`option-${index}`}
                className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                  selected
                    ? "border-primary bg-primary/10"
                    : "hover:bg-muted"
                }`}
              >
                <RadioGroupItem value={option} id={`option-${index}`} />

                <span className="font-semibold">
                  {String.fromCharCode(65 + index)}.
                </span>

                <span>{option}</span>
              </Label>
            );
          })}
        </RadioGroup>

        {showExplanation && (
          <div className="mt-5 p-4 bg-muted rounded-lg">
            <p className="font-medium">Explanation:</p>
            <p className="text-muted-foreground">
              {question.explanation}
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter>
        {!showExplanation && (
          <Button
            variant="outline"
            onClick={() => setShowExplanation(true)}
            disabled={!answers[currentQuestion]}
          >
            Show Explanation
          </Button>
        )}

        <Button
          onClick={handleNext}
          className="ml-auto"
          disabled={!answers[currentQuestion] || savingResults}
        >
          {savingResults ? (
            <BarLoader width={100} color="gray" />
          ) : currentQuestion < quizData.length - 1 ? (
            "Next Question"
          ) : (
            "Finish Quiz"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Quiz;

