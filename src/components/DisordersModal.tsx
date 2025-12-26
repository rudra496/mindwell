"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ExternalLink } from "lucide-react"

interface Disorder {
  id: string
  name: string
  category: string
  description: string
  symptoms: string
  prevalence: string
  naturalSolutions: string
  therapyApproaches: string
  whenToSeekHelp: string
}

export function DisordersModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [disorders, setDisorders] = useState<Disorder[]>([])
  const [selectedDisorder, setSelectedDisorder] = useState<Disorder | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (open) {
      fetch('/api/disorders')
        .then(res => res.json())
        .then(data => {
          setDisorders(data)
          setLoading(false)
        })
        .catch(err => {
          console.error('Error fetching disorders:', err)
          setLoading(false)
        })
    }
  }, [open])

  const filteredDisorders = disorders.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const categories = Array.from(new Set(disorders.map(d => d.category)))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Mental Health Disorders Database</DialogTitle>
          <DialogDescription>
            Comprehensive, evidence-based information on mental health conditions
          </DialogDescription>
        </DialogHeader>

        {!selectedDisorder ? (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search disorders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {loading ? (
              <div className="text-center py-8">Loading disorders...</div>
            ) : (
              <div className="grid gap-3">
                {categories.map(category => {
                  const categoryDisorders = filteredDisorders.filter(d => d.category === category)
                  if (categoryDisorders.length === 0) return null
                  
                  return (
                    <div key={category} className="space-y-2">
                      <h3 className="font-semibold text-lg text-primary">{category}</h3>
                      <div className="grid gap-2">
                        {categoryDisorders.map(disorder => (
                          <Button
                            key={disorder.id}
                            variant="outline"
                            className="justify-start h-auto py-3 px-4 text-left"
                            onClick={() => setSelectedDisorder(disorder)}
                          >
                            <div>
                              <div className="font-medium">{disorder.name}</div>
                              <div className="text-sm text-gray-600 mt-1">{disorder.description.substring(0, 100)}...</div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <Button variant="outline" onClick={() => setSelectedDisorder(null)}>
              ← Back to All Disorders
            </Button>

            <div>
              <h2 className="text-2xl font-bold mb-2">{selectedDisorder.name}</h2>
              <p className="text-gray-600 mb-4">{selectedDisorder.description}</p>
              <div className="text-sm text-primary font-medium">{selectedDisorder.prevalence}</div>
            </div>

            <Tabs defaultValue="symptoms" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
                <TabsTrigger value="solutions">Solutions</TabsTrigger>
                <TabsTrigger value="therapy">Therapy</TabsTrigger>
                <TabsTrigger value="help">Get Help</TabsTrigger>
              </TabsList>

              <TabsContent value="symptoms" className="space-y-2">
                <h3 className="font-semibold text-lg">Common Symptoms</h3>
                <ul className="list-disc list-inside space-y-1">
                  {JSON.parse(selectedDisorder.symptoms).map((symptom: string, idx: number) => (
                    <li key={idx} className="text-sm">{symptom}</li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="solutions" className="space-y-2">
                <h3 className="font-semibold text-lg">Evidence-Based Natural Solutions</h3>
                <ul className="list-disc list-inside space-y-1">
                  {JSON.parse(selectedDisorder.naturalSolutions).map((solution: string, idx: number) => (
                    <li key={idx} className="text-sm">{solution}</li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="therapy" className="space-y-2">
                <h3 className="font-semibold text-lg">Therapy Approaches</h3>
                <ul className="list-disc list-inside space-y-1">
                  {JSON.parse(selectedDisorder.therapyApproaches).map((approach: string, idx: number) => (
                    <li key={idx} className="text-sm">{approach}</li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="help" className="space-y-2">
                <h3 className="font-semibold text-lg">When to Seek Professional Help</h3>
                <ul className="list-disc list-inside space-y-1">
                  {JSON.parse(selectedDisorder.whenToSeekHelp).map((sign: string, idx: number) => (
                    <li key={idx} className="text-sm">{sign}</li>
                  ))}
                </ul>
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="font-semibold text-red-900 mb-2">Crisis Resources</p>
                  <p className="text-sm text-red-800">If you're in crisis: Call or text 988 (US) for immediate support</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
