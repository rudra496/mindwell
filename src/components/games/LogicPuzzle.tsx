"use client"

import { useState, useEffect } from "react"
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Trophy, HelpCircle, Timer } from "lucide-react"

type PuzzleType = 'sudoku-lite' | 'pattern' | 'sequence' | 'logic-grid'

interface Puzzle {
  type: PuzzleType
  question: string
  answer: string
  options: string[]
  hint: string
  grid?: number[][]
}

const LEVEL_CONFIG = [
  { level: 1, timeLimit: 90, difficulty: 'easy', label: "Beginner" },
  { level: 2, timeLimit: 85, difficulty: 'easy', label: "Easy" },
  { level: 3, timeLimit: 80, difficulty: 'medium', label: "Warming Up" },
  { level: 4, timeLimit: 75, difficulty: 'medium', label: "Medium" },
  { level: 5, timeLimit: 70, difficulty: 'medium', label: "Moderate" },
  { level: 6, timeLimit: 65, difficulty: 'hard', label: "Challenging" },
  { level: 7, timeLimit: 60, difficulty: 'hard', label: "Hard" },
  { level: 8, timeLimit: 55, difficulty: 'hard', label: "Very Hard" },
  { level: 9, timeLimit: 50, difficulty: 'expert', label: "Expert" },
  { level: 10, timeLimit: 45, difficulty: 'expert', label: "Master" },
  { level: 11, timeLimit: 40, difficulty: 'expert', label: "Elite" },
]

