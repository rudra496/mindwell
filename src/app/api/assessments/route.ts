import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const assessments = await prisma.assessment.findMany({
      orderBy: { name: 'asc' }
    })
    
    return NextResponse.json(assessments)
  } catch (error) {
    console.error('Error fetching assessments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch assessments' },
      { status: 500 }
    )
  }
}
