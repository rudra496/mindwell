/**
 * Sound Effects Manager for MindWell
 * Provides subtle audio feedback for user interactions
 */

export type SoundType = 
  | 'click'           // Button clicks
  | 'breathe-in'      // Breathing timer inhale cue
  | 'breathe-out'     // Breathing timer exhale cue  
  | 'chime'           // Meditation start/end
  | 'success'         // Game completion
  | 'notification'    // Gentle notification

// Sound configuration
interface SoundConfig {
  path: string
  volume?: number // 0.0 to 1.0
}

// Sound file mappings (can use actual files or generate tones)
const SOUND_CONFIGS: Record<SoundType, SoundConfig> = {
  'click': { path: '/sounds/click.mp3', volume: 0.3 },
  'breathe-in': { path: '/sounds/breathe-in.mp3', volume: 0.5 },
  'breathe-out': { path: '/sounds/breathe-out.mp3', volume: 0.5 },
  'chime': { path: '/sounds/chime.mp3', volume: 0.6 },
  'success': { path: '/sounds/success.mp3', volume: 0.5 },
  'notification': { path: '/sounds/notification.mp3', volume: 0.4 }
}

// Audio context for tone generation (fallback if files not available)
let audioContext: AudioContext | null = null

// Cache loaded audio files
const audioCache: Map<SoundType, HTMLAudioElement> = new Map()

// Mute state
let isMuted = false

/**
 * Initialize audio context
 */
const initAudioContext = () => {
  if (typeof window === 'undefined') return null
  
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  return audioContext
}

/**
 * Play a simple tone (fallback when audio files aren't available)
 */
const playTone = (frequency: number, duration: number, volume: number = 0.3) => {
  const ctx = initAudioContext()
  if (!ctx) return

  const oscillator = ctx.createOscillator()
  const gainNode = ctx.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(ctx.destination)

  oscillator.frequency.value = frequency
  oscillator.type = 'sine'
  
  gainNode.gain.setValueAtTime(volume, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)

  oscillator.start(ctx.currentTime)
  oscillator.stop(ctx.currentTime + duration)
}

/**
 * Play tone-based sound effects (fallback implementation)
 */
const playToneFallback = (type: SoundType) => {
  switch (type) {
    case 'click':
      playTone(800, 0.05, 0.1)
      break
    case 'breathe-in':
      playTone(440, 0.3, 0.2)
      break
    case 'breathe-out':
      playTone(330, 0.3, 0.2)
      break
    case 'chime':
      playTone(528, 0.5, 0.3) // C note
      setTimeout(() => playTone(660, 0.5, 0.3), 100) // E note
      break
    case 'success':
      playTone(523, 0.15, 0.2)
      setTimeout(() => playTone(659, 0.15, 0.2), 150)
      setTimeout(() => playTone(784, 0.3, 0.2), 300)
      break
    case 'notification':
      playTone(880, 0.1, 0.15)
      break
  }
}

/**
 * Preload audio file
 */
const preloadAudio = (type: SoundType): HTMLAudioElement => {
  if (audioCache.has(type)) {
    return audioCache.get(type)!
  }

  const config = SOUND_CONFIGS[type]
  const audio = new Audio()
  audio.src = config.path
  audio.volume = config.volume ?? 0.5
  audio.preload = 'auto'

  // Handle load errors by using tone fallback
  audio.addEventListener('error', () => {
    console.warn(`Failed to load ${type} sound, using tone fallback`)
  })

  audioCache.set(type, audio)
  return audio
}

/**
 * Play a sound effect
 * @param type - Type of sound to play
 * @param volume - Optional volume override (0.0 to 1.0)
 */
export const playSound = async (type: SoundType, volume?: number): Promise<void> => {
  if (isMuted) return
  if (typeof window === 'undefined') return

  try {
    const audio = preloadAudio(type)
    
    // Set volume if provided
    if (volume !== undefined) {
      audio.volume = Math.max(0, Math.min(1, volume))
    }

    // Clone audio for overlapping sounds
    const soundClone = audio.cloneNode() as HTMLAudioElement
    soundClone.volume = audio.volume

    await soundClone.play().catch(() => {
      // Fallback to tone if file fails to play
      playToneFallback(type)
    })
  } catch (error) {
    // Fallback to tone generation
    playToneFallback(type)
  }
}

/**
 * Preload all sounds for better performance
 */
export const preloadAllSounds = () => {
  if (typeof window === 'undefined') return

  const types: SoundType[] = [
    'click', 
    'breathe-in', 
    'breathe-out', 
    'chime', 
    'success', 
    'notification'
  ]
  
  types.forEach(type => {
    preloadAudio(type)
  })
}

/**
 * Mute all sounds
 */
export const muteSounds = () => {
  isMuted = true
}

/**
 * Unmute all sounds
 */
export const unmuteSounds = () => {
  isMuted = false
}

/**
 * Toggle mute state
 */
export const toggleMute = (): boolean => {
  isMuted = !isMuted
  return isMuted
}

/**
 * Check if sounds are muted
 */
export const isSoundMuted = (): boolean => {
  return isMuted
}

/**
 * Set global volume for all sounds
 */
export const setGlobalVolume = (volume: number) => {
  const clampedVolume = Math.max(0, Math.min(1, volume))
  audioCache.forEach(audio => {
    const config = SOUND_CONFIGS[Object.keys(SOUND_CONFIGS).find(
      key => SOUND_CONFIGS[key as SoundType].path === audio.src.split('/').pop()
    ) as SoundType]
    audio.volume = (config.volume ?? 0.5) * clampedVolume
  })
}
