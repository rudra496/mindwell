"use client"

import Image from "next/image"
import Link from "next/link"
import { MessageCircle, Phone } from "lucide-react"
import type { PsychologistProfile } from "@/data/psychologists"

interface PsychologistMiniCardProps {
  psychologist: PsychologistProfile
}

export function PsychologistMiniCard({ psychologist }: PsychologistMiniCardProps) {
  return (
    <article className="rounded-xl border border-teal-200 dark:border-teal-700 p-5 bg-white/90 dark:bg-slate-900/60 shadow-sm">
      <div className="flex items-start gap-4">
        <Image
          src={psychologist.imageUrl}
          alt={`Portrait of ${psychologist.name}`}
          width={88}
          height={88}
          className="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover border border-teal-100 dark:border-teal-700"
          sizes="88px"
        />
        <div className="text-left">
          <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{psychologist.name}</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">{psychologist.title}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <a href={`tel:${psychologist.phone}`} className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
          <Phone className="h-4 w-4 mr-2" />Call
        </a>
        <a href={psychologist.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md bg-green-600 text-white px-3 py-2 text-sm font-medium hover:bg-green-700">
          <MessageCircle className="h-4 w-4 mr-2" />WhatsApp
        </a>
      </div>

      <div className="mt-2">
        <Link href="/psychologists" className="inline-flex w-full items-center justify-center rounded-md bg-teal-600 text-white px-3 py-2 text-sm font-medium hover:bg-teal-700">
          View Details
        </Link>
      </div>
    </article>
  )
}
