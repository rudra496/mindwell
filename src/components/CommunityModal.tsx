"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  MessageCircle,
  ThumbsUp,
  AlertTriangle,
  Loader2,
  Users,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { onAuthStateChanged, User } from "firebase/auth";

import { CommunityCreatePost } from "./CommunityCreatePost";
import { CommunityPostDetail } from "./CommunityPostDetail";
import { subscribeToCommunityPosts, CommunityPost } from "@/lib/community-firebase";
import { auth, signInWithGoogle } from "@/lib/firebase";

interface CommunityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommunityModal({ open, onOpenChange }: CommunityModalProps) {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [filteredCategory, setFilteredCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(auth?.currentUser ?? null);
  const [isAuthBusy, setIsAuthBusy] = useState(false);

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
    "Coping Strategies",
  ];

  useEffect(() => {
    if (!open || showCreatePost || selectedPost) return;
    setIsLoading(true);
    setError(null);

    const unsubscribe = subscribeToCommunityPosts(
      (allPosts) => {
        const filtered =
          filteredCategory === "all"
            ? allPosts
            : allPosts.filter((p) => p.category === filteredCategory);

        setPosts(filtered);
        setIsLoading(false);
      },
      () => {
        setError("Failed to load community posts. Please try again.");
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [open, showCreatePost, selectedPost, filteredCategory]);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAuthBusy(false);
    });

    return () => unsubscribe();
  }, []);

  const handlePostCreated = () => {
    setShowCreatePost(false);
  };

  const handleGoogleSignIn = async () => {
    setIsAuthBusy(true);
    try {
      await signInWithGoogle();
    } catch {
      setIsAuthBusy(false);
      setError("Sign-in failed. Please try again.");
    }
  };

  if (showCreatePost)
    return (
      <CommunityCreatePost
        open={open}
        onOpenChange={onOpenChange}
        onPostCreated={handlePostCreated}
        onCancel={() => setShowCreatePost(false)}
        categories={categories}
      />
    );

  if (selectedPost)
    return (
        <CommunityPostDetail
        open={open}
        onOpenChange={onOpenChange}
        post={selectedPost}
        onBack={() => setSelectedPost(null)}
        onPostUpdate={() => undefined}
      />
    );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-[95vw] sm:max-w-5xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 break-words whitespace-normal overflow-x-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl sm:text-3xl flex items-center gap-2">
            <Users className="h-7 w-7" />
            Anonymous Community
          </DialogTitle>
          <DialogDescription>
            Connect with others, share experiences, and find support in a safe anonymous space.
          </DialogDescription>
        </DialogHeader>

        {!currentUser && (
          <div className="w-full">
            <Alert className="border-orange-200 bg-orange-50">
              <AlertDescription className="flex flex-col gap-3">
                <span>
                  You must sign in with Google to post or reply. Your identity is never public.
                </span>

                <Button
                  className="w-full sm:w-auto"
                  size="sm"
                  onClick={handleGoogleSignIn}
                  disabled={isAuthBusy}
                >
                  {isAuthBusy ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                  Sign in with Google
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        )}

        <Alert className="border-blue-200 bg-blue-50 mt-2">
          <AlertTriangle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-sm">
            Community Guidelines: Be respectful, supportive, and kind. If you are in crisis, call your local emergency number.
          </AlertDescription>
        </Alert>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Select
            value={filteredCategory}
            onValueChange={(value) => setFilteredCategory(value)}
          >
            <SelectTrigger className="w-full sm:w-[250px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            disabled={!currentUser || isAuthBusy}
            className="w-full sm:w-auto"
            onClick={() => setShowCreatePost(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!isLoading && !error && (
          <div className="space-y-4 mt-4">
            {posts.length === 0 ? (
              <Card className="p-8 text-center">
                <MessageCircle className="h-10 w-10 mx-auto mb-3" />
                <p>No posts yet — be the first to share</p>
              </Card>
            ) : (
              posts.map((post) => (
                <Card
                  key={post.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.hasWarning && (
                        <Badge variant="destructive" className="flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Trigger Warning
                        </Badge>
                      )}
                      <Badge>{post.category}</Badge>
                    </div>

                    <CardTitle>{post.title}</CardTitle>

                    <CardDescription>
                      By {post.displayName || "Anonymous"}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <p className="line-clamp-3">{post.content}</p>

                    <div className="flex gap-4 text-sm mt-2 text-muted-foreground">
                      <ThumbsUp className="h-4 w-4" /> {post.likesCount || 0}
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" /> {post.commentsCount || 0}
                      </span>
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
