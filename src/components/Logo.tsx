"use client"

import Image from "next/image"

interface LogoProps {
  variant?: 'full' | 'short'
  className?: string
}

export function Logo({ variant = 'full', className = '' }: LogoProps) {
  if (variant === 'short') {
    return (
      <Image
        src="/images/Mindwell.jpg"
        alt="MindWell Logo"
        width={48}
        height={48}
        className={`rounded-md ${className}`}
      />
    )
  }

  return (
    <Image
      src="/images/Mindwell.jpg"
      alt="MindWell"
      width={180}
      height={56}
      className={`h-auto w-auto rounded-md ${className}`}
      priority
    />
  )
}

export function Favicon() {
  return (
    <Image
      src="/images/Mindwell.jpg"
      alt="MindWell favicon"
      width={32}
      height={32}
      className="rounded"
    />
  )
}
