import { NextResponse } from 'next/server'
import advisorsData from '@/data/advisors.json'

export async function GET() {
  try {
    // Return static data (no database required)
    return NextResponse.json(advisorsData)
  } catch (error) {
    console.error('Error fetching advisors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch advisors' },
      { status: 500 }
    )
  }
}
