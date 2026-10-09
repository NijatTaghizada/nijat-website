import { useEffect, useRef } from 'react'

export type FireStats = { burning: number; burnedPct: number }

type Props = {
  /** 0 = calm; larger values push fire harder to the east. */
  wind: number
  /** Changing this value regrows the whole landscape. */
  resetKey: number
  onStats?: (s: FireStats) => void
  /** Called the first time the visitor starts a fire themselves. */
  onUserIgnite?: () => void
}

const CELL = 12
const SPREAD = 0.25
const REGROW = 0.0005

// Flame colours: embers -> red -> orange -> amber
const RAMP = [
  [120, 30, 12],
  [200, 45, 20],
  [245, 100, 30],
  [252, 170, 50],
]
function flameColor(h: number) {
  const t = Math.min(0.999, h) * (RAMP.length - 1)
  const i = Math.floor(t)
  const f = t - i
  const a = RAMP[i], b = RAMP[i + 1]
  return `rgb(${a[0] + (b[0] - a[0]) * f | 0},${a[1] + (b[1] - a[1]) * f | 0},${a[2] + (b[2] - a[2]) * f | 0})`
}

/** Cheap smooth value noise so vegetation forms patches (forest, scrub, clearings). */
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
 * A small cellular-automaton wildfire model. Every dot is a patch of land with
 * some amount of vegetation (fuel). A burning patch can ignite its eight
 * neighbours; the chance grows with their fuel and with the wind behind it.
 * Burning uses the fuel up, leaving ash that slowly grows back.
 */
