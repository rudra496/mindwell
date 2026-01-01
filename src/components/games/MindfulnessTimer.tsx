"use client"

import { useState, useEffect } from "react"
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Play, Pause, RotateCcw, Bell } from "lucide-react"

export default function MindfulnessTimer() {
  const [duration, setDuration] = useState(5) // minutes
  const [timeLeft, setTimeLeft] = useState(300) // seconds
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsRunning(false)
            setIsComplete(true)
            return 0
          }
          return time - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft])

  const startTimer = () => {
    if (timeLeft === 0) {
      setTimeLeft(duration * 60)
      setIsComplete(false)
    }
    setIsRunning(true)
  }

  const pauseTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(duration * 60)
    setIsComplete(false)
  }

  const changeDuration = (newDuration: number) => {
    setDuration(newDuration)
    setTimeLeft(newDuration * 60)
    setIsRunning(false)
    setIsComplete(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100

  return (
    <div className="p-6">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-2xl">
          <Clock className="h-6 w-6 text-teal-600" />
          Mindfulness Timer
        </DialogTitle>
        <DialogDescription>
          Set a timer for your meditation or mindfulness practice
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 space-y-6">
        {/* Timer display */}
        <Card className="bg-gradient-to-br from-teal-50 to-blue-50">
          <CardContent className="p-8">
            <div className="relative">
              {/* Circular progress */}
              <div className="relative w-64 h-64 mx-auto">
                <svg className="transform -rotate-90 w-64 h-64">
                  <circle
                    cx="128"
                    cy="128"
                    r="112"
                    stroke="currentColor"
                    strokeWidth="16"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="128"
                    cy="128"
                    r="112"
                    stroke="currentColor"
                    strokeWidth="16"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 112}`}
                    strokeDashoffset={`${2 * Math.PI * 112 * (1 - progress / 100)}`}
                    className="text-teal-600 transition-all duration-1000"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-6xl font-bold text-teal-600">{formatTime(timeLeft)}</p>
                  {!isRunning && !isComplete && (
                    <p className="text-sm text-muted-foreground mt-2">Ready to begin</p>
                  )}
                  {isRunning && (
                    <p className="text-sm text-teal-600 mt-2">Breathing mindfully...</p>
                  )}
                  {isComplete && (
                    <div className="text-center mt-2">
                      <Bell className="h-6 w-6 text-green-600 mx-auto animate-pulse" />
                      <p className="text-sm text-green-600 font-semibold">Session complete!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Duration selection */}
        {!isRunning && !isComplete && (
          <Card>
            <CardContent className="p-6">
              <p className="font-semibold mb-3">Select Duration:</p>
              <div className="grid grid-cols-3 gap-2">
                {[1, 3, 5, 10, 15, 20, 30, 45, 60].map((mins) => (
                  <Button
                    key={mins}
                    onClick={() => changeDuration(mins)}
                    variant={duration === mins ? "default" : "outline"}
                    size="lg"
                  >
                    {mins} min
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Controls */}
        <div className="flex gap-3">
          {!isRunning ? (
            <Button onClick={startTimer} size="lg" className="flex-1">
              <Play className="mr-2 h-5 w-5" />
              {isComplete ? "Restart" : "Start"}
            </Button>
          ) : (
            <Button onClick={pauseTimer} size="lg" variant="secondary" className="flex-1">
              <Pause className="mr-2 h-5 w-5" />
              Pause
            </Button>
          )}
          <Button onClick={resetTimer} size="lg" variant="outline">
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>

        {/* Instructions */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 space-y-3 text-sm text-blue-900">
            <p className="font-semibold">Simple Mindfulness Meditation Guide:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Find a comfortable position, sitting or lying down</li>
              <li>Close your eyes or soften your gaze</li>
              <li>Bring attention to your breath - notice each inhale and exhale</li>
              <li>When your mind wanders (it will!), gently return to the breath</li>
              <li>Be kind to yourself - there's no "wrong" way to meditate</li>
            </ol>
            <p className="pt-2 border-t border-blue-300">
              <strong>Tip:</strong> Start with shorter sessions (5-10 minutes) and gradually increase as you build the habit.
            </p>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card>
          <CardContent className="p-4 space-y-2 text-sm">
            <p className="font-semibold">Benefits of Regular Mindfulness Practice:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Reduces stress and anxiety</li>
              <li>Improves focus and concentration</li>
              <li>Enhances emotional regulation</li>
              <li>Increases self-awareness</li>
              <li>Better sleep quality</li>
              <li>Reduced rumination and worry</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
