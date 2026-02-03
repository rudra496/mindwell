"use client"

import { useState, useEffect } from "react"
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, CheckCircle2, Trophy, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// All unique icons for the game
const ALL_ICONS = [
  { icon: "🌸", name: "flower" },
  { icon: "🌈", name: "rainbow" },
  { icon: "⭐", name: "star" },
  { icon: "🦋", name: "butterfly" },
  { icon: "🌺", name: "hibiscus" },
  { icon: "🌻", name: "sunflower" },
  { icon: "🌷", name: "tulip" },
  { icon: "🌹", name: "rose" },
  { icon: "🪷", name: "lotus" },
  { icon: "💐", name: "bouquet" },
  { icon: "🌼", name: "blossom" },
  { icon: "🏵️", name: "rosette" },
  { icon: "💮", name: "white-flower" },
  { icon: "🍀", name: "clover" },
  { icon: "🌿", name: "herb" },
]

// Level configurations (15 levels)
const LEVEL_CONFIGS = [
  { level: 1, pairs: 2, gridCols: "grid-cols-2", flipDelay: 1200, timeLimit: null, label: "Level 1", difficulty: "Easy" },
  { level: 2, pairs: 3, gridCols: "grid-cols-3", flipDelay: 1100, timeLimit: null, label: "Level 2", difficulty: "Easy" },
  { level: 3, pairs: 4, gridCols: "grid-cols-4", flipDelay: 1000, timeLimit: null, label: "Level 3", difficulty: "Easy" },
  { level: 4, pairs: 5, gridCols: "grid-cols-4", flipDelay: 950, timeLimit: null, label: "Level 4", difficulty: "Medium" },
  { level: 5, pairs: 6, gridCols: "grid-cols-4", flipDelay: 900, timeLimit: 90, label: "Level 5", difficulty: "Medium" },
  { level: 6, pairs: 7, gridCols: "grid-cols-4", flipDelay: 850, timeLimit: 85, label: "Level 6", difficulty: "Medium" },
  { level: 7, pairs: 8, gridCols: "grid-cols-4", flipDelay: 800, timeLimit: 80, label: "Level 7", difficulty: "Hard" },
  { level: 8, pairs: 9, gridCols: "grid-cols-5", flipDelay: 750, timeLimit: 75, label: "Level 8", difficulty: "Hard" },
  { level: 9, pairs: 10, gridCols: "grid-cols-5", flipDelay: 700, timeLimit: 70, label: "Level 9", difficulty: "Hard" },
  { level: 10, pairs: 11, gridCols: "grid-cols-5", flipDelay: 650, timeLimit: 65, label: "Level 10", difficulty: "Hard" },
  { level: 11, pairs: 12, gridCols: "grid-cols-6", flipDelay: 600, timeLimit: 90, label: "Level 11", difficulty: "Expert" },
  { level: 12, pairs: 13, gridCols: "grid-cols-6", flipDelay: 550, timeLimit: 85, label: "Level 12", difficulty: "Expert" },
  { level: 13, pairs: 14, gridCols: "grid-cols-7", flipDelay: 500, timeLimit: 80, label: "Level 13", difficulty: "Expert" },
  { level: 14, pairs: 15, gridCols: "grid-cols-6", flipDelay: 450, timeLimit: 75, label: "Level 14", difficulty: "Expert" },
  { level: 15, pairs: 15, gridCols: "grid-cols-6", flipDelay: 400, timeLimit: 70, label: "Level 15", difficulty: "Legend" },
]

const generateCards = (pairs: number) => {
  const selectedIcons = ALL_ICONS.slice(0, pairs)
  const cards = selectedIcons.flatMap((icon, idx) => [
    { id: idx * 2, ...icon },
    { id: idx * 2 + 1, ...icon },
  ])
  return cards
}

