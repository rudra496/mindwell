"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Loader2, Info } from "lucide-react";
import { postToCommunity } from "@/lib/community-firebase";
import { auth, signInWithGoogle } from "@/lib/firebase";

interface CommunityCreatePostProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPostCreated: () => void;
  onCancel: () => void;
  categories: string[];
}

function detectCrisisLanguage(text: string) {
  const t = text.toLowerCase();
  return (
    t.includes("suicide") ||
    t.includes("kill myself") ||
    t.includes("end my life") ||
    t.includes("self-harm") ||
    t.includes("hurt myself") ||
    t.includes("cut myself") ||
    t.includes("want to die")
  );
}

export function CommunityCreatePost({
  open,
  onOpenChange,
  onPostCreated,
  onCancel,
  categories,
}: CommunityCreatePostProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [triggerWarnings, setTriggerWarnings] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);

  const warningOptions = [
    "Self-harm",
    "Suicide",
    "Eating disorders",
    "Substance abuse",
    "Violence",
    "Trauma"
  ];

  const handleWarningToggle = (warning: string) => {
    setTriggerWarnings(prev =>
      prev.includes(warning) ? prev.filter(w => w !== warning) : [...prev, warning]
    );
  };

  const handleSubmit = async () => {
    if (!auth || !auth.currentUser) {
      await signInWithGoogle();
      if (!auth || !auth.currentUser) {
        setError("Sign in required");
        return;
      }
    }

    if (!title.trim() || !content.trim() || !category) {
      setError("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setShowCrisisAlert(false);

    try {
      const hasCrisisLanguage = detectCrisisLanguage(title + " " + content);

      if (hasCrisisLanguage) setShowCrisisAlert(true);

      const warningText: string | undefined =
        triggerWarnings.length > 0
          ? triggerWarnings.join(", ")
          : hasCrisisLanguage
          ? "Crisis/Self-Harm Discussion"
          : undefined;

      await postToCommunity({
        title: title.trim(),
        content: content.trim(),
        category,
        triggerWarnings,
        warningText,
        hasCrisisLanguage: !!hasCrisisLanguage
      });

      setTitle("");
      setContent("");
      setCategory("");
      setTriggerWarnings([]);

      onPostCreated();
    } catch (err: any) {
      setError(err.message || "Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create a New Post</DialogTitle>
          <DialogDescription>
            Share your story, ask for support, or offer encouragement to others
          </DialogDescription>
        </DialogHeader>

        <Alert className="border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-sm text-blue-900">
            <strong>Your privacy matters:</strong> Posts are anonymous. Your username is randomly generated. Do not share personal identifying information.
          </AlertDescription>
        </Alert>

        {showCrisisAlert && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              We detected language suggesting you may be in crisis.
              <div className="mt-2 space-y-1">
                <div>Call or text 988</div>
                <div>Text HELLO to 741741</div>
                <div>Call emergency services if you are in immediate danger</div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Post Title *</Label>
            <Input id="title" value={title} onChange={e => setTitle(e.target.value)} maxLength={100} />
            <p className="text-xs text-muted-foreground">{title.length}/100</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Your Message *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={8}
              maxLength={5000}
            />
            <p className="text-xs text-muted-foreground">{content.length}/5000</p>
          </div>

          <div className="space-y-3">
            <Label>Trigger Warnings (Optional)</Label>
            <div className="grid grid-cols-2 gap-3">
              {warningOptions.map(warning => (
                <div key={warning} className="flex items-center space-x-2">
                  <Checkbox
                    id={warning}
                    checked={triggerWarnings.includes(warning)}
                    onCheckedChange={() => handleWarningToggle(warning)}
                  />
                  <Label htmlFor={warning} className="text-sm font-normal cursor-pointer">
                    {warning}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {triggerWarnings.length > 0 && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Your post will show a trigger warning for: {triggerWarnings.join(", ")}
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !title.trim() || !content.trim() || !category}
              className="flex-1"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : "Post to Community"}
            </Button>
            <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
