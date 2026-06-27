"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Gamepad2, Wind, Eye, Brain, Heart, Sparkles, BookHeart, Clock, Zap, Lightbulb, Calculator, Gauge, Target, ArrowLeftRight } from "lucide-react"
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
import PatternRecognition from "./games/PatternRecognition"
import NumberSequence from "./games/NumberSequence"
import SimonMemory from "./games/SimonMemory"
import CognitiveSpeed from "./games/CognitiveSpeed"
import FocusTracker from "./games/FocusTracker"
import LogicPuzzle from "./games/LogicPuzzle"
import dynamic from "next/dynamic"

// Three.js games are lazy-loaded (ssr:false) so the ~600KB `three` package only
// downloads when a user opens a 3D game — not on every homepage load. Component
// names are unchanged, so the JSX below works as-is.
const ZenGarden3D = dynamic(() => import("./games/ZenGarden3D").then((m) => m.ZenGarden3D), { ssr: false })
const CosmicMemoryPortal = dynamic(() => import("./games/CosmicMemoryPortal").then((m) => m.CosmicMemoryPortal), { ssr: false })
const ThoughtSlicer = dynamic(() => import("./games/ThoughtSlicer").then((m) => m.ThoughtSlicer), { ssr: false })
const LogicRivers3D = dynamic(() => import("./games/LogicRivers3D").then((m) => m.LogicRivers3D), { ssr: false })

// >>>>>>> ADD FOR VOICE/TTS SUPPORT
import { speak } from "@/lib/speech"
import { useVoiceSettings } from "@/lib/voiceSettings"
// <<<<<<<

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
    name: 'Memory Match Pro',
    description: 'Progressive card matching - 15 challenging levels',
    icon: Brain,
    color: 'text-purple-600',
  },
  {
    id: 'simon-memory',
    name: 'Simon Memory Challenge',
    description: 'Repeat color sequences - 10 progressive levels',
    icon: Zap,
    color: 'text-purple-600',
  },
  {
    id: 'cognitive-speed',
    name: 'Cognitive Speed Test',
    description: 'Quick decision-making challenges - 10 levels',
    icon: Gauge,
    color: 'text-blue-600',
  },
  {
    id: 'focus-tracker',
    name: 'Focus Tracker',
    description: 'Track moving targets - 11 attention levels',
    icon: Target,
    color: 'text-green-600',
  },
  {
    id: 'logic-puzzle',
    name: 'Logic Puzzle Challenge',
    description: 'Mental puzzles and logic problems - 11 levels',
    icon: Lightbulb,
    color: 'text-amber-600',
  },
  {
    id: 'pattern-recognition',
    name: 'Pattern Recognition',
    description: 'Find patterns in shape sequences - 4 levels',
    icon: Eye,
    color: 'text-yellow-600',
  },
  {
    id: 'number-sequence',
    name: 'Number Sequence Challenge',
    description: 'Solve number patterns - 4 difficulty levels',
    icon: Calculator,
    color: 'text-indigo-600',
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
    id: 'zen-garden-3d',
    name: 'Zen Garden 3D',
    description: 'Calming interactive 3D particle connector for grounding',
    icon: Sparkles,
    color: 'text-teal-400',
  },
  {
    id: 'cosmic-memory-portal',
    name: 'Cosmic Memory Portal',
    description: 'Sequential 3D constellation spatial memory game',
    icon: Brain,
    color: 'text-blue-400',
  },
  {
    id: 'thought-slicer',
    name: 'Thought Slicer',
    description: 'Arcade action CBT distortion-identifying thought reframer',
    icon: Gamepad2,
    color: 'text-emerald-400',
  },
  {
    id: 'logic-rivers-3d',
    name: 'Logic Rivers 3D',
    description: 'Classic crossing transport logic puzzles in 3D',
    icon: ArrowLeftRight,
    color: 'text-sky-400',
  },
]

export function GamesModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)

  // >>>>>>> ADD FOR VOICE/TTS SUPPORT
  const { settings } = useVoiceSettings()

  // Narrate when modal opens and no game selected
  useEffect(() => {
    if (open && !selectedGame && settings.enabled) {
      speak("Welcome to the games section. Try out mindfulness games for relaxation.")
    }
  }, [open, selectedGame, settings.enabled])

  // Narrate when a new game is selected
  useEffect(() => {
    if (selectedGame && settings.enabled) {
      const game = games.find(g => g.id === selectedGame)
      if (game) {
        speak(`${game.name}. ${game.description}`)
      }
    }
  }, [selectedGame, settings.enabled])
  // <<<<<<<

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

  if (selectedGame === 'pattern-recognition') {
    return (
      <Dialog open={true} onOpenChange={(open) => !open && closeGame()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <PatternRecognition />
        </DialogContent>
      </Dialog>
    )
  }

  if (selectedGame === 'number-sequence') {
    return (
      <Dialog open={true} onOpenChange={(open) => !open && closeGame()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <NumberSequence />
        </DialogContent>
      </Dialog>
    )
  }

  if (selectedGame === 'simon-memory') {
    return (
      <Dialog open={true} onOpenChange={(open) => !open && closeGame()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <SimonMemory />
        </DialogContent>
      </Dialog>
    )
  }

  if (selectedGame === 'cognitive-speed') {
    return (
      <Dialog open={true} onOpenChange={(open) => !open && closeGame()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <CognitiveSpeed />
        </DialogContent>
      </Dialog>
    )
  }

  if (selectedGame === 'focus-tracker') {
    return (
      <Dialog open={true} onOpenChange={(open) => !open && closeGame()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <FocusTracker />
        </DialogContent>
      </Dialog>
    )
  }

  if (selectedGame === 'logic-puzzle') {
    return (
      <Dialog open={true} onOpenChange={(open) => !open && closeGame()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <LogicPuzzle />
        </DialogContent>
      </Dialog>
    )
  }

  if (selectedGame === 'zen-garden-3d') {
    return (
      <Dialog open={true} onOpenChange={(open) => !open && closeGame()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-950 border-slate-800">
          <ZenGarden3D />
        </DialogContent>
      </Dialog>
    )
  }

  if (selectedGame === 'cosmic-memory-portal') {
    return (
      <Dialog open={true} onOpenChange={(open) => !open && closeGame()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-950 border-slate-800">
          <CosmicMemoryPortal />
        </DialogContent>
      </Dialog>
    )
  }

  if (selectedGame === 'thought-slicer') {
    return (
      <Dialog open={true} onOpenChange={(open) => !open && closeGame()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-950 border-slate-800">
          <ThoughtSlicer />
        </DialogContent>
      </Dialog>
    )
  }

  if (selectedGame === 'logic-rivers-3d') {
    return (
      <Dialog open={true} onOpenChange={(open) => !open && closeGame()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-950 border-slate-800">
          <LogicRivers3D />
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
