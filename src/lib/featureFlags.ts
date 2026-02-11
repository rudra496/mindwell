/**
 * Feature flags for MindWell
 * Used to safely pause/gate features for safety review
 */

export const featureFlags = {
  // AI Chatbot - PAUSED FOR SAFETY REVIEW
  // Reason: Needs clinical validation, ethical review, and proper crisis handling
  enableAIChatbot: false,
  
  // High-risk assessments that need gating
  gateHighRiskAssessments: true,
  
  // Voice features - only for therapy and meditation
  enableVoiceForTherapy: true,
  enableVoiceForMeditation: true,
  enableVoiceForAssessments: false,
  enableVoiceForCrisis: false,
  
  // Community features
  enableCommunity: true,
  
  // Require consent modals for sensitive content
  requireConsentForAssessments: true,
  requireConsentForDisorders: false,
} as const

/**
 * High-risk assessment slugs that require consent modal
 * These assessments may cause distress or require clinical oversight
 */
export const highRiskAssessmentSlugs = [
  'columbia-suicide-severity-rating-scale',
  'suicidal-ideation-questionnaire',
  'self-harm-inventory',
  'ptsd-checklist',
  'trauma-screening',
] as const

type HighRiskSlug = typeof highRiskAssessmentSlugs[number]

/**
 * Check if an assessment is high-risk
 */
export function isHighRiskAssessment(slug: string): boolean {
  const normalizedSlug = slug.toLowerCase()
  return (highRiskAssessmentSlugs as readonly string[]).includes(slug) ||
         normalizedSlug.includes('suicide') ||
         normalizedSlug.includes('self-harm') ||
         normalizedSlug.includes('trauma')
}
