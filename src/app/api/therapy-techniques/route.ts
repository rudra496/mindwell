import { NextResponse } from 'next/server'
import therapyTechniquesData from '@/data/therapy-techniques.json'

export async function GET() {
  try {
    // Return static data (no database required)
    return NextResponse.json(therapyTechniquesData)
  } catch (error) {
    console.error('Error fetching therapy techniques:', error)
    return NextResponse.json(
      { error: 'Failed to fetch therapy techniques' },
      { status: 500 }
    )
  }
}
