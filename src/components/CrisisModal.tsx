"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Phone, MessageSquare, Globe, AlertCircle } from "lucide-react"

interface CrisisResource {
  id: string
  name: string
  country: string
  phone: string
  textLine: string
  website: string
  description: string
  available: string
  category: string
}

export function CrisisModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [resources, setResources] = useState<CrisisResource[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCountry, setSelectedCountry] = useState<string>('United States')

  useEffect(() => {
    if (open) {
      fetch('/api/crisis-resources')
        .then(res => res.json())
        .then(data => {
          setResources(data)
          setLoading(false)
        })
        .catch(err => {
          console.error('Error fetching crisis resources:', err)
          setLoading(false)
        })
    }
  }, [open])

  const countries = Array.from(new Set(resources.map(r => r.country)))
  const filteredResources = resources.filter(r => r.country === selectedCountry)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl text-red-900 break-words">Crisis Resources - Get Help Now</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Immediate support available 24/7 for mental health crises
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          {/* Emergency Banner */}
          <div className="p-3 sm:p-4 bg-red-50 border-2 border-red-500 rounded-lg">
            <div className="flex items-start gap-2 sm:gap-3">
              <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-red-900 mb-2 text-sm sm:text-base">If you're in immediate danger:</p>
                <p className="text-red-800 mb-1 text-xs sm:text-sm">🚨 Call <strong>911</strong> (US) or your local emergency number</p>
                <p className="text-red-800 text-xs sm:text-sm">🏥 Go to the nearest emergency room</p>
              </div>
            </div>
          </div>

          {/* Country Selector */}
          <div className="flex gap-2 flex-wrap">
            {countries.map(country => (
              <Button
                key={country}
                variant={selectedCountry === country ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCountry(country)}
                className="text-xs sm:text-sm min-h-[40px]"
              >
                {country}
              </Button>
            ))}
          </div>

          {/* Resources List */}
          {loading ? (
            <div className="text-center py-8 text-sm sm:text-base">Loading resources...</div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {filteredResources.map(resource => (
                <div key={resource.id} className="p-3 sm:p-4 border rounded-lg hover:border-red-400 transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-1 sm:gap-0">
                    <div className="flex-1">
                      <h3 className="font-semibold text-base sm:text-lg break-words">{resource.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{resource.category}</p>
                    </div>
                    <div className="text-xs text-gray-500">{resource.available}</div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-700 mb-3 break-words">{resource.description}</p>

                  <div className="space-y-2">
                    {resource.phone && (
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="font-medium">Phone:</span>
                        <a href={`tel:${resource.phone.replace(/[^0-9]/g, '')}`} className="text-primary hover:underline min-h-[44px] flex items-center">
                          {resource.phone}
                        </a>
                      </div>
                    )}
                    
                    {resource.textLine && (
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <MessageSquare className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="font-medium">Text:</span>
                        <span className="text-primary break-words">{resource.textLine}</span>
                      </div>
                    )}
                    
                    {resource.website && (
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <Globe className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="font-medium">Website:</span>
                        <a 
                          href={resource.website} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-primary hover:underline break-all min-h-[44px] flex items-center"
                        >
                          Visit website →
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Additional Help */}
          <div className="p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">Not in crisis but need support?</p>
            <ul className="text-xs sm:text-sm text-blue-800 space-y-1">
              <li>• Contact your primary care provider</li>
              <li>• Reach out to a licensed therapist or counselor</li>
              <li>• Talk to a trusted friend or family member</li>
              <li>• Use our self-assessments and therapeutic tools</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
