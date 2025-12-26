"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, Brain, Heart, Sparkles, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Meditation {
  id: string
  slug: string
  title: string
  description: string
  duration: number
  script: string
  category: string
  benefits: string[]
}

interface MeditationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MeditationModal({ open, onOpenChange }: MeditationModalProps) {
  const [meditations, setMeditations] = useState<Meditation[]>([])
  const [selectedMeditation, setSelectedMeditation] = useState<Meditation | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      fetchMeditations()
    }
  }, [open])

  const fetchMeditations = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/meditations")
      if (!response.ok) throw new Error("Failed to fetch meditations")
      const data = await response.json()
      setMeditations(data.meditations.map((m: any) => ({
        ...m,
        benefits: typeof m.benefits === 'string' ? JSON.parse(m.benefits) : m.benefits
      })))
    } catch (err) {
      setError("Failed to load meditations. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const categories = Array.from(new Set(meditations.map(m => m.category)))

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'breathing':
        return <Heart className="h-4 w-4" />
      case 'mindfulness':
        return <Brain className="h-4 w-4" />
      case 'body-based':
        return <Sparkles className="h-4 w-4" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl">Guided Meditations</DialogTitle>
          <DialogDescription>
            Explore our collection of evidence-based meditation practices for relaxation, mindfulness, and healing
          </DialogDescription>
        </DialogHeader>

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!isLoading && !error && !selectedMeditation && (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${categories.length + 1}, minmax(0, 1fr))` }}>
              <TabsTrigger value="all">All</TabsTrigger>
              {categories.map(category => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="space-y-4 mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                {meditations.map(meditation => (
                  <Card
                    key={meditation.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedMeditation(meditation)}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{meditation.title}</CardTitle>
                        <Badge variant="outline" className="ml-2">
                          {getCategoryIcon(meditation.category)}
                          <span className="ml-1">{meditation.category}</span>
                        </Badge>
                      </div>
                      <CardDescription>{meditation.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Clock className="h-4 w-4" />
                        <span>{meditation.duration} minutes</span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Benefits:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {meditation.benefits.slice(0, 3).map((benefit, idx) => (
                            <li key={idx}>• {benefit}</li>
                          ))}
                          {meditation.benefits.length > 3 && (
                            <li className="text-xs italic">+ {meditation.benefits.length - 3} more</li>
                          )}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {categories.map(category => (
              <TabsContent key={category} value={category} className="space-y-4 mt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {meditations
                    .filter(m => m.category === category)
                    .map(meditation => (
                      <Card
                        key={meditation.id}
                        className="cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => setSelectedMeditation(meditation)}
                      >
                        <CardHeader>
                          <CardTitle className="text-lg">{meditation.title}</CardTitle>
                          <CardDescription>{meditation.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                            <Clock className="h-4 w-4" />
                            <span>{meditation.duration} minutes</span>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Benefits:</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {meditation.benefits.slice(0, 3).map((benefit, idx) => (
                                <li key={idx}>• {benefit}</li>
                              ))}
                              {meditation.benefits.length > 3 && (
                                <li className="text-xs italic">+ {meditation.benefits.length - 3} more</li>
                              )}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}

        {selectedMeditation && (
          <div className="space-y-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedMeditation(null)}
              className="mb-4"
            >
              ← Back to all meditations
            </Button>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold">{selectedMeditation.title}</h2>
                  <Badge variant="outline">
                    {getCategoryIcon(selectedMeditation.category)}
                    <span className="ml-1">{selectedMeditation.category}</span>
                  </Badge>
                </div>
                <p className="text-muted-foreground">{selectedMeditation.description}</p>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedMeditation.duration} minutes</span>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedMeditation.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Meditation Script</CardTitle>
                  <CardDescription>
                    Follow along with this guided meditation. Find a comfortable position and begin when ready.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {selectedMeditation.script}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Alert>
                <Brain className="h-4 w-4" />
                <AlertDescription>
                  <strong>Tip:</strong> For best results, find a quiet space, sit comfortably, 
                  and give yourself permission to fully engage with this practice. 
                  You may want to read through once, then close your eyes and recall the steps.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
