"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Gamepad2, Wind, Eye, Brain, Heart, Sparkles } from "lucide-react"
import { BreathingCircle } from "./games/BreathingCircle"
import { GroundingGame } from "./games/GroundingGame"

const games = [
  {
    id: 'breathing',
    name: 'Breathing Circle',
    description: '4-7-8 breathing technique for instant calm',
    icon: Wind,
    color: 'text-teal-600',
  },
  {
    id: 'grounding',
    name: '5-4-3-2-1 Grounding',
    description: 'Sensory grounding for anxiety and panic',
    icon: Eye,
    color: 'text-indigo-600',
  },
  {
    id: 'affirmations',
    name: 'Positive Affirmations',
    description: 'Daily affirmations to boost mood',
    icon: Sparkles,
    color: 'text-pink-600',
  },
  {
    id: 'thought-challenger',
    name: 'Thought Challenger',
    description: 'CBT tool to challenge negative thoughts',
    icon: Brain,
    color: 'text-purple-600',
  },
  {
    id: 'mood-tracker',
    name: 'Mood Tracker',
    description: 'Track your daily emotions',
    icon: Heart,
    color: 'text-rose-600',
  },
]

export function GamesModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)

  const closeGame = () => {
    setSelectedGame(null)
  }

  if (selectedGame === 'breathing') {
    return <BreathingCircle open={true} onOpenChange={(open) => !open && closeGame()} />
  }

  if (selectedGame === 'grounding') {
    return (
      <Dialog open={true} onOpenChange={(open) => !open && closeGame()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <GroundingGame />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Gamepad2 className="h-6 w-6" />
            Therapeutic Games & Activities
          </DialogTitle>
          <DialogDescription>
            Evidence-based interactive tools for mental wellness
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-4 py-4">
          {games.map((game) => {
            const Icon = game.icon
            return (
              <Button
                key={game.id}
                variant="outline"
                className="h-auto p-6 flex-col items-start gap-3 hover:border-primary"
                onClick={() => setSelectedGame(game.id)}
              >
                <Icon className={`h-8 w-8 ${game.color}`} />
                <div className="text-left">
                  <div className="font-semibold text-lg mb-1">{game.name}</div>
                  <div className="text-sm text-gray-600">{game.description}</div>
                </div>
              </Button>
            )
          })}
        </div>

        <div className="text-sm text-gray-600 text-center">
          More games coming soon! These tools are designed to help you practice mental wellness techniques.
        </div>
      </DialogContent>
    </Dialog>
  )
}
