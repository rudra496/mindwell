"use client"

import { Mail, Phone } from "lucide-react"
import { Card } from "@/components/ui/card"

/**
 * Section 12: Donate / Provide Funding
 */
export function DonateContent() {
  return (
    <div className="space-y-6">
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Help us continue providing <strong>free mental health support</strong> to people worldwide. Your donation helps us:
      </p>

      <ul className="space-y-2 text-gray-600 dark:text-gray-400">
        <li className="flex items-start gap-2">
          <span className="text-teal-600 dark:text-teal-400 font-bold">✓</span>
          <span>Keep all resources completely free</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-teal-600 dark:text-teal-400 font-bold">✓</span>
          <span>Expand our mental health resource library</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-teal-600 dark:text-teal-400 font-bold">✓</span>
          <span>Reach more people in need</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-teal-600 dark:text-teal-400 font-bold">✓</span>
          <span>Develop new features and tools</span>
        </li>
      </ul>

      <div className="mt-8 space-y-4">
        <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Contact Us About Funding
        </h4>

        <Card className="p-6 border-2 dark:border-gray-700">
          <div className="space-y-4">
            {/* Email Contact */}
            <a
              href="mailto:contactmindwellorg@gmail.com?subject=Donation Inquiry"
              className="flex items-center gap-3 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-teal-600 dark:bg-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Email Us</p>
                <p className="text-sm text-teal-600 dark:text-teal-400">contactmindwellorg@gmail.com</p>
              </div>
            </a>

            {/* Phone Placeholder */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg opacity-60">
              <div className="w-12 h-12 rounded-full bg-gray-400 dark:bg-gray-600 flex items-center justify-center">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Phone</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Phone number will be added soon</p>
              </div>
            </div>
          </div>
        </Card>

        <p className="text-sm text-gray-600 dark:text-gray-400 italic">
          For NGOs and organizations interested in providing funding or partnership opportunities
        </p>
      </div>
    </div>
  )
}
