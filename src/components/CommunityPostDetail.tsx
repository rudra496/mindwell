"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ThumbsUp, MessageCircle, AlertTriangle, ArrowLeft, Loader2, Send } from "lucide-react"

interface Reply {
  id: string
  content: string
  username: string
  likes: number
  createdAt: string
}

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
}

interface CommunityPostDetailProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: Post
  onBack: () => void
}

export function CommunityPostDetail({ open, onOpenChange, post, onBack }: CommunityPostDetailProps) {
  const [replies, setReplies] = useState<Reply[]>([])
  const [newReply, setNewReply] = useState("")
  const [isLoadingReplies, setIsLoadingReplies] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasLiked, setHasLiked] = useState(false)
  const [currentLikes, setCurrentLikes] = useState(post.likes)

  useEffect(() => {
    if (open) {
      fetchReplies()
    }
  }, [open, post.id])

  const fetchReplies = async () => {
    setIsLoadingReplies(true)
    setError(null)
    try {
      const response = await fetch(`/api/community/posts/${post.id}/comments`)
      if (!response.ok) throw new Error("Failed to fetch replies")
      const data = await response.json()
      setReplies(data.replies)
    } catch (err) {
      setError("Failed to load replies. Please try again.")
    } finally {
      setIsLoadingReplies(false)
    }
  }

  const handleSubmitReply = async () => {
    if (!newReply.trim()) return

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`/api/community/posts/${post.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newReply.trim() })
      })

      if (!response.ok) throw new Error("Failed to post reply")

      setNewReply("")
      await fetchReplies()
    } catch (err) {
      setError("Failed to post reply. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLike = () => {
    if (!hasLiked) {
      setCurrentLikes(prev => prev + 1)
      setHasLiked(true)
      // In a real app, this would call an API to persist the like
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 -ml-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Community
        </Button>

        <div className="space-y-6">
          {/* Post Content */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-3">
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
                    <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      By {post.username} • {formatDate(post.createdAt)}
                    </p>
                  </div>
                </div>

                {post.hasWarning && post.warningText && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Content Warning:</strong> This post contains discussion of: {post.warningText}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap">{post.content}</p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t">
                  <Button
                    variant={hasLiked ? "default" : "outline"}
                    size="sm"
                    onClick={handleLike}
                    disabled={hasLiked}
                  >
                    <ThumbsUp className={`h-4 w-4 mr-2 ${hasLiked ? 'fill-current' : ''}`} />
                    {currentLikes} {hasLiked ? 'Liked' : 'Like'}
                  </Button>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MessageCircle className="h-4 w-4" />
                    <span>{replies.length} {replies.length === 1 ? 'Reply' : 'Replies'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Crisis Resources Detection */}
          {(post.content.toLowerCase().includes('suicide') ||
            post.content.toLowerCase().includes('kill myself') ||
            post.content.toLowerCase().includes('end my life') ||
            post.content.toLowerCase().includes('self harm')) && (
            <Alert className="border-red-500 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-900">
                <strong>Crisis Resources Available:</strong> If you or someone you know is in crisis, 
                please call <strong>988</strong> (Suicide & Crisis Lifeline) or text <strong>HELLO</strong> to <strong>741741</strong>. 
                For emergencies, call <strong>911</strong>.
              </AlertDescription>
            </Alert>
          )}

          {/* Reply Section */}
          <div className="space-y-4">
            <DialogHeader>
              <DialogTitle className="text-xl">Replies ({replies.length})</DialogTitle>
            </DialogHeader>

            {/* New Reply Form */}
            <Card className="border-2 border-dashed">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Textarea
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="Share your support, advice, or thoughts..."
                    rows={4}
                    maxLength={2000}
                  />
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {newReply.length}/2000 characters
                    </p>
                    <Button
                      onClick={handleSubmitReply}
                      disabled={!newReply.trim() || isSubmitting}
                      size="sm"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Posting...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Post Reply
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Replies List */}
            {isLoadingReplies ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : error ? (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : replies.length === 0 ? (
              <Card className="p-8 text-center border-dashed">
                <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-3 opacity-50" />
                <p className="text-muted-foreground">
                  No replies yet. Be the first to offer support!
                </p>
              </Card>
            ) : (
              <div className="space-y-3">
                {replies.map(reply => (
                  <Card key={reply.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <p className="text-sm font-medium">{reply.username}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(reply.createdAt)}
                        </p>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{reply.content}</p>
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t text-sm text-muted-foreground">
                        <ThumbsUp className="h-3 w-3" />
                        <span>{reply.likes}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
