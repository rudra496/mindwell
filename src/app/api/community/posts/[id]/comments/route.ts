import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { generateAnonymousUsername } from '@/lib/community'

// POST: Add comment/reply
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
    
    // Verify post exists
    const post = await prisma.communityPost.findUnique({
      where: { id: params.id }
    })
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }
    
    // Generate anonymous username for commenter
    const username = generateAnonymousUsername()
    
    // Create reply
    const reply = await prisma.communityReply.create({
      data: {
        postId: params.id,
        content,
        username
      }
    })
    
    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Error creating comment:', error)
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}
