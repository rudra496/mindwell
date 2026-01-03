"use client"

import { useState, useEffect, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, MessageCircle, ThumbsUp, AlertTriangle, Loader2, Users } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CommunityCreatePost } from "./CommunityCreatePost"
import { CommunityPostDetail } from "./CommunityPostDetail"
import { Community, type CommunityPost } from "@/lib/indexeddb"

interface CommunityModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommunityModal({ open, onOpenChange }: CommunityModalProps) {
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [filteredCategory, setFilteredCategory] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null)

  const categories = [
    "General Support",
    "Depression",
    "Anxiety",
    "PTSD",
    "OCD",
    "Bipolar",
    "Eating Disorders",
    "Addiction",
    "Grief & Loss",
    "Relationships",
    "Success Stories",
    "Coping Strategies"
  ]

  const fetchPosts = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      // Initialize IndexedDB first
      const { db } = await import('@/lib/indexeddb')
      await db.init()
      
      // Load posts from IndexedDB
      let allPosts = await Community.getAllPosts()
      
      // If no posts, load initial welcome post from API
      if (allPosts.length === 0) {
        try {
          const response = await fetch('/api/community/posts')
          const data = await response.json()
          if (data.posts && data.posts.length > 0) {
            // Save initial posts to IndexedDB
            for (const post of data.posts) {
              await Community.createPost({
                ...post,
                createdAt: new Date(post.createdAt),
                updatedAt: new Date(post.updatedAt)
              })
            }
            allPosts = await Community.getAllPosts()
          }
        } catch (apiError) {
          console.log('API fetch failed, using empty posts')
        }
      }
      
      // Filter by category if needed
      const filtered = filteredCategory && filteredCategory !== "all"
        ? allPosts.filter(p => p.category === filteredCategory)
        : allPosts
      
      // Sort by date (newest first)
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      
      // Add reply count
      for (const post of filtered) {
        const replies = await Community.getReplies(post.id)
        post._count = { replies: replies.length }
      }
      
      setPosts(filtered)
    } catch (err) {
      console.error('Error loading posts:', err)
      setError("Failed to load community posts. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }, [filteredCategory])

  useEffect(() => {
    if (open && !showCreatePost && !selectedPost) {
      fetchPosts()
    }
  }, [open, showCreatePost, selectedPost, fetchPosts])

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return "Yesterday"
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'General Support': 'bg-gray-100 text-gray-800',
      'Depression': 'bg-blue-100 text-blue-800',
      'Anxiety': 'bg-yellow-100 text-yellow-800',
      'PTSD': 'bg-red-100 text-red-800',
      'OCD': 'bg-purple-100 text-purple-800',
      'Bipolar': 'bg-green-100 text-green-800',
      'Eating Disorders': 'bg-pink-100 text-pink-800',
      'Addiction': 'bg-orange-100 text-orange-800',
      'Grief & Loss': 'bg-indigo-100 text-indigo-800',
      'Relationships': 'bg-rose-100 text-rose-800',
      'Success Stories': 'bg-emerald-100 text-emerald-800',
      'Coping Strategies': 'bg-teal-100 text-teal-800',
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  const handlePostCreated = () => {
    setShowCreatePost(false)
    fetchPosts()
  }

  if (showCreatePost) {
    return (
      <CommunityCreatePost
        open={open}
        onOpenChange={onOpenChange}
        onPostCreated={handlePostCreated}
        onCancel={() => setShowCreatePost(false)}
        categories={categories}
      />
    )
  }

  if (selectedPost) {
    return (
      <CommunityPostDetail
        open={open}
        onOpenChange={onOpenChange}
        post={selectedPost}
        onBack={() => setSelectedPost(null)}
        onPostUpdate={fetchPosts}
      />
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl sm:text-3xl flex items-center gap-2 break-words">
            <Users className="h-6 w-6 sm:h-8 sm:w-8" />
            Anonymous Community
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Connect with others, share experiences, and find support in a safe, anonymous space
          </DialogDescription>
        </DialogHeader>

        <Alert className="border-blue-200 bg-blue-50">
          <AlertTriangle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-sm text-blue-900">
            <strong>Community Guidelines:</strong> Be respectful, supportive, and kind. 
            This is a safe space for everyone. If you're in crisis, please call 988 or visit your nearest emergency room.
          </AlertDescription>
        </Alert>

        <Alert className="border-green-200 bg-green-50">
          <Users className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-sm text-green-900">
            <strong>🔒 Privacy First:</strong> All posts are stored <strong>locally in your browser</strong> using 
            IndexedDB. Posts are <strong>100% client-side</strong> and are NOT sent to any server. 
            Your posts are completely private to your device and browser.
          </AlertDescription>
        </Alert>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <Select value={filteredCategory} onValueChange={(value) => {
            setFilteredCategory(value)
          }}>
            <SelectTrigger className="w-full sm:w-[250px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={() => setShowCreatePost(true)} className="w-full sm:w-auto min-h-[44px]">
            <Plus className="h-4 w-4 mr-2" />
            <span className="text-sm sm:text-base">Create Post</span>
          </Button>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!isLoading && !error && (
          <div className="space-y-4">
            {posts.length === 0 ? (
              <Card className="p-8 text-center">
                <CardContent>
                  <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Be the first to share your story or ask for support
                  </p>
                  <Button onClick={() => setShowCreatePost(true)} className="min-h-[44px]">
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Post
                  </Button>
                </CardContent>
              </Card>
            ) : (
              posts.map(post => (
                <Card
                  key={post.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedPost(post)}
                >
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-4">
                      <div className="flex-1 w-full">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          {post.hasWarning && (
                            <Badge variant="destructive" className="flex items-center gap-1 text-xs">
                              <AlertTriangle className="h-3 w-3" />
                              Trigger Warning
                            </Badge>
                          )}
                          <Badge className={getCategoryColor(post.category) + " text-xs"}>
                            {post.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-base sm:text-lg break-words max-w-full">{post.title}</CardTitle>
                        <CardDescription className="mt-1 text-xs sm:text-sm truncate">
                          By {post.username} • {formatDate(post.createdAt)}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {post.hasWarning && post.warningText && (
                      <Alert variant="destructive" className="mb-3">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="text-sm">
                          <strong>Content Warning:</strong> {post.warningText}
                        </AlertDescription>
                      </Alert>
                    )}
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 break-words overflow-hidden">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post._count?.replies || 0}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
