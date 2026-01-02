"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Heart, Sparkles, Eye, Volume2, Wind } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const guidedSteps = [
  {
    title: "Find a Comfortable Position",
    instruction: "Sit or lie down in a comfortable position. Close your eyes or soften your gaze. Take three deep, slow breaths.",
    icon: Wind
  },
  {
    title: "Imagine Your Safe Place",
    instruction: "Picture a place where you feel completely safe, calm, and peaceful. This could be real or imaginary - a beach, forest, cozy room, or anywhere that brings you comfort.",
    icon: MapPin
  },
  {
    title: "What Do You See?",
    instruction: "Look around your safe place. Notice the colors, the light, the details. What objects are there? What's the scenery like? Make it as vivid as possible in your mind.",
    icon: Eye
  },
  {
    title: "What Do You Hear?",
    instruction: "Listen to the sounds of your safe place. Maybe it's waves, birds singing, gentle music, or peaceful silence. Let these sounds surround you.",
    icon: Volume2
  },
  {
    title: "What Do You Feel?",
    instruction: "Notice the physical sensations. The temperature on your skin, the surface beneath you, any textures around you. Feel the comfort and safety.",
    icon: Heart
  },
  {
    title: "What Do You Smell?",
    instruction: "Breathe in the scents of your safe place. Fresh air, flowers, rain, or any smell that adds to your sense of peace and security.",
    icon: Sparkles
  },
  {
    title: "Anchor This Feeling",
    instruction: "Feel the complete safety and peace of this place. Know that you can return here anytime you need comfort or calm. This is your personal sanctuary.",
    icon: Heart
  }
]

export default function SafePlaceVisualization() {
  const [currentStep, setCurrentStep] = useState(0)
  const [started, setStarted] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [safePlaceDescription, setSafePlaceDescription] = useState("")
  const [savedDescription, setSavedDescription] = useState("")

  const handleStart = () => {
    setStarted(true)
    setCurrentStep(0)
    setCompleted(false)
  }

  const handleNext = () => {
    if (currentStep < guidedSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSaveDescription = () => {
    setSavedDescription(safePlaceDescription)
  }

  const handleRestart = () => {
    setStarted(false)
    setCurrentStep(0)
    setCompleted(false)
  }

  if (!started) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-teal-600" />
            Safe Place Visualization
          </CardTitle>
          <CardDescription>
            Create a mental sanctuary you can visit anytime you need comfort, calm, or safety. 
            This powerful visualization technique is used in trauma therapy and stress management.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-teal-50 dark:bg-teal-950/20 p-6 rounded-lg border border-teal-200 dark:border-teal-800">
            <h3 className="font-semibold mb-3 text-teal-900 dark:text-teal-100">What You'll Do:</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold mt-0.5">•</span>
                <span>Guided visualization to create your personal safe place</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold mt-0.5">•</span>
                <span>Engage all five senses for a vivid, calming experience</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold mt-0.5">•</span>
                <span>Option to describe and save your safe place for future reference</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold mt-0.5">•</span>
                <span>Takes about 5-10 minutes</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-sm text-gray-900 dark:text-gray-100">Benefits:</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Reduces anxiety and stress quickly</li>
              <li>• Creates a mental resource for coping</li>
              <li>• Helps with trauma recovery (grounding)</li>
              <li>• Improves sleep and relaxation</li>
              <li>• Provides emotional regulation tool</li>
              <li>• Can be accessed anytime, anywhere</li>
            </ul>
          </div>

          <Alert>
            <AlertDescription>
              Find a quiet place where you won't be disturbed. This works best with eyes closed or softly focused.
            </AlertDescription>
          </Alert>

          <Button onClick={handleStart} size="lg" className="w-full bg-teal-600 hover:bg-teal-700">
            <MapPin className="mr-2 h-5 w-5" />
            Begin Visualization
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (completed) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-teal-600" />
            Visualization Complete
          </CardTitle>
          <CardDescription>
            You've created your personal safe place. You can return to it anytime you need comfort.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-6 space-y-4">
            <div className="text-6xl mb-4">🌟</div>
            <h3 className="text-2xl font-semibold text-teal-600">Well Done!</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Your safe place is now established in your mind. Remember, you can visit it whenever you need to feel grounded, calm, or protected.
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Describe Your Safe Place (Optional)
            </label>
            <Textarea
              placeholder="Write about your safe place to help remember it... Where is it? What makes it special? What do you see, hear, and feel there?"
              value={safePlaceDescription}
              onChange={(e) => setSafePlaceDescription(e.target.value)}
              rows={6}
              className="resize-none"
            />
            <Button 
              onClick={handleSaveDescription}
              variant="outline"
              className="w-full"
            >
              Save Description
            </Button>
            {savedDescription && (
              <Alert className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                <AlertDescription className="text-green-800 dark:text-green-200">
                  ✓ Your safe place description has been saved to your device!
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div className="bg-teal-50 dark:bg-teal-950/20 p-4 rounded-lg border border-teal-200 dark:border-teal-800">
            <h4 className="font-semibold mb-2 text-sm text-teal-900 dark:text-teal-100">How to Use Your Safe Place:</h4>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>• When you feel anxious, close your eyes and return to your safe place</li>
              <li>• Before sleep, visualize yourself in your safe place</li>
              <li>• During stressful moments, take 30 seconds to mentally visit</li>
              <li>• Practice visiting regularly to strengthen the mental image</li>
              <li>• You can add to or modify your safe place over time</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleRestart} variant="outline" className="flex-1">
              Create New Safe Place
            </Button>
            <Button onClick={() => setCompleted(false)} className="flex-1 bg-teal-600 hover:bg-teal-700">
              Review Steps
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const StepIcon = guidedSteps[currentStep].icon

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-teal-600" />
          Safe Place Visualization
        </CardTitle>
        <CardDescription>
          Step {currentStep + 1} of {guidedSteps.length}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-teal-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / guidedSteps.length) * 100}%` }}
          />
        </div>

        {/* Current Step */}
        <div className="bg-teal-50 dark:bg-teal-950/20 p-8 rounded-lg border-2 border-teal-200 dark:border-teal-800 min-h-[280px] flex flex-col items-center justify-center text-center space-y-4">
          <StepIcon className="h-16 w-16 text-teal-600" />
          <h3 className="text-2xl font-semibold text-teal-900 dark:text-teal-100">
            {guidedSteps[currentStep].title}
          </h3>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-lg">
            {guidedSteps[currentStep].instruction}
          </p>
        </div>

        {/* Breathing Reminder */}
        <Alert>
          <Wind className="h-4 w-4" />
          <AlertDescription>
            Take slow, deep breaths as you imagine each detail. There's no rush.
          </AlertDescription>
        </Alert>

        {/* Navigation */}
        <div className="flex gap-3">
          <Button 
            onClick={handlePrevious}
            disabled={currentStep === 0}
            variant="outline"
            className="flex-1"
          >
            Previous
          </Button>
          <Button 
            onClick={handleNext}
            className="flex-1 bg-teal-600 hover:bg-teal-700"
          >
            {currentStep === guidedSteps.length - 1 ? 'Complete' : 'Next'}
          </Button>
        </div>

        <Button onClick={handleRestart} variant="ghost" className="w-full text-sm text-gray-500">
          Start Over
        </Button>
      </CardContent>
    </Card>
  )
}
