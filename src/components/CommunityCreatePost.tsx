"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Loader2, Info } from "lucide-react"

interface CommunityCreatePostProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onPostCreated: () => void
  onCancel: () => void
  categories: string[]
}

export function CommunityCreatePost({ 
  open, 
  onOpenChange, 
  onPostCreated, 
  onCancel,
  categories 
}: CommunityCreatePostProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [triggerWarnings, setTriggerWarnings] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const warningOptions = [
    "Self-harm",
    "Suicide",
    "Eating disorders",
    "Substance abuse",
    "Violence",
    "Trauma"
  ]

  const handleWarningToggle = (warning: string) => {
    setTriggerWarnings(prev =>
      prev.includes(warning)
        ? prev.filter(w => w !== warning)
        : [...prev, warning]
    )
  }

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !category) {
      setError("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/community/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          category,
          hasWarning: triggerWarnings.length > 0,
          warningText: triggerWarnings.length > 0 ? triggerWarnings.join(", ") : null
        })
      })

      if (!response.ok) {
        throw new Error("Failed to create post")
      }

      // Reset form
      setTitle("")
      setContent("")
      setCategory("")
      setTriggerWarnings([])
      
      onPostCreated()
    } catch (err) {
      setError("Failed to create post. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

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
            <strong>Your privacy matters:</strong> All posts are anonymous. Your username is randomly generated. 
            Do not share personal identifying information.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">
              Post Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your post a clear title"
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground">{title.length}/100 characters</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">
              Category <span className="text-red-500">*</span>
            </Label>
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
            <Label htmlFor="content">
              Your Message <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts, experiences, or questions..."
              rows={8}
              maxLength={5000}
            />
            <p className="text-xs text-muted-foreground">{content.length}/5000 characters</p>
          </div>

          <div className="space-y-3">
            <Label>Trigger Warnings (Optional)</Label>
            <p className="text-sm text-muted-foreground">
              Select any topics that might be triggering for others
            </p>
            <div className="grid grid-cols-2 gap-3">
              {warningOptions.map(warning => (
                <div key={warning} className="flex items-center space-x-2">
                  <Checkbox
                    id={warning}
                    checked={triggerWarnings.includes(warning)}
                    onCheckedChange={() => handleWarningToggle(warning)}
                  />
                  <Label
                    htmlFor={warning}
                    className="text-sm font-normal cursor-pointer"
                  >
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
                Your post will display a trigger warning for: {triggerWarnings.join(", ")}
              </AlertDescription>
            </Alert>
          )}

          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-sm text-yellow-900">
              <strong>Safety Guidelines:</strong> If you're experiencing a crisis, 
              please call 988 (Suicide & Crisis Lifeline) or 911 for immediate help. 
              This community is for support, not emergency intervention.
            </AlertDescription>
          </Alert>

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
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Posting...
                </>
              ) : (
                "Post to Community"
              )}
            </Button>
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
