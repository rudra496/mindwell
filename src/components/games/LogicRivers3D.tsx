"use client"

import { useState, useEffect, useRef } from "react"
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, HelpCircle, ArrowLeftRight, RefreshCw, ShoppingCart, Sun, Moon, CloudRain, Heart } from "lucide-react"
import * as THREE from "three"

// Entity Definition
interface Entity {
  id: string
  name: string
  emoji: string
  color: string
  isDriver: boolean
  weight: number
  predatorOf?: string // Eats this id
  partnerOf?: string  // Partner id
}

interface LevelConfig {
  levelNum: number
  name: string
  description: string
  entities: Entity[]
  boatCapacity: number
  weightLimit: number
  timeLimit?: number
}

// Upgrade item type
interface UpgradeItem {
  id: string
  name: string
  description: string
  cost: number
  purchased: boolean
}

// Sound Synthesizer via Web Audio API
class LogicRiversSynth {
  private ctx: AudioContext | null = null

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
    return this.ctx
  }

  playChime(freq: number, duration: number = 0.4) {
    const ctx = this.initCtx()
    if (!ctx) return
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, now)

      gain.gain.setValueAtTime(0.2, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration)

      osc.start(now)
      osc.stop(now + duration)
  }

  playSplash() {
    const ctx = this.initCtx()
    if (!ctx) return
    const now = ctx.currentTime

    const bufferSize = ctx.sampleRate * 0.5
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noiseNode = ctx.createBufferSource()
    noiseNode.buffer = buffer

    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(800, now)
    filter.frequency.exponentialRampToValueAtTime(150, now + 0.5)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.15, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5)

    noiseNode.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    noiseNode.start(now)
    noiseNode.stop(now + 0.5)
  }

  playError() {
    const ctx = this.initCtx()
    if (!ctx) return
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(120, now)

    gain.gain.setValueAtTime(0.25, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5)

    osc.start(now)
    osc.stop(now + 0.5)
  }
}

// Procedural Level Generation Pool
const ENTIRE_POOLS = [
  { id: 'f1', name: 'Farmer', emoji: '🧑‍🌾', color: '#10b981', isDriver: true, weight: 80 },
  { id: 'w1', name: 'Wolf', emoji: '🐺', color: '#64748b', isDriver: false, weight: 40, predatorOf: 'g1' },
  { id: 'g1', name: 'Goat', emoji: '🐐', color: '#fbbf24', isDriver: false, weight: 30, predatorOf: 'c1' },
  { id: 'c1', name: 'Cabbage', emoji: '🥬', color: '#22c55e', isDriver: false, weight: 10 },
  { id: 'p1', name: 'Pilot', emoji: '🧑‍✈️', color: '#a855f7', isDriver: true, weight: 75 },
  { id: 'r1', name: 'Robot', emoji: '🤖', color: '#3b82f6', isDriver: false, weight: 90, predatorOf: 'b1' },
  { id: 'b1', name: 'Battery', emoji: '🔋', color: '#22c55e', isDriver: false, weight: 20 },
  { id: 's1', name: 'Scientist', emoji: '🧑‍🔬', color: '#ec4899', isDriver: true, weight: 70 },
  { id: 'ch1', name: 'Chemical', emoji: '🧪', color: '#f43f5e', isDriver: false, weight: 15 },
]

