"use client"

import { useSyncExternalStore, useCallback } from "react"
import type { QuizAttempt, UserProfile } from "./quiz-data"

interface QuizState {
  currentUser: UserProfile
  isQuizActive: boolean
  activeQuizId: string | null
}

const initialState: QuizState = {
  currentUser: {
    id: "current",
    name: "You",
    avatar: "YU",
    totalQuizzes: 0,
    totalScore: 0,
    averageScore: 0,
    streak: 3,
    joinedAt: "2025-12-01",
    attempts: [],
  },
  isQuizActive: false,
  activeQuizId: null,
}

let state = { ...initialState }
const listeners = new Set<() => void>()

function emitChange() {
  for (const listener of listeners) {
    listener()
  }
}

function getSnapshot() {
  return state
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function addQuizAttempt(attempt: QuizAttempt) {
  const newAttempts = [...state.currentUser.attempts, attempt]
  const totalScore = newAttempts.reduce((sum, a) => sum + a.score, 0)
  const totalQuizzes = newAttempts.length
  const averageScore = Math.round(
    newAttempts.reduce((sum, a) => sum + a.percentage, 0) / totalQuizzes
  )

  state = {
    ...state,
    currentUser: {
      ...state.currentUser,
      attempts: newAttempts,
      totalQuizzes,
      totalScore,
      averageScore,
    },
    isQuizActive: false,
    activeQuizId: null,
  }
  emitChange()
}

export function setActiveQuiz(quizId: string | null) {
  state = {
    ...state,
    isQuizActive: quizId !== null,
    activeQuizId: quizId,
  }
  emitChange()
}

export function useQuizStore() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  return snapshot
}

export function useCurrentUser() {
  const store = useQuizStore()
  return store.currentUser
}

export function useQuizActive() {
  const store = useQuizStore()
  return { isQuizActive: store.isQuizActive, activeQuizId: store.activeQuizId }
}
