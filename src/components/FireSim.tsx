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

  return (
    <figure className="sim">
      <div className="sim-head">
        <h2 className="sim-title">How a wildfire spreads</h2>
        <p className="sim-why">
          Wildfires are what my research has focused on, so here's a small, hands-on look at how they spread.
        </p>
        <p className="sim-sub">Click anywhere on the map to start a fire, then try changing the wind.</p>
      </div>
      <div className="sim-top">
        <ul className="sim-legend">
          <li><i className="sw sw-veg" /> Vegetation</li>
          <li><i className="sw sw-fire" /> Burning</li>
          <li><i className="sw sw-ash" /> Burned</li>
        </ul>
      </div>

      <div className="sim-box">
        <FireField wind={wind} resetKey={resetKey} onStats={setStats} />
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

      <details className="sim-info">
        <summary>How this works</summary>
        <ul>
          <li>Each dot is a patch of land. Darker green means more vegetation, so more fuel to burn.</li>
          <li>Fire jumps to neighbouring patches, more easily when they have lots of fuel or the wind blows toward them.</li>
          <li>Bare patches with little fuel act as firebreaks, so fires stop there.</li>
          <li>Burned land turns to ash and slowly grows back.</li>
        </ul>
        <p>
          This is a deliberately simple cellular-automaton model for illustration, not a real forecast. My actual
          research, the <a href="#projects">ISEF project</a> below, used machine learning on NASA satellite data
          to predict wildfire risk.
        </p>
      </details>
    </figure>
  )
}
