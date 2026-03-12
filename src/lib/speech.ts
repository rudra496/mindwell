/**
 * Cross-platform Text-to-Speech engine.
 * Web Speech API is always primary, with native fallbacks.
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

let voiceLoadPromise: Promise<SpeechSynthesisVoice[]> | null = null
let lastKnownVoices: SpeechSynthesisVoice[] = []
let forcedWarmupDone = false

const hasWebSpeech = (): boolean => {
  return typeof window !== "undefined" && "speechSynthesis" in window
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
  return hasWebSpeech() || isCapacitorTTSSupported() || isAndroidBridgeTTSSupported()
}

const dedupeVoices = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] => {
  const map = new Map<string, SpeechSynthesisVoice>()
  for (const voice of voices) {
    const key = `${voice.name}|${voice.lang}|${voice.voiceURI}`
    map.set(key, voice)
  }
  return [...map.values()]
}

const normalizeVoiceList = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] => {
  const deduped = dedupeVoices(voices)
  deduped.sort((a, b) => {
    if (a.default && !b.default) return -1
    if (!a.default && b.default) return 1
    return a.name.localeCompare(b.name)
  })
  return deduped
}

const forceWarmupIfNeeded = () => {
  if (!hasWebSpeech() || forcedWarmupDone) return

  forcedWarmupDone = true

  try {
    const warmupUtterance = new SpeechSynthesisUtterance("")
    warmupUtterance.volume = 0
    warmupUtterance.rate = 1
    warmupUtterance.pitch = 1
    window.speechSynthesis.speak(warmupUtterance)
    window.speechSynthesis.cancel()
    console.info("[speech] Warmup utterance sent to initialize Android/WebView voices")
  } catch (error) {
    console.warn("[speech] Failed to warm up speech synthesis", error)
  }
}

export const initializeSpeechSynthesis = async (): Promise<SpeechSynthesisVoice[]> => {
  if (!hasWebSpeech()) return []

  forceWarmupIfNeeded()
  const voices = await waitForVoices()
  console.info("[speech] Voice initialization complete", {
    count: voices.length,
    voices: voices.map((voice) => `${voice.name} (${voice.lang})`),
  })
  return voices
}

export const getAvailableVoices = (): SpeechSynthesisVoice[] => {
  if (!hasWebSpeech()) return []
  const voices = normalizeVoiceList(window.speechSynthesis.getVoices())
  if (voices.length > 0) {
    lastKnownVoices = voices
  }
  return voices.length > 0 ? voices : lastKnownVoices
}

export const waitForVoices = async (timeoutMs = 7000): Promise<SpeechSynthesisVoice[]> => {
  if (!hasWebSpeech()) return []

  if (voiceLoadPromise) {
    return voiceLoadPromise
  }

  voiceLoadPromise = new Promise<SpeechSynthesisVoice[]>((resolve) => {
    const startedAt = Date.now()
    const minCollectionMs = 1200
    const settleAfterNoChangeMs = 900
    let settled = false
    let bestVoices = getAvailableVoices()
    let lastCount = bestVoices.length
    let lastCountChangeAt = Date.now()

    const maybeCaptureBetterVoices = () => {
      const voices = getAvailableVoices()
      if (voices.length > bestVoices.length) {
        bestVoices = voices
      }

      if (voices.length !== lastCount) {
        lastCount = voices.length
        lastCountChangeAt = Date.now()
      }

      return voices
    }

    const complete = () => {
      if (settled) return
      settled = true

      window.speechSynthesis.removeEventListener("voiceschanged", onVoicesChanged)
      window.clearInterval(pollId)
      window.clearTimeout(timeoutId)

      const voices = bestVoices.length > 0 ? bestVoices : getAvailableVoices()
      console.info("[speech] Voice discovery settled", {
        elapsedMs: Date.now() - startedAt,
        count: voices.length,
      })
      resolve(voices)
    }

    const maybeComplete = () => {
      const now = Date.now()
      maybeCaptureBetterVoices()

      const elapsed = now - startedAt
      const noCountChangeFor = now - lastCountChangeAt

      if (elapsed >= timeoutMs) {
        complete()
        return
      }

      if (bestVoices.length > 0 && elapsed >= minCollectionMs && noCountChangeFor >= settleAfterNoChangeMs) {
        complete()
      }
    }

    const onVoicesChanged = () => {
      const voices = maybeCaptureBetterVoices()
      console.info("[speech] voiceschanged event", { count: voices.length })
      maybeComplete()
    }

    window.speechSynthesis.addEventListener("voiceschanged", onVoicesChanged)

    const pollId = window.setInterval(() => {
      maybeComplete()
    }, 250)

    const timeoutId = window.setTimeout(() => complete(), timeoutMs)

    maybeComplete()
  }).finally(() => {
    voiceLoadPromise = null
  })

  return voiceLoadPromise
}


export const getPreferredVoice = async (
  requestedVoiceName?: string | null,
  requestedLang = "en-US"
): Promise<SpeechSynthesisVoice | null> => {
  const voices = await waitForVoices()
  if (voices.length === 0) return null

  const lowerRequested = requestedVoiceName?.toLowerCase()
  const lowerRequestedLang = requestedLang.toLowerCase()

  const candidates: Array<SpeechSynthesisVoice | undefined> = [
    voices.find((voice) => lowerRequested && voice.name.toLowerCase() === lowerRequested),
    voices.find((voice) => voice.default && voice.lang.toLowerCase() === lowerRequestedLang),
    voices.find((voice) => voice.lang.toLowerCase() === lowerRequestedLang),
    voices.find((voice) => voice.lang.toLowerCase().startsWith(lowerRequestedLang.split("-")[0])),
    voices.find((voice) => voice.default),
    voices[0],
  ]

  return candidates.find(Boolean) ?? null
}

const resolveVoiceFromOptions = async (
  options: SpeechOptions,
  fallbackLang: string
): Promise<SpeechSynthesisVoice | null> => {
  const voices = await waitForVoices()
  if (voices.length === 0) return null

  const byOptionVoice = options.voice
    ? voices.find(
        (voice) =>
          (options.voice?.voiceURI && voice.voiceURI === options.voice.voiceURI) ||
          voice.name === options.voice?.name
      )
    : null

  if (byOptionVoice) return byOptionVoice

  const requestedLang = options.voice?.lang ?? options.lang ?? fallbackLang
  return getPreferredVoice(options.voice?.name ?? null, requestedLang)
}

export const speak = async (text: string, options: SpeechOptions = {}): Promise<void> => {
  if (!text.trim() || !isSpeechSynthesisSupported()) return

  if (hasWebSpeech()) {
    try {
      await waitForVoices()
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = options.rate ?? 0.9
      utterance.pitch = options.pitch ?? 1.0
      utterance.volume = options.volume ?? 1.0
      utterance.lang = options.lang ?? "en-US"

      const resolvedVoice = await resolveVoiceFromOptions(options, utterance.lang)
      if (resolvedVoice) {
        utterance.voice = resolvedVoice
        utterance.lang = resolvedVoice.lang
      }

      await new Promise<void>((resolve, reject) => {
        utterance.onend = () => resolve()
        utterance.onerror = (event) => reject(event)
        window.speechSynthesis.speak(utterance)
      })
      return
    } catch (error) {
      console.warn("[speech] Web Speech API failed, trying native fallback", error)
    }
  }

  if (isCapacitorTTSSupported()) {
    const plugin = getCapacitorTTSPlugin()
    await plugin?.stop?.()
    await plugin?.speak?.({
      text,
      lang: options.lang ?? "en-US",
      rate: options.rate ?? 0.9,
      pitch: options.pitch ?? 1,
      volume: options.volume ?? 1,
    })
    return
  }

  if (isAndroidBridgeTTSSupported()) {
    const bridge = getAndroidBridgeTTS()
    bridge?.stop?.()
    bridge?.speak?.(
      text,
      options.lang ?? "en-US",
      options.rate ?? 0.9,
      options.pitch ?? 1,
      options.volume ?? 1
    )
  }
}

export const speakWithPauses = async (
  paragraphs: string[],
  options: SpeechOptions = {},
  pauseBetween = 1000
): Promise<void> => {
  for (let i = 0; i < paragraphs.length; i += 1) {
    await speak(paragraphs[i], options)
    if (i < paragraphs.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, pauseBetween))
    }
  }
}

export const stopSpeaking = (): void => {
  if (hasWebSpeech()) {
    window.speechSynthesis.cancel()
  }
  getCapacitorTTSPlugin()?.stop?.().catch(() => undefined)
  getAndroidBridgeTTS()?.stop?.()
}

export const pauseSpeaking = (): void => {
  if (hasWebSpeech()) {
    window.speechSynthesis.pause()
  }
}

export const resumeSpeaking = (): void => {
  if (hasWebSpeech()) {
    window.speechSynthesis.resume()
  }
}

export const isSpeaking = (): boolean => {
  return hasWebSpeech() ? window.speechSynthesis.speaking : false
}

export const isPaused = (): boolean => {
  return hasWebSpeech() ? window.speechSynthesis.paused : false
}
