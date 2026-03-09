import type { EmotionCategory, EmotionClassificationResult } from './emotion-classifier'

export type MoodLabel = 'anxious' | 'stressed' | 'sad' | 'overwhelmed' | 'neutral' | 'good'
export type RiskLevel = 'LOW' | 'MEDIUM' | 'CRISIS'

export interface GuidanceResource {
  title: string
  description: string
  href: string
  type: 'meditation' | 'technique' | 'assessment' | 'support'
}

export interface GuidanceResult {
  riskLevel: RiskLevel
  pathway: EmotionCategory | 'general'
  shouldRedirectToCrisis: boolean
  resources: GuidanceResource[]
}

const DEFAULT_RESOURCES: GuidanceResource[] = [
  {
    type: 'meditation',
    title: 'Anxiety Relief Meditation',
    description: 'A short guided meditation to reduce immediate emotional distress.',
    href: '/meditations/anxiety-relief-meditation'
  },
  {
    type: 'technique',
    title: '5-4-3-2-1 Grounding',
    description: 'A grounding exercise to reconnect with the present moment.',
    href: '/therapy-techniques/grounding-5-4-3-2-1'
  },
  {
    type: 'assessment',
    title: 'GAD-7 Self-Reflection',
    description: 'A validated self-check for anxiety-related symptoms.',
    href: '/assessments/gad-7'
  },
  {
    type: 'support',
    title: 'Contact a Psychologist',
    description: 'Reach out to a qualified professional through WhatsApp support.',
    href: '/psychologists'
  }
]

const RESOURCE_MAP: Record<EmotionCategory | 'general', GuidanceResource[]> = {
  anxiety: DEFAULT_RESOURCES,
  stress: [
    {
      type: 'meditation',
      title: '4-7-8 Breathing',
      description: 'Use paced breathing to calm stress responses in minutes.',
      href: '/meditations/4-7-8-breathing'
    },
    {
      type: 'technique',
      title: '5-4-3-2-1 Grounding',
      description: 'Anchor your attention and reduce spiraling thoughts.',
      href: '/therapy-techniques/grounding-5-4-3-2-1'
    },
    {
      type: 'assessment',
      title: 'GAD-7 Self-Reflection',
      description: 'Track anxiety and stress patterns over time.',
      href: '/assessments/gad-7'
    },
    {
      type: 'support',
      title: 'Psychologist WhatsApp Support',
      description: 'Connect with MindWell psychologists for professional guidance.',
      href: '/psychologists'
    }
  ],
  depression: [
    {
      type: 'meditation',
      title: 'Anxiety Relief Meditation',
      description: 'A gentle guided practice for emotional regulation.',
      href: '/meditations/anxiety-relief-meditation'
    },
    {
      type: 'technique',
      title: 'Behavioral Activation',
      description: 'Step-by-step activity planning to rebuild momentum.',
      href: '/therapy-techniques/behavioral-activation'
    },
    {
      type: 'assessment',
      title: 'PHQ-9 Self-Reflection',
      description: 'A structured self-check for persistent low mood patterns.',
      href: '/assessments/phq-9'
    },
    {
      type: 'support',
      title: 'Psychologist WhatsApp Support',
      description: 'Talk with a professional if symptoms are persistent.',
      href: '/psychologists'
    }
  ],
  burnout: [
    {
      type: 'meditation',
      title: '4-7-8 Breathing',
      description: 'Reset nervous system activation during overload.',
      href: '/meditations/4-7-8-breathing'
    },
    {
      type: 'technique',
      title: 'Behavioral Activation',
      description: 'Reintroduce meaningful routines with manageable steps.',
      href: '/therapy-techniques/behavioral-activation'
    },
    {
      type: 'assessment',
      title: 'PHQ-9 Self-Reflection',
      description: 'Check in on emotional fatigue and low-energy patterns.',
      href: '/assessments/phq-9'
    },
    {
      type: 'support',
      title: 'Psychologist WhatsApp Support',
      description: 'Get personalized support for prolonged burnout symptoms.',
      href: '/psychologists'
    }
  ],
  crisis: [
    {
      type: 'support',
      title: 'Immediate Crisis Help',
      description: 'Access emergency and local helpline resources now.',
      href: '/crisis-resources'
    }
  ],
  general: DEFAULT_RESOURCES
}

const MOOD_SIGNAL_MAP: Partial<Record<MoodLabel, EmotionCategory>> = {
  anxious: 'anxiety',
  stressed: 'stress',
  sad: 'depression',
  overwhelmed: 'burnout'
}

export const detectRiskLevel = (
  mood: MoodLabel,
  classifierResult: EmotionClassificationResult | null
): RiskLevel => {
  if (classifierResult?.emotion === 'crisis' || classifierResult?.crisisDetected) return 'CRISIS'

  if (classifierResult?.emotion === 'depression' || classifierResult?.emotion === 'burnout') return 'MEDIUM'
  if (mood === 'sad' || mood === 'overwhelmed') return 'MEDIUM'

  return 'LOW'
}

export const runGuidanceDecisionEngine = (
  mood: MoodLabel,
  classifierResult: EmotionClassificationResult | null
): GuidanceResult => {
  const riskLevel = detectRiskLevel(mood, classifierResult)

  if (riskLevel === 'CRISIS') {
    return {
      riskLevel,
      pathway: 'crisis',
      shouldRedirectToCrisis: true,
      resources: RESOURCE_MAP.crisis
    }
  }

  const moodPathway = MOOD_SIGNAL_MAP[mood]
  const classifierPathway = classifierResult?.emotion
  const pathway = (classifierPathway && classifierPathway !== 'crisis' ? classifierPathway : moodPathway) || 'general'

  return {
    riskLevel,
    pathway,
    shouldRedirectToCrisis: false,
    resources: RESOURCE_MAP[pathway]
  }
}
