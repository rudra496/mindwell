"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Phone } from "lucide-react"
import type { PsychologistProfile } from "@/data/psychologists"

interface PsychologistCardProps {
  psychologist: PsychologistProfile
}

const kamrulExpertise = [
  "Cognitive Behavior Therapy (CBT)",
  "Dialectical Behaviour Therapy (DBT)",
  "Acceptance & Commitment Therapy (ACT)",
  "Motivational Interviewing (MI)",
  "Functional Analysis (ABC)",
]

const kamrulInterestAreas = [
  "Personality Disorder(s) (BPD)",
  "Suicide & Crisis Management",
  "OCD",
  "Panic Disorder",
  "Social Anxiety",
  "Specific Phobia",
  "Exam Phobia",
  "Stress & Trauma Management",
  "Addiction Management",
  "Anger Management",
]

const rifatExpertise = [
  "Cognitive Behavior Therapy (CBT)",
  "Dialectical Behaviour Therapy (DBT)",
  "Acceptance & Commitment Therapy (ACT)",
  "Motivational Interviewing (MI)",
  "Functional Analysis (ABC)",
]

const rifatInterestAreas = [
  "Panic Attacks",
  "Anxiety Disorders",
  "Adult ADHD",
  "Emotional Regulation",
  "Anger Management",
  "Personality Disorders",
  "Couple Counselling",
]

export function PsychologistCard({ psychologist }: PsychologistCardProps) {
  const isKamrul = psychologist.name === "Kamrul Hasan"
  const expertise = isKamrul ? kamrulExpertise : rifatExpertise
  const interestAreas = isKamrul ? kamrulInterestAreas : rifatInterestAreas

  return (
    <Card className="border-2 border-teal-200 dark:border-teal-700 shadow-md h-full">
      <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Image
            src={psychologist.imageUrl}
            alt={psychologist.name}
            width={96}
            height={96}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-white shadow"
            sizes="96px"
          />
          <div>
            <CardTitle className="text-xl text-teal-900 dark:text-teal-100">{psychologist.name}</CardTitle>
            <p className="text-gray-700 dark:text-gray-300 font-medium">{psychologist.title}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Education: {psychologist.education}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Experience: {psychologist.experience}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-5 space-y-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">Expertise In:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
            {expertise.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">Interest Areas:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
            {interestAreas.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <Button asChild className="w-full bg-green-600 hover:bg-green-700">
            <a href={psychologist.whatsapp} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp: {psychologist.phone}
            </a>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <a href={`tel:${psychologist.phone}`}>
              <Phone className="h-4 w-4 mr-2" /> Call: {psychologist.phone}
            </a>
          </Button>
          <Button asChild variant="secondary" className="w-full">
            <Link href="/psychologists">View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
