"use client"

import { use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { QuizCard } from "@/components/quiz-card"
import { categories, quizzes } from "@/lib/quiz-data"
import { ArrowLeft } from "lucide-react"
import {
  Atom,
  Landmark,
  Cpu,
  Globe,
  BookOpen,
  Trophy,
  type LucideIcon,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  Atom,
  Landmark,
  Cpu,
  Globe,
  BookOpen,
  Trophy,
}

export default function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const category = categories.find((c) => c.id === id)

  if (!category) {
    notFound()
  }

  const categoryQuizzes = quizzes.filter((q) => q.categoryId === id)
  const Icon = iconMap[category.icon] || Atom

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
        {/* Back link */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Categories
        </Link>

        {/* Category Header */}
        <section className="mb-8">
          <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-8">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${category.color}15` }}
            >
              <Icon className="h-7 w-7" style={{ color: category.color }} />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-card-foreground lg:text-3xl">
                {category.name}
              </h1>
              <p className="mt-1 text-muted-foreground">{category.description}</p>
            </div>
          </div>
        </section>

        {/* Quizzes List */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-foreground">
              Available Quizzes
            </h2>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              {categoryQuizzes.length} quizzes
            </span>
          </div>
          <div className="flex flex-col gap-4">
            {categoryQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
