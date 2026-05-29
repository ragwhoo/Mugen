import { useEffect, useRef, useState, useCallback } from 'react'
import Lenis from 'lenis'
import Navbar from '../components/nav/Navbar'
import { PROJECTS } from '../data/projects'

const SHOW_PROJECTS = PROJECTS.slice(0, 2)

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.4, smoothWheel: true })
    ;(window as any).lenis = lenis
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => { lenis.destroy(); delete (window as any).lenis }
  }, [])
}

function ProjectHero({
  project,
}: {
  project: (typeof PROJECTS)[0]
}) {
  const cursorVideoRef = useRef<HTMLVideoElement | null>(null)
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseEnter = useCallback(() => {
    if (!project.videoSrc) return
    clearTimeout(leaveTimeoutRef.current)
    setIsHovering(true)
    const v = cursorVideoRef.current
    if (v) {
      v.src = project.videoSrc
      v.currentTime = 0
      v.load()
      v.play().catch(() => {})
    }
  }, [project.videoSrc])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    leaveTimeoutRef.current = setTimeout(() => {
      const v = cursorVideoRef.current
      if (v) { v.pause(); v.src = '' }
    }, 300)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isHovering) return
    const v = cursorVideoRef.current
    if (v) {
      v.style.left = `${e.clientX + 20}px`
      v.style.top = `${e.clientY + 20}px`
    }
  }, [isHovering])

  return (
    <section
      id={project.id}
      className="relative w-full h-screen overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)' }} />
      <img
        src={project.img}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute z-10"
        style={{ bottom: '12%', left: '6%', maxWidth: '55%' }}
      >
        <span
          className="text-white/30 text-[10px] uppercase tracking-[0.2em] block"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {project.year} &mdash; {project.category}
        </span>
        <h2
          className="text-white uppercase leading-[0.95] mt-2"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          }}
        >
          {project.title}
        </h2>
      </div>

      <video
        ref={cursorVideoRef}
        className="fixed pointer-events-none z-50 object-cover"
        style={{
          width: '500px',
          height: '281px',
          opacity: isHovering ? 1 : 0,
          transition: 'opacity 1.2s cubic-bezier(0.2, 0.9, 0.3, 1)',
        }}
        muted
        loop
        playsInline
        preload="auto"
      />
    </section>
  )
}

export default function ProjectsPage() {
  useLenis()

  return (
    <div className="relative z-10">
      <Navbar />

      {SHOW_PROJECTS.map((project) => (
        <ProjectHero key={project.id} project={project} />
      ))}

      <footer
        className="relative w-full h-[30vh] flex items-end"
        style={{ background: '#000' }}
      >
        <p
          className="absolute bottom-8 left-[6%] text-white/40 text-xs uppercase tracking-wider"
          style={{ fontSize: '0.75rem' }}
        >
          &copy; 2026 Mugen Studios. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
