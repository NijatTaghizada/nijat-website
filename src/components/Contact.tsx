import { useState } from 'react'
import { profile } from '../data/profile'
import { Reveal } from './Reveal'

const YEAR = new Date().getFullYear()

export default function Contact({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <footer className="contact" id="contact">
      <div className="container">
        <Reveal>
          <p className="mono contact-kicker">06 — Contact</p>
          <h2 className="contact-title">
            Let's build something<br />that <em>matters</em>.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="contact-actions">
          <button className="btn btn-primary" onClick={copy}>
            {copied ? 'Copied ✓' : profile.email}
          </button>
          <a className="btn" href={`mailto:${profile.personalEmail}`}>{profile.personalEmail}</a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a className="btn" href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        </Reveal>
        <div className="footer-bar mono">
          <span>© {YEAR} {profile.name}</span>
          <button className="link-btn" onClick={onOpenTerminal}>
            psst. press <kbd>/</kbd> for a terminal
          </button>
          <span>Built with React + TypeScript</span>
        </div>
      </div>
    </footer>
  )
}
