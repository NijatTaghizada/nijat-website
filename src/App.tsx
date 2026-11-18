import { useEffect, useState } from 'react'
import TypedText from './components/Typed'
import Waves from './components/Waves'
import { useTyped } from './components/useTyped'
import { intro, now, profile } from './data/profile'

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
      <span className="mono">{time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz })}</span>{' '}
      {city}
    </span>
  )
}

export default function App() {
  const { counts, done } = useTyped(TYPED, { speeds: SPEEDS })
  const typingName = counts[0] < TYPED[0].length

  return (
    <>
      <Waves />
      <main className="page">
        <h1 className="name">
          <TypedText text={TYPED[0]} count={counts[0]} caret={typingName} />
        </h1>
        <p className="intro">
          <TypedText text={TYPED[1]} count={counts[1]} caret={!typingName} />
        </p>

        <div className={done ? 'after-typing shown' : 'after-typing'}>
          <ul className="now">
            {now.map(line => (
              <li key={line.text}>
                {line.text}
                {line.link && (
                  <>
                    {' '}
                    <a href={line.link.href} target="_blank" rel="noreferrer">{line.link.label} ↗</a>
                  </>
                )}
              </li>
            ))}
          </ul>

          <ul className="links">
            <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
            <li><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a></li>
          </ul>

          <p className="clocks">
            <Clock city="Baku" tz="Asia/Baku" />
            <Clock city="Stanford" tz="America/Los_Angeles" />
          </p>
        </div>
      </main>
    </>
  )
}
