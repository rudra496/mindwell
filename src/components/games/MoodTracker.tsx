"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Smile, Meh, Frown, ThumbsUp, ThumbsDown, Heart } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { GuidanceRecommendations } from './GuidanceRecommendations'
import type { MoodLabel, GuidanceResult } from '@/lib/smart-guidance/guidance-engine'
import { runGuidanceDecisionEngine } from '@/lib/smart-guidance/guidance-engine'
import { classifyEmotion } from '@/lib/smart-guidance/emotion-classifier'

interface MoodEntry {
  id: number
  date: string
  time: string
  mood: number
  note: string
}

const moodLevels = [
  { level: 1, key: 'sad' as MoodLabel, label: "Sad", icon: ThumbsDown, color: "text-red-600" },
  { level: 2, key: 'stressed' as MoodLabel, label: "Stressed", icon: Frown, color: "text-orange-600" },
  { level: 3, key: 'overwhelmed' as MoodLabel, label: "Overwhelmed", icon: Meh, color: "text-yellow-600" },
  { level: 4, key: 'neutral' as MoodLabel, label: "Neutral", icon: Smile, color: "text-green-600" },
  { level: 5, key: 'good' as MoodLabel, label: "Good", icon: ThumbsUp, color: "text-blue-600" },
  { level: 6, key: 'anxious' as MoodLabel, label: "Anxious", icon: Heart, color: "text-purple-600" }
]

