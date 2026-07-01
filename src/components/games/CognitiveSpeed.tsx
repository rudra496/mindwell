"use client"

import { useState, useEffect } from "react"
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gauge, Trophy, CheckCircle2, XCircle } from "lucide-react"

type ChallengeType = 'color-word' | 'number-compare' | 'odd-one-out' | 'shape-match'

interface Challenge {
  type: ChallengeType
  question: string
  correctAnswer: string
  options: string[]
  color?: string
}

const LEVEL_CONFIG = [
  { level: 1, timeLimit: 3000, challenges: 5, label: "Warm Up" },
  { level: 2, timeLimit: 2800, challenges: 6, label: "Getting Started" },
  { level: 3, timeLimit: 2600, challenges: 7, label: "Picking Up Speed" },
  { level: 4, timeLimit: 2400, challenges: 8, label: "Moderate Pace" },
  { level: 5, timeLimit: 2200, challenges: 9, label: "Challenging" },
  { level: 6, timeLimit: 2000, challenges: 10, label: "Fast" },
  { level: 7, timeLimit: 1800, challenges: 11, label: "Very Fast" },
  { level: 8, timeLimit: 1600, challenges: 12, label: "Expert" },
  { level: 9, timeLimit: 1400, challenges: 13, label: "Master" },
  { level: 10, timeLimit: 1200, challenges: 15, label: "Lightning" },
]

const COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'orange']
const COLOR_CLASSES: Record<string, string> = {
  red: 'text-red-600',
  blue: 'text-blue-600',
  green: 'text-green-600',
  yellow: 'text-yellow-600',
  purple: 'text-purple-600',
  orange: 'text-orange-600',
}

