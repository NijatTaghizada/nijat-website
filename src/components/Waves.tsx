/**
 * Slow, layered waves along the bottom of the page, drawn in the accent colour.
 * Each path is two identical wave periods wide, so sliding it left by half
 * loops seamlessly.
 */
function wavePath(amp: number, base: number) {
  // Two periods across 0..2400, each 1200 wide
  let d = `M0 ${base}`
  for (let x = 0; x < 2400; x += 600) {
    const dir = (x / 600) % 2 === 0 ? -1 : 1
    d += ` Q${x + 300} ${base + dir * amp} ${x + 600} ${base}`
  }
  return d + ' V200 H0 Z'
}

const LAYERS = [
  { amp: 48, base: 80, opacity: 0.05, duration: 40 },
  { amp: 36, base: 110, opacity: 0.07, duration: 28 },
  { amp: 26, base: 140, opacity: 0.09, duration: 20 },
]

export default function Waves() {
  return (
    <div className="waves" aria-hidden="true">
      {LAYERS.map((l, i) => (
        <svg key={i} viewBox="0 0 2400 200" preserveAspectRatio="none" style={{ animationDuration: `${l.duration}s` }}>
          <path d={wavePath(l.amp, l.base)} fill="var(--accent)" fillOpacity={l.opacity} />
        </svg>
      ))}
    </div>
  )
}
