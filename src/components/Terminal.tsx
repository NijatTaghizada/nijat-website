import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { builds, honors, profile } from '../data/profile'
import { igniteField } from '../lib/ignite'

type Line = { kind: 'in' | 'out'; text: string }

const HELP = `available commands:
  whoami     who is this guy
  work       things I've built
  honors     awards
  contact    how to reach me
  ignite     start a fire on the hero map
  goto <s>   jump to work | path | honors | impact | journey | contact
  linkedin   open LinkedIn
  clear      clear the screen
  exit       close the terminal`

function run(raw: string, close: () => void): string | null {
  const [cmd, ...args] = raw.trim().split(/\s+/)
  switch (cmd?.toLowerCase()) {
    case '': return null
    case 'help': return HELP
    case 'whoami':
      return `${profile.name}\n${profile.school} '${String(profile.gradYear).slice(2)} · ${profile.degree}\nbuilder · competitive programmer · debater · founder of React Right`
    case 'work':
    case 'projects':
      return builds.map((b, i) => `[0${i + 1}] ${b.title}\n     ${b.tags.join(' · ')}`).join('\n')
    case 'honors':
    case 'awards':
      return honors.map(h => `★ ${h.title}, ${h.org} (${h.note})`).join('\n')
    case 'contact':
      return `email     ${profile.email}\npersonal  ${profile.personalEmail}\nlinkedin  ${profile.linkedin}\ngithub    ${profile.github}`
    case 'ignite':
      close()
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => igniteField(10), 400)
      return '🔥 igniting…'
    case 'goto': {
      const el = document.getElementById(args[0] ?? '')
      if (!el) return `goto: unknown section "${args[0] ?? ''}"`
      close()
      el.scrollIntoView({ behavior: 'smooth' })
      return `→ ${args[0]}`
    }
    case 'linkedin':
      window.open(profile.linkedin, '_blank', 'noopener')
      return 'opening LinkedIn…'
    case 'sudo':
      return 'nice try. but you can just email me: ' + profile.email
    case 'exit':
      close()
      return null
    default:
      return `command not found: ${cmd}. type "help"`
  }
}

export default function Terminal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [lines, setLines] = useState<Line[]>([
    { kind: 'out', text: `nijat-os v1.0. Type "help" to get started.` },
  ])
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [hIdx, setHIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 50) }, [open])
  useEffect(() => { bodyRef.current?.scrollTo(0, bodyRef.current.scrollHeight) }, [lines])

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') return onClose()
    if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault()
      const i = Math.min(history.length - 1, hIdx + 1)
      setHIdx(i); setValue(history[history.length - 1 - i])
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const i = Math.max(-1, hIdx - 1)
      setHIdx(i); setValue(i < 0 ? '' : history[history.length - 1 - i])
      return
    }
    if (e.key !== 'Enter') return
    const input = value
    setValue(''); setHIdx(-1)
    if (input.trim()) setHistory(h => [...h, input])
    if (input.trim() === 'clear') return setLines([])
    const out = run(input, onClose)
    setLines(l => [...l, { kind: 'in', text: input }, ...(out ? [{ kind: 'out' as const, text: out }] : [])])
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="term-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="term"
            role="dialog"
            aria-label="Terminal"
            initial={{ y: 24, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 24, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => { e.stopPropagation(); inputRef.current?.focus() }}
          >
            <div className="term-bar">
              <span className="term-dots"><i /><i /><i /></span>
              <span className="mono">guest@nijat ~ zsh</span>
              <button className="term-close" onClick={onClose} aria-label="Close terminal">esc</button>
            </div>
            <div className="term-body mono" ref={bodyRef}>
              {lines.map((l, i) => (
                <pre key={i} className={l.kind === 'in' ? 'term-in' : 'term-out'}>
                  {l.kind === 'in' ? <><span className="term-prompt">❯ </span>{l.text}</> : l.text}
                </pre>
              ))}
              <div className="term-input-row">
                <span className="term-prompt">❯</span>
                <input
                  ref={inputRef}
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  onKeyDown={onKey}
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal input"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