export default function FireField({ wind, resetKey, onStats, onUserIgnite }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const windRef = useRef(wind)
  const statsRef = useRef(onStats)
  const igniteRef = useRef(onUserIgnite)
  const resetRef = useRef<() => void>(() => {})
  useEffect(() => { windRef.current = wind }, [wind])
  useEffect(() => { statsRef.current = onStats }, [onStats])
  useEffect(() => { igniteRef.current = onUserIgnite }, [onUserIgnite])
  useEffect(() => { resetRef.current() }, [resetKey])

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let cols = 0, rows = 0, dpr = 1, width = 0, height = 0
    let fuel = new Float32Array(0), maxFuel = new Float32Array(0)
    let heat = new Float32Array(0), next = new Float32Array(0)
    let scorched = new Uint8Array(0)
    let veg = '77,124,15', ash = '120,113,108'
    let raf = 0, visible = true, lastStep = 0, lastStats = 0
    let userStarted = false, demoAt = performance.now() + 2500

    function readColors() {
      const cs = getComputedStyle(canvas)
      veg = cs.getPropertyValue('--veg-rgb').trim() || veg
      ash = cs.getPropertyValue('--ash-rgb').trim() || ash
    }

    function grow() {
      const noise = makeNoise(Math.random() * 1000)
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const v = noise(x / 8, y / 8) * 0.7 + noise(x / 3, y / 3) * 0.3
          const f = Math.max(0.08, Math.min(1, (v - 0.2) * 1.6))
          fuel[y * cols + x] = maxFuel[y * cols + x] = f
        }
      }
      heat.fill(0)
      scorched.fill(0)
    }

    function resize() {
      readColors()
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width; height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      cols = Math.ceil(width / CELL)
      rows = Math.ceil(height / CELL)
      const n = cols * rows
      fuel = new Float32Array(n); maxFuel = new Float32Array(n)
      heat = new Float32Array(n); next = new Float32Array(n)
      scorched = new Uint8Array(n)
      grow()
      draw()
    }

    function ignite(cx: number, cy: number, radius: number) {
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          if (dx * dx + dy * dy > radius * radius) continue
          const x = cx + dx, y = cy + dy
          if (x < 0 || y < 0 || x >= cols || y >= rows) continue
          const i = y * cols + x
          if (fuel[i] > 0.15 && heat[i] < 0.03) { heat[i] = 1; scorched[i] = 1 }
        }
      }
    }

    function step() {
      const w = windRef.current
      next.set(heat)
      let burning = 0
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x
          const h = heat[i]
          if (h < 0.03) {
            if (fuel[i] < maxFuel[i]) {
              fuel[i] = Math.min(maxFuel[i], fuel[i] + REGROW)
              if (fuel[i] > maxFuel[i] * 0.9) scorched[i] = 0
            }
            continue
          }
          burning++
          if (h > 0.4) {
            for (let dy = -1; dy <= 1; dy++) {
              for (let dx = -1; dx <= 1; dx++) {
                if (!dx && !dy) continue
                const nx = x + dx, ny = y + dy
                if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue
                const j = ny * cols + nx
                if (heat[j] > 0.03 || next[j] > 0.03 || fuel[j] < 0.15) continue
                // Wind blows east: downwind neighbours (dx = 1) catch more easily, upwind barely
                const push = Math.max(0.08, 1 + w * dx)
                const diag = dx && dy ? 0.7 : 1
                if (Math.random() < SPREAD * fuel[j] * fuel[j] * push * diag) {
                  next[j] = 1
                  scorched[j] = 1
                }
              }
            }
          }
          fuel[i] = Math.max(0, fuel[i] - 0.1)
          next[i] = fuel[i] > 0.02 ? h * 0.93 : h * 0.7
        }
      }
      const t = heat; heat = next; next = t
      return burning
    }

    function draw() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)
      // Vegetation and ash, batched into brightness buckets to keep fillStyle swaps cheap
      const buckets = 5
      for (let b = 0; b < buckets; b++) {
        for (const kind of [0, 1]) {
          ctx.fillStyle = kind === 0
            ? `rgba(${veg},${0.3 + b * 0.14})`
            : `rgba(${ash},${0.35 + b * 0.13})`
          for (let i = 0; i < fuel.length; i++) {
            if (heat[i] >= 0.03) continue
            const isAsh = scorched[i] === 1
            if (isAsh !== (kind === 1)) continue
            // Vegetation gets darker with more fuel; ash gets darker the more was burned
            const amount = isAsh ? 1 - fuel[i] / maxFuel[i] : fuel[i]
            if (Math.min(buckets - 1, (amount * buckets) | 0) !== b) continue
            const x = (i % cols) * CELL + CELL / 2, y = ((i / cols) | 0) * CELL + CELL / 2
            const s = isAsh ? 3 : 2 + fuel[i] * 1.5
            ctx.fillRect(x - s / 2, y - s / 2, s, s)
          }
        }
      }
      for (let i = 0; i < heat.length; i++) {
        const h = heat[i]
        if (h < 0.03) continue
        const x = (i % cols) * CELL + CELL / 2, y = ((i / cols) | 0) * CELL + CELL / 2
        ctx.fillStyle = flameColor(h)
        ctx.globalAlpha = 0.14 * h
        ctx.beginPath()
        ctx.arc(x, y, CELL * 0.7, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
        const s = 3 + h * 4
        ctx.fillRect(x - s / 2, y - s / 2, s, s)
      }
    }

    function report(burning: number) {
      let burned = 0
      for (let i = 0; i < scorched.length; i++) burned += scorched[i]
      statsRef.current?.({ burning, burnedPct: scorched.length ? Math.round((burned / scorched.length) * 100) : 0 })
    }

    function frame(now: number) {
      raf = requestAnimationFrame(frame)
      if (!visible || document.hidden) return
      if (now - lastStep < 55) return
      lastStep = now
      // If nobody has tried it yet, start one demo fire upwind so the spread is visible
      if (!userStarted && demoAt && now > demoAt) {
        demoAt = 0
        ignite(Math.floor(cols * 0.15), Math.floor(rows / 2), 2)
      }
      const burning = step()
      draw()
      if (now - lastStats > 250) { lastStats = now; report(burning) }
    }

    const toCell = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      return [((e.clientX - r.left) / CELL) | 0, ((e.clientY - r.top) / CELL) | 0] as const
    }
    let dragging = false
    const startFire = (e: PointerEvent) => {
      const [x, y] = toCell(e)
      // Radius 2 so a click just beside a clearing still catches nearby vegetation
      ignite(x, y, 2)
      if (reduced) draw()
      if (!userStarted) { userStarted = true; igniteRef.current?.() }
    }
    const onDown = (e: PointerEvent) => { dragging = true; startFire(e) }
    const onMove = (e: PointerEvent) => { if (dragging) startFire(e) }
    const onUp = () => { dragging = false }

    resetRef.current = () => {
      if (!cols) return
      grow()
      draw()
      report(0)
    }

    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    const scheme = window.matchMedia('(prefers-color-scheme: dark)')
    const onScheme = () => { readColors(); draw() }
    scheme.addEventListener('change', onScheme)
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    io.observe(canvas)
    resize()
    if (!reduced) raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect(); io.disconnect()
      scheme.removeEventListener('change', onScheme)
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  return <canvas ref={canvasRef} className="fire-field" aria-label="Wildfire spread simulation. Click to start a fire." role="img" />
}
