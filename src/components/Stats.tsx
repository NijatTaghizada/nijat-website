import { stats } from '../data/profile'
import { Counter, Reveal } from './Reveal'

export default function Stats() {
  return (
    <section className="stats container" aria-label="By the numbers">
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.08} className="stat">
          <div className="stat-value">
            {s.prefix}
            <Counter to={s.value} />
            {s.suffix && <span className="stat-suffix">{s.suffix}</span>}
          </div>
          <div className="stat-label mono">{s.label}</div>
        </Reveal>
      ))}
    </section>
  )
}