export default function MoodTracker() {
  const router = useRouter()
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [message, setMessage] = useState("")
  const [entries, setEntries] = useState<MoodEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [guidanceResult, setGuidanceResult] = useState<GuidanceResult | null>(null)

  const selectedMoodKey = useMemo(() => moodLevels.find((mood) => mood.level === selectedMood)?.key, [selectedMood])

  useEffect(() => {
    const initDB = async () => {
      try {
        const { db } = await import('@/lib/indexeddb')
        await db.init()
      } catch (error) {
        console.error('Error initializing IndexedDB:', error)
        setIsLoading(false)
        return
      }

      try {
        await loadEntries()
      } catch (error) {
        console.error('Error loading mood entries:', error)
        setIsLoading(false)
      }
    }
    initDB()
  }, [])

  useEffect(() => {
    if (!selectedMoodKey) {
      setGuidanceResult(null)
      return
    }

    const runGuidance = async () => {
      setIsAnalyzing(true)
      try {
        const classification = await classifyEmotion(message)
        const guidance = runGuidanceDecisionEngine(selectedMoodKey, classification)
        setGuidanceResult(guidance)

        const { GuidanceStats } = await import('@/lib/indexeddb')
        await GuidanceStats.addStat({
          emotionCategory: guidance.pathway,
          timestamp: new Date()
        })

        if (guidance.shouldRedirectToCrisis) {
          router.push('/crisis-resources')
        }
      } catch (error) {
        console.error('Error running smart guidance:', error)
      } finally {
        setIsAnalyzing(false)
      }
    }

    void runGuidance()
  }, [selectedMoodKey, message, router])

  const loadEntries = async () => {
    setIsLoading(true)
    try {
      const { MoodTracker: MoodTrackerDB } = await import('@/lib/indexeddb')
      const savedEntries = await MoodTrackerDB.getAllEntries()
      const formattedEntries = savedEntries.map((e, index) => ({
        id: e.id || Date.now() + index,
        date: new Date(e.date).toISOString().split('T')[0],
        time: new Date(e.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        mood: e.mood,
        note: e.notes || ''
      })).sort((a, b) => b.id - a.id)
      setEntries(formattedEntries)
    } catch (error) {
      console.error('Error loading mood entries:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const saveMood = async () => {
    if (selectedMood) {
      const now = new Date()
      const newEntry: MoodEntry = {
        id: Date.now(),
        date: now.toISOString().split('T')[0],
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        mood: selectedMood,
        note: ''
      }

      try {
        const { MoodTracker: MoodTrackerDB } = await import('@/lib/indexeddb')
        await MoodTrackerDB.addEntry({
          mood: selectedMood,
          notes: '',
          date: now
        })
        setEntries([newEntry, ...entries])
        setSelectedMood(null)
        setMessage("")
      } catch (error) {
        console.error('Error saving mood entry:', error)
      }
    }
  }

  const getAverageMood = () => {
    if (entries.length === 0) return 0
    const sum = entries.reduce((acc, entry) => acc + entry.mood, 0)
    return (sum / entries.length).toFixed(1)
  }

  const getMoodLabel = (level: number) => {
    return moodLevels.find(m => m.level === level)?.label || "Unknown"
  }

  const getMoodIcon = (level: number) => {
    const mood = moodLevels.find(m => m.level === level)
    if (!mood) return null
    const Icon = mood.icon
    return <Icon className={`h-5 w-5 ${mood.color}`} />
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

    if (dateString === today) return "Today"
    if (dateString === yesterday) return "Yesterday"
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-rose-500" />
            <CardTitle className="text-lg sm:text-xl break-words">Mood Tracker + Smart Guidance</CardTitle>
          </div>
          <CardDescription className="text-sm">
            Track your emotional wellness and get supportive resource recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-center space-y-3">
                <Heart className="h-12 w-12 mx-auto text-primary animate-pulse" />
                <p className="text-sm text-muted-foreground">Loading your mood history...</p>
              </div>
            </div>
          ) : (
            <>
              <Alert>
                <Heart className="h-4 w-4" />
                <AlertDescription>
                  <strong>Track your moods:</strong> Select your mood to instantly trigger smart support guidance.
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <h3 className="font-semibold text-sm sm:text-base">How are you feeling right now?</h3>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
                  {moodLevels.map((mood) => {
                    const Icon = mood.icon
                    return (
                      <Button
                        key={mood.level}
                        variant={selectedMood === mood.level ? "default" : "outline"}
                        className={`flex flex-col items-center gap-1 sm:gap-2 h-auto py-3 sm:py-4 min-h-[44px] ${
                          selectedMood === mood.level ? '' : 'hover:border-primary'
                        }`}
                        onClick={() => setSelectedMood(mood.level)}
                      >
                        <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${selectedMood === mood.level ? 'text-white' : mood.color}`} />
                        <span className="text-[10px] sm:text-xs">{mood.label}</span>
                      </Button>
                    )
                  })}
                </div>
              </div>

              {selectedMood && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                  <h3 className="font-semibold text-sm">Tell us more about how you're feeling (optional)</h3>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share context for better guidance recommendations (not stored)."
                    rows={3}
                    maxLength={300}
                    className="text-sm"
                  />
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <p className="text-xs text-muted-foreground">{message.length}/300 characters</p>
                    <Button onClick={saveMood} className="w-full sm:w-auto min-h-[44px]">
                      Save Mood
                    </Button>
                  </div>
                  {isAnalyzing && <p className="text-xs text-muted-foreground">Analyzing your input locally...</p>}
                </div>
              )}

              {guidanceResult && <GuidanceRecommendations guidanceResult={guidanceResult} />}

              {entries.length > 0 && (
                <Card className="border-primary">
                  <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                      <div>
                        <p className="text-2xl sm:text-3xl font-bold text-primary">{entries.length}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">Total Check-ins</p>
                      </div>
                      <div>
                        <p className="text-2xl sm:text-3xl font-bold text-green-600">{getAverageMood()}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">Average Mood</p>
                      </div>
                      <div>
                        <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                          {entries.filter(e => e.mood >= 4).length}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground">Stable Days</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {entries.length > 0 ? (
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm sm:text-base">Your Mood History</h3>
                  <div className="space-y-2 max-h-[300px] sm:max-h-[400px] overflow-y-auto">
                    {entries.map((entry) => (
                      <Card key={entry.id}>
                        <CardContent className="py-2 sm:py-3 px-3 sm:px-4">
                          <div className="flex items-start gap-2 sm:gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              {getMoodIcon(entry.mood)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 mb-1">
                                <span className="font-medium text-sm sm:text-base">{getMoodLabel(entry.mood)}</span>
                                <span className="text-xs text-muted-foreground">
                                  {formatDate(entry.date)} at {entry.time}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <Card className="p-8 text-center border-dashed">
                  <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-3 opacity-50" />
                  <p className="text-muted-foreground mb-2 font-medium">
                    No mood entries yet
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Start tracking your mood by selecting how you feel above
                  </p>
                </Card>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
