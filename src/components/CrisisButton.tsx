"use client"

import { useState, useEffect } from "react"
import { Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function CrisisButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [country, setCountry] = useState<string>("US")

  useEffect(() => {
    // Detect user's country based on timezone or locale
    const detectCountry = () => {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      const locale = navigator.language
      
      // Simple country detection based on timezone
      if (timezone.includes("Dhaka") || locale.includes("bn")) {
        return "BD"
      } else if (timezone.includes("London") || timezone === "Europe/London") {
        return "UK"
      } else if (timezone.includes("Australia")) {
        return "AU"
      } else if (timezone.includes("Canada") || timezone.includes("Toronto") || timezone.includes("Vancouver")) {
        return "CA"
      }
      return "US"
    }

    setCountry(detectCountry())
  }, [])

  const crisisResources = {
    US: {
      name: "United States",
      crisis: "988",
      emergency: "911",
      text: "Text 'HELLO' to 741741",
      website: "https://988lifeline.org/",
    },
    UK: {
      name: "United Kingdom",
      crisis: "116 123",
      emergency: "999",
      text: "Text 'SHOUT' to 85258",
      website: "https://www.samaritans.org/",
    },
    BD: {
      name: "Bangladesh",
      crisis: "09666 911 911",
      emergency: "999",
      text: "WhatsApp: +880 1779-554496",
      website: "https://www.kaan.org.bd/",
    },
    AU: {
      name: "Australia",
      crisis: "13 11 14",
      emergency: "000",
      text: "Text 0477 13 11 14",
      website: "https://www.lifeline.org.au/",
    },
    CA: {
      name: "Canada",
      crisis: "1-833-456-4566",
      emergency: "911",
      text: "Text 45645",
      website: "https://talksuicide.ca/",
    },
  }

  const resource = crisisResources[country as keyof typeof crisisResources] || crisisResources.US

  return (
    <>
      {/* Floating Crisis Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-full shadow-2xl motion-safe:animate-pulse transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500/50"
        aria-label="Need help now? Access crisis resources"
      >
        <Phone className="h-5 w-5" />
        <span className="font-semibold hidden sm:inline">Need Help Now?</span>
      </button>

      {/* Crisis Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-red-600 dark:text-red-400">
              Immediate Crisis Support
            </DialogTitle>
            <DialogDescription className="text-base">
              You are not alone. Help is available right now.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Emergency Warning */}
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 p-4 rounded">
              <p className="font-semibold text-red-800 dark:text-red-300 mb-2">
                ⚠️ If you are in immediate danger
              </p>
              <p className="text-red-700 dark:text-red-400">
                Call emergency services immediately:
              </p>
              <a
                href={`tel:${resource.emergency}`}
                className="inline-block mt-2 text-2xl font-bold text-red-600 dark:text-red-400 hover:underline"
              >
                {resource.emergency}
              </a>
            </div>

            {/* Crisis Hotline */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                24/7 Crisis Support - {resource.name}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Crisis Hotline (Call)
                  </p>
                  <a
                    href={`tel:${resource.crisis.replace(/\s/g, "")}`}
                    className="text-3xl font-bold text-blue-600 dark:text-blue-400 hover:underline block"
                  >
                    {resource.crisis}
                  </a>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Crisis Text Line
                  </p>
                  <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {resource.text}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Website
                  </p>
                  <a
                    href={resource.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline break-all"
                  >
                    {resource.website}
                  </a>
                </div>
              </div>
            </div>

            {/* Different Types of Help */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
                  💔 Feeling Suicidal
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Call crisis hotline immediately. Trained counselors are available 24/7.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
                  💬 Need to Talk
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Use the text line or call the hotline. Someone will listen.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
                  👥 Worried About Someone
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Call the hotline for guidance on how to help a loved one.
                </p>
              </div>
            </div>

            {/* More Resources */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-green-900 dark:text-green-300">
                📍 More Crisis Resources
              </h4>
              <p className="text-sm text-green-800 dark:text-green-400 mb-2">
                Find crisis resources in your country:
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setIsOpen(false)
                  window.location.href = "/crisis-resources"
                }}
              >
                View Global Crisis Resources
              </Button>
            </div>

            {/* Safety Message */}
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                💚 Your life matters. This moment of pain will pass. Help is here for you.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
