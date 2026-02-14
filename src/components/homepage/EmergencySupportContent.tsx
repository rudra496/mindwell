"use client"

import { PsychologistCard } from "@/components/PsychologistCard"
import { psychologists } from "@/data/psychologists"

export function EmergencySupportContent() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">🌍 1 Free Session for Everyone – Worldwide Access</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Bangladesh: Kaan Pete Roi – 09678 676 777 (24/7) | US: 988 | Emergency: 999 (BD) / 911 (US)</p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {psychologists.map((psychologist) => (
          <PsychologistCard key={psychologist.name} psychologist={psychologist} />
        ))}
      </div>
    </div>
  )
}
