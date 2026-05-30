import { useEffect, useRef, useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import Navbar from '../components/nav/Navbar'
import ProjectHero from '../components/sections/ProjectHero'
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

export default function ProjectsPage() {
  useLenis()
  const location = useLocation()

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null
    if (!state?.scrollTo) {
      window.scrollTo(0, 0)
      return
    }
    const el = document.getElementById(state.scrollTo)
    if (!el) return
    const lenis = (window as any).lenis
    if (lenis) {
      lenis.scrollTo(el, { offset: -80, duration: 1.4 })
    }
  }, [location.state])

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
