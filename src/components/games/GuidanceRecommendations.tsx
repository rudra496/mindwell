import Link from 'next/link'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { GuidanceResult } from '@/lib/smart-guidance/guidance-engine'

interface GuidanceRecommendationsProps {
  guidanceResult: GuidanceResult
}

export function GuidanceRecommendations({ guidanceResult }: GuidanceRecommendationsProps) {
  return (
    <section className="space-y-4" aria-live="polite">
      <div className="space-y-1">
        <h3 className="font-semibold text-base sm:text-lg">Recommended Support for You Today</h3>
        <p className="text-sm text-muted-foreground">Risk level: {guidanceResult.riskLevel}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {guidanceResult.resources.slice(0, 4).map((resource) => (
          <Card key={`${resource.type}-${resource.href}`} className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{resource.title}</CardTitle>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full min-h-[44px]">
                <Link href={resource.href}>Open Resource</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Alert className="border-amber-200 bg-amber-50 text-amber-900">
        <AlertDescription>
          MindWell provides supportive guidance and educational resources. It does not replace professional medical advice.
        </AlertDescription>
      </Alert>
    </section>
  )
}
