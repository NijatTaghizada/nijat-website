import { motion } from 'motion/react'
import { builds, type Build } from '../data/profile'
import { Reveal, SectionLabel } from './Reveal'

function Pipeline() {
  const nodes = [
    { x: 20, y: 110, w: 92, label: 'NASA satellite', sub: 'raw signal' },
    { x: 150, y: 50, w: 82, label: 'XGBoost', sub: 'boosted trees' },
    { x: 150, y: 170, w: 82, label: 'TabNet', sub: 'attention' },
    { x: 270, y: 110, w: 60, label: 'SHAP', sub: 'explain' },
    { x: 362, y: 110, w: 78, label: 'Severity', sub: 'prediction', hot: true },
  ]
  const edges = [
    'M112 128 C130 128 130 68 150 68',
    'M112 128 C130 128 130 188 150 188',
    'M232 68 C252 68 250 128 270 128',
    'M232 188 C252 188 250 128 270 128',
    'M330 128 L362 128',
  ]
  return (
    <svg viewBox="0 0 460 250" className="viz" role="img" aria-label="Model pipeline: NASA satellite data feeds XGBoost and TabNet, explained with SHAP, producing a severity prediction">
      {edges.map((d, i) => (
        <g key={i}>
          <motion.path
            d={d}
            className="viz-edge"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 + i * 0.15 }}
          />
          <circle r="2.5" className="viz-pulse">
            <animateMotion dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" path={d} />
          </circle>
        </g>
      ))}
      {nodes.map((n, i) => (
        <motion.g
          key={n.label}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.12 }}
        >
          <rect x={n.x} y={n.y} width={n.w} height={36} rx={6} className={n.hot ? 'viz-node hot' : 'viz-node'} />
          <text x={n.x + n.w / 2} y={n.y + 16} className="viz-label">{n.label}</text>
          <text x={n.x + n.w / 2} y={n.y + 28} className="viz-sub">{n.sub}</text>
        </motion.g>
      ))}
    </svg>
  )
}

function Roc() {
  // y = x^0.25 has area 1 / 1.25 = 0.80 under it — the model's reported ROC-AUC
  const pts = Array.from({ length: 41 }, (_, i) => {
    const x = i / 40
    return [30 + x * 200, 210 - Math.pow(x, 0.25) * 190]
  })
  const curve = 'M' + pts.map(p => p.map(v => v.toFixed(1)).join(' ')).join(' L')
  const area = `${curve} L230 210 L30 210 Z`
  return (
    <svg viewBox="0 0 260 240" className="viz" role="img" aria-label="ROC curve with area under the curve of 0.80">
      {[0, 0.25, 0.5, 0.75, 1].map(t => (
        <g key={t}>
          <line x1={30 + t * 200} x2={30 + t * 200} y1={20} y2={210} className="viz-grid" />
          <line x1={30} x2={230} y1={210 - t * 190} y2={210 - t * 190} className="viz-grid" />
        </g>
      ))}
      <line x1={30} y1={210} x2={230} y2={20} className="viz-diag" />
      <motion.path
        d={area}
        className="viz-area"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1 }}
      />
      <motion.path
        d={curve}
        className="viz-curve"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
      />
      <text x={150} y={150} className="viz-big">AUC 0.80</text>
      <text x={130} y={232} className="viz-sub">false positive rate</text>
      <text x={12} y={115} className="viz-sub" transform="rotate(-90 12 115)">true positive rate</text>
    </svg>
  )
}

function Snake() {
  // Body segments ride a travelling sine wave, like a snake robot's serpentine gait
  const segs = 14
  return (
    <svg viewBox="0 0 400 120" className="viz" role="img" aria-label="Animated snake robot crawling through rubble">
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x={i * 46 + (i % 2) * 12} y={i % 3 === 0 ? 92 : 100} width={30 + (i % 3) * 8} height={i % 3 === 0 ? 18 : 10} rx={2} className="rubble" />
      ))}
      {Array.from({ length: segs }, (_, i) => (
        <circle key={i} cx={60 + i * 20} cy={60} r={i === segs - 1 ? 9 : 7} className={i === segs - 1 ? 'snake-head' : 'snake-seg'}
          style={{ animationDelay: `${-i * 0.12}s` }} />
      ))}
      <circle cx={350} cy={60} r={22} className="snake-scan" />
    </svg>
  )
}

function Sensor() {
  return (
    <svg viewBox="0 0 200 240" className="viz" role="img" aria-label="Smoke sensor sending an automatic alert">
      {[0, 1, 2].map(i => (
        <circle key={i} cx={100} cy={150} r={30} className="sensor-ring" style={{ animationDelay: `${i * 0.8}s` }} />
      ))}
      <rect x={70} y={130} width={60} height={40} rx={10} className="viz-node hot" />
      <circle cx={100} cy={150} r={5} className="sensor-led" />
      {[0, 1, 2].map(i => (
        <circle key={i} cx={88 + i * 12} cy={110} r={10 + i * 3} className="smoke" style={{ animationDelay: `${i * 0.6}s` }} />
      ))}
      <g className="sensor-alert">
        <rect x={40} y={20} width={120} height={34} rx={17} className="viz-node" />
        <circle cx={60} cy={37} r={4} className="sensor-led" />
        <text x={108} y={41} className="viz-label">Alert sent</text>
      </g>
    </svg>
  )
}

function Platform() {
  const phases = ['Before', 'During', 'After']
  return (
    <svg viewBox="0 0 300 120" className="viz" role="img" aria-label="Before, during and after phases of the platform">
      <line x1={30} x2={270} y1={50} y2={50} className="viz-edge" />
      <motion.line x1={30} x2={270} y1={50} y2={50} className="viz-curve" initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: 'easeInOut' }} />
      {phases.map((p, i) => (
        <g key={p}>
          <circle cx={30 + i * 120} cy={50} r={10} className="viz-node hot" />
          <text x={30 + i * 120} y={88} className="viz-label">{p}</text>
        </g>
      ))}
    </svg>
  )
}

const VISUALS = { snake: Snake, sensor: Sensor, platform: Platform, pipeline: Pipeline, roc: Roc }

function BuildCard({ b, i }: { b: Build; i: number }) {
  const Visual = VISUALS[b.visual]
  return (
    <Reveal delay={(i % 3) * 0.08} className={`build build-${b.size}`}>
      <div className="build-visual"><Visual /></div>
      <div className="build-body">
        <div className="build-kicker mono">{b.kicker}</div>
        <h3 className="build-title">{b.title}</h3>
        <p className="build-blurb">{b.blurb}</p>
        <ul className="chips">{b.tags.map(t => <li key={t}>{t}</li>)}</ul>
      </div>
    </Reveal>
  )
}

export default function Work() {
  return (
    <section className="container section" id="work">
      <SectionLabel index="01">Things I've built</SectionLabel>
      <Reveal>
        <h2 className="section-title">Robots, sensors, models. <em>Whatever helps</em>.</h2>
      </Reveal>
      <div className="builds">
        {builds.map((b, i) => <BuildCard key={b.title} b={b} i={i} />)}
      </div>
    </section>
  )
}
