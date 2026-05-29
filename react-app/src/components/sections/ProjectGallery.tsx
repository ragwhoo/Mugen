import { useRef, useState, useCallback, useEffect } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { PROJECTS } from '../../data/projects'

const N = PROJECTS.length
const SPACING = 320

const CARD_W = 280
const CARD_H = 400

function Card({
  index,
  progress,
  active,
  onClick,
  image,
  title,
  year,
  category,
  hasLink,
}: {
  index: number
  progress: MotionValue<number>
  active: boolean
  onClick: () => void
  image: string
  title: string
  year: string
  category: string
  hasLink: boolean
}) {
  const pos = useTransform(progress, (p) => {
    const raw = index - p * N
    const w = (((raw % N) + N) % N)
    const c = w > N / 2 ? w - N : w
    return {
      x: c * SPACING,
      y: c * c * -12 + c * 30,
      z: c * -180,
      scale: Math.max(0.4, 1 - Math.abs(c) * 0.18),
      ry: c * 6,
      opacity: Math.max(0.15, 1 - Math.abs(c) * 0.35),
      blur: Math.min(4, Math.abs(c) * 1.5),
    }
  })

  const transform = useTransform(
    pos,
    (p) =>
      `translate(-50%, -50%) translate(${p.x}px, ${p.y}px) translateZ(${p.z}px) scale(${p.scale}) rotateY(${p.ry}deg)`,
  )
  const opacity = useTransform(pos, (p) => p.opacity)
  const blur = useTransform(pos, (p) => `blur(${p.blur}px)`)

  const cursor = hasLink ? 'pointer' : 'default'

  return (
    <motion.div
      className="absolute"
      style={{
        left: '50%',
        top: '50%',
        width: CARD_W,
        height: CARD_H,
        transform,
        opacity,
        filter: blur,
        transformStyle: 'preserve-3d',
        cursor,
        zIndex: active ? 50 : 10,
      }}
      onClick={onClick}
    >
      <div className="w-full h-full relative overflow-hidden bg-black/80">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover pointer-events-none select-none"
          draggable={false}
          style={{
            filter: active ? 'grayscale(0.4) contrast(1.1)' : 'grayscale(0.8) contrast(1) brightness(0.7)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: active
              ? 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 80%)'
              : 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%)',
          }}
        />
        <div
          className="absolute bottom-4 left-4 right-4"
          style={{ opacity: active ? 1 : 0 }}
        >
          <h3
            className="text-white uppercase text-sm tracking-wider"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            {title}
          </h3>
          <span
            className="text-white/40 text-[10px] uppercase tracking-[0.2em]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {year} &mdash; {category}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const activeRef = useRef(0)
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  })

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 35,
    mass: 0.4,
    restDelta: 0.001,
  })

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const raw = p * N
    const wrappedIndex = Math.round(raw) % N
    const adjusted = wrappedIndex >= 0 ? wrappedIndex : wrappedIndex + N
    if (adjusted !== activeRef.current) {
      activeRef.current = adjusted
      setActiveIndex(adjusted)
    }
  })

  const scrollToCard = useCallback((cardIndex: number) => {
    const p = cardIndex / N
    const sectionTop = sectionRef.current?.offsetTop ?? 0
    const sectionHeight = sectionRef.current?.offsetHeight ?? 0
    const scrollTarget = sectionTop + p * (sectionHeight - window.innerHeight)
    window.scrollTo({ top: scrollTarget, behavior: 'smooth' })
  }, [])

  const goToProject = useCallback(
    (delta: number) => {
      const next = ((activeRef.current + delta) % N + N) % N
      activeRef.current = next
      setActiveIndex(next)
      scrollToCard(next)
    },
    [scrollToCard],
  )

  const handleCardClick = useCallback(
    (projectIdx: number) => {
      if (projectIdx < 2) navigate(`/projects#${PROJECTS[projectIdx].id}`)
    },
    [navigate],
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
      const rect = sectionRef.current?.getBoundingClientRect()
      if (!rect || rect.top > window.innerHeight || rect.bottom < 0) return
      e.preventDefault()
      const delta = e.key === 'ArrowRight' ? 1 : -1
      goToProject(delta)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToProject])

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative bg-black"
      style={{ minHeight: `${N * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <div
          className="absolute inset-0"
          style={{
            perspective: '2000px',
            transformStyle: 'preserve-3d',
          }}
        >
          {PROJECTS.map((p, i) => (
            <Card
              key={p.id}
              index={i}
              progress={springProgress}
              active={activeIndex === i}
              onClick={() => handleCardClick(i)}
              image={p.thumbnail}
              title={p.title}
              year={p.year}
              category={p.category}
              hasLink={i < 2}
            />
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-50">
          <button
            onClick={() => goToProject(-1)}
            className="text-white/40 hover:text-white/80 text-xs uppercase tracking-[0.2em] transition-colors bg-none border border-white/20 px-5 py-2"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            &larr; Prev
          </button>
          <button
            onClick={() => goToProject(1)}
            className="text-white/40 hover:text-white/80 text-xs uppercase tracking-[0.2em] transition-colors bg-none border border-white/20 px-5 py-2"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Next &rarr;
          </button>
        </div>

        <div
          className="absolute bottom-8 right-8 z-50 text-white/20 text-[10px] uppercase tracking-[0.3em]"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {String(activeIndex + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
        </div>
      </div>
    </section>
  )
}
