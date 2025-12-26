import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const resources = await prisma.crisisResource.findMany({
      orderBy: { country: 'asc' }
    })
    
    return NextResponse.json(resources)
  } catch (error) {
    console.error('Error fetching crisis resources:', error)
    return NextResponse.json(
      { error: 'Failed to fetch crisis resources' },
      { status: 500 }
    )
  }
}
