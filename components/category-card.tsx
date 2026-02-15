"use client"

import Link from "next/link"
import type { Category } from "@/lib/quiz-data"
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

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || Atom

  return (
    <Link href={`/category/${category.id}`}>
      <article className="group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${category.color}15` }}
        >
          <Icon className="h-6 w-6" style={{ color: category.color }} />
        </div>
        <div className="flex flex-col gap-1.5">
          <h3 className="font-display text-lg font-semibold text-card-foreground transition-colors group-hover:text-primary">
            {category.name}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {category.description}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            {category.quizCount} quizzes
          </span>
          <span className="text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
            Explore →
          </span>
        </div>
      </article>
    </Link>
  )
}
