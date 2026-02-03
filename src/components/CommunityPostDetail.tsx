"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

import {
  ThumbsUp,
  MessageCircle,
  AlertTriangle,
  ArrowLeft,
  Loader2,
  Send,
  MoreVertical,
  Edit,
  Trash2
} from "lucide-react";

import {
  getReplies,
  addReply,
  likePost,
  likeReply,
  editReply,
  deleteReply,
  editPost,
  deletePost
} from "@/lib/community-firebase";

import { auth, signInWithGoogle } from "@/lib/firebase";

interface CommunityPostDetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: any;
  onBack: () => void;
  onPostUpdate?: () => void;
}

export function CommunityPostDetail({
  open,
  onOpenChange,
  post,
  onBack,
  onPostUpdate
}: CommunityPostDetailProps) {
  const [replies, setReplies] = useState<any[]>([]);
  const [newReply, setNewReply] = useState("");
  const [isLoadingReplies, setIsLoadingReplies] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  
  const [editingPost, setEditingPost] = useState(false);
  const [editPostTitle, setEditPostTitle] = useState(post.title || "");
  const [editPostContent, setEditPostContent] = useState(post.content || "");

  const [hasLikedPost, setHasLikedPost] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [currentLikes, setCurrentLikes] = useState<number>(post.likes || 0);

  const fetchReplies = async () => {
    setIsLoadingReplies(true);
    try {
      const loaded = await getReplies(post.id);
      setReplies(loaded || []);
    } catch {
      setError("Failed to load replies.");
    } finally {
      setIsLoadingReplies(false);
    }
  };

  useEffect(() => {
    if (open && post?.id) fetchReplies();
  }, [open, post?.id]);

  const safeDate = (ts: any) => {
    if (!ts) return "";
    if (ts?.seconds) return new Date(ts.seconds * 1000).toLocaleString();
    return "";
  };

  const handleSubmitReply = async () => {
    if (!newReply.trim()) return;

    if (!auth.currentUser) await signInWithGoogle();

    setIsSubmitting(true);

    try {
      await addReply(post.id, newReply.trim());
      setNewReply("");
      await fetchReplies();
    } catch {
      setError("Reply failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikePost = async () => {
    if (hasLikedPost) return;

    try {
      await likePost(post.id);
      setHasLikedPost(true);
      setCurrentLikes(prev => (prev || 0) + 1);
    } catch {}
  };

  const handleLikeReplyClick = async (replyId: string) => {
    try {
      await likeReply(replyId);
      setReplies(prev =>
        prev.map(r =>
          r.id === replyId ? { ...r, likes: (r.likes || 0) + 1 } : r
        )
      );
    } catch {}
  };

  const beginEdit = (reply: any) => {
    setEditingReplyId(reply.id);
    setEditingText(reply.content);
  };

  const saveEdit = async () => {
    if (!editingReplyId) return;
    await editReply(editingReplyId, editingText.trim());
    setEditingReplyId(null);
    setEditingText("");
    await fetchReplies();
  };

  const removeReply = async (id: string) => {
    await deleteReply(id);
    await fetchReplies();
  };

  const beginEditPost = () => {
    setEditingPost(true);
    setEditPostTitle(post.title || "");
    setEditPostContent(post.content || "");
  };

  const savePostEdit = async () => {
    if (!editPostTitle.trim() || !editPostContent.trim()) return;
    try {
      await editPost(post.id, {
        title: editPostTitle.trim(),
        content: editPostContent.trim(),
      });
      setEditingPost(false);
      if (onPostUpdate) onPostUpdate();
    } catch {
      setError("Failed to update post");
    }
  };

  const removePost = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await deletePost(post.id);
      onBack();
      if (onPostUpdate) onPostUpdate();
    } catch {
      setError("Failed to delete post");
    }
  };

  const crisis =
    (post?.content || "")
      .toLowerCase()
      .match(/suicide|kill myself|end my life|self.?harm|want to die/);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">

        <Button variant="ghost" onClick={onBack} className="-ml-1 mb-3">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Community
        </Button>

        {!post ? (
          <Alert variant="destructive">
            <AlertDescription>Post not found</AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-6">

            <Card>
              <CardContent className="pt-6 space-y-4">

                <div className="flex items-center gap-2 flex-wrap">
                  {post.hasWarning && (
                    <Badge variant="destructive" className="flex gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Trigger Warning
                    </Badge>
                  )}
                  <Badge>{post.category}</Badge>
                </div>

                {editingPost ? (
                  <div className="space-y-3">
                    <Input
                      value={editPostTitle}
                      onChange={(e) => setEditPostTitle(e.target.value)}
                      placeholder="Post title"
                      className="text-xl font-bold"
                    />
                    <Textarea
                      value={editPostContent}
                      onChange={(e) => setEditPostContent(e.target.value)}
                      rows={6}
                      placeholder="Post content"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={savePostEdit}>
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingPost(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold">{post.title}</h2>

                    <p className="text-sm text-muted-foreground">
                      {post.displayName || "Anonymous"} • {safeDate(post.createdAt)}
                    </p>

                    <p className="whitespace-pre-wrap">{post.content}</p>
                  </>
                )}

                <div className="flex gap-3 pt-3 border-t flex-wrap">
                  <Button
                    variant={hasLikedPost ? "default" : "outline"}
                    size="sm"
                    onClick={handleLikePost}
                    disabled={hasLikedPost}
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    {currentLikes}
                  </Button>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MessageCircle className="h-4 w-4" />
                    {replies.length} replies
                  </div>

                  {post.userId === auth.currentUser?.uid && !editingPost && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={beginEditPost}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={removePost}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {crisis && (
              <Alert className="border-red-500 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-900">
                  If you are in danger call emergency services now.
                  US: 988 • Text HELLO to 741741
                </AlertDescription>
              </Alert>
            )}

            <DialogHeader>
              <DialogTitle>Replies</DialogTitle>
            </DialogHeader>

            <Card className="border-dashed border-2">
              <CardContent className="pt-6 space-y-3">
                <Textarea
                  value={newReply}
                  onChange={e => setNewReply(e.target.value)}
                  rows={4}
                  maxLength={2000}
                  placeholder="Share your support…"
                />

                <div className="flex justify-between text-xs text-muted-foreground">
                  {newReply.length}/2000
                </div>

                <Button
                  onClick={handleSubmitReply}
                  disabled={!newReply.trim() || isSubmitting}
                  size="sm"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Posting…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Post Reply
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {isLoadingReplies ? (
              <div className="flex justify-center py-6">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : replies.length === 0 ? (
              <Card className="p-8 text-center border-dashed">
                <MessageCircle className="h-10 w-10 opacity-40 mx-auto mb-2" />
                No replies yet
              </Card>
            ) : (
              replies.map(reply => (
                <Card key={reply.id}>
                  <CardContent className="pt-6 space-y-2">

                    <div className="flex justify-between">
                      <p className="font-medium">
                        {reply.displayName || "Anonymous"}
                      </p>

                      <MoreVertical className="h-4 w-4 opacity-60" />
                    </div>

                    {editingReplyId === reply.id ? (
                      <>
                        <Textarea
                          value={editingText}
                          onChange={e => setEditingText(e.target.value)}
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={saveEdit}>
                            Save
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingReplyId(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </>
                    ) : (
                      <p className="whitespace-pre-wrap">{reply.content}</p>
                    )}

                    <div className="flex gap-3 items-center pt-2 border-t">

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleLikeReplyClick(reply.id)}
                      >
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {reply.likes || 0}
                      </Button>

                      <span className="text-xs text-muted-foreground">
                        {safeDate(reply.createdAt)}
                      </span>

                      {reply.userId === auth.currentUser?.uid && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => beginEdit(reply)}
                          >
                            Edit
                          </Button>

                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeReply(reply.id)}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
