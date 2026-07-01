"use client"

import { psychologists } from "@/data/psychologists"
import { PsychologistMiniCard } from "@/components/homepage/PsychologistMiniCard"

export function EmergencySupportContent() {
  const featuredPsychologists = psychologists.slice(0, 2)

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full">
      <div className="text-left">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">In crisis?</h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">Consult with our verified Clinical Psychologists.</p>
        <p className="font-semibold text-teal-700 dark:text-teal-300 text-sm mt-1">1st Session Free</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {featuredPsychologists.map((psychologist) => (
          <PsychologistMiniCard key={psychologist.name} psychologist={psychologist} />
        ))}
      </div>
    </div>
  )
}
