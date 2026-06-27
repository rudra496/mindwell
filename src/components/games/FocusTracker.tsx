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
  color: string
  radius: number
  trail: { x: number; y: number }[]
}

const LEVEL_CONFIG = [
  { level: 1, targets: 1, distractors: 2, speed: 1.5, duration: 10, label: "Warm Up" },
  { level: 2, targets: 2, distractors: 2, speed: 1.8, duration: 12, label: "Easy" },
  { level: 3, targets: 2, distractors: 3, speed: 2.1, duration: 15, label: "Building Up" },
  { level: 4, targets: 3, distractors: 3, speed: 2.4, duration: 15, label: "Moderate" },
  { level: 5, targets: 3, distractors: 4, speed: 2.7, duration: 18, label: "Challenging" },
  { level: 6, targets: 4, distractors: 4, speed: 3.0, duration: 20, label: "Hard" },
  { level: 7, targets: 4, distractors: 5, speed: 3.3, duration: 20, label: "Very Hard" },
  { level: 8, targets: 5, distractors: 5, speed: 3.6, duration: 22, label: "Expert" },
  { level: 9, targets: 5, distractors: 6, speed: 3.9, duration: 22, label: "Master" },
  { level: 10, targets: 6, distractors: 7, speed: 4.2, duration: 25, label: "Elite" },
  { level: 11, targets: 6, distractors: 8, speed: 4.5, duration: 25, label: "Legendary" },
]

const TARGET_EMOJIS = ['🎯', '⭐', '💎', '🏆', '👑', '✨']
const DISTRACTOR_EMOJIS = ['⚫', '🔘', '⚪', '🔴', '🔵', '🟢', '🟡', '🟣']

const TARGET_COLORS = ['#fbbf24', '#f59e0b', '#3b82f6', '#10b981', '#ec4899', '#f43f5e']
const DISTRACTOR_COLORS = ['#475569', '#64748b', '#94a3b8', '#cbd5e1', '#e2e8f0', '#334155']

