"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { User, Award, Briefcase, AlertTriangle } from "lucide-react"

interface Advisor {
  id: string
  name: string
  title: string
  education: string
  certifications: string[]
  expertise: string[]
  imageUrl: string
  role: string
  bio: string
}

export function AdvisorsModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [advisors, setAdvisors] = useState<Advisor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (open) {
      fetch('/api/advisors')
        .then(res => res.json())
        .then(data => {
          setAdvisors(data)
          setLoading(false)
        })
        .catch(err => {
          console.error('Error fetching advisors:', err)
          setLoading(false)
        })
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-4xl w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto break-words whitespace-normal overflow-x-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl text-primary break-words">
            Professional Advisors (Volunteer)
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Clinical advisory support - informational and voluntary
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          {/* Prominent Disclaimer */}
          <div className="p-3 sm:p-4 bg-amber-50 border-2 border-amber-500 rounded-lg">
            <div className="flex items-start gap-2 sm:gap-3">
              <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-900 mb-2 text-sm sm:text-base">⚠️ Important Disclaimer</p>
                <ul className="text-xs sm:text-sm text-amber-800 space-y-1.5">
                  <li>• <strong>MindWell does NOT provide emergency services.</strong> Users in immediate danger must contact local emergency services or crisis hotlines.</li>
                  <li>• Professional involvement is <strong>voluntary and informational only.</strong></li>
                  <li>• Any live interaction, if offered, is <strong>limited, optional, and used only as a last-resort supportive measure.</strong></li>
                  <li>• This advisory role <strong>does NOT replace emergency services or ongoing therapy.</strong></li>
                  <li>• <strong>No therapist-patient relationship is created</strong> through this platform.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Advisors List */}
          {loading ? (
            <div className="text-center py-8 text-sm sm:text-base">Loading advisors...</div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {advisors.map(advisor => (
                <div key={advisor.id} className="p-4 sm:p-6 border-2 rounded-lg hover:border-primary transition-colors bg-white">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto sm:mx-0 rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200 relative">
                        <Image 
                          src={advisor.imageUrl} 
                          alt={advisor.name}
                          width={160}
                          height={160}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to placeholder if image fails to load
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0U1RTdFQiIvPgogIDxjaXJjbGUgY3g9IjEwMCIgY3k9IjcwIiByPSIzMCIgZmlsbD0iIzlDQTNBRiIvPgogIDxwYXRoIGQ9Ik0gNjAgMTMwIFEgMTAwIDExMCwgMTQwIDEzMCBMIDE0MCAyMDAgTCA2MCAyMDAgWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4='
                          }}
                        />
                      </div>
                    </div>

                    {/* Profile Information */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 break-words">
                            {advisor.name}
                          </h3>
                          <p className="text-sm sm:text-base text-primary font-semibold">
                            {advisor.title}
                          </p>
                          <div className="mt-1 inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                            Volunteer Advisor
                          </div>
                        </div>
                      </div>

                      {/* Education */}
                      <div className="mb-3">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 mb-1">
                          <User className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="font-semibold">Education:</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-700 ml-6">{advisor.education}</p>
                      </div>

                      {/* Certifications */}
                      {advisor.certifications.length > 0 && (
                        <div className="mb-3">
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 mb-1">
                            <Award className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="font-semibold">Certifications:</span>
                          </div>
                          <ul className="text-xs sm:text-sm text-gray-700 ml-6 space-y-0.5">
                            {advisor.certifications.map((cert, index) => (
                              <li key={index}>• {cert}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Areas of Expertise */}
                      {advisor.expertise.length > 0 && (
                        <div className="mb-3">
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 mb-1">
                            <Briefcase className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="font-semibold">Areas of Expertise:</span>
                          </div>
                          <ul className="text-xs sm:text-sm text-gray-700 ml-6 space-y-0.5">
                            {advisor.expertise.map((exp, index) => (
                              <li key={index}>• {exp}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Role Description */}
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                        <p className="text-xs sm:text-sm text-blue-900">
                          <strong>Role:</strong> This role is voluntary and advisory. Live interaction, if offered, 
                          is limited, optional, and used only as a last-resort supportive measure. 
                          This does NOT replace emergency services or ongoing therapy, and no therapist-patient relationship is created.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Notice about Future Psychologists */}
          <div className="p-3 sm:p-4 bg-teal-50 border-2 border-teal-200 rounded-lg">
            <p className="text-sm sm:text-base text-teal-900 text-center font-medium">
              ✨ More psychologists will be added over time to provide you with the best possible service and support
            </p>
          </div>

          {/* Additional Information */}
          <div className="p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Need Professional Help?</p>
            <ul className="text-xs sm:text-sm text-gray-700 space-y-1">
              <li>• For ongoing therapy, contact a licensed mental health professional in your area</li>
              <li>• For crisis situations, use our Crisis Resources or call emergency services</li>
              <li>• For general support, explore our self-assessments and therapeutic tools</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
