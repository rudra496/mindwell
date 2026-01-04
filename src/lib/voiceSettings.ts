"use client"

import React from 'react'
import { SpeechOptions } from './speech'

/**
 * Global voice settings and state management for MindWell
 * Manages text-to-speech preferences across the application
 */

export interface VoiceSettings {
  enabled: boolean
  rate: number // 0.5 - 2.0
  pitch: number // 0.5 - 2.0
  volume: number // 0 - 1
  voice: string | null // Voice name
}

const DEFAULT_SETTINGS: VoiceSettings = {
  enabled: false,
  rate: 0.9,
  pitch: 1.0,
  volume: 1.0,
  voice: null
}

const STORAGE_KEY = 'mindwell-voice-settings'

// Get settings from localStorage
export const loadVoiceSettings = (): VoiceSettings => {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) }
    }
  } catch (error) {
    console.error('Error loading voice settings:', error)
  }
  
  return DEFAULT_SETTINGS
}

// Save settings to localStorage
export const saveVoiceSettings = (settings: VoiceSettings): void => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('voiceSettingsChanged', { detail: settings }))
  } catch (error) {
    console.error('Error saving voice settings:', error)
  }
}

// Convert VoiceSettings to SpeechOptions
export const toSpeechOptions = (settings: VoiceSettings): SpeechOptions => {
  const options: SpeechOptions = {
    rate: settings.rate,
    pitch: settings.pitch,
    volume: settings.volume
  }
  
  // If specific voice is selected, try to find it
  if (settings.voice && typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const voices = window.speechSynthesis.getVoices()
    const selectedVoice = voices.find(v => v.name === settings.voice)
    if (selectedVoice) {
      options.voice = selectedVoice
    }
  }
  
  return options
}

// React hook for voice settings
export const useVoiceSettings = () => {
  const [settings, setSettings] = React.useState<VoiceSettings>(loadVoiceSettings())
  
  React.useEffect(() => {
    // Listen for settings changes from other components
    const handleChange = (event: Event) => {
      const customEvent = event as CustomEvent<VoiceSettings>
      setSettings(customEvent.detail)
    }
    
    window.addEventListener('voiceSettingsChanged', handleChange)
    return () => window.removeEventListener('voiceSettingsChanged', handleChange)
  }, [])
  
  const updateSettings = React.useCallback((newSettings: Partial<VoiceSettings>) => {
    const updated = { ...settings, ...newSettings }
    setSettings(updated)
    saveVoiceSettings(updated)
  }, [settings])
  
  return { settings, updateSettings }
}

// For use in non-React contexts
export const getVoiceSettings = (): VoiceSettings => {
  return loadVoiceSettings()
}

export const setVoiceSettings = (settings: Partial<VoiceSettings>): void => {
  const current = loadVoiceSettings()
  const updated = { ...current, ...settings }
  saveVoiceSettings(updated)
}

// Quick toggle for voice on/off
export const toggleVoice = (): boolean => {
  const settings = loadVoiceSettings()
  const newEnabled = !settings.enabled
  saveVoiceSettings({ ...settings, enabled: newEnabled })
  return newEnabled
}

// Check if voice is currently enabled
export const isVoiceEnabled = (): boolean => {
  return loadVoiceSettings().enabled
}
