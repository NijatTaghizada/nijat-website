import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'

const TEXT =
  'Azerbaijan is called the Land of Fire. I grew up there, and now I teach machines to read fire from orbit: turning satellite data into early warnings, and code into tools that help people before, during, and after disaster.'
const HOT = new Set(['Fire.', 'fire', 'orbit:', 'early', 'warnings,', 'before,', 'during,', 'after'])

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <motion.span style={{ opacity }} className={HOT.has(word) ? 'hot' : undefined}>
      {word}{' '}
    </motion.span>
  )
}

export default function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = TEXT.split(' ')

  return (
    <section className="manifesto container" id="manifesto">
      <p ref={ref} className="manifesto-text">
        {words.map((w, i) => (
          <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </p>
    </section>
  )
}
