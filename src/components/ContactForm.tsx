"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Send, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { useLanguage } from "@/lib/useLanguage"
import { tKey } from "@/lib/i18n"

interface FormData {
  name: string
  email: string
  reason: string
  preferredTime: string
  message: string
}

export function ContactForm() {
  const { language } = useLanguage()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    reason: "",
    preferredTime: "",
    message: ""
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setStatus("idle")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus("idle")
    setErrorMessage("")

    // Validate form
    if (!formData.name || !formData.email || !formData.reason || !formData.message) {
      setStatus("error")
      setErrorMessage(tKey('contactForm.errors.required', language))
      setLoading(false)
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setStatus("error")
      setErrorMessage(tKey('contactForm.errors.email', language))
      setLoading(false)
      return
    }

    try {
      // Call API to send email
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus("success")
        // Reset form
        setFormData({
          name: "",
          email: "",
          reason: "",
          preferredTime: "",
          message: ""
        })
      } else {
        setStatus("error")
        setErrorMessage(data.error || tKey('contactForm.errors.sendFailed', language))
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setStatus("error")
      setErrorMessage(tKey('contactForm.errors.generic', language))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-3xl mx-auto border-2 border-teal-200 dark:border-teal-800 shadow-lg">
      <CardHeader className="space-y-1 bg-gradient-to-r from-teal-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900">
        <CardTitle className="text-2xl sm:text-3xl font-bold text-center flex items-center justify-center gap-2">
          <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-teal-600 dark:text-teal-400" />
          {tKey('contactForm.title', language)}
        </CardTitle>
        <CardDescription className="text-center text-sm sm:text-base">
          {tKey('contactForm.description', language)}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              {tKey('contactForm.name', language)} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder={tKey('contactForm.namePlaceholder', language)}
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              {tKey('contactForm.email', language)} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={tKey('contactForm.emailPlaceholder', language)}
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full"
              required
            />
          </div>

          {/* Reason for Contact */}
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-sm font-medium">
              {tKey('contactForm.reason', language)} <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.reason} onValueChange={(value) => handleChange("reason", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={tKey('contactForm.reasonPlaceholder', language)} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="psychologist">
                  {tKey('contactForm.reasonOptions.psychologist', language)}
                </SelectItem>
                <SelectItem value="service-request">
                  {tKey('contactForm.reasonOptions.serviceRequest', language)}
                </SelectItem>
                <SelectItem value="general-inquiry">
                  {tKey('contactForm.reasonOptions.generalInquiry', language)}
                </SelectItem>
                <SelectItem value="feedback">
                  {tKey('contactForm.reasonOptions.feedback', language)}
                </SelectItem>
                <SelectItem value="partnership">
                  {tKey('contactForm.reasonOptions.partnership', language)}
                </SelectItem>
                <SelectItem value="other">
                  {tKey('contactForm.reasonOptions.other', language)}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Preferred Time */}
          <div className="space-y-2">
            <Label htmlFor="preferredTime" className="text-sm font-medium">
              {tKey('contactForm.preferredTime', language)}
            </Label>
            <Input
              id="preferredTime"
              type="text"
              placeholder={tKey('contactForm.preferredTimePlaceholder', language)}
              value={formData.preferredTime}
              onChange={(e) => handleChange("preferredTime", e.target.value)}
              className="w-full"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium">
              {tKey('contactForm.message', language)} <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              placeholder={tKey('contactForm.messagePlaceholder', language)}
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className="w-full min-h-[120px]"
              required
            />
          </div>

          {/* Status Messages */}
          {status === "success" && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-800 dark:text-green-300">
                {tKey('contactForm.success', language)}
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-lg flex items-start gap-3">
              <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800 dark:text-red-300">{errorMessage}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white font-semibold py-6 transition-all hover:scale-[1.02]"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {tKey('contactForm.sending', language)}
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                {tKey('contactForm.submit', language)}
              </>
            )}
          </Button>
        </form>

        {/* Additional Info */}
        <div className="pt-4 border-t dark:border-gray-700">
          <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
            {tKey('contactForm.privacyNote', language)}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
