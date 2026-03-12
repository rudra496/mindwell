"use client"

import React from "react"
import { getPreferredVoice, SpeechOptions } from "./speech"

export interface VoiceSettings {
  enabled: boolean
  rate: number
  pitch: number
  volume: number
  voice: string | null
  lang: string
}

const DEFAULT_SETTINGS: VoiceSettings = {
  enabled: false,
  rate: 0.9,
  pitch: 1.0,
  volume: 1.0,
  voice: null,
  lang: "en-US",
}

const STORAGE_KEY = "mindwell-voice-settings"
const VOICE_SETTINGS_EVENT = "voiceSettingsChanged"

const sanitizeSettings = (value: unknown): VoiceSettings => {
  if (!value || typeof value !== "object") {
    return DEFAULT_SETTINGS
  }

  const next = value as Partial<VoiceSettings>

  return {
    enabled: Boolean(next.enabled),
    rate: typeof next.rate === "number" ? Math.min(Math.max(next.rate, 0.5), 2) : DEFAULT_SETTINGS.rate,
    pitch: typeof next.pitch === "number" ? Math.min(Math.max(next.pitch, 0.5), 2) : DEFAULT_SETTINGS.pitch,
    volume: typeof next.volume === "number" ? Math.min(Math.max(next.volume, 0), 1) : DEFAULT_SETTINGS.volume,
    voice: typeof next.voice === "string" && next.voice.length > 0 ? next.voice : null,
    lang: typeof next.lang === "string" && next.lang.length > 0 ? next.lang : DEFAULT_SETTINGS.lang,
  }
}

export const loadVoiceSettings = (): VoiceSettings => {
  if (typeof window === "undefined") return DEFAULT_SETTINGS

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return DEFAULT_SETTINGS
    return sanitizeSettings(JSON.parse(stored))
  } catch (error) {
    console.error("[voiceSettings] Failed to load settings", error)
    return DEFAULT_SETTINGS
  }
}

export const saveVoiceSettings = (settings: VoiceSettings): void => {
  if (typeof window === "undefined") return

  const normalized = sanitizeSettings(settings)

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized))
    window.dispatchEvent(new CustomEvent<VoiceSettings>(VOICE_SETTINGS_EVENT, { detail: normalized }))
  } catch (error) {
    console.error("[voiceSettings] Failed to save settings", error)
  }
}

export const toSpeechOptions = async (settings: VoiceSettings): Promise<SpeechOptions> => {
  const options: SpeechOptions = {
    rate: settings.rate,
    pitch: settings.pitch,
    volume: settings.volume,
    lang: settings.lang,
  }

  const selectedVoice = await getPreferredVoice(settings.voice, settings.lang)
  if (selectedVoice) {
    options.voice = selectedVoice
    options.lang = selectedVoice.lang
  }

  return options
}

export const useVoiceSettings = () => {
  const [settings, setSettings] = React.useState<VoiceSettings>(DEFAULT_SETTINGS)

  React.useEffect(() => {
    setSettings(loadVoiceSettings())

    const handleSettingsChange = (event: Event) => {
      const customEvent = event as CustomEvent<VoiceSettings>
      setSettings(sanitizeSettings(customEvent.detail))
    }

    window.addEventListener(VOICE_SETTINGS_EVENT, handleSettingsChange)

    return () => {
      window.removeEventListener(VOICE_SETTINGS_EVENT, handleSettingsChange)
    }
  }, [])

  const updateSettings = React.useCallback((newSettings: Partial<VoiceSettings>) => {
    setSettings((previous) => {
      const updated = sanitizeSettings({ ...previous, ...newSettings })
      saveVoiceSettings(updated)
      return updated
    })
  }, [])

  return { settings, updateSettings }
}

export const getVoiceSettings = (): VoiceSettings => {
  return loadVoiceSettings()
}

export const setVoiceSettings = (settings: Partial<VoiceSettings>): void => {
  const updated = sanitizeSettings({ ...loadVoiceSettings(), ...settings })
  saveVoiceSettings(updated)
}

export const toggleVoice = (): boolean => {
  const settings = loadVoiceSettings()
  const updated = { ...settings, enabled: !settings.enabled }
  saveVoiceSettings(updated)
  return updated.enabled
}

export const isVoiceEnabled = (): boolean => {
  return loadVoiceSettings().enabled
}
