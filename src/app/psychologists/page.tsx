"use client"

import { PsychologistCard } from "@/components/PsychologistCard"
import { psychologists } from "@/data/psychologists"

export default function PsychologistsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-teal-900 mb-3">Access to Psychologists</h1>
        <p className="text-xl text-gray-700">🌍 1 Free Session for Everyone – Worldwide Access</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {psychologists.map((psychologist) => (
          <PsychologistCard key={psychologist.name} psychologist={psychologist} />
        ))}
      </div>
    </div>
  )
}
