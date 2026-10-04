import { motion, useScroll } from 'motion/react'
import { useRef } from 'react'
import { path } from '../data/profile'
import { Reveal, SectionLabel } from './Reveal'

export default function Path() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.6'] })

  return (
    <section className="container section" id="path">
      <SectionLabel index="02">The path so far</SectionLabel>
      <Reveal>
        <h2 className="section-title">Four years, <em>a lot of firsts</em>.</h2>
      </Reveal>
      <ol className="path" ref={ref}>
        <motion.span className="path-fill" style={{ scaleY: scrollYProgress }} aria-hidden="true" />
        {path.map(stop => (
          <li key={stop.when} className="path-stop">
            <div className="path-when mono">{stop.when}</div>
            <div className="path-items">
              {stop.items.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.08} className="path-item">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </Reveal>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
