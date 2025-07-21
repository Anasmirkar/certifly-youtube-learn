import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Clock, Trophy, AlertCircle, CheckCircle } from "lucide-react";

// Mock quiz data - in real app, this would come from API
const quizData = {
  "python-basics": {
    id: "python-basics",
    title: "Python Programming Fundamentals Quiz",
    description: "Test your knowledge of Python programming concepts",
    timeLimit: 30, // minutes
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: "What is the correct way to declare a variable in Python?",
        options: [
          "var x = 5",
          "int x = 5",
          "x = 5",
          "declare x = 5"
        ],
        correct: 2
      },
      {
        id: 2,
        question: "Which of the following is a Python data type?",
        options: [
          "list",
          "dict",
          "tuple",
          "All of the above"
        ],
        correct: 3
      },
      {
        id: 3,
        question: "How do you create a function in Python?",
        options: [
          "function myFunc():",
          "def myFunc():",
          "create myFunc():",
          "func myFunc():"
        ],
        correct: 1
      },
      {
        id: 4,
        question: "What does 'len()' function do in Python?",
        options: [
          "Returns the length of an object",
          "Converts to lowercase",
          "Generates random numbers",
          "Creates a new list"
        ],
        correct: 0
      },
      {
        id: 5,
        question: "Which operator is used for exponentiation in Python?",
        options: [
          "^",
          "**",
          "exp",
          "pow"
        ],
        correct: 1
      },
      {
        id: 6,
        question: "What is the output of: print(type([]))?",
        options: [
          "<class 'dict'>",
          "<class 'list'>",
          "<class 'tuple'>",
          "<class 'set'>"
        ],
        correct: 1
      },
      {
        id: 7,
        question: "How do you add an element to a list in Python?",
        options: [
          "list.add(element)",
          "list.insert(element)",
          "list.append(element)",
          "list.push(element)"
        ],
        correct: 2
      },
      {
        id: 8,
        question: "What is the correct syntax for a for loop in Python?",
        options: [
          "for i in range(10):",
          "for (i = 0; i < 10; i++):",
          "for i = 1 to 10:",
          "loop i in range(10):"
        ],
        correct: 0
      },
      {
        id: 9,
        question: "Which keyword is used to handle exceptions in Python?",
        options: [
          "catch",
          "except",
          "handle",
          "error"
        ],
        correct: 1
      },
      {
        id: 10,
        question: "What does 'import' statement do in Python?",
        options: [
          "Creates a new module",
          "Includes external libraries",
          "Exports functions",
          "Declares variables"
        ],
        correct: 1
      }
    ]
  }
};

const Quiz = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const quiz = quizData[id as keyof typeof quizData];

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizCompleted) {
      handleSubmitQuiz();
    }
  }, [timeLeft, quizStarted, quizCompleted]);

  const handleAnswerChange = (questionId: number, answerIndex: number) => {
    setAnswers({ ...answers, [questionId]: answerIndex });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    let correctAnswers = 0;
    quiz.questions.forEach((question) => {
      if (answers[question.id] === question.correct) {
        correctAnswers++;
      }
    });

    const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100);
    setScore(finalScore);
    setQuizCompleted(true);

    if (finalScore >= quiz.passingScore) {
      // Generate certificate ID
      const certId = `CT-2025-${id?.toUpperCase()}-${Math.floor(Math.random() * 10000)}`;
      localStorage.setItem(`certificate-${certId}`, JSON.stringify({
        id: certId,
        courseId: id,
        courseName: quiz.title.replace(" Quiz", ""),
        score: finalScore,
        date: new Date().toISOString(),
        userName: "John Doe" // In real app, get from auth
      }));

      setTimeout(() => {
        navigate(`/certificate/${certId}`);
      }, 2000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Quiz Not Found</h1>
          <Button onClick={() => navigate("/")}>Return Home</Button>
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-2xl mx-4">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold font-display mb-4">
              {quiz.title}
            </CardTitle>
            <p className="text-lg text-muted-foreground">{quiz.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">{quiz.questions.length}</div>
                <div className="text-sm text-muted-foreground">Questions</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">{quiz.timeLimit}</div>
                <div className="text-sm text-muted-foreground">Minutes</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">{quiz.passingScore}%</div>
                <div className="text-sm text-muted-foreground">To Pass</div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center text-amber-800 mb-2">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span className="font-medium">Quiz Instructions</span>
              </div>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• You have {quiz.timeLimit} minutes to complete the quiz</li>
                <li>• You need {quiz.passingScore}% or higher to pass and earn your certificate</li>
                <li>• You can navigate between questions but cannot restart once started</li>
                <li>• Make sure you have a stable internet connection</li>
              </ul>
            </div>

            <Button 
              size="xl" 
              variant="hero" 
              className="w-full"
              onClick={() => setQuizStarted(true)}
            >
              <Trophy className="mr-2 h-5 w-5" />
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-2xl mx-4">
          <CardHeader className="text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
              score >= quiz.passingScore 
                ? 'bg-success/10 text-success' 
                : 'bg-destructive/10 text-destructive'
            }`}>
              {score >= quiz.passingScore ? (
                <Trophy className="h-10 w-10" />
              ) : (
                <AlertCircle className="h-10 w-10" />
              )}
            </div>
            <CardTitle className="text-3xl font-bold font-display mb-2">
              Quiz Complete!
            </CardTitle>
            <p className="text-xl text-muted-foreground">
              Your Score: <span className="font-bold text-foreground">{score}%</span>
            </p>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            {score >= quiz.passingScore ? (
              <div className="bg-success/10 border border-success/20 rounded-lg p-6">
                <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-success mb-2">
                  Congratulations! 🎉
                </h3>
                <p className="text-success/80">
                  You passed the quiz! Your certificate is being generated...
                </p>
              </div>
            ) : (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
                <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-destructive mb-2">
                  Quiz Not Passed
                </h3>
                <p className="text-destructive/80 mb-4">
                  You need {quiz.passingScore}% to pass. Don't worry, you can retake the quiz after reviewing the course materials.
                </p>
                <Button variant="outline" onClick={() => navigate(`/course/${id}`)}>
                  Review Course
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">{quiz.title}</h1>
              <p className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-primary">
                <Clock className="h-4 w-4 mr-2" />
                <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>
          <Progress value={progress} className="mt-2 h-2" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup
              value={answers[question.id]?.toString()}
              onValueChange={(value) => handleAnswerChange(question.id, parseInt(value))}
            >
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex items-center justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>

              <div className="text-sm text-muted-foreground">
                {Object.keys(answers).length} of {quiz.questions.length} answered
              </div>

              {currentQuestion === quiz.questions.length - 1 ? (
                <Button
                  variant="success"
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(answers).length < quiz.questions.length}
                >
                  <Trophy className="mr-2 h-4 w-4" />
                  Submit Quiz
                </Button>
              ) : (
                <Button
                  onClick={handleNextQuestion}
                  disabled={answers[question.id] === undefined}
                >
                  Next
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;