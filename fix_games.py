import re

# 1. ThoughtSlicer.tsx
with open("src/components/games/ThoughtSlicer.tsx", "r") as f:
    content = f.read()

# Add touch handlers
touch_handlers = """  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    let clientX, clientY
    if ('touches' in e) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }
    return { x: clientX - rect.left, y: clientY - rect.top }
  }

  const handlePointerDown = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    isMouseDownRef.current = true
    const { x, y } = getCoordinates(e)
    mouseTrailRef.current = [{ x, y }]
  }

  const handlePointerMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isMouseDownRef.current) return
    const { x, y } = getCoordinates(e)

    const trail = mouseTrailRef.current
    trail.push({ x, y })
    if (trail.length > 8) {
      trail.shift()
    }

    const thoughts = activeThoughtsRef.current
    thoughts.forEach((t) => {
      if (!t.sliced) {
        const boundsX = x >= t.x && x <= t.x + t.width
        const boundsY = y >= t.y && y <= t.y + t.height

        if (boundsX && boundsY) {
          if (selectedDistortion === t.distortion) {
            t.sliced = true
            t.reframeTimer = 90

            const particles = []
            for (let i = 0; i < 25; i++) {
              particles.push({
                x: t.x + t.width / 2,
                y: t.y + t.height / 2,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                color: ['#10b981', '#34d399', '#6ee7b7', '#fcd34d'][Math.floor(Math.random() * 4)],
                size: 2 + Math.random() * 3,
                alpha: 1
              })
            }
            t.particles = particles

            synthRef.current?.playTone(523.25, 'sine', 0.15)
            setTimeout(() => synthRef.current?.playTone(659.25, 'sine', 0.15), 100)
            setTimeout(() => synthRef.current?.playTone(783.99, 'sine', 0.3), 200)

            setScore(s => {
              const next = s + 100
              if (next >= 1000) {
                setGameState('victory')
              }
              return next
            })
          } else {
            synthRef.current?.playTone(180, 'square', 0.2)
          }
        }
      }
    })
  }

  const handlePointerUp = () => {
    isMouseDownRef.current = false
    mouseTrailRef.current = []
  }
"""

content = re.sub(r"  const handleMouseDown =.*?const handleMouseUp = \(\) => {.*?}\n", touch_handlers, content, flags=re.DOTALL)

# Replace canvas props
content = content.replace("onMouseDown={handleMouseDown}", "onMouseDown={handlePointerDown} onTouchStart={(e) => { e.preventDefault(); handlePointerDown(e); }}")
content = content.replace("onMouseMove={handleMouseMove}", "onMouseMove={handlePointerMove} onTouchMove={(e) => { e.preventDefault(); handlePointerMove(e); }}")
content = content.replace("onMouseUp={handleMouseUp}", "onMouseUp={handlePointerUp} onTouchEnd={handlePointerUp} onTouchCancel={handlePointerUp}")
content = content.replace("onMouseLeave={handleMouseUp}", "onMouseLeave={handlePointerUp}")

with open("src/components/games/ThoughtSlicer.tsx", "w") as f:
    f.write(content)

# 2. MindfulnessTimer.tsx
with open("src/components/games/MindfulnessTimer.tsx", "r") as f:
    content = f.read()

content = content.replace('className="grid grid-cols-3 gap-2"', 'className="grid grid-cols-3 sm:grid-cols-3 gap-2 flex-wrap"')
content = content.replace('w-64 h-64 mx-auto', 'w-48 h-48 sm:w-64 sm:h-64 mx-auto')
content = content.replace('w-64 h-64"', 'w-48 h-48 sm:w-64 sm:h-64"')
content = content.replace('text-6xl', 'text-4xl sm:text-6xl')
# Also make sure the SVG viewbox scales well
content = content.replace('<svg className="transform -rotate-90', '<svg viewBox="0 0 256 256" className="transform -rotate-90')

with open("src/components/games/MindfulnessTimer.tsx", "w") as f:
    f.write(content)

