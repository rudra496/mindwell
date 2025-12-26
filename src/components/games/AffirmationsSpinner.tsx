"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, BookOpen, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const affirmations = [
  "I am worthy of love and respect",
  "I trust myself and my decisions",
  "I am growing and becoming stronger every day",
  "I deserve happiness and peace",
  "I am capable of handling whatever comes my way",
  "My feelings are valid",
  "I choose progress over perfection",
  "I am enough, just as I am",
  "I have the power to create positive change",
  "I am resilient and brave",
  "I deserve to take up space",
  "I am doing my best, and that is enough",
  "I forgive myself for my mistakes",
  "I am proud of myself for trying",
  "I choose to be kind to myself",
  "My mental health is a priority",
  "I am learning and improving",
  "I have overcome challenges before",
  "I am surrounded by love and support",
  "I trust the process of my healing"
]

export default function AffirmationsSpinner() {
  const [currentAffirmation, setCurrentAffirmation] = useState("")
  const [isSpinning, setIsSpinning] = useState(false)
  const [savedAffirmations, setSavedAffirmations] = useState<string[]>([])
  const [customAffirmation, setCustomAffirmation] = useState("")

  const spinWheel = () => {
    setIsSpinning(true)
    setCurrentAffirmation("")
    
    // Simulate spinning with rapid changes
    let count = 0
    const spinInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * affirmations.length)
      setCurrentAffirmation(affirmations[randomIndex])
      count++
      
      if (count > 15) {
        clearInterval(spinInterval)
        setIsSpinning(false)
      }
    }, 100)
  }

  const saveAffirmation = () => {
    if (currentAffirmation && !savedAffirmations.includes(currentAffirmation)) {
      setSavedAffirmations([...savedAffirmations, currentAffirmation])
    }
  }

  const addCustomAffirmation = () => {
    if (customAffirmation.trim()) {
      const trimmed = customAffirmation.trim()
      if (!affirmations.includes(trimmed)) {
        // Note: In production, this should update state or save to backend
        // For now, we're modifying the source array
        affirmations.push(trimmed)
        setCustomAffirmation("")
      }
    }
  }

  const removeFromSaved = (affirmation: string) => {
    setSavedAffirmations(savedAffirmations.filter(a => a !== affirmation))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-yellow-500" />
            <CardTitle>Affirmations Spinner</CardTitle>
          </div>
          <CardDescription>
            Spin the wheel to receive a random positive affirmation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <BookOpen className="h-4 w-4" />
            <AlertDescription>
              <strong>How to use:</strong> Click the spin button to receive a random affirmation. 
              Read it aloud or silently, and take a moment to let it sink in. Save affirmations that resonate with you.
            </AlertDescription>
          </Alert>

          {/* Spinning Display */}
          <div className="relative">
            <Card className={`border-4 ${isSpinning ? 'border-yellow-500 animate-pulse' : 'border-primary'}`}>
              <CardContent className="flex items-center justify-center min-h-[200px] p-8">
                {currentAffirmation ? (
                  <p className={`text-2xl font-semibold text-center ${isSpinning ? 'blur-sm' : ''}`}>
                    {currentAffirmation}
                  </p>
                ) : (
                  <p className="text-xl text-muted-foreground text-center">
                    Click the button below to spin and receive an affirmation
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={spinWheel}
              disabled={isSpinning}
              className="flex-1"
              size="lg"
            >
              {isSpinning ? "Spinning..." : "Spin for Affirmation"}
            </Button>
            {currentAffirmation && !isSpinning && (
              <Button
                variant="outline"
                onClick={saveAffirmation}
                size="lg"
              >
                Save
              </Button>
            )}
          </div>

          {/* Add Custom Affirmation */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">Add Your Own Affirmation</h3>
            <div className="flex gap-2">
              <Textarea
                value={customAffirmation}
                onChange={(e) => setCustomAffirmation(e.target.value)}
                placeholder="Type your personal affirmation..."
                rows={2}
                maxLength={150}
              />
              <Button
                variant="secondary"
                onClick={addCustomAffirmation}
                disabled={!customAffirmation.trim()}
              >
                Add
              </Button>
            </div>
          </div>

          {/* Saved Affirmations */}
          {savedAffirmations.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold">Your Saved Affirmations</h3>
              <div className="space-y-2">
                {savedAffirmations.map((affirmation, index) => (
                  <Card key={index} className="border-green-200 bg-green-50">
                    <CardContent className="py-3 px-4 flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="flex-1 text-sm">{affirmation}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromSaved(affirmation)}
                        className="text-xs"
                      >
                        Remove
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <Alert className="border-blue-200 bg-blue-50">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-900">
              <strong>Daily Practice:</strong> Use affirmations every morning or whenever you need a boost. 
              Repeat them multiple times and really feel the words. Consistency is key!
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
