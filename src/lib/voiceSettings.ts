"use client"

import React from "react"
import { SpeechOptions } from "./speech"

/**
 * Global voice settings and state management for MindWell
 * Stores preferences for meditation and guided exercises
 */

export interface VoiceSettings {
  enabled: boolean
  rate: number
  pitch: number
  volume: number
  voice: string | null
}

const DEFAULT_SETTINGS: VoiceSettings = {
  enabled: false,
  rate: 0.9,
  pitch: 1.0,
  volume: 1.0,
  voice: null
}

const STORAGE_KEY = "mindwell-voice-settings"

/* -------------------------- */
/* LOAD SETTINGS */
/* -------------------------- */

export const loadVoiceSettings = (): VoiceSettings => {
  if (typeof window === "undefined") return DEFAULT_SETTINGS

  try {
    const stored = localStorage.getItem(STORAGE_KEY)

    if (stored) {
      const parsed = JSON.parse(stored)
      return { ...DEFAULT_SETTINGS, ...parsed }
    }
  } catch (err) {
    console.error("Voice settings load error:", err)
  }

  return DEFAULT_SETTINGS
}

/* -------------------------- */
/* SAVE SETTINGS */
/* -------------------------- */

export const saveVoiceSettings = (settings: VoiceSettings): void => {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))

    window.dispatchEvent(
      new CustomEvent("voiceSettingsChanged", { detail: settings })
    )
  } catch (err) {
    console.error("Voice settings save error:", err)
  }
}

/* -------------------------- */
/* CONVERT TO SPEECH OPTIONS */
/* -------------------------- */

export const toSpeechOptions = (settings: VoiceSettings): SpeechOptions => {
  const options: SpeechOptions = {
    rate: settings.rate,
    pitch: settings.pitch,
    volume: settings.volume
  }

  if (
    settings.voice &&
    typeof window !== "undefined" &&
    "speechSynthesis" in window
  ) {
    const voices = window.speechSynthesis.getVoices()

    const selectedVoice = voices.find((v) => v.name === settings.voice)

    if (selectedVoice) {
      options.voice = selectedVoice
    }
  }

  return options
}

/* -------------------------- */
/* REACT HOOK */
/* -------------------------- */

export const useVoiceSettings = () => {
  const [settings, setSettings] = React.useState<VoiceSettings>(
    loadVoiceSettings()
  )

  React.useEffect(() => {
    const handleChange = (event: Event) => {
      const customEvent = event as CustomEvent<VoiceSettings>
      setSettings(customEvent.detail)
    }

    window.addEventListener("voiceSettingsChanged", handleChange)

    return () =>
      window.removeEventListener("voiceSettingsChanged", handleChange)
  }, [])

  const updateSettings = React.useCallback(
    (newSettings: Partial<VoiceSettings>) => {
      const updated = { ...settings, ...newSettings }

      setSettings(updated)
      saveVoiceSettings(updated)
    },
    [settings]
  )

  return { settings, updateSettings }
}

/* -------------------------- */
/* NON-REACT HELPERS */
/* -------------------------- */

export const getVoiceSettings = (): VoiceSettings => {
  return loadVoiceSettings()
}

export const setVoiceSettings = (settings: Partial<VoiceSettings>): void => {
  const current = loadVoiceSettings()
  const updated = { ...current, ...settings }

  saveVoiceSettings(updated)
}

/* -------------------------- */
/* QUICK TOGGLE */
/* -------------------------- */

export const toggleVoice = (): boolean => {
  const settings = loadVoiceSettings()

  const newEnabled = !settings.enabled

  const updated = {
    ...settings,
    enabled: newEnabled
  }

  saveVoiceSettings(updated)

  return newEnabled
}

/* -------------------------- */
/* CHECK STATUS */
/* -------------------------- */

export const isVoiceEnabled = (): boolean => {
  return loadVoiceSettings().enabled
}