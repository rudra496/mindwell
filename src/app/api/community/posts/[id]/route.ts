import { NextResponse } from 'next/server'

// This API route is for demonstration/compatibility only
// The community feature uses client-side IndexedDB storage
// See /src/lib/indexeddb.ts for implementation

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params
  
  return NextResponse.json({
    note: 'Community uses client-side storage',
    message: 'Post details are retrieved from IndexedDB in the browser',
    postId: params.id
  })
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params
  const body = await request.json()
  
  return NextResponse.json({
    success: true,
    note: 'Updates are handled client-side via IndexedDB',
    postId: params.id,
    action: body.action
  })
}