export function LogicRivers3D() {
  const [level, setLevel] = useState(1)
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'failed' | 'victory' | 'shop'>('idle')
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [hint, setHint] = useState<string | null>(null)
  const [violationMessage, setViolationMessage] = useState<string | null>(null)

  // Current Level config
  const [currentConfig, setCurrentConfig] = useState<LevelConfig | null>(null)

  // Play bank states
  const [leftEntities, setLeftEntities] = useState<Entity[]>([])
  const [rightEntities, setRightEntities] = useState<Entity[]>([])
  const [boatEntities, setBoatEntities] = useState<Entity[]>([])
  const [boatSide, setBoatSide] = useState<'left' | 'right'>('left')
  const [timeUsed, setTimeUsed] = useState(0)

  // Shop Upgrades
  const [upgrades, setUpgrades] = useState<UpgradeItem[]>([
    { id: 'capacity', name: 'Boat Expansion', description: 'Increases boat capacity limit by +1.', cost: 300, purchased: false },
    { id: 'speed', name: 'Solar Engine', description: 'Reduces time crossing penalty by 2s.', cost: 200, purchased: false },
  ])

  // Environment Toggles (Day/Night & Weather)
  const [isNight, setIsNight] = useState(false)
  const [isRaining, setIsRaining] = useState(false)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const synthRef = useRef<LogicRiversSynth | null>(null)

  // Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const boatMeshRef = useRef<THREE.Mesh | null>(null)
  const entityMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map())
  const rainSystemRef = useRef<THREE.Points | null>(null)
  const requestRef = useRef<number | null>(null)

  // Initialize synth and highscores
  useEffect(() => {
    synthRef.current = new LogicRiversSynth()
    const saved = localStorage.getItem("proceduralRiversHighScore")
    if (saved) setHighScore(parseInt(saved))
  }, [])

  // Constraint checking engine
  const checkStateViolation = (left: Entity[], right: Entity[], currentSide: 'left' | 'right'): string | null => {
    if (!currentConfig) return null

    // Check bank violations
    const checkBank = (bank: Entity[]): string | null => {
      const ids = bank.map(e => e.id)
      const hasDriver = bank.some(e => e.isDriver)

      if (!hasDriver) {
        // Look for predation/conflicts
        for (const entity of bank) {
          if (entity.predatorOf && ids.includes(entity.predatorOf)) {
            const victim = bank.find(v => v.id === entity.predatorOf)
            return `Unsupervised Bank: The ${entity.name} consumed/damaged the ${victim?.name}!`
          }
        }
      }
      return null
    }

    // Only validate the bank the driver just left
    const violatedLeft = currentSide === 'right' && checkBank(left)
    if (violatedLeft) return violatedLeft

    const violatedRight = currentSide === 'left' && checkBank(right)
    if (violatedRight) return violatedRight

    return null
  }

  // BFS Solver to verify solvability & generate hints
  const solvePuzzle = (config: LevelConfig, startLeft: Entity[], startRight: Entity[], startSide: 'left' | 'right'): string[] | null => {
    interface SearchNode {
      left: string[]
      right: string[]
      side: 'left' | 'right'
      path: string[]
    }

    const queue: SearchNode[] = [{
      left: startLeft.map(e => e.id),
      right: startRight.map(e => e.id),
      side: startSide,
      path: []
    }]

    const visited = new Set<string>()
    const serialize = (left: string[], side: 'left' | 'right') => `${side}_${[...left].sort().join(",")}`
    visited.add(serialize(queue[0].left, queue[0].side))

    const activeCapacity = upgrades.find(u => u.id === 'capacity')?.purchased ? config.boatCapacity + 1 : config.boatCapacity

    while (queue.length > 0) {
      const current = queue.shift()!

      if (current.left.length === 0) {
        return current.path
      }

      const bankIds = current.side === 'left' ? current.left : current.right
      const nextSide = current.side === 'left' ? 'right' : 'left'

      // Generate transitions (subset size up to activeCapacity)
      const passengerOptions: string[][] = []
      // Size 1
      bankIds.forEach(id => passengerOptions.push([id]))
      // Size 2
      if (activeCapacity >= 2) {
        for (let i = 0; i < bankIds.length; i++) {
          for (let j = i + 1; j < bankIds.length; j++) {
            passengerOptions.push([bankIds[i], bankIds[j]])
          }
        }
      }
      // Size 3
      if (activeCapacity >= 3) {
        for (let i = 0; i < bankIds.length; i++) {
          for (let j = i + 1; j < bankIds.length; j++) {
            for (let k = j + 1; k < bankIds.length; k++) {
              passengerOptions.push([bankIds[i], bankIds[j], bankIds[k]])
            }
          }
        }
      }

      for (const pass of passengerOptions) {
        // Must contain at least one driver
        const hasDriver = pass.some(id => {
          const entity = config.entities.find(e => e.id === id)
          return entity?.isDriver
        })
        if (!hasDriver) continue

        // Check weight limits
        const totalWeight = pass.reduce((sum, id) => sum + (config.entities.find(e => e.id === id)?.weight || 0), 0)
        if (totalWeight > config.weightLimit) continue

        const nextLeft = current.side === 'left'
          ? current.left.filter(id => !pass.includes(id))
          : [...current.left, ...pass]
        const nextRight = current.side === 'right'
          ? current.right.filter(id => !pass.includes(id))
          : [...current.right, ...pass]

        // Validate banks
        const mapLeft = nextLeft.map(id => config.entities.find(e => e.id === id)!)
        const mapRight = nextRight.map(id => config.entities.find(e => e.id === id)!)

        // Check bank predation
        let bankViolation = false
        const checkBankSafe = (bank: Entity[]): boolean => {
          const ids = bank.map(e => e.id)
          const hasDriverBank = bank.some(e => e.isDriver)
          if (!hasDriverBank) {
            for (const ent of bank) {
              if (ent.predatorOf && ids.includes(ent.predatorOf)) return false
            }
          }
          return true
        }

        if (nextSide === 'right' && !checkBankSafe(mapLeft)) bankViolation = true
        if (nextSide === 'left' && !checkBankSafe(mapRight)) bankViolation = true

        if (!bankViolation) {
          const key = serialize(nextLeft, nextSide)
          if (!visited.has(key)) {
            visited.add(key)
            queue.push({
              left: nextLeft,
              right: nextRight,
              side: nextSide,
              path: [...current.path, `Take ${pass.map(id => config.entities.find(e => e.id === id)?.name).join(" & ")} to the ${nextSide} bank`]
            })
          }
        }
      }
    }

    return null // Unsolvable state
  }

  // Generate a solvable level procedurally
  const generateLevel = (levelNum: number) => {
    let attempts = 0
    while (attempts < 100) {
      attempts++
      // Select 4-6 random entities based on level number
      const entitiesCount = Math.min(4 + Math.floor(levelNum / 2), 6)
      const selectedEntities: Entity[] = []

      // Always include at least one driver (e.g. Farmer)
      selectedEntities.push(ENTIRE_POOLS[0]) // Farmer

      // Pick other random items
      const pool = ENTIRE_POOLS.slice(1)
      const shuffled = pool.sort(() => Math.random() - 0.5)
      for (let i = 0; i < entitiesCount - 1; i++) {
        if (shuffled[i]) selectedEntities.push(shuffled[i])
      }

      const generatedConfig: LevelConfig = {
        levelNum,
        name: `Procedural Valley ${levelNum}`,
        description: `Navigate ${entitiesCount} items across the bank. Weight and predation checks are active.`,
        entities: selectedEntities,
        boatCapacity: 2,
        weightLimit: 140 + (levelNum * 10),
      }

      // Check if solvable from initial state
      const solution = solvePuzzle(generatedConfig, selectedEntities, [], 'left')
      if (solution && solution.length >= 3) {
        setCurrentConfig(generatedConfig)
        setLeftEntities([...selectedEntities])
        setRightEntities([])
        setBoatEntities([])
        setBoatSide('left')
        setTimeUsed(0)
        setViolationMessage(null)
        setHint(null)
        setGameState('playing')
        return
      }
    }
  }

  const handleEntityMove = (entityId: string) => {
    if (gameState !== 'playing' || !currentConfig) return

    const target = currentConfig.entities.find(e => e.id === entityId)
    if (!target) return

    // Limit calculation
    const maxCapacity = upgrades.find(u => u.id === 'capacity')?.purchased ? currentConfig.boatCapacity + 1 : currentConfig.boatCapacity

    // 1. If inside boat -> land to current side bank
    if (boatEntities.some(e => e.id === entityId)) {
      synthRef.current?.playChime(360, 0.2)
      setBoatEntities(prev => prev.filter(e => e.id !== entityId))
      if (boatSide === 'left') {
        setLeftEntities(prev => [...prev, target])
      } else {
        setRightEntities(prev => [...prev, target])
      }
      return
    }

    // 2. If on left bank and boat is on left -> load to boat
    if (leftEntities.some(e => e.id === entityId) && boatSide === 'left') {
      if (boatEntities.length >= maxCapacity) {
        synthRef.current?.playError()
        return
      }
      const boatWeight = boatEntities.reduce((s, e) => s + e.weight, 0)
      if (boatWeight + target.weight > currentConfig.weightLimit) {
        synthRef.current?.playError()
        setViolationMessage("Weight limit exceeded! Boat will capsize.")
        setTimeout(() => setViolationMessage(null), 2000)
        return
      }

      synthRef.current?.playChime(450, 0.2)
      setLeftEntities(prev => prev.filter(e => e.id !== entityId))
      setBoatEntities(prev => [...prev, target])
      return
    }

    // 3. If on right bank and boat is on right -> load to boat
    if (rightEntities.some(e => e.id === entityId) && boatSide === 'right') {
      if (boatEntities.length >= maxCapacity) {
        synthRef.current?.playError()
        return
      }
      const boatWeight = boatEntities.reduce((s, e) => s + e.weight, 0)
      if (boatWeight + target.weight > currentConfig.weightLimit) {
        synthRef.current?.playError()
        setViolationMessage("Weight limit exceeded! Boat will capsize.")
        setTimeout(() => setViolationMessage(null), 2000)
        return
      }

      synthRef.current?.playChime(450, 0.2)
      setRightEntities(prev => prev.filter(e => e.id !== entityId))
      setBoatEntities(prev => [...prev, target])
      return
    }
  }

  const handleRowBoat = () => {
    if (gameState !== 'playing' || !currentConfig) return

    // Requires at least one driver
    const hasDriver = boatEntities.some(e => e.isDriver)
    if (!hasDriver) {
      synthRef.current?.playError()
      setViolationMessage("The boat cannot move without a designated driver (e.g. Farmer)!")
      return
    }

    synthRef.current?.playSplash()
    const nextSide = boatSide === 'left' ? 'right' : 'left'
    setBoatSide(nextSide)

    // Calculate crossing crossing penalty time
    const basePenalty = 5
    const engineUpgrade = upgrades.find(u => u.id === 'speed')?.purchased
    const finalPenalty = engineUpgrade ? Math.max(1, basePenalty - 2) : basePenalty
    setTimeUsed(t => t + finalPenalty)

    // Verify constraints upon landing
    setTimeout(() => {
      const resultingLeft = nextSide === 'left' ? [...leftEntities, ...boatEntities] : leftEntities
      const resultingRight = nextSide === 'right' ? [...rightEntities, ...boatEntities] : rightEntities

      const violation = checkStateViolation(resultingLeft, resultingRight, nextSide)
      if (violation) {
        synthRef.current?.playError()
        setViolationMessage(violation)
        setGameState('failed')
      } else {
        // Auto discharge passengers to landing bank
        setBoatEntities([])
        if (nextSide === 'left') {
          setLeftEntities(prev => [...prev, ...boatEntities])
        } else {
          setRightEntities(prev => [...prev, ...boatEntities])
        }

        // Check level clear state
        setTimeout(() => {
          if (resultingLeft.length === 0 && boatEntities.length === 0) {
            setGameState('victory')
            synthRef.current?.playChime(523, 0.4)
            setTimeout(() => synthRef.current?.playChime(659, 0.4), 150)
            setTimeout(() => synthRef.current?.playChime(784, 0.6), 300)

            const levelBonus = level * 150
            setScore(s => {
              const next = s + levelBonus
              if (next > highScore) {
                setHighScore(next)
                localStorage.setItem("proceduralRiversHighScore", next.toString())
              }
              return next
            })
          }
        }, 100)
      }
    }, 800)
  }

  const handleAIHint = () => {
    if (!currentConfig || gameState !== 'playing') return
    const path = solvePuzzle(currentConfig, leftEntities, rightEntities, boatSide)
    if (path && path.length > 0) {
      setHint(path[0])
    } else {
      setHint("This combination is a dead-end! Reset or rearrange passenger bank sides.")
    }
  }

  const handlePurchaseUpgrade = (id: string) => {
    const item = upgrades.find(u => u.id === id)
    if (item && score >= item.cost && !item.purchased) {
      setScore(s => s - item.cost)
      setUpgrades(prev => prev.map(u => u.id === id ? { ...u, purchased: true } : u))
      synthRef.current?.playChime(660, 0.3)
    } else {
      synthRef.current?.playError()
    }
  }

  // Three.js graphics initialization & update render
  useEffect(() => {
    if (gameState === 'idle' || gameState === 'shop' || !containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth || 600
    const height = 400

    const scene = new THREE.Scene()
    // Dynamic Day / Night backdrop
    scene.background = new THREE.Color(isNight ? '#020617' : '#075985')
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(0, 8, 12)
    camera.lookAt(0, 0, -1)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, isNight ? 0.3 : 0.8)
    scene.add(ambient)

    const sunlight = new THREE.DirectionalLight(isNight ? 0x60a5fa : 0xfef08a, isNight ? 0.4 : 0.9)
    sunlight.position.set(5, 12, 5)
    scene.add(sunlight)

    // Landing Bank Meshes
    const bankGeo = new THREE.BoxGeometry(4.5, 1, 6)
    const bankMat = new THREE.MeshLambertMaterial({ color: isNight ? 0x052e16 : 0x14532d })
    const leftBank = new THREE.Mesh(bankGeo, bankMat)
    leftBank.position.set(-6, -0.1, 0)
    scene.add(leftBank)

    const rightBank = new THREE.Mesh(bankGeo, bankMat)
    rightBank.position.set(6, -0.1, 0)
    scene.add(rightBank)

    // Wave River geometry
    const riverGeo = new THREE.PlaneGeometry(8.5, 6, 20, 20)
    const riverMat = new THREE.MeshLambertMaterial({ color: isNight ? 0x0f172a : 0x0284c7, side: THREE.DoubleSide })
    const river = new THREE.Mesh(riverGeo, riverMat)
    river.rotation.x = -Math.PI / 2
    river.position.set(0, -0.1, 0)
    scene.add(river)

    // Wooden Boat
    const boatGeo = new THREE.BoxGeometry(2.2, 0.4, 1.4)
    const boatMat = new THREE.MeshLambertMaterial({ color: 0x7c2d12 })
    const boatMesh = new THREE.Mesh(boatGeo, boatMat)
    boatMesh.position.set(-3.5, 0.15, 0)
    scene.add(boatMesh)
    boatMeshRef.current = boatMesh

    // Entities low poly diamonds
    const entityMeshes = new Map<string, THREE.Mesh>()
    const shapeGeo = new THREE.OctahedronGeometry(0.35, 0)

    if (currentConfig) {
      currentConfig.entities.forEach((ent, idx) => {
        const mat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(ent.color),
          roughness: 0.1,
          metalness: 0.2
        })
        const mesh = new THREE.Mesh(shapeGeo, mat)
        mesh.position.set(-6, 0.6, -2 + idx * 1.2)
        scene.add(mesh)
        entityMeshes.set(ent.id, mesh)
      })
    }
    entityMeshesRef.current = entityMeshes

    // Weather Rain Particle System
    let rainSystem: THREE.Points | null = null
    if (isRaining) {
      const rainCount = 100
      const rainPositions = new Float32Array(rainCount * 3)
      for (let i = 0; i < rainCount * 3; i += 3) {
        rainPositions[i] = (Math.random() - 0.5) * 14
        rainPositions[i + 1] = Math.random() * 8
        rainPositions[i + 2] = (Math.random() - 0.5) * 6
      }
      const rainGeo = new THREE.BufferGeometry()
      rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3))
      const rainMat = new THREE.PointsMaterial({ color: 0x93c5fd, size: 0.08, transparent: true })
      rainSystem = new THREE.Points(rainGeo, rainMat)
      scene.add(rainSystem)
      rainSystemRef.current = rainSystem
    }

    let active = true

    // Rendering animation frame update loop
    const animate = () => {
      if (!active) return

      // Water sine offset
      const riverPos = riverGeo.attributes.position.array as Float32Array
      for (let i = 0; i < riverPos.length; i += 3) {
        riverPos[i + 2] = Math.sin(Date.now() * 0.002 + riverPos[i]) * 0.12
      }
      riverGeo.attributes.position.needsUpdate = true

      // Slow rotate entities
      entityMeshes.forEach(mesh => {
        mesh.rotation.y += 0.015
      })

      // Rain drop particle downward movements
      if (rainSystem && rainSystem.geometry) {
        const positions = rainSystem.geometry.attributes.position.array as Float32Array
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] -= 0.12
          if (positions[i] < 0) positions[i] = 8
        }
        rainSystem.geometry.attributes.position.needsUpdate = true
      }

      // Smooth boat crossing target coordinate glide
      const targetBoatX = boatSide === 'left' ? -3.5 : 3.5
      boatMesh.position.x = THREE.MathUtils.lerp(boatMesh.position.x, targetBoatX, 0.07)

      // Lerp passengers bank locations
      leftEntities.forEach((ent, idx) => {
        const mesh = entityMeshes.get(ent.id)
        if (mesh) {
          const tx = -6
          const ty = 0.6
          const tz = -2 + idx * 1.2
          mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, tx, 0.1)
          mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, ty, 0.1)
          mesh.position.z = THREE.MathUtils.lerp(mesh.position.z, tz, 0.1)
        }
      })

      rightEntities.forEach((ent, idx) => {
        const mesh = entityMeshes.get(ent.id)
        if (mesh) {
          const tx = 6
          const ty = 0.6
          const tz = -2 + idx * 1.2
          mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, tx, 0.1)
          mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, ty, 0.1)
          mesh.position.z = THREE.MathUtils.lerp(mesh.position.z, tz, 0.1)
        }
      })

      boatEntities.forEach((ent, idx) => {
        const mesh = entityMeshes.get(ent.id)
        if (mesh) {
          const tx = boatMesh.position.x - 0.5 + idx * 0.6
          const ty = 0.65
          const tz = 0
          mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, tx, 0.1)
          mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, ty, 0.1)
          mesh.position.z = THREE.MathUtils.lerp(mesh.position.z, tz, 0.1)
        }
      })

      renderer.render(scene, camera)
      requestRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      active = false
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
      try {
        container.removeChild(renderer.domElement)
      } catch (e) {}
    }
  }, [gameState, leftEntities, rightEntities, boatEntities, boatSide, isNight, isRaining])

  return (
    <div className="p-4 sm:p-6 bg-slate-950 text-slate-100 border-slate-800">
      <DialogHeader>
        <DialogTitle className="flex items-center justify-between text-xl sm:text-2xl text-teal-400">
          <span className="flex items-center gap-2">
            <ArrowLeftRight className="h-5 w-5 sm:h-6 sm:w-6 text-teal-400" />
            MindWell Logic Rivers Pro
          </span>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsNight(!isNight)}
              variant="outline"
              size="icon"
              className="h-8 w-8 border-slate-800 hover:bg-slate-900"
              title="Toggle Day/Night"
            >
              {isNight ? <Sun className="h-4 w-4 text-yellow-500" /> : <Moon className="h-4 w-4 text-blue-400" />}
            </Button>
            <Button
              onClick={() => setIsRaining(!isRaining)}
              variant="outline"
              size="icon"
              className="h-8 w-8 border-slate-800 hover:bg-slate-900"
              title="Toggle Rain Weather"
            >
              <CloudRain className={`h-4 w-4 ${isRaining ? 'text-blue-400' : 'text-slate-400'}`} />
            </Button>
          </div>
        </DialogTitle>
        <DialogDescription className="text-sm text-slate-400">
          Advanced river-crossing logic trainer. Procedural solvability engine, boat upgrades shop, and day/night rendering.
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 space-y-4">
        {/* Stats bar */}
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-sm px-3 py-1 border-slate-700 bg-slate-900 text-slate-200">
              Score: {score}
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1 border-slate-700 bg-slate-900 text-slate-200">
              Best: {highScore}
            </Badge>
            {gameState === 'playing' && (
              <Badge variant="outline" className="text-sm px-3 py-1 border-slate-700 bg-slate-900 text-slate-200">
                Weight Limit: {boatEntities.reduce((s, e) => s + e.weight, 0)} / {currentConfig?.weightLimit}kg
              </Badge>
            )}
          </div>

          <div className="flex gap-2">
            {gameState === 'playing' && (
              <>
                <Button onClick={handleAIHint} variant="outline" size="sm" className="border-slate-800 hover:bg-slate-900 text-xs">
                  Hint
                </Button>
                <Button onClick={() => generateLevel(level)} variant="outline" size="sm" className="border-slate-800 hover:bg-slate-900 text-xs">
                  Reset Level
                </Button>
              </>
            )}
            <Button
              onClick={() => setGameState(gameState === 'shop' ? 'playing' : 'shop')}
              variant="outline"
              size="sm"
              className="border-slate-800 hover:bg-slate-900 text-xs"
            >
              <ShoppingCart className="h-3.5 w-3.5 mr-1" />
              Shop Upgrades
            </Button>
          </div>
        </div>

        {/* Shop view */}
        {gameState === 'shop' && (
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-bold text-teal-400">Boat Upgrades & Accessories</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {upgrades.map(item => (
                  <div key={item.id} className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-200">{item.name}</span>
                      <Badge className={item.purchased ? "bg-emerald-950 text-emerald-400" : "bg-teal-950 text-teal-400"}>
                        {item.purchased ? "Owned" : `${item.cost} pts`}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400">{item.description}</p>
                    <Button
                      onClick={() => handlePurchaseUpgrade(item.id)}
                      disabled={item.purchased || score < item.cost}
                      size="sm"
                      className="w-full bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold mt-2"
                    >
                      {item.purchased ? "Purchased" : "Buy Upgrade"}
                    </Button>
                  </div>
                ))}
              </div>
              <Button onClick={() => setGameState('playing')} className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200">
                Back to Game
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Dashboard */}
        {gameState === 'idle' && (
          <Card className="w-full max-w-[95vw] sm:max-w-md mx-auto bg-slate-900 border-slate-800">
            <CardContent className="p-6 text-center space-y-4">
              <div className="text-6xl mb-4 animate-bounce">⛵</div>
              <h3 className="text-xl font-bold text-teal-400">Logic Rivers Pro</h3>
              <p className="text-sm text-slate-400">
                Solve procedural river crossings safely. Put items in the boat and row across 
                without breaking weight constraints or leaving matching prey alone with predators.
              </p>
              <div className="flex flex-col gap-2">
                <Button onClick={() => { setLevel(1); generateLevel(1); }} className="w-full bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold" size="lg">
                  Level 1: Beginner
                </Button>
                <Button onClick={() => { setLevel(3); generateLevel(3); }} className="w-full bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold" size="lg">
                  Level 3: Intermediate
                </Button>
                <Button onClick={() => { setLevel(5); generateLevel(5); }} className="w-full bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold" size="lg">
                  Level 5: Master
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Active game layout */}
        {gameState !== 'idle' && gameState !== 'shop' && (
          <div className="space-y-4">
            {/* Interactive entity action pads */}
            {gameState === 'playing' && (
              <div className="space-y-2">
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Interaction Deck:</p>
                <div className="flex flex-wrap gap-2 items-center justify-center p-2 rounded-lg bg-slate-900 border border-slate-800">
                  {/* Left bank items */}
                  <div className="flex flex-wrap gap-1 max-w-[42%] justify-center border-r border-slate-800 pr-2">
                    <span className="text-[10px] text-slate-500 w-full text-center">Left Bank</span>
                    {leftEntities.map(e => (
                      <Button
                        key={e.id}
                        onClick={() => handleEntityMove(e.id)}
                        className="text-xs py-1.5 px-2.5 h-auto bg-slate-800 hover:bg-slate-700 text-slate-200"
                      >
                        {e.emoji} {e.name}
                      </Button>
                    ))}
                    {leftEntities.length === 0 && <span className="text-xs text-slate-600 italic">Empty</span>}
                  </div>

                  {/* Boat items */}
                  <div className="flex flex-wrap gap-1 max-w-[28%] justify-center border-r border-slate-800 pr-2 pl-1">
                    <span className="text-[10px] text-slate-500 w-full text-center">Boat Deck</span>
                    {boatEntities.map(e => (
                      <Button
                        key={e.id}
                        onClick={() => handleEntityMove(e.id)}
                        className="text-xs py-1.5 px-2.5 h-auto bg-amber-600 hover:bg-amber-700 text-slate-950 font-semibold"
                      >
                        {e.emoji} {e.name}
                      </Button>
                    ))}
                    {boatEntities.length === 0 && <span className="text-xs text-slate-600 italic">Empty</span>}
                  </div>

                  {/* Right bank items */}
                  <div className="flex flex-wrap gap-1 max-w-[42%] justify-center pl-1">
                    <span className="text-[10px] text-slate-500 w-full text-center">Right Bank</span>
                    {rightEntities.map(e => (
                      <Button
                        key={e.id}
                        onClick={() => handleEntityMove(e.id)}
                        className="text-xs py-1.5 px-2.5 h-auto bg-slate-800 hover:bg-slate-700 text-slate-200"
                      >
                        {e.emoji} {e.name}
                      </Button>
                    ))}
                    {rightEntities.length === 0 && <span className="text-xs text-slate-600 italic">Empty</span>}
                  </div>
                </div>
              </div>
            )}

            {/* Hint Box */}
            {hint && (
              <div className="p-3 bg-teal-950/20 border border-teal-800/40 rounded-lg text-center text-teal-300 text-sm">
                <span className="font-bold">Hint: </span>{hint}
              </div>
            )}

            {/* Canvas/WebGL Viewport */}
            <div className="relative w-full h-[400px] bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-inner flex justify-center items-center">
              {/* Constraint Violated display */}
              {gameState === 'failed' && (
                <div className="absolute z-10 bg-slate-950/85 p-6 rounded-lg text-center border border-red-500/30 max-w-[95vw] sm:max-w-sm mx-4">
                  <p className="font-bold text-red-400 text-lg">Cross Failed!</p>
                  <p className="text-sm text-slate-300 mt-2">{violationMessage}</p>
                  <Button onClick={() => generateLevel(level)} className="mt-4 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold w-full">
                    Try Again
                  </Button>
                </div>
              )}

              {/* Victory display */}
              {gameState === 'victory' && (
                <div className="absolute z-10 bg-slate-950/80 p-6 rounded-lg text-center border border-teal-500/30 max-w-[95vw] sm:max-w-md mx-4 animate-fade-in">
                  <div className="text-4xl mb-2">🏆</div>
                  <h4 className="font-bold text-lg text-teal-300">Level Solved!</h4>
                  <p className="text-sm text-slate-300 mt-1">Solvability verified by algorithm solver.</p>
                  <Button
                    onClick={() => {
                      const nextLvl = level + 1
                      setLevel(nextLvl)
                      generateLevel(nextLvl)
                    }}
                    className="mt-4 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold w-full"
                  >
                    Next Level: {level + 1}
                  </Button>
                </div>
              )}

              <div ref={containerRef} className="w-full h-full block" />
            </div>

            {/* Row Boat Row trigger */}
            {gameState === 'playing' && (
              <Button
                onClick={handleRowBoat}
                className="w-full bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold py-3 text-base"
              >
                Row Boat to {boatSide === 'left' ? 'Right Bank' : 'Left Bank'}
              </Button>
            )}
          </div>
        )}

        {/* Level Rules description card */}
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-3 sm:p-4 text-xs sm:text-sm text-slate-400">
            <p className="font-semibold mb-2 text-teal-400">Cognitive & Logic Rules:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Click items to load them into the boat or unload them onto banks.</li>
              <li>A driver (e.g. Farmer) must be inside the boat to row.</li>
              <li>Leaving a predator (e.g. Wolf) alone on a bank with its prey (e.g. Goat) without supervision violates constraint.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
