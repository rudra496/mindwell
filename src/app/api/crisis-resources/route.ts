import { NextResponse } from 'next/server'
import crisisResourcesData from '@/data/crisis-resources.json'

export async function GET() {
  try {
    // Return static data (no database required)
    return NextResponse.json(crisisResourcesData)
  } catch (error) {
    console.error('Error fetching crisis resources:', error)
    return NextResponse.json(
      { error: 'Failed to fetch crisis resources' },
      { status: 500 }
    )
  }
}
