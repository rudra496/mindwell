"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const steps = [
  {
    number: 5,
    sense: "SEE",
    prompt: "Look around and name 5 things you can see",
    examples: "Window, door, plant, phone, cup, picture, book, etc."
  },
  {
    number: 4,
    sense: "TOUCH",
    prompt: "Notice 4 things you can physically feel",
    examples: "Soft fabric, smooth phone, rough carpet, cool table, your hair, etc."
  },
  {
    number: 3,
    sense: "HEAR",
    prompt: "Listen for 3 sounds you can hear",
    examples: "Birds chirping, traffic, refrigerator humming, your breath, voices, etc."
  },
  {
    number: 2,
    sense: "SMELL",
    prompt: "Identify 2 things you can smell (or remember 2 favorite smells)",
    examples: "Coffee, fresh air, flowers, food, soap, perfume, etc."
  },
  {
    number: 1,
    sense: "TASTE",
    prompt: "Notice 1 thing you can taste",
    examples: "Mint from toothpaste, coffee, your last meal, or take a sip of water"
  }
]

export function GroundingGame() {
  const [currentStep, setCurrentStep] = useState(0)
  const [started, setStarted] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [items, setItems] = useState<string[]>([])
  const [currentInput, setCurrentInput] = useState("")

  const progress = ((currentStep + 1) / steps.length) * 100

  const handleStart = () => {
    setStarted(true)
    setCurrentStep(0)
    setCompleted(false)
    setItems([])
  }

  const handleAddItem = () => {
    if (currentInput.trim()) {
      setItems([...items, currentInput.trim()])
      setCurrentInput("")
      
      // Move to next step if we've added enough items for this sense
      const currentSenseItems = items.filter((_, idx) => {
        const previousSteps = steps.slice(0, currentStep)
        const startIdx = previousSteps.reduce((sum, step) => sum + step.number, 0)
        const endIdx = startIdx + steps[currentStep].number
        return idx >= startIdx && idx < endIdx
      })
      
      if (currentSenseItems.length + 1 >= steps[currentStep].number) {
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1)
        } else {
          setCompleted(true)
        }
      }
    }
  }

  const handleSkip = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setCompleted(true)
    }
  }

  if (!started) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">5-4-3-2-1 Grounding Technique</CardTitle>
          <CardDescription>
            A powerful sensory awareness exercise to bring you back to the present moment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">When to Use:</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>During anxiety or panic attacks</li>
              <li>When feeling disconnected or dissociated</li>
              <li>After a flashback or intrusive memory</li>
              <li>When you feel overwhelmed</li>
              <li>To calm racing thoughts</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">How it Works:</h3>
            <p className="text-sm text-muted-foreground">
              This technique uses your five senses to ground you in the present moment. By focusing on what you can
              see, touch, hear, smell, and taste, you interrupt anxious thoughts and reconnect with your surroundings.
            </p>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm font-medium text-amber-900">
              💡 Tip: Take your time with each sense. Really notice the details. There's no rush.
            </p>
          </div>
          
          <Button onClick={handleStart} className="w-full" size="lg">
            Start Grounding Exercise
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (completed) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Exercise Complete! 🎉</CardTitle>
          <CardDescription>
            You've successfully completed the 5-4-3-2-1 grounding technique
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold text-green-900">Well Done!</h3>
            <p className="text-sm text-green-800">
              You used all five senses to ground yourself in the present moment. How do you feel now compared to when you started?
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">What You Noticed:</h3>
            <div className="text-sm space-y-2">
              {steps.map((step, idx) => {
                const previousSteps = steps.slice(0, idx)
                const startIdx = previousSteps.reduce((sum, s) => sum + s.number, 0)
                const endIdx = startIdx + step.number
                const senseItems = items.slice(startIdx, endIdx)
                
                return senseItems.length > 0 ? (
                  <div key={idx}>
                    <p className="font-medium text-muted-foreground">{step.sense}:</p>
                    <ul className="list-disc list-inside ml-4">
                      {senseItems.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null
              })}
            </div>
          </div>
          
          <div className="space-y-2 pt-4 border-t">
            <h3 className="font-semibold">Remember:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✓ You can use this technique anytime, anywhere</li>
              <li>✓ It takes just a few minutes but can make a big difference</li>
              <li>✓ The more you practice, the more effective it becomes</li>
              <li>✓ You're safe. You're present. You're grounded.</li>
            </ul>
          </div>
          
          <Button onClick={handleStart} className="w-full" variant="outline">
            Practice Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  const currentStepData = steps[currentStep]

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-2xl">
            {currentStepData.number} - {currentStepData.sense}
          </CardTitle>
          <span className="text-sm font-medium text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-lg font-medium">{currentStepData.prompt}</p>
          <p className="text-sm text-muted-foreground">
            Examples: {currentStepData.examples}
          </p>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm font-medium text-blue-900">
            Take a deep breath. Look around you. What do you notice?
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
              placeholder={`Name something you can ${currentStepData.sense.toLowerCase()}...`}
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button onClick={handleAddItem} disabled={!currentInput.trim()}>
              Add
            </Button>
          </div>
        </div>
        
        {items.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">You've noticed:</h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              {items.slice(-5).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex gap-2 pt-4">
          <Button onClick={handleSkip} variant="outline" className="flex-1">
            Skip This Step
          </Button>
          {currentStep === steps.length - 1 && (
            <Button onClick={() => setCompleted(true)} className="flex-1">
              Finish
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
