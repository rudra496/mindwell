/**
 * Voice Settings Management for MindWell
 * Manages user preferences for TTS (Text-to-Speech) functionality
 */

const STORAGE_KEY_ENABLED = 'mindwell_voice_enabled'
const STORAGE_KEY_SPEED = 'mindwell_voice_speed'
const STORAGE_KEY_VOICE = 'mindwell_voice_selected'

/**
 * Get whether voice output is enabled
 */
export const getVoiceEnabled = (): boolean => {
  if (typeof window === 'undefined') return false
  const stored = localStorage.getItem(STORAGE_KEY_ENABLED)
  // Default to false (opt-in)
  return stored === 'true'
}

/**
 * Set whether voice output is enabled
 */
export const setVoiceEnabled = (enabled: boolean): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY_ENABLED, enabled.toString())
}

/**
 * Get voice speed setting (0.5 to 2.0)
 */
export const getVoiceSpeed = (): number => {
  if (typeof window === 'undefined') return 0.8
  const stored = localStorage.getItem(STORAGE_KEY_SPEED)
  if (stored) {
    const speed = parseFloat(stored)
    // Validate range
    if (speed >= 0.5 && speed <= 2.0) {
      return speed
    }
  }
  // Default speed for meditation/calm reading
  return 0.8
}

/**
 * Set voice speed (0.5 to 2.0)
 */
export const setVoiceSpeed = (speed: number): void => {
  if (typeof window === 'undefined') return
  // Clamp to valid range
  const clampedSpeed = Math.max(0.5, Math.min(2.0, speed))
  localStorage.setItem(STORAGE_KEY_SPEED, clampedSpeed.toString())
}

/**
 * Get selected voice name
 */
export const getSelectedVoice = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(STORAGE_KEY_VOICE)
}

/**
 * Set selected voice by name
 */
export const setSelectedVoice = (voiceName: string | null): void => {
  if (typeof window === 'undefined') return
  if (voiceName) {
    localStorage.setItem(STORAGE_KEY_VOICE, voiceName)
  } else {
    localStorage.removeItem(STORAGE_KEY_VOICE)
  }
}

/**
 * Get all voice settings at once
 */
export const getVoiceSettings = () => {
  return {
    enabled: getVoiceEnabled(),
    speed: getVoiceSpeed(),
    voice: getSelectedVoice()
  }
}

/**
 * Reset all voice settings to defaults
 */
export const resetVoiceSettings = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY_ENABLED)
  localStorage.removeItem(STORAGE_KEY_SPEED)
  localStorage.removeItem(STORAGE_KEY_VOICE)
}
