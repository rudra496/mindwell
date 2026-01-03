"use client"

import { useState, useEffect } from "react"
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
  const [isLoading, setIsLoading] = useState(true)

  // Load entries from IndexedDB on mount
  useEffect(() => {
    loadEntries()
  }, [])

  const loadEntries = async () => {
    try {
      const { GratitudeJournal: GratitudeDB } = await import('@/lib/indexeddb')
      const savedEntries = await GratitudeDB.getAllEntries()
      const formattedEntries = savedEntries.map((e, index) => ({
        id: e.id || (Date.now() + index), // Use unique fallback
        date: new Date(e.date).toISOString().split('T')[0],
        entry: e.entry
      })).sort((a, b) => b.id - a.id)
      setEntries(formattedEntries)
    } catch (error) {
      console.error('Error loading gratitude entries:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const saveEntry = async () => {
    if (currentEntry.trim()) {
      const now = new Date()
      const newEntry: GratitudeEntry = {
        id: Date.now(),
        date: now.toISOString().split('T')[0],
        entry: currentEntry.trim()
      }
      
      try {
        const { GratitudeJournal: GratitudeDB } = await import('@/lib/indexeddb')
        await GratitudeDB.addEntry({
          entry: currentEntry.trim(),
          date: now
        })
        setEntries([newEntry, ...entries])
        setCurrentEntry("")
      } catch (error) {
        console.error('Error saving gratitude entry:', error)
      }
    }
  }

  const deleteEntry = (id: number) => {
    setEntries(entries.filter(e => e.id !== id))
    // Note: Could add deletion from IndexedDB here if needed
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
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookHeart className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />
            <CardTitle className="text-lg sm:text-xl break-words">Gratitude Journal</CardTitle>
          </div>
          <CardDescription className="text-sm">
            Daily practice of gratitude improves mental health and wellbeing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
          <Alert>
            <BookHeart className="h-4 w-4" />
            <AlertDescription className="text-xs sm:text-sm break-words">
              <strong>Research shows:</strong> Practicing gratitude regularly can increase happiness, 
              reduce depression, improve sleep, and strengthen relationships. Try to write 3-5 things daily.
            </AlertDescription>
          </Alert>

          {/* Prompt */}
          <Card className="border-2 border-dashed border-primary">
            <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">Today's Prompt:</p>
              <p className="text-base sm:text-lg font-medium text-primary break-words">{currentPrompt}</p>
            </CardContent>
          </Card>

          {/* New Entry */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm sm:text-base">What are you grateful for today?</h3>
            <Textarea
              value={currentEntry}
              onChange={(e) => setCurrentEntry(e.target.value)}
              placeholder="I am grateful for..."
              rows={5}
              maxLength={1000}
              className="text-sm"
            />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <p className="text-xs text-muted-foreground">
                {currentEntry.length}/1000 characters
              </p>
              <Button
                onClick={saveEntry}
                disabled={!currentEntry.trim()}
                className="w-full sm:w-auto min-h-[44px]"
              >
                <Save className="h-4 w-4 mr-2" />
                <span className="text-sm sm:text-base">Save Entry</span>
              </Button>
            </div>
          </div>

          {/* Filter by Date */}
          {entries.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="filter-date" className="text-sm">Filter by Date</Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  id="filter-date"
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="flex-1 text-sm"
                />
                {filterDate && (
                  <Button
                    variant="outline"
                    onClick={() => setFilterDate("")}
                    className="min-h-[44px]"
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
              <h3 className="font-semibold text-sm sm:text-base">
                Your Gratitude Entries ({filteredEntries.length})
              </h3>
              <div className="space-y-3 max-h-[300px] sm:max-h-[500px] overflow-y-auto">
                {filteredEntries.map((entry) => (
                  <Card key={entry.id} className="border-l-4 border-l-pink-500">
                    <CardContent className="pt-3 sm:pt-4 p-3 sm:p-6">
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-3 mb-2">
                        <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                          {formatDate(entry.date)}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteEntry(entry.id)}
                          className="text-destructive min-h-[36px]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="whitespace-pre-wrap text-xs sm:text-sm break-words overflow-hidden">{entry.entry}</p>
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
