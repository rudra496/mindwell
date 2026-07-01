"use client";

import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ThumbsUp, MessageCircle, AlertTriangle, ArrowLeft, Loader2, Send, Edit, Trash2, Reply } from "lucide-react";
import { CRISIS_BANGLADESH, CRISIS_US, EMERGENCY } from "@/lib/crisis-info";

import {
  addReply,
  CommunityReply,
  deletePost,
  deleteReply,
  editPost,
  editReply,
  hasUserLikedPost,
  hasUserLikedReply,
  subscribeToReplies,
  togglePostLike,
  toggleReplyLike,
} from "@/lib/community-firebase";
import { auth, signInWithGoogle } from "@/lib/firebase";

interface CommunityPostDetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: any;
  onBack: () => void;
  onPostUpdate?: () => void;
}

export function CommunityPostDetail({ open, onOpenChange, post, onBack, onPostUpdate }: CommunityPostDetailProps) {
  const [replies, setReplies] = useState<CommunityReply[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingReplies, setIsLoadingReplies] = useState(false);

  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  const [editingPost, setEditingPost] = useState(false);
  const [editPostTitle, setEditPostTitle] = useState(post.title || "");
  const [editPostContent, setEditPostContent] = useState(post.content || "");

  const [replyingToReplyId, setReplyingToReplyId] = useState<string | null>(null);
  const [newNestedReply, setNewNestedReply] = useState("");
  const [isSubmittingNestedReply, setIsSubmittingNestedReply] = useState(false);

  const [localPost, setLocalPost] = useState(post);
  const [hasLikedPost, setHasLikedPost] = useState(false);
  const [likedReplyIds, setLikedReplyIds] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  const currentUid = auth?.currentUser?.uid;

  useEffect(() => {
    setLocalPost(post);
    setEditPostTitle(post.title || "");
    setEditPostContent(post.content || "");
  }, [post]);

  useEffect(() => {
    let active = true;

    const hydrateLikeState = async () => {
      if (!currentUid || !post?.id) {
        setHasLikedPost(false);
        setLikedReplyIds(new Set());
        return;
      }

      try {
        const liked = await hasUserLikedPost(post.id, currentUid);
        if (active) setHasLikedPost(liked);
      } catch {
        if (active) setHasLikedPost(false);
      }
    };

    hydrateLikeState();
    return () => {
      active = false;
    };
  }, [currentUid, post?.id]);

  useEffect(() => {
    if (!open || !post?.id) return;
    setIsLoadingReplies(true);
    setError(null);

    const unsub = subscribeToReplies(
      post.id,
      (loadedReplies) => {
        setReplies(loadedReplies);
        setIsLoadingReplies(false);
      },
      () => {
        setError("Failed to load comments.");
        setIsLoadingReplies(false);
      }
    );

    return () => unsub();
  }, [open, post?.id]);

  useEffect(() => {
    let cancelled = false;

    const hydrateReplyLikes = async () => {
      if (!currentUid || replies.length === 0) {
        setLikedReplyIds(new Set());
        return;
      }

      const checks = await Promise.all(
        replies.map(async (reply) => ({
          id: reply.id,
          liked: await hasUserLikedReply(reply.id, currentUid).catch(() => false),
        }))
      );

      if (cancelled) return;
      setLikedReplyIds(new Set(checks.filter((c) => c.liked).map((c) => c.id)));
    };

    hydrateReplyLikes();
    return () => {
      cancelled = true;
    };
  }, [currentUid, replies]);

  const safeDate = (ts: any) => {
    if (!ts) return "";
    if (ts?.seconds) return new Date(ts.seconds * 1000).toLocaleString();
    return "";
  };

  const isAuthor = (localPost?.authorId ?? localPost?.userId) === currentUid;

  const rootComments = useMemo(() => replies.filter((reply) => !reply.parentReplyId), [replies]);

  const nestedRepliesByParent = useMemo(() => {
    const grouped: Record<string, CommunityReply[]> = {};
    replies.forEach((reply) => {
      if (!reply.parentReplyId) return;
      if (!grouped[reply.parentReplyId]) grouped[reply.parentReplyId] = [];
      grouped[reply.parentReplyId].push(reply);
    });
    return grouped;
  }, [replies]);

  const requireAuth = async () => {
    if (auth?.currentUser) return true;
    await signInWithGoogle();
    return !!auth?.currentUser;
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    setError(null);

    const authed = await requireAuth();
    if (!authed) return setError("You must sign in to comment.");

    const value = newComment;
    setNewComment("");
    setIsSubmitting(true);
    try {
      await addReply(post.id, value.trim(), null);
      onPostUpdate?.();
    } catch {
      setError("Comment failed. Please try again.");
      setNewComment(value);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitNestedReply = async () => {
    if (!replyingToReplyId || !newNestedReply.trim()) return;
    setError(null);

    const authed = await requireAuth();
    if (!authed) return setError("You must sign in to reply.");

    const value = newNestedReply;
    setNewNestedReply("");
    setReplyingToReplyId(null);
    setIsSubmittingNestedReply(true);
    try {
      await addReply(post.id, value.trim(), replyingToReplyId);
      onPostUpdate?.();
    } catch {
      setError("Reply failed. Please try again.");
      setNewNestedReply(value);
      setReplyingToReplyId(replyingToReplyId);
    } finally {
      setIsSubmittingNestedReply(false);
    }
  };

  const handleLikePost = async () => {
    setError(null);

    const authed = await requireAuth();
    if (!authed) return setError("You must sign in to like posts.");

    const prevLiked = hasLikedPost;
    const previousCount = Number(localPost?.likesCount || 0);
    const nextCount = prevLiked ? Math.max(0, previousCount - 1) : previousCount + 1;

    setHasLikedPost(!prevLiked);
    setLocalPost((prev: any) => ({ ...prev, likesCount: nextCount }));

    try {
      const result = await togglePostLike(post.id);
      setHasLikedPost(result.liked);
      setLocalPost((prev: any) => ({ ...prev, likesCount: result.likesCount }));
      onPostUpdate?.();
    } catch {
      setHasLikedPost(prevLiked);
      setLocalPost((prev: any) => ({ ...prev, likesCount: previousCount }));
      setError("Failed to update like. Please try again.");
    }
  };

  const handleLikeReplyClick = async (replyId: string) => {
    setError(null);

    const authed = await requireAuth();
    if (!authed) return setError("You must sign in to like comments.");

    const currentlyLiked = likedReplyIds.has(replyId);
    const target = replies.find((r) => r.id === replyId);
    if (!target) return;

    setLikedReplyIds((prev) => {
      const next = new Set(prev);
      if (currentlyLiked) next.delete(replyId);
      else next.add(replyId);
      return next;
    });

    setReplies((prev) =>
      prev.map((r) =>
        r.id === replyId
          ? { ...r, likesCount: currentlyLiked ? Math.max(0, (r.likesCount || 0) - 1) : (r.likesCount || 0) + 1 }
          : r
      )
    );

    try {
      const result = await toggleReplyLike(replyId);
      setReplies((prev) => prev.map((r) => (r.id === replyId ? { ...r, likesCount: result.likesCount } : r)));
      setLikedReplyIds((prev) => {
        const next = new Set(prev);
        if (result.liked) next.add(replyId);
        else next.delete(replyId);
        return next;
      });
    } catch {
      setError("Failed to update comment like.");
    }
  };

  const beginEdit = (reply: CommunityReply) => {
    setEditingReplyId(reply.id);
    setEditingText(reply.content);
  };

  const saveEdit = async () => {
    if (!editingReplyId || !editingText.trim()) return;
    setError(null);

    try {
      await editReply(editingReplyId, editingText.trim());
      setEditingReplyId(null);
      setEditingText("");
    } catch {
      setError("Failed to edit comment.");
    }
  };

  const removeReply = async (id: string) => {
    setError(null);
    if (!confirm("Delete this comment and any nested replies?")) return;

    try {
      await deleteReply(id);
      onPostUpdate?.();
    } catch {
      setError("Failed to delete comment.");
    }
  };

  const savePostEdit = async () => {
    if (!isAuthor) return setError("Only the post author can edit this post.");
    if (!editPostTitle.trim() || !editPostContent.trim()) return;

    setError(null);
    try {
      await editPost(post.id, {
        title: editPostTitle.trim(),
        content: editPostContent.trim(),
      });

      setLocalPost((prev: any) => ({ ...prev, title: editPostTitle.trim(), content: editPostContent.trim() }));
      setEditingPost(false);
      onPostUpdate?.();
    } catch {
      setError("Failed to update post.");
    }
  };

  const removePost = async () => {
    if (!isAuthor) return setError("Only the post author can delete this post.");
    if (!confirm("Are you sure you want to delete this post?")) return;

    setError(null);
    try {
      await deletePost(post.id);
      onPostUpdate?.();
      onBack();
    } catch {
      setError("Failed to delete post.");
    }
  };

  const crisis = (localPost?.content || "").toLowerCase().match(/suicide|kill myself|end my life|self.?harm|want to die/);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <Button variant="ghost" onClick={onBack} className="-ml-1 mb-3">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Community
        </Button>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                {localPost.hasWarning && (
                  <Badge variant="destructive" className="flex gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Trigger Warning
                  </Badge>
                )}
                <Badge>{localPost.category}</Badge>
              </div>

              {editingPost ? (
                <div className="space-y-3">
                  <Input value={editPostTitle} onChange={(e) => setEditPostTitle(e.target.value)} placeholder="Post title" className="text-xl font-bold" />
                  <Textarea value={editPostContent} onChange={(e) => setEditPostContent(e.target.value)} rows={6} placeholder="Post content" />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={savePostEdit}>Save Changes</Button>
                    <Button variant="outline" size="sm" onClick={() => setEditingPost(false)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold">{localPost.title}</h2>
                  <p className="text-sm text-muted-foreground">{localPost.displayName || "Anonymous"} • {safeDate(localPost.createdAt)}</p>
                  <p className="whitespace-pre-wrap">{localPost.content}</p>
                </>
              )}

              <div className="flex gap-3 pt-3 border-t flex-wrap">
                <Button variant={hasLikedPost ? "default" : "outline"} size="sm" onClick={handleLikePost}>
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  {localPost.likesCount || 0}
                </Button>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageCircle className="h-4 w-4" />
                  {replies.length} comments
                </div>

                {isAuthor && !editingPost && (
                  <>
                    <Button variant="outline" size="sm" onClick={() => setEditingPost(true)}><Edit className="h-4 w-4 mr-2" />Edit</Button>
                    <Button variant="destructive" size="sm" onClick={removePost}><Trash2 className="h-4 w-4 mr-2" />Delete</Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
          {crisis && <Alert className="border-red-500 bg-red-50"><AlertTriangle className="h-4 w-4 text-red-600" /><AlertDescription className="text-red-900">If you are in danger call emergency services now ({EMERGENCY.BD} BD / {EMERGENCY.US} US). Bangladesh: {CRISIS_BANGLADESH.organization} {CRISIS_BANGLADESH.phone}. US: {CRISIS_US.phone}.</AlertDescription></Alert>}

          <DialogHeader><DialogTitle>Comments</DialogTitle></DialogHeader>

          <Card className="border-dashed border-2">
            <CardContent className="pt-6 space-y-3">
              <Textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} rows={4} maxLength={2000} placeholder="Share your support…" />
              <div className="flex justify-between text-xs text-muted-foreground">{newComment.length}/2000</div>
              <Button onClick={handleSubmitComment} disabled={!newComment.trim() || isSubmitting} size="sm">
                {isSubmitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Posting…</> : <><Send className="h-4 w-4 mr-2" />Post Comment</>}
              </Button>
            </CardContent>
          </Card>

          {isLoadingReplies ? (
            <div className="flex justify-center py-6"><Loader2 className="h-6 w-6 animate-spin" /></div>
          ) : rootComments.length === 0 ? (
            <Card className="p-8 text-center border-dashed"><MessageCircle className="h-10 w-10 opacity-40 mx-auto mb-2" />No comments yet</Card>
          ) : (
            rootComments.map((reply) => {
              const nestedReplies = nestedRepliesByParent[reply.id] || [];
              return (
                <Card key={reply.id}>
                  <CardContent className="pt-6 space-y-3">
                    <p className="font-medium">{reply.displayName || "Anonymous"}</p>

                    {editingReplyId === reply.id ? (
                      <>
                        <Textarea value={editingText} onChange={(e) => setEditingText(e.target.value)} />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={saveEdit}>Save</Button>
                          <Button variant="outline" size="sm" onClick={() => setEditingReplyId(null)}>Cancel</Button>
                        </div>
                      </>
                    ) : (
                      <p className="whitespace-pre-wrap">{reply.content}</p>
                    )}

                    <div className="flex gap-2 items-center pt-2 border-t flex-wrap">
                      <Button size="sm" variant={likedReplyIds.has(reply.id) ? "default" : "ghost"} onClick={() => handleLikeReplyClick(reply.id)}>
                        <ThumbsUp className="h-3 w-3 mr-1" />{reply.likesCount || 0}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setReplyingToReplyId(reply.id)}><Reply className="h-3 w-3 mr-1" />Reply</Button>
                      <span className="text-xs text-muted-foreground">{safeDate(reply.createdAt)}</span>

                      {(reply.authorId) === currentUid && (
                        <>
                          <Button variant="outline" size="sm" onClick={() => beginEdit(reply)}>Edit</Button>
                          <Button variant="destructive" size="sm" onClick={() => removeReply(reply.id)}>Delete</Button>
                        </>
                      )}
                    </div>

                    {replyingToReplyId === reply.id && (
                      <div className="mt-2 pl-3 border-l-2 space-y-2">
                        <Textarea value={newNestedReply} onChange={(e) => setNewNestedReply(e.target.value)} rows={3} placeholder="Write your reply..." />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleSubmitNestedReply} disabled={!newNestedReply.trim() || isSubmittingNestedReply}>{isSubmittingNestedReply ? "Posting..." : "Post Reply"}</Button>
                          <Button variant="outline" size="sm" onClick={() => setReplyingToReplyId(null)}>Cancel</Button>
                        </div>
                      </div>
                    )}

                    {nestedReplies.length > 0 && (
                      <div className="pl-4 border-l-2 space-y-2">
                        {nestedReplies.map((nested) => (
                          <div key={nested.id} className="rounded-md border p-3 space-y-2">
                            <p className="text-sm font-medium">{nested.displayName || "Anonymous"}</p>
                            <p className="text-sm whitespace-pre-wrap">{nested.content}</p>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant={likedReplyIds.has(nested.id) ? "default" : "ghost"} onClick={() => handleLikeReplyClick(nested.id)}>
                                <ThumbsUp className="h-3 w-3 mr-1" />{nested.likesCount || 0}
                              </Button>
                              <span className="text-xs text-muted-foreground">{safeDate(nested.createdAt)}</span>
                              {(nested.authorId) === currentUid && <Button variant="destructive" size="sm" onClick={() => removeReply(nested.id)}>Delete</Button>}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
