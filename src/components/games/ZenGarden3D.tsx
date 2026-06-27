"use client"

import { useState, useEffect, useRef } from "react"
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Trophy } from "lucide-react"
import * as THREE from "three"

class ChimeSynth {
  private ctx: AudioContext | null = null

  playChime(pitch: number) {
    if (typeof window === 'undefined') return
    try {
      if (!this.ctx) {
        this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume()
      }
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(pitch, now)

      gain.gain.setValueAtTime(0.2, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5)

      osc.start(now)
      osc.stop(now + 1.5)
    } catch (e) {}
  }
}

export function ZenGarden3D() {
  const [level, setLevel] = useState(1)
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'success'>('idle')
  const [connectionsCount, setConnectionsCount] = useState(0)
  const [maxConnections, setMaxConnections] = useState(0)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const synthRef = useRef<ChimeSynth | null>(null)

  // Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const nodesRef = useRef<THREE.Mesh[]>([])
  const linesRef = useRef<THREE.Line[]>([])
  const selectedNodeRef = useRef<THREE.Mesh | null>(null)

  const LEVEL_CONFIGS = [
    { level: 1, nodeCount: 5, label: "Serene Orbit" },
    { level: 2, nodeCount: 8, label: "Harmony Net" },
    { level: 3, nodeCount: 12, label: "Tranquil Web" },
  ]

  useEffect(() => {
    synthRef.current = new ChimeSynth()
  }, [])

  const startLevel = (lvl: number) => {
    setLevel(lvl)
    setConnectionsCount(0)
    const nodeCount = LEVEL_CONFIGS[lvl - 1].nodeCount
    setMaxConnections(nodeCount - 1)
    setGameState('playing')
  }

  useEffect(() => {
    if (gameState !== 'playing' || !containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth || 600
    const height = 400

    // Setup Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#090d16')
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.z = 15

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x2dd4bf, 1, 100)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    // Add starfield particles in background
    const starsGeometry = new THREE.BufferGeometry()
    const starsCount = 150
    const starPositions = new Float32Array(starsCount * 3)
    for (let i = 0; i < starsCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 40
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    const starsMaterial = new THREE.PointsMaterial({ color: 0x64748b, size: 0.1, sizeAttenuation: true })
    const starField = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(starField)

    // Create glowing nodes
    const nodeCount = LEVEL_CONFIGS[level - 1].nodeCount
    const nodes: THREE.Mesh[] = []
    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32)

    for (let i = 0; i < nodeCount; i++) {
      const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x2dd4bf,
        transparent: true,
        opacity: 0.8
      })
      const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial)

      mesh.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6
      )
      mesh.userData = { id: i, selected: false, connections: 0 }
      scene.add(mesh)
      nodes.push(mesh)
    }
    nodesRef.current = nodes
    linesRef.current = []
    selectedNodeRef.current = null

    // Raycaster for mouse interaction
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0
    let rotX = 0
    let rotY = 0

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true
      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX
        const deltaY = e.clientY - prevMouseY
        rotY += deltaX * 0.005
        rotX += deltaY * 0.005
        prevMouseX = e.clientX
        prevMouseY = e.clientY
      }
    }

    const onMouseUp = () => {
      isDragging = false
    }

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(nodes)

      if (intersects.length > 0) {
        const clickedNode = intersects[0].object as THREE.Mesh

        if (!selectedNodeRef.current) {
          selectedNodeRef.current = clickedNode
          ;(clickedNode.material as THREE.MeshBasicMaterial).color.setHex(0xfbbf24) // Gold
          synthRef.current?.playChime(330) // E note
        } else {
          if (selectedNodeRef.current === clickedNode) {
            ;(clickedNode.material as THREE.MeshBasicMaterial).color.setHex(0x2dd4bf)
            selectedNodeRef.current = null
            return
          }

          // Draw connection line
          const material = new THREE.LineBasicMaterial({ color: 0xfbbf24, linewidth: 2 })
          const points = [selectedNodeRef.current.position, clickedNode.position]
          const geometry = new THREE.BufferGeometry().setFromPoints(points)
          const line = new THREE.Line(geometry, material)
          scene.add(line)
          linesRef.current.push(line)

          // Play success chime
          const frequencies = [392, 440, 523, 587, 659, 784, 880]
          const currentChimeIndex = Math.min(connectionsCount, frequencies.length - 1)
          synthRef.current?.playChime(frequencies[currentChimeIndex])

          ;(selectedNodeRef.current.material as THREE.MeshBasicMaterial).color.setHex(0x2dd4bf)
          selectedNodeRef.current = null

          setConnectionsCount(c => {
            const next = c + 1
            const required = LEVEL_CONFIGS[level - 1].nodeCount - 1
            if (next >= required) {
              setGameState('success')
            }
            return next
          })
        }
      }
    }

    renderer.domElement.addEventListener('mousedown', onMouseDown)
    renderer.domElement.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    renderer.domElement.addEventListener('click', onClick)

    let active = true

    const animate = () => {
      if (!active) return

      starField.rotation.y += 0.0005
      nodes.forEach((node, idx) => {
        node.position.y += Math.sin(Date.now() * 0.001 + idx) * 0.002
        node.position.x += Math.cos(Date.now() * 0.0008 + idx) * 0.002
      })

      scene.rotation.y = rotY
      scene.rotation.x = rotX

      renderer.render(scene, camera)
      requestRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      active = false
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
      window.removeEventListener('mouseup', onMouseUp)
      if (renderer.domElement) {
        renderer.domElement.removeEventListener('mousedown', onMouseDown)
        renderer.domElement.removeEventListener('mousemove', onMouseMove)
        renderer.domElement.removeEventListener('click', onClick)
      }
      try {
        container.removeChild(renderer.domElement)
      } catch (e) {}
    }
  }, [gameState, level])

  return (
    <div className="p-4 sm:p-6 bg-slate-950 text-slate-100 border-slate-800">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl text-teal-400">
          <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-teal-400" />
          Zen Garden 3D
        </DialogTitle>
        <DialogDescription className="text-sm text-slate-400">
          Draw calming paths of energy to align glowing particles. Promotes sensory grounding.
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-sm px-3 py-1 border-slate-700 bg-slate-900 text-slate-200">
              Garden: {LEVEL_CONFIGS[level - 1].label}
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1 border-slate-700 bg-slate-900 text-slate-200">
              Connections: {connectionsCount} / {maxConnections}
            </Badge>
          </div>
        </div>

        {gameState === 'idle' ? (
          <Card className="w-full max-w-md mx-auto bg-slate-900 border-slate-800">
            <CardContent className="p-6 text-center space-y-4">
              <div className="text-6xl mb-4 animate-pulse">🌌</div>
              <h3 className="text-xl font-bold text-teal-400">3D Particle Zen Garden</h3>
              <p className="text-sm text-slate-400">
                Connect all slow-floating particles in space by clicking two spheres sequentially. 
                Experience calming synthesised chiming notes as each beam of energy is formed.
              </p>
              <Button onClick={() => startLevel(1)} className="w-full bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold" size="lg">
                Enter Zen Garden
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="relative w-full h-[400px] bg-[#090d16] rounded-xl border border-slate-800 overflow-hidden shadow-inner flex justify-center items-center">
            {gameState === 'success' && (
              <div className="absolute z-10 bg-slate-950/80 p-6 rounded-lg text-center border border-teal-500/30 max-w-md mx-4 animate-fade-in">
                <div className="text-4xl mb-2">💫</div>
                <h4 className="font-bold text-lg text-teal-300">Garden Alignment Achieved</h4>
                <p className="text-sm text-slate-300 mt-1">Your mind is in harmony.</p>
                {level < 3 ? (
                  <Button onClick={() => startLevel(level + 1)} className="mt-4 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold">
                    Next Garden Level
                  </Button>
                ) : (
                  <Button onClick={() => startLevel(1)} className="mt-4 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold">
                    Start Again
                  </Button>
                )}
              </div>
            )}
            <div ref={containerRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />
          </div>
        )}

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-3 sm:p-4 text-xs sm:text-sm text-slate-400">
            <p className="font-semibold mb-2 text-teal-400">Grounding Benefits:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Uses 3D parallax tracking to steady visual attention</li>
              <li>Acoustic chime feedback aids sensory centering</li>
              <li>Encourages slow, deliberate motor interactions to calm anxiety</li>
              <li>Reduces symptoms of distress through open-ended spatial puzzles</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
