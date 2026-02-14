"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PsychologistCard } from "@/components/PsychologistCard"
import { psychologists } from "@/data/psychologists"

export function PsychologistsAccessSection() {
  return (
    <section className="mb-4" id="psychologists">
      <Card className="border-2 border-teal-200 dark:border-teal-700 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 overflow-hidden">
        <CardHeader className="bg-white/70 dark:bg-gray-800/60 border-b border-teal-200 dark:border-teal-700">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-teal-900 dark:text-teal-100 text-center">
            🌍 1 Free Session for Everyone – Worldwide Access
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {psychologists.map((psychologist) => (
              <PsychologistCard key={psychologist.name} psychologist={psychologist} />
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