export default function MemoryMatch() {
  const [currentLevel, setCurrentLevel] = useState(1)
  const [gameCards, setGameCards] = useState<Array<{ id: number; icon: string; name: string }>>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [totalScore, setTotalScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'levelComplete' | 'gameOver'>('menu')

  useEffect(() => {
    const saved = localStorage.getItem("memoryMatchHighScore")
    if (saved) {
      setHighScore(parseInt(saved))
    }
  }, [])

  useEffect(() => {
    if (gameState === 'playing' && timeLeft !== null && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (gameState === 'playing' && timeLeft === 0) {
      setGameState('gameOver')
    }
  }, [timeLeft, gameState])

  const startGame = () => {
    setCurrentLevel(1)
    setTotalScore(0)
    startLevel(1)
  }

  const startLevel = (level: number) => {
    const config = LEVEL_CONFIGS[level - 1]
    const cards = generateCards(config.pairs)
    const shuffled = [...cards].sort(() => Math.random() - 0.5)
    setGameCards(shuffled)
    setFlipped([])
    setMatched([])
    setMoves(0)
    setTimeLeft(config.timeLimit)
    setIsComplete(false)
    setGameState('playing')
  }

  const calculateLevelScore = (moves: number, pairs: number, timeRemaining?: number) => {
    const perfectMoves = pairs
    const efficiency = Math.max(0, 100 - ((moves - perfectMoves) / perfectMoves) * 50)
    const timeBonus = timeRemaining ? Math.max(0, timeRemaining * 2) : 0
    return Math.round(efficiency + timeBonus)
  }

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index) || gameState !== 'playing') {
      return
    }

    const newFlipped = [...flipped, index]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      const newMoves = moves + 1
      setMoves(newMoves)
      const [first, second] = newFlipped
      const config = LEVEL_CONFIGS[currentLevel - 1]
      
      if (gameCards[first].name === gameCards[second].name) {
        const newMatched = [...matched, first, second]
        setMatched(newMatched)
        setFlipped([])
        
        if (newMatched.length === gameCards.length) {
          setIsComplete(true)
          const levelScore = calculateLevelScore(newMoves, config.pairs, timeLeft || undefined)
          const newTotalScore = totalScore + levelScore
          setTotalScore(newTotalScore)
          
          if (newTotalScore > highScore) {
            setHighScore(newTotalScore)
            localStorage.setItem("memoryMatchHighScore", newTotalScore.toString())
          }
          
          setGameState('levelComplete')
        }
      } else {
        setTimeout(() => setFlipped([]), config.flipDelay)
      }
    }
  }

  const nextLevel = () => {
    if (currentLevel < LEVEL_CONFIGS.length) {
      setCurrentLevel(currentLevel + 1)
      startLevel(currentLevel + 1)
    }
  }

  const config = LEVEL_CONFIGS[currentLevel - 1]

  return (
    <div className="p-4 sm:p-6">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl">
          <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
          Memory Match Pro - 15 Levels
        </DialogTitle>
        <DialogDescription className="text-sm sm:text-base">
          Match pairs across 15 progressively challenging levels!
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 space-y-4">
        {gameState === 'menu' ? (
          <Card className="w-full max-w-md mx-auto">
            <CardContent className="p-6 text-center space-y-4">
              <div className="text-6xl mb-4">🧠</div>
              <h3 className="text-xl font-bold">Memory Match Pro</h3>
              <p className="text-sm text-gray-600">
                Progress through 15 challenging levels! From simple 4-card matches to expert
                30-card challenges with time limits and faster gameplay.
              </p>
              <div className="text-sm space-y-1 text-gray-700">
                <p>🟢 Levels 1-3: Easy (4-6 cards)</p>
                <p>🔵 Levels 4-6: Medium (10-14 cards, time limits)</p>
                <p>🟠 Levels 7-10: Hard (16-22 cards, fast flips)</p>
                <p>🔴 Levels 11-15: Expert (24-30 cards, extreme challenge)</p>
              </div>
              <Button onClick={startGame} className="w-full" size="lg">
                Start Challenge
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Stats Bar */}
            <div className="flex flex-wrap justify-between items-center gap-2">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-sm px-3 py-1">
                  Level: {currentLevel} / 15
                </Badge>
                <Badge className={`text-sm px-3 py-1 ${
                  config.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  config.difficulty === 'Medium' ? 'bg-blue-100 text-blue-800' :
                  config.difficulty === 'Hard' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {config.difficulty}
                </Badge>
                <Badge variant="outline" className="text-sm px-3 py-1">
                  Moves: {moves}
                </Badge>
                <Badge variant="outline" className="text-sm px-3 py-1">
                  <Trophy className="h-4 w-4 mr-1" />
                  Score: {totalScore}
                </Badge>
              </div>
              {timeLeft !== null && gameState === 'playing' && (
                <Badge className={`text-sm px-3 py-1 ${
                  timeLeft > 30 ? 'bg-green-100 text-green-800' :
                  timeLeft > 15 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  ⏱️ {timeLeft}s
                </Badge>
              )}
            </div>

            {/* Game Grid */}
            {gameState === 'playing' && (
              <div className={`grid ${config.gridCols} gap-1 sm:gap-2`}>
                {gameCards.map((card, index) => {
                  const isFlipped = flipped.includes(index) || matched.includes(index)
                  const isMatched = matched.includes(index)

                  return (
                    <Card
                      key={index}
                      className={`aspect-square cursor-pointer transition-all duration-200 ${
                        isMatched ? "bg-green-100 border-green-500 border-2" : "hover:shadow-lg hover:scale-105"
                      }`}
                      onClick={() => handleCardClick(index)}
                    >
                      <CardContent className="flex items-center justify-center h-full p-0">
                        {isFlipped ? (
                          <span className="text-xl sm:text-2xl">{card.icon}</span>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-400 to-indigo-500 rounded-lg flex items-center justify-center">
                            <span className="text-lg sm:text-xl text-white font-bold">?</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}

            {/* Level Complete */}
            {gameState === 'levelComplete' && (
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-500 border-2">
                <CardContent className="p-4 text-center space-y-3">
                  <div className="flex items-center justify-center gap-2 text-green-700">
                    <CheckCircle2 className="h-6 w-6" />
                    <p className="font-semibold text-lg">
                      Level {currentLevel} Complete! 🎉
                    </p>
                  </div>
                  <p className="text-sm">Moves: {moves}</p>
                  <p className="text-sm font-bold">Total Score: {totalScore}</p>
                  {currentLevel < LEVEL_CONFIGS.length ? (
                    <Button onClick={nextLevel} size="lg" className="w-full">
                      Next Level →
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-4xl">🏆</div>
                      <p className="font-bold text-lg text-yellow-900">All 15 Levels Complete!</p>
                      <p className="text-sm">Final Score: {totalScore}</p>
                      {totalScore > highScore && (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <Star className="h-4 w-4 mr-1" /> New High Score!
                        </Badge>
                      )}
                      <Button onClick={startGame} className="w-full mt-2">
                        Play Again
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Game Over */}
            {gameState === 'gameOver' && (
              <Card className="bg-gradient-to-r from-red-50 to-rose-50 border-red-500 border-2">
                <CardContent className="p-4 text-center space-y-2">
                  <p className="font-semibold text-red-700">Time's Up!</p>
                  <p className="text-sm text-red-600">Reached Level {currentLevel}</p>
                  <p className="text-sm font-bold">Total Score: {totalScore}</p>
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
                  <li>Improves working memory and concentration</li>
                  <li>Enhances cognitive flexibility and processing speed</li>
                  <li>Trains pattern recognition and attention to detail</li>
                  <li>Progressive difficulty builds mental resilience</li>
                </ul>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
