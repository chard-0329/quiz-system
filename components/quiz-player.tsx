"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import type { Quiz } from "@/lib/quiz-data"
import { addQuizAttempt } from "@/lib/quiz-store"
import { cn } from "@/lib/utils"
import { Clock, CheckCircle2, XCircle, ArrowRight } from "lucide-react"

interface QuizPlayerProps {
  quiz: Quiz
  onComplete: () => void
}

export function QuizPlayer({ quiz, onComplete }: QuizPlayerProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(quiz.timePerQuestion)
  const [isFinished, setIsFinished] = useState(false)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const startTimeRef = useRef(Date.now())
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const question = quiz.questions[currentQuestion]

  const handleTimeUp = useCallback(() => {
    if (!isAnswered) {
      setIsAnswered(true)
      setAnswers((prev) => [...prev, null])
    }
  }, [isAnswered])

  useEffect(() => {
    if (isFinished || isAnswered) return

    setTimeLeft(quiz.timePerQuestion)

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current)
          handleTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [currentQuestion, isFinished, isAnswered, quiz.timePerQuestion, handleTimeUp])

  const handleSelectAnswer = (index: number) => {
    if (isAnswered) return
    setSelectedAnswer(index)
    setIsAnswered(true)
    if (timerRef.current) clearInterval(timerRef.current)

    const isCorrect = index === question.correctIndex
    if (isCorrect) {
      setScore((prev) => prev + 1)
    }
    setAnswers((prev) => [...prev, index])
  }

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setTimeLeft(quiz.timePerQuestion)
    } else {
      // Quiz finished
      const finalScore = score
      const timeTaken = Math.round((Date.now() - startTimeRef.current) / 1000)
      const percentage = Math.round((finalScore / quiz.questions.length) * 100)

      addQuizAttempt({
        quizId: quiz.id,
        quizTitle: quiz.title,
        categoryId: quiz.categoryId,
        score: finalScore,
        totalQuestions: quiz.questions.length,
        percentage,
        completedAt: new Date().toISOString(),
        timeTaken,
      })

      setIsFinished(true)
    }
  }

  if (isFinished) {
    const percentage = Math.round((score / quiz.questions.length) * 100)
    const timeTaken = Math.round((Date.now() - startTimeRef.current) / 1000)

    return (
      <div className="flex flex-col items-center gap-8 rounded-2xl border border-border bg-card p-8 lg:p-12">
        {/* Score Circle */}
        <div className="relative flex h-40 w-40 items-center justify-center">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="8"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke={percentage >= 80 ? "hsl(var(--success))" : percentage >= 50 ? "hsl(var(--accent))" : "hsl(var(--destructive))"}
              strokeWidth="8"
              strokeDasharray={`${(percentage / 100) * 440} 440`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="font-display text-4xl font-bold text-card-foreground">
              {percentage}%
            </span>
            <span className="text-xs text-muted-foreground">Score</span>
          </div>
        </div>

        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-card-foreground">
            {percentage === 100
              ? "Perfect Score!"
              : percentage >= 80
                ? "Great Job!"
                : percentage >= 50
                  ? "Good Effort!"
                  : "Keep Practicing!"}
          </h2>
          <p className="mt-2 text-muted-foreground">
            You answered {score} out of {quiz.questions.length} questions correctly
            in {timeTaken}s.
          </p>
        </div>

        {/* Answer Review */}
        <div className="w-full max-w-md">
          <h3 className="mb-3 font-display text-sm font-semibold text-card-foreground">
            Answer Review
          </h3>
          <div className="flex flex-col gap-2">
            {quiz.questions.map((q, i) => {
              const userAnswer = answers[i]
              const isCorrect = userAnswer === q.correctIndex
              return (
                <div
                  key={q.id}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm",
                    isCorrect
                      ? "bg-success/10 text-success"
                      : "bg-destructive/10 text-destructive"
                  )}
                >
                  {isCorrect ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                  ) : (
                    <XCircle className="h-4 w-4 shrink-0" />
                  )}
                  <span className="flex-1 truncate">{q.text}</span>
                  <span className="shrink-0 font-medium">
                    {userAnswer !== null ? q.options[userAnswer] : "Timed out"}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg border border-border bg-background px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Try Again
          </button>
          <button
            onClick={onComplete}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    )
  }

  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100
  const timePercentage = (timeLeft / quiz.timePerQuestion) * 100

  return (
    <div className="flex flex-col gap-6">
      {/* Progress + Timer */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </span>
            <span className="text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div
          className={cn(
            "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold",
            timeLeft <= 5
              ? "bg-destructive/10 text-destructive"
              : "bg-secondary text-secondary-foreground"
          )}
        >
          <Clock className="h-4 w-4" />
          {timeLeft}s
        </div>
      </div>

      {/* Timer bar */}
      <div className="h-1 overflow-hidden rounded-full bg-secondary">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-linear",
            timeLeft <= 5 ? "bg-destructive" : "bg-accent"
          )}
          style={{ width: `${timePercentage}%` }}
        />
      </div>

      {/* Question */}
      <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
        <h2 className="mb-8 font-display text-xl font-semibold text-card-foreground lg:text-2xl">
          {question.text}
        </h2>

        <div className="flex flex-col gap-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index
            const isCorrect = index === question.correctIndex
            const showCorrect = isAnswered && isCorrect
            const showWrong = isAnswered && isSelected && !isCorrect

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={isAnswered}
                className={cn(
                  "flex items-center gap-4 rounded-xl border-2 px-5 py-4 text-left text-sm font-medium transition-all lg:text-base",
                  !isAnswered &&
                    "border-border bg-background text-foreground hover:border-primary/50 hover:bg-primary/5",
                  showCorrect &&
                    "border-success bg-success/10 text-success",
                  showWrong &&
                    "border-destructive bg-destructive/10 text-destructive",
                  isAnswered && !showCorrect && !showWrong &&
                    "border-border bg-background text-muted-foreground opacity-60"
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
                    !isAnswered && "bg-secondary text-secondary-foreground",
                    showCorrect && "bg-success text-success-foreground",
                    showWrong && "bg-destructive text-destructive-foreground",
                    isAnswered && !showCorrect && !showWrong && "bg-secondary text-muted-foreground"
                  )}
                >
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
                {showCorrect && <CheckCircle2 className="h-5 w-5 text-success" />}
                {showWrong && <XCircle className="h-5 w-5 text-destructive" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Next Button */}
      {isAnswered && (
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {currentQuestion < quiz.questions.length - 1 ? "Next Question" : "View Results"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}
