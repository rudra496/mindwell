import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const disorders = await prisma.disorder.findMany({
      orderBy: { name: 'asc' }
    })
    
    return NextResponse.json(disorders)
  } catch (error) {
    console.error('Error fetching disorders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch disorders' },
      { status: 500 }
    )
  }
}
