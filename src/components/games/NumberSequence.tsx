"use client"

import { useState, useEffect } from "react"
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calculator, CheckCircle2, XCircle, Trophy, Star, Brain } from "lucide-react"

type Difficulty = "easy" | "medium" | "hard" | "expert"

interface Sequence {
  numbers: number[]
  answer: number
  rule: string
}

const generateSequence = (difficulty: Difficulty): Sequence => {
  let sequenceLength = 4
  
  switch (difficulty) {
    case "easy":
      sequenceLength = 4
      break
    case "medium":
      sequenceLength = 5
      break
    case "hard":
      sequenceLength = 6
      break
    case "expert":
      sequenceLength = 7
      break
  }

  const rules = [
    "add", "multiply", "fibonacci", "square", "alternate", "double", "prime"
  ]
  
  const ruleType = rules[Math.floor(Math.random() * (difficulty === "easy" ? 2 : difficulty === "medium" ? 4 : rules.length))]
  const numbers: number[] = []
  let answer = 0
  let rule = ""

  switch (ruleType) {
    case "add": {
      const step = Math.floor(Math.random() * (difficulty === "easy" ? 5 : 10)) + 1
      const start = Math.floor(Math.random() * 20) + 1
      for (let i = 0; i < sequenceLength; i++) {
        numbers.push(start + i * step)
      }
      answer = start + sequenceLength * step
      rule = `Add ${step} each time`
      break
    }
    case "multiply": {
      const factor = difficulty === "easy" ? 2 : Math.floor(Math.random() * 3) + 2
      const start = Math.floor(Math.random() * 5) + 1
      for (let i = 0; i < sequenceLength; i++) {
        numbers.push(start * Math.pow(factor, i))
      }
      answer = start * Math.pow(factor, sequenceLength)
      rule = `Multiply by ${factor} each time`
      break
    }
    case "fibonacci": {
      numbers.push(1, 1)
      for (let i = 2; i < sequenceLength; i++) {
        numbers.push(numbers[i - 1] + numbers[i - 2])
      }
      answer = numbers[sequenceLength - 1] + numbers[sequenceLength - 2]
      rule = "Fibonacci sequence (sum of previous two)"
      break
    }
    case "square": {
      const start = Math.floor(Math.random() * 5) + 1
      for (let i = 0; i < sequenceLength; i++) {
        numbers.push(Math.pow(start + i, 2))
      }
      answer = Math.pow(start + sequenceLength, 2)
      rule = "Square numbers"
      break
    }
    case "alternate": {
      const step1 = Math.floor(Math.random() * 5) + 2
      const step2 = Math.floor(Math.random() * 5) + 2
      const start = Math.floor(Math.random() * 10) + 1
      for (let i = 0; i < sequenceLength; i++) {
        if (i === 0) {
          numbers.push(start)
        } else {
          numbers.push(numbers[i - 1] + (i % 2 === 1 ? step1 : step2))
        }
      }
      answer = numbers[sequenceLength - 1] + (sequenceLength % 2 === 1 ? step1 : step2)
      rule = `Alternating pattern (+${step1}, +${step2})`
      break
    }
    case "double": {
      const add = Math.floor(Math.random() * 5) + 1
      const start = Math.floor(Math.random() * 5) + 1
      for (let i = 0; i < sequenceLength; i++) {
        if (i === 0) {
          numbers.push(start)
        } else {
          numbers.push(numbers[i - 1] * 2 + add)
        }
      }
      answer = numbers[sequenceLength - 1] * 2 + add
      rule = `Double and add ${add}`
      break
    }
    case "prime": {
      const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71]
      for (let i = 0; i < sequenceLength; i++) {
        numbers.push(primes[i])
      }
      answer = primes[sequenceLength]
      rule = "Prime number sequence"
      break
    }
  }

  return { numbers, answer, rule }
}

const difficulties: Record<Difficulty, { label: string; color: string; rounds: number; timeLimit: number }> = {
  easy: { label: "Easy (4 numbers)", color: "bg-green-100 text-green-800 border-green-300", rounds: 5, timeLimit: 45 },
  medium: { label: "Medium (5 numbers)", color: "bg-blue-100 text-blue-800 border-blue-300", rounds: 7, timeLimit: 40 },
  hard: { label: "Hard (6 numbers)", color: "bg-orange-100 text-orange-800 border-orange-300", rounds: 10, timeLimit: 35 },
  expert: { label: "Expert (7 numbers)", color: "bg-red-100 text-red-800 border-red-300", rounds: 12, timeLimit: 30 },
}

