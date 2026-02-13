"use client"

/**
 * Animated gradient background for hero section
 * Features slow, calming wave motion suitable for mental health platform
 */
export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Primary gradient layer */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-teal-100 via-indigo-100 to-emerald-100 dark:from-teal-900/30 dark:via-indigo-900/30 dark:to-emerald-900/30 animate-gradient-slow"
        style={{
          backgroundSize: '400% 400%',
        }}
      />
      
      {/* Overlay abstract shapes */}
      <div className="absolute inset-0">
        {/* Top-left wave */}
        <div 
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-teal-200/30 to-transparent dark:from-teal-600/20 dark:to-transparent rounded-full blur-3xl animate-float-slow"
          style={{ animationDelay: '0s' }}
        />
        
        {/* Top-right wave */}
        <div 
          className="absolute top-20 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-200/30 to-transparent dark:from-indigo-600/20 dark:to-transparent rounded-full blur-3xl animate-float-slow"
          style={{ animationDelay: '2s' }}
        />
        
        {/* Bottom wave */}
        <div 
          className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-tr from-emerald-200/30 to-transparent dark:from-emerald-600/20 dark:to-transparent rounded-full blur-3xl animate-float-slow"
          style={{ animationDelay: '4s' }}
        />
        
        {/* Center accent */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-200/20 to-pink-200/20 dark:from-purple-600/10 dark:to-pink-600/10 rounded-full blur-3xl animate-pulse-gentle"
        />
      </div>
    </div>
  )
}
