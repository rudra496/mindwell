import { NextResponse } from 'next/server'
import assessmentsData from '@/data/assessments.json'

export async function GET() {
  try {
    // Return static data (no database required)
    return NextResponse.json(assessmentsData)
  } catch (error) {
    console.error('Error fetching assessments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch assessments' },
      { status: 500 }
    )
  }
}
