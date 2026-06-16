"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, Mail, AlertCircle, Loader2 } from "lucide-react"

export default function RequestSessionPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    isBangladeshiStudent: "",
    universityName: "",
    primaryConcern: "",
    sessionFormat: "",
    message: ""
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.isBangladeshiStudent) {
      newErrors.isBangladeshiStudent = "Please select an option"
    }

    if (formData.isBangladeshiStudent === "yes" && !formData.universityName) {
      newErrors.universityName = "University name is required for Bangladeshi students"
    }

    if (!formData.primaryConcern) {
      newErrors.primaryConcern = "Please select a primary concern"
    }

    if (!formData.sessionFormat) {
      newErrors.sessionFormat = "Please select a session format"
    }

    if (formData.message.length > 500) {
      newErrors.message = "Message must be 500 characters or less"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitError("")

    try {
      // Build mailto link for client-side session request (static deployment)
      const concernLabels: Record<string, string> = {
        anxiety: "Anxiety", depression: "Depression", trauma: "Trauma",
        relationship: "Relationship Issues", academic: "Academic Stress", other: "Other"
      }
      const formatLabels: Record<string, string> = {
        video: "Video Call", audio: "Audio Call", text: "Text Chat"
      }
      const subject = encodeURIComponent(`[MindWell] Session Request from ${formData.fullName || formData.email}`)
      const body = encodeURIComponent(
        `Name: ${formData.fullName || "Not provided"}\nEmail: ${formData.email}\nBangladeshi Student: ${formData.isBangladeshiStudent === "yes" ? "Yes" : "No"}${formData.isBangladeshiStudent === "yes" ? `\nUniversity: ${formData.universityName}` : ""}\nPrimary Concern: ${concernLabels[formData.primaryConcern] || formData.primaryConcern}\nPreferred Format: ${formatLabels[formData.sessionFormat] || formData.sessionFormat}\n${formData.message ? `\nMessage:\n${formData.message}` : ""}`
      )
      window.open(`mailto:contactmindwellorg@gmail.com?subject=${subject}&body=${body}`, '_blank')

      setSubmitSuccess(true)
      setFormData({
        fullName: "",
        email: "",
        isBangladeshiStudent: "",
        universityName: "",
        primaryConcern: "",
        sessionFormat: "",
        message: ""
      })
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitError(error instanceof Error ? error.message : "Failed to submit request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-teal-900 dark:text-teal-400 mb-4">
          Request a Counseling Session
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Connect with licensed psychologist Md. Rifat Hasan Tarofder
        </p>
      </div>

      {/* Free Sessions Badge */}
      <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg border-2 border-green-500 dark:border-green-700">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">🇧🇩</span>
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            For Bangladeshi University Students
          </h2>
        </div>
        <p className="text-gray-800 dark:text-gray-200">
          <strong>2 Completely Free Counseling Sessions</strong> - No payment required. All sessions strictly confidential.
        </p>
      </div>

      {/* 48-Hour Response Commitment */}
      <Alert className="mb-6">
        <Mail className="h-4 w-4" />
        <AlertDescription>
          📨 We respond to all inquiries within 48 hours. You will receive a response at your email address.
        </AlertDescription>
      </Alert>

      {/* Success Message */}
      {submitSuccess && (
        <Alert className="mb-6 border-green-500 bg-green-50 dark:bg-green-900/20">
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-900 dark:text-green-300">
            <strong>✅ Your request has been sent successfully.</strong><br />
            You will receive a response within 48 hours at your email address. Please check your spam folder if you don't see our reply.
          </AlertDescription>
        </Alert>
      )}

      {/* Error Message */}
      {submitError && (
        <Alert className="mb-6 border-red-500 bg-red-50 dark:bg-red-900/20">
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
          <AlertDescription className="text-red-900 dark:text-red-300">
            {submitError}
          </AlertDescription>
        </Alert>
      )}

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Session Request Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name (Optional) */}
            <div>
              <Label htmlFor="fullName">Full Name (Optional)</Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Your name"
                className="mt-2"
              />
            </div>

            {/* Email (Required) */}
            <div>
              <Label htmlFor="email" className="required">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                required
                className="mt-2"
              />
              {errors.email && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Are you a Bangladeshi university student? */}
            <div>
              <Label className="required">
                Are you a Bangladeshi university student? <span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                value={formData.isBangladeshiStudent}
                onValueChange={(value) => setFormData({ ...formData, isBangladeshiStudent: value })}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="student-yes" />
                  <Label htmlFor="student-yes" className="font-normal">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="student-no" />
                  <Label htmlFor="student-no" className="font-normal">No</Label>
                </div>
              </RadioGroup>
              {errors.isBangladeshiStudent && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.isBangladeshiStudent}</p>
              )}
            </div>

            {/* University Name (Conditional) */}
            {formData.isBangladeshiStudent === "yes" && (
              <div>
                <Label htmlFor="universityName" className="required">
                  University Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="universityName"
                  type="text"
                  value={formData.universityName}
                  onChange={(e) => setFormData({ ...formData, universityName: e.target.value })}
                  placeholder="e.g., University of Dhaka"
                  className="mt-2"
                />
                {errors.universityName && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.universityName}</p>
                )}
              </div>
            )}

            {/* Primary Concern */}
            <div>
              <Label htmlFor="primaryConcern" className="required">
                Primary Concern <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.primaryConcern}
                onValueChange={(value) => setFormData({ ...formData, primaryConcern: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select a concern" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="anxiety">Anxiety</SelectItem>
                  <SelectItem value="depression">Depression</SelectItem>
                  <SelectItem value="trauma">Trauma</SelectItem>
                  <SelectItem value="relationship">Relationship Issues</SelectItem>
                  <SelectItem value="academic">Academic Stress</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.primaryConcern && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.primaryConcern}</p>
              )}
            </div>

            {/* Preferred Session Format */}
            <div>
              <Label className="required">
                Preferred Session Format <span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                value={formData.sessionFormat}
                onValueChange={(value) => setFormData({ ...formData, sessionFormat: value })}
                className="mt-2 space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="video" id="format-video" />
                  <Label htmlFor="format-video" className="font-normal">Video Call</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="audio" id="format-audio" />
                  <Label htmlFor="format-audio" className="font-normal">Audio Call</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="text" id="format-text" />
                  <Label htmlFor="format-text" className="font-normal">Text Chat</Label>
                </div>
              </RadioGroup>
              {errors.sessionFormat && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.sessionFormat}</p>
              )}
            </div>

            {/* Message (Optional) */}
            <div>
              <Label htmlFor="message">
                Message (Optional, max 500 characters)
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Any additional information you'd like to share..."
                maxLength={500}
                rows={4}
                className="mt-2"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {formData.message.length}/500 characters
              </p>
              {errors.message && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-lg py-6"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Sending Request...
                </>
              ) : (
                <>
                  <Mail className="h-5 w-5 mr-2" />
                  Submit Request
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Privacy Notice */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-900 dark:text-blue-300">
          <strong>Privacy & Confidentiality:</strong> We do NOT store your personal information in any database. 
          Your request is sent directly via email to our licensed psychologist. All communications are strictly confidential 
          and follow professional ethical guidelines.
        </p>
      </div>

      {/* 48-Hour Response (Bottom) */}
      <div className="mt-4 text-center">
        <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
          <Mail className="h-5 w-5" />
          📨 We respond to all inquiries within 48 hours.
        </p>
      </div>
    </div>
  )
}
