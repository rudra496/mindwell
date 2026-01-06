"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ThumbsUp, MessageCircle, AlertTriangle, ArrowLeft, Loader2, Send } from "lucide-react";
import { getReplies, addReply, likePost, likeReply } from "@/lib/community-firebase";
import { auth, signInWithGoogle } from "@/lib/firebase";

interface CommunityPostDetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: any;
  onBack: () => void;
  onPostUpdate?: () => void;
}

export function CommunityPostDetail({ open, onOpenChange, post, onBack, onPostUpdate }: CommunityPostDetailProps) {
  const [replies, setReplies] = useState<any[]>([]);
  const [newReply, setNewReply] = useState("");
  const [isLoadingReplies, setIsLoadingReplies] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(post.likes || 0);

  const fetchReplies = async () => {
    setIsLoadingReplies(true);
    setError(null);
    try {
      const loadedReplies = await getReplies(post.id);
      setReplies(loadedReplies);
    } catch (err: any) {
      setError("Failed to load replies. Please try again.");
    } finally {
      setIsLoadingReplies(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchReplies();
    }
    // eslint-disable-next-line
  }, [open]);

  const handleSubmitReply = async () => {
    if (!auth.currentUser) await signInWithGoogle();
    if (!newReply.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await addReply(post.id, newReply.trim());
      setNewReply("");
      await fetchReplies();
      if (onPostUpdate) onPostUpdate();
    } catch (err: any) {
      setError(err.message || "Failed to post reply. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async () => {
    if (hasLiked) return;
    try {
      await likePost(post.id);
      setCurrentLikes((prev) => prev + 1);
      setHasLiked(true);
      if (onPostUpdate) onPostUpdate();
    } catch (err) { /* ignore */ }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <Button variant="ghost" onClick={onBack} className="mb-4 -ml-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Community
        </Button>

        <div className="space-y-6">
          {/* Post content */}
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
                      <Badge className="bg-gray-100 text-gray-800">{post.category}</Badge>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      By {post.displayName} • {post.createdAt && new Date(post.createdAt.seconds*1000).toLocaleString()}
                      {post.isAdmin && " • Admin"}
                    </p>
                  </div>
                </div>

                {post.hasWarning && post.warningText && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Content Warning:</strong> {post.warningText}
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
                    <ThumbsUp className={`h-4 w-4 mr-2 ${hasLiked ? "fill-current" : ""}`} />
                    {currentLikes} {hasLiked ? "Liked" : "Like"}
                  </Button>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MessageCircle className="h-4 w-4" />
                    <span>{replies.length} {replies.length === 1 ? "Reply" : "Replies"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {(post.content?.toLowerCase().includes("suicide") ||
            post.content?.toLowerCase().includes("kill myself") ||
            post.content?.toLowerCase().includes("end my life") ||
            post.content?.toLowerCase().includes("self harm")) && (
            <Alert className="border-red-500 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-900">
                <strong>Crisis Resources Available:</strong> If you or someone you know is in crisis,
                please call <strong>988</strong> (Suicide & Crisis Lifeline) or text <strong>HELLO</strong> to <strong>741741</strong>.
                For emergencies, call <strong>911</strong>.
              </AlertDescription>
            </Alert>
          )}

          {/* Reply section */}
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
                {replies.map((reply) => (
                  <Card key={reply.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <p className="text-sm font-medium">{reply.displayName}</p>
                        <p className="text-xs text-muted-foreground">
                          {reply.createdAt && new Date(reply.createdAt.seconds*1000).toLocaleString()}
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
  );
}
