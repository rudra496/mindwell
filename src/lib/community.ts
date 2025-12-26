// Anonymous username generation for community features

const adjectives = [
  'Hopeful', 'Brave', 'Kind', 'Strong', 'Gentle', 'Wise', 'Calm', 'Bright',
  'Caring', 'Patient', 'Peaceful', 'Resilient', 'Mindful', 'Courageous',
  'Serene', 'Graceful', 'Steadfast', 'Compassionate'
]

const nouns = [
  'Phoenix', 'Dove', 'Eagle', 'Butterfly', 'Owl', 'Swan', 'Robin', 'Hawk',
  'Sparrow', 'Falcon', 'Crane', 'Raven', 'Hummingbird', 'Bluebird',
  'Lotus', 'Willow', 'River', 'Mountain'
]

export function generateAnonymousUsername(): string {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  const number = Math.floor(Math.random() * 100)
  
  return `${adj}${noun}${number}`
}

// Crisis detection keywords
export const CRISIS_KEYWORDS = [
  'suicide', 'suicidal', 'kill myself', 'end my life', 'want to die',
  'self-harm', 'self harm', 'cut myself', 'hurt myself', 'harm myself',
  'overdose', 'end it all', 'better off dead', 'no reason to live',
  'going to die', 'plan to kill', 'goodbye cruel world'
]

export const HIGH_RISK_KEYWORDS = [
  'depressed', 'hopeless', 'worthless', 'can\'t go on', 'give up',
  'no point', 'unbearable', 'can\'t take it', 'too much pain'
]

export function detectCrisisLanguage(text: string): boolean {
  const lowerText = text.toLowerCase()
  return CRISIS_KEYWORDS.some(keyword => lowerText.includes(keyword))
}
