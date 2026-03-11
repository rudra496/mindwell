/**
 * Internationalization (i18n) system for MindWell
 * Supports English and Bangla with localStorage persistence
 */

import enMessages from '../../messages/en.json'
import bnMessages from '../../messages/bn.json'

export const SUPPORTED_LANGUAGES = ['en', 'bn'] as const
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]
export type Language = SupportedLanguage | (string & {})

export interface Translation {
  en: string
  bn: string
  [key: string]: string
}

export interface MessageTree {
  [key: string]: string | MessageTree
}

// Language persistence key
const LANGUAGE_KEY = 'mindwell_language'

const messagesByLanguage: Record<SupportedLanguage, MessageTree> = {
  en: enMessages as MessageTree,
  bn: bnMessages as MessageTree,
}

export const availableLanguages = SUPPORTED_LANGUAGES

export function isSupportedLanguage(lang: string): lang is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)
}

function resolveLanguage(lang?: string): SupportedLanguage {
  if (lang && isSupportedLanguage(lang)) return lang
  return 'en'
}

function resolveMessage(tree: MessageTree, key: string): string | undefined {
  const parts = key.split('.')
  let cursor: string | MessageTree | undefined = tree

  for (const part of parts) {
    if (!cursor || typeof cursor === 'string') {
      return undefined
    }

    cursor = cursor[part]
  }

  return typeof cursor === 'string' ? cursor : undefined
}

function buildLegacyTranslationsTree(
  enNode: MessageTree,
  bnNode: MessageTree
): Record<string, Translation | Record<string, unknown>> {
  const keys = new Set([...Object.keys(enNode), ...Object.keys(bnNode)])
  const output: Record<string, Translation | Record<string, unknown>> = {}

  for (const key of keys) {
    const enValue = enNode[key]
    const bnValue = bnNode[key]

    if (typeof enValue === 'string' || typeof bnValue === 'string') {
      output[key] = {
        en: typeof enValue === 'string' ? enValue : '',
        bn: typeof bnValue === 'string' ? bnValue : (typeof enValue === 'string' ? enValue : ''),
      }
      continue
    }

    output[key] = buildLegacyTranslationsTree(
      (enValue as MessageTree) || {},
      (bnValue as MessageTree) || {}
    )
  }

  return output
}

/**
 * Get the current language from localStorage or default to English
 */
export function getCurrentLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'en'

  const stored = localStorage.getItem(LANGUAGE_KEY)
  if (stored && isSupportedLanguage(stored)) {
    return stored
  }
  return 'en'
}

/**
 * Set the current language and persist to localStorage
 */
export function setCurrentLanguage(lang: Language): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(LANGUAGE_KEY, resolveLanguage(lang))
}

/**
 * Get translated text based on current language
 */
export function t(translation: Translation, lang?: Language): string {
  const currentLang = resolveLanguage(lang || getCurrentLanguage())
  return translation[currentLang] ?? translation.en ?? Object.values(translation)[0] ?? ''
}

/**
 * Get translated text using message key path (e.g. "nav.home")
 * Fallback chain: current language -> English -> key
 */
export function tKey(key: string, lang?: Language): string {
  const currentLang = resolveLanguage(lang || getCurrentLanguage())

  const localized = resolveMessage(messagesByLanguage[currentLang], key)
  if (localized) return localized

  const englishFallback = resolveMessage(messagesByLanguage.en, key)
  if (englishFallback) {
    if (process.env.NODE_ENV === 'development' && currentLang !== 'en') {
      console.warn('Missing translation:', key)
    }
    return englishFallback
  }

  if (process.env.NODE_ENV === 'development') {
    console.warn('Missing translation:', key)
  }

  return key
}

/**
 * Core translations for backward compatibility with existing usages like:
 * t(translations.hero.description, language)
 */
export const translations = buildLegacyTranslationsTree(messagesByLanguage.en, messagesByLanguage.bn) as Record<string, any>
