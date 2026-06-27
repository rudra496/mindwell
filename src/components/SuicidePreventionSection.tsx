"use client"

import { AlertCircle, Phone, Heart } from "lucide-react"
import { CRISIS_BANGLADESH, CRISIS_US, EMERGENCY } from "@/lib/crisis-info"

export function SuicidePreventionSection() {
  return (
    <div className="space-y-4 mb-6">
      {/* Main Suicide Prevention Card - Prominent and First */}
      <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 border-3 border-teal-400 rounded-lg shadow-lg">
        <div className="flex items-start gap-3 mb-4">
          <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-teal-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h2 className="text-lg sm:text-xl font-bold text-teal-900 mb-2 break-words">
              Suicide Prevention & Immediate Support
            </h2>
            <p className="text-sm sm:text-base text-teal-800 mb-3">
              If you're having thoughts of suicide or self-harm, please know that help is available right now. 
              You don't have to face this alone.
            </p>
          </div>
        </div>

        {/* Emergency Instructions - FIRST AND MOST PROMINENT */}
        <div className="mb-4 p-4 bg-red-50 border-2 border-red-400 rounded-lg">
          <div className="flex items-start gap-2 sm:gap-3">
            <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-red-900 mb-2 text-sm sm:text-base">⚠️ EMERGENCY - Get Help Immediately:</p>
              <div className="space-y-1.5 text-xs sm:text-sm text-red-800">
                <p className="font-semibold">🚨 Emergency: <strong>{EMERGENCY.BD}</strong> (Bangladesh) / <strong>{EMERGENCY.US}</strong> (US), or your local emergency number</p>
                <p className="font-semibold">🇧🇩 Bangladesh: <strong>{CRISIS_BANGLADESH.organization}</strong> — <strong>{CRISIS_BANGLADESH.phone}</strong> ({CRISIS_BANGLADESH.hours})</p>
                <p className="font-semibold">🇺🇸 US: Call or text <strong>{CRISIS_US.phone}</strong> ({CRISIS_US.organization}) — 24/7</p>
                <p className="font-semibold">🏥 Go to the nearest emergency room or hospital</p>
                <p className="mt-2 font-medium">🌍 <strong>Elsewhere?</strong> Scroll down for international crisis resources</p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Medical Disclaimer */}
        <div className="mb-4 p-3 bg-amber-50 border-2 border-amber-400 rounded-lg">
          <p className="text-xs sm:text-sm text-amber-900 font-medium">
            <strong>⚕️ Important:</strong> This section provides educational information only. 
            It is NOT self-treatment and NOT a replacement for professional mental health care. 
            Emergency services and professional help are ALWAYS the first option for anyone experiencing suicidal thoughts.
          </p>
        </div>

        {/* Educational Self-Reflection Questions */}
        <div className="p-4 bg-white/80 rounded-lg border-2 border-blue-300">
          <h3 className="text-base sm:text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
            <span>📋</span>
            <span>Warning Signs & Self-Check (Educational Only)</span>
          </h3>
          
          <p className="text-xs sm:text-sm text-gray-700 mb-3 italic">
            These are educational self-reflection questions adapted from NIMH and WHO guidelines. 
            <strong> This is NOT a diagnostic tool.</strong> There is no scoring or interpretation provided.
          </p>

          <div className="space-y-3 text-sm sm:text-base text-gray-800">
            <p className="font-medium text-gray-900">Please reflect on the following:</p>
            
            <div className="space-y-2.5 ml-4">
              <div className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <p>Have you been feeling hopeless or trapped most days?</p>
              </div>
              
              <div className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <p>Have you had thoughts about harming yourself or wishing you were not alive?</p>
              </div>
              
              <div className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <p>Have you felt overwhelming emotional pain or unbearable distress?</p>
              </div>
              
              <div className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <p>Have you withdrawn completely from friends, family, or daily activities?</p>
              </div>
              
              <div className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <p>Have you experienced sudden mood changes after prolonged distress?</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-300 rounded">
              <p className="text-sm font-semibold text-blue-900 mb-2">
                If you answered "yes" to any of these questions:
              </p>
              <p className="text-xs sm:text-sm text-blue-800">
                <strong>Please reach out for help immediately.</strong> These warning signs suggest you may benefit 
                from professional support. Contact emergency services, a crisis hotline, or go to your nearest 
                hospital emergency room. Help is available, and you don't have to face this alone.
              </p>
            </div>
          </div>
        </div>

        {/* After Questions - Emergency Instructions Repeated */}
        <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-400 rounded-lg">
          <h3 className="text-base sm:text-lg font-bold text-red-900 mb-3 flex items-center gap-2">
            <Phone className="h-5 w-5" />
            <span>Get Help Right Now</span>
          </h3>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm sm:text-base font-bold text-red-900 mb-2">🚨 Emergency Services (Life-Threatening Situations):</p>
              <ul className="space-y-1 text-xs sm:text-sm text-red-800 ml-4">
                <li>• <strong>Call 911</strong> (US) or your local emergency number</li>
                <li>• <strong>Go to the nearest emergency room</strong> - They can help you right now</li>
              </ul>
            </div>

            <div>
              <p className="text-sm sm:text-base font-bold text-red-900 mb-2">☎️ Crisis Hotlines (Free, 24/7, Confidential):</p>
              <ul className="space-y-1 text-xs sm:text-sm text-red-800 ml-4">
                <li>• Bangladesh: <strong>{CRISIS_BANGLADESH.organization}</strong> — <strong>{CRISIS_BANGLADESH.phone}</strong> ({CRISIS_BANGLADESH.hours})</li>
                <li>• US: <strong>{CRISIS_US.phone}</strong> — {CRISIS_US.organization} (call or text)</li>
                <li>• See full list of international crisis resources below</li>
              </ul>
            </div>

            <div className="mt-3 p-3 bg-green-50 border border-green-400 rounded">
              <p className="text-sm font-semibold text-green-900 mb-1">🏥 Bangladesh Low-Cost Services:</p>
              <p className="text-xs sm:text-sm text-green-800">
                Government hospitals offer mental health services for approximately BDT 10. 
                Scroll down to see the complete list of facilities and locations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bangla Translation Section */}
      <div className="p-4 sm:p-6 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 border-3 border-cyan-400 rounded-lg shadow-lg">
        <div className="flex items-start gap-3 mb-4">
          <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h2 className="text-lg sm:text-xl font-bold text-cyan-900 mb-2 break-words">
              আত্মহত্যা প্রতিরোধ ও অবিলম্বে সহায়তা
            </h2>
            <p className="text-sm sm:text-base text-cyan-800 mb-3">
              যদি আপনার আত্মহত্যা বা আত্ম-ক্ষতির চিন্তা থাকে, তবে জেনে রাখুন যে এখনই সাহায্য পাওয়া যায়। 
              আপনাকে একা এটির মুখোমুখি হতে হবে না।
            </p>
          </div>
        </div>

        {/* Bangla Emergency Instructions */}
        <div className="mb-4 p-4 bg-red-50 border-2 border-red-400 rounded-lg">
          <div className="flex items-start gap-2 sm:gap-3">
            <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-red-900 mb-2 text-sm sm:text-base">⚠️ জরুরী - অবিলম্বে সাহায্য নিন:</p>
              <div className="space-y-1.5 text-xs sm:text-sm text-red-800">
                <p className="font-semibold">🚨 <strong>999 কল করুন</strong> (বাংলাদেশ জরুরী সেবা)</p>
                <p className="font-semibold">🏥 নিকটস্থ জরুরী বিভাগ বা হাসপাতালে যান</p>
                <p className="font-semibold">☎️ জাতীয় মানসিক স্বাস্থ্য ইনস্টিটিউট (NIMH): +880-2-9004850</p>
                <p className="mt-2 font-medium">📋 নিচে স্বল্পমূল্যের সরকারি হাসপাতালের তালিকা দেখুন</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bangla Medical Disclaimer */}
        <div className="mb-4 p-3 bg-amber-50 border-2 border-amber-400 rounded-lg">
          <p className="text-xs sm:text-sm text-amber-900 font-medium">
            <strong>⚕️ গুরুত্বপূর্ণ:</strong> এই বিভাগটি শুধুমাত্র শিক্ষামূলক তথ্য প্রদান করে। 
            এটি স্ব-চিকিৎসা নয় এবং পেশাদার মানসিক স্বাস্থ্য সেবার বিকল্প নয়। 
            আত্মহত্যার চিন্তা অনুভব করা যে কারো জন্য জরুরী সেবা এবং পেশাদার সাহায্য সর্বদা প্রথম বিকল্প।
          </p>
        </div>

        {/* Bangla Warning Signs */}
        <div className="p-4 bg-white/80 rounded-lg border-2 border-cyan-300">
          <h3 className="text-base sm:text-lg font-bold text-cyan-900 mb-3 flex items-center gap-2">
            <span>📋</span>
            <span>সতর্কতা লক্ষণ ও স্ব-পরীক্ষা (শুধুমাত্র শিক্ষামূলক)</span>
          </h3>
          
          <p className="text-xs sm:text-sm text-gray-700 mb-3 italic">
            এগুলি শিক্ষামূলক আত্ম-প্রতিফলন প্রশ্ন। <strong>এটি একটি নির্ণয় সরঞ্জাম নয়।</strong> কোনো স্কোরিং বা ব্যাখ্যা প্রদান করা হয় না।
          </p>

          <div className="space-y-3 text-sm sm:text-base text-gray-800">
            <p className="font-medium text-gray-900">অনুগ্রহ করে নিম্নলিখিত বিষয়ে চিন্তা করুন:</p>
            
            <div className="space-y-2.5 ml-4">
              <div className="flex gap-2">
                <span className="text-cyan-600 font-bold">•</span>
                <p>আপনি কি বেশিরভাগ দিন নিরাশ বা আটকা পড়া অনুভব করেছেন?</p>
              </div>
              
              <div className="flex gap-2">
                <span className="text-cyan-600 font-bold">•</span>
                <p>আপনার কি নিজেকে ক্ষতি করার বা জীবিত না থাকার ইচ্ছা হয়েছে?</p>
              </div>
              
              <div className="flex gap-2">
                <span className="text-cyan-600 font-bold">•</span>
                <p>আপনি কি অপ্রতিরোধ্য মানসিক যন্ত্রণা বা অসহনীয় কষ্ট অনুভব করেছেন?</p>
              </div>
              
              <div className="flex gap-2">
                <span className="text-cyan-600 font-bold">•</span>
                <p>আপনি কি বন্ধু, পরিবার বা দৈনন্দিন কার্যকলাপ থেকে সম্পূর্ণভাবে সরে গেছেন?</p>
              </div>
              
              <div className="flex gap-2">
                <span className="text-cyan-600 font-bold">•</span>
                <p>দীর্ঘস্থায়ী কষ্টের পরে আপনি কি হঠাৎ মেজাজের পরিবর্তন অনুভব করেছেন?</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-cyan-50 border border-cyan-300 rounded">
              <p className="text-sm font-semibold text-cyan-900 mb-2">
                যদি আপনি এই প্রশ্নগুলির যেকোনো একটিতে "হ্যাঁ" উত্তর দেন:
              </p>
              <p className="text-xs sm:text-sm text-cyan-800">
                <strong>অনুগ্রহ করে অবিলম্বে সাহায্যের জন্য যোগাযোগ করুন।</strong> এই সতর্কতা লক্ষণগুলি পরামর্শ দেয় 
                যে আপনি পেশাদার সহায়তা থেকে উপকৃত হতে পারেন। জরুরী সেবা, একটি ক্রাইসিস হটলাইন, 
                অথবা আপনার নিকটতম হাসপাতালের জরুরী বিভাগে যোগাযোগ করুন। সাহায্য পাওয়া যায়, এবং আপনাকে একা এটির মুখোমুখি হতে হবে না।
              </p>
            </div>
          </div>
        </div>

        {/* Bangla - After Questions Emergency Instructions */}
        <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-400 rounded-lg">
          <h3 className="text-base sm:text-lg font-bold text-red-900 mb-3 flex items-center gap-2">
            <Phone className="h-5 w-5" />
            <span>এখনই সাহায্য পান</span>
          </h3>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm sm:text-base font-bold text-red-900 mb-2">🚨 জরুরী সেবা (জীবন-হুমকিমূলক পরিস্থিতি):</p>
              <ul className="space-y-1 text-xs sm:text-sm text-red-800 ml-4">
                <li>• <strong>999 কল করুন</strong> (বাংলাদেশ জরুরী নম্বর)</li>
                <li>• <strong>নিকটস্থ জরুরী বিভাগে যান</strong> - তারা এখনই আপনাকে সাহায্য করতে পারে</li>
              </ul>
            </div>

            <div>
              <p className="text-sm sm:text-base font-bold text-red-900 mb-2">🏥 স্বল্পমূল্যের সরকারি সেবা:</p>
              <ul className="space-y-1 text-xs sm:text-sm text-red-800 ml-4">
                <li>• জাতীয় মানসিক স্বাস্থ্য ইনস্টিটিউট (NIMH), ঢাকা</li>
                <li>• ঢাকা মেডিকেল কলেজ হাসপাতাল</li>
                <li>• স্যার সলিমুল্লাহ মেডিকেল কলেজ (মিটফোর্ড)</li>
                <li>• চট্টগ্রাম মেডিকেল কলেজ হাসপাতাল</li>
                <li>• পাবনা মানসিক হাসপাতাল</li>
                <li className="mt-1 font-medium">প্রায় ১০ টাকা টিকিট ফি - নিচে সম্পূর্ণ তথ্য এবং ম্যাপ লিঙ্ক দেখুন</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
