"use client"

import { useState, useEffect } from "react"
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, CheckCircle2, XCircle, Trophy, Star } from "lucide-react"

type Difficulty = "easy" | "medium" | "hard" | "expert"

interface Pattern {
  sequence: string[]
  options: string[]
  answer: string
}

const shapes = ["🔴", "🟦", "🟢", "🟡", "🟣", "🟠", "⬛", "⬜"]

const generatePattern = (difficulty: Difficulty): Pattern => {
  let patternLength = 4
  let optionsCount = 4
  
  switch (difficulty) {
    case "easy":
      patternLength = 4
      optionsCount = 4
      break
    case "medium":
      patternLength = 5
      optionsCount = 5
      break
    case "hard":
      patternLength = 6
      optionsCount = 6
      break
    case "expert":
      patternLength = 7
      optionsCount = 6
      break
  }

  const patternType = Math.random() < 0.5 ? "repeat" : "alternate"
  const sequence: string[] = []
  
  if (patternType === "repeat") {
    // Repeating pattern (e.g., A B A B)
    const repeatLength = Math.floor(Math.random() * 2) + 2 // 2 or 3 items
    const basePattern = shapes.slice(0, repeatLength).sort(() => Math.random() - 0.5)
    
    for (let i = 0; i < patternLength; i++) {
      sequence.push(basePattern[i % basePattern.length])
    }
    
    const answer = basePattern[patternLength % basePattern.length]
    
    // Generate wrong options
    const wrongOptions = shapes.filter(s => s !== answer).sort(() => Math.random() - 0.5).slice(0, optionsCount - 1)
    const options = [answer, ...wrongOptions].sort(() => Math.random() - 0.5)
    
    return { sequence, options, answer }
  } else {
    // Alternating or incrementing pattern
    const step = Math.floor(Math.random() * 2) + 1
    const startIdx = Math.floor(Math.random() * (shapes.length - patternLength * step))
    
    for (let i = 0; i < patternLength; i++) {
      sequence.push(shapes[startIdx + i * step])
    }
    
    const answer = shapes[startIdx + patternLength * step]
    
    // Generate wrong options
    const wrongOptions = shapes.filter(s => s !== answer).sort(() => Math.random() - 0.5).slice(0, optionsCount - 1)
    const options = [answer, ...wrongOptions].sort(() => Math.random() - 0.5)
    
    return { sequence, options, answer }
  }
}

const difficulties: Record<Difficulty, { label: string; color: string; rounds: number }> = {
  easy: { label: "Easy (4 patterns)", color: "bg-green-100 text-green-800 border-green-300", rounds: 5 },
  medium: { label: "Medium (5 patterns)", color: "bg-blue-100 text-blue-800 border-blue-300", rounds: 7 },
  hard: { label: "Hard (6 patterns)", color: "bg-orange-100 text-orange-800 border-orange-300", rounds: 10 },
  expert: { label: "Expert (7 patterns)", color: "bg-red-100 text-red-800 border-red-300", rounds: 12 },
}

