import { useEffect, useRef } from 'react'

/**
 * Silky ribbons of thin lines drawn on a canvas. Each ribbon is a bundle of
 * lines that follow the same slow wave but spread apart and cross over each
 * other as they travel, so the bundle looks like a twisting strip of silk.
 * Lines fade out toward the left so the text there stays readable.
 */

type Ribbon = {
  lines: number
  y: number       // vertical centre, as a fraction of the height
  amp: number     // main wave height, fraction of the height
  spread: number  // how far the lines fan out, fraction of the height
  freq: number    // wave periods across the screen
  speed: number   // radians per second
  phase: number
  alpha: number
}

const RIBBONS: Ribbon[] = [
  { lines: 38, y: 0.6, amp: 0.12, spread: 0.2, freq: 0.9, speed: 0.16, phase: 0, alpha: 0.42 },
  { lines: 24, y: 0.76, amp: 0.07, spread: 0.12, freq: 1.4, speed: -0.11, phase: 2.2, alpha: 0.26 },
]

type RGB = [number, number, number]

function cssColor(name: string): RGB {
  const hex = getComputedStyle(document.documentElement).getPropertyValue(name).trim().replace('#', '')
  const n = parseInt(hex.length === 3 ? hex.replace(/./g, c => c + c) : hex, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

const mix = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
const rgba = (c: RGB, a: number) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`

export default function SilkWaves() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const secondary = cssColor('--secondary')
    const accent = cssColor('--accent')

    let w = 0, h = 0, dpr = 1, raf = 0
    // Pointer position, eased so the waves drift toward it rather than snapping
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
    }

    function draw(t: number) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      ctx.lineWidth = 1
      const step = Math.max(12, w / 120)

      for (const r of RIBBONS) {
        for (let i = 0; i < r.lines; i++) {
          const p = i / (r.lines - 1)
          const fromCentre = Math.abs(p - 0.5) * 2
          // Centre lines catch the warm accent; the rest stay indigo
          const color = mix(secondary, accent, Math.exp(-(((p - 0.5) / 0.1) ** 2)) * 0.85)
          const a = r.alpha * (0.2 + 0.8 * (1 - fromCentre))

          const grad = ctx.createLinearGradient(0, 0, w, 0)
          grad.addColorStop(0, rgba(color, 0))
          grad.addColorStop(0.3, rgba(color, a * 0.25))
          grad.addColorStop(0.65, rgba(color, a))
          grad.addColorStop(1, rgba(color, a * 0.7))
          ctx.strokeStyle = grad

          ctx.beginPath()
          for (let x = -step; x <= w + step; x += step) {
            const nx = x / w
            // The twist term changes sign along the ribbon, so the lines cross over
            const twist = Math.sin(nx * Math.PI * r.freq * 1.4 + t * r.speed * 1.6 + r.phase + mouse.x * 0.8)
            const fan = (p - 0.5) * r.spread * h * (0.2 + 0.8 * twist)
            const y =
              r.y * h +
              Math.sin(nx * Math.PI * 2 * r.freq + t * r.speed + r.phase + mouse.x * 0.5) * r.amp * h +
              Math.sin(nx * 7 + t * r.speed * 1.9 + p * 1.4) * h * 0.012 +
              fan +
              mouse.y * h * 0.05 * nx
            if (x === -step) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.stroke()
        }
      }
      ctx.globalCompositeOperation = 'source-over'
    }

    let start = performance.now()
    let last = 0
    function frame(now: number) {
      raf = requestAnimationFrame(frame)
      // The waves move slowly, so 30 frames a second is plenty and halves the work
      if (document.hidden || now - last < 32) return
      last = now
      mouse.x += (mouse.tx - mouse.x) * 0.03
      mouse.y += (mouse.ty - mouse.y) * 0.03
      draw((now - start) / 1000)
    }

    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth - 0.5
      mouse.ty = e.clientY / window.innerHeight - 0.5
    }
    const onResize = () => { resize(); if (reduced) draw(8) }

    resize()
    draw(8)
    window.addEventListener('resize', onResize)
    if (!reduced) {
      start -= 8000 // start mid-motion so the first frame already looks settled
      window.addEventListener('pointermove', onMove)
      raf = requestAnimationFrame(frame)
    }
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <canvas ref={ref} className="silk" aria-hidden="true" />
}
