import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Generate anonymous username
function generateAnonymousUsername(): string {
  const adjectives = [
    'Hopeful', 'Brave', 'Kind', 'Strong', 'Gentle', 'Wise', 'Calm', 'Bright',
    'Caring', 'Patient', 'Peaceful', 'Resilient', 'Mindful', 'Courageous'
  ]
  const nouns = [
    'Phoenix', 'Dove', 'Eagle', 'Butterfly', 'Owl', 'Swan', 'Robin', 'Hawk',
    'Sparrow', 'Falcon', 'Crane', 'Raven', 'Hummingbird', 'Bluebird'
  ]
  const number = Math.floor(Math.random() * 100)
  
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  
  return `${adj}${noun}${number}`
}

// Detect crisis language in posts
function detectCrisisLanguage(text: string): boolean {
  const crisisKeywords = [
    'suicide', 'suicidal', 'kill myself', 'end my life', 'want to die',
    'self-harm', 'self harm', 'hurt myself', 'overdose', 'end it all'
  ]
  const lowerText = text.toLowerCase()
  return crisisKeywords.some(keyword => lowerText.includes(keyword))
}

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
