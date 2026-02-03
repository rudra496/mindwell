"use client"

import { useState, useEffect, useRef } from "react"
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Trophy, Target } from "lucide-react"

interface MovingObject {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  isTarget: boolean
  emoji: string
}

const LEVEL_CONFIG = [
  { level: 1, targets: 1, distractors: 2, speed: 1.5, duration: 15, label: "Introduction" },
  { level: 2, targets: 2, distractors: 2, speed: 1.8, duration: 18, label: "Easy" },
  { level: 3, targets: 2, distractors: 3, speed: 2.0, duration: 20, label: "Building Up" },
  { level: 4, targets: 3, distractors: 3, speed: 2.2, duration: 22, label: "Moderate" },
  { level: 5, targets: 3, distractors: 4, speed: 2.5, duration: 25, label: "Challenging" },
  { level: 6, targets: 4, distractors: 4, speed: 2.8, duration: 25, label: "Hard" },
  { level: 7, targets: 4, distractors: 5, speed: 3.0, duration: 28, label: "Very Hard" },
  { level: 8, targets: 5, distractors: 5, speed: 3.3, duration: 30, label: "Expert" },
  { level: 9, targets: 5, distractors: 6, speed: 3.6, duration: 30, label: "Master" },
  { level: 10, targets: 6, distractors: 7, speed: 4.0, duration: 35, label: "Elite" },
  { level: 11, targets: 6, distractors: 8, speed: 4.3, duration: 35, label: "Legendary" },
]

const TARGET_EMOJIS = ['🎯', '⭐', '💎', '🏆', '👑', '✨']
const DISTRACTOR_EMOJIS = ['⚫', '🔘', '⚪', '🔴', '🔵', '🟢', '🟡', '🟣']

