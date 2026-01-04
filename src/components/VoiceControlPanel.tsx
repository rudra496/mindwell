"use client"

import React, { useState, useEffect } from 'react'
import { Volume2, VolumeX, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useVoiceSettings } from '@/lib/voiceSettings'
import { waitForVoices, speak, stopSpeaking } from '@/lib/speech'

export function VoiceControlPanel() {
  const { settings, updateSettings } = useVoiceSettings()
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    // Load available voices
    const loadVoices = async () => {
      const availableVoices = await waitForVoices()
      setVoices(availableVoices)
    }
    loadVoices()
  }, [])

  const handleToggle = () => {
    updateSettings({ enabled: !settings.enabled })
  }

  const handleTestVoice = async () => {
    await speak('This is a test of the text to speech system.', {
      rate: settings.rate,
      pitch: settings.pitch,
      volume: settings.volume,
      voice: voices.find(v => v.name === settings.voice) || null
    })
  }

  const englishVoices = voices.filter(v => v.lang.startsWith('en-'))

  return (
    <div className="flex items-center gap-2">
      {/* Quick Toggle Button */}
      <Button
        onClick={handleToggle}
        variant={settings.enabled ? "default" : "outline"}
        size="sm"
        className="min-h-[44px]"
        aria-label={settings.enabled ? "Disable voice" : "Enable voice"}
      >
        {settings.enabled ? (
          <>
            <Volume2 className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Voice On</span>
          </>
        ) : (
          <>
            <VolumeX className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Voice Off</span>
          </>
        )}
      </Button>

      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="min-h-[44px]" aria-label="Voice settings">
            <Settings className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Voice Settings</DialogTitle>
            <DialogDescription>
              Customize text-to-speech for reading content aloud
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Voice Selection */}
            <div className="space-y-2">
              <Label htmlFor="voice-select">Voice</Label>
              <Select
                value={settings.voice || undefined}
                onValueChange={(value) => updateSettings({ voice: value })}
              >
                <SelectTrigger id="voice-select" className="min-h-[44px]">
                  <SelectValue placeholder="Default voice" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default voice</SelectItem>
                  {englishVoices.map((voice) => (
                    <SelectItem key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Speed Control */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="speed-slider">Speed</Label>
                <span className="text-sm text-gray-500">{settings.rate.toFixed(1)}x</span>
              </div>
              <Slider
                id="speed-slider"
                min={0.5}
                max={2.0}
                step={0.1}
                value={[settings.rate]}
                onValueChange={(value) => updateSettings({ rate: value[0] })}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Slower</span>
                <span>Faster</span>
              </div>
            </div>

            {/* Pitch Control */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="pitch-slider">Pitch</Label>
                <span className="text-sm text-gray-500">{settings.pitch.toFixed(1)}</span>
              </div>
              <Slider
                id="pitch-slider"
                min={0.5}
                max={2.0}
                step={0.1}
                value={[settings.pitch]}
                onValueChange={(value) => updateSettings({ pitch: value[0] })}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Lower</span>
                <span>Higher</span>
              </div>
            </div>

            {/* Volume Control */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="volume-slider">Volume</Label>
                <span className="text-sm text-gray-500">{Math.round(settings.volume * 100)}%</span>
              </div>
              <Slider
                id="volume-slider"
                min={0}
                max={1}
                step={0.1}
                value={[settings.volume]}
                onValueChange={(value) => updateSettings({ volume: value[0] })}
                className="py-2"
              />
            </div>

            {/* Test Button */}
            <Button onClick={handleTestVoice} className="w-full min-h-[44px]">
              Test Voice
            </Button>

            {/* Info */}
            <p className="text-xs text-gray-500 text-center">
              Voice will read aloud assessments, disorders, games, and therapy content when enabled.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
