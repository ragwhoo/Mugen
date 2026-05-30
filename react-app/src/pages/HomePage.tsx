import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Lenis from 'lenis'
import Navbar from '../components/nav/Navbar'
import ProjectGallery from '../components/sections/ProjectGallery'
import ProjectHero from '../components/sections/ProjectHero'
import { PROJECTS } from '../data/projects'
import mugenLogo from '../assets/mugen.png'
import blackholeImg from '../assets/blackhole.png'

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

function SectionOverlay() {
  return (
    <div
      className="absolute inset-0 z-1 pointer-events-none"
      style={{ background: 'rgba(0,0,0,0.5)' }}
    />
  )
}

function SectionFadeIn({
  children,
  id,
  className = '',
  style = {},
}: {
  children: React.ReactNode
  id?: string
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <motion.section
      id={id}
      className={`section relative w-full min-h-screen overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0.6 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.section>
  )
}

export default function HomePage() {
  useLenis()

  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])

  return (
    <div className="relative z-10">
      <Navbar />

      <motion.section
        id="hero"
        ref={heroRef}
        className="section w-full h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 50% 35% at 50% 50%, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 35%, transparent 65%)',
          }}
        />
        <img
          src={mugenLogo}
          alt="Mugen"
          className="block"
          style={{
            width: 'min(82vw, 980px)',
            height: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 24px rgba(255,255,255,0.04))',
          }}
        />
      </motion.section>

      <ProjectGallery />

      <SectionFadeIn id="portfolio">
        <SectionOverlay />
        <div
          className="absolute z-2"
          style={{
            top: '15%',
            left: '4%',
            maxWidth: '75%',
          }}
        >
          <h1
            className="text-white uppercase leading-[0.95] tracking-[0.01em] text-left"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(3.5rem, 12vw, 8rem)',
            }}
          >
            Portfolio
          </h1>
          <p
            className="text-white font-light text-left mt-3 max-w-[560px] leading-relaxed"
            style={{ fontSize: 'clamp(0.95rem, 2vw, 1.4rem)' }}
          >
            Mugen is a creative studio crafting cinematic digital experiences, immersive branding, and visually driven products. We blend design, storytelling, and technology to create work that feels timeless, atmospheric, and intentional.
          </p>
        </div>
      </SectionFadeIn>

      <div className="relative z-10">
        {PROJECTS.slice(0, 2).map((project) => (
          <ProjectHero key={project.id} project={project} />
        ))}
      </div>

      <SectionFadeIn id="about">
        <img
          src={blackholeImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          style={{
            filter: 'grayscale(1) contrast(1.5) brightness(0.95) saturate(0.8)',
            opacity: 0.55,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: [
              'radial-gradient(ellipse at 50% 35%, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 25%, transparent 55%)',
              'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 65%)',
              'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.45) 100%)',
            ].join(', '),
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            boxShadow: 'inset 0 0 200px rgba(0,0,0,0.8)',
          }}
        />
        <SectionOverlay />
        <div
          className="absolute z-2"
          style={{
            top: '15%',
            left: '4%',
            maxWidth: '75%',
          }}
        >
          <h1
            className="text-white uppercase leading-[0.95] tracking-[0.01em] text-left"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(3.5rem, 12vw, 8rem)',
            }}
          >
            BUILT WITHOUT LIMITS
          </h1>
          <p
            className="text-white font-light text-left mt-3 max-w-[560px] leading-relaxed"
            style={{ fontSize: 'clamp(0.95rem, 2vw, 1.4rem)' }}
          >
            Mugen exists at the intersection of art, technology, and atmosphere. We create experiences that are visually striking, emotionally immersive, and built with a strong sense of identity. Inspired by cinematic storytelling and modern digital culture, our work focuses on making brands and products feel unforgettable.
          </p>
        </div>
      </SectionFadeIn>

      <SectionFadeIn
        id="contact"
        style={{ background: '#000' }}
      >
        <div
          className="absolute z-2"
          style={{
            top: '15%',
            left: '4%',
            maxWidth: '75%',
          }}
        >
          <h1
            className="text-white uppercase leading-[0.95] tracking-[0.01em] text-left"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(3.5rem, 12vw, 8rem)',
            }}
          >
            Contact
          </h1>
          <p
            className="text-white font-light text-left mt-3 max-w-[560px] leading-relaxed"
            style={{ fontSize: 'clamp(0.95rem, 2vw, 1.4rem)' }}
          >
            developer.mugen@gmail.com
          </p>
        </div>
        <p
          className="absolute bottom-8 left-[4%] text-white/40 text-xs uppercase tracking-wider"
          style={{ fontSize: '0.75rem' }}
        >
          &copy; 2026 Mugen Studios. All rights reserved.
        </p>
      </SectionFadeIn>
    </div>
  )
}
