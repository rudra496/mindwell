"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Palette, Download, RotateCcw, Sparkles } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const mandalas = [
  {
    id: 1,
    name: "Flower Mandala",
    complexity: "Beginner",
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" stroke-width="2"/>
      ${Array.from({length: 8}, (_, i) => {
        const angle = (i * 45 * Math.PI) / 180
        const x1 = 100 + 20 * Math.cos(angle)
        const y1 = 100 + 20 * Math.sin(angle)
        const x2 = 100 + 80 * Math.cos(angle)
        const y2 = 100 + 80 * Math.sin(angle)
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="2"/>`
      }).join('')}
      ${Array.from({length: 16}, (_, i) => {
        const angle = (i * 22.5 * Math.PI) / 180
        const x = 100 + 70 * Math.cos(angle)
        const y = 100 + 70 * Math.sin(angle)
        return `<circle cx="${x}" cy="${y}" r="8" fill="none" stroke="currentColor" stroke-width="2"/>`
      }).join('')}
    </svg>`
  },
  {
    id: 2,
    name: "Geometric Star",
    complexity: "Intermediate",
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" stroke-width="2"/>
      ${Array.from({length: 12}, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180
        const x1 = 100 + 30 * Math.cos(angle)
        const y1 = 100 + 30 * Math.sin(angle)
        const x2 = 100 + 90 * Math.cos(angle)
        const y2 = 100 + 90 * Math.sin(angle)
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="2"/>`
      }).join('')}
      ${Array.from({length: 6}, (_, i) => {
        const angle = (i * 60 * Math.PI) / 180
        const r = 60
        return `<circle cx="${100 + r * Math.cos(angle)}" cy="${100 + r * Math.sin(angle)}" r="15" fill="none" stroke="currentColor" stroke-width="2"/>`
      }).join('')}
      <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="100" cy="100" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
    </svg>`
  },
  {
    id: 3,
    name: "Nature Harmony",
    complexity: "Advanced",
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="100" cy="100" r="75" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="100" cy="100" r="55" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="100" cy="100" r="35" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="100" cy="100" r="15" fill="none" stroke="currentColor" stroke-width="2"/>
      ${Array.from({length: 24}, (_, i) => {
        const angle = (i * 15 * Math.PI) / 180
        const x1 = 100 + 15 * Math.cos(angle)
        const y1 = 100 + 15 * Math.sin(angle)
        const x2 = 100 + 95 * Math.cos(angle)
        const y2 = 100 + 95 * Math.sin(angle)
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="1" opacity="0.5"/>`
      }).join('')}
      ${Array.from({length: 8}, (_, i) => {
        const angle = (i * 45 * Math.PI) / 180
        const r = 65
        const x = 100 + r * Math.cos(angle)
        const y = 100 + r * Math.sin(angle)
        return `<path d="M ${x},${y} Q ${x + 10 * Math.cos(angle + Math.PI/4)},${y + 10 * Math.sin(angle + Math.PI/4)} ${x + 15 * Math.cos(angle)},${y + 15 * Math.sin(angle)} Q ${x + 10 * Math.cos(angle - Math.PI/4)},${y + 10 * Math.sin(angle - Math.PI/4)} ${x},${y}" fill="none" stroke="currentColor" stroke-width="2"/>`
      }).join('')}
    </svg>`
  }
]

const colors = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", 
  "#DFE6E9", "#74B9FF", "#A29BFE", "#FD79A8", "#FDCB6E",
  "#6C5CE7", "#00B894", "#E17055", "#0984E3", "#FF7675"
]

export default function ColoringTherapy() {
  const [selectedMandala, setSelectedMandala] = useState(mandalas[0])
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [filled, setFilled] = useState<Record<string, string>>({})
  const [isColoring, setIsColoring] = useState(false)
  const svgRef = useRef<HTMLDivElement>(null)
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleReset = () => {
    setFilled({})
  }

  const handleDownload = () => {
    // Create downloadable image
    if (svgRef.current) {
      const svgElement = svgRef.current.querySelector('svg')
      if (svgElement) {
        const serializer = new XMLSerializer()
        const svgString = serializer.serializeToString(svgElement)
        const blob = new Blob([svgString], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `mindwell-coloring-${Date.now()}.svg`
        link.click()
        URL.revokeObjectURL(url)
      }
    }
  }

  const colorElement = (target: SVGElement) => {
    if (!isColoring) return
    
    if (target.tagName === 'circle' || target.tagName === 'path' || target.tagName === 'line') {
      let id = target.getAttribute('data-id')
      if (!id) {
        id = `${target.tagName}-${Math.random().toString(36).slice(2, 11)}`
        target.setAttribute('data-id', id)
      }
      
      // Apply color immediately to the element
      target.setAttribute('fill', selectedColor)
      if (target.tagName === 'circle') {
        target.setAttribute('stroke', selectedColor)
      }
      
      setFilled(prev => ({
        ...prev,
        [id]: selectedColor
      }))
    }
  }

  const handleElementClick = (e: React.MouseEvent) => {
    const target = e.target as SVGElement
    colorElement(target)
  }

  const handleElementTouch = (e: React.TouchEvent) => {
    e.preventDefault()
    if (!isColoring) return
    
    // Check if touches array exists and has at least one touch
    if (!e.touches || e.touches.length === 0) return
    
    // Throttle touch events to prevent excessive calls (50ms throttle)
    if (touchTimeoutRef.current) return
    
    touchTimeoutRef.current = setTimeout(() => {
      touchTimeoutRef.current = null
    }, 50)
    
    const touch = e.touches[0]
    const element = document.elementFromPoint(touch.clientX, touch.clientY) as SVGElement
    if (element) {
      colorElement(element)
    }
  }

  useEffect(() => {
    if (svgRef.current) {
      const svgElement = svgRef.current.querySelector('svg')
      if (svgElement) {
        const elements = svgElement.querySelectorAll('circle, path, line')
        elements.forEach(el => {
          const svgEl = el as SVGElement
          // Add pointer events and cursor style
          svgEl.style.cursor = 'pointer'
          svgEl.style.pointerEvents = 'all'
          
          const id = svgEl.getAttribute('data-id')
          if (id && filled[id]) {
            svgEl.setAttribute('fill', filled[id])
            if (svgEl.tagName === 'circle') {
              svgEl.setAttribute('stroke', filled[id])
            }
          }
        })
      }
    }
    
    // Cleanup timeout on unmount
    return () => {
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current)
      }
    }
  }, [filled, selectedMandala])

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Palette className="h-5 w-5 sm:h-6 sm:w-6 text-pink-600" />
          Mindful Coloring Therapy
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Reduce stress and anxiety through the meditative practice of coloring. 
          Focus on the present moment as you create beautiful art.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        {/* Mandala Selection */}
        <div>
          <h3 className="text-xs sm:text-sm font-medium mb-3">Choose a Design:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {mandalas.map((mandala) => (
              <button
                key={mandala.id}
                onClick={() => {
                  setSelectedMandala(mandala)
                  setFilled({})
                }}
                className={`p-3 sm:p-4 rounded-lg border-2 transition-all hover:scale-105 min-h-[100px] ${
                  selectedMandala.id === mandala.id
                    ? 'border-pink-500 bg-pink-50 dark:bg-pink-950/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-pink-300'
                }`}
              >
                <div 
                  className="w-full aspect-square text-gray-400"
                  dangerouslySetInnerHTML={{ __html: mandala.svg }}
                />
                <p className="text-xs font-medium mt-2 break-words">{mandala.name}</p>
                <p className="text-xs text-gray-500">{mandala.complexity}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Color Palette */}
        <div>
          <h3 className="text-xs sm:text-sm font-medium mb-3">Choose a Color:</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all hover:scale-110 touch-target ${
                  selectedColor === color ? 'ring-4 ring-offset-2 ring-pink-400' : ''
                }`}
                style={{ backgroundColor: color }}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        </div>

        {/* Coloring Canvas */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <Button
              onClick={() => setIsColoring(!isColoring)}
              variant={isColoring ? "default" : "outline"}
              className={`w-full sm:w-auto min-h-[44px] text-sm sm:text-base ${isColoring ? "bg-pink-600 hover:bg-pink-700" : ""}`}
            >
              <Palette className="mr-2 h-4 w-4" />
              {isColoring ? "Coloring Mode ON" : "Start Coloring"}
            </Button>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button onClick={handleReset} variant="outline" size="sm" className="flex-1 sm:flex-none min-h-[44px] text-xs sm:text-sm">
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button onClick={handleDownload} variant="outline" size="sm" className="flex-1 sm:flex-none min-h-[44px] text-xs sm:text-sm">
                <Download className="mr-2 h-4 w-4" />
                Save
              </Button>
            </div>
          </div>

          <div 
            ref={svgRef}
            onClick={handleElementClick}
            onTouchMove={handleElementTouch}
            onTouchStart={handleElementTouch}
            className={`bg-white dark:bg-gray-900 p-4 sm:p-8 rounded-lg border-2 ${
              isColoring ? 'border-pink-400 cursor-crosshair' : 'border-gray-200 dark:border-gray-700'
            } flex items-center justify-center min-h-[300px] sm:min-h-[400px] touch-none`}
            style={{ touchAction: isColoring ? 'none' : 'auto' }}
          >
            <div 
              className="w-full max-w-md text-gray-800 dark:text-gray-200"
              dangerouslySetInnerHTML={{ __html: selectedMandala.svg }}
            />
          </div>

          {isColoring && (
            <Alert>
              <Sparkles className="h-4 w-4" />
              <AlertDescription className="text-xs sm:text-sm">
                Click or tap on any area to color it. On mobile, drag your finger to color multiple areas. Take your time and enjoy the process!
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Benefits */}
        <div className="bg-gray-50 dark:bg-gray-900/50 p-3 sm:p-4 rounded-lg">
          <h4 className="font-semibold mb-2 text-xs sm:text-sm text-gray-900 dark:text-gray-100">Benefits of Coloring Therapy:</h4>
          <ul className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Reduces anxiety and stress (similar to meditation)</li>
            <li>• Improves focus and concentration</li>
            <li>• Promotes mindfulness and present-moment awareness</li>
            <li>• Activates creative parts of the brain</li>
            <li>• Provides a calming, repetitive activity</li>
            <li>• No artistic skill required - pure relaxation</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
