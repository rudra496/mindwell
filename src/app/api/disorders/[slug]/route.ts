import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const disorder = await prisma.disorder.findUnique({
      where: { slug }
    })
    
    if (!disorder) {
      return NextResponse.json(
        { error: 'Disorder not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(disorder)
  } catch (error) {
    console.error('Error fetching disorder:', error)
    return NextResponse.json(
      { error: 'Failed to fetch disorder' },
      { status: 500 }
    )
  }
}
