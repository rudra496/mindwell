"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ThumbsUp, MessageCircle, AlertTriangle, ArrowLeft, Loader2, Send } from "lucide-react"

import { getReplies, addReply, likePost, likeReply } from "@/lib/community-firebase"
import { auth, signInWithGoogle } from "@/lib/firebase"

interface CommunityPostDetailProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: any
  onBack: () => void
  onPostUpdate?: () => void
}

export function CommunityPostDetail({ open, onOpenChange, post, onBack, onPostUpdate }: CommunityPostDetailProps) {
  const [replies, setReplies] = useState<any[]>([])
  const [newReply, setNewReply] = useState("")
  const [isLoadingReplies, setIsLoadingReplies] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [hasLikedPost, setHasLikedPost] = useState(false)
  const [postLikes, setPostLikes] = useState<number>(post?.likes || 0)

  useEffect(() => {
    if (auth.currentUser && post?.likedBy) {
      setHasLikedPost(post.likedBy.includes(auth.currentUser.uid))
    }
    setPostLikes(post?.likes || 0)
  }, [post])

  const fetchReplies = async () => {
    setIsLoadingReplies(true)
    setError(null)
    try {
      const data = await getReplies(post.id)
      setReplies(data || [])
    } catch {
      setError("Failed to load replies. Please try again.")
    } finally {
      setIsLoadingReplies(false)
    }
  }

  useEffect(() => {
    if (open && post?.id) fetchReplies()
  }, [open, post?.id])

  const safeDate = (ts: any) => {
    if (!ts) return ""
    if (ts?.seconds) return new Date(ts.seconds * 1000).toLocaleString()
    if (typeof ts === "number") return new Date(ts).toLocaleString()
    return ""
  }

  const handleSubmitReply = async () => {
    if (!newReply.trim()) return
    if (!auth.currentUser) {
      await signInWithGoogle()
      if (!auth.currentUser) return
    }
    setIsSubmitting(true)
    try {
      await addReply(post.id, newReply.trim())
      setNewReply("")
      await fetchReplies()
      onPostUpdate?.()
    } catch {
      setError("Failed to post reply.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLikePost = async () => {
    if (hasLikedPost) return
    await likePost(post.id)
    setHasLikedPost(true)
    setPostLikes(v => (v || 0) + 1)
    onPostUpdate?.()
  }

  const handleLikeReply = async (replyId: string) => {
    await likeReply(replyId)
    setReplies(prev =>
      prev.map(r =>
        r.id === replyId
          ? { ...r, likes: (r.likes || 0) + 1, likedBy: [...(r.likedBy || []), auth.currentUser?.uid] }
          : r
      )
    )
  }

  const crisis =
    (post?.content || "")
      .toLowerCase()
      .match(/suicide|kill myself|end my life|self.?harm|want to die|hurt myself/)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <Button variant="ghost" onClick={onBack} className="mb-4 -ml-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Community
        </Button>

        {!post ? (
          <Alert variant="destructive">
            <AlertDescription>This post no longer exists.</AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {post.hasWarning && (
                        <Badge variant="destructive" className="flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Trigger Warning
                        </Badge>
                      )}
                      <Badge>{post.category}</Badge>
                    </div>

                    <h2 className="text-2xl font-bold mb-1">{post.title}</h2>

                    <p className="text-sm text-muted-foreground">
                      By {post.displayName || "Anonymous"} • {safeDate(post.createdAt)}
                    </p>
                  </div>
                </div>

                {post.warningText && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{post.warningText}</AlertDescription>
                  </Alert>
                )}

                <p className="whitespace-pre-wrap">{post.content}</p>

                <div className="flex gap-4 pt-3 border-t">
                  <Button
                    variant={hasLikedPost ? "default" : "outline"}
                    disabled={hasLikedPost}
                    size="sm"
                    onClick={handleLikePost}
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    {postLikes} {hasLikedPost ? "Liked" : "Like"}
                  </Button>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MessageCircle className="h-4 w-4" />
                    {replies.length} Replies
                  </div>
                </div>
              </CardContent>
            </Card>

            {crisis && (
              <Alert className="border-red-500 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-900">
                  If you are in immediate danger, call local emergency services now.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <DialogHeader>
                <DialogTitle>Replies ({replies.length})</DialogTitle>
              </DialogHeader>

              <Card className="border-2 border-dashed">
                <CardContent className="pt-6 space-y-3">
                  <Textarea
                    value={newReply}
                    onChange={e => setNewReply(e.target.value)}
                    rows={4}
                    maxLength={2000}
                  />

                  <div className="flex justify-between">
                    <p className="text-xs text-muted-foreground">{newReply.length}/2000</p>

                    <Button onClick={handleSubmitReply} disabled={!newReply.trim() || isSubmitting}>
                      {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
                      Post Reply
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {isLoadingReplies ? (
                <div className="flex justify-center py-6">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                replies.map(reply => (
                  <Card key={reply.id}>
                    <CardContent className="pt-6 space-y-2">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">{reply.displayName || "Anonymous"}</p>
                        <p className="text-xs text-muted-foreground">{safeDate(reply.createdAt)}</p>
                      </div>

                      <p className="text-sm whitespace-pre-wrap">{reply.content}</p>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLikeReply(reply.id)}
                      >
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {reply.likes || 0}
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