export default function FocusTracker() {
  const [level, setLevel] = useState(1)
  const [gameState, setGameState] = useState<'idle' | 'memorize' | 'playing' | 'selecting' | 'success' | 'failure'>('idle')
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [targetIds, setTargetIds] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(0)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const objectsRef = useRef<MovingObject[]>([])
  const requestRef = useRef<number | null>(null)
  const stateRef = useRef(gameState)

  useEffect(() => {
    stateRef.current = gameState
  }, [gameState])

  useEffect(() => {
    const saved = localStorage.getItem("focusTrackerHighScore")
    if (saved) setHighScore(parseInt(saved))
  }, [])

  // Timer handling
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

  // Canvas drawing loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let active = true

    const draw = () => {
      if (!active) return

      // Dynamic resize check
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        if (canvas.width !== rect.width || canvas.height !== 400) {
          canvas.width = rect.width
          canvas.height = 400
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background grid effect
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.1)'
      ctx.lineWidth = 1
      const gridSize = 40
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      const objects = objectsRef.current

      // Update positions and handle boundaries/collisions
      if (stateRef.current === 'playing' || stateRef.current === 'memorize' || stateRef.current === 'selecting') {
        // Move & Trails
        objects.forEach(obj => {
          if (stateRef.current === 'playing') {
            obj.x += obj.vx
            obj.y += obj.vy

            // Wall bounce
            if (obj.x - obj.radius <= 0) {
              obj.vx = Math.abs(obj.vx)
              obj.x = obj.radius
            } else if (obj.x + obj.radius >= canvas.width) {
              obj.vx = -Math.abs(obj.vx)
              obj.x = canvas.width - obj.radius
            }

            if (obj.y - obj.radius <= 0) {
              obj.vy = Math.abs(obj.vy)
              obj.y = obj.radius
            } else if (obj.y + obj.radius >= canvas.height) {
              obj.vy = -Math.abs(obj.vy)
              obj.y = canvas.height - obj.radius
            }

            // Append trail
            obj.trail.push({ x: obj.x, y: obj.y })
            if (obj.trail.length > 8) {
              obj.trail.shift()
            }
          }
        })

        // Collision Check (elastic sphere collision)
        for (let i = 0; i < objects.length; i++) {
          for (let j = i + 1; j < objects.length; j++) {
            const o1 = objects[i]
            const o2 = objects[j]
            const dx = o2.x - o1.x
            const dy = o2.y - o1.y
            const dist = Math.hypot(dx, dy)
            const minDist = o1.radius + o2.radius

            if (dist < minDist && stateRef.current === 'playing') {
              // Resolve overlap
              const overlap = minDist - dist
              const nx = dx / dist
              const ny = dy / dist
              o1.x -= nx * overlap * 0.5
              o1.y -= ny * overlap * 0.5
              o2.x += nx * overlap * 0.5
              o2.y += ny * overlap * 0.5

              // Elastic bounce math (simplified 2D)
              const kx = o1.vx - o2.vx
              const ky = o1.vy - o2.vy
              const p = 2 * (nx * kx + ny * ky) / 2 // assumes equal mass

              o1.vx -= p * nx
              o1.vy -= p * ny
              o2.vx += p * nx
              o2.vy += p * ny
            }
          }
        }
      }

      // Draw trails
      objects.forEach(obj => {
        if (stateRef.current === 'playing' && obj.trail.length > 1) {
          ctx.beginPath()
          ctx.moveTo(obj.trail[0].x, obj.trail[0].y)
          for (let k = 1; k < obj.trail.length; k++) {
            ctx.lineTo(obj.trail[k].x, obj.trail[k].y)
          }
          ctx.strokeStyle = obj.isTarget ? 'rgba(251, 191, 36, 0.25)' : 'rgba(148, 163, 184, 0.15)'
          ctx.lineWidth = obj.radius * 0.8
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'
          ctx.stroke()
        }
      })

      // Draw objects
      objects.forEach(obj => {
        ctx.save()
        ctx.translate(obj.x, obj.y)

        // Target glowing ring during memorize
        if (stateRef.current === 'memorize' && obj.isTarget) {
          ctx.beginPath()
          ctx.arc(0, 0, obj.radius + 6, 0, Math.PI * 2)
          ctx.strokeStyle = '#fbbf24'
          ctx.lineWidth = 3
          ctx.shadowColor = '#fbbf24'
          ctx.shadowBlur = 12
          ctx.stroke()
        }

        // Selection ring
        if (stateRef.current === 'selecting' && selectedIds.includes(obj.id)) {
          ctx.beginPath()
          ctx.arc(0, 0, obj.radius + 6, 0, Math.PI * 2)
          ctx.strokeStyle = '#3b82f6'
          ctx.lineWidth = 3
          ctx.shadowColor = '#3b82f6'
          ctx.shadowBlur = 12
          ctx.stroke()
        }

        // Main circle body
        ctx.beginPath()
        ctx.arc(0, 0, obj.radius, 0, Math.PI * 2)
        ctx.fillStyle = (stateRef.current === 'memorize' || stateRef.current === 'selecting')
          ? (obj.isTarget ? '#fbbf24' : '#475569')
          : '#475569'
        ctx.fill()
        ctx.strokeStyle = '#1e293b'
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw emoji inside
        ctx.font = `${obj.radius * 1.1}px sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        // If not memorizing or selecting, render distractor representation to hide identity
        const isRevealed = stateRef.current === 'memorize' || stateRef.current === 'selecting'
        ctx.fillText(isRevealed ? obj.emoji : '🔵', 0, 0)

        ctx.restore()
      })

      requestRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      active = false
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [gameState, selectedIds])

  const initializeGame = (lvl: number) => {
    const config = LEVEL_CONFIG[lvl - 1]
    const newObjects: MovingObject[] = []
    const newTargetIds: number[] = []
    const radius = 22

    // Set initial layout bounds (typically 600x400)
    const width = canvasRef.current?.width || 600
    const height = 400

    for (let i = 0; i < config.targets; i++) {
      const obj: MovingObject = {
        id: i,
        x: radius + Math.random() * (width - radius * 2),
        y: radius + Math.random() * (height - radius * 2),
        vx: (Math.random() - 0.5) * config.speed * 2,
        vy: (Math.random() - 0.5) * config.speed * 2,
        isTarget: true,
        emoji: TARGET_EMOJIS[i % TARGET_EMOJIS.length],
        color: TARGET_COLORS[i % TARGET_COLORS.length],
        radius,
        trail: [],
      }
      newObjects.push(obj)
      newTargetIds.push(i)
    }

    for (let i = config.targets; i < config.targets + config.distractors; i++) {
      const obj: MovingObject = {
        id: i,
        x: radius + Math.random() * (width - radius * 2),
        y: radius + Math.random() * (height - radius * 2),
        vx: (Math.random() - 0.5) * config.speed * 2,
        vy: (Math.random() - 0.5) * config.speed * 2,
        isTarget: false,
        emoji: DISTRACTOR_EMOJIS[i % DISTRACTOR_EMOJIS.length],
        color: DISTRACTOR_COLORS[i % DISTRACTOR_COLORS.length],
        radius,
        trail: [],
      }
      newObjects.push(obj)
    }

    objectsRef.current = newObjects
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
    setTimeLeft(4)
    setTimeout(() => {
      initializeGame(lvl)
    }, 100)
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState !== 'selecting') return
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const clickY = e.clientY - rect.top

    // Find closest object clicked
    objectsRef.current.forEach(obj => {
      const dist = Math.hypot(obj.x - clickX, obj.y - clickY)
      if (dist <= obj.radius + 10) {
        // Toggle selection
        setSelectedIds(prev => 
          prev.includes(obj.id) ? prev.filter(id => id !== obj.id) : [...prev, obj.id]
        )
      }
    })
  }

  const submitSelection = () => {
    const correct = selectedIds.filter(id => targetIds.includes(id)).length
    const incorrect = selectedIds.filter(id => !targetIds.includes(id)).length

    const accuracy = (correct / targetIds.length) * 100

    if (accuracy >= 100 && incorrect === 0) {
      const points = correct * 25
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
    <div className="p-4 sm:p-6 bg-slate-950 text-slate-100 border-slate-800">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl text-teal-400">
          <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-teal-400" />
          Focus Tracker
        </DialogTitle>
        <DialogDescription className="text-sm text-slate-400">
          Track moving targets while ignoring distractors. 11 progressive levels!
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 space-y-4">
        {/* Stats */}
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-sm px-3 py-1 border-slate-700 bg-slate-900 text-slate-200">
              Level: {level} / {LEVEL_CONFIG.length}
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1 border-slate-700 bg-slate-900 text-slate-200">
              Score: {score}
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1 border-slate-700 bg-slate-900 text-slate-200">
              <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
              Best: {highScore}
            </Badge>
          </div>
          {(gameState === 'memorize' || gameState === 'playing') && (
            <Badge className="text-sm px-3 py-1 bg-teal-950 text-teal-400 border border-teal-800 animate-pulse">
              ⏱️ {timeLeft}s
            </Badge>
          )}
        </div>

        {/* Instructions */}
        {gameState === 'memorize' && (
          <Card className="bg-yellow-950/20 border-yellow-800/40 border">
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 mx-auto mb-2 text-yellow-400 animate-bounce" />
              <p className="font-semibold text-yellow-300">
                Memorize the TARGET objects (⭐💎🎯)
              </p>
              <p className="text-sm text-yellow-400/80 mt-1">
                Track them as they move! ({timeLeft}s)
              </p>
            </CardContent>
          </Card>
        )}

        {gameState === 'playing' && (
          <Card className="bg-slate-900 border-slate-800 border">
            <CardContent className="p-3 text-center">
              <p className="font-semibold text-teal-400">
                Keep tracking the targets! ⏱️ {timeLeft}s remaining
              </p>
            </CardContent>
          </Card>
        )}

        {gameState === 'selecting' && (
          <Card className="bg-teal-950/20 border-teal-800/40 border">
            <CardContent className="p-3 text-center space-y-2">
              <p className="font-semibold text-teal-300">
                Identify the {targetIds.length} TARGET object{targetIds.length > 1 ? 's' : ''} you tracked
              </p>
              <p className="text-sm text-teal-400/80">
                Selected: {selectedIds.length} / {targetIds.length}
              </p>
              <Button
                onClick={submitSelection}
                disabled={selectedIds.length !== targetIds.length}
                size="sm"
                className="bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold"
              >
                Submit Selection
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Game Board */}
        {gameState === 'idle' ? (
          <Card className="w-full max-w-md mx-auto bg-slate-900 border-slate-800">
            <CardContent className="p-6 text-center space-y-4">
              <div className="text-6xl mb-4">👁️</div>
              <h3 className="text-xl font-bold text-teal-400">Focus Tracker</h3>
              <p className="text-sm text-slate-400">
                Test your attention and tracking abilities. Memorize target objects, track them
                as they move among distractors, then identify them. Need 100% accuracy to advance!
              </p>
              <Button onClick={startGame} className="w-full bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold" size="lg">
                Start Training
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="relative w-full h-[400px] bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-inner">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="absolute inset-0 w-full h-full block cursor-pointer"
            />
          </div>
        )}

        {/* Success Message */}
        {gameState === 'success' && level < LEVEL_CONFIG.length && (
          <Card className="bg-green-950/20 border-green-800/40 border">
            <CardContent className="p-4 text-center">
              <p className="font-semibold text-green-400">
                ✨ Perfect tracking! Level {level + 1} loading...
              </p>
            </CardContent>
          </Card>
        )}

        {/* Win Message */}
        {gameState === 'success' && level === LEVEL_CONFIG.length && (
          <Card className="bg-yellow-950/20 border-yellow-800/40 border">
            <CardContent className="p-4 text-center space-y-2">
              <div className="text-4xl mb-2">🏆</div>
              <p className="font-bold text-lg text-yellow-300">Master Focus Achieved!</p>
              <p className="text-sm text-yellow-400">All 11 levels completed!</p>
              <p className="text-sm font-semibold">Final Score: {score}</p>
              <Button onClick={startGame} className="mt-2 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold">
                Play Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Failure Message */}
        {gameState === 'failure' && (
          <Card className="bg-red-950/20 border-red-800/40 border">
            <CardContent className="p-4 text-center space-y-2">
              <p className="font-semibold text-red-400">
                Incorrect tracking. You need 100% accuracy.
              </p>
              <p className="text-sm text-slate-400">Level {level} - Score: {score}</p>
              <Button onClick={startGame} variant="outline" className="mt-2 border-slate-700 hover:bg-slate-800">
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Benefits */}
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-3 sm:p-4 text-xs sm:text-sm text-slate-400">
            <p className="font-semibold mb-2 text-teal-400">Cognitive Benefits:</p>
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
