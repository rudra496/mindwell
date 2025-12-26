import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { generateAnonymousUsername, detectCrisisLanguage } from '@/lib/community'

// GET: List posts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const page = parseInt(searchParams.get('page') || '1')
    const perPage = Math.min(parseInt(searchParams.get('perPage') || '20'), 50)
    const skip = (page - 1) * perPage
    
    const where = category ? { category } : {}
    
    const [posts, total] = await Promise.all([
      prisma.communityPost.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: perPage,
        include: {
          _count: {
            select: { replies: true }
          }
        }
      }),
      prisma.communityPost.count({ where })
    ])
    
    return NextResponse.json({
      posts,
      pagination: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage)
      }
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

// POST: Create new post
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, content, category, triggerWarnings } = body
    
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }
    
    // Generate anonymous username
    const username = generateAnonymousUsername()
    
    // Detect crisis language
    const hasCrisisLanguage = detectCrisisLanguage(`${title} ${content}`)
    
    // Create post
    const post = await prisma.communityPost.create({
      data: {
        title,
        content,
        category: category || 'General',
        username,
        hasWarning: triggerWarnings || hasCrisisLanguage,
        warningText: triggerWarnings || (hasCrisisLanguage ? 'Crisis/Self-Harm Discussion' : null)
      }
    })
    
    // If crisis language detected, return crisis resources
    if (hasCrisisLanguage) {
      return NextResponse.json({
        post,
        crisisDetected: true,
        crisisResources: {
          message: 'We detected language that suggests you may be in crisis. Please reach out for help:',
          resources: [
            { name: '988 Suicide & Crisis Lifeline', contact: 'Call or text 988', available: '24/7' },
            { name: 'Crisis Text Line', contact: 'Text HELLO to 741741', available: '24/7' },
            { name: 'Emergency', contact: 'Call 911', available: 'Immediate' }
          ]
        }
      })
    }
    
    return NextResponse.json({ post })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
