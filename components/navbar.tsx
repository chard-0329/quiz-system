"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutGrid, User, Trophy, Zap } from "lucide-react"

const navItems = [
  { href: "/", label: "Categories", icon: LayoutGrid },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            QuizArena
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Mobile nav */}
        <nav className="flex items-center gap-1 md:hidden" aria-label="Mobile navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-center rounded-lg p-2 transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
                aria-label={item.label}
              >
                <item.icon className="h-5 w-5" />
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
