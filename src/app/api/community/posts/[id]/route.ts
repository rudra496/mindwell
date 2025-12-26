import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET: Get post details with replies
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const post = await prisma.communityPost.findUnique({
      where: { id: params.id },
      include: {
        replies: {
          orderBy: { createdAt: 'asc' }
        }
      }
    })
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ post })
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

// PATCH: Update post (upvote, etc.)
export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const body = await request.json()
    const { action } = body
    
    if (action === 'upvote') {
      const post = await prisma.communityPost.update({
        where: { id: params.id },
        data: {
          likes: { increment: 1 }
        }
      })
      return NextResponse.json({ post })
    }
    
    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}
