import { NextResponse } from 'next/server'
import disordersData from '@/data/disorders.json'

export async function GET() {
  try {
    // Return static data (no database required)
    return NextResponse.json(disordersData)
  } catch (error) {
    console.error('Error fetching disorders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch disorders' },
      { status: 500 }
    )
  }
}
