"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Phone } from "lucide-react"
import type { PsychologistProfile } from "@/data/psychologists"

interface PsychologistCardProps {
  psychologist: PsychologistProfile
}

export function PsychologistCard({ psychologist }: PsychologistCardProps) {
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
            <p className="text-sm text-gray-600 dark:text-gray-400">{psychologist.education}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Experience: {psychologist.experience}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-5 space-y-4">
        <div className="flex flex-wrap gap-2">
          {psychologist.skills.map((skill) => (
            <Badge key={skill} variant="outline">
              {skill}
            </Badge>
          ))}
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
