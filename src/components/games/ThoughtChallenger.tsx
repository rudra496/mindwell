"use client"

import { useState } from "react"
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Brain, ArrowRight, CheckCircle2 } from "lucide-react"

const thoughtCategories = [
  { name: "All-or-Nothing", description: "Seeing things in black and white", example: "If I'm not perfect, I'm a failure" },
  { name: "Overgeneralization", description: "Drawing broad conclusions from single events", example: "One rejection means I'll never succeed" },
  { name: "Mental Filter", description: "Focusing only on negatives", example: "Ignoring 9 compliments but dwelling on 1 criticism" },
  { name: "Mind Reading", description: "Assuming you know what others think", example: "They think I'm stupid" },
  { name: "Catastrophizing", description: "Expecting the worst outcome", example: "This headache must be something serious" },
  { name: "Personalization", description: "Blaming yourself for things outside your control", example: "It's my fault they're upset" },
]

export default function ThoughtChallenger() {
  const [step, setStep] = useState(1)
  const [thought, setThought] = useState("")
  const [evidence, setEvidence] = useState("")
  const [alternative, setAlternative] = useState("")
  const [selectedDistortion, setSelectedDistortion] = useState<string | null>(null)

  const reset = () => {
    setStep(1)
    setThought("")
    setEvidence("")
    setAlternative("")
    setSelectedDistortion(null)
  }

  return (
    <div className="p-6">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-2xl">
          <Brain className="h-6 w-6 text-purple-600" />
          Thought Challenger (CBT Tool)
        </DialogTitle>
        <DialogDescription>
          Challenge negative automatic thoughts with evidence-based CBT techniques
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 space-y-6">
        {/* Progress indicator */}
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  step >= num ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {num}
              </div>
              {num < 4 && (
                <div
                  className={`w-12 h-1 mx-2 ${
                    step > num ? "bg-purple-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Identify the thought */}
        {step === 1 && (
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">Step 1: Identify the Negative Thought</h3>
              <p className="text-sm text-muted-foreground">
                What automatic negative thought are you experiencing? Be specific.
              </p>
              <Textarea
                value={thought}
                onChange={(e) => setThought(e.target.value)}
                placeholder="Example: 'I'm going to fail this presentation and everyone will think I'm incompetent'"
                rows={4}
                className="resize-none"
              />
              <Button
                onClick={() => setStep(2)}
                disabled={!thought.trim()}
                className="w-full"
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Identify cognitive distortion */}
        {step === 2 && (
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">Step 2: Identify the Cognitive Distortion</h3>
              <p className="text-sm text-muted-foreground">
                Which thinking pattern best describes this thought?
              </p>
              <div className="space-y-2">
                {thoughtCategories.map((category) => (
                  <Card
                    key={category.name}
                    className={`cursor-pointer transition-all ${
                      selectedDistortion === category.name
                        ? "border-purple-600 bg-purple-50"
                        : "hover:border-purple-300"
                    }`}
                    onClick={() => setSelectedDistortion(category.name)}
                  >
                    <CardContent className="p-4">
                      <p className="font-semibold text-sm">{category.name}</p>
                      <p className="text-xs text-muted-foreground">{category.description}</p>
                      <p className="text-xs italic mt-1">e.g., "{category.example}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!selectedDistortion}
                  className="flex-1"
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Examine the evidence */}
        {step === 3 && (
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">Step 3: Examine the Evidence</h3>
              <p className="text-sm text-muted-foreground">
                What evidence contradicts this thought? What would you tell a friend?
              </p>
              <Textarea
                value={evidence}
                onChange={(e) => setEvidence(e.target.value)}
                placeholder="Example: 'I've given presentations before and they went well. One person said my last presentation was helpful. Even if I'm nervous, that doesn't mean I'll fail.'"
                rows={5}
                className="resize-none"
              />
              <div className="flex gap-2">
                <Button onClick={() => setStep(2)} variant="outline" className="flex-1">
                  Back
                </Button>
                <Button
                  onClick={() => setStep(4)}
                  disabled={!evidence.trim()}
                  className="flex-1"
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Create balanced alternative */}
        {step === 4 && (
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">Step 4: Create a Balanced Alternative Thought</h3>
              <p className="text-sm text-muted-foreground">
                Based on the evidence, what's a more balanced, realistic thought?
              </p>
              <Textarea
                value={alternative}
                onChange={(e) => setAlternative(e.target.value)}
                placeholder="Example: 'I'm prepared and have presented successfully before. Even if I feel nervous, I can handle it and do my best.'"
                rows={4}
                className="resize-none"
              />

              {alternative.trim() && (
                <Card className="bg-green-50 border-green-500">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle2 className="h-5 w-5" />
                      <p className="font-semibold">Thought Record Complete!</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="font-semibold">Original thought:</p>
                        <p className="italic text-gray-700">"{thought}"</p>
                      </div>
                      <div>
                        <p className="font-semibold">Distortion: {selectedDistortion}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Balanced alternative:</p>
                        <p className="italic text-green-800">"{alternative}"</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-2">
                <Button onClick={() => setStep(3)} variant="outline" className="flex-1">
                  Back
                </Button>
                <Button onClick={reset} variant="default" className="flex-1">
                  Start New Challenge
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-sm text-blue-900">
            <p className="font-semibold mb-2">About CBT Thought Challenging:</p>
            <p>
              Cognitive Behavioral Therapy (CBT) helps identify and challenge distorted thinking patterns.
              Regular practice can reduce anxiety, depression, and improve emotional regulation.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
