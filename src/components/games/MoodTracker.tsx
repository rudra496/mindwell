"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Smile, Meh, Frown, ThumbsUp, ThumbsDown, Heart } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"

interface MoodEntry {
  id: number
  date: string
  time: string
  mood: number
  note: string
}

const moodLevels = [
  { level: 1, label: "Very Bad", icon: ThumbsDown, color: "text-red-600" },
  { level: 2, label: "Bad", icon: Frown, color: "text-orange-600" },
  { level: 3, label: "Okay", icon: Meh, color: "text-yellow-600" },
  { level: 4, label: "Good", icon: Smile, color: "text-green-600" },
  { level: 5, label: "Great", icon: ThumbsUp, color: "text-blue-600" }
]

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [note, setNote] = useState("")
  const [entries, setEntries] = useState<MoodEntry[]>([])

  const saveMood = () => {
    if (selectedMood) {
      const now = new Date()
      const newEntry: MoodEntry = {
        id: Date.now(),
        date: now.toISOString().split('T')[0],
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        mood: selectedMood,
        note: note.trim()
      }
      setEntries([newEntry, ...entries])
      setSelectedMood(null)
      setNote("")
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-rose-500" />
            <CardTitle>Mood Tracker</CardTitle>
          </div>
          <CardDescription>
            Track your emotional wellness and identify patterns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <Heart className="h-4 w-4" />
            <AlertDescription>
              <strong>Track your moods:</strong> Regular mood tracking helps you identify triggers, 
              patterns, and what helps you feel better. Check in 2-3 times daily for best results.
            </AlertDescription>
          </Alert>

          {/* Mood Selection */}
          <div className="space-y-3">
            <h3 className="font-semibold">How are you feeling right now?</h3>
            <div className="grid grid-cols-5 gap-3">
              {moodLevels.map((mood) => {
                const Icon = mood.icon
                return (
                  <Button
                    key={mood.level}
                    variant={selectedMood === mood.level ? "default" : "outline"}
                    className={`flex flex-col items-center gap-2 h-auto py-4 ${
                      selectedMood === mood.level ? '' : 'hover:border-primary'
                    }`}
                    onClick={() => setSelectedMood(mood.level)}
                  >
                    <Icon className={`h-8 w-8 ${selectedMood === mood.level ? 'text-white' : mood.color}`} />
                    <span className="text-xs">{mood.label}</span>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Optional Note */}
          {selectedMood && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
              <h3 className="font-semibold text-sm">Add a note (optional)</h3>
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's affecting your mood? Any activities, thoughts, or events?"
                rows={3}
                maxLength={300}
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{note.length}/300 characters</p>
                <Button onClick={saveMood}>
                  Save Mood
                </Button>
              </div>
            </div>
          )}

          {/* Statistics */}
          {entries.length > 0 && (
            <Card className="border-primary">
              <CardContent className="pt-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold text-primary">{entries.length}</p>
                    <p className="text-sm text-muted-foreground">Total Check-ins</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-green-600">{getAverageMood()}</p>
                    <p className="text-sm text-muted-foreground">Average Mood</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-blue-600">
                      {entries.filter(e => e.mood >= 4).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Good Days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Mood History */}
          {entries.length > 0 ? (
            <div className="space-y-3">
              <h3 className="font-semibold">Your Mood History</h3>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {entries.map((entry) => (
                  <Card key={entry.id}>
                    <CardContent className="py-3 px-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getMoodIcon(entry.mood)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="font-medium">{getMoodLabel(entry.mood)}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(entry.date)} at {entry.time}
                            </span>
                          </div>
                          {entry.note && (
                            <p className="text-sm text-muted-foreground">{entry.note}</p>
                          )}
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
              <p className="text-muted-foreground">
                Start tracking your mood by selecting how you feel above
              </p>
            </Card>
          )}

          <Alert className="border-blue-200 bg-blue-50">
            <Heart className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-900">
              <strong>Tip:</strong> Track your mood at consistent times (morning, afternoon, evening). 
              Look for patterns - do certain activities, people, or times of day affect your mood?
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
