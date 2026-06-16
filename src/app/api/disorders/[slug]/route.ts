import { NextResponse } from 'next/server'
import disordersData from '@/data/disorders.json'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    // Find disorder in static data
    const disorder = disordersData.find((d: any) => d.slug === slug)
    
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
