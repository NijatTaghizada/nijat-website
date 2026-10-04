import { motion } from 'motion/react'
import { useState } from 'react'
import FireField, { type FireStats } from './FireField'
import { profile } from '../data/profile'

const ease = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  const [stats, setStats] = useState<FireStats>({ burning: 0, burned: 0, wind: 90 })
  const [first, last] = profile.name.toUpperCase().split(' ')

  return (
    <header className="hero" id="top">
      <FireField onStats={setStats} />
      <div className="hero-vignette" />

      <div className="hero-hud hero-hud-top mono">
        <span>SAT-FEED · LIVE</span>
        <span className="hud-dot" />
        <span>40.41°N 49.87°E → 37.43°N 122.17°W</span>
      </div>

      <div className="hero-content">
        <motion.p
          className="hero-kicker mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          Stanford '30 · Data Science / CS
        </motion.p>
        <h1 className="hero-name">
          {[first, last].map((word, w) => (
            <span className="hero-line" key={word}>
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.25 + w * 0.12, duration: 1.1, ease }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1, ease }}
        >
          I build things that <em>help when it matters</em>.
        </motion.p>
      </div>

      <motion.div
        className="hero-hud hero-hud-bottom mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <div className="hud-stat"><span>Active cells</span><b>{stats.burning.toLocaleString()}</b></div>
        <div className="hud-stat"><span>Hectares burned</span><b>{stats.burned.toLocaleString()}</b></div>
        <div className="hud-stat"><span>Wind bearing</span><b>{String(stats.wind).padStart(3, '0')}°</b></div>
        <div className="hud-hint">↖ Move your cursor. You're the spark.</div>
      </motion.div>

      <a href="#manifesto" className="scroll-cue mono" aria-label="Scroll down">
        <span>Scroll</span>
        <span className="scroll-cue-line" />
      </a>
    </header>
  )
}
