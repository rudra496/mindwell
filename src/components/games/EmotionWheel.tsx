"use client"

import { useState } from "react"
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Smile, Meh, Frown, Heart, Brain, Zap, Cloud } from "lucide-react"

const emotions = [
  {
    primary: "Happy",
    icon: Smile,
    color: "text-yellow-500",
    bg: "bg-yellow-50",
    border: "border-yellow-500",
    secondary: ["Joyful", "Content", "Proud", "Excited", "Grateful", "Peaceful"]
  },
  {
    primary: "Sad",
    icon: Frown,
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-500",
    secondary: ["Lonely", "Disappointed", "Hurt", "Depressed", "Hopeless", "Grieving"]
  },
  {
    primary: "Angry",
    icon: Zap,
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-500",
    secondary: ["Frustrated", "Irritated", "Resentful", "Furious", "Betrayed", "Bitter"]
  },
  {
    primary: "Anxious",
    icon: Cloud,
    color: "text-purple-500",
    bg: "bg-purple-50",
    border: "border-purple-500",
    secondary: ["Worried", "Nervous", "Scared", "Overwhelmed", "Panicked", "Stressed"]
  },
  {
    primary: "Loving",
    icon: Heart,
    color: "text-pink-500",
    bg: "bg-pink-50",
    border: "border-pink-500",
    secondary: ["Caring", "Affectionate", "Tender", "Compassionate", "Trusting", "Appreciative"]
  },
  {
    primary: "Confused",
    icon: Brain,
    color: "text-indigo-500",
    bg: "bg-indigo-50",
    border: "border-indigo-500",
    secondary: ["Uncertain", "Doubtful", "Perplexed", "Conflicted", "Hesitant", "Lost"]
  },
]

export default function EmotionWheel() {
  const [selectedPrimary, setSelectedPrimary] = useState<string | null>(null)
  const [selectedSecondary, setSelectedSecondary] = useState<string | null>(null)
  const [showInfo, setShowInfo] = useState(false)

  const selectedEmotion = emotions.find(e => e.primary === selectedPrimary)

  const reset = () => {
    setSelectedPrimary(null)
    setSelectedSecondary(null)
    setShowInfo(false)
  }

  return (
    <div className="p-6">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-2xl">
          <Heart className="h-6 w-6 text-pink-600" />
          Emotion Wheel
        </DialogTitle>
        <DialogDescription>
          Identify and name your emotions with greater precision
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 space-y-6">
        {!selectedPrimary ? (
          <>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-sm text-blue-900">
                <p className="font-semibold mb-2">Step 1: Choose your primary emotion</p>
                <p>Select the emotion category that best describes how you're feeling right now.</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {emotions.map((emotion) => {
                const Icon = emotion.icon
                return (
                  <Card
                    key={emotion.primary}
                    className={`cursor-pointer transition-all hover:shadow-lg ${emotion.bg} ${emotion.border} border-2`}
                    onClick={() => setSelectedPrimary(emotion.primary)}
                  >
                    <CardContent className="p-6 text-center space-y-2">
                      <Icon className={`h-12 w-12 mx-auto ${emotion.color}`} />
                      <p className="font-bold text-lg">{emotion.primary}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </>
        ) : !selectedSecondary ? (
          <>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-sm text-blue-900">
                <p className="font-semibold mb-2">Step 2: Refine your emotion</p>
                <p>Choose a more specific word that describes your feeling of {selectedPrimary.toLowerCase()}.</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-3">
              {selectedEmotion?.secondary.map((emotion) => (
                <Card
                  key={emotion}
                  className={`cursor-pointer transition-all hover:shadow-lg ${selectedEmotion.bg} ${selectedEmotion.border} border`}
                  onClick={() => {
                    setSelectedSecondary(emotion)
                    setShowInfo(true)
                  }}
                >
                  <CardContent className="p-4 text-center">
                    <p className="font-semibold">{emotion}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button onClick={reset} variant="outline" className="w-full">
              Start Over
            </Button>
          </>
        ) : (
          <>
            <Card className={`${selectedEmotion?.bg} ${selectedEmotion?.border} border-2`}>
              <CardContent className="p-6 text-center space-y-4">
                {selectedEmotion && (
                  <>
                    {(() => {
                      const Icon = selectedEmotion.icon
                      return <Icon className={`h-16 w-16 mx-auto ${selectedEmotion.color}`} />
                    })()}
                  </>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">You identified feeling:</p>
                  <p className="text-3xl font-bold mt-2">{selectedSecondary}</p>
                  <p className="text-sm text-muted-foreground mt-1">(a type of {selectedPrimary})</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Why naming emotions matters:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span><strong>Emotional awareness</strong> helps you understand yourself better</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span><strong>Naming reduces intensity</strong> - labeling emotions can calm your nervous system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span><strong>Better communication</strong> - precise words help others understand you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span><strong>Emotional regulation</strong> - you can't manage what you can't name</span>
                  </li>
                </ul>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-3">
                    Now that you've identified feeling <strong>{selectedSecondary.toLowerCase()}</strong>, consider:
                  </p>
                  <ul className="space-y-2 text-sm list-disc list-inside">
                    <li>What triggered this emotion?</li>
                    <li>What does this emotion need right now?</li>
                    <li>How can you care for yourself feeling this way?</li>
                    <li>Is there an action that would help?</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Button onClick={reset} className="w-full">
              Identify Another Emotion
            </Button>
          </>
        )}

        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4 text-sm text-amber-900">
            <p className="font-semibold mb-2">💡 Tip:</p>
            <p>
              Research shows that people who can identify and name their emotions with precision
              (emotional granularity) have better mental health and emotional regulation.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
