import { NextResponse } from 'next/server'

// This API route is for demonstration/compatibility only
// The community feature uses client-side IndexedDB storage
// See /src/lib/indexeddb.ts for implementation

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const body = await request.json()
    const { content } = body
    
    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      )
    }
    
    return NextResponse.json({
      success: true,
      note: 'Comments are stored client-side via IndexedDB',
      postId: params.id
    })
  } catch (error) {
    console.error('Error in community comments:', error)
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}
