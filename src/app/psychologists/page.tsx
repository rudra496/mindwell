"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  GraduationCap, 
  Award, 
  Languages, 
  Heart, 
  Mail, 
  Shield,
  CheckCircle2,
  Brain
} from "lucide-react"
import Link from "next/link"

export default function PsychologistsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-teal-900 dark:text-teal-400 mb-4">
          Access to Psychologists
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Now Available - Professional Mental Health Support
        </p>
      </div>

      {/* Free Sessions Badge - Prominent */}
      <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg border-2 border-green-500 dark:border-green-700">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">🇧🇩</span>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            For Bangladeshi University Students
          </h2>
        </div>
        <p className="text-lg text-gray-800 dark:text-gray-200 mb-2">
          <strong>2 Completely Free Counseling Sessions</strong> - No payment required
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Currently offering pro-bono sessions to Bangladeshi university students. All sessions strictly confidential.
        </p>
      </div>

      {/* Psychologist Profile Card */}
      <Card className="mb-8 border-2 border-teal-200 dark:border-teal-800 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Profile Picture Placeholder (Initials Avatar) */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
              MRT
            </div>
            
            {/* Name and Credentials */}
            <div className="text-center sm:text-left flex-1">
              <CardTitle className="text-3xl sm:text-4xl font-bold text-teal-900 dark:text-teal-300 mb-2">
                Md. Rifat Hasan Tarofder
              </CardTitle>
              <Badge className="bg-teal-600 text-white hover:bg-teal-700 text-sm px-3 py-1 mb-3">
                <Shield className="h-4 w-4 mr-1" />
                Licensed Psychologist
              </Badge>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                M.Sc. Clinical Psychology, University of Dhaka
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Credentials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <GraduationCap className="h-6 w-6 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">Education</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  M.Sc. Clinical Psychology<br/>
                  University of Dhaka
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Award className="h-6 w-6 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">Training</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Cognitive Behavioral Therapy (CBT)<br/>
                  Dialectical Behavior Therapy (DBT)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <CheckCircle2 className="h-6 w-6 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">Experience</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  5+ years clinical experience
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Languages className="h-6 w-6 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">Languages</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Bengali (বাংলা), English
                </p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
              <User className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              About
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Licensed psychologist offering pro-bono counseling to Bangladeshi university students. 
              Committed to providing compassionate, evidence-based mental health support to help students 
              navigate academic stress, anxiety, depression, and other mental health challenges.
            </p>
          </div>

          {/* Specializations */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <Brain className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              Specializations
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Anxiety Disorders",
                "Depression",
                "Trauma & PTSD",
                "Student Mental Health",
                "Academic Stress",
                "Relationship Issues"
              ].map((spec) => (
                <Badge key={spec} variant="outline" className="text-sm px-3 py-1">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>

          {/* Request Session Button */}
          <Link href="/request-session">
            <Button 
              className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-lg py-6"
            >
              <Mail className="h-5 w-5 mr-2" />
              Request a Session
            </Button>
          </Link>

          {/* Confidentiality Note */}
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-900 dark:text-blue-300 flex items-start gap-2">
              <Shield className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Strict Confidentiality:</strong> All sessions are completely confidential and follow 
                professional ethical guidelines. Your privacy and trust are our top priorities.
              </span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Future Psychologists Section */}
      <Card className="border-2 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Heart className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            More Psychologists Being Onboarded
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We are actively expanding our network of licensed mental health professionals to serve more communities. 
            If you are a licensed psychologist, counselor, or therapist interested in volunteering or partnering 
            with MindWell, please get in touch.
          </p>
          <a 
            href="mailto:rudrasarker125@gmail.com?subject=Interest in Joining MindWell Mental Health Team" 
            className="text-teal-600 dark:text-teal-400 hover:underline font-medium"
          >
            Contact us: rudrasarker125@gmail.com
          </a>
        </CardContent>
      </Card>

      {/* Response Time Commitment */}
      <div className="mt-6 text-center">
        <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
          <Mail className="h-5 w-5" />
          📨 We respond to all inquiries within 48 hours.
        </p>
      </div>
    </div>
  )
}
