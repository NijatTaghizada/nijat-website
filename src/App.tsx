import { useEffect, useState } from 'react'
import SilkWaves from './components/SilkWaves'
import TypedText from './components/Typed'
import { useTyped } from './components/useTyped'
import { intro, kicker, now, profile } from './data/profile'

const TYPED = [profile.name, intro]
const SPEEDS = [75, 22]

function Clock({ city, tz }: { city: string; tz: string }) {
  const [time, setTime] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 30_000)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="clock">
      {city} <span className="clock-time">{time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz })}</span>
    </span>
  )
}

export default function App() {
  const { counts, done } = useTyped(TYPED, { speeds: SPEEDS })
  const typingName = counts[0] < TYPED[0].length

  return (
    <>
      <div className="aurora" aria-hidden="true" />
      <SilkWaves />
      <div className="shade" aria-hidden="true" />

      <main className="page">
        <p className="kicker">{kicker}</p>
        <h1 className="name">
          <TypedText text={TYPED[0]} count={counts[0]} caret={typingName} />
        </h1>
        <p className="intro">
          <TypedText text={TYPED[1]} count={counts[1]} caret={!typingName} />
        </p>

        <div className={done ? 'after-typing shown' : 'after-typing'}>
          <dl className="now">
            {now.map(line => (
              <div key={line.label}>
                <dt>{line.label}</dt>
                <dd>
                  {line.text}
                  {line.link && (
                    <>
                      {' '}
                      <a href={line.link.href} target="_blank" rel="noreferrer">{line.link.label} ↗</a>
                    </>
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <ul className="links">
            <li><a className="btn btn-primary" href={`mailto:${profile.email}`}>{profile.email}</a></li>
            <li><a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a className="btn" href={profile.github} target="_blank" rel="noreferrer">GitHub</a></li>
          </ul>

          <p className="clocks">
            <Clock city="Baku" tz="Asia/Baku" />
            <span className="clock-sep">·</span>
            <Clock city="Stanford" tz="America/Los_Angeles" />
          </p>
        </div>
      </main>
    </>
  )
}
