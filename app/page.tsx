"use client"

import { Navbar } from "@/components/navbar"
import { CategoryCard } from "@/components/category-card"
import { categories } from "@/lib/quiz-data"
import { useCurrentUser } from "@/lib/quiz-store"
import { Zap, Target, Trophy } from "lucide-react"

export default function HomePage() {
  const user = useCurrentUser()

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-8 lg:flex-row lg:items-center lg:justify-between lg:p-12">
            <div className="flex flex-col gap-3">
              <h1 className="font-display text-3xl font-bold tracking-tight text-card-foreground lg:text-4xl">
                <span className="text-balance">Ready to test your knowledge?</span>
              </h1>
              <p className="max-w-lg text-base leading-relaxed text-muted-foreground lg:text-lg">
                Choose a category below and challenge yourself with quizzes across
                multiple difficulty levels. Track your progress and climb the
                leaderboard and get there.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 lg:flex-nowrap">
              <StatCard
                icon={<Zap className="h-5 w-5 text-primary" />}
                label="Quizzes Taken"
                value={user.totalQuizzes}
              />
              <StatCard
                icon={<Target className="h-5 w-5" style={{ color: "hsl(38, 92%, 50%)" }} />}
                label="Avg. Score"
                value={user.totalQuizzes > 0 ? `${user.averageScore}%` : "--"}
              />
              <StatCard
                icon={<Trophy className="h-5 w-5" style={{ color: "hsl(152, 60%, 42%)" }} />}
                label="Total Points"
                value={user.totalScore}
              />
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Choose a Category
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Pick a topic and start quizzing
              </p>
            </div>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              {categories.length} categories
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
}) {
  return (
    <div className="flex min-w-[140px] items-center gap-3 rounded-xl border border-border bg-background px-4 py-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-display text-lg font-bold text-foreground">{String(value)}</p>
      </div>
    </div>
  )
}
