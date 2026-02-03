"use client"

import { useState, useEffect } from "react"
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, CheckCircle2, Trophy, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Card sets for different difficulty levels
const easyCards = [
  { id: 1, icon: "🌸", name: "flower" },
  { id: 2, icon: "🌸", name: "flower" },
  { id: 3, icon: "🌈", name: "rainbow" },
  { id: 4, icon: "🌈", name: "rainbow" },
  { id: 5, icon: "⭐", name: "star" },
  { id: 6, icon: "⭐", name: "star" },
  { id: 7, icon: "🦋", name: "butterfly" },
  { id: 8, icon: "🦋", name: "butterfly" },
]

const mediumCards = [
  { id: 1, icon: "🌸", name: "flower" },
  { id: 2, icon: "🌸", name: "flower" },
  { id: 3, icon: "🌈", name: "rainbow" },
  { id: 4, icon: "🌈", name: "rainbow" },
  { id: 5, icon: "⭐", name: "star" },
  { id: 6, icon: "⭐", name: "star" },
  { id: 7, icon: "🦋", name: "butterfly" },
  { id: 8, icon: "🦋", name: "butterfly" },
  { id: 9, icon: "🌺", name: "hibiscus" },
  { id: 10, icon: "🌺", name: "hibiscus" },
  { id: 11, icon: "🌻", name: "sunflower" },
  { id: 12, icon: "🌻", name: "sunflower" },
]

const hardCards = [
  { id: 1, icon: "🌸", name: "flower" },
  { id: 2, icon: "🌸", name: "flower" },
  { id: 3, icon: "🌈", name: "rainbow" },
  { id: 4, icon: "🌈", name: "rainbow" },
  { id: 5, icon: "⭐", name: "star" },
  { id: 6, icon: "⭐", name: "star" },
  { id: 7, icon: "🦋", name: "butterfly" },
  { id: 8, icon: "🦋", name: "butterfly" },
  { id: 9, icon: "🌺", name: "hibiscus" },
  { id: 10, icon: "🌺", name: "hibiscus" },
  { id: 11, icon: "🌻", name: "sunflower" },
  { id: 12, icon: "🌻", name: "sunflower" },
  { id: 13, icon: "🌷", name: "tulip" },
  { id: 14, icon: "🌷", name: "tulip" },
  { id: 15, icon: "🌹", name: "rose" },
  { id: 16, icon: "🌹", name: "rose" },
]

const expertCards = [
  { id: 1, icon: "🌸", name: "flower" },
  { id: 2, icon: "🌸", name: "flower" },
  { id: 3, icon: "🌈", name: "rainbow" },
  { id: 4, icon: "🌈", name: "rainbow" },
  { id: 5, icon: "⭐", name: "star" },
  { id: 6, icon: "⭐", name: "star" },
  { id: 7, icon: "🦋", name: "butterfly" },
  { id: 8, icon: "🦋", name: "butterfly" },
  { id: 9, icon: "🌺", name: "hibiscus" },
  { id: 10, icon: "🌺", name: "hibiscus" },
  { id: 11, icon: "🌻", name: "sunflower" },
  { id: 12, icon: "🌻", name: "sunflower" },
  { id: 13, icon: "🌷", name: "tulip" },
  { id: 14, icon: "🌷", name: "tulip" },
  { id: 15, icon: "🌹", name: "rose" },
  { id: 16, icon: "🌹", name: "rose" },
  { id: 17, icon: "🪷", name: "lotus" },
  { id: 18, icon: "🪷", name: "lotus" },
  { id: 19, icon: "💐", name: "bouquet" },
  { id: 20, icon: "💐", name: "bouquet" },
]

type Difficulty = "easy" | "medium" | "hard" | "expert"

const difficulties: Record<Difficulty, { cards: typeof easyCards; gridCols: string; flipDelay: number; label: string; color: string }> = {
  easy: { cards: easyCards, gridCols: "grid-cols-4", flipDelay: 1000, label: "Easy (8 cards)", color: "bg-green-100 text-green-800 border-green-300" },
  medium: { cards: mediumCards, gridCols: "grid-cols-4", flipDelay: 800, label: "Medium (12 cards)", color: "bg-blue-100 text-blue-800 border-blue-300" },
  hard: { cards: hardCards, gridCols: "grid-cols-4", flipDelay: 600, label: "Hard (16 cards)", color: "bg-orange-100 text-orange-800 border-orange-300" },
  expert: { cards: expertCards, gridCols: "grid-cols-5", flipDelay: 500, label: "Expert (20 cards)", color: "bg-red-100 text-red-800 border-red-300" },
}

