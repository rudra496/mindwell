/**
 * Text-to-Speech (TTS) Engine for MindWell
 * Uses Web Speech API for meditation and guided exercises
 */

export interface SpeechOptions {
  rate?: number // Speed of speech (0.1 - 10, default 0.8 for meditation)
  pitch?: number // Pitch of voice (0 - 2, default 1.0)
  volume?: number // Volume (0 - 1, default 1.0)
  lang?: string // Language code (default 'en-US')
  voice?: SpeechSynthesisVoice | null // Specific voice to use
}

type CapacitorTextToSpeechPlugin = {
  speak?: (options: {
    text: string
    lang?: string
    rate?: number
    pitch?: number
    volume?: number
  }) => Promise<void>
  stop?: () => Promise<void>
}

type AndroidBridgeTTS = {
  speak?: (text: string, lang?: string, rate?: number, pitch?: number, volume?: number) => void
  stop?: () => void
}

const getCapacitorTTSPlugin = (): CapacitorTextToSpeechPlugin | null => {
  if (typeof window === 'undefined') return null
  const plugins = (window as any)?.Capacitor?.Plugins
  return plugins?.TextToSpeech ?? plugins?.TTS ?? null
}

const getAndroidBridgeTTS = (): AndroidBridgeTTS | null => {
  if (typeof window === 'undefined') return null
  return (window as any)?.AndroidTTS ?? null
}

const isCapacitorNativeRuntime = (): boolean => {
  if (typeof window === 'undefined') return false
  const capacitor = (window as any)?.Capacitor
  if (!capacitor) return false

  if (typeof capacitor.isNativePlatform === 'function') {
    return Boolean(capacitor.isNativePlatform())
  }

  if (typeof capacitor.getPlatform === 'function') {
    return capacitor.getPlatform() !== 'web'
  }

  return false
}

const isCapacitorTTSSupported = (): boolean => {
  return isCapacitorNativeRuntime() && !!getCapacitorTTSPlugin()?.speak
}

const isAndroidBridgeTTSSupported = (): boolean => {
  return !!getAndroidBridgeTTS()?.speak
}

// Check if browser supports speech synthesis
export const isSpeechSynthesisSupported = (): boolean => {
  return (typeof window !== 'undefined' && 'speechSynthesis' in window) || isCapacitorTTSSupported() || isAndroidBridgeTTSSupported()
}

// Get available voices
export const getAvailableVoices = (): SpeechSynthesisVoice[] => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return []
  return window.speechSynthesis.getVoices()
}

// Wait for voices to load (they load asynchronously)
export const waitForVoices = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve) => {
    if (!isSpeechSynthesisSupported()) {
      resolve([])
      return
    }

    if (!('speechSynthesis' in window)) {
      resolve([])
      return
    }

    const voices = window.speechSynthesis.getVoices()
    if (voices.length > 0) {
      resolve(voices)
      return
    }

    // Wait for voiceschanged event
    window.speechSynthesis.addEventListener('voiceschanged', () => {
      resolve(window.speechSynthesis.getVoices())
    }, { once: true })

    // Timeout after 3 seconds
    setTimeout(() => {
      resolve(window.speechSynthesis.getVoices())
    }, 3000)
  })
}

// Find preferred voice (try to get a natural-sounding English voice)
export const getPreferredVoice = async (): Promise<SpeechSynthesisVoice | null> => {
  const voices = await waitForVoices()
  
  // Preference order: Google US English, other US English, any English, first available
  const preferred = [
    voices.find(v => v.name.includes('Google') && v.lang === 'en-US'),
    voices.find(v => v.lang === 'en-US' && v.name.includes('Natural')),
    voices.find(v => v.lang === 'en-US'),
    voices.find(v => v.lang.startsWith('en-')),
    voices[0]
  ].find(v => v !== undefined)

  return preferred || null
}

/**
 * Speak text using text-to-speech
 * @param text - Text to speak
 * @param options - Speech options (rate, pitch, volume, lang, voice)
 * @returns Promise that resolves when speech completes or rejects on error
 */
