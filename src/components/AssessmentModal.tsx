"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { AlertCircle } from "lucide-react"

interface Assessment {
  id: string
  slug: string
  name: string
  description: string
  questions: string
  scoringGuide: string
  interpretations: string
}

export function AssessmentModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (open) {
      fetch('/api/assessments')
        .then(res => res.json())
        .then(data => {
          setAssessments(data)
          setLoading(false)
        })
        .catch(err => {
          console.error('Error fetching assessments:', err)
          setLoading(false)
        })
    }
  }, [open])

  const startAssessment = (assessment: Assessment) => {
    setSelectedAssessment(assessment)
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
  }

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers({ ...answers, [questionId]: value })
  }

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, val) => sum + val, 0)
  }

  const getInterpretation = (score: number, assessment: Assessment) => {
    const interpretations = JSON.parse(assessment.interpretations)
    for (const interp of interpretations) {
      const [min, max] = interp.range.split('-').map(Number)
      if (score >= min && score <= max) {
        return interp
      }
    }
    return interpretations[0]
  }

  if (!selectedAssessment) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Mental Health Self-Assessments</DialogTitle>
            <DialogDescription>
              Validated screening tools to help understand your mental health
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-900">
                <strong>Important:</strong> These are screening tools, not diagnostic instruments. 
                Results should be discussed with a healthcare professional.
              </p>
            </div>

            {loading ? (
              <div className="text-center py-8">Loading assessments...</div>
            ) : (
              <div className="grid gap-3">
                {assessments.map(assessment => (
                  <Button
                    key={assessment.id}
                    variant="outline"
                    className="justify-start h-auto py-4 px-4 text-left"
                    onClick={() => startAssessment(assessment)}
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-lg">{assessment.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{assessment.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const questions = JSON.parse(selectedAssessment.questions)
  const totalQuestions = questions.length
  const progress = (Object.keys(answers).length / totalQuestions) * 100

  if (showResults) {
    const score = calculateScore()
    const interpretation = getInterpretation(score, selectedAssessment)
    const isCrisis = interpretation.severity === 'Severe'

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Assessment Results</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {isCrisis && (
              <div className="p-4 bg-red-50 border-2 border-red-500 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-red-900 mb-2">Your responses indicate you may need immediate support</p>
                    <p className="text-sm text-red-800 mb-2">
                      If you're in crisis: Call or text <strong>988</strong> (Suicide & Crisis Lifeline) now
                    </p>
                    <p className="text-sm text-red-800">
                      Emergency: Call <strong>911</strong> or go to nearest emergency room
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-5xl font-bold text-primary mb-2">{score}</div>
              <div className="text-sm text-gray-600">
                out of {JSON.parse(selectedAssessment.scoringGuide).maxScore}
              </div>
            </div>

            <div>
              <div className="font-semibold text-lg mb-2">Severity: {interpretation.severity}</div>
              <p className="text-gray-700 mb-2">{interpretation.description}</p>
              <p className="text-sm text-gray-600">{interpretation.recommendation}</p>
            </div>

            <div className="space-y-2">
              <Button onClick={() => setSelectedAssessment(null)} variant="outline" className="w-full">
                Take Another Assessment
              </Button>
              <Button onClick={() => onOpenChange(false)} className="w-full">
                Close
              </Button>
            </div>

            <div className="text-xs text-gray-500 text-center">
              Save or print these results to discuss with your healthcare provider
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const question = questions[currentQuestion]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{selectedAssessment.name}</DialogTitle>
          <DialogDescription>
            Question {currentQuestion + 1} of {totalQuestions}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Progress value={progress} className="w-full" />

          <div className="space-y-4">
            <p className="text-lg font-medium">{question.text}</p>
            <p className="text-sm text-gray-600">Over the last 2 weeks, how often have you experienced this?</p>

            <RadioGroup
              value={answers[question.id]?.toString()}
              onValueChange={(value) => handleAnswer(question.id, parseInt(value))}
            >
              {question.options.map((option: { value: number; label: string }) => (
                <div key={option.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={option.value.toString()} id={`q${question.id}-${option.value}`} />
                  <Label htmlFor={`q${question.id}-${option.value}`} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>

            {currentQuestion < totalQuestions - 1 ? (
              <Button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                disabled={answers[question.id] === undefined}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={() => setShowResults(true)}
                disabled={Object.keys(answers).length < totalQuestions}
              >
                See Results
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
