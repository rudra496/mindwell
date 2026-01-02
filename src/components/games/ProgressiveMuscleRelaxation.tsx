"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Volume2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const muscleGroups = [
  {
    name: "Hands and Forearms",
    instruction: "Clench your fists tightly. Feel the tension in your hands and forearms.",
    release: "Release and let your hands relax completely. Notice the difference."
  },
  {
    name: "Upper Arms",
    instruction: "Bend your arms at the elbows and tense your biceps. Make them as tight as possible.",
    release: "Straighten your arms and let them hang loose. Feel the relaxation flowing through."
  },
  {
    name: "Shoulders",
    instruction: "Raise your shoulders up toward your ears. Hold the tension.",
    release: "Let your shoulders drop. Feel the release of tension."
  },
  {
    name: "Neck",
    instruction: "Gently press your head back and roll it slowly from side to side.",
    release: "Return to center and let your neck muscles relax completely."
  },
  {
    name: "Face and Jaw",
    instruction: "Scrunch up your entire face. Squeeze your eyes shut and clench your jaw.",
    release: "Release all facial muscles. Let your jaw drop slightly and your face soften."
  },
  {
    name: "Chest and Back",
    instruction: "Take a deep breath and hold it. Pull your shoulder blades together.",
    release: "Exhale slowly and let your chest and back muscles relax."
  },
  {
    name: "Abdomen",
    instruction: "Tighten your stomach muscles. Make your abdomen hard.",
    release: "Release and let your abdomen be soft. Breathe normally."
  },
  {
    name: "Thighs",
    instruction: "Tense your thighs by pressing your legs together. Hold tight.",
    release: "Let go and feel your thighs become loose and relaxed."
  },
  {
    name: "Calves",
    instruction: "Point your toes upward toward your head. Feel the tension in your calves.",
    release: "Relax your feet and let your calves soften completely."
  },
  {
    name: "Feet",
    instruction: "Curl your toes tightly. Hold the tension.",
    release: "Release and let your feet relax. Feel the complete relaxation."
  }
]

export default function ProgressiveMuscleRelaxation() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [phase, setPhase] = useState<'instruction' | 'tense' | 'release'>('instruction')
  const [timeLeft, setTimeLeft] = useState(7)
  const [completed, setCompleted] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const tenseDuration = 7 // seconds
  const releaseDuration = 10 // seconds

  useEffect(() => {
    if (isPlaying && !completed) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (phase === 'instruction') {
              setPhase('tense')
              return tenseDuration
            } else if (phase === 'tense') {
              setPhase('release')
              return releaseDuration
            } else {
              // Release phase done
              if (currentStep < muscleGroups.length - 1) {
                setCurrentStep(prev => prev + 1)
                setPhase('instruction')
                return 7
              } else {
                setCompleted(true)
                setIsPlaying(false)
                return 0
              }
            }
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, phase, currentStep, completed])

  const handleStart = () => {
    setIsPlaying(true)
    if (completed) {
      setCurrentStep(0)
      setPhase('instruction')
      setTimeLeft(7)
      setCompleted(false)
    }
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    setPhase('instruction')
    setTimeLeft(7)
    setCompleted(false)
  }

  const progress = ((currentStep * 100) / muscleGroups.length) + (phase === 'release' ? (100 / muscleGroups.length) * 0.6 : 0)

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-6 w-6 text-purple-600" />
          Progressive Muscle Relaxation (PMR)
        </CardTitle>
        <CardDescription>
          Reduce physical tension and stress by systematically tensing and relaxing muscle groups. 
          Follow the guided instructions for each body part.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{currentStep + 1} / {muscleGroups.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {!completed ? (
          <>
            {/* Current Muscle Group */}
            <div className="bg-purple-50 dark:bg-purple-950/20 p-6 rounded-lg border-2 border-purple-200 dark:border-purple-800">
              <h3 className="text-xl font-semibold mb-4 text-purple-900 dark:text-purple-100">
                {muscleGroups[currentStep].name}
              </h3>
              
              {/* Phase Indicator */}
              <div className="mb-4 flex items-center gap-2">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  phase === 'instruction' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200' :
                  phase === 'tense' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200' :
                  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
                }`}>
                  {phase === 'instruction' ? 'Get Ready' : phase === 'tense' ? 'Tense' : 'Release & Relax'}
                </div>
                <span className="text-2xl font-bold text-purple-600">{timeLeft}s</span>
              </div>

              {/* Instructions */}
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                {phase === 'instruction' ? "Prepare yourself..." :
                 phase === 'tense' ? muscleGroups[currentStep].instruction :
                 muscleGroups[currentStep].release}
              </p>
            </div>

            {/* Controls */}
            <div className="flex gap-3 justify-center">
              {!isPlaying ? (
                <Button onClick={handleStart} size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <Play className="mr-2 h-5 w-5" />
                  {currentStep === 0 && phase === 'instruction' ? 'Start' : 'Resume'}
                </Button>
              ) : (
                <Button onClick={handlePause} size="lg" variant="outline">
                  <Pause className="mr-2 h-5 w-5" />
                  Pause
                </Button>
              )}
              <Button onClick={handleReset} size="lg" variant="outline">
                <RotateCcw className="mr-2 h-5 w-5" />
                Reset
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center space-y-4 py-8">
            <div className="text-6xl mb-4">✨</div>
            <h3 className="text-2xl font-semibold text-purple-600">Session Complete!</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Excellent work! Your body should feel more relaxed now. 
              Practice PMR regularly for best results in managing stress and anxiety.
            </p>
            <Button onClick={handleReset} size="lg" className="bg-purple-600 hover:bg-purple-700">
              <RotateCcw className="mr-2 h-5 w-5" />
              Start Again
            </Button>
          </div>
        )}

        {/* Benefits */}
        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2 text-sm text-gray-900 dark:text-gray-100">Benefits of PMR:</h4>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Reduces physical tension and muscle pain</li>
            <li>• Lowers stress and anxiety levels</li>
            <li>• Improves sleep quality</li>
            <li>• Increases body awareness</li>
            <li>• Helps manage chronic pain</li>
            <li>• Promotes overall relaxation</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
