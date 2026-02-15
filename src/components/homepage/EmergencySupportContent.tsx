"use client"

import { psychologists } from "@/data/psychologists"
import { PsychologistMiniCard } from "@/components/homepage/PsychologistMiniCard"

export function EmergencySupportContent() {
  const featuredPsychologists = psychologists.slice(0, 2)

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">In crisis?</h3>
        <p className="text-gray-700 dark:text-gray-300">Consult with our Clinical Psychologists</p>
        <p className="font-semibold text-teal-700 dark:text-teal-300">1st Session Free</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {featuredPsychologists.map((psychologist) => (
          <PsychologistMiniCard key={psychologist.name} psychologist={psychologist} />
        ))}
      </div>
    </div>
  )
}
