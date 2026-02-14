"use client"

import { Mail, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DonateContent() {
  return (
    <div className="space-y-4">
      <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">Funding & Contact</h4>
      <div className="space-y-3">
        <Button asChild className="w-full justify-start bg-teal-600 hover:bg-teal-700">
          <a href="mailto:contactmindwellorg@gmail.com"><Mail className="h-5 w-5 mr-2" />Email: contactmindwellorg@gmail.com</a>
        </Button>
        <Button asChild variant="outline" className="w-full justify-start">
          <a href="tel:+8801988223165"><Phone className="h-5 w-5 mr-2" />Phone: +8801988223165</a>
        </Button>
        <Button asChild className="w-full justify-start bg-green-600 hover:bg-green-700">
          <a href="https://wa.me/8801988223165" target="_blank" rel="noopener noreferrer"><MessageCircle className="h-5 w-5 mr-2" />WhatsApp: https://wa.me/8801988223165</a>
        </Button>
      </div>
    </div>
  )
}
