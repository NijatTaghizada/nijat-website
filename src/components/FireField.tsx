import { useEffect, useRef } from 'react'
import { IGNITE_EVENT } from '../lib/ignite'

export type FireStats = { burning: number; burned: number; wind: number }

type Props = { onStats?: (s: FireStats) => void }

const CELL = 12
const SPREAD = 0.05

// Heat ramp: smoulder -> red -> orange -> yellow-white
const RAMP = [
  [60, 14, 8],
  [178, 34, 18],
  [255, 90, 31],
  [255, 170, 60],
  [255, 236, 190],
]
function heatColor(h: number) {
  const t = Math.min(0.999, h) * (RAMP.length - 1)
  const i = Math.floor(t)
  const f = t - i
  const a = RAMP[i], b = RAMP[i + 1]
  return `rgb(${a[0] + (b[0] - a[0]) * f | 0},${a[1] + (b[1] - a[1]) * f | 0},${a[2] + (b[2] - a[2]) * f | 0})`
}

/** Cheap smooth value noise so fuel forms patches (forest, scrub, clearings). */
function makeNoise(seed: number) {
  const r = (x: number, y: number) => {
    const s = Math.sin(x * 127.1 + y * 311.7 + seed) * 43758.5453
    return s - Math.floor(s)
  }
  const smooth = (t: number) => t * t * (3 - 2 * t)
  return (x: number, y: number) => {
    const xi = Math.floor(x), yi = Math.floor(y)
    const xf = smooth(x - xi), yf = smooth(y - yi)
    const top = r(xi, yi) + (r(xi + 1, yi) - r(xi, yi)) * xf
    const bot = r(xi, yi + 1) + (r(xi + 1, yi + 1) - r(xi, yi + 1)) * xf
    return top + (bot - top) * yf
  }
}

/**
 * A tiny cellular-automaton wildfire model. Every dot is a patch of land with
 * some fuel; heat spreads to neighbours with a probability scaled by their fuel
 * and the wind, burns the fuel down, and the land slowly regrows.
 */
