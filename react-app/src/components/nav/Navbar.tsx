import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import mugenLogo from '../../assets/mugen-logo.png'

const NAV_ITEMS = ['Home', 'About', 'Portfolio', 'Projects', 'Contact']

function getHref(item: string) {
  if (item === 'Projects') return '/projects'
  if (item === 'Home') return '/'
  return `/#${item.toLowerCase()}`
}

function isActive(item: string, pathname: string) {
  if (item === 'Home') return pathname === '/'
  if (item === 'Projects') return pathname === '/projects'
  return false
}

export default function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, item: string) => {
      const href = getHref(item)
      if (item === 'Home') {
        e.preventDefault()
        navigate('/')
        return
      }
      if (item === 'Projects') {
        e.preventDefault()
        navigate('/projects')
        return
      }
      e.preventDefault()
      const hash = href.replace('/#', '')
      if (pathname !== '/') {
        navigate('/#' + hash)
        return
      }
      const target = document.getElementById(hash)
      const l = (window as any).lenis
      if (target && l) {
        l.scrollTo(target, { offset: -60 })
      }
    },
    [navigate, pathname],
  )

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50"
      style={{
        padding: '28px 56px',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mixBlendMode: 'difference',
      }}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <button
        onClick={() => {
          if (pathname === '/') {
            const target = document.getElementById('hero')
            const l = (window as any).lenis
            if (target && l) l.scrollTo(target, { offset: -60 })
          } else {
            navigate('/')
          }
        }}
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
      >
        <img
          src={mugenLogo}
          alt="Mugen"
          style={{
            height: 'clamp(22px, 2.5vw, 32px)',
            width: 'auto',
            display: 'block',
          }}
        />
      </button>
      <div style={{ display: 'flex', gap: 'clamp(20px, 3vw, 40px)' }}>
        {NAV_ITEMS.map((item) => {
          const active = isActive(item, pathname)
          return (
            <a
              key={item}
              href={getHref(item)}
              onClick={(e) => handleClick(e, item)}
              className="nav-link"
              style={{
                color: 'white',
                fontSize: 'clamp(0.65rem, 0.8vw, 0.78rem)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
                opacity: active ? 1 : 0.75,
                transition: 'opacity 0.35s ease',
                position: 'relative',
                paddingBottom: '2px',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = active ? '1' : '0.75' }}
            >
              {item}
              <span
                className="nav-underline"
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  width: active ? '100%' : '0%',
                  height: '1px',
                  backgroundColor: 'white',
                  transition: 'width 0.35s ease',
                }}
              />
            </a>
          )
        })}
      </div>
    </motion.nav>
  )
}
