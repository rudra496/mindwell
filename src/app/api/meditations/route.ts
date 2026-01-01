import { NextResponse } from 'next/server'
import meditationsData from '@/data/meditations.json'

export async function GET() {
  try {
    // Return static data wrapped in expected format
    return NextResponse.json({ meditations: meditationsData })
  } catch (error) {
    console.error('Error fetching meditations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch meditations' },
      { status: 500 }
    )
  }
}