export default function FireField({ onStats }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const statsRef = useRef(onStats)
  useEffect(() => { statsRef.current = onStats }, [onStats])

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const noise = makeNoise(Math.random() * 1000)

    let cols = 0, rows = 0, dpr = 1
    let fuel = new Float32Array(0), maxFuel = new Float32Array(0)
    let heat = new Float32Array(0), next = new Float32Array(0)
    let burned = 0
    let windX = 1, windY = 0.25
    let raf = 0, visible = true, lastStep = 0, lastStats = 0, lastStrike = 0

    function resize() {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      cols = Math.ceil(rect.width / CELL)
      rows = Math.ceil(rect.height / CELL)
      const n = cols * rows
      fuel = new Float32Array(n); maxFuel = new Float32Array(n)
      heat = new Float32Array(n); next = new Float32Array(n)
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const v = noise(x / 9, y / 9) * 0.7 + noise(x / 3, y / 3) * 0.3
          const f = Math.max(0.05, Math.min(1, (v - 0.25) * 1.6))
          fuel[y * cols + x] = maxFuel[y * cols + x] = f
        }
      }
      draw()
    }

    function ignite(cx: number, cy: number, radius: number) {
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          if (dx * dx + dy * dy > radius * radius) continue
          const x = cx + dx, y = cy + dy
          if (x < 0 || y < 0 || x >= cols || y >= rows) continue
          const i = y * cols + x
          if (fuel[i] > 0.15) heat[i] = Math.max(heat[i], 0.9 + Math.random() * 0.1)
        }
      }
    }

    function step() {
      next.set(heat)
      let burning = 0
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x
          const h = heat[i]
          if (h < 0.03) {
            if (fuel[i] < maxFuel[i]) fuel[i] += 0.0006
            continue
          }
          burning++
          if (h > 0.45) {
            for (let dy = -1; dy <= 1; dy++) {
              for (let dx = -1; dx <= 1; dx++) {
                if (!dx && !dy) continue
                const nx = x + dx, ny = y + dy
                if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue
                const j = ny * cols + nx
                if (heat[j] > 0.03 || fuel[j] < 0.15) continue
                const wind = 1 + 0.9 * (dx * windX + dy * windY)
                if (Math.random() < SPREAD * h * fuel[j] * fuel[j] * 2.2 * wind) {
                  next[j] = 0.85 + Math.random() * 0.15
                  burned++
                }
              }
            }
          }
          fuel[i] = Math.max(0, fuel[i] - 0.03 * h)
          next[i] = h * (fuel[i] > 0.05 ? 0.94 : 0.85)
        }
      }
      const t = heat; heat = next; next = t
      return burning
    }

    function draw() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, cols * CELL, rows * CELL)
      // Unburnt land, batched into a few brightness buckets to keep fillStyle swaps cheap
      const buckets = 5
      for (let b = 0; b < buckets; b++) {
        ctx.fillStyle = `rgba(242,239,233,${0.05 + b * 0.04})`
        for (let i = 0; i < fuel.length; i++) {
          if (heat[i] >= 0.03) continue
          if (Math.min(buckets - 1, (fuel[i] * buckets) | 0) !== b) continue
          const x = (i % cols) * CELL + CELL / 2, y = ((i / cols) | 0) * CELL + CELL / 2
          ctx.fillRect(x - 1, y - 1, 2, 2)
        }
      }
      for (let i = 0; i < heat.length; i++) {
        const h = heat[i]
        if (h < 0.03) continue
        const x = (i % cols) * CELL + CELL / 2, y = ((i / cols) | 0) * CELL + CELL / 2
        const c = heatColor(h)
        // soft glow halo, then the hot core
        ctx.globalAlpha = 0.12 * h
        ctx.fillStyle = c
        ctx.beginPath()
        ctx.arc(x, y, CELL * (0.8 + h), 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
        const s = 1.5 + h * 4
        ctx.fillRect(x - s / 2, y - s / 2, s, s)
      }
    }

    function frame(now: number) {
      raf = requestAnimationFrame(frame)
      if (!visible || document.hidden) return
      if (now - lastStep < 33) return
      lastStep = now
      if (now - lastStrike > 2500 + Math.random() * 2500) {
        lastStrike = now
        ignite((Math.random() * cols) | 0, (Math.random() * rows) | 0, 2)
      }
      // Wind slowly veers
      const a = Math.sin(now / 9000) * 0.6
      windX = Math.cos(a); windY = Math.sin(a)
      const burning = step()
      draw()
      if (now - lastStats > 250) {
        lastStats = now
        statsRef.current?.({ burning, burned, wind: Math.round(((a * 180) / Math.PI + 90 + 360) % 360) })
      }
    }

    const toCell = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      return [((e.clientX - r.left) / CELL) | 0, ((e.clientY - r.top) / CELL) | 0] as const
    }
    let lastMove = 0
    const onMove = (e: PointerEvent) => {
      if (reduced) return
      const now = performance.now()
      if (now - lastMove < 40) return
      lastMove = now
      const [x, y] = toCell(e)
      ignite(x, y, 0)
    }
    const onDown = (e: PointerEvent) => {
      if (reduced) return
      const [x, y] = toCell(e)
      ignite(x, y, 2)
    }
    const onIgnite = (e: Event) => {
      const count = (e as CustomEvent<number>).detail ?? 6
      for (let k = 0; k < count; k++) ignite((Math.random() * cols) | 0, (Math.random() * rows) | 0, 2)
    }

    const host = canvas.parentElement!
    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerdown', onDown)
    window.addEventListener(IGNITE_EVENT, onIgnite)
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    io.observe(canvas)
    resize()
    if (!reduced) {
      // Start with a couple of fires already going so the field is alive on load
      onIgnite(new CustomEvent(IGNITE_EVENT, { detail: 3 }))
      raf = requestAnimationFrame(frame)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect(); io.disconnect()
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerdown', onDown)
      window.removeEventListener(IGNITE_EVENT, onIgnite)
    }
  }, [])

  return <canvas ref={canvasRef} className="fire-field" aria-hidden="true" />
}
