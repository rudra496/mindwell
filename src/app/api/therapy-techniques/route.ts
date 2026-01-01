import { NextResponse } from 'next/server'
import therapyTechniquesData from '@/data/therapy-techniques.json'

export async function GET() {
  try {
    // Return static data wrapped in expected format
    return NextResponse.json({ techniques: therapyTechniquesData })
  } catch (error) {
    console.error('Error fetching therapy techniques:', error)
    return NextResponse.json(
      { error: 'Failed to fetch therapy techniques' },
      { status: 500 }
    )
  }
}
