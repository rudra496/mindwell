"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, MessageCircle, Phone, Shield } from "lucide-react"
import Link from "next/link"

const psychologists = [
  {
    name: "Md. Rifat Hasan Tarofder",
    title: "Assistant Clinical Psychologist",
    education: "MS in Clinical Psychology, University of Dhaka",
    imageUrl: "/advisors/rifat-hasan-tarofder.jpg",
    whatsapp: "https://wa.me/+8801706520948",
    phone: "+8801706520948",
    skills: [
      "Personality Disorder",
      "Anxiety Disorders",
      "Obsessive Compulsive Disorders",
      "Bipolar & Psychotic Disorders",
      "Crisis Intervention",
      "Family & Couple Counseling"
    ]
  },
  {
    name: "Kamrul Hasan",
    title: "Clinical Psychologist",
    education: "Counseling and Clinical Practice",
    imageUrl: "/advisors/kamrul.jpg",
    whatsapp: "https://wa.me/+8801835569198",
    phone: "+8801835569198",
    skills: [
      "Cognitive Behavioral Therapy",
      "Counseling Psychology",
      "Mental Health",
      "Active Listening",
      "Psychology",
      "Communication Skills",
      "Research Paper Writing",
      "Psychometrics",
      "Child Counseling",
      "Stress Management",
      "Client Management",
      "Crisis Management"
    ]
  }
]

export default function PsychologistsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-teal-900 mb-4">Access to Psychologists</h1>
        <p className="text-xl text-gray-700">Simple, confidential, and professional support for everyone.</p>
      </div>

      <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border-2 border-green-500">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">For Bangladeshi University Students</h2>
        <p className="text-lg text-gray-800"><strong>2 free counseling sessions</strong> are available based on capacity.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {psychologists.map((p) => (
          <Card key={p.name} className="border-2 border-teal-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50">
              <div className="flex items-center gap-4">
                <Image src={p.imageUrl} alt={p.name} width={96} height={96} className="w-24 h-24 rounded-full object-cover border-2 border-white shadow" />
                <div>
                  <CardTitle className="text-2xl text-teal-900">{p.name}</CardTitle>
                  <p className="text-gray-700 font-medium">{p.title}</p>
                  <p className="text-sm text-gray-600">{p.education}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-4 flex flex-wrap gap-2">
                {p.skills.map((skill) => (
                  <Badge key={skill} variant="outline">{skill}</Badge>
                ))}
              </div>

              <div className="space-y-2">
                <Button onClick={() => window.open(p.whatsapp, '_blank')} className="w-full bg-green-600 hover:bg-green-700">
                  <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp: {p.phone}
                </Button>
                <Button onClick={() => window.open(`tel:${p.phone}`, '_blank')} variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" /> Call: {p.phone}
                </Button>
              </div>
            </CardContent>
          </Card>
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
