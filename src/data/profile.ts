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

/** `phrase` is the part of the sentence that becomes the link. */
export type Line = { text: string; link?: { href: string; phrase: string } }

/** A few short sentences shown under the intro once it has typed out. */
export const now: Line[] = [
  {
    text: 'Right now I’m researching whether satellite data can tell, at first sight, which California wildfires will grow large. It continues my wildfire project that won a Grand Award at Regeneron ISEF 2025.',
    link: { href: 'https://github.com/NijatTaghizada/wildfire-severity-prediction', phrase: 'researching' },
  },
  {
    text: 'I’m also building React Right, an early-stage startup working on technology for disaster response.',
    link: { href: 'https://nijattaghizada.github.io/reactright-website/', phrase: 'React Right' },
  },
  {
    text: 'Before Stanford, I captained Azerbaijan’s FIRST Global robotics team and volunteered at COP29 in Baku.',
  },
]