export default function CognitiveSpeed() {
  const [level, setLevel] = useState(1)
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'success' | 'failure'>('idle')
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null)
  const [challengeIndex, setChallengeIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [totalCorrect, setTotalCorrect] = useState(0)
  const [totalAttempts, setTotalAttempts] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("cognitiveSpeedHighScore")
    if (saved) setHighScore(parseInt(saved))
  }, [])

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 100), 100)
      return () => clearTimeout(timer)
    } else if (gameState === 'playing' && timeLeft <= 0) {
      setFeedback('wrong')
      setTotalAttempts(prev => prev + 1)

      setTimeout(() => {
        const config = LEVEL_CONFIG[level - 1]
        if (challengeIndex + 1 < config.challenges) {
          setChallengeIndex(challengeIndex + 1)
          loadNextChallenge(level, challengeIndex + 1)
        } else {
          completeLevel()
        }
      }, 800)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, gameState])

  const generateChallenge = (): Challenge => {
    const types: ChallengeType[] = ['color-word', 'number-compare', 'odd-one-out', 'shape-match']
    const type = types[Math.floor(Math.random() * types.length)]

    switch (type) {
      case 'color-word': {
        const wordColor = COLORS[Math.floor(Math.random() * COLORS.length)]
        const displayColor = COLORS[Math.floor(Math.random() * COLORS.length)]
        const correctAnswer = displayColor
        const wrongOptions = COLORS.filter(c => c !== correctAnswer)
        const options = [correctAnswer, ...wrongOptions.slice(0, 2)].sort(() => Math.random() - 0.5)
        
        return {
          type,
          question: wordColor.toUpperCase(),
          correctAnswer,
          options,
          color: displayColor,
        }
      }

      case 'number-compare': {
        const num1 = Math.floor(Math.random() * 50) + 10
        const num2 = Math.floor(Math.random() * 50) + 10
        const operators = ['>', '<', '=']
        const correctOp = num1 > num2 ? '>' : num1 < num2 ? '<' : '='
        const options = operators.sort(() => Math.random() - 0.5)
        
        return {
          type,
          question: `${num1} __ ${num2}`,
          correctAnswer: correctOp,
          options,
        }
      }

      case 'odd-one-out': {
        const categories = [
          { items: ['🍎', '🍊', '🍋', '🚗'], correct: '🚗', name: 'vehicle' },
          { items: ['⚽', '🏀', '🎾', '🍕'], correct: '🍕', name: 'food' },
          { items: ['🐕', '🐈', '🐦', '🌲'], correct: '🌲', name: 'tree' },
          { items: ['📱', '💻', '⌚', '🍔'], correct: '🍔', name: 'food' },
          { items: ['🌸', '🌺', '🌻', '🔨'], correct: '🔨', name: 'tool' },
        ]
        const category = categories[Math.floor(Math.random() * categories.length)]
        
        return {
          type,
          question: 'Which doesn\'t belong?',
          correctAnswer: category.correct,
          options: category.items.sort(() => Math.random() - 0.5),
        }
      }

      case 'shape-match': {
        const shapes = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠']
        const target = shapes[Math.floor(Math.random() * shapes.length)]
        const options = [target, ...shapes.filter(s => s !== target).slice(0, 2)].sort(() => Math.random() - 0.5)
        
        return {
          type,
          question: `Match: ${target}`,
          correctAnswer: target,
          options,
        }
      }
    }
  }

  const startGame = () => {
    setLevel(1)
    setScore(0)
    setTotalCorrect(0)
    setTotalAttempts(0)
    startLevel(1)
  }

  const startLevel = (lvl: number) => {
    setLevel(lvl)
    setChallengeIndex(0)
    setGameState('playing')
    loadNextChallenge(lvl, 0)
  }

  const loadNextChallenge = (lvl: number, index: number) => {
    const config = LEVEL_CONFIG[lvl - 1]
    setTimeLeft(config.timeLimit)
    setCurrentChallenge(generateChallenge())
    setFeedback(null)
  }

  const handleAnswer = (answer: string) => {
    if (!currentChallenge || feedback !== null) return

    const isCorrect = answer === currentChallenge.correctAnswer
    setFeedback(isCorrect ? 'correct' : 'wrong')
    setTotalAttempts(totalAttempts + 1)

    if (isCorrect) {
      const points = Math.ceil(timeLeft / 100)
      setScore(score + points)
      setTotalCorrect(totalCorrect + 1)
    }

    setTimeout(() => {
      const config = LEVEL_CONFIG[level - 1]
      if (challengeIndex + 1 < config.challenges) {
        setChallengeIndex(challengeIndex + 1)
        loadNextChallenge(level, challengeIndex + 1)
      } else {
        completeLevel()
      }
    }, 800)
  }

  const completeLevel = () => {
    const config = LEVEL_CONFIG[level - 1]
    const accuracy = (totalCorrect / config.challenges) * 100

    if (accuracy >= 70 && level < LEVEL_CONFIG.length) {
      setGameState('success')
      
      if (score > highScore) {
        setHighScore(score)
        localStorage.setItem("cognitiveSpeedHighScore", score.toString())
      }

      setTimeout(() => {
        startLevel(level + 1)
      }, 2000)
    } else if (level === LEVEL_CONFIG.length && accuracy >= 70) {
      setGameState('success')
      if (score > highScore) {
        setHighScore(score)
        localStorage.setItem("cognitiveSpeedHighScore", score.toString())
      }
    } else {
      setGameState('failure')
    }
  }

  const renderChallenge = () => {
    if (!currentChallenge) return null

    const progressPercent = (timeLeft / LEVEL_CONFIG[level - 1].timeLimit) * 100

    return (
      <div className="space-y-4">
        {/* Timer Bar */}
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-100 ${
              progressPercent > 50 ? 'bg-green-500' : progressPercent > 25 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Question */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-gray-600 mb-2">
              {currentChallenge.type === 'color-word' && 'What COLOR is this word displayed in?'}
              {currentChallenge.type === 'number-compare' && 'Choose the correct operator'}
              {currentChallenge.type === 'odd-one-out' && 'Find the odd one out'}
              {currentChallenge.type === 'shape-match' && 'Click the matching shape'}
            </p>
            <p
              className={`text-4xl sm:text-5xl font-bold ${
                currentChallenge.color ? COLOR_CLASSES[currentChallenge.color] : 'text-gray-900'
              }`}
            >
              {currentChallenge.question}
            </p>
          </CardContent>
        </Card>

        {/* Options */}
        <div className="grid grid-cols-3 gap-3">
          {currentChallenge.options.map((option, idx) => (
            <Button
              key={idx}
              onClick={() => handleAnswer(option)}
              disabled={feedback !== null}
              size="lg"
              variant="outline"
              className={`min-h-[80px] text-xl font-semibold transition-all ${
                feedback === 'correct' && option === currentChallenge.correctAnswer
                  ? 'bg-green-100 border-green-500 border-2'
                  : feedback === 'wrong' && option === currentChallenge.correctAnswer
                  ? 'bg-green-100 border-green-500 border-2'
                  : ''
              }`}
            >
              {option}
            </Button>
          ))}
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`flex items-center justify-center gap-2 p-3 rounded-lg ${
            feedback === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {feedback === 'correct' ? (
              <>
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-semibold">Correct!</span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5" />
                <span className="font-semibold">Try Again!</span>
              </>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl">
          <Gauge className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          Cognitive Speed Test
        </DialogTitle>
        <DialogDescription className="text-sm sm:text-base">
          Quick decision-making challenges. Test your reaction speed across 10 levels!
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
            <Badge className="text-sm px-3 py-1 bg-blue-100 text-blue-800">
              {challengeIndex + 1} / {LEVEL_CONFIG[level - 1].challenges}
            </Badge>
          )}
        </div>

        {/* Game State */}
        {gameState === 'idle' ? (
          <Card className="w-full max-w-[95vw] sm:max-w-md mx-auto">
            <CardContent className="p-6 text-center space-y-4">
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-xl font-bold">Cognitive Speed Test</h3>
              <p className="text-sm text-gray-600">
                Challenge your reaction time and decision-making speed. Progress through 10
                increasingly difficult levels. You need 70% accuracy to advance!
              </p>
              <Button onClick={startGame} className="w-full" size="lg">
                Start Challenge
              </Button>
            </CardContent>
          </Card>
        ) : gameState === 'playing' ? (
          renderChallenge()
        ) : null}

        {/* Success Message */}
        {gameState === 'success' && level < LEVEL_CONFIG.length && (
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-500 border-2">
            <CardContent className="p-4 text-center">
              <p className="font-semibold text-green-700">
                ✨ Level {level} Complete! Next level loading...
              </p>
              <p className="text-sm text-green-600 mt-1">
                Accuracy: {Math.round((totalCorrect / totalAttempts) * 100)}%
              </p>
            </CardContent>
          </Card>
        )}

        {/* Win Message */}
        {gameState === 'success' && level === LEVEL_CONFIG.length && (
          <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-500 border-2">
            <CardContent className="p-4 text-center space-y-2">
              <div className="text-4xl mb-2">🏆</div>
              <p className="font-bold text-lg text-yellow-900">Perfect! All Levels Complete!</p>
              <p className="text-sm text-yellow-800">Final Score: {score}</p>
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
              <p className="font-semibold text-red-700">Need 70% accuracy to continue</p>
              <p className="text-sm text-red-600">
                You got {totalCorrect} out of {totalAttempts} correct
              </p>
              <p className="text-sm text-red-600">Final Score: {score}</p>
              <Button onClick={startGame} variant="outline" className="mt-2">
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Benefits */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-3 sm:p-4 text-xs sm:text-sm text-blue-900">
            <p className="font-semibold mb-2">Cognitive Benefits:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Improves processing speed and reaction time</li>
              <li>Enhances cognitive flexibility and task-switching</li>
              <li>Trains attention control and impulse management</li>
              <li>Strengthens visual perception and pattern recognition</li>
              <li>Develops quick decision-making under pressure</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
