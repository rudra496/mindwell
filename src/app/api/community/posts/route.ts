import { NextResponse } from 'next/server'

// This API route is for demonstration/compatibility only
// The community feature uses client-side IndexedDB storage for posts
// See /src/lib/indexeddb.ts and updated CommunityModal component

// Mock initial posts for first-time users
const INITIAL_POSTS = [
  {
    id: 'welcome-1',
    title: 'Welcome to the MindWell Community! 🌟',
    content: 'This is a safe, anonymous space for peer support. All posts are stored locally in your browser for privacy. Share your story, find support, or celebrate wins!',
    category: 'General Support',
    username: 'MindWell Team',
    likes: 0,
    hasWarning: false,
    warningText: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    _count: { replies: 0 }
  }
]

export async function GET(request: Request) {
  // Return initial welcome posts
  // Client will merge with locally stored posts
  return NextResponse.json({
    posts: INITIAL_POSTS,
    pagination: {
      page: 1,
      perPage: 20,
      total: INITIAL_POSTS.length,
      totalPages: 1
    },
    note: 'Community uses client-side storage. This is initial data only.'
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, content, category } = body
    
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }
    
    // Return success - actual storage happens client-side
    return NextResponse.json({ 
      success: true,
      message: 'Post will be saved to local storage',
      note: 'Community uses client-side IndexedDB for privacy'
    })
  } catch (error) {
    console.error('Error in community POST:', error)
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}
