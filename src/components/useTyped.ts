import { useEffect, useState } from 'react'

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Types out a list of strings one after another. Returns how many characters
 * of each string are visible, plus whether everything has been typed.
 */
export function useTyped(texts: string[], { speeds, pause = 350, startDelay = 300 }: { speeds: number[]; pause?: number; startDelay?: number }) {
  const [counts, setCounts] = useState<number[]>(() => (reduced() ? texts.map(t => t.length) : texts.map(() => 0)))

  useEffect(() => {
    if (reduced()) return
    let cancelled = false
    let timer = 0
    let part = 0
    let i = 0
    const tick = () => {
      if (cancelled) return
      if (part >= texts.length) return
      i++
      // Copy the values: the state update runs later, after part/i may have moved on
      const p = part, n = i
      setCounts(prev => prev.map((c, k) => (k === p ? n : c)))
      if (i >= texts[part].length) {
        part++
        i = 0
        timer = window.setTimeout(tick, pause)
      } else {
        // A little human unevenness, and a beat after punctuation
        const ch = texts[part][i - 1]
        const extra = /[.,!?]/.test(ch) ? 120 : 0
        timer = window.setTimeout(tick, speeds[part] * (0.6 + Math.random() * 0.8) + extra)
      }
    }
    timer = window.setTimeout(tick, startDelay)
    return () => { cancelled = true; clearTimeout(timer) }
  }, [texts, speeds, pause, startDelay])

  const done = counts.every((c, k) => c >= texts[k].length)
  return { counts, done }
}
