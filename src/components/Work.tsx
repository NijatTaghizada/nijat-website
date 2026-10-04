import { motion } from 'motion/react'
import { projects, type Project } from '../data/profile'
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

function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="project">
      <Reveal className="project-meta">
        <div className="project-index mono">{p.index}</div>
        <div className="project-kicker mono">{p.kicker}</div>
        <h3 className="project-title">{p.title}</h3>
        <p className="project-summary">{p.summary}</p>
        <dl className="project-outcomes">
          {p.outcomes.map(o => (
            <div key={o.label}>
              <dt className="mono">{o.label}</dt>
              <dd>{o.detail}</dd>
            </div>
          ))}
        </dl>
        <ul className="chips">
          {p.stack.map(s => <li key={s}>{s}</li>)}
        </ul>
      </Reveal>
      <Reveal delay={0.15} className="project-visual">
        {p.visual === 'pipeline' ? <Pipeline /> : <Roc />}
      </Reveal>
    </article>
  )
}

export default function Work() {
  return (
    <section className="container section" id="work">
      <SectionLabel index="01">Selected work</SectionLabel>
      <Reveal>
        <h2 className="section-title">Models with <em>consequences</em>.</h2>
      </Reveal>
      <div className="projects">
        {projects.map(p => <ProjectCard key={p.index} p={p} />)}
      </div>
    </section>
  )
}
