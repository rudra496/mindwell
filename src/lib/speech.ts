/**
 * Text-to-Speech (TTS) Engine for MindWell
 * Uses Web Speech API first (for multiple voices),
 * then falls back to Capacitor native TTS if needed.
 */

export interface SpeechOptions {
  rate?: number
  pitch?: number
  volume?: number
  lang?: string
  voice?: SpeechSynthesisVoice | null
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
  speak?: (
    text: string,
    lang?: string,
    rate?: number,
    pitch?: number,
    volume?: number
  ) => void
  stop?: () => void
}

const getCapacitorTTSPlugin = (): CapacitorTextToSpeechPlugin | null => {
  if (typeof window === "undefined") return null
  const plugins = (window as any)?.Capacitor?.Plugins
  return plugins?.TextToSpeech ?? plugins?.TTS ?? null
}

const getAndroidBridgeTTS = (): AndroidBridgeTTS | null => {
  if (typeof window === "undefined") return null
  return (window as any)?.AndroidTTS ?? null
}

const isCapacitorNativeRuntime = (): boolean => {
  if (typeof window === "undefined") return false
  const capacitor = (window as any)?.Capacitor
  if (!capacitor) return false

  if (typeof capacitor.isNativePlatform === "function") {
    return Boolean(capacitor.isNativePlatform())
  }

  if (typeof capacitor.getPlatform === "function") {
    return capacitor.getPlatform() !== "web"
  }

  return false
}

const isCapacitorTTSSupported = (): boolean => {
  return isCapacitorNativeRuntime() && !!getCapacitorTTSPlugin()?.speak
}

const isAndroidBridgeTTSSupported = (): boolean => {
  return !!getAndroidBridgeTTS()?.speak
}

export const isSpeechSynthesisSupported = (): boolean => {
  return (
    (typeof window !== "undefined" && "speechSynthesis" in window) ||
    isCapacitorTTSSupported() ||
    isAndroidBridgeTTSSupported()
  )
}

/* ------------------------------- */
/* VOICE UTILITIES */
/* ------------------------------- */

export const getAvailableVoices = (): SpeechSynthesisVoice[] => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return []
  return window.speechSynthesis.getVoices()
}

export const waitForVoices = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve([])
      return
    }

    if (!("speechSynthesis" in window)) {
      resolve([])
      return
    }

    const voices = window.speechSynthesis.getVoices()

    if (voices.length > 0) {
      resolve(voices)
      return
    }

    const handleVoicesChanged = () => {
      resolve(window.speechSynthesis.getVoices())
    }

    window.speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged, {
      once: true,
    })

    setTimeout(() => {
      window.speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged)
      resolve(window.speechSynthesis.getVoices())
    }, 3000)
  })
}

export const getPreferredVoice = async (): Promise<SpeechSynthesisVoice | null> => {
  const voices = await waitForVoices()

  const preferred = [
    voices.find((v) => v.name.includes("Google") && v.lang === "en-US"),
    voices.find((v) => v.lang === "en-US" && v.name.includes("Natural")),
    voices.find((v) => v.lang === "en-US"),
    voices.find((v) => v.lang.startsWith("en")),
    voices[0],
  ].find((v) => v !== undefined)

  return preferred || null
}

/* ------------------------------- */
/* SPEAK FUNCTION */
/* ------------------------------- */

export const speak = async (
  text: string,
  options: SpeechOptions = {}
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    if (!isSpeechSynthesisSupported()) {
      resolve()
      return
    }

    /* -------------------------------- */
    /* FIRST: Web Speech API (MULTI VOICE) */
    /* -------------------------------- */

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel()

        const utterance = new SpeechSynthesisUtterance(text)

        utterance.rate = options.rate ?? 0.8
        utterance.pitch = options.pitch ?? 1.0
        utterance.volume = options.volume ?? 1.0
        utterance.lang = options.lang ?? "en-US"

        if (options.voice) {
          utterance.voice = options.voice
        } else {
          const preferredVoice = await getPreferredVoice()
          if (preferredVoice) {
            utterance.voice = preferredVoice
          }
        }

        utterance.onend = () => resolve()
        utterance.onerror = (event) => reject(event)

        window.speechSynthesis.speak(utterance)
        return
      } catch (error) {
        console.warn("Web speech failed, trying fallback", error)
      }
    }

    /* -------------------------------- */
    /* SECOND: Capacitor Native TTS */
    /* -------------------------------- */

    if (isCapacitorTTSSupported()) {
      try {
        const plugin = getCapacitorTTSPlugin()

        await plugin?.stop?.()

        await plugin?.speak?.({
          text,
          lang: options.lang ?? "en-US",
          rate: options.rate ?? 0.8,
          pitch: options.pitch ?? 1.0,
          volume: options.volume ?? 1.0,
        })

        resolve()
        return
      } catch (error) {
        reject(error)
      }
    }

    /* -------------------------------- */
    /* THIRD: Android Bridge fallback */
    /* -------------------------------- */

    if (isAndroidBridgeTTSSupported()) {
      try {
        const bridge = getAndroidBridgeTTS()

        bridge?.stop?.()

        bridge?.speak?.(
          text,
          options.lang ?? "en-US",
          options.rate ?? 0.8,
          options.pitch ?? 1.0,
          options.volume ?? 1.0
        )

        resolve()
        return
      } catch (error) {
        reject(error)
      }
    }

    resolve()
  })
}

/* ------------------------------- */
/* MULTI PARAGRAPH SPEECH */
/* ------------------------------- */

export const speakWithPauses = async (
  paragraphs: string[],
  options: SpeechOptions = {},
  pauseBetween = 1000
): Promise<void> => {
  for (let i = 0; i < paragraphs.length; i++) {
    await speak(paragraphs[i], options)

    if (i < paragraphs.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, pauseBetween))
    }
  }
}

/* ------------------------------- */
/* CONTROL FUNCTIONS */
/* ------------------------------- */

export const stopSpeaking = (): void => {
  if (typeof window === "undefined") return

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel()
  }

  const plugin = getCapacitorTTSPlugin()
  plugin?.stop?.().catch(() => undefined)

  getAndroidBridgeTTS()?.stop?.()
}

export const pauseSpeaking = (): void => {
  if (typeof window === "undefined") return

  if ("speechSynthesis" in window) {
    window.speechSynthesis.pause()
  }
}

export const resumeSpeaking = (): void => {
  if (typeof window === "undefined") return

  if ("speechSynthesis" in window) {
    window.speechSynthesis.resume()
  }
}

export const isSpeaking = (): boolean => {
  if (typeof window === "undefined") return false

  if ("speechSynthesis" in window) {
    return window.speechSynthesis.speaking
  }
  return false
}

export const isPaused = (): boolean => {
  if (typeof window === "undefined") return false

  if ("speechSynthesis" in window) {
    return window.speechSynthesis.paused
  }
  return false
}
