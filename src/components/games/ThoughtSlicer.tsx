"use client"

import { useState, useEffect, useRef } from "react"
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Trophy, ShieldAlert, Heart } from "lucide-react"

interface ReframeThought {
  id: number
  text: string
  distortion: string
  reframe: string
  x: number
  y: number
  vy: number
  width: number
  height: number
  sliced: boolean
  reframeTimer: number
  particles: { x: number; y: number; vx: number; vy: number; color: string; size: number; alpha: number }[]
}

const DISTORTION_CATEGORIES = [
  { id: 'all-or-nothing', name: 'All-or-Nothing', description: 'Seeing things in black-and-white (e.g. "always", "never", "must").' },
  { id: 'catastrophizing', name: 'Catastrophizing', description: 'Expecting the worst possible outcome.' },
  { id: 'mind-reading', name: 'Mind Reading', description: 'Assuming you know what others are thinking.' },
  { id: 'overgeneralization', name: 'Overgeneralization', description: 'Taking a single negative event as a never-ending pattern.' },
  { id: 'personalization', name: 'Personalization', description: 'Holding yourself personally responsible for external events.' },
]

const THOUGHT_POOL = [
  { text: "I must be perfect at everything I do.", distortion: "all-or-nothing", reframe: "I don't have to be perfect; doing my best is enough." },
  { text: "Everything is going to fall apart completely.", distortion: "catastrophizing", reframe: "Even if problems occur, I can handle them step-by-step." },
  { text: "They are just being nice, they actually dislike me.", distortion: "mind-reading", reframe: "I cannot read minds. I will trust their actions." },
  { text: "I always mess everything up.", distortion: "overgeneralization", reframe: "I make mistakes sometimes, but I also succeed frequently." },
  { text: "It is my fault they are unhappy today.", distortion: "personalization", reframe: "I am not responsible for other people's moods." },
  { text: "I am either a complete success or a total failure.", distortion: "all-or-nothing", reframe: "Life has nuances, and success comes in steps." },
  { text: "If I fail this exam, my entire life is ruined.", distortion: "catastrophizing", reframe: "An exam is important, but a single test does not define my future." },
  { text: "They haven't texted back, they must be mad at me.", distortion: "mind-reading", reframe: "They might just be busy or away from their phone." },
]

class SlicerSynth {
  private ctx: AudioContext | null = null

  playTone(freq: number, type: OscillatorType, duration: number) {
    if (typeof window === 'undefined') return
    try {
      if (!this.ctx) {
        this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume()
      }
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.type = type
      osc.frequency.setValueAtTime(freq, now)

      gain.gain.setValueAtTime(0.25, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration)

      osc.start(now)
      osc.stop(now + duration)
    } catch (e) {}
  }
}

