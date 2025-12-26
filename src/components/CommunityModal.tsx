"use client"

import { useState, useEffect } from "react"
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

interface Post {
  id: string
  title: string
  content: string
  category: string
  username: string
  likes: number
  hasWarning: boolean
  warningText: string | null
  createdAt: string
  _count?: {
    replies: number
  }
}

interface CommunityModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommunityModal({ open, onOpenChange }: CommunityModalProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredCategory, setFilteredCategory] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

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

  useEffect(() => {
    if (open && !showCreatePost && !selectedPost) {
      fetchPosts()
    }
  }, [open, showCreatePost, selectedPost])

  const fetchPosts = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const url = filteredCategory && filteredCategory !== "all"
        ? `/api/community/posts?category=${encodeURIComponent(filteredCategory)}`
        : "/api/community/posts"
      
      const response = await fetch(url)
      if (!response.ok) throw new Error("Failed to fetch posts")
      const data = await response.json()
      setPosts(data.posts)
    } catch (err) {
      setError("Failed to load community posts. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
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
      />
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl flex items-center gap-2">
            <Users className="h-8 w-8" />
            Anonymous Community
          </DialogTitle>
          <DialogDescription>
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

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <Select value={filteredCategory} onValueChange={(value) => {
            setFilteredCategory(value)
            // Trigger refetch when category changes
            setTimeout(fetchPosts, 0)
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

          <Button onClick={() => setShowCreatePost(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Post
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
                  <Button onClick={() => setShowCreatePost(true)}>
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
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          {post.hasWarning && (
                            <Badge variant="destructive" className="flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              Trigger Warning
                            </Badge>
                          )}
                          <Badge className={getCategoryColor(post.category)}>
                            {post.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                        <CardDescription className="mt-1">
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
                    <p className="text-sm text-muted-foreground line-clamp-3">
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
