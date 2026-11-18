import SilkWaves from './components/SilkWaves'
import TypedText from './components/Typed'
import { useTyped } from './components/useTyped'
import { intro, now, profile, type Line } from './data/profile'

const TYPED = [profile.name, intro]
const SPEEDS = [80, 24]

/** Renders a sentence with its link phrase turned into a link. */
function Sentence({ line }: { line: Line }) {
  if (!line.link) return <p>{line.text}</p>
  const [before, after] = line.text.split(line.link.phrase)
  return (
    <p>
      {before}
      <a href={line.link.href} target="_blank" rel="noreferrer">{line.link.phrase}</a>
      {after}
    </p>
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
        <h1 className="name">
          <TypedText text={TYPED[0]} count={counts[0]} caret={typingName} />
        </h1>
        <p className="intro">
          <TypedText text={TYPED[1]} count={counts[1]} caret={!typingName} />
        </p>

        <div className={done ? 'after-typing shown' : 'after-typing'}>
          <div className="now">
            {now.map(line => <Sentence key={line.text} line={line} />)}
          </div>
          <p className="links">
            <a href={`mailto:${profile.email}`}>Email</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          </p>
        </div>
      </main>
    </>
  )
}
