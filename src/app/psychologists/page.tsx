"use client"

import { Mail, Shield } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
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

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-900 flex items-start gap-2">
          <Shield className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <span><strong>Strict Confidentiality:</strong> All sessions are private and follow ethical professional standards.</span>
        </p>
      </div>

      <div className="mt-6 text-center">
        <Link href="/request-session">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            <Mail className="h-4 w-4 mr-2" /> Request a Session
          </Button>
        </Link>
      </div>
    </div>
  )
}
