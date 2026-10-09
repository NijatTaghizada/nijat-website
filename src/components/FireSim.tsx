import { useState } from 'react'
import FireField, { type FireStats } from './FireField'

const WINDS = [
  { label: 'Calm', value: 0 },
  { label: 'Breeze', value: 0.8 },
  { label: 'Strong', value: 2 },
]

export default function FireSim() {
  const [wind, setWind] = useState(WINDS[1].value)
  const [resetKey, setResetKey] = useState(0)
  const [stats, setStats] = useState<FireStats>({ burning: 0, burnedPct: 0 })
  const [touched, setTouched] = useState(false)

  return (
    <figure className="sim">
      <div className="sim-top">
        <span className="sim-title">Wildfire spread, simulated</span>
        <ul className="sim-legend">
          <li><i className="sw sw-veg" /> Vegetation</li>
          <li><i className="sw sw-fire" /> Burning</li>
          <li><i className="sw sw-ash" /> Burned</li>
        </ul>
      </div>

      <div className="sim-box">
        <FireField wind={wind} resetKey={resetKey} onStats={setStats} onUserIgnite={() => setTouched(true)} />
        {!touched && <div className="sim-hint">Click or drag to start a fire</div>}
        {wind > 0 && <div className="sim-wind" aria-hidden="true">wind →</div>}
      </div>

      <div className="sim-controls">
        <div className="seg" role="group" aria-label="Wind strength">
          <span className="seg-label">Wind</span>
          {WINDS.map(w => (
            <button
              key={w.label}
              className={w.value === wind ? 'on' : undefined}
              aria-pressed={w.value === wind}
              onClick={() => setWind(w.value)}
            >
              {w.label}
            </button>
          ))}
        </div>
        <span className="sim-stats mono">
          {stats.burning} burning · {stats.burnedPct}% burned
        </span>
        <button className="sim-reset" onClick={() => setResetKey(k => k + 1)}>Reset</button>
      </div>

      <figcaption>
        Each dot is a patch of land, and darker green means more vegetation to burn. A burning patch can set its
        neighbours alight, and that's more likely when they have lots of fuel or the wind is blowing toward them.
        Burned land turns to ash and slowly grows back. It's a toy version of a cellular-automaton
        spread model. <a href="#projects">My ISEF project</a> worked on a related problem: predicting wildfire risk
        from satellite data.
      </figcaption>
    </figure>
  )
}
