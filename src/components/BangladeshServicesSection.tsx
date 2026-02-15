"use client"

import { Globe, Phone } from "lucide-react"

const verifiedBangladeshResources = [
  {
    name: "National Institute of Mental Health (NIMH), Dhaka",
    phone: "+880-2-9004850",
    availability: "Government hours",
    website: "https://nimh.gov.bd"
  },
  {
    name: "Dhaka Medical College Hospital",
    phone: "+880-2-55165088",
    availability: "Government hours",
    website: "https://www.dmch.gov.bd"
  },
  {
    name: "Sir Salimullah Medical College (Mitford Hospital)",
    phone: "+880-2-7391002",
    availability: "Government hours",
    website: ""
  },
  {
    name: "Chittagong Medical College Hospital",
    phone: "+880-31-2502963",
    availability: "Government hours",
    website: "https://www.cmch.gov.bd"
  },
  {
    name: "Pabna Mental Hospital",
    phone: "+880-731-65424",
    availability: "Government hours",
    website: ""
  }
]

export function BangladeshServicesSection() {
  return (
    <section
      className="mb-12 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-2xl p-8 border-2 border-green-200 dark:border-green-800 transition-colors"
      id="bangladesh-services"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-900 dark:text-green-300 mb-3">
          Free Resources in Bangladesh 🇧🇩
        </h2>
        <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto text-lg">
          Verified public-sector mental health institutions in Bangladesh.
        </p>
      </div>

      <div className="bg-white/85 dark:bg-slate-800/80 rounded-xl p-6 border border-green-200 dark:border-green-800 transition-colors">
        <h3 className="font-bold text-green-900 dark:text-green-300 mb-4 text-xl">
          Government and Reputable Institutions
        </h3>
        <div className="space-y-4">
          {verifiedBangladeshResources.map((resource) => (
            <article key={resource.name} className="p-4 bg-green-50 dark:bg-slate-900/50 rounded-lg border border-green-100 dark:border-green-900 transition-colors">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-lg mb-2">
                {resource.name}
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-base mb-1">
                <span className="font-medium">Phone:</span>{" "}
                <a href={`tel:${resource.phone}`} className="text-green-700 dark:text-green-400 hover:underline inline-flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {resource.phone}
                </a>
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-base mb-1">
                <span className="font-medium">Availability:</span> {resource.availability}
              </p>
              {resource.website && (
                <p className="text-gray-700 dark:text-gray-300 text-base break-all">
                  <span className="font-medium">Website:</span>{" "}
                  <a
                    href={resource.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 dark:text-teal-400 hover:underline inline-flex items-center gap-1"
                  >
                    <Globe className="h-4 w-4" />
                    {resource.website}
                  </a>
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