export default function MemoryMatch() {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium")
  const [gameCards, setGameCards] = useState<typeof easyCards>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState<Record<Difficulty, number>>({
    easy: 0,
    medium: 0,
    hard: 0,
    expert: 0,
  })

  useEffect(() => {
    resetGame()
    // Load best scores from localStorage
    const saved = localStorage.getItem("memoryMatchBestScores")
    if (saved) {
      setBestScore(JSON.parse(saved))
    }
  }, [difficulty])

  const resetGame = () => {
    const cards = difficulties[difficulty].cards
    const shuffled = [...cards].sort(() => Math.random() - 0.5)
    setGameCards(shuffled)
    setFlipped([])
    setMatched([])
    setMoves(0)
    setIsComplete(false)
  }

  const calculateScore = (moves: number, cardCount: number) => {
    const maxMoves = cardCount * 2 // Ideal would be cardCount matches
    const efficiency = Math.max(0, 100 - ((moves - cardCount / 2) / cardCount) * 100)
    return Math.round(efficiency)
  }

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) {
      return
    }

    const newFlipped = [...flipped, index]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      const newMoves = moves + 1
      setMoves(newMoves)
      const [first, second] = newFlipped
      if (gameCards[first].name === gameCards[second].name) {
        const newMatched = [...matched, first, second]
        setMatched(newMatched)
        setFlipped([])
        
        if (newMatched.length === gameCards.length) {
          setIsComplete(true)
          const finalScore = calculateScore(newMoves, gameCards.length)
          setScore(finalScore)
          
          // Update best score
          if (finalScore > bestScore[difficulty]) {
            const newBestScores = { ...bestScore, [difficulty]: finalScore }
            setBestScore(newBestScores)
            localStorage.setItem("memoryMatchBestScores", JSON.stringify(newBestScores))
          }
        }
      } else {
        setTimeout(() => setFlipped([]), difficulties[difficulty].flipDelay)
      }
    }
  }

  return (
    <div className="p-4 sm:p-6">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl">
          <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
          Memory Match - Professional Edition
        </DialogTitle>
        <DialogDescription className="text-sm sm:text-base">
          Match the pairs to improve memory and concentration. Choose your difficulty level!
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 space-y-4">
        {/* Difficulty Selection */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Select Difficulty:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(Object.keys(difficulties) as Difficulty[]).map((diff) => (
              <Button
                key={diff}
                onClick={() => setDifficulty(diff)}
                variant={difficulty === diff ? "default" : "outline"}
                className={`text-xs sm:text-sm ${difficulty === diff ? difficulties[diff].color.replace('bg-', 'bg-opacity-20 bg-') : ''}`}
              >
                {difficulties[diff].label}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-between items-center gap-2 sm:gap-4">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <Badge variant="outline" className="text-sm sm:text-base px-3 py-1">
              Moves: {moves}
            </Badge>
            <Badge variant="outline" className="text-sm sm:text-base px-3 py-1">
              <Trophy className="h-4 w-4 mr-1" />
              Best: {bestScore[difficulty]}%
            </Badge>
          </div>
          <Button onClick={resetGame} variant="outline" size="sm" className="text-xs sm:text-sm">
            New Game
          </Button>
        </div>

        {/* Game Grid */}
        <div className={`grid ${difficulties[difficulty].gridCols} gap-2 sm:gap-3`}>
          {gameCards.map((card, index) => {
            const isFlipped = flipped.includes(index) || matched.includes(index)
            const isMatched = matched.includes(index)

            return (
              <Card
                key={index}
                className={`aspect-square cursor-pointer transition-all duration-300 ${
                  isMatched ? "bg-green-100 border-green-500 border-2" : "hover:shadow-lg hover:scale-105"
                }`}
                onClick={() => handleCardClick(index)}
              >
                <CardContent className="flex items-center justify-center h-full p-0">
                  {isFlipped ? (
                    <span className="text-2xl sm:text-3xl md:text-4xl">{card.icon}</span>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-400 to-indigo-500 rounded-lg flex items-center justify-center">
                      <span className="text-xl sm:text-2xl text-white font-bold">?</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Completion Message */}
        {isComplete && (
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-500 border-2">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle2 className="h-5 w-5" />
                  <p className="font-semibold text-sm sm:text-base">
                    🎉 Congratulations! Level completed!
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
                  <span>Moves: {moves}</span>
                  <span className="font-bold">Score: {score}%</span>
                  {score > bestScore[difficulty] && (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <Star className="h-3 w-3 mr-1" /> New Record!
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Benefits */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-3 sm:p-4 text-xs sm:text-sm text-blue-900">
            <p className="font-semibold mb-2">Benefits:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Improves working memory and concentration</li>
              <li>Enhances cognitive flexibility and processing speed</li>
              <li>Provides mindful distraction from stress</li>
              <li>Boosts confidence through progressive achievement</li>
              <li>Trains pattern recognition and attention to detail</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
