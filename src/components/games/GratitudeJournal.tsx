"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookHeart, Save, Trash2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface GratitudeEntry {
  id: number
  date: string
  entry: string
}

export default function GratitudeJournal() {
  const [currentEntry, setCurrentEntry] = useState("")
  const [entries, setEntries] = useState<GratitudeEntry[]>([])
  const [filterDate, setFilterDate] = useState("")

  const saveEntry = () => {
    if (currentEntry.trim()) {
      const newEntry: GratitudeEntry = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        entry: currentEntry.trim()
      }
      setEntries([newEntry, ...entries])
      setCurrentEntry("")
    }
  }

  const deleteEntry = (id: number) => {
    setEntries(entries.filter(e => e.id !== id))
  }

  const filteredEntries = filterDate
    ? entries.filter(e => e.date === filterDate)
    : entries

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const prompts = [
    "What made you smile today?",
    "Who are you grateful for and why?",
    "What is something beautiful you noticed today?",
    "What is a challenge that helped you grow?",
    "What comfort or luxury do you appreciate?",
    "What about your body are you thankful for?",
    "What opportunity are you grateful for?",
    "What made you feel loved today?"
  ]

  const [currentPrompt] = useState(prompts[Math.floor(Math.random() * prompts.length)])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookHeart className="h-6 w-6 text-pink-500" />
            <CardTitle>Gratitude Journal</CardTitle>
          </div>
          <CardDescription>
            Daily practice of gratitude improves mental health and wellbeing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <BookHeart className="h-4 w-4" />
            <AlertDescription>
              <strong>Research shows:</strong> Practicing gratitude regularly can increase happiness, 
              reduce depression, improve sleep, and strengthen relationships. Try to write 3-5 things daily.
            </AlertDescription>
          </Alert>

          {/* Prompt */}
          <Card className="border-2 border-dashed border-primary">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Today's Prompt:</p>
              <p className="text-lg font-medium text-primary">{currentPrompt}</p>
            </CardContent>
          </Card>

          {/* New Entry */}
          <div className="space-y-3">
            <h3 className="font-semibold">What are you grateful for today?</h3>
            <Textarea
              value={currentEntry}
              onChange={(e) => setCurrentEntry(e.target.value)}
              placeholder="I am grateful for..."
              rows={5}
              maxLength={1000}
            />
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {currentEntry.length}/1000 characters
              </p>
              <Button
                onClick={saveEntry}
                disabled={!currentEntry.trim()}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Entry
              </Button>
            </div>
          </div>

          {/* Filter by Date */}
          {entries.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="filter-date">Filter by Date</Label>
              <div className="flex gap-2">
                <Input
                  id="filter-date"
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="flex-1"
                />
                {filterDate && (
                  <Button
                    variant="outline"
                    onClick={() => setFilterDate("")}
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Past Entries */}
          {entries.length > 0 ? (
            <div className="space-y-3">
              <h3 className="font-semibold">
                Your Gratitude Entries ({filteredEntries.length})
              </h3>
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {filteredEntries.map((entry) => (
                  <Card key={entry.id} className="border-l-4 border-l-pink-500">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          {formatDate(entry.date)}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteEntry(entry.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="whitespace-pre-wrap">{entry.entry}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <Card className="p-8 text-center border-dashed">
              <BookHeart className="h-12 w-12 mx-auto text-muted-foreground mb-3 opacity-50" />
              <p className="text-muted-foreground">
                Start your gratitude practice by writing your first entry above
              </p>
            </Card>
          )}

          <Alert className="border-green-200 bg-green-50">
            <BookHeart className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-900">
              <strong>Tip:</strong> Make this a daily habit! Set a reminder to write in your gratitude journal 
              every evening before bed. On tough days, reading past entries can lift your spirits.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
