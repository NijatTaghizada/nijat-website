import { useEffect, useRef, useState } from 'react'
import FireSim from './components/FireSim'
import { education, experience, honors, outside, profile, projects, skills, type Entry } from './data/profile'

function Clock({ city, tz }: { city: string; tz: string }) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(t)
  }, [])
  const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz })
  return (
    <div className="clock">
      <span className="mono">{time}</span> {city}
    </div>
  )
}

function Entries({ items }: { items: Entry[] }) {
  return (
    <ul className="entries">
      {items.map(e => (
        <li key={e.title + e.org}>
          <div className="entry-head">
            <span className="entry-title">{e.title}</span>
            {e.when && <span className="entry-when mono">{e.when}</span>}
          </div>
          <div className="entry-org">{e.org}</div>
          {e.body && <p className="entry-body">{e.body}</p>}
        </li>
      ))}
    </ul>
  )
}

const sections = [
  ['projects', 'Projects'],
  ['experience', 'Experience'],
  ['honors', 'Honors'],
  ['education', 'Education'],
  ['outside', 'Outside class'],
  ['skills', 'Skills'],
] as const

/** Which section is currently being read, for highlighting the sidebar menu. */
function useActiveSection() {
  const [active, setActive] = useState<string>(sections[0][0])
  const pinnedUntil = useRef(0)
  useEffect(() => {
    const update = () => {
      // Right after a menu click, keep the clicked item highlighted while the page scrolls
      if (performance.now() < pinnedUntil.current) return
      // At the very bottom the last sections can't reach the top, so pick the last one
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        return setActive(sections[sections.length - 1][0])
      }
      let current: string = sections[0][0]
      for (const [id] of sections) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.3) current = id
      }
      setActive(current)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])
  const pin = (id: string) => {
    pinnedUntil.current = performance.now() + 1200
    setActive(id)
  }
  return [active, pin] as const
}

export default function App() {
  const [active, pin] = useActiveSection()
  return (
    <div className="layout">
      <aside className="sidebar">
        <h1 className="name">{profile.name}</h1>
        <p className="intro">
          Salam! I’m a first-year at Stanford, planning to study Data Science or Computer Science. I grew up in
          Baku, Azerbaijan. I like machine learning, competitive programming, and building things for real problems,
          especially natural disasters.
        </p>

        <ul className="links">
          <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
          <li><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
          <li><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a></li>
        </ul>

        <nav className="toc" aria-label="Sections">
          {sections.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'active' : undefined} onClick={() => pin(id)}>{label}</a>
          ))}
        </nav>

        <p className="clocks-label mono">Local time</p>
        <div className="clocks">
          <Clock city="Baku" tz="Asia/Baku" />
          <Clock city="Stanford" tz="America/Los_Angeles" />
        </div>
      </aside>

      <main className="content">
        <FireSim />

        <section id="projects">
          <h2>Projects</h2>
          <div className="projects">
            {projects.map(p => (
              <article key={p.title} className="project">
                <h3>{p.title}</h3>
                <p className="project-meta mono">{p.meta}</p>
                <p>{p.body}</p>
                <div className="project-foot">
                  <ul className="tags">{p.tags.map(t => <li key={t} className="mono">{t}</li>)}</ul>
                  {p.links.map(l => (
                    <a key={l.href} className="project-link" href={l.href} target="_blank" rel="noreferrer">
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience">
          <h2>Experience</h2>
          <Entries items={experience} />
        </section>

        <section id="honors">
          <h2>Honors</h2>
          <Entries items={honors} />
        </section>

        <section id="education">
          <h2>Education</h2>
          <Entries items={education} />
        </section>

        <section id="outside">
          <h2>Outside class</h2>
          <Entries items={outside} />
        </section>

        <section id="skills">
          <h2>Skills</h2>
          <dl className="skills">
            {skills.map(s => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.items}</dd>
              </div>
            ))}
          </dl>
        </section>

        <footer className="footer">
          <p>
            Reach me at <a href={`mailto:${profile.email}`}>{profile.email}</a> or{' '}
            <a href={`mailto:${profile.personalEmail}`}>{profile.personalEmail}</a>.
          </p>
          <p className="mono muted">Made with React · Last updated October 2026</p>
        </footer>
      </main>
    </div>
  )
}