export default function NumberSequence() {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium")
  const [currentRound, setCurrentRound] = useState(1)
  const [sequence, setSequence] = useState<Sequence | null>(null)
  const [userAnswer, setUserAnswer] = useState("")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [timeLeft, setTimeLeft] = useState(40)
  const [showHint, setShowHint] = useState(false)
  const [bestScores, setBestScores] = useState<Record<Difficulty, number>>({
    easy: 0,
    medium: 0,
    hard: 0,
    expert: 0,
  })

  useEffect(() => {
    const saved = localStorage.getItem("numberSequenceBestScores")
    if (saved) {
      setBestScores(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    startGame()
  }, [difficulty])

  useEffect(() => {
    if (sequence && isCorrect === null && !isComplete && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmit("timeout")
            return difficulties[difficulty].timeLimit
          }
          return prev - 1
        })
      }, 1000)
      
      return () => clearInterval(timer)
    }
  }, [sequence, isCorrect, isComplete, timeLeft])

  const startGame = () => {
    setCurrentRound(1)
    setScore(0)
    setIsComplete(false)
    setTimeLeft(difficulties[difficulty].timeLimit)
    setShowHint(false)
    nextRound()
  }

  const nextRound = () => {
    setSequence(generateSequence(difficulty))
    setUserAnswer("")
    setIsCorrect(null)
    setShowHint(false)
    setTimeLeft(difficulties[difficulty].timeLimit)
  }

  const handleSubmit = (type: string = "submit") => {
    if (!sequence || isCorrect !== null) return

    const correct = type === "submit" ? parseInt(userAnswer) === sequence.answer : false
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
    }, 2500)
  }

  const completeGame = () => {
    setIsComplete(true)
    const percentage = Math.round((score / difficulties[difficulty].rounds) * 100)
    
    if (percentage > bestScores[difficulty]) {
      const newBestScores = { ...bestScores, [difficulty]: percentage }
      setBestScores(newBestScores)
      localStorage.setItem("numberSequenceBestScores", JSON.stringify(newBestScores))
    }
  }

  if (!sequence) return null

  return (
    <div className="p-4 sm:p-6">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl">
          <Calculator className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          Number Sequence Challenge
        </DialogTitle>
        <DialogDescription className="text-sm sm:text-base">
          Find the pattern and complete the number sequence. Perfect for logical thinking!
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

        {/* Sequence Display */}
        {!isComplete && (
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold mb-3 text-center">Find the Next Number:</h3>
              <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-6">
                {sequence.numbers.map((num, idx) => (
                  <div
                    key={idx}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-white rounded-lg shadow-sm"
                  >
                    {num}
                  </div>
                ))}
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-gray-200 rounded-lg shadow-sm border-2 border-dashed border-gray-400">
                  ?
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && userAnswer.trim()) {
                        handleSubmit()
                      }
                    }}
                    placeholder="Enter the next number..."
                    disabled={isCorrect !== null}
                    className="text-lg sm:text-xl text-center font-semibold"
                  />
                  <Button
                    onClick={() => handleSubmit()}
                    disabled={!userAnswer.trim() || isCorrect !== null}
                    className="px-6"
                  >
                    Submit
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => setShowHint(!showHint)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                    disabled={isCorrect !== null}
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    {showHint ? "Hide" : "Show"} Hint
                  </Button>
                </div>

                {showHint && isCorrect === null && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                    <p className="font-semibold">Hint: {sequence.rule}</p>
                  </div>
                )}
              </div>

              {isCorrect !== null && (
                <div className={`mt-4 p-3 rounded-lg flex flex-col gap-2 ${
                  isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-semibold">Correct! Excellent reasoning!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5" />
                        <span className="font-semibold">
                          {userAnswer ? "Incorrect." : "Time's up!"} The answer was {sequence.answer}
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-sm">Pattern: {sequence.rule}</p>
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
                <h3 className="text-2xl font-bold text-green-800 mb-2">🎉 Challenge Complete!</h3>
                <div className="text-4xl font-bold text-green-700 mb-2">
                  {Math.round((score / difficulties[difficulty].rounds) * 100)}%
                </div>
                <p className="text-sm text-green-600">
                  You solved {score} out of {difficulties[difficulty].rounds} sequences!
                </p>
                {Math.round((score / difficulties[difficulty].rounds) * 100) > bestScores[difficulty] && (
                  <Badge className="bg-yellow-100 text-yellow-800 mt-2">
                    <Star className="h-3 w-3 mr-1" /> New Personal Record!
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
            <p className="font-semibold mb-2">Mental Benefits:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Strengthens logical reasoning and analytical thinking</li>
              <li>Enhances mathematical pattern recognition</li>
              <li>Improves problem-solving under time pressure</li>
              <li>Develops mental calculation skills</li>
              <li>Boosts concentration and focus</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
