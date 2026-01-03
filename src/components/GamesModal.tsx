"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Gamepad2, Wind, Eye, Brain, Heart, Sparkles, BookHeart, Clock, Zap } from "lucide-react"
import { BreathingCircle } from "./games/BreathingCircle"
import { GroundingGame } from "./games/GroundingGame"
import AffirmationsSpinner from "./games/AffirmationsSpinner"
import GratitudeJournal from "./games/GratitudeJournal"
import MemoryMatch from "./games/MemoryMatch"
import ThoughtChallenger from "./games/ThoughtChallenger"
import EmotionWheel from "./games/EmotionWheel"
import MindfulnessTimer from "./games/MindfulnessTimer"
import ProgressiveMuscleRelaxation from "./games/ProgressiveMuscleRelaxation"
import SafePlaceVisualization from "./games/SafePlaceVisualization"
import ColoringTherapy from "./games/ColoringTherapy"

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
    id: 'thought-challenger',
    name: 'Thought Challenger',
    description: 'CBT tool to challenge negative thoughts',
    icon: Brain,
    color: 'text-purple-600',
  },
  {
    id: 'emotion-wheel',
    name: 'Emotion Wheel',
    description: 'Identify and name emotions with precision',
    icon: Heart,
    color: 'text-pink-600',
  },
  {
    id: 'mindfulness-timer',
    name: 'Mindfulness Timer',
    description: 'Simple timer for meditation practice',
    icon: Clock,
    color: 'text-teal-600',
  },
  {
    id: 'memory-match',
    name: 'Memory Match',
    description: 'Card matching for cognitive training',
    icon: Zap,
    color: 'text-orange-600',
  },
  {
    id: 'affirmations',
    name: 'Affirmations Spinner',
    description: 'Random positive affirmations to boost mood',
    icon: Sparkles,
    color: 'text-yellow-600',
  },
  {
    id: 'gratitude',
    name: 'Gratitude Journal',
    description: 'Daily gratitude practice for wellbeing',
    icon: BookHeart,
    color: 'text-pink-600',
  },
  {
    id: 'pmr',
    name: 'Progressive Muscle Relaxation',
    description: 'Guided body scan to release tension',
    icon: Gamepad2,
    color: 'text-purple-600',
  },
  {
    id: 'safe-place',
    name: 'Safe Place Visualization',
    description: 'Create a mental sanctuary for comfort',
    icon: Heart,
    color: 'text-teal-600',
  },
  {
    id: 'coloring',
    name: 'Mindful Coloring',
    description: 'Therapeutic coloring for stress relief',
    icon: Gamepad2,
    color: 'text-pink-600',
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

  if (selectedGame === 'affirmations') {
    return (
      <Dialog open={true} onOpenChange={(open) => !open && closeGame()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <AffirmationsSpinner />
        </DialogContent>
      </Dialog>
    )
  }

  if (selectedGame === 'gratitude') {
    return (
      <Dialog open={true} onOpenChange={(open) => !open && closeGame()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <GratitudeJournal />
        </DialogContent>
      </Dialog>
    )
  }

  if (selectedGame === 'pmr') {
    return (
      <Dialog open={true} onOpenChange={(open) => !open && closeGame()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <ProgressiveMuscleRelaxation />
        </DialogContent>
      </Dialog>
    )
  }

  if (selectedGame === 'safe-place') {
    return (
      <Dialog open={true} onOpenChange={(open) => !open && closeGame()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <SafePlaceVisualization />
        </DialogContent>
      </Dialog>
    )
  }

  if (selectedGame === 'coloring') {
    return (
      <Dialog open={true} onOpenChange={(open) => !open && closeGame()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <ColoringTherapy />
        </DialogContent>
      </Dialog>
    )
  }

  if (selectedGame === 'memory-match') {
    return (
      <Dialog open={true} onOpenChange={(open) => !open && closeGame()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <MemoryMatch />
        </DialogContent>
      </Dialog>
    )
  }

  if (selectedGame === 'thought-challenger') {
    return (
      <Dialog open={true} onOpenChange={(open) => !open && closeGame()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <ThoughtChallenger />
        </DialogContent>
      </Dialog>
    )
  }

  if (selectedGame === 'emotion-wheel') {
    return (
      <Dialog open={true} onOpenChange={(open) => !open && closeGame()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <EmotionWheel />
        </DialogContent>
      </Dialog>
    )
  }

  if (selectedGame === 'mindfulness-timer') {
    return (
      <Dialog open={true} onOpenChange={(open) => !open && closeGame()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <MindfulnessTimer />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl flex items-center gap-2 break-words">
            <Gamepad2 className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
            Therapeutic Games & Activities
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Evidence-based interactive tools for mental wellness
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 py-4">
          {games.map((game) => {
            const Icon = game.icon
            return (
              <Button
                key={game.id}
                variant="outline"
                className="h-auto p-4 sm:p-6 flex-col items-start gap-2 sm:gap-3 hover:border-primary min-h-[100px]"
                onClick={() => setSelectedGame(game.id)}
              >
                <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${game.color}`} />
                <div className="text-left w-full">
                  <div className="font-semibold text-sm sm:text-lg mb-1 break-words">{game.name}</div>
                  <div className="text-xs sm:text-sm text-gray-600 break-words">{game.description}</div>
                </div>
              </Button>
            )
          })}
        </div>

        <div className="text-xs sm:text-sm text-gray-600 text-center">
          These evidence-based tools help you practice mental wellness techniques interactively.
        </div>
      </DialogContent>
    </Dialog>
  )
}
