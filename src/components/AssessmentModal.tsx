"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, ArrowLeft } from "lucide-react"
import { featureFlags, isHighRiskAssessment } from "@/lib/featureFlags"
import { CRISIS_BANGLADESH, CRISIS_US, EMERGENCY } from "@/lib/crisis-info"
import { ConsentModal } from "@/components/gating/ConsentModal"
import { AssessmentDisclaimer } from "@/components/safety/AssessmentDisclaimer"
import { useLanguage } from "@/lib/useLanguage"
import { tKey } from "@/lib/i18n"

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
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showConsentModal, setShowConsentModal] = useState(false)
  const [pendingAssessment, setPendingAssessment] = useState<Assessment | null>(null)
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
    // Check if consent is required for this assessment
    if (featureFlags.requireConsentForAssessments && isHighRiskAssessment(assessment.slug)) {
      setPendingAssessment(assessment)
      setShowConsentModal(true)
    } else {
      proceedWithAssessment(assessment)
    }
  }

  const proceedWithAssessment = (assessment: Assessment) => {
    setSelectedAssessment(assessment)
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
  }

  const handleConsentGranted = () => {
    if (pendingAssessment) {
      proceedWithAssessment(pendingAssessment)
      setPendingAssessment(null)
    }
  }

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const getScoreFromAnswerToken = (token: string) => {
    const parts = token.split(':')
    const score = Number(parts[parts.length - 1])
    return Number.isNaN(score) ? 0 : score
  }

  const getNumericAnswers = () => {
    return Object.fromEntries(
      Object.entries(answers).map(([questionId, token]) => [Number(questionId), getScoreFromAnswerToken(token)])
    )
  }

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, val) => sum + getScoreFromAnswerToken(val), 0)
  }

  const getInterpretation = (score: number, assessment: Assessment) => {
    const interpretations = JSON.parse(assessment.interpretations)
    for (const interp of interpretations) {
      const rangeParts = interp.range.split('-').map(Number)
      if (rangeParts.length === 2) {
        const [min, max] = rangeParts
        if (score >= min && score <= max) {
          return interp
        }
      } else if (rangeParts.length === 1 && score === rangeParts[0]) {
        return interp
      }
    }
    return interpretations[0]
  }

  const saveResults = async (score: number, interpretation: any) => {
    if (!selectedAssessment) return
    
    try {
      const { Assessments } = await import('@/lib/indexeddb')
      await Assessments.saveResult({
        assessmentId: selectedAssessment.id,
        assessmentName: selectedAssessment.name,
        answers: getNumericAnswers(),
        score,
        severity: interpretation.severity,
        date: new Date()
      })
    } catch (error) {
      console.error('Error saving assessment results:', error)
    }
  }

  const exportResults = async () => {
    if (!selectedAssessment) return
    
    const score = calculateScore()
    const interpretation = getInterpretation(score, selectedAssessment)
    
    const exportData = {
      assessment: selectedAssessment.name,
      date: new Date().toISOString(),
      score,
      maxScore: JSON.parse(selectedAssessment.scoringGuide).maxScore,
      severity: interpretation.severity,
      description: interpretation.description,
      recommendation: interpretation.recommendation
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedAssessment.slug}-results-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!selectedAssessment) {
    return (
      <>
        <ConsentModal 
          open={showConsentModal}
          onOpenChange={setShowConsentModal}
          onConsent={handleConsentGranted}
          assessmentName={pendingAssessment?.name}
          isHighRisk={pendingAssessment ? isHighRiskAssessment(pendingAssessment.slug) : false}
        />
        
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-[95vw] sm:max-w-2xl w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl break-words">
                {mounted 
                  ? tKey('assessmentModal.title', language)
                  : "Mental Health Self-Reflection Tools"}
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm">
                {mounted
                  ? tKey('assessmentModal.description', language)
                  : "Psychometric, evidence-based self-reflection tools"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <AssessmentDisclaimer />

              {loading ? (
                <div className="text-center py-8 text-sm sm:text-base">
                  {mounted
                    ? tKey('assessmentModal.loading', language)
                    : "Loading assessments..."}
                </div>
              ) : (
                <div className="grid gap-3">
                {assessments.map(assessment => (
                  <Button
                    key={assessment.id}
                    variant="outline"
                    className="justify-start h-auto py-3 sm:py-4 px-3 sm:px-4 text-left min-h-[60px]"
                    onClick={() => startAssessment(assessment)}
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-sm sm:text-lg break-words leading-tight">{assessment.name}</div>
                      <div className="text-xs sm:text-sm text-gray-600 mt-1 break-words line-clamp-2">{assessment.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      </>
    )
  }

  const questions = JSON.parse(selectedAssessment.questions)
  const totalQuestions = questions.length
  const progress = (Object.keys(answers).length / totalQuestions) * 100

  if (showResults) {
    const score = calculateScore()
    const interpretation = getInterpretation(score, selectedAssessment)
    const isCrisis = interpretation.severity === 'Severe'
    
    // Save results to IndexedDB
    saveResults(score, interpretation)

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedAssessment(null)}
                className="h-8 px-2 text-xs sm:text-sm"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to All Assessments
              </Button>
            </div>
            <DialogTitle className="text-xl sm:text-2xl break-words">Assessment Results</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {isCrisis && (
              <div className="p-3 sm:p-4 bg-red-50 border-2 border-red-500 rounded-lg">
                <div className="flex items-start gap-2 sm:gap-3">
                  <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-red-900 mb-2 text-sm sm:text-base">Your responses indicate you may need immediate support</p>
                    <p className="text-xs sm:text-sm text-red-800 mb-2">
                      If you're in crisis: <strong>Bangladesh</strong> — {CRISIS_BANGLADESH.organization} <strong>{CRISIS_BANGLADESH.phone}</strong> ({CRISIS_BANGLADESH.hours}). <strong>US</strong> — call or text <strong>{CRISIS_US.phone}</strong>.
                    </p>
                    <p className="text-xs sm:text-sm text-red-800">
                      Emergency: <strong>{EMERGENCY.BD}</strong> (Bangladesh) / <strong>{EMERGENCY.US}</strong> (US), or go to your nearest emergency room.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">{score}</div>
              <div className="text-xs sm:text-sm text-gray-600">
                out of {JSON.parse(selectedAssessment.scoringGuide).maxScore}
              </div>
            </div>

            <div>
              <div className="font-semibold text-base sm:text-lg mb-2 break-words">Severity: {interpretation.severity}</div>
              <p className="text-sm sm:text-base text-gray-700 mb-2 break-words">{interpretation.description}</p>
              <p className="text-xs sm:text-sm text-gray-600 break-words">{interpretation.recommendation}</p>
            </div>

            <div className="space-y-2">
              <Button onClick={exportResults} variant="outline" className="w-full text-sm sm:text-base min-h-[44px]">
                📥 Export Results
              </Button>
              <Button onClick={() => setSelectedAssessment(null)} variant="outline" className="w-full text-sm sm:text-base min-h-[44px]">
                Take Another Assessment
              </Button>
              <Button onClick={() => onOpenChange(false)} className="w-full text-sm sm:text-base min-h-[44px]">
                Close
              </Button>
            </div>

            <div className="text-xs text-gray-500 text-center">
              Results are automatically saved locally. Export to share with your healthcare provider.
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const question = questions[currentQuestion]
  const hasAnswer = answers[question.id] !== undefined

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedAssessment(null)
                setCurrentQuestion(0)
                setAnswers({})
                setShowResults(false)
              }}
              className="h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm border-2 shadow-sm hover:shadow-md min-h-[44px] sm:min-h-[48px] z-50"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 font-bold" />
              <span className="font-medium">Back</span>
            </Button>
          </div>
          <DialogTitle className="text-base sm:text-lg break-words">{selectedAssessment.name}</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Question {currentQuestion + 1} of {totalQuestions}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          <Progress value={progress} className="w-full" />

          <div className="space-y-4">
            <p className="text-base sm:text-lg font-medium break-words">{question.text}</p>
            <p className="text-xs sm:text-sm text-gray-600">Over the last 2 weeks, how often have you experienced this?</p>

            <RadioGroup
              key={`question-${currentQuestion}-${question.id}`}
              value={answers[question.id] || ""}
              onValueChange={(value) => handleAnswer(question.id, value)}
            >
              {question.options.map((option: { value: number; label: string }, optionIndex: number) => {
                const optionToken = `${question.id}:${optionIndex}:${option.value}`

                return (
                  <div key={`${question.id}-${optionIndex}-${option.value}`} className="flex items-center space-x-2 p-2 sm:p-3 border rounded-lg hover:bg-gray-50 min-h-[44px] sm:min-h-[48px] cursor-pointer transition-colors">
                    <RadioGroupItem value={optionToken} id={`q${question.id}-${optionIndex}-${option.value}`} className="cursor-pointer" />
                    <Label htmlFor={`q${question.id}-${optionIndex}-${option.value}`} className="flex-1 cursor-pointer text-xs sm:text-sm break-words leading-relaxed">
                      {option.label}
                    </Label>
                  </div>
                )
              })}
            </RadioGroup>
          </div>

          <div className="flex justify-between gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              disabled={currentQuestion === 0}
              className="text-sm sm:text-base min-h-[44px] sm:min-h-[48px]"
            >
              Previous
            </Button>

            {currentQuestion < totalQuestions - 1 ? (
              <Button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                disabled={!hasAnswer}
                className="text-sm sm:text-base min-h-[44px] sm:min-h-[48px]"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={() => setShowResults(true)}
                disabled={Object.keys(answers).length < totalQuestions}
                className="text-sm sm:text-base min-h-[44px] sm:min-h-[48px]"
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
