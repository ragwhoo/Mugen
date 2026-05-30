import { useRef, useEffect, useCallback, useState } from 'react'

interface OrbProps {
  hue?: number
  hoverIntensity?: number
  rotateOnHover?: boolean
  forceHoverState?: boolean
}

export default function Orb({
  hue = 0,
  hoverIntensity = 0.5,
  rotateOnHover = true,
  forceHoverState = false,
}: OrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const timeRef = useRef(0)
  const rafRef = useRef(0)
  const [hovering, setHovering] = useState(false)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height
    const mx = mouseRef.current.x
    const my = mouseRef.current.y
    const isHover = forceHoverState || hovering

    const rot = isHover && rotateOnHover ? timeRef.current * 0.15 : timeRef.current * 0.03
    const driftX = (mx - 0.5) * (isHover ? hoverIntensity * 120 : 10)
    const driftY = (my - 0.5) * (isHover ? hoverIntensity * 120 : 10)

    ctx.clearRect(0, 0, w, h)

    const cx = w * 0.5 + driftX
    const cy = h * 0.5 + driftY
    const r = Math.min(w, h) * 0.42

    const grad = ctx.createRadialGradient(
      cx + Math.cos(rot) * r * 0.25,
      cy + Math.sin(rot) * r * 0.25,
      0,
      cx,
      cy,
      r
    )
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.35)')
    grad.addColorStop(0.2, 'rgba(200, 200, 200, 0.18)')
    grad.addColorStop(0.45, 'rgba(120, 120, 120, 0.10)')
    grad.addColorStop(0.7, 'rgba(60, 60, 60, 0.05)')
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)')

    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.fill()

    const ringGrad = ctx.createRadialGradient(cx, cy, r * 0.5, cx, cy, r * 1.1)
    ringGrad.addColorStop(0, 'rgba(255, 255, 255, 0)')
    ringGrad.addColorStop(0.5, 'rgba(180, 180, 180, 0.04)')
    ringGrad.addColorStop(0.8, 'rgba(100, 100, 100, 0.08)')
    ringGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')

    ctx.fillStyle = ringGrad
    ctx.beginPath()
    ctx.arc(cx, cy, r * 1.1, 0, Math.PI * 2)
    ctx.fill()

    timeRef.current += 0.02
    rafRef.current = requestAnimationFrame(draw)
  }, [hovering, hoverIntensity, rotateOnHover, forceHoverState])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      canvas.width = canvas.clientWidth * devicePixelRatio
      canvas.height = canvas.clientHeight * devicePixelRatio
    }
    resize()
    window.addEventListener('resize', resize)
    rafRef.current = requestAnimationFrame(draw)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [draw])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="block w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => { setHovering(false); mouseRef.current = { x: 0.5, y: 0.5 } }}
    />
  )
}
