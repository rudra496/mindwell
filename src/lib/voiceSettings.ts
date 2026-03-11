"use client"

import React from "react"
import { SpeechOptions } from "./speech"

export interface VoiceSettings {
  enabled: boolean
  rate: number
  pitch: number
  volume: number
  lang: string
  voice: string | null
}

const DEFAULT_SETTINGS: VoiceSettings = {
  enabled: false,
  rate: 0.9,
  pitch: 1.0,
  volume: 1.0,
  lang: "en-US",
  voice: null,
}

const STORAGE_KEY = "mindwell-voice-settings"

export const loadVoiceSettings = (): VoiceSettings => {
  if (typeof window === "undefined") return DEFAULT_SETTINGS

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) }
    }
  } catch (error) {
    console.error("Error loading voice settings:", error)
  }

  return DEFAULT_SETTINGS
}

export const saveVoiceSettings = (settings: VoiceSettings): void => {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    window.dispatchEvent(new CustomEvent("voiceSettingsChanged", { detail: settings }))
  } catch (error) {
    console.error("Error saving voice settings:", error)
  }
}

export const toSpeechOptions = (settings: VoiceSettings): SpeechOptions => {
  const options: SpeechOptions = {
    rate: settings.rate,
    pitch: settings.pitch,
    volume: settings.volume,
    lang: settings.lang,
  }

  if (settings.voice && typeof window !== "undefined" && "speechSynthesis" in window) {
    const voices = window.speechSynthesis.getVoices()
    const selectedVoice = voices.find((v) => v.name === settings.voice)
    if (selectedVoice) {
      options.voice = selectedVoice
    }
  }

  return options
}

export const useVoiceSettings = () => {
  const [settings, setSettings] = React.useState<VoiceSettings>(loadVoiceSettings())

  React.useEffect(() => {
    const handleChange = (event: Event) => {
      const customEvent = event as CustomEvent<VoiceSettings>
      setSettings(customEvent.detail)
    }

    window.addEventListener("voiceSettingsChanged", handleChange)
    return () => window.removeEventListener("voiceSettingsChanged", handleChange)
  }, [])

  const updateSettings = React.useCallback(
    (newSettings: Partial<VoiceSettings>) => {
      setSettings((prevSettings) => {
        const updated = { ...prevSettings, ...newSettings }
        saveVoiceSettings(updated)
        return updated
      })
    },
    []
  )

  return { settings, updateSettings }
}

export const getVoiceSettings = (): VoiceSettings => {
  return loadVoiceSettings()
}

export const setVoiceSettings = (settings: Partial<VoiceSettings>): void => {
  const current = loadVoiceSettings()
  const updated = { ...current, ...settings }
  saveVoiceSettings(updated)
}

export const toggleVoice = (): boolean => {
  const settings = loadVoiceSettings()
  const newEnabled = !settings.enabled
  saveVoiceSettings({ ...settings, enabled: newEnabled })
  return newEnabled
}

export const isVoiceEnabled = (): boolean => {
  return loadVoiceSettings().enabled
}
