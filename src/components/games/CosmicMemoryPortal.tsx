"use client"

import { useState, useEffect, useRef } from "react"
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Trophy } from "lucide-react"
import * as THREE from "three"

class PortalSynth {
  private ctx: AudioContext | null = null

  playTone(frequency: number, type: 'sine' | 'sawtooth' | 'triangle' | 'square' = 'sine', duration: number = 0.5) {
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

      osc.type = type
      osc.frequency.setValueAtTime(frequency, now)

      gain.gain.setValueAtTime(0.2, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration)

      osc.start(now)
      osc.stop(now + duration)
    } catch (e) {}
  }
}

export function CosmicMemoryPortal() {
  const [level, setLevel] = useState(1)
  const [gameState, setGameState] = useState<'idle' | 'showing' | 'playing' | 'success' | 'failure'>('idle')
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [sequenceLength, setSequenceLength] = useState(3)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const synthRef = useRef<PortalSynth | null>(null)

  // Three.js refs
  const sceneRef = useRef<THREE.Scene | null>(null)
  const nodesRef = useRef<THREE.Mesh[]>([])
  const groupRef = useRef<THREE.Group | null>(null)
  const requestRef = useRef<number | null>(null)

  // Memory gameplay states
  const sequenceRef = useRef<number[]>([])
  const playerIndexRef = useRef<number>(0)

  const TONES = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25] // C4 to C5 Pentatonic

  useEffect(() => {
    synthRef.current = new PortalSynth()
    const saved = localStorage.getItem("cosmicMemoryHighScore")
    if (saved) setHighScore(parseInt(saved))
  }, [])

  const startGame = () => {
    setScore(0)
    setLevel(1)
    startLevel(1)
  }

  const startLevel = (lvl: number) => {
    setLevel(lvl)
    const len = 2 + lvl
    setSequenceLength(len)
    setGameState('showing')
    playerIndexRef.current = 0

    const seq: number[] = []
    for (let i = 0; i < len; i++) {
      seq.push(Math.floor(Math.random() * 8))
    }
    sequenceRef.current = seq

    setTimeout(() => {
      playSequence(seq)
    }, 800)
  }

  const playSequence = async (seq: number[]) => {
    for (let i = 0; i < seq.length; i++) {
      const nodeIndex = seq[i]
      const node = nodesRef.current[nodeIndex]
      if (node) {
        ;(node.material as THREE.MeshBasicMaterial).color.setHex(0xfbbf24) // Gold
        node.scale.set(1.5, 1.5, 1.5)

        const frequency = TONES[nodeIndex % TONES.length]
        synthRef.current?.playTone(frequency, 'sine', 0.6)

        await new Promise(r => setTimeout(r, 600))

        ;(node.material as THREE.MeshBasicMaterial).color.setHex(0x38bdf8) // Light blue
        node.scale.set(1, 1, 1)

        await new Promise(r => setTimeout(r, 200))
      }
    }
    setGameState('playing')
  }

  const handleNodeClick = (nodeIndex: number) => {
    if (gameState !== 'playing') return

    const targetIndex = sequenceRef.current[playerIndexRef.current]
    const clickedNode = nodesRef.current[nodeIndex]

    if (nodeIndex === targetIndex) {
      ;(clickedNode.material as THREE.MeshBasicMaterial).color.setHex(0x10b981) // Green success
      clickedNode.scale.set(1.4, 1.4, 1.4)
      synthRef.current?.playTone(TONES[nodeIndex % TONES.length], 'sine', 0.4)

      setTimeout(() => {
        ;(clickedNode.material as THREE.MeshBasicMaterial).color.setHex(0x38bdf8)
        clickedNode.scale.set(1, 1, 1)
      }, 300)

      playerIndexRef.current += 1

      if (playerIndexRef.current >= sequenceRef.current.length) {
        setScore(prev => prev + level * 50)
        setGameState('success')

        if (score + level * 50 > highScore) {
          setHighScore(score + level * 50)
          localStorage.setItem("cosmicMemoryHighScore", (score + level * 50).toString())
        }

        setTimeout(() => {
          startLevel(level + 1)
        }, 1500)
      }
    } else {
      ;(clickedNode.material as THREE.MeshBasicMaterial).color.setHex(0xef4444) // Red failure
      clickedNode.scale.set(1.4, 1.4, 1.4)
      synthRef.current?.playTone(130.81, 'sawtooth', 0.8) // Low C3 buzz

      setTimeout(() => {
        ;(clickedNode.material as THREE.MeshBasicMaterial).color.setHex(0x38bdf8)
        clickedNode.scale.set(1, 1, 1)
      }, 600)

      setGameState('failure')
    }
  }

  useEffect(() => {
    if (gameState === 'idle' || !containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth || 600
    const height = 400

    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#030712')
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.z = 12

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)
    groupRef.current = group

    const starsGeometry = new THREE.BufferGeometry()
    const starsCount = 200
    const starPositions = new Float32Array(starsCount * 3)
    for (let i = 0; i < starsCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 40
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    const starsMaterial = new THREE.PointsMaterial({ color: 0x4b5563, size: 0.08, sizeAttenuation: true })
    const starField = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(starField)

    const radius = 3.8
    const nodeCount = 8
    const nodes: THREE.Mesh[] = []
    const sphereGeometry = new THREE.SphereGeometry(0.35, 32, 32)

    for (let i = 0; i < nodeCount; i++) {
      const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.9
      })
      const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial)

      const phi = Math.acos(-1 + (2 * i) / nodeCount)
      const theta = Math.sqrt(nodeCount * Math.PI) * phi
      mesh.position.set(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      )
      mesh.userData = { index: i }
      group.add(mesh)
      nodes.push(mesh)
    }
    nodesRef.current = nodes

    for (let i = 0; i < nodeCount; i++) {
      const nextIndex = (i + 1) % nodeCount
      const crossIndex = (i + 3) % nodeCount
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0x1e293b, transparent: true, opacity: 0.4 })

      let points = [nodes[i].position, nodes[nextIndex].position]
      let geometry = new THREE.BufferGeometry().setFromPoints(points)
      let line = new THREE.Line(geometry, lineMaterial)
      group.add(line)

      points = [nodes[i].position, nodes[crossIndex].position]
      geometry = new THREE.BufferGeometry().setFromPoints(points)
      line = new THREE.Line(geometry, lineMaterial)
      group.add(line)
    }

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const onMouseClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(nodes)

      if (intersects.length > 0) {
        const index = intersects[0].object.userData.index
        handleNodeClick(index)
      }
    }

    renderer.domElement.addEventListener('click', onMouseClick)

    let active = true

    const animate = () => {
      if (!active) return

      group.rotation.y += 0.003
      group.rotation.x += 0.001
      starField.rotation.y += 0.0003

      renderer.render(scene, camera)
      requestRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      active = false
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
      if (renderer.domElement) {
        renderer.domElement.removeEventListener('click', onMouseClick)
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
          <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-teal-400" />
          Cosmic Memory Portal
        </DialogTitle>
        <DialogDescription className="text-sm text-slate-400">
          Watch the sequence of glowing cosmic nodes, and click them in the same order.
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-sm px-3 py-1 border-slate-700 bg-slate-900 text-slate-200">
              Level: {level}
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1 border-slate-700 bg-slate-900 text-slate-200">
              Score: {score}
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1 border-slate-700 bg-slate-900 text-slate-200">
              <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
              Best: {highScore}
            </Badge>
          </div>
          {gameState === 'showing' && (
            <Badge className="text-sm px-3 py-1 bg-yellow-950 text-yellow-400 border border-yellow-800 animate-pulse">
              Memorize Sequence...
            </Badge>
          )}
          {gameState === 'playing' && (
            <Badge className="text-sm px-3 py-1 bg-teal-950 text-teal-400 border border-teal-800">
              Repeat Sequence! ({playerIndexRef.current} / {sequenceLength})
            </Badge>
          )}
        </div>

        {gameState === 'idle' ? (
          <Card className="w-full max-w-md mx-auto bg-slate-900 border-slate-800">
            <CardContent className="p-6 text-center space-y-4">
              <div className="text-6xl mb-4 animate-pulse">🌌</div>
              <h3 className="text-xl font-bold text-teal-400">Cosmic Memory Portal</h3>
              <p className="text-sm text-slate-400">
                Train your working memory and focus. Replicate the sequential flashing node pathways on a 
                rotating 3D cosmic constellation globe.
              </p>
              <Button onClick={startGame} className="w-full bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold" size="lg">
                Enter Portal
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="relative w-full h-[400px] bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-inner flex justify-center items-center">
            {gameState === 'success' && (
              <div className="absolute z-10 bg-slate-950/80 p-4 rounded-lg text-center border border-teal-500/30">
                <p className="font-semibold text-teal-300">✨ Cosmic Alignment Success!</p>
                <p className="text-xs text-slate-400 mt-1">Sequence length increased to {sequenceLength + 1}.</p>
              </div>
            )}

            {gameState === 'failure' && (
              <div className="absolute z-10 bg-slate-950/85 p-6 rounded-lg text-center border border-red-500/30 max-w-sm mx-4">
                <p className="font-semibold text-red-400">Alignment Failed</p>
                <p className="text-sm text-slate-400 mt-1">Level reached: {level} — Final Score: {score}</p>
                <Button onClick={startGame} className="mt-4 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold w-full">
                  Try Again
                </Button>
              </div>
            )}

            <div ref={containerRef} className="w-full h-full block cursor-pointer" />
          </div>
        )}

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-3 sm:p-4 text-xs sm:text-sm text-slate-400">
            <p className="font-semibold mb-2 text-teal-400">Memory Benefits:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Trains spatial and sequential working memory capacities</li>
              <li>Improves concentration and visual focus</li>
              <li>Requires active suppression of distractors as the sphere rotates</li>
              <li>Strengthens neurological pathways related to memory retention</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
