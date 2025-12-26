import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const techniques = await prisma.therapyTechnique.findMany({
      orderBy: { name: 'asc' }
    })
    
    return NextResponse.json(techniques)
  } catch (error) {
    console.error('Error fetching therapy techniques:', error)
    return NextResponse.json(
      { error: 'Failed to fetch therapy techniques' },
      { status: 500 }
    )
  }
}
