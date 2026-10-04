import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { greetings, profile, toolkit } from '../data/profile'
import { Reveal, SectionLabel } from './Reveal'

function Greeting() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % greetings.length), 2200)
    return () => clearInterval(t)
  }, [])
  const g = greetings[i]
  return (
    <div className="greeting" aria-live="polite">
      <div className="greeting-word">
        <AnimatePresence mode="wait">
          <motion.span
            key={g.word}
            initial={{ y: '60%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-60%', opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {g.word}.
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="greeting-langs mono">
        {greetings.map((x, k) => (
          <span key={x.lang} className={k === i ? 'on' : undefined}>{x.lang}</span>
        ))}
      </div>
    </div>
  )
}

function Arc() {
  const path = 'M70 150 C 200 10, 420 10, 550 150'
  return (
    <svg viewBox="0 0 620 200" className="arc" role="img" aria-label="Flight path from Baku, Azerbaijan to Stanford, California, about 11,300 kilometres">
      <path d={path} className="arc-ghost" />
      <motion.path
        d={path}
        className="arc-line"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 2.2, ease: [0.65, 0, 0.35, 1] }}
      />
      <circle r="3.5" className="arc-traveller">
        <animateMotion dur="5s" repeatCount="indefinite" path={path} />
      </circle>
      {[
        { x: 70, name: 'Baku', coord: '40.41°N 49.87°E', anchor: 'start' as const },
        { x: 550, name: 'Stanford', coord: '37.43°N 122.17°W', anchor: 'end' as const },
      ].map(p => (
        <g key={p.name}>
          <circle cx={p.x} cy={150} r={6} className="arc-pin" />
          <circle cx={p.x} cy={150} r={14} className="arc-ring" />
          <text x={p.x} y={182} textAnchor={p.anchor} className="arc-name">{p.name}</text>
          <text x={p.x} y={197} textAnchor={p.anchor} className="arc-coord">{p.coord}</text>
        </g>
      ))}
      <text x={310} y={70} textAnchor="middle" className="arc-coord">≈ 11,300 km · Class of {profile.gradYear}</text>
    </svg>
  )
}

export default function Journey() {
  return (
    <section className="container section" id="journey">
      <SectionLabel index="04">Origin & toolkit</SectionLabel>
      <div className="journey">
        <Reveal>
          <Greeting />
          <p className="journey-copy">
            Native in English and Azerbaijani, and I also speak Russian and Turkish. Equally at home in Python,
            C++ and Java. I've spent roughly 500 problems' worth of evenings on competitive programming.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <Arc />
        </Reveal>
      </div>
      <div className="toolkit">
        {Object.entries(toolkit).map(([group, items], i) => (
          <Reveal key={group} delay={i * 0.08} className="toolkit-group">
            <div className="mono toolkit-head">{group}</div>
            <ul className="chips">{items.map(t => <li key={t}>{t}</li>)}</ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
