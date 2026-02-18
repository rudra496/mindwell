"use client"

import { useState, useEffect, useMemo } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type TourStep = {
  target: string
  title: string
  content: string
  placement?: "top" | "bottom" | "left" | "right"
}

export function GuidedTour() {
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const steps: TourStep[] = useMemo(() => [
    {
      target: "body",
      title: "Welcome to MindWell! 👋",
      content: "A comprehensive, free, and open-source mental health platform designed to support your wellbeing. Let us show you around in 7 quick steps.",
      placement: "bottom",
    },
    {
      target: "learn-awareness",
      title: "📚 Find Mental Health Information",
      content: "Access evidence-based information about 63 mental health conditions including symptoms, treatments, and support resources.",
      placement: "top",
    },
    {
      target: "self-reflection-tools",
      title: "📋 Self-Reflection Tools",
      content: "Use 20 validated assessments to better understand your mental health. These are for self-reflection only, not diagnosis.",
      placement: "top",
    },
    {
      target: "psychologists",
      title: "👨‍⚕️ Connect with Professionals",
      content: "Browse verified psychologist profiles and connect directly for clinical support.",
      placement: "top",
    },
    {
      target: "community",
      title: "👥 Community Support",
      content: "Join peer support discussions in a safe, moderated environment. Share experiences and connect with others.",
      placement: "top",
    },
    {
      target: "crisis-emergency-help",
      title: "🆘 Crisis Resources",
      content: "In a crisis? Access immediate help through 24/7 hotlines and emergency services. Your safety is our priority. Also check the red 'Need Help Now?' button always visible on your screen.",
      placement: "bottom",
    },
    {
      target: "body",
      title: "🔒 Your Privacy Matters",
      content: "MindWell is 100% private. We don't collect, store, or share your personal data. All tools run locally in your browser. You're all set! Explore MindWell at your own pace. 💚",
      placement: "bottom",
    },
  ], [])

  useEffect(() => {
    // Check if user has seen the tour before
    const hasSeenTour = localStorage.getItem("mindwell-tour-completed")
    
    // Only show tour to first-time visitors after a short delay
    if (!hasSeenTour && typeof window !== "undefined") {
      const timer = setTimeout(() => {
        setIsActive(true)
      }, 2000) // 2 second delay for page to load

      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (isActive && steps[currentStep].target !== "body") {
      const element = document.getElementById(steps[currentStep].target)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }, [currentStep, isActive, steps])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      completeTour()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const completeTour = () => {
    localStorage.setItem("mindwell-tour-completed", "true")
    setIsActive(false)
  }

  const skipTour = () => {
    completeTour()
  }

  if (!isActive) return null

  const step = steps[currentStep]

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-[9998]" onClick={skipTour} />

      {/* Tour Card */}
      <div className="fixed z-[9999] max-w-md w-full mx-4 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white pr-4">
            {step.title}
          </h3>
          <button
            onClick={skipTour}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Close tour"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-6 text-base leading-relaxed">
          {step.content}
        </p>

        {/* Progress Indicators */}
        <div className="flex gap-2 mb-6">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded-full transition-colors ${
                index === currentStep
                  ? "bg-teal-600"
                  : index < currentStep
                  ? "bg-teal-300"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={skipTour}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Skip tour
          </button>

          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleBack}
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
            )}
            <Button
              size="sm"
              onClick={handleNext}
              className="gap-1 bg-teal-600 hover:bg-teal-700"
            >
              {currentStep === steps.length - 1 ? "Finish" : "Next"}
              {currentStep < steps.length - 1 && <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Step counter */}
        <div className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>
    </>
  )
}
