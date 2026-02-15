"use client"

import Link from "next/link"
import type { Quiz } from "@/lib/quiz-data"
import { Clock, HelpCircle, Signal } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuizCardProps {
  quiz: Quiz
}

const difficultyConfig = {
  easy: { label: "Easy", className: "bg-success/10 text-success" },
  medium: { label: "Medium", className: "bg-accent/10 text-accent" },
  hard: { label: "Hard", className: "bg-destructive/10 text-destructive" },
}

export function QuizCard({ quiz }: QuizCardProps) {
  const diff = difficultyConfig[quiz.difficulty]

  return (
    <Link href={`/quiz/${quiz.id}`}>
      <article className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1.5">
            <h3 className="font-display text-lg font-semibold text-card-foreground transition-colors group-hover:text-primary">
              {quiz.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {quiz.description}
            </p>
          </div>
          <span className={cn("shrink-0 rounded-full px-3 py-1 text-xs font-semibold", diff.className)}>
            {diff.label}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <HelpCircle className="h-4 w-4" />
            {quiz.questionCount} questions
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {quiz.timePerQuestion}s per question
          </span>
          <span className="flex items-center gap-1.5">
            <Signal className="h-4 w-4" />
            {quiz.difficulty}
          </span>
        </div>
        <div className="flex items-center justify-end">
          <span className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition-all group-hover:opacity-100">
            Start Quiz
          </span>
        </div>
      </article>
    </Link>
  )
}