export function ThoughtSlicer() {
  const [selectedDistortion, setSelectedDistortion] = useState<string>('all-or-nothing')
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover' | 'victory'>('idle')
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [health, setHealth] = useState(100)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const synthRef = useRef<SlicerSynth | null>(null)
  const activeThoughtsRef = useRef<ReframeThought[]>([])
  const mouseTrailRef = useRef<{ x: number; y: number }[]>([])
  const isMouseDownRef = useRef(false)
  const animationRef = useRef<number | null>(null)
  const stateRef = useRef(gameState)

  useEffect(() => {
    stateRef.current = gameState
  }, [gameState])

  useEffect(() => {
    synthRef.current = new SlicerSynth()
    const saved = localStorage.getItem("thoughtSlicerHighScore")
    if (saved) setHighScore(parseInt(saved))
  }, [])

  const startGame = () => {
    setScore(0)
    setHealth(100)
    activeThoughtsRef.current = []
    setGameState('playing')
  }

  useEffect(() => {
    if (gameState !== 'playing') return

    const spawnInterval = setInterval(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const template = THOUGHT_POOL[Math.floor(Math.random() * THOUGHT_POOL.length)]
      const x = 50 + Math.random() * (canvas.width - 250)

      const newThought: ReframeThought = {
        id: Date.now() + Math.random(),
        text: template.text,
        distortion: template.distortion,
        reframe: template.reframe,
        x,
        y: -40,
        vy: 0.8 + Math.random() * 0.8,
        width: 220,
        height: 60,
        sliced: false,
        reframeTimer: 0,
        particles: []
      }

      activeThoughtsRef.current.push(newThought)
    }, 4500)

    return () => clearInterval(spawnInterval)
  }, [gameState])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let active = true

    const draw = () => {
      if (!active) return

      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        if (canvas.width !== rect.width || canvas.height !== 400) {
          canvas.width = rect.width
          canvas.height = 400
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#0f172a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = '#1e293b'
      ctx.lineWidth = 1
      for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      const thoughts = activeThoughtsRef.current

      if (stateRef.current === 'playing') {
        thoughts.forEach((t, index) => {
          if (!t.sliced) {
            t.y += t.vy

            if (t.y > canvas.height - 20) {
              setHealth(prev => {
                const next = prev - 15
                if (next <= 0) {
                  setGameState('gameover')
                }
                return Math.max(0, next)
              })
              synthRef.current?.playTone(180, 'triangle', 0.4)
              thoughts.splice(index, 1)
            }
          } else {
            t.particles.forEach(p => {
              p.x += p.vx
              p.y += p.vy
              p.alpha -= 0.02
            })
            t.particles = t.particles.filter(p => p.alpha > 0)
            t.reframeTimer--

            if (t.reframeTimer <= 0 && t.particles.length === 0) {
              thoughts.splice(index, 1)
            }
          }
        })
      }

      thoughts.forEach(t => {
        if (!t.sliced) {
          ctx.save()
          ctx.beginPath()
          ctx.roundRect(t.x, t.y, t.width, t.height, 12)
          ctx.fillStyle = 'rgba(71, 85, 105, 0.8)'
          ctx.fill()
          ctx.strokeStyle = '#ef4444'
          ctx.lineWidth = 2
          ctx.stroke()

          ctx.fillStyle = '#f8fafc'
          ctx.font = '12px sans-serif'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'

          const words = t.text.split(' ')
          let line = ''
          let lines: string[] = []
          for (let i = 0; i < words.length; i++) {
            let testLine = line + words[i] + ' '
            let metrics = ctx.measureText(testLine)
            if (metrics.width > t.width - 20 && i > 0) {
              lines.push(line)
              line = words[i] + ' '
            } else {
              line = testLine
            }
          }
          lines.push(line)

          lines.forEach((l, idx) => {
            ctx.fillText(l.trim(), t.x + t.width / 2, t.y + (t.height / 2) - ((lines.length - 1) * 7) + (idx * 14))
          })

          ctx.restore()
        } else {
          ctx.save()
          ctx.fillStyle = '#10b981'
          ctx.font = 'bold 13px sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText("Reframed: " + t.reframe, t.x + t.width / 2, t.y + t.height / 2)

          t.particles.forEach(p => {
            ctx.save()
            ctx.globalAlpha = p.alpha
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
            ctx.fillStyle = p.color
            ctx.fill()
            ctx.restore()
          })
          ctx.restore()
        }
      })

      const trail = mouseTrailRef.current
      if (trail.length > 1) {
        ctx.beginPath()
        ctx.moveTo(trail[0].x, trail[0].y)
        for (let i = 1; i < trail.length; i++) {
          ctx.lineTo(trail[i].x, trail[i].y)
        }
        ctx.strokeStyle = '#38bdf8'
        ctx.lineWidth = 4
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.shadowColor = '#38bdf8'
        ctx.shadowBlur = 10
        ctx.stroke()
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      active = false
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [gameState])

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isMouseDownRef.current = true
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    mouseTrailRef.current = [{ x, y }]
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isMouseDownRef.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const trail = mouseTrailRef.current
    trail.push({ x, y })
    if (trail.length > 8) {
      trail.shift()
    }

    const thoughts = activeThoughtsRef.current
    thoughts.forEach((t) => {
      if (!t.sliced) {
        const boundsX = x >= t.x && x <= t.x + t.width
        const boundsY = y >= t.y && y <= t.y + t.height

        if (boundsX && boundsY) {
          if (selectedDistortion === t.distortion) {
            t.sliced = true
            t.reframeTimer = 90

            const particles = []
            for (let i = 0; i < 25; i++) {
              particles.push({
                x: t.x + t.width / 2,
                y: t.y + t.height / 2,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                color: ['#10b981', '#34d399', '#6ee7b7', '#fcd34d'][Math.floor(Math.random() * 4)],
                size: 2 + Math.random() * 3,
                alpha: 1
              })
            }
            t.particles = particles

            synthRef.current?.playTone(523.25, 'sine', 0.15)
            setTimeout(() => synthRef.current?.playTone(659.25, 'sine', 0.15), 100)
            setTimeout(() => synthRef.current?.playTone(783.99, 'sine', 0.3), 200)

            setScore(s => {
              const next = s + 100
              if (next >= 1000) {
                setGameState('victory')
              }
              return next
            })
          } else {
            synthRef.current?.playTone(180, 'square', 0.2)
          }
        }
      }
    })
  }

  const handleMouseUp = () => {
    isMouseDownRef.current = false
    mouseTrailRef.current = []
  }

  return (
    <div className="p-4 sm:p-6 bg-slate-950 text-slate-100 border-slate-800">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl text-teal-400">
          <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-teal-400" />
          Negative Thought Slicer (CBT)
        </DialogTitle>
        <DialogDescription className="text-sm text-slate-400">
          Identify the cognitive distortion at the bottom, then click and drag to slice the automatic negative thoughts (ANTs).
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-sm px-3 py-1 border-slate-700 bg-slate-900 text-slate-200">
              Score: {score} / 1000
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1 border-slate-700 bg-slate-900 text-slate-200">
              Best: {highScore}
            </Badge>
          </div>
          {gameState === 'playing' && (
            <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1 rounded border border-slate-800 text-xs">
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              <div className="w-20 bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full transition-all duration-300" style={{ width: `${health}%` }} />
              </div>
            </div>
          )}
        </div>

        {gameState === 'idle' ? (
          <Card className="w-full max-w-[95vw] sm:max-w-md mx-auto bg-slate-900 border-slate-800">
            <CardContent className="p-6 text-center space-y-4">
              <div className="text-6xl mb-4 animate-bounce">⚔️</div>
              <h3 className="text-xl font-bold text-teal-400">Thought Slicer</h3>
              <p className="text-sm text-slate-400">
                Practice Cognitive Behavioral Therapy (CBT). First click on the correct distortion category at the bottom, 
                then slice the descending thought block. Reframe them into positive affirmations to score points!
              </p>
              <Button onClick={startGame} className="w-full bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold" size="lg">
                Enter Challenge
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="relative w-full h-[400px] bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-inner flex justify-center items-center">
              {gameState === 'gameover' && (
                <div className="absolute z-10 bg-slate-950/80 p-6 rounded-lg text-center border border-red-500/30">
                  <ShieldAlert className="h-10 w-10 mx-auto text-red-500 mb-2 animate-pulse" />
                  <h4 className="font-bold text-lg text-red-400">Mental Overload</h4>
                  <p className="text-sm text-slate-300 mt-1">Automatic thoughts filled your mind. Let's try again.</p>
                  <Button onClick={startGame} className="mt-4 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold">
                    Try Again
                  </Button>
                </div>
              )}

              {gameState === 'victory' && (
                <div className="absolute z-10 bg-slate-950/80 p-6 rounded-lg text-center border border-teal-500/30">
                  <div className="text-4xl mb-2">🏆</div>
                  <h4 className="font-bold text-lg text-teal-300">Cognitive Harmony Restored</h4>
                  <p className="text-sm text-slate-300 mt-1">You have reframed all automatic negative thoughts successfully!</p>
                  <Button onClick={startGame} className="mt-4 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold">
                    Play Again
                  </Button>
                </div>
              )}

              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="absolute inset-0 w-full h-full block cursor-crosshair"
              />
            </div>

            {gameState === 'playing' && (
              <div className="space-y-2">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Select Distortion to Slice:</p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {DISTORTION_CATEGORIES.map((cat) => (
                    <Button
                      key={cat.id}
                      onClick={() => {
                        setSelectedDistortion(cat.id)
                        synthRef.current?.playTone(260, 'sine', 0.1)
                      }}
                      variant={selectedDistortion === cat.id ? "default" : "outline"}
                      className={`text-xs h-auto py-2.5 px-2 break-words ${
                        selectedDistortion === cat.id 
                          ? 'bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold' 
                          : 'border-slate-800 text-slate-300 hover:bg-slate-900'
                      }`}
                      title={cat.description}
                    >
                      {cat.name}
                    </Button>
                  ))}
                </div>
                <Card className="bg-slate-900 border-slate-800">
                  <CardContent className="p-3 text-[11px] sm:text-xs text-slate-400">
                    <span className="font-bold text-teal-400">Description: </span>
                    {DISTORTION_CATEGORIES.find(c => c.id === selectedDistortion)?.description}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-3 sm:p-4 text-xs sm:text-sm text-slate-400">
            <p className="font-semibold mb-2 text-teal-400">Therapeutic Goals:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Reinforces active identification of cognitive distortions in real time</li>
              <li>Somatic "slicing" interaction represents active dismissal of unwanted thought patterns</li>
              <li>Reframe statements offer immediate positive, realistic alternatives to negative beliefs</li>
              <li>Boosts emotional self-regulation and builds resilient thinking habits</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
