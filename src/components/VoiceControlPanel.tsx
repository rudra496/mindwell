"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Volume2, VolumeX, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useVoiceSettings } from "@/lib/voiceSettings"
import { getAvailableVoices, initializeSpeechSynthesis, speak, stopSpeaking } from "@/lib/speech"

export function VoiceControlPanel() {
  const { settings, updateSettings } = useVoiceSettings()
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    let cancelled = false

    const syncVoices = async () => {
      const loadedVoices = await initializeSpeechSynthesis()
      if (cancelled) return
      setVoices(loadedVoices)
    }

    syncVoices()

    const handleVoicesChanged = () => {
      const latest = getAvailableVoices()
      setVoices(latest)
      console.info("[voice-panel] Voices changed", { count: latest.length })
    }

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged)
    }

    return () => {
      cancelled = true
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged)
      }
    }
  }, [])

  const voiceChoices = useMemo(() => {
    if (voices.length === 0) {
      return [{ label: "System default voice", value: "default" }]
    }

    return [
      { label: "System default voice", value: "default" },
      ...voices.map((voice) => ({
        label: `${voice.name} (${voice.lang})`,
        value: voice.name,
      })),
    ]
  }, [voices])

  const selectedVoiceValue = settings.voice ?? "default"

  const handleToggle = () => {
    updateSettings({ enabled: !settings.enabled })
  }

  const handleTestVoice = async () => {
    const selectedVoice = voices.find((voice) => voice.name === settings.voice) ?? null
    await speak("This is a test of the text to speech system.", {
      rate: settings.rate,
      pitch: settings.pitch,
      volume: settings.volume,
      lang: settings.lang,
      voice: selectedVoice,
    })
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={handleToggle}
        variant={settings.enabled ? "default" : "outline"}
        size="sm"
        className="min-h-[44px]"
        aria-label={settings.enabled ? "Disable voice" : "Enable voice"}
      >
        {settings.enabled ? (
          <>
            <Volume2 className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Voice On</span>
          </>
        ) : (
          <>
            <VolumeX className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Voice Off</span>
          </>
        )}
      </Button>

      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="min-h-[44px]" aria-label="Voice settings">
            <Settings className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Voice Settings</DialogTitle>
            <DialogDescription>Customize text-to-speech for reading content aloud.</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="voice-select">Voice</Label>
              <Select
                value={selectedVoiceValue}
                onValueChange={(value) => updateSettings({ voice: value === "default" ? null : value })}
              >
                <SelectTrigger id="voice-select" className="min-h-[44px]">
                  <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent>
                  {voiceChoices.map((voice) => (
                    <SelectItem key={voice.value} value={voice.value}>
                      {voice.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">Available voices: {voices.length || 1}</p>
            </div>

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
            </div>

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
            </div>

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

            <Button onClick={handleTestVoice} className="w-full min-h-[44px]">
              Test Voice
            </Button>
            <Button variant="outline" onClick={stopSpeaking} className="w-full min-h-[44px]">
              Stop
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
