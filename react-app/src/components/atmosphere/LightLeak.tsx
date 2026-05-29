import { motion, useScroll, useTransform } from 'framer-motion'

export default function LightLeak() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.06, 0.03, 0.04, 0.02])

  return (
    <motion.div
      className="fixed inset-0 z-30 pointer-events-none"
      style={{
        opacity,
        background:
          'radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.03) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(255,255,255,0.015) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(255,255,255,0.01) 0%, transparent 40%)',
      }}
    />
  )
}
