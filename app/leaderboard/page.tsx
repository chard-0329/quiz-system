"use client"

import { Navbar } from "@/components/navbar"
import { mockLeaderboard } from "@/lib/quiz-data"
import { useCurrentUser } from "@/lib/quiz-store"
import { cn } from "@/lib/utils"
import { Trophy, Medal, Star, Crown, Target, Zap } from "lucide-react"

export default function LeaderboardPage() {
  const user = useCurrentUser()

  // Update the "You" entry in the leaderboard with real data
  const leaderboard = mockLeaderboard
    .map((entry) => {
      if (entry.userId === "current") {
        return {
          ...entry,
          totalScore: user.totalScore,
          quizzesCompleted: user.totalQuizzes,
          averageScore: user.averageScore,
          acedCount: user.attempts.filter((a) => a.percentage === 100).length,
        }
      }
      return entry
    })
    .sort((a, b) => b.totalScore - a.totalScore)
    .map((entry, i) => ({ ...entry, rank: i + 1 }))

  const userEntry = leaderboard.find((e) => e.userId === "current")

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
        {/* Header */}
        <section className="mb-8 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
            <Trophy className="h-7 w-7 text-accent" />
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold text-foreground lg:text-4xl">
            Leaderboard
          </h1>
          <p className="mt-2 text-muted-foreground">
            Top quiz masters ranked by total score
          </p>
        </section>

        {/* Your Rank Banner */}
        {userEntry && (
          <section className="mb-8">
            <div className="flex items-center gap-4 rounded-2xl border-2 border-primary/30 bg-primary/5 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground">
                #{userEntry.rank}
              </div>
              <div className="flex-1">
                <p className="font-display text-lg font-bold text-foreground">
                  Your Ranking
                </p>
                <p className="text-sm text-muted-foreground">
                  {userEntry.totalScore > 0
                    ? `${userEntry.totalScore} points from ${userEntry.quizzesCompleted} quizzes`
                    : "Complete quizzes to start climbing the leaderboard!"}
                </p>
              </div>
              <div className="hidden items-center gap-6 sm:flex">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Avg Score</p>
                  <p className="font-display text-lg font-bold text-foreground">
                    {userEntry.averageScore > 0 ? `${userEntry.averageScore}%` : "--"}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Aced</p>
                  <p className="font-display text-lg font-bold text-foreground">
                    {userEntry.acedCount}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Top 3 Podium */}
        <section className="mb-8">
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {leaderboard.slice(0, 3).map((entry, i) => {
              const podiumColors = [
                "border-accent bg-accent/5",
                "border-muted-foreground/30 bg-secondary/50",
                "border-[hsl(25,60%,50%)]/30 bg-[hsl(25,60%,50%)]/5",
              ]
              const iconColors = [
                "text-accent",
                "text-muted-foreground",
                "text-[hsl(25,60%,50%)]",
              ]
              const rankIcons = [Crown, Medal, Star]
              const RankIcon = rankIcons[i]

              return (
                <div
                  key={entry.userId}
                  className={cn(
                    "flex flex-col items-center gap-3 rounded-xl border-2 p-4 sm:p-6",
                    podiumColors[i],
                    entry.userId === "current" && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  )}
                >
                  <RankIcon className={cn("h-6 w-6 sm:h-7 sm:w-7", iconColors[i])} />
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-card text-sm font-bold text-card-foreground shadow-sm sm:h-14 sm:w-14 sm:text-base">
                    {entry.avatar}
                  </div>
                  <div className="text-center">
                    <p className={cn(
                      "font-display text-sm font-bold sm:text-base",
                      entry.userId === "current" ? "text-primary" : "text-foreground"
                    )}>
                      {entry.name}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {entry.totalScore} pts
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      {entry.averageScore > 0 ? `${entry.averageScore}%` : "--"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      {entry.acedCount}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Full Leaderboard Table */}
        <section>
          <h2 className="mb-4 font-display text-lg font-bold text-foreground">
            Full Rankings
          </h2>
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="hidden items-center gap-4 border-b border-border bg-secondary/50 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:flex">
              <span className="w-12">Rank</span>
              <span className="flex-1">Player</span>
              <span className="w-20 text-right">Score</span>
              <span className="w-20 text-right">Quizzes</span>
              <span className="w-20 text-right">Avg</span>
              <span className="w-16 text-right">Aced</span>
            </div>
            <div className="divide-y divide-border">
              {leaderboard.map((entry) => (
                <div
                  key={entry.userId}
                  className={cn(
                    "flex items-center gap-4 px-5 py-4 transition-colors",
                    entry.userId === "current" && "bg-primary/5"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold sm:h-8 sm:w-12",
                      entry.rank <= 3
                        ? "bg-accent/10 text-accent"
                        : "bg-secondary text-secondary-foreground"
                    )}
                  >
                    #{entry.rank}
                  </span>
                  <div className="flex flex-1 items-center gap-3 min-w-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                      {entry.avatar}
                    </div>
                    <div className="min-w-0">
                      <p
                        className={cn(
                          "truncate text-sm font-semibold",
                          entry.userId === "current"
                            ? "text-primary"
                            : "text-card-foreground"
                        )}
                      >
                        {entry.name}
                        {entry.userId === "current" && (
                          <span className="ml-2 inline-block rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-primary">
                            You
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground sm:hidden">
                        {entry.totalScore} pts &middot; {entry.quizzesCompleted} quizzes
                      </p>
                    </div>
                  </div>
                  <span className="hidden w-20 text-right text-sm font-semibold text-card-foreground sm:block">
                    {entry.totalScore}
                  </span>
                  <span className="hidden w-20 text-right text-sm text-muted-foreground sm:block">
                    {entry.quizzesCompleted}
                  </span>
                  <span className="hidden w-20 text-right text-sm text-muted-foreground sm:block">
                    {entry.averageScore > 0 ? `${entry.averageScore}%` : "--"}
                  </span>
                  <span className="hidden w-16 text-right text-sm font-medium text-accent sm:block">
                    {entry.acedCount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
