"use client"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, Brain, Heart, Sparkles, Loader2, Play, Pause, RotateCcw, Volume2, VolumeX, Square } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  speak,
  stopSpeaking,
  pauseSpeaking,
  resumeSpeaking,
  isSpeaking,
  isPaused,
  waitForVoices,
  isSpeechSynthesisSupported
} from "@/lib/speech"
import { playSound, muteSounds, unmuteSounds, isSoundMuted } from "@/lib/sounds"

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
  
  // Timer state
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // TTS state
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState<number>(0)
  const [speechRate, setSpeechRate] = useState(0.8)
  const [isTTSSpeaking, setIsTTSSpeaking] = useState(false)
  const [isTTSPaused, setIsTTSPaused] = useState(false)
  const [ttsProgress, setTTSProgress] = useState("")
  const ttsCheckInterval = useRef<NodeJS.Timeout | null>(null)

  // Audio state
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1.0)

  useEffect(() => {
    if (open) {
      fetchMeditations()
      loadVoices()
    }
  }, [open])

  // Load available TTS voices
  const loadVoices = async () => {
    if (!isSpeechSynthesisSupported()) return
    const voices = await waitForVoices()
    setAvailableVoices(voices)
    // Try to find a good default voice
    const defaultIndex = voices.findIndex(v => v.lang === 'en-US' && v.name.includes('Google'))
    if (defaultIndex !== -1) {
      setSelectedVoiceIndex(defaultIndex)
    }
  }

  // Cleanup timer on unmount or when meditation changes
  useEffect(() => {
    const ttsInterval = ttsCheckInterval.current
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      if (ttsInterval) {
        clearInterval(ttsInterval)
      }
      stopSpeaking()
    }
  }, [])

  // Timer effect
  useEffect(() => {
    if (isTimerRunning && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false)
            if (timerRef.current) clearInterval(timerRef.current)
            // Play completion sound
            if (!isMuted) {
              playSound('chime', volume)
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
      
      return () => {
        if (timerRef.current) clearInterval(timerRef.current)
      }
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }, [isTimerRunning, timeRemaining, isMuted, volume])

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

  const startTimer = (meditation: Meditation) => {
    const seconds = meditation.duration * 60
    setTotalTime(seconds)
    setTimeRemaining(seconds)
    setIsTimerRunning(true)
  }

  const pauseTimer = () => {
    setIsTimerRunning(false)
  }

  const resumeTimer = () => {
    setIsTimerRunning(true)
  }

  const resetTimer = () => {
    setIsTimerRunning(false)
    if (selectedMeditation) {
      const seconds = selectedMeditation.duration * 60
      setTimeRemaining(seconds)
      setTotalTime(seconds)
    }
  }

  // TTS functions
  const PARAGRAPH_PAUSE_MS = 1000 // Pause duration between meditation paragraphs

  const startTTS = async () => {
    if (!selectedMeditation || !isSpeechSynthesisSupported()) return
    
    setIsTTSSpeaking(true)
    setIsTTSPaused(false)
    setTTSProgress("Starting meditation...")
    
    // Play start chime
    if (!isMuted) {
      try {
        await playSound('chime', volume)
      } catch (error) {
        console.warn('Failed to play start chime:', error)
      }
    }
    
    // Split script into paragraphs for better pacing
    const paragraphs = selectedMeditation.script
      .split('\n\n')
      .filter(p => p.trim().length > 0)
    
    try {
      setTTSProgress("Speaking...")
      
      // Speak each paragraph
      for (let i = 0; i < paragraphs.length; i++) {
        setTTSProgress(`Speaking paragraph ${i + 1} of ${paragraphs.length}...`)
        
        await speak(paragraphs[i], {
          rate: speechRate,
          voice: availableVoices[selectedVoiceIndex] || null,
          volume: volume
        })
        
        // Small pause between paragraphs
        if (i < paragraphs.length - 1) {
          await new Promise(resolve => setTimeout(resolve, PARAGRAPH_PAUSE_MS))
        }
      }
      
      setTTSProgress("Meditation complete")
      
      // Play completion chime
      if (!isMuted) {
        try {
          await playSound('chime', volume)
        } catch (error) {
          console.warn('Failed to play completion chime:', error)
        }
      }
      
    } catch (error) {
      console.error('TTS error:', error)
      setTTSProgress("Playback stopped")
    } finally {
      setIsTTSSpeaking(false)
      setIsTTSPaused(false)
    }
  }

  const pauseTTS = () => {
    pauseSpeaking()
    setIsTTSPaused(true)
    setTTSProgress("Paused")
  }

  const resumeTTS = () => {
    resumeSpeaking()
    setIsTTSPaused(false)
    setTTSProgress("Speaking...")
  }

  const stopTTS = () => {
    stopSpeaking()
    setIsTTSSpeaking(false)
    setIsTTSPaused(false)
    setTTSProgress("")
  }

  const toggleMute = () => {
    const newMuted = !isMuted
    setIsMuted(newMuted)
    if (newMuted) {
      muteSounds()
    } else {
      unmuteSounds()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progressPercentage = totalTime > 0 ? ((totalTime - timeRemaining) / totalTime) * 100 : 0

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
              onClick={() => {
                setSelectedMeditation(null)
                resetTimer()
              }}
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

              {/* Timer Card */}
              <Card className="bg-gradient-to-br from-teal-50 to-blue-50 border-2 border-teal-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Meditation Timer
                  </CardTitle>
                  <CardDescription>
                    {selectedMeditation.duration} minute meditation session
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-teal-700 mb-2">
                      {formatTime(timeRemaining)}
                    </div>
                    {totalTime > 0 && (
                      <Progress value={progressPercentage} className="h-2" />
                    )}
                  </div>
                  
                  <div className="flex gap-2 justify-center">
                    {!isTimerRunning && timeRemaining === 0 && (
                      <Button onClick={() => startTimer(selectedMeditation)} className="gap-2">
                        <Play className="h-4 w-4" />
                        Start Timer
                      </Button>
                    )}
                    
                    {!isTimerRunning && timeRemaining > 0 && timeRemaining < totalTime && (
                      <Button onClick={resumeTimer} className="gap-2">
                        <Play className="h-4 w-4" />
                        Resume
                      </Button>
                    )}
                    
                    {isTimerRunning && (
                      <Button onClick={pauseTimer} variant="secondary" className="gap-2">
                        <Pause className="h-4 w-4" />
                        Pause
                      </Button>
                    )}
                    
                    {timeRemaining !== totalTime && timeRemaining !== 0 && (
                      <Button onClick={resetTimer} variant="outline" className="gap-2">
                        <RotateCcw className="h-4 w-4" />
                        Reset
                      </Button>
                    )}
                  </div>
                  
                  {timeRemaining === 0 && totalTime > 0 && (
                    <Alert className="bg-green-50 border-green-200">
                      <Sparkles className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        <strong>Meditation Complete!</strong> Take a moment to notice how you feel.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Text-to-Speech Card */}
              {isSpeechSynthesisSupported() && (
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Text-to-Speech Meditation
                    </CardTitle>
                    <CardDescription>
                      Listen to guided audio narration of this meditation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Voice Selection */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Voice</label>
                      <Select
                        value={selectedVoiceIndex.toString()}
                        onValueChange={(value) => setSelectedVoiceIndex(parseInt(value))}
                        disabled={isTTSSpeaking}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a voice" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableVoices.map((voice, index) => (
                            <SelectItem key={index} value={index.toString()}>
                              {voice.name} ({voice.lang})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Speech Rate */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">Speed</label>
                        <span className="text-sm text-muted-foreground">{speechRate}x</span>
                      </div>
                      <Slider
                        value={[speechRate]}
                        onValueChange={(values) => setSpeechRate(values[0])}
                        min={0.5}
                        max={1.5}
                        step={0.1}
                        disabled={isTTSSpeaking}
                      />
                    </div>

                    {/* Volume Control */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">Volume</label>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={toggleMute}
                          className="h-8 w-8 p-0"
                        >
                          {isMuted ? (
                            <VolumeX className="h-4 w-4" />
                          ) : (
                            <Volume2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <Slider
                        value={[volume]}
                        onValueChange={(values) => setVolume(values[0])}
                        min={0}
                        max={1}
                        step={0.1}
                        disabled={isMuted}
                      />
                    </div>

                    {/* TTS Status */}
                    {ttsProgress && (
                      <Alert>
                        <AlertDescription className="text-sm">
                          {ttsProgress}
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* TTS Controls */}
                    <div className="flex gap-2 justify-center">
                      {!isTTSSpeaking && (
                        <Button onClick={startTTS} className="gap-2">
                          <Play className="h-4 w-4" />
                          Play Meditation
                        </Button>
                      )}
                      
                      {isTTSSpeaking && !isTTSPaused && (
                        <Button onClick={pauseTTS} variant="secondary" className="gap-2">
                          <Pause className="h-4 w-4" />
                          Pause
                        </Button>
                      )}
                      
                      {isTTSSpeaking && isTTSPaused && (
                        <Button onClick={resumeTTS} className="gap-2">
                          <Play className="h-4 w-4" />
                          Resume
                        </Button>
                      )}
                      
                      {isTTSSpeaking && (
                        <Button onClick={stopTTS} variant="destructive" className="gap-2">
                          <Square className="h-4 w-4" />
                          Stop
                        </Button>
                      )}
                    </div>

                    <Alert className="border-purple-200 bg-purple-50">
                      <Sparkles className="h-4 w-4 text-purple-600" />
                      <AlertDescription className="text-sm text-purple-900">
                        <strong>Tip:</strong> Close your eyes, get comfortable, and let the guided 
                        meditation voice lead you through the practice. You can adjust the speed 
                        and volume to your preference.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              )}

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
                  Use the timer above to track your meditation session.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
