import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import Stats from './components/Stats'
import Work from './components/Work'
import Path from './components/Path'
import Honors from './components/Honors'
import Impact from './components/Impact'
import Journey from './components/Journey'
import Contact from './components/Contact'
import Terminal from './components/Terminal'

export default function App() {
  const [term, setTerm] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('input, textarea, [contenteditable]')) return
      if (e.key === '/' || e.key === '`') {
        e.preventDefault()
        setTerm(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <Nav onOpenTerminal={() => setTerm(true)} />
      <Hero />
      <main>
        <Manifesto />
        <Stats />
        <Work />
        <Path />
        <Honors />
        <Impact />
        <Journey />
      </main>
      <Contact onOpenTerminal={() => setTerm(true)} />
      <Terminal open={term} onClose={() => setTerm(false)} />
    </>
  )
}
