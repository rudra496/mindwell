"use client"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Wind } from "lucide-react"

class BreathingSynth {
  private ctx: AudioContext | null = null
  private osc: OscillatorNode | null = null
  private gain: GainNode | null = null

  start(phase: 'inhale' | 'hold' | 'exhale') {
    if (typeof window === 'undefined') return
    try {
      if (!this.ctx) {
        this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume()
      }
      this.stop()

      this.osc = this.ctx.createOscillator()
      this.gain = this.ctx.createGain()

      this.osc.connect(this.gain)
      this.gain.connect(this.ctx.destination)

      const now = this.ctx.currentTime
      if (phase === 'inhale') {
        // Smooth rising frequency and swelling volume
        this.osc.type = 'sine'
        this.osc.frequency.setValueAtTime(220, now)
        this.osc.frequency.exponentialRampToValueAtTime(380, now + 4)
        this.gain.gain.setValueAtTime(0, now)
        this.gain.gain.linearRampToValueAtTime(0.2, now + 4)
      } else if (phase === 'hold') {
        // Soft steady tone
        this.osc.type = 'sine'
        this.osc.frequency.setValueAtTime(380, now)
        this.gain.gain.setValueAtTime(0.1, now)
      } else if (phase === 'exhale') {
        // Deep descending frequency and fading volume
        this.osc.type = 'sine'
        this.osc.frequency.setValueAtTime(380, now)
        this.osc.frequency.exponentialRampToValueAtTime(180, now + 8)
        this.gain.gain.setValueAtTime(0.2, now)
        this.gain.gain.exponentialRampToValueAtTime(0.001, now + 8)
      }

      this.osc.start(now)
    } catch (e) {
      console.warn('Audio Context error:', e)
    }
  }

  stop() {
    if (this.osc) {
      try {
        this.osc.stop()
        this.osc.disconnect()
      } catch (e) {}
      this.osc = null
    }
    if (this.gain) {
      try {
        this.gain.disconnect()
      } catch (e) {}
      this.gain = null
    }
  }
}

export function BreathingCircle({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [phase, setPhase] = useState<'ready' | 'inhale' | 'hold' | 'exhale'>('ready')
  const [count, setCount] = useState(0)
  const [cycles, setCycles] = useState(0)
  const synthRef = useRef<BreathingSynth | null>(null)

  useEffect(() => {
    if (!synthRef.current) {
      synthRef.current = new BreathingSynth()
    }
    return () => {
      synthRef.current?.stop()
    }
  }, [])

  useEffect(() => {
    if (phase === 'ready') {
      synthRef.current?.stop()
      return
    }

    synthRef.current?.start(phase)

    const durations = {
      inhale: 4000,
      hold: 7000,
      exhale: 8000,
    }

    const phases = ['inhale', 'hold', 'exhale'] as const
    const currentIndex = phases.indexOf(phase as 'inhale' | 'hold' | 'exhale')
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
    synthRef.current?.stop()
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

  const getCircleGradient = () => {
    if (phase === 'inhale') return 'from-teal-400 via-emerald-400 to-cyan-500 shadow-[0_0_50px_rgba(45,212,191,0.6)]'
    if (phase === 'hold') return 'from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_60px_rgba(99,102,241,0.6)]'
    if (phase === 'exhale') return 'from-amber-400 via-orange-400 to-rose-500 shadow-[0_0_40px_rgba(251,191,36,0.5)]'
    return 'from-slate-400 to-slate-500 shadow-lg'
  }

  const getTransitionStyle = () => {
    if (phase === 'inhale') {
      return { transition: 'transform 4000ms ease-in-out, background-color 4000ms ease-in-out, box-shadow 4000ms ease-in-out' }
    }
    if (phase === 'hold') {
      return { transition: 'transform 7000ms ease-in-out, background-color 7000ms ease-in-out, box-shadow 7000ms ease-in-out' }
    }
    if (phase === 'exhale') {
      return { transition: 'transform 8000ms ease-in-out, background-color 8000ms ease-in-out, box-shadow 8000ms ease-in-out' }
    }
    return { transition: 'transform 1000ms ease-in-out' }
  }

  return (
    <Dialog open={open} onOpenChange={(val) => {
      if (!val) stop()
      onOpenChange(val)
    }}>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 bg-slate-950 text-slate-100 border-slate-800 break-words whitespace-normal overflow-x-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl flex items-center gap-2 break-words text-teal-400">
            <Wind className="h-5 w-5 sm:h-6 sm:w-6 text-teal-400 animate-pulse" />
            4-7-8 Breathing Circle
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-400">
            A calming breathing technique to reduce anxiety and promote relaxation
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 sm:space-y-8 py-4 sm:py-8">
          <div className="flex justify-center items-center h-48 sm:h-64">
            <div
              className={`w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br ${getCircleGradient()} flex items-center justify-center ${getCircleSize()}`}
              style={getTransitionStyle()}
            >
              <div className="text-white text-center select-none">
                <div className="text-4xl sm:text-5xl font-extrabold tabular-nums drop-shadow-md">
                  {phase === 'ready' ? '•' : Math.ceil(
                    phase === 'inhale' ? 4 - count :
                    phase === 'hold' ? 7 - count :
                    8 - count
                  )}
                </div>
                <div className="text-[10px] sm:text-xs mt-2 uppercase tracking-widest font-semibold drop-shadow-sm">
                  {phase === 'ready' ? 'Ready' : phase}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center px-2">
            <p className="text-base sm:text-xl font-semibold mb-2 sm:mb-4 text-teal-300 drop-shadow-sm min-h-[28px] transition-all">
              {getInstruction()}
            </p>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">Completed Cycles: {cycles}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center px-2">
            {phase === 'ready' ? (
              <Button onClick={start} size="lg" className="px-6 sm:px-8 min-h-[44px] w-full sm:w-auto bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold">
                <span className="text-sm sm:text-base">Start Practice</span>
              </Button>
            ) : (
              <>
                <Button onClick={stop} variant="outline" size="lg" className="min-h-[44px] w-full sm:w-auto border-slate-700 hover:bg-slate-800 text-slate-200">
                  <span className="text-sm sm:text-base">Stop</span>
                </Button>
                <Button onClick={() => onOpenChange(false)} variant="outline" size="lg" className="min-h-[44px] w-full sm:w-auto border-slate-700 hover:bg-slate-800 text-slate-200">
                  <span className="text-sm sm:text-base">Close</span>
                </Button>
              </>
            )}
          </div>

          <div className="text-xs sm:text-sm text-slate-400 bg-slate-900 border border-slate-800 p-3 sm:p-4 rounded-lg">
            <p className="font-bold text-teal-400 mb-2">How it works:</p>
            <ul className="list-disc list-inside space-y-1 break-words">
              <li>Inhale quietly through your nose for 4 seconds (visual expands)</li>
              <li>Hold your breath for 7 seconds (visual stays large and deepens)</li>
              <li>Exhale completely through your mouth for 8 seconds (visual shrinks and warms)</li>
              <li>Repeat for 4 cycles or until calm</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
