"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Trophy, Star, Volume2, VolumeX } from "lucide-react"

const COLORS = [
  { id: 'red', bg: 'bg-red-500', active: 'bg-red-300', sound: 262 },
  { id: 'blue', bg: 'bg-blue-500', active: 'bg-blue-300', sound: 330 },
  { id: 'green', bg: 'bg-green-500', active: 'bg-green-300', sound: 392 },
  { id: 'yellow', bg: 'bg-yellow-500', active: 'bg-yellow-300', sound: 494 },
]

const LEVEL_CONFIG = [
  { level: 1, sequences: 3, speed: 800, buttons: 4, label: "Beginner" },
  { level: 2, sequences: 4, speed: 750, buttons: 4, label: "Easy" },
  { level: 3, sequences: 5, speed: 700, buttons: 4, label: "Comfortable" },
  { level: 4, sequences: 6, speed: 650, buttons: 4, label: "Medium" },
  { level: 5, sequences: 7, speed: 600, buttons: 4, label: "Challenging" },
  { level: 6, sequences: 8, speed: 550, buttons: 4, label: "Hard" },
  { level: 7, sequences: 9, speed: 500, buttons: 4, label: "Expert" },
  { level: 8, sequences: 10, speed: 450, buttons: 4, label: "Master" },
  { level: 9, sequences: 12, speed: 400, buttons: 4, label: "Elite" },
  { level: 10, sequences: 15, speed: 350, buttons: 4, label: "Legendary" },
]

