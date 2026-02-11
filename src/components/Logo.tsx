"use client"

interface LogoProps {
  variant?: 'full' | 'short'
  className?: string
}

/**
 * Professional text-based logo for MindWell
 * Features clean typography with calming gradient colors
 */
export function Logo({ variant = 'full', className = '' }: LogoProps) {
  if (variant === 'short') {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        aria-label="MindWell Logo"
        role="img"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#0d9488', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <text
          x="50"
          y="65"
          fontSize="56"
          fontWeight="700"
          textAnchor="middle"
          fill="url(#logoGradient)"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          MW
        </text>
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 200 60"
      className={className}
      aria-label="MindWell"
      role="img"
    >
      <defs>
        <linearGradient id="logoGradientFull" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#0d9488', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <text
        x="0"
        y="45"
        fontSize="40"
        fontWeight="700"
        fill="url(#logoGradientFull)"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        MindWell
      </text>
    </svg>
  )
}

/**
 * Favicon component - simple MW mark
 */
export function Favicon() {
  return (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="faviconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#0d9488', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <rect width="32" height="32" fill="white" />
      <text
        x="16"
        y="23"
        fontSize="18"
        fontWeight="700"
        textAnchor="middle"
        fill="url(#faviconGradient)"
        fontFamily="system-ui, sans-serif"
      >
        MW
      </text>
    </svg>
  )
}
