import { useRef, useState, useCallback, useEffect } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { PROJECTS } from '../../data/projects'

const CARD_W = 50
const STEP = 42
const OVERLAP = CARD_W - STEP
const ROTATE = 'rotateY(-22deg) rotateX(10deg) rotateZ(1.5deg)'

const BASE_SHADOW =
  '0 80px 180px rgba(0,0,0,0.75), 0 0 100px rgba(255,255,255,0.02), 0 16px 40px rgba(0,0,0,0.5)'

const HOVER_SHADOW =
  '0 110px 240px rgba(0,0,0,0.82), 0 0 140px rgba(255,255,255,0.03), 0 24px 60px rgba(0,0,0,0.6)'

const CARD_COUNT = PROJECTS.length
const X_START = 45
const X_STEP = 42
const X_END = 25 - (CARD_COUNT - 1) * X_STEP

export default function HorizontalPortfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  })

  const rawX = useTransform(
    scrollYProgress,
    [0, 1],
    [X_START, X_END],
  )

  const x = useSpring(rawX, {
    stiffness: 100,
    damping: 30,
    mass: 0.4,
    restDelta: 0.01,
  })

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const clamped = Math.max(0, Math.min(1, progress))
    const rawIndex = clamped * (CARD_COUNT - 1)
    if (Math.abs(rawIndex - activeIndex) >= 0.4) {
      const newIndex = Math.min(Math.round(rawIndex), CARD_COUNT - 1)
      if (newIndex !== activeIndex) setActiveIndex(newIndex)
    }
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
      const rect = sectionRef.current?.getBoundingClientRect()
      if (!rect || rect.top > window.innerHeight || rect.bottom < 0) return

      e.preventDefault()
      setActiveIndex((prev) => {
        const next =
          e.key === 'ArrowRight'
            ? Math.min(prev + 1, CARD_COUNT - 1)
            : Math.max(prev - 1, 0)
        if (next !== prev) {
          const progress = next / (CARD_COUNT - 1)
          scrollYProgress.set(progress)
        }
        return next
      })
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [scrollYProgress])

  const goToProject = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, CARD_COUNT - 1))
      setActiveIndex(clamped)
      scrollYProgress.set(clamped / (CARD_COUNT - 1))
    },
    [scrollYProgress],
  )

  const handleCardClick = useCallback(
    (p: (typeof PROJECTS)[0]) => {
      const projectIdx = PROJECTS.indexOf(p)
      if (projectIdx < 2) navigate(`/projects#${p.id}`)
    },
    [navigate],
  )

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative"
      style={{
        minHeight: `${CARD_COUNT * 90}vh`,
        background: 'transparent',
      }}
    >
      <div
        className="sticky top-0 h-screen flex items-center overflow-hidden"
        style={{ perspective: '2000px', perspectiveOrigin: 'center 70%' }}
      >
        <motion.div
          className="flex items-center"
          style={{
            x,
            gap: '0vw',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {PROJECTS.map((p, i) => {
            const isActive = activeIndex === i
            const isHovered = hoveredIndex === i
            const hasFullCallout = PROJECTS.indexOf(p) < 2

            return (
              <div
                key={p.id}
                className="flex-shrink-0"
                style={{
                  width: `${CARD_W}vw`,
                  marginRight:
                    i < PROJECTS.length - 1 ? `-${OVERLAP}vw` : '0',
                  zIndex: isActive ? PROJECTS.length + 1 : PROJECTS.length - i,
                  transform: [
                    ROTATE,
                    `translateY(${isHovered ? -95 : -80}px)`,
                  ].join(' '),
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                  cursor: hasFullCallout ? 'pointer' : 'default',
                  opacity: isActive ? 1 : 0.5,
                  filter: isActive
                    ? 'brightness(1) contrast(1)'
                    : 'brightness(0.5) contrast(0.8) grayscale(0.2)',
                  transition: 'opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => hasFullCallout && handleCardClick(p)}
              >
                <div
                  style={{
                    position: 'relative',
                    width: `${CARD_W}vw`,
                    aspectRatio: '16/9',
                  }}
                >
                  {isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        right: '100%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        paddingRight: '2vw',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1vw',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <h3
                          className="text-white uppercase"
                          style={{
                            fontFamily: "'Anton', sans-serif",
                            fontSize: 'clamp(0.85rem, 1.8vw, 1.4rem)',
                            letterSpacing: '0.04em',
                            lineHeight: '1',
                          }}
                        >
                          {p.title}
                        </h3>
                        {hasFullCallout && (
                          <svg
                            width="36"
                            height="10"
                            viewBox="0 0 36 10"
                            fill="none"
                          >
                            <line
                              x1="0"
                              y1="5"
                              x2="28"
                              y2="5"
                              stroke="white"
                              strokeOpacity="0.5"
                              strokeWidth="1"
                            />
                            <path
                              d="M28 1L34 5L28 9"
                              stroke="white"
                              strokeOpacity="0.5"
                              strokeWidth="1"
                              fill="none"
                            />
                          </svg>
                        )}
                      </div>
                      {hasFullCallout && (
                        <span
                          className="text-white/40 text-[9px] uppercase tracking-[0.2em] block"
                          style={{
                            fontFamily: "'Montserrat', sans-serif",
                            marginTop: '0.25rem',
                            textAlign: 'right',
                          }}
                        >
                          {p.year} &mdash; {p.category}
                        </span>
                      )}
                    </div>
                  )}

                  <div
                    className="relative w-full overflow-hidden"
                    style={{
                      aspectRatio: '16/9',
                      boxShadow: isHovered ? HOVER_SHADOW : BASE_SHADOW,
                    }}
                  >
                    <img
                      src={p.thumbnail}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{
                        zIndex: 1,
                        filter: isHovered
                          ? 'brightness(1.05) contrast(1.05)'
                          : isActive
                            ? 'brightness(0.9) contrast(1.15) saturate(0.95)'
                            : 'brightness(0.82) contrast(1.12) saturate(0.9)',
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        zIndex: 2,
                        background: isActive
                          ? 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.06) 100%)'
                          : 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 100%)',
                      }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>

        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '2vw',
            zIndex: 20,
          }}
        >
          <button
            onClick={() => goToProject(activeIndex - 1)}
            disabled={activeIndex === 0}
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              padding: '10px 20px',
              cursor: activeIndex === 0 ? 'default' : 'pointer',
              opacity: activeIndex === 0 ? 0.2 : 0.6,
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontFamily: "'Montserrat', sans-serif",
              transition: 'opacity 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (activeIndex > 0) e.currentTarget.style.opacity = '1'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = activeIndex === 0 ? '0.2' : '0.6'
            }}
          >
            &larr; Prev
          </button>
          <button
            onClick={() => goToProject(activeIndex + 1)}
            disabled={activeIndex === CARD_COUNT - 1}
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              padding: '10px 20px',
              cursor: activeIndex === CARD_COUNT - 1 ? 'default' : 'pointer',
              opacity: activeIndex === CARD_COUNT - 1 ? 0.2 : 0.6,
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontFamily: "'Montserrat', sans-serif",
              transition: 'opacity 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (activeIndex < CARD_COUNT - 1)
                e.currentTarget.style.opacity = '1'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity =
                activeIndex === CARD_COUNT - 1 ? '0.2' : '0.6'
            }}
          >
            Next &rarr;
          </button>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '6%',
            zIndex: 20,
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.3)',
          }}
        >
          {String(activeIndex + 1).padStart(2, '0')} /{' '}
          {String(CARD_COUNT).padStart(2, '0')}
        </div>
      </div>
    </section>
  )
}
