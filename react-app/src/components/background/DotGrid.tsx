import { useRef, useEffect } from 'react'

interface DotGridProps {
  dotSize?: number
  gap?: number
  baseColor?: string
  activeColor?: string
  proximity?: number
  speedTrigger?: number
  shockRadius?: number
  shockStrength?: number
  maxSpeed?: number
  resistance?: number
  returnDuration?: number
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 74, g: 74, b: 85 }
}

interface Dot {
  bx: number
  by: number
  cx: number
  cy: number
  ca: number
  vx: number
  vy: number
  phase: number
}

interface Shockwave {
  x: number
  y: number
  radius: number
  maxRadius: number
  strength: number
}

export default function DotGrid({
  dotSize = 7,
  gap = 22,
  baseColor = '#4a4a55',
  activeColor = '#9aa3ad',
  proximity = 90,
  speedTrigger = 400,
  shockRadius = 140,
  shockStrength = 1.2,
  maxSpeed = 900,
  resistance = 2200,
  returnDuration = 3.5,
}: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<Dot[]>([])
  const shocksRef = useRef<Shockwave[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999, px: -9999, py: -9999, speed: 0 })
  const animRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)
  const baseRgbRef = useRef(hexToRgb(baseColor))
  const activeRgbRef = useRef(hexToRgb(activeColor))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cvs = canvas
    const c = ctx
    const base = baseRgbRef.current
    const active = activeRgbRef.current
    const dots = dotsRef.current
    const shocks = shocksRef.current
    const mouse = mouseRef.current

    let w = 0
    let h = 0
    let elapsed = 0

    function initGrid() {
      const dpr = window.devicePixelRatio || 1
      w = window.innerWidth
      h = window.innerHeight
      cvs.width = w * dpr
      cvs.height = h * dpr
      cvs.style.width = `${w}px`
      cvs.style.height = `${h}px`
      c.setTransform(dpr, 0, 0, dpr, 0, 0)

      const cols = Math.floor(w / gap) + 2
      const rows = Math.floor(h / gap) + 2
      const offsetX = (w - (cols - 1) * gap) / 2
      const offsetY = (h - (rows - 1) * gap) / 2

      dots.length = 0
      for (let r = 0; r < rows; r++) {
        for (let col = 0; col < cols; col++) {
          const bx = offsetX + col * gap
          const by = offsetY + r * gap
          dots.push({
            bx, by, cx: bx, cy: by, ca: 0.06, vx: 0, vy: 0,
            phase: Math.random() * Math.PI * 2,
          })
        }
      }
    }

    initGrid()

    function animate(time: number) {
      const dt = lastTimeRef.current ? Math.min((time - lastTimeRef.current) / 1000, 0.05) : 0.016
      lastTimeRef.current = time
      elapsed += dt

      if (mouse.speed > speedTrigger) {
        shocks.push({
          x: mouse.x,
          y: mouse.y,
          radius: 0,
          maxRadius: shockRadius,
          strength: shockStrength,
        })
      }

      for (let i = shocks.length - 1; i >= 0; i--) {
        const s = shocks[i]
        s.radius += 200 * dt
        if (s.radius > s.maxRadius) {
          shocks.splice(i, 1)
        }
      }

      const returnSpeed = 1 / returnDuration

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]

        let dx = 0
        let dy = 0

        for (const s of shocks) {
          const sx = d.bx - s.x
          const sy = d.by - s.y
          const dist = Math.sqrt(sx * sx + sy * sy)
          const ringDist = Math.abs(dist - s.radius)
          if (ringDist < s.maxRadius * 0.25) {
            const falloff = 1 - ringDist / (s.maxRadius * 0.25)
            const angle = Math.atan2(sy, sx)
            dx += Math.cos(angle) * falloff * s.strength
            dy += Math.sin(angle) * falloff * s.strength
          }
        }

        const mdx = d.bx - mouse.x
        const mdy = d.by - mouse.y
        const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy)
        const proxFactor = Math.max(0, 1 - mouseDist / proximity)
        const targetAlpha = 0.06 + proxFactor * 0.94
        d.ca += (targetAlpha - d.ca) * 0.06

        const drag = 1 / (1 + (resistance / 1000) * dt)
        d.vx = (d.vx + dx * dt * 4) * drag
        d.vy = (d.vy + dy * dt * 4) * drag
        d.vx *= 1 - returnSpeed * dt
        d.vy *= 1 - returnSpeed * dt

        d.cx = d.bx + d.vx
        d.cy = d.by + d.vy
      }

      c.clearRect(0, 0, w, h)

      for (const d of dots) {
        const alpha = Math.min(d.ca, 1)
        const r = Math.round(base.r + (active.r - base.r) * alpha)
        const g = Math.round(base.g + (active.g - base.g) * alpha)
        const b = Math.round(base.b + (active.b - base.b) * alpha)
        const dotAlpha = 0.22 + alpha * 0.78

        c.fillStyle = `rgba(${r},${g},${b},${dotAlpha})`
        c.beginPath()
        c.arc(d.cx, d.cy, dotSize / 2, 0, Math.PI * 2)
        c.fill()
      }

      mouse.speed *= 0.85
      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)

    const handleResize = () => { initGrid() }
    const handleMouseMove = (e: MouseEvent) => {
      mouse.px = mouse.x
      mouse.py = mouse.y
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.speed = Math.min(
        Math.sqrt((mouse.x - mouse.px) ** 2 + (mouse.y - mouse.py) ** 2) * 60,
        maxSpeed,
      )
    }
    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      mouse.px = mouse.x
      mouse.py = mouse.y
      mouse.x = t.clientX
      mouse.y = t.clientY
      mouse.speed = Math.min(
        Math.sqrt((mouse.x - mouse.px) ** 2 + (mouse.y - mouse.py) ** 2) * 60,
        maxSpeed,
      )
    }
    const handleTouchStart = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      mouse.x = t.clientX
      mouse.y = t.clientY
      mouse.px = t.clientX
      mouse.py = t.clientY
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchstart', handleTouchStart)
    }
  }, [dotSize, gap, baseColor, activeColor, proximity, speedTrigger, shockRadius, shockStrength, maxSpeed, resistance, returnDuration])

  return (
    <canvas
      ref={canvasRef}
      className="block w-full h-full"
      aria-hidden="true"
    />
  )
}
