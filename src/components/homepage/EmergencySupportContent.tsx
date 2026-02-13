"use client"

import { Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

/**
 * Section 1: Emergency Support
 * Displays psychologists with contact options
 */
export function EmergencySupportContent() {
  const psychologists = [
    {
      name: "Md. Rifat Hasan Tarofder",
      title: "Assistant Clinical Psychologist",
      experience: "2+ years",
      skills: ["CBT", "Counseling Psychology", "Mental Health", "Active Listening", "Communication", "Crisis Management"],
      whatsapp: "https://wa.me/+8801706520948",
      phone: "+880 1706-520948"
    },
    {
      name: "Kamrul Hasan",
      title: "Clinical Psychologist",
      experience: "2+ years",
      skills: ["CBT", "Counseling Psychology", "Mental Health", "Active Listening", "Communication", "Crisis Management"],
      whatsapp: "https://wa.me/+8801706520948",
      phone: "+880 1706-520948",
      photoPlaceholder: true
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Contact Our Psychologists
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          <strong>Note:</strong> Contact available via WhatsApp or Phone Call only
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {psychologists.map((psychologist, index) => (
          <Card key={index} className="border-2 dark:border-gray-700">
            <CardContent className="p-6">
              {/* Photo Placeholder */}
              {psychologist.photoPlaceholder && (
                <div className="mb-4 p-4 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-700 rounded-lg">
                  <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">
                    📸 Photo Placeholder: kamrul.jpg
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                    Add photo to: /public/images/psychologists/kamrul.jpg
                  </p>
                </div>
              )}

              {/* Name & Title */}
              <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {psychologist.name}
              </h4>
              <p className="text-teal-600 dark:text-teal-400 font-medium mb-3">
                {psychologist.title}
              </p>

              {/* Experience */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                <strong>Experience:</strong> {psychologist.experience}
              </p>

              {/* Skills */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Skills:
                </p>
                <div className="flex flex-wrap gap-2">
                  {psychologist.skills.map((skill, i) => (
                    <span 
                      key={i}
                      className="text-xs px-2 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="flex flex-col gap-2">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => window.open(psychologist.whatsapp, '_blank')}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp: {psychologist.phone}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.location.href = `tel:${psychologist.phone}`}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call: {psychologist.phone}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
