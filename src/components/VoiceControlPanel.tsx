"use client"

import { useState, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  getVoiceEnabled, 
  setVoiceEnabled, 
  getVoiceSpeed, 
  setVoiceSpeed,
  getSelectedVoice,
  setSelectedVoice
} from "@/lib/voiceSettings"
import { waitForVoices, isSpeechSynthesisSupported } from "@/lib/speech"

interface VoiceControlPanelProps {
  className?: string
  compact?: boolean
}

export function VoiceControlPanel({ className, compact = false }: VoiceControlPanelProps) {
  const [enabled, setEnabled] = useState(false)
  const [speed, setSpeed] = useState(0.8)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoiceName, setSelectedVoiceName] = useState<string | null>(null)
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    // Check browser support
    setIsSupported(isSpeechSynthesisSupported())
    
    // Load settings from localStorage
    setEnabled(getVoiceEnabled())
    setSpeed(getVoiceSpeed())
    setSelectedVoiceName(getSelectedVoice())

    // Load available voices
    const loadVoices = async () => {
      const availableVoices = await waitForVoices()
      setVoices(availableVoices)
    }
    loadVoices()
  }, [])

  const handleToggleEnabled = () => {
    const newEnabled = !enabled
    setEnabled(newEnabled)
    setVoiceEnabled(newEnabled)
  }

  const handleSpeedChange = (value: number[]) => {
    const newSpeed = value[0]
    setSpeed(newSpeed)
    setVoiceSpeed(newSpeed)
  }

  const handleVoiceChange = (voiceName: string) => {
    setSelectedVoiceName(voiceName)
    setSelectedVoice(voiceName)
  }

  if (!isSupported) {
    return (
      <Card className={className}>
        <CardHeader className={compact ? "p-4" : undefined}>
          <CardTitle className={compact ? "text-base" : undefined}>Voice Output</CardTitle>
          <CardDescription className={compact ? "text-xs" : undefined}>
            Text-to-speech is not supported in your browser.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className || ''}`}>
        <Button
          variant={enabled ? "default" : "outline"}
          size="sm"
          onClick={handleToggleEnabled}
          className="gap-2"
        >
          {enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          {enabled ? "Voice On" : "Voice Off"}
        </Button>
      </div>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-5 w-5" />
          Voice Output Settings
        </CardTitle>
        <CardDescription>
          Configure text-to-speech for guided content
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enable/Disable Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">Enable Voice Output</p>
            <p className="text-xs text-muted-foreground">
              Read content aloud using text-to-speech
            </p>
          </div>
          <Button
            variant={enabled ? "default" : "outline"}
            onClick={handleToggleEnabled}
            className="ml-4"
          >
            {enabled ? (
              <>
                <Volume2 className="mr-2 h-4 w-4" />
                Enabled
              </>
            ) : (
              <>
                <VolumeX className="mr-2 h-4 w-4" />
                Disabled
              </>
            )}
          </Button>
        </div>

        {/* Speed Control */}
        {enabled && (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-medium text-sm">
                  Reading Speed
                </label>
                <span className="text-sm text-muted-foreground">
                  {speed.toFixed(1)}x
                </span>
              </div>
              <Slider
                value={[speed]}
                onValueChange={handleSpeedChange}
                min={0.5}
                max={2.0}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0.5x (Slower)</span>
                <span>1.0x (Normal)</span>
                <span>2.0x (Faster)</span>
              </div>
            </div>

            {/* Voice Selection */}
            {voices.length > 0 && (
              <div className="space-y-2">
                <label className="font-medium text-sm">
                  Voice
                </label>
                <Select
                  value={selectedVoiceName || undefined}
                  onValueChange={handleVoiceChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {voices.map((voice) => (
                      <SelectItem key={voice.name} value={voice.name}>
                        {voice.name} ({voice.lang})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Choose your preferred voice for text-to-speech
                </p>
              </div>
            )}
          </>
        )}

        {!enabled && (
          <p className="text-sm text-muted-foreground">
            Enable voice output to configure additional settings
          </p>
        )}
      </CardContent>
    </Card>
  )
}
