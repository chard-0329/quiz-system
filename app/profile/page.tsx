"use client"

import { Navbar } from "@/components/navbar"
import { useCurrentUser } from "@/lib/quiz-store"
import { categories } from "@/lib/quiz-data"
import { cn } from "@/lib/utils"
import {
  Trophy,
  Target,
  Zap,
  Flame,
  Calendar,
  Clock,
  CheckCircle2,
  BookOpen,
} from "lucide-react"

export default function ProfilePage() {
  const user = useCurrentUser()

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || categoryId
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const acedCount = user.attempts.filter((a) => a.percentage === 100).length
  const recentAttempts = [...user.attempts].reverse().slice(0, 10)

  // Category breakdown
  const categoryBreakdown = user.attempts.reduce(
    (acc, attempt) => {
      if (!acc[attempt.categoryId]) {
        acc[attempt.categoryId] = { count: 0, totalPercentage: 0 }
      }
      acc[attempt.categoryId].count++
      acc[attempt.categoryId].totalPercentage += attempt.percentage
      return acc
    },
    {} as Record<string, { count: number; totalPercentage: number }>
  )

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
        {/* Profile Header */}
        <section className="mb-8">
          <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-8 sm:flex-row sm:items-center sm:gap-8">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
              {user.avatar}
            </div>
            <div className="flex-1">
              <h1 className="font-display text-2xl font-bold text-card-foreground lg:text-3xl">
                {user.name}
              </h1>
              <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Joined {formatDate(user.joinedAt)}
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3">
              <Flame className="h-5 w-5 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Streak</p>
                <p className="font-display text-lg font-bold text-foreground">
                  {user.streak} days
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="mb-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              icon={<Zap className="h-5 w-5 text-primary" />}
              label="Quizzes Taken"
              value={user.totalQuizzes}
            />
            <StatsCard
              icon={<Trophy className="h-5 w-5" style={{ color: "hsl(38, 92%, 50%)" }} />}
              label="Total Points"
              value={user.totalScore}
            />
            <StatsCard
              icon={<Target className="h-5 w-5" style={{ color: "hsl(152, 60%, 42%)" }} />}
              label="Avg. Score"
              value={user.totalQuizzes > 0 ? `${user.averageScore}%` : "--"}
            />
            <StatsCard
              icon={<CheckCircle2 className="h-5 w-5" style={{ color: "hsl(220, 72%, 50%)" }} />}
              label="Perfect Scores"
              value={acedCount}
            />
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Category Breakdown */}
          <section className="lg:col-span-1">
            <h2 className="mb-4 font-display text-lg font-bold text-foreground">
              Category Breakdown
            </h2>
            <div className="rounded-xl border border-border bg-card p-5">
              {Object.keys(categoryBreakdown).length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-8 text-center">
                  <BookOpen className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    No quizzes taken yet. Start exploring categories!
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {Object.entries(categoryBreakdown).map(([catId, data]) => {
                    const avg = Math.round(data.totalPercentage / data.count)
                    const catName = getCategoryName(catId)
                    const catColor =
                      categories.find((c) => c.id === catId)?.color ||
                      "hsl(220, 72%, 50%)"
                    return (
                      <div key={catId}>
                        <div className="mb-1.5 flex items-center justify-between text-sm">
                          <span className="font-medium text-card-foreground">
                            {catName}
                          </span>
                          <span className="text-muted-foreground">
                            {avg}% avg ({data.count} quizzes)
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${avg}%`,
                              backgroundColor: catColor,
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </section>

          {/* Recent Attempts */}
          <section className="lg:col-span-2">
            <h2 className="mb-4 font-display text-lg font-bold text-foreground">
              Recent Quizzes
            </h2>
            <div className="rounded-xl border border-border bg-card">
              {recentAttempts.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-12 text-center">
                  <BookOpen className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Your quiz history will appear here after you complete a quiz.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {recentAttempts.map((attempt, i) => (
                    <div
                      key={`${attempt.quizId}-${i}`}
                      className="flex items-center gap-4 px-5 py-4"
                    >
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold",
                          attempt.percentage === 100
                            ? "bg-success/10 text-success"
                            : attempt.percentage >= 60
                              ? "bg-primary/10 text-primary"
                              : "bg-destructive/10 text-destructive"
                        )}
                      >
                        {attempt.percentage}%
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-medium text-card-foreground">
                          {attempt.quizTitle}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {getCategoryName(attempt.categoryId)} &middot;{" "}
                          {attempt.score}/{attempt.totalQuestions} correct
                        </p>
                      </div>
                      <div className="hidden shrink-0 text-right sm:block">
                        <p className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {attempt.timeTaken}s
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(attempt.completedAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

function StatsCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary">
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-display text-2xl font-bold text-card-foreground">
          {String(value)}
        </p>
      </div>
    </div>
  )
}
