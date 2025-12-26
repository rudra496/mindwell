import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const meditations = await prisma.meditation.findMany({
      orderBy: { title: 'asc' }
    })
    
    return NextResponse.json(meditations)
  } catch (error) {
    console.error('Error fetching meditations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch meditations' },
      { status: 500 }
    )
  }
}
