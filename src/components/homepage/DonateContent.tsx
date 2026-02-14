"use client"

import { Mail, Phone, MessageCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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
        <li className="flex items-start gap-2"><span className="text-teal-600 dark:text-teal-400 font-bold">✓</span><span>Keep all resources completely free</span></li>
        <li className="flex items-start gap-2"><span className="text-teal-600 dark:text-teal-400 font-bold">✓</span><span>Expand our mental health resource library</span></li>
        <li className="flex items-start gap-2"><span className="text-teal-600 dark:text-teal-400 font-bold">✓</span><span>Reach more people in need</span></li>
        <li className="flex items-start gap-2"><span className="text-teal-600 dark:text-teal-400 font-bold">✓</span><span>Develop new features and tools</span></li>
      </ul>

      <div className="mt-8 space-y-4">
        <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">Contact Us About Funding</h4>

        <Card className="p-6 border-2 dark:border-gray-700">
          <div className="space-y-3">
            <Button asChild className="w-full justify-start bg-teal-600 hover:bg-teal-700">
              <a href="mailto:contactmindwellorg@gmail.com?subject=Donation Inquiry">
                <Mail className="h-5 w-5 mr-2" /> Email: contactmindwellorg@gmail.com
              </a>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <a href="tel:+8801988223165">
                <Phone className="h-5 w-5 mr-2" /> Phone: +8801988223165
              </a>
            </Button>
            <Button asChild className="w-full justify-start bg-green-600 hover:bg-green-700">
              <a href="https://wa.me/8801988223165" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 mr-2" /> WhatsApp Funding Contact
              </a>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
