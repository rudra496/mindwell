export interface UserPreferences {
  interests: string[]
  visitedPages: string[]
  completedAssessments: string[]
  preferredLanguage: 'en' | 'bn'
  accessibilityNeeds: string[]
}

const STORAGE_KEY = 'mindwell:user-preferences'

const defaultPreferences: UserPreferences = {
  interests: [],
  visitedPages: [],
  completedAssessments: [],
  preferredLanguage: 'en',
  accessibilityNeeds: [],
}

export function getUserPreferences(): UserPreferences {
  if (typeof window === 'undefined') return defaultPreferences
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultPreferences
    return { ...defaultPreferences, ...JSON.parse(raw) }
  } catch {
    return defaultPreferences
  }
}

export function saveUserPreferences(preferences: UserPreferences) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
}

export function trackVisitedPage(path: string) {
  const preferences = getUserPreferences()
  const visitedPages = [path, ...preferences.visitedPages.filter((item) => item !== path)].slice(0, 15)
  saveUserPreferences({ ...preferences, visitedPages })
}

export function markInterest(interest: string) {
  const preferences = getUserPreferences()
  if (preferences.interests.includes(interest)) return
  saveUserPreferences({ ...preferences, interests: [...preferences.interests, interest] })
}