export default function PatternRecognition() {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium")
  const [currentRound, setCurrentRound] = useState(1)
  const [pattern, setPattern] = useState<Pattern | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [bestScores, setBestScores] = useState<Record<Difficulty, number>>({
    easy: 0,
    medium: 0,
    hard: 0,
    expert: 0,
  })

  useEffect(() => {
    const saved = localStorage.getItem("patternRecognitionBestScores")
    if (saved) {
      setBestScores(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    startGame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty])

  useEffect(() => {
    if (pattern && !isCorrect && !isComplete && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleAnswer("timeout")
            return 30
          }
          return prev - 1
        })
      }, 1000)
      
      return () => clearInterval(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pattern, isCorrect, isComplete, timeLeft])

  const startGame = () => {
    setCurrentRound(1)
    setScore(0)
    setIsComplete(false)
    setTimeLeft(30)
    nextRound()
  }

  const nextRound = () => {
    setPattern(generatePattern(difficulty))
    setSelectedAnswer(null)
    setIsCorrect(null)
    setTimeLeft(30)
  }

  const handleAnswer = (answer: string) => {
    if (!pattern || isCorrect !== null) return

    setSelectedAnswer(answer)
    const correct = answer === pattern.answer
    setIsCorrect(correct)

    if (correct) {
      setScore(prev => prev + 1)
    }

    setTimeout(() => {
      if (currentRound >= difficulties[difficulty].rounds) {
        completeGame()
      } else {
        setCurrentRound(prev => prev + 1)
        nextRound()
      }
    }, 1500)
  }

  const completeGame = () => {
    setIsComplete(true)
    const percentage = Math.round((score / difficulties[difficulty].rounds) * 100)
    
    if (percentage > bestScores[difficulty]) {
      const newBestScores = { ...bestScores, [difficulty]: percentage }
      setBestScores(newBestScores)
      localStorage.setItem("patternRecognitionBestScores", JSON.stringify(newBestScores))
    }
  }

  if (!pattern) return null

  return (
    <div className="p-4 sm:p-6">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl">
          <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
          Pattern Recognition Challenge
        </DialogTitle>
        <DialogDescription className="text-sm sm:text-base">
          Complete the pattern by selecting the next shape in the sequence. Train your cognitive abilities!
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 space-y-4">
        {/* Difficulty Selection */}
        {isComplete && (
          <div>
            <h3 className="text-sm font-semibold mb-2">Select Difficulty:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(difficulties) as Difficulty[]).map((diff) => (
                <Button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  variant={difficulty === diff ? "default" : "outline"}
                  className="text-xs sm:text-sm"
                >
                  {difficulties[diff].label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        {!isComplete && (
          <div className="flex flex-wrap justify-between items-center gap-2 sm:gap-4">
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="outline" className="text-sm sm:text-base px-3 py-1">
                Round: {currentRound}/{difficulties[difficulty].rounds}
              </Badge>
              <Badge variant="outline" className="text-sm sm:text-base px-3 py-1">
                Score: {score}
              </Badge>
              <Badge variant={timeLeft <= 10 ? "destructive" : "outline"} className="text-sm sm:text-base px-3 py-1">
                Time: {timeLeft}s
              </Badge>
            </div>
            <Badge variant="outline" className="text-sm sm:text-base px-3 py-1">
              <Trophy className="h-4 w-4 mr-1" />
              Best: {bestScores[difficulty]}%
            </Badge>
          </div>
        )}

        {/* Pattern Display */}
        {!isComplete && (
          <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold mb-3 text-center">Complete the Pattern:</h3>
              <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-4">
                {pattern.sequence.map((shape, idx) => (
                  <div
                    key={idx}
                    className="text-3xl sm:text-4xl md:text-5xl w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-white rounded-lg shadow-sm"
                  >
                    {shape}
                  </div>
                ))}
                <div className="text-3xl sm:text-4xl md:text-5xl w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-gray-200 rounded-lg shadow-sm border-2 border-dashed border-gray-400">
                  ?
                </div>
              </div>

              <h3 className="text-sm font-semibold mb-3 text-center">Select the Next Shape:</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                {pattern.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option)}
                    disabled={isCorrect !== null}
                    className={`text-3xl sm:text-4xl md:text-5xl w-full aspect-square flex items-center justify-center bg-white rounded-lg shadow-sm transition-all hover:scale-110 hover:shadow-md disabled:opacity-50 border-2 ${
                      selectedAnswer === option
                        ? isCorrect
                          ? "border-green-500 bg-green-50"
                          : "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-purple-400"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {isCorrect !== null && (
                <div className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${
                  isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="font-semibold">Correct! Well done!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5" />
                      <span className="font-semibold">
                        {selectedAnswer === "timeout" ? "Time's up!" : "Incorrect."} The answer was {pattern.answer}
                      </span>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Completion */}
        {isComplete && (
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-500 border-2">
            <CardContent className="p-6 space-y-4">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-green-800 mb-2">🎉 Game Complete!</h3>
                <div className="text-4xl font-bold text-green-700 mb-2">
                  {Math.round((score / difficulties[difficulty].rounds) * 100)}%
                </div>
                <p className="text-sm text-green-600">
                  You got {score} out of {difficulties[difficulty].rounds} correct!
                </p>
                {Math.round((score / difficulties[difficulty].rounds) * 100) > bestScores[difficulty] && (
                  <Badge className="bg-yellow-100 text-yellow-800 mt-2">
                    <Star className="h-3 w-3 mr-1" /> New Personal Best!
                  </Badge>
                )}
              </div>
              <Button onClick={startGame} className="w-full">
                Play Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Benefits */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-3 sm:p-4 text-xs sm:text-sm text-blue-900">
            <p className="font-semibold mb-2">Cognitive Benefits:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Enhances pattern recognition and logical thinking</li>
              <li>Improves cognitive processing speed</li>
              <li>Strengthens working memory and attention span</li>
              <li>Develops problem-solving skills</li>
              <li>Provides mindful mental stimulation</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
