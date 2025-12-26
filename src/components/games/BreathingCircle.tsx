"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Wind } from "lucide-react"

export function BreathingCircle({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [phase, setPhase] = useState<'ready' | 'inhale' | 'hold' | 'exhale'>('ready')
  const [count, setCount] = useState(0)
  const [cycles, setCycles] = useState(0)

  useEffect(() => {
    if (phase === 'ready') return

    const durations = {
      inhale: 4000,
      hold: 7000,
      exhale: 8000,
    }

    const phases = ['inhale', 'hold', 'exhale'] as const
    const currentIndex = phases.indexOf(phase as any)
    const duration = durations[phase as keyof typeof durations]

    const interval = setInterval(() => {
      setCount(c => c + 1)
    }, 1000)

    const timer = setTimeout(() => {
      if (phase === 'exhale') {
        setCycles(c => c + 1)
        setPhase('inhale')
      } else {
        setPhase(phases[currentIndex + 1])
      }
      setCount(0)
    }, duration)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [phase])

  const start = () => {
    setPhase('inhale')
    setCount(0)
    setCycles(0)
  }

  const stop = () => {
    setPhase('ready')
    setCount(0)
  }

  const getCircleSize = () => {
    if (phase === 'inhale') return 'scale-150'
    if (phase === 'exhale') return 'scale-75'
    return 'scale-100'
  }

  const getInstruction = () => {
    if (phase === 'ready') return 'Click Start when ready'
    if (phase === 'inhale') return 'Breathe IN through your nose'
    if (phase === 'hold') return 'HOLD your breath'
    if (phase === 'exhale') return 'Breathe OUT through your mouth'
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Wind className="h-6 w-6" />
            4-7-8 Breathing Circle
          </DialogTitle>
          <DialogDescription>
            A calming breathing technique to reduce anxiety and promote relaxation
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 py-8">
          <div className="flex justify-center items-center h-64">
            <div
              className={`w-48 h-48 rounded-full bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center transition-transform duration-1000 ${getCircleSize()}`}
            >
              <div className="text-white text-center">
                <div className="text-5xl font-bold">{phase === 'ready' ? '•' : Math.ceil(
                  phase === 'inhale' ? 4 - count :
                  phase === 'hold' ? 7 - count :
                  8 - count
                )}</div>
                <div className="text-sm mt-2 uppercase tracking-wider">{phase === 'ready' ? 'Ready' : phase}</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xl font-medium mb-4">{getInstruction()}</p>
            <p className="text-sm text-gray-600">Completed Cycles: {cycles}</p>
          </div>

          <div className="flex gap-4 justify-center">
            {phase === 'ready' ? (
              <Button onClick={start} size="lg" className="px-8">
                Start Practice
              </Button>
            ) : (
              <>
                <Button onClick={stop} variant="outline" size="lg">
                  Stop
                </Button>
                <Button onClick={() => onOpenChange(false)} variant="outline" size="lg">
                  Close
                </Button>
              </>
            )}
          </div>

          <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold mb-2">How it works:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Inhale quietly through your nose for 4 seconds</li>
              <li>Hold your breath for 7 seconds</li>
              <li>Exhale completely through your mouth for 8 seconds</li>
              <li>Repeat for 4 cycles or until calm</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
