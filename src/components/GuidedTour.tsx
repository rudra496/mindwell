'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'

const TOUR_STORAGE_KEY = 'mindwell:tour-completed'

type TourStep = {
  id: string
  title: string
  content: string
}

const steps: TourStep[] = [
  {
    id: 'hero',
    title: 'Welcome to MindWell',
    content: 'Use MindWell to learn, self-reflect, and quickly find crisis support resources when needed.',
  },
  {
    id: 'learn-awareness',
    title: 'Learn & Awareness',
    content: 'Explore educational resources about mental health conditions in clear, non-judgmental language.',
  },
  {
    id: 'self-reflection-tools',
    title: 'Self-Reflection Tools',
    content: 'Take evidence-informed screening tools to understand symptoms. These are not diagnostic tools.',
  },
  {
    id: 'crisis-emergency-help',
    title: 'Emergency Help',
    content: 'If you or someone else may be in danger, open Emergency Support or Crisis Resources immediately.',
  },
]

export function GuidedTour() {
  const [runTour, setRunTour] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    const openHandler = () => {
      setStepIndex(0)
      setRunTour(true)
    }

    window.addEventListener('mindwell:start-tour', openHandler)
    return () => window.removeEventListener('mindwell:start-tour', openHandler)
  }, [])

  const currentStep = useMemo(() => steps[stepIndex], [stepIndex])

  useEffect(() => {
    if (!runTour || !currentStep) return
    const section = document.getElementById(currentStep.id)
    section?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [currentStep, runTour])

  if (!runTour || !currentStep) return null

  const handleClose = () => {
    window.localStorage.setItem(TOUR_STORAGE_KEY, 'true')
    setRunTour(false)
  }

  return (
    <div className="fixed inset-0 z-[80] bg-black/55 p-4 sm:p-6 flex items-end sm:items-center justify-center">
      <div className="w-full max-w-lg rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl p-5">
        <div className="flex justify-end">
          <button aria-label="Close tour" className="text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white" onClick={handleClose}>✕</button>
        </div>
        <p className="text-xs font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-300">
          Guided tour • Step {stepIndex + 1} of {steps.length}
        </p>
        <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">{currentStep.title}</h2>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{currentStep.content}</p>
        <div className="mt-5 flex flex-wrap gap-2 justify-end">
          <Button variant="outline" onClick={handleClose}>Skip tour</Button>
          {stepIndex > 0 && (
            <Button variant="outline" onClick={() => setStepIndex((value) => value - 1)}>
              Back
            </Button>
          )}
          {stepIndex < steps.length - 1 ? (
            <Button onClick={() => setStepIndex((value) => value + 1)}>Next</Button>
          ) : (
            <Button onClick={handleClose}>Finish</Button>
          )}
        </div>
      </div>
    </div>
  )
}

export function startGuidedTour() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('mindwell:start-tour'))
  }
}
