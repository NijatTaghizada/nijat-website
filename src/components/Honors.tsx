import { motion } from 'motion/react'
import { honors } from '../data/profile'
import { SectionLabel } from './Reveal'

export default function Honors() {
  return (
    <section className="container section" id="honors">
      <SectionLabel index="03">Honors</SectionLabel>
      <ul className="honors">
        {honors.map((h, i) => (
          <motion.li
            key={h.org}
            className="honor"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="honor-org">{h.org}</span>
            <span className="honor-title">{h.title}</span>
            <span className="honor-note mono">{h.note}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