export default function LogicPuzzle() {
  const [level, setLevel] = useState(1)
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'success' | 'failure'>('idle')
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const [timeLeft, setTimeLeft] = useState(0)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("logicPuzzleHighScore")
    if (saved) setHighScore(parseInt(saved))
  }, [])

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (gameState === 'playing' && timeLeft === 0) {
      setGameState('failure')
    }
  }, [timeLeft, gameState])

  const getDifficultyIndex = (difficulty: string, arrayLength: number): number => {
    if (difficulty === 'easy') return 0
    if (difficulty === 'medium') return Math.floor(Math.random() * 3)
    return Math.floor(Math.random() * arrayLength)
  }

  const generatePuzzle = (difficulty: string): Puzzle => {
    const types: PuzzleType[] = ['sudoku-lite', 'pattern', 'sequence', 'logic-grid']
    const type = types[Math.floor(Math.random() * types.length)]

    switch (type) {
      case 'sudoku-lite': {
        const grid = [
          [5, 3, 0, 0],
          [0, 0, 2, 4],
          [4, 0, 0, 1],
          [0, 1, 4, 0],
        ]
        const answer = '2'
        
        return {
          type,
          question: 'Complete this 4x4 mini-Sudoku. What number goes in the top-right corner?',
          answer,
          options: ['1', '2', '3', '4'],
          hint: 'Each row and column must contain 1-4 exactly once. Check what\'s missing in the first row.',
          grid,
        }
      }

      case 'pattern': {
        const patterns = [
          {
            question: 'What comes next? 🔴 🔵 🔴 🔵 🔴 __',
            answer: '🔵',
            options: ['🔴', '🔵', '🟢', '🟡'],
            hint: 'Look for alternating pattern',
          },
          {
            question: 'Complete: △ ◯ △ △ ◯ △ △ △ __',
            answer: '◯',
            options: ['△', '◯', '□', '◇'],
            hint: 'Count increases: 1 circle, 2 triangles, then repeats',
          },
          {
            question: 'What fits? ⬛⬜⬜ ⬛⬛⬜ ⬛⬛⬛ __',
            answer: '⬜⬜⬜',
            options: ['⬛⬜⬜', '⬜⬜⬜', '⬛⬛⬛', '⬜⬛⬜'],
            hint: 'Black squares increase by 1, then resets to white',
          },
          {
            question: 'Pattern: 2, 4, 8, 16, __',
            answer: '32',
            options: ['24', '28', '32', '36'],
            hint: 'Each number doubles',
          },
          {
            question: 'Sequence: 1, 1, 2, 3, 5, 8, __',
            answer: '13',
            options: ['11', '12', '13', '14'],
            hint: 'Add the previous two numbers (Fibonacci)',
          },
        ]
        
        const idx = getDifficultyIndex(difficulty, patterns.length)
        return { type, ...patterns[idx] }
      }

      case 'sequence': {
        const sequences = [
          {
            question: 'What number is missing? 5, 10, __, 20, 25',
            answer: '15',
            options: ['12', '13', '15', '18'],
            hint: 'Add 5 each time',
          },
          {
            question: 'Continue: A1, B2, C3, D4, __',
            answer: 'E5',
            options: ['E5', 'D5', 'E4', 'F5'],
            hint: 'Letter and number both increase by 1',
          },
          {
            question: 'Next: 100, 50, 25, 12.5, __',
            answer: '6.25',
            options: ['6', '6.25', '7', '5'],
            hint: 'Divide by 2 each time',
          },
          {
            question: 'Fill: 3, 6, 12, 24, __',
            answer: '48',
            options: ['36', '42', '48', '52'],
            hint: 'Multiply by 2 each time',
          },
          {
            question: 'What comes next? Z, Y, X, W, __',
            answer: 'V',
            options: ['V', 'U', 'T', 'W'],
            hint: 'Alphabet in reverse',
          },
        ]
        
        const idx = getDifficultyIndex(difficulty, sequences.length)
        return { type, ...sequences[idx] }
      }

      case 'logic-grid': {
        const logicProblems = [
          {
            question: 'If all cats are animals, and some animals are pets, can we say all cats are pets?',
            answer: 'Cannot determine',
            options: ['Yes', 'No', 'Cannot determine', 'Sometimes'],
            hint: 'We know cats are animals, but not all animals are pets',
          },
          {
            question: 'John is taller than Mary. Mary is taller than Sam. Who is shortest?',
            answer: 'Sam',
            options: ['John', 'Mary', 'Sam', 'Cannot tell'],
            hint: 'Work through the comparisons step by step',
          },
          {
            question: 'If A = 1, B = 2, C = 3, what does "CAB" equal?',
            answer: '312',
            options: ['123', '321', '312', '213'],
            hint: 'C=3, A=1, B=2',
          },
          {
            question: 'Red = 3, Blue = 4, Green = 5. What color is 4 letters?',
            answer: 'Blue',
            options: ['Red', 'Blue', 'Green', 'None'],
            hint: 'Count the letters in each word',
          },
          {
            question: 'If today is Monday, what day is it 100 days from now?',
            answer: 'Wednesday',
            options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
            hint: '100 ÷ 7 = 14 weeks + 2 days',
          },
        ]
        
        const idx = getDifficultyIndex(difficulty, logicProblems.length)
        return { type, ...logicProblems[idx] }
      }
    }
  }

  const startGame = () => {
    setLevel(1)
    setScore(0)
    setHintsUsed(0)
    startLevel(1)
  }

  const startLevel = (lvl: number) => {
    setLevel(lvl)
    const config = LEVEL_CONFIG[lvl - 1]
    setTimeLeft(config.timeLimit)
    setCurrentPuzzle(generatePuzzle(config.difficulty))
    setSelectedAnswer('')
    setShowHint(false)
    setGameState('playing')
  }

  const handleSubmit = () => {
    if (!currentPuzzle || !selectedAnswer) return

    if (selectedAnswer === currentPuzzle.answer) {
      const timeBonus = Math.floor(timeLeft / 5)
      const hintPenalty = showHint ? 5 : 0
      const points = Math.max(10, 20 + timeBonus - hintPenalty)
      const newScore = score + points
      setScore(newScore)

      if (newScore > highScore) {
        setHighScore(newScore)
        localStorage.setItem("logicPuzzleHighScore", newScore.toString())
      }

      if (level < LEVEL_CONFIG.length) {
        setGameState('success')
        setTimeout(() => startLevel(level + 1), 2000)
      } else {
        setGameState('success')
      }
    } else {
      setGameState('failure')
    }
  }

  const handleHint = () => {
    setShowHint(true)
    setHintsUsed(hintsUsed + 1)
  }

  return (
    <div className="p-4 sm:p-6">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl">
          <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
          Logic Puzzle Challenge
        </DialogTitle>
        <DialogDescription className="text-sm sm:text-base">
          Solve mental puzzles and logic problems. 11 progressively challenging levels!
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 space-y-4">
        {/* Stats */}
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-sm px-3 py-1">
              Level: {level} / {LEVEL_CONFIG.length}
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              Score: {score}
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              <Trophy className="h-4 w-4 mr-1" />
              Best: {highScore}
            </Badge>
          </div>
          {gameState === 'playing' && (
            <Badge className={`text-sm px-3 py-1 ${
              timeLeft > 30 ? 'bg-green-100 text-green-800' :
              timeLeft > 15 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              <Timer className="h-4 w-4 mr-1" />
              {timeLeft}s
            </Badge>
          )}
        </div>

        {/* Game State */}
        {gameState === 'idle' ? (
          <Card className="w-full max-w-md mx-auto">
            <CardContent className="p-6 text-center space-y-4">
              <div className="text-6xl mb-4">🧩</div>
              <h3 className="text-xl font-bold">Logic Puzzle Challenge</h3>
              <p className="text-sm text-gray-600">
                Test your logical thinking and problem-solving skills. Solve various types of
                puzzles including patterns, sequences, and logic problems across 11 levels!
              </p>
              <Button onClick={startGame} className="w-full" size="lg">
                Start Challenge
              </Button>
            </CardContent>
          </Card>
        ) : gameState === 'playing' && currentPuzzle ? (
          <div className="space-y-4">
            {/* Puzzle Display */}
            <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-300">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <Badge className="mb-2">
                    {currentPuzzle.type.replace('-', ' ').toUpperCase()}
                  </Badge>
                  <p className="text-lg font-semibold text-gray-900">
                    {currentPuzzle.question}
                  </p>

                  {currentPuzzle.grid && (
                    <div className="flex justify-center my-4">
                      <div className="inline-grid grid-cols-4 gap-1">
                        {currentPuzzle.grid.flat().map((num, idx) => (
                          <div
                            key={idx}
                            className={`w-12 h-12 flex items-center justify-center border-2 font-bold text-lg ${
                              num === 0
                                ? 'bg-yellow-100 border-yellow-400'
                                : 'bg-white border-gray-300'
                            }`}
                          >
                            {num === 0 ? '?' : num}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {!showHint && (
                    <Button
                      onClick={handleHint}
                      variant="outline"
                      size="sm"
                      className="mt-2"
                    >
                      <HelpCircle className="h-4 w-4 mr-1" />
                      Need a Hint? (-5 points)
                    </Button>
                  )}

                  {showHint && (
                    <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-3 text-sm text-blue-900">
                      💡 Hint: {currentPuzzle.hint}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-3">
              {currentPuzzle.options.map((option, idx) => (
                <Button
                  key={idx}
                  onClick={() => setSelectedAnswer(option)}
                  variant={selectedAnswer === option ? "default" : "outline"}
                  size="lg"
                  className={`min-h-[70px] text-lg font-semibold ${
                    selectedAnswer === option
                      ? 'bg-purple-600 text-white border-purple-700'
                      : ''
                  }`}
                >
                  {option}
                </Button>
              ))}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              size="lg"
              className="w-full"
            >
              Submit Answer
            </Button>
          </div>
        ) : null}

        {/* Success Message */}
        {gameState === 'success' && level < LEVEL_CONFIG.length && (
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-500 border-2">
            <CardContent className="p-4 text-center">
              <p className="font-semibold text-green-700">
                ✨ Correct! Level {level + 1} loading...
              </p>
              <p className="text-sm text-green-600 mt-1">
                Hints used: {hintsUsed}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Win Message */}
        {gameState === 'success' && level === LEVEL_CONFIG.length && (
          <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-500 border-2">
            <CardContent className="p-4 text-center space-y-2">
              <div className="text-4xl mb-2">🏆</div>
              <p className="font-bold text-lg text-yellow-900">Logic Master!</p>
              <p className="text-sm text-yellow-800">All 11 puzzles solved!</p>
              <p className="text-sm font-semibold">Final Score: {score}</p>
              <p className="text-xs text-yellow-700">Total hints used: {hintsUsed}</p>
              <Button onClick={startGame} className="mt-2">
                Play Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Failure Message */}
        {gameState === 'failure' && (
          <Card className="bg-gradient-to-r from-red-50 to-rose-50 border-red-500 border-2">
            <CardContent className="p-4 text-center space-y-2">
              <p className="font-semibold text-red-700">
                {timeLeft === 0 ? 'Time\'s up!' : 'Incorrect answer'}
              </p>
              <p className="text-sm text-red-600">Level {level} - Score: {score}</p>
              {currentPuzzle && (
                <p className="text-sm text-red-700">
                  Correct answer: {currentPuzzle.answer}
                </p>
              )}
              <Button onClick={startGame} variant="outline" className="mt-2">
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Benefits */}
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-3 sm:p-4 text-xs sm:text-sm text-amber-900">
            <p className="font-semibold mb-2">Cognitive Benefits:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Enhances logical reasoning and critical thinking</li>
              <li>Improves problem-solving strategies</li>
              <li>Develops pattern recognition and analysis</li>
              <li>Strengthens deductive reasoning skills</li>
              <li>Trains systematic thinking and mental flexibility</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
