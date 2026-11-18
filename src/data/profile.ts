export const profile = {
  name: 'Nijat Taghizada',
  email: 'nijattag@stanford.edu',
  linkedin: 'https://www.linkedin.com/in/nijat-taghizada/',
  github: 'https://github.com/NijatTaghizada',
}

export const intro =
  'Salam! I’m a first-year at Stanford, planning to study Data Science or Computer Science. I grew up in Baku, ' +
  'Azerbaijan. I like machine learning, competitive programming, and building things for real problems, ' +
  'especially natural disasters.'

export type Line = { text: string; link?: { href: string; label: string } }

/** A few short lines shown under the intro once it has typed out. */
export const now: Line[] = [
  {
    text: 'Researching whether satellite data can tell, at first sight, which California wildfires will grow large. It continues my wildfire project that won a Grand Award at Regeneron ISEF 2025.',
    link: { href: 'https://github.com/NijatTaghizada/wildfire-severity-prediction', label: 'Research' },
  },
  {
    text: 'Building React Right, an early-stage startup working on technology for disaster response.',
    link: { href: 'https://nijattaghizada.github.io/reactright-website/', label: 'React Right' },
  },
  {
    text: 'Before Stanford: captained Azerbaijan’s FIRST Global robotics team and volunteered at COP29 in Baku.',
  },
]
