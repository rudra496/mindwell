"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Phone, MessageSquare, Globe, AlertCircle, Stethoscope } from "lucide-react"

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

export function CrisisModal({ 
  open, 
  onOpenChange,
  onOpenAdvisors 
}: { 
  open: boolean
  onOpenChange: (open: boolean) => void
  onOpenAdvisors?: () => void
}) {
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

          {/* Bangladesh Free & Low-Cost Services - English */}
          {selectedCountry === 'Bangladesh' && (
            <div className="p-3 sm:p-4 bg-green-50 border-2 border-green-400 rounded-lg">
              <h3 className="font-bold text-green-900 mb-3 text-sm sm:text-base">
                🏥 Free & Low-Cost Mental Health Services (Bangladesh)
              </h3>
              <div className="text-xs sm:text-sm text-green-800 mb-3">
                <p className="font-semibold mb-2">Government Hospitals Offering Psychiatric & Psychological Services:</p>
                <ul className="space-y-1.5 ml-4">
                  <li>• National Institute of Mental Health (NIMH), Dhaka</li>
                  <li>• Dhaka Medical College Hospital</li>
                  <li>• Sir Salimullah Medical College (Mitford Hospital)</li>
                  <li>• Chittagong Medical College Hospital</li>
                  <li>• Pabna Mental Hospital</li>
                </ul>
                <p className="mt-3 font-medium">
                  <strong>Cost:</strong> Very low cost services (approximately BDT 10 ticket fee in government hospitals)
                </p>
              </div>
              <div className="text-xs sm:text-sm text-green-900 bg-green-100 p-2 rounded border border-green-300 mb-3">
                <p className="font-semibold mb-1">⚠️ Important Disclaimers:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Availability, waiting time, and services may vary</li>
                  <li>• MindWell does NOT manage, control, or guarantee these services</li>
                  <li>• For life-threatening emergencies, contact local emergency services immediately</li>
                </ul>
              </div>
            </div>
          )}

          {/* Bangladesh Free & Low-Cost Services - Bangla */}
          {selectedCountry === 'Bangladesh' && (
            <div className="p-3 sm:p-4 bg-teal-50 border-2 border-teal-400 rounded-lg">
              <h3 className="font-bold text-teal-900 mb-3 text-sm sm:text-base">
                🏥 বিনামূল্যে ও স্বল্পমূল্যের মানসিক স্বাস্থ্য সেবা (বাংলাদেশ)
              </h3>
              <div className="text-xs sm:text-sm text-teal-800 mb-3">
                <p className="font-semibold mb-2">সরকারি হাসপাতাল যেখানে মানসিক স্বাস্থ্য সেবা পাওয়া যায়:</p>
                <ul className="space-y-1.5 ml-4">
                  <li>• জাতীয় মানসিক স্বাস্থ্য ইনস্টিটিউট (NIMH), ঢাকা</li>
                  <li>• ঢাকা মেডিকেল কলেজ হাসপাতাল</li>
                  <li>• স্যার সলিমুল্লাহ মেডিকেল কলেজ (মিটফোর্ড হাসপাতাল)</li>
                  <li>• চট্টগ্রাম মেডিকেল কলেজ হাসপাতাল</li>
                  <li>• পাবনা মানসিক হাসপাতাল</li>
                </ul>
                <p className="mt-3 font-medium">
                  <strong>খরচ:</strong> খুবই কম খরচে সেবা (সরকারি হাসপাতালে প্রায় ১০ টাকা টিকিট ফি)
                </p>
              </div>
              <div className="text-xs sm:text-sm text-teal-900 bg-teal-100 p-2 rounded border border-teal-300 mb-3">
                <p className="font-semibold mb-1">⚠️ গুরুত্বপূর্ণ সতর্কতা:</p>
                <ul className="space-y-1 ml-4">
                  <li>• সেবার প্রাপ্যতা, অপেক্ষার সময় এবং সেবা ভিন্ন হতে পারে</li>
                  <li>• MindWell এই সেবাগুলি পরিচালনা, নিয়ন্ত্রণ বা গ্যারান্টি দেয় না</li>
                  <li>• জীবন-হুমকিমূলক জরুরী পরিস্থিতিতে অবিলম্বে স্থানীয় জরুরী সেবায় যোগাযোগ করুন</li>
                </ul>
              </div>
            </div>
          )}

          {/* Professional Advisors Section */}
          {onOpenAdvisors && (
            <div className="p-3 sm:p-4 bg-purple-50 border-2 border-purple-300 rounded-lg">
              <h3 className="font-bold text-purple-900 mb-2 text-sm sm:text-base flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                Professional Advisory Support (Volunteer)
              </h3>
              <p className="text-xs sm:text-sm text-purple-800 mb-3">
                Access volunteer clinical advisors who can provide informational support and guidance. 
                This is not a replacement for emergency services or ongoing therapy.
              </p>
              <Button 
                variant="outline" 
                className="w-full sm:w-auto min-h-[44px] border-purple-400 text-purple-900 hover:bg-purple-100"
                onClick={() => {
                  onOpenChange(false)
                  setTimeout(() => onOpenAdvisors(), 300)
                }}
              >
                View Professional Advisors →
              </Button>
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