export const speak = async (
  text: string,
  options: SpeechOptions = {}
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    if (!isSpeechSynthesisSupported()) {
      console.warn('Speech synthesis not supported in this browser or runtime')
      resolve() // Don't reject, just silently skip
      return
    }

    if (isCapacitorTTSSupported()) {
      try {
        const plugin = getCapacitorTTSPlugin()
        await plugin?.stop?.()
        await plugin?.speak?.({
          text,
          lang: options.lang ?? 'en-US',
          rate: options.rate ?? 0.8,
          pitch: options.pitch ?? 1.0,
          volume: options.volume ?? 1.0
        })
        resolve()
      } catch (error) {
        console.error('Capacitor TTS error:', error)
        reject(error)
      }
      return
    }

    if (isAndroidBridgeTTSSupported()) {
      try {
        const bridge = getAndroidBridgeTTS()
        bridge?.stop?.()
        bridge?.speak?.(
          text,
          options.lang ?? 'en-US',
          options.rate ?? 0.8,
          options.pitch ?? 1.0,
          options.volume ?? 1.0
        )
        resolve()
      } catch (error) {
        console.error('Android bridge TTS error:', error)
        reject(error)
      }
      return
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    
    // Set options with defaults
    utterance.rate = options.rate ?? 0.8 // Slower for meditation
    utterance.pitch = options.pitch ?? 1.0
    utterance.volume = options.volume ?? 1.0
    utterance.lang = options.lang ?? 'en-US'

    // Use provided voice or get preferred voice
    if (options.voice) {
      utterance.voice = options.voice
    } else {
      const preferredVoice = await getPreferredVoice()
      if (preferredVoice) {
        utterance.voice = preferredVoice
      }
    }

    // Event handlers
    utterance.onend = () => resolve()
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event)
      reject(event)
    }

    // Speak
    window.speechSynthesis.speak(utterance)
  })
}

/**
 * Speak multiple paragraphs with pauses between them
 * @param paragraphs - Array of text paragraphs
 * @param options - Speech options
 * @param pauseBetween - Milliseconds to pause between paragraphs (default 1000ms)
 */
export const speakWithPauses = async (
  paragraphs: string[],
  options: SpeechOptions = {},
  pauseBetween: number = 1000
): Promise<void> => {
  for (let i = 0; i < paragraphs.length; i++) {
    await speak(paragraphs[i], options)
    
    // Pause between paragraphs (except after last one)
    if (i < paragraphs.length - 1) {
      await new Promise(resolve => setTimeout(resolve, pauseBetween))
    }
  }
}

/**
 * Stop any ongoing speech
 */
export const stopSpeaking = (): void => {
  if (!isSpeechSynthesisSupported()) return
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    return
  }

  const plugin = getCapacitorTTSPlugin()
  plugin?.stop?.().catch(() => undefined)
  getAndroidBridgeTTS()?.stop?.()
}

/**
 * Pause ongoing speech
 */
export const pauseSpeaking = (): void => {
  if (!isSpeechSynthesisSupported()) return
  if ('speechSynthesis' in window) {
    window.speechSynthesis.pause()
  }
}

/**
 * Resume paused speech
 */
export const resumeSpeaking = (): void => {
  if (!isSpeechSynthesisSupported()) return
  if ('speechSynthesis' in window) {
    window.speechSynthesis.resume()
  }
}

/**
 * Check if speech is currently ongoing
 */
export const isSpeaking = (): boolean => {
  if (!isSpeechSynthesisSupported()) return false
  if ('speechSynthesis' in window) {
    return window.speechSynthesis.speaking
  }
  return false
}

/**
 * Check if speech is paused
 */
export const isPaused = (): boolean => {
  if (!isSpeechSynthesisSupported()) return false
  if ('speechSynthesis' in window) {
    return window.speechSynthesis.paused
  }
  return false
}