export default function FocusTracker() {
  const [level, setLevel] = useState(1)
  const [gameState, setGameState] = useState<'idle' | 'memorize' | 'playing' | 'selecting' | 'success' | 'failure'>('idle')
  const [objects, setObjects] = useState<MovingObject[]>([])
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [targetIds, setTargetIds] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(0)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const canvasRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const saved = localStorage.getItem("focusTrackerHighScore")
    if (saved) setHighScore(parseInt(saved))
  }, [])

  useEffect(() => {
    if (gameState === 'memorize' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (gameState === 'memorize' && timeLeft === 0) {
      setGameState('playing')
      setTimeLeft(LEVEL_CONFIG[level - 1].duration)
    }
  }, [timeLeft, gameState, level])

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (gameState === 'playing' && timeLeft === 0) {
      setGameState('selecting')
    }
  }, [timeLeft, gameState])

  useEffect(() => {
    if (gameState === 'playing') {
      const animate = () => {
        setObjects(prevObjects => 
          prevObjects.map(obj => {
            const canvas = canvasRef.current
            if (!canvas) return obj

            const bounds = canvas.getBoundingClientRect()
            const size = 48
            let newX = obj.x + obj.vx
            let newY = obj.y + obj.vy
            let newVx = obj.vx
            let newVy = obj.vy

            if (newX <= 0 || newX >= bounds.width - size) {
              newVx = -newVx
              newX = Math.max(0, Math.min(bounds.width - size, newX))
            }
            if (newY <= 0 || newY >= bounds.height - size) {
              newVy = -newVy
              newY = Math.max(0, Math.min(bounds.height - size, newY))
            }

            return { ...obj, x: newX, y: newY, vx: newVx, vy: newVy }
          })
        )
        animationRef.current = requestAnimationFrame(animate)
      }

      animationRef.current = requestAnimationFrame(animate)
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }
  }, [gameState])

  const initializeGame = (lvl: number) => {
    const config = LEVEL_CONFIG[lvl - 1]
    const canvas = canvasRef.current
    if (!canvas) return

    const bounds = canvas.getBoundingClientRect()
    const newObjects: MovingObject[] = []
    const newTargetIds: number[] = []
    const size = 48

    for (let i = 0; i < config.targets; i++) {
      const obj: MovingObject = {
        id: i,
        x: Math.random() * (bounds.width - size),
        y: Math.random() * (bounds.height - size),
        vx: (Math.random() - 0.5) * config.speed,
        vy: (Math.random() - 0.5) * config.speed,
        isTarget: true,
        emoji: TARGET_EMOJIS[i % TARGET_EMOJIS.length],
      }
      newObjects.push(obj)
      newTargetIds.push(i)
    }

    for (let i = config.targets; i < config.targets + config.distractors; i++) {
      const obj: MovingObject = {
        id: i,
        x: Math.random() * (bounds.width - size),
        y: Math.random() * (bounds.height - size),
        vx: (Math.random() - 0.5) * config.speed,
        vy: (Math.random() - 0.5) * config.speed,
        isTarget: false,
        emoji: DISTRACTOR_EMOJIS[i % DISTRACTOR_EMOJIS.length],
      }
      newObjects.push(obj)
    }

    setObjects(newObjects)
    setTargetIds(newTargetIds)
    setSelectedIds([])
  }

  const startGame = () => {
    setLevel(1)
    setScore(0)
    startLevel(1)
  }

  const startLevel = (lvl: number) => {
    setLevel(lvl)
    setGameState('memorize')
    setTimeLeft(3)
    initializeGame(lvl)
  }

  const handleObjectClick = (id: number) => {
    if (gameState !== 'selecting') return

    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id))
    } else {
      setSelectedIds([...selectedIds, id])
    }
  }

  const submitSelection = () => {
    const correct = selectedIds.filter(id => targetIds.includes(id)).length
    const incorrect = selectedIds.filter(id => !targetIds.includes(id)).length
    const missed = targetIds.filter(id => !selectedIds.includes(id)).length

    const accuracy = (correct / targetIds.length) * 100
    const penalty = incorrect * 10

    if (accuracy >= 80 && incorrect === 0) {
      const points = (correct * 20) - penalty
      setScore(score + points)

      if (level < LEVEL_CONFIG.length) {
        setGameState('success')
        setTimeout(() => startLevel(level + 1), 2000)
      } else {
        setGameState('success')
        if (score + points > highScore) {
          setHighScore(score + points)
          localStorage.setItem("focusTrackerHighScore", (score + points).toString())
        }
      }
    } else {
      setGameState('failure')
    }
  }

  return (
    <div className="p-4 sm:p-6">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl">
          <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
          Focus Tracker
        </DialogTitle>
        <DialogDescription className="text-sm sm:text-base">
          Track moving targets while ignoring distractors. 11 progressive levels!
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
          {(gameState === 'memorize' || gameState === 'playing') && (
            <Badge className="text-sm px-3 py-1 bg-blue-100 text-blue-800">
              ⏱️ {timeLeft}s
            </Badge>
          )}
        </div>

        {/* Instructions */}
        {gameState === 'memorize' && (
          <Card className="bg-yellow-50 border-yellow-300 border-2">
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 mx-auto mb-2 text-yellow-700" />
              <p className="font-semibold text-yellow-900">
                Memorize the TARGET objects (⭐💎🎯)
              </p>
              <p className="text-sm text-yellow-800 mt-1">
                Track them as they move! ({timeLeft}s)
              </p>
            </CardContent>
          </Card>
        )}

        {gameState === 'playing' && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3 text-center">
              <p className="font-semibold text-blue-900">
                Keep tracking the targets! ⏱️ {timeLeft}s remaining
              </p>
            </CardContent>
          </Card>
        )}

        {gameState === 'selecting' && (
          <Card className="bg-green-50 border-green-300 border-2">
            <CardContent className="p-3 text-center space-y-2">
              <p className="font-semibold text-green-900">
                Click on the {targetIds.length} TARGET object{targetIds.length > 1 ? 's' : ''} you tracked
              </p>
              <p className="text-sm text-green-700">
                Selected: {selectedIds.length} / {targetIds.length}
              </p>
              <Button
                onClick={submitSelection}
                disabled={selectedIds.length !== targetIds.length}
                size="sm"
              >
                Submit Selection
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Game Board */}
        {gameState === 'idle' ? (
          <Card className="w-full max-w-md mx-auto">
            <CardContent className="p-6 text-center space-y-4">
              <div className="text-6xl mb-4">👁️</div>
              <h3 className="text-xl font-bold">Focus Tracker</h3>
              <p className="text-sm text-gray-600">
                Test your attention and tracking abilities. Memorize target objects, track them
                as they move among distractors, then identify them. Need 80% accuracy with no
                mistakes to advance!
              </p>
              <Button onClick={startGame} className="w-full" size="lg">
                Start Training
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div
            ref={canvasRef}
            className="relative w-full h-[400px] bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border-2 border-slate-300 overflow-hidden"
          >
            {objects.map((obj) => (
              <div
                key={obj.id}
                onClick={() => handleObjectClick(obj.id)}
                className={`absolute w-12 h-12 flex items-center justify-center text-3xl transition-all cursor-pointer ${
                  gameState === 'memorize' && obj.isTarget
                    ? 'ring-4 ring-yellow-400 rounded-full animate-pulse'
                    : ''
                } ${
                  gameState === 'selecting' && selectedIds.includes(obj.id)
                    ? 'ring-4 ring-blue-500 rounded-full scale-110'
                    : ''
                }`}
                style={{
                  left: `${obj.x}px`,
                  top: `${obj.y}px`,
                  transform: selectedIds.includes(obj.id) ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                {obj.emoji}
              </div>
            ))}
          </div>
        )}

        {/* Success Message */}
        {gameState === 'success' && level < LEVEL_CONFIG.length && (
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-500 border-2">
            <CardContent className="p-4 text-center">
              <p className="font-semibold text-green-700">
                ✨ Perfect tracking! Level {level + 1} loading...
              </p>
            </CardContent>
          </Card>
        )}

        {/* Win Message */}
        {gameState === 'success' && level === LEVEL_CONFIG.length && (
          <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-500 border-2">
            <CardContent className="p-4 text-center space-y-2">
              <div className="text-4xl mb-2">🏆</div>
              <p className="font-bold text-lg text-yellow-900">Master Focus Achieved!</p>
              <p className="text-sm text-yellow-800">All 11 levels completed!</p>
              <p className="text-sm font-semibold">Final Score: {score}</p>
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
                Need 80% accuracy with no wrong selections
              </p>
              <p className="text-sm text-red-600">Level {level} - Score: {score}</p>
              <div className="text-sm text-red-700">
                <p>✓ Correct: {selectedIds.filter(id => targetIds.includes(id)).length}</p>
                <p>✗ Wrong: {selectedIds.filter(id => !targetIds.includes(id)).length}</p>
                <p>⊘ Missed: {targetIds.filter(id => !selectedIds.includes(id)).length}</p>
              </div>
              <Button onClick={startGame} variant="outline" className="mt-2">
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Benefits */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-3 sm:p-4 text-xs sm:text-sm text-green-900">
            <p className="font-semibold mb-2">Cognitive Benefits:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Enhances sustained attention and vigilance</li>
              <li>Improves multiple object tracking abilities</li>
              <li>Strengthens working memory capacity</li>
              <li>Develops selective attention and distractor filtering</li>
              <li>Trains visual-spatial processing and coordination</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
