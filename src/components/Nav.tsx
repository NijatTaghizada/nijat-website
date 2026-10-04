import { motion, useScroll, useSpring } from 'motion/react'

const links = [
  ['work', 'Work'],
  ['honors', 'Honors'],
  ['impact', 'Impact'],
  ['contact', 'Contact'],
] as const

export default function Nav({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <nav className="nav">
      <motion.div className="nav-progress" style={{ scaleX }} />
      <a href="#top" className="nav-logo" aria-label="Back to top">
        N<span>T</span>
      </a>
      <div className="nav-links">
        {links.map(([id, label]) => (
          <a key={id} href={`#${id}`} className="mono">{label}</a>
        ))}
        <button className="nav-term mono" onClick={onOpenTerminal} aria-label="Open terminal">
          &gt;_
        </button>
      </div>
    </nav>
  )
}
