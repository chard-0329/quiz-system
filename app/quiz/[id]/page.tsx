"use client"

import { use, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { QuizPlayer } from "@/components/quiz-player"
import { quizzes, categories } from "@/lib/quiz-data"
import { ArrowLeft, Clock, HelpCircle, Signal, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const difficultyConfig = {
  easy: { label: "Easy", className: "bg-success/10 text-success" },
  medium: { label: "Medium", className: "bg-accent/10 text-accent" },
  hard: { label: "Hard", className: "bg-destructive/10 text-destructive" },
}

export default function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [started, setStarted] = useState(false)

  const quiz = quizzes.find((q) => q.id === id)

  if (!quiz) {
    notFound()
  }

  const category = categories.find((c) => c.id === quiz.categoryId)
  const diff = difficultyConfig[quiz.difficulty]

  const handleComplete = () => {
    if (category) {
      router.push(`/category/${category.id}`)
    } else {
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
        {!started ? (
          <>
            {/* Back link */}
            <Link
              href={category ? `/category/${category.id}` : "/"}
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to {category?.name || "Categories"}
            </Link>

            {/* Quiz Info */}
            <div className="flex flex-col items-center gap-8 rounded-2xl border border-border bg-card p-8 text-center lg:p-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Zap className="h-8 w-8 text-primary" />
              </div>

              <div>
                <span className={cn("mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold", diff.className)}>
                  {diff.label}
                </span>
                <h1 className="font-display text-2xl font-bold text-card-foreground lg:text-3xl">
                  {quiz.title}
                </h1>
                <p className="mt-2 text-muted-foreground">{quiz.description}</p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  {quiz.questionCount} questions
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {quiz.timePerQuestion}s per question
                </span>
                <span className="flex items-center gap-2">
                  <Signal className="h-4 w-4" />
                  {quiz.difficulty}
                </span>
              </div>

              <div className="rounded-xl border border-border bg-background p-4 text-left">
                <h3 className="mb-2 text-sm font-semibold text-foreground">Rules</h3>
                <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                  <li>{"Each question has a time limit of " + quiz.timePerQuestion + " seconds"}</li>
                  <li>{"You cannot change your answer once selected"}</li>
                  <li>{"Unanswered questions count as incorrect"}</li>
                  <li>{"Your score is recorded on the leaderboard"}</li>
                </ul>
              </div>

              <button
                onClick={() => setStarted(true)}
                className="flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Zap className="h-5 w-5" />
                Start Quiz
              </button>
            </div>
          </>
        ) : (
          <QuizPlayer quiz={quiz} onComplete={handleComplete} />
        )}
      </main>
    </div>
  )
}
