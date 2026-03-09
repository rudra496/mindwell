export type EmotionCategory = 'stress' | 'anxiety' | 'depression' | 'burnout' | 'crisis'

type UniversalSentenceEncoderModel = {
  embed: (input: string[] | string) => Promise<{
    array: () => Promise<number[][]>
    dispose: () => void
  }>
}

declare global {
  interface Window {
    tf?: { ready: () => Promise<void> }
    use?: { load: () => Promise<UniversalSentenceEncoderModel> }
  }
}

const TFJS_CDN = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js'
const USE_CDN = 'https://cdn.jsdelivr.net/npm/@tensorflow-models/universal-sentence-encoder@1.3.3/dist/universal-sentence-encoder.min.js'

const EMOTION_PROTOTYPES: Record<EmotionCategory, string[]> = {
  stress: ['I am under pressure and mentally exhausted today', 'I feel tense and overloaded with tasks', 'I cannot relax because of daily stress'],
  anxiety: ['I feel anxious and worried all the time', 'I keep overthinking and feel panic', 'My heart races when I think about things'],
  depression: ['I feel sad, empty, and hopeless', 'I have lost interest in things I used to enjoy', 'Everything feels heavy and pointless'],
  burnout: ['I feel burned out and emotionally drained from work', 'I am exhausted and disconnected from my responsibilities', 'I have no energy left and feel overwhelmed by duties'],
  crisis: ['I want to die and do not want to keep going', 'I am thinking about suicide and self harm', 'I feel there is no reason to live']
}

const CRISIS_PATTERNS = [/\bsuicide\b/i, /\bkill myself\b/i, /\bwant to die\b/i, /\bself\s*harm\b/i, /\bno reason to live\b/i, /\bend my life\b/i]

let scriptLoadPromise: Promise<void> | null = null
let modelPromise: Promise<UniversalSentenceEncoderModel> | null = null
let prototypeCentroids: Partial<Record<EmotionCategory, number[]>> | null = null

const loadScript = (src: string) => new Promise<void>((resolve, reject) => {
  if (typeof document === 'undefined') {
    reject(new Error('Browser environment required for TensorFlow.js'))
    return
  }

  if (document.querySelector(`script[src="${src}"]`)) {
    resolve()
    return
  }

  const script = document.createElement('script')
  script.src = src
  script.async = true
  script.onload = () => resolve()
  script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
  document.head.appendChild(script)
})

const ensureTensorflow = async () => {
  if (!scriptLoadPromise) {
    scriptLoadPromise = (async () => {
      await loadScript(TFJS_CDN)
      await loadScript(USE_CDN)
      if (!window.tf || !window.use) throw new Error('TensorFlow.js resources unavailable')
      await window.tf.ready()
    })()
  }

  return scriptLoadPromise
}

const cosineSimilarity = (a: number[], b: number[]) => {
  let dot = 0
  let normA = 0
  let normB = 0
  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }
  const denominator = Math.sqrt(normA) * Math.sqrt(normB)
  return denominator === 0 ? 0 : dot / denominator
}

const computeMeanVector = (vectors: number[][]) => {
  const dimensions = vectors[0].length
  const mean = new Array<number>(dimensions).fill(0)
  vectors.forEach((vector) => {
    for (let i = 0; i < dimensions; i += 1) mean[i] += vector[i]
  })
  for (let i = 0; i < dimensions; i += 1) mean[i] /= vectors.length
  return mean
}

const loadModel = async () => {
  if (!modelPromise) {
    modelPromise = (async () => {
      await ensureTensorflow()
      if (!window.use) throw new Error('Universal Sentence Encoder failed to load')
      return window.use.load()
    })()
  }
  return modelPromise
}

const getPrototypeCentroids = async () => {
  if (prototypeCentroids) return prototypeCentroids
  const model = await loadModel()
  const centroids: Partial<Record<EmotionCategory, number[]>> = {}

  for (const [emotion, phrases] of Object.entries(EMOTION_PROTOTYPES) as Array<[EmotionCategory, string[]]>) {
    const embeddings = await model.embed(phrases)
    const vectors = await embeddings.array()
    embeddings.dispose()
    centroids[emotion] = computeMeanVector(vectors)
  }

  prototypeCentroids = centroids
  return centroids
}

export interface EmotionClassificationResult {
  emotion: EmotionCategory
  confidence: number
  scores: Record<EmotionCategory, number>
  crisisDetected: boolean
}

export const classifyEmotion = async (text: string): Promise<EmotionClassificationResult | null> => {
  const normalized = text.trim()
  if (!normalized) return null

  if (CRISIS_PATTERNS.some((pattern) => pattern.test(normalized))) {
    return { emotion: 'crisis', confidence: 1, crisisDetected: true, scores: { stress: 0, anxiety: 0, depression: 0, burnout: 0, crisis: 1 } }
  }

  const [model, centroids] = await Promise.all([loadModel(), getPrototypeCentroids()])
  const embedding = await model.embed([normalized])
  const vector = (await embedding.array())[0]
  embedding.dispose()

  const scoreEntries = (Object.keys(EMOTION_PROTOTYPES) as EmotionCategory[]).map((emotion) => {
    const score = centroids[emotion] ? cosineSimilarity(vector, centroids[emotion]!) : 0
    return [emotion, score] as const
  })

  const scores = Object.fromEntries(scoreEntries) as Record<EmotionCategory, number>
  const [emotion, confidence] = scoreEntries.sort((a, b) => b[1] - a[1])[0]
  return { emotion, confidence, scores, crisisDetected: false }
}