export default function SimonMemory() {
  const [level, setLevel] = useState(1)
  const [sequence, setSequence] = useState<string[]>([])
  const [playerSequence, setPlayerSequence] = useState<string[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPlayerTurn, setIsPlayerTurn] = useState(false)
  const [activeButton, setActiveButton] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'success' | 'failure'>('idle')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("simonMemoryHighScore")
    if (saved) setHighScore(parseInt(saved))
    
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const playSound = useCallback((frequency: number) => {
    if (!soundEnabled) return
    
    if (!audioContextRef.current) {
      const AudioContextConstructor = window.AudioContext || (window as any).webkitAudioContext
      audioContextRef.current = new AudioContextConstructor()
    }
    
    const audioContext = audioContextRef.current
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = frequency
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.3)
  }, [soundEnabled])

  const flashButton = async (colorId: string, duration: number) => {
    const color = COLORS.find(c => c.id === colorId)
    if (color) playSound(color.sound)
    
    setActiveButton(colorId)
    await new Promise(resolve => setTimeout(resolve, duration))
    setActiveButton(null)
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  const generateSequence = (length: number) => {
    const newSequence = []
    for (let i = 0; i < length; i++) {
      newSequence.push(COLORS[Math.floor(Math.random() * COLORS.length)].id)
    }
    return newSequence
  }

  const playSequence = async (seq: string[]) => {
    setIsPlaying(true)
    setIsPlayerTurn(false)
    const config = LEVEL_CONFIG[level - 1]
    
    for (const colorId of seq) {
      await flashButton(colorId, config.speed / 2)
    }
    
    setIsPlaying(false)
    setIsPlayerTurn(true)
  }

  const startGame = () => {
    setLevel(1)
    setScore(0)
    setGameState('playing')
    startLevel(1)
  }

  const startLevel = (lvl: number) => {
    const config = LEVEL_CONFIG[lvl - 1]
    const newSequence = generateSequence(config.sequences)
    setSequence(newSequence)
    setPlayerSequence([])
    setGameState('playing')
    
    setTimeout(() => {
      playSequence(newSequence)
    }, 500)
  }

  const handleButtonClick = async (colorId: string) => {
    if (!isPlayerTurn || isPlaying || gameState !== 'playing') return

    const color = COLORS.find(c => c.id === colorId)
    if (color) playSound(color.sound)
    
    setActiveButton(colorId)
    setTimeout(() => setActiveButton(null), 200)

    const newPlayerSequence = [...playerSequence, colorId]
    setPlayerSequence(newPlayerSequence)

    const currentIndex = newPlayerSequence.length - 1
    if (newPlayerSequence[currentIndex] !== sequence[currentIndex]) {
      setGameState('failure')
      setIsPlayerTurn(false)
      return
    }

    if (newPlayerSequence.length === sequence.length) {
      const newScore = score + (level * 10)
      setScore(newScore)
      
      if (newScore > highScore) {
        setHighScore(newScore)
        localStorage.setItem("simonMemoryHighScore", newScore.toString())
      }

      if (level < LEVEL_CONFIG.length) {
        setGameState('success')
        setIsPlayerTurn(false)
        
        setTimeout(() => {
          const nextLevel = level + 1
          setLevel(nextLevel)
          startLevel(nextLevel)
        }, 1500)
      } else {
        setGameState('success')
        setIsPlayerTurn(false)
      }
    }
  }

  return (
    <div className="p-4 sm:p-6">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl">
          <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
          Simon Memory Challenge
        </DialogTitle>
        <DialogDescription className="text-sm sm:text-base">
          Watch the pattern and repeat it. Progressive difficulty across 10 challenging levels!
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 space-y-4">
        {/* Stats Bar */}
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
          <Button
            onClick={() => setSoundEnabled(!soundEnabled)}
            variant="outline"
            size="sm"
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
        </div>

        {/* Level Info */}
        {gameState === 'playing' && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3 text-center">
              <p className="text-sm font-semibold text-blue-900">
                {LEVEL_CONFIG[level - 1].label} - {LEVEL_CONFIG[level - 1].sequences} sequences
              </p>
              <p className="text-xs text-blue-700 mt-1">
                {isPlayerTurn ? "Your turn! Repeat the pattern" : "Watch carefully..."}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Game Board */}
        <div className="flex justify-center items-center min-h-[320px]">
          {gameState === 'idle' ? (
            <Card className="w-full max-w-[95vw] sm:max-w-md">
              <CardContent className="p-6 text-center space-y-4">
                <div className="text-6xl mb-4">🧠</div>
                <h3 className="text-xl font-bold">Simon Memory Challenge</h3>
                <p className="text-sm text-gray-600">
                  Test your memory by repeating increasingly complex color sequences.
                  10 levels of progressive difficulty!
                </p>
                <Button onClick={startGame} className="w-full" size="lg">
                  Start Game
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-2 gap-4 w-full max-w-[95vw] sm:max-w-md">
              {COLORS.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleButtonClick(color.id)}
                  disabled={!isPlayerTurn || isPlaying}
                  className={`
                    aspect-square rounded-2xl transition-all duration-200 transform
                    ${activeButton === color.id ? color.active : color.bg}
                    ${isPlayerTurn && !isPlaying ? 'hover:scale-105 cursor-pointer' : 'cursor-not-allowed opacity-70'}
                    ${activeButton === color.id ? 'scale-95 shadow-2xl' : 'shadow-lg'}
                    disabled:cursor-not-allowed
                  `}
                  aria-label={`${color.id} button`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Success Message */}
        {gameState === 'success' && level < LEVEL_CONFIG.length && (
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-500 border-2">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-green-700">
                <Star className="h-5 w-5" />
                <p className="font-semibold">Perfect! Next level loading...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Win Message */}
        {gameState === 'success' && level === LEVEL_CONFIG.length && (
          <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-500 border-2">
            <CardContent className="p-4 text-center space-y-2">
              <div className="text-4xl mb-2">🏆</div>
              <p className="font-bold text-lg text-yellow-900">Congratulations!</p>
              <p className="text-sm text-yellow-800">You completed all 10 levels!</p>
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
              <p className="font-semibold text-red-700">Oops! Wrong sequence</p>
              <p className="text-sm text-red-600">
                You reached Level {level} with {score} points
              </p>
              <Button onClick={startGame} variant="outline" className="mt-2">
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Benefits */}
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-3 sm:p-4 text-xs sm:text-sm text-purple-900">
            <p className="font-semibold mb-2">Cognitive Benefits:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Enhances working memory and sequential recall</li>
              <li>Improves attention span and focus</li>
              <li>Trains auditory and visual processing</li>
              <li>Develops pattern recognition skills</li>
              <li>Provides engaging mental stimulation</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
