"use client"

import { useState, useEffect } from "react"
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, CheckCircle2, X } from "lucide-react"

const cards = [
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

export default function MemoryMatch() {
  const [gameCards, setGameCards] = useState<typeof cards>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    resetGame()
  }, [])

  const resetGame = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5)
    setGameCards(shuffled)
    setFlipped([])
    setMatched([])
    setMoves(0)
    setIsComplete(false)
  }

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) {
      return
    }

    const newFlipped = [...flipped, index]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(moves + 1)
      const [first, second] = newFlipped
      if (gameCards[first].name === gameCards[second].name) {
        setMatched([...matched, first, second])
        setFlipped([])
        
        if (matched.length + 2 === gameCards.length) {
          setIsComplete(true)
        }
      } else {
        setTimeout(() => setFlipped([]), 1000)
      }
    }
  }

  return (
    <div className="p-6">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-2xl">
          <Brain className="h-6 w-6 text-purple-600" />
          Memory Match
        </DialogTitle>
        <DialogDescription>
          Match the pairs to improve memory and concentration. Great for cognitive training!
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">Moves: {moves}</div>
          <Button onClick={resetGame} variant="outline" size="sm">
            New Game
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {gameCards.map((card, index) => {
            const isFlipped = flipped.includes(index) || matched.includes(index)
            const isMatched = matched.includes(index)

            return (
              <Card
                key={index}
                className={`aspect-square cursor-pointer transition-all duration-300 ${
                  isMatched ? "bg-green-100 border-green-500" : "hover:shadow-lg"
                }`}
                onClick={() => handleCardClick(index)}
              >
                <CardContent className="flex items-center justify-center h-full p-0">
                  {isFlipped ? (
                    <span className="text-4xl">{card.icon}</span>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-400 to-indigo-500 rounded-lg flex items-center justify-center">
                      <span className="text-2xl text-white font-bold">?</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {isComplete && (
          <Card className="bg-green-50 border-green-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle2 className="h-5 w-5" />
                <p className="font-semibold">
                  Congratulations! You completed the game in {moves} moves!
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-sm text-blue-900">
            <p className="font-semibold mb-2">Benefits:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Improves working memory and concentration</li>
              <li>Enhances cognitive flexibility</li>
              <li>Provides mindful distraction from stress</li>
              <li>Boosts confidence through achievement</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
