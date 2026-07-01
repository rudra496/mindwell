"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Phone, MessageSquare, Globe, AlertCircle, Stethoscope, MapPin } from "lucide-react"
import { SuicidePreventionSection } from "./SuicidePreventionSection"

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
      <DialogContent className="max-w-[95vw] sm:max-w-3xl w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl text-red-900 break-words">Emergency Help / Crisis Resources</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Immediate support available 24/7 for mental health crises
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          {/* SUICIDE PREVENTION SECTION - FIRST AND MOST PROMINENT */}
          <SuicidePreventionSection />

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
            <div className="p-3 sm:p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-500 rounded-lg shadow-md">
              <h3 className="font-bold text-green-900 mb-3 text-sm sm:text-base flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                🏥 Bangladesh Government Mental Health Services (Free & Low-Cost)
              </h3>
              <div className="text-xs sm:text-sm text-green-800 mb-3">
                <p className="font-semibold mb-3 text-green-900">
                  Government Hospitals Offering Psychiatric & Psychological Services:
                </p>
                
                <div className="space-y-3">
                  {/* NIMH Dhaka */}
                  <div className="p-3 bg-white rounded-lg border border-green-300">
                    <p className="font-bold text-green-900 mb-1">• National Institute of Mental Health (NIMH), Dhaka</p>
                    <p className="text-xs mb-2">Specialized mental health facility - Comprehensive psychiatric care</p>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=National+Institute+of+Mental+Health+Dhaka+Bangladesh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium underline"
                    >
                      <MapPin className="h-3 w-3" />
                      View on Google Maps →
                    </a>
                  </div>

                  {/* Dhaka Medical College Hospital */}
                  <div className="p-3 bg-white rounded-lg border border-green-300">
                    <p className="font-bold text-green-900 mb-1">• Dhaka Medical College Hospital</p>
                    <p className="text-xs mb-2">General hospital with psychiatric department</p>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Dhaka+Medical+College+Hospital+Bangladesh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium underline"
                    >
                      <MapPin className="h-3 w-3" />
                      View on Google Maps →
                    </a>
                  </div>

                  {/* Sir Salimullah Medical College */}
                  <div className="p-3 bg-white rounded-lg border border-green-300">
                    <p className="font-bold text-green-900 mb-1">• Sir Salimullah Medical College (Mitford Hospital)</p>
                    <p className="text-xs mb-2">Historic hospital with mental health services</p>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Sir+Salimullah+Medical+College+Mitford+Hospital+Dhaka"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium underline"
                    >
                      <MapPin className="h-3 w-3" />
                      View on Google Maps →
                    </a>
                  </div>

                  {/* Chittagong Medical College Hospital */}
                  <div className="p-3 bg-white rounded-lg border border-green-300">
                    <p className="font-bold text-green-900 mb-1">• Chittagong Medical College Hospital</p>
                    <p className="text-xs mb-2">Major hospital in Chittagong with psychiatric services</p>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Chittagong+Medical+College+Hospital+Bangladesh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium underline"
                    >
                      <MapPin className="h-3 w-3" />
                      View on Google Maps →
                    </a>
                  </div>

                  {/* Pabna Mental Hospital */}
                  <div className="p-3 bg-white rounded-lg border border-green-300">
                    <p className="font-bold text-green-900 mb-1">• Pabna Mental Hospital</p>
                    <p className="text-xs mb-2">Oldest and largest specialized mental health facility in Bangladesh</p>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Pabna+Mental+Hospital+Bangladesh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium underline"
                    >
                      <MapPin className="h-3 w-3" />
                      View on Google Maps →
                    </a>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-400">
                  <p className="font-bold text-green-900 mb-1">
                    💰 <strong>Cost:</strong> Very low cost services
                  </p>
                  <p className="text-xs">
                    Government hospitals charge approximately <strong>BDT 10 ticket fee</strong> for consultations. 
                    Some medications may have additional minimal costs.
                  </p>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-green-900 bg-amber-50 p-2 rounded border border-amber-400 mb-3">
                <p className="font-semibold mb-1">⚠️ Important Disclaimers:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Availability, waiting time, and services may vary by facility and time</li>
                  <li>• MindWell does NOT manage, control, or guarantee these services</li>
                  <li>• For life-threatening emergencies, contact <strong>999</strong> or go to the nearest emergency room immediately</li>
                  <li>• Google Maps links are provided for convenience - directions may vary</li>
                </ul>
              </div>
            </div>
          )}

          {/* Bangladesh Free & Low-Cost Services - Bangla */}
          {selectedCountry === 'Bangladesh' && (
            <div className="p-3 sm:p-4 bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-500 rounded-lg shadow-md">
              <h3 className="font-bold text-teal-900 mb-3 text-sm sm:text-base flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                🏥 বাংলাদেশ সরকারি মানসিক স্বাস্থ্য সেবা (বিনামূল্যে ও স্বল্পমূল্যে)
              </h3>
              <div className="text-xs sm:text-sm text-teal-800 mb-3">
                <p className="font-semibold mb-3 text-teal-900">
                  সরকারি হাসপাতাল যেখানে মানসিক স্বাস্থ্য সেবা পাওয়া যায়:
                </p>
                
                <div className="space-y-3">
                  {/* NIMH Dhaka - Bangla */}
                  <div className="p-3 bg-white rounded-lg border border-teal-300">
                    <p className="font-bold text-teal-900 mb-1">• জাতীয় মানসিক স্বাস্থ্য ইনস্টিটিউট (NIMH), ঢাকা</p>
                    <p className="text-xs mb-2">বিশেষায়িত মানসিক স্বাস্থ্য কেন্দ্র - সম্পূর্ণ মানসিক স্বাস্থ্য সেবা</p>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=National+Institute+of+Mental+Health+Dhaka+Bangladesh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium underline"
                    >
                      <MapPin className="h-3 w-3" />
                      গুগল ম্যাপে দেখুন →
                    </a>
                  </div>

                  {/* Dhaka Medical College Hospital - Bangla */}
                  <div className="p-3 bg-white rounded-lg border border-teal-300">
                    <p className="font-bold text-teal-900 mb-1">• ঢাকা মেডিকেল কলেজ হাসপাতাল</p>
                    <p className="text-xs mb-2">মানসিক স্বাস্থ্য বিভাগ সহ সাধারণ হাসপাতাল</p>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Dhaka+Medical+College+Hospital+Bangladesh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium underline"
                    >
                      <MapPin className="h-3 w-3" />
                      গুগল ম্যাপে দেখুন →
                    </a>
                  </div>

                  {/* Sir Salimullah Medical College - Bangla */}
                  <div className="p-3 bg-white rounded-lg border border-teal-300">
                    <p className="font-bold text-teal-900 mb-1">• স্যার সলিমুল্লাহ মেডিকেল কলেজ (মিটফোর্ড হাসপাতাল)</p>
                    <p className="text-xs mb-2">মানসিক স্বাস্থ্য সেবা সহ ঐতিহাসিক হাসপাতাল</p>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Sir+Salimullah+Medical+College+Mitford+Hospital+Dhaka"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium underline"
                    >
                      <MapPin className="h-3 w-3" />
                      গুগল ম্যাপে দেখুন →
                    </a>
                  </div>

                  {/* Chittagong Medical College Hospital - Bangla */}
                  <div className="p-3 bg-white rounded-lg border border-teal-300">
                    <p className="font-bold text-teal-900 mb-1">• চট্টগ্রাম মেডিকেল কলেজ হাসপাতাল</p>
                    <p className="text-xs mb-2">মানসিক স্বাস্থ্য সেবা সহ চট্টগ্রামের প্রধান হাসপাতাল</p>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Chittagong+Medical+College+Hospital+Bangladesh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium underline"
                    >
                      <MapPin className="h-3 w-3" />
                      গুগল ম্যাপে দেখুন →
                    </a>
                  </div>

                  {/* Pabna Mental Hospital - Bangla */}
                  <div className="p-3 bg-white rounded-lg border border-teal-300">
                    <p className="font-bold text-teal-900 mb-1">• পাবনা মানসিক হাসপাতাল</p>
                    <p className="text-xs mb-2">বাংলাদেশের সবচেয়ে পুরাতন এবং বৃহত্তম বিশেষায়িত মানসিক স্বাস্থ্য কেন্দ্র</p>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Pabna+Mental+Hospital+Bangladesh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium underline"
                    >
                      <MapPin className="h-3 w-3" />
                      গুগল ম্যাপে দেখুন →
                    </a>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-teal-100 rounded-lg border border-teal-400">
                  <p className="font-bold text-teal-900 mb-1">
                    💰 <strong>খরচ:</strong> খুবই কম খরচে সেবা
                  </p>
                  <p className="text-xs">
                    সরকারি হাসপাতালে পরামর্শের জন্য প্রায় <strong>১০ টাকা টিকিট ফি</strong> নেওয়া হয়। 
                    কিছু ওষুধের জন্য অতিরিক্ত ন্যূনতম খরচ হতে পারে।
                  </p>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-teal-900 bg-amber-50 p-2 rounded border border-amber-400 mb-3">
                <p className="font-semibold mb-1">⚠️ গুরুত্বপূর্ণ সতর্কতা:</p>
                <ul className="space-y-1 ml-4">
                  <li>• সেবার প্রাপ্যতা, অপেক্ষার সময় এবং সেবা প্রতিষ্ঠান ও সময় অনুযায়ী ভিন্ন হতে পারে</li>
                  <li>• MindWell এই সেবাগুলি পরিচালনা, নিয়ন্ত্রণ বা গ্যারান্টি দেয় না</li>
                  <li>• জীবন-হুমকিমূলক জরুরী পরিস্থিতিতে <strong>999</strong> এ যোগাযোগ করুন বা নিকটস্থ জরুরী বিভাগে অবিলম্বে যান</li>
                  <li>• সুবিধার জন্য গুগল ম্যাপ লিঙ্ক প্রদান করা হয়েছে - পথনির্দেশ ভিন্ন হতে পারে</li>
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
