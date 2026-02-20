import { MetadataRoute } from 'next'
import disordersData from '@/data/disorders.json'
import assessmentsData from '@/data/assessments.json'
import therapyTechniquesData from '@/data/therapy-techniques.json'
import meditationsData from '@/data/meditations.json'

const BASE_URL = 'https://mindwell-navy.vercel.app'

type DisorderEntry = { slug: string }
type AssessmentEntry = { slug: string }
type TherapyTechniqueEntry = { slug: string }
type MeditationEntry = { slug: string }

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/apk`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/bangladesh-services`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/crisis-resources`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/ethics`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/faq`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/medical-disclaimer`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE_URL}/psychologists`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/request-session`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/terms`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE_URL}/transparency`, changeFrequency: 'monthly', priority: 0.7 },
  ]

  const disorderPages: MetadataRoute.Sitemap = (disordersData as DisorderEntry[]).map((d) => ({
    url: `${BASE_URL}/disorders/${d.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const assessmentPages: MetadataRoute.Sitemap = (assessmentsData as AssessmentEntry[]).map((a) => ({
    url: `${BASE_URL}/assessments/${a.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const therapyPages: MetadataRoute.Sitemap = (therapyTechniquesData as TherapyTechniqueEntry[]).map((t) => ({
    url: `${BASE_URL}/therapy-techniques/${t.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const meditationPages: MetadataRoute.Sitemap = (meditationsData as MeditationEntry[]).map((m) => ({
    url: `${BASE_URL}/meditations/${m.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...disorderPages, ...assessmentPages, ...therapyPages, ...meditationPages]
}
