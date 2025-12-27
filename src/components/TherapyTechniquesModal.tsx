"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Loader2, Printer } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface TherapyTechnique {
  id: string
  slug: string
  name: string
  category: string
  description: string
  steps: string[]
  examples: string[]
  when: string
  benefits: string[]
}

interface TherapyTechniquesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TherapyTechniquesModal({ open, onOpenChange }: TherapyTechniquesModalProps) {
  const [techniques, setTechniques] = useState<TherapyTechnique[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  useEffect(() => {
    if (open) {
      fetchTechniques()
    }
  }, [open])

  const fetchTechniques = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/therapy-techniques")
      if (!response.ok) throw new Error("Failed to fetch therapy techniques")
      const data = await response.json()
      setTechniques(data.techniques.map((t: any) => ({
        ...t,
        steps: typeof t.steps === 'string' ? JSON.parse(t.steps) : t.steps,
        examples: typeof t.examples === 'string' ? JSON.parse(t.examples) : t.examples,
        benefits: typeof t.benefits === 'string' ? JSON.parse(t.benefits) : t.benefits
      })))
    } catch (err) {
      setError("Failed to load therapy techniques. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const categories = Array.from(new Set(techniques.map(t => t.category)))

  const filteredTechniques = selectedCategory === "all"
    ? techniques
    : techniques.filter(t => t.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'CBT': 'bg-blue-100 text-blue-800',
      'DBT': 'bg-green-100 text-green-800',
      'ACT': 'bg-purple-100 text-purple-800',
      'Mindfulness': 'bg-teal-100 text-teal-800',
      'ERP': 'bg-orange-100 text-orange-800',
      'MBCT': 'bg-indigo-100 text-indigo-800',
      'IPT': 'bg-pink-100 text-pink-800',
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  const handlePrint = (technique: TherapyTechnique) => {
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${technique.name}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
              h1 { color: #333; }
              h2 { color: #666; margin-top: 20px; }
              ul { margin: 10px 0; padding-left: 20px; }
              li { margin: 5px 0; }
              .badge { display: inline-block; padding: 4px 8px; background: #e5e7eb; border-radius: 4px; font-size: 14px; }
            </style>
          </head>
          <body>
            <h1>${technique.name}</h1>
            <p class="badge">${technique.category}</p>
            <p><strong>Description:</strong> ${technique.description}</p>
            
            <h2>When to Use</h2>
            <p>${technique.when}</p>
            
            <h2>Steps</h2>
            <ol>
              ${technique.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
            
            <h2>Examples</h2>
            <ul>
              ${technique.examples.map(ex => `<li>${ex}</li>`).join('')}
            </ul>
            
            <h2>Benefits</h2>
            <ul>
              ${technique.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
            </ul>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl">Evidence-Based Therapy Techniques</DialogTitle>
          <DialogDescription>
            Learn practical techniques from CBT, DBT, ACT, and other evidence-based therapies
          </DialogDescription>
        </DialogHeader>

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
          <div className="space-y-6">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${Math.min(categories.length + 1, 5)}, minmax(0, 1fr))` }}>
                <TabsTrigger value="all">All</TabsTrigger>
                {categories.slice(0, 4).map(category => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="grid gap-4">
              <Accordion type="single" collapsible className="w-full">
                {filteredTechniques.map((technique, index) => (
                  <AccordionItem key={technique.id} value={`item-${index}`}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3 text-left">
                        <BookOpen className="h-5 w-5 text-primary flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold">{technique.name}</span>
                            <Badge className={getCategoryColor(technique.category)}>
                              {technique.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {technique.description}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-6 pt-4 pl-8">
                        <div>
                          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                            <span className="text-blue-600">When to Use This Technique</span>
                          </h4>
                          <p className="text-sm text-muted-foreground">{technique.when}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                            <span className="text-green-600">Step-by-Step Instructions</span>
                          </h4>
                          <ol className="space-y-2">
                            {technique.steps.map((step, idx) => (
                              <li key={idx} className="flex gap-3">
                                <span className="font-semibold text-primary flex-shrink-0">
                                  {idx + 1}.
                                </span>
                                <span className="text-sm">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        <div>
                          <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                            <span className="text-purple-600">Examples</span>
                          </h4>
                          <ul className="space-y-2">
                            {technique.examples.map((example, idx) => (
                              <li key={idx} className="flex gap-2">
                                <span className="text-purple-600 flex-shrink-0">•</span>
                                <span className="text-sm">{example}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                            <span className="text-orange-600">Benefits</span>
                          </h4>
                          <ul className="space-y-2">
                            {technique.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex gap-2">
                                <span className="text-green-600 flex-shrink-0">✓</span>
                                <span className="text-sm">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePrint(technique)}
                          >
                            <Printer className="h-4 w-4 mr-2" />
                            Print This Technique
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <Alert>
              <BookOpen className="h-4 w-4" />
              <AlertDescription>
                <strong>Practice makes progress:</strong> These techniques are most effective when practiced regularly. 
                Start with one technique and use it consistently before adding others. 
                Consider working with a therapist to personalize these approaches to your needs.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
